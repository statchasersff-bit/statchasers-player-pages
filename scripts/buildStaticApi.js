import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const PLAYERS_FILE = path.resolve(DATA_DIR, 'players.json');
const INDEXED_FILE = path.resolve(DATA_DIR, 'indexed_players.json');
const INDEXED_BY_TEAM_FILE = path.resolve(DATA_DIR, 'indexed_players_by_team.json');
const GAME_LOGS_DIR = path.resolve(DATA_DIR, 'game_logs');
const BYE_WEEKS_FILE = path.resolve(DATA_DIR, 'bye_weeks.json');
const GAME_SCORES_FILE = path.resolve(DATA_DIR, 'game_scores.json');
const OUTPUT_DIR = path.resolve(process.cwd(), 'dist', 'wp', 'data');

const TEAM_ALIAS_MAP = {
  JAC: 'JAX', WSH: 'WAS', OAK: 'LV', STL: 'LAR', SD: 'LAC', LA: 'LAR',
};

function normalizeTeamAbbr(team) {
  if (!team) return team;
  return TEAM_ALIAS_MAP[team] || team;
}

function getFantasyPoints(stats, format) {
  let pts = 0;
  pts += (stats.pass_yd ?? 0) * 0.04;
  pts += (stats.pass_td ?? 0) * 4;
  pts += (stats.pass_int ?? 0) * -1;
  pts += (stats.rush_yd ?? 0) * 0.1;
  pts += (stats.rush_td ?? 0) * 6;
  pts += (stats.rec_yd ?? 0) * 0.1;
  pts += (stats.rec_td ?? 0) * 6;
  pts += (stats.fgm ?? 0) * 3;
  pts += (stats.xpm ?? 0) * 1;
  if (format === 'ppr') pts += (stats.rec ?? 0) * 1;
  else if (format === 'half') pts += (stats.rec ?? 0) * 0.5;
  return Math.round(pts * 100) / 100;
}

function getEntryPoints(stats, format) {
  if (format === 'ppr') return stats.pts_ppr;
  if (format === 'half' && stats.pts_half_ppr != null) return stats.pts_half_ppr;
  return getFantasyPoints(stats, format);
}

function hasParticipation(stats, position) {
  if (position === 'QB') return (stats.pass_att ?? 0) > 0 || (stats.rush_att ?? 0) > 0;
  if (position === 'K') return (stats.fga ?? 0) > 0 || (stats.xpa ?? 0) > 0;
  return (stats.rec_tgt ?? 0) > 0 || (stats.rec ?? 0) > 0 || (stats.rush_att ?? 0) > 0 || (stats.pass_att ?? 0) > 0;
}

let gameScoresData = null;
function loadGameScores() {
  if (gameScoresData) return gameScoresData;
  try { gameScoresData = JSON.parse(fs.readFileSync(GAME_SCORES_FILE, 'utf-8')); }
  catch { gameScoresData = {}; }
  return gameScoresData;
}

function getGameScore(season, team, week) {
  if (!team) return null;
  const scores = loadGameScores();
  const seasonScores = scores?.[String(season)];
  if (!seasonScores) return null;
  const normalizedTeam = normalizeTeamAbbr(team);
  const entry = seasonScores[`${normalizedTeam}_${week}`];
  if (!entry) return null;
  return { tm: entry.tm, opp: entry.opp, r: entry.r };
}

let byeWeeksData = null;
function loadByeWeeks() {
  if (byeWeeksData) return byeWeeksData;
  try { byeWeeksData = JSON.parse(fs.readFileSync(BYE_WEEKS_FILE, 'utf-8')); }
  catch { byeWeeksData = {}; }
  return byeWeeksData;
}

function getByeWeek(season, team) {
  if (!team) return null;
  const byes = loadByeWeeks();
  const seasonByes = byes[String(season)];
  if (!seasonByes) return null;
  return seasonByes[normalizeTeamAbbr(team)] ?? null;
}

const gameLogsCache = new Map();
function loadGameLogs(season) {
  if (gameLogsCache.has(season)) return gameLogsCache.get(season);
  const file = path.resolve(GAME_LOGS_DIR, `${season}.json`);
  if (!fs.existsSync(file)) return {};
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  gameLogsCache.set(season, data);
  return data;
}

function getAvailableSeasons() {
  if (!fs.existsSync(GAME_LOGS_DIR)) return [];
  return fs.readdirSync(GAME_LOGS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => parseInt(f.replace('.json', ''), 10))
    .filter(n => !isNaN(n))
    .sort((a, b) => b - a);
}

const seasonMaxWeekCache = new Map();
function getSeasonMaxWeek(season) {
  if (seasonMaxWeekCache.has(season)) return seasonMaxWeekCache.get(season);
  const logs = loadGameLogs(season);
  let max = 0;
  for (const entries of Object.values(logs)) {
    for (const e of entries) { if (e.week > max) max = e.week; }
  }
  const result = Math.max(max, season >= 2021 ? 18 : 17);
  seasonMaxWeekCache.set(season, result);
  return result;
}

function fillMissingWeeks(entries, season, team) {
  if (entries.length === 0) return entries;
  const byeWeek = getByeWeek(season, team);
  const existingWeeks = new Set(entries.map(e => e.week));
  const maxWeek = getSeasonMaxWeek(season);
  const emptyStats = { pts_ppr: 0 };
  const filled = [...entries];
  for (let w = 1; w <= maxWeek; w++) {
    if (existingWeeks.has(w)) continue;
    const isBye = byeWeek === w;
    filled.push({ week: w, opp: isBye ? 'BYE' : '\u2014', stats: emptyStats, game_status: isBye ? 'bye' : 'out' });
  }
  filled.sort((a, b) => a.week - b.week);
  for (const entry of filled) {
    if (!entry.game_status) entry.game_status = 'active';
    if (entry.game_status === 'active') entry.score = getGameScore(season, team, entry.week) ?? null;
  }
  return filled;
}

const weeklyRanksCache = new Map();
function buildWeeklyRanks(season, logs, players, format) {
  const cacheKey = `${season}_${format}`;
  if (weeklyRanksCache.has(cacheKey)) return weeklyRanksCache.get(cacheKey);
  const playerPosMap = new Map();
  for (const p of players) { if (p.position) playerPosMap.set(p.id, p.position); }
  const weekPosBuckets = new Map();
  for (const [playerId, entries] of Object.entries(logs)) {
    const pos = playerPosMap.get(playerId);
    if (!pos) continue;
    for (const entry of entries) {
      if (!hasParticipation(entry.stats, pos)) continue;
      if (!weekPosBuckets.has(entry.week)) weekPosBuckets.set(entry.week, new Map());
      const posBucket = weekPosBuckets.get(entry.week);
      if (!posBucket.has(pos)) posBucket.set(pos, []);
      posBucket.get(pos).push({ playerId, pts: getEntryPoints(entry.stats, format) });
    }
  }
  const rankMap = new Map();
  weekPosBuckets.forEach((posBucket, week) => {
    posBucket.forEach((bucket) => {
      bucket.sort((a, b) => b.pts - a.pts);
      for (let i = 0; i < bucket.length; i++) {
        const pid = bucket[i].playerId;
        if (!rankMap.has(pid)) rankMap.set(pid, new Map());
        rankMap.get(pid).set(week, i + 1);
      }
    });
  });
  weeklyRanksCache.set(cacheKey, rankMap);
  return rankMap;
}

function attachRanks(entries, playerId, ranks) {
  const playerRanks = ranks.get(playerId);
  if (!playerRanks) return entries;
  return entries.map(e => ({ ...e, pos_rank: playerRanks.get(e.week) ?? null }));
}

const oppRanksCache = new Map();
function buildOppRanks(season, logs, players, format) {
  const cacheKey = `${season}_${format}`;
  if (oppRanksCache.has(cacheKey)) return oppRanksCache.get(cacheKey);
  const playerPosMap = new Map();
  for (const p of players) { if (p.position && p.team) playerPosMap.set(p.id, { position: p.position, team: p.team }); }
  const oppPtsAllowed = new Map();
  for (const [playerId, entries] of Object.entries(logs)) {
    const info = playerPosMap.get(playerId);
    if (!info) continue;
    for (const entry of entries) {
      if (!hasParticipation(entry.stats, info.position)) continue;
      const normalizedOpp = normalizeTeamAbbr(entry.opp);
      const key = `${normalizedOpp}:${info.position}`;
      if (!oppPtsAllowed.has(key)) oppPtsAllowed.set(key, []);
      oppPtsAllowed.get(key).push(getEntryPoints(entry.stats, format));
    }
  }
  const posGroups = new Map();
  oppPtsAllowed.forEach((pts, key) => {
    const [team, pos] = key.split(':');
    const avg = pts.reduce((s, v) => s + v, 0) / pts.length;
    if (!posGroups.has(pos)) posGroups.set(pos, []);
    posGroups.get(pos).push({ team, avgPtsAllowed: avg });
  });
  const rankMap = new Map();
  posGroups.forEach((teams, pos) => {
    teams.sort((a, b) => a.avgPtsAllowed - b.avgPtsAllowed);
    for (let i = 0; i < teams.length; i++) {
      rankMap.set(`${teams[i].team}:${pos}`, i + 1);
    }
  });
  oppRanksCache.set(cacheKey, rankMap);
  return rankMap;
}

function attachOppRanks(entries, position, oppRanks) {
  if (!position) return entries;
  return entries.map(e => {
    const normalizedOpp = normalizeTeamAbbr(e.opp);
    const key = `${normalizedOpp}:${position}`;
    return { ...e, opp_rank_vs_pos: oppRanks.get(key) ?? null };
  });
}

const teamAggCache = new Map();
function buildTeamAggregates(season, logs, allPlayers) {
  if (teamAggCache.has(season)) return teamAggCache.get(season);
  const playerTeamMap = new Map();
  for (const p of allPlayers) {
    if (p.team && p.team !== 'FA') playerTeamMap.set(p.id, normalizeTeamAbbr(p.team));
  }
  const agg = new Map();
  for (const [pid, entries] of Object.entries(logs)) {
    const team = playerTeamMap.get(pid);
    if (!team) continue;
    const p = allPlayers.find(pl => pl.id === pid);
    const pos = p?.position;
    for (const e of entries) {
      const s = e.stats || {};
      const key = `${team}_${e.week}`;
      if (!agg.has(key)) agg.set(key, { tgt: 0, pass_att: 0, rush_att: 0 });
      const a = agg.get(key);
      if (pos !== 'QB' && pos !== 'K') a.tgt += s.rec_tgt || 0;
      if (pos === 'QB') a.pass_att += s.pass_att || 0;
      a.rush_att += s.rush_att || 0;
    }
  }
  teamAggCache.set(season, agg);
  return agg;
}

function enrichWithTeamMetrics(entries, playerTeam, season, logs, allPlayers) {
  if (!playerTeam) return entries;
  const team = normalizeTeamAbbr(playerTeam);
  const agg = buildTeamAggregates(season, logs, allPlayers);
  return entries.map(e => {
    const key = `${team}_${e.week}`;
    const tw = agg.get(key);
    if (!tw) return e;
    const s = e.stats || {};
    const tgt = s.rec_tgt || 0;
    const targetShare = tw.tgt > 0 ? Math.round((tgt / tw.tgt) * 1000) / 10 : null;
    const totalAtt = tw.pass_att + tw.rush_att;
    const teamPassRate = totalAtt > 0 ? Math.round((tw.pass_att / totalAtt) * 1000) / 10 : null;
    return { ...e, stats: { ...e.stats, target_share: targetShare, team_pass_rate: teamPassRate, team_tgt: tw.tgt } };
  });
}

function buildPlayerProfile(player, allPlayers, seasons, format) {
  let activeSeason = seasons[0] || new Date().getFullYear();
  let playerLogs = [];
  for (const s of seasons) {
    const sLogs = loadGameLogs(s);
    const pLogs = sLogs[player.id] || [];
    const hasStats = pLogs.some(e => hasParticipation(e.stats, player.position));
    if (hasStats) {
      activeSeason = s;
      const ranks = buildWeeklyRanks(s, sLogs, allPlayers, format);
      playerLogs = attachRanks(pLogs, player.id, ranks);
      const oppRanks = buildOppRanks(s, sLogs, allPlayers, format);
      playerLogs = attachOppRanks(playerLogs, player.position, oppRanks);
      playerLogs = enrichWithTeamMetrics(playerLogs, player.team, s, sLogs, allPlayers);
      playerLogs = fillMissingWeeks(playerLogs, s, player.team);
      break;
    }
  }

  const playedLogs = playerLogs.filter(e => e.game_status === 'active');
  const gamesPlayed = playedLogs.length;
  const maxWeek = playedLogs.length > 0 ? Math.max(...playedLogs.map(e => e.week)) : 0;
  const isSeasonComplete = maxWeek >= 17;
  const seasonLabel = gamesPlayed > 0
    ? (isSeasonComplete ? `${activeSeason} Season Final` : `${activeSeason} Season (Through Week ${maxWeek})`)
    : null;

  const multiSeasonStats = [];
  for (const s of seasons) {
    const sLogs = loadGameLogs(s);
    const pLogs = sLogs[player.id] || [];
    const played = pLogs.filter(e => hasParticipation(e.stats, player.position));
    if (played.length === 0) continue;
    const ranks = buildWeeklyRanks(s, sLogs, allPlayers, format);
    const rankedLogs = attachRanks(pLogs, player.id, ranks);
    const gp = played.length;
    const totalPts = played.reduce((sum, e) => sum + getEntryPoints(e.stats, format), 0);
    const pos = player.position || '';
    const bustThresh = (pos === 'QB' || pos === 'TE') ? 18 : pos === 'WR' ? 36 : 30;
    const hasTier3 = bustThresh > 24;
    const rankedPlayed = rankedLogs.filter(e => hasParticipation(e.stats, player.position));
    const ranked = rankedPlayed.filter(e => e.pos_rank != null);
    const pos1Games = ranked.filter(e => e.pos_rank >= 1 && e.pos_rank <= 12).length;
    const pos2End = hasTier3 ? 24 : bustThresh;
    const pos2Games = ranked.filter(e => e.pos_rank >= 13 && e.pos_rank <= pos2End).length;
    const pos3Games = hasTier3 ? ranked.filter(e => e.pos_rank >= 25 && e.pos_rank <= bustThresh).length : 0;
    const bustGames = ranked.filter(e => e.pos_rank > bustThresh).length;
    multiSeasonStats.push({
      season: s, ppg: totalPts / gp, gamesPlayed: gp,
      pos1Pct: (pos1Games / gp) * 100, pos2Pct: (pos2Games / gp) * 100,
      pos3Pct: (pos3Games / gp) * 100, bustPct: (bustGames / gp) * 100,
    });
  }

  let careerProfile = null;
  const threeYearSeasons = [activeSeason, activeSeason - 1, activeSeason - 2];
  const threeYearStats = multiSeasonStats.filter(m => threeYearSeasons.includes(m.season));
  const pts = [];
  let p1 = 0, p2 = 0, p3 = 0, bust = 0;
  for (const s of threeYearSeasons) {
    if (!multiSeasonStats.find(m => m.season === s)) continue;
    const sLogs = loadGameLogs(s);
    const pLogs = sLogs[player.id] || [];
    const played = pLogs.filter(e => hasParticipation(e.stats, player.position));
    played.forEach(e => pts.push(getEntryPoints(e.stats, format)));
    const ranks = buildWeeklyRanks(s, sLogs, allPlayers, format);
    const rankedLogs = attachRanks(pLogs, player.id, ranks);
    const rankedPlayed = rankedLogs.filter(e => hasParticipation(e.stats, player.position) && e.pos_rank != null);
    const pos = player.position || '';
    const bustThresh = (pos === 'QB' || pos === 'TE') ? 18 : pos === 'WR' ? 36 : 30;
    const hasTier3 = bustThresh > 24;
    const pos2End = hasTier3 ? 24 : bustThresh;
    p1 += rankedPlayed.filter(e => e.pos_rank >= 1 && e.pos_rank <= 12).length;
    p2 += rankedPlayed.filter(e => e.pos_rank >= 13 && e.pos_rank <= pos2End).length;
    p3 += hasTier3 ? rankedPlayed.filter(e => e.pos_rank >= 25 && e.pos_rank <= bustThresh).length : 0;
    bust += rankedPlayed.filter(e => e.pos_rank > bustThresh).length;
  }
  if (threeYearStats.length > 1) {
    const totalGp = pts.length;
    const maxGames = threeYearStats.length * 17;
    const totalPts = pts.reduce((a, b) => a + b, 0);
    const ppg = totalGp > 0 ? totalPts / totalGp : 0;
    const variance = totalGp > 1 ? pts.reduce((sum, v) => sum + Math.pow(v - ppg, 2), 0) / (totalGp - 1) : 0;
    const vol = Math.sqrt(variance);
    const volLabel = vol < 6 ? 'Low' : vol < 9 ? 'Moderate' : 'High';
    careerProfile = {
      ppg, gamesPlayed: totalGp, maxGames,
      durabilityPct: maxGames > 0 ? (totalGp / maxGames) * 100 : 0,
      pos1Pct: totalGp > 0 ? (p1 / totalGp) * 100 : 0,
      pos2Pct: totalGp > 0 ? (p2 / totalGp) * 100 : 0,
      pos3Pct: totalGp > 0 ? (p3 / totalGp) * 100 : 0,
      bustPct: totalGp > 0 ? (bust / totalGp) * 100 : 0,
      volatility: vol, volatilityLabel: volLabel,
      seasons: threeYearStats.length,
      seasonPpgs: threeYearStats.map(m => ({ season: m.season, ppg: m.ppg })),
      smallSample: totalGp < 8,
    };
  }

  let seasonRank = null;
  if (gamesPlayed > 0 && player.position) {
    const seasonLogs = loadGameLogs(activeSeason);
    const ppgByPlayer = [];
    for (const [pid, pLogs] of Object.entries(seasonLogs)) {
      const p = allPlayers.find(ap => ap.id === pid);
      if (!p || p.position !== player.position) continue;
      const played = pLogs.filter(e => hasParticipation(e.stats, p.position));
      if (played.length < 4) continue;
      const totalPts = played.reduce((sum, e) => sum + getEntryPoints(e.stats, format), 0);
      ppgByPlayer.push({ id: pid, ppg: totalPts / played.length });
    }
    ppgByPlayer.sort((a, b) => b.ppg - a.ppg);
    const idx = ppgByPlayer.findIndex(x => x.id === player.id);
    if (idx >= 0) seasonRank = idx + 1;
  }

  const weeklyPts = playedLogs.map(e => getEntryPoints(e.stats, format));
  const trends = weeklyPts.length > 0 ? { weeklyFantasyPoints: weeklyPts } : null;

  return {
    ...player,
    headshotUrl: player.headshotUrl ?? null,
    season: activeSeason,
    seasonLabel,
    seasonRank,
    trends,
    gameLog: playerLogs,
    news: player.news ?? [],
    availableSeasons: seasons,
    multiSeasonStats,
    careerProfile,
  };
}

function buildGameLog(player, allPlayers, season, format) {
  const logs = loadGameLogs(season);
  const ranks = buildWeeklyRanks(season, logs, allPlayers, format);
  let playerLogs = attachRanks(logs[player.id] || [], player.id, ranks);
  const oppRanks = buildOppRanks(season, logs, allPlayers, format);
  playerLogs = attachOppRanks(playerLogs, player.position, oppRanks);
  playerLogs = enrichWithTeamMetrics(playerLogs, player.team, season, logs, allPlayers);
  playerLogs = fillMissingWeeks(playerLogs, season, player.team);
  return playerLogs;
}

function buildRelated(player, allPlayers, format) {
  const availableSeasons = getAvailableSeasons();
  const activeSeason = availableSeasons[0] || 2025;
  const radius = 3;
  if (!player.position) return { neighbors: [], currentRank: 0, season: activeSeason, format, position: player.position };
  const seasonLogs = loadGameLogs(activeSeason);
  const ppgByPlayer = [];
  for (const [pid, pLogs] of Object.entries(seasonLogs)) {
    const p = allPlayers.find(ap => ap.id === pid);
    if (!p || p.position !== player.position) continue;
    const played = pLogs.filter(e => hasParticipation(e.stats, p.position));
    if (played.length < 4) continue;
    const totalPts = played.reduce((sum, e) => sum + getEntryPoints(e.stats, format), 0);
    ppgByPlayer.push({ id: pid, ppg: totalPts / played.length, totalPts, gp: played.length });
  }
  ppgByPlayer.sort((a, b) => b.ppg - a.ppg);
  const currentIdx = ppgByPlayer.findIndex(x => x.id === player.id);
  if (currentIdx === -1) return { neighbors: [], currentRank: 0, season: activeSeason, format, position: player.position };
  const currentRank = currentIdx + 1;
  const start = Math.max(0, currentIdx - radius);
  const end = Math.min(ppgByPlayer.length, currentIdx + radius + 1);
  const neighbors = ppgByPlayer.slice(start, end).filter(x => x.id !== player.id).map(n => {
    const p = allPlayers.find(ap => ap.id === n.id);
    const rank = ppgByPlayer.indexOf(n) + 1;
    return { id: n.id, name: p?.name || '', slug: p?.slug || '', team: p?.team || '', position: p?.position || '', posRank: rank, ppg: Math.round(n.ppg * 10) / 10 };
  });
  return { neighbors, currentRank, season: activeSeason, format, position: player.position };
}

function writeJSON(filePath, data) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data));
}

function main() {
  console.log('Building static API data...');

  const allPlayers = JSON.parse(fs.readFileSync(PLAYERS_FILE, 'utf-8'));
  for (const p of allPlayers) {
    if (p.team) p.team = normalizeTeamAbbr(p.team);
  }
  const playersBySlug = new Map();
  for (const p of allPlayers) playersBySlug.set(p.slug, p);

  const seasons = getAvailableSeasons();
  console.log(`  Seasons: ${seasons.join(', ')}`);

  const indexedRaw = JSON.parse(fs.readFileSync(INDEXED_FILE, 'utf-8'));
  const indexedSlugs = indexedRaw.slugs || [];
  const indexedByTeam = fs.existsSync(INDEXED_BY_TEAM_FILE) ? JSON.parse(fs.readFileSync(INDEXED_BY_TEAM_FILE, 'utf-8')) : {};

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const lightweight = allPlayers
    .map(p => ({ id: p.id, name: p.name, slug: p.slug, team: p.team, position: p.position }))
    .sort((a, b) => a.name.localeCompare(b.name));
  writeJSON(path.join(OUTPUT_DIR, 'players.json'), lightweight);
  console.log(`  players.json: ${lightweight.length} players`);

  writeJSON(path.join(OUTPUT_DIR, 'indexed-players.json'), { slugs: indexedSlugs, byTeam: indexedByTeam });
  console.log(`  indexed-players.json: ${indexedSlugs.length} indexed slugs`);

  const formats = ['ppr', 'half', 'standard'];
  const slugsToProcess = indexedSlugs;
  console.log(`  Processing ${slugsToProcess.length} indexed players across ${formats.length} formats...`);

  let processed = 0;
  for (const slug of slugsToProcess) {
    const player = playersBySlug.get(slug);
    if (!player) {
      console.warn(`  WARNING: No player found for slug "${slug}"`);
      continue;
    }

    const playerDir = path.join(OUTPUT_DIR, 'players', slug);

    for (const format of formats) {
      const profile = buildPlayerProfile(player, allPlayers, seasons, format);
      writeJSON(path.join(playerDir, `profile-${format}.json`), profile);

      for (const season of seasons) {
        const gameLog = buildGameLog(player, allPlayers, season, format);
        writeJSON(path.join(playerDir, `game-log-${season}-${format}.json`), gameLog);
      }

      const related = buildRelated(player, allPlayers, format);
      writeJSON(path.join(playerDir, `related-${format}.json`), related);
    }

    processed++;
    if (processed % 50 === 0) console.log(`  ... ${processed}/${slugsToProcess.length}`);
  }

  console.log(`\nStatic API build complete!`);
  console.log(`  ${processed} players × ${formats.length} formats × ${seasons.length + 2} endpoints`);
  console.log(`  Output: ${OUTPUT_DIR}`);
}

main();

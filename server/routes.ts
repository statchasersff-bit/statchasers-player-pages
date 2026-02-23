import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import type { Player, GameLogEntry, DynastyData } from "@shared/playerTypes";
import { normalizeTeamAbbr, TEAM_ALIAS_MAP } from "@shared/teamMappings";
import { type ScoringFormat, getEntryPoints } from "@shared/scoring";

let playersCache: Player[] | null = null;
let playersBySlug: Map<string, Player> | null = null;
let lastMtimeMs: number = 0;
let lastFileCheck: number = 0;
const FILE_CHECK_INTERVAL = 10 * 60 * 1000;
const PLAYERS_FILE = path.resolve(process.cwd(), "data", "players.json");
const INDEXED_FILE = path.resolve(process.cwd(), "data", "indexed_players.json");
const INDEXED_BY_TEAM_FILE = path.resolve(process.cwd(), "data", "indexed_players_by_team.json");
const GAME_LOGS_DIR = path.resolve(process.cwd(), "data", "game_logs");
const BYE_WEEKS_FILE = path.resolve(process.cwd(), "data", "bye_weeks.json");
const GAME_SCORES_FILE = path.resolve(process.cwd(), "data", "game_scores.json");
const DYNASTY_FILE = path.resolve(process.cwd(), "data", "dynasty_rankings.json");

const gameLogsCache: Map<number, Record<string, GameLogEntry[]>> = new Map();
const weeklyRanksCache: Map<string, Map<string, Map<number, number>>> = new Map();

let dynastyCache: Record<string, DynastyData> | null = null;
function loadDynastyRankings(): Record<string, DynastyData> {
  if (dynastyCache) return dynastyCache;
  try {
    dynastyCache = JSON.parse(fs.readFileSync(DYNASTY_FILE, "utf-8"));
  } catch {
    dynastyCache = {};
  }
  return dynastyCache!;
}

let gameScoresData: Record<string, Record<string, { tm: number; opp: number; r: string }>> | null = null;
function loadGameScores(): typeof gameScoresData {
  if (gameScoresData) return gameScoresData;
  try {
    gameScoresData = JSON.parse(fs.readFileSync(GAME_SCORES_FILE, "utf-8"));
  } catch {
    gameScoresData = {};
  }
  return gameScoresData!;
}

function getGameScore(season: number, team: string | null, week: number): { tm: number; opp: number; r: 'W' | 'L' | 'T' } | null {
  if (!team) return null;
  const scores = loadGameScores();
  const seasonScores = scores?.[String(season)];
  if (!seasonScores) return null;
  const normalizedTeam = normalizeTeamAbbr(team);
  const entry = seasonScores[`${normalizedTeam}_${week}`];
  if (!entry) return null;
  return { tm: entry.tm, opp: entry.opp, r: entry.r as 'W' | 'L' | 'T' };
}

let byeWeeksData: Record<string, Record<string, number>> | null = null;
function loadByeWeeks(): Record<string, Record<string, number>> {
  if (byeWeeksData) return byeWeeksData;
  try {
    byeWeeksData = JSON.parse(fs.readFileSync(BYE_WEEKS_FILE, "utf-8"));
  } catch {
    byeWeeksData = {};
  }
  return byeWeeksData!;
}

function getByeWeek(season: number, team: string | null): number | null {
  if (!team) return null;
  const byes = loadByeWeeks();
  const seasonByes = byes[String(season)];
  if (!seasonByes) return null;
  const normalizedTeam = normalizeTeamAbbr(team);
  return seasonByes[normalizedTeam] ?? null;
}

const seasonMaxWeekCache: Map<number, number> = new Map();
function getSeasonMaxWeek(season: number): number {
  if (seasonMaxWeekCache.has(season)) return seasonMaxWeekCache.get(season)!;
  const logs = loadGameLogs(season);
  let max = 0;
  for (const entries of Object.values(logs)) {
    for (const e of entries) {
      if (e.week > max) max = e.week;
    }
  }
  const result = Math.max(max, season >= 2021 ? 18 : 17);
  seasonMaxWeekCache.set(season, result);
  return result;
}

function fillMissingWeeks(entries: GameLogEntry[], season: number, team: string | null): GameLogEntry[] {
  if (entries.length === 0) return entries;
  const byeWeek = getByeWeek(season, team);
  const existingWeeks = new Set(entries.map(e => e.week));
  const maxWeek = getSeasonMaxWeek(season);
  const emptyStats: GameLogEntry['stats'] = { pts_ppr: 0 };
  const filled: GameLogEntry[] = [...entries];

  for (let w = 1; w <= maxWeek; w++) {
    if (existingWeeks.has(w)) continue;
    const isBye = byeWeek === w;
    filled.push({
      week: w,
      opp: isBye ? 'BYE' : '\u2014',
      stats: emptyStats,
      game_status: isBye ? 'bye' : 'out',
    });
  }

  filled.sort((a, b) => a.week - b.week);
  for (const entry of filled) {
    if (!entry.game_status) {
      entry.game_status = 'active';
    }
    if (entry.game_status === 'active') {
      entry.score = getGameScore(season, team, entry.week) ?? null;
    }
  }
  return filled;
}

type TeamWeekAgg = { tgt: number; pass_att: number; rush_att: number };
const teamAggCache: Map<string, Map<string, TeamWeekAgg>> = new Map();

function buildTeamAggregates(season: number, logs: Record<string, GameLogEntry[]>, players: Player[]): Map<string, TeamWeekAgg> {
  const cacheKey = `${season}`;
  if (teamAggCache.has(cacheKey)) return teamAggCache.get(cacheKey)!;

  const playerTeamMap = new Map<string, string>();
  for (const p of players) {
    if (p.team && p.team !== 'FA') playerTeamMap.set(p.id, normalizeTeamAbbr(p.team));
  }

  const agg = new Map<string, TeamWeekAgg>();
  for (const [pid, entries] of Object.entries(logs)) {
    const team = playerTeamMap.get(pid);
    if (!team) continue;
    const p = players.find(pl => pl.id === pid);
    const pos = p?.position;
    for (const e of entries) {
      const s = e.stats as unknown as Record<string, number>;
      const key = `${team}_${e.week}`;
      if (!agg.has(key)) agg.set(key, { tgt: 0, pass_att: 0, rush_att: 0 });
      const a = agg.get(key)!;
      if (pos !== 'QB' && pos !== 'K') {
        a.tgt += s.rec_tgt || 0;
      }
      if (pos === 'QB') {
        a.pass_att += s.pass_att || 0;
      }
      a.rush_att += s.rush_att || 0;
    }
  }

  teamAggCache.set(cacheKey, agg);
  return agg;
}

function resolvePlayerTeam(playerTeam: string | null, entries: GameLogEntry[], season: number, logs: Record<string, GameLogEntry[]>, players: Player[]): string | null {
  if (playerTeam && playerTeam !== 'FA') return normalizeTeamAbbr(playerTeam);
  if (entries.length === 0) return null;
  const weekOppToTeam = new Map<string, string>();
  for (const p of players) {
    if (!p.team || p.team === 'FA') continue;
    const pTeam = normalizeTeamAbbr(p.team);
    const pEntries = logs[p.id];
    if (!pEntries) continue;
    for (const pe of pEntries) {
      if (!pe.opp) continue;
      const lookupKey = `${pe.week}_${normalizeTeamAbbr(pe.opp)}`;
      if (!weekOppToTeam.has(lookupKey)) weekOppToTeam.set(lookupKey, pTeam);
    }
  }
  const teamCounts = new Map<string, number>();
  for (const e of entries) {
    if (!e.opp) continue;
    const lookupKey = `${e.week}_${normalizeTeamAbbr(e.opp)}`;
    const resolved = weekOppToTeam.get(lookupKey);
    if (resolved) teamCounts.set(resolved, (teamCounts.get(resolved) || 0) + 1);
  }
  if (teamCounts.size > 0) {
    let bestTeam = '';
    let bestCount = 0;
    for (const [t, c] of teamCounts) {
      if (c > bestCount) { bestTeam = t; bestCount = c; }
    }
    if (bestTeam) return bestTeam;
  }
  return null;
}

function enrichWithTeamMetrics(entries: GameLogEntry[], playerTeam: string | null, season: number, logs: Record<string, GameLogEntry[]>, players: Player[]): GameLogEntry[] {
  const team = resolvePlayerTeam(playerTeam, entries, season, logs, players);
  if (!team) return entries;
  const agg = buildTeamAggregates(season, logs, players);
  return entries.map(e => {
    const key = `${team}_${e.week}`;
    const tw = agg.get(key);
    if (!tw) return e;
    const s = e.stats as unknown as Record<string, number>;
    const tgt = s.rec_tgt || 0;
    const targetShare = tw.tgt > 0 ? Math.round((tgt / tw.tgt) * 1000) / 10 : null;
    const totalAtt = tw.pass_att + tw.rush_att;
    const teamPassRate = totalAtt > 0 ? Math.round((tw.pass_att / totalAtt) * 1000) / 10 : null;
    return {
      ...e,
      stats: {
        ...e.stats,
        target_share: targetShare,
        team_pass_rate: teamPassRate,
        team_tgt: tw.tgt,
        team_pass_att: tw.pass_att,
      } as GameLogEntry['stats'],
    };
  });
}

function hasParticipation(stats: GameLogEntry['stats'], position: string | null): boolean {
  const s = stats as unknown as Record<string, number | null | undefined>;
  if (position === 'QB') {
    return (s.pass_att ?? 0) > 0 || (s.rush_att ?? 0) > 0;
  }
  if (position === 'K') {
    return (s.fga ?? 0) > 0 || (s.xpa ?? 0) > 0;
  }
  return (s.rec_tgt ?? 0) > 0 || (s.rec ?? 0) > 0 || (s.rush_att ?? 0) > 0 || (s.pass_att ?? 0) > 0;
}

function buildWeeklyRanks(season: number, logs: Record<string, GameLogEntry[]>, players: Player[], format: ScoringFormat = 'ppr'): Map<string, Map<number, number>> {
  const cacheKey = `${season}_${format}`;
  if (weeklyRanksCache.has(cacheKey)) return weeklyRanksCache.get(cacheKey)!;

  const playerPosMap = new Map<string, string>();
  for (const p of players) {
    if (p.position) playerPosMap.set(p.id, p.position);
  }

  const weekPosBuckets: Map<number, Map<string, { playerId: string; pts: number }[]>> = new Map();
  for (const [playerId, entries] of Object.entries(logs)) {
    const pos = playerPosMap.get(playerId);
    if (!pos) continue;
    for (const entry of entries) {
      if (!hasParticipation(entry.stats, pos)) continue;
      if (!weekPosBuckets.has(entry.week)) weekPosBuckets.set(entry.week, new Map());
      const posBucket = weekPosBuckets.get(entry.week)!;
      if (!posBucket.has(pos)) posBucket.set(pos, []);
      posBucket.get(pos)!.push({ playerId, pts: getEntryPoints(entry.stats, format) });
    }
  }

  const rankMap = new Map<string, Map<number, number>>();
  weekPosBuckets.forEach((posBucket, week) => {
    posBucket.forEach((bucket) => {
      bucket.sort((a: { playerId: string; pts: number }, b: { playerId: string; pts: number }) => b.pts - a.pts);
      for (let i = 0; i < bucket.length; i++) {
        const pid = bucket[i].playerId;
        if (!rankMap.has(pid)) rankMap.set(pid, new Map());
        rankMap.get(pid)!.set(week, i + 1);
      }
    });
  });

  weeklyRanksCache.set(cacheKey, rankMap);
  return rankMap;
}

function attachRanks(entries: GameLogEntry[], playerId: string, ranks: Map<string, Map<number, number>>): GameLogEntry[] {
  const playerRanks = ranks.get(playerId);
  if (!playerRanks) return entries;
  return entries.map(e => ({ ...e, pos_rank: playerRanks.get(e.week) ?? null }));
}

const oppRanksCache: Map<string, Map<string, number>> = new Map();

function buildOppRanks(season: number, logs: Record<string, GameLogEntry[]>, players: Player[], format: ScoringFormat = 'ppr'): Map<string, number> {
  const cacheKey = `${season}_${format}`;
  if (oppRanksCache.has(cacheKey)) return oppRanksCache.get(cacheKey)!;

  const playerPosMap = new Map<string, { position: string; team: string }>();
  for (const p of players) {
    if (p.position && p.team) playerPosMap.set(p.id, { position: p.position, team: p.team });
  }

  const oppPtsAllowed: Map<string, number[]> = new Map();

  for (const [playerId, entries] of Object.entries(logs)) {
    const info = playerPosMap.get(playerId);
    if (!info) continue;
    const pos = info.position;
    for (const entry of entries) {
      if (!hasParticipation(entry.stats, pos)) continue;
      const normalizedOpp = normalizeTeamAbbr(entry.opp);
      const key = `${normalizedOpp}:${pos}`;
      if (!oppPtsAllowed.has(key)) oppPtsAllowed.set(key, []);
      oppPtsAllowed.get(key)!.push(getEntryPoints(entry.stats, format));
    }
  }

  const posGroups: Map<string, { team: string; avgPtsAllowed: number }[]> = new Map();
  oppPtsAllowed.forEach((pts: number[], key: string) => {
    const [team, pos] = key.split(':');
    const avg = pts.reduce((s: number, v: number) => s + v, 0) / pts.length;
    if (!posGroups.has(pos)) posGroups.set(pos, []);
    posGroups.get(pos)!.push({ team, avgPtsAllowed: avg });
  });

  const rankMap = new Map<string, number>();
  posGroups.forEach((teams: { team: string; avgPtsAllowed: number }[], pos: string) => {
    teams.sort((a: { team: string; avgPtsAllowed: number }, b: { team: string; avgPtsAllowed: number }) => a.avgPtsAllowed - b.avgPtsAllowed);
    for (let i = 0; i < teams.length; i++) {
      rankMap.set(`${teams[i].team}:${pos}`, i + 1);
    }
  });

  oppRanksCache.set(cacheKey, rankMap);
  return rankMap;
}

function attachOppRanks(entries: GameLogEntry[], position: string | null, oppRanks: Map<string, number>): GameLogEntry[] {
  if (!position) return entries;
  return entries.map(e => {
    const normalizedOpp = normalizeTeamAbbr(e.opp);
    const key = `${normalizedOpp}:${position}`;
    return { ...e, opp_rank_vs_pos: oppRanks.get(key) ?? null };
  });
}

function loadGameLogs(season: number): Record<string, GameLogEntry[]> {
  if (gameLogsCache.has(season)) return gameLogsCache.get(season)!;
  const file = path.resolve(GAME_LOGS_DIR, `${season}.json`);
  if (!fs.existsSync(file)) return {};
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  gameLogsCache.set(season, data);
  return data;
}

function getAvailableSeasons(): number[] {
  if (!fs.existsSync(GAME_LOGS_DIR)) return [];
  return fs.readdirSync(GAME_LOGS_DIR)
    .filter(f => f.endsWith(".json"))
    .map(f => parseInt(f.replace(".json", ""), 10))
    .filter(n => !isNaN(n))
    .sort((a, b) => b - a);
}

interface PosBenchmarks {
  position: string;
  season: number;
  qualThreshold: number;
  posAvg: { yardsPerCatch: number | null; catchPct: number | null; tdPerTarget: number | null; fpPerUsage?: number | null };
  playerValues: number[];
  catchValues: number[];
  tdValues: number[];
  fpPerUsageValues?: number[];
}

const benchmarksCache: Map<string, PosBenchmarks> = new Map();

function computePositionBenchmarks(season: number, position: string, allPlayers: Player[]): PosBenchmarks {
  const key = `${season}_${position}`;
  const cached = benchmarksCache.get(key);
  if (cached) return cached;

  const qualThresh = position === 'WR' ? 30 : 20;
  const sLogs = loadGameLogs(season);

  let sumYards = 0, sumRec = 0, sumTgt = 0, sumTd = 0;
  let sumQBFP = 0, sumQBUsage = 0;
  const playerYPC: number[] = [];
  const playerCatch: number[] = [];
  const playerTDRate: number[] = [];
  const playerFPU: number[] = [];

  for (const [pid, entries] of Object.entries(sLogs)) {
    const p = allPlayers.find(ap => ap.id === pid);
    if (!p || p.position !== position) continue;

    let pYards = 0, pRec = 0, pTgt = 0, pTd = 0;
    let pFP = 0, pUsage = 0;
    for (const e of entries) {
      if (!hasParticipation(e.stats, position)) continue;
      const s = e.stats as unknown as Record<string, number | null | undefined>;
      if (position === 'QB') {
        pTgt += (s.pass_att as number) || 0;
        pRec += (s.pass_cmp as number) || 0;
        pYards += (s.pass_yd as number) || 0;
        pTd += (s.pass_td as number) || 0;
        pFP += getEntryPoints(e.stats, 'ppr');
        pUsage += ((s.pass_att as number) || 0) + 2 * ((s.rush_att as number) || 0);
      } else if (position === 'RB') {
        pTgt += (s.rec_tgt as number) || 0;
        pRec += (s.rec as number) || 0;
        pYards += (s.rec_yd as number) || 0;
        pTd += (s.rec_td as number) || 0;
      } else {
        pTgt += (s.rec_tgt as number) || 0;
        pRec += (s.rec as number) || 0;
        pYards += (s.rec_yd as number) || 0;
        pTd += (s.rec_td as number) || 0;
      }
    }

    if (pTgt < qualThresh) continue;

    sumYards += pYards;
    sumRec += pRec;
    sumTgt += pTgt;
    sumTd += pTd;

    if (position === 'QB') {
      if (pTgt > 0) playerYPC.push(pYards / pTgt);
      if (pUsage > 0) {
        const fpu = pFP / pUsage;
        playerFPU.push(fpu);
        sumQBFP += pFP;
        sumQBUsage += pUsage;
      }
    } else {
      if (pRec > 0) playerYPC.push(pYards / pRec);
    }
    if (pTgt > 0) playerCatch.push((pRec / pTgt) * 100);
    if (pTgt > 0) playerTDRate.push((pTd / pTgt) * 100);
  }

  const result: PosBenchmarks = {
    position,
    season,
    qualThreshold: qualThresh,
    posAvg: {
      yardsPerCatch: position === 'QB' ? (sumTgt > 0 ? sumYards / sumTgt : null) : (sumRec > 0 ? sumYards / sumRec : null),
      catchPct: sumTgt > 0 ? (sumRec / sumTgt) * 100 : null,
      tdPerTarget: sumTgt > 0 ? (sumTd / sumTgt) * 100 : null,
      fpPerUsage: position === 'QB' && sumQBUsage > 0 ? sumQBFP / sumQBUsage : null,
    },
    playerValues: playerYPC.sort((a, b) => a - b),
    catchValues: playerCatch.sort((a, b) => a - b),
    tdValues: playerTDRate.sort((a, b) => a - b),
    fpPerUsageValues: position === 'QB' ? playerFPU.sort((a, b) => a - b) : undefined,
  };

  benchmarksCache.set(key, result);
  return result;
}

function computePercentile(sortedValues: number[], value: number): number | null {
  const n = sortedValues.length;
  if (n <= 1) return null;
  let rank = 0;
  for (const v of sortedValues) {
    if (v < value) rank++;
    else if (v === value) rank += 0.5;
  }
  return Math.round((rank / (n - 1)) * 100);
}

function getPlayerBenchmarks(season: number, position: string, allPlayers: Player[], playerStats: { yardsPerCatch: number; catchPct: number; tdPerTarget: number; fpPerUsage?: number }, playerTotalTgt: number) {
  if (!['QB', 'RB', 'WR', 'TE'].includes(position)) return null;
  const bench = computePositionBenchmarks(season, position, allPlayers);
  if (!bench.posAvg.yardsPerCatch && !bench.posAvg.catchPct && !bench.posAvg.tdPerTarget) return null;

  const qualThresh = position === 'WR' ? 30 : 20;
  const qualified = position === 'QB' || playerTotalTgt >= qualThresh;

  const computeStdDev = (vals: number[], minFloor = 0.5) => {
    if (vals.length < 2) return minFloor;
    const m = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.max(minFloor, Math.sqrt(vals.reduce((s, v) => s + (v - m) ** 2, 0) / vals.length));
  };

  const tdStdDev = computeStdDev(bench.tdValues);
  const fpuStdDev = bench.fpPerUsageValues ? computeStdDev(bench.fpPerUsageValues, 0.01) : undefined;

  return {
    position,
    season,
    qualifiedThreshold: qualThresh,
    posAvg: bench.posAvg,
    posStdDev: { tdPerTarget: tdStdDev, fpPerUsage: fpuStdDev },
    percentile: qualified ? {
      yardsPerCatch: computePercentile(bench.playerValues, playerStats.yardsPerCatch),
      catchPct: computePercentile(bench.catchValues, playerStats.catchPct),
      tdPerTarget: computePercentile(bench.tdValues, playerStats.tdPerTarget),
      fpPerUsage: position === 'QB' && bench.fpPerUsageValues && playerStats.fpPerUsage != null
        ? computePercentile(bench.fpPerUsageValues, playerStats.fpPerUsage) : null,
    } : null,
    playerQualified: qualified,
  };
}

function parseScoringFormat(param: unknown): ScoringFormat {
  if (param === 'standard' || param === 'half' || param === 'ppr') return param;
  return 'ppr';
}

let indexedSlugs: string[] = [];
let indexedByTeam: Record<string, Record<string, any[]>> = {};
let indexedLoaded = false;

function loadIndexedData() {
  if (indexedLoaded) return;
  indexedLoaded = true;
  if (fs.existsSync(INDEXED_FILE)) {
    const raw = JSON.parse(fs.readFileSync(INDEXED_FILE, "utf-8"));
    indexedSlugs = raw.slugs || [];
    console.log(`Loaded ${indexedSlugs.length} indexed player slugs`);
  }
  if (fs.existsSync(INDEXED_BY_TEAM_FILE)) {
    indexedByTeam = JSON.parse(fs.readFileSync(INDEXED_BY_TEAM_FILE, "utf-8"));
  }
}

function loadPlayers(): Player[] {
  const now = Date.now();
  if (playersCache && now - lastFileCheck < FILE_CHECK_INTERVAL) {
    return playersCache;
  }

  if (!fs.existsSync(PLAYERS_FILE)) {
    console.warn("data/players.json not found. Run: node scripts/buildPlayersIndex.js");
    playersCache = [];
    playersBySlug = new Map();
    return playersCache;
  }

  const stat = fs.statSync(PLAYERS_FILE);
  lastFileCheck = now;

  if (playersCache && stat.mtimeMs === lastMtimeMs) {
    return playersCache;
  }

  const raw = fs.readFileSync(PLAYERS_FILE, "utf-8");
  playersCache = JSON.parse(raw) as Player[];
  playersBySlug = new Map();
  for (const p of playersCache) {
    if (p.team) {
      p.team = normalizeTeamAbbr(p.team);
    }
    playersBySlug.set(p.slug, p);
  }
  lastMtimeMs = stat.mtimeMs;
  console.log(`Loaded ${playersCache.length} players from data/players.json`);
  return playersCache;
}

function getPlayerBySlug(slug: string): Player | undefined {
  if (!playersBySlug) loadPlayers();
  return playersBySlug?.get(slug);
}

function generatePlayerMeta(player: Player): string {
  const title = `${player.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;
  const description = `View ${player.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for 2026 NFL season.`;
  const canonical = `https://statchasers.com/nfl/players/${player.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    jobTitle: "NFL Player",
    sport: "American Football",
    url: canonical,
    ...(player.team && player.team !== "FA"
      ? { affiliation: { "@type": "SportsTeam", name: player.team, sport: "American Football" } }
      : {}),
  };
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");
}

export function injectSeoMeta(html: string, url: string): string {
  const playerMatch = url.match(/^\/nfl\/players\/([^/?]+)\/?$/);
  if (playerMatch) {
    const slug = playerMatch[1];
    const player = getPlayerBySlug(slug);
    if (player) {
      const title = `${player.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;
      const description = `View ${player.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for 2026 NFL season.`;
      const canonical = `https://statchasers.com/nfl/players/${player.slug}/`;

      html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
      html = html.replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${description}"`
      );
      html = html.replace(
        /<meta property="og:title" content="[^"]*"/,
        `<meta property="og:title" content="${title}"`
      );
      html = html.replace(
        /<meta property="og:description" content="[^"]*"/,
        `<meta property="og:description" content="${description}"`
      );
      html = html.replace(
        /<meta property="og:type" content="[^"]*"/,
        `<meta property="og:type" content="profile"`
      );
      html = html.replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${canonical}"`
      );
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: player.name,
        jobTitle: "NFL Player",
        sport: "American Football",
        url: canonical,
        ...(player.team && player.team !== "FA"
          ? { affiliation: { "@type": "SportsTeam", name: player.team, sport: "American Football" } }
          : {}),
      };
      html = html.replace(
        /<!-- SEO_META_PLACEHOLDER -->/,
        `<link rel="canonical" href="${canonical}" />\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
      );
      return html;
    }
  }

  const pageSeo: Record<string, { title: string; description: string; canonical: string }> = {
    rankings: {
      title: "Fantasy Football Rankings | StatChasers",
      description: "Weekly and season-long fantasy football rankings. Expert-curated player rankings for every position.",
      canonical: "https://statchasers.com/rankings/",
    },
    tools: {
      title: "Fantasy Football Tools | StatChasers",
      description: "Trade analyzer, draft simulator, and advanced fantasy football tools to gain your competitive edge.",
      canonical: "https://statchasers.com/tools/",
    },
    articles: {
      title: "Fantasy Football Articles & Analysis | StatChasers",
      description: "Expert fantasy football analysis, waiver wire targets, matchup breakdowns, and weekly insights.",
      canonical: "https://statchasers.com/articles/",
    },
  };

  const pageMatch = url.match(/^\/(rankings|tools|articles)\/?$/);
  if (pageMatch) {
    const info = pageSeo[pageMatch[1]];
    if (info) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${info.title}</title>`);
      html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${info.description}"`);
      html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${info.title}"`);
      html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${info.description}"`);
      html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${info.canonical}"`);
      html = html.replace(/<!-- SEO_META_PLACEHOLDER -->/, `<link rel="canonical" href="${info.canonical}" />`);
      return html;
    }
  }

  if (url === "/nfl/players" || url === "/nfl/players/") {
    const title = "NFL Player Database | StatChasers";
    const desc = "Search and browse fantasy football profiles for over 4,000 NFL players. Stats, trends, and insights.";
    const canonical = "https://statchasers.com/nfl/players";
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`);
    html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`);
    html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
    html = html.replace(/<!-- SEO_META_PLACEHOLDER -->/, `<link rel="canonical" href="${canonical}" />`);
    return html;
  }

  html = html.replace(/<!-- SEO_META_PLACEHOLDER -->/, "");
  return html;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  loadPlayers();
  loadIndexedData();

  app.use("/api", (req, res, next) => {
    const origin = req.headers.origin;
    const allowed = ["https://statchasers.com", "https://www.statchasers.com"];
    if (origin && allowed.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Max-Age", "86400");
      res.setHeader("Vary", "Origin");
    }
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  app.get("/api/indexed-players", (_req, res) => {
    loadIndexedData();
    res.set("Cache-Control", "public, max-age=3600");
    res.json({ slugs: indexedSlugs || [], byTeam: indexedByTeam || {} });
  });

  app.get("/api/players", (_req, res) => {
    const players = loadPlayers();
    const lightweight = players
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        team: p.team,
        position: p.position,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    res.set("Cache-Control", "public, max-age=3600");
    res.json(lightweight);
  });

  app.get("/api/players/:slug", (req, res) => {
    loadPlayers();
    const player = getPlayerBySlug(req.params.slug);
    if (!player) {
      return res.status(404).json({ error: "not_found" });
    }
    const allPlayers = loadPlayers();
    const seasons = getAvailableSeasons();
    const format = parseScoringFormat(req.query.format);

    let activeSeason = seasons[0] || new Date().getFullYear();
    let playerLogs: GameLogEntry[] = [];
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

    const multiSeasonStats: { season: number; ppg: number; gamesPlayed: number; pos1Pct: number; pos2Pct: number; pos3Pct: number; bustPct: number }[] = [];
    const careerSeasonStats: {
      season: number; gp: number; ppg: number; posRank: number | null;
      pass_att: number; pass_cmp: number; pass_yd: number; pass_td: number; pass_int: number;
      rush_att: number; rush_yd: number; rush_td: number;
      targets: number; receptions: number; rec_yd: number; rec_td: number;
      total_td: number; scrimmage_yd: number;
    }[] = [];

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
      const pos1Games = ranked.filter(e => e.pos_rank! >= 1 && e.pos_rank! <= 12).length;
      const pos2End = hasTier3 ? 24 : bustThresh;
      const pos2Games = ranked.filter(e => e.pos_rank! >= 13 && e.pos_rank! <= pos2End).length;
      const pos3Games = hasTier3 ? ranked.filter(e => e.pos_rank! >= 25 && e.pos_rank! <= bustThresh).length : 0;
      const bustGames = ranked.filter(e => e.pos_rank! > bustThresh).length;

      multiSeasonStats.push({
        season: s,
        ppg: totalPts / gp,
        gamesPlayed: gp,
        pos1Pct: (pos1Games / gp) * 100,
        pos2Pct: (pos2Games / gp) * 100,
        pos3Pct: (pos3Games / gp) * 100,
        bustPct: (bustGames / gp) * 100,
      });

      let pass_att = 0, pass_cmp = 0, pass_yd = 0, pass_td = 0, pass_int = 0;
      let rush_att = 0, rush_yd = 0, rush_td = 0;
      let targets = 0, receptions = 0, rec_yd = 0, rec_td = 0;
      for (const e of played) {
        const st = e.stats as unknown as Record<string, number | null | undefined>;
        pass_att += (st.pass_att as number) || 0;
        pass_cmp += (st.pass_cmp as number) || 0;
        pass_yd += (st.pass_yd as number) || 0;
        pass_td += (st.pass_td as number) || 0;
        pass_int += (st.pass_int as number) || 0;
        rush_att += (st.rush_att as number) || 0;
        rush_yd += (st.rush_yd as number) || 0;
        rush_td += (st.rush_td as number) || 0;
        targets += (st.rec_tgt as number) || 0;
        receptions += (st.rec as number) || 0;
        rec_yd += (st.rec_yd as number) || 0;
        rec_td += (st.rec_td as number) || 0;
      }
      const total_td = pass_td + rush_td + rec_td;
      const scrimmage_yd = rush_yd + rec_yd;

      const seasonPpgAll: { id: string; ppg: number }[] = [];
      for (const [pid, pl] of Object.entries(sLogs)) {
        const p = allPlayers.find(ap => ap.id === pid);
        if (!p || p.position !== player.position) continue;
        const pp = pl.filter(e => hasParticipation(e.stats, p.position));
        if (pp.length < 4) continue;
        const tp = pp.reduce((sum, e) => sum + getEntryPoints(e.stats, format), 0);
        seasonPpgAll.push({ id: pid, ppg: tp / pp.length });
      }
      seasonPpgAll.sort((a, b) => b.ppg - a.ppg);
      const posIdx = seasonPpgAll.findIndex(x => x.id === player.id);
      const posRank = posIdx >= 0 ? posIdx + 1 : null;

      careerSeasonStats.push({
        season: s, gp, ppg: totalPts / gp, posRank,
        pass_att, pass_cmp, pass_yd, pass_td, pass_int,
        rush_att, rush_yd, rush_td,
        targets, receptions, rec_yd, rec_td,
        total_td, scrimmage_yd,
      });
    }

    let careerProfile: {
      ppg: number; gamesPlayed: number; maxGames: number; durabilityPct: number;
      pos1Pct: number; pos2Pct: number; pos3Pct: number; bustPct: number;
      volatility: number; volatilityLabel: string;
      seasons: number; seasonPpgs: { season: number; ppg: number }[];
      smallSample: boolean;
    } | null = null;

    const threeYearSeasons = [activeSeason, activeSeason - 1, activeSeason - 2];
    const threeYearStats = multiSeasonStats.filter(m => threeYearSeasons.includes(m.season));
    const threeYearPtsFiltered = (() => {
      const pts: number[] = [];
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
        p1 += rankedPlayed.filter(e => e.pos_rank! >= 1 && e.pos_rank! <= 12).length;
        p2 += rankedPlayed.filter(e => e.pos_rank! >= 13 && e.pos_rank! <= pos2End).length;
        p3 += hasTier3 ? rankedPlayed.filter(e => e.pos_rank! >= 25 && e.pos_rank! <= bustThresh).length : 0;
        bust += rankedPlayed.filter(e => e.pos_rank! > bustThresh).length;
      }
      return { pts, p1, p2, p3, bust };
    })();

    if (threeYearStats.length > 1) {
      const totalGp = threeYearPtsFiltered.pts.length;
      const maxGames = threeYearStats.length * 17;
      const totalPts = threeYearPtsFiltered.pts.reduce((a, b) => a + b, 0);
      const ppg = totalGp > 0 ? totalPts / totalGp : 0;
      const mean = ppg;
      const variance = totalGp > 1
        ? threeYearPtsFiltered.pts.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (totalGp - 1)
        : 0;
      const vol = Math.sqrt(variance);
      const volLabel = vol < 6 ? 'Low' : vol < 9 ? 'Moderate' : 'High';

      careerProfile = {
        ppg,
        gamesPlayed: totalGp,
        maxGames,
        durabilityPct: maxGames > 0 ? (totalGp / maxGames) * 100 : 0,
        pos1Pct: totalGp > 0 ? (threeYearPtsFiltered.p1 / totalGp) * 100 : 0,
        pos2Pct: totalGp > 0 ? (threeYearPtsFiltered.p2 / totalGp) * 100 : 0,
        pos3Pct: totalGp > 0 ? (threeYearPtsFiltered.p3 / totalGp) * 100 : 0,
        bustPct: totalGp > 0 ? (threeYearPtsFiltered.bust / totalGp) * 100 : 0,
        volatility: vol,
        volatilityLabel: volLabel,
        seasons: threeYearStats.length,
        seasonPpgs: threeYearStats.map(m => ({ season: m.season, ppg: m.ppg })),
        smallSample: totalGp < 8,
      };
    }

    let seasonRank: number | null = null;
    if (gamesPlayed > 0 && player.position) {
      const seasonLogs = loadGameLogs(activeSeason);
      const ppgByPlayer: { id: string; ppg: number }[] = [];
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
    const trends: import("@shared/playerTypes").PlayerTrends | null =
      weeklyPts.length > 0 ? { weeklyFantasyPoints: weeklyPts } : null;

    const dynastyRankings = loadDynastyRankings();
    const dynasty = dynastyRankings[player.slug] || null;

    let productionRiskBenchmarks: ReturnType<typeof getPlayerBenchmarks> = null;
    if (player.position && gamesPlayed > 0) {
      const pos = player.position;
      const isQB = pos === 'QB';
      const isRB = pos === 'RB';
      let pYards = 0, pRec = 0, pTgt = 0, pTd = 0;
      for (const e of playedLogs) {
        const s = e.stats as unknown as Record<string, number | null | undefined>;
        if (isQB) {
          pTgt += (s.pass_att as number) || 0;
          pRec += (s.pass_cmp as number) || 0;
          pYards += (s.pass_yd as number) || 0;
          pTd += (s.pass_td as number) || 0;
        } else {
          pTgt += (s.rec_tgt as number) || 0;
          pRec += (s.rec as number) || 0;
          pYards += (s.rec_yd as number) || 0;
          pTd += (s.rec_td as number) || 0;
        }
      }
      const ypc = isQB ? (pTgt > 0 ? pYards / pTgt : 0) : (pRec > 0 ? pYards / pRec : 0);
      const cp = pTgt > 0 ? (pRec / pTgt) * 100 : 0;
      const tdR = pTgt > 0 ? (pTd / pTgt) * 100 : 0;
      let fpuVal: number | undefined;
      if (isQB) {
        const totalFP = playedLogs.reduce((sum, e) => sum + getEntryPoints(e.stats, format), 0);
        let totalUsage = 0;
        for (const e of playedLogs) {
          const s = e.stats as unknown as Record<string, number | null | undefined>;
          totalUsage += ((s.pass_att as number) || 0) + 2 * ((s.rush_att as number) || 0);
        }
        fpuVal = totalUsage > 0 ? totalFP / totalUsage : undefined;
      }
      productionRiskBenchmarks = getPlayerBenchmarks(activeSeason, pos, allPlayers, { yardsPerCatch: ypc, catchPct: cp, tdPerTarget: tdR, fpPerUsage: fpuVal }, pTgt);
    }

    const enriched = {
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
      careerSeasonStats,
      careerProfile,
      dynasty,
      productionRiskBenchmarks,
    };
    res.set("Cache-Control", "public, max-age=3600");
    res.json(enriched);
  });

  app.get("/api/players/:slug/news", (req, res) => {
    loadPlayers();
    const player = getPlayerBySlug(req.params.slug);
    if (!player) {
      return res.status(404).json({ error: "not_found" });
    }
    res.set("Cache-Control", "public, max-age=3600");
    res.json([]);
  });

  app.get("/api/players/:slug/game-log", (req, res) => {
    loadPlayers();
    const player = getPlayerBySlug(req.params.slug);
    if (!player) {
      return res.status(404).json({ error: "not_found" });
    }
    const allPlayers = loadPlayers();
    const seasons = getAvailableSeasons();
    const seasonParam = parseInt(req.query.season as string, 10);
    const season = !isNaN(seasonParam) && seasons.includes(seasonParam) ? seasonParam : (seasons[0] || new Date().getFullYear());
    const format = parseScoringFormat(req.query.format);
    const logs = loadGameLogs(season);
    const ranks = buildWeeklyRanks(season, logs, allPlayers, format);
    let playerLogs = attachRanks(logs[player.id] || [], player.id, ranks);
    const oppRanks = buildOppRanks(season, logs, allPlayers, format);
    playerLogs = attachOppRanks(playerLogs, player.position, oppRanks);
    playerLogs = enrichWithTeamMetrics(playerLogs, player.team, season, logs, allPlayers);
    playerLogs = fillMissingWeeks(playerLogs, season, player.team);
    res.set("Cache-Control", "public, max-age=3600");
    res.json(playerLogs);
  });

  app.get("/api/players/:slug/related", (req, res) => {
    const allPlayers = loadPlayers();
    const player = getPlayerBySlug(req.params.slug);
    if (!player) {
      return res.status(404).json({ error: "not_found" });
    }

    const format = (req.query.format as string) || "ppr";
    const seasonParam = req.query.season ? parseInt(req.query.season as string, 10) : null;
    const radius = 3;

    const availableSeasons = [2025, 2024, 2023].filter(s => {
      try { loadGameLogs(s); return true; } catch { return false; }
    });
    const activeSeason = seasonParam && availableSeasons.includes(seasonParam) ? seasonParam : availableSeasons[0] || 2025;

    if (!player.position) {
      return res.json([]);
    }

    const seasonLogs = loadGameLogs(activeSeason);
    const ppgByPlayer: { id: string; ppg: number; totalPts: number; gp: number }[] = [];
    for (const [pid, pLogs] of Object.entries(seasonLogs)) {
      const p = allPlayers.find(ap => ap.id === pid);
      if (!p || p.position !== player.position) continue;
      const played = pLogs.filter(e => hasParticipation(e.stats, p.position));
      if (played.length < 4) continue;
      const totalPts = played.reduce((sum, e) => sum + getEntryPoints(e.stats, format as any), 0);
      ppgByPlayer.push({ id: pid, ppg: totalPts / played.length, totalPts, gp: played.length });
    }
    ppgByPlayer.sort((a, b) => b.ppg - a.ppg);

    const currentIdx = ppgByPlayer.findIndex(x => x.id === player.id);
    if (currentIdx === -1) {
      return res.json([]);
    }

    const currentRank = currentIdx + 1;
    const start = Math.max(0, currentIdx - radius);
    const end = Math.min(ppgByPlayer.length, currentIdx + radius + 1);
    const neighbors = ppgByPlayer
      .slice(start, end)
      .filter(x => x.id !== player.id);

    const result = neighbors.map(n => {
      const p = allPlayers.find(ap => ap.id === n.id);
      const rank = ppgByPlayer.indexOf(n) + 1;
      return {
        id: n.id,
        name: p?.name || "",
        slug: p?.slug || "",
        team: p?.team || "",
        position: p?.position || "",
        posRank: rank,
        ppg: Math.round(n.ppg * 10) / 10,
      };
    });

    res.set("Cache-Control", "public, max-age=3600");
    res.json({
      neighbors: result,
      currentRank,
      season: activeSeason,
      format,
      position: player.position,
    });
  });

  const patriotsRosterCache: { ts: number; map: Map<string, string> } = { ts: 0, map: new Map() };
  const ROSTER_TTL = 6 * 60 * 60 * 1000;
  const patriotsNewsCache: Map<string, { ts: number; items: any[] }> = new Map();
  const NEWS_TTL = 30 * 60 * 1000;

  function normName(name: string): string {
    return name.toLowerCase().replace(/\./g, "").replace(/['']/g, "").replace(/\s+(jr|sr|ii|iii|iv|v)\b/g, "").replace(/\s+/g, " ").trim();
  }

  async function fetchHtml(url: string): Promise<string> {
    const res = await fetch(url, {
      headers: {
        "user-agent": "StatChasersBot/1.0 (+https://statchasers.com)",
        "accept-language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
    return await res.text();
  }

  async function getPatriotsRosterMap(): Promise<Map<string, string>> {
    const now = Date.now();
    if (patriotsRosterCache.map.size && now - patriotsRosterCache.ts < ROSTER_TTL) {
      return patriotsRosterCache.map;
    }
    const html = await fetchHtml("https://www.patriots.com/team/players-roster/");
    const $ = cheerio.load(html);
    const map = new Map<string, string>();
    $('a[href*="/team/players-roster/"]').each((_, a) => {
      const href = $(a).attr("href");
      const text = $(a).text().trim();
      if (!href || !text || text.length < 3) return;
      if (href === "/team/players-roster/" || href.endsWith("/index")) return;
      const full = href.startsWith("http") ? href : `https://www.patriots.com${href}`;
      map.set(normName(text), full);
    });
    patriotsRosterCache.ts = now;
    patriotsRosterCache.map = map;
    return map;
  }

  function extractRelatedContent($: cheerio.CheerioAPI): { title: string; url: string; type: string }[] {
    const results: { title: string; url: string; type: string }[] = [];
    const seen = new Set<string>();

    for (const sectionLabel of ["Related News", "Related Videos"]) {
      const heading = $("h2").filter((_, el) => $(el).text().trim() === sectionLabel).first();
      if (!heading.length) continue;
      const grid = heading.closest(".d3-l-grid--inner");
      if (!grid.length) continue;
      const linkSelector = sectionLabel.includes("Video") ? 'a[href*="/video/"]' : 'a[href*="/news/"]';
      grid.find(linkSelector).each((_, a) => {
        const el = $(a);
        const href = el.attr("href");
        if (!href) return;
        const url = href.startsWith("http") ? href : `https://www.patriots.com${href}`;
        if (seen.has(url)) return;
        seen.add(url);
        const h3 = el.find("h3").first();
        const rawText = (h3.length ? h3.text() : el.text()).replace(/\s+/g, " ").trim();
        if (rawText.length < 5) return;
        const parts = rawText.split(" ");
        const first = parts[0].toLowerCase();
        const isTypePrefix = ["news", "video", "audio"].includes(first);
        const type = isTypePrefix ? first : (sectionLabel.includes("Video") ? "video" : "news");
        let title = isTypePrefix ? rawText.slice(first.length).trim() : rawText;
        title = title.replace(/Read the full .*$/, "").replace(/Watch the .*$/, "").trim();
        if (title.length > 3) results.push({ title, url, type });
      });
    }
    return results;
  }

  app.get("/api/patriots/player-news", async (req, res) => {
    try {
      const playerName = (req.query.player_name || "").toString().trim();
      const limit = Math.min(parseInt(req.query.limit as string || "6", 10), 10);

      if (!playerName) {
        return res.status(400).json({ error: "player_name is required" });
      }

      const cacheKey = normName(playerName);
      const cached = patriotsNewsCache.get(cacheKey);
      if (cached && Date.now() - cached.ts < NEWS_TTL) {
        const rosterMap = await getPatriotsRosterMap();
        return res.json({
          player_name: playerName,
          found: true,
          patriots_profile_url: rosterMap.get(cacheKey) || null,
          items: cached.items.slice(0, limit),
          cached: true,
        });
      }

      const rosterMap = await getPatriotsRosterMap();
      const profileUrl = rosterMap.get(cacheKey);

      if (!profileUrl) {
        return res.json({ player_name: playerName, found: false, items: [] });
      }

      const html = await fetchHtml(profileUrl);
      const $ = cheerio.load(html);
      const items = extractRelatedContent($);

      patriotsNewsCache.set(cacheKey, { ts: Date.now(), items });

      res.json({
        player_name: playerName,
        found: true,
        patriots_profile_url: profileUrl,
        items: items.slice(0, limit),
      });
    } catch (e: any) {
      console.error("Patriots news error:", e.message);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  const patriotsInjuryCache: { ts: number; data: any; reportLabel: string } = { ts: 0, data: null, reportLabel: '' };
  const INJURY_TTL = 30 * 60 * 1000;

  function cleanText(s: string | null | undefined): string {
    return String(s || "").replace(/\s+/g, " ").trim();
  }

  function statusWord(s: string): string {
    const t = cleanText(s).toUpperCase();
    if (!t || t === "(-)" || t === "-") return "";
    return t;
  }

  function isRest(injuryText: string): boolean {
    const t = cleanText(injuryText).toLowerCase();
    return t.includes("not injury related") || t.includes("nir") || t.includes("rest");
  }

  function practiceSummary(wed: string, thu: string, fri: string): string {
    const seq = [wed, thu, fri].map(x => cleanText(x).toUpperCase()).filter(Boolean);
    if (!seq.length) return "";
    const joined = seq.join(" ");
    if (joined === "FP FP FP") return "practiced fully all week";
    if (joined === "LP LP LP") return "was limited all week";
    if (joined === "DNP DNP DNP") return "did not practice all week";
    const score = (v: string) => (v === "DNP" ? 0 : v === "LP" ? 1 : v === "FP" ? 2 : 1);
    const nums = [wed, thu, fri].map(x => cleanText(x).toUpperCase()).filter(Boolean).map(score);
    if (nums.length >= 2) {
      if (nums[nums.length - 1] > nums[0]) return "showed improving practice participation";
      if (nums[nums.length - 1] < nums[0]) return "showed decreasing practice participation";
    }
    return "had mixed practice participation";
  }

  function capitalize(s: string): string {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function injuryLabel(raw: string): string {
    const t = cleanText(raw).toLowerCase();
    if (!t || t.includes('injury') || t.includes('illness') || t.includes('rest') || t.includes('personal') || t.includes('nir')) return cleanText(raw);
    return `a ${cleanText(raw).toLowerCase()} injury`;
  }

  function buildInjuryBlurb(opts: { player_name: string; injury: string; wed: string; thu: string; fri: string; game_status: string; week_label: string }): string {
    const injuryTxt = cleanText(opts.injury);
    const gs = statusWord(opts.game_status);
    const ps = practiceSummary(opts.wed, opts.thu, opts.fri);
    const injLabel = injuryLabel(injuryTxt);

    if (isRest(injuryTxt)) {
      return `${opts.player_name} was listed as not injury related/rest. ${ps ? `${capitalize(ps)}.` : ""}`.trim();
    }
    if (!injuryTxt) {
      return `${opts.player_name} has no listed injury detail on the latest report.`.trim();
    }
    if (gs) {
      const expected =
        gs === "OUT" ? "Not expected to play." :
        gs === "DOUBTFUL" ? "Unlikely to play." :
        gs === "QUESTIONABLE" ? "Truly questionable to play." :
        "Status unclear.";
      return `${opts.player_name} is dealing with ${injLabel}${opts.week_label ? ` heading into ${opts.week_label}` : ""}. ${ps ? `${capitalize(ps)}, and` : ""} is listed as ${gs}. ${expected}`.replace(/\s+/g, " ").trim();
    }
    const end = cleanText(opts.fri || opts.thu || opts.wed).toUpperCase();
    const likelyPlay = end === "FP";
    return `${opts.player_name} is dealing with ${injLabel}${opts.week_label ? ` heading into ${opts.week_label}` : ""}. ${ps ? `${capitalize(ps)} and` : ""} is not listed with a game designation${likelyPlay ? " \u2014 expected to play." : "."}`.replace(/\s+/g, " ").trim();
  }

  app.get("/api/patriots/injury", async (req, res) => {
    try {
      const playerName = cleanText(req.query.player_name as string);
      const weekLabel = cleanText(req.query.week_label as string);

      if (!playerName) return res.status(400).json({ error: "player_name is required" });

      const now = Date.now();
      let allRows: any[] = [];

      if (patriotsInjuryCache.data && now - patriotsInjuryCache.ts < INJURY_TTL) {
        allRows = patriotsInjuryCache.data;
      } else {
        const url = "https://www.patriots.com/team/injury-report/";
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);
        const table = $("table").first();

        let reportLabel = '';
        const headingEl = $("h1, h2, h3, .nfl-o-matchup-cards__title, .d3-o-section-title").first();
        if (headingEl.length) {
          const raw = cleanText(headingEl.text());
          const match = raw.match(/(?:Week\s+\d+|Wild Card|Divisional|Conference|Super Bowl|Pro Bowl)/i);
          if (match) reportLabel = match[0];
        }
        const captionEl = table.find("caption").first();
        if (!reportLabel && captionEl.length) {
          const cap = cleanText(captionEl.text());
          const capMatch = cap.match(/(?:Week\s+\d+|Wild Card|Divisional|Conference|Super Bowl|Pro Bowl)/i);
          if (capMatch) reportLabel = capMatch[0];
        }
        if (!reportLabel) {
          const pageText = $("body").text();
          const weekMatch = pageText.match(/(?:Week\s+\d+|Wild Card|Divisional|Conference Championship|Super Bowl|Pro Bowl)/i);
          if (weekMatch) reportLabel = weekMatch[0];
        }
        patriotsInjuryCache.reportLabel = reportLabel;

        if (table.length) {
          const headers: string[] = [];
          table.find("thead th").each((_, th) => { headers.push(cleanText($(th).text()).toLowerCase()); });

          const idx = {
            player: headers.findIndex(h => h.includes("player")),
            position: headers.findIndex(h => h.includes("pos")),
            injury: headers.findIndex(h => h.includes("injury")),
            wed: headers.findIndex(h => h === "wed"),
            thu: headers.findIndex(h => h === "thu"),
            fri: headers.findIndex(h => h === "fri"),
            status: headers.findIndex(h => h.includes("status") || h.includes("designation")),
          };

          table.find("tbody tr").each((_, tr) => {
            const tds = $(tr).find("td");
            if (!tds.length) return;
            const playerCell = idx.player >= 0 ? tds.eq(idx.player) : tds.eq(0);
            const name = cleanText(playerCell.text());
            if (!name) return;
            allRows.push({
              player_name: name,
              norm: normName(name),
              position: idx.position >= 0 ? cleanText(tds.eq(idx.position).text()) : "",
              injury: idx.injury >= 0 ? cleanText(tds.eq(idx.injury).text()) : "",
              practice: {
                wed: idx.wed >= 0 ? cleanText(tds.eq(idx.wed).text()) : "",
                thu: idx.thu >= 0 ? cleanText(tds.eq(idx.thu).text()) : "",
                fri: idx.fri >= 0 ? cleanText(tds.eq(idx.fri).text()) : "",
              },
              game_status: idx.status >= 0 ? cleanText(tds.eq(idx.status).text()) : "",
            });
          });
        }

        let reportUpdatedAt: string | null = null;
        const metaCandidates = [
          $('meta[property="article:modified_time"]').attr("content"),
          $('meta[property="article:published_time"]').attr("content"),
          $('meta[name="last-modified"]').attr("content"),
        ].filter(Boolean);
        for (const c of metaCandidates) {
          const d = new Date(c!);
          if (!isNaN(d.getTime())) { reportUpdatedAt = d.toISOString(); break; }
        }
        if (!reportUpdatedAt) {
          const bodyText = $("body").text().replace(/\s+/g, " ").trim();
          const m = bodyText.match(/Updated\s+([A-Za-z]{3,9}\s+\d{1,2},\s+\d{4})/i);
          if (m?.[1]) {
            const d = new Date(m[1]);
            if (!isNaN(d.getTime())) reportUpdatedAt = d.toISOString();
          }
        }

        patriotsInjuryCache.ts = now;
        patriotsInjuryCache.data = allRows;
        (patriotsInjuryCache as any).reportUpdatedAt = reportUpdatedAt;
      }

      const target = normName(playerName);
      const rowData = allRows.find((r: any) => r.norm === target);

      const reportLabel = patriotsInjuryCache.reportLabel || '';

      const reportUpdatedAt = (patriotsInjuryCache as any).reportUpdatedAt || null;

      if (!rowData) {
        return res.json({
          found: false,
          player_name: playerName,
          blurb: `No injury designation listed for ${playerName} on the latest report.`,
          source: "Patriots.com",
          source_url: "https://www.patriots.com/team/injury-report/",
          report_label: reportLabel,
          report_updated_at: reportUpdatedAt,
          fetched_at: new Date().toISOString(),
        });
      }

      const blurb = buildInjuryBlurb({
        player_name: rowData.player_name,
        injury: rowData.injury,
        wed: rowData.practice.wed,
        thu: rowData.practice.thu,
        fri: rowData.practice.fri,
        game_status: rowData.game_status,
        week_label: weekLabel || reportLabel,
      });

      res.json({
        found: true,
        player_name: rowData.player_name,
        injury: rowData.injury,
        position: rowData.position,
        practice: rowData.practice,
        game_status: rowData.game_status,
        blurb,
        source: "Patriots.com",
        source_url: "https://www.patriots.com/team/injury-report/",
        report_label: reportLabel,
        report_updated_at: reportUpdatedAt,
        fetched_at: new Date().toISOString(),
      });
    } catch (e: any) {
      console.error("Patriots injury error:", e.message);
      res.status(500).json({ error: "Failed to fetch injury report" });
    }
  });

  app.get("/sitemap.xml", (_req, res) => {
    loadIndexedData();
    const baseUrl = "https://statchasers.com";
    const staticPages = [
      { loc: "/", priority: "1.0", changefreq: "daily" },
      { loc: "/rankings/", priority: "0.8", changefreq: "daily" },
      { loc: "/tools/", priority: "0.7", changefreq: "weekly" },
      { loc: "/articles/", priority: "0.8", changefreq: "daily" },
      { loc: "/nfl/players/", priority: "0.7", changefreq: "weekly" },
    ];

    const slugsToUse = indexedSlugs.length > 0
      ? indexedSlugs
      : loadPlayers().slice(0, 300).map((p) => p.slug);

    const playerPages = slugsToUse.map((slug) => ({
      loc: `/nfl/players/${slug}/`,
      priority: "0.6",
      changefreq: "weekly",
    }));

    const allPages = [...staticPages, ...playerPages];
    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const page of allPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
    xml += `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  });

  app.get("/sitemap-players.xml", (_req, res) => {
    const players = loadPlayers();
    const baseUrl = "https://statchasers.com";
    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    const subset = players.slice(0, 300);
    for (const p of subset) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/nfl/players/${p.slug}/</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }
    xml += `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

  app.get("/robots.txt", (_req, res) => {
    const txt = [
      "User-agent: *",
      "Allow: /",
      "",
      "Sitemap: https://statchasers.com/sitemap.xml",
      "Sitemap: https://statchasers.com/sitemap-players.xml",
    ].join("\n");
    res.set("Content-Type", "text/plain");
    res.send(txt);
  });

  app.use((req, res, next) => {
    if (
      req.path.startsWith("/api") ||
      req.path === "/sitemap.xml" ||
      req.path === "/sitemap-players.xml" ||
      req.path === "/robots.txt"
    ) {
      return next();
    }

    const originalEnd = res.end;
    const reqPath = req.path;
    res.end = function (chunk?: any, encoding?: any, cb?: any) {
      const contentType = res.getHeader("Content-Type")?.toString() || "";
      if (contentType.includes("text/html") && typeof chunk === "string") {
        chunk = injectSeoMeta(chunk, reqPath);
      }
      return originalEnd.call(this, chunk, encoding, cb);
    } as any;
    next();
  });

  return httpServer;
}

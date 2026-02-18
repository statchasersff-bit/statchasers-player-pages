import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import type { Player, GameLogEntry } from "@shared/playerTypes";
import { normalizeTeamAbbr, TEAM_ALIAS_MAP } from "@shared/teamMappings";

let playersCache: Player[] | null = null;
let playersBySlug: Map<string, Player> | null = null;
let lastMtimeMs: number = 0;
let lastFileCheck: number = 0;
const FILE_CHECK_INTERVAL = 10 * 60 * 1000;
const PLAYERS_FILE = path.resolve(process.cwd(), "data", "players.json");
const INDEXED_FILE = path.resolve(process.cwd(), "data", "indexed_players.json");
const INDEXED_BY_TEAM_FILE = path.resolve(process.cwd(), "data", "indexed_players_by_team.json");
const GAME_LOGS_DIR = path.resolve(process.cwd(), "data", "game_logs");

const gameLogsCache: Map<number, Record<string, GameLogEntry[]>> = new Map();
const weeklyRanksCache: Map<number, Map<string, Map<number, number>>> = new Map();

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

function buildWeeklyRanks(season: number, logs: Record<string, GameLogEntry[]>, players: Player[]): Map<string, Map<number, number>> {
  if (weeklyRanksCache.has(season)) return weeklyRanksCache.get(season)!;

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
      posBucket.get(pos)!.push({ playerId, pts: entry.stats.pts_ppr });
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

  weeklyRanksCache.set(season, rankMap);
  return rankMap;
}

function attachRanks(entries: GameLogEntry[], playerId: string, ranks: Map<string, Map<number, number>>): GameLogEntry[] {
  const playerRanks = ranks.get(playerId);
  if (!playerRanks) return entries;
  return entries.map(e => ({ ...e, pos_rank: playerRanks.get(e.week) ?? null }));
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

    let activeSeason = seasons[0] || new Date().getFullYear();
    let playerLogs: GameLogEntry[] = [];
    for (const s of seasons) {
      const sLogs = loadGameLogs(s);
      const pLogs = sLogs[player.id] || [];
      const hasStats = pLogs.some(e => hasParticipation(e.stats, player.position));
      if (hasStats) {
        activeSeason = s;
        const ranks = buildWeeklyRanks(s, sLogs, allPlayers);
        playerLogs = attachRanks(pLogs, player.id, ranks);
        break;
      }
    }

    const playedLogs = playerLogs.filter(e => hasParticipation(e.stats, player.position));
    const gamesPlayed = playedLogs.length;
    const maxWeek = playedLogs.length > 0 ? Math.max(...playedLogs.map(e => e.week)) : 0;
    const isSeasonComplete = maxWeek >= 17;
    const seasonLabel = gamesPlayed > 0
      ? (isSeasonComplete ? `${activeSeason} Season Final` : `${activeSeason} Season (Through Week ${maxWeek})`)
      : null;

    const multiSeasonStats: { season: number; ppg: number; gamesPlayed: number; pos1Pct: number; pos2Pct: number; pos3Pct: number; bustPct: number }[] = [];

    for (const s of seasons) {
      const sLogs = loadGameLogs(s);
      const pLogs = sLogs[player.id] || [];
      const played = pLogs.filter(e => hasParticipation(e.stats, player.position));
      if (played.length === 0) continue;
      const ranks = buildWeeklyRanks(s, sLogs, allPlayers);
      const rankedLogs = attachRanks(pLogs, player.id, ranks);
      const gp = played.length;
      const totalPts = played.reduce((sum, e) => sum + e.stats.pts_ppr, 0);
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
        played.forEach(e => pts.push(e.stats.pts_ppr));
        const ranks = buildWeeklyRanks(s, sLogs, allPlayers);
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
        const totalPts = played.reduce((sum, e) => sum + e.stats.pts_ppr, 0);
        ppgByPlayer.push({ id: pid, ppg: totalPts / played.length });
      }
      ppgByPlayer.sort((a, b) => b.ppg - a.ppg);
      const idx = ppgByPlayer.findIndex(x => x.id === player.id);
      if (idx >= 0) seasonRank = idx + 1;
    }

    const weeklyPts = playedLogs.map(e => e.stats.pts_ppr);
    const trends: import("@shared/playerTypes").PlayerTrends | null =
      weeklyPts.length > 0 ? { weeklyFantasyPoints: weeklyPts } : null;

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
      careerProfile,
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
    const logs = loadGameLogs(season);
    const ranks = buildWeeklyRanks(season, logs, allPlayers);
    const playerLogs = attachRanks(logs[player.id] || [], player.id, ranks);
    res.set("Cache-Control", "public, max-age=3600");
    res.json(playerLogs);
  });

  app.get("/api/players/:slug/related", (req, res) => {
    const players = loadPlayers();
    const player = getPlayerBySlug(req.params.slug);
    if (!player) {
      return res.status(404).json({ error: "not_found" });
    }
    const samePos = players.filter(
      (p) => p.position === player.position && p.slug !== player.slug && p.team !== "FA"
    );
    const shuffled = samePos.sort(() => Math.random() - 0.5).slice(0, 6);
    const lightweight = shuffled.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      team: p.team,
      position: p.position,
    }));
    res.set("Cache-Control", "public, max-age=3600");
    res.json(lightweight);
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

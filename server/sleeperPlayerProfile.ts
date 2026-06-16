/**
 * Sleeper-backed player profile data for the "Game Log 2" tab.
 *
 * Two layers, both normalized server-side and disk-cached. The client never
 * calls Sleeper directly.
 *
 *  1. Season production  -> getPlayerProduction(playerId, scoring)
 *     Source: https://api.sleeper.app/v1/stats/nfl/regular/{season}  (official /v1 host)
 *
 *  2. Weekly game logs   -> getPlayerGameLogs(playerId, season, seasonType)
 *     Source: https://api.sleeper.com/stats/nfl/player/{id}?season_type=...&season=...&grouping=week
 *             (UNOFFICIAL api.sleeper.com host — works today, can break without notice)
 *
 * The single most important / least obvious piece is the participation gate in
 * normalizeGameLogs(): Sleeper returns a non-null entry even for weeks a player
 * did not play (injured/inactive weeks come back with only team snap counts and
 * no player stats). Counting those as "played" corrupts availability math, so a
 * row only survives if there is real evidence of play.
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Public types (mirrored on the client in client/src/lib/sleeperApi.ts)
// ---------------------------------------------------------------------------

export type SleeperScoring = "std" | "half_ppr" | "ppr";
export type SleeperSeasonType = "regular" | "post";

export interface ScoringLine {
  /** Season total points in this scoring format. */
  total: number;
  /** Points per game (total / gamesPlayed). 0 when no games. */
  ppg: number;
  /** Positional finish ranked by season total points (1 = best). null if no games. */
  posFinishTotal: number | null;
  /** Positional finish ranked by points-per-game (1 = best). null if no games. */
  posFinishPpg: number | null;
}

export interface ProductionSeason {
  season: number;
  position: string | null;
  gamesPlayed: number;
  std: ScoringLine;
  half: ScoringLine;
  ppr: ScoringLine;
}

export interface GameLogRow {
  week: number;
  seasonType: SleeperSeasonType;
  opp: string | null;
  team: string | null;
  /** player snaps / team offensive snaps * 100, or null when unknown. */
  snapPct: number | null;
  ptsStd: number;
  ptsHalf: number;
  ptsPpr: number;
  passCmp: number;
  passAtt: number;
  passYd: number;
  passTd: number;
  passInt: number;
  rushAtt: number;
  rushYd: number;
  rushTd: number;
  tgt: number;
  rec: number;
  recYd: number;
  recTd: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Earliest season Sleeper has usable data for. */
const STATS_DATA_FLOOR = 2009;
/** Players with fewer games than this are excluded from the ranking pool. */
const MIN_GAMES_FOR_RANK = 4;
/** Fallback lookback (in seasons) when years_exp is missing. */
const DEFAULT_LOOKBACK = 5;

const STATS_HOST = "https://api.sleeper.app";
const WEEKLY_HOST = "https://api.sleeper.com";
const PLAYERS_META_URL = `${STATS_HOST}/v1/players/nfl`;

const CACHE_ROOT = path.resolve(process.cwd(), ".cache");
const STATS_CACHE_DIR = path.join(CACHE_ROOT, "sleeper-stats");
const GAMELOGS_CACHE_DIR = path.join(CACHE_ROOT, "sleeper-gamelogs");

const SEASON_TTL_MS = 24 * 60 * 60 * 1000; // 24h (effectively permanent once a season ends)
const PLAYERS_META_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7d
const GAMELOG_TTL_CURRENT_MS = 30 * 60 * 1000; // 30m for the in-progress season
const GAMELOG_TTL_HISTORICAL_MS = 7 * 24 * 60 * 60 * 1000; // 7d for completed seasons

const USER_AGENT = "StatChasersBot/1.0 (+https://statchasers.com)";

// ---------------------------------------------------------------------------
// Defensive numeric coalescing — stat field names vary by feed era.
// ---------------------------------------------------------------------------

function gnum(obj: any, ...keys: string[]): number {
  if (!obj) return 0;
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Disk cache helpers
// ---------------------------------------------------------------------------

function ensureDir(dir: string): void {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    /* ignore */
  }
}

function readCache<T>(file: string, ttlMs: number): T | null {
  try {
    const stat = fs.statSync(file);
    if (Date.now() - stat.mtimeMs > ttlMs) return null;
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return null;
  }
}

function writeCache(file: string, data: unknown): void {
  try {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, JSON.stringify(data));
  } catch {
    /* best-effort cache; ignore write failures */
  }
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Sleeper fetch failed ${res.status} for ${url}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Players metadata (id -> position). Needed because the season-totals payload
// has no per-player position, and positional ranking requires the full pool.
// ---------------------------------------------------------------------------

let playersMetaMem: Record<string, { position: string | null; years_exp: number | null }> | null = null;

async function getPlayersMeta(): Promise<Record<string, { position: string | null; years_exp: number | null }>> {
  if (playersMetaMem) return playersMetaMem;
  const cacheFile = path.join(STATS_CACHE_DIR, "players-meta.json");
  const cached = readCache<typeof playersMetaMem>(cacheFile, PLAYERS_META_TTL_MS);
  if (cached) {
    playersMetaMem = cached;
    return cached;
  }
  const raw = await fetchJson(PLAYERS_META_URL);
  const slim: Record<string, { position: string | null; years_exp: number | null }> = {};
  for (const id of Object.keys(raw)) {
    const p = raw[id];
    slim[id] = {
      position: p?.position ?? null,
      years_exp: typeof p?.years_exp === "number" ? p.years_exp : null,
    };
  }
  writeCache(cacheFile, slim);
  playersMetaMem = slim;
  return slim;
}

// ---------------------------------------------------------------------------
// Season totals payload (shared across all players, cached per season)
// ---------------------------------------------------------------------------

const seasonStatsMem: Map<number, Record<string, any>> = new Map();

async function getSeasonStats(season: number): Promise<Record<string, any>> {
  const mem = seasonStatsMem.get(season);
  if (mem) return mem;
  const cacheFile = path.join(STATS_CACHE_DIR, `regular-${season}.json`);
  const cached = readCache<Record<string, any>>(cacheFile, SEASON_TTL_MS);
  if (cached) {
    seasonStatsMem.set(season, cached);
    return cached;
  }
  const data = await fetchJson(`${STATS_HOST}/v1/stats/nfl/regular/${season}`);
  writeCache(cacheFile, data);
  seasonStatsMem.set(season, data);
  return data;
}

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------

/** Total season/week points for a stat dict in a given format, with graceful fallback. */
function pickPoints(stats: any, scoring: SleeperScoring): number {
  if (scoring === "ppr") return gnum(stats, "pts_ppr", "pts_half_ppr", "pts_std");
  if (scoring === "half_ppr") return gnum(stats, "pts_half_ppr", "pts_ppr", "pts_std");
  return gnum(stats, "pts_std", "pts_half_ppr", "pts_ppr");
}

// ---------------------------------------------------------------------------
// Career window inference
// ---------------------------------------------------------------------------

function inferSeasonWindow(yearsExp: number | null, currentYear: number): number[] {
  const lastCompleted = currentYear - 1; // never include the in-progress year
  let careerStart: number;
  if (typeof yearsExp === "number") {
    // currentYear - years_exp - 1, with a 1-year buffer for Sleeper's offseason lag.
    careerStart = currentYear - yearsExp - 1;
  } else {
    careerStart = lastCompleted - (DEFAULT_LOOKBACK - 1);
  }
  if (careerStart < STATS_DATA_FLOOR) careerStart = STATS_DATA_FLOOR;
  const seasons: number[] = [];
  for (let y = careerStart; y <= lastCompleted; y++) seasons.push(y);
  return seasons;
}

// ---------------------------------------------------------------------------
// Positional finish ranking for one season + one scoring format
// ---------------------------------------------------------------------------

function computeFinishes(
  seasonStats: Record<string, any>,
  posMap: Record<string, { position: string | null }>,
  position: string | null,
  scoring: SleeperScoring,
  targetTotal: number,
  targetPpg: number,
  targetGp: number,
): { posFinishTotal: number | null; posFinishPpg: number | null } {
  if (!position || targetGp <= 0) return { posFinishTotal: null, posFinishPpg: null };

  let beatenOnTotal = 0;
  let beatenOnPpg = 0;
  for (const id of Object.keys(seasonStats)) {
    if (posMap[id]?.position !== position) continue;
    const s = seasonStats[id];
    const gp = gnum(s, "gp");
    // Filter out injury fill-ins so a 2-game cameo can't pad the ranks.
    if (gp < MIN_GAMES_FOR_RANK) continue;
    const total = pickPoints(s, scoring);
    if (total > targetTotal) beatenOnTotal++;
    if (gp > 0 && total / gp > targetPpg) beatenOnPpg++;
  }
  return { posFinishTotal: beatenOnTotal + 1, posFinishPpg: beatenOnPpg + 1 };
}

function buildScoringLine(
  seasonStats: Record<string, any>,
  posMap: Record<string, { position: string | null }>,
  position: string | null,
  playerStats: any,
  gamesPlayed: number,
  scoring: SleeperScoring,
): ScoringLine {
  const total = pickPoints(playerStats, scoring);
  const ppg = gamesPlayed > 0 ? total / gamesPlayed : 0;
  const { posFinishTotal, posFinishPpg } = computeFinishes(
    seasonStats,
    posMap,
    position,
    scoring,
    total,
    ppg,
    gamesPlayed,
  );
  return {
    total: round2(total),
    ppg: round2(ppg),
    posFinishTotal,
    posFinishPpg,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ---------------------------------------------------------------------------
// Layer 1: season production
// ---------------------------------------------------------------------------

export async function getPlayerProduction(
  playerId: string,
  scoring: SleeperScoring = "ppr",
): Promise<ProductionSeason[]> {
  const meta = await getPlayersMeta();
  const player = meta[playerId];
  const position = player?.position ?? null;
  const currentYear = new Date().getFullYear();
  const seasons = inferSeasonWindow(player?.years_exp ?? null, currentYear);

  // Fetch all season payloads up front (large but disk-cached and shared).
  const payloads = await Promise.all(
    seasons.map((s) =>
      getSeasonStats(s).then(
        (data) => ({ season: s, data }),
        () => null, // a single missing season shouldn't sink the whole table
      ),
    ),
  );

  const rows: ProductionSeason[] = [];
  for (const entry of payloads) {
    if (!entry) continue;
    const { season, data } = entry;
    const playerStats = data[playerId];
    if (!playerStats) continue;
    // Use gp (games played), NOT gms_active — the latter counts active-roster
    // weeks (e.g. 17 even after a season-ending injury), deflating PPG.
    const gamesPlayed = gnum(playerStats, "gp");
    if (gamesPlayed <= 0 && pickPoints(playerStats, scoring) <= 0) continue;

    rows.push({
      season,
      position,
      gamesPlayed,
      std: buildScoringLine(data, meta, position, playerStats, gamesPlayed, "std"),
      half: buildScoringLine(data, meta, position, playerStats, gamesPlayed, "half_ppr"),
      ppr: buildScoringLine(data, meta, position, playerStats, gamesPlayed, "ppr"),
    });
  }

  // Most recent season first.
  rows.sort((a, b) => b.season - a.season);
  return rows;
}

// ---------------------------------------------------------------------------
// Layer 2: weekly game logs
// ---------------------------------------------------------------------------

/** True if a week shows real evidence of play (the participation gate). */
function wasPlayed(stats: any): boolean {
  if (!stats) return false;
  if (gnum(stats, "gp") >= 1) return true;
  if (gnum(stats, "snp", "off_snp") > 0) return true;
  return (
    gnum(stats, "pass_att") > 0 ||
    gnum(stats, "rush_att") > 0 ||
    gnum(stats, "rec_tgt") > 0 ||
    gnum(stats, "rec") > 0 ||
    gnum(stats, "pass_yd") > 0 ||
    gnum(stats, "rush_yd") > 0 ||
    gnum(stats, "rec_yd") > 0
  );
}

function normalizeGameLogs(raw: any, seasonType: SleeperSeasonType): GameLogRow[] {
  if (!raw || typeof raw !== "object") return [];
  const rows: GameLogRow[] = [];
  for (const weekKey of Object.keys(raw)) {
    const entry = raw[weekKey];
    if (!entry) continue; // injured/inactive weeks sometimes come back as null
    const stats = entry.stats ?? entry;
    if (!wasPlayed(stats)) continue;

    const playerSnaps = gnum(stats, "snp", "off_snp");
    const teamSnaps = gnum(stats, "tm_off_snp");
    const snapPct = teamSnaps > 0 ? round2((playerSnaps / teamSnaps) * 100) : null;

    const week = gnum(entry, "week") || Number(weekKey) || 0;
    rows.push({
      week,
      seasonType,
      opp: entry.opponent ?? null,
      team: entry.team ?? null,
      snapPct,
      ptsStd: round2(gnum(stats, "pts_std")),
      ptsHalf: round2(gnum(stats, "pts_half_ppr")),
      ptsPpr: round2(gnum(stats, "pts_ppr")),
      passCmp: gnum(stats, "pass_cmp"),
      passAtt: gnum(stats, "pass_att"),
      passYd: gnum(stats, "pass_yd"),
      passTd: gnum(stats, "pass_td"),
      passInt: gnum(stats, "pass_int"),
      rushAtt: gnum(stats, "rush_att"),
      rushYd: gnum(stats, "rush_yd"),
      rushTd: gnum(stats, "rush_td"),
      tgt: gnum(stats, "rec_tgt"),
      rec: gnum(stats, "rec"),
      recYd: gnum(stats, "rec_yd"),
      recTd: gnum(stats, "rec_td"),
    });
  }
  rows.sort((a, b) => a.week - b.week);
  return rows;
}

export async function getPlayerGameLogs(
  playerId: string,
  season: number,
  seasonType: SleeperSeasonType = "regular",
): Promise<GameLogRow[]> {
  const currentYear = new Date().getFullYear();
  const ttl = season >= currentYear ? GAMELOG_TTL_CURRENT_MS : GAMELOG_TTL_HISTORICAL_MS;
  // v2- prefix is a deliberate cache-bust for the participation gate.
  const cacheFile = path.join(GAMELOGS_CACHE_DIR, `v2-${seasonType}-${season}-${playerId}.json`);

  const cached = readCache<GameLogRow[]>(cacheFile, ttl);
  if (cached) return cached;

  const url = `${WEEKLY_HOST}/stats/nfl/player/${playerId}?season_type=${seasonType}&season=${season}&grouping=week`;
  const raw = await fetchJson(url);
  const rows = normalizeGameLogs(raw, seasonType);
  writeCache(cacheFile, rows);
  return rows;
}

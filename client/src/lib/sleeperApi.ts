/**
 * Client fetch wrappers for the "Game Log 2" tab. These hit our own backend
 * (never Sleeper directly). Interfaces mirror server/sleeperPlayerProfile.ts.
 */

export type SleeperScoring = "std" | "half_ppr" | "ppr";
export type SleeperSeasonType = "regular" | "post";

export interface ScoringLine {
  total: number;
  ppg: number;
  posFinishTotal: number | null;
  posFinishPpg: number | null;
}

export interface PlayerProductionSeason {
  season: number;
  position: string | null;
  gamesPlayed: number;
  std: ScoringLine;
  half: ScoringLine;
  ppr: ScoringLine;
}

export interface PlayerGameLogRow {
  week: number;
  seasonType: SleeperSeasonType;
  opp: string | null;
  team: string | null;
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

export async function fetchPlayerProduction(
  playerId: string,
  scoring: SleeperScoring,
): Promise<PlayerProductionSeason[]> {
  const res = await fetch(`/api/players/${playerId}/production?scoring=${scoring}`);
  if (!res.ok) throw new Error(`production ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.seasons) ? data.seasons : [];
}

export async function fetchPlayerGameLogs(
  playerId: string,
  season: number,
  type: SleeperSeasonType,
): Promise<PlayerGameLogRow[]> {
  const res = await fetch(`/api/players/${playerId}/game-logs?season=${season}&type=${type}`);
  if (!res.ok) throw new Error(`game-logs ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.logs) ? data.logs : [];
}

/**
 * injuryApi — the data contract + client fetch for the Injury tab.
 *
 * The `PlayerInjuryHistory` shape is the SEAM between server and client. The
 * server's scraper normalizes whatever messy source payload into exactly this;
 * everything in the UI depends only on this. Keep this type identical to the
 * server's copy (server/injurySource.ts) — the duplication is intentional.
 */

export type InjurySeverity = "major" | "moderate" | "minor";
export type InjurySignificance = "high" | "medium" | "low";

export type NflInjuryEntry = {
  season: number;
  week: number | null;
  type: string;             // "Foot Fracture", "UCL Sprain", "Questionable"
  bodyPart: string | null;  // "foot", "elbow", "head"
  side: string | null;      // "left" | "right" | "unknown"
  severity: InjurySeverity | null;
  gamesMissed: number | null;
  description: string;
};

export type CollegeInjuryEntry = {
  year: number | null;
  significance: InjurySignificance | null;
  description: string;
};

export type PlayerInjuryHistory = {
  grade: string | null;       // durability grade, e.g. "A+"
  score: number | null;       // 0–100 (LOWER = more injury risk)
  gradeColor: string | null;  // hex for the grade box
  nfl: NflInjuryEntry[];      // newest first
  college: CollegeInjuryEntry[];
};

// Point this at your API origin (or leave "" for same-origin).
const API_BASE = "";

/** NFL + college injury timeline for a player. Returns null when unavailable. */
export async function fetchPlayerInjuryHistory(
  playerId: string,
  name: string,
): Promise<PlayerInjuryHistory | null> {
  const res = await fetch(
    `${API_BASE}/api/players/${encodeURIComponent(playerId)}/injuries?name=${encodeURIComponent(name)}`,
    { credentials: "include" },
  );
  if (!res.ok) return null; // not an error to the caller — distinct from a thrown failure
  const data = await res.json();
  return (data?.injuries as PlayerInjuryHistory | null) ?? null;
}

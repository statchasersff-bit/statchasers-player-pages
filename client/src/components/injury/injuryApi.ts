export type InjurySeverity = "major" | "moderate" | "minor";
export type InjurySignificance = "high" | "medium" | "low";

export type NflInjuryEntry = {
  season: number;
  week: number | null;
  type: string;
  bodyPart: string | null;
  side: string | null;
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
  grade: string | null;
  score: number | null;
  gradeColor: string | null;
  nfl: NflInjuryEntry[];
  college: CollegeInjuryEntry[];
};

const API_BASE = "";

export async function fetchPlayerInjuryHistory(
  playerId: string,
  name: string,
): Promise<PlayerInjuryHistory | null> {
  const res = await fetch(
    `${API_BASE}/api/players/${encodeURIComponent(playerId)}/injuries?name=${encodeURIComponent(name)}`,
    { credentials: "include" },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return (data?.injuries as PlayerInjuryHistory | null) ?? null;
}

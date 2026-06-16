import type { PlayerInjuryHistory, NflInjuryEntry, InjurySeverity } from "./injuryApi";

export function injuryTitleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

const BODY_REGIONS: { region: string; keywords: string[] }[] = [
  { region: "Head/Neck",      keywords: ["head", "neck", "concussion", "face", "jaw", "skull", "nose", "eye"] },
  { region: "Back/Spine",     keywords: ["back", "spine", "spinal", "lumbar", "disc", "vertebra"] },
  { region: "Shoulder",       keywords: ["shoulder", "clavicle", "collarbone", "ac joint", "rotator"] },
  { region: "Arm/Elbow",      keywords: ["arm", "elbow", "bicep", "tricep", "forearm"] },
  { region: "Hand/Wrist",     keywords: ["hand", "wrist", "thumb", "finger"] },
  { region: "Chest/Ribs",     keywords: ["chest", "rib", "pec", "sternum", "abdomen", "oblique", "core"] },
  { region: "Hip/Groin",      keywords: ["hip", "groin", "pelvis", "glute"] },
  { region: "Upper Leg",      keywords: ["hamstring", "quad", "thigh", "femur"] },
  { region: "Knee",           keywords: ["knee", "acl", "mcl", "pcl", "patella", "meniscus"] },
  { region: "Lower Leg/Foot", keywords: ["calf", "shin", "ankle", "foot", "achilles", "toe", "heel", "tibia", "fibula"] },
];

export function classifyRegion(e: NflInjuryEntry): string {
  const hay = `${e.bodyPart ?? ""} ${e.type ?? ""}`.toLowerCase();
  for (const r of BODY_REGIONS) {
    if (r.keywords.some((k) => hay.includes(k))) return r.region;
  }
  return e.bodyPart ? injuryTitleCase(e.bodyPart) : "Other";
}

const SEVERITY_RANK: Record<InjurySeverity, number> = { major: 3, moderate: 2, minor: 1 };

export type RiskLevel = "low" | "moderate" | "high";
export const RISK_LEVEL_STYLE: Record<RiskLevel, { label: string; text: string; bar: string; score: number }> = {
  low:      { label: "Low",      text: "text-emerald-600",  bar: "bg-emerald-500", score: 25 },
  moderate: { label: "Moderate", text: "text-amber-600",    bar: "bg-amber-500",   score: 60 },
  high:     { label: "High",     text: "text-rose-600",     bar: "bg-rose-500",    score: 90 },
};

export type InjurySummary = {
  totalMissed: number;
  injuriesLogged: number;
  affectedRegions: number;
  lastSeason: number | null;
  primaryDriver: { label: string; missed: number } | null;
};

export function summarizeInjuries(injury: PlayerInjuryHistory): InjurySummary {
  const totalMissed = injury.nfl.reduce((sum, e) => sum + (e.gamesMissed ?? 0), 0);
  const injuriesLogged = injury.nfl.length + injury.college.length;
  const affectedRegions = new Set(injury.nfl.map(classifyRegion)).size;

  let lastSeason: number | null = null;
  for (const e of injury.nfl) {
    if (lastSeason == null || e.season > lastSeason) lastSeason = e.season;
  }

  let primaryDriver: { label: string; missed: number } | null = null;
  let driverScore = -1;
  for (const e of injury.nfl) {
    const missed = e.gamesMissed ?? 0;
    const score = missed * 100 + (e.severity ? SEVERITY_RANK[e.severity] : 0);
    if (score > driverScore) { driverScore = score; primaryDriver = { label: `${e.season} ${e.type}`, missed }; }
  }

  return { totalMissed, injuriesLogged, affectedRegions, lastSeason, primaryDriver };
}

export function buildTimelineInsight(nfl: NflInjuryEntry[]): string {
  const joinAnd = (parts: string[]) =>
    parts.length <= 1 ? (parts[0] ?? "") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  const shortDesc = (e: NflInjuryEntry) => (e.bodyPart ? `${e.bodyPart.toLowerCase()} injury` : e.type.toLowerCase());

  const topMissed = nfl
    .filter((e) => (e.gamesMissed ?? 0) > 0)
    .sort((a, b) => (b.gamesMissed ?? 0) - (a.gamesMissed ?? 0))
    .slice(0, 2)
    .map((e) => `${e.season} ${shortDesc(e)}`);
  const playedRegions = Array.from(
    new Set(nfl.filter((e) => (e.gamesMissed ?? 0) === 0).map((e) => classifyRegion(e).toLowerCase())),
  ).slice(0, 3);

  let s = "";
  if (topMissed.length) s = `Most missed time came from the ${joinAnd(topMissed)}`;
  if (playedRegions.length) {
    s += s ? ", while several " : "Several ";
    s += `${joinAnd(playedRegions)} ${playedRegions.length > 1 ? "issues were" : "issue was"} played through`;
  }
  return s ? `${s}.` : "";
}

export function computeRiskBreakdown(injury: PlayerInjuryHistory): { label: string; level: RiskLevel }[] {
  const nfl = injury.nfl;
  const rows: { label: string; level: RiskLevel }[] = [];

  const latest = nfl.reduce((m, e) => Math.max(m, e.season), 0);
  const recentCount = latest > 0 ? nfl.filter((e) => e.season >= latest - 1).length : 0;
  rows.push({ label: "Recent Injury Risk", level: recentCount >= 3 ? "high" : recentCount >= 1 ? "moderate" : "low" });

  const bpCounts = new Map<string, number>();
  for (const e of nfl) {
    if (e.bodyPart) bpCounts.set(e.bodyPart, (bpCounts.get(e.bodyPart) ?? 0) + 1);
  }
  const maxRepeat = Math.max(0, ...Array.from(bpCounts.values()));
  rows.push({ label: "Recurring Injury Risk", level: maxRepeat >= 3 ? "high" : maxRepeat >= 2 ? "moderate" : "low" });

  const totalMissed = nfl.reduce((sum, e) => sum + (e.gamesMissed ?? 0), 0);
  rows.push({ label: "Games Missed Impact", level: totalMissed >= 10 ? "high" : totalMissed >= 4 ? "moderate" : "low" });

  const withBp = nfl.filter((e) => e.bodyPart).length;
  const share = withBp > 0 ? maxRepeat / withBp : 0;
  rows.push({ label: "Body Part Concentration", level: share >= 0.5 ? "high" : share >= 0.34 ? "moderate" : "low" });

  return rows;
}

export function durabilityRiskLabel(score: number): { word: string; className: string } {
  if (score >= 80) return { word: "Low",      className: "text-emerald-600" };
  if (score >= 60) return { word: "Moderate", className: "text-amber-600" };
  if (score >= 40) return { word: "Elevated", className: "text-orange-600" };
  return { word: "High", className: "text-rose-600" };
}

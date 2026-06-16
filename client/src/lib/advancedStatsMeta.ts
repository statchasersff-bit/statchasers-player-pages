export type StatPosition = "qb" | "rb" | "wr" | "te";

export interface ColDef {
  key: string;
  label: string;
  type: "number" | "decimal" | "string";
  defaultVisible: boolean;
}

export const PINNED_KEYS = new Set(["rank", "playerName", "player_name", "name", "team", "nfl_team"]);
export const ALWAYS_HIDDEN = new Set([
  "playerId", "player_id", "sleeper_id", "sleeperId",
  "season", "position", "age",
  "contestedCatchRate", "yardsAfterContactPerReception",
]);

const QB_COLUMN_GROUPS: Record<string, string> = {
  attempts: "Volume / Usage", completions: "Volume / Usage", passingYards: "Volume / Usage",
  airYards: "Volume / Usage", completedAirYards: "Volume / Usage", redZoneAttempts: "Volume / Usage",
  passingTouchdowns: "Volume / Usage", rushAttempts: "Volume / Usage", rushYards: "Volume / Usage",
  rushTouchdowns: "Volume / Usage", games: "Volume / Usage",
  completedAirYardsPerCompletion: "Aggressiveness", yardsPerCatch: "Aggressiveness",
  completionPct: "Efficiency", onTargetPct: "Efficiency", poorThrows: "Efficiency",
  badThrowPct: "Efficiency", interceptions: "Efficiency", epaPerPlay: "Efficiency",
  successRate: "Efficiency", cpoe: "Efficiency",
  passes10Plus: "Explosiveness", passes20Plus: "Explosiveness", passes30Plus: "Explosiveness",
  passes40Plus: "Explosiveness", passes50Plus: "Explosiveness", longestPass: "Explosiveness",
  deepAttemptPct: "Explosiveness",
  pocketTime: "Pressure & Pocket", timeToThrow: "Pressure & Pocket", throwaways: "Pressure & Pocket",
  battedPasses: "Pressure & Pocket", scrambleRate: "Pressure & Pocket", yardsPerScramble: "Pressure & Pocket",
  hurries: "Pressure & Pocket", blitzes: "Pressure & Pocket", knockdowns: "Pressure & Pocket",
  sacks: "Pressure & Pocket", sackYardsLost: "Pressure & Pocket", fumbles: "Pressure & Pocket",
  pressurePct: "Pressure & Pocket",
  fantasyPoints: "Scoring",
};

const RB_COLUMN_GROUPS: Record<string, string> = {
  snapPct: "Usage / Workload", routes: "Usage / Workload", rushAttempts: "Usage / Workload",
  redZoneOpportunities: "Usage / Workload", goalLineCarries: "Usage / Workload",
  targets: "Usage / Workload", targetSharePct: "Usage / Workload", receptions: "Usage / Workload",
  redZoneTargets: "Usage / Workload", endZoneTargets: "Usage / Workload", games: "Usage / Workload",
  rushYards: "Production", yardsPerCarry: "Production", rushTouchdowns: "Production",
  receivingYards: "Production", yardsPerReception: "Production", receivingYardsAfterCatch: "Production",
  yardsPerRouteRun: "Production", receivingTouchdowns: "Production", epaPerPlay: "Production",
  rushes10Plus: "Explosive Play Ability", rushes20Plus: "Explosive Play Ability",
  rushes30Plus: "Explosive Play Ability", rushes40Plus: "Explosive Play Ability",
  rushes50Plus: "Explosive Play Ability", explosiveRunPct: "Explosive Play Ability",
  breakawayRunPct: "Explosive Play Ability", longestRush: "Explosive Play Ability",
  longestRushTouchdown: "Explosive Play Ability",
  brokenTackles: "Contact & Tackle Breaking", rushAttemptsPerBrokenTackle: "Contact & Tackle Breaking",
  yardsBeforeContactPerAttempt: "Contact & Tackle Breaking",
  yardsAfterContactPerAttempt: "Contact & Tackle Breaking", tackleEludedRate: "Contact & Tackle Breaking",
  fumbles: "Ball Security", tacklesForLoss: "Ball Security",
  tacklesForLossYards: "Ball Security", rushAttForNegativeYards: "Ball Security",
  fantasyPoints: "Scoring",
};

const WR_TE_COLUMN_GROUPS: Record<string, string> = {
  snapPct: "Usage / Role", routes: "Usage / Role", routePct: "Usage / Role", targets: "Usage / Role",
  targetsPerRouteRun: "Usage / Role", targetSharePct: "Usage / Role", airYardsPerTarget: "Usage / Role",
  airYardsPerReception: "Usage / Role", airYardsSharePct: "Usage / Role", wopr: "Usage / Role",
  redZoneTargets: "Usage / Role", endZoneTargets: "Usage / Role", games: "Usage / Role",
  receptions: "Production", receivingYards: "Production", totalYards: "Production",
  yardsBeforeCatchPerReception: "Production", yardsAfterCatchPerReception: "Production",
  yardsPerReception: "Production", yardsPerRouteRun: "Production", receivingTouchdowns: "Production",
  epaPerPlay: "Production", successRate: "Production",
  catchPct: "Hands", catchableTargets: "Hands", drops: "Hands",
  dropPct: "Hands", interceptionsWhenTargeted: "Hands", fumbles: "Hands",
  avoidedTackleRate: "Elusiveness", brokenTackles: "Elusiveness",
  receptions10Plus: "Explosiveness", receptions20Plus: "Explosiveness",
  receptions30Plus: "Explosiveness", receptions40Plus: "Explosiveness",
  receptions50Plus: "Explosiveness", longestReception: "Explosiveness",
  fantasyPoints: "Scoring",
};

export const COLUMN_GROUPS_BY_POSITION: Record<string, Record<string, string>> = {
  qb: QB_COLUMN_GROUPS,
  rb: RB_COLUMN_GROUPS,
  wr: WR_TE_COLUMN_GROUPS,
  te: WR_TE_COLUMN_GROUPS,
};

export const SECTION_ACCENTS: Record<string, string> = {
  "Scoring":                      "#d4af37",
  "Volume / Usage":               "#f59e0b",
  "Usage / Workload":             "#f59e0b",
  "Usage / Role":                 "#f59e0b",
  "Aggressiveness":               "#fb923c",
  "Efficiency":                   "#60a5fa",
  "Production":                   "#34d399",
  "Explosiveness":                "#c084fc",
  "Explosive Play Ability":       "#c084fc",
  "Pressure & Pocket":            "#22d3ee",
  "Hands":                        "#2dd4bf",
  "Elusiveness":                  "#fb7185",
  "Contact & Tackle Breaking":    "#22d3ee",
  "Ball Security":                "#f87171",
};
export const sectionAccent = (label: string): string => SECTION_ACCENTS[label] ?? "#94a3b8";

export function formatVal(v: unknown, type: ColDef["type"]): string {
  if (v == null) return "\u2014";
  if (typeof v === "number") {
    if (!Number.isFinite(v)) return "\u2014";
    if (type === "decimal") return v.toFixed(2);
    if (Number.isInteger(v)) return v.toLocaleString();
    return Math.abs(v) >= 1000 ? v.toLocaleString() : v.toFixed(2);
  }
  if (typeof v === "string") return v || "\u2014";
  return String(v);
}

export function groupColumns(
  position: StatPosition,
  columns: ColDef[],
): Array<{ label: string; accent: string; cols: ColDef[] }> {
  const groupMap = COLUMN_GROUPS_BY_POSITION[position];
  const order: string[] = [];
  const byLabel = new Map<string, ColDef[]>();
  for (const c of columns) {
    if (PINNED_KEYS.has(c.key) || ALWAYS_HIDDEN.has(c.key)) continue;
    const label = groupMap?.[c.key] ?? "Other";
    if (!byLabel.has(label)) { byLabel.set(label, []); order.push(label); }
    byLabel.get(label)!.push(c);
  }
  return order.map((label) => ({ label, accent: sectionAccent(label), cols: byLabel.get(label)! }));
}

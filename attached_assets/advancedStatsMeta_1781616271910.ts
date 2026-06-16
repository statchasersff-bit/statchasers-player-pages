/**
 * advancedStatsMeta — the single source of truth for column → section grouping,
 * per-section accent colours, and value formatting. Keep this shared with any
 * leaderboard / cards you build so section headers stay in lockstep.
 *
 * (This is the trimmed, dependency-light version: the composite-score ENGINES
 * live in playerAdvancedStats.ts in this kit, so the heavy per-position engine
 * imports from the original have been removed.)
 *
 * ── WHAT TO EDIT WHEN PORTING ────────────────────────────────────────────────
 *   - *_COLUMN_GROUPS  : map each stat column key → the section it belongs to.
 *   - SECTION_ACCENTS  : pick a colour per section label.
 *   - PINNED/HIDDEN    : identity columns + columns you never want shown as stats.
 */

// ── Types ───────────────────────────────────────────────────────────────────
export type StatPosition = "qb" | "rb" | "wr" | "te";

export interface ColDef {
  key: string;
  label: string;
  type: "number" | "decimal" | "string";
  defaultVisible: boolean;
}

// ── Column visibility sets ────────────────────────────────────────────────────
// Columns that are identity / always pinned left (not real stats).
export const PINNED_KEYS = new Set(["rank", "playerName", "player_name", "name", "team", "nfl_team"]);
// Columns that are never shown (redundant or no underlying data).
export const ALWAYS_HIDDEN = new Set([
  "playerId", "player_id", "sleeper_id", "sleeperId",
  "season",
  "contestedCatchRate", "yardsAfterContactPerReception",
]);

// ── Section grouping (column key → section label) ─────────────────────────────
const QB_COLUMN_GROUPS: Record<string, string> = {
  rank: "Player Info", playerName: "Player Info", team: "Player Info",
  position: "Player Info", age: "Player Info", games: "Player Info", fantasyPoints: "Player Info",
  attempts: "Volume / Usage", completions: "Volume / Usage", passingYards: "Volume / Usage",
  airYards: "Volume / Usage", completedAirYards: "Volume / Usage", redZoneAttempts: "Volume / Usage",
  passingTouchdowns: "Volume / Usage", rushAttempts: "Volume / Usage", rushYards: "Volume / Usage",
  rushTouchdowns: "Volume / Usage",
  airYardsPerAttempt: "Aggressiveness",
  completedAirYardsPerCompletion: "Aggressiveness",
  yardsPerCatch: "Aggressiveness",
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
};

const RB_COLUMN_GROUPS: Record<string, string> = {
  rank: "Player Info", playerName: "Player Info", team: "Player Info",
  position: "Player Info", age: "Player Info", games: "Player Info", fantasyPoints: "Player Info",
  snapPct: "Usage / Workload", routes: "Usage / Workload", rushAttempts: "Usage / Workload",
  redZoneOpportunities: "Usage / Workload", goalLineCarries: "Usage / Workload",
  targets: "Usage / Workload", targetSharePct: "Usage / Workload", receptions: "Usage / Workload",
  redZoneTargets: "Usage / Workload", endZoneTargets: "Usage / Workload",
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
  fumbles: "Ball Security / Negative Plays", tacklesForLoss: "Ball Security / Negative Plays",
  tacklesForLossYards: "Ball Security / Negative Plays", rushAttForNegativeYards: "Ball Security / Negative Plays",
};

// WR and TE share the same columns, so they share one group map.
const WR_TE_COLUMN_GROUPS: Record<string, string> = {
  rank: "Player Info", playerName: "Player Info", team: "Player Info",
  position: "Player Info", age: "Player Info", games: "Player Info", fantasyPoints: "Player Info",
  snapPct: "Usage/Role", routes: "Usage/Role", routePct: "Usage/Role", targets: "Usage/Role",
  targetsPerRouteRun: "Usage/Role", targetSharePct: "Usage/Role", airYardsPerTarget: "Usage/Role",
  airYardsPerReception: "Usage/Role", airYardsSharePct: "Usage/Role", wopr: "Usage/Role",
  redZoneTargets: "Usage/Role", endZoneTargets: "Usage/Role",
  receptions: "Production", receivingYards: "Production",
  yardsBeforeCatchPerReception: "Production", yardsAfterCatchPerReception: "Production",
  yardsPerReception: "Production", yardsPerRouteRun: "Production", receivingTouchdowns: "Production",
  epaPerPlay: "Production", successRate: "Production",
  catchPct: "Hands", contestedCatchRate: "Hands", catchableTargets: "Hands", drops: "Hands",
  dropPct: "Hands", interceptionsWhenTargeted: "Hands", fumbles: "Hands",
  avoidedTackleRate: "Elusiveness", brokenTackles: "Elusiveness",
  yardsAfterContactPerReception: "Elusiveness",
  receptions10Plus: "Explosiveness", receptions20Plus: "Explosiveness",
  receptions30Plus: "Explosiveness", receptions40Plus: "Explosiveness",
  receptions50Plus: "Explosiveness", longestReception: "Explosiveness",
};

export const COLUMN_GROUPS_BY_POSITION: Record<string, Record<string, string>> = {
  qb: QB_COLUMN_GROUPS,
  rb: RB_COLUMN_GROUPS,
  wr: WR_TE_COLUMN_GROUPS,
  te: WR_TE_COLUMN_GROUPS,
};

// ── Section accent colours ────────────────────────────────────────────────────
export const SECTION_ACCENTS: Record<string, string> = {
  "Composite Grades":             "#d4af37", // gold
  "Player Info":                  "#94a3b8", // slate
  "Volume / Usage":               "#f59e0b", // amber
  "Usage / Workload":             "#f59e0b",
  "Usage/Role":                   "#f59e0b",
  "Aggressiveness":               "#fb923c", // orange
  "Efficiency":                   "#60a5fa", // blue
  "Production":                   "#34d399", // emerald
  "Explosiveness":                "#c084fc", // purple
  "Explosive Play Ability":       "#c084fc",
  "Pressure & Pocket":            "#22d3ee", // cyan
  "Hands":                        "#2dd4bf", // teal
  "Elusiveness":                  "#fb7185", // rose
  "Contact & Tackle Breaking":    "#22d3ee",
  "Ball Security / Negative Plays":"#f87171", // red
};
export const sectionAccent = (label: string): string => SECTION_ACCENTS[label] ?? "#94a3b8";
export const SECTION_BAR_GRADIENT = "linear-gradient(90deg, rgba(20,35,60,0.97) 0%, rgba(12,22,40,0.97) 100%)";

// ── Helpers ───────────────────────────────────────────────────────────────────
export function formatVal(v: unknown, type: ColDef["type"]): string {
  if (v == null) return "—";
  if (typeof v === "number") {
    if (!Number.isFinite(v)) return "—";
    if (type === "decimal") return v.toFixed(2);
    if (Number.isInteger(v)) return v.toLocaleString();
    return Math.abs(v) >= 1000 ? v.toLocaleString() : v.toFixed(2);
  }
  if (typeof v === "string") return v || "—";
  if (typeof v === "boolean") return v ? "✓" : "—";
  return String(v);
}

/** All stat columns for a position pool, grouped by section in column order. */
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

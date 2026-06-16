/**
 * AdvancedTab — the player-profile "Advanced Stats" tab UI.
 *
 * Three stacked views, all reading from a single PlayerAdvancedResult produced
 * by loadPlayerAdvancedStats():
 *   1. Rank Snapshot   — nested pill-tabs over a grid of per-stat rank cards.
 *   2. Metric Scores   — role-based composite scores as positional ranks.
 *   3. Stat Sections   — collapsible groups (Usage, Production, …), every stat
 *                        decorated with its positional rank when available.
 *
 * Dependencies: React + lucide-react only. The tiny Card / SkeletonLines /
 * ComingSoon / cn primitives below are intentionally local so this file is
 * drop-in. Swap them for your own design-system equivalents if you have them.
 */
import { useMemo, useState, type ReactNode } from "react";
import {
  Activity, AlertTriangle, BarChart3, ChevronDown, Layers, Sparkles,
  Target, TrendingUp, Zap, type LucideIcon,
} from "lucide-react";
import {
  type ColDef, type StatPosition,
  groupColumns, formatVal,
} from "./advancedStatsMeta";
import type {
  PlayerAdvancedResult, PlayerSeasonStats, RankCard, RankCategory, RankTier, StatRank,
} from "./playerAdvancedStats";

// ── tiny utilities / primitives (replace with your own if you have them) ──────
function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
}

function SkeletonLines({ n = 4 }: { n?: number }) {
  return (
    <div className="space-y-2.5 animate-pulse">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-4 rounded bg-muted/60" style={{ width: `${90 - i * 7}%` }} />
      ))}
    </div>
  );
}

function ComingSoon({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <Card className="p-8 flex flex-col items-center text-center gap-2">
      <Icon className="w-8 h-8 text-muted-foreground/60" />
      <div className="text-sm font-black text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground max-w-sm">{body}</div>
    </Card>
  );
}

// ── tier → colour (the shared visual language across all three views) ─────────
const RANK_TIER_STYLE: Record<RankTier, { text: string; bar: string; hover: string }> = {
  elite:   { text: "text-emerald-600 dark-any:text-emerald-400", bar: "bg-emerald-500", hover: "hover:border-emerald-500/40" },
  great:   { text: "text-foreground",                            bar: "bg-foreground",  hover: "hover:border-foreground/30" },
  solid:   { text: "text-[#d4af37]",                             bar: "bg-[#d4af37]",   hover: "hover:border-[#d4af37]/45" },
  average: { text: "text-orange-600 dark-any:text-orange-400",   bar: "bg-orange-500",  hover: "hover:border-orange-500/40" },
  poor:    { text: "text-rose-600 dark-any:text-rose-400",       bar: "bg-rose-500",    hover: "hover:border-rose-500/40" },
};

// Map a "Top X%" value (lower = better) to a tier — inverse of the rank
// snapshot's percentile thresholds (90/75/55/35), kept in sync.
function metricTier(topPct: number): RankTier {
  if (topPct <= 10) return "elite";
  if (topPct <= 25) return "great";
  if (topPct <= 45) return "solid";
  if (topPct <= 65) return "average";
  return "poor";
}

const RANK_CATEGORY_LABEL: Record<"overview" | RankCategory, string> = {
  overview: "Overview", production: "Production", usage: "Usage", efficiency: "Efficiency", advanced: "Advanced",
};

// ── View 1: Rank Snapshot ─────────────────────────────────────────────────────
function RankSnapshotCard({ card }: { card: RankCard }) {
  const s = RANK_TIER_STYLE[card.tier];
  // "Top X%" = where the player's rank falls within the position field.
  const topPct = Math.max(1, Math.round((card.rank / card.total) * 100));
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-3.5 flex flex-col transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] dark-any:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
        s.hover,
      )}
      data-testid={`rank-card-${card.key}`}
    >
      <div className="flex items-baseline justify-between gap-1">
        <span className={cn("text-[26px] font-black leading-none tabular-nums", s.text)}>#{card.rank}</span>
        <span className="text-[15px] font-black tabular-nums text-foreground">{card.value}</span>
      </div>
      <div className="text-[10px] mt-1">
        <span className={cn("font-bold", s.text)}>Top {topPct}%</span>
        <span className="text-muted-foreground"> · of {card.total} {card.position}s</span>
      </div>
      <div className="text-[11px] font-bold text-foreground mt-2.5 leading-tight">{card.label}</div>
      <div className="mt-2 h-1.5 rounded-full bg-muted/50 dark-any:bg-white/8 overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-500", s.bar)} style={{ width: `${card.percentile}%` }} />
      </div>
      <div className="mt-2.5 space-y-0.5 text-[10px] text-muted-foreground leading-snug">
        {card.behindPlayer && <div className="truncate"><span className="text-muted-foreground/60">Behind:</span> {card.behindPlayer}</div>}
        {card.aheadPlayer && <div className="truncate"><span className="text-muted-foreground/60">Ahead of:</span> {card.aheadPlayer}</div>}
      </div>
    </div>
  );
}

function PlayerRankSnapshot({ cards, pos }: { cards: RankCard[]; pos: string }) {
  const categories = useMemo(() => {
    const present = new Set(cards.map((c) => c.category));
    return (["production", "usage", "efficiency", "advanced"] as RankCategory[]).filter((c) => present.has(c));
  }, [cards]);
  const [active, setActive] = useState<"overview" | RankCategory>("overview");
  const tabs: ("overview" | RankCategory)[] = ["overview", ...categories];
  const visible = active === "overview" ? cards.filter((c) => c.overview) : cards.filter((c) => c.category === active);

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-base font-black text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#d4af37]" /> Player Rank Snapshot
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1">
          How this {pos} ranks among qualifying {pos}s.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tabs.map((t) => {
          const isActive = active === t;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              data-testid={`rank-tab-${t}`}
              className={cn(
                "text-[11px] font-bold px-3 py-1 rounded-full border transition-colors",
                isActive
                  ? "bg-[var(--sc-blue,#2563eb)] text-white border-[var(--sc-blue,#2563eb)] dark-any:bg-[#d4af37]/15 dark-any:text-[#d4af37] dark-any:border-[#d4af37]/35"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30",
              )}
            >
              {RANK_CATEGORY_LABEL[t]}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {visible.map((c) => <RankSnapshotCard key={c.key} card={c} />)}
      </div>
    </Card>
  );
}

// ── View 3: grouped advanced-stat sections ────────────────────────────────────
// Section icon by group label. Sections never overlap within a single position,
// so a few icons are reused across positions; colour is the meta module accent.
const SECTION_ICONS: Record<string, LucideIcon> = {
  "Usage / Workload": Activity,
  "Usage/Role": Activity,
  "Volume / Usage": Activity,
  Production: TrendingUp,
  Efficiency: Target,
  Hands: Target,
  Aggressiveness: Sparkles,
  Elusiveness: Sparkles,
  "Explosive Play Ability": Zap,
  Explosiveness: Zap,
  "Pressure & Pocket": AlertTriangle,
  "Contact & Tackle Breaking": Activity,
  "Ball Security / Negative Plays": AlertTriangle,
};

// Groups surfaced elsewhere (composites → the Metric Scores card) or that aren't
// real stats (identity columns) — skipped here to avoid duplication.
const SKIP_SECTIONS = new Set(["Composite Grades", "Player Info", "Other"]);

// Optional: fuller labels than the data file's terse column headers. Falls back
// to the column's own label when unmapped. Trim/extend to taste.
const STAT_LABELS: Record<string, string> = {
  snapPct: "Snap %", routes: "Routes", rushAttempts: "Rush Att",
  redZoneOpportunities: "Redzone Opportunities", goalLineCarries: "Goal Line Carries",
  targets: "Targets", targetSharePct: "Target Share %", receptions: "Receptions",
  redZoneTargets: "Redzone Targets", endZoneTargets: "Endzone Targets",
  rushYards: "Rush Yards", yardsPerCarry: "Yards / Carry", rushTouchdowns: "Rush TDs",
  receivingYards: "Receiving Yards", yardsPerReception: "Yards / Reception",
  yardsPerRouteRun: "Yards / Route Run", receivingTouchdowns: "Receiving TDs",
  epaPerPlay: "EPA / Play", successRate: "Success %",
  explosiveRunPct: "Explosive Run %", breakawayRunPct: "Breakaway Run %",
  yardsAfterContactPerAttempt: "Yards After Contact / Att", tackleEludedRate: "Tackles Eluded %",
  catchPct: "Catch %", dropPct: "Drop %", wopr: "WOPR", routePct: "Route %",
  targetsPerRouteRun: "Targets / Route Run", airYardsSharePct: "Air Yards Share %",
  completionPct: "Completion %", onTargetPct: "On-Target %", badThrowPct: "Bad Throw %",
  cpoe: "CPOE", pressurePct: "Pressure %", attempts: "Attempts", completions: "Completions",
  passingYards: "Passing Yards", passingTouchdowns: "Passing TDs",
};

// One grouped advanced-stat section — collapsed by default, expands on click.
function AdvancedStatSection({ section, latest, pos, statRanks }: {
  section: { label: string; accent: string; cols: ColDef[] };
  latest: PlayerSeasonStats;
  pos: string;
  statRanks: Record<string, StatRank>;
}) {
  const [open, setOpen] = useState(false);
  const Icon = SECTION_ICONS[section.label] ?? BarChart3;
  return (
    <Card className="p-4 sm:p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid={`adv-section-toggle-${section.label}`}
        className="w-full flex items-center justify-between gap-2 text-left"
      >
        <h3 className="text-base font-black text-foreground flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: section.accent }} /> {section.label}
        </h3>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
          {section.cols.map((c) => {
            const value = formatVal(latest.row[c.key], c.type);
            const label = STAT_LABELS[c.key] ?? c.label;
            const r = statRanks[c.key];
            // Rank styling (rank + Top %) minus the bar / neighbor lines. Falls
            // back to value-only when the player isn't ranked for this stat.
            if (!r) {
              return (
                <div key={c.key} className="rounded-xl border border-border bg-card p-3.5 flex flex-col">
                  <div className="text-[22px] font-black leading-none tabular-nums text-foreground">{value}</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-2.5 leading-tight uppercase tracking-wider">{label}</div>
                </div>
              );
            }
            const s = RANK_TIER_STYLE[r.tier];
            const topPct = Math.max(1, Math.round((r.rank / r.total) * 100));
            return (
              <div key={c.key} className="rounded-xl border border-border bg-card p-3.5 flex flex-col">
                <div className="flex items-baseline justify-between gap-1">
                  <span className={cn("text-[26px] font-black leading-none tabular-nums", s.text)}>#{r.rank}</span>
                  <span className="text-[15px] font-black tabular-nums text-foreground">{value}</span>
                </div>
                <div className="text-[10px] mt-1">
                  <span className={cn("font-bold", s.text)}>Top {topPct}%</span>
                  <span className="text-muted-foreground"> · of {r.total} {pos}s</span>
                </div>
                <div className="text-[11px] font-bold text-foreground mt-2.5 leading-tight">{label}</div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function AdvancedStatSections({ latest, pos, statRanks }: { latest: PlayerSeasonStats; pos: string; statRanks: Record<string, StatRank> }) {
  const sp = pos.toLowerCase();
  const sections = useMemo(() => {
    if (!["qb", "rb", "wr", "te"].includes(sp)) return [];
    return groupColumns(sp as StatPosition, latest.columns as unknown as ColDef[]).filter(
      (g) => !SKIP_SECTIONS.has(g.label) && g.cols.length > 0,
    );
  }, [sp, latest]);
  if (sections.length === 0) return null;
  return (
    <>
      {sections.map((sec) => (
        <AdvancedStatSection key={sec.label} section={sec} latest={latest} pos={pos} statRanks={statRanks} />
      ))}
    </>
  );
}

// ── The tab ───────────────────────────────────────────────────────────────────
export function AdvancedTab({ adv, advLoading, pos }: {
  adv: PlayerAdvancedResult | null;
  advLoading: boolean;
  pos: string;
}) {
  if (advLoading) return <Card className="p-5"><SkeletonLines n={6} /></Card>;
  if (!adv?.latest) {
    return <ComingSoon icon={Layers} title="No advanced stats available" body={`Advanced metrics for this ${pos} will appear once it has qualifying usage in our dataset.`} />;
  }
  const composites = adv.composites;
  const latest = adv.latest;
  return (
    <div className="space-y-4">
      {/* View 1 */}
      {adv.rankCards.length > 0 && <PlayerRankSnapshot cards={adv.rankCards} pos={pos} />}

      {/* View 2 — role metrics shown as positional ranks. */}
      <Card className="p-4 sm:p-5">
        <div className="mb-3">
          <h3 className="text-base font-black text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#d4af37]" /> Metric Scores
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            Where this {pos} ranks among qualifying {pos}s on each role-based metric.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {composites.map((c) => {
            const tierText = c.percentile != null ? RANK_TIER_STYLE[metricTier(c.percentile)].text : "text-muted-foreground";
            return (
              <div key={c.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className={cn("text-2xl font-black tabular-nums leading-none", tierText)}>
                    {c.rank != null ? `${pos}${c.rank}` : "—"}
                  </div>
                </div>
                {c.percentile != null && c.rank != null && c.total != null ? (
                  <div className="mt-1.5 text-[11px] font-semibold">
                    <span className={cn("font-bold", tierText)}>Top {c.percentile}%</span>
                    <span className="text-foreground/55"> · of {c.total} {pos}s</span>
                  </div>
                ) : (
                  <div className="mt-1.5 text-[11px] text-muted-foreground/60">Not enough data</div>
                )}
                <div className="mt-2 text-[11px] text-muted-foreground leading-snug">{c.explanation}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* View 3 — grouped stat sections, driven by the meta module grouping. */}
      <AdvancedStatSections latest={latest} pos={pos} statRanks={adv.statRanks} />
    </div>
  );
}

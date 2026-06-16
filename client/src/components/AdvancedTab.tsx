import { useMemo, useState, type ReactNode } from "react";
import {
  Activity, AlertTriangle, BarChart3, ChevronDown, Layers, Sparkles,
  Target, TrendingUp, Zap, type LucideIcon,
} from "lucide-react";
import {
  type ColDef, type StatPosition,
  groupColumns, formatVal,
} from "@/lib/advancedStatsMeta";
import type {
  PlayerAdvancedResult, PlayerSeasonStats, RankCard, RankCategory, RankTier, StatRank,
} from "@/lib/playerAdvancedStats";

function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("sc-card", className)}>
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
    <Card className="flex flex-col items-center text-center gap-2 py-10">
      <Icon className="w-8 h-8 text-muted-foreground/60" />
      <div className="text-sm font-black text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground max-w-sm">{body}</div>
    </Card>
  );
}

const RANK_TIER_STYLE: Record<RankTier, { text: string; bar: string; border: string }> = {
  elite:   { text: "#16a34a", bar: "#16a34a", border: "rgba(22,163,74,0.4)" },
  great:   { text: "#0b3a7a", bar: "#0b3a7a", border: "rgba(11,58,122,0.3)" },
  solid:   { text: "#d4af37", bar: "#d4af37", border: "rgba(212,175,55,0.45)" },
  average: { text: "#ea580c", bar: "#fb923c", border: "rgba(234,88,12,0.4)" },
  poor:    { text: "#dc2626", bar: "#ef4444", border: "rgba(220,38,38,0.4)" },
};

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

const AVAILABLE_SEASONS = [2025, 2024, 2023, "all" as const] as const;
type AdvSeason = 2025 | 2024 | 2023 | "all";

// ── Rank Snapshot ─────────────────────────────────────────────────────────────

function RankSnapshotCard({ card }: { card: RankCard }) {
  const s = RANK_TIER_STYLE[card.tier];
  const topPct = Math.max(1, Math.round((card.rank / card.total) * 100));
  return (
    <div
      className="rounded-xl border bg-card p-3.5 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: s.border }}
      data-testid={`rank-card-${card.key}`}
    >
      <div className="flex items-baseline justify-between gap-1">
        <span className="text-[26px] font-black leading-none tabular-nums" style={{ color: s.text }}>#{card.rank}</span>
        <span className="text-[15px] font-black tabular-nums text-foreground">{card.value}</span>
      </div>
      <div className="text-[10px] mt-1">
        <span className="font-bold" style={{ color: s.text }}>Top {topPct}%</span>
        <span className="text-muted-foreground"> · of {card.total} {card.position}s</span>
      </div>
      <div className="text-[11px] font-bold text-foreground mt-2.5 leading-tight">{card.label}</div>
      <div className="mt-2 h-1.5 rounded-full bg-muted/50 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${card.percentile}%`, background: s.bar }} />
      </div>
      <div className="mt-2.5 space-y-0.5 text-[10px] text-muted-foreground leading-snug">
        {card.behindPlayer && <div className="truncate"><span className="opacity-60">Behind:</span> {card.behindPlayer}</div>}
        {card.aheadPlayer && <div className="truncate"><span className="opacity-60">Ahead of:</span> {card.aheadPlayer}</div>}
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
    <Card>
      <div className="mb-3">
        <h3 className="sc-sectitle">
          <BarChart3 className="w-4 h-4" style={{ color: "#d4af37" }} /> Player Rank Snapshot
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
              className="text-[11px] font-bold px-3 py-1 rounded-full border transition-colors"
              style={isActive
                ? { background: "#0b3a7a", color: "#fff", borderColor: "#0b3a7a" }
                : { background: "transparent", borderColor: "rgba(11,58,122,0.25)", color: "#64748b" }
              }
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

// ── Metric Scores ─────────────────────────────────────────────────────────────

function MetricScores({ composites, pos }: { composites: PlayerAdvancedResult["composites"]; pos: string }) {
  if (!composites.length) return null;
  return (
    <Card>
      <div className="mb-3">
        <h3 className="sc-sectitle">
          <Layers className="w-4 h-4" style={{ color: "#d4af37" }} /> Metric Scores
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1">
          Where this {pos} ranks on each role-based composite metric.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {composites.map((c) => {
          const topPct = c.percentile != null && c.rank != null && c.total != null
            ? Math.max(1, Math.round((c.rank / c.total) * 100))
            : null;
          const tier = topPct != null ? RANK_TIER_STYLE[metricTier(topPct)] : null;
          return (
            <div key={c.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="text-2xl font-black tabular-nums leading-none" style={{ color: tier?.text ?? "#94a3b8" }}>
                  {c.rank != null ? `${pos}${c.rank}` : "—"}
                </div>
              </div>
              {topPct != null && c.total != null ? (
                <div className="mt-1.5 text-[11px] font-semibold">
                  <span className="font-bold" style={{ color: tier?.text }}>Top {topPct}%</span>
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
  );
}

// ── Stat Sections ─────────────────────────────────────────────────────────────

const SECTION_ICONS: Record<string, LucideIcon> = {
  "Usage / Workload": Activity,
  "Usage / Role":     Activity,
  "Usage/Role":       Activity,
  "Volume / Usage":   Activity,
  Production:         TrendingUp,
  Scoring:            TrendingUp,
  Efficiency:         Target,
  Hands:              Target,
  Aggressiveness:     Sparkles,
  Elusiveness:        Sparkles,
  "Explosive Play Ability": Zap,
  Explosiveness:      Zap,
  "Pressure & Pocket":           AlertTriangle,
  "Contact & Tackle Breaking":   Activity,
  "Ball Security":               AlertTriangle,
};

const SKIP_SECTIONS = new Set(["Other", "Composite Grades", "Player Info"]);

function AdvancedStatSection({ section, latest, pos, statRanks }: {
  section: { label: string; accent: string; cols: ColDef[] };
  latest: PlayerSeasonStats;
  pos: string;
  statRanks: Record<string, StatRank>;
}) {
  const [open, setOpen] = useState(false);
  const Icon = SECTION_ICONS[section.label] ?? BarChart3;
  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid={`adv-section-toggle-${section.label}`}
        className="w-full flex items-center justify-between gap-2 text-left"
      >
        <h3 className="sc-sectitle">
          <Icon className="w-4 h-4" style={{ color: section.accent }} /> {section.label}
        </h3>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
          {section.cols.map((c) => {
            const value = formatVal(latest.row[c.key], c.type);
            const r = statRanks[c.key];
            if (!r) {
              return (
                <div key={c.key} className="rounded-xl border border-border bg-card p-3.5 flex flex-col" data-testid={`adv-cell-${c.key}`}>
                  <div className="text-[22px] font-black leading-none tabular-nums text-foreground">{value}</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-2.5 leading-tight uppercase tracking-wider">{c.label}</div>
                </div>
              );
            }
            const s = RANK_TIER_STYLE[r.tier];
            const topPct = Math.max(1, Math.round((r.rank / r.total) * 100));
            return (
              <div key={c.key} className="rounded-xl border bg-card p-3.5 flex flex-col" style={{ borderColor: s.border }} data-testid={`adv-cell-${c.key}`}>
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-[26px] font-black leading-none tabular-nums" style={{ color: s.text }}>#{r.rank}</span>
                  <span className="text-[15px] font-black tabular-nums text-foreground">{value}</span>
                </div>
                <div className="text-[10px] mt-1">
                  <span className="font-bold" style={{ color: s.text }}>Top {topPct}%</span>
                  <span className="text-muted-foreground"> · of {r.total} {pos}s</span>
                </div>
                <div className="text-[11px] font-bold text-foreground mt-2.5 leading-tight">{c.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function AdvancedStatSections({ latest, pos, statRanks }: {
  latest: PlayerSeasonStats;
  pos: string;
  statRanks: Record<string, StatRank>;
}) {
  const sp = pos.toLowerCase() as StatPosition;
  const sections = useMemo(() => {
    if (!["qb", "rb", "wr", "te"].includes(sp)) return [];
    return groupColumns(sp, latest.columns as ColDef[]).filter(
      (g) => !SKIP_SECTIONS.has(g.label) && g.cols.length > 0,
    );
  }, [sp, latest.columns]);

  if (!sections.length) return null;
  return (
    <>
      {sections.map((sec) => (
        <AdvancedStatSection key={sec.label} section={sec} latest={latest} pos={pos} statRanks={statRanks} />
      ))}
    </>
  );
}

// ── Season selector ───────────────────────────────────────────────────────────

function SeasonSelector({ season, onChange }: { season: AdvSeason; onChange: (s: AdvSeason) => void }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs text-muted-foreground font-semibold">Season:</span>
      <div className="flex gap-1 flex-wrap">
        {AVAILABLE_SEASONS.map((s) => {
          const isActive = season === s;
          return (
            <button
              key={String(s)}
              onClick={() => onChange(s as AdvSeason)}
              data-testid={`adv-season-${s}`}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors"
              style={isActive
                ? { background: "#d4af37", color: "#0b3a7a", borderColor: "#d4af37" }
                : { background: "transparent", borderColor: "rgba(11,58,122,0.2)", color: "#64748b" }
              }
            >
              {s === "all" ? "All Seasons" : s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function AdvancedTab({
  adv,
  advLoading,
  pos,
  season,
  onSeasonChange,
}: {
  adv: PlayerAdvancedResult | null;
  advLoading: boolean;
  pos: string;
  season: AdvSeason;
  onSeasonChange: (s: AdvSeason) => void;
}) {
  const posLabel = pos.toUpperCase();

  return (
    <div className="space-y-4" data-testid="advanced-tab">
      <SeasonSelector season={season} onChange={onSeasonChange} />

      {advLoading && (
        <Card><SkeletonLines n={6} /></Card>
      )}

      {!advLoading && !adv?.latest && (
        <ComingSoon
          icon={Layers}
          title="No advanced stats available"
          body={`Advanced metrics for this ${posLabel} will appear once it has qualifying usage in our dataset.`}
        />
      )}

      {!advLoading && adv?.latest && (
        <>
          {adv.rankCards.length > 0 && <PlayerRankSnapshot cards={adv.rankCards} pos={posLabel} />}
          <MetricScores composites={adv.composites} pos={posLabel} />
          <AdvancedStatSections latest={adv.latest} pos={posLabel} statRanks={adv.statRanks} />
        </>
      )}
    </div>
  );
}

export default AdvancedTab;

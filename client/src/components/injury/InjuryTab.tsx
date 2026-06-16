import { useMemo, useState } from "react";
import { HeartPulse, Shield, AlertTriangle, ScrollText, ChevronDown, GraduationCap } from "lucide-react";
import { Card, SkeletonLines, ComingSoon, SectionTitle, cn } from "./ui";
import type { PlayerInjuryHistory, CollegeInjuryEntry } from "./injuryApi";
import {
  summarizeInjuries, computeRiskBreakdown, buildTimelineInsight, durabilityRiskLabel,
  RISK_LEVEL_STYLE, type RiskLevel, injuryTitleCase,
} from "./injuryDerivations";
import {
  InjuryAvailabilityTimeline, buildInjuryNarrative, normalizeInjuryEvent,
  getDisplaySeverity, getSeverityClass, type InjuryEvent, type DisplaySeverity,
} from "./InjuryAvailabilityTimeline";
import { InjuryBodyMap } from "./InjuryBodyMap";

const INJURY_BADGE = "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap";
const INJURY_BODYPART_CHIP = "bg-slate-500/10 text-slate-600";
const INJURY_MISSED_CHIP = "bg-rose-500/10 text-rose-600";

function InjuryStatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-[13px] font-bold text-foreground mt-0.5 leading-tight">{value}</div>
    </div>
  );
}

function RiskBar({ label, level }: { label: string; level: RiskLevel }) {
  const style = RISK_LEVEL_STYLE[level];
  return (
    <div data-testid={`risk-${label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-+|-+$/g, "")}`}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-foreground">{label}</span>
        <span className={cn("text-[11px] font-bold uppercase tracking-wider", style.text)}>{style.label}</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full", style.bar)} style={{ width: `${style.score}%` }} />
      </div>
    </div>
  );
}

function collegeInjuryNarrative(e: CollegeInjuryEntry): string {
  const sig = e.significance === "high" ? "significant" : e.significance === "medium" ? "moderate" : e.significance === "low" ? "minor" : "documented";
  return e.year ? `A ${sig} pre-NFL injury during the ${e.year} season.` : `A ${sig} pre-NFL injury.`;
}

function rowSeverity(ev: InjuryEvent): DisplaySeverity {
  if ((ev.gamesMissed ?? 0) > 0) return getDisplaySeverity(ev);
  if (ev.severity === "major") return "major";
  if (ev.severity === "moderate") return "moderate";
  return "minor";
}

function weekShort(week: number | null | undefined): string {
  if (week == null) return "Wk —";
  if (week < 1) return "Preseason";
  return `Wk ${week}`;
}

function InjuryLogBadges({ ev }: { ev: InjuryEvent }) {
  const missed = ev.gamesMissed ?? 0;
  const pal = getSeverityClass(rowSeverity(ev));
  return (
    <span className="ml-auto flex flex-wrap items-center justify-end gap-1">
      <span className={cn(INJURY_BADGE, INJURY_BODYPART_CHIP)}>{ev.bodyPart ? injuryTitleCase(ev.bodyPart) : "Unknown"}</span>
      <span className={cn(INJURY_BADGE, pal.pillBg, pal.pillText)}>{pal.label}</span>
      {missed > 0
        ? <span className={cn(INJURY_BADGE, INJURY_MISSED_CHIP)}>{missed} game{missed === 1 ? "" : "s"} missed</span>
        : <span className={cn(INJURY_BADGE, "bg-emerald-500/10 text-emerald-600")}>Played through</span>}
    </span>
  );
}

function InjuryLogRow({ ev, open, onToggle }: { ev: InjuryEvent; open: boolean; onToggle: () => void }) {
  const pal = getSeverityClass(rowSeverity(ev));
  return (
    <div className="border-t border-border/50 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 text-left transition-colors hover:bg-muted/30"
      >
        <span className={cn("h-2 w-2 flex-shrink-0 rounded-full", pal.swatch)} aria-hidden />
        <span className="w-16 flex-shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground">{weekShort(ev.week)}</span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground">{ev.injury}</span>
        <InjuryLogBadges ev={ev} />
      </button>
      {open && (
        <div className="px-2 pb-2.5 pl-7 text-[12px] leading-relaxed text-muted-foreground">
          {buildInjuryNarrative(ev)}
          {ev.status && <span className="mt-1 block text-[11px]">Status: {ev.status}</span>}
        </div>
      )}
    </div>
  );
}

function SeasonLogGroup({ season, events, prefix, openKeys, onToggle }: {
  season: number; events: InjuryEvent[]; prefix: string;
  openKeys: Set<string>; onToggle: (k: string) => void;
}) {
  return (
    <div>
      <div className="px-2 pb-1 pt-2 text-[11px] font-black tabular-nums text-foreground">{season}</div>
      <div className="overflow-hidden rounded-lg border border-border/60">
        {events.map((ev, i) => {
          const key = `${prefix}-${season}-${i}`;
          return <InjuryLogRow key={key} ev={ev} open={openKeys.has(key)} onToggle={() => onToggle(key)} />;
        })}
      </div>
    </div>
  );
}

function CollegeLogGroup({ college, openKeys, onToggle }: {
  college: CollegeInjuryEntry[]; openKeys: Set<string>; onToggle: (k: string) => void;
}) {
  const sigSeverity = (s: CollegeInjuryEntry["significance"]): DisplaySeverity =>
    s === "high" ? "major" : s === "medium" ? "moderate" : "minor";
  const sigLabel = (s: CollegeInjuryEntry["significance"]) => (s === "high" ? "Major" : s === "medium" ? "Moderate" : "Minor");
  return (
    <div>
      <div className="flex items-center gap-1.5 px-2 pb-1 pt-2">
        <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">College &amp; Pre-NFL</span>
      </div>
      <div className="overflow-hidden rounded-lg border border-border/60">
        {college.map((e, i) => {
          const key = `col-${i}`;
          const open = openKeys.has(key);
          const pal = getSeverityClass(sigSeverity(e.significance));
          return (
            <div key={key} className="border-t border-border/50 first:border-t-0">
              <button
                type="button"
                onClick={() => onToggle(key)}
                aria-expanded={open}
                className="flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 text-left transition-colors hover:bg-muted/30"
              >
                <span className={cn("h-2 w-2 flex-shrink-0 rounded-full", pal.swatch)} aria-hidden />
                <span className="w-16 flex-shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground">{e.year ?? "—"}</span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground">{e.description || "Pre-NFL injury"}</span>
                <span className={cn(INJURY_BADGE, pal.pillBg, pal.pillText, "ml-auto")}>{sigLabel(e.significance)}</span>
              </button>
              {open && (
                <div className="px-2 pb-2.5 pl-7 text-[12px] leading-relaxed text-muted-foreground">{e.description || collegeInjuryNarrative(e)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const INJURY_LOG_FILTERS = [
  { key: "all", label: "All" },
  { key: "missed", label: "Missed Games" },
  { key: "major", label: "Major+" },
  { key: "played", label: "Played Through" },
  { key: "last3", label: "Last 3 Seasons" },
] as const;
type InjuryLogFilter = (typeof INJURY_LOG_FILTERS)[number]["key"];

function FullInjuryLogCard({ injury }: { injury: PlayerInjuryHistory }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<InjuryLogFilter>("all");
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const toggleRow = (k: string) =>
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const total = injury.nfl.length + injury.college.length;
  const nflEvents = useMemo(() => injury.nfl.map(normalizeInjuryEvent), [injury.nfl]);
  const maxSeason = useMemo(() => nflEvents.reduce((m, e) => Math.max(m, e.season), 0), [nflEvents]);

  const filtered = useMemo(() => nflEvents.filter((ev) => {
    switch (filter) {
      case "missed": return (ev.gamesMissed ?? 0) > 0;
      case "major": { const ds = getDisplaySeverity(ev); return ds === "major" || ds === "season-ending"; }
      case "played": return (ev.gamesMissed ?? 0) === 0;
      case "last3": return ev.season >= maxSeason - 2;
      default: return true;
    }
  }), [nflEvents, filter, maxSeason]);

  const seasonGroups = useMemo(() => {
    const map: Record<number, InjuryEvent[]> = {};
    for (const ev of filtered) (map[ev.season] ??= []).push(ev);
    return Object.entries(map)
      .map(([s, evs]) => [Number(s), evs.slice().sort((a, b) => (b.week ?? -1) - (a.week ?? -1))] as const)
      .sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const showCollege = filter === "all" && injury.college.length > 0;
  const empty = seasonGroups.length === 0 && !showCollege;

  return (
    <Card className="p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 text-left"
      >
        <ScrollText className="w-4 h-4 text-[#d4af37]" />
        <h3 className="text-sm font-bold text-foreground">Full Injury Log</h3>
        <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">({total})</span>
        <ChevronDown className={cn("ml-auto w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="mt-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {INJURY_LOG_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors",
                  filter === f.key
                    ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {empty ? (
            <p className="px-2 py-3 text-[12px] text-muted-foreground">No injuries match this filter.</p>
          ) : (
            <div className="space-y-2">
              {seasonGroups.map(([season, evs]) => (
                <SeasonLogGroup key={season} season={season} events={evs} prefix="nfl" openKeys={openKeys} onToggle={toggleRow} />
              ))}
              {showCollege && <CollegeLogGroup college={injury.college} openKeys={openKeys} onToggle={toggleRow} />}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export function InjuryTab({ injury, loading, error, playerName, knownSeasons = [], weeklyPlayed }: {
  injury: PlayerInjuryHistory | null;
  loading: boolean;
  error: boolean;
  playerName: string;
  knownSeasons?: number[];
  weeklyPlayed?: Record<number, number[]>;
}) {
  if (loading && !injury) return <Card className="p-6"><SkeletonLines n={6} /></Card>;
  if (error) {
    return <ComingSoon icon={HeartPulse} title="Injury history unavailable" body="We couldn't load injury history right now. Please try again later." />;
  }
  if (!injury || (!injury.nfl.length && !injury.college.length)) {
    return <ComingSoon icon={HeartPulse} title="No injury history found" body={`No documented NFL or college injuries for ${playerName}.`} />;
  }

  const summary = summarizeInjuries(injury);
  const risk = injury.score != null ? durabilityRiskLabel(injury.score) : null;
  const breakdown = injury.nfl.length > 0 ? computeRiskBreakdown(injury) : [];
  const timelineInsight = injury.nfl.length > 0 ? buildTimelineInsight(injury.nfl) : "";
  const stats: { label: string; value: string }[] = [
    { label: "Injuries Logged", value: `${summary.injuriesLogged}` },
    { label: "Games Missed", value: `${summary.totalMissed}` },
    { label: "Affected Regions", value: `${summary.affectedRegions}` },
    ...(summary.lastSeason != null ? [{ label: "Last Injury", value: `${summary.lastSeason}` }] : []),
  ];

  const summarySentence =
    `${summary.injuriesLogged} logged ${summary.injuriesLogged === 1 ? "injury" : "injuries"}` +
    (summary.affectedRegions > 0 ? ` across ${summary.affectedRegions} affected ${summary.affectedRegions === 1 ? "region" : "regions"}` : "") +
    (summary.totalMissed > 0 ? `, with ${summary.totalMissed} total ${summary.totalMissed === 1 ? "game" : "games"} missed.` : ", with no games missed to date.");
  const driverSentence = summary.primaryDriver
    ? (summary.primaryDriver.missed > 0
        ? `${summary.primaryDriver.label} caused the most missed time (${summary.primaryDriver.missed} game${summary.primaryDriver.missed === 1 ? "" : "s"}).`
        : `${summary.primaryDriver.label} is the most significant logged injury.`)
    : null;

  return (
    <div className="space-y-5">
      {injury.grade && (
        <Card className="p-4">
          <SectionTitle icon={Shield} title="Injury Risk Profile" />
          <div className="flex gap-3.5">
            <div
              className="flex flex-col items-center justify-center rounded-2xl border-2 w-[68px] h-[68px] flex-shrink-0"
              style={{ borderColor: injury.gradeColor ?? undefined }}
            >
              <span className="text-2xl font-black leading-none" style={{ color: injury.gradeColor ?? undefined }} data-testid="injury-grade">{injury.grade}</span>
              {injury.score != null && <span className="text-[11px] font-bold text-muted-foreground mt-0.5 tabular-nums">{injury.score}/100</span>}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={cn("text-base font-black leading-tight", risk?.className ?? "text-foreground")}>
                {risk ? `${risk.word} Injury Risk` : "Injury Risk"}
              </h3>
              <p className="text-[13px] text-muted-foreground mt-0.5 leading-relaxed">{summarySentence}</p>
            </div>
          </div>
          {stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {stats.map((s) => <InjuryStatPill key={s.label} label={s.label} value={s.value} />)}
            </div>
          )}
          {driverSentence && (
            <div className="mt-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Primary Risk Driver</div>
              <p className="text-[13px] text-foreground mt-0.5 leading-snug">{driverSentence}</p>
            </div>
          )}
        </Card>
      )}

      {injury.nfl.length > 0 && (
        <InjuryAvailabilityTimeline injuries={injury.nfl} knownSeasons={knownSeasons} weeklyPlayed={weeklyPlayed} insight={timelineInsight} />
      )}

      {(injury.nfl.length > 0 || breakdown.length > 0) && (
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          {injury.nfl.length > 0 && <InjuryBodyMap injuries={injury.nfl} />}
          {breakdown.length > 0 && (
            <Card className="p-5">
              <SectionTitle icon={AlertTriangle} title="Risk Breakdown" />
              <div className="space-y-3.5">
                {breakdown.map((r) => <RiskBar key={r.label} label={r.label} level={r.level} />)}
              </div>
              <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                Derived from this player's documented injury log — recency, recurrence, games lost, and how concentrated injuries are in one area.
              </p>
            </Card>
          )}
        </div>
      )}

      {(injury.nfl.length > 0 || injury.college.length > 0) && <FullInjuryLogCard injury={injury} />}
    </div>
  );
}

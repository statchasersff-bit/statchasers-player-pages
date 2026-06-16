import { useMemo, useState } from "react";
import { Card, Tooltip, TooltipTrigger, TooltipContent, cn } from "./ui";

const REGULAR_SEASON_WEEKS = 18;

export type InjuryEvent = {
  season: number;
  week?: number | null;
  injury: string;
  bodyPart?: string | null;
  side?: string | null;
  severity?: "minor" | "moderate" | "major" | "season-ending" | string | null;
  status?: string | null;
  gamesMissed?: number | null;
  description?: string | null;
  playedThrough?: boolean | null;
  missedWeeks?: number[] | null;
};

export type RawInjuryInput = {
  season: number;
  week?: number | null;
  type?: string | null;
  injury?: string | null;
  bodyPart?: string | null;
  side?: string | null;
  severity?: string | null;
  status?: string | null;
  gamesMissed?: number | null;
  description?: string | null;
  missedWeeks?: number[] | null;
  playedThrough?: boolean | null;
};

export type DisplaySeverity = "played" | "minor" | "moderate" | "major" | "season-ending";

type SeverityPalette = {
  label: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  cell: string;
  swatch: string;
};

const SEVERITY_PALETTE: Record<DisplaySeverity, SeverityPalette> = {
  played: {
    label: "Played Through",
    pillBg: "bg-emerald-500/10", pillText: "text-emerald-600", pillBorder: "border-emerald-500/30",
    cell: "bg-emerald-500/55 border-emerald-500/50 text-white", swatch: "bg-emerald-500",
  },
  minor: {
    label: "Minor",
    pillBg: "bg-sky-500/10", pillText: "text-sky-600", pillBorder: "border-sky-500/30",
    cell: "bg-sky-500/55 border-sky-500/50 text-white", swatch: "bg-sky-500",
  },
  moderate: {
    label: "Moderate",
    pillBg: "bg-yellow-500/10", pillText: "text-yellow-600", pillBorder: "border-yellow-500/30",
    cell: "bg-yellow-400/80 border-yellow-500/60 text-yellow-950", swatch: "bg-yellow-400",
  },
  major: {
    label: "Major",
    pillBg: "bg-orange-600/10", pillText: "text-orange-600", pillBorder: "border-orange-600/30",
    cell: "bg-orange-600/75 border-orange-600/60 text-white", swatch: "bg-orange-600",
  },
  "season-ending": {
    label: "Season-Ending",
    pillBg: "bg-rose-500/10", pillText: "text-rose-600", pillBorder: "border-rose-500/30",
    cell: "bg-rose-500/80 border-rose-500/60 text-white", swatch: "bg-rose-500",
  },
};

export const SEVERITY_RANK: Record<DisplaySeverity, number> = {
  played: 1, minor: 2, moderate: 3, major: 4, "season-ending": 5,
};

export function getSeverityClass(severity: DisplaySeverity): SeverityPalette {
  return SEVERITY_PALETTE[severity];
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

const SEASON_ENDING_KEYWORDS = ["season-ending", "season ending", "torn", "acl", "achilles", "rupture", "ir", "out for season"];

function isSeasonEnding(ev: InjuryEvent): boolean {
  if (ev.severity === "season-ending") return true;
  const missed = ev.gamesMissed ?? 0;
  if (missed >= 8) return true;
  const hay = `${ev.injury} ${ev.description ?? ""} ${ev.status ?? ""}`.toLowerCase();
  return SEASON_ENDING_KEYWORDS.some((k) => hay.includes(k));
}

export function getDisplaySeverity(ev: InjuryEvent): DisplaySeverity {
  const missed = ev.gamesMissed ?? 0;
  if (missed <= 0) return "played";
  if (isSeasonEnding(ev)) return "season-ending";
  if (ev.severity === "major") return "major";
  if (ev.severity === "moderate") return "moderate";
  if (ev.severity === "minor") return "minor";
  return "moderate";
}

export function normalizeInjuryEvent(raw: RawInjuryInput): InjuryEvent {
  const gamesMissed = raw.gamesMissed ?? 0;
  const sev = (raw.severity ?? "").toLowerCase();
  const severity =
    sev === "minor" || sev === "moderate" || sev === "major" || sev === "season-ending"
      ? (sev as InjuryEvent["severity"])
      : raw.severity ?? null;
  return {
    season: raw.season,
    week: raw.week ?? null,
    injury: (raw.injury ?? raw.type ?? "Injury").trim() || "Injury",
    bodyPart: raw.bodyPart ?? null,
    side: raw.side ?? null,
    severity,
    status: raw.status ?? null,
    gamesMissed,
    description: raw.description ?? null,
    playedThrough: raw.playedThrough ?? gamesMissed <= 0,
    missedWeeks: raw.missedWeeks ?? null,
  };
}

export function getMissedWeeks(ev: InjuryEvent): number[] {
  if (ev.missedWeeks && ev.missedWeeks.length) {
    return ev.missedWeeks.filter((w) => w >= 1 && w <= REGULAR_SEASON_WEEKS);
  }
  const missed = ev.gamesMissed ?? 0;
  if (missed <= 0 || ev.week == null) return [];
  const start = ev.week < 1 ? 1 : ev.week;
  const weeks: number[] = [];
  for (let i = 0; i < missed; i++) {
    const w = start + i;
    if (w >= 1 && w <= REGULAR_SEASON_WEEKS) weeks.push(w);
  }
  return weeks;
}

type SeasonSummary = { label: string; cls: string };

export function getSeasonSummary(events: InjuryEvent[], isKnownSeason: boolean): SeasonSummary {
  const totalMissed = events.reduce((sum, e) => sum + (e.gamesMissed ?? 0), 0);
  if (events.length === 0 && isKnownSeason) {
    return { label: "Full season", cls: "bg-emerald-500/10 text-emerald-600" };
  }
  if (totalMissed === 0) {
    return { label: "0 games missed", cls: "bg-emerald-500/10 text-emerald-600" };
  }
  return { label: `${totalMissed} game${totalMissed === 1 ? "" : "s"} missed`, cls: "bg-rose-500/10 text-rose-600" };
}

export function groupInjuriesBySeason(events: InjuryEvent[]): Record<number, InjuryEvent[]> {
  const out: Record<number, InjuryEvent[]> = {};
  for (const ev of events) {
    (out[ev.season] ??= []).push(ev);
  }
  return out;
}

type WeekState = { sev: DisplaySeverity; missed: boolean };
function computeWeekStates(events: InjuryEvent[]): Record<number, WeekState> {
  const map: Record<number, WeekState> = {};
  const consider = (wk: number, sev: DisplaySeverity, missed: boolean) => {
    if (wk < 1 || wk > REGULAR_SEASON_WEEKS) return;
    const rank = (missed ? 10 : 0) + SEVERITY_RANK[sev];
    const cur = map[wk];
    const curRank = cur ? (cur.missed ? 10 : 0) + SEVERITY_RANK[cur.sev] : -1;
    if (rank > curRank) map[wk] = { sev, missed };
  };
  for (const ev of events) {
    const ds = getDisplaySeverity(ev);
    const missedWeeks = getMissedWeeks(ev);
    if (missedWeeks.length) {
      missedWeeks.forEach((w) => consider(w, ds, true));
    } else if (ev.week != null && ev.week >= 1) {
      consider(ev.week, "played", false);
    }
  }
  return map;
}

const seasonWeekCount = (season: number) => (season >= 2021 ? 18 : 17);

export type WeekAvail = { status: "played" | "missed" | "out" | "off" | "na"; sev?: DisplaySeverity };
export function computeWeekAvailability(
  season: number,
  events: InjuryEvent[],
  playedWeeks: Set<number> | null,
): Record<number, WeekAvail> {
  const L = seasonWeekCount(season);
  const out: Record<number, WeekAvail> = {};

  if (playedWeeks && playedWeeks.size > 0) {
    const notPlayed: number[] = [];
    for (let w = 1; w <= L; w++) if (!playedWeeks.has(w)) notPlayed.push(w);
    const totalMissed = Math.max(0, L - 1 - playedWeeks.size);

    const available = new Set(notPlayed);
    const injSev: Record<number, DisplaySeverity> = {};
    let budget = totalMissed;
    const ordered = events
      .filter((e) => (e.gamesMissed ?? 0) > 0)
      .slice()
      .sort((a, b) => (a.week ?? 1) - (b.week ?? 1));
    for (const ev of ordered) {
      if (budget <= 0) break;
      const ds = getDisplaySeverity(ev);
      let claim = Math.min(ev.gamesMissed ?? 0, budget);
      for (let w = ev.week && ev.week >= 1 ? ev.week : 1; w <= L && claim > 0; w++) {
        if (available.has(w)) { injSev[w] = ds; available.delete(w); claim--; budget--; }
      }
    }

    const byeCount = Math.max(0, notPlayed.length - totalMissed);
    const playedOrEdge = (w: number) => w < 1 || w > L || playedWeeks.has(w);
    const byeWeeks = new Set(
      Array.from(available)
        .sort((a, b) => {
          const ia = (playedOrEdge(a - 1) ? 1 : 0) + (playedOrEdge(a + 1) ? 1 : 0);
          const ib = (playedOrEdge(b - 1) ? 1 : 0) + (playedOrEdge(b + 1) ? 1 : 0);
          return ib - ia || b - a;
        })
        .slice(0, byeCount),
    );

    for (let w = 1; w <= REGULAR_SEASON_WEEKS; w++) {
      if (w > L) out[w] = { status: "na" };
      else if (playedWeeks.has(w)) out[w] = { status: "played" };
      else if (injSev[w]) out[w] = { status: "missed", sev: injSev[w] };
      else if (byeWeeks.has(w)) out[w] = { status: "off" };
      else out[w] = { status: "out" };
    }
    return out;
  }

  const states = computeWeekStates(events);
  for (let w = 1; w <= REGULAR_SEASON_WEEKS; w++) {
    if (w > L) out[w] = { status: "na" };
    else if (states[w]?.missed) out[w] = { status: "missed", sev: states[w].sev };
    else out[w] = { status: "played" };
  }
  return out;
}

function availabilityCellClass(a: WeekAvail): string {
  switch (a.status) {
    case "missed": return getSeverityClass(a.sev ?? "moderate").cell;
    case "out":    return "border border-rose-500/30 bg-rose-500/15 text-rose-600/80";
    case "off":    return "border border-dashed border-border/50 bg-transparent text-muted-foreground/30";
    case "na":     return "border border-transparent bg-transparent text-transparent";
    default:       return "border border-border/60 bg-muted/40 text-muted-foreground/55";
  }
}

function seasonSummary(season: number, events: InjuryEvent[], isKnownSeason: boolean, playedWeeks: Set<number> | null): SeasonSummary {
  if (playedWeeks && playedWeeks.size > 0) {
    const gamesInSeason = seasonWeekCount(season) - 1;
    const missed = Math.max(0, gamesInSeason - playedWeeks.size);
    if (missed === 0) {
      return { label: events.length > 0 ? "0 games missed" : "Full season", cls: "bg-emerald-500/10 text-emerald-600" };
    }
    return { label: `${missed} game${missed === 1 ? "" : "s"} missed`, cls: "bg-rose-500/10 text-rose-600" };
  }
  return getSeasonSummary(events, isKnownSeason);
}

export function weekLabel(week: number | null | undefined): string {
  if (week == null) return "";
  if (week < 1) return "Preseason";
  return `Wk ${week}`;
}

function eventName(ev: InjuryEvent): string {
  const side = ev.side && ev.side !== "unknown" ? `${titleCase(ev.side)} ` : "";
  return `${side}${ev.injury}`;
}

const STATUS_TERMS = ["questionable", "doubtful", "probable", "game-time", "day-to-day"];

export function buildInjuryNarrative(ev: {
  season: number;
  week?: number | null;
  injury?: string | null;
  type?: string | null;
  bodyPart?: string | null;
  side?: string | null;
  gamesMissed?: number | null;
}): string {
  const type = (ev.injury ?? ev.type ?? "").trim();
  const typeLc = type.toLowerCase();
  const missed = ev.gamesMissed ?? 0;
  const when =
    ev.week == null ? `in ${ev.season}`
    : ev.week < 1 ? `during the ${ev.season} preseason`
    : `in Week ${ev.week} of ${ev.season}`;

  if (!type || STATUS_TERMS.some((w) => typeLc.includes(w))) {
    return missed > 0
      ? `Landed on the injury report ${when} and sat out ${missed} game${missed === 1 ? "" : "s"}.`
      : `Appeared on the injury report ${when} but suited up.`;
  }

  const side = ev.side && ev.side !== "unknown" ? ev.side.toLowerCase() : "";
  const bodyPart = ev.bodyPart ? ev.bodyPart.toLowerCase() : "";
  const parts: string[] = [];
  if (side && !typeLc.includes(side)) parts.push(side);
  if (bodyPart && !typeLc.includes(bodyPart)) parts.push(bodyPart);
  parts.push(typeLc);
  const ailment = parts.join(" ");

  return missed > 0
    ? `A ${ailment} ${when} kept him out for ${missed} game${missed === 1 ? "" : "s"}.`
    : `Battled a ${ailment} ${when} without missing any time.`;
}

export function getMarkerPosition(week: number | null | undefined): { left: string; centered: boolean; kind: "week" | "pre" | "unk" } {
  if (week == null) return { left: "0%", centered: false, kind: "unk" };
  if (week < 1) return { left: "0%", centered: false, kind: "pre" };
  const clamped = Math.min(Math.max(week, 1), REGULAR_SEASON_WEEKS);
  return { left: `${((clamped - 0.5) / REGULAR_SEASON_WEEKS) * 100}%`, centered: true, kind: "week" };
}

export type WeekGroup = {
  key: string;
  kind: "week" | "pre" | "unk";
  week: number | null;
  injuries: InjuryEvent[];
  severity: DisplaySeverity;
  anyMissed: boolean;
};

export function groupInjuriesByWeek(seasonInjuries: InjuryEvent[]): WeekGroup[] {
  const map: Record<string, InjuryEvent[]> = {};
  for (const ev of seasonInjuries) {
    const pos = getMarkerPosition(ev.week);
    const k = pos.kind === "week" ? `w${Math.min(Math.max(ev.week as number, 1), REGULAR_SEASON_WEEKS)}` : pos.kind;
    (map[k] ??= []).push(ev);
  }
  return Object.entries(map)
    .map(([k, injuries]) => {
      const kind: WeekGroup["kind"] = k.startsWith("w") ? "week" : (k as "pre" | "unk");
      const week = kind === "week" ? Number(k.slice(1)) : null;
      let severity: DisplaySeverity = "played";
      for (const ev of injuries) {
        const ds = getDisplaySeverity(ev);
        if (SEVERITY_RANK[ds] > SEVERITY_RANK[severity]) severity = ds;
      }
      return { key: k, kind, week, injuries, severity, anyMissed: injuries.some((e) => (e.gamesMissed ?? 0) > 0) };
    })
    .sort((a, b) => (a.week ?? -1) - (b.week ?? -1));
}

function SummaryBadge({ summary }: { summary: SeasonSummary }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", summary.cls)}>
      {summary.label}
    </span>
  );
}

function WeekCell({ week, avail }: { week: number; avail: WeekAvail }) {
  const title =
    avail.status === "missed" ? `Week ${week} — missed (${getSeverityClass(avail.sev ?? "moderate").label})`
    : avail.status === "out" ? `Week ${week} — did not play`
    : avail.status === "off" ? `Week ${week} — bye`
    : avail.status === "na" ? `No Week ${week} this season`
    : `Week ${week} — played`;
  return (
    <div
      title={title}
      className={cn(
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[5px] text-[9px] font-semibold tabular-nums sm:h-7 sm:w-7",
        availabilityCellClass(avail),
      )}
    >
      {avail.status === "na" ? "" : week}
    </div>
  );
}

function InjuryPill({ ev, open, onToggle }: { ev: InjuryEvent; open: boolean; onToggle: () => void }) {
  const pal = getSeverityClass(getDisplaySeverity(ev));
  const wk = weekLabel(ev.week);
  const missed = ev.gamesMissed ?? 0;
  const tooltip = [
    ev.injury,
    ev.bodyPart ? titleCase(ev.bodyPart) : null,
    wk || "Week unknown",
    pal.label,
    missed > 0 ? `${missed} games missed` : "Played through",
  ].filter(Boolean).join(" · ");

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      title={tooltip}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
        pal.pillBg, pal.pillText, pal.pillBorder,
        "hover:brightness-110",
        open && "ring-1 ring-[#d4af37]/60",
      )}
    >
      {wk && <span className="opacity-80">{wk}</span>}
      <span className="text-foreground">{eventName(ev)}</span>
      <span aria-hidden className="opacity-40">·</span>
      {missed > 0
        ? <span className="font-bold text-rose-600">{missed} missed</span>
        : <span className="opacity-80">Played through</span>}
    </button>
  );
}

function DetailPanel({ ev, onClose }: { ev: InjuryEvent; onClose: () => void }) {
  const pal = getSeverityClass(getDisplaySeverity(ev));
  const wk = weekLabel(ev.week);
  const missed = ev.gamesMissed ?? 0;
  return (
    <div className="mt-2 rounded-lg border border-border bg-muted/30 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-bold text-foreground">{ev.injury}</div>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
            {ev.bodyPart && (
              <span>{titleCase(ev.bodyPart)}{ev.side && ev.side !== "unknown" ? ` (${titleCase(ev.side)})` : ""}</span>
            )}
            <span>{wk || "Week unknown"}</span>
            <span className={cn("font-semibold", pal.pillText)}>{pal.label}</span>
            <span className={cn(missed > 0 && "font-semibold text-rose-600")}>
              {missed > 0 ? `${missed} games missed` : "Played through"}
            </span>
          </div>
        </div>
        <button type="button" onClick={onClose} className="flex-shrink-0 text-[11px] text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{buildInjuryNarrative(ev)}</p>
    </div>
  );
}

function MarkerTooltipBody({ events }: { events: InjuryEvent[] }) {
  return (
    <div className="max-w-[250px] space-y-2 p-2">
      {events.length > 1 && (
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{events.length} injuries this week</div>
      )}
      {events.map((ev, i) => {
        const pal = getSeverityClass(getDisplaySeverity(ev));
        const missed = ev.gamesMissed ?? 0;
        const wk = weekLabel(ev.week);
        return (
          <div key={i} className={cn(i > 0 && "border-t border-border/60 pt-2")}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-[13px] font-bold leading-tight text-foreground">{eventName(ev)}</span>
              <span className={cn("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", pal.pillBg, pal.pillText)}>{pal.label}</span>
            </div>
            <div className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
              {ev.season}{wk ? ` · ${wk}` : ""}{ev.bodyPart ? ` · ${titleCase(ev.bodyPart)}` : ""}
              {missed > 0
                ? <> · <span className="font-semibold text-rose-600">{missed} {missed === 1 ? "game" : "games"} missed</span></>
                : <> · <span className="text-emerald-600">played through</span></>}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/90">{buildInjuryNarrative(ev)}</p>
          </div>
        );
      })}
    </div>
  );
}

function CompactWeekCell({ week, avail }: { week: number; avail: WeekAvail }) {
  return (
    <div
      className={cn("flex h-7 items-start justify-center rounded-[3px] pt-0.5 text-[8px] font-semibold leading-none tabular-nums", availabilityCellClass(avail))}
      style={{ margin: "0 1.5px" }}
    >
      {avail.status === "na" ? "" : week}
    </div>
  );
}

function TimelineMarker({ group, selected, onSelect }: { group: WeekGroup; selected: boolean; onSelect: () => void }) {
  const pos = getMarkerPosition(group.kind === "week" ? group.week : group.kind === "pre" ? 0 : null);
  const pal = getSeverityClass(group.severity);
  const count = group.injuries.length;
  const ariaLabel = group.kind === "week" ? `Week ${group.week} injuries` : group.kind === "pre" ? "Preseason injury" : "Unknown-week injury";
  return (
    <div
      className="absolute bottom-[3px]"
      style={{ left: pos.left, transform: pos.centered ? "translateX(-50%)" : "translateX(0)" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onSelect}
            aria-label={ariaLabel}
            className="pointer-events-auto flex items-center justify-center transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            {group.kind !== "week" ? (
              <span className={cn("rounded px-1 text-[8px] font-bold uppercase leading-tight text-white", pal.swatch, selected && "ring-2 ring-[#d4af37]")}>
                {group.kind === "pre" ? "PRE" : "UNK"}
              </span>
            ) : count > 1 ? (
              <span className={cn("flex h-4 w-4 items-center justify-center rounded-full border border-background text-[8px] font-bold text-white", pal.swatch, selected && "ring-2 ring-[#d4af37]")}>
                {count}
              </span>
            ) : (
              <span className={cn("block h-2.5 w-2.5 rounded-full border border-background", pal.swatch, group.anyMissed && "ring-1 ring-background", selected && "ring-2 ring-[#d4af37]")} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" collisionPadding={10}>
          <MarkerTooltipBody events={group.injuries} />
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function CompactSeasonRow({
  season, events, isKnownSeason, playedWeeks, selectedKey, onSelect,
}: {
  season: number;
  events: InjuryEvent[];
  isKnownSeason: boolean;
  playedWeeks: Set<number> | null;
  selectedKey: string | null;
  onSelect: (key: string | null, injuries: InjuryEvent[], title: string) => void;
}) {
  const summary = seasonSummary(season, events, isKnownSeason, playedWeeks);
  const avail = useMemo(() => computeWeekAvailability(season, events, playedWeeks), [season, events, playedWeeks]);
  const groups = useMemo(() => groupInjuriesByWeek(events), [events]);
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/40 px-2.5 py-2.5 md:flex-row md:items-center md:gap-3" data-testid={`timeline-season-${season}`}>
      <div className="flex items-center justify-between md:block md:w-10 md:flex-shrink-0">
        <span className="text-sm font-black tabular-nums text-foreground">{season}</span>
        <div className="md:hidden"><SummaryBadge summary={summary} /></div>
      </div>
      <div className="min-w-0 flex-1 overflow-x-auto">
        <div className="relative min-w-[392px]">
          <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${REGULAR_SEASON_WEEKS}, minmax(0, 1fr))` }}>
            {Array.from({ length: REGULAR_SEASON_WEEKS }, (_, i) => i + 1).map((wk) => (
              <CompactWeekCell key={wk} week={wk} avail={avail[wk]} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0">
            {groups.map((g) => {
              const key = `${season}:${g.key}`;
              const title = `${season}${g.kind === "week" ? ` · Week ${g.week}` : g.kind === "pre" ? " · Preseason" : " · Week unknown"}`;
              return (
                <TimelineMarker
                  key={key}
                  group={g}
                  selected={selectedKey === key}
                  onSelect={() => onSelect(selectedKey === key ? null : key, g.injuries, title)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="hidden flex-shrink-0 text-right md:block">
        <SummaryBadge summary={summary} />
      </div>
    </div>
  );
}

function SelectedInjuryPanel({ title, injuries, onClose }: { title: string; injuries: InjuryEvent[]; onClose: () => void }) {
  return (
    <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
        <button type="button" onClick={onClose} className="text-[11px] text-muted-foreground hover:text-foreground">Close</button>
      </div>
      <div className="space-y-2">
        {injuries.map((ev, i) => {
          const pal = getSeverityClass(getDisplaySeverity(ev));
          const missed = ev.gamesMissed ?? 0;
          const wk = weekLabel(ev.week);
          return (
            <div key={i} className={cn(i > 0 && "border-t border-border/60 pt-2")}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[13px] font-bold text-foreground">{eventName(ev)}</span>
                <span className={cn("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", pal.pillBg, pal.pillText)}>{pal.label}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {ev.season}{wk ? ` · ${wk}` : ""}{ev.bodyPart ? ` · ${titleCase(ev.bodyPart)}` : ""}
                {missed > 0
                  ? <> · <span className="font-semibold text-rose-600">{missed} games missed</span></>
                  : " · played through"}
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{buildInjuryNarrative(ev)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailedSeasonRow({
  season, events, isKnownSeason, playedWeeks, openKey, setOpenKey,
}: {
  season: number;
  events: InjuryEvent[];
  isKnownSeason: boolean;
  playedWeeks: Set<number> | null;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
}) {
  const summary = seasonSummary(season, events, isKnownSeason, playedWeeks);
  const avail = useMemo(() => computeWeekAvailability(season, events, playedWeeks), [season, events, playedWeeks]);
  const openIdx = openKey?.startsWith(`${season}:`) ? Number(openKey.slice(openKey.indexOf(":") + 1)) : -1;
  const openEv = openIdx >= 0 ? events[openIdx] : undefined;

  return (
    <div className="rounded-lg border border-border bg-card/40 p-3" data-testid={`timeline-season-${season}`}>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
        <div className="flex items-center justify-between md:block md:w-12 md:flex-shrink-0 md:pt-0.5">
          <span className="text-base font-black tabular-nums text-foreground">{season}</span>
          <div className="md:hidden"><SummaryBadge summary={summary} /></div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="-mx-0.5 overflow-x-auto px-0.5 pb-1">
            <div className="flex min-w-min gap-1">
              {Array.from({ length: REGULAR_SEASON_WEEKS }, (_, i) => i + 1).map((wk) => (
                <WeekCell key={wk} week={wk} avail={avail[wk]} />
              ))}
            </div>
          </div>
          {events.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {events.map((ev, i) => {
                const key = `${season}:${i}`;
                return (
                  <InjuryPill
                    key={key}
                    ev={ev}
                    open={openKey === key}
                    onToggle={() => setOpenKey(openKey === key ? null : key)}
                  />
                );
              })}
            </div>
          )}
          {openEv && <DetailPanel ev={openEv} onClose={() => setOpenKey(null)} />}
        </div>
        <div className="hidden md:block md:w-28 md:flex-shrink-0 md:pt-0.5 md:text-right">
          <SummaryBadge summary={summary} />
        </div>
      </div>
    </div>
  );
}

const LEGEND_ORDER: DisplaySeverity[] = ["minor", "moderate", "major", "season-ending", "played"];

export function InjuryAvailabilityTimeline({
  injuries, knownSeasons = [], weeklyPlayed, insight, className,
}: {
  injuries: RawInjuryInput[];
  knownSeasons?: number[];
  weeklyPlayed?: Record<number, number[]>;
  insight?: string;
  className?: string;
}) {
  const events = useMemo(() => injuries.map(normalizeInjuryEvent), [injuries]);
  const bySeason = useMemo(() => groupInjuriesBySeason(events), [events]);
  const knownSet = useMemo(() => new Set(knownSeasons.filter((s) => Number.isFinite(s))), [knownSeasons]);
  const playedSets = useMemo(() => {
    const out: Record<number, Set<number>> = {};
    for (const [s, weeks] of Object.entries(weeklyPlayed ?? {})) {
      if (weeks && weeks.length > 0) out[Number(s)] = new Set(weeks);
    }
    return out;
  }, [weeklyPlayed]);

  const seasons = useMemo(() => {
    const set = new Set<number>(knownSet);
    events.forEach((e) => set.add(e.season));
    return Array.from(set).sort((a, b) => b - a);
  }, [events, knownSet]);

  const [mode, setMode] = useState<"compact" | "detailed">("compact");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ key: string; title: string; injuries: InjuryEvent[] } | null>(null);

  if (seasons.length === 0) return null;

  return (
    <Card className={cn("p-5", className)}>
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="sc-sectitle">
            Availability Timeline
          </h3>
          <div className="inline-flex flex-shrink-0 items-center rounded-md border border-border p-0.5">
            {(["compact", "detailed"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "rounded px-2 py-0.5 text-[11px] font-semibold capitalize transition-colors",
                  mode === m ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Season-by-season injury and missed-time history</p>
        {insight && <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">{insight}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {LEGEND_ORDER.map((sev) => (
            <span key={sev} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className={cn("h-2.5 w-2.5 rounded-[3px]", getSeverityClass(sev).swatch)} />
              {getSeverityClass(sev).label}
            </span>
          ))}
        </div>
      </div>

      <div className={cn("mt-4", mode === "compact" ? "space-y-2" : "space-y-2.5")}>
        {seasons.map((season) =>
          mode === "compact" ? (
            <CompactSeasonRow
              key={season}
              season={season}
              events={bySeason[season] ?? []}
              isKnownSeason={knownSet.has(season)}
              playedWeeks={playedSets[season] ?? null}
              selectedKey={selected?.key ?? null}
              onSelect={(key, injuries, title) => setSelected(key ? { key, title, injuries } : null)}
            />
          ) : (
            <DetailedSeasonRow
              key={season}
              season={season}
              events={bySeason[season] ?? []}
              isKnownSeason={knownSet.has(season)}
              playedWeeks={playedSets[season] ?? null}
              openKey={openKey}
              setOpenKey={setOpenKey}
            />
          ),
        )}
      </div>

      {mode === "compact" && selected && (
        <SelectedInjuryPanel title={selected.title} injuries={selected.injuries} onClose={() => setSelected(null)} />
      )}

      <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground/80">
        Played/missed is sourced from weekly game logs where available. Filled cells are games played; colored cells are weeks missed to a logged injury; red cells are other games not played; dashed cells are byes.
      </p>
    </Card>
  );
}

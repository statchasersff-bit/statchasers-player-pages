import { useMemo, useState } from "react";
import { PersonStanding } from "lucide-react";
import { Card, Tooltip, TooltipTrigger, TooltipContent, cn } from "./ui";
import {
  normalizeInjuryEvent,
  getDisplaySeverity,
  getSeverityClass,
  buildInjuryNarrative,
  weekLabel,
  type InjuryEvent,
  type RawInjuryInput,
  type DisplaySeverity,
} from "./InjuryAvailabilityTimeline";

type BodyRegion =
  | "head" | "neck" | "shoulder" | "arm" | "hand"
  | "chest" | "ribs" | "back" | "hip"
  | "upperLeg" | "knee" | "lowerLeg" | "foot";

const CENTRAL_REGIONS = new Set<BodyRegion>(["head", "neck", "chest", "ribs", "back", "hip"]);

const BODY_REGION_COORDS: Record<string, { x: number; y: number }> = {
  head: { x: 50, y: 9 },
  neck: { x: 50, y: 18 },
  leftShoulder: { x: 34, y: 24 }, rightShoulder: { x: 66, y: 24 }, shoulder: { x: 50, y: 22 },
  leftArm: { x: 26, y: 39 },     rightArm: { x: 74, y: 39 },      arm: { x: 50, y: 39 },
  leftHand: { x: 20, y: 56 },    rightHand: { x: 80, y: 56 },     hand: { x: 50, y: 50 },
  chest: { x: 50, y: 33 },
  ribs: { x: 50, y: 42 },
  back: { x: 50, y: 45 },
  hip: { x: 50, y: 58 },
  leftUpperLeg: { x: 42, y: 69 }, rightUpperLeg: { x: 58, y: 69 }, upperLeg: { x: 50, y: 69 },
  leftKnee: { x: 42, y: 80 },     rightKnee: { x: 58, y: 80 },     knee: { x: 50, y: 80 },
  leftLowerLeg: { x: 42, y: 89 }, rightLowerLeg: { x: 58, y: 89 }, lowerLeg: { x: 50, y: 89 },
  leftFoot: { x: 39, y: 96 },     rightFoot: { x: 61, y: 96 },     foot: { x: 50, y: 96 },
};

const REGION_KEYWORDS: { region: BodyRegion; keywords: string[] }[] = [
  { region: "head",     keywords: ["head", "concussion", "skull", "face", "jaw", "eye", "nose"] },
  { region: "neck",     keywords: ["neck", "stinger", "burner"] },
  { region: "shoulder", keywords: ["shoulder", "clavicle", "collarbone", "ac joint", "rotator"] },
  { region: "hand",     keywords: ["wrist", "hand", "thumb", "finger"] },
  { region: "arm",      keywords: ["arm", "elbow", "bicep", "tricep", "forearm", "ucl"] },
  { region: "chest",    keywords: ["chest", "pec", "sternum"] },
  { region: "ribs",     keywords: ["rib", "abdomen", "oblique", "core", "ab "] },
  { region: "back",     keywords: ["back", "spine", "spinal", "lumbar", "disc", "vertebra"] },
  { region: "hip",      keywords: ["hip", "groin", "pelvis", "glute"] },
  { region: "upperLeg", keywords: ["hamstring", "quad", "thigh", "femur"] },
  { region: "knee",     keywords: ["knee", "acl", "mcl", "pcl", "patella", "meniscus"] },
  { region: "lowerLeg", keywords: ["calf", "shin", "achilles", "tibia", "fibula"] },
  { region: "foot",     keywords: ["ankle", "foot", "toe", "heel", "plantar", "lisfranc"] },
];

const FRIENDLY_REGION: Record<BodyRegion, string> = {
  head: "head", neck: "neck", shoulder: "shoulder", arm: "arm/elbow", hand: "hand/wrist",
  chest: "chest", ribs: "rib/core", back: "back", hip: "hip/groin",
  upperLeg: "hamstring/thigh", knee: "knee", lowerLeg: "calf/shin", foot: "foot/ankle",
};

const UPPER_BODY = new Set<BodyRegion>(["head", "neck", "shoulder", "arm", "hand", "chest", "ribs", "back"]);

export function getBodyRegion(ev: InjuryEvent): BodyRegion | null {
  const hay = `${ev.bodyPart ?? ""} ${ev.injury ?? ""}`.toLowerCase();
  for (const { region, keywords } of REGION_KEYWORDS) {
    if (keywords.some((k) => hay.includes(k))) return region;
  }
  return null;
}

export function getBodySide(ev: InjuryEvent): "left" | "right" | null {
  const side = (ev.side ?? "").toLowerCase();
  if (side === "left" || side === "right") return side;
  const hay = `${ev.bodyPart ?? ""} ${ev.injury ?? ""} ${ev.description ?? ""}`.toLowerCase();
  if (/\bleft\b/.test(hay)) return "left";
  if (/\bright\b/.test(hay)) return "right";
  return null;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function resolveRegionKey(ev: InjuryEvent): string | null {
  const region = getBodyRegion(ev);
  if (!region) return null;
  if (CENTRAL_REGIONS.has(region)) return region;
  const side = getBodySide(ev);
  return side ? `${side}${cap(region)}` : region;
}

export function getRegionCoordinates(key: string): { x: number; y: number } | null {
  return BODY_REGION_COORDS[key] ?? null;
}

const SEVERITY_ORDER: DisplaySeverity[] = ["played", "minor", "moderate", "major", "season-ending"];

export function getHighestSeverity(events: InjuryEvent[]): DisplaySeverity {
  let best: DisplaySeverity = "played";
  for (const ev of events) {
    const ds = getDisplaySeverity(ev);
    if (SEVERITY_ORDER.indexOf(ds) > SEVERITY_ORDER.indexOf(best)) best = ds;
  }
  return best;
}

function markerSeverity(s: DisplaySeverity): Exclude<DisplaySeverity, "played"> {
  return s === "played" ? "minor" : s;
}

type RegionRisk = "low" | "moderate" | "high";
type RegionStat = { region: BodyRegion; count: number; gamesMissed: number; severity: DisplaySeverity; level: RegionRisk };

export function getMostAffectedRegions(events: InjuryEvent[], limit = 6): RegionStat[] {
  const byRegion: Record<string, InjuryEvent[]> = {};
  for (const ev of events) {
    const region = getBodyRegion(ev);
    if (!region) continue;
    (byRegion[region] ??= []).push(ev);
  }
  return Object.entries(byRegion)
    .map(([region, evs]) => {
      const gamesMissed = evs.reduce((s, e) => s + (e.gamesMissed ?? 0), 0);
      const count = evs.length;
      const level: RegionRisk = gamesMissed >= 6 || count >= 3 ? "high" : gamesMissed >= 2 || count >= 2 ? "moderate" : "low";
      return { region: region as BodyRegion, count, gamesMissed, severity: getHighestSeverity(evs), level };
    })
    .sort((a, b) => b.gamesMissed - a.gamesMissed || b.count - a.count)
    .slice(0, limit);
}

const REGION_RISK_STYLE: Record<RegionRisk, { label: string; text: string }> = {
  low:      { label: "Low",      text: "text-emerald-600" },
  moderate: { label: "Moderate", text: "text-amber-600" },
  high:     { label: "High",     text: "text-rose-600" },
};

export function groupInjuriesByRegion(events: InjuryEvent[]): Record<string, InjuryEvent[]> {
  const out: Record<string, InjuryEvent[]> = {};
  for (const ev of events) {
    const key = resolveRegionKey(ev);
    if (!key) continue;
    (out[key] ??= []).push(ev);
  }
  return out;
}

const MARKER_GLOW: Record<Exclude<DisplaySeverity, "played">, string> = {
  minor: "ring-teal-300/70",
  moderate: "ring-amber-300/70",
  major: "ring-orange-300/80",
  "season-ending": "ring-rose-300/80",
};

export function getMarkerClass(severity: DisplaySeverity, missed: boolean): string {
  const ms = markerSeverity(severity);
  return cn(
    "flex items-center justify-center rounded-full border border-black/25 font-bold tabular-nums text-white shadow-sm transition-transform",
    getSeverityClass(ms).swatch,
    missed && `ring-2 ring-offset-2 ring-offset-background ${MARKER_GLOW[ms]}`,
  );
}

const joinWithAnd = (parts: string[]) =>
  parts.length <= 1 ? (parts[0] ?? "") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;

export function buildBodyMapSummary(events: InjuryEvent[]): string {
  const mapped = events.filter((e) => getBodyRegion(e));
  if (mapped.length === 0) return "No body-region-tagged injuries to map yet.";

  const byRegion: Record<string, number> = {};
  let upper = 0; let lower = 0;
  let missedRegion: BodyRegion | null = null; let missedMax = 0;
  for (const ev of mapped) {
    const region = getBodyRegion(ev)!;
    byRegion[region] = (byRegion[region] ?? 0) + 1;
    if (UPPER_BODY.has(region)) upper++; else lower++;
    const missed = ev.gamesMissed ?? 0;
    if (missed > missedMax) { missedMax = missed; missedRegion = region; }
  }

  const where = upper > lower ? "upper body" : lower > upper ? "lower body" : "upper and lower body";
  const top = Object.entries(byRegion)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([region, n]) => `${n} ${FRIENDLY_REGION[region as BodyRegion]} ${n === 1 ? "injury" : "injuries"}`);

  let summary = `Injury history is concentrated in the ${where}`;
  if (top.length) summary += `, with ${joinWithAnd(top)}`;
  summary += ".";
  summary += missedMax > 0 && missedRegion
    ? ` Missed time stems mainly from ${FRIENDLY_REGION[missedRegion]} issues.`
    : " None of these injuries cost regular-season games.";
  return summary;
}

function buildMarkerLabel(events: InjuryEvent[]): string {
  if (events.length === 1) {
    const ev = events[0];
    const missed = ev.gamesMissed ?? 0;
    return [
      ev.injury,
      `${ev.season}${weekLabel(ev.week) ? ` ${weekLabel(ev.week)}` : ""}`,
      getSeverityClass(getDisplaySeverity(ev)).label,
      missed > 0 ? `${missed} games missed` : "played through",
    ].filter(Boolean).join(" · ");
  }
  const totalMissed = events.reduce((s, e) => s + (e.gamesMissed ?? 0), 0);
  return `${events.length} injuries · ${getSeverityClass(getHighestSeverity(events)).label} worst · ${totalMissed} games missed`;
}

function MarkerTooltipBody({ events }: { events: InjuryEvent[] }) {
  return (
    <div className="max-w-[250px] space-y-2 p-2">
      {events.length > 1 && (
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {events.length} injuries logged here
        </div>
      )}
      {events.map((ev, i) => {
        const pal = getSeverityClass(getDisplaySeverity(ev));
        const missed = ev.gamesMissed ?? 0;
        const wk = weekLabel(ev.week);
        return (
          <div key={i} className={cn(i > 0 && "border-t border-border/60 pt-2")}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-[13px] font-bold leading-tight text-foreground">{ev.injury}</span>
              <span className={cn("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", pal.pillBg, pal.pillText)}>
                {pal.label}
              </span>
            </div>
            <div className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
              {ev.season}{wk ? ` · ${wk}` : ""}
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

function RegionMarker({ regionKey, events, selected, onToggle }: {
  regionKey: string; events: InjuryEvent[]; selected: boolean; onToggle: () => void;
}) {
  const coord = getRegionCoordinates(regionKey);
  if (!coord) return null;
  const highest = getHighestSeverity(events);
  const anyMissed = events.some((e) => (e.gamesMissed ?? 0) > 0);
  const count = events.length;
  const size = count > 1 ? 24 : 18;
  const single = count === 1 ? events[0] : null;

  return (
    <div
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
      style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={selected}
            aria-label={buildMarkerLabel(events)}
            className={cn(
              getMarkerClass(highest, anyMissed),
              "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]",
              selected && "scale-110 ring-2 ring-offset-2 ring-offset-background ring-[#d4af37]",
            )}
            style={{ width: size, height: size, fontSize: size > 20 ? 11 : 9 }}
          >
            {count > 1 ? count : ""}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" collisionPadding={10}>
          <MarkerTooltipBody events={events} />
        </TooltipContent>
      </Tooltip>
      {single && (
        <span className="rounded bg-background/70 px-1 text-[8px] font-semibold leading-tight tabular-nums text-muted-foreground backdrop-blur-sm">
          {single.season}
        </span>
      )}
    </div>
  );
}

function RegionInjuryList({ events, onClose }: { events: InjuryEvent[]; onClose: () => void }) {
  return (
    <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {events.length} {events.length === 1 ? "injury" : "injuries"} at this region
        </span>
        <button type="button" onClick={onClose} className="text-[11px] text-muted-foreground hover:text-foreground">Close</button>
      </div>
      <div className="space-y-1.5">
        {events.map((ev, i) => {
          const pal = getSeverityClass(getDisplaySeverity(ev));
          const missed = ev.gamesMissed ?? 0;
          const wk = weekLabel(ev.week);
          return (
            <div key={i} className="text-[12px] leading-snug">
              <span className="font-semibold text-foreground">{ev.injury}</span>
              <span className="text-muted-foreground">
                {" "}· {ev.season}{wk ? ` ${wk}` : ""} · <span className={pal.pillText}>{pal.label}</span>
                {" "}· {missed > 0 ? <span className="font-semibold text-rose-600">{missed} games missed</span> : "played through"}
              </span>
              <p className="mt-0.5 text-[11px] text-muted-foreground/80">{buildInjuryNarrative(ev)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const LEGEND: Exclude<DisplaySeverity, "played">[] = ["season-ending", "major", "moderate", "minor"];
const LEGEND_LABEL: Record<Exclude<DisplaySeverity, "played">, string> = {
  "season-ending": "Season-Ending", major: "Major / IR", moderate: "Moderate", minor: "Minor",
};

function BodySilhouette() {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-muted-foreground/70" aria-hidden>
      <g stroke="currentColor" strokeOpacity={0.16} strokeLinecap="round" fill="none">
        <line x1={50} y1={15} x2={50} y2={20} strokeWidth={3} />
        <line x1={40} y1={24} x2={60} y2={24} strokeWidth={4} />
        <line x1={39} y1={25} x2={25} y2={53} strokeWidth={3.5} />
        <line x1={61} y1={25} x2={75} y2={53} strokeWidth={3.5} />
        <line x1={46} y1={58} x2={43} y2={94} strokeWidth={4} />
        <line x1={54} y1={58} x2={57} y2={94} strokeWidth={4} />
      </g>
      <g fill="currentColor" fillOpacity={0.09} stroke="currentColor" strokeOpacity={0.14} strokeWidth={0.5}>
        <circle cx={50} cy={9} r={6} />
        <path d="M41 23 Q40 23 40 25 L42 56 Q42 59 45 59 L55 59 Q58 59 58 56 L60 25 Q60 23 59 23 Z" />
        <ellipse cx={42.5} cy={95.5} rx={3.5} ry={2} />
        <ellipse cx={57.5} cy={95.5} rx={3.5} ry={2} />
      </g>
    </svg>
  );
}

export function InjuryBodyMap({ injuries, className }: { injuries: RawInjuryInput[]; className?: string }) {
  const events = useMemo(() => injuries.map(normalizeInjuryEvent), [injuries]);
  const grouped = useMemo(() => groupInjuriesByRegion(events), [events]);
  const summary = useMemo(() => buildBodyMapSummary(events), [events]);
  const topRegions = useMemo(() => getMostAffectedRegions(events), [events]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const regionKeys = Object.keys(grouped);
  if (regionKeys.length === 0) return null;

  const selectedEvents = selectedKey ? grouped[selectedKey] : null;

  return (
    <Card className={cn("p-5", className)}>
      <div>
        <h3 className="flex items-center gap-2 text-sm font-black text-foreground">
          <PersonStanding className="h-4 w-4 text-[#d4af37]" />
          Body Map
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Career injury locations by body region</p>
      </div>

      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[230px] rounded-xl border border-border/60 bg-muted/10">
        <BodySilhouette />
        {regionKeys.map((key) => (
          <RegionMarker
            key={key}
            regionKey={key}
            events={grouped[key]}
            selected={selectedKey === key}
            onToggle={() => setSelectedKey(selectedKey === key ? null : key)}
          />
        ))}
      </div>

      {selectedEvents && <RegionInjuryList events={selectedEvents} onClose={() => setSelectedKey(null)} />}

      {topRegions.length > 0 && (
        <div className="mt-4">
          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Most Affected Regions</div>
          <div className="space-y-1">
            {topRegions.map((r) => (
              <div key={r.region} className="flex items-center justify-between gap-2 text-[12px]">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className={cn("h-2 w-2 flex-shrink-0 rounded-full", getSeverityClass(markerSeverity(r.severity)).swatch)} />
                  <span className="truncate font-semibold text-foreground">{cap(FRIENDLY_REGION[r.region])}</span>
                </span>
                <span className="flex-shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
                  {r.count} {r.count === 1 ? "injury" : "injuries"} · {r.gamesMissed} missed ·{" "}
                  <span className={cn("font-semibold", REGION_RISK_STYLE[r.level].text)}>{REGION_RISK_STYLE[r.level].label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-3">
        {LEGEND.map((sev) => (
          <span key={sev} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={cn("h-2.5 w-2.5 rounded-full", getSeverityClass(sev).swatch)} />
            {LEGEND_LABEL[sev]}
          </span>
        ))}
      </div>
    </Card>
  );
}

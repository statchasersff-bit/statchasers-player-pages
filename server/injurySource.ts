export type InjurySeverity = "major" | "moderate" | "minor";
export type InjurySignificance = "high" | "medium" | "low";

export interface NflInjuryEntry {
  season: number;
  week: number | null;
  type: string;
  bodyPart: string | null;
  side: string | null;
  severity: InjurySeverity | null;
  gamesMissed: number | null;
  description: string;
}
export interface CollegeInjuryEntry {
  year: number | null;
  significance: InjurySignificance | null;
  description: string;
}
export interface PlayerInjuryHistory {
  grade: string | null;
  score: number | null;
  gradeColor: string | null;
  nfl: NflInjuryEntry[];
  college: CollegeInjuryEntry[];
}

const SEVERITY_MAP: Record<string, InjurySeverity> = { ma: "major", mo: "moderate", mi: "minor" };
const SIGNIFICANCE: ReadonlySet<string> = new Set(["high", "medium", "low"]);

export function rosterAuditSlug(name: string): string {
  return (name || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractPlayerData(html: string): any | null {
  const marker = 'data-player-data="';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const from = start + marker.length;
  const end = html.indexOf('"', from);
  if (end === -1) return null;
  const decoded = decodeHtmlEntities(html.slice(from, end));
  try {
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#0?34;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#0?47;/g, "/")
    .replace(/&amp;/g, "&");
}

function toNum(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : null;
}

function normalize(injury: any): PlayerInjuryHistory {
  const nflRaw: any[] = Array.isArray(injury?.nfl) ? injury.nfl : [];
  const preRaw: any[] = Array.isArray(injury?.pre_nfl) ? injury.pre_nfl : [];

  const nfl: NflInjuryEntry[] = nflRaw
    .map((e) => ({
      season: toNum(e?.s) ?? 0,
      week: toNum(e?.w),
      type: String(e?.t ?? "").trim() || "Injury",
      bodyPart: e?.b ? String(e.b) : null,
      side: e?.side ? String(e.side) : null,
      severity: SEVERITY_MAP[String(e?.sv ?? "").toLowerCase()] ?? null,
      gamesMissed: toNum(e?.g),
      description: String(e?.d ?? "").trim(),
    }))
    .sort((a, b) => b.season - a.season || (b.week ?? 0) - (a.week ?? 0));

  const college: CollegeInjuryEntry[] = preRaw
    .map((e) => {
      const sig = String(e?.sig ?? "").toLowerCase();
      return {
        year: toNum(e?.year),
        significance: SIGNIFICANCE.has(sig) ? (sig as InjurySignificance) : null,
        description: String(e?.desc ?? "").trim(),
      };
    })
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return {
    grade: injury?.grade ? String(injury.grade) : null,
    score: toNum(injury?.score),
    gradeColor: injury?.grade_color ? String(injury.grade_color) : null,
    nfl,
    college,
  };
}

export async function fetchPlayerInjuryHistory(
  name: string,
  sleeperId?: string | null,
): Promise<PlayerInjuryHistory | null> {
  const slug = rosterAuditSlug(name);
  if (!slug) return null;

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 10_000);
  let html: string;
  try {
    const res = await fetch(`https://rosteraudit.com/players/${slug}/`, {
      signal: ac.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html",
      },
    });
    if (!res.ok) return null;
    html = await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }

  const data = extractPlayerData(html);
  if (!data?.injury) return null;

  const scrapedId = data?.player?.sleeper_id;
  if (sleeperId && scrapedId != null && String(scrapedId) !== String(sleeperId)) {
    return null;
  }

  return normalize(data.injury);
}

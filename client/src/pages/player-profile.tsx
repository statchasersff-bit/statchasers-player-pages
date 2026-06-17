import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Trophy,
  BarChart3,
  FileText,
  User,
  Activity,
  Ruler,
  Weight,
  Calendar,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Newspaper,
  Table,
  ExternalLink,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Info,
  RefreshCcw,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  HeartPulse,
} from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Player, GameLogEntry, NewsEntry, GameLogStats, GameScore } from "@shared/playerTypes";
import {
  fetchPlayerProduction,
  fetchPlayerGameLogs,
  type SleeperScoring,
  type PlayerProductionSeason,
  type PlayerGameLogRow,
} from "@/lib/sleeperApi";
import { TEAM_FULL_NAMES, TEAM_PRIMARY_COLORS, POSITION_FULL_NAMES, deriveSeasonTeam } from "@shared/teamMappings";
import { type ScoringFormat, SCORING_LABELS, getEntryPoints } from "@shared/scoring";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdvancedTab } from "@/components/AdvancedTab";
import { loadPlayerAdvancedStats, loadPlayerSeasonQualification } from "@/lib/playerAdvancedStats";
import type { PlayerAdvancedResult, AdvancedQualification } from "@/lib/playerAdvancedStats";
import { InjuryTab } from "@/components/injury/InjuryTab";
import { fetchPlayerInjuryHistory, type PlayerInjuryHistory } from "@/components/injury/injuryApi";
import SearchHero from "@/components/SearchHero";

type AdvSeason = 2025 | 2024 | 2023 | "all";

type LightPlayer = {
  id: string;
  name: string;
  slug: string;
  team: string;
  position: string;
  posRank: number;
  ppg: number;
};

type RelatedResponse = {
  neighbors: LightPlayer[];
  currentRank: number;
  currentPpg?: number;
  season: number;
  format: string;
  position: string;
};

function formatHeight(inches: string | null): string {
  if (!inches) return '';
  const total = parseInt(inches, 10);
  if (isNaN(total) || total <= 0) return inches;
  const feet = Math.floor(total / 12);
  const rem = total % 12;
  return `${feet}'${rem}"`;
}

const POSITION_COLORS: Record<string, string> = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def",
};

const TAB_KEYS = ["overview", "gamelog", "advanced", "injury", "news"] as const;
type TabKey = typeof TAB_KEYS[number];

const TAB_CONFIG: { key: TabKey; label: string; icon: typeof Activity }[] = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "gamelog", label: "Game Log", icon: Table },
  { key: "advanced", label: "Advanced Stats", icon: Layers },
  { key: "injury", label: "Injury & Health", icon: HeartPulse },
];

function getHeadshotUrl(playerId: string): string {
  return `https://sleepercdn.com/content/nfl/players/thumb/${playerId}.jpg`;
}

// "#FB4F14" -> "251,79,20" for use in rgba(); falls back to the brand blue.
function hexToRgbTriplet(hex?: string): string {
  const m = (hex || '').replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return '11,58,122';
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}

// Hero photo card. Tries the full-resolution headshot, falls back to the
// low-res thumb, then to a generic icon. Border/shadow come from the parent's
// --team-rgb variable so the team accent stays subtle.
function PlayerHeadshot({ playerId, name, team }: { playerId: string; name: string; teamColor?: string; team?: string }) {
  // 0 = full image, 1 = thumb, 2 = icon fallback
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const src = stage === 0 ? `https://sleepercdn.com/content/nfl/players/${playerId}.jpg` : getHeadshotUrl(playerId);

  return (
    <div className="player-photo-card" data-testid="img-headshot">
      {stage < 2 ? (
        <img
          src={src}
          alt={`${name} headshot`}
          className="player-photo-card__img"
          onError={() => setStage((s) => (s === 0 ? 1 : 2))}
        />
      ) : (
        <div className="player-photo-card__fallback" data-testid="img-headshot-fallback">
          <User className="w-16 h-16 text-slate-400" />
        </div>
      )}
    </div>
  );
}

// Rectangular headshot for a peer-rail card. Falls back to the player's
// initials over the team-color wash when the CDN has no image.
function PeerPhoto({ playerId, name }: { playerId: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    return <span className="sc-peer-card__initials" data-testid={`img-neighbor-${playerId}`}>{initials}</span>;
  }
  return (
    <img
      src={getHeadshotUrl(playerId)}
      alt={name}
      loading="lazy"
      className="sc-peer-card__img"
      onError={() => setFailed(true)}
      data-testid={`img-neighbor-${playerId}`}
    />
  );
}

type PeerEntry = {
  id: string; name: string; slug: string; team: string;
  position: string; posRank: number; ppg: number; isCurrent: boolean;
};

// "Nearby Positional Peers" — a horizontal card rail of the players ranked
// closest to the current player, with the current player inserted in true rank
// order and highlighted ("You Are Here").
function RankNeighborsRail({ player, related }: { player: Player; related: RelatedResponse }) {
  const pos = related.position || player.position || '';

  const entries: PeerEntry[] = useMemo(() => {
    const list: PeerEntry[] = related.neighbors.map((n) => ({
      id: n.id, name: n.name, slug: n.slug, team: n.team,
      position: n.position, posRank: n.posRank, ppg: n.ppg, isCurrent: false,
    }));
    list.push({
      id: player.id,
      name: player.name,
      slug: player.slug,
      team: player.seasonTeam || player.team || '',
      position: pos,
      posRank: related.currentRank,
      ppg: related.currentPpg ?? 0,
      isCurrent: true,
    });
    return list.sort((a, b) => a.posRank - b.posRank);
  }, [related, player, pos]);

  const ranks = entries.map((e) => e.posRank);
  const currentIndex = entries.findIndex((e) => e.isCurrent);

  // Center the current player's card within the rail on mount — scrolls only
  // the rail container, never the page.
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    const card = rail?.children[currentIndex] as HTMLElement | undefined;
    if (!rail || !card) return;
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    rail.scrollLeft += (cardRect.left - railRect.left) - (rail.clientWidth - cardRect.width) / 2;
  }, [entries, currentIndex]);

  return (
    <div className="mt-8">
      <div className="sc-finish2__title-row mb-1">
        <h2 className="sc-finish2__title" data-testid="text-related-heading">
          Nearby Positional Peers
        </h2>
      </div>
      <p className="sc-finish2__subtitle mb-4" data-testid="text-related-subtitle">
        Players ranked closest to {player.name} based on {related.season} {pos} production ({related.format.toUpperCase()}) &middot; {pos}{Math.min(...ranks)}–{pos}{Math.max(...ranks)}
      </p>
      <div className="sc-peer-rail" data-testid="peer-rail" ref={railRef}>
        {entries.map((e) => {
          const teamColor = TEAM_PRIMARY_COLORS[e.team] || '#6B7280';
          return (
            <Link key={e.id} href={`/nfl/players/${e.slug}/`}>
              <div
                className={`sc-peer-card${e.isCurrent ? ' sc-peer-card--current' : ''}`}
                style={{ ['--peer-team' as string]: teamColor } as React.CSSProperties}
                data-testid={`card-peer-${e.slug}`}
              >
                <div className="sc-peer-card__photo">
                  <PeerPhoto playerId={e.id} name={e.name} />
                  <span className="sc-peer-card__rank">{e.position}{e.posRank}</span>
                  {e.isCurrent && <span className="sc-peer-card__here">You Are Here</span>}
                </div>
                <div className="sc-peer-card__body">
                  <p className="sc-peer-card__name">{e.name}</p>
                  <p className="sc-peer-card__meta">{e.position} &middot; {e.team}</p>
                  <p className="sc-peer-card__value"><b>{e.ppg.toFixed(1)}</b> PPG</p>
                </div>
                {e.team && (
                  <img
                    className="sc-peer-card__logo"
                    src={`https://sleepercdn.com/images/team_logos/nfl/${e.team.toLowerCase()}.png`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <span className="sc-peer-card__cta">View Player</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="sc-section-header">
      <p className="sc-section-header__title">{title}</p>
      <div className="sc-section-header__bar" />
      {subtitle && <p className="sc-section-header__subtitle">{subtitle}</p>}
    </div>
  );
}

function StatBox({ label, value, sub, tintClass, children }: { label: string; value: string | number; sub?: string; tintClass?: string; children?: React.ReactNode }) {
  return (
    <div className={`sc-gamelog__stat-box ${tintClass || ''}`}>
      <p className="sc-gamelog__stat-label">{label}</p>
      <p className="sc-gamelog__stat-value" data-testid={`text-statbox-${label.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
      {sub && <p className="sc-gamelog__stat-sub">{sub}</p>}
      {children}
    </div>
  );
}

function SnapshotItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 dark:bg-slate-800/60">
      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground text-sm" data-testid={`text-snapshot-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {value != null && value !== "" ? value : "\u2014"}
        </p>
      </div>
    </div>
  );
}

type ColumnDef = { key: string; label: string; abbr?: string };

function getPositionColumns(position: string | null): { primary: ColumnDef[]; detail: ColumnDef[]; conditionalRush?: boolean } {
  switch (position) {
    case "QB":
      return {
        primary: [
          { key: "pass_yd", label: "PASS YDS" },
          { key: "pass_td", label: "PASS TD" },
          { key: "pass_int", label: "INT" },
          { key: "rush_yd", label: "RUSH YDS" },
          { key: "rush_td", label: "RUSH TD" },
        ],
        detail: [
          { key: "pass_cmp", label: "CMP" },
          { key: "pass_att", label: "ATT" },
          { key: "rush_att", label: "CAR" },
        ],
      };
    case "RB":
      return {
        primary: [
          { key: "rush_att", label: "CAR" },
          { key: "rush_yd", label: "RUSH YDS" },
          { key: "rush_td", label: "RUSH TD" },
          { key: "rec", label: "REC" },
          { key: "rec_yd", label: "REC YDS" },
        ],
        detail: [
          { key: "rec_tgt", label: "TGT" },
          { key: "rec_td", label: "REC TD" },
        ],
      };
    case "WR":
    case "TE":
      return {
        primary: [
          { key: "rec_tgt", label: "TGT" },
          { key: "rec", label: "REC" },
          { key: "rec_yd", label: "REC YDS" },
          { key: "rec_td", label: "REC TD" },
        ],
        detail: [],
        conditionalRush: true,
      };
    case "K":
      return {
        primary: [
          { key: "fgm", label: "FGM" },
          { key: "fga", label: "FGA" },
          { key: "xpm", label: "XPM" },
          { key: "xpa", label: "XPA" },
        ],
        detail: [
          { key: "fgm_lng", label: "FG LNG" },
        ],
      };
    default:
      return { primary: [], detail: [] };
  }
}

function getTierThresholds(position: string | null): { bust: number; hasTier3: boolean } {
  return { bust: 36, hasTier3: true };
}

function getTierLabel(position: string | null, tier: number): string {
  const pos = position || 'FLEX';
  return `${pos}${tier}`;
}

function hasParticipation(stats: GameLogEntry['stats'], position: string | null): boolean {
  const s = stats as unknown as Record<string, number | null | undefined>;
  if ((s.off_snp ?? 0) > 0) return true;
  if (position === 'QB') return (s.pass_att ?? 0) > 0 || (s.rush_att ?? 0) > 0;
  if (position === 'K') return (s.fga ?? 0) > 0 || (s.xpa ?? 0) > 0;
  return (s.rec_tgt ?? 0) > 0 || (s.rec ?? 0) > 0 || (s.rush_att ?? 0) > 0 || (s.pass_att ?? 0) > 0;
}

function fpts(entry: GameLogEntry, format: ScoringFormat): number {
  return getEntryPoints(entry.stats, format);
}

function computeGameLogStats(entries: GameLogEntry[], position: string | null = null, format: ScoringFormat = 'ppr') {
  if (entries.length === 0) return null;
  const activeEntries = entries.filter(e => e.game_status === 'active');
  const playedEntries = activeEntries.length > 0 ? activeEntries : entries.filter(e => hasParticipation(e.stats, position));
  const gamesPlayed = playedEntries.length;
  const totalPts = playedEntries.reduce((s, e) => s + fpts(e, format), 0);
  const ppg = gamesPlayed > 0 ? totalPts / gamesPlayed : 0;
  const bestWeek = playedEntries.length > 0
    ? playedEntries.reduce((best, e) => fpts(e, format) > fpts(best, format) ? e : best, playedEntries[0])
    : entries[0];
  const last4 = playedEntries.slice(-4);
  const last4Pts = last4.reduce((s, e) => s + fpts(e, format), 0);
  const last4Ppg = last4.length > 0 ? last4Pts / last4.length : 0;

  const { bust: bustThreshold, hasTier3 } = getTierThresholds(position);
  const ranked = playedEntries.filter(e => e.pos_rank != null);
  const pos1Games = ranked.filter(e => e.pos_rank! >= 1 && e.pos_rank! <= 12).length;
  const pos2End = hasTier3 ? 24 : bustThreshold;
  const pos2Games = ranked.filter(e => e.pos_rank! >= 13 && e.pos_rank! <= pos2End).length;
  const pos3Games = hasTier3 ? ranked.filter(e => e.pos_rank! >= 25 && e.pos_rank! <= bustThreshold).length : 0;
  const bustGames = ranked.filter(e => e.pos_rank! > bustThreshold).length;
  const pos1Pct = gamesPlayed > 0 ? (pos1Games / gamesPlayed) * 100 : 0;
  const pos2Pct = gamesPlayed > 0 ? (pos2Games / gamesPlayed) * 100 : 0;
  const pos3Pct = gamesPlayed > 0 ? (pos3Games / gamesPlayed) * 100 : 0;
  const bustPct = gamesPlayed > 0 ? (bustGames / gamesPlayed) * 100 : 0;

  const ptsArr = playedEntries.map(e => fpts(e, format));
  const mean = ptsArr.length > 0 ? ptsArr.reduce((a, b) => a + b, 0) / ptsArr.length : 0;
  const volatility = ptsArr.length > 1
    ? Math.sqrt(ptsArr.reduce((s, v) => s + (v - mean) ** 2, 0) / (ptsArr.length - 1))
    : 0;

  const gooseEggs = playedEntries.filter(e => fpts(e, format) === 0).length;
  const gooseEggPct = gamesPlayed > 0 ? (gooseEggs / gamesPlayed) * 100 : 0;

  return { gamesPlayed, totalPts, ppg, bestWeek, last4Ppg, pos1Pct, pos2Pct, pos3Pct, bustPct, pos1Games, pos2Games, pos3Games, bustGames, volatility, gooseEggPct };
}

function getRankColor(rank: number | null | undefined): string {
  if (!rank) return '';
  if (rank <= 12) return 'text-yellow-500 dark:text-yellow-400 font-semibold';
  if (rank <= 24) return 'text-slate-400 dark:text-slate-300 font-semibold';
  if (rank <= 36) return 'text-amber-700 dark:text-amber-600 font-semibold';
  return 'text-red-500 dark:text-red-400';
}

function getTierBadge(rank: number | null | undefined, position: string | null): { label: string; className: string } | null {
  if (!rank) return null;
  const pos = position || 'FLEX';
  const { bust, hasTier3 } = getTierThresholds(position);
  if (rank <= 12) return { label: `${pos}1`, className: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400' };
  if (rank <= 24) return { label: `${pos}2`, className: 'bg-slate-400/15 text-slate-500 dark:text-slate-300' };
  if (rank <= 36) return { label: `${pos}3`, className: 'bg-amber-700/15 text-amber-700 dark:text-amber-600' };
  return { label: 'Bust', className: 'bg-red-500/15 text-red-500 dark:text-red-400' };
}

/**
 * Fantasy finish tier for a season-end positional rank. Distinct from the
 * weekly getTierBadge (POS1/2/3/Bust) — these are coarse "how good was the
 * whole season" labels used by the Season-End Finishes timeline.
 */
function getFinishBadge(rank: number | null | undefined, position: string | null): { label: string; className: string } | null {
  if (!rank) return null;
  const pos = (position || '').toUpperCase();
  const elite = 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400';
  const starter = 'bg-green-500/15 text-green-600 dark:text-green-400';
  const flex = 'bg-blue-500/15 text-blue-600 dark:text-blue-400';
  const depth = 'bg-slate-400/15 text-slate-500 dark:text-slate-300';
  const bench = 'bg-amber-600/15 text-amber-700 dark:text-amber-500';
  const poor = 'bg-red-500/15 text-red-500 dark:text-red-400';
  if (pos === 'QB' || pos === 'TE') {
    if (rank <= 5) return { label: 'Elite', className: elite };
    if (rank <= 12) return { label: 'Starter', className: starter };
    if (rank <= 20) return { label: 'Streaming', className: flex };
    if (rank <= 32) return { label: 'Depth', className: depth };
    return { label: 'Poor', className: poor };
  }
  // RB / WR (and any FLEX-eligible fallback)
  if (rank <= 12) return { label: 'Elite', className: elite };
  if (rank <= 24) return { label: 'Strong Starter', className: starter };
  if (rank <= 36) return { label: 'Flex', className: flex };
  if (rank <= 60) return { label: 'Depth', className: depth };
  if (rank <= 90) return { label: 'Bench', className: bench };
  return { label: 'Poor', className: poor };
}

function getOppRankColor(rank: number | null | undefined): string {
  if (!rank) return 'text-muted-foreground';
  if (rank <= 8) return 'text-red-500 dark:text-red-400';
  if (rank >= 25) return 'text-green-600 dark:text-green-400';
  return 'text-muted-foreground';
}

type SortKey = 'week' | 'fpts' | 'finish' | string;
type SortDir = 'asc' | 'desc';

function MiniBarChart({ data, height = 80, color = "bg-primary/60" }: { data: number[]; height?: number; color?: string }) {
  if (data.length === 0) return null;
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-[2px]" style={{ height }}>
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
          <div
            className={`w-full ${color} rounded-t-sm min-h-[2px]`}
            style={{ height: `${(val / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function computeRollingAvg(data: number[], window: number = 3): number[] {
  return data.map((_, i) => {
    const start = Math.max(0, i - window + 1);
    const slice = data.slice(start, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

function getTrendColor(pct: number): string {
  const abs = Math.abs(pct);
  if (pct > 0) return 'text-green-600 dark:text-green-400';
  if (abs <= 10) return 'text-amber-600 dark:text-amber-400';
  if (abs <= 25) return 'text-red-400 dark:text-red-400';
  return 'text-red-600 dark:text-red-500';
}

function LineChartSVG({ data, rollingAvg, bestIdx, height = 120, label, accentColor = "#0b3a7a", showAvgLine = false, highlightLast = 0, showRecentFormLabel = false, thickLine = false, showGridLines = false }: {
  data: number[];
  rollingAvg?: number[];
  bestIdx?: number;
  height?: number;
  label?: string;
  accentColor?: string;
  showAvgLine?: boolean;
  highlightLast?: number;
  showRecentFormLabel?: boolean;
  thickLine?: boolean;
  showGridLines?: boolean;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const padding = { top: 10, bottom: 24, left: 0, right: 0 };
  const chartH = height - padding.top - padding.bottom;
  const viewW = 400;

  const toPoint = (val: number, i: number) => {
    const x = padding.left + (i / (data.length - 1)) * (viewW - padding.left - padding.right);
    const y = padding.top + chartH - (val / max) * chartH;
    return { x, y };
  };

  const points = data.map((v, i) => toPoint(v, i));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${padding.top + chartH} L${points[0].x},${padding.top + chartH} Z`;

  let rollingPath = '';
  if (rollingAvg) {
    const rPoints = rollingAvg.map((v, i) => toPoint(v, i));
    rollingPath = rPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  }

  const bestPoint = bestIdx != null && bestIdx >= 0 ? points[bestIdx] : null;

  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const avgY = padding.top + chartH - (avg / max) * chartH;

  const hlStart = highlightLast > 0 && data.length >= highlightLast
    ? points[data.length - highlightLast].x
    : null;

  const uid = label || 'default';

  return (
    <div data-testid="chart-line-svg">
      <svg viewBox={`0 0 ${viewW} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
          {hlStart != null && (
            <linearGradient id={`hl-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
              <stop offset="30%" stopColor={accentColor} stopOpacity="0.06" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
            </linearGradient>
          )}
        </defs>

        {showGridLines && (() => {
          const gridCount = 4;
          const lines = [];
          for (let i = 1; i < gridCount; i++) {
            const gy = padding.top + (chartH * i) / gridCount;
            lines.push(<line key={i} x1={0} y1={gy} x2={viewW} y2={gy} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3 3" />);
          }
          return <>{lines}</>;
        })()}

        {hlStart != null && (
          <>
            <rect x={hlStart} y={padding.top} width={viewW - hlStart} height={chartH} fill={`url(#hl-${uid})`} rx="4" />
            {showRecentFormLabel && (
              <text x={viewW - 6} y={padding.top + 10} textAnchor="end" className="fill-muted-foreground" fontSize="8" opacity="0.35" fontWeight="500" letterSpacing="0.5">Recent Form</text>
            )}
          </>
        )}

        {showAvgLine && (
          <>
            <rect x={0} y={avgY - 6} width={viewW} height={12} fill={accentColor} opacity="0.04" rx="2" />
            <line x1={0} y1={avgY} x2={viewW} y2={avgY} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.12" />
            <text x={viewW - 8} y={avgY - 10} textAnchor="end" className="fill-muted-foreground" fontSize="9" opacity="0.25">avg {avg.toFixed(1)}</text>
          </>
        )}

        <path d={areaPath} fill={`url(#fill-${uid})`} />
        <path d={linePath} fill="none" stroke={accentColor} strokeWidth={thickLine ? "2.5" : "2"} strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
        {rollingPath && (
          <path d={rollingPath} fill="none" stroke="#F5C01A" strokeWidth={thickLine ? "3.5" : "2.5"} strokeLinejoin="round" strokeLinecap="round" />
        )}
        {bestPoint && (
          <>
            <circle cx={bestPoint.x} cy={bestPoint.y} r="8" fill={accentColor} opacity="0.12" />
            <circle cx={bestPoint.x} cy={bestPoint.y} r="4" fill={accentColor} stroke="white" strokeWidth="1.5" />
          </>
        )}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill={accentColor} opacity="0.4" />
        ))}
        <text x={points[0].x} y={height - 4} textAnchor="start" className="fill-muted-foreground" fontSize="10">Wk 1</text>
        <text x={points[points.length - 1].x} y={height - 4} textAnchor="end" className="fill-muted-foreground" fontSize="10">Wk {data.length}</text>
      </svg>
    </div>
  );
}

function TrendIndicator({ current, previous }: { current: number; previous: number }) {
  const diff = current - previous;
  const pct = previous > 0 ? ((diff / previous) * 100) : 0;
  if (Math.abs(diff) < 0.5) {
    return <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Minus className="w-3 h-3" /> Steady</span>;
  }
  if (diff > 0) {
    return <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +{pct.toFixed(0)}%</span>;
  }
  return <span className="text-xs text-red-500 dark:text-red-400 flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3" /> {pct.toFixed(0)}%</span>;
}

interface OutlookData {
  formLabel: string;
  formDetail: string;
  formColor: string;
  roleLabel: string;
  volatilityLabel: string;
  volatilityColor: string;
  tierProfile: string;
  sentence: string;
  hasData: boolean;
  noDataMsg?: string;
}

function getStructuredOutlook(player: Player, stats: ReturnType<typeof computeGameLogStats>, format: ScoringFormat = 'ppr'): OutlookData {
  if (!stats || stats.gamesPlayed === 0) {
    return {
      formLabel: 'No Data', formDetail: '', formColor: 'text-muted-foreground',
      roleLabel: 'Unknown', volatilityLabel: 'N/A', volatilityColor: 'text-muted-foreground',
      tierProfile: 'N/A', sentence: `Check back as the season progresses for updated analysis.`,
      hasData: false, noDataMsg: `${player.name} has not recorded any fantasy points this season.`,
    };
  }
  const pos = player.position || 'FLEX';
  const ppgDelta = stats.ppg > 0 ? ((stats.last4Ppg - stats.ppg) / stats.ppg) * 100 : 0;
  const formLabel = ppgDelta > 5 ? 'Heating Up' : ppgDelta < -10 ? 'Cooling' : 'Stable';
  const formDetail = `${ppgDelta > 0 ? '+' : ''}${ppgDelta.toFixed(0)}% vs season avg`;
  const formColor = ppgDelta > 5 ? 'text-green-600 dark:text-green-400' : ppgDelta < -10 ? 'text-red-500 dark:text-red-400' : 'text-foreground';

  const topRate = stats.pos1Pct + stats.pos2Pct;
  const roleLabel = topRate >= 60 ? 'Starter' : topRate >= 35 ? 'Flex' : 'Depth';

  const cvRatio = stats.ppg > 0 ? stats.volatility / stats.ppg : 2;
  const volatilityLabel = cvRatio < 0.4 ? 'Low' : cvRatio < 0.7 ? 'Moderate' : 'High';
  const volatilityColor = cvRatio < 0.4 ? 'text-green-600 dark:text-green-400' : cvRatio < 0.7 ? 'text-foreground' : 'text-red-500 dark:text-red-400';

  const tierProfile = `${stats.pos1Pct.toFixed(0)}% ${getTierLabel(pos, 1)} rate`;
  const bestWeekStr = stats.bestWeek ? `Best outing: Wk ${stats.bestWeek.week} vs ${stats.bestWeek.opp} (${fpts(stats.bestWeek, format).toFixed(1)} pts).` : '';
  const sentence = bestWeekStr;

  return { formLabel, formDetail, formColor, roleLabel, volatilityLabel, volatilityColor, tierProfile, sentence, hasData: true };
}

function getKeyStatSummary(entries: GameLogEntry[], position: string | null) {
  if (entries.length === 0) return [];
  const stats: { label: string; total: number; perGame: number }[] = [];
  const gp = entries.filter(e => hasParticipation(e.stats, position)).length || 1;
  const sum = (key: string) => entries.reduce((s, e) => s + ((e.stats as unknown as Record<string, number>)[key] ?? 0), 0);

  if (position === 'QB') {
    const passYd = sum('pass_yd');
    const passTd = sum('pass_td');
    const rushYd = sum('rush_yd');
    stats.push({ label: 'Pass YDS', total: passYd, perGame: passYd / gp });
    stats.push({ label: 'Pass TD', total: passTd, perGame: passTd / gp });
    stats.push({ label: 'Rush YDS', total: rushYd, perGame: rushYd / gp });
    stats.push({ label: 'INT', total: sum('pass_int'), perGame: sum('pass_int') / gp });
  } else if (position === 'RB') {
    const rushYd = sum('rush_yd');
    const recYd = sum('rec_yd');
    stats.push({ label: 'Rush YDS', total: rushYd, perGame: rushYd / gp });
    stats.push({ label: 'Rush TD', total: sum('rush_td'), perGame: sum('rush_td') / gp });
    stats.push({ label: 'REC', total: sum('rec'), perGame: sum('rec') / gp });
    stats.push({ label: 'Rec YDS', total: recYd, perGame: recYd / gp });
  } else if (position === 'WR' || position === 'TE') {
    const recYd = sum('rec_yd');
    stats.push({ label: 'TGT', total: sum('rec_tgt'), perGame: sum('rec_tgt') / gp });
    stats.push({ label: 'REC', total: sum('rec'), perGame: sum('rec') / gp });
    stats.push({ label: 'Rec YDS', total: recYd, perGame: recYd / gp });
    stats.push({ label: 'Rec TD', total: sum('rec_td'), perGame: sum('rec_td') / gp });
  } else if (position === 'K') {
    stats.push({ label: 'FGM', total: sum('fgm'), perGame: sum('fgm') / gp });
    stats.push({ label: 'FGA', total: sum('fga'), perGame: sum('fga') / gp });
    stats.push({ label: 'XPM', total: sum('xpm'), perGame: sum('xpm') / gp });
  }
  return stats;
}

function getRollingAverage(entries: GameLogEntry[], key: string, window: number = 3): number[] {
  const vals = entries.map(e => (e.stats as unknown as Record<string, number>)[key] ?? 0);
  const result: number[] = [];
  for (let i = 0; i < vals.length; i++) {
    const start = Math.max(0, i - window + 1);
    const slice = vals.slice(start, i + 1);
    result.push(slice.reduce((a, b) => a + b, 0) / slice.length);
  }
  return result;
}

interface SeasonStat {
  season: number;
  ppg: number;
  gamesPlayed: number;
  pos1Pct: number;
  pos2Pct: number;
  pos3Pct: number;
  bustPct: number;
}

interface CareerProfile {
  ppg: number;
  gamesPlayed: number;
  maxGames: number;
  durabilityPct: number;
  pos1Pct: number;
  pos2Pct: number;
  pos3Pct: number;
  bustPct: number;
  volatility: number;
  volatilityLabel: string;
  seasons: number;
  seasonPpgs: { season: number; ppg: number }[];
  smallSample: boolean;
}

interface CareerSeasonStat {
  season: number;
  gp: number;
  ppg: number;
  posRank: number | null;
  pass_att: number;
  pass_cmp: number;
  pass_yd: number;
  pass_td: number;
  pass_int: number;
  rush_att: number;
  rush_yd: number;
  rush_td: number;
  targets: number;
  receptions: number;
  rec_yd: number;
  rec_td: number;
  total_td: number;
  scrimmage_yd: number;
}

type BenchmarkData = {
  position: string;
  season: number;
  qualifiedThreshold: number;
  posAvg: { yardsPerCatch: number | null; catchPct: number | null; tdPerTarget: number | null };
  percentile: { yardsPerCatch: number | null; catchPct: number | null; tdPerTarget: number | null } | null;
  playerQualified: boolean;
} | null;

type PlayerWithSeasons = Player & {
  availableSeasons?: number[];
  seasonLabel?: string | null;
  seasonRank?: number | null;
  seasonTeam?: string | null;
  multiSeasonStats?: SeasonStat[];
  careerSeasonStats?: CareerSeasonStat[];
  careerProfile?: CareerProfile | null;
  productionRiskBenchmarks?: BenchmarkData;
};

function generateFantasyOutlookSummary(player: PlayerWithSeasons, stats: ReturnType<typeof computeGameLogStats>, format: ScoringFormat): string[] {
  if (!stats || stats.gamesPlayed === 0) return [];
  const pos = player.position || '';
  const name = player.name || 'This player';
  // Historical/completed-season copy must use the team the player actually
  // played for that season — NOT the current (post-offseason) team.
  const currentTeam = player.team || '';
  const seasonTeamAbbr = player.seasonTeam || deriveSeasonTeam(player.gameLog || [], currentTeam) || currentTeam;
  const team = seasonTeamAbbr;
  const teamFull = TEAM_FULL_NAMES[team] || team;
  const currentTeamFull = currentTeam ? (TEAM_FULL_NAMES[currentTeam] || currentTeam) : '';
  const teamChanged = !!(seasonTeamAbbr && currentTeam && seasonTeamAbbr !== currentTeam && currentTeam !== 'FA');
  const season = player.season || 2025;
  const ppg = stats.ppg.toFixed(1);
  const gp = stats.gamesPlayed;
  const pos1PctNum = stats.pos1Pct;
  const pos1Pct = pos1PctNum.toFixed(0);
  const topRate = stats.pos1Pct + stats.pos2Pct;
  const bustPct = stats.bustPct.toFixed(0);
  const ppgDelta = stats.ppg > 0 ? ((stats.last4Ppg - stats.ppg) / stats.ppg) * 100 : 0;
  const trendWord = ppgDelta > 8 ? 'trending upward' : ppgDelta < -12 ? 'cooling late in the year' : 'relatively steady';
  const roleWord = topRate >= 60 ? 'a reliable weekly starter' : topRate >= 35 ? 'a flex-range contributor' : 'a situational option';
  const cvRatio = stats.ppg > 0 ? stats.volatility / stats.ppg : 2;
  const varianceWord = cvRatio < 0.4 ? 'low week-to-week variance' : cvRatio < 0.7 ? 'moderate week-to-week variance' : 'high week-to-week variance';
  const cp = player.careerProfile;
  const seasonsPlayed = cp ? cp.seasons : 1;

  const p1Parts: string[] = [];
  p1Parts.push(`${name} finished the ${season} season as ${roleWord} at the ${pos} position`);
  if (teamFull) p1Parts.push(`playing for the ${teamFull}`);
  p1Parts.push(`averaging ${ppg} fantasy points per game across ${gp} games`);
  if (player.seasonRank) p1Parts.push(`and finishing as the ${pos}${player.seasonRank} overall`);
  const p1 = p1Parts.join(', ') + '.';

  let p2 = '';
  if (pos === 'QB') {
    if (pos1PctNum >= 50) {
      p2 = `He finished inside the top-12 at quarterback in ${pos1Pct}% of his starts, showing strong weekly reliability with ${varianceWord}. Production was ${trendWord} heading into the final stretch of the season. That ceiling rate places him firmly in QB1 territory for redraft formats heading into 2026.`;
    } else if (pos1PctNum >= 25) {
      p2 = `He landed in the top-12 at quarterback ${pos1Pct}% of the time, with ${varianceWord} in weekly output. Production was ${trendWord} late in the season. That finish rate puts him in the QB2 range for most formats, with upside in favorable matchups.`;
    } else if (pos1PctNum > 0) {
      p2 = `He reached the top-12 at quarterback in just ${pos1Pct}% of starts, with ${varianceWord} around a below-starter scoring baseline. Production was ${trendWord} heading into the final stretch. At this volume and finish rate, he projects as a streaming option rather than a reliable weekly starter for 2026.`;
    } else {
      p2 = `He did not finish inside the top-12 at quarterback in any of his ${gp} active games this season, with ${varianceWord} around a below-starter scoring level. Production was ${trendWord} late in the season. That output places him outside reliable starter range heading into 2026 planning.`;
    }
  } else if (pos === 'RB') {
    const tierLabel = topRate >= 60 ? '24' : '36';
    if (topRate >= 40) {
      p2 = `His scoring profile showed ${varianceWord}, finishing as a top-${tierLabel} back ${pos1Pct}% of the time. Production was ${trendWord} late in the season. The bust rate of ${bustPct}% is an important floor signal for lineup decisions, particularly in PPR formats where receiving work adds a secondary scoring lane.`;
    } else {
      p2 = `He finished as a top-${tierLabel} back in just ${pos1Pct}% of games, with ${varianceWord} around a below-starter workload. Production was ${trendWord} late in the season. A bust rate of ${bustPct}% reflects the limited upside weeks and signals a depth or handcuff profile rather than a consistent starter.`;
    }
  } else if (pos === 'WR') {
    if (pos1PctNum >= 30) {
      p2 = `His weekly profile showed ${varianceWord}, converting into a top-24 receiver finish ${pos1Pct}% of the time. Scoring was ${trendWord} over the second half of the schedule. Both ceiling and floor are tied closely to target volume and red-zone looks, making matchup awareness more impactful than for run-first options.`;
    } else {
      p2 = `He reached a top-24 receiver finish in just ${pos1Pct}% of games, with ${varianceWord} around a limited target role. Scoring was ${trendWord} over the second half of the schedule. At this finish rate, he fits a depth or matchup-play profile rather than a reliable flex option.`;
    }
  } else if (pos === 'TE') {
    if (pos1PctNum >= 30) {
      p2 = `His weekly output showed ${varianceWord}, landing inside the top-12 at tight end ${pos1Pct}% of the time. Scoring was ${trendWord} as the season progressed. At tight end, where positional depth is thin, consistent target volume and red-zone involvement carry outsized value.`;
    } else {
      p2 = `He finished inside the top-12 at tight end in just ${pos1Pct}% of games, with ${varianceWord} around a limited role. Scoring was ${trendWord} as the season progressed. That finish rate reflects a depth profile rather than a reliable starting tight end option.`;
    }
  } else {
    p2 = `His weekly output showed ${varianceWord}, finishing in a startable range ${pos1Pct}% of the time. Production was ${trendWord} late in the season.`;
  }

  let p3 = '';
  if (cp && seasonsPlayed >= 2) {
    const durPct = cp.durabilityPct.toFixed(0);
    const careerPpg = cp.ppg.toFixed(1);
    p3 = `Across ${cp.seasons} seasons, ${name} has averaged ${careerPpg} points per game with a durability rate of ${durPct}%, appearing in ${cp.gamesPlayed} of ${cp.maxGames} possible games. That track record provides helpful context for evaluating whether the ${season} production reflects a true baseline or a short-term variance window.`;
  }

  const transition = teamChanged
    ? `He is now with the ${currentTeamFull} after spending the ${season} season with the ${teamFull}.`
    : '';

  return [p1, transition, p2, p3].filter(Boolean);
}

function generateRoleStabilityRisk(
  player: PlayerWithSeasons,
  stability: number,
  stabilityLabel: string,
  stabilityMicroText: string | null,
  tdDep: { pct: number; label: string; tag: string; isHigh: boolean },
  momentumScore: number,
): { cards: { label: string; value: string; sub?: string; color: string }[]; insight: string } {
  const pos = player.position || '';
  const name = player.name || 'This player';

  const stabilityColor = stability >= 70 ? '#22c55e' : stability >= 45 ? '#f59e0b' : '#ef4444';
  const tdColor = tdDep.pct >= 40 ? '#f59e0b' : tdDep.pct >= 25 ? '#94a3b8' : '#22c55e';
  const directionColor = momentumScore >= 60 ? '#22c55e' : momentumScore <= 39 ? '#ef4444' : '#f59e0b';
  const directionLabel = momentumScore >= 80 ? 'Expanding fast' : momentumScore >= 60 ? 'Expanding' : momentumScore <= 25 ? 'Declining sharply' : momentumScore <= 39 ? 'Declining' : 'Stable';

  const cards = [
    { label: 'Role Stability', value: `${stability}/100`, sub: stabilityLabel, color: stabilityColor },
    { label: 'TD Dependency', value: `${tdDep.pct.toFixed(0)}%`, sub: tdDep.label, color: tdColor },
    { label: 'Role Direction', value: directionLabel, sub: `Score: ${momentumScore}/100`, color: directionColor },
    ...(stabilityMicroText ? [{ label: 'Volume Variance', value: stabilityMicroText.replace(/Workload varies /i, '').replace(/Targets vary /i, ''), sub: 'Week-to-week spread', color: '#94a3b8' }] : []),
  ];

  let insight = '';
  if (stability >= 70 && tdDep.pct < 35) {
    insight = `${name}'s production profile is backed by consistent volume rather than touchdown spikes, which is one of the most reliable patterns in fantasy. The stable role and moderate TD reliance create a floor-friendly setup that holds value even in low-scoring games.`;
  } else if (stability >= 70 && tdDep.pct >= 35) {
    insight = `${name} carries a consistent usage base, but a meaningful share of production comes from touchdowns. While the floor is supported by volume, the ceiling is more TD-sensitive than the usage score alone implies, which introduces some regression risk if scoring efficiency normalizes.`;
  } else if (stability < 45 && tdDep.pct >= 35) {
    insight = `Both usage consistency and TD reliance present risk here. High week-to-week volatility in volume, combined with above-average TD dependency, creates a profile where the scoring floor can move sharply in either direction depending on game script and red-zone opportunity.`;
  } else if (stability < 45) {
    insight = `The volatile usage pattern is the primary risk signal for ${name}. Even when target share or touches look reasonable on average, the week-to-week swings make reliable floor projections difficult and widen the range of outcomes for any given week.`;
  } else {
    insight = `${name} sits in a moderate risk band, with usage consistency and TD reliance both near positional averages for the ${pos} position. The profile does not carry extreme floor or ceiling risk, making the recent role direction score the most useful signal for near-term decisions.`;
  }

  return { cards, insight };
}

function generateFantasyTakeaways(
  player: PlayerWithSeasons,
  deltaRows: { label: string; key: string; delta: number; seasonAvg: number; recentAvg: number; pct?: boolean }[],
  momentumScore: number,
  stability: number,
  tdDep: { pct: number; label: string; tag: string; isHigh: boolean },
): { icon: 'up' | 'down' | 'neutral'; text: string }[] {
  if (deltaRows.length === 0) return [];
  const name = player.name || 'This player';
  const pos = player.position || '';
  const takeaways: { icon: 'up' | 'down' | 'neutral'; text: string }[] = [];

  const risingRows = deltaRows.filter(d => d.delta > 0);
  const fallingRows = deltaRows.filter(d => d.delta < 0);
  const topRising = risingRows.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];
  const topFalling = fallingRows.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];

  if (momentumScore >= 60) {
    takeaways.push({ icon: 'up', text: `Role is expanding relative to the season baseline, improving the weekly floor and near-term upside for ${pos} managers.` });
  } else if (momentumScore <= 39) {
    takeaways.push({ icon: 'down', text: `Role is contracting in the recent window, which is a caution signal for weekly start decisions until volume recovers.` });
  } else {
    takeaways.push({ icon: 'neutral', text: `Overall role remains stable versus the season average, supporting a predictable scoring range without meaningful upside expansion.` });
  }

  if (topRising) {
    const label = topRising.label.replace(/ \(Team\)/, '').toLowerCase();
    takeaways.push({ icon: 'up', text: `Rising ${label} strengthens the weekly scoring floor and signals growing offensive involvement.` });
  }

  if (topFalling) {
    const label = topFalling.label.replace(/ \(Team\)/, '').toLowerCase();
    takeaways.push({ icon: 'down', text: `Declining ${label} pulls the ceiling down slightly and is worth monitoring before commit-to-start decisions.` });
  }

  if (tdDep.pct >= 40) {
    takeaways.push({ icon: 'down', text: `TD dependency of ${tdDep.pct.toFixed(0)}% means production is sensitive to red-zone outcomes, which can swing the week by several points in either direction.` });
  } else if (tdDep.pct < 20) {
    takeaways.push({ icon: 'up', text: `Low TD reliance means scoring is grounded in volume rather than touchdown luck, reducing variance and supporting a more reliable floor.` });
  } else {
    takeaways.push({ icon: 'neutral', text: `TD reliance is moderate at ${tdDep.pct.toFixed(0)}%, meaning scoring is balanced between yardage volume and touchdown contribution.` });
  }

  if (stability >= 70) {
    takeaways.push({ icon: 'up', text: `High usage consistency creates a predictable week-to-week range, making ${name} easier to deploy with confidence in matchup-neutral situations.` });
  } else if (stability < 45) {
    takeaways.push({ icon: 'down', text: `Volatile week-to-week usage widens the scoring range and increases the risk of down weeks even when the role appears intact on average.` });
  }

  return takeaways.slice(0, 5);
}

function OverviewTab({ player, entries, format = 'ppr' }: { player: PlayerWithSeasons; entries: GameLogEntry[]; format?: ScoringFormat }) {
  const stats = computeGameLogStats(entries, player.position, format);

  // Prefer the precomputed, source-blended outlook (data/fantasy_outlook_2026.json)
  // when present; otherwise fall back to the render-time generated summary.
  const storedOutlook = player.fantasyOutlook2026?.body ? player.fantasyOutlook2026 : null;
  const outlookParas = storedOutlook
    ? storedOutlook.body.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
    : generateFantasyOutlookSummary(player, stats, format);

  return (
    <div className="sc-overview" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {outlookParas.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }}>
          <SectionHeader title="2026 Fantasy Outlook" />
          {storedOutlook?.headline && (
            <p style={{ fontSize: '15px', fontWeight: 600, lineHeight: '1.6', color: 'var(--sc-heading, #1e293b)', marginBottom: '12px' }}>{storedOutlook.headline}</p>
          )}
          {outlookParas.map((p, i) => (
            <p key={i} style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--sc-body, #475569)', marginBottom: i < outlookParas.length - 1 ? '12px' : 0 }}>{p}</p>
          ))}
        </div>
      )}

    </div>
  );
}

type DistTier = '15+' | '10\u201314.9' | '5\u20139.9' | '<5';

function GameDistributionBar({ entries, position, activeTier, onTierClick, format = 'ppr' }: { entries: GameLogEntry[]; position: string | null; activeTier: DistTier | null; onTierClick: (tier: DistTier | null) => void; format?: ScoringFormat }) {
  const played = entries.filter(e => e.game_status === 'active');
  if (played.length === 0) return null;
  const tierNames: Record<string, string> = { '15+': 'Elite', '10\u201314.9': 'Starter', '5\u20139.9': 'Flex', '<5': 'Bust' };
  const tierTooltips: Record<string, string> = {
    '15+': 'Top-12 positional finish threshold. Elite weekly production.',
    '10\u201314.9': 'Startable weekly output. Solid lineup contributor.',
    '5\u20139.9': 'Flex-tier production. Borderline start depending on matchup.',
    '<5': 'Below replacement level. Not a viable fantasy starter.',
  };
  const tierColors: Record<string, string> = { '15+': '#22c55e', '10\u201314.9': '#2dd4bf', '5\u20139.9': '#f59e0b', '<5': '#ef4444' };
  const tierTextColors: Record<string, string> = { '15+': '#15803d', '10\u201314.9': '#0d9488', '5\u20139.9': '#b45309', '<5': '#dc2626' };

  const bins = [
    { label: '15+' as DistTier, count: played.filter(e => fpts(e, format) >= 15).length },
    { label: '10\u201314.9' as DistTier, count: played.filter(e => fpts(e, format) >= 10 && fpts(e, format) < 15).length },
    { label: '5\u20139.9' as DistTier, count: played.filter(e => fpts(e, format) >= 5 && fpts(e, format) < 10).length },
    { label: '<5' as DistTier, count: played.filter(e => fpts(e, format) < 5).length },
  ];
  const total = played.length;
  return (
    <div className="sc-gamelog__dist" data-testid="gamelog-distribution">
      <SectionHeader title="Game Distribution" subtitle="Fantasy output bucketed by scoring tiers" />
      <div className="sc-gamelog__dist-bar" style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', height: '36px', marginBottom: '8px' }}>
        {bins.map(bin => {
          const pct = total > 0 ? (bin.count / total) * 100 : 0;
          if (bin.count === 0) return null;
          return (
            <div
              key={bin.label}
              className={`sc-gamelog__dist-segment ${activeTier === bin.label ? 'sc-gamelog__dist-segment--active' : ''} ${activeTier && activeTier !== bin.label ? 'sc-gamelog__dist-segment--faded' : ''}`}
              style={{
                width: `${pct}%`,
                background: tierColors[bin.label],
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              title={tierTooltips[bin.label]}
              onClick={() => onTierClick(activeTier === bin.label ? null : bin.label)}
              data-testid={`dist-segment-${bin.label}`}
            >
              {pct >= 12 && (
                <>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', lineHeight: 1, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{tierNames[bin.label]}</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1, marginTop: '1px' }}>{bin.count}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '6px' }}>
        {bins.map(bin => {
          const pct = total > 0 ? ((bin.count / total) * 100).toFixed(0) : '0';
          const isActive = activeTier === bin.label;
          const isFaded = activeTier && activeTier !== bin.label;
          return (
            <button
              key={bin.label}
              className="sc-gamelog__dist-legend"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: isActive ? `1px solid ${tierColors[bin.label]}` : '1px solid rgba(15,23,42,0.08)',
                background: isActive ? `${tierColors[bin.label]}10` : 'transparent',
                opacity: isFaded ? 0.35 : 1,
                transition: 'all 0.15s ease',
              }}
              onClick={() => onTierClick(isActive ? null : bin.label)}
              data-testid={`dist-legend-${bin.label}`}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: tierColors[bin.label], flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: isActive ? tierTextColors[bin.label] : '#64748b', fontFamily: 'ui-monospace, monospace' }}>
                {pct}% {tierNames[bin.label]}
              </span>
              <span style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}>({bin.count})</span>
            </button>
          );
        })}
        {activeTier && (
          <button
            style={{ fontSize: '10px', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: '4px' }}
            onClick={() => onTierClick(null)}
            data-testid="dist-clear-filter"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
 * OVERVIEW2 — Experimental redesign of the Overview tab.
 * Parallel to OverviewTab; does not touch the header or the existing Overview.
 * Uses player.seasonTeam (historicalSeasonTeam) for 2025 recap copy and
 * player.team (currentTeam) for 2026+ outlook copy.
 * ============================================================================ */

type Ov2Tier = 'elite' | 'starter' | 'flex' | 'bust';

function ov2GetTierThresholds(pos: string | null): { topEnd: number; midEnd: number; flexEnd: number } {
  // Returns inclusive upper bounds for: top-tier, starter, flex/depth.
  // Anything past flexEnd is "bust".
  if (pos === 'QB' || pos === 'TE') return { topEnd: 6, midEnd: 12, flexEnd: 18 };
  if (pos === 'WR') return { topEnd: 12, midEnd: 24, flexEnd: 36 };
  if (pos === 'RB') return { topEnd: 12, midEnd: 24, flexEnd: 30 };
  return { topEnd: 12, midEnd: 24, flexEnd: 30 };
}

function ov2TierLabels(pos: string | null) {
  const p = pos || 'FLEX';
  if (pos === 'QB' || pos === 'TE') {
    return { top: `${p}1`, mid: `${p}2`, flex: `${p}3`, bust: 'Bust' };
  }
  return { top: `${p}1`, mid: `${p}2`, flex: `${p}3`, bust: 'Bust' };
}

function ov2TierPcts(stats: ReturnType<typeof computeGameLogStats>) {
  if (!stats || stats.gamesPlayed === 0) return { top: 0, mid: 0, flex: 0, bust: 0 };
  return {
    top: stats.pos1Pct,
    mid: stats.pos2Pct,
    flex: stats.pos3Pct,
    bust: stats.bustPct,
  };
}


function Ov2Badge({ label, tone = 'gold' }: { label: string; tone?: 'gold' | 'slate' | 'pos' | 'neg' }) {
  return <span className={`ov2-pill ov2-pill--${tone}`}>{label}</span>;
}

function Ov2StackedFinishBar({ pcts, labels }: { pcts: { top: number; mid: number; flex: number; bust: number }; labels: { top: string; mid: string; flex: string; bust: string } }) {
  const total = Math.max(pcts.top + pcts.mid + pcts.flex + pcts.bust, 0.001);
  const segs = [
    { key: 'top', cls: 'ov2-stack-seg--top', swatch: 'linear-gradient(90deg, #F5C01A, #FFD166)', label: labels.top, pct: pcts.top },
    { key: 'mid', cls: 'ov2-stack-seg--mid', swatch: 'linear-gradient(90deg, #1d4ed8, #3b82f6)', label: labels.mid, pct: pcts.mid },
    { key: 'flex', cls: 'ov2-stack-seg--flex', swatch: 'linear-gradient(90deg, #475569, #64748b)', label: labels.flex, pct: pcts.flex },
    { key: 'bust', cls: 'ov2-stack-seg--bust', swatch: 'linear-gradient(90deg, #b91c1c, #ef4444)', label: labels.bust, pct: pcts.bust },
  ];
  return (
    <div>
      <div className="ov2-stack-bar">
        {segs.map(s => {
          const w = (s.pct / total) * 100;
          if (w < 0.5) return null;
          return (
            <div
              key={s.key}
              title={`${s.label}: ${s.pct.toFixed(0)}%`}
              className={`ov2-stack-seg ${s.cls}`}
              style={{ width: `${w}%` }}
            >
              {w >= 14 ? `${s.pct.toFixed(0)}%` : ''}
            </div>
          );
        })}
      </div>
      <div className="ov2-legend">
        {segs.map(s => (
          <div key={s.key} className="ov2-legend__item">
            <span className="ov2-legend__swatch" style={{ background: s.swatch }} />
            <span className="ov2-legend__label">{s.label}</span>
            <span className="ov2-legend__pct">{s.pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ov2Sparkline({ data, color = 'var(--ov2-gold)' }: { data: number[]; color?: string }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 40;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 6) - 3}`).join(' ');
  const areaPoints = `0,${h} ${points} ${w},${h}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline fill={color} opacity="0.10" points={areaPoints} />
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={points} />
    </svg>
  );
}

function Ov2TrendIcon({ dir }: { dir: 'up' | 'down' | 'flat' }) {
  if (dir === 'up') return <ArrowUp size={14} />;
  if (dir === 'down') return <ArrowDown size={14} />;
  return <Minus size={14} />;
}

// ===========================================================================
// Season-End Finishes — live Sleeper-backed season production, shown on the
// Game Log tab.
// ===========================================================================

function toSleeperScoring(format: ScoringFormat): SleeperScoring {
  if (format === 'ppr') return 'ppr';
  if (format === 'half') return 'half_ppr';
  return 'std';
}

type FinishMetric = 'ppg' | 'total';

// Minimum games for a PPG-based finish to be meaningful (a 2-game cameo can post
// an elite PPG that isn't predictive). Total finish has no threshold.
const FINISH_MIN_GAMES_COMPLETED = 4;
const FINISH_MIN_GAMES_CURRENT = 2;
const FINISH_SMALL_SAMPLE = 4;
// A regular season is 17 games; fewer than this for the current NFL year => in progress.
const FULL_SEASON_GAMES = 17;

/**
 * "Season-End Finishes" — a compact horizontal timeline of how the player
 * finished positionally each season, shown above the weekly logs so the reader
 * gets the season-level story before scrolling into individual games.
 */
function SeasonFinishTimeline({ seasons, position, format }: { seasons: PlayerProductionSeason[]; position: string | null; format: ScoringFormat }) {
  const [metric, setMetric] = useState<FinishMetric>('ppg');
  const posLabel = (position || '').toUpperCase();
  const fmtLabel = format === 'ppr' ? 'PPR' : format === 'half' ? 'Half-PPR' : 'Standard';

  // A season is only "in progress" while games are actively being played. The NFL
  // regular + post season runs Sept (month 8) through January (month 0); outside that
  // window we're in the offseason, so the most recent season is final and nothing is
  // in progress. During January the live season is the prior calendar year's. Without
  // the offseason gate, a completed season with <17 games (rookie call-up, injury)
  // would be mislabeled "in progress" all spring/summer.
  const now = new Date();
  const month = now.getMonth();
  const inNflSeasonWindow = month >= 8 || month === 0;
  const currentNflSeason = month === 0 ? now.getFullYear() - 1 : now.getFullYear();

  const pickLine = (s: PlayerProductionSeason) =>
    format === 'ppr' ? s.ppr : format === 'half' ? s.half : s.std;

  // Oldest -> newest for left-to-right timeline reading.
  const cards = [...seasons]
    .sort((a, b) => a.season - b.season)
    .map((s) => {
      const line = pickLine(s);
      const inProgress = inNflSeasonWindow && s.season >= currentNflSeason && s.gamesPlayed < FULL_SEASON_GAMES;
      const minGames = inProgress ? FINISH_MIN_GAMES_CURRENT : FINISH_MIN_GAMES_COMPLETED;
      const rawRank = metric === 'ppg' ? line.posFinishPpg : line.posFinishTotal;
      // PPG finish requires a games floor; total finish always shows.
      const rank = metric === 'total' || s.gamesPlayed >= minGames ? rawRank : null;
      const smallSample = inProgress && s.gamesPlayed < FINISH_SMALL_SAMPLE;
      return { s, line, inProgress, rank, smallSample, badge: getFinishBadge(rank, position) };
    });

  const completedCount = cards.filter((c) => !c.inProgress).length;
  const currentCard = [...cards].reverse().find((c) => c.inProgress) || null;
  const unstableCurrent = !!currentCard && currentCard.s.gamesPlayed < FINISH_SMALL_SAMPLE;

  // Scale card size down as the number of seasons grows so the full timeline
  // fits on one screen without horizontal scrolling.
  const densityClass =
    cards.length >= 12 ? 'sc-finish2__timeline--ultra'
    : cards.length >= 9 ? 'sc-finish2__timeline--dense'
    : cards.length >= 7 ? 'sc-finish2__timeline--compact'
    : '';

  const heading = (
    <div className="sc-finish2__heading">
      <div className="sc-finish2__title-row">
        <h3 className="sc-finish2__title">Season-End Finishes</h3>
      </div>
      <p className="sc-finish2__subtitle">{fmtLabel} positional finishes by season.</p>
    </div>
  );

  // Fallback: only an in-progress (e.g. rookie) season, no completed history.
  if (completedCount === 0 && currentCard) {
    return (
      <div className="sc-finish2" data-testid="section-season-finishes">
        {heading}
        <p className="sc-finish2__empty">
          Rookie season in progress. Season-end finish will update as games are played.
        </p>
      </div>
    );
  }

  // Fallback: no usable finish data at all.
  if (cards.length === 0) {
    return (
      <div className="sc-finish2" data-testid="section-season-finishes">
        {heading}
        <p className="sc-finish2__empty">
          Not enough fantasy history yet. View weekly game logs below to evaluate recent usage and opportunity.
        </p>
      </div>
    );
  }

  return (
    <div className="sc-finish2" data-testid="section-season-finishes">
      <div className="sc-finish2__header">
        {heading}
        <div className="sc-finish2__toggle" data-testid="filter-finish-metric">
          {([['ppg', 'PPG Finish'], ['total', 'Total Finish']] as [FinishMetric, string][]).map(([m, label]) => (
            <button
              key={m}
              className={`sc-finish2__seg ${metric === m ? 'sc-finish2__seg--active' : ''}`}
              onClick={() => setMetric(m)}
              data-testid={`button-finish-metric-${m}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>


      {unstableCurrent && (
        <p className="sc-finish2__caution" data-testid="text-finish-caution">
          Current-season rank may be unstable due to limited games played.
        </p>
      )}

      <div className={`sc-finish2__timeline ${densityClass}`} data-testid="season-finish-cards">
        <div className="sc-finish2__track">
          {cards.map((c) => (
            <div key={c.s.season} className={`sc-finish2__card ${c.inProgress ? 'sc-finish2__card--now' : ''}`} data-testid={`card-finish-${c.s.season}`}>
              <div className="sc-finish2__card-top">
                <span className="sc-finish2__card-season">{c.s.season}</span>
                {c.inProgress && <span className="sc-finish2__now">NOW</span>}
              </div>
              <p className="sc-finish2__card-rank">{c.rank != null ? `${posLabel}${c.rank}` : '—'}</p>
              <p className="sc-finish2__card-ppg">{c.line.ppg.toFixed(1)} PPG</p>
              {c.badge && (
                <span className={`sc-finish2__status ${c.badge.className}`}>{c.badge.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameLogTab({ player, format = 'ppr' }: { player: PlayerWithSeasons; format?: ScoringFormat }) {
  const availableSeasons = player.availableSeasons || (player.season ? [player.season] : []);

  // Season-End Finishes data (Sleeper-backed season production), shown at the top of this tab.
  const finishScoring = toSleeperScoring(format);
  const { data: finishSeasons } = useQuery<PlayerProductionSeason[]>({
    queryKey: ['/api/players', player.id, 'production', finishScoring],
    queryFn: () => fetchPlayerProduction(player.id, finishScoring),
  });

  // Career Stats: prefer the full-career Sleeper production feed (every NFL season),
  // then merge in any season the feed omits (e.g. the in-progress year) from the
  // local game-log-derived stats so the current season still appears.
  const careerStats: CareerSeasonStat[] = (() => {
    const fromProduction: CareerSeasonStat[] = (finishSeasons || []).map((s) => {
      const line = format === 'ppr' ? s.ppr : format === 'half' ? s.half : s.std;
      const t = s.totals;
      return {
        season: s.season,
        gp: s.gamesPlayed,
        ppg: line.ppg,
        posRank: line.posFinishPpg,
        pass_att: t.passAtt, pass_cmp: t.passCmp, pass_yd: t.passYd, pass_td: t.passTd, pass_int: t.passInt,
        rush_att: t.rushAtt, rush_yd: t.rushYd, rush_td: t.rushTd,
        targets: t.tgt, receptions: t.rec, rec_yd: t.recYd, rec_td: t.recTd,
        total_td: t.passTd + t.rushTd + t.recTd,
        scrimmage_yd: t.rushYd + t.recYd,
      };
    });
    const seen = new Set(fromProduction.map((r) => r.season));
    const extra = (player.careerSeasonStats || []).filter((r) => !seen.has(r.season));
    return [...fromProduction, ...extra];
  })();

  return (
    <div className="sc-gamelog" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {finishSeasons && finishSeasons.length > 0 && (
        <SeasonFinishTimeline seasons={finishSeasons} position={player.position} format={format} />
      )}

      {careerStats.length > 0 && (
        <SeasonLog stats={careerStats} position={player.position} format={format} player={player} defaultSeason={availableSeasons[0]} />
      )}

    </div>
  );
}

// ===========================================================================
// Season Log — a season dashboard that replaces the old nested
// season-totals -> weekly-table spreadsheet. Pick a season (or Career) and see
// a summary card, weekly performance highlights, and a premium weekly log.
// ===========================================================================

const num = (v?: number | null) => v ?? 0;
const fmtNum = (v?: number | null) => (v ?? 0).toLocaleString();

function ordinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Premium tiered weekly finish badge: shows the actual positional finish
// (e.g. QB13, QB26) colored by tier — T1 gold, T2 blue, T3 orange, bust red.
function weeklyFinishBadge(rank: number | null | undefined, position: string | null): { label: string; cls: string } | null {
  if (!rank) return null;
  const pos = (position || 'FLEX').toUpperCase();
  const cls = rank <= 12 ? 'sc-finb--t1' : rank <= 24 ? 'sc-finb--t2' : rank <= 36 ? 'sc-finb--t3' : 'sc-finb--bust';
  return { label: `${pos}${rank}`, cls };
}

function seasonFinishBadge(rank: number | null | undefined, position: string | null): { label: string; cls: string } | null {
  if (!rank) return null;
  const pos = (position || 'FLEX').toUpperCase();
  const cls = rank <= 12 ? 'sc-finb--t1' : rank <= 24 ? 'sc-finb--t2' : rank <= 36 ? 'sc-finb--t3' : 'sc-finb--bust';
  return { label: `${pos}${rank}`, cls };
}

type WeeklyStatGroup = { label: string; primary: (s: GameLogStats) => string; secondary: (s: GameLogStats) => string };

function getWeeklyStatGroups(position: string | null, activeEntries: GameLogEntry[]): WeeklyStatGroup[] {
  const pos = position || '';
  const hasRush = activeEntries.some(e => num(e.stats.rush_att) > 0 || num(e.stats.rush_yd) > 0);
  if (pos === 'QB') {
    return [
      { label: 'Passing', primary: s => `${fmtNum(s.pass_yd)} yds`, secondary: s => `${num(s.pass_td)} TD · ${num(s.pass_int)} INT` },
      { label: 'Rushing', primary: s => `${fmtNum(s.rush_yd)} yds`, secondary: s => `${num(s.rush_att)} car · ${num(s.rush_td)} TD` },
    ];
  }
  if (pos === 'RB') {
    return [
      { label: 'Rushing', primary: s => `${fmtNum(s.rush_yd)} yds`, secondary: s => `${num(s.rush_att)} car · ${num(s.rush_td)} TD` },
      { label: 'Receiving', primary: s => `${fmtNum(s.rec_yd)} yds`, secondary: s => `${num(s.rec)}/${num(s.rec_tgt)} · ${num(s.rec_td)} TD` },
    ];
  }
  if (pos === 'WR' || pos === 'TE') {
    const groups: WeeklyStatGroup[] = [
      { label: 'Receiving', primary: s => `${fmtNum(s.rec_yd)} yds`, secondary: s => `${num(s.rec)}/${num(s.rec_tgt)} rec · ${num(s.rec_td)} TD` },
    ];
    if (hasRush) groups.push({ label: 'Rushing', primary: s => `${fmtNum(s.rush_yd)} yds`, secondary: s => `${num(s.rush_att)} car · ${num(s.rush_td)} TD` });
    return groups;
  }
  if (pos === 'K') {
    return [
      { label: 'Kicking', primary: s => `${num(s.fgm)}/${num(s.fga)} FG`, secondary: s => `${num(s.xpm)}/${num(s.xpa)} XP` },
    ];
  }
  return [];
}

// Premium weekly game log: grouped Passing/Rushing/Receiving columns, soft
// header, FPTS anchor, tiered finish badge. Reflows to stacked cards on mobile.
function WeeklyGameLog({ entries, position, format }: { entries: GameLogEntry[]; position: string | null; format: ScoringFormat }) {
  const pos = (position || '').toUpperCase();
  const active = entries.filter(e => e.game_status === 'active');
  const groups = getWeeklyStatGroups(position, active);
  const gridCols = `48px minmax(120px,1.3fr) minmax(96px,1fr) ${groups.map(() => 'minmax(116px,1.2fr)').join(' ')} 92px`;
  const wlCls = (r: string) => r === 'W' ? 'sc-wlog__wl--w' : r === 'L' ? 'sc-wlog__wl--l' : 'sc-wlog__wl--t';

  return (
    <div className="sc-wlog" data-testid="weekly-game-log">
      <div className="sc-wlog__head" style={{ gridTemplateColumns: gridCols }}>
        <div className="sc-wlog__h">Wk</div>
        <div className="sc-wlog__h">Matchup</div>
        <div className="sc-wlog__h">Result</div>
        {groups.map(g => <div key={g.label} className="sc-wlog__h">{g.label}</div>)}
        <div className="sc-wlog__h sc-wlog__h--r">Fantasy</div>
      </div>

      {entries.map(entry => {
        const isBye = entry.game_status === 'bye';
        const isOut = entry.game_status === 'out';
        if (isBye || isOut) {
          return (
            <div key={entry.week} className="sc-wlog__row sc-wlog__row--inactive" style={{ gridTemplateColumns: gridCols }} data-testid={`row-week-${entry.week}`}>
              <div className="sc-wlog__cell sc-wlog__wk" data-label="Wk">{entry.week}</div>
              <div className="sc-wlog__cell" data-label="Matchup"><span className="sc-wlog__opp">{isBye ? 'BYE' : '—'}</span></div>
              <div className="sc-wlog__cell" data-label="Result"><span className="sc-finb sc-finb--bye">{isBye ? 'BYE' : 'OUT'}</span></div>
              {groups.map(g => <div key={g.label} className="sc-wlog__cell sc-wlog__muted" data-label={g.label}>{'—'}</div>)}
              <div className="sc-wlog__cell sc-wlog__cell--r sc-wlog__muted" data-label="Fantasy">{'—'}</div>
            </div>
          );
        }
        const pts = fpts(entry, format);
        const fin = weeklyFinishBadge(entry.pos_rank, position);
        const sc = entry.score;
        const oppRank = entry.opp_rank_vs_pos;
        return (
          <div key={entry.week} className="sc-wlog__row" style={{ gridTemplateColumns: gridCols }} data-testid={`row-week-${entry.week}`}>
            <div className="sc-wlog__cell sc-wlog__wk" data-label="Wk">{entry.week}</div>
            <div className="sc-wlog__cell" data-label="Matchup">
              <div className="sc-wlog__match">
                <span className="sc-wlog__opp">{entry.opp}</span>
                {oppRank ? <span className={`sc-wlog__opprank ${getOppRankColor(oppRank)}`}>{ordinalSuffix(oppRank)} vs {pos}</span> : null}
              </div>
            </div>
            <div className="sc-wlog__cell" data-label="Result">
              {sc ? (
                <span className="sc-wlog__result">
                  <span className={`sc-wlog__wl ${wlCls(sc.r)}`}>{sc.r}</span>
                  <span className="sc-wlog__score">{sc.tm}–{sc.opp}</span>
                </span>
              ) : <span className="sc-wlog__muted">{'—'}</span>}
            </div>
            {groups.map(g => (
              <div key={g.label} className="sc-wlog__cell" data-label={g.label}>
                <div className="sc-wlog__stat">
                  <span className="sc-wlog__stat-main">{g.primary(entry.stats)}</span>
                  <span className="sc-wlog__stat-sub">{g.secondary(entry.stats)}</span>
                </div>
              </div>
            ))}
            <div className="sc-wlog__cell sc-wlog__cell--r" data-label="Fantasy">
              <div className="sc-wlog__fantasy">
                <span className="sc-wlog__fpts">{pts.toFixed(1)}</span>
                {fin ? <span className={`sc-finb ${fin.cls}`}>{fin.label}</span> : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getSeasonPills(stat: CareerSeasonStat, position: string | null): { label: string; value: string }[] {
  const pos = position || '';
  if (pos === 'QB') {
    return [
      { label: 'GP', value: String(stat.gp) },
      { label: 'Pass Yds', value: fmtNum(stat.pass_yd) },
      { label: 'Pass TD', value: String(stat.pass_td) },
      { label: 'INT', value: String(stat.pass_int) },
      { label: 'Rush Yds', value: fmtNum(stat.rush_yd) },
      { label: 'Rush TD', value: String(stat.rush_td) },
    ];
  }
  if (pos === 'RB') {
    return [
      { label: 'GP', value: String(stat.gp) },
      { label: 'Rush Yds', value: fmtNum(stat.rush_yd) },
      { label: 'Rush TD', value: String(stat.rush_td) },
      { label: 'Rec', value: String(stat.receptions) },
      { label: 'Rec Yds', value: fmtNum(stat.rec_yd) },
      { label: 'Total TD', value: String(stat.total_td) },
    ];
  }
  if (pos === 'WR' || pos === 'TE') {
    return [
      { label: 'GP', value: String(stat.gp) },
      { label: 'Targets', value: String(stat.targets) },
      { label: 'Rec', value: String(stat.receptions) },
      { label: 'Rec Yds', value: fmtNum(stat.rec_yd) },
      { label: 'Rec TD', value: String(stat.rec_td) },
      { label: 'Total TD', value: String(stat.total_td) },
    ];
  }
  return [
    { label: 'GP', value: String(stat.gp) },
    { label: 'Total TD', value: String(stat.total_td) },
  ];
}

// One-line season story shown under the season title to give the data context.
function seasonInsight(stat: CareerSeasonStat, active: GameLogEntry[], position: string | null, format: ScoringFormat): string | null {
  if (active.length === 0) return null;
  const pos = (position || 'FLEX').toUpperCase();
  const scored = active.map(e => fpts(e, format));
  const high = scored.length ? Math.max(...scored) : 0;
  const pos1 = active.filter(e => e.pos_rank != null && e.pos_rank <= 12).length;
  const rank = stat.posRank;
  const tierWord = !rank ? 'A' : rank <= 5 ? 'An elite' : rank <= 12 ? 'A strong' : rank <= 24 ? 'A steady' : rank <= 36 ? 'A streaming-level' : 'A depth';
  const finLabel = rank ? ` ${pos}${rank}` : '';
  let s = `${tierWord}${finLabel} season across ${stat.gp} game${stat.gp === 1 ? '' : 's'}`;
  const tail: string[] = [];
  if (pos1 > 0) tail.push(`${pos1} ${pos}1 week${pos1 === 1 ? '' : 's'}`);
  if (high > 0) tail.push(`a ${high.toFixed(1)}-point ceiling`);
  if (tail.length) s += ` with ${tail.join(' and ')}`;
  return s + '.';
}

// Unified season dashboard: title + season story, headline (PPG · finish),
// clean inline metric tiles, and a performance snapshot — one panel, no boxes.
function SeasonDashboard({ stat, entries, position, format, title }: {
  stat: CareerSeasonStat;
  entries: GameLogEntry[];
  position: string | null;
  format: ScoringFormat;
  title: string;
}) {
  const fin = seasonFinishBadge(stat.posRank, position);
  const metrics = getSeasonPills(stat, position);
  const active = entries.filter(e => e.game_status === 'active');
  const insight = seasonInsight(stat, active, position, format);

  // Weekly finish distribution bar — derived from THIS season's entries so it
  // always reflects the season selected in the tabs above.
  const profileStats = computeGameLogStats(entries, position, format);

  // A few scannable insight badges + an at-a-glance finish breakdown, both
  // derived from this season's weekly data (skipped for Career Totals, which
  // has no weekly entries).
  const pos = (position || 'FLEX').toUpperCase();
  const badges: { label: string; tone: 'gold' | 'slate' | 'pos' | 'neg' }[] = [];
  if (profileStats && profileStats.gamesPlayed > 0) {
    const scored = active.map(e => fpts(e, format));
    const high = scored.length ? Math.max(...scored) : 0;
    const cv = profileStats.ppg > 0 ? profileStats.volatility / profileStats.ppg : 2;
    const ceiling = pos === 'QB' ? 30 : pos === 'TE' ? 20 : 25;
    if (high >= ceiling) badges.push({ label: 'Elite Ceiling', tone: 'gold' });
    if (profileStats.pos1Pct >= 50) badges.push({ label: `Weekly ${pos}1`, tone: 'pos' });
    else if (profileStats.pos1Pct + profileStats.pos2Pct >= 60) badges.push({ label: 'Reliable Starter', tone: 'pos' });
    if (cv <= 0.45) badges.push({ label: 'High Consistency', tone: 'slate' });
    else if (profileStats.bustPct >= 30) badges.push({ label: 'Volatile Floor', tone: 'neg' });
  }
  const badgesToShow = badges.slice(0, 3);

  return (
    <div className="sc-dash" data-testid="season-summary-card">
      <div className="sc-dash__head">
        <div className="sc-dash__titlewrap">
          <h4 className="sc-dash__title">{title}</h4>
          {insight && <p className="sc-dash__insight">{insight}</p>}
          {badgesToShow.length > 0 && (
            <div className="sc-dash__badges">
              {badgesToShow.map(b => <Ov2Badge key={b.label} label={b.label} tone={b.tone} />)}
            </div>
          )}
        </div>
        <div className="sc-dash__headline">
          <span className="sc-dash__ppg">{stat.ppg.toFixed(1)}<i>PPG</i></span>
          {fin && <span className={`sc-finb ${fin.cls}`}>{fin.label}</span>}
        </div>
      </div>
      <div className="sc-dash__metrics">
        {metrics.map(m => (
          <div key={m.label} className="sc-dash__metric">
            <span className="sc-dash__metric-val">{m.value}</span>
            <span className="sc-dash__metric-lbl">{m.label}</span>
          </div>
        ))}
      </div>
      {profileStats && profileStats.gamesPlayed > 0 && (
        <div className="sc-dash__profile" data-testid="weekly-finish-profile">
          <div className="sc-dash__profile-head">
            <span className="sc-dash__profile-title">Weekly Finish Breakdown</span>
          </div>
          <Ov2StackedFinishBar pcts={ov2TierPcts(profileStats)} labels={ov2TierLabels(position)} />
        </div>
      )}
    </div>
  );
}

// Fetches (or reuses) one season's weekly log, then renders the summary card,
// weekly highlights, and the premium weekly game log.
function SeasonView({ player, season, stat, position, format, isDefaultSeason }: {
  player: PlayerWithSeasons;
  season: number;
  stat: CareerSeasonStat;
  position: string | null;
  format: ScoringFormat;
  isDefaultSeason: boolean;
}) {
  const { data: seasonGameLog, isLoading } = useQuery<GameLogEntry[]>({
    queryKey: ["/api/players", player.slug, "game-log", season, format],
    queryFn: async () => {
      const res = await fetch(`/api/players/${player.slug}/game-log?season=${season}&format=${format}`);
      if (!res.ok) throw new Error("Failed to fetch game log");
      return res.json();
    },
    enabled: !isDefaultSeason,
  });
  const entries = isDefaultSeason ? (player.gameLog || []) : (seasonGameLog || []);
  const loading = !isDefaultSeason && isLoading;

  return (
    <div className="sc-glbody">
      <SeasonDashboard stat={stat} entries={entries} position={position} format={format} title={`${season} Season`} />
      {loading ? (
        <div className="sc-glpad py-2 text-center">
          <Skeleton className="h-4 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      ) : entries.length > 0 ? (
        <WeeklyGameLog entries={entries} position={position} format={format} />
      ) : (
        <p className="sc-glpad text-center text-xs text-muted-foreground">No weekly game log available for {season}.</p>
      )}
    </div>
  );
}

function aggregateCareer(stats: CareerSeasonStat[]): CareerSeasonStat {
  const sum = (k: keyof CareerSeasonStat) => stats.reduce((s, r) => s + (Number(r[k]) || 0), 0);
  const gp = sum('gp');
  const totalPts = stats.reduce((s, r) => s + r.ppg * r.gp, 0);
  return {
    season: 0,
    gp,
    ppg: gp > 0 ? totalPts / gp : 0,
    posRank: null,
    pass_att: sum('pass_att'), pass_cmp: sum('pass_cmp'), pass_yd: sum('pass_yd'), pass_td: sum('pass_td'), pass_int: sum('pass_int'),
    rush_att: sum('rush_att'), rush_yd: sum('rush_yd'), rush_td: sum('rush_td'),
    targets: sum('targets'), receptions: sum('receptions'), rec_yd: sum('rec_yd'), rec_td: sum('rec_td'),
    total_td: sum('total_td'), scrimmage_yd: sum('scrimmage_yd'),
  };
}

// Career overview: aggregate summary + a clean, clickable season list.
function CareerView({ stats, position, format, onPick }: {
  stats: CareerSeasonStat[];
  position: string | null;
  format: ScoringFormat;
  onPick: (season: number) => void;
}) {
  const agg = aggregateCareer(stats);
  const keyStat = (r: CareerSeasonStat): string => {
    if (position === 'QB') return `${fmtNum(r.pass_yd)} pass yds · ${r.pass_td} TD`;
    if (position === 'RB') return `${fmtNum(r.rush_yd)} rush yds · ${r.total_td} TD`;
    return `${r.receptions} rec · ${fmtNum(r.rec_yd)} yds · ${r.total_td} TD`;
  };
  return (
    <div className="sc-glbody">
      <SeasonDashboard stat={agg} entries={[]} position={position} format={format} title="Career Totals" />
      <div className="sc-slog__seasons">
        {stats.map(r => {
          const fin = seasonFinishBadge(r.posRank, position);
          return (
            <button key={r.season} type="button" className="sc-slog__srow" onClick={() => onPick(r.season)} data-testid={`career-season-${r.season}`}>
              <span className="sc-slog__syear">{r.season}</span>
              <span className="sc-slog__sgp">{r.gp} GP</span>
              <span className="sc-slog__skey">{keyStat(r)}</span>
              <span className="sc-slog__sppg">{r.ppg.toFixed(1)} <i>PPG</i></span>
              {fin ? <span className={`sc-finb ${fin.cls}`}>{fin.label}</span> : <span className="sc-wlog__muted">{'—'}</span>}
              <ChevronRight className="sc-slog__sarrow" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SeasonLog({ player, stats, position, format, defaultSeason }: {
  player: PlayerWithSeasons;
  stats: CareerSeasonStat[];
  position: string | null;
  format: ScoringFormat;
  defaultSeason?: number;
}) {
  const sorted = useMemo(() => [...stats].sort((a, b) => b.season - a.season), [stats]);
  const initial: number | 'career' = (defaultSeason != null && sorted.some(s => s.season === defaultSeason))
    ? defaultSeason
    : (sorted[0]?.season ?? 'career');
  const [selected, setSelected] = useState<number | 'career'>(initial);

  return (
    <div className="sc-glcard" data-testid="career-stats-table">
      <div className="sc-glcard__header">
        <h3 className="sc-glcard__title">Game Log</h3>
        <div className="sc-slog__selector" role="tablist" data-testid="season-selector">
          {sorted.map(s => (
            <button
              key={s.season}
              type="button"
              className={`sc-slog__seg ${selected === s.season ? 'sc-slog__seg--active' : ''}`}
              onClick={() => setSelected(s.season)}
              data-testid={`season-tab-${s.season}`}
            >
              {s.season}
            </button>
          ))}
          <button
            type="button"
            className={`sc-slog__seg ${selected === 'career' ? 'sc-slog__seg--active' : ''}`}
            onClick={() => setSelected('career')}
            data-testid="season-tab-career"
          >
            Career
          </button>
        </div>
      </div>

      {selected === 'career' ? (
        <CareerView stats={sorted} position={position} format={format} onPick={(s) => setSelected(s)} />
      ) : (
        <SeasonView
          key={selected}
          player={player}
          season={selected}
          stat={sorted.find(s => s.season === selected) ?? sorted[0]}
          position={position}
          format={format}
          isDefaultSeason={defaultSeason != null && selected === defaultSeason}
        />
      )}
    </div>
  );
}

function getPositionMomentumMetrics(position: string | null) {
  if (position === 'QB') return [
    { key: 'pass_att', label: 'Pass Att/G', pct: false, weight: 5 },
    { key: 'rush_att', label: 'Rush Att/G', pct: false, weight: 3 },
  ];
  if (position === 'RB') return [
    { key: 'snap_share', label: 'Snap Share', pct: true, weight: 4 },
    { key: 'rush_att', label: 'Carries/G', pct: false, weight: 4 },
    { key: 'rec_tgt', label: 'Targets/G', pct: false, weight: 2 },
  ];
  if (position === 'WR' || position === 'TE') return [
    { key: 'target_share', label: 'Target Share (Team)', pct: true, weight: 6 },
    { key: 'rec_tgt', label: 'Targets/G', pct: false, weight: 2 },
    { key: 'team_pass_att', label: 'Team Pass Att/G', pct: false, weight: 2, context: true },
  ];
  if (position === 'K') return [
    { key: 'fga', label: 'FG Att/G', pct: false, weight: 5 },
    { key: 'fgm', label: 'FG Made/G', pct: false, weight: 3 },
    { key: 'xpa', label: 'XP Att/G', pct: false, weight: 2 },
  ];
  return [];
}

function computeMetricAvg(activeEntries: GameLogEntry[], key: string, count?: number): number {
  const src = count ? activeEntries.slice(-count) : activeEntries;
  if (src.length === 0) return 0;
  const sum = src.reduce((s, e) => s + ((e.stats as unknown as Record<string, number>)[key] ?? 0), 0);
  return sum / src.length;
}

function getTdThresholds(position: string | null): { high: number; mid: number } {
  if (position === 'QB') return { high: 45, mid: 35 };
  if (position === 'RB') return { high: 40, mid: 25 };
  if (position === 'TE') return { high: 40, mid: 25 };
  return { high: 35, mid: 20 };
}

function computeTdDependency(activeEntries: GameLogEntry[], position: string | null, format: ScoringFormat): { pct: number; label: string; tag: string; isHigh: boolean } {
  if (activeEntries.length === 0) return { pct: 0, label: 'N/A', tag: '', isHigh: false };
  const s = (key: string) => activeEntries.reduce((sum, e) => sum + ((e.stats as unknown as Record<string, number>)[key] ?? 0), 0);
  let tdPts = 0;
  if (position === 'QB') {
    tdPts = s('pass_td') * 4 + s('rush_td') * 6;
  } else if (position === 'K') {
    tdPts = 0;
  } else {
    tdPts = (s('rec_td') + s('rush_td')) * 6;
  }
  const totalPts = activeEntries.reduce((sum, e) => sum + fpts(e, format), 0);
  if (totalPts === 0) return { pct: 0, label: 'N/A', tag: '', isHigh: false };
  const pct = (tdPts / totalPts) * 100;
  const { high, mid } = getTdThresholds(position);
  if (pct >= high) return { pct, label: 'TD-Driven', tag: 'High TD reliance', isHigh: true };
  if (pct >= mid) return { pct, label: 'Balanced', tag: 'Balanced production', isHigh: false };
  return { pct, label: 'Volume-Backed', tag: 'Volume-backed production', isHigh: false };
}

type PatriotsNewsItem = {
  title: string;
  url: string;
  type: string;
  tag?: string;
  impact?: string;
  ai_blurb?: string;
  published_at?: string;
};

function FeaturedNewsCard({ item, player, teamColor, sourceName }: { item: PatriotsNewsItem; player: Player; teamColor: string; sourceName: string }) {
  const [imgError, setImgError] = useState(false);
  const headshotUrl = getHeadshotUrl(player.id);
  const accentColor = teamColor || '#F5C01A';
  const gradientStyle = `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      data-testid="link-featured-news"
    >
      <div
        className="sc-player-news"
        style={{ '--team-accent': accentColor } as React.CSSProperties}
      >
        <div style={{ height: 4, borderRadius: '6px 6px 0 0', background: gradientStyle, margin: '-24px -24px 20px -24px' }} />

        <div className="sc-player-news__header">
          {!imgError ? (
            <img
              src={headshotUrl}
              alt={player.name}
              className="sc-player-news__img"
              style={{ borderColor: accentColor }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="sc-player-news__img-fallback" style={{ borderColor: accentColor }}>
              <User className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
          )}
          <div>
            <div className="sc-player-news__name">{player.name} – {player.position}</div>
            <div className="sc-player-news__posted">
              {item.type === 'video' ? '🎥 Video' : '📰 Article'} • {sourceName}
            </div>
          </div>
        </div>

        <div className="sc-player-news__pills">
          <span className="sc-pill sc-pill--type" data-testid="badge-featured-type">{(item.type || 'news').toUpperCase()}</span>
          {item.impact && (
            <span className={`sc-pill sc-pill--impact sc-pill--impact-${item.impact.toLowerCase()}`}>{item.impact}</span>
          )}
          {item.tag && (
            <span className="sc-pill sc-pill--tag">{item.tag}</span>
          )}
        </div>

        <div className="sc-player-news__body">
          {item.ai_blurb || item.title}
        </div>

        <div className="sc-player-news__footer">
          <span className="sc-player-news__source">Source: {sourceName}</span>
          <span className="sc-player-news__link">View Original →</span>
        </div>
      </div>
    </a>
  );
}

interface InjuryData {
  found: boolean;
  player_name: string;
  injury?: string;
  position?: string;
  practice?: { wed: string; thu: string; fri: string };
  game_status?: string;
  blurb?: string;
  source?: string;
  source_url?: string;
  report_label?: string;
  report_updated_at?: string;
  fetched_at?: string;
}

function getInjuryPillClass(gs: string): string {
  const upper = (gs || '').toUpperCase().trim();
  if (upper === 'OUT') return 'sc-injury-pill--out';
  if (upper === 'DOUBTFUL') return 'sc-injury-pill--doubtful';
  if (upper === 'QUESTIONABLE') return 'sc-injury-pill--questionable';
  return 'sc-injury-pill--none';
}

function getPracticeChipClass(val: string): string {
  const upper = (val || '').toUpperCase().trim();
  if (upper === 'FP') return 'sc-injury-chip--fp';
  if (upper === 'LP') return 'sc-injury-chip--lp';
  if (upper === 'DNP') return 'sc-injury-chip--dnp';
  return '';
}

const SUPPORTED_TEAM_SITES: Record<string, string> = {
  NE: "Patriots",
  BUF: "Bills",
  MIA: "Dolphins",
  NYJ: "Jets",
  BAL: "Ravens",
  CIN: "Bengals",
  CLE: "Browns",
  PIT: "Steelers",
};

const BADGE_CONFIG: Record<string, { bg: string; text: string; dot: string; border: string; icon: typeof Activity; fantasyInflection: boolean }> = {
  Drafted:        { bg: 'rgba(30,136,229,0.10)',  text: '#1565C0', dot: '#1e88e5', border: 'rgba(30,136,229,0.25)',  icon: Trophy,      fantasyInflection: false },
  Breakout:       { bg: 'rgba(76,175,80,0.12)',   text: '#2E7D32', dot: '#4caf50', border: 'rgba(76,175,80,0.30)',   icon: TrendingUp,  fantasyInflection: true  },
  Peak:           { bg: 'rgba(245,192,26,0.14)',  text: '#92400E', dot: '#F5C01A', border: 'rgba(245,192,26,0.35)', icon: Zap,         fantasyInflection: true  },
  Injury:         { bg: 'rgba(229,57,53,0.10)',   text: '#C62828', dot: '#ef4444', border: 'rgba(229,57,53,0.30)',  icon: AlertCircle, fantasyInflection: true  },
  'Role change':  { bg: 'rgba(156,39,176,0.10)',  text: '#7B1FA2', dot: '#a855f7', border: 'rgba(156,39,176,0.30)', icon: ArrowUpRight, fantasyInflection: true  },
  'New team':     { bg: 'rgba(255,152,0,0.10)',   text: '#E65100', dot: '#f97316', border: 'rgba(255,152,0,0.30)',  icon: ArrowUpRight, fantasyInflection: true  },
  'Sustained peak': { bg: 'rgba(245,192,26,0.14)', text: '#92400E', dot: '#F5C01A', border: 'rgba(245,192,26,0.35)', icon: Zap,        fantasyInflection: false },
  Current:        { bg: 'rgba(99,102,241,0.08)',  text: '#4f46e5', dot: '#6366f1', border: 'rgba(99,102,241,0.20)', icon: Activity,    fantasyInflection: false },
};

function NewsTab({ player }: { player: Player }) {
  const teamAbbr = player.team || '';
  const teamSiteLabel = SUPPORTED_TEAM_SITES[teamAbbr] || null;
  const hasTeamSite = !!teamSiteLabel;
  const teamColor = TEAM_PRIMARY_COLORS[teamAbbr] || '#F5C01A';
  const [newsFilter, setNewsFilter] = useState<'articles' | 'injuries'>('articles');

  const { data: teamNews, isLoading: teamNewsLoading, refetch, isFetching } = useQuery({
    queryKey: ["/api/team/news", teamAbbr, player.name],
    queryFn: async () => {
      const res = await fetch(`/api/team/news?team=${encodeURIComponent(teamAbbr)}&player_name=${encodeURIComponent(player.name)}&limit=8`);
      if (!res.ok) throw new Error("Failed to load news");
      return res.json() as Promise<{ found: boolean; items: PatriotsNewsItem[]; team_profile_url?: string; source?: string }>;
    },
    enabled: hasTeamSite,
    staleTime: 30 * 60 * 1000,
  });

  const { data: injuryData, isLoading: injuryLoading } = useQuery({
    queryKey: ["/api/team/injury", teamAbbr, player.name],
    queryFn: async () => {
      const res = await fetch(`/api/team/injury?team=${encodeURIComponent(teamAbbr)}&player_name=${encodeURIComponent(player.name)}`);
      if (!res.ok) throw new Error("Failed to load injury");
      return res.json() as Promise<InjuryData>;
    },
    enabled: hasTeamSite && newsFilter === 'injuries',
    staleTime: 30 * 60 * 1000,
  });

  const staticEntries = player.news || [];
  const teamItems = teamNews?.items || [];
  const featuredItem = teamItems[0] || null;
  const compactItems = teamItems.slice(1);
  const hasContent = staticEntries.length > 0 || teamItems.length > 0;
  const sourceName = teamNews?.source || (teamSiteLabel ? `${teamSiteLabel}.com` : '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} data-testid="news-tab">
      <div>
        <SectionHeader title="News & Analysis" subtitle="Latest team reports, injury updates, and player intel" />
        {hasTeamSite && (
          <div style={{ display: 'flex', gap: '0', marginTop: '16px' }} data-testid="news-filter-toggle">
            <button
              type="button"
              className={`sc-news-tab ${newsFilter === 'articles' ? 'sc-news-tab--active' : ''}`}
              onClick={() => setNewsFilter('articles')}
              data-testid="button-filter-articles"
            >
              Articles
            </button>
            <button
              type="button"
              className={`sc-news-tab ${newsFilter === 'injuries' ? 'sc-news-tab--active' : ''}`}
              onClick={() => setNewsFilter('injuries')}
              data-testid="button-filter-injuries"
            >
              Injuries
            </button>
          </div>
        )}
      </div>

      {hasTeamSite && newsFilter === 'injuries' && (
        <>
          {injuryLoading && (
            <div className="sc-injury-card">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-4/5 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          )}
          {injuryData && !injuryLoading && (() => {
            const injuryMeta = (() => {
              const pos = injuryData.position || '';
              let inj = injuryData.injury || '';
              if (inj && !inj.toLowerCase().includes('injury') && !inj.toLowerCase().includes('illness') && !inj.toLowerCase().includes('rest') && !inj.toLowerCase().includes('personal')) {
                inj = `${inj} Injury`;
              }
              return pos && inj ? `${pos} \u2022 ${inj}` : pos || inj;
            })();

            const titleCase = (s: string) => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
            const reportLabelDisplay = injuryData.report_label ? `${titleCase(injuryData.report_label)} Injury Report` : 'Injury Report';

            const blurbParts: { text: string; bold: boolean }[] = (() => {
              const b = injuryData.blurb || '';
              const name = injuryData.player_name || '';
              if (!name || !b.includes(name)) return [{ text: b, bold: false }];
              const idx = b.indexOf(name);
              const parts: { text: string; bold: boolean }[] = [];
              if (idx > 0) parts.push({ text: b.slice(0, idx), bold: false });
              parts.push({ text: name, bold: true });
              if (idx + name.length < b.length) parts.push({ text: b.slice(idx + name.length), bold: false });
              return parts;
            })();

            const formatRelative = (iso: string) => {
              const d = new Date(iso);
              if (isNaN(d.getTime())) return '';
              const diff = Math.floor((Date.now() - d.getTime()) / 1000);
              if (diff < 60) return 'just now';
              if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
              if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
              return `${Math.floor(diff / 86400)}d ago`;
            };
            const formatShortDate = (iso: string) => {
              const d = new Date(iso);
              if (isNaN(d.getTime())) return '';
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            };

            const reportUpdatedLine = injuryData.report_updated_at ? `Report updated: ${formatShortDate(injuryData.report_updated_at)}` : null;
            const lastCheckedLine = injuryData.fetched_at ? `Last checked: ${formatRelative(injuryData.fetched_at)}` : null;

            const hasPractice = injuryData.practice && (injuryData.practice.wed || injuryData.practice.thu || injuryData.practice.fri);

            return (
              <div className={`sc-injury-card ${!injuryData.found ? 'sc-injury-card--empty' : ''}`} data-testid="injury-card">
                {injuryData.found ? (
                  <>
                    <div className="sc-injury-card__top">
                      <div>
                        <div className="sc-injury-card__title" data-testid="text-injury-title">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px' }}>
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                          {reportLabelDisplay}
                        </div>
                        <div className="sc-injury-card__meta" data-testid="text-injury-meta">{injuryMeta}</div>
                      </div>
                      <div className={`sc-injury-pill ${getInjuryPillClass(injuryData.game_status || '')}`} data-testid="badge-injury-status">
                        {(() => {
                          const gs = (injuryData.game_status || '').toUpperCase().trim();
                          return (gs && gs !== '(-)' && gs !== '-') ? gs : 'No designation';
                        })()}
                      </div>
                    </div>
                    <div className="sc-injury-card__blurb" data-testid="text-injury-blurb">
                      {blurbParts.map((p, i) => p.bold ? <strong key={i}>{p.text}</strong> : <span key={i}>{p.text}</span>)}
                    </div>
                    {hasPractice && (
                      <div className="sc-injury-card__bot">
                        {injuryData.practice?.wed && <span className={`sc-injury-chip ${getPracticeChipClass(injuryData.practice.wed)}`} data-testid="chip-practice-wed">WED: {injuryData.practice.wed}</span>}
                        {injuryData.practice?.thu && <span className={`sc-injury-chip ${getPracticeChipClass(injuryData.practice.thu)}`} data-testid="chip-practice-thu">THU: {injuryData.practice.thu}</span>}
                        {injuryData.practice?.fri && <span className={`sc-injury-chip ${getPracticeChipClass(injuryData.practice.fri)}`} data-testid="chip-practice-fri">FRI: {injuryData.practice.fri}</span>}
                      </div>
                    )}
                    <div className="sc-injury-card__footer">
                      <div className="sc-injury-card__timestamps">
                        {reportUpdatedLine && <span className="sc-injury-card__updated" data-testid="text-injury-report-date">{reportUpdatedLine}</span>}
                        {lastCheckedLine && <span className="sc-injury-card__updated" data-testid="text-injury-checked">{lastCheckedLine}</span>}
                      </div>
                      {injuryData.source_url && (
                        <a className="sc-injury-card__link" href={injuryData.source_url} target="_blank" rel="noopener noreferrer" data-testid="link-injury-source">
                          View Full Injury Report →
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sc-injury-card__top">
                      <div>
                        <div className="sc-injury-card__title">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px' }}>
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                          {reportLabelDisplay}
                        </div>
                      </div>
                      <div className="sc-injury-pill sc-injury-pill--none" data-testid="badge-injury-status">Not Listed</div>
                    </div>
                    <div className="sc-injury-card__blurb" data-testid="text-injury-blurb">No injury designation listed on the latest report.</div>
                    <div className="sc-injury-card__footer">
                      <div className="sc-injury-card__timestamps">
                        {reportUpdatedLine && <span className="sc-injury-card__updated" data-testid="text-injury-report-date">{reportUpdatedLine}</span>}
                        {lastCheckedLine && <span className="sc-injury-card__updated" data-testid="text-injury-checked">{lastCheckedLine}</span>}
                      </div>
                      {injuryData.source_url && (
                        <a className="sc-injury-card__link" href={injuryData.source_url} target="_blank" rel="noopener noreferrer" data-testid="link-injury-source">
                          View Full Injury Report →
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </>
      )}

      {hasTeamSite && newsFilter !== 'articles' ? null : (
      <>
      {hasTeamSite && teamNewsLoading && (
        <div className="space-y-5">
          <div className="sc-player-news" style={{ '--team-accent': teamColor } as React.CSSProperties}>
            <div style={{ height: 4, borderRadius: '6px 6px 0 0', background: `linear-gradient(90deg, ${teamColor}, ${teamColor}88)`, margin: '-24px -24px 20px -24px' }} />
            <div className="sc-player-news__header">
              <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-3.5 w-28" />
              </div>
            </div>
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-5 w-full mb-1.5" />
            <Skeleton className="h-5 w-4/5 mb-4" />
            <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          </div>
          <div className="sc-teamnews">
            <div className="sc-teamnews__list">
              {[1, 2].map(i => (
                <div key={i} className="sc-teamnews__card" style={{ pointerEvents: 'none' }}>
                  <div className="sc-teamnews__card-left"><Skeleton className="w-[34px] h-[34px] rounded-xl" /></div>
                  <div className="sc-teamnews__card-mid"><Skeleton className="h-4 w-16 mb-2" /><Skeleton className="h-5 w-full" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {featuredItem && (
        <FeaturedNewsCard item={featuredItem} player={player} teamColor={teamColor} sourceName={sourceName} />
      )}

      {compactItems.length > 0 && (
        <div className="sc-teamnews" data-testid="team-news-list">
          <div className="sc-teamnews__head">
            <div className="sc-teamnews__head-left">
              <div className="sc-teamnews__icon" aria-hidden="true">📰</div>
              <div>
                <div className="sc-teamnews__kicker">Latest from {sourceName}</div>
                <div className="sc-teamnews__sub">{teamItems.length} updates</div>
              </div>
            </div>
            <div>
              <button
                className="sc-teamnews__btn"
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                data-testid="button-refresh-news"
              >
                <RefreshCcw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          <div className="sc-teamnews__list">
            {compactItems.map((item, i) => (
              <a
                key={i}
                className="sc-teamnews__card"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-team-news-${i}`}
              >
                <div className="sc-teamnews__card-left" aria-hidden="true">
                  <div className="sc-teamnews__doc">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" />
                    </svg>
                  </div>
                </div>

                <div className="sc-teamnews__card-mid">
                  <div className="sc-teamnews__meta">
                    <span className="sc-pill sc-pill--type" data-testid={`badge-news-type-${i}`}>{(item.type || 'news').toUpperCase()}</span>
                    <span className="sc-teamnews__source">{sourceName}</span>
                    {item.impact && (
                      <span className={`sc-pill sc-pill--impact sc-pill--impact-${item.impact.toLowerCase()}`}>{item.impact}</span>
                    )}
                    {item.tag && (
                      <span className="sc-pill sc-pill--tag">{item.tag}</span>
                    )}
                  </div>
                  <div className="sc-teamnews__title">{item.title}</div>
                  {item.ai_blurb && (
                    <div className="sc-teamnews__blurb">{item.ai_blurb}</div>
                  )}
                </div>

                <div className="sc-teamnews__card-right" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {teamNews?.team_profile_url && (
            <div style={{ padding: '0 14px 12px' }}>
              <a
                href={teamNews.team_profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-teamnews__profile-link"
                data-testid="link-team-profile"
              >
                View full profile on {sourceName}
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                  <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}

      {teamItems.length === 1 && teamNews?.team_profile_url && (
        <div style={{ marginTop: -8 }}>
          <a
            href={teamNews.team_profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="sc-teamnews__profile-link"
            data-testid="link-team-profile-single"
          >
            View full profile on {sourceName}
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
              <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
            </svg>
          </a>
        </div>
      )}

      {staticEntries.length > 0 && (
        <div className="sc-teamnews" data-testid="news-list">
          <div className="sc-teamnews__head">
            <div className="sc-teamnews__head-left">
              <div className="sc-teamnews__icon" aria-hidden="true">📄</div>
              <div>
                <div className="sc-teamnews__kicker">Articles</div>
                <div className="sc-teamnews__sub">{staticEntries.length} {staticEntries.length === 1 ? 'article' : 'articles'}</div>
              </div>
            </div>
          </div>
          <div className="sc-teamnews__list">
            {staticEntries.map((entry, i) => (
              <a
                key={i}
                className="sc-teamnews__card"
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-news-${i}`}
              >
                <div className="sc-teamnews__card-left" aria-hidden="true">
                  <div className="sc-teamnews__doc">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" />
                    </svg>
                  </div>
                </div>
                <div className="sc-teamnews__card-mid">
                  <div className="sc-teamnews__meta">
                    <span className="sc-pill sc-pill--type">NEWS</span>
                    <span className="sc-teamnews__source">{entry.source}</span>
                    {entry.publishedAt && (
                      <span className="sc-teamnews__date">
                        {new Date(entry.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div className="sc-teamnews__title">{entry.title}</div>
                  {entry.summary && (
                    <div className="sc-teamnews__blurb">{entry.summary}</div>
                  )}
                </div>
                <div className="sc-teamnews__card-right" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {!hasContent && !teamNewsLoading && (
        <div className="sc-teamnews">
          <div className="sc-teamnews__head">
            <div className="sc-teamnews__head-left">
              <div className="sc-teamnews__icon" aria-hidden="true">📰</div>
              <div>
                <div className="sc-teamnews__kicker">News & Analysis</div>
                <div className="sc-teamnews__sub">No updates found</div>
              </div>
            </div>
          </div>
          <div className="sc-teamnews__list">
            <div className="sc-teamnews__empty">
              No recent items available for {player.name}. Check back soon for updates.
            </div>
          </div>
        </div>
      )}

      </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/articles/">
          <div className="sc-card hover-elevate" style={{ padding: '20px 24px', cursor: 'pointer', height: '100%' }}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-md" style={{ background: 'rgba(11,58,122,0.08)' }}>
                  <FileText className="w-4 h-4" style={{ color: '#0b3a7a' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#0b3a7a', fontSize: '14px' }}>Browse Articles</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Expert analysis and insights</p>
                </div>
              </div>
          </div>
        </Link>
        <Link href="/nfl/players">
          <div className="sc-card hover-elevate" style={{ padding: '20px 24px', cursor: 'pointer', height: '100%' }}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-md" style={{ background: 'rgba(11,58,122,0.08)' }}>
                  <Search className="w-4 h-4" style={{ color: '#0b3a7a' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#0b3a7a', fontSize: '14px' }}>Search Players</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Find and compare players</p>
                </div>
              </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function PlayerProfileSkeleton() {
  return (
    <>
      <div className="bg-slate-50 dark:bg-[#0B1634] border-b-2 border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-6 flex-wrap">
            <Skeleton className="w-24 h-24 md:w-40 md:h-40 rounded-md" />
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-9 w-56 mb-3" />
              <Skeleton className="h-[2px] w-20 mb-4" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-md" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-md" />
          ))}
        </div>
        <Skeleton className="h-40 rounded-md" />
      </div>
    </>
  );
}

const SCORING_SHORT: Record<ScoringFormat, string> = { standard: 'STD', half: 'HALF', ppr: 'PPR' };

function ScoringFormatToggle({ format, onChange }: { format: ScoringFormat; onChange: (f: ScoringFormat) => void }) {
  const formats: ScoringFormat[] = ['standard', 'half', 'ppr'];
  return (
    <div className="sc-segment" role="group" aria-label="Scoring format" data-testid="scoring-format-toggle">
      {formats.map((f) => (
        <button
          key={f}
          type="button"
          className={`sc-segment__btn ${format === f ? 'sc-segment__btn--active' : ''}`}
          onClick={() => onChange(f)}
          data-testid={`button-format-${f}`}
        >
          <span className="sc-seg-full">{SCORING_LABELS[f]}</span>
          <span className="sc-seg-short">{SCORING_SHORT[f]}</span>
        </button>
      ))}
    </div>
  );
}

export default function PlayerProfile() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [scoringFormat, setScoringFormat] = useState<ScoringFormat>('ppr');

  const { data: player, isLoading, error } = useQuery<Player>({
    queryKey: ["/api/players", slug, { format: scoringFormat }],
    queryFn: () => fetch(`/api/players/${slug}?format=${scoringFormat}`).then(r => r.json()),
  });

  const { data: relatedData } = useQuery<RelatedResponse>({
    queryKey: ["/api/players", slug, "related", { format: scoringFormat }],
    queryFn: () => fetch(`/api/players/${slug}/related?format=${scoringFormat}`).then(r => r.json()),
    enabled: !!player,
  });

  const [injuryData, setInjuryData] = useState<PlayerInjuryHistory | null>(null);
  const [injuryLoading, setInjuryLoading] = useState(false);
  const [injuryError, setInjuryError] = useState(false);
  const injuryFetchedFor = useRef<string | null>(null);
  // Layer 6 — real weeks played per season (season -> week numbers), used by the
  // availability timeline as the authoritative source of missed weeks.
  const [weeklyPlayed, setWeeklyPlayed] = useState<Record<number, number[]>>({});
  const weeklyPlayedFor = useRef<string | null>(null);

  const [advSeason, setAdvSeason] = useState<AdvSeason>(2025);
  const advPos = player?.position?.toLowerCase();
  const { data: advData, isLoading: advLoading } = useQuery<PlayerAdvancedResult | null>({
    queryKey: ["/api/advanced-stats", advPos, advSeason, player?.id],
    queryFn: () => loadPlayerAdvancedStats(player!.id, player!.position || "", advSeason),
    enabled: activeTab === "advanced" && !!player?.id && !!player?.position && ["QB","RB","WR","TE"].includes(player.position || ""),
    staleTime: 1000 * 60 * 60,
  });

  // Up-front qualification check (runs regardless of the active tab) so we can
  // decide whether to show the Advanced Stats tab, which seasons to offer, and
  // whether the "All Seasons" view is available.
  const { data: advQual } = useQuery<AdvancedQualification>({
    queryKey: ["/api/advanced-stats/qualification", advPos, player?.id],
    queryFn: () => loadPlayerSeasonQualification(player!.id, player!.position || ""),
    enabled: !!player?.id && !!player?.position && ["QB","RB","WR","TE"].includes(player.position || ""),
    staleTime: 1000 * 60 * 60,
  });
  const qualifiedSeasons = advQual?.qualifiedSeasons ?? [];
  const allSeasonsQualified = advQual?.allQualified ?? false;
  const showAdvancedTab = qualifiedSeasons.length > 0;

  // Keep the selected advanced season valid: if the player isn't qualified for
  // the current pick (or for "All Seasons"), fall back to their most recent
  // qualified season.
  useEffect(() => {
    if (!qualifiedSeasons.length) return;
    const valid = advSeason === "all" ? allSeasonsQualified : qualifiedSeasons.includes(advSeason as number);
    if (!valid) setAdvSeason(Math.max(...qualifiedSeasons) as AdvSeason);
  }, [qualifiedSeasons, allSeasonsQualified, advSeason]);

  useEffect(() => {
    setActiveTab("overview");
    setInjuryData(null);
    setInjuryError(false);
    injuryFetchedFor.current = null;
    setWeeklyPlayed({});
    weeklyPlayedFor.current = null;
  }, [slug]);

  useEffect(() => {
    if (activeTab !== "injury" || !player?.id || !player?.name) return;
    const key = player.id;
    if (injuryFetchedFor.current === key) return;
    injuryFetchedFor.current = key;
    setInjuryLoading(true);
    setInjuryError(false);
    fetchPlayerInjuryHistory(player.id, player.name)
      .then((data) => { setInjuryData(data); setInjuryLoading(false); })
      .catch(() => { setInjuryError(true); setInjuryLoading(false); });
  }, [activeTab, player?.id, player?.name]);

  // Layer 6 — once injury history loads, fetch real weekly game logs for every
  // relevant season in parallel and treat recorded production as authoritative
  // for which weeks were played. Runs once per player+season-set.
  useEffect(() => {
    if (activeTab !== "injury" || !player?.id || !injuryData) return;
    const seasons = Array.from(
      new Set<number>([
        ...injuryData.nfl.map((e) => e.season),
        ...((player as PlayerWithSeasons).availableSeasons ?? []),
      ]),
    ).filter((s) => Number.isFinite(s));
    if (seasons.length === 0) return;
    const key = `${player.id}|${seasons.slice().sort().join(",")}`;
    if (weeklyPlayedFor.current === key) return;
    weeklyPlayedFor.current = key;

    const pid = player.id;
    let cancelled = false;
    Promise.all(
      seasons.map((season) =>
        fetchPlayerGameLogs(pid, season, "regular")
          .then((rows) => {
            // A week counts as played only if the player recorded real
            // production — the feed returns rostered-but-inactive rows too.
            const weeks = rows
              .filter(
                (r) =>
                  (r.passAtt || 0) + (r.rushAtt || 0) + (r.tgt || 0) + (r.rec || 0) +
                    (r.passYd || 0) + (r.rushYd || 0) + (r.recYd || 0) > 0,
              )
              .map((r) => r.week);
            return [season, weeks] as const;
          })
          .catch(() => [season, [] as number[]] as const),
      ),
    ).then((pairs) => {
      if (cancelled) return;
      const next: Record<number, number[]> = {};
      for (const [season, weeks] of pairs) if (weeks.length) next[season] = weeks;
      setWeeklyPlayed(next);
    });
    return () => { cancelled = true; };
  }, [activeTab, player?.id, injuryData, (player as PlayerWithSeasons | undefined)?.availableSeasons]);

  useEffect(() => {
    if (!player) return;

    document.title = `${player.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;

    const desc = `View ${player.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for ${player.season} NFL season.`;
    const canonical = `https://statchasers.com/nfl/players/${player.slug}/`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical);

    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: player.name,
      sport: "American Football",
      url: canonical,
    };
    if (player.team && player.team !== "FA") {
      jsonLd.affiliation = { "@type": "SportsTeam", name: player.team };
    }
    let scriptTag = document.getElementById("sc-jsonld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "sc-jsonld";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = "StatChasers";
      metaDesc?.setAttribute("content", "");
      linkCanonical?.setAttribute("href", "");
      scriptTag?.remove();
    };
  }, [player]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SearchHero />
        <PlayerProfileSkeleton />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen bg-background">
        <SearchHero />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-not-found">Player Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a player with that profile. They may not be in our database.
          </p>
          <Link href="/nfl/players">
            <Button data-testid="button-search-again">
              <Search className="w-4 h-4 mr-2" />
              Search Players
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const teamColor = player.team ? TEAM_PRIMARY_COLORS[player.team] || '#6B7280' : '#6B7280';
  const teamName = player.team ? TEAM_FULL_NAMES[player.team] || player.team : 'Free Agent';
  const positionFull = player.position ? POSITION_FULL_NAMES[player.position] || player.position : '';
  const playerWithSeasons = player as PlayerWithSeasons;
  const defaultEntries = player.gameLog || [];

  const nameParts = player.name.trim().split(/\s+/);
  const headerFirstName = nameParts.slice(0, -1).join(' ').toUpperCase();
  const headerLastName = nameParts.slice(-1)[0].toUpperCase();

  const posLabel = player.position || '';

  // Pull the "Drafted ..." line out of the bio snapshot bullets to show in the header.
  const headerDraftedLine = ((player as any).bio?.snapshot_bullets ?? []).find((b: string) => /^Drafted\b/.test(b)) ?? null;

  const headerMetaLine = [
    player.age ? `Age ${player.age}` : null,
    player.height ? formatHeight(player.height) : null,
    player.weight ? `${player.weight} lbs` : null,
    player.years_exp != null ? `Exp ${player.years_exp} yr${player.years_exp !== 1 ? 's' : ''}` : null,
  ].filter(Boolean).join('  ·  ');
  const teamRgb = hexToRgbTriplet(teamColor);

  return (
    <div className="min-h-screen bg-background">
      <SearchHero scoringControl={<ScoringFormatToggle format={scoringFormat} onChange={setScoringFormat} />} />
      <section
        className="max-w-7xl mx-auto px-4 pt-4 pb-2"
        data-testid="section-player-header"
      >
        <div
          className="relative overflow-hidden rounded-2xl border shadow-sm bg-white dark:bg-[#0B1634]"
          style={{ borderColor: 'rgba(11,58,122,0.10)' }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,58,122,0.05) 0%, rgba(255,255,255,0) 60%)' }} />
          <div className="absolute inset-0 hidden dark:block" style={{ background: 'linear-gradient(135deg, #0B1634 0%, #111D42 40%, #0F172A 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent 0%, ${teamColor}88 20%, ${teamColor} 50%, ${teamColor}88 80%, transparent 100%)` }} />

          <div className="relative px-4 sm:px-6 pt-0 pb-1">
            <div
              className="player-hero"
              style={{ ['--team-color' as any]: teamColor, ['--team-rgb' as any]: teamRgb }}
            >
            <PlayerHeadshot playerId={player.id} name={player.name} teamColor={teamColor} team={player.team || undefined} />

            <div className="player-identity">
              {headerFirstName && <p className="player-first-name">{headerFirstName}</p>}
              <h1 className="player-last-name" data-testid="text-player-name">{headerLastName}</h1>

              <p className="player-team-line" data-testid="text-team">
                {teamName}
                {player.number ? <> &middot; #{player.number}</> : null}
                {positionFull ? <> &middot; {positionFull}</> : null}
              </p>

              {headerMetaLine && (
                <p className="player-meta-line" data-testid="text-player-meta">{headerMetaLine}</p>
              )}
              {headerDraftedLine && (
                <p className="player-draft-line" data-testid="text-player-drafted">{headerDraftedLine}</p>
              )}

            </div>

            {player.team && (
              <img
                src={`https://sleepercdn.com/images/team_logos/nfl/${player.team.toLowerCase()}.png`}
                alt=""
                aria-hidden="true"
                className="team-watermark"
              />
            )}
            </div>
          </div>
        </div>
      </section>

      <div className="border-b" style={{ background: 'rgba(255,255,255,0.97)', borderColor: 'rgba(11,58,122,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <nav
            className="flex gap-0.5 overflow-x-auto -mb-px scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            data-testid="profile-tabs"
          >
            {TAB_CONFIG.filter(tab => tab.key !== "advanced" || showAdvancedTab).map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13px',
                    lineHeight: '1.2',
                    padding: '14px 18px',
                    color: isActive ? '#0b3a7a' : '#94a3b8',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                    background: 'none',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 0,
                    boxShadow: 'none',
                    outline: 'none',
                    flex: 'none',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    margin: 0,
                    verticalAlign: 'bottom',
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    textDecoration: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#0b3a7a'; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
                  data-testid={`tab-${tab.key}`}
                >
                  {tab.label}
                  <span
                    className="absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 rounded-full"
                    style={{
                      height: isActive ? '3px' : '0px',
                      background: 'linear-gradient(90deg, #F5C01A, #FFD166, #F5C01A)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div
          key={activeTab}
          className="animate-in fade-in duration-300"
          style={{ animation: 'fadeSlideIn 0.3s ease-out' }}
        >
          {activeTab === "overview" && (
            <OverviewTab player={playerWithSeasons} entries={defaultEntries} format={scoringFormat} />
          )}
          {activeTab === "gamelog" && (
            <GameLogTab player={playerWithSeasons} format={scoringFormat} />
          )}
          {activeTab === "advanced" && (
            <AdvancedTab
              adv={advData ?? null}
              advLoading={advLoading}
              pos={player.position || ""}
              season={advSeason}
              onSeasonChange={setAdvSeason}
              qualifiedSeasons={qualifiedSeasons}
              allSeasonsQualified={allSeasonsQualified}
            />
          )}
          {activeTab === "injury" && (
            <InjuryTab
              injury={injuryData}
              loading={injuryLoading}
              error={injuryError}
              playerName={player.name}
              knownSeasons={playerWithSeasons.availableSeasons ?? []}
              weeklyPlayed={weeklyPlayed}
            />
          )}
          {activeTab === "news" && (
            <NewsTab player={player} />
          )}
        </div>

        {relatedData && relatedData.neighbors && relatedData.neighbors.length > 0 && (
          <RankNeighborsRail player={player} related={relatedData} />
        )}
      </main>

    </div>
  );
}

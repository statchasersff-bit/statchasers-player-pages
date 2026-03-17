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
  Users,
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
  Gauge,
  Info,
  Sparkles,
  RefreshCcw,
  BookOpen,
  Clock,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import type { Player, GameLogEntry, NewsEntry, GameLogStats, GameScore } from "@shared/playerTypes";
import { TEAM_FULL_NAMES, TEAM_PRIMARY_COLORS, POSITION_FULL_NAMES } from "@shared/teamMappings";
import { type ScoringFormat, SCORING_LABELS, getEntryPoints } from "@shared/scoring";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const TAB_KEYS = ["overview", "bio", "gamelog", "usage", "rankings", "news"] as const;
type TabKey = typeof TAB_KEYS[number];

const TAB_CONFIG: { key: TabKey; label: string; icon: typeof Activity }[] = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "bio", label: "Bio", icon: BookOpen },
  { key: "gamelog", label: "Game Log", icon: Table },
  { key: "usage", label: "Usage & Trends", icon: TrendingUp },
  { key: "rankings", label: "Rankings & Value", icon: Trophy },
];

function getHeadshotUrl(playerId: string): string {
  return `https://sleepercdn.com/content/nfl/players/thumb/${playerId}.jpg`;
}

function PlayerHeadshot({ playerId, name, teamColor, team }: { playerId: string; name: string; teamColor?: string; team?: string }) {
  const [imgError, setImgError] = useState(false);
  const headshotUrl = getHeadshotUrl(playerId);
  const logoUrl = team ? `https://sleepercdn.com/images/team_logos/nfl/${team.toLowerCase()}.png` : null;
  const ringColor = teamColor || '#0b3a7a';

  return (
    <div className="relative flex-shrink-0" data-testid="img-headshot">
      <div
        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
        style={{
          border: `3px solid ${ringColor}`,
          boxShadow: `0 4px 16px ${ringColor}44, 0 2px 6px rgba(0,0,0,0.10)`,
          background: '#f1f5f9',
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: 0.18,
              padding: '6%',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          />
        )}
        {!imgError ? (
          <img
            src={headshotUrl}
            alt={`${name} headshot`}
            className="w-full h-full object-cover"
            style={{ position: 'relative', zIndex: 1 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ position: 'relative', zIndex: 1 }}
            data-testid="img-headshot-fallback"
          >
            <User className="w-10 h-10 md:w-12 md:h-12 text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
}

function NeighborHeadshot({ playerId, name, teamAbbr }: { playerId: string; name: string; teamAbbr: string }) {
  const [imgError, setImgError] = useState(false);
  const url = getHeadshotUrl(playerId);
  const teamColor = TEAM_PRIMARY_COLORS[teamAbbr] || '#6B7280';

  if (imgError) {
    return (
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
        style={{ border: `2px solid ${teamColor}` }}
        data-testid={`img-neighbor-${playerId}`}
      >
        <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      className="flex-shrink-0 w-9 h-9 rounded-full object-cover bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
      style={{ border: `2px solid ${teamColor}` }}
      onError={() => setImgError(true)}
      data-testid={`img-neighbor-${playerId}`}
    />
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

function getOppRankColor(rank: number | null | undefined): string {
  if (!rank) return 'text-muted-foreground';
  if (rank <= 8) return 'text-red-500 dark:text-red-400';
  if (rank >= 25) return 'text-green-600 dark:text-green-400';
  return 'text-muted-foreground';
}

type SortKey = 'week' | 'fpts' | 'finish' | string;
type SortDir = 'asc' | 'desc';

function GameLogTable({ entries = [], position, filter, tierFilter, hideInactive, format = 'ppr', lastN }: { entries?: GameLogEntry[]; position: string | null; filter: 'full' | 'last5'; tierFilter: DistTier | null; hideInactive: boolean; format?: ScoringFormat; lastN?: number }) {
  const { primary, detail, conditionalRush } = getPositionColumns(position);
  const posLabel = position || '';
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [footerMode, setFooterMode] = useState<'avg' | 'total'>('avg');

  const getStat = (entry: GameLogEntry, key: string) =>
    (entry.stats as unknown as Record<string, number>)[key] ?? 0;

  const allActiveEntries = entries.filter(e => e.game_status === 'active');
  const hasRushing = conditionalRush && allActiveEntries.some(e => getStat(e, 'rush_att') > 0);
  const rushCols: ColumnDef[] = hasRushing ? [{ key: 'rush_att', label: 'CAR' }, { key: 'rush_yd', label: 'RUSH' }] : [];
  const allCols = [...primary, ...rushCols];
  const hasDetail = detail.length > 0;
  const colCount = 6 + allCols.length + (hasDetail ? 1 : 0);

  const toggleRow = (week: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === 'desc') setSortDir('asc');
      else { setSortKey(null); setSortDir('desc'); }
    } else {
      setSortKey(key);
      setSortDir(key === 'week' ? 'asc' : 'desc');
    }
  }, [sortKey, sortDir]);

  const sliceCount = lastN || (filter === 'last5' ? 5 : undefined);
  let baseEntries = sliceCount ? allActiveEntries.slice(-sliceCount) : entries;

  if (hideInactive && filter !== 'last5') {
    baseEntries = baseEntries.filter(e => e.game_status === 'active');
  }

  const isInTier = (entry: GameLogEntry, tier: DistTier): boolean => {
    const pts = fpts(entry, format);
    if (tier === '15+') return pts >= 15;
    if (tier === '10\u201314.9') return pts >= 10 && pts < 15;
    if (tier === '5\u20139.9') return pts >= 5 && pts < 10;
    return pts < 5;
  };

  if (tierFilter) {
    baseEntries = baseEntries.filter(e => e.game_status === 'active' && isInTier(e, tierFilter));
  }

  const displayEntries = useMemo(() => {
    if (!sortKey) return baseEntries;
    const sorted = [...baseEntries];
    sorted.sort((a, b) => {
      let av: number, bv: number;
      if (sortKey === 'week') { av = a.week; bv = b.week; }
      else if (sortKey === 'fpts') { av = a.game_status === 'active' ? fpts(a, format) : -1; bv = b.game_status === 'active' ? fpts(b, format) : -1; }
      else if (sortKey === 'finish') { av = a.pos_rank ?? 999; bv = b.pos_rank ?? 999; }
      else { av = a.game_status === 'active' ? getStat(a, sortKey) : -1; bv = b.game_status === 'active' ? getStat(b, sortKey) : -1; }
      const diff = av - bv;
      return sortDir === 'asc' ? diff : -diff;
    });
    return sorted;
  }, [baseEntries, sortKey, sortDir]);

  const activeInDisplay = displayEntries.filter(e => e.game_status === 'active');
  const gamesPlayed = activeInDisplay.length;

  const rankedEntries = activeInDisplay.filter(e => e.pos_rank != null);
  const avgFinish = rankedEntries.length > 0
    ? rankedEntries.reduce((s, e) => s + (e.pos_rank ?? 0), 0) / rankedEntries.length
    : null;

  const SortIcon = ({ colKey }: { colKey: SortKey }) => {
    if (sortKey !== colKey) return <ArrowUpDown className="w-2.5 h-2.5 ml-0.5 inline opacity-30" />;
    return sortDir === 'asc'
      ? <ArrowUp className="w-2.5 h-2.5 ml-0.5 inline text-primary" />
      : <ArrowDown className="w-2.5 h-2.5 ml-0.5 inline text-primary" />;
  };

  const scoreColor = (r: string) => r === 'W' ? 'text-green-600 dark:text-green-400' : r === 'L' ? 'text-red-500 dark:text-red-400' : 'text-muted-foreground';

  const ordinalSuffix = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const thClass = "sc-gamelog__th sc-gamelog__th--sortable";
  const thStatic = "sc-gamelog__th";
  const thPrimary = "sc-gamelog__th sc-gamelog__th--sortable sc-gamelog__th--primary";

  const fptsTooltip = (entry: GameLogEntry) => {
    const parts: string[] = [];
    const s = entry.stats;
    if (s.pass_yd) parts.push(`${s.pass_yd} pass yds, ${s.pass_td || 0} TD${s.pass_int ? `, ${s.pass_int} INT` : ''}`);
    if (s.rush_att) parts.push(`${s.rush_att} car, ${s.rush_yd || 0} rush yds${s.rush_td ? `, ${s.rush_td} TD` : ''}`);
    if (s.rec_tgt) parts.push(`${s.rec_tgt} tgt, ${s.rec || 0} rec, ${s.rec_yd || 0} yds${s.rec_td ? `, ${s.rec_td} TD` : ''}`);
    return parts.join(' | ');
  };

  const getRowAccent = (entry: GameLogEntry) => {
    if (entry.game_status !== 'active') return '';
    const pts = fpts(entry, format);
    if (pts >= 20) return 'border-l-[3px] border-l-emerald-500/60';
    if (pts < 5 && pts >= 0) return 'border-l-[3px] border-l-red-400/40';
    return 'border-l-[3px] border-l-transparent';
  };

  return (
    <div className="sc-gamelog__table-wrap">
      <table className="sc-gamelog__table" data-testid="table-game-log">
        <thead>
          <tr className="sc-gamelog__thead-row">
            <th className={thClass} onClick={() => handleSort('week')} data-testid="sort-week">WK<SortIcon colKey="week" /></th>
            <th className={thStatic}>OPP</th>
            <th className={`${thStatic} text-center`} style={{ position: 'sticky', left: 0, zIndex: 12 }}>SCORE</th>
            {allCols.map((col) => (
              <th key={col.key} className={`${thClass} text-right sc-gamelog__th--secondary`} onClick={() => handleSort(col.key)} data-testid={`sort-${col.key}`}>
                {col.label}<SortIcon colKey={col.key} />
              </th>
            ))}
            <th className={`${thPrimary} text-right`} onClick={() => handleSort('fpts')} data-testid="sort-fpts">FPTS<SortIcon colKey="fpts" /></th>
            <th className={`${thPrimary} text-right`} onClick={() => handleSort('finish')} data-testid="sort-finish">FINISH<SortIcon colKey="finish" /></th>
            {hasDetail && <th className="sc-gamelog__th" style={{ width: '24px' }}></th>}
          </tr>
        </thead>
        <tbody>
          {displayEntries.length > 0 ? (
            <>
              {displayEntries.map((entry) => {
                const isExpanded = expandedRows.has(entry.week);
                const rank = entry.pos_rank;
                const tierBadge = getTierBadge(rank, position);
                const oppRank = entry.opp_rank_vs_pos;
                const oppRankLabel = oppRank ? ordinalSuffix(oppRank) : null;
                const isBye = entry.game_status === 'bye';
                const isOut = entry.game_status === 'out';
                const isInactive = isBye || isOut;
                const sc = entry.score;

                if (isInactive) {
                  return (
                    <tr key={entry.week} className="sc-gamelog__row" style={{ opacity: 0.4 }} data-testid={`row-gamelog-week-${entry.week}`}>
                      <td className="sc-gamelog__td" style={{ fontWeight: 600 }}>{entry.week}</td>
                      <td className="sc-gamelog__td" style={{ color: '#94a3b8' }}>{isBye ? 'BYE' : '\u2014'}</td>
                      <td className="sc-gamelog__td text-center">
                        <Badge variant="secondary" className={`text-[8px] px-1.5 py-0 ${isBye ? 'bg-sky-500/10 text-sky-700 dark:text-sky-400' : 'bg-muted text-muted-foreground'}`} data-testid={`badge-status-${entry.week}`}>
                          {isBye ? 'BYE' : 'OUT'}
                        </Badge>
                      </td>
                      {allCols.map((col) => (
                        <td key={col.key} className="sc-gamelog__td sc-gamelog__td--secondary text-right">{'\u2014'}</td>
                      ))}
                      <td className="sc-gamelog__td sc-gamelog__td--primary text-right" style={{ color: '#94a3b8' }}>{'\u2014'}</td>
                      <td className="sc-gamelog__td sc-gamelog__td--primary text-right" style={{ color: '#94a3b8' }}>{'\u2014'}</td>
                      {hasDetail && <td className="sc-gamelog__td"></td>}
                    </tr>
                  );
                }

                const pts = fpts(entry, format);

                return (
                  <Fragment key={entry.week}>
                    <tr
                      className={`sc-gamelog__row ${hasDetail ? 'cursor-pointer' : ''} ${isExpanded ? 'sc-gamelog__row--expanded' : ''} ${getRowAccent(entry)}`}
                      onClick={hasDetail ? () => toggleRow(entry.week) : undefined}
                      data-testid={`row-gamelog-week-${entry.week}`}
                    >
                      <td className="sc-gamelog__td" style={{ fontWeight: 600 }}>{entry.week}</td>
                      <td className="sc-gamelog__td" style={{ whiteSpace: 'nowrap' }}>
                        <div className="flex flex-col leading-tight">
                          <span style={{ fontWeight: 600, color: '#0b3a7a' }}>{entry.opp}</span>
                          {oppRankLabel && <span className={`text-[9px] leading-none opacity-70 ${getOppRankColor(oppRank)}`}>{oppRankLabel} vs {posLabel}</span>}
                        </div>
                      </td>
                      <td className="sc-gamelog__td text-center" style={{ whiteSpace: 'nowrap', position: 'sticky', left: 0, zIndex: 2, background: 'inherit' }} data-testid={`score-week-${entry.week}`}>
                        {sc ? (
                          <span className={`text-[10px] tabular-nums font-medium ${scoreColor(sc.r)}`}>
                            {sc.r}, {sc.tm}&ndash;{sc.opp}
                          </span>
                        ) : '\u2014'}
                      </td>
                      {allCols.map((col) => (
                        <td key={col.key} className="sc-gamelog__td sc-gamelog__td--secondary text-right">
                          {getStat(entry, col.key)}
                        </td>
                      ))}
                      <td className="sc-gamelog__td sc-gamelog__td--primary text-right" title={fptsTooltip(entry)}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0b3a7a', fontFamily: 'ui-monospace, monospace' }}>{pts.toFixed(1)}</span>
                      </td>
                      <td className="sc-gamelog__td sc-gamelog__td--primary text-right" data-testid={`text-finish-week-${entry.week}`}>
                        {tierBadge ? (
                          <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 font-semibold tabular-nums ${tierBadge.className}`}>{tierBadge.label}</Badge>
                        ) : rank ? (
                          <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-semibold tabular-nums bg-red-500/15 text-red-500 dark:text-red-400">{posLabel}{rank}</Badge>
                        ) : '\u2014'}
                      </td>
                      {hasDetail && (
                        <td className="sc-gamelog__td" style={{ textAlign: 'center', paddingLeft: '8px' }}>
                          <ChevronRight
                            className={`w-3 h-3 transition-transform duration-200 inline-block ${isExpanded ? 'rotate-90' : ''}`}
                            style={{ color: '#94a3b8' }}
                          />
                        </td>
                      )}
                    </tr>
                    {hasDetail && isExpanded && (
                      <tr style={{ background: 'rgba(15,23,42,0.02)' }} data-testid={`row-gamelog-detail-${entry.week}`}>
                        <td colSpan={colCount} className="py-1.5 px-3">
                          <div className="flex items-center gap-4 flex-wrap pl-2">
                            {detail.map((col) => (
                              <div key={col.key} className="flex items-center gap-1.5">
                                <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 600 }}>{col.label}</span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0b3a7a', fontFamily: 'ui-monospace, monospace' }}>{getStat(entry, col.key)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan={colCount} className="py-8">
                <div className="text-center">
                  <Table className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm font-medium">No game log data yet</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Game log data will be available once the season begins.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        {activeInDisplay.length > 0 && !tierFilter && (
          <tfoot>
            <tr style={{ borderTop: '2px solid rgba(15,23,42,0.10)', background: 'rgba(15,23,42,0.02)' }}>
              <td className="sc-gamelog__td" colSpan={2} data-testid="text-totals-label" style={{ padding: '10px 8px' }}>
                <div className="flex flex-col">
                  <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 500 }}>Season {footerMode === 'avg' ? 'Avg' : 'Totals'}</span>
                  <button
                    className="text-left flex items-center gap-1"
                    style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0b3a7a', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => setFooterMode(footerMode === 'avg' ? 'total' : 'avg')}
                    data-testid="toggle-footer-mode"
                  >
                    {footerMode === 'avg' ? 'AVG/G' : 'TOTALS'}
                    <ArrowUpDown className="w-2.5 h-2.5" style={{ opacity: 0.4 }} />
                  </button>
                  <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 500 }}>{gamesPlayed} games</span>
                </div>
              </td>
              <td className="sc-gamelog__td" style={{ padding: '10px 8px' }}></td>
              {allCols.map((col) => {
                const total = activeInDisplay.reduce((sum, e) => sum + getStat(e, col.key), 0);
                const val = footerMode === 'avg' ? (gamesPlayed > 0 ? total / gamesPlayed : 0) : total;
                return (
                  <td key={col.key} className="sc-gamelog__td sc-gamelog__td--secondary" style={{ textAlign: 'right', fontWeight: 700, padding: '10px 8px' }}>
                    {footerMode === 'total' ? val : (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1))}
                  </td>
                );
              })}
              <td className="sc-gamelog__td sc-gamelog__td--primary" style={{ textAlign: 'right', padding: '10px 8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0b3a7a', fontFamily: 'ui-monospace, monospace' }}>
                  {gamesPlayed > 0
                    ? footerMode === 'avg'
                      ? (activeInDisplay.reduce((sum, e) => sum + fpts(e, format), 0) / gamesPlayed).toFixed(1)
                      : activeInDisplay.reduce((sum, e) => sum + fpts(e, format), 0).toFixed(1)
                    : '0.0'}
                </span>
              </td>
              <td className="sc-gamelog__td sc-gamelog__td--primary" style={{ textAlign: 'right', padding: '10px 8px' }} data-testid="text-avg-finish">
                {avgFinish ? (
                  <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 font-semibold tabular-nums ${(getTierBadge(Math.round(avgFinish), position) || { className: 'bg-red-500/15 text-red-500 dark:text-red-400' }).className}`}>
                    {posLabel}{Math.round(avgFinish)}
                  </Badge>
                ) : '\u2014'}
              </td>
              {hasDetail && <td className="sc-gamelog__td" style={{ padding: '10px 8px' }}></td>}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

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

function MomentumBadge({ data, unit = 'PPG' }: { data: number[]; unit?: string }) {
  if (data.length < 3) return null;
  const recent = data.slice(-3);
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const seasonAvg = data.reduce((a, b) => a + b, 0) / data.length;
  const diff = recentAvg - seasonAvg;
  const pct = seasonAvg > 0 ? (diff / seasonAvg) * 100 : 0;
  const delta = `${diff > 0 ? '+' : ''}${diff.toFixed(1)} ${unit} (${pct > 0 ? '+' : ''}${pct.toFixed(0)}%)`;

  const momentum = Math.abs(pct) < 5 ? 'Stable' : pct > 0 ? 'Up' : 'Down';
  const color = Math.abs(pct) < 5
    ? 'text-muted-foreground'
    : pct > 0
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-500 dark:text-red-400';
  const Icon = Math.abs(pct) < 5 ? Minus : pct > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="text-right" data-testid="badge-momentum">
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/50 font-medium leading-none">Momentum</p>
      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${color}`}>
        <Icon className="w-3.5 h-3.5" /> {momentum}
      </span>
      <p className={`text-[10px] ${color} opacity-70 tabular-nums`}>{delta}</p>
    </div>
  );
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
          <path d={rollingPath} fill="none" stroke="#d4af37" strokeWidth={thickLine ? "3.5" : "2.5"} strokeLinejoin="round" strokeLinecap="round" />
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
  multiSeasonStats?: SeasonStat[];
  careerSeasonStats?: CareerSeasonStat[];
  careerProfile?: CareerProfile | null;
  productionRiskBenchmarks?: BenchmarkData;
};

function generateFantasyOutlookSummary(player: PlayerWithSeasons, stats: ReturnType<typeof computeGameLogStats>, format: ScoringFormat): string[] {
  if (!stats || stats.gamesPlayed === 0) return [];
  const pos = player.position || '';
  const name = player.name || 'This player';
  const team = player.team || '';
  const teamFull = TEAM_FULL_NAMES[team] || team;
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

  return [p1, p2, p3].filter(Boolean);
}

function generateAtAGlance(player: PlayerWithSeasons, stats: ReturnType<typeof computeGameLogStats>, format: ScoringFormat): { label: string; value: string }[] {
  if (!stats || stats.gamesPlayed === 0) return [];
  const pos = player.position || '';
  const topRate = stats.pos1Pct + stats.pos2Pct;
  const cvRatio = stats.ppg > 0 ? stats.volatility / stats.ppg : 2;

  const tier = (() => {
    const benchmarks: Record<string, number[]> = { QB: [22, 17], RB: [16, 11], WR: [14, 9], TE: [11, 7] };
    const [elite, avg] = benchmarks[pos] || [14, 9];
    if (stats.ppg >= elite) return `Elite ${pos}1`;
    if (stats.ppg >= avg && topRate >= 55) return `Solid ${pos}1`;
    if (stats.ppg >= avg) return `${pos}2 Range`;
    return `Streaming ${pos}`;
  })();

  const weeklyProfile = (() => {
    const highFloor = stats.bustPct < 20;
    const highCeiling = stats.pos1Pct > 40;
    if (highFloor && highCeiling) return 'High floor, high ceiling';
    if (highFloor) return 'Safe floor, moderate ceiling';
    if (highCeiling) return 'Volatile, high upside';
    return 'Boom-or-bust profile';
  })();

  const primaryEdge = (() => {
    if (pos === 'QB') return stats.ppg >= 22 ? 'Dual-threat scoring' : 'Passing volume';
    if (pos === 'RB') {
      const rec = (player.careerSeasonStats?.[0]?.receptions ?? 0);
      return rec >= 50 ? 'Receiving + rushing role' : 'Rushing volume and goal-line';
    }
    if (pos === 'WR') return stats.pos1Pct > 40 ? 'Target share depth' : 'Matchup upside';
    if (pos === 'TE') return 'Target share at thin position';
    return 'Usage volume';
  })();

  const mainRisk = (() => {
    if (cvRatio >= 0.7) return 'High week-to-week variance';
    if (stats.bustPct >= 30) return 'Floor risk, bust-prone weeks';
    if (stats.pos1Pct < 25) return 'Limited ceiling weeks';
    const ppgDelta = stats.ppg > 0 ? ((stats.last4Ppg - stats.ppg) / stats.ppg) * 100 : 0;
    if (ppgDelta < -15) return 'Late-season scoring decline';
    return 'TD-dependent production';
  })();

  return [
    { label: 'Fantasy Tier', value: tier },
    { label: 'Weekly Profile', value: weeklyProfile },
    { label: 'Primary Edge', value: primaryEdge },
    { label: 'Main Risk', value: mainRisk },
  ];
}

function generateStrengthsAndRisks(player: PlayerWithSeasons, stats: ReturnType<typeof computeGameLogStats>): { strengths: string[]; risks: string[] } {
  if (!stats || stats.gamesPlayed === 0) return { strengths: [], risks: [] };
  const pos = player.position || '';
  const topRate = stats.pos1Pct + stats.pos2Pct;
  const cvRatio = stats.ppg > 0 ? stats.volatility / stats.ppg : 2;
  const ppgDelta = stats.ppg > 0 ? ((stats.last4Ppg - stats.ppg) / stats.ppg) * 100 : 0;
  const cp = player.careerProfile;

  const strengths: string[] = [];
  const risks: string[] = [];

  if (topRate >= 60) strengths.push(`Finishes in startable range ${topRate.toFixed(0)}% of weeks`);
  if (stats.pos1Pct >= 40) strengths.push(`Top-tier finish rate of ${stats.pos1Pct.toFixed(0)}% creates ceiling upside`);
  if (stats.bustPct < 20) strengths.push('Reliable weekly floor with minimal bust risk');
  if (cvRatio < 0.5) strengths.push('Consistent scoring with low week-to-week variance');
  if (cp && cp.durabilityPct >= 85) strengths.push(`Strong availability, appearing in ${cp.durabilityPct.toFixed(0)}% of possible games`);
  if (ppgDelta > 8) strengths.push('Trending upward heading into the offseason');
  if (pos === 'QB' && stats.ppg >= 22) strengths.push('Dual-threat ability protects scoring floor each week');
  if (pos === 'RB') {
    const rec = player.careerSeasonStats?.[0]?.receptions ?? 0;
    if (rec >= 50) strengths.push('Receiving role adds PPR value on top of rushing work');
  }
  if (strengths.length < 3) strengths.push(`Established ${pos} role with meaningful snap share`);

  if (cvRatio >= 0.7) risks.push('High week-to-week variance makes lineup decisions difficult');
  if (stats.bustPct >= 30) risks.push(`Bust rate of ${stats.bustPct.toFixed(0)}% is a real concern for floor-sensitive formats`);
  if (ppgDelta < -12) risks.push('Late-season scoring decline raises questions about role consistency');
  if (stats.pos1Pct < 25) risks.push('Limited ceiling weeks reduce upside in tournaments and daily formats');
  if (cp && cp.durabilityPct < 80) risks.push(`Availability concerns, playing just ${cp.durabilityPct.toFixed(0)}% of games in career`);
  if (pos === 'WR' || pos === 'TE') risks.push('Production tied to target volume and quarterback efficiency');
  if (risks.length < 3) risks.push('Scheme or usage changes could shift value meaningfully');

  return { strengths: strengths.slice(0, 5), risks: risks.slice(0, 5) };
}

function generateGameLogSummary(player: PlayerWithSeasons, entries: GameLogEntry[], stats: ReturnType<typeof computeGameLogStats>, format: ScoringFormat): string[] {
  if (!stats || stats.gamesPlayed === 0) return [];
  const pos = player.position || '';
  const name = player.name || 'This player';
  const season = player.season || 2025;
  const ppg = stats.ppg.toFixed(1);
  const gp = stats.gamesPlayed;
  const topRate = stats.pos1Pct + stats.pos2Pct;
  const cvRatio = stats.ppg > 0 ? stats.volatility / stats.ppg : 2;
  const volWord = cvRatio < 0.4 ? 'stable' : cvRatio < 0.65 ? 'moderately consistent' : 'volatile';
  const played = entries.filter(e => hasParticipation(e.stats, pos));
  const best = played.length > 0 ? played.reduce((b, e) => fpts(e, format) > fpts(b, format) ? e : b, played[0]) : null;
  const worst = played.length > 0 ? played.reduce((w, e) => fpts(e, format) < fpts(w, format) ? e : w, played[0]) : null;

  const tierLabel = ((): string => {
    const benchmarks: Record<string, number[]> = { QB: [22, 17], RB: [14, 10], WR: [13, 9], TE: [11, 7] };
    const [elite, avg] = benchmarks[pos] || [13, 9];
    if (stats.ppg >= elite) return 'elite-level';
    if (stats.ppg >= avg && topRate >= 55) return 'reliable starter-level';
    if (stats.ppg >= avg) return 'solid';
    return 'situational';
  })();

  const roleWord = topRate >= 60 ? 'a reliable weekly starter' : topRate >= 40 ? 'a flex-range option' : 'a streaming-grade player';

  const p1Parts: string[] = [];
  p1Parts.push(`${name}'s ${season} game log shows the profile of ${roleWord} at the ${pos} position`);
  p1Parts.push(`averaging ${ppg} fantasy points per game across ${gp} appearances`);
  p1Parts.push(`with ${tierLabel} weekly output`);
  const pos1Label = pos === 'QB' ? 'QB1' : pos === 'RB' ? 'RB1' : pos === 'WR' ? 'WR1' : pos === 'TE' ? 'TE1' : 'top-tier';
  p1Parts.push(`and ${pos1Label} finishes in ${stats.pos1Pct.toFixed(0)}% of weeks`);
  const p1 = p1Parts.join(', ') + '.';

  let p2 = '';
  if (best && worst) {
    const bestPts = fpts(best, format).toFixed(1);
    const worstPts = fpts(worst, format).toFixed(1);
    const range = (parseFloat(bestPts) - parseFloat(worstPts)).toFixed(1);
    const bustNote = stats.bustPct < 15
      ? `Even in quieter weeks, production rarely fell into a true bust range, with a bust rate of just ${stats.bustPct.toFixed(0)}%.`
      : stats.bustPct >= 35
      ? `The bust rate of ${stats.bustPct.toFixed(0)}% is a meaningful risk signal that managers should account for when setting lineups.`
      : `The bust rate of ${stats.bustPct.toFixed(0)}% reflects some week-to-week risk that managers must weigh in close start-sit decisions.`;
    p2 = `The peak game was ${bestPts} points in Week ${best.week}${best.opp ? ` against ${best.opp}` : ''}, while the floor came in at ${worstPts} points in Week ${worst.week}${worst.opp ? ` against ${worst.opp}` : ''}. That ${range}-point range between the best and worst active games reflects a ${volWord} weekly scoring profile. ${bustNote}`;
  }

  let p3 = '';
  const ppgDelta = stats.ppg > 0 ? ((stats.last4Ppg - stats.ppg) / stats.ppg) * 100 : 0;
  if (Math.abs(ppgDelta) > 8 && played.length >= 6) {
    const trendDir = ppgDelta > 0 ? 'upward' : 'downward';
    const trendMag = Math.abs(ppgDelta) > 20 ? 'sharply' : 'moderately';
    const last4Pts = stats.last4Ppg.toFixed(1);
    if (ppgDelta > 0) {
      p3 = `The game log also reveals a positive late-season trend, with scoring moving ${trendMag} ${trendDir} over the final four games to ${last4Pts} PPG. That closing momentum is an important signal for dynasty and keeper managers evaluating forward value heading into the offseason.`;
    } else {
      p3 = `The game log also shows some late-season cooling, with production slipping ${trendMag} ${trendDir} over the final four games to ${last4Pts} PPG versus the ${stats.ppg.toFixed(1)} season average. Whether that reflects a true role shift or game-script variance is worth tracking heading into 2026.`;
    }
  }

  return [p1, p2, p3].filter(Boolean);
}

function generatePerformancePatternInsights(player: PlayerWithSeasons, entries: GameLogEntry[], stats: ReturnType<typeof computeGameLogStats>, format: ScoringFormat): { icon: 'up' | 'down' | 'neutral'; text: string }[] {
  if (!stats || stats.gamesPlayed === 0) return [];
  const pos = player.position || '';
  const name = player.name || 'This player';
  const played = entries.filter(e => hasParticipation(e.stats, pos));
  const insights: { icon: 'up' | 'down' | 'neutral'; text: string }[] = [];

  const pos1Label = pos === 'QB' ? 'QB1' : pos === 'RB' ? 'RB24' : pos === 'WR' ? 'WR2' : pos === 'TE' ? 'TE1' : 'top-tier';
  const topRate = stats.pos1Pct + stats.pos2Pct;
  const cvRatio = stats.ppg > 0 ? stats.volatility / stats.ppg : 2;
  const ppgDelta = stats.ppg > 0 ? ((stats.last4Ppg - stats.ppg) / stats.ppg) * 100 : 0;

  if (stats.pos1Pct >= 50) {
    insights.push({ icon: 'up', text: `${name} produced elite weekly finishes in ${stats.pos1Games} of ${stats.gamesPlayed} games, one of the more consistent ceiling profiles at the ${pos} position.` });
  } else if (stats.pos1Pct >= 30) {
    insights.push({ icon: 'up', text: `${name} landed in the ${pos1Label} finish range ${stats.pos1Games} times this season, providing meaningful upside for managers who started him consistently.` });
  }

  if (stats.bustPct < 15) {
    insights.push({ icon: 'up', text: `Only ${stats.bustGames} bust-level week${stats.bustGames === 1 ? '' : 's'} this season, indicating a strong weekly floor that makes roster decisions easier.` });
  } else if (stats.bustPct >= 35) {
    insights.push({ icon: 'down', text: `Bust-level outputs in ${stats.bustGames} of ${stats.gamesPlayed} games highlight real floor risk, especially in head-to-head matchup formats.` });
  }

  if (cvRatio < 0.4) {
    insights.push({ icon: 'up', text: `Scoring was remarkably consistent week to week, with low variance suggesting a role that held steady regardless of opponent or game script.` });
  } else if (cvRatio >= 0.7) {
    insights.push({ icon: 'down', text: `High week-to-week variance makes the weekly ceiling hard to predict and leans the profile toward boom-or-bust territory.` });
  }

  if (ppgDelta > 12 && played.length >= 6) {
    insights.push({ icon: 'up', text: `A notable late-season scoring surge, with the last four games averaging ${stats.last4Ppg.toFixed(1)} PPG versus the ${stats.ppg.toFixed(1)} season mark, suggests an expanding role heading into 2026.` });
  } else if (ppgDelta < -15 && played.length >= 6) {
    insights.push({ icon: 'down', text: `Production declined in the back half of the season, with the last four games averaging ${stats.last4Ppg.toFixed(1)} PPG against the ${stats.ppg.toFixed(1)} full-season average. Worth monitoring for offseason role clarity.` });
  } else if (ppgDelta >= 0 && played.length >= 6) {
    insights.push({ icon: 'neutral', text: `Scoring held relatively steady through the final stretch of the season, with the last four games averaging ${stats.last4Ppg.toFixed(1)} PPG close to the ${stats.ppg.toFixed(1)} full-season average.` });
  }

  if (topRate >= 70) {
    insights.push({ icon: 'up', text: `Startable-range finishes (${pos1Label} or better) in ${topRate.toFixed(0)}% of weeks make this one of the more reliable floor profiles at the position.` });
  }

  if (played.length > 0) {
    const topHalf = [...played].sort((a, b) => fpts(b, format) - fpts(a, format)).slice(0, Math.ceil(played.length / 2));
    const topHalfPpg = topHalf.reduce((s, e) => s + fpts(e, format), 0) / topHalf.length;
    if (topHalfPpg > stats.ppg * 1.5) {
      insights.push({ icon: 'neutral', text: `When scoring is above median, the ceiling jumps significantly (${topHalfPpg.toFixed(1)} PPG in the top half of games), which gives this profile strong tournament upside.` });
    }
  }

  return insights.slice(0, 5);
}

function generateUsageSummary(player: PlayerWithSeasons, deltaRows: { label: string; key: string; delta: number; seasonAvg: number; recentAvg: number; pct?: boolean }[], momentumScore: number): string[] {
  if (deltaRows.length === 0) return [];
  const name = player.name || 'This player';
  const pos = player.position || '';
  const season = player.season || 2025;
  const momentumWord = momentumScore >= 70 ? 'expanded meaningfully' : momentumScore >= 55 ? 'held steady' : momentumScore <= 35 ? 'contracted' : 'remained relatively stable';
  const topDelta = deltaRows.reduce((best, d) => Math.abs(d.delta) > Math.abs(best.delta) ? d : best, deltaRows[0]);
  const topDir = topDelta.delta > 0 ? 'increased' : 'decreased';
  const topLabel = topDelta.label.replace(/ \(Team\)/, '').replace(/\/G/, ' per game').toLowerCase();
  const topMag = topDelta.pct ? `${Math.abs(topDelta.delta).toFixed(1)} percentage points` : `${Math.abs(topDelta.delta).toFixed(1)} per game`;
  const roleWord = momentumScore >= 60 ? 'a strengthening offensive role' : momentumScore <= 39 ? 'a narrowing role' : 'a stable role in the offense';

  const p1 = `${name}'s usage profile in ${season} has ${momentumWord} over the last four weeks, pointing to ${roleWord}. The biggest shift in the recent window is ${topLabel}, which has ${topDir} by ${topMag} compared to the season baseline. For ${pos} fantasy managers, these near-term volume signals are among the most actionable leading indicators heading into lineup decisions.`;

  const risingRows = deltaRows.filter(d => d.delta > 0);
  const fallingRows = deltaRows.filter(d => d.delta < 0);
  let p2 = '';
  if (risingRows.length > 0 && fallingRows.length > 0) {
    const rising = risingRows.map(d => d.label.replace(/ \(Team\)/, '')).slice(0, 2).join(' and ');
    const falling = fallingRows.map(d => d.label.replace(/ \(Team\)/, '')).slice(0, 2).join(' and ');
    p2 = `The recent snapshot shows a mixed signal, with ${rising} trending upward while ${falling} has pulled back versus the full-season average. This kind of divergence often reflects a short-term game-script shift rather than a fundamental role change, but tracking how these metrics settle over the next few games is important before making roster or trade decisions.`;
  } else if (risingRows.length >= 3) {
    const rising = risingRows.map(d => d.label.replace(/ \(Team\)/, '')).slice(0, 3).join(', ');
    p2 = `Multiple usage categories are moving in a positive direction recently, with ${rising} all trending upward. Broad-based expansion across volume metrics is one of the stronger short-term signals of growing fantasy upside and suggests the offensive role may be deepening.`;
  } else if (fallingRows.length >= 3) {
    const falling = fallingRows.map(d => d.label.replace(/ \(Team\)/, '')).slice(0, 3).join(', ');
    p2 = `Several categories have pulled back in the recent window, with ${falling} all contracting versus the season average. When multiple usage metrics decline together, it can foreshadow lower fantasy ceilings in the near term and is worth flagging before start-sit or trade decisions.`;
  } else if (risingRows.length > 0) {
    const rising = risingRows.map(d => d.label.replace(/ \(Team\)/, '')).join(' and ');
    p2 = `${rising} has been trending upward in the recent window, providing a modest positive signal for near-term role direction. The other usage metrics remain close to season averages, suggesting the role is holding steady overall.`;
  } else if (fallingRows.length > 0) {
    const falling = fallingRows.map(d => d.label.replace(/ \(Team\)/, '')).join(' and ');
    p2 = `${falling} has ticked back slightly in recent weeks. The rest of the usage profile stays near season averages, so this does not yet signal a major role change, but it is worth monitoring as the weeks ahead unfold.`;
  }

  const p3 = momentumScore >= 60
    ? `Overall, the role trend is a positive signal for ${name}'s near-term fantasy value. Expanding usage at this stage of the season typically sustains or increases in the short term, making this player a higher-confidence option than the season average alone might suggest.`
    : momentumScore <= 39
    ? `Overall, the contracting usage trend introduces some caution around ${name}'s near-term fantasy value. Declining volume signals at the positional level are among the most reliable predictors of scoring declines, so managing expectations until the role stabilizes is prudent.`
    : `Overall, the usage trend paints a picture of a stable role that is holding near its season-long baseline. That consistency is a positive signal for floor management, even if it does not add meaningful upside to the weekly ceiling.`;

  return [p1, p2, p3].filter(Boolean);
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
  const keyStats = getKeyStatSummary(entries, player.position);
  const activeEntries = entries.filter(e => hasParticipation(e.stats, player.position));
  const weeklyPts = activeEntries.map(e => fpts(e, format));
  const outlook = getStructuredOutlook(player, stats, format);
  const hasData = stats && stats.gamesPlayed > 0;

  const seasonPpg = stats?.ppg ?? 0;
  const last4Ppg = stats?.last4Ppg ?? 0;

  const cp = player.careerProfile || null;

  const thresholds = getTierThresholds(player.position);
  const posLabel = player.position || '';

  const posAvgPpg = (() => {
    const benchmarks: Record<string, number> = { QB: 16.5, RB: 11.5, WR: 10.5, TE: 8.0 };
    return benchmarks[player.position || ''] ?? 10;
  })();
  const ppgDelta = seasonPpg - posAvgPpg;

  const outlookParas = generateFantasyOutlookSummary(player, stats, format);
  const atAGlance = generateAtAGlance(player, stats, format);
  const { strengths, risks } = generateStrengthsAndRisks(player, stats);

  return (
    <div className="sc-overview" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {outlookParas.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }}>
          <SectionHeader title="Fantasy Outlook Summary" />
          {outlookParas.map((p, i) => (
            <p key={i} style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--sc-text-muted, #94a3b8)', marginBottom: i < outlookParas.length - 1 ? '12px' : 0 }}>{p}</p>
          ))}
        </div>
      )}

      {atAGlance.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }}>
          <SectionHeader title="At a Glance" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {atAGlance.map((card) => (
              <div key={card.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{card.label}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasData ? (() => {
        const volLabel = stats.volatility < 6 ? 'Stable' : stats.volatility < 9 ? 'Moderate' : 'Volatile';
        const volColor = stats.volatility < 6
          ? 'text-green-600 dark:text-green-400'
          : stats.volatility < 9
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-red-500 dark:text-red-400';

        const cvRatio = seasonPpg > 0 ? stats.volatility / seasonPpg : 2;
        const consistencyScore = Math.round(100 / (1 + Math.pow(cvRatio / 0.6, 2)));
        const conLabel = consistencyScore >= 70 ? 'Very Reliable' : consistencyScore >= 45 ? 'Average' : 'Boom or Bust';
        const conColor = consistencyScore >= 70
          ? 'text-green-600 dark:text-green-400'
          : consistencyScore >= 45
          ? 'text-foreground'
          : 'text-red-500 dark:text-red-400';

        const roleGrade = (() => {
          const topRate = stats.pos1Pct + stats.pos2Pct;
          if (topRate >= 60) return { label: 'Starter', color: 'bg-green-500/15 text-green-700 dark:text-green-400' };
          if (topRate >= 35) return { label: 'Flex', color: 'bg-teal-500/15 text-teal-700 dark:text-teal-400' };
          return { label: 'Depth', color: 'bg-slate-500/15 text-slate-600 dark:text-slate-400' };
        })();

        return (
        <>
          <div data-testid="overview-stat-boxes" className="sc-overview__section" style={{ padding: '20px' }}>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {player.seasonLabel && (
                <p className="sc-overview__section-title" data-testid="text-season-label">
                  {player.seasonLabel}
                </p>
              )}
              <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 ${roleGrade.color}`} data-testid="badge-role-grade">
                Role: {roleGrade.label} {posLabel}
              </Badge>
            </div>

            <SectionHeader title="2025 Fantasy Performance" subtitle="Season scoring output and positional finish rates" />

            <div className={`grid gap-3 ${thresholds.hasTier3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
              <div className="sc-overview__stat-cell">
                <p className="sc-overview__stat-label">PPG</p>
                <p className="sc-overview__stat-number" data-testid="text-ppg-hero">{seasonPpg.toFixed(1)}</p>
                <p className="sc-overview__stat-meta">
                  {player.seasonRank ? `${stats.gamesPlayed} GP \u00B7 ${posLabel}${player.seasonRank}` : `${stats.gamesPlayed} GP`}
                </p>
                <div className={`sc-overview__ppg-delta ${ppgDelta >= 0 ? 'sc-overview__ppg-delta--up' : 'sc-overview__ppg-delta--down'}`} data-testid="text-ppg-delta">
                  {ppgDelta >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {ppgDelta >= 0 ? '+' : ''}{ppgDelta.toFixed(1)} vs Pos Avg
                </div>
              </div>

              <div className="sc-overview__stat-cell">
                <p className="sc-overview__stat-label">{getTierLabel(player.position, 1)} Rate</p>
                <p className="sc-overview__stat-number" style={{ color: '#16a34a' }} data-testid="text-pos1-pct">{stats.pos1Pct.toFixed(0)}%</p>
                <p className="sc-overview__stat-meta">{getTierLabel(player.position, 1)} Weeks ({posLabel}1{'\u2013'}{posLabel}12)</p>
              </div>

              <div className="sc-overview__stat-cell">
                <p className="sc-overview__stat-label">{getTierLabel(player.position, 2)} Rate</p>
                <p className="sc-overview__stat-number" style={{ color: '#0d9488', fontSize: '18px' }} data-testid="text-pos2-pct">{stats.pos2Pct.toFixed(0)}%</p>
                <p className="sc-overview__stat-meta">{getTierLabel(player.position, 2)} Weeks ({posLabel}13{'\u2013'}{posLabel}{thresholds.hasTier3 ? 24 : thresholds.bust})</p>
              </div>

              {thresholds.hasTier3 && (
                <div className="sc-overview__stat-cell">
                  <p className="sc-overview__stat-label">{getTierLabel(player.position, 3)} Rate</p>
                  <p className="sc-overview__stat-number" style={{ color: '#64748b', fontSize: '18px' }} data-testid="text-pos3-pct">{stats.pos3Pct.toFixed(0)}%</p>
                  <p className="sc-overview__stat-meta">{getTierLabel(player.position, 3)} Weeks ({posLabel}25{'\u2013'}{posLabel}{thresholds.bust})</p>
                </div>
              )}
            </div>

            <div data-testid="tier-distribution-bar" style={{ marginTop: '14px' }}>
              {(() => {
                const total = stats.pos1Pct + stats.pos2Pct + (thresholds.hasTier3 ? stats.pos3Pct : 0) + stats.bustPct;
                const norm = total > 0 ? 100 / total : 1;
                const p1w = stats.pos1Pct * norm;
                const p2w = stats.pos2Pct * norm;
                const p3w = thresholds.hasTier3 ? stats.pos3Pct * norm : 0;
                const bw = stats.bustPct * norm;
                return (
                  <>
                    <div className="sc-overview__tier-bar">
                      {p1w > 0 && <div className="sc-overview__tier-bar-seg" style={{ flex: p1w, background: '#22c55e' }} title={`${getTierLabel(player.position, 1)}: ${stats.pos1Pct.toFixed(0)}%`} />}
                      {p2w > 0 && <div className="sc-overview__tier-bar-seg" style={{ flex: p2w, background: '#2dd4bf' }} title={`${getTierLabel(player.position, 2)}: ${stats.pos2Pct.toFixed(0)}%`} />}
                      {p3w > 0 && <div className="sc-overview__tier-bar-seg" style={{ flex: p3w, background: '#94a3b8' }} title={`${getTierLabel(player.position, 3)}: ${stats.pos3Pct.toFixed(0)}%`} />}
                      {bw > 0 && <div className="sc-overview__tier-bar-seg" style={{ flex: bw, background: '#f87171' }} title={`Bust: ${stats.bustPct.toFixed(0)}%`} />}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#22c55e' }} /><span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{getTierLabel(player.position, 1)} {stats.pos1Pct.toFixed(0)}%</span></span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#2dd4bf' }} /><span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{getTierLabel(player.position, 2)} {stats.pos2Pct.toFixed(0)}%</span></span>
                      {thresholds.hasTier3 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#94a3b8' }} /><span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{getTierLabel(player.position, 3)} {stats.pos3Pct.toFixed(0)}%</span></span>}
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: '#f87171' }} /><span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>Bust {stats.bustPct.toFixed(0)}%</span></span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="sc-overview__section" style={{ padding: '20px' }}>
            <SectionHeader title="Weekly Fantasy Risk Assessment" subtitle="Downside exposure and weekly floor indicators" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="sc-overview__risk-cell sc-overview__risk-cell--bust" data-tooltip="Percentage of games finishing outside startable range" data-testid="risk-cell-bust">
                <p className="sc-overview__stat-label">Bust %</p>
                <p className="sc-overview__stat-number" style={{ color: '#ef4444' }} data-testid="text-bust-pct-risk">{stats.bustPct.toFixed(0)}%</p>
                <p className="sc-overview__stat-meta">Bust Weeks ({posLabel}{thresholds.bust + 1}+)</p>
              </div>
              <div className="sc-overview__risk-cell sc-overview__risk-cell--volatility" data-tooltip="Weekly scoring deviation relative to positional mean" data-testid="risk-cell-volatility">
                <p className="sc-overview__stat-label">Volatility</p>
                <p className={`sc-overview__stat-number ${volColor}`}>{stats.volatility.toFixed(1)}</p>
                <p className="sc-overview__stat-meta">{volLabel}</p>
              </div>
              <div className="sc-overview__risk-cell sc-overview__risk-cell--reliability" data-tooltip="Consistency score based on coefficient of variation (0-100)" data-testid="risk-cell-reliability">
                <p className="sc-overview__stat-label">Reliability</p>
                <p className={`sc-overview__stat-number ${conColor}`}>{consistencyScore}</p>
                <p className="sc-overview__stat-meta">{conLabel}</p>
              </div>
              <div className="sc-overview__risk-cell sc-overview__risk-cell--goose" data-tooltip="Percentage of games with zero fantasy points scored" data-testid="risk-cell-goose">
                <p className="sc-overview__stat-label">Goose Egg</p>
                <p className="sc-overview__stat-number" style={{ color: stats.gooseEggPct > 0 ? '#ef4444' : '#16a34a' }} data-testid="text-goose-egg">{stats.gooseEggPct.toFixed(0)}%</p>
                <p className="sc-overview__stat-meta">0-Point Games</p>
              </div>
            </div>
          </div>

          {weeklyPts.length > 1 && (() => {
            const rollingPts = computeRollingAvg(weeklyPts);
            const bestIdx = weeklyPts.indexOf(Math.max(...weeklyPts));
            const bestVal = weeklyPts[bestIdx];
            const bestEntry = activeEntries[bestIdx];
            const seasonAvg = weeklyPts.reduce((a, b) => a + b, 0) / weeklyPts.length;
            const last3Avg = weeklyPts.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, weeklyPts.length);
            const last3Pct = seasonAvg > 0 ? ((last3Avg - seasonAvg) / seasonAvg) * 100 : 0;

            const secondaryMetric = player.position === 'QB' ? { label: 'Rush Attempts', unit: 'att' } :
              player.position === 'RB' ? { label: 'Touches/Game', unit: 'tch' } :
              (player.position === 'WR' || player.position === 'TE') ? { label: 'Targets/Game', unit: 'tgt' } : null;
            const secondaryData = player.position === 'QB'
              ? activeEntries.map(e => (e.stats as unknown as Record<string, number>).rush_att ?? 0)
              : player.position === 'RB'
              ? activeEntries.map(e => ((e.stats as unknown as Record<string, number>).rush_att ?? 0) + ((e.stats as unknown as Record<string, number>).rec_tgt ?? 0))
              : (player.position === 'WR' || player.position === 'TE')
              ? activeEntries.map(e => (e.stats as unknown as Record<string, number>).rec_tgt ?? 0)
              : null;
            const secondaryRolling = secondaryData ? computeRollingAvg(secondaryData) : null;
            const sec3Avg = secondaryData && secondaryData.length >= 3
              ? secondaryData.slice(-3).reduce((a, b) => a + b, 0) / 3
              : null;
            const secSeasonAvg = secondaryData && secondaryData.length > 0
              ? secondaryData.reduce((a, b) => a + b, 0) / secondaryData.length
              : null;
            const sec3Pct = sec3Avg != null && secSeasonAvg && secSeasonAvg > 0
              ? ((sec3Avg - secSeasonAvg) / secSeasonAvg) * 100
              : null;

            const buildPointsInsight = () => {
              if (Math.abs(last3Pct) < 5) return `Averaging ${last3Avg.toFixed(1)} PPG over last 3 \u2014 in line with season baseline.`;
              const dir = last3Pct > 0 ? 'up' : 'down';
              return `Recent output ${dir} ${Math.abs(last3Pct).toFixed(0)}% vs season \u2014 ${last3Avg.toFixed(1)} PPG over last 3 weeks.`;
            };

            const buildUsageInsight = () => {
              if (sec3Avg == null || secSeasonAvg == null || sec3Pct == null) return '';
              if (Math.abs(sec3Pct) < 5) return `${secondaryMetric!.label} holding steady at ${sec3Avg.toFixed(1)}/gm vs ${secSeasonAvg.toFixed(1)} season avg.`;
              const dir = sec3Pct > 0 ? 'up' : 'down';
              return `${secondaryMetric!.label} ${dir} ${Math.abs(sec3Pct).toFixed(0)}% \u2014 ${sec3Avg.toFixed(1)}/gm vs ${secSeasonAvg.toFixed(1)} season avg.`;
            };

            const buildDiagnosticInsight = () => {
              if (sec3Pct == null || (Math.abs(last3Pct) < 5 && Math.abs(sec3Pct) < 5)) return '';
              if (Math.abs(sec3Pct) > Math.abs(last3Pct) * 1.5)
                return `Usage-driven ${last3Pct < 0 ? 'decline' : 'shift'} \u2014 opportunity ${sec3Pct > 0 ? 'up' : 'down'} ${Math.abs(sec3Pct).toFixed(0)}% vs season.`;
              if (Math.abs(last3Pct) > Math.abs(sec3Pct) * 1.5)
                return `Efficiency-driven ${last3Pct < 0 ? 'decline' : 'surge'} \u2014 usage stable, production ${last3Pct > 0 ? 'up' : 'down'} ${Math.abs(last3Pct).toFixed(0)}%.`;
              return `Production and usage trending ${last3Pct > 0 ? 'up' : 'down'} together \u2014 ${Math.abs(last3Pct).toFixed(0)}% shift across both.`;
            };

            const trendSignalWords = (() => {
              const words: { text: string; color: string }[] = [];
              if (Math.abs(last3Pct) < 5) words.push({ text: 'Production Stable', color: '' });
              else if (last3Pct > 0) words.push({ text: 'Production Rising', color: 'sc-overview__trend-signal-word--green' });
              else words.push({ text: 'Production Declining', color: 'sc-overview__trend-signal-word--red' });

              if (sec3Pct != null) {
                if (Math.abs(sec3Pct) < 5) words.push({ text: 'Usage Stable', color: '' });
                else if (sec3Pct > 0) words.push({ text: 'Usage Rising', color: 'sc-overview__trend-signal-word--green' });
                else words.push({ text: 'Usage Declining', color: 'sc-overview__trend-signal-word--red' });
              }
              return words;
            })();

            return (
              <div className="sc-overview__trend-card" data-testid="section-trend-diagnostics">
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <SectionHeader title="Recent Fantasy Trend Diagnostics" subtitle="Weekly production arc and rolling efficiency signals" />
                  <MomentumBadge data={weeklyPts} unit="PPG" />
                </div>

                <div className="sc-overview__trend-signal" data-testid="trend-signal-summary">
                  <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>Trend Signal:</span>
                  {trendSignalWords.map((w, i) => (
                    <span key={i}>
                      <span className={w.color} style={{ fontWeight: 700 }}>{w.text}</span>
                      {i < trendSignalWords.length - 1 && <span style={{ color: '#cbd5e1', margin: '0 2px' }}>|</span>}
                    </span>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '-0.01em' }}>Points Trend</p>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>(3-Week Rolling Average vs Weekly)</span>
                  </div>
                  <LineChartSVG
                    data={weeklyPts}
                    rollingAvg={rollingPts}
                    bestIdx={bestIdx}
                    height={170}
                    label="fpts"
                    accentColor="#0b3a7a"
                    showAvgLine
                    highlightLast={3}
                    showRecentFormLabel
                    showGridLines
                  />
                  <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px' }} data-testid="text-points-insight">
                    {buildPointsInsight()}
                  </p>
                </div>

                {secondaryData && secondaryData.length > 1 && secondaryMetric && (
                  <>
                    <div style={{ margin: '16px 0', borderTop: '1px solid rgba(15,23,42,0.06)' }} />
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '-0.01em' }}>Usage Trend</p>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{secondaryMetric.label} (3-Week Avg vs Weekly)</span>
                      </div>
                      <LineChartSVG
                        data={secondaryData}
                        rollingAvg={secondaryRolling || undefined}
                        height={110}
                        label="secondary"
                        accentColor="hsl(var(--chart-2))"
                        showAvgLine
                        highlightLast={3}
                        showRecentFormLabel
                        showGridLines
                      />
                      <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px' }} data-testid="text-usage-insight">
                        {buildUsageInsight()}
                      </p>
                      {(() => {
                        const diag = buildDiagnosticInsight();
                        return diag ? (
                          <p style={{ fontSize: '10px', color: '#475569', fontWeight: 600, marginTop: '4px' }} data-testid="text-diagnostic-insight">
                            {diag}
                          </p>
                        ) : null;
                      })()}
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          {activeEntries.length >= 3 && (() => {
            const pos = player.position;
            const getStat = (e: GameLogEntry, key: string) => (e.stats as unknown as Record<string, number>)[key] ?? 0;
            const last3 = activeEntries.slice(-3);
            const gp = activeEntries.length;
            const roleSznAvg = weeklyPts.reduce((a, b) => a + b, 0) / weeklyPts.length;
            const roleLast3Avg = weeklyPts.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, weeklyPts.length);
            const rolePpgPct = roleSznAvg > 0 ? ((roleLast3Avg - roleSznAvg) / roleSznAvg) * 100 : 0;

            type RoleCard = { label: string; season: number; recent: number; pct: number; fmt: (v: number) => string; group: 'usage' | 'efficiency' | 'context'; primary?: boolean };
            const cards: RoleCard[] = [];
            let signalTitle = '';
            let signalDetail = '';

            const buildCard = (label: string, seasonSum: number, recentSum: number, perGame: boolean, group: 'usage' | 'efficiency' | 'context', fmt?: (v: number) => string, primary?: boolean): RoleCard => {
              const sVal = perGame ? seasonSum / gp : seasonSum;
              const rVal = perGame ? recentSum / 3 : recentSum;
              const pct = sVal > 0 ? ((rVal - sVal) / sVal) * 100 : 0;
              return { label, season: sVal, recent: rVal, pct, fmt: fmt || (v => v.toFixed(1)), group, primary };
            };

            if (pos === 'WR' || pos === 'TE') {
              const sTgt = activeEntries.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
              const rTgt = last3.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
              const sYd = activeEntries.reduce((s, e) => s + getStat(e, 'rec_yd'), 0);
              const rYd = last3.reduce((s, e) => s + getStat(e, 'rec_yd'), 0);
              const sRec = activeEntries.reduce((s, e) => s + getStat(e, 'rec'), 0);
              const rRec = last3.reduce((s, e) => s + getStat(e, 'rec'), 0);
              const sTd = activeEntries.reduce((s, e) => s + getStat(e, 'rec_td'), 0);
              const rTd = last3.reduce((s, e) => s + getStat(e, 'rec_td'), 0);

              cards.push(buildCard('Targets/G', sTgt, rTgt, true, 'usage', undefined, true));
              cards.push(buildCard('Yards/G', sYd, rYd, true, 'usage', undefined, true));
              const sCatch = sTgt > 0 ? (sRec / sTgt) * 100 : 0;
              const rCatch = rTgt > 0 ? (rRec / rTgt) * 100 : 0;
              const catchPct = sCatch > 0 ? ((rCatch - sCatch) / sCatch) * 100 : 0;
              cards.push({ label: 'Catch %', season: sCatch, recent: rCatch, pct: catchPct, fmt: v => `${v.toFixed(0)}%`, group: 'efficiency' });
              const sYpt = sTgt > 0 ? sYd / sTgt : 0;
              const rYpt = rTgt > 0 ? rYd / rTgt : 0;
              const yptPct = sYpt > 0 ? ((rYpt - sYpt) / sYpt) * 100 : 0;
              cards.push({ label: 'Yds/Target', season: sYpt, recent: rYpt, pct: yptPct, fmt: v => v.toFixed(1), group: 'efficiency' });
              cards.push(buildCard('TDs/Game', sTd, rTd, true, 'efficiency', v => v.toFixed(2)));
              cards.push({ label: `${getTierLabel(player.position, 1)} %`, season: stats.pos1Pct, recent: stats.pos1Pct, pct: 0, fmt: v => `${v.toFixed(0)}%`, group: 'context' });

              const tgtPct = cards[0].pct;
              if (rolePpgPct < -5) {
                if (tgtPct < -15) { signalTitle = 'Usage-Driven Decline'; signalDetail = `Target volume down ${Math.abs(tgtPct).toFixed(0)}% vs season.`; }
                else if (Math.abs(tgtPct) <= 10) { signalTitle = 'Efficiency-Driven Decline'; signalDetail = 'Targets stable, production falling.'; }
                else if (tgtPct > 10) { signalTitle = 'Low Conversion'; signalDetail = `Targets up ${tgtPct.toFixed(0)}% but output declining.`; }
              } else if (rolePpgPct > 5) {
                if (tgtPct > 10) { signalTitle = 'Rising Usage'; signalDetail = `Target volume up ${tgtPct.toFixed(0)}%, fueling production.`; }
                else { signalTitle = 'Efficiency Surge'; signalDetail = 'Doing more with similar opportunity share.'; }
              }

            } else if (pos === 'RB') {
              const sCarr = activeEntries.reduce((s, e) => s + getStat(e, 'rush_att'), 0);
              const rCarr = last3.reduce((s, e) => s + getStat(e, 'rush_att'), 0);
              const sRYd = activeEntries.reduce((s, e) => s + getStat(e, 'rush_yd'), 0);
              const rRYd = last3.reduce((s, e) => s + getStat(e, 'rush_yd'), 0);
              const sTgt = activeEntries.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
              const rTgt = last3.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
              const sTd = activeEntries.reduce((s, e) => s + getStat(e, 'rush_td'), 0) + activeEntries.reduce((s, e) => s + getStat(e, 'rec_td'), 0);
              const rTd = last3.reduce((s, e) => s + getStat(e, 'rush_td'), 0) + last3.reduce((s, e) => s + getStat(e, 'rec_td'), 0);

              cards.push(buildCard('Carries/G', sCarr, rCarr, true, 'usage', undefined, true));
              cards.push(buildCard('Rush Yds/G', sRYd, rRYd, true, 'usage', undefined, true));
              const sYpc = sCarr > 0 ? sRYd / sCarr : 0;
              const rYpc = rCarr > 0 ? rRYd / rCarr : 0;
              const ypcPct = sYpc > 0 ? ((rYpc - sYpc) / sYpc) * 100 : 0;
              cards.push({ label: 'YPC', season: sYpc, recent: rYpc, pct: ypcPct, fmt: v => v.toFixed(1), group: 'efficiency' });
              cards.push(buildCard('Targets/G', sTgt, rTgt, true, 'efficiency'));
              cards.push(buildCard('TDs/Game', sTd, rTd, true, 'efficiency', v => v.toFixed(2)));
              cards.push({ label: `${getTierLabel(player.position, 1)} %`, season: stats.pos1Pct, recent: stats.pos1Pct, pct: 0, fmt: v => `${v.toFixed(0)}%`, group: 'context' });

              const carrPct = cards[0].pct;
              if (rolePpgPct < -5) {
                if (carrPct < -15) { signalTitle = 'Usage-Driven Decline'; signalDetail = `Carry volume down ${Math.abs(carrPct).toFixed(0)}% vs season.`; }
                else if (Math.abs(carrPct) <= 10) { signalTitle = 'Efficiency-Driven Decline'; signalDetail = 'Carries stable, production falling.'; }
                else if (carrPct > 10) { signalTitle = 'Low Conversion'; signalDetail = `Carries up ${carrPct.toFixed(0)}% but output declining.`; }
              } else if (rolePpgPct > 5) {
                if (carrPct > 10) { signalTitle = 'Rising Workload'; signalDetail = `Carry volume up ${carrPct.toFixed(0)}%, fueling production.`; }
                else { signalTitle = 'Efficiency Surge'; signalDetail = 'Doing more with similar volume.'; }
              }

            } else if (pos === 'QB') {
              const sCmp = activeEntries.reduce((s, e) => s + getStat(e, 'pass_cmp'), 0);
              const rCmp = last3.reduce((s, e) => s + getStat(e, 'pass_cmp'), 0);
              const sAtt = activeEntries.reduce((s, e) => s + getStat(e, 'pass_att'), 0);
              const rAtt = last3.reduce((s, e) => s + getStat(e, 'pass_att'), 0);
              const sYd = activeEntries.reduce((s, e) => s + getStat(e, 'pass_yd'), 0);
              const rYd = last3.reduce((s, e) => s + getStat(e, 'pass_yd'), 0);
              const sTd = activeEntries.reduce((s, e) => s + getStat(e, 'pass_td'), 0);
              const rTd = last3.reduce((s, e) => s + getStat(e, 'pass_td'), 0);
              const sInt = activeEntries.reduce((s, e) => s + getStat(e, 'pass_int'), 0);
              const rInt = last3.reduce((s, e) => s + getStat(e, 'pass_int'), 0);
              const sRush = activeEntries.reduce((s, e) => s + getStat(e, 'rush_yd'), 0);
              const rRush = last3.reduce((s, e) => s + getStat(e, 'rush_yd'), 0);

              cards.push(buildCard('Pass Yds/G', sYd, rYd, true, 'usage', undefined, true));
              cards.push(buildCard('TDs/Game', sTd, rTd, true, 'usage', v => v.toFixed(2), true));
              const sPct = sAtt > 0 ? (sCmp / sAtt) * 100 : 0;
              const rPctVal = rAtt > 0 ? (rCmp / rAtt) * 100 : 0;
              const cmpPctDelta = sPct > 0 ? ((rPctVal - sPct) / sPct) * 100 : 0;
              cards.push({ label: 'Cmp %', season: sPct, recent: rPctVal, pct: cmpPctDelta, fmt: v => `${v.toFixed(0)}%`, group: 'efficiency' });
              cards.push(buildCard('INT/G', sInt, rInt, true, 'efficiency'));
              cards.push(buildCard('Rush Yds/G', sRush, rRush, true, 'efficiency'));
              cards.push({ label: `${getTierLabel(player.position, 1)} %`, season: stats.pos1Pct, recent: stats.pos1Pct, pct: 0, fmt: v => `${v.toFixed(0)}%`, group: 'context' });

              if (rolePpgPct < -5) { signalTitle = 'Production Declining'; signalDetail = 'Monitor passing efficiency and turnovers.'; }
              else if (rolePpgPct > 5) { signalTitle = 'Trending Upward'; signalDetail = 'Elevated production vs season baseline.'; }
            }

            if (cards.length === 0) return null;

            const usageCards = cards.filter(c => c.group === 'usage');
            const effCards = cards.filter(c => c.group === 'efficiency');
            const ctxCards = cards.filter(c => c.group === 'context');

            const renderCard = (c: RoleCard) => {
              const Icon = Math.abs(c.pct) < 1 ? null : c.pct > 0 ? ArrowUpRight : ArrowDownRight;
              const trendCol = Math.abs(c.pct) < 1 ? '#94a3b8' : c.pct > 0 ? '#16a34a' : '#ef4444';
              return (
                <div key={c.label} className={`sc-overview__role-card-cell ${c.primary ? 'sc-overview__role-card-cell--primary' : ''}`}>
                  <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '4px' }}>{c.label}</p>
                  <p style={{ fontSize: c.primary ? '16px' : '14px', fontWeight: 800, color: '#0b3a7a', fontFamily: 'ui-monospace, monospace', lineHeight: 1 }}>{c.fmt(c.recent)}</p>
                  <div className="flex items-center justify-center gap-1" style={{ marginTop: '4px' }}>
                    <span style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}>Szn: {c.fmt(c.season)}</span>
                    <span className="inline-flex items-center gap-px" style={{ fontSize: '9px', fontWeight: 700, color: trendCol, fontFamily: 'ui-monospace, monospace' }}>
                      {Icon && <Icon className="w-2.5 h-2.5" />}
                      {Math.abs(c.pct) < 1 ? '0%' : `${c.pct > 0 ? '+' : ''}${c.pct.toFixed(0)}%`}
                    </span>
                  </div>
                </div>
              );
            };

            return (
              <div className="sc-overview__section" data-testid="section-role-snapshot">
                <SectionHeader title="Role and Usage Snapshot" subtitle="Season baseline vs recent usage comparison" />
                  {usageCards.length > 0 && (
                    <>
                      <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '8px' }}>Usage</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3" data-testid="role-snapshot-usage">
                        {usageCards.map(renderCard)}
                      </div>
                    </>
                  )}
                  {effCards.length > 0 && (
                    <>
                      <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '8px' }}>Efficiency</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3" data-testid="role-snapshot-efficiency">
                        {effCards.map(renderCard)}
                      </div>
                    </>
                  )}
                  {ctxCards.length > 0 && (
                    <>
                      <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '8px' }}>Context</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2" data-testid="role-snapshot-context">
                        {ctxCards.map(renderCard)}
                      </div>
                    </>
                  )}
                  {signalTitle && (
                    <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(15,23,42,0.06)' }} data-testid="text-role-signal">
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>Signal: {signalTitle}</p>
                      <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{signalDetail}</p>
                    </div>
                  )}
              </div>
            );
          })()}

          {keyStats.length > 0 && (
            <div className="sc-overview__section">
              <SectionHeader title="Season Stat Summary" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {keyStats.map(s => (
                  <div key={s.label} className="sc-overview__stat-cell">
                    <p className="sc-overview__stat-label">{s.label}</p>
                    <p className="sc-overview__stat-number" style={{ color: '#0b3a7a' }}>{Number.isInteger(s.total) ? s.total : s.total.toFixed(1)}</p>
                    <p className="sc-overview__stat-meta">{s.perGame.toFixed(1)}/g</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cp && (() => {
            const durColor = cp.durabilityPct >= 90 ? '#16a34a' : cp.durabilityPct >= 70 ? '#0f172a' : '#ef4444';
            const volColor = cp.volatilityLabel === 'Low' ? '#16a34a' : cp.volatilityLabel === 'Moderate' ? '#0f172a' : '#ef4444';
            const ppgs = cp.seasonPpgs;
            const maxPpg = Math.max(...ppgs.map(p => p.ppg), 1);
            const chartH = 48;

            return (
            <div className="sc-overview__section" data-testid="section-career-profile">
              {cp.smallSample && (
                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 mb-2 bg-amber-500/15 text-amber-700 dark:text-amber-400" data-testid="badge-small-sample">Small Sample</Badge>
              )}
              <SectionHeader title="Career Profile" subtitle={`3-year performance overview across ${cp.gamesPlayed} games`} />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4" data-testid="career-profile-stats">
                <div className="sc-overview__stat-cell">
                  <p className="sc-overview__stat-label">Career PPG</p>
                  <p className="sc-overview__stat-number" style={{ color: '#0b3a7a' }}>{cp.ppg.toFixed(1)}</p>
                </div>
                <div className="sc-overview__stat-cell">
                  <p className="sc-overview__stat-label">Durability</p>
                  <p className="sc-overview__stat-number" style={{ color: durColor }}>{cp.durabilityPct.toFixed(0)}%</p>
                  <p className="sc-overview__stat-meta">{cp.gamesPlayed} of {cp.maxGames} games</p>
                </div>
                <div className="sc-overview__stat-cell">
                  <p className="sc-overview__stat-label">Volatility</p>
                  <p className="sc-overview__stat-number" style={{ color: volColor }}>{cp.volatility.toFixed(1)}</p>
                  <p className="sc-overview__stat-meta">{cp.volatilityLabel}</p>
                </div>
                <div className="sc-overview__stat-cell">
                  <p className="sc-overview__stat-label">Stability</p>
                  {(() => {
                    const pctChange = ppgs.length >= 2 ? ((ppgs[ppgs.length-1].ppg - ppgs[0].ppg) / Math.max(ppgs[0].ppg, 1)) * 100 : 0;
                    const stLabel = Math.abs(pctChange) < 10 ? 'Steady' : pctChange > 0 ? 'Ascending' : 'Declining';
                    const stColor = Math.abs(pctChange) < 10 ? '#16a34a' : pctChange > 0 ? '#16a34a' : '#ef4444';
                    return (
                      <>
                        <p className="sc-overview__stat-number" style={{ color: stColor, fontSize: '14px' }}>{stLabel}</p>
                        <p className="sc-overview__stat-meta">{pctChange >= 0 ? '+' : ''}{pctChange.toFixed(0)}% trend</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <p className="sc-overview__stat-label" style={{ marginBottom: '6px' }}>Tier Breakdown</p>
                <div className={`grid gap-2 ${thresholds.hasTier3 ? 'grid-cols-4' : 'grid-cols-3'}`} data-testid="career-tier-breakdown">
                  <div className="sc-overview__role-card-cell">
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', fontFamily: "ui-monospace, monospace" }}>{cp.pos1Pct.toFixed(0)}%</p>
                    <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{getTierLabel(player.position, 1)}</p>
                  </div>
                  <div className="sc-overview__role-card-cell">
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#0d9488', fontFamily: "ui-monospace, monospace" }}>{cp.pos2Pct.toFixed(0)}%</p>
                    <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{getTierLabel(player.position, 2)}</p>
                  </div>
                  {thresholds.hasTier3 && (
                    <div className="sc-overview__role-card-cell">
                      <p style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', fontFamily: "ui-monospace, monospace" }}>{cp.pos3Pct.toFixed(0)}%</p>
                      <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>{getTierLabel(player.position, 3)}</p>
                    </div>
                  )}
                  <div className="sc-overview__role-card-cell">
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444', fontFamily: "ui-monospace, monospace" }}>{cp.bustPct.toFixed(0)}%</p>
                    <p style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600 }}>Bust</p>
                  </div>
                </div>
              </div>

              {ppgs.length > 1 && (
                <div>
                  <p className="sc-overview__stat-label" style={{ marginBottom: '6px' }}>Career Arc</p>
                  <div className="flex items-end gap-2" data-testid="career-arc-chart" style={{ height: chartH + 20 }}>
                    {ppgs.map((sp, i) => {
                      const barH = Math.max(6, (sp.ppg / maxPpg) * chartH);
                      const isLast = i === ppgs.length - 1;
                      return (
                        <div key={sp.season} className="flex-1 flex flex-col items-center gap-1">
                          <span style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: isLast ? '#0f172a' : '#94a3b8' }}>{sp.ppg.toFixed(1)}</span>
                          <div
                            style={{
                              width: '100%',
                              height: barH,
                              borderRadius: '4px',
                              background: isLast ? 'linear-gradient(180deg, #1a3f8a, #2d7df6)' : 'rgba(15,23,42,0.10)',
                              transition: 'height 0.3s ease',
                            }}
                          />
                          <span style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'ui-monospace, monospace', color: '#94a3b8' }}>{String(sp.season).slice(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            );
          })()}
        </>
        );
      })() : (
        <div className="sc-overview__section" style={{ padding: '32px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>No season data available yet.</p>
          <p style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '4px' }}>Stats will appear once the season begins.</p>
        </div>
      )}

      {(strengths.length > 0 || risks.length > 0) && (
        <div className="sc-overview__section" style={{ padding: '20px' }} data-testid="section-strengths-risks">
          <SectionHeader title="Fantasy Strengths and Risk Factors" subtitle="Key production drivers and downside factors heading into 2026." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#16a34a', marginBottom: '10px' }}>Strengths</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {strengths.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--foreground)', lineHeight: '1.5' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, marginTop: '1px', flexShrink: 0 }}>+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ef4444', marginBottom: '10px' }}>Risk Factors</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {risks.map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--foreground)', lineHeight: '1.5' }}>
                    <span style={{ color: '#ef4444', fontWeight: 700, marginTop: '1px', flexShrink: 0 }}>-</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="sc-overview__outlook" data-testid="section-quick-outlook">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <FileText className="w-4 h-4" style={{ color: '#d4af37' }} />
          <SectionHeader title="2026 Fantasy Outlook" subtitle="Projected role trajectory and risk summary" />
        </div>
        {outlook.hasData ? (
          <>
            <div className="sc-overview__outlook-role-badge" data-testid="text-outlook-role">{outlook.roleLabel}</div>

            <div className="sc-overview__outlook-meta" data-testid="outlook-stat-lines">
              <div className="sc-overview__outlook-meta-item">
                <span className="sc-overview__outlook-meta-label">Form:</span>
                <span className="sc-overview__outlook-meta-value" data-testid="text-outlook-form">{outlook.formLabel}</span>
                <span style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}>({outlook.formDetail})</span>
              </div>
              <div className="sc-overview__outlook-meta-item">
                <span className="sc-overview__outlook-meta-label">Volatility:</span>
                <span className="sc-overview__outlook-meta-value" data-testid="text-outlook-volatility">{outlook.volatilityLabel}</span>
              </div>
              <div className="sc-overview__outlook-meta-item">
                <span className="sc-overview__outlook-meta-label">Tier:</span>
                <span className="sc-overview__outlook-meta-value" data-testid="text-outlook-tier">{outlook.tierProfile}</span>
              </div>
            </div>
            {outlook.sentence && (
              <p className="sc-overview__outlook-sentence" data-testid="text-outlook-sentence">{outlook.sentence}</p>
            )}
          </>
        ) : (
          <p style={{ fontSize: '14px', color: '#94a3b8' }} data-testid="text-outlook">{outlook.noDataMsg}</p>
        )}
      </div>
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

type GameFilterType = 'full' | 'last8' | 'last5';

function GameLogTab({ player, format = 'ppr' }: { player: PlayerWithSeasons; format?: ScoringFormat }) {
  const availableSeasons = player.availableSeasons || (player.season ? [player.season] : []);
  const [selectedSeason, setSelectedSeason] = useState<number>(availableSeasons[0] || new Date().getFullYear());
  const [gameFilter, setGameFilter] = useState<GameFilterType>('full');
  const [tierFilter, setTierFilter] = useState<DistTier | null>(null);
  const [hideInactive, setHideInactive] = useState(false);
  const isDefaultSeason = selectedSeason === availableSeasons[0];

  const { data: seasonGameLog, isLoading: isSeasonLoading } = useQuery<GameLogEntry[]>({
    queryKey: ["/api/players", player.slug, "game-log", selectedSeason, format],
    queryFn: async () => {
      const res = await fetch(`/api/players/${player.slug}/game-log?season=${selectedSeason}&format=${format}`);
      if (!res.ok) throw new Error("Failed to fetch game log");
      return res.json();
    },
    enabled: !isDefaultSeason,
  });

  const entries = isDefaultSeason ? (player.gameLog || []) : (seasonGameLog || []);
  const stats = computeGameLogStats(entries, player.position, format);
  const posLabel = player.position || '';
  const played = entries.filter(e => hasParticipation(e.stats, player.position));

  const posAvgPpg = (() => {
    const benchmarks: Record<string, number> = { QB: 16.5, RB: 11.5, WR: 10.5, TE: 8.0 };
    return benchmarks[player.position || ''] ?? 10;
  })();

  const bestWeek = played.length > 0 ? played.reduce((best, e) => fpts(e, format) > fpts(best, format) ? e : best, played[0]) : null;
  const worstWeek = played.length > 0 ? played.reduce((worst, e) => fpts(e, format) < fpts(worst, format) ? e : worst, played[0]) : null;
  const bestTier = bestWeek ? getTierBadge(bestWeek.pos_rank, player.position) : null;
  const worstTier = worstWeek ? getTierBadge(worstWeek.pos_rank, player.position) : null;

  const filterForTable: 'full' | 'last5' = gameFilter === 'full' ? 'full' : 'last5';

  const gameLogSummaryParas = generateGameLogSummary(player, entries, stats, format);
  const performanceInsights = generatePerformancePatternInsights(player, entries, stats, format);

  return (
    <div className="sc-gamelog" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {gameLogSummaryParas.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }} data-testid="section-gamelog-summary">
          <SectionHeader title="Season Game Log Summary" />
          {gameLogSummaryParas.map((p, i) => (
            <p key={i} style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--sc-text-muted, #94a3b8)', marginBottom: i < gameLogSummaryParas.length - 1 ? '12px' : 0 }}>{p}</p>
          ))}
        </div>
      )}

      {performanceInsights.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }} data-testid="section-performance-insights">
          <SectionHeader title="Performance Pattern Insights" subtitle="Key patterns from the weekly scoring distribution this season." />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {performanceInsights.map((ins, i) => {
              const dotColor = ins.icon === 'up' ? '#22c55e' : ins.icon === 'down' ? '#ef4444' : '#94a3b8';
              const icon = ins.icon === 'up' ? '▲' : ins.icon === 'down' ? '▼' : '●';
              return (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--foreground)', lineHeight: '1.6' }} data-testid={`insight-pattern-${i}`}>
                  <span style={{ color: dotColor, fontSize: '9px', fontWeight: 700, marginTop: '4px', flexShrink: 0, letterSpacing: '0' }}>{icon}</span>
                  {ins.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <SectionHeader title="Game Log" subtitle="Performance distribution and finish outcomes" />
        <div className="flex items-center gap-2 flex-wrap">
          <div className="sc-gamelog__segmented-control" data-testid="filter-game-range">
            {(['full', 'last8', 'last5'] as GameFilterType[]).map((f) => (
              <button
                key={f}
                className={`sc-gamelog__segment ${gameFilter === f ? 'sc-gamelog__segment--active' : ''}`}
                onClick={() => setGameFilter(f)}
                data-testid={`button-filter-${f}`}
              >
                {f === 'full' ? 'Full Season' : f === 'last8' ? 'Last 8' : 'Last 5'}
              </button>
            ))}
          </div>
          {availableSeasons.length > 1 && (
            <Select value={String(selectedSeason)} onValueChange={(v) => setSelectedSeason(Number(v))}>
              <SelectTrigger className="w-28" data-testid="select-season">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableSeasons.map((s) => (
                  <SelectItem key={s} value={String(s)} data-testid={`option-season-${s}`}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {availableSeasons.length === 1 && (
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{selectedSeason}</span>
          )}
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="gamelog-summary-bar">
          <StatBox label="Games Played" value={stats.gamesPlayed} />
          <StatBox label="Season PPG" value={stats.ppg.toFixed(1)} tintClass="sc-gamelog__stat-box--blue">
            {player.seasonRank && (
              <p className="sc-gamelog__stat-sub" style={{ fontWeight: 700, color: '#475569' }}>
                {posLabel}{player.seasonRank} Equivalent
              </p>
            )}
            {(() => {
              const delta = stats.ppg - posAvgPpg;
              return (
                <p className="sc-gamelog__stat-sub" style={{ fontWeight: 700, color: delta >= 0 ? '#16a34a' : '#dc2626' }} data-testid="text-ppg-vs-avg">
                  {delta >= 0 ? '+' : ''}{delta.toFixed(1)} vs Pos Avg
                </p>
              );
            })()}
          </StatBox>
          <StatBox label="Best Week" value={bestWeek ? fpts(bestWeek, format).toFixed(1) : '\u2014'} tintClass="sc-gamelog__stat-box--green">
            {bestWeek && bestTier && (
              <div className="flex items-center gap-1 flex-wrap" style={{ marginTop: '2px' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Wk {bestWeek.week}</span>
                <Badge variant="secondary" className={`text-[8px] px-1 py-0 ${bestTier.className}`}>{bestTier.label}</Badge>
              </div>
            )}
            {bestWeek && !bestTier && bestWeek.pos_rank && (
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>Wk {bestWeek.week} ({posLabel}{bestWeek.pos_rank})</span>
            )}
          </StatBox>
          <StatBox label="Worst Week" value={worstWeek ? fpts(worstWeek, format).toFixed(1) : '\u2014'} tintClass="sc-gamelog__stat-box--red">
            {worstWeek && worstTier && (
              <div className="flex items-center gap-1 flex-wrap" style={{ marginTop: '2px' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Wk {worstWeek.week}</span>
                <Badge variant="secondary" className={`text-[8px] px-1 py-0 ${worstTier.className}`}>{worstTier.label}</Badge>
              </div>
            )}
            {worstWeek && !worstTier && worstWeek.pos_rank && (
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>Wk {worstWeek.week} ({posLabel}{worstWeek.pos_rank})</span>
            )}
          </StatBox>
        </div>
      )}

      {stats && gameFilter === 'full' && (
        <GameDistributionBar entries={entries} position={player.position} activeTier={tierFilter} onTierClick={setTierFilter} format={format} />
      )}

      <div className="sc-gamelog__table-card">
        <div style={{ padding: '16px 20px' }}>
          {gameFilter === 'full' && (
            <div className="flex items-center justify-end mb-2 gap-1.5">
              <div className="sc-gamelog__segmented-control sc-gamelog__segmented-control--sm" data-testid="toggle-hide-inactive">
                <button
                  onClick={() => setHideInactive(false)}
                  className={`sc-gamelog__segment ${!hideInactive ? 'sc-gamelog__segment--active' : ''}`}
                  data-testid="button-show-all"
                >
                  Show All
                </button>
                <button
                  onClick={() => setHideInactive(true)}
                  className={`sc-gamelog__segment ${hideInactive ? 'sc-gamelog__segment--active' : ''}`}
                  data-testid="button-active-only"
                >
                  Active Only
                </button>
              </div>
            </div>
          )}
          {isSeasonLoading && !isDefaultSeason ? (
            <div className="py-8 text-center">
              <Skeleton className="h-4 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          ) : (
            <GameLogTable entries={entries} position={player.position} filter={gameFilter === 'last8' ? 'last5' : filterForTable} tierFilter={tierFilter} hideInactive={hideInactive} format={format} lastN={gameFilter === 'last8' ? 8 : gameFilter === 'last5' ? 5 : undefined} />
          )}
        </div>
      </div>

      {player.careerSeasonStats && player.careerSeasonStats.length > 0 && (
        <CareerStatsTable stats={player.careerSeasonStats} position={player.position} format={format} onSeasonClick={(s) => { setSelectedSeason(s); setGameFilter('full'); }} />
      )}
    </div>
  );
}

function CareerStatsTable({ stats, position, format, onSeasonClick }: {
  stats: CareerSeasonStat[];
  position: string | null;
  format: ScoringFormat;
  onSeasonClick: (season: number) => void;
}) {
  const pos = position || '';
  const sorted = [...stats].sort((a, b) => b.season - a.season);

  const totalGp = sorted.reduce((s, r) => s + r.gp, 0);
  const totalPts = sorted.reduce((s, r) => s + r.ppg * r.gp, 0);
  const careerPpg = totalGp > 0 ? totalPts / totalGp : 0;
  const bestSeason = sorted.length > 0 ? sorted.reduce((best, r) => r.ppg > best.ppg ? r : best, sorted[0]) : null;

  type Col = { key: string; label: string; align?: string; bold?: boolean };
  let columns: Col[] = [];

  if (pos === 'QB') {
    columns = [
      { key: 'season', label: 'Year', align: 'left' },
      { key: 'gp', label: 'GP' },
      { key: 'pass_yd', label: 'Pass Yds' },
      { key: 'pass_td', label: 'Pass TD' },
      { key: 'pass_int', label: 'INT' },
      { key: 'rush_yd', label: 'Rush Yds' },
      { key: 'rush_td', label: 'Rush TD' },
      { key: 'ppg', label: 'PPG', bold: true },
    ];
  } else if (pos === 'WR' || pos === 'TE') {
    columns = [
      { key: 'season', label: 'Year', align: 'left' },
      { key: 'gp', label: 'GP' },
      { key: 'targets', label: 'Targets' },
      { key: 'receptions', label: 'Rec' },
      { key: 'rec_yd', label: 'Rec Yds' },
      { key: 'total_td', label: 'TD' },
      { key: 'ppg', label: 'PPG', bold: true },
    ];
  } else {
    columns = [
      { key: 'season', label: 'Year', align: 'left' },
      { key: 'gp', label: 'GP' },
      { key: 'rush_att', label: 'Rush Att' },
      { key: 'rush_yd', label: 'Rush Yds' },
      { key: 'ypc', label: 'YPC' },
      { key: 'receptions', label: 'Rec' },
      { key: 'rec_yd', label: 'Rec Yds' },
      { key: 'total_td', label: 'Total TD' },
      { key: 'ppg', label: 'PPG', bold: true },
    ];
  }

  const getValue = (row: CareerSeasonStat, key: string): string | number => {
    if (key === 'ypc') return row.rush_att > 0 ? (row.rush_yd / row.rush_att).toFixed(1) : '0.0';
    if (key === 'ppg') return row.ppg.toFixed(1);
    return (row as unknown as Record<string, number>)[key] ?? 0;
  };

  const formatLabel = format === 'ppr' ? 'PPR' : format === 'half' ? 'Half-PPR' : 'Standard';

  const durabilityPct = (() => {
    const maxGamesPerSeason = 17;
    const totalPossible = sorted.length * maxGamesPerSeason;
    return totalPossible > 0 ? (totalGp / totalPossible) * 100 : 0;
  })();

  return (
    <div className="sc-gamelog__career-section" data-testid="career-stats-table">
      <SectionHeader title="Career Stats" subtitle={`Season totals \u00B7 ${formatLabel} fantasy output`} />

      <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '16px' }} data-testid="career-summary-tiles">
        <div className="sc-gamelog__stat-box sc-gamelog__stat-box--blue">
          <p className="sc-gamelog__stat-label">Career Avg</p>
          <p className="sc-gamelog__stat-value">{careerPpg.toFixed(1)}</p>
          <p className="sc-gamelog__stat-sub">PPG across {totalGp} games</p>
        </div>
        {bestSeason && (
          <div className="sc-gamelog__stat-box sc-gamelog__stat-box--green">
            <p className="sc-gamelog__stat-label">Peak Season</p>
            <p className="sc-gamelog__stat-value">{bestSeason.season}</p>
            <p className="sc-gamelog__stat-sub">{bestSeason.ppg.toFixed(1)} PPG{bestSeason.posRank ? ` \u00B7 ${pos}${bestSeason.posRank}` : ''}</p>
          </div>
        )}
        <div className="sc-gamelog__stat-box">
          <p className="sc-gamelog__stat-label">Durability</p>
          <p className="sc-gamelog__stat-value" style={{ color: durabilityPct >= 85 ? '#16a34a' : durabilityPct >= 65 ? '#d97706' : '#ef4444' }}>{durabilityPct.toFixed(0)}%</p>
          <p className="sc-gamelog__stat-sub">{totalGp} of {sorted.length * 17} possible</p>
        </div>
      </div>

      <div className="sc-gamelog__table-wrap" style={{ margin: '0 -4px' }}>
        <table className="sc-gamelog__table" style={{ minWidth: pos === 'RB' ? '520px' : '440px' }} data-testid="table-career-stats">
          <thead>
            <tr className="sc-gamelog__thead-row">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`sc-gamelog__th ${col.bold ? 'sc-gamelog__th--primary' : ''}`}
                  style={{ textAlign: col.align === 'left' ? 'left' : 'right' }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const isBest = bestSeason && row.season === bestSeason.season && sorted.length > 1;
              return (
                <tr key={row.season} className={`sc-gamelog__row ${isBest ? 'sc-gamelog__row--best' : ''}`}>
                  {columns.map(col => {
                    if (col.key === 'season') {
                      return (
                        <td key={col.key} className="sc-gamelog__td" style={{ textAlign: 'left' }}>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onSeasonClick(row.season)}
                              style={{ fontSize: '12px', fontWeight: 700, color: '#1a3f8a', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontFamily: 'ui-monospace, monospace' }}
                              data-testid={`link-season-${row.season}`}
                            >
                              {row.season}
                            </button>
                            {isBest && <Trophy className="w-3 h-3" style={{ color: '#d4af37' }} />}
                          </div>
                        </td>
                      );
                    }
                    if (col.key === 'ppg') {
                      return (
                        <td key={col.key} className="sc-gamelog__td sc-gamelog__td--primary" style={{ textAlign: 'right' }}>
                          <div className="flex items-center justify-end gap-1.5">
                            <span style={{ fontWeight: 800, color: '#0b3a7a', fontFamily: 'ui-monospace, monospace', fontSize: '13px' }}>{row.ppg.toFixed(1)}</span>
                            {row.posRank && (
                              <span className={`text-[9px] tabular-nums font-semibold ${getRankColor(row.posRank)}`}>{pos}{row.posRank}</span>
                            )}
                          </div>
                        </td>
                      );
                    }
                    const val = getValue(row, col.key);
                    return (
                      <td key={col.key} className="sc-gamelog__td sc-gamelog__td--secondary" style={{ textAlign: 'right' }}>
                        {typeof val === 'number' ? val.toLocaleString() : val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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

function getPositionCvAnchor(position?: string | null): number {
  if (position === 'QB') return 0.25;
  if (position === 'RB') return 0.28;
  if (position === 'TE') return 0.43;
  return 0.40;
}

function computeUsageStability(activeEntries: GameLogEntry[], primaryKey: string, position?: string | null): number {
  if (activeEntries.length < 3) return 50;
  const getVal = (e: GameLogEntry): number => {
    const s = e.stats as unknown as Record<string, number>;
    if (position === 'QB') return (s['pass_att'] ?? 0) + 2 * (s['rush_att'] ?? 0);
    if (position === 'RB') return (s['rush_att'] ?? 0) + (s['rec_tgt'] ?? 0);
    return s[primaryKey] ?? 0;
  };
  const vals = activeEntries.map(getVal);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  if (mean === 0) return 50;
  const variance = vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length;
  let cv = Math.sqrt(variance) / mean;
  const n = vals.length;
  if (n < 16) cv = cv * Math.sqrt(n / 16);
  const anchor = getPositionCvAnchor(position);
  return Math.round(Math.max(5, Math.min(95, 100 / (1 + (cv / anchor) ** 2))));
}

function getDeltaMicroLabel(delta: number, pct: boolean): string {
  const abs = Math.abs(delta);
  if (pct) {
    if (abs < 2) return 'Stable';
    if (abs < 5) return delta > 0 ? 'Modest Rise' : 'Modest Dip';
    return delta > 0 ? 'Notable Rise' : 'Notable Drop';
  }
  if (abs < 0.3) return 'Stable';
  if (abs < 1) return delta > 0 ? 'Modest Rise' : 'Modest Dip';
  return delta > 0 ? 'Notable Rise' : 'Notable Drop';
}

function DeltaCell({ delta, pct = false }: { delta: number; pct?: boolean }) {
  const threshold = pct ? 0.3 : 0.05;
  const isPos = delta > threshold;
  const isNeg = delta < -threshold;
  const color = isPos ? 'text-emerald-500' : isNeg ? 'text-red-400' : 'text-muted-foreground';
  const sign = isPos ? '+' : '';
  const microLabel = getDeltaMicroLabel(delta, pct);
  return (
    <div className="flex flex-col items-end gap-0">
      <span className={`font-semibold tabular-nums ${color}`}>
        {sign}{delta.toFixed(1)}{pct ? '%' : ''}
      </span>
      <span className={`text-[9px] font-medium ${color} opacity-70`}>{microLabel}</span>
    </div>
  );
}

function UsageTrendsTab({ player, entries, format = 'ppr' }: { player: PlayerWithSeasons; entries: GameLogEntry[]; format?: ScoringFormat }) {
  const position = player.position;
  const activeEntries = entries.filter(e => hasParticipation(e.stats, position));
  const metrics = getPositionMomentumMetrics(position);
  const RECENT_WINDOW = 4;

  const getStat = (e: GameLogEntry, key: string) => (e.stats as unknown as Record<string, number>)[key] ?? 0;

  const totalPlayerTgt = activeEntries.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
  const totalTeamTgt = activeEntries.reduce((s, e) => s + getStat(e, 'team_tgt'), 0);
  const weightedSeasonShare = totalTeamTgt > 0 ? (totalPlayerTgt / totalTeamTgt) * 100 : 0;

  const deltaRows = metrics.map(m => {
    if (m.key === 'snap_share') {
      const seasonSnp = activeEntries.reduce((s, e) => s + getStat(e, 'off_snp'), 0);
      const seasonTmSnp = activeEntries.reduce((s, e) => s + getStat(e, 'tm_off_snp'), 0);
      const seasonAvg = seasonTmSnp > 0 ? (seasonSnp / seasonTmSnp) * 100 : 0;
      const last4 = activeEntries.slice(-RECENT_WINDOW);
      const l4Snp = last4.reduce((s, e) => s + getStat(e, 'off_snp'), 0);
      const l4TmSnp = last4.reduce((s, e) => s + getStat(e, 'tm_off_snp'), 0);
      const recentAvg = l4TmSnp > 0 ? (l4Snp / l4TmSnp) * 100 : 0;
      const delta = recentAvg - seasonAvg;
      return { ...m, seasonAvg, recentAvg, delta };
    }
    if (m.key === 'target_share') {
      const seasonAvg = weightedSeasonShare;
      const last4 = activeEntries.slice(-RECENT_WINDOW);
      const l4PlayerTgt = last4.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
      const l4TeamTgt = last4.reduce((s, e) => s + getStat(e, 'team_tgt'), 0);
      const recentAvg = l4TeamTgt > 0 ? (l4PlayerTgt / l4TeamTgt) * 100 : 0;
      const delta = recentAvg - seasonAvg;
      return { ...m, seasonAvg, recentAvg, delta };
    }
    if (m.key === 'pass_cmp_pct') {
      const sCmp = activeEntries.reduce((s, e) => s + getStat(e, 'pass_cmp'), 0);
      const sAtt = activeEntries.reduce((s, e) => s + getStat(e, 'pass_att'), 0);
      const seasonAvg = sAtt > 0 ? (sCmp / sAtt) * 100 : 0;
      const last4 = activeEntries.slice(-RECENT_WINDOW);
      const rCmp = last4.reduce((s, e) => s + getStat(e, 'pass_cmp'), 0);
      const rAtt = last4.reduce((s, e) => s + getStat(e, 'pass_att'), 0);
      const recentAvg = rAtt > 0 ? (rCmp / rAtt) * 100 : 0;
      const delta = recentAvg - seasonAvg;
      return { ...m, seasonAvg, recentAvg, delta };
    }
    const seasonAvg = computeMetricAvg(activeEntries, m.key);
    const recentAvg = computeMetricAvg(activeEntries, m.key, RECENT_WINDOW);
    const delta = recentAvg - seasonAvg;
    return { ...m, seasonAvg, recentAvg, delta };
  });

  const primaryKey = metrics[0]?.key ?? 'rec_tgt';
  const weightedDeltaSum = deltaRows.reduce((s, d) => {
    const w = d.weight ?? 1;
    let rawContribution: number;
    if (d.pct) {
      rawContribution = d.delta;
    } else {
      rawContribution = d.seasonAvg > 0 ? (d.delta / d.seasonAvg) * 100 : 0;
    }
    const capped = Math.max(-25, Math.min(25, rawContribution));
    return s + capped * w;
  }, 0);
  const totalWeight = deltaRows.reduce((s, d) => s + (d.weight ?? 1), 0) || 1;
  const normalizedDelta = weightedDeltaSum / totalWeight;
  const momentumScore = Math.round(Math.max(5, Math.min(95, 50 + normalizedDelta * 2.5)));

  const momentumLabel = momentumScore >= 80 ? 'STRONG EXPANSION' : momentumScore >= 60 ? 'EXPANDING' : momentumScore <= 39 ? 'DECLINING' : 'STABLE';
  const momentumColor = momentumScore >= 60 ? 'text-emerald-500' : momentumScore <= 39 ? 'text-red-400' : 'text-amber-400';
  const momentumBg = momentumScore >= 60 ? 'bg-emerald-500/10 border-emerald-500/20' : momentumScore <= 39 ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20';
  const momentumBarColor = momentumScore >= 80 ? '#10b981' : momentumScore >= 60 ? '#34d399' : momentumScore <= 39 ? '#f87171' : '#fbbf24';

  const topDelta = deltaRows.reduce((best, d) => Math.abs(d.delta) > Math.abs(best.delta) ? d : best, deltaRows[0]);
  const topDeltaPctChange = topDelta.pct
    ? topDelta.delta
    : (topDelta.seasonAvg > 0 ? (topDelta.delta / topDelta.seasonAvg) * 100 : 0);
  const topDeltaDir = topDeltaPctChange > 0 ? 'up' : 'down';
  const topDeltaAbs = Math.abs(topDeltaPctChange);
  const topMetricName = topDelta.label.replace(/ \(Team\)/, '').replace(/\/G/, '/game');
  const momentumMicroText = topDeltaAbs < 2
    ? 'Role stable relative to season baseline.'
    : `${topMetricName} ${topDeltaDir} ${topDeltaAbs.toFixed(0)}% vs season baseline.`;

  const tdDep = computeTdDependency(activeEntries, position, format);
  const stability = computeUsageStability(activeEntries, primaryKey, position);
  const stabilityLabel = stability >= 70 ? 'Consistent Role' : stability >= 45 ? 'Moderate Variance' : 'High Weekly Volatility';
  const stabilityColor = stability >= 70 ? 'text-emerald-500' : stability >= 45 ? 'text-amber-400' : 'text-red-400';

  const stabilityMicroText = useMemo(() => {
    if (activeEntries.length < 3) return null;
    const getVal = (e: GameLogEntry): number => {
      const s = e.stats as unknown as Record<string, number>;
      if (position === 'QB') return (s['pass_att'] ?? 0) + 2 * (s['rush_att'] ?? 0);
      if (position === 'RB') return (s['rush_att'] ?? 0) + (s['rec_tgt'] ?? 0);
      return s['rec_tgt'] ?? 0;
    };
    const vals = activeEntries.map(getVal);
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    if (mean === 0) return null;
    const variance = vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length;
    const stdev = Math.sqrt(variance);
    if (position === 'QB') return `Workload varies \u00B1${stdev.toFixed(1)} per game`;
    if (position === 'RB') return `Workload varies \u00B1${stdev.toFixed(1)} touches per game`;
    return `Targets vary \u00B1${stdev.toFixed(1)} per game`;
  }, [activeEntries, position]);

  const topDeltaRow = deltaRows.reduce((best, d) => Math.abs(d.delta) > Math.abs(best.delta) ? d : best, deltaRows[0]);
  const secondDelta = deltaRows.filter(d => d.key !== topDeltaRow?.key).reduce((best, d) => Math.abs(d.delta) > Math.abs(best.delta) ? d : best, deltaRows[1] || deltaRows[0]);

  const microInsight = useMemo(() => {
    if (!topDeltaRow || !secondDelta || deltaRows.length < 2) return null;
    const topAbs = Math.abs(topDeltaRow.delta);
    const topLabel = topDeltaRow.label.toLowerCase();
    const secLabel = secondDelta.label.toLowerCase();
    const secAbs = Math.abs(secondDelta.delta);
    const topPct = topDeltaRow.pct;

    const topMagnitude = topPct ? (topAbs < 2 ? 'stable' : topAbs < 5 ? 'modest' : 'notable') : (topAbs < 0.3 ? 'stable' : topAbs < 1 ? 'modest' : 'notable');
    const secDirection = secondDelta.delta >= 0 ? 'holding steady' : 'dipping slightly';

    if (topMagnitude === 'stable') {
      return `Usage metrics have remained largely stable over the last ${RECENT_WINDOW} weeks, with ${topLabel} and ${secLabel} both holding near season averages — suggesting a consistent offensive role.`;
    }
    const topVerb = topDeltaRow.delta > 0
      ? (topMagnitude === 'modest' ? 'ticked upward' : 'risen meaningfully')
      : (topMagnitude === 'modest' ? 'dipped modestly' : 'pulled back noticeably');

    const contextPhrase = secAbs < (secondDelta.pct ? 2 : 0.3)
      ? `while ${secLabel} remains steady`
      : `${secondDelta.delta > 0 ? 'alongside rising' : 'even as'} ${secLabel} ${secondDelta.delta > 0 ? secDirection : 'has also softened'}`;

    const outlook = momentumScore >= 60
      ? 'pointing to a strengthening role'
      : momentumScore <= 39
      ? 'suggesting a narrowing of opportunity'
      : 'worth monitoring over the coming weeks';

    return `${topLabel.charAt(0).toUpperCase() + topLabel.slice(1)} has ${topVerb} over the last four weeks ${contextPhrase} — ${outlook}.`;
  }, [topDeltaRow, secondDelta, deltaRows, momentumScore]);

  const [trendView, setTrendView] = useState<'share' | 'raw' | 'pct'>('share');

  const targetShareData = activeEntries.map(e => getStat(e, 'target_share'));
  const targetShareRolling = computeRollingAvg(targetShareData, 3);
  const targetShareSeasonAvg = targetShareData.length > 0 ? targetShareData.reduce((a, b) => a + b, 0) / targetShareData.length : 0;

  const rawTargetsData = activeEntries.map(e => getStat(e, 'rec_tgt'));
  const rawTargetsRolling = computeRollingAvg(rawTargetsData, 3);

  const teamPctData = activeEntries.map((e, i) => {
    const teamTgt = getStat(e, 'team_tgt');
    return teamTgt > 0 ? (rawTargetsData[i] / teamTgt) * 100 : 0;
  });
  const teamPctRolling = computeRollingAvg(teamPctData, 3);

  const chart1DataMap = {
    share: { data: targetShareData, rolling: targetShareRolling, label: 'Target Share % (Team Targets)', unit: '%', avg: weightedSeasonShare },
    raw: { data: rawTargetsData, rolling: rawTargetsRolling, label: 'Targets', unit: '', avg: rawTargetsData.length > 0 ? rawTargetsData.reduce((a, b) => a + b, 0) / rawTargetsData.length : 0 },
    pct: { data: teamPctData, rolling: teamPctRolling, label: '% of Team Targets', unit: '%', avg: teamPctData.length > 0 ? teamPctData.reduce((a, b) => a + b, 0) / teamPctData.length : 0 },
  };

  let chart1Cfg = chart1DataMap[trendView];
  if (position === 'QB') {
    const passAttData = activeEntries.map(e => getStat(e, 'pass_att'));
    const passAttRolling = computeRollingAvg(passAttData, 3);
    const passAttAvg = passAttData.length > 0 ? passAttData.reduce((a, b) => a + b, 0) / passAttData.length : 0;
    chart1Cfg = { data: passAttData, rolling: passAttRolling, label: 'Pass Attempts', unit: '', avg: passAttAvg };
  } else if (position === 'RB') {
    const carriesData = activeEntries.map(e => getStat(e, 'rush_att'));
    const carriesRolling = computeRollingAvg(carriesData, 3);
    const carriesAvg = carriesData.length > 0 ? carriesData.reduce((a, b) => a + b, 0) / carriesData.length : 0;
    chart1Cfg = { data: carriesData, rolling: carriesRolling, label: 'Carries', unit: '', avg: carriesAvg };
  } else if (position === 'K') {
    const fgaData = activeEntries.map(e => getStat(e, 'fga'));
    const fgaRolling = computeRollingAvg(fgaData, 3);
    const fgaAvg = fgaData.length > 0 ? fgaData.reduce((a, b) => a + b, 0) / fgaData.length : 0;
    chart1Cfg = { data: fgaData, rolling: fgaRolling, label: 'FG Attempts', unit: '', avg: fgaAvg };
  }

  const teamPassAtt = activeEntries.map(e => {
    if (position === 'QB') return getStat(e, 'pass_att');
    return getStat(e, 'team_pass_att') || getStat(e, 'team_tgt') || 0;
  });
  const playerVolume = position === 'QB'
    ? activeEntries.map(e => getStat(e, 'pass_att'))
    : position === 'RB'
    ? activeEntries.map(e => getStat(e, 'rush_att') + getStat(e, 'rec_tgt'))
    : activeEntries.map(e => getStat(e, 'rec_tgt'));
  const teamPassAttRolling = computeRollingAvg(teamPassAtt, 3);
  const playerVolumeRolling = computeRollingAvg(playerVolume, 3);

  const weeklyPts = activeEntries.map(e => fpts(e, format));
  const weeklyTdPts = activeEntries.map(e => {
    const s = e.stats as unknown as Record<string, number>;
    if (position === 'QB') return ((s.pass_td ?? 0) * 4) + ((s.rush_td ?? 0) * 6);
    if (position === 'K') return 0;
    return (((s.rec_td ?? 0) + (s.rush_td ?? 0)) * 6);
  });
  const weeklyPtsRolling = computeRollingAvg(weeklyPts, 3);
  const weeklyTdPtsRolling = computeRollingAvg(weeklyTdPts, 3);

  if (entries.length === 0 || metrics.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-muted-foreground/25 p-12 text-center">
        <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm font-medium">Usage data not yet available</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Check back once the season is underway.</p>
      </div>
    );
  }

  const playerRoleRows = deltaRows.filter(d => !(d as any).context);
  const contextRows = deltaRows.filter(d => (d as any).context);

  const usageSummaryParas = generateUsageSummary(player, deltaRows, momentumScore);
  const roleStabilityData = generateRoleStabilityRisk(player, stability, stabilityLabel, stabilityMicroText, tdDep, momentumScore);
  const fantasyTakeaways = generateFantasyTakeaways(player, deltaRows, momentumScore, stability, tdDep);

  return (
    <div className="sc-usage" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} data-testid="usage-trends-tab">
      <SectionHeader title="Role and Usage Trends" subtitle="Weekly role evolution and efficiency signals" />

      {usageSummaryParas.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }} data-testid="section-usage-summary">
          <SectionHeader title="Role and Usage Summary" />
          {usageSummaryParas.map((p, i) => (
            <p key={i} style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--sc-text-muted, #94a3b8)', marginBottom: i < usageSummaryParas.length - 1 ? '12px' : 0 }}>{p}</p>
          ))}
        </div>
      )}

      <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="opportunity-momentum-card">
          <div className="flex items-center justify-between gap-3 flex-wrap" style={{ marginBottom: '16px' }}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: '#d4af37' }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0b3a7a', letterSpacing: '-0.01em' }}>Role Direction</p>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center cursor-help">
                      <Info className="w-3 h-3 text-muted-foreground/50" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[280px] text-xs leading-relaxed p-3">
                    <p className="font-semibold mb-1.5">What does this measure?</p>
                    <p className="mb-1">Measures whether a player's opportunity is expanding or shrinking compared to his season average.</p>
                    <p className="mb-2 text-muted-foreground">Compares the last 4 games to full-season usage across key workload indicators. Does not measure fantasy performance or talent — only usage trends.</p>
                    <div className="space-y-0.5 text-[10px]">
                      <p><span className="font-semibold text-emerald-500">80+</span> <span className="text-muted-foreground">Role expanding significantly</span></p>
                      <p><span className="font-semibold text-emerald-400">60–79</span> <span className="text-muted-foreground">Gradual expansion</span></p>
                      <p><span className="font-semibold text-amber-400">40–59</span> <span className="text-muted-foreground">Stable usage</span></p>
                      <p><span className="font-semibold text-red-400">0–39</span> <span className="text-muted-foreground">Shrinking opportunity</span></p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide ${momentumBg} ${momentumColor}`} data-testid="role-momentum-badge">
              {momentumScore >= 60 ? <TrendingUp className="w-3.5 h-3.5" /> : momentumScore <= 39 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              {momentumLabel}
            </div>
          </div>

          <div>
            <p className="text-4xl font-extrabold tabular-nums leading-none" style={{ color: momentumBarColor }} data-testid="text-momentum-score">
              {momentumScore}
              <span className="text-base font-semibold text-muted-foreground ml-1">/ 100</span>
            </p>
            <div className="mt-2" style={{ maxWidth: '220px' }}>
              <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${momentumScore}%`, background: `linear-gradient(90deg, ${momentumBarColor}88, ${momentumBarColor})` }} />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[8px] text-muted-foreground/50">0</span>
                <span className="text-[8px] text-muted-foreground/50">100</span>
              </div>
            </div>
            <p className={`text-[10px] mt-1 ${momentumColor}`} data-testid="text-momentum-micro">{momentumMicroText}</p>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(11,58,122,0.08), rgba(11,58,122,0.03), transparent)', margin: '20px 0' }} />

          <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '12px' }}>Signal Drivers</p>

          <div style={{ display: 'grid', gridTemplateColumns: position !== 'K' ? '1fr 1fr' : '1fr', gap: '12px' }}>
            <div style={{ background: 'rgba(11,58,122,0.03)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <p className="flex items-center justify-center gap-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
                Role Consistency
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex cursor-help"><Info className="w-2.5 h-2.5 text-muted-foreground/40" /></span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[270px] text-xs leading-relaxed p-3">
                      <p className="font-semibold mb-1.5">What does this measure?</p>
                      <p className="mb-1">Measures how steady a player's weekly workload is throughout the season.</p>
                      <p className="mb-2 text-muted-foreground">Evaluates how much opportunity fluctuates game-to-game, adjusted for what's normal at the position. Does not measure fantasy points — only usage stability.</p>
                      <div className="space-y-0.5 text-[10px] mb-2">
                        <p><span className="font-semibold text-emerald-500">70+</span> <span className="text-muted-foreground">Highly predictable weekly role</span></p>
                        <p><span className="font-semibold text-amber-400">45–69</span> <span className="text-muted-foreground">Moderate variance</span></p>
                        <p><span className="font-semibold text-red-400">&lt;45</span> <span className="text-muted-foreground">Volatile, game-script dependent</span></p>
                      </div>
                      <p className="text-[10px] text-muted-foreground/70 border-t border-border/30 pt-1.5">{position === 'QB' ? 'QB workload combines pass attempts and rushing attempts (rushes weighted for higher fantasy leverage).' : position === 'RB' ? 'RB workload combines carries and receiving targets.' : 'Based on weekly target volume.'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#d4af37', lineHeight: 1 }} className="tabular-nums" data-testid="text-stability-score">
                {stability}<span style={{ fontSize: '11px', fontWeight: 500, color: '#94a3b8', marginLeft: '3px' }}>/ 100</span>
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, marginTop: '4px' }} className={stabilityColor}>{stabilityLabel}</p>
              {stabilityMicroText && <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px' }} data-testid="text-stability-micro">{stabilityMicroText}</p>}
            </div>
            {position !== 'K' && (
              <div style={{ background: 'rgba(11,58,122,0.03)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>TD Dependency</p>
                <p style={{ fontSize: '22px', fontWeight: 800, color: '#0b3a7a', lineHeight: 1 }} className="tabular-nums" data-testid="text-td-dependency">
                  {tdDep.pct.toFixed(0)}%
                </p>
                <p style={{ fontSize: '10px', fontWeight: 600, marginTop: '4px' }} className={tdDep.pct < 20 ? 'text-emerald-500' : tdDep.pct >= 35 ? 'text-amber-400' : 'text-muted-foreground'}>{tdDep.label}</p>
              </div>
            )}
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(11,58,122,0.08), rgba(11,58,122,0.03), transparent)', margin: '20px 0' }} />

          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-xs" data-testid="table-momentum-deltas">
                <thead>
                  <tr className="text-muted-foreground/70">
                    <th className="text-left font-medium pb-2 pr-3 text-[10px]">Metric</th>
                    <th className="text-right font-medium pb-2 px-2 text-[10px]">Season</th>
                    <th className="text-right font-medium pb-2 px-2 text-[10px]">Last {RECENT_WINDOW}</th>
                    <th className="text-right font-medium pb-2 pl-2 text-[10px]">{'\u0394'}</th>
                  </tr>
                </thead>
                <tbody>
                  {playerRoleRows.map((row, i) => (
                    <tr key={i} className="border-t border-border/40">
                      <td className="py-1.5 pr-3 text-foreground/80 font-normal text-[11px]">
                        {row.label}
                        {row.key === 'target_share' && (
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex ml-1 align-middle cursor-help"><Info className="w-2.5 h-2.5 text-muted-foreground/30" /></span>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-[180px] text-xs">
                                Season total targets ÷ team total targets
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </td>
                      <td className="py-1.5 px-2 text-right tabular-nums text-muted-foreground/70 text-[11px]">{row.pct ? `${row.seasonAvg.toFixed(1)}%` : row.seasonAvg.toFixed(1)}</td>
                      <td className="py-1.5 px-2 text-right tabular-nums text-foreground/80 font-medium text-[11px]">{row.pct ? `${row.recentAvg.toFixed(1)}%` : row.recentAvg.toFixed(1)}</td>
                      <td className="py-1.5 pl-2 text-right"><DeltaCell delta={row.delta} pct={row.pct} /></td>
                    </tr>
                  ))}
                  {contextRows.length > 0 && (
                    <>
                      <tr><td colSpan={4} className="py-1"><div className="border-t border-dashed border-border/30" /><p className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium pt-1">Context</p></td></tr>
                      {contextRows.map((row, i) => (
                        <tr key={`ctx-${i}`} className="border-t border-border/20">
                          <td className="py-1.5 pr-3 text-muted-foreground/60 font-normal text-[11px] italic">{row.label}</td>
                          <td className="py-1.5 px-2 text-right tabular-nums text-muted-foreground/50 text-[11px]">{row.pct ? `${row.seasonAvg.toFixed(1)}%` : row.seasonAvg.toFixed(1)}</td>
                          <td className="py-1.5 px-2 text-right tabular-nums text-muted-foreground/60 font-medium text-[11px]">{row.pct ? `${row.recentAvg.toFixed(1)}%` : row.recentAvg.toFixed(1)}</td>
                          <td className="py-1.5 pl-2 text-right"><DeltaCell delta={row.delta} pct={row.pct} /></td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {microInsight && (
              <p className="text-[11px] text-muted-foreground/80 leading-relaxed pt-1 italic" data-testid="text-momentum-insight">
                {microInsight}
              </p>
            )}

            {position !== 'K' && (
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-[10px] text-muted-foreground/60">Production Type:</span>
                <Badge variant="outline" className={`text-[10px] ${tdDep.pct >= 35 ? 'border-amber-500/30 text-amber-500' : 'border-emerald-500/30 text-emerald-500'}`} data-testid="badge-production-type">
                  {tdDep.pct >= 35 ? <AlertTriangle className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                  {tdDep.tag}
                </Badge>
              </div>
            )}
          </div>
      </div>

      <SectionHeader title="Opportunity Trends" subtitle="Rolling analysis of volume and usage metrics" />

      <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="chart-target-share-trend">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <p className="text-sm text-foreground font-semibold">{chart1Cfg.label} per Week</p>
              <p className="text-[10px] text-muted-foreground/60">Gold line = 3-week rolling avg &middot; Dashed line = season avg</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-muted-foreground/60">Last 4:</span>
                <span className="font-bold tabular-nums text-foreground">{chart1Cfg.data.length >= 4 ? (chart1Cfg.data.slice(-4).reduce((a, b) => a + b, 0) / 4).toFixed(1) : '—'}{chart1Cfg.unit}</span>
                <span className="text-muted-foreground/40">|</span>
                <span className="text-muted-foreground/60">Season:</span>
                <span className="font-bold tabular-nums text-foreground">{chart1Cfg.avg.toFixed(1)}{chart1Cfg.unit}</span>
              </div>
              {(position === 'WR' || position === 'TE') && (
                <div className="flex rounded-md border border-border overflow-hidden" data-testid="trend-view-toggle">
                  {([
                    { key: 'share' as const, label: 'Share' },
                    { key: 'raw' as const, label: 'Raw Tgt' },
                    { key: 'pct' as const, label: '% Team' },
                  ]).map(opt => (
                    <button
                      key={opt.key}
                      className={`px-2.5 py-1 text-[10px] font-medium transition-colors ${trendView === opt.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
                      onClick={() => setTrendView(opt.key)}
                      data-testid={`btn-trend-${opt.key}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {chart1Cfg.data.length >= 2 && (
            <LineChartSVG
              data={chart1Cfg.data}
              rollingAvg={chart1Cfg.rolling}
              height={170}
              label={`trend-${trendView}`}
              accentColor="#0b3a7a"
              showAvgLine={true}
              highlightLast={Math.min(4, chart1Cfg.data.length)}
              showRecentFormLabel={true}
              thickLine={true}
            />
          )}
      </div>

      <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="chart-volume-context">
          {(() => {
            const teamAvg = teamPassAtt.length > 0 ? teamPassAtt.reduce((a, b) => a + b, 0) / teamPassAtt.length : 0;
            const teamL4 = teamPassAtt.length >= 4 ? teamPassAtt.slice(-4).reduce((a, b) => a + b, 0) / 4 : teamAvg;
            const playerAvg = playerVolume.length > 0 ? playerVolume.reduce((a, b) => a + b, 0) / playerVolume.length : 0;
            const playerL4 = playerVolume.length >= 4 ? playerVolume.slice(-4).reduce((a, b) => a + b, 0) / 4 : playerAvg;
            const teamDeltaPct = teamAvg > 0 ? ((teamL4 - teamAvg) / teamAvg) * 100 : 0;
            const playerDeltaPct = playerAvg > 0 ? ((playerL4 - playerAvg) / playerAvg) * 100 : 0;
            const teamDown = teamDeltaPct < -5;
            const teamStable = Math.abs(teamDeltaPct) <= 5;
            const playerDown = playerDeltaPct < -5;
            const playerStable = Math.abs(playerDeltaPct) <= 5;
            let volDiagnosis = '';
            let volDiagColor = 'text-muted-foreground';
            if (teamDown && playerDown && playerStable === false) {
              volDiagnosis = 'Team-Driven Decline';
              volDiagColor = 'text-amber-400';
            } else if (teamStable && playerDown) {
              volDiagnosis = 'Role Contraction';
              volDiagColor = 'text-red-400';
            } else if (teamDown && playerStable) {
              volDiagnosis = 'Absorbing Share';
              volDiagColor = 'text-emerald-500';
            } else if (teamStable && playerStable) {
              volDiagnosis = 'Stable Volume';
              volDiagColor = 'text-muted-foreground';
            } else if (playerDeltaPct > 5) {
              volDiagnosis = 'Volume Expansion';
              volDiagColor = 'text-emerald-500';
            } else {
              volDiagnosis = 'Mixed Signals';
              volDiagColor = 'text-muted-foreground';
            }
            return (
              <>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-xs text-foreground font-medium">Volume Context</p>
                    <p className="text-[10px] text-muted-foreground/60">
                      {position === 'QB' ? 'Pass attempts per week' : position === 'RB' ? 'Team targets vs player touches' : 'Team pass attempts vs player targets'} &middot; Dual overlay
                    </p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${volDiagColor} border-current/20`} data-testid="badge-volume-diagnosis">
                    {volDiagnosis}
                  </Badge>
                </div>
                {teamPassAtt.length >= 2 && (() => {
                  const allVals = [...teamPassAtt, ...playerVolume];
                  const maxVal = Math.max(...allVals, 1);
                  const h = 140;
                  const pad = { top: 10, bottom: 24, left: 0, right: 0 };
                  const chartH = h - pad.top - pad.bottom;
                  const viewW = 400;
                  const toP = (val: number, i: number, len: number) => ({
                    x: pad.left + (i / (len - 1)) * (viewW - pad.left - pad.right),
                    y: pad.top + chartH - (val / maxVal) * chartH,
                  });
                  const makePath = (d: number[]) => d.map((v, i) => `${i === 0 ? 'M' : 'L'}${toP(v, i, d.length).x},${toP(v, i, d.length).y}`).join(' ');
                  const makeArea = (d: number[]) => {
                    const pts = d.map((v, i) => toP(v, i, d.length));
                    return `${makePath(d)} L${pts[pts.length - 1].x},${pad.top + chartH} L${pts[0].x},${pad.top + chartH} Z`;
                  };
                  return (
                    <svg viewBox={`0 0 ${viewW} ${h}`} className="w-full" style={{ height: h }} preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="vol-team-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="vol-player-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0b3a7a" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#0b3a7a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={makeArea(teamPassAtt)} fill="url(#vol-team-fill)" />
                      <path d={makePath(teamPassAtt)} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
                      <path d={makePath(teamPassAttRolling)} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" strokeLinejoin="round" />
                      <path d={makeArea(playerVolume)} fill="url(#vol-player-fill)" />
                      <path d={makePath(playerVolume)} fill="none" stroke="#0b3a7a" strokeWidth="1.5" opacity="0.4" />
                      <path d={makePath(playerVolumeRolling)} fill="none" stroke="#0b3a7a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                      {playerVolume.map((v, i) => {
                        const p = toP(v, i, playerVolume.length);
                        return <circle key={i} cx={p.x} cy={p.y} r="2" fill="#0b3a7a" opacity="0.4" />;
                      })}
                      <text x={toP(0, 0, teamPassAtt.length).x} y={h - 4} textAnchor="start" className="fill-muted-foreground" fontSize="10">Wk 1</text>
                      <text x={toP(0, teamPassAtt.length - 1, teamPassAtt.length).x} y={h - 4} textAnchor="end" className="fill-muted-foreground" fontSize="10">Wk {teamPassAtt.length}</text>
                    </svg>
                  );
                })()}
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 rounded" style={{ background: 'hsl(var(--muted-foreground))' }} /> {position === 'RB' ? 'Team Targets' : 'Team Pass Att'}</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 rounded" style={{ background: '#0b3a7a' }} /> {position === 'QB' ? 'Pass Att' : position === 'RB' ? 'Carries + Targets' : 'Player Targets'}</span>
                </div>
              </>
            );
          })()}
      </div>

      {position !== 'K' && (
        <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="chart-td-dependency-overlay">
            {(() => {
              const weeklyTdPct = weeklyPts.map((pts, i) => pts > 0 ? (weeklyTdPts[i] / pts) * 100 : 0);
              const tdPctRolling = computeRollingAvg(weeklyTdPct, 3);
              const avgTdPct = weeklyTdPct.length > 0 ? weeklyTdPct.reduce((a, b) => a + b, 0) / weeklyTdPct.length : 0;
              const highTdWeeks = weeklyTdPct.filter(p => p >= 40).length;
              return (
                <>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-xs text-foreground font-medium">Scoring Composition</p>
                      <p className="text-[10px] text-muted-foreground/60">TD points as % of total fantasy output &middot; Weeks &ge;40% highlighted</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground/60">Avg TD%:</span>
                      <span className={`font-bold tabular-nums ${avgTdPct >= 35 ? 'text-amber-400' : 'text-foreground'}`}>{avgTdPct.toFixed(0)}%</span>
                      <span className="text-muted-foreground/40">|</span>
                      <span className="text-muted-foreground/60">&ge;40% weeks:</span>
                      <span className={`font-bold tabular-nums ${highTdWeeks >= 3 ? 'text-amber-400' : 'text-foreground'}`}>{highTdWeeks}/{weeklyTdPct.length}</span>
                    </div>
                  </div>
                  {weeklyTdPct.length >= 2 && (() => {
                    const h = 140;
                    const pad = { top: 10, bottom: 24, left: 0, right: 0 };
                    const chartH = h - pad.top - pad.bottom;
                    const viewW = 400;
                    const maxPct = 100;
                    const toP = (val: number, i: number) => ({
                      x: pad.left + (i / (weeklyTdPct.length - 1)) * (viewW - pad.left - pad.right),
                      y: pad.top + chartH - (Math.min(val, maxPct) / maxPct) * chartH,
                    });
                    const makePath = (d: number[]) => d.map((v, i) => `${i === 0 ? 'M' : 'L'}${toP(v, i).x},${toP(v, i).y}`).join(' ');
                    const threshold40Y = pad.top + chartH - (40 / maxPct) * chartH;
                    return (
                      <svg viewBox={`0 0 ${viewW} ${h}`} className="w-full" style={{ height: h }} preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="tdpct-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <rect x={0} y={pad.top} width={viewW} height={threshold40Y - pad.top} fill="#f59e0b" opacity="0.03" />
                        <line x1={0} y1={threshold40Y} x2={viewW} y2={threshold40Y} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" opacity="0.25" />
                        <text x={viewW - 6} y={threshold40Y - 4} textAnchor="end" fill="#f59e0b" fontSize="8" opacity="0.4">40% threshold</text>
                        {(() => {
                          const pts = weeklyTdPct.map((v, i) => toP(v, i));
                          const areaPath = `${makePath(weeklyTdPct)} L${pts[pts.length - 1].x},${pad.top + chartH} L${pts[0].x},${pad.top + chartH} Z`;
                          return <path d={areaPath} fill="url(#tdpct-fill)" />;
                        })()}
                        <path d={makePath(weeklyTdPct)} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
                        <path d={makePath(tdPctRolling)} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        {weeklyTdPct.map((v, i) => {
                          const p = toP(v, i);
                          const isHigh = v >= 40;
                          return (
                            <Fragment key={i}>
                              {isHigh && <circle cx={p.x} cy={p.y} r="6" fill="#f59e0b" opacity="0.12" />}
                              <circle cx={p.x} cy={p.y} r={isHigh ? 3.5 : 2} fill={isHigh ? '#f59e0b' : '#f59e0b'} opacity={isHigh ? 0.8 : 0.35} />
                            </Fragment>
                          );
                        })}
                        <text x={toP(0, 0).x} y={h - 4} textAnchor="start" className="fill-muted-foreground" fontSize="10">Wk 1</text>
                        <text x={toP(0, weeklyTdPct.length - 1).x} y={h - 4} textAnchor="end" className="fill-muted-foreground" fontSize="10">Wk {weeklyTdPct.length}</text>
                      </svg>
                    );
                  })()}
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 rounded" style={{ background: '#f59e0b' }} /> TD% of FPTS (3-wk rolling)</span>
                    <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} /> &ge;40% TD-driven week</span>
                  </div>
                </>
              );
            })()}
        </div>
      )}

      {(() => {
        const last4Entries = activeEntries.slice(-4);
        const l4pTgt = last4Entries.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0);
        const l4tTgt = last4Entries.reduce((s, e) => s + getStat(e, 'team_tgt'), 0);
        const last4Share = activeEntries.length >= 4 && l4tTgt > 0
          ? (l4pTgt / l4tTgt) * 100
          : null;
        const seasonShare = weightedSeasonShare;
        const last4Team = activeEntries.length >= 4
          ? activeEntries.slice(-4).reduce((s, e) => s + getStat(e, 'team_tgt'), 0) / 4
          : null;
        const seasonTeam = activeEntries.length > 0
          ? activeEntries.reduce((s, e) => s + getStat(e, 'team_tgt'), 0) / activeEntries.length
          : 0;

        let shiftSummary = '';
        if (last4Share !== null && last4Team !== null && activeEntries.length >= 5) {
          const shareDelta = last4Share - seasonShare;
          const teamDelta = seasonTeam > 0 ? ((last4Team - seasonTeam) / seasonTeam) * 100 : 0;

          if (position === 'QB') {
            const last4Att = activeEntries.slice(-4).reduce((s, e) => s + getStat(e, 'pass_att'), 0) / 4;
            const seasonAtt = activeEntries.reduce((s, e) => s + getStat(e, 'pass_att'), 0) / activeEntries.length;
            const attDelta = seasonAtt > 0 ? ((last4Att - seasonAtt) / seasonAtt) * 100 : 0;
            if (Math.abs(attDelta) < 3) {
              shiftSummary = `Pass attempts have remained stable over the last 4 games (${last4Att.toFixed(0)}/gm vs ${seasonAtt.toFixed(0)}/gm season avg), indicating a consistent offensive scheme.`;
            } else if (attDelta > 0) {
              shiftSummary = `Pass attempts have increased ${attDelta.toFixed(0)}% over the last 4 games (${last4Att.toFixed(0)}/gm vs ${seasonAtt.toFixed(0)}/gm), suggesting expanded aerial involvement.`;
            } else {
              shiftSummary = `Pass attempts have declined ${Math.abs(attDelta).toFixed(0)}% over the last 4 games (${last4Att.toFixed(0)}/gm vs ${seasonAtt.toFixed(0)}/gm), indicating a potential shift toward the run game.`;
            }
          } else if (position === 'RB') {
            const last4Carries = activeEntries.slice(-4).reduce((s, e) => s + getStat(e, 'rush_att'), 0) / 4;
            const seasonCarries = activeEntries.reduce((s, e) => s + getStat(e, 'rush_att'), 0) / activeEntries.length;
            const carriesDelta = seasonCarries > 0 ? ((last4Carries - seasonCarries) / seasonCarries) * 100 : 0;
            const last4Tgt = activeEntries.slice(-4).reduce((s, e) => s + getStat(e, 'rec_tgt'), 0) / 4;
            const seasonTgt = activeEntries.reduce((s, e) => s + getStat(e, 'rec_tgt'), 0) / activeEntries.length;
            const tgtDelta = seasonTgt > 0 ? ((last4Tgt - seasonTgt) / seasonTgt) * 100 : 0;
            if (Math.abs(carriesDelta) < 5 && Math.abs(tgtDelta) < 10) {
              shiftSummary = `Carries (${last4Carries.toFixed(1)}/gm) and targets (${last4Tgt.toFixed(1)}/gm) have remained stable over the last 4 games, indicating a consistent backfield role.`;
            } else if (carriesDelta > 5 && tgtDelta > 10) {
              shiftSummary = `Both carries (${last4Carries.toFixed(1)}/gm vs ${seasonCarries.toFixed(1)}/gm) and targets (${last4Tgt.toFixed(1)}/gm vs ${seasonTgt.toFixed(1)}/gm) have increased over the last 4 games, suggesting an expanding three-down role.`;
            } else if (carriesDelta > 5) {
              shiftSummary = `Carries have increased ${carriesDelta.toFixed(0)}% over the last 4 games (${last4Carries.toFixed(1)}/gm vs ${seasonCarries.toFixed(1)}/gm season avg)${Math.abs(tgtDelta) > 10 ? `, while targets have ${tgtDelta > 0 ? 'also risen' : 'declined'}` : ', with receiving work holding steady'}.`;
            } else if (carriesDelta < -5) {
              shiftSummary = `Carries have declined ${Math.abs(carriesDelta).toFixed(0)}% over the last 4 games (${last4Carries.toFixed(1)}/gm vs ${seasonCarries.toFixed(1)}/gm)${tgtDelta > 10 ? ', though targets have increased, suggesting a shift toward a passing-down role' : ', indicating reduced ground-game involvement'}.`;
            } else {
              shiftSummary = `Carry volume has been stable at ${last4Carries.toFixed(1)}/gm while targets have ${tgtDelta > 0 ? 'risen' : 'declined'} ${Math.abs(tgtDelta).toFixed(0)}% over the last 4 games (${last4Tgt.toFixed(1)}/gm vs ${seasonTgt.toFixed(1)}/gm).`;
            }
          } else if (Math.abs(shareDelta) < 2 && Math.abs(teamDelta) < 5) {
            shiftSummary = `Target share has remained stable at ${last4Share.toFixed(1)}% over the last 4 games (season avg ${seasonShare.toFixed(1)}%). Team volume is also steady.`;
          } else if (shareDelta <= -2 && shareDelta > -5 && Math.abs(teamDelta) < 5) {
            shiftSummary = `Target share has dipped modestly from ${seasonShare.toFixed(1)}% to ${last4Share.toFixed(1)}% over the last 4 games despite stable team pass volume, suggesting a minor role shift.`;
          } else if (shareDelta <= -5) {
            if (teamDelta < -5) {
              const teamContrib = teamDelta !== 0 ? Math.min(100, Math.round(Math.abs(teamDelta) / (Math.abs(teamDelta) + Math.abs(shareDelta) * 5) * 100)) : 0;
              shiftSummary = `Over the last 4 games, target share has dropped from ${seasonShare.toFixed(1)}% to ${last4Share.toFixed(1)}%, while team pass volume also declined ${Math.abs(teamDelta).toFixed(0)}%. Reduced team volume accounts for roughly ${teamContrib}% of the usage dip.`;
            } else {
              shiftSummary = `Target share has declined significantly from ${seasonShare.toFixed(1)}% to ${last4Share.toFixed(1)}% despite stable team pass volume, indicating a potential loss of role rather than offensive slowdown.`;
            }
          } else if (shareDelta <= -2 && teamDelta < -5) {
            const teamContrib = teamDelta !== 0 ? Math.min(100, Math.round(Math.abs(teamDelta) / (Math.abs(teamDelta) + Math.abs(shareDelta) * 5) * 100)) : 0;
            shiftSummary = `Target share has dipped from ${seasonShare.toFixed(1)}% to ${last4Share.toFixed(1)}%, coinciding with a ${Math.abs(teamDelta).toFixed(0)}% decline in team pass volume. Reduced team volume accounts for roughly ${teamContrib}% of the usage dip.`;
          } else if (shareDelta >= 5) {
            shiftSummary = `Target share has risen significantly from ${seasonShare.toFixed(1)}% to ${last4Share.toFixed(1)}% over the last 4 games${teamDelta < -3 ? ' even as team volume declined' : ''}, suggesting a rapidly expanding role in the offense.`;
          } else if (shareDelta >= 2) {
            shiftSummary = `Target share has risen from ${seasonShare.toFixed(1)}% to ${last4Share.toFixed(1)}% over the last 4 games${teamDelta < -3 ? ' even as team volume declined' : ''}, suggesting an expanding role in the offense.`;
          } else if (Math.abs(shareDelta) < 2 && teamDelta < -5) {
            shiftSummary = `Target share has held steady at ${last4Share.toFixed(1)}% despite a ${Math.abs(teamDelta).toFixed(0)}% decline in team pass volume, indicating the player is absorbing a larger proportion of a shrinking passing offense.`;
          } else {
            shiftSummary = `Target share sits at ${last4Share.toFixed(1)}% over the last 4 games vs ${seasonShare.toFixed(1)}% season average. Team volume has shifted ${teamDelta > 0 ? 'up' : 'down'} ${Math.abs(teamDelta).toFixed(0)}%.`;
          }
        }

        if (!shiftSummary) return null;

        return (
          <div className="sc-card" style={{ padding: '20px 28px' }} data-testid="usage-shift-summary">
              <div className="flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 shrink-0" style={{ color: '#d4af37', marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0b3a7a', marginBottom: '4px' }}>Usage Shift Summary</p>
                  <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6 }} data-testid="text-shift-summary">{shiftSummary}</p>
                </div>
              </div>
          </div>
        );
      })()}

      {roleStabilityData.cards.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }} data-testid="section-role-stability-risk">
          <SectionHeader title="Role Stability and Risk" subtitle="How consistent and sustainable this player's usage and scoring profile is right now." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
            {roleStabilityData.cards.map((card, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '12px 14px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{card.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: card.color, marginBottom: card.sub ? '2px' : '0' }}>{card.value}</p>
                {card.sub && <p style={{ fontSize: '10px', color: '#64748b' }}>{card.sub}</p>}
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '8px', padding: '12px 14px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6366f1', marginBottom: '6px' }}>Insight</p>
            <p style={{ fontSize: '13px', color: 'var(--foreground)', lineHeight: '1.65' }} data-testid="text-role-stability-insight">{roleStabilityData.insight}</p>
          </div>
        </div>
      )}

      {position !== 'K' && activeEntries.length >= 3 && (() => {
        const gp = activeEntries.length;
        const stat = (key: string) => activeEntries.reduce((sum, e) => sum + getStat(e, key), 0);

        const isQB = position === 'QB';
        const isRB = position === 'RB';

        const tgtsPerGame = isQB ? stat('pass_att') / gp : (isRB ? (stat('rush_att') + stat('rec_tgt')) / gp : stat('rec_tgt') / gp);
        const shareAvg = isQB ? 0 : weightedSeasonShare;
        const usageStab = stability;

        let yardsPerOpp: number;
        let catchPct: number;
        let tdPerOpp: number;

        if (isQB) {
          const passAtt = stat('pass_att') || 1;
          const qbUsage = passAtt + 2 * stat('rush_att');
          yardsPerOpp = activeEntries.reduce((sum, e) => sum + fpts(e, format), 0) / (qbUsage || 1);
          catchPct = passAtt > 0 ? (stat('pass_cmp') / passAtt) * 100 : 0;
          tdPerOpp = (stat('pass_td') / passAtt) * 100;
        } else if (isRB) {
          const totalTouches = stat('rush_att') + stat('rec') || 1;
          yardsPerOpp = (stat('rush_yd') + stat('rec_yd')) / totalTouches;
          catchPct = stat('rec_tgt') > 0 ? (stat('rec') / stat('rec_tgt')) * 100 : 0;
          tdPerOpp = ((stat('rush_td') + stat('rec_td')) / totalTouches) * 100;
        } else {
          const targets = stat('rec_tgt') || 1;
          const catches = stat('rec') || 1;
          yardsPerOpp = stat('rec_yd') / catches;
          catchPct = (stat('rec') / targets) * 100;
          tdPerOpp = (stat('rec_td') / targets) * 100;
        }

        const totalPts = activeEntries.reduce((sum, e) => sum + fpts(e, format), 0);
        let tdPts = 0;
        let yardagePts = 0;
        let recPts = 0;
        if (isQB) {
          tdPts = stat('pass_td') * 4 + stat('rush_td') * 6;
          yardagePts = stat('pass_yd') * 0.04 + stat('rush_yd') * 0.1;
          recPts = 0;
        } else {
          tdPts = (stat('rec_td') + stat('rush_td')) * 6;
          yardagePts = stat('rec_yd') * 0.1 + stat('rush_yd') * 0.1;
          recPts = format === 'ppr' ? stat('rec') * 1 : format === 'half' ? stat('rec') * 0.5 : 0;
        }
        const componentTotal = tdPts + yardagePts + recPts;
        const normFactor = componentTotal > 0 ? 100 / componentTotal : 0;
        const tdPctBar = tdPts * normFactor;
        const yardPctBar = yardagePts * normFactor;
        const recPctBar = recPts * normFactor;
        const otherPctBar = 0;
        const { high: tdHighThreshold, mid: tdMidThreshold } = getTdThresholds(position);
        const tdIsHigh = tdPctBar >= tdHighThreshold;

        const isTE = position === 'TE';
        const volumeScore = (() => {
          let score = 50;
          if (isQB) {
            const attPerGame = stat('pass_att') / gp;
            score += Math.min(15, (attPerGame - 28) * 2);
            score += Math.min(10, (usageStab - 50) * 0.2);
          } else if (isRB) {
            score += Math.min(15, (tgtsPerGame - 15) * 1.5);
            score += Math.min(10, (usageStab - 50) * 0.2);
          } else if (isTE) {
            score += Math.min(15, (shareAvg - 8) * 1.5);
            score += Math.min(10, (tgtsPerGame - 3) * 3);
            score += Math.min(10, (usageStab - 50) * 0.2);
          } else {
            score += Math.min(15, (shareAvg - 15) * 1);
            score += Math.min(10, (tgtsPerGame - 5) * 2);
            score += Math.min(10, (usageStab - 50) * 0.2);
          }
          return Math.max(0, Math.min(100, Math.round(score)));
        })();

        const bench = player.productionRiskBenchmarks as Record<string, any> | null;
        const tdRateLg = bench?.posAvg?.tdPerTarget ?? (isQB ? 4.5 : isRB ? 3.0 : position === 'TE' ? 4.0 : 5.0);
        const yptLg = isQB
          ? (bench?.posAvg?.fpPerUsage ?? 0.55)
          : (bench?.posAvg?.yardsPerCatch ?? (isRB ? 4.2 : position === 'TE' ? 8.0 : 11.0));
        const catchLgBench = bench?.posAvg?.catchPct ?? (isQB ? 64 : isRB ? 75 : position === 'TE' ? 68 : 65);

        const efficiencyScore = (() => {
          let score = 50;
          if (isQB) {
            score += (catchPct - (catchLgBench)) * 0.8;
            score += (yardsPerOpp - (yptLg || 0.55)) * 80;
            score += (tdPerOpp - tdRateLg) * 3;
          } else if (isRB) {
            score += (yardsPerOpp - yptLg) * 5;
            score += (catchPct - catchLgBench) * 0.3;
            score += (tdPerOpp - tdRateLg) * 4;
          } else {
            score += (yardsPerOpp - yptLg) * 2;
            score += (catchPct - catchLgBench) * 0.5;
            score += (tdPerOpp - tdRateLg) * 3;
          }
          return Math.max(0, Math.min(100, Math.round(score)));
        })();

        const productionDriver = volumeScore > efficiencyScore + 15
          ? { label: 'Volume-Backed', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' }
          : efficiencyScore > volumeScore + 15
            ? { label: 'Efficiency-Driven', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' }
            : { label: 'Balanced', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
        const shareStabAvg = 55;

        const leagueTdStdDev = bench?.posStdDev?.tdPerTarget ?? 1;

        const posMedianTdPct = isQB ? 41 : isRB ? 23 : isTE ? 19 : 18;
        const tdDepFactor = Math.max(0.3, Math.min(1.5, tdPctBar / posMedianTdPct));
        const tdZScore = leagueTdStdDev > 0 ? (tdPerOpp - tdRateLg) / leagueTdStdDev : 0;
        const absTdZ = Math.abs(tdZScore);
        const convexTdZ = absTdZ > 1 ? Math.sign(tdZScore) * (1 + (absTdZ - 1) * 1.8) : tdZScore;
        const rawTdSignal = convexTdZ * (isQB ? 7 : 9) * tdDepFactor;
        const tdRateSignal = rawTdSignal > 0
          ? Math.min(25, rawTdSignal)
          : Math.max(-12, rawTdSignal);

        const fpuStdDev = bench?.posStdDev?.fpPerUsage ?? 1;
        const qbYardsOnlyPerUsage = isQB ? (() => {
          const yardPtsOnly = activeEntries.reduce((sum, e) => {
            const s = e.stats as Record<string, number>;
            return sum + ((s.pass_yd || 0) * 0.04) + ((s.rush_yd || 0) * 0.1) + ((s.rec_yd || 0) * 0.1);
          }, 0);
          const passAtt = stat('pass_att') || 1;
          const qbUsage = passAtt + 2 * stat('rush_att');
          return yardPtsOnly / (qbUsage || 1);
        })() : 0;
        const qbYardsOnlyLg = 0.275;
        const yptSignal = isQB
          ? Math.max(-20, Math.min(20, (fpuStdDev > 0 ? ((qbYardsOnlyPerUsage - qbYardsOnlyLg) / fpuStdDev) : 0) * 12))
          : Math.max(-20, Math.min(20, (yardsPerOpp - yptLg) * 2.5));
        const stabSignal = Math.max(-12, Math.min(12, (usageStab - shareStabAvg) * 0.3));
        const volSignal = Math.max(-10, Math.min(10, (volumeScore - 50) * 0.25));

        let rushFloorSignal = 0;
        if (isQB) {
          const rushAttPerGame = activeEntries.reduce((s, e) => s + getStat(e, 'rush_att'), 0) / gp;
          rushFloorSignal = Math.max(0, Math.min(10, (rushAttPerGame - 4) * 2));
        }

        const rawSustainability = 57 - tdRateSignal + yptSignal + stabSignal + volSignal + rushFloorSignal;
        const sustainabilityScore = Math.max(0, Math.min(100, Math.round(rawSustainability)));

        const sustainLabel = sustainabilityScore >= 70 ? 'Sustainable' : sustainabilityScore >= 40 ? 'Moderate Risk' : 'Elevated Risk';
        const sustainColor = sustainabilityScore >= 70 ? 'text-emerald-500' : sustainabilityScore >= 40 ? 'text-amber-400' : 'text-red-400';
        const sustainBg = sustainabilityScore >= 70 ? 'bg-emerald-500/10' : sustainabilityScore >= 40 ? 'bg-amber-500/10' : 'bg-red-500/10';
        const sustainIcon = sustainabilityScore >= 70 ? <Shield className="w-3.5 h-3.5 text-emerald-500" /> : sustainabilityScore >= 40 ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;

        let insightSentence = '';
        if (tdIsHigh && shareAvg < 18 && !isQB) {
          insightSentence = `Despite ${shareAvg > 0 ? `a modest ${shareAvg.toFixed(1)}% target share` : 'limited usage volume'}, scoring remains elevated through a ${tdPerOpp.toFixed(1)}% TD rate that exceeds the positional average (${tdRateLg.toFixed(1)}%). This efficiency-driven profile carries meaningful regression risk if touchdown rate normalizes.`;
        } else if (tdIsHigh && isQB) {
          insightSentence = `A ${tdPerOpp.toFixed(1)}% TD rate accounts for ${tdPctBar.toFixed(0)}% of fantasy output. ${tdPerOpp > tdRateLg + 1 ? `This exceeds the positional baseline (${tdRateLg.toFixed(1)}%) and historically trends toward mean reversion, introducing downside risk.` : `This rate tracks near the positional baseline (${tdRateLg.toFixed(1)}%), providing relative stability in the scoring profile.`}`;
        } else if (volumeScore > efficiencyScore + 15) {
          insightSentence = `Production is anchored by ${isQB ? 'sustained pass volume' : isRB ? 'a commanding touch share' : `a ${shareAvg.toFixed(1)}% target share`} rather than elevated efficiency, reducing regression exposure. Volume-backed profiles historically maintain more stable week-to-week output.`;
        } else if (efficiencyScore > volumeScore + 15 && tdPerOpp > tdRateLg + 1) {
          insightSentence = `Efficiency metrics${!isQB ? ` (${yardsPerOpp.toFixed(1)} yds/${isRB ? 'touch' : 'catch'})` : ''} and a ${tdPerOpp.toFixed(1)}% TD rate both exceed positional baselines. With ${isQB ? 'pass volume' : 'usage volume'} below elite thresholds, scoring is disproportionately dependent on efficiency sustaining above-average levels.`;
        } else if (usageStab >= 70) {
          insightSentence = `Highly consistent week-to-week usage (stability: ${usageStab}/100) paired with ${tdPctBar < tdMidThreshold ? 'low TD reliance' : 'moderate TD reliance'} establishes a reliable floor. ${sustainabilityScore >= 60 ? 'The balanced profile supports sustained production.' : 'Upside remains capped by volume limitations.'}`;
        } else {
          insightSentence = `${isQB ? 'Passing volume' : isRB ? 'Touch volume' : 'Target share'} ${usageStab >= 50 ? 'has been reasonably stable' : 'has shown inconsistency'}, while ${tdPctBar >= tdMidThreshold ? `${tdPctBar.toFixed(0)}% TD dependency introduces scoring fragility in weeks without touchdowns` : 'a diversified scoring profile across yardage and volume reduces single-variable risk'}.`;
        }

        return (
          <>
            <SectionHeader title="Production Risk" subtitle="Volume vs efficiency drivers and sustainability signals" />

            <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="volume-vs-efficiency">
                <div className="flex items-center gap-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Volume vs Efficiency Driver</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground/40 cursor-help" data-testid="icon-volume-efficiency-info" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[220px] text-[10px]">
                        <p>Compares opportunity volume (touches, targets) against efficiency metrics to identify what drives production and where regression risk lies.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Volume Engine</p>
                    <div>
                      <p className="text-[10px] text-muted-foreground">{isQB ? 'Att/Game' : isRB ? 'Touches/Game' : 'Targets/Game'}</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{tgtsPerGame.toFixed(1)}</p>
                    </div>
                    {!isQB && (
                      <div>
                        <p className="text-[10px] text-muted-foreground">{isRB ? 'Touch Share' : 'Target Share (Team)'}</p>
                        <p className="text-sm font-bold text-foreground tabular-nums">{shareAvg.toFixed(1)}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-muted-foreground">Role Consistency</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{usageStab}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Efficiency Engine</p>
                    <div>
                      <p className="text-[10px] text-muted-foreground">{isQB ? 'Yards/Att' : isRB ? 'Yards/Touch' : 'Yards/Catch'}</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{yardsPerOpp.toFixed(1)}</p>
                      {(() => {
                        const delta = yardsPerOpp - yptLg;
                        const isUp = delta > 0.3;
                        const isDown = delta < -0.3;
                        return (
                          <>
                            <p className={`text-[9px] ${isUp ? 'text-emerald-500' : isDown ? 'text-red-400' : 'text-muted-foreground/60'}`}>
                              {isUp ? '\u2191' : isDown ? '\u2193' : '\u2248'} {isUp ? '+' : ''}{delta.toFixed(1)} vs Pos Avg ({yptLg.toFixed(1)})
                            </p>
                            {bench?.percentile?.yardsPerCatch != null && (
                              <p className="text-[8px] text-muted-foreground/50">{bench.percentile.yardsPerCatch}th percentile</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">{isQB ? 'Completion %' : 'Catch %'}</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{catchPct.toFixed(1)}%</p>
                      {(() => {
                        const delta = catchPct - catchLgBench;
                        const isUp = delta > 1;
                        const isDown = delta < -1;
                        return (
                          <>
                            <p className={`text-[9px] ${isUp ? 'text-emerald-500' : isDown ? 'text-red-400' : 'text-muted-foreground/60'}`}>
                              {isUp ? '\u2191' : isDown ? '\u2193' : '\u2248'} {isUp ? '+' : ''}{delta.toFixed(1)}% vs Pos Avg ({catchLgBench.toFixed(1)}%)
                            </p>
                            {bench?.percentile?.catchPct != null && (
                              <p className="text-[8px] text-muted-foreground/50">{bench.percentile.catchPct}th percentile</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">{isQB ? 'TD/Att Rate' : isRB ? 'TD/Touch Rate' : 'TD/Target Rate'}</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{tdPerOpp.toFixed(1)}%</p>
                      {(() => {
                        const delta = tdPerOpp - tdRateLg;
                        const isUp = delta > 0.3;
                        const isDown = delta < -0.3;
                        return (
                          <>
                            <p className={`text-[9px] ${isUp ? 'text-emerald-500' : isDown ? 'text-red-400' : 'text-muted-foreground/60'}`}>
                              {isUp ? '\u2191' : isDown ? '\u2193' : '\u2248'} {isUp ? '+' : ''}{delta.toFixed(1)}% vs Pos Avg ({tdRateLg.toFixed(1)}%)
                            </p>
                            {bench?.percentile?.tdPerTarget != null && (
                              <p className="text-[8px] text-muted-foreground/50">{bench.percentile.tdPerTarget}th percentile</p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground/60">Production Driver:</span>
                    <Badge variant="outline" className={`text-[10px] px-2.5 py-0.5 ${productionDriver.bg} ${productionDriver.color}`} data-testid="badge-production-driver">
                      {productionDriver.label === 'Volume-Backed' ? <TrendingUp className="w-3 h-3 mr-1" /> : productionDriver.label === 'Balanced' ? <Activity className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                      {productionDriver.label}
                    </Badge>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex cursor-help"><Info className="w-2.5 h-2.5 text-muted-foreground/40" /></span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-[240px] text-xs leading-relaxed p-3">
                          <p className="font-semibold mb-1">Production Driver</p>
                          <p className="text-muted-foreground">{productionDriver.label === 'Volume-Backed' ? 'Scoring is anchored by workload volume rather than elevated efficiency. Lower regression risk.' : productionDriver.label === 'Efficiency-Driven' ? 'Scoring exceeds what workload alone would produce. If efficiency normalizes toward league averages, production may decline.' : 'A mix of volume and efficiency — neither dominates the scoring profile.'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
            </div>

            <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="td-dependency-breakdown">
                <div className="flex items-center gap-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">TD Dependency Breakdown</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground/40 cursor-help" data-testid="icon-td-dependency-info" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[200px] text-[10px]">
                        <p>TD dependency above 35% may increase weekly volatility and regression risk.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <div className="flex h-6 rounded-full overflow-hidden border border-border" data-testid="bar-td-breakdown">
                    {tdPctBar > 0 && (
                      <div
                        className="flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ width: `${tdPctBar}%`, background: '#d97706' }}
                      >
                        {tdPctBar >= 15 ? `${tdPctBar.toFixed(0)}%` : ''}
                      </div>
                    )}
                    {yardPctBar > 0 && (
                      <div
                        className="flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ width: `${yardPctBar}%`, background: '#6366f1' }}
                      >
                        {yardPctBar >= 15 ? `${yardPctBar.toFixed(0)}%` : ''}
                      </div>
                    )}
                    {recPctBar > 0 && (
                      <div
                        className="flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ width: `${recPctBar}%`, background: '#059669' }}
                      >
                        {recPctBar >= 15 ? `${recPctBar.toFixed(0)}%` : ''}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: '#d97706' }} /> TDs {tdPctBar.toFixed(0)}%</span>
                    <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: '#6366f1' }} /> Yardage {yardPctBar.toFixed(0)}%</span>
                    {!isQB && recPctBar > 0 && (
                      <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: '#059669' }} /> Receptions {recPctBar.toFixed(0)}%</span>
                    )}
                  </div>
                </div>
                <div className="pt-1">
                  <Badge variant="outline" className={`text-[10px] ${tdIsHigh ? 'border-amber-500/30 text-amber-500' : 'border-emerald-500/30 text-emerald-500'}`} data-testid="badge-td-reliance">
                    {tdIsHigh ? <AlertTriangle className="w-3 h-3 mr-1" /> : <Shield className="w-3 h-3 mr-1" />}
                    {tdIsHigh ? 'High TD Reliance' : 'Sustainable Volume Base'}
                  </Badge>
                </div>
            </div>

            <div className="sc-card" style={{ padding: '24px 28px' }} data-testid="sustainability-score">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold cursor-help border-b border-dotted border-muted-foreground/40">Sustainability Score</p>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[280px] text-xs leading-relaxed p-3">
                        <p className="font-semibold mb-1.5">What Is Sustainability?</p>
                        <p className="text-muted-foreground">Measures how likely a player's current production level is to continue. It evaluates:</p>
                        <ul className="text-muted-foreground mt-1 space-y-0.5 list-disc pl-3.5">
                          <li>Touchdown rate vs league norms</li>
                          <li>Efficiency per opportunity</li>
                          <li>Weekly role stability</li>
                          <li>Overall workload</li>
                          {isQB && <li>Rushing floor</li>}
                        </ul>
                        <p className="text-muted-foreground mt-1.5">Players with extreme TD rates or unusually high efficiency face higher regression risk.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${sustainBg}`}>
                    {sustainIcon}
                    <span className={`text-[11px] font-bold ${sustainColor}`}>{sustainLabel}</span>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <p className={`text-5xl font-extrabold tabular-nums ${sustainColor}`} data-testid="text-sustainability-score">
                    {sustainabilityScore}
                  </p>
                  <div className="mb-1.5">
                    <p className="text-sm text-muted-foreground">/ 100</p>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden" data-testid="bar-sustainability">
                  <div
                    className="h-full rounded-full"
                    style={{
                      '--sustain-width': `${sustainabilityScore}%`,
                      width: '0%',
                      background: sustainabilityScore >= 70 ? '#10b981' : sustainabilityScore >= 40 ? '#f59e0b' : '#ef4444',
                      animation: 'sustainFill 1s ease-out 0.3s forwards',
                    } as any}
                  />
                </div>
                <div className="flex items-center justify-between text-[9px] text-muted-foreground/50 px-0.5">
                  <span>0 &mdash; Elevated Risk</span>
                  <span>40 &mdash; Moderate</span>
                  <span>70 &mdash; Sustainable</span>
                  <span>100</span>
                </div>
                <p className="text-[11px] text-foreground/80 leading-relaxed italic" data-testid="text-sustainability-insight">
                  {insightSentence}
                </p>
            </div>
          </>
        );
      })()}

      {fantasyTakeaways.length > 0 && (
        <div className="sc-overview__section" style={{ padding: '20px' }} data-testid="section-fantasy-takeaways">
          <SectionHeader title="Fantasy Takeaways" subtitle="What the usage and role data means for fantasy decisions right now." />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {fantasyTakeaways.map((tw, i) => {
              const borderColor = tw.icon === 'up' ? '#22c55e' : tw.icon === 'down' ? '#ef4444' : '#64748b';
              const iconColor = tw.icon === 'up' ? '#22c55e' : tw.icon === 'down' ? '#ef4444' : '#94a3b8';
              const icon = tw.icon === 'up' ? '▲' : tw.icon === 'down' ? '▼' : '●';
              return (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.06)`, borderLeft: `3px solid ${borderColor}`, borderRadius: '6px', fontSize: '13px', color: 'var(--foreground)', lineHeight: '1.6' }}
                  data-testid={`takeaway-${i}`}
                >
                  <span style={{ color: iconColor, fontSize: '8px', fontWeight: 700, marginTop: '5px', flexShrink: 0 }}>{icon}</span>
                  {tw.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function RankingsTab({ player }: { player: Player }) {
  const dynasty = player.dynasty;
  const [dynastyFormat, setDynastyFormat] = useState<'1qb' | 'sf'>('1qb');

  if (!dynasty) {
    return (
      <div className="space-y-6">
        <div className="rounded-md border border-dashed border-muted-foreground/25 p-12 text-center">
          <Trophy className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm font-medium">Dynasty rankings not available for this player</p>
          <p className="text-muted-foreground/60 text-xs mt-1">This player is not currently ranked in consensus dynasty rankings.</p>
        </div>
      </div>
    );
  }

  const d = dynastyFormat === 'sf' && dynasty.sf ? { ...dynasty, ...dynasty.sf } : dynasty;

  const tierLabel = `${dynasty.position}${d.positionalTier <= 1 ? '1' : d.positionalTier <= 3 ? '2' : '3+'}`;
  const tierDesc = d.positionalTier <= 1 ? 'Elite' : d.positionalTier <= 3 ? 'Mid' : d.positionalTier <= 6 ? 'Low-End' : 'Deep';
  const ageTierColor = dynasty.ageCurveTier === 'Rising' ? 'text-emerald-500' : dynasty.ageCurveTier === 'Prime' ? 'text-blue-500' : dynasty.ageCurveTier === 'Aging' ? 'text-amber-500' : 'text-red-400';
  const ageTierBg = dynasty.ageCurveTier === 'Rising' ? 'bg-emerald-500/10' : dynasty.ageCurveTier === 'Prime' ? 'bg-blue-500/10' : dynasty.ageCurveTier === 'Aging' ? 'bg-amber-500/10' : 'bg-red-500/10';
  const valueColor = d.value >= 8000 ? 'text-emerald-500' : d.value >= 6000 ? 'text-blue-500' : d.value >= 4000 ? 'text-foreground' : d.value >= 2000 ? 'text-muted-foreground' : 'text-red-400';
  const valueLabel = d.value >= 8000 ? 'Elite' : d.value >= 6000 ? 'Premium' : d.value >= 4000 ? 'Solid' : d.value >= 2000 ? 'Roster' : 'Fringe';

  const draftRound = dynasty.draftRound;
  const draftPick = dynasty.draftPick;
  const draftYear = dynasty.draftYear;
  const draftedLine = draftRound && draftPick && draftYear
    ? `Round ${draftRound} \u2013 Pick ${draftPick} (${draftYear})`
    : draftRound && draftYear
    ? `Round ${draftRound} (${draftYear})`
    : draftRound
    ? `Round ${draftRound}`
    : null;

  const draftGrade = !draftRound ? { label: 'Undrafted', color: 'text-muted-foreground', bg: 'bg-muted/50' }
    : draftRound === 1 && draftPick && draftPick <= 10 ? { label: 'Elite', color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-500/10' }
    : draftRound === 1 ? { label: 'Strong', color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-500/10' }
    : draftRound === 2 ? { label: 'Solid', color: 'text-slate-400 dark:text-slate-300', bg: 'bg-slate-500/10' }
    : { label: 'Fragile', color: 'text-amber-700 dark:text-amber-600', bg: 'bg-amber-500/10' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} data-testid="rankings-tab">
      <SectionHeader title="Rankings & Value" subtitle="Dynasty consensus data and market positioning" />

      <div className="sc-card" style={{ padding: '28px' }} data-testid="dynasty-market-snapshot">
          <div className="flex items-center justify-between gap-3 flex-wrap" style={{ marginBottom: '20px' }}>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" style={{ color: '#d4af37' }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0b3a7a', letterSpacing: '-0.01em' }}>Dynasty Market Snapshot</p>
            </div>
            <div className="flex items-center gap-3">
              {dynasty.sf && (
                <div className="sc-gamelog__segmented-control" data-testid="toggle-dynasty-format">
                  <button
                    onClick={() => setDynastyFormat('1qb')}
                    className={`sc-gamelog__segment ${dynastyFormat === '1qb' ? 'sc-gamelog__segment--active' : ''}`}
                    data-testid="button-dynasty-1qb"
                  >
                    1QB
                  </button>
                  <button
                    onClick={() => setDynastyFormat('sf')}
                    className={`sc-gamelog__segment ${dynastyFormat === 'sf' ? 'sc-gamelog__segment--active' : ''}`}
                    data-testid="button-dynasty-sf"
                  >
                    SF
                  </button>
                </div>
              )}
              <a
                href={`https://keeptradecut.com/dynasty-rankings/players/${dynasty.ktcSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1"
                data-testid="link-ktc-profile"
              >
                KeepTradeCut <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div data-testid="dynasty-overall-rank">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Overall Rank</p>
              <p className="text-3xl font-bold text-foreground mt-1 tabular-nums">{d.rank}</p>
              <p className="text-[10px] text-muted-foreground">of 500+</p>
            </div>
            <div data-testid="dynasty-positional-rank">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Positional Rank</p>
              <p className="text-3xl font-bold text-foreground mt-1 tabular-nums">{dynasty.position}{d.positionalRank}</p>
              <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground">Tier {d.positionalTier}</span>
            </div>
            <div data-testid="dynasty-age-curve">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Age Curve</p>
              <span className={`inline-block mt-2 px-2 py-1 rounded-md text-xs font-bold ${ageTierColor} ${ageTierBg}`}>{dynasty.ageCurveTier}</span>
              <p className="text-[10px] text-muted-foreground tabular-nums mt-1">{dynasty.age.toFixed(1)} yrs</p>
            </div>
            <div data-testid="dynasty-value" className="relative">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Dynasty Value</p>
              <p className={`text-4xl font-extrabold mt-1 tabular-nums tracking-tight ${valueColor}`}>{d.value.toLocaleString()}</p>
              <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${valueColor} ${d.value >= 8000 ? 'bg-emerald-500/10' : d.value >= 6000 ? 'bg-blue-500/10' : 'bg-muted/50'}`}>{valueLabel}</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div data-testid="dynasty-drafted">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Drafted</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">{draftedLine || 'Undrafted'}</p>
              </div>
              <div data-testid="dynasty-draft-grade">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Capital Grade</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold ${draftGrade.color} ${draftGrade.bg}`}>{draftGrade.label}</span>
              </div>
              <div data-testid="dynasty-tier">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Dynasty Tier</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">{tierDesc} {tierLabel}</p>
              </div>
              {d.startupAdp ? (
                <div data-testid="dynasty-startup-adp">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Startup ADP</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-1 tabular-nums">{d.startupAdp.toFixed(1)}</p>
                </div>
              ) : (
                <div />
              )}
              <div data-testid="dynasty-market-tier">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Market Tier</p>
                <p className={`text-xs font-semibold mt-1 ${valueColor}`}>{valueLabel}</p>
              </div>
            </div>
          </div>

      </div>

      <a
        href={`https://keeptradecut.com/dynasty-rankings/players/${dynasty.ktcSlug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="sc-card hover-elevate" style={{ padding: '20px 28px', cursor: 'pointer' }}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-md" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <BarChart3 className="w-4 h-4" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#0b3a7a', fontSize: '14px' }}>View Full Dynasty Profile</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Trade calculator, keep/trade/cut data, and more on KeepTradeCut</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: '#94a3b8' }} />
            </div>
        </div>
      </a>

      <div className="px-1 pt-2" data-testid="dynasty-disclaimer">
        <p className="text-[9px] text-muted-foreground/40 leading-relaxed">
          Dynasty market data referenced from publicly available consensus rankings at{' '}
          <a
            href="https://keeptradecut.com/dynasty-rankings"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground/60 underline"
          >
            KeepTradeCut
          </a>
          . StatChasers is not affiliated with KeepTradeCut. Rankings are crowdsourced and updated periodically.
        </p>
      </div>
    </div>
  );
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
  const accentColor = teamColor || '#d4af37';
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

type BioData = {
  snapshot_bullets: string[];
  style: {
    how_he_wins: string;
    how_he_wins_tags: string[];
    fantasy_translation: string;
    fantasy_translation_tags: string[];
    best_case?: string;
    floor_driver?: string;
  } | null;
  timeline: { label: string; badge: string; text: string; fantasy_note?: string }[];
  career_context_tiles: { title: string; text: string }[];
  narrative_paragraphs: string[];
  last_updated: string;
  sources: { label: string; url: string }[];
};

const BADGE_CONFIG: Record<string, { bg: string; text: string; dot: string; border: string; icon: typeof Activity; fantasyInflection: boolean }> = {
  Drafted:        { bg: 'rgba(30,136,229,0.10)',  text: '#1565C0', dot: '#1e88e5', border: 'rgba(30,136,229,0.25)',  icon: Trophy,      fantasyInflection: false },
  Breakout:       { bg: 'rgba(76,175,80,0.12)',   text: '#2E7D32', dot: '#4caf50', border: 'rgba(76,175,80,0.30)',   icon: TrendingUp,  fantasyInflection: true  },
  Peak:           { bg: 'rgba(202,161,74,0.14)',  text: '#92400E', dot: '#d4af37', border: 'rgba(202,161,74,0.35)', icon: Zap,         fantasyInflection: true  },
  Injury:         { bg: 'rgba(229,57,53,0.10)',   text: '#C62828', dot: '#ef4444', border: 'rgba(229,57,53,0.30)',  icon: AlertCircle, fantasyInflection: true  },
  'Role change':  { bg: 'rgba(156,39,176,0.10)',  text: '#7B1FA2', dot: '#a855f7', border: 'rgba(156,39,176,0.30)', icon: ArrowUpRight, fantasyInflection: true  },
  'New team':     { bg: 'rgba(255,152,0,0.10)',   text: '#E65100', dot: '#f97316', border: 'rgba(255,152,0,0.30)',  icon: ArrowUpRight, fantasyInflection: true  },
  'Sustained peak': { bg: 'rgba(202,161,74,0.14)', text: '#92400E', dot: '#d4af37', border: 'rgba(202,161,74,0.35)', icon: Zap,        fantasyInflection: false },
  Current:        { bg: 'rgba(99,102,241,0.08)',  text: '#4f46e5', dot: '#6366f1', border: 'rgba(99,102,241,0.20)', icon: Activity,    fantasyInflection: false },
};

const CONTEXT_ICONS: Record<string, typeof Activity> = {
  'Floor driver': ShieldCheck,
  'Ceiling driver': Zap,
  'Stability': Gauge,
  'Risk note': AlertCircle,
};

function BioTab({ player }: { player: Player }) {
  const bio: BioData | null = (player as any).bio ?? null;
  const [narrativeExpanded, setNarrativeExpanded] = useState(false);

  if (!bio) {
    return (
      <div className="sc-bio-empty" data-testid="bio-empty">
        <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm font-medium">Bio data not available for this player.</p>
      </div>
    );
  }

  const ceilingTile = bio.career_context_tiles?.find(t => t.title === 'Ceiling driver');
  const floorTile   = bio.career_context_tiles?.find(t => t.title === 'Floor driver');
  const otherTiles  = bio.career_context_tiles?.filter(t => t.title !== 'Ceiling driver' && t.title !== 'Floor driver') ?? [];

  const styleSubCards = bio.style ? [
    {
      id: 'on-field',
      label: 'On-field style',
      icon: Zap,
      iconColor: '#6366f1',
      text: bio.style.how_he_wins,
      tags: bio.style.how_he_wins_tags,
      tagClass: 'sc-bio__tag',
      testId: 'bio-how-he-wins',
    },
    {
      id: 'fantasy-translation',
      label: 'Fantasy translation',
      icon: Trophy,
      iconColor: '#d4af37',
      text: bio.style.fantasy_translation,
      tags: bio.style.fantasy_translation_tags,
      tagClass: 'sc-bio__tag sc-bio__tag--gold',
      testId: 'bio-fantasy-impact',
    },
    {
      id: 'best-case',
      label: 'Best-case weekly outcome',
      icon: TrendingUp,
      iconColor: '#22c55e',
      text: bio.style.best_case ?? (ceilingTile ? ceilingTile.text : null),
      tags: [] as string[],
      tagClass: 'sc-bio__tag',
      testId: 'bio-best-case',
    },
    {
      id: 'floor-driver',
      label: 'Floor driver',
      icon: ShieldCheck,
      iconColor: '#64748b',
      text: bio.style.floor_driver ?? (floorTile ? floorTile.text : null),
      tags: [] as string[],
      tagClass: 'sc-bio__tag',
      testId: 'bio-floor-driver',
    },
  ].filter(c => c.text) : [];

  return (
    <div className="sc-bio" data-testid="bio-tab">

      {bio.snapshot_bullets && bio.snapshot_bullets.length > 0 && (
        <section className="sc-bio__section" data-testid="bio-snapshot">
          <div className="sc-bio__section-header">
            <FileText className="w-4 h-4" />
            <h3>Career Snapshot</h3>
          </div>
          <div className="sc-bio__snapshot-card">
            <ul className="sc-bio__bullets">
              {bio.snapshot_bullets.map((bullet, i) => (
                <li key={i} data-testid={`bio-bullet-${i}`}>
                  <span className="sc-bio__bullet-dot" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {styleSubCards.length > 0 && (
        <section className="sc-bio__section" data-testid="bio-style">
          <div className="sc-bio__section-header">
            <Zap className="w-4 h-4" />
            <h3>Play Style and Fantasy Translation</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {styleSubCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="sc-bio__style-card"
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                  data-testid={card.testId}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: card.iconColor, flexShrink: 0 }} />
                    <div className="sc-bio__style-card-label" style={{ marginBottom: 0 }}>{card.label}</div>
                  </div>
                  <p className="sc-bio__style-card-text">{card.text}</p>
                  {card.tags.length > 0 && (
                    <div className="sc-bio__tags">
                      {card.tags.map((tag, i) => (
                        <span key={i} className={card.tagClass} data-testid={`bio-tag-${card.id}-${i}`}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {bio.timeline && bio.timeline.length > 0 && (
        <section className="sc-bio__section" data-testid="bio-timeline">
          <div className="sc-bio__section-header">
            <Clock className="w-4 h-4" />
            <h3>Fantasy Career Arc</h3>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px', marginTop: '-4px' }}>Key inflection points that shaped this player's fantasy value.</p>
          <div className="sc-bio__timeline">
            {bio.timeline.map((entry, i) => {
              const cfg = BADGE_CONFIG[entry.badge] || BADGE_CONFIG['Current'];
              const Icon = cfg.icon;
              const isLast = i === bio.timeline.length - 1;
              return (
                <div key={i} className="sc-bio__timeline-entry" data-testid={`bio-timeline-${i}`} style={{ position: 'relative' }}>
                  <div className="sc-bio__timeline-line">
                    <div
                      className="sc-bio__timeline-dot"
                      style={{
                        background: cfg.dot,
                        width: cfg.fantasyInflection ? '14px' : '10px',
                        height: cfg.fantasyInflection ? '14px' : '10px',
                        boxShadow: cfg.fantasyInflection ? `0 0 0 3px ${cfg.border}` : 'none',
                        flexShrink: 0,
                      }}
                    />
                    {!isLast && <div className="sc-bio__timeline-connector" />}
                  </div>
                  <div
                    className="sc-bio__timeline-content"
                    style={{
                      borderLeft: cfg.fantasyInflection ? `2px solid ${cfg.border}` : '2px solid transparent',
                      paddingLeft: cfg.fantasyInflection ? '12px' : '0',
                      background: cfg.fantasyInflection ? cfg.bg : 'transparent',
                      borderRadius: cfg.fantasyInflection ? '6px' : '0',
                      padding: cfg.fantasyInflection ? '10px 12px' : '0 0 0 0',
                      marginBottom: cfg.fantasyInflection ? '4px' : '0',
                    }}
                  >
                    <div className="sc-bio__timeline-top" style={{ marginBottom: '4px' }}>
                      <span className="sc-bio__timeline-label" style={{ fontSize: '13px', fontWeight: 700 }}>{entry.label}</span>
                      <span
                        className="sc-bio__timeline-badge"
                        style={{ background: cfg.bg, color: cfg.text, display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Icon className="w-3 h-3" style={{ flexShrink: 0 }} />
                        {entry.badge}
                      </span>
                    </div>
                    <p className="sc-bio__timeline-text">{entry.text}</p>
                    {entry.fantasy_note && (
                      <p style={{ fontSize: '11px', color: cfg.text, marginTop: '6px', fontStyle: 'italic', opacity: 0.85 }}>
                        {entry.fantasy_note}
                      </p>
                    )}
                    {cfg.fantasyInflection && !entry.fantasy_note && (
                      <p style={{ fontSize: '10px', color: cfg.text, marginTop: '5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.7 }}>
                        Fantasy inflection point
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {otherTiles.length > 0 && (
        <section className="sc-bio__section" data-testid="bio-context">
          <div className="sc-bio__section-header">
            <Activity className="w-4 h-4" />
            <h3>Fantasy Career Context</h3>
          </div>
          <div className="sc-bio__context-grid">
            {otherTiles.map((tile, i) => {
              const Icon = CONTEXT_ICONS[tile.title] || Info;
              return (
                <div key={i} className="sc-bio__context-tile" data-testid={`bio-context-${i}`}>
                  <div className="sc-bio__context-icon">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="sc-bio__context-title">{tile.title}</div>
                    <div className="sc-bio__context-text">{tile.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {bio.narrative_paragraphs && bio.narrative_paragraphs.length > 0 && (
        <section className="sc-bio__section" data-testid="bio-narrative">
          <div className="sc-bio__section-header">
            <BookOpen className="w-4 h-4" />
            <h3>Career Development Profile</h3>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', marginTop: '-4px' }}>How this player entered the league, developed their role, and built their current fantasy identity.</p>
          <div className="sc-bio__narrative-card">
            <div className={`sc-bio__narrative-text ${!narrativeExpanded ? 'sc-bio__narrative-text--collapsed' : ''}`}>
              {bio.narrative_paragraphs.map((p, i) => (
                <p key={i} data-testid={`bio-narrative-${i}`}>{p}</p>
              ))}
            </div>
            {bio.narrative_paragraphs.length > 1 && (
              <button
                type="button"
                className="sc-bio__narrative-toggle"
                onClick={() => setNarrativeExpanded(!narrativeExpanded)}
                data-testid="bio-narrative-toggle"
              >
                {narrativeExpanded ? (
                  <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                ) : (
                  <><ChevronDown className="w-3.5 h-3.5" /> Read more</>
                )}
              </button>
            )}
          </div>
        </section>
      )}

      {(bio.last_updated || (bio.sources && bio.sources.length > 0)) && (
        <section className="sc-bio__footer" data-testid="bio-footer">
          {bio.last_updated && (
            <span className="sc-bio__footer-date">Last updated: {bio.last_updated}</span>
          )}
          {bio.sources && bio.sources.length > 0 && (
            <div className="sc-bio__footer-sources">
              {bio.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-bio__footer-link"
                  data-testid={`bio-source-${i}`}
                >
                  {src.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function NewsTab({ player }: { player: Player }) {
  const teamAbbr = player.team || '';
  const teamSiteLabel = SUPPORTED_TEAM_SITES[teamAbbr] || null;
  const hasTeamSite = !!teamSiteLabel;
  const teamColor = TEAM_PRIMARY_COLORS[teamAbbr] || '#d4af37';
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
            <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full" />
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

function ScoringFormatToggle({ format, onChange }: { format: ScoringFormat; onChange: (f: ScoringFormat) => void }) {
  const formats: ScoringFormat[] = ['standard', 'half', 'ppr'];
  return (
    <div className="flex items-center gap-2" data-testid="scoring-format-toggle">
      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }} className="hidden sm:inline">Scoring:</span>
      <div className="sc-gamelog__segmented-control">
        {formats.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`sc-gamelog__segment ${format === f ? 'sc-gamelog__segment--active' : ''}`}
            data-testid={`button-format-${f}`}
          >
            {SCORING_LABELS[f]}
          </button>
        ))}
      </div>
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

  useEffect(() => {
    setActiveTab("overview");
  }, [slug]);

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
        <PlayerProfileSkeleton />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen bg-background">
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

  const headerStats = computeGameLogStats(defaultEntries, player.position, scoringFormat);
  const headerPpg = headerStats && headerStats.gamesPlayed > 0 ? headerStats.ppg : null;
  const headerGp = headerStats ? headerStats.gamesPlayed : 0;
  const headerTopRate = headerStats ? headerStats.pos1Pct + headerStats.pos2Pct : 0;
  const headerBustPct = headerStats ? headerStats.bustPct : 0;
  const posLabel = player.position || '';

  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative overflow-hidden"
        data-testid="section-player-header"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,58,122,0.05) 0%, rgba(255,255,255,0) 60%)' }} />
        <div className="absolute inset-0 hidden dark:block" style={{ background: 'linear-gradient(135deg, #0B1634 0%, #111D42 40%, #0F172A 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent 0%, ${teamColor}88 20%, ${teamColor} 50%, ${teamColor}88 80%, transparent 100%)` }} />

        <div className="relative max-w-7xl mx-auto px-4 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/nfl/players">
              <Button variant="ghost" size="sm" className="-ml-1 text-slate-600 dark:text-slate-300" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-1" />
                All Players
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-stretch gap-0">

            {/* Row 1 on mobile / Col 1 on desktop: Photo + Name */}
            <div className="flex items-center gap-4 pb-4 md:pb-0 md:pr-5 md:border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
              <PlayerHeadshot playerId={player.id} name={player.name} teamColor={teamColor} team={player.team || undefined} />
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase leading-none mb-0.5">{headerFirstName}</p>
                <h1
                  className="font-black uppercase leading-none tracking-tight"
                  style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: teamColor, letterSpacing: '-0.01em' }}
                  data-testid="text-player-name"
                >
                  {headerLastName}
                </h1>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap" data-testid="text-team">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{teamName}</span>
                  {player.number && (
                    <>
                      <span className="text-slate-300 dark:text-slate-600 text-xs">&middot;</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">#{player.number}</span>
                    </>
                  )}
                  <span className="text-slate-300 dark:text-slate-600 text-xs">&middot;</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{positionFull}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 whitespace-nowrap" data-testid="text-player-meta">
                  {[
                    player.age ? `Age ${player.age}` : null,
                    player.height ? formatHeight(player.height) : null,
                    player.weight ? `${player.weight} lbs` : null,
                    player.years_exp != null ? `Exp ${player.years_exp} yr${player.years_exp !== 1 ? 's' : ''}` : null,
                  ].filter(Boolean).join('  |  ')}
                </p>
                <div className="flex items-center gap-1.5 mt-1" data-testid="text-player-status">
                  {player.injury_status ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      {player.injury_status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      {player.status || 'Active'}
                    </span>
                  )}
                </div>
                <div className="mt-2 h-[2px] w-10 rounded-full" style={{ background: teamColor }} />
              </div>
            </div>

            {/* Row 3 on mobile / Col 3 on desktop: 2025 Fantasy Season Stats Box */}
            {headerPpg !== null && (
              <div className="w-full md:w-auto md:flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 md:self-center mt-0 md:mt-0">
                <div className="px-3 py-1.5 text-white text-[10px] font-bold tracking-widest uppercase" style={{ background: teamColor }}>
                  2025 Fantasy Season
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-900">
                  <div className="px-4 py-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">PPG</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white leading-tight">{headerPpg.toFixed(1)}</p>
                    {playerWithSeasons.seasonRank && <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">{posLabel}{playerWithSeasons.seasonRank}</p>}
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Games</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white leading-tight">{headerGp}</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">played</p>
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Starter%</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white leading-tight">{headerTopRate.toFixed(0)}%</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">of weeks</p>
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Bust%</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white leading-tight">{headerBustPct.toFixed(0)}%</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">of weeks</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <div className="sticky top-[53px] z-40 border-b" style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', borderColor: 'rgba(11,58,122,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <nav
            className="flex gap-0.5 overflow-x-auto -mb-px scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            data-testid="profile-tabs"
          >
            {TAB_CONFIG.map(tab => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;
              const shortLabel = tab.key === 'gamelog' ? 'Log' : tab.key === 'rankings' ? 'Value' : tab.label.split(' ')[0];
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="sc-profile-tab relative flex items-center justify-center whitespace-nowrap"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0b3a7a' : '#94a3b8',
                    transition: 'color 0.2s ease, transform 0.15s ease',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    flex: '1 1 0',
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#0b3a7a'; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
                  data-testid={`tab-${tab.key}`}
                >
                  <Icon className="w-4 h-4 hidden sm:block" style={{ color: isActive ? '#d4af37' : 'inherit' }} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{shortLabel}</span>
                  <span
                    className="absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 rounded-full"
                    style={{
                      height: isActive ? '3px' : '0px',
                      background: 'linear-gradient(90deg, #d4af37, #e5c95c, #d4af37)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </button>
              );
            })}
          </nav>
          <div className="py-2 border-t border-slate-100 dark:border-slate-800 flex justify-center sm:justify-start">
            <ScoringFormatToggle format={scoringFormat} onChange={setScoringFormat} />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {player.injury_status && (
          <div className="sc-card" style={{ padding: '16px 24px', marginBottom: '24px', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}>
              <div className="flex items-center gap-3 flex-wrap">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Injury Status: {player.injury_status}</p>
                  <p className="text-sm text-muted-foreground">
                    This player is currently listed with an injury designation.
                  </p>
                </div>
              </div>
          </div>
        )}

        <div
          key={activeTab}
          className="animate-in fade-in duration-300"
          style={{ animation: 'fadeSlideIn 0.3s ease-out' }}
        >
          {activeTab === "overview" && (
            <OverviewTab player={playerWithSeasons} entries={defaultEntries} format={scoringFormat} />
          )}
          {activeTab === "bio" && (
            <BioTab player={player} />
          )}
          {activeTab === "gamelog" && (
            <GameLogTab player={playerWithSeasons} format={scoringFormat} />
          )}
          {activeTab === "usage" && (
            <UsageTrendsTab player={playerWithSeasons} entries={defaultEntries} format={scoringFormat} />
          )}
          {activeTab === "rankings" && (
            <RankingsTab player={player} />
          )}
          {activeTab === "news" && (
            <NewsTab player={player} />
          )}
        </div>

        {relatedData && relatedData.neighbors && relatedData.neighbors.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-related-heading">
                Rank Neighbors ({player.position})
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4" data-testid="text-related-subtitle">
              Based on {relatedData.season} {relatedData.format.toUpperCase()} season rank &middot; Showing {player.position}{Math.min(...relatedData.neighbors.map(n => n.posRank))}–{player.position}{Math.max(...relatedData.neighbors.map(n => n.posRank))}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedData.neighbors.map((rp) => (
                <Link key={rp.id} href={`/nfl/players/${rp.slug}/`}>
                  <div className="sc-card hover-elevate" style={{ padding: '12px 16px', cursor: 'pointer', height: '100%' }} data-testid={`card-related-${rp.slug}`}>
                      <div className="flex items-center gap-3 flex-wrap">
                        <NeighborHeadshot playerId={rp.id} name={rp.name} teamAbbr={rp.team} />
                        <div className="flex-1 min-w-0">
                          <p style={{ fontWeight: 600, fontSize: '14px', color: '#0b3a7a' }} className="truncate">{rp.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#1a4fa0' }}>{rp.position}{rp.posRank}</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>&middot;</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{rp.team}</span>
                          </div>
                        </div>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

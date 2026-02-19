import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  EyeOff,
  Eye,
  Gauge,
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
  QB: "bg-red-500/15 text-red-700 dark:text-red-400",
  RB: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  WR: "bg-green-500/15 text-green-700 dark:text-green-400",
  TE: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  K: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  DEF: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
};

const TAB_KEYS = ["overview", "gamelog", "usage", "rankings", "news"] as const;
type TabKey = typeof TAB_KEYS[number];

const TAB_CONFIG: { key: TabKey; label: string; icon: typeof Activity }[] = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "gamelog", label: "Game Log", icon: Table },
  { key: "usage", label: "Usage & Trends", icon: TrendingUp },
  { key: "rankings", label: "Rankings & Value", icon: Trophy },
  { key: "news", label: "News & Analysis", icon: Newspaper },
];

function getHeadshotUrl(playerId: string): string {
  return `https://sleepercdn.com/content/nfl/players/thumb/${playerId}.jpg`;
}

function PlayerHeadshot({ playerId, name, teamColor }: { playerId: string; name: string; teamColor?: string }) {
  const [imgError, setImgError] = useState(false);
  const headshotUrl = getHeadshotUrl(playerId);
  const ringColor = teamColor || '#6B7280';

  return (
    <div className="relative flex-shrink-0" data-testid="img-headshot">
      <div
        className="w-24 h-24 md:w-28 md:h-28 rounded-full"
        style={{
          boxShadow: `0 0 20px ${ringColor}30, 0 4px 12px rgba(0,0,0,0.15)`,
          border: `3px solid ${ringColor}`,
        }}
      >
        {!imgError ? (
          <img
            src={headshotUrl}
            alt={`${name} headshot`}
            className="w-full h-full rounded-full object-cover bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
            data-testid="img-headshot-fallback"
          >
            <User className="w-10 h-10 md:w-12 md:h-12 text-slate-400 dark:text-slate-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="p-3 rounded-md bg-muted/50 dark:bg-slate-800/60">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
      <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
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
  switch (position) {
    case 'QB': return { bust: 18, hasTier3: false };
    case 'RB': return { bust: 30, hasTier3: true };
    case 'WR': return { bust: 36, hasTier3: true };
    case 'TE': return { bust: 18, hasTier3: false };
    default: return { bust: 30, hasTier3: true };
  }
}

function getTierLabel(position: string | null, tier: number): string {
  const pos = position || 'FLEX';
  return `${pos}${tier}`;
}

function hasParticipation(stats: GameLogEntry['stats'], position: string | null): boolean {
  const s = stats as unknown as Record<string, number | null | undefined>;
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
  if (rank <= 5) return 'text-green-600 dark:text-green-400 font-semibold';
  if (rank <= 12) return 'text-emerald-600 dark:text-emerald-400';
  if (rank <= 24) return 'text-foreground';
  return 'text-muted-foreground';
}

function getTierBadge(rank: number | null | undefined, position: string | null): { label: string; className: string } | null {
  if (!rank) return null;
  const pos = position || 'FLEX';
  const { bust, hasTier3 } = getTierThresholds(position);
  if (rank <= 12) return { label: `${pos}1`, className: 'bg-green-500/15 text-green-700 dark:text-green-400' };
  const pos2End = hasTier3 ? 24 : bust;
  if (rank <= pos2End) return { label: `${pos}2`, className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400' };
  if (hasTier3 && rank <= bust) return { label: `${pos}3`, className: 'bg-orange-500/15 text-orange-700 dark:text-orange-400' };
  return { label: 'Bust', className: 'bg-red-500/15 text-red-600 dark:text-red-400' };
}

function getOppRankColor(rank: number | null | undefined): string {
  if (!rank) return 'text-muted-foreground';
  if (rank <= 8) return 'text-red-500 dark:text-red-400';
  if (rank >= 25) return 'text-green-600 dark:text-green-400';
  return 'text-muted-foreground';
}

type SortKey = 'week' | 'fpts' | 'finish' | string;
type SortDir = 'asc' | 'desc';

function GameLogTable({ entries = [], position, filter, tierFilter, hideInactive, format = 'ppr' }: { entries?: GameLogEntry[]; position: string | null; filter: 'full' | 'last5'; tierFilter: DistTier | null; hideInactive: boolean; format?: ScoringFormat }) {
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

  let baseEntries = filter === 'last5' ? allActiveEntries.slice(-5) : entries;

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

  const thClass = "py-1.5 pr-2 text-muted-foreground font-medium whitespace-nowrap cursor-pointer select-none transition-colors";
  const thStatic = "py-1.5 pr-2 text-muted-foreground font-medium whitespace-nowrap select-none";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs" data-testid="table-game-log">
        <thead>
          <tr className="border-b text-left">
            <th className={thClass} onClick={() => handleSort('week')} data-testid="sort-week">WK<SortIcon colKey="week" /></th>
            <th className={thStatic}>OPP</th>
            <th className={`${thStatic} text-center`}>SCORE</th>
            {allCols.map((col) => (
              <th key={col.key} className={`${thClass} text-right`} onClick={() => handleSort(col.key)} data-testid={`sort-${col.key}`}>
                {col.label}<SortIcon colKey={col.key} />
              </th>
            ))}
            <th className={`${thClass} text-right`} onClick={() => handleSort('fpts')} data-testid="sort-fpts">FPTS<SortIcon colKey="fpts" /></th>
            <th className={`${thClass} text-right`} onClick={() => handleSort('finish')} data-testid="sort-finish">FINISH<SortIcon colKey="finish" /></th>
            {hasDetail && <th className="py-1.5 pl-2 w-6"></th>}
          </tr>
        </thead>
        <tbody>
          {displayEntries.length > 0 ? (
            <>
              {displayEntries.map((entry, i) => {
                const isExpanded = expandedRows.has(entry.week);
                const rank = entry.pos_rank;
                const tierBadge = getTierBadge(rank, position);
                const oppRank = entry.opp_rank_vs_pos;
                const oppRankSuffix = oppRank ? `${oppRank}${oppRank === 1 ? 'st' : oppRank === 2 ? 'nd' : oppRank === 3 ? 'rd' : 'th'}` : null;
                const isBye = entry.game_status === 'bye';
                const isOut = entry.game_status === 'out';
                const isInactive = isBye || isOut;
                const sc = entry.score;

                if (isInactive) {
                  return (
                    <tr key={entry.week} className="border-b last:border-0 opacity-40" data-testid={`row-gamelog-week-${entry.week}`}>
                      <td className="py-1 pr-2 text-foreground font-medium">{entry.week}</td>
                      <td className="py-1 pr-2 text-muted-foreground">{isBye ? 'BYE' : '\u2014'}</td>
                      <td className="py-1 pr-2 text-center text-muted-foreground">
                        <Badge variant="secondary" className={`text-[8px] px-1.5 py-0 ${isBye ? 'bg-sky-500/10 text-sky-700 dark:text-sky-400' : 'bg-muted text-muted-foreground'}`} data-testid={`badge-status-${entry.week}`}>
                          {isBye ? 'BYE' : 'OUT'}
                        </Badge>
                      </td>
                      {allCols.map((col) => (
                        <td key={col.key} className="py-1 pr-2 text-right text-muted-foreground">{'\u2014'}</td>
                      ))}
                      <td className="py-1 pr-2 text-right text-muted-foreground">{'\u2014'}</td>
                      <td className="py-1 text-right text-muted-foreground">{'\u2014'}</td>
                      {hasDetail && <td className="py-1 pl-2"></td>}
                    </tr>
                  );
                }

                return (
                  <Fragment key={entry.week}>
                    <tr
                      className={`border-b last:border-0 ${hasDetail ? 'cursor-pointer' : ''} ${isExpanded ? 'bg-muted/30 dark:bg-slate-800/30' : ''}`}
                      onClick={hasDetail ? () => toggleRow(entry.week) : undefined}
                      data-testid={`row-gamelog-week-${entry.week}`}
                    >
                      <td className="py-1 pr-2 text-foreground font-medium">{entry.week}</td>
                      <td className="py-1 pr-2 text-foreground whitespace-nowrap">
                        <div className="flex flex-col leading-tight">
                          <span>{entry.opp}</span>
                          {oppRankSuffix && <span className={`text-[9px] leading-none ${getOppRankColor(oppRank)}`}>{oppRankSuffix} vs {posLabel}</span>}
                        </div>
                      </td>
                      <td className="py-1 pr-2 text-center whitespace-nowrap" data-testid={`score-week-${entry.week}`}>
                        {sc ? (
                          <span className={`text-[10px] tabular-nums font-medium ${scoreColor(sc.r)}`}>
                            {sc.r}, {sc.tm}–{sc.opp}
                          </span>
                        ) : '\u2014'}
                      </td>
                      {allCols.map((col) => (
                        <td key={col.key} className="py-1 pr-2 text-foreground text-right tabular-nums">
                          {getStat(entry, col.key)}
                        </td>
                      ))}
                      <td className="py-1 pr-2 text-right font-bold text-foreground tabular-nums">
                        {fpts(entry, format).toFixed(1)}
                      </td>
                      <td className="py-1 text-right" data-testid={`text-finish-week-${entry.week}`}>
                        {tierBadge ? (
                          <Badge variant="secondary" className={`text-[8px] px-1.5 py-0 font-semibold ${tierBadge.className}`}>
                            {tierBadge.label}
                          </Badge>
                        ) : rank ? (
                          <span className={`tabular-nums text-[11px] font-semibold ${getRankColor(rank)}`}>{posLabel}{rank}</span>
                        ) : '\u2014'}
                      </td>
                      {hasDetail && (
                        <td className="py-1 pl-2 text-center">
                          <ChevronRight
                            className={`w-3 h-3 text-muted-foreground/50 transition-transform duration-200 inline-block ${isExpanded ? 'rotate-90' : ''}`}
                          />
                        </td>
                      )}
                    </tr>
                    {hasDetail && isExpanded && (
                      <tr className="bg-muted/20 dark:bg-slate-800/20" data-testid={`row-gamelog-detail-${entry.week}`}>
                        <td colSpan={colCount} className="py-1.5 px-3">
                          <div className="flex items-center gap-4 flex-wrap pl-2">
                            {detail.map((col) => (
                              <div key={col.key} className="flex items-center gap-1.5">
                                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{col.label}</span>
                                <span className="text-xs font-semibold text-foreground tabular-nums">{getStat(entry, col.key)}</span>
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
            <tr className="border-t-2 border-foreground/20">
              <td className="py-1.5 pr-2 text-foreground font-bold text-[10px] uppercase tracking-wider" colSpan={2} data-testid="text-totals-label">
                <div className="flex flex-col">
                  <button
                    className="text-left flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                    onClick={() => setFooterMode(footerMode === 'avg' ? 'total' : 'avg')}
                    data-testid="toggle-footer-mode"
                  >
                    {footerMode === 'avg' ? 'AVG/G' : 'TOTALS'}
                    <ArrowUpDown className="w-2.5 h-2.5 opacity-40" />
                  </button>
                  <span className="text-[9px] text-muted-foreground font-normal normal-case tracking-normal">{gamesPlayed} games</span>
                </div>
              </td>
              <td className="py-1.5 pr-2"></td>
              {allCols.map((col) => {
                const total = activeInDisplay.reduce((sum, e) => sum + getStat(e, col.key), 0);
                const val = footerMode === 'avg' ? (gamesPlayed > 0 ? total / gamesPlayed : 0) : total;
                return (
                  <td key={col.key} className="py-1.5 pr-2 text-foreground text-right tabular-nums font-semibold">
                    {footerMode === 'total' ? val : (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1))}
                  </td>
                );
              })}
              <td className="py-1.5 pr-2 text-right text-foreground tabular-nums font-bold">
                {gamesPlayed > 0
                  ? footerMode === 'avg'
                    ? (activeInDisplay.reduce((sum, e) => sum + fpts(e, format), 0) / gamesPlayed).toFixed(1)
                    : activeInDisplay.reduce((sum, e) => sum + fpts(e, format), 0).toFixed(1)
                  : '0.0'}
              </td>
              <td className={`py-1.5 text-right tabular-nums text-[11px] font-semibold ${avgFinish ? getRankColor(Math.round(avgFinish)) : ''}`} data-testid="text-avg-finish">
                {avgFinish ? `${posLabel}${Math.round(avgFinish)}` : '\u2014'}
              </td>
              {hasDetail && <td className="py-1.5 pl-2"></td>}
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

function LineChartSVG({ data, rollingAvg, bestIdx, height = 120, label, accentColor = "hsl(var(--primary))", showAvgLine = false, highlightLast = 0, showRecentFormLabel = false }: {
  data: number[];
  rollingAvg?: number[];
  bestIdx?: number;
  height?: number;
  label?: string;
  accentColor?: string;
  showAvgLine?: boolean;
  highlightLast?: number;
  showRecentFormLabel?: boolean;
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
            <line x1={0} y1={avgY} x2={viewW} y2={avgY} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.08" />
            <text x={viewW - 8} y={avgY - 4} textAnchor="end" className="fill-muted-foreground" fontSize="9" opacity="0.2">avg {avg.toFixed(1)}</text>
          </>
        )}

        <path d={areaPath} fill={`url(#fill-${uid})`} />
        <path d={linePath} fill="none" stroke={accentColor} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
        {rollingPath && (
          <path d={rollingPath} fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
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

type PlayerWithSeasons = Player & {
  availableSeasons?: number[];
  seasonLabel?: string | null;
  seasonRank?: number | null;
  multiSeasonStats?: SeasonStat[];
  careerProfile?: CareerProfile | null;
};

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

  return (
    <div className="space-y-4">
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
          <div data-testid="overview-stat-boxes" className="space-y-1.5">
            {player.seasonLabel && (
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider" data-testid="text-season-label">
                  {player.seasonLabel}
                </p>
                <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 ${roleGrade.color}`} data-testid="badge-role-grade">
                  Role: {roleGrade.label} {posLabel}
                </Badge>
              </div>
            )}
            {!player.seasonLabel && (
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 ${roleGrade.color}`} data-testid="badge-role-grade">
                  Role: {roleGrade.label} {posLabel}
                </Badge>
              </div>
            )}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Performance</p>
            <div className="rounded-md bg-muted/30 dark:bg-slate-800/30 p-2">
              <div className={`grid gap-1.5 ${thresholds.hasTier3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
                <div className="p-2.5 rounded-md bg-card dark:bg-slate-800/80 text-center ring-1 ring-border/50">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">PPG</p>
                  <p className="text-xl font-extrabold text-foreground tabular-nums mt-0.5">{seasonPpg.toFixed(1)}</p>
                  <p className="text-[9px] text-muted-foreground/70">
                    {player.seasonRank ? `${stats.gamesPlayed} GP \u00B7 ${posLabel}${player.seasonRank}` : `${stats.gamesPlayed} GP`}
                  </p>
                </div>
                <div className="p-2.5 rounded-md bg-green-500/8 dark:bg-green-900/15 text-center ring-1 ring-green-500/15 dark:ring-green-400/10">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{getTierLabel(player.position, 1)} %</p>
                  <p className="text-xl font-extrabold text-green-600 dark:text-green-400 tabular-nums mt-0.5" data-testid="text-pos1-pct">{stats.pos1Pct.toFixed(0)}%</p>
                  <p className="text-[9px] text-muted-foreground/70">{getTierLabel(player.position, 1)} Weeks ({posLabel}1{'\u2013'}{posLabel}12)</p>
                </div>
                <div className="p-2.5 rounded-md bg-teal-500/6 dark:bg-teal-900/10 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{getTierLabel(player.position, 2)} %</p>
                  <p className="text-base font-bold text-teal-600 dark:text-teal-400 tabular-nums mt-0.5" data-testid="text-pos2-pct">{stats.pos2Pct.toFixed(0)}%</p>
                  <p className="text-[9px] text-muted-foreground/70">{getTierLabel(player.position, 2)} Weeks ({posLabel}13{'\u2013'}{posLabel}{thresholds.hasTier3 ? 24 : thresholds.bust})</p>
                </div>
                {thresholds.hasTier3 && (
                  <div className="p-2.5 rounded-md bg-slate-500/5 dark:bg-slate-700/15 text-center">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{getTierLabel(player.position, 3)} %</p>
                    <p className="text-base font-bold text-slate-500 dark:text-slate-400 tabular-nums mt-0.5" data-testid="text-pos3-pct">{stats.pos3Pct.toFixed(0)}%</p>
                    <p className="text-[9px] text-muted-foreground/70">{getTierLabel(player.position, 3)} Weeks ({posLabel}25{'\u2013'}{posLabel}{thresholds.bust})</p>
                  </div>
                )}
              </div>
              <div className="mt-2 px-0.5" data-testid="tier-distribution-bar">
                {(() => {
                  const total = stats.pos1Pct + stats.pos2Pct + (thresholds.hasTier3 ? stats.pos3Pct : 0) + stats.bustPct;
                  const norm = total > 0 ? 100 / total : 1;
                  const p1w = stats.pos1Pct * norm;
                  const p2w = stats.pos2Pct * norm;
                  const p3w = thresholds.hasTier3 ? stats.pos3Pct * norm : 0;
                  const bw = stats.bustPct * norm;
                  return (
                    <div className="flex h-2.5 rounded-full overflow-hidden">
                      {p1w > 0 && <div className="bg-green-500 dark:bg-green-400" style={{ width: `${p1w}%` }} title={`${getTierLabel(player.position, 1)}: ${stats.pos1Pct.toFixed(0)}%`} />}
                      {p2w > 0 && <div className="bg-teal-400 dark:bg-teal-500" style={{ width: `${p2w}%` }} title={`${getTierLabel(player.position, 2)}: ${stats.pos2Pct.toFixed(0)}%`} />}
                      {p3w > 0 && <div className="bg-slate-300 dark:bg-slate-500" style={{ width: `${p3w}%` }} title={`${getTierLabel(player.position, 3)}: ${stats.pos3Pct.toFixed(0)}%`} />}
                      {bw > 0 && <div className="bg-red-400 dark:bg-red-500" style={{ width: `${bw}%` }} title={`Bust: ${stats.bustPct.toFixed(0)}%`} />}
                    </div>
                  );
                })()}
                <div className="flex items-center justify-between mt-1 gap-1 flex-wrap">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 inline-block" /><span className="text-[9px] text-muted-foreground">{getTierLabel(player.position, 1)}</span></span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-500 inline-block" /><span className="text-[9px] text-muted-foreground">{getTierLabel(player.position, 2)}</span></span>
                    {thresholds.hasTier3 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500 inline-block" /><span className="text-[9px] text-muted-foreground">{getTierLabel(player.position, 3)}</span></span>}
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500 inline-block" /><span className="text-[9px] text-muted-foreground">Bust</span></span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/40 font-medium pt-0.5">Risk</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
              <div className="p-2 rounded-md bg-red-500/5 dark:bg-red-900/10 text-center">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70 font-medium">Bust %</p>
                <p className="text-base font-bold text-red-500 dark:text-red-400 tabular-nums mt-0.5" data-testid="text-bust-pct-risk">{stats.bustPct.toFixed(0)}%</p>
                <p className="text-[9px] text-muted-foreground/60">Bust Weeks ({posLabel}{thresholds.bust + 1}+)</p>
              </div>
              <div className="p-2 rounded-md bg-muted/30 dark:bg-slate-800/40 text-center">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70 font-medium">Volatility</p>
                <p className={`text-base font-bold tabular-nums mt-0.5 ${volColor}`}>{stats.volatility.toFixed(1)}</p>
                <p className="text-[9px] text-muted-foreground/60">{volLabel}</p>
              </div>
              <div className="p-2 rounded-md bg-muted/30 dark:bg-slate-800/40 text-center">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70 font-medium">Reliability</p>
                <p className={`text-base font-bold tabular-nums mt-0.5 ${conColor}`}>{consistencyScore}</p>
                <p className="text-[9px] text-muted-foreground/60">{conLabel}</p>
              </div>
              <div className="p-2 rounded-md bg-red-500/5 dark:bg-red-900/10 text-center">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70 font-medium">Goose Egg</p>
                <p className={`text-base font-bold tabular-nums mt-0.5 ${stats.gooseEggPct > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} data-testid="text-goose-egg">{stats.gooseEggPct.toFixed(0)}%</p>
                <p className="text-[9px] text-muted-foreground/60">0-Point Games</p>
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

            return (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium" data-testid="text-trend-diagnostics-label">Trend Diagnostics</p>
                    <MomentumBadge data={weeklyPts} unit="PPG" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <p className="text-xs text-muted-foreground font-medium">Points Trend</p>
                      <span className="text-[10px] text-muted-foreground/40">(3-Week Rolling Average vs Weekly)</span>
                    </div>
                    <LineChartSVG
                      data={weeklyPts}
                      rollingAvg={rollingPts}
                      bestIdx={bestIdx}
                      height={130}
                      label="fpts"
                      accentColor="hsl(var(--primary))"
                      showAvgLine
                      highlightLast={3}
                      showRecentFormLabel
                    />
                    <p className="text-[10px] text-muted-foreground/60 mt-1.5" data-testid="text-points-insight">
                      {buildPointsInsight()}
                    </p>
                  </div>

                  {secondaryData && secondaryData.length > 1 && secondaryMetric && (
                    <>
                      <div className="my-4 border-t border-border/40" />
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <p className="text-xs text-muted-foreground font-medium">Usage Trend</p>
                          <span className="text-[10px] text-muted-foreground/40">{secondaryMetric.label} (3-Week Avg vs Weekly)</span>
                        </div>
                        <LineChartSVG
                          data={secondaryData}
                          rollingAvg={secondaryRolling || undefined}
                          height={90}
                          label="secondary"
                          accentColor="hsl(var(--chart-2))"
                          showAvgLine
                          highlightLast={3}
                          showRecentFormLabel
                        />
                        <p className="text-[10px] text-muted-foreground/60 mt-1.5" data-testid="text-usage-insight">
                          {buildUsageInsight()}
                        </p>
                        {(() => {
                          const diag = buildDiagnosticInsight();
                          return diag ? (
                            <p className="text-[10px] text-foreground/60 font-medium mt-1" data-testid="text-diagnostic-insight">
                              {diag}
                            </p>
                          ) : null;
                        })()}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
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
              return (
                <div key={c.label} className={`p-2 rounded-md text-center ${c.primary ? 'bg-muted/40 dark:bg-slate-800/50 ring-1 ring-border/30' : 'bg-muted/30 dark:bg-slate-800/40'}`}>
                  <p className="text-[9px] text-muted-foreground font-medium mb-0.5">{c.label}</p>
                  <p className={`${c.primary ? 'text-sm font-extrabold' : 'text-[13px] font-bold'} text-foreground tabular-nums`}>{c.fmt(c.recent)}</p>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="text-[9px] text-muted-foreground/50 tabular-nums">Season: {c.fmt(c.season)}</span>
                    <span className={`text-[9px] font-medium tabular-nums inline-flex items-center gap-px ${Math.abs(c.pct) < 1 ? 'text-muted-foreground/40' : getTrendColor(c.pct)}`}>
                      {Icon && <Icon className="w-2.5 h-2.5" />}
                      {Math.abs(c.pct) < 1 ? '0%' : `${c.pct > 0 ? '+' : ''}${c.pct.toFixed(0)}%`}
                    </span>
                  </div>
                </div>
              );
            };

            return (
              <Card>
                <CardContent className="p-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium mb-2.5" data-testid="text-role-snapshot-label">Role Snapshot <span className="normal-case tracking-normal">(Season vs Recent)</span></p>
                  {usageCards.length > 0 && (
                    <>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium mb-1.5">Usage</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 mb-2" data-testid="role-snapshot-usage">
                        {usageCards.map(renderCard)}
                      </div>
                    </>
                  )}
                  {effCards.length > 0 && (
                    <>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium mb-1.5">Efficiency</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 mb-2" data-testid="role-snapshot-efficiency">
                        {effCards.map(renderCard)}
                      </div>
                    </>
                  )}
                  {ctxCards.length > 0 && (
                    <>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium mb-1.5">Context</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5" data-testid="role-snapshot-context">
                        {ctxCards.map(renderCard)}
                      </div>
                    </>
                  )}
                  {signalTitle && (
                    <div className="mt-2.5 pt-2 border-t border-border/30" data-testid="text-role-signal">
                      <p className="text-[10px] font-semibold text-foreground/70">Signal: {signalTitle}</p>
                      <p className="text-[10px] text-muted-foreground/60">{signalDetail}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })()}

          {keyStats.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium mb-3">Season Stat Summary</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {keyStats.map(s => (
                    <div key={s.label} className="text-center p-2 rounded-md bg-muted/30 dark:bg-slate-800/40">
                      <p className="text-lg font-bold text-foreground tabular-nums">{Number.isInteger(s.total) ? s.total : s.total.toFixed(1)}</p>
                      <p className="text-[10px] text-muted-foreground">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground/70">{s.perGame.toFixed(1)}/g</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {cp && (() => {
            const durColor = cp.durabilityPct >= 90 ? 'text-green-600 dark:text-green-400' : cp.durabilityPct >= 70 ? 'text-foreground' : 'text-red-500 dark:text-red-400';
            const volColor = cp.volatilityLabel === 'Low' ? 'text-green-600 dark:text-green-400' : cp.volatilityLabel === 'Moderate' ? 'text-foreground' : 'text-red-500 dark:text-red-400';
            const ppgs = cp.seasonPpgs;
            const maxPpg = Math.max(...ppgs.map(p => p.ppg), 1);
            const chartH = 40;

            return (
            <Card>
              <CardContent className="p-3.5" data-testid="section-career-profile">
                {cp.smallSample && (
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 mb-2 bg-amber-500/15 text-amber-700 dark:text-amber-400" data-testid="badge-small-sample">Small Sample</Badge>
                )}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium" data-testid="text-career-profile-label">
                    3-Year Performance <span className="normal-case tracking-normal">({cp.gamesPlayed} Games)</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3" data-testid="career-profile-stats">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium">PPG</span>
                    <p className="text-lg font-bold text-foreground tabular-nums">{cp.ppg.toFixed(1)}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium">Durability</span>
                    <p className={`text-lg font-bold tabular-nums ${durColor}`}>{cp.durabilityPct.toFixed(0)}%</p>
                    <span className="text-[9px] text-muted-foreground/40">{cp.gamesPlayed} of {cp.maxGames} games</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium">Tier Breakdown</span>
                  <div className={`grid gap-1.5 mt-1.5 ${thresholds.hasTier3 ? 'grid-cols-4' : 'grid-cols-3'}`} data-testid="career-tier-breakdown">
                    <div className="text-center p-1.5 rounded-md bg-green-500/10 dark:bg-green-900/20">
                      <p className="text-sm font-bold text-green-600 dark:text-green-400 tabular-nums">{cp.pos1Pct.toFixed(0)}%</p>
                      <p className="text-[9px] text-muted-foreground">{getTierLabel(player.position, 1)}</p>
                    </div>
                    <div className="text-center p-1.5 rounded-md bg-teal-500/10 dark:bg-teal-900/20">
                      <p className="text-sm font-bold text-teal-600 dark:text-teal-400 tabular-nums">{cp.pos2Pct.toFixed(0)}%</p>
                      <p className="text-[9px] text-muted-foreground">{getTierLabel(player.position, 2)}</p>
                    </div>
                    {thresholds.hasTier3 && (
                      <div className="text-center p-1.5 rounded-md bg-slate-500/10 dark:bg-slate-700/20">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tabular-nums">{cp.pos3Pct.toFixed(0)}%</p>
                        <p className="text-[9px] text-muted-foreground">{getTierLabel(player.position, 3)}</p>
                      </div>
                    )}
                    <div className="text-center p-1.5 rounded-md bg-red-500/10 dark:bg-red-900/20">
                      <p className="text-sm font-bold text-red-500 dark:text-red-400 tabular-nums">{cp.bustPct.toFixed(0)}%</p>
                      <p className="text-[9px] text-muted-foreground">Bust</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mb-3 flex-wrap">
                  <span className="text-[9px] text-muted-foreground/40 font-medium">Volatility:</span>
                  <span className={`text-xs font-semibold ${volColor}`}>{cp.volatility.toFixed(1)} ({cp.volatilityLabel})</span>
                </div>

                {ppgs.length > 1 && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium">Career Arc</span>
                    <div className="mt-1.5 flex items-end gap-1" data-testid="career-arc-chart" style={{ height: chartH + 16 }}>
                      {ppgs.map((sp, i) => {
                        const barH = Math.max(4, (sp.ppg / maxPpg) * chartH);
                        return (
                          <div key={sp.season} className="flex-1 flex flex-col items-center gap-0.5">
                            <span className="text-[8px] tabular-nums text-muted-foreground/60 font-medium">{sp.ppg.toFixed(1)}</span>
                            <div
                              className={`w-full rounded-sm ${i === ppgs.length - 1 ? 'bg-primary/60' : 'bg-muted-foreground/20'}`}
                              style={{ height: barH }}
                            />
                            <span className="text-[8px] tabular-nums text-muted-foreground/40">{String(sp.season).slice(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            );
          })()}
        </>
        );
      })() : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-sm">No season data available yet.</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Stats will appear once the season begins.</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-3.5" data-testid="section-quick-outlook">
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Quick Outlook</p>
          </div>
          {outlook.hasData ? (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-2.5" data-testid="outlook-stat-lines">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-[10px] text-muted-foreground/60 font-medium">Current Form:</span>
                  <span className={`text-xs font-semibold ${outlook.formColor}`} data-testid="text-outlook-form">{outlook.formLabel}</span>
                  <span className="text-[9px] text-muted-foreground/40 tabular-nums">({outlook.formDetail})</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-[10px] text-muted-foreground/60 font-medium">Role:</span>
                  <span className="text-xs font-semibold text-foreground" data-testid="text-outlook-role">{outlook.roleLabel}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-[10px] text-muted-foreground/60 font-medium">Volatility:</span>
                  <span className={`text-xs font-semibold ${outlook.volatilityColor}`} data-testid="text-outlook-volatility">{outlook.volatilityLabel}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-[10px] text-muted-foreground/60 font-medium">Tier Profile:</span>
                  <span className="text-xs font-semibold text-foreground" data-testid="text-outlook-tier">{outlook.tierProfile}</span>
                </div>
              </div>
              {outlook.sentence && (
                <p className="text-[11px] text-muted-foreground leading-relaxed" data-testid="text-outlook-sentence">{outlook.sentence}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground" data-testid="text-outlook">{outlook.noDataMsg}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type DistTier = '15+' | '10\u201314.9' | '5\u20139.9' | '<5';

function GameDistributionBar({ entries, position, activeTier, onTierClick, format = 'ppr' }: { entries: GameLogEntry[]; position: string | null; activeTier: DistTier | null; onTierClick: (tier: DistTier | null) => void; format?: ScoringFormat }) {
  const played = entries.filter(e => e.game_status === 'active');
  if (played.length === 0) return null;
  const bins: { label: DistTier; count: number; color: string; textColor: string }[] = [
    { label: '15+', count: played.filter(e => fpts(e, format) >= 15).length, color: 'bg-green-500 dark:bg-green-400', textColor: 'text-green-700 dark:text-green-400' },
    { label: '10\u201314.9', count: played.filter(e => fpts(e, format) >= 10 && fpts(e, format) < 15).length, color: 'bg-teal-500 dark:bg-teal-400', textColor: 'text-teal-700 dark:text-teal-400' },
    { label: '5\u20139.9', count: played.filter(e => fpts(e, format) >= 5 && fpts(e, format) < 10).length, color: 'bg-amber-500 dark:bg-amber-400', textColor: 'text-amber-700 dark:text-amber-400' },
    { label: '<5', count: played.filter(e => fpts(e, format) < 5).length, color: 'bg-red-500 dark:bg-red-400', textColor: 'text-red-700 dark:text-red-400' },
  ];
  const total = played.length;
  return (
    <div data-testid="gamelog-distribution">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">Game Distribution</p>
      <div className="flex mb-0.5">
        {bins.map(bin => bin.count > 0 ? (
          <div
            key={bin.label}
            className="flex flex-col items-center"
            style={{ width: `${(bin.count / total) * 100}%` }}
          >
            <span className={`text-[9px] font-semibold tabular-nums ${activeTier === bin.label ? bin.textColor : 'text-muted-foreground'} ${activeTier && activeTier !== bin.label ? 'opacity-30' : ''}`}>{bin.count}</span>
          </div>
        ) : null)}
      </div>
      <div className="flex rounded-md overflow-hidden h-3 mb-1">
        {bins.map(bin => bin.count > 0 ? (
          <div
            key={bin.label}
            className={`${bin.color} transition-all cursor-pointer ${activeTier === bin.label ? 'ring-2 ring-foreground/30' : ''} ${activeTier && activeTier !== bin.label ? 'opacity-30' : ''}`}
            style={{ width: `${(bin.count / total) * 100}%` }}
            title={`${bin.label}: ${bin.count} games`}
            onClick={() => onTierClick(activeTier === bin.label ? null : bin.label)}
            data-testid={`dist-segment-${bin.label}`}
          />
        ) : null)}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {bins.map(bin => (
          <button
            key={bin.label}
            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors cursor-pointer ${activeTier === bin.label ? 'bg-muted ring-1 ring-border' : ''} ${activeTier && activeTier !== bin.label ? 'opacity-40' : ''}`}
            onClick={() => onTierClick(activeTier === bin.label ? null : bin.label)}
            data-testid={`dist-legend-${bin.label}`}
          >
            <div className={`w-2 h-2 rounded-full ${bin.color}`} />
            <span className={`text-[10px] tabular-nums font-medium ${activeTier === bin.label ? bin.textColor : 'text-muted-foreground'}`}>{bin.label}: {bin.count}</span>
          </button>
        ))}
        {activeTier && (
          <button
            className="text-[10px] text-muted-foreground/70 underline underline-offset-2"
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

function GameLogTab({ player, format = 'ppr' }: { player: PlayerWithSeasons; format?: ScoringFormat }) {
  const availableSeasons = player.availableSeasons || (player.season ? [player.season] : []);
  const [selectedSeason, setSelectedSeason] = useState<number>(availableSeasons[0] || new Date().getFullYear());
  const [gameFilter, setGameFilter] = useState<'full' | 'last5'>('full');
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

  const bestWeek = played.length > 0 ? played.reduce((best, e) => fpts(e, format) > fpts(best, format) ? e : best, played[0]) : null;
  const worstWeek = played.length > 0 ? played.reduce((worst, e) => fpts(e, format) < fpts(worst, format) ? e : worst, played[0]) : null;
  const bestTier = bestWeek ? getTierBadge(bestWeek.pos_rank, player.position) : null;
  const worstTier = worstWeek ? getTierBadge(worstWeek.pos_rank, player.position) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-lg font-semibold text-foreground" data-testid="text-gamelog-heading">
          Game Log
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-md border border-border overflow-visible" data-testid="filter-game-range">
            <button
              className={`px-3 py-1 text-xs font-medium transition-colors ${gameFilter === 'full' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              onClick={() => setGameFilter('full')}
              data-testid="button-filter-full"
            >
              Full Season
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium transition-colors ${gameFilter === 'last5' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              onClick={() => setGameFilter('last5')}
              data-testid="button-filter-last5"
            >
              Last 5
            </button>
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
            <span className="text-sm text-muted-foreground">{selectedSeason}</span>
          )}
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-testid="gamelog-summary-bar">
          <StatBox label="Games Played" value={stats.gamesPlayed} />
          <StatBox label="Season PPG" value={stats.ppg.toFixed(1)} />
          <div className="p-3 rounded-md bg-muted/50 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Best Week</p>
            <p className="text-xl font-bold text-foreground tabular-nums mt-0.5" data-testid="text-best-week-pts">
              {bestWeek ? fpts(bestWeek, format).toFixed(1) : '\u2014'}
            </p>
            {bestWeek && bestTier && (
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                <span className="text-[10px] text-muted-foreground">Wk {bestWeek.week}</span>
                <Badge variant="secondary" className={`text-[8px] px-1 py-0 ${bestTier.className}`}>{bestTier.label}</Badge>
              </div>
            )}
            {bestWeek && !bestTier && bestWeek.pos_rank && (
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Wk {bestWeek.week} ({posLabel}{bestWeek.pos_rank})</span>
            )}
          </div>
          <div className="p-3 rounded-md bg-muted/50 dark:bg-slate-800/60">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Worst Week</p>
            <p className="text-xl font-bold text-foreground tabular-nums mt-0.5" data-testid="text-worst-week-pts">
              {worstWeek ? fpts(worstWeek, format).toFixed(1) : '\u2014'}
            </p>
            {worstWeek && worstTier && (
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                <span className="text-[10px] text-muted-foreground">Wk {worstWeek.week}</span>
                <Badge variant="secondary" className={`text-[8px] px-1 py-0 ${worstTier.className}`}>{worstTier.label}</Badge>
              </div>
            )}
            {worstWeek && !worstTier && worstWeek.pos_rank && (
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Wk {worstWeek.week} ({posLabel}{worstWeek.pos_rank})</span>
            )}
          </div>
        </div>
      )}

      {stats && gameFilter === 'full' && (
        <GameDistributionBar entries={entries} position={player.position} activeTier={tierFilter} onTierClick={setTierFilter} format={format} />
      )}

      <Card>
        <CardContent className="p-3">
          {gameFilter === 'full' && (
            <div className="flex items-center justify-end mb-1.5 gap-2 flex-wrap">
              <button
                className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-md transition-colors ${hideInactive ? 'bg-muted text-foreground ring-1 ring-border' : 'text-muted-foreground'}`}
                onClick={() => setHideInactive(!hideInactive)}
                data-testid="toggle-hide-inactive"
              >
                {hideInactive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {hideInactive ? 'Showing Active Only' : 'Hide BYE/OUT'}
              </button>
            </div>
          )}
          {isSeasonLoading && !isDefaultSeason ? (
            <div className="py-8 text-center">
              <Skeleton className="h-4 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          ) : (
            <GameLogTable entries={entries} position={player.position} filter={gameFilter} tierFilter={tierFilter} hideInactive={hideInactive} format={format} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getPositionMomentumMetrics(position: string | null) {
  if (position === 'QB') return [
    { key: 'pass_att', label: 'Pass Att/G', pct: false },
    { key: 'pass_cmp', label: 'Completions/G', pct: false },
    { key: 'pass_yd', label: 'Pass Yds/G', pct: false },
    { key: 'rush_att', label: 'Rush Att/G', pct: false },
  ];
  if (position === 'RB') return [
    { key: 'rush_att', label: 'Carries/G', pct: false },
    { key: 'rush_yd', label: 'Rush Yds/G', pct: false },
    { key: 'rec_tgt', label: 'Targets/G', pct: false },
    { key: 'rec', label: 'Receptions/G', pct: false },
  ];
  if (position === 'WR' || position === 'TE') return [
    { key: 'rec_tgt', label: 'Targets/G', pct: false },
    { key: 'rec', label: 'Receptions/G', pct: false },
    { key: 'rec_yd', label: 'Rec Yds/G', pct: false },
    { key: 'rush_att', label: 'Carries/G', pct: false },
  ];
  if (position === 'K') return [
    { key: 'fga', label: 'FG Att/G', pct: false },
    { key: 'fgm', label: 'FG Made/G', pct: false },
    { key: 'xpa', label: 'XP Att/G', pct: false },
    { key: 'xpm', label: 'XP Made/G', pct: false },
  ];
  return [];
}

function computeMetricAvg(activeEntries: GameLogEntry[], key: string, count?: number): number {
  const src = count ? activeEntries.slice(-count) : activeEntries;
  if (src.length === 0) return 0;
  const sum = src.reduce((s, e) => s + ((e.stats as unknown as Record<string, number>)[key] ?? 0), 0);
  return sum / src.length;
}

function computeTdDependency(activeEntries: GameLogEntry[], position: string | null, format: ScoringFormat): { pct: number; label: string; tag: string } {
  if (activeEntries.length === 0) return { pct: 0, label: 'N/A', tag: '' };
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
  if (totalPts === 0) return { pct: 0, label: 'N/A', tag: '' };
  const pct = (tdPts / totalPts) * 100;
  if (pct >= 35) return { pct, label: 'TD-Driven', tag: 'High TD reliance' };
  if (pct >= 20) return { pct, label: 'Balanced', tag: 'Balanced production' };
  return { pct, label: 'Volume-Backed', tag: 'Volume-backed production' };
}

function computeUsageStability(activeEntries: GameLogEntry[], primaryKey: string): number {
  if (activeEntries.length < 3) return 50;
  const vals = activeEntries.map(e => (e.stats as unknown as Record<string, number>)[primaryKey] ?? 0);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  if (mean === 0) return 50;
  const variance = vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length;
  const cv = Math.sqrt(variance) / mean;
  return Math.round(Math.max(0, Math.min(100, 100 / (1 + (cv / 0.4) ** 2))));
}

function DeltaCell({ delta, pct = false }: { delta: number; pct?: boolean }) {
  const isPos = delta > 0.05;
  const isNeg = delta < -0.05;
  const color = isPos ? 'text-emerald-500' : isNeg ? 'text-red-400' : 'text-muted-foreground';
  const sign = isPos ? '+' : '';
  return (
    <span className={`font-semibold tabular-nums ${color}`}>
      {sign}{delta.toFixed(1)}{pct ? '%' : ''}
    </span>
  );
}

function UsageTrendsTab({ player, entries, format = 'ppr' }: { player: PlayerWithSeasons; entries: GameLogEntry[]; format?: ScoringFormat }) {
  const position = player.position;
  const activeEntries = entries.filter(e => hasParticipation(e.stats, position));
  const metrics = getPositionMomentumMetrics(position);
  const RECENT_WINDOW = 4;

  const deltaRows = metrics.map(m => {
    const seasonAvg = computeMetricAvg(activeEntries, m.key);
    const recentAvg = computeMetricAvg(activeEntries, m.key, RECENT_WINDOW);
    const delta = recentAvg - seasonAvg;
    return { ...m, seasonAvg, recentAvg, delta };
  });

  const primaryKey = metrics[0]?.key ?? 'rec_tgt';
  const weightedPctChange = deltaRows.reduce((s, d, i) => {
    const weight = [4, 3, 2, 1][i] ?? 1;
    const pctChange = d.seasonAvg > 0 ? (d.delta / d.seasonAvg) : 0;
    return s + pctChange * weight;
  }, 0);
  const totalWeight = deltaRows.reduce((s, _, i) => s + ([4, 3, 2, 1][i] ?? 1), 0) || 1;
  const avgPctChange = weightedPctChange / totalWeight;
  const momentumScore = Math.round(Math.max(0, Math.min(100, 50 + avgPctChange * 200)));

  const momentumLabel = momentumScore >= 65 ? 'EXPANDING' : momentumScore <= 35 ? 'DECLINING' : 'STABLE';
  const momentumColor = momentumScore >= 65 ? 'text-emerald-500' : momentumScore <= 35 ? 'text-red-400' : 'text-amber-400';
  const momentumBg = momentumScore >= 65 ? 'bg-emerald-500/10 border-emerald-500/20' : momentumScore <= 35 ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20';

  const tdDep = computeTdDependency(activeEntries, position, format);
  const stability = computeUsageStability(activeEntries, primaryKey);
  const stabilityLabel = stability >= 70 ? 'Stable Role' : stability >= 45 ? 'Moderate' : 'Volatile Usage';
  const stabilityColor = stability >= 70 ? 'text-emerald-500' : stability >= 45 ? 'text-amber-400' : 'text-red-400';

  const weeklyPts = entries.map(e => fpts(e, format));
  const rollingPts = weeklyPts.map((_, i) => {
    const start = Math.max(0, i - 2);
    const slice = weeklyPts.slice(start, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });

  let primaryUsageKey = '';
  let primaryUsageLabel = '';
  let secondaryUsageKey = '';
  let secondaryUsageLabel = '';
  if (position === 'QB') {
    primaryUsageKey = 'pass_att'; primaryUsageLabel = 'Pass Attempts';
    secondaryUsageKey = 'rush_att'; secondaryUsageLabel = 'Rush Attempts';
  } else if (position === 'RB') {
    primaryUsageKey = 'rush_att'; primaryUsageLabel = 'Carries';
    secondaryUsageKey = 'rec_tgt'; secondaryUsageLabel = 'Targets';
  } else if (position === 'WR' || position === 'TE') {
    primaryUsageKey = 'rec_tgt'; primaryUsageLabel = 'Targets';
    secondaryUsageKey = 'rec'; secondaryUsageLabel = 'Receptions';
  } else if (position === 'K') {
    primaryUsageKey = 'fga'; primaryUsageLabel = 'FG Attempts';
    secondaryUsageKey = 'xpa'; secondaryUsageLabel = 'XP Attempts';
  }

  const primaryData = entries.map(e => (e.stats as unknown as Record<string, number>)[primaryUsageKey] ?? 0);
  const secondaryData = entries.map(e => (e.stats as unknown as Record<string, number>)[secondaryUsageKey] ?? 0);
  const rollingPrimary = getRollingAverage(entries, primaryUsageKey, 3);
  const rollingSecondary = getRollingAverage(entries, secondaryUsageKey, 3);

  let yardageKey = '';
  let yardageLabel = '';
  if (position === 'QB') { yardageKey = 'pass_yd'; yardageLabel = 'Pass Yards'; }
  else if (position === 'RB') { yardageKey = 'rush_yd'; yardageLabel = 'Rush Yards'; }
  else if (position === 'WR' || position === 'TE') { yardageKey = 'rec_yd'; yardageLabel = 'Rec Yards'; }

  const yardageData = yardageKey ? entries.map(e => (e.stats as unknown as Record<string, number>)[yardageKey] ?? 0) : [];
  const rollingYardage = yardageKey ? getRollingAverage(entries, yardageKey, 3) : [];

  if (entries.length === 0 || metrics.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-muted-foreground/25 p-12 text-center">
        <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm font-medium">Usage data not yet available</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Check back once the season is underway.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="usage-trends-tab">
      <Card data-testid="opportunity-momentum-card">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Opportunity Momentum</p>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold ${momentumBg} ${momentumColor}`} data-testid="role-momentum-badge">
              {momentumScore >= 65 ? <TrendingUp className="w-3.5 h-3.5" /> : momentumScore <= 35 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              ROLE {momentumLabel}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Role Momentum</p>
              <p className="text-3xl font-bold tabular-nums" style={{ color: momentumScore >= 65 ? '#10b981' : momentumScore <= 35 ? '#f87171' : '#fbbf24' }} data-testid="text-momentum-score">
                {momentumScore}
                <span className="text-sm font-medium text-muted-foreground ml-1">/ 100</span>
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Usage Stability</p>
                <p className={`text-lg font-bold tabular-nums ${stabilityColor}`} data-testid="text-stability-score">{stability}<span className="text-xs font-medium text-muted-foreground ml-0.5">/ 100</span></p>
                <p className="text-[10px] text-muted-foreground/70">{stabilityLabel}</p>
              </div>
              {position !== 'K' && (
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">TD Dependency</p>
                  <p className="text-lg font-bold tabular-nums text-foreground" data-testid="text-td-dependency">{tdDep.pct.toFixed(0)}%</p>
                  <p className="text-[10px] text-muted-foreground/70">{tdDep.label}</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <div className="overflow-x-auto">
              <table className="w-full text-xs" data-testid="table-momentum-deltas">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left font-medium pb-2 pr-3">Metric</th>
                    <th className="text-right font-medium pb-2 px-2">Season</th>
                    <th className="text-right font-medium pb-2 px-2">Last {RECENT_WINDOW}</th>
                    <th className="text-right font-medium pb-2 pl-2">{'\u0394'}</th>
                  </tr>
                </thead>
                <tbody>
                  {deltaRows.map((row, i) => (
                    <tr key={i} className="border-t border-border/50">
                      <td className="py-1.5 pr-3 text-foreground font-medium">{row.label}</td>
                      <td className="py-1.5 px-2 text-right tabular-nums text-muted-foreground">{row.seasonAvg.toFixed(1)}</td>
                      <td className="py-1.5 px-2 text-right tabular-nums text-foreground font-medium">{row.recentAvg.toFixed(1)}</td>
                      <td className="py-1.5 pl-2 text-right"><DeltaCell delta={row.delta} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {position !== 'K' && (
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[10px] text-muted-foreground">Production Type:</span>
              <Badge variant="outline" className={`text-[10px] ${tdDep.pct >= 35 ? 'border-amber-500/30 text-amber-500' : 'border-emerald-500/30 text-emerald-500'}`} data-testid="badge-production-type">
                {tdDep.pct >= 35 ? <AlertTriangle className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                {tdDep.tag}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">{primaryUsageLabel} per Week</p>
          <p className="text-[10px] text-muted-foreground/60 mb-3">Gold = 3-week rolling avg</p>
          <div className="relative">
            <MiniBarChart data={primaryData} height={80} color="bg-primary/40" />
            <div className="absolute inset-0 flex items-end gap-[2px]" style={{ height: 80 }}>
              {rollingPrimary.map((val, i) => {
                const max = Math.max(...primaryData, 1);
                return (
                  <div key={i} className="flex-1 flex items-end justify-center h-full">
                    <div
                      className="w-1.5 rounded-full"
                      style={{
                        height: `${(val / max) * 100}%`,
                        background: 'linear-gradient(180deg, #F5D36E, #D4A843)',
                        minHeight: 2,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
            <span className="text-[10px] text-muted-foreground">Wk 1</span>
            <span className="text-[10px] text-muted-foreground">Wk {primaryData.length}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">{secondaryUsageLabel} per Week</p>
          <p className="text-[10px] text-muted-foreground/60 mb-3">Gold = 3-week rolling avg</p>
          <div className="relative">
            <MiniBarChart data={secondaryData} height={80} color="bg-chart-2/40" />
            <div className="absolute inset-0 flex items-end gap-[2px]" style={{ height: 80 }}>
              {rollingSecondary.map((val, i) => {
                const max = Math.max(...secondaryData, 1);
                return (
                  <div key={i} className="flex-1 flex items-end justify-center h-full">
                    <div
                      className="w-1.5 rounded-full"
                      style={{
                        height: `${(val / max) * 100}%`,
                        background: 'linear-gradient(180deg, #F5D36E, #D4A843)',
                        minHeight: 2,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
            <span className="text-[10px] text-muted-foreground">Wk 1</span>
            <span className="text-[10px] text-muted-foreground">Wk {secondaryData.length}</span>
          </div>
        </CardContent>
      </Card>

      {yardageData.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-medium mb-1">{yardageLabel} per Week</p>
            <p className="text-[10px] text-muted-foreground/60 mb-3">Gold = 3-week rolling avg</p>
            <div className="relative">
              <MiniBarChart data={yardageData} height={80} color="bg-chart-3/40" />
              <div className="absolute inset-0 flex items-end gap-[2px]" style={{ height: 80 }}>
                {rollingYardage.map((val, i) => {
                  const max = Math.max(...yardageData, 1);
                  return (
                    <div key={i} className="flex-1 flex items-end justify-center h-full">
                      <div
                        className="w-1.5 rounded-full"
                        style={{
                          height: `${(val / max) * 100}%`,
                          background: 'linear-gradient(180deg, #F5D36E, #D4A843)',
                          minHeight: 2,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
              <span className="text-[10px] text-muted-foreground">Wk 1</span>
              <span className="text-[10px] text-muted-foreground">Wk {yardageData.length}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">Fantasy Points ({SCORING_LABELS[format]}) - 3 Week Rolling Avg</p>
          <div className="relative">
            <MiniBarChart data={weeklyPts} height={80} color="bg-primary/30" />
            <div className="absolute inset-0 flex items-end gap-[2px]" style={{ height: 80 }}>
              {rollingPts.map((val, i) => {
                const max = Math.max(...weeklyPts, 1);
                return (
                  <div key={i} className="flex-1 flex items-end justify-center h-full">
                    <div
                      className="w-1.5 rounded-full"
                      style={{
                        height: `${(val / max) * 100}%`,
                        background: 'linear-gradient(180deg, #F5D36E, #D4A843)',
                        minHeight: 2,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
            <span className="text-[10px] text-muted-foreground">Wk 1</span>
            <span className="text-[10px] text-muted-foreground">Wk {weeklyPts.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RankingsTab({ player }: { player: Player }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">ROS Rank</p>
            <p className="text-3xl font-bold text-foreground mt-1">{'\u2014'}</p>
            <p className="text-xs text-muted-foreground mt-1">{player.position || 'Overall'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Dynasty Rank</p>
            <p className="text-3xl font-bold text-foreground mt-1">{'\u2014'}</p>
            <p className="text-xs text-muted-foreground mt-1">{player.position || 'Overall'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Redraft Rank</p>
            <p className="text-3xl font-bold text-foreground mt-1">{'\u2014'}</p>
            <p className="text-xs text-muted-foreground mt-1">{player.position || 'Overall'}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Trade Value Score</p>
              <p className="text-2xl font-bold text-foreground mt-1">{'\u2014'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">ADP vs Current</p>
              <p className="text-2xl font-bold text-foreground mt-1">{'\u2014'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium">Buy / Sell Signal</p>
          </div>
          <div className="rounded-md border border-dashed border-muted-foreground/25 p-6 text-center">
            <p className="text-muted-foreground text-sm">Rankings and trade values will be available once expert consensus data is integrated.</p>
          </div>
        </CardContent>
      </Card>

      <Link href={`/tools/`}>
        <Card className="hover-elevate cursor-pointer">
          <CardContent className="p-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-2 rounded-md bg-primary/10">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Analyze Trades Involving {player.name}</p>
                <p className="text-xs text-muted-foreground">Explore trade scenarios and value charts</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

function NewsTab({ player }: { player: Player }) {
  const entries = player.news || [];

  if (entries.length > 0) {
    return (
      <div className="space-y-3" data-testid="news-list">
        {entries.map((entry, i) => (
          <a
            key={i}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            data-testid={`link-news-${i}`}
          >
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="p-4 flex items-start gap-3 flex-wrap">
                <Newspaper className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  {entry.summary && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.summary}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground/60">{entry.source}</span>
                    <span className="text-[10px] text-muted-foreground/40">
                      {new Date(entry.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-dashed border-muted-foreground/25 p-12 text-center">
        <Newspaper className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm font-medium">No articles yet</p>
        <p className="text-muted-foreground/70 text-xs mt-1">
          News and analysis related to {player.name} will appear here as they are published.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/articles/">
          <Card className="hover-elevate cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3 flex-wrap">
              <div className="p-2 rounded-md bg-primary/10">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Browse Articles</p>
                <p className="text-xs text-muted-foreground">Expert analysis and insights</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/nfl/players">
          <Card className="hover-elevate cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3 flex-wrap">
              <div className="p-2 rounded-md bg-primary/10">
                <Search className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Search Players</p>
                <p className="text-xs text-muted-foreground">Find and compare players</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

function PlayerProfileSkeleton() {
  return (
    <>
      <div className="bg-slate-50 dark:bg-[#0B1634] border-b-2 border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-10">
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
      <div className="max-w-4xl mx-auto px-4 py-8">
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
    <div className="flex items-center gap-1" data-testid="scoring-format-toggle">
      <span className="text-xs text-muted-foreground mr-1.5 hidden sm:inline">Scoring:</span>
      <div className="flex rounded-md border border-border overflow-visible">
        {formats.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              format === f
                ? 'bg-[#D4A843] text-white dark:text-slate-900'
                : 'text-muted-foreground'
            } ${f === 'standard' ? 'rounded-l-md' : ''} ${f === 'ppr' ? 'rounded-r-md' : ''}`}
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

  const { data: relatedPlayers } = useQuery<LightPlayer[]>({
    queryKey: ["/api/players", slug, "related"],
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
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
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

  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative overflow-hidden border-b-2"
        style={{ borderBottomColor: `${teamColor}60` }}
        data-testid="section-player-header"
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, #F8FAFC 0%, #EEF2F7 50%, #E2E8F0 100%)` }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{ background: `linear-gradient(135deg, #0B1634 0%, #111D42 40%, #0F172A 100%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${teamColor} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent 0%, #D4A843 30%, #F5D36E 50%, #D4A843 70%, transparent 100%)` }}
        />

        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-8 md:pt-10 md:pb-10">
          <Link href="/nfl/players">
            <Button variant="ghost" size="sm" className="mb-4 -ml-1 text-slate-600 dark:text-slate-300" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-1" />
              All Players
            </Button>
          </Link>
          <div className="flex items-center gap-6 md:gap-8 flex-wrap">
            <PlayerHeadshot playerId={player.id} name={player.name} teamColor={teamColor} />
            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
                style={{ letterSpacing: '-0.02em', fontWeight: 800 }}
                data-testid="text-player-name"
              >
                {player.name}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap" data-testid="text-team">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{positionFull}</span>
                <span className="text-slate-400 dark:text-slate-500">{'\u00B7'}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: teamColor }} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{teamName}</span>
                </div>
                <span className="text-slate-400 dark:text-slate-500">{'\u00B7'}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400" data-testid="text-player-status">
                  {player.injury_status ? player.injury_status : (player.status || 'Active')}
                </span>
                {player.number && (
                  <>
                    <span className="text-slate-400 dark:text-slate-500">{'\u00B7'}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">#{player.number}</span>
                  </>
                )}
              </div>
              <div
                className="mt-2.5 mb-3 h-[2px] w-20 rounded-full"
                style={{ background: 'linear-gradient(90deg, #D4A843, #F5D36E, #D4A843)' }}
              />
              <div className="mt-3">
                <ScoringFormatToggle format={scoringFormat} onChange={setScoringFormat} />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap mt-2" data-testid="text-player-meta">
                {player.age && (
                  <span>Age <span className="font-semibold text-slate-700 dark:text-slate-300">{player.age}</span></span>
                )}
                {player.height && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span><span className="font-semibold text-slate-700 dark:text-slate-300">{formatHeight(player.height)}</span></span>
                  </>
                )}
                {player.weight && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span><span className="font-semibold text-slate-700 dark:text-slate-300">{player.weight}</span> lbs</span>
                  </>
                )}
                {player.years_exp != null && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span>Exp <span className="font-semibold text-slate-700 dark:text-slate-300">{player.years_exp} yr{player.years_exp !== 1 ? 's' : ''}</span></span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[53px] z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4">
          <nav
            className="flex gap-1 overflow-x-auto -mb-px scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            data-testid="profile-tabs"
          >
            {TAB_CONFIG.map(tab => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                  data-testid={`tab-${tab.key}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A843]' : ''}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      background: isActive
                        ? 'linear-gradient(90deg, #D4A843, #F5D36E, #D4A843)'
                        : 'transparent',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {player.injury_status && (
          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 flex-wrap">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Injury Status: {player.injury_status}</p>
                  <p className="text-sm text-muted-foreground">
                    This player is currently listed with an injury designation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

        {relatedPlayers && relatedPlayers.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-related-heading">
                Related {player.position}s
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedPlayers.map((rp) => (
                <Link key={rp.id} href={`/nfl/players/${rp.slug}/`}>
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-related-${rp.slug}`}>
                    <CardContent className="p-3 flex items-center gap-3 flex-wrap">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-[10px] font-bold text-muted-foreground">{rp.position}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{rp.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] px-1.5 py-0 ${POSITION_COLORS[rp.position || ""] || ""}`}
                          >
                            {rp.position}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{rp.team}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

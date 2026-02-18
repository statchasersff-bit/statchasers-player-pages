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
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import type { Player, GameLogEntry, NewsEntry, GameLogStats } from "@shared/playerTypes";
import { TEAM_FULL_NAMES, TEAM_PRIMARY_COLORS, POSITION_FULL_NAMES } from "@shared/teamMappings";
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

function getPositionColumns(position: string | null): { primary: ColumnDef[]; detail: ColumnDef[] } {
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
        detail: [
          { key: "rush_att", label: "CAR" },
          { key: "rush_yd", label: "RUSH YDS" },
        ],
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

function getTierThresholds(position: string | null): { elite: number; starter: number; bust: number } {
  switch (position) {
    case 'QB': return { elite: 5, starter: 12, bust: 18 };
    case 'RB': return { elite: 5, starter: 12, bust: 30 };
    case 'WR': return { elite: 5, starter: 12, bust: 36 };
    case 'TE': return { elite: 3, starter: 12, bust: 18 };
    default: return { elite: 5, starter: 12, bust: 30 };
  }
}

function computeGameLogStats(entries: GameLogEntry[], position: string | null = null) {
  if (entries.length === 0) return null;
  const gamesPlayed = entries.filter(e => e.stats.pts_ppr > 0).length;
  const totalPts = entries.reduce((s, e) => s + e.stats.pts_ppr, 0);
  const ppg = gamesPlayed > 0 ? totalPts / gamesPlayed : 0;
  const bestWeek = entries.reduce((best, e) => e.stats.pts_ppr > best.stats.pts_ppr ? e : best, entries[0]);
  const last4 = entries.slice(-4);
  const last4Pts = last4.reduce((s, e) => s + e.stats.pts_ppr, 0);
  const last4Gp = last4.filter(e => e.stats.pts_ppr > 0).length;
  const last4Ppg = last4Gp > 0 ? last4Pts / last4Gp : 0;

  const { elite: eliteThreshold, starter: starterThreshold, bust: bustThreshold } = getTierThresholds(position);
  const playedEntries = entries.filter(e => e.stats.pts_ppr > 0);
  const eliteGames = playedEntries.filter(e => e.pos_rank != null && e.pos_rank <= eliteThreshold).length;
  const starterGames = playedEntries.filter(e => e.pos_rank != null && e.pos_rank <= starterThreshold).length;
  const bustGames = playedEntries.filter(e => e.pos_rank != null && e.pos_rank > bustThreshold).length;
  const elitePct = gamesPlayed > 0 ? (eliteGames / gamesPlayed) * 100 : 0;
  const starterPct = gamesPlayed > 0 ? (starterGames / gamesPlayed) * 100 : 0;
  const bustPct = gamesPlayed > 0 ? (bustGames / gamesPlayed) * 100 : 0;

  const ptsArr = playedEntries.map(e => e.stats.pts_ppr);
  const mean = ptsArr.length > 0 ? ptsArr.reduce((a, b) => a + b, 0) / ptsArr.length : 0;
  const volatility = ptsArr.length > 1
    ? Math.sqrt(ptsArr.reduce((s, v) => s + (v - mean) ** 2, 0) / (ptsArr.length - 1))
    : 0;

  return { gamesPlayed, totalPts, ppg, bestWeek, last4Ppg, elitePct, starterPct, bustPct, eliteGames, starterGames, bustGames, volatility };
}

function getRankColor(rank: number | null | undefined): string {
  if (!rank) return '';
  if (rank <= 5) return 'text-green-600 dark:text-green-400 font-semibold';
  if (rank <= 12) return 'text-emerald-600 dark:text-emerald-400';
  if (rank <= 24) return 'text-foreground';
  return 'text-muted-foreground';
}

function GameLogTable({ entries = [], position }: { entries?: GameLogEntry[]; position: string | null }) {
  const { primary, detail } = getPositionColumns(position);
  const posLabel = position || '';
  const colCount = 4 + primary.length + (detail.length > 0 ? 1 : 0);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const hasDetail = detail.length > 0;

  const toggleRow = (index: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const getStat = (entry: GameLogEntry, key: string) =>
    (entry.stats as unknown as Record<string, number>)[key] ?? 0;

  const activeEntries = entries.filter(e => e.stats.pts_ppr > 0 || Object.values(e.stats as unknown as Record<string, number>).some(v => typeof v === 'number' && v > 0));
  const inactiveWeeks = entries.filter(e => e.stats.pts_ppr === 0 && !Object.values(e.stats as unknown as Record<string, number>).some(v => typeof v === 'number' && v > 0));
  const gamesPlayed = activeEntries.length;

  const rankedEntries = activeEntries.filter(e => e.pos_rank != null);
  const avgFinish = rankedEntries.length > 0
    ? rankedEntries.reduce((s, e) => s + (e.pos_rank ?? 0), 0) / rankedEntries.length
    : null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="table-game-log">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 pr-3 text-muted-foreground font-medium whitespace-nowrap">WK</th>
            <th className="py-2 pr-3 text-muted-foreground font-medium whitespace-nowrap">OPP</th>
            {primary.map((col) => (
              <th key={col.key} className="py-2 pr-3 text-muted-foreground font-medium text-right whitespace-nowrap">
                {col.label}
              </th>
            ))}
            <th className="py-2 pr-3 text-muted-foreground font-medium text-right whitespace-nowrap">FPTS</th>
            <th className="py-2 text-muted-foreground font-medium text-right whitespace-nowrap">FIN</th>
            {hasDetail && <th className="py-2 pl-2 w-8"></th>}
          </tr>
        </thead>
        <tbody>
          {activeEntries.length > 0 ? (
            <>
              {activeEntries.map((entry, i) => {
                const isExpanded = expandedRows.has(i);
                const rank = entry.pos_rank;
                return (
                  <Fragment key={i}>
                    <tr
                      className={`border-b last:border-0 ${hasDetail ? 'cursor-pointer' : ''} ${isExpanded ? 'bg-muted/30 dark:bg-slate-800/30' : ''}`}
                      onClick={hasDetail ? () => toggleRow(i) : undefined}
                      data-testid={`row-gamelog-week-${entry.week}`}
                    >
                      <td className="py-2 pr-3 text-foreground font-medium">{entry.week}</td>
                      <td className="py-2 pr-3 text-foreground whitespace-nowrap">{entry.opp}</td>
                      {primary.map((col) => (
                        <td key={col.key} className="py-2 pr-3 text-foreground text-right tabular-nums">
                          {getStat(entry, col.key)}
                        </td>
                      ))}
                      <td className="py-2 pr-3 text-right font-semibold text-foreground tabular-nums">
                        {entry.stats.pts_ppr.toFixed(1)}
                      </td>
                      <td className={`py-2 text-right tabular-nums text-xs ${getRankColor(rank)}`} data-testid={`text-finish-week-${entry.week}`}>
                        {rank ? `${posLabel}${rank}` : '\u2014'}
                      </td>
                      {hasDetail && (
                        <td className="py-2 pl-2 text-center">
                          <ChevronRight
                            className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200 inline-block ${isExpanded ? 'rotate-90' : ''}`}
                          />
                        </td>
                      )}
                    </tr>
                    {hasDetail && isExpanded && (
                      <tr className="bg-muted/20 dark:bg-slate-800/20" data-testid={`row-gamelog-detail-${entry.week}`}>
                        <td colSpan={colCount} className="py-2 px-3">
                          <div className="flex items-center gap-4 flex-wrap pl-2">
                            {detail.map((col) => (
                              <div key={col.key} className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{col.label}</span>
                                <span className="text-sm font-semibold text-foreground tabular-nums">{getStat(entry, col.key)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {inactiveWeeks.length > 0 && (
                <tr className="border-t" data-testid="row-gamelog-inactive">
                  <td colSpan={colCount} className="py-2 text-center text-xs text-muted-foreground/60 italic">
                    {inactiveWeeks.length} week{inactiveWeeks.length > 1 ? 's' : ''} inactive (Wk {inactiveWeeks.map(e => e.week).join(', ')})
                  </td>
                </tr>
              )}
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
        {activeEntries.length > 0 && (
          <tfoot>
            <tr className="border-t-2 border-foreground/20">
              <td className="py-2 pr-3 text-foreground font-bold text-xs uppercase tracking-wider" colSpan={2} data-testid="text-totals-label">
                <div className="flex flex-col">
                  <span>AVG/G</span>
                  <span className="text-[10px] text-muted-foreground font-normal normal-case tracking-normal">{gamesPlayed} games</span>
                </div>
              </td>
              {primary.map((col) => {
                const total = activeEntries.reduce((sum, e) => sum + getStat(e, col.key), 0);
                const avg = gamesPlayed > 0 ? total / gamesPlayed : 0;
                return (
                  <td key={col.key} className="py-2 pr-3 text-foreground text-right tabular-nums font-semibold">
                    {avg % 1 === 0 ? avg.toFixed(0) : avg.toFixed(1)}
                  </td>
                );
              })}
              <td className="py-2 pr-3 text-right text-foreground tabular-nums font-bold">
                {gamesPlayed > 0
                  ? (activeEntries.reduce((sum, e) => sum + e.stats.pts_ppr, 0) / gamesPlayed).toFixed(1)
                  : '0.0'}
              </td>
              <td className={`py-2 text-right tabular-nums text-xs font-semibold ${avgFinish ? getRankColor(Math.round(avgFinish)) : ''}`} data-testid="text-avg-finish">
                {avgFinish ? `${posLabel}${Math.round(avgFinish)}` : '\u2014'}
              </td>
              {hasDetail && <td className="py-2 pl-2"></td>}
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

function TrendArrow({ data, unit = 'PPG' }: { data: number[]; unit?: string }) {
  if (data.length < 4) return null;
  const recent = data.slice(-3);
  const earlier = data.slice(-6, -3);
  if (earlier.length === 0) return null;
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
  const diff = recentAvg - earlierAvg;
  const pct = earlierAvg > 0 ? ((diff) / earlierAvg) * 100 : 0;
  const delta = `${diff > 0 ? '+' : ''}${diff.toFixed(1)} ${unit}`;

  if (Math.abs(pct) < 5) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium" data-testid="text-trend-arrow">
        <Minus className="w-3.5 h-3.5" /> Stable <span className="text-muted-foreground/60">{delta}</span>
      </span>
    );
  }
  if (pct > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium" data-testid="text-trend-arrow">
        <ArrowUpRight className="w-3.5 h-3.5" /> {delta} <span className="opacity-70">({pct > 0 ? '+' : ''}{pct.toFixed(0)}%)</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-red-500 dark:text-red-400 font-medium" data-testid="text-trend-arrow">
      <ArrowDownRight className="w-3.5 h-3.5" /> {delta} <span className="opacity-70">({pct.toFixed(0)}%)</span>
    </span>
  );
}

function LineChartSVG({ data, rollingAvg, bestIdx, height = 120, label, accentColor = "hsl(var(--primary))", showAvgLine = false, highlightLast = 0 }: {
  data: number[];
  rollingAvg?: number[];
  bestIdx?: number;
  height?: number;
  label?: string;
  accentColor?: string;
  showAvgLine?: boolean;
  highlightLast?: number;
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
          <rect x={hlStart} y={padding.top} width={viewW - hlStart} height={chartH} fill={`url(#hl-${uid})`} rx="4" />
        )}

        {showAvgLine && (
          <>
            <line x1={0} y1={avgY} x2={viewW} y2={avgY} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.15" />
            <text x={viewW - 2} y={avgY - 4} textAnchor="end" className="fill-muted-foreground" fontSize="9" opacity="0.5">avg {avg.toFixed(1)}</text>
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

function getPositionOutlook(player: Player, stats: ReturnType<typeof computeGameLogStats>): string {
  if (!stats || stats.gamesPlayed === 0) return `${player.name} has not recorded any fantasy points this season. Check back as the season progresses for updated analysis.`;
  const pos = player.position || 'player';
  const trend = stats.last4Ppg > stats.ppg ? 'trending upward' : stats.last4Ppg < stats.ppg * 0.85 ? 'cooling off' : 'performing consistently';
  const tier = stats.ppg >= 20 ? 'elite' : stats.ppg >= 15 ? 'strong' : stats.ppg >= 10 ? 'solid' : 'depth';
  return `${player.name} is averaging ${stats.ppg.toFixed(1)} PPG as a ${tier} ${pos} option, ${trend} over the last 4 weeks (${stats.last4Ppg.toFixed(1)} PPG). Best outing was Week ${stats.bestWeek.week} vs ${stats.bestWeek.opp} with ${stats.bestWeek.stats.pts_ppr.toFixed(1)} points.`;
}

function getKeyStatSummary(entries: GameLogEntry[], position: string | null) {
  if (entries.length === 0) return [];
  const stats: { label: string; total: number; perGame: number }[] = [];
  const gp = entries.filter(e => e.stats.pts_ppr > 0).length || 1;
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
  elitePct: number;
  starterPct: number;
  bustPct: number;
}

type PlayerWithSeasons = Player & {
  availableSeasons?: number[];
  seasonLabel?: string | null;
  seasonRank?: number | null;
  multiSeasonStats?: SeasonStat[];
};

function OverviewTab({ player, entries }: { player: PlayerWithSeasons; entries: GameLogEntry[] }) {
  const stats = computeGameLogStats(entries, player.position);
  const keyStats = getKeyStatSummary(entries, player.position);
  const activeEntries = entries.filter(e => e.stats.pts_ppr > 0);
  const weeklyPts = activeEntries.map(e => e.stats.pts_ppr);
  const outlook = getPositionOutlook(player, stats);
  const hasData = stats && stats.gamesPlayed > 0;

  const seasonPpg = stats?.ppg ?? 0;
  const last4Ppg = stats?.last4Ppg ?? 0;

  const multi = player.multiSeasonStats || [];
  const hasMultiSeason = multi.length > 1;
  const multiYearAvg = hasMultiSeason ? (() => {
    const totalGames = multi.reduce((s, m) => s + m.gamesPlayed, 0);
    const totalPts = multi.reduce((s, m) => s + m.ppg * m.gamesPlayed, 0);
    const wElite = multi.reduce((s, m) => s + m.elitePct * m.gamesPlayed, 0);
    const wStarter = multi.reduce((s, m) => s + m.starterPct * m.gamesPlayed, 0);
    const wBust = multi.reduce((s, m) => s + m.bustPct * m.gamesPlayed, 0);
    return {
      ppg: totalGames > 0 ? totalPts / totalGames : 0,
      elitePct: totalGames > 0 ? wElite / totalGames : 0,
      starterPct: totalGames > 0 ? wStarter / totalGames : 0,
      bustPct: totalGames > 0 ? wBust / totalGames : 0,
      seasons: multi.length,
      games: totalGames,
    };
  })() : null;

  const thresholds = getTierThresholds(player.position);
  const posLabel = player.position || '';

  return (
    <div className="space-y-6">
      {hasData ? (() => {
        const volLabel = stats.volatility < 6 ? 'Stable' : stats.volatility < 9 ? 'Moderate' : 'Volatile';
        const volColor = stats.volatility < 6
          ? 'text-green-600 dark:text-green-400'
          : stats.volatility < 9
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-red-500 dark:text-red-400';

        const cv = seasonPpg > 0 ? (stats.volatility / seasonPpg) * 100 : 100;
        const consistencyScore = Math.max(0, Math.min(100, Math.round(100 - cv * 1.5)));
        const conLabel = consistencyScore >= 70 ? 'Very Consistent' : consistencyScore >= 45 ? 'Average' : 'Boom or Bust';
        const conColor = consistencyScore >= 70
          ? 'text-green-600 dark:text-green-400'
          : consistencyScore >= 45
          ? 'text-foreground'
          : 'text-red-500 dark:text-red-400';

        return (
        <>
          <div data-testid="overview-stat-boxes" className="space-y-2">
            {player.seasonLabel && (
              <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider" data-testid="text-season-label">
                {player.seasonLabel}
              </p>
            )}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">Performance</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-md bg-muted/60 dark:bg-slate-800/70 text-center ring-1 ring-border/40">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">PPG</p>
                <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">{seasonPpg.toFixed(1)}</p>
                <p className="text-[10px] text-muted-foreground/70">
                  {player.seasonRank ? `${stats.gamesPlayed} GP \u00B7 ${posLabel}${player.seasonRank}` : `${stats.gamesPlayed} GP`}
                </p>
              </div>
              <div className="p-3 rounded-md bg-amber-500/8 dark:bg-amber-900/15 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Elite %</p>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums mt-0.5">{stats.elitePct.toFixed(0)}%</p>
                <p className="text-[10px] text-muted-foreground/70">Top {thresholds.elite} Weekly Finishes</p>
              </div>
              <div className="p-3 rounded-md bg-sky-500/8 dark:bg-sky-900/15 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Starter %</p>
                <p className="text-lg font-bold text-sky-600 dark:text-sky-400 tabular-nums mt-0.5">{stats.starterPct.toFixed(0)}%</p>
                <p className="text-[10px] text-muted-foreground/70">Top 12 Weekly Finishes</p>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium pt-1">Risk</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-md bg-red-500/8 dark:bg-red-900/15 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Bust %</p>
                <p className="text-lg font-bold text-red-500 dark:text-red-400 tabular-nums mt-0.5">{stats.bustPct.toFixed(0)}%</p>
                <p className="text-[10px] text-muted-foreground/70">Outside Top {thresholds.bust}</p>
              </div>
              <div className="p-3 rounded-md bg-muted/50 dark:bg-slate-800/60 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Volatility</p>
                <p className={`text-lg font-bold tabular-nums mt-0.5 ${volColor}`}>{stats.volatility.toFixed(1)}</p>
                <p className="text-[10px] text-muted-foreground/70">{volLabel}</p>
              </div>
              <div className="p-3 rounded-md bg-muted/50 dark:bg-slate-800/60 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Consistency</p>
                <p className={`text-lg font-bold tabular-nums mt-0.5 ${conColor}`}>{consistencyScore}</p>
                <p className="text-[10px] text-muted-foreground/70">{conLabel}</p>
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

            return (
              <Card>
                <CardContent className="p-4 space-y-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-muted-foreground font-medium">Points Trend</p>
                        <span className="text-[10px] text-muted-foreground/60">(3-wk rolling avg)</span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        {bestEntry && (
                          <span className="text-[10px] text-muted-foreground">
                            Best: <span className="font-semibold text-foreground">{bestVal.toFixed(1)}</span>
                            <span className="text-muted-foreground/60 ml-0.5">Wk {bestEntry.week}</span>
                          </span>
                        )}
                        <TrendArrow data={weeklyPts} unit="PPG" />
                      </div>
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
                    />
                    <p className="text-[10px] text-muted-foreground/70 mt-1.5" data-testid="text-points-insight">
                      Averaging <span className="font-medium text-foreground/80">{last3Avg.toFixed(1)} PPG</span> over last 3 weeks
                      {Math.abs(last3Pct) >= 1 && (
                        <span className={last3Pct > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
                          {' '}({last3Pct > 0 ? '+' : ''}{last3Pct.toFixed(0)}% vs season avg)
                        </span>
                      )}
                    </p>
                  </div>

                  {secondaryData && secondaryData.length > 1 && secondaryMetric && (
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs text-muted-foreground font-medium">Usage Trend</p>
                          <span className="text-[10px] text-muted-foreground/60">{secondaryMetric.label} (3-wk avg)</span>
                        </div>
                        <TrendArrow data={secondaryData} unit={secondaryMetric.unit} />
                      </div>
                      <LineChartSVG
                        data={secondaryData}
                        rollingAvg={secondaryRolling || undefined}
                        height={90}
                        label="secondary"
                        accentColor="hsl(var(--chart-2))"
                        showAvgLine
                        highlightLast={3}
                      />
                      {sec3Avg != null && secSeasonAvg != null && (
                        <p className="text-[10px] text-muted-foreground/70 mt-1.5" data-testid="text-usage-insight">
                          Averaging <span className="font-medium text-foreground/80">{sec3Avg.toFixed(1)} {secondaryMetric.unit}/gm</span> over last 3 weeks
                          {sec3Pct != null && Math.abs(sec3Pct) >= 1 && (
                            <span className={sec3Pct > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
                              {' '}({sec3Pct > 0 ? '+' : ''}{sec3Pct.toFixed(0)}% vs season avg)
                            </span>
                          )}
                        </p>
                      )}
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

          {multiYearAvg && (
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium mb-3">
                  {multiYearAvg.seasons}-Year Career Averages
                  <span className="text-muted-foreground/60 ml-1">({multiYearAvg.games} games)</span>
                </p>
                <div className="grid grid-cols-4 gap-3" data-testid="multi-season-averages">
                  <div className="text-center p-2 rounded-md bg-muted/30 dark:bg-slate-800/40">
                    <p className="text-lg font-bold text-foreground tabular-nums">{multiYearAvg.ppg.toFixed(1)}</p>
                    <p className="text-[10px] text-muted-foreground">PPG</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-green-500/10 dark:bg-green-900/20">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400 tabular-nums">{multiYearAvg.elitePct.toFixed(0)}%</p>
                    <p className="text-[10px] text-muted-foreground">Elite %</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-blue-500/10 dark:bg-blue-900/20">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 tabular-nums">{multiYearAvg.starterPct.toFixed(0)}%</p>
                    <p className="text-[10px] text-muted-foreground">Starter %</p>
                  </div>
                  <div className="text-center p-2 rounded-md bg-red-500/10 dark:bg-red-900/20">
                    <p className="text-lg font-bold text-red-500 dark:text-red-400 tabular-nums">{multiYearAvg.bustPct.toFixed(0)}%</p>
                    <p className="text-[10px] text-muted-foreground">Bust %</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium">Quick Outlook</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed" data-testid="text-outlook">{outlook}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function GameLogTab({ player }: { player: PlayerWithSeasons }) {
  const availableSeasons = player.availableSeasons || (player.season ? [player.season] : []);
  const [selectedSeason, setSelectedSeason] = useState<number>(availableSeasons[0] || new Date().getFullYear());
  const isDefaultSeason = selectedSeason === availableSeasons[0];

  const { data: seasonGameLog, isLoading: isSeasonLoading } = useQuery<GameLogEntry[]>({
    queryKey: ["/api/players", player.slug, "game-log", selectedSeason],
    queryFn: async () => {
      const res = await fetch(`/api/players/${player.slug}/game-log?season=${selectedSeason}`);
      if (!res.ok) throw new Error("Failed to fetch game log");
      return res.json();
    },
    enabled: !isDefaultSeason,
  });

  const entries = isDefaultSeason ? (player.gameLog || []) : (seasonGameLog || []);
  const stats = computeGameLogStats(entries, player.position);
  const thresholds = getTierThresholds(player.position);
  const posLabel = player.position || '';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-lg font-semibold text-foreground" data-testid="text-gamelog-heading">
          Game Log
        </h2>
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

      {stats && (
        <div className="grid grid-cols-5 gap-2" data-testid="gamelog-summary-bar">
          <StatBox label="Games" value={stats.gamesPlayed} />
          <StatBox label="PPG" value={stats.ppg.toFixed(1)} />
          <div className="p-3 rounded-md bg-green-500/10 dark:bg-green-900/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Elite %</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400 tabular-nums mt-0.5" data-testid="text-elite-pct">{stats.elitePct.toFixed(0)}%</p>
            <p className="text-[10px] text-muted-foreground/70">Top {thresholds.elite} {posLabel}</p>
          </div>
          <div className="p-3 rounded-md bg-blue-500/10 dark:bg-blue-900/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Starter %</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 tabular-nums mt-0.5" data-testid="text-starter-pct">{stats.starterPct.toFixed(0)}%</p>
            <p className="text-[10px] text-muted-foreground/70">Top 12 {posLabel}</p>
          </div>
          <div className="p-3 rounded-md bg-red-500/10 dark:bg-red-900/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Bust %</p>
            <p className="text-lg font-bold text-red-500 dark:text-red-400 tabular-nums mt-0.5" data-testid="text-bust-pct">{stats.bustPct.toFixed(0)}%</p>
            <p className="text-[10px] text-muted-foreground/70">{posLabel}{thresholds.bust}+</p>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          {isSeasonLoading && !isDefaultSeason ? (
            <div className="py-8 text-center">
              <Skeleton className="h-4 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          ) : (
            <GameLogTable entries={entries} position={player.position} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UsageTrendsTab({ player, entries }: { player: PlayerWithSeasons; entries: GameLogEntry[] }) {
  const position = player.position;

  const weeklyPts = entries.map(e => e.stats.pts_ppr);
  const rollingPts = getRollingAverage(entries, 'pts_ppr', 3);

  let primaryUsageKey = '';
  let primaryUsageLabel = '';
  let secondaryUsageKey = '';
  let secondaryUsageLabel = '';

  if (position === 'QB') {
    primaryUsageKey = 'pass_att';
    primaryUsageLabel = 'Pass Attempts';
    secondaryUsageKey = 'rush_att';
    secondaryUsageLabel = 'Rush Attempts';
  } else if (position === 'RB') {
    primaryUsageKey = 'rush_att';
    primaryUsageLabel = 'Carries';
    secondaryUsageKey = 'rec_tgt';
    secondaryUsageLabel = 'Targets';
  } else if (position === 'WR' || position === 'TE') {
    primaryUsageKey = 'rec_tgt';
    primaryUsageLabel = 'Targets';
    secondaryUsageKey = 'rec';
    secondaryUsageLabel = 'Receptions';
  } else if (position === 'K') {
    primaryUsageKey = 'fga';
    primaryUsageLabel = 'FG Attempts';
    secondaryUsageKey = 'xpa';
    secondaryUsageLabel = 'XP Attempts';
  }

  const primaryData = entries.map(e => (e.stats as unknown as Record<string, number>)[primaryUsageKey] ?? 0);
  const secondaryData = entries.map(e => (e.stats as unknown as Record<string, number>)[secondaryUsageKey] ?? 0);
  const rollingPrimary = getRollingAverage(entries, primaryUsageKey, 3);
  const rollingSecondary = getRollingAverage(entries, secondaryUsageKey, 3);

  const gp = entries.filter(e => e.stats.pts_ppr > 0).length || 1;
  const avgPrimary = primaryData.reduce((a, b) => a + b, 0) / gp;
  const avgSecondary = secondaryData.reduce((a, b) => a + b, 0) / gp;

  let yardageKey = '';
  let yardageLabel = '';
  if (position === 'QB') { yardageKey = 'pass_yd'; yardageLabel = 'Pass Yards'; }
  else if (position === 'RB') { yardageKey = 'rush_yd'; yardageLabel = 'Rush Yards'; }
  else if (position === 'WR' || position === 'TE') { yardageKey = 'rec_yd'; yardageLabel = 'Rec Yards'; }

  const yardageData = yardageKey ? entries.map(e => (e.stats as unknown as Record<string, number>)[yardageKey] ?? 0) : [];
  const rollingYardage = yardageKey ? getRollingAverage(entries, yardageKey, 3) : [];

  if (entries.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-muted-foreground/25 p-12 text-center">
        <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm font-medium">Usage data not yet available</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Check back once the season is underway.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatBox label={`${primaryUsageLabel}/Game`} value={avgPrimary.toFixed(1)} />
        <StatBox label={`${secondaryUsageLabel}/Game`} value={avgSecondary.toFixed(1)} />
        {yardageKey && (
          <StatBox
            label={`${yardageLabel}/Game`}
            value={(yardageData.reduce((a, b) => a + b, 0) / gp).toFixed(1)}
          />
        )}
      </div>

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
          <p className="text-xs text-muted-foreground font-medium mb-1">Fantasy Points - 3 Week Rolling Avg</p>
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

export default function PlayerProfile() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const { data: player, isLoading, error } = useQuery<Player>({
    queryKey: ["/api/players", slug],
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
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
            <Link href="/nfl/players">
              <Button variant="ghost" size="icon" data-testid="button-back-skeleton">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Skeleton className="h-5 w-24" />
          </div>
        </header>
        <PlayerProfileSkeleton />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
            <Link href="/nfl/players">
              <Button variant="ghost" size="icon" data-testid="button-back-error">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <span className="font-bold text-foreground">StatChasers</span>
          </div>
        </header>
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
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/nfl/players">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <span className="text-lg font-bold tracking-tight text-foreground" data-testid="link-logo">
                StatChasers
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/nfl/players">
              <Button variant="ghost" size="sm" data-testid="link-players">
                <Search className="w-4 h-4 mr-1" />
                Players
              </Button>
            </Link>
            <Link href="/rankings/">
              <Button variant="ghost" size="sm" data-testid="link-rankings">Rankings</Button>
            </Link>
            <Link href="/tools/">
              <Button variant="ghost" size="sm" data-testid="link-tools">Tools</Button>
            </Link>
            <Link href="/articles/">
              <Button variant="ghost" size="sm" data-testid="link-articles">Articles</Button>
            </Link>
          </nav>
        </div>
      </header>

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
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap" data-testid="text-player-meta">
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
            <OverviewTab player={playerWithSeasons} entries={defaultEntries} />
          )}
          {activeTab === "gamelog" && (
            <GameLogTab player={playerWithSeasons} />
          )}
          {activeTab === "usage" && (
            <UsageTrendsTab player={playerWithSeasons} entries={defaultEntries} />
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

      <footer className="border-t bg-card mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          StatChasers - Fantasy Football Intelligence
        </div>
      </footer>
    </div>
  );
}

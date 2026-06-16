import type { ColDef } from './advancedStatsMeta';
import { formatVal } from './advancedStatsMeta';
import { computeQbCompositeScores, QB_SCORE_CATEGORIES } from './qbCompositeScores';
import { computeRbCompositeScores, RB_SCORE_CATEGORIES } from './rbCompositeScores';
import {
  computeWrCompositeScores, computeTeCompositeScores,
  WR_SCORE_CATEGORIES, TE_SCORE_CATEGORIES,
} from './receivingComposites';

// ── Types ────────────────────────────────────────────────────────────────────

export type RankTier = 'elite' | 'great' | 'solid' | 'average' | 'poor';
export type RankCategory = 'production' | 'usage' | 'efficiency' | 'advanced';

export interface StatRank {
  rank: number;
  total: number;
  tier: RankTier;
}

export interface RankCard {
  key: string;
  label: string;
  value: string;
  rank: number;
  total: number;
  tier: RankTier;
  percentile: number;
  category: RankCategory;
  overview: boolean;
  position: string;
  behindPlayer?: string;
  aheadPlayer?: string;
}

export interface PlayerSeasonStats {
  season: number | string;
  row: Record<string, unknown>;
  columns: ColDef[];
}

export interface CompositeScore {
  label: string;
  rank: number | null;
  total: number | null;
  percentile: number | null;
  explanation: string;
}

export interface PlayerAdvancedResult {
  latest: PlayerSeasonStats | null;
  composites: CompositeScore[];
  rankCards: RankCard[];
  statRanks: Record<string, StatRank>;
}

// ── Rank-card stat definitions per position ───────────────────────────────────

interface RankStatDef {
  key: string;
  label: string;
  category: RankCategory;
  overview?: boolean;
  inverted?: boolean;
}

const QB_RANK_STATS: RankStatDef[] = [
  { key: 'fantasyPoints',     label: 'Fantasy Points',   category: 'production', overview: true },
  { key: 'passingYards',      label: 'Passing Yards',    category: 'production', overview: true },
  { key: 'passingTouchdowns', label: 'Pass TDs',         category: 'production', overview: true },
  { key: 'completionPct',     label: 'Completion %',     category: 'efficiency', overview: true },
  { key: 'epaPerPlay',        label: 'EPA / Play',       category: 'efficiency', overview: true },
  { key: 'cpoe',              label: 'CPOE',             category: 'efficiency', overview: true },
  { key: 'deepAttemptPct',    label: 'Deep Att %',       category: 'advanced',   overview: true },
  { key: 'rushYards',         label: 'Rush Yards',       category: 'production' },
  { key: 'attempts',          label: 'Attempts',         category: 'usage' },
  { key: 'onTargetPct',       label: 'On-Target %',      category: 'efficiency' },
  { key: 'badThrowPct',       label: 'Bad Throw %',      category: 'efficiency', inverted: true },
  { key: 'pressurePct',       label: 'Pressure %',       category: 'advanced',   inverted: true },
];

const RB_RANK_STATS: RankStatDef[] = [
  { key: 'fantasyPoints',             label: 'Fantasy Points',   category: 'production', overview: true },
  { key: 'rushYards',                 label: 'Rush Yards',       category: 'production', overview: true },
  { key: 'rushAttempts',              label: 'Rush Att',         category: 'usage',      overview: true },
  { key: 'targets',                   label: 'Targets',          category: 'usage',      overview: true },
  { key: 'yardsPerCarry',             label: 'Y / Carry',        category: 'efficiency', overview: true },
  { key: 'epaPerPlay',                label: 'EPA / Play',       category: 'efficiency', overview: true },
  { key: 'explosiveRunPct',           label: 'Explosive %',      category: 'advanced',   overview: true },
  { key: 'yardsAfterContactPerAttempt', label: 'YAC / Att',      category: 'advanced',   overview: true },
  { key: 'snapPct',                   label: 'Snap %',           category: 'usage' },
  { key: 'brokenTackles',             label: 'Broken Tackles',   category: 'advanced' },
  { key: 'redZoneOpportunities',      label: 'RZ Opp',           category: 'usage' },
  { key: 'targetSharePct',            label: 'Target Share %',   category: 'usage' },
];

const WR_RANK_STATS: RankStatDef[] = [
  { key: 'fantasyPoints',      label: 'Fantasy Points',    category: 'production', overview: true },
  { key: 'targets',            label: 'Targets',           category: 'usage',      overview: true },
  { key: 'targetsPerRouteRun', label: 'TPRR',              category: 'usage',      overview: true },
  { key: 'targetSharePct',     label: 'Target Share %',    category: 'usage',      overview: true },
  { key: 'receivingYards',     label: 'Rec Yards',         category: 'production', overview: true },
  { key: 'yardsPerRouteRun',   label: 'YPRR',              category: 'efficiency', overview: true },
  { key: 'wopr',               label: 'WOPR',              category: 'advanced',   overview: true },
  { key: 'epaPerPlay',         label: 'EPA / Play',        category: 'efficiency', overview: true },
  { key: 'airYardsSharePct',   label: 'Air Yards Share %', category: 'advanced' },
  { key: 'catchPct',           label: 'Catch %',           category: 'efficiency' },
  { key: 'receptions20Plus',   label: '20+ Rec',           category: 'advanced' },
  { key: 'dropPct',            label: 'Drop %',            category: 'efficiency', inverted: true },
];

const TE_RANK_STATS: RankStatDef[] = [
  { key: 'fantasyPoints',      label: 'Fantasy Points',  category: 'production', overview: true },
  { key: 'targets',            label: 'Targets',         category: 'usage',      overview: true },
  { key: 'targetsPerRouteRun', label: 'TPRR',            category: 'usage',      overview: true },
  { key: 'targetSharePct',     label: 'Target Share %',  category: 'usage',      overview: true },
  { key: 'receivingYards',     label: 'Rec Yards',       category: 'production', overview: true },
  { key: 'yardsPerRouteRun',   label: 'YPRR',            category: 'efficiency', overview: true },
  { key: 'wopr',               label: 'WOPR',            category: 'advanced',   overview: true },
  { key: 'catchPct',           label: 'Catch %',         category: 'efficiency', overview: true },
  { key: 'epaPerPlay',         label: 'EPA / Play',      category: 'efficiency' },
  { key: 'routes',             label: 'Routes',          category: 'usage' },
  { key: 'dropPct',            label: 'Drop %',          category: 'efficiency', inverted: true },
];

const RANK_STATS_BY_POS: Record<string, RankStatDef[]> = {
  qb: QB_RANK_STATS, rb: RB_RANK_STATS, wr: WR_RANK_STATS, te: TE_RANK_STATS,
};

// ── Inverted stats for section rank decoration ────────────────────────────────

const INVERTED_BY_POS: Record<string, Set<string>> = {
  qb: new Set(['badThrowPct', 'poorThrows', 'interceptions', 'fumbles', 'pressurePct', 'sacks', 'battedPasses']),
  rb: new Set(['fumbles', 'tacklesForLoss', 'rushAttForNegativeYards']),
  wr: new Set(['drops', 'dropPct', 'interceptionsWhenTargeted', 'fumbles']),
  te: new Set(['drops', 'dropPct', 'interceptionsWhenTargeted', 'fumbles']),
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function tierFromRank(rank: number, total: number): RankTier {
  const pct = (rank / total) * 100;
  if (pct <= 10) return 'elite';
  if (pct <= 25) return 'great';
  if (pct <= 45) return 'solid';
  if (pct <= 65) return 'average';
  return 'poor';
}

function rankStat(
  playerId: string,
  rows: Array<Record<string, unknown>>,
  key: string,
  inverted: boolean,
): { rank: number; total: number; tier: RankTier; behindPlayer?: string; aheadPlayer?: string } | null {
  const valid = rows.filter(r => {
    const v = r[key];
    return v != null && typeof v === 'number' && Number.isFinite(v as number);
  });
  if (!valid.length) return null;
  const sorted = [...valid].sort((a, b) =>
    inverted ? (a[key] as number) - (b[key] as number) : (b[key] as number) - (a[key] as number),
  );
  const idx = sorted.findIndex(r => String(r.playerId) === playerId);
  if (idx < 0) return null;
  const rank = idx + 1;
  const total = sorted.length;
  return {
    rank, total,
    tier: tierFromRank(rank, total),
    behindPlayer: idx > 0 ? String(sorted[idx - 1].playerName ?? '') : undefined,
    aheadPlayer: idx < total - 1 ? String(sorted[idx + 1].playerName ?? '') : undefined,
  };
}

function isQualified(row: Record<string, unknown>, pos: string): boolean {
  const g = Number(row.games ?? 0);
  if (pos === 'qb') return g >= 5 && Number(row.attempts ?? 0) >= 100;
  if (pos === 'rb') return Number(row.rushAttempts ?? 0) >= 50 || Number(row.targets ?? 0) >= 25;
  if (pos === 'wr') return Number(row.targets ?? 0) >= 40 || Number(row.routes ?? 0) >= 150;
  if (pos === 'te') return Number(row.targets ?? 0) >= 25 || Number(row.routes ?? 0) >= 100;
  return true;
}

// ── Composite computation ─────────────────────────────────────────────────────

interface ScoreCategory { key: string; label: string; description: string }

function buildCompositesResult(
  playerId: string,
  rows: Array<Record<string, unknown>>,
  scores: Array<Record<string, number>>,
  categories: ScoreCategory[],
): CompositeScore[] {
  return categories.map(cat => {
    const allScores = scores.map(s => s[cat.key]).filter(v => v != null) as number[];
    const playerIdx = rows.findIndex(r => String(r.playerId) === playerId);
    const playerScore = playerIdx >= 0 ? scores[playerIdx]?.[cat.key] : null;

    if (playerScore == null || !allScores.length) {
      return { label: cat.label, rank: null, total: null, percentile: null, explanation: cat.description };
    }

    const sorted = [...allScores].sort((a, b) => b - a);
    const rank = sorted.findIndex(s => s <= playerScore) + 1 || sorted.length;
    const total = sorted.length;
    const percentile = Math.max(1, Math.round((rank / total) * 100));

    return { label: cat.label, rank, total, percentile, explanation: cat.description };
  });
}

// ── Main loader ───────────────────────────────────────────────────────────────

export async function loadPlayerAdvancedStats(
  playerId: string,
  position: string,
  season: number | 'all',
): Promise<PlayerAdvancedResult | null> {
  const pos = position.toLowerCase();
  if (!['qb', 'rb', 'wr', 'te'].includes(pos)) return null;

  const res = await fetch(`/api/advanced-stats/${pos}/${season}`);
  if (!res.ok) return null;
  const file: { columns: ColDef[]; rows: Array<Record<string, unknown>> } = await res.json();

  const { columns, rows } = file;
  const playerRow = rows.find(r => String(r.playerId) === String(playerId)) ?? null;

  if (!playerRow) {
    return { latest: null, composites: [], rankCards: [], statRanks: {} };
  }

  const latest: PlayerSeasonStats = { season, row: playerRow, columns };

  const pool = rows.filter(r => isQualified(r, pos));
  const playerInPool = pool.some(r => String(r.playerId) === String(playerId));
  const rankPool = playerInPool ? pool : rows;

  // ── Rank cards ──────────────────────────────────────────────────────────────
  const defs = RANK_STATS_BY_POS[pos] ?? [];
  const colMap = new Map(columns.map(c => [c.key, c]));
  const rankCards: RankCard[] = [];

  for (const def of defs) {
    const col = colMap.get(def.key);
    if (!col) continue;
    const r = rankStat(String(playerId), rankPool, def.key, !!def.inverted);
    if (!r) continue;
    const barFill = Math.max(1, Math.round(((r.total - r.rank + 1) / r.total) * 100));
    rankCards.push({
      key: def.key,
      label: def.label,
      value: formatVal(playerRow[def.key], col.type),
      rank: r.rank,
      total: r.total,
      tier: r.tier,
      percentile: barFill,
      category: def.category,
      overview: !!def.overview,
      position: pos.toUpperCase(),
      behindPlayer: r.behindPlayer,
      aheadPlayer: r.aheadPlayer,
    });
  }

  // ── Stat ranks (all defaultVisible numeric columns) ─────────────────────────
  const invertedSet = INVERTED_BY_POS[pos] ?? new Set();
  const statRanks: Record<string, StatRank> = {};

  for (const col of columns) {
    if (col.type === 'string') continue;
    if (['rank', 'games', 'playerId', 'season', 'position', 'age'].includes(col.key)) continue;
    const r = rankStat(String(playerId), rankPool, col.key, invertedSet.has(col.key));
    if (!r) continue;
    statRanks[col.key] = { rank: r.rank, total: r.total, tier: r.tier };
  }

  // ── Composites ───────────────────────────────────────────────────────────────
  let composites: CompositeScore[] = [];

  if (pos === 'qb') {
    const scores = computeQbCompositeScores(rows) as Array<Record<string, number>>;
    composites = buildCompositesResult(String(playerId), rows, scores, QB_SCORE_CATEGORIES);
  } else if (pos === 'rb') {
    const scores = computeRbCompositeScores(rows) as Array<Record<string, number>>;
    composites = buildCompositesResult(String(playerId), rows, scores, RB_SCORE_CATEGORIES);
  } else if (pos === 'wr') {
    const scores = computeWrCompositeScores(rows) as Array<Record<string, number>>;
    composites = buildCompositesResult(String(playerId), rows, scores, WR_SCORE_CATEGORIES);
  } else if (pos === 'te') {
    const scores = computeTeCompositeScores(rows) as Array<Record<string, number>>;
    composites = buildCompositesResult(String(playerId), rows, scores, TE_SCORE_CATEGORIES);
  }

  return { latest, composites, rankCards, statRanks };
}

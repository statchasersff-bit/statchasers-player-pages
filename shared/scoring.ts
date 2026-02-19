import type { GameLogStats } from "./playerTypes";

export type ScoringFormat = 'standard' | 'half' | 'ppr';

export const SCORING_LABELS: Record<ScoringFormat, string> = {
  standard: 'Standard',
  half: 'Half-PPR',
  ppr: 'PPR',
};

export function getFantasyPoints(stats: GameLogStats, format: ScoringFormat): number {
  let pts = 0;
  pts += (stats.pass_yd ?? 0) * 0.04;
  pts += (stats.pass_td ?? 0) * 4;
  pts += (stats.pass_int ?? 0) * -1;
  pts += (stats.rush_yd ?? 0) * 0.1;
  pts += (stats.rush_td ?? 0) * 6;
  pts += (stats.rec_yd ?? 0) * 0.1;
  pts += (stats.rec_td ?? 0) * 6;
  pts += (stats.fgm ?? 0) * 3;
  pts += (stats.xpm ?? 0) * 1;

  if (format === 'ppr') {
    pts += (stats.rec ?? 0) * 1;
  } else if (format === 'half') {
    pts += (stats.rec ?? 0) * 0.5;
  }

  return Math.round(pts * 100) / 100;
}

export function getEntryPoints(stats: GameLogStats, format: ScoringFormat): number {
  if (format === 'ppr') return stats.pts_ppr;
  if (format === 'half' && stats.pts_half_ppr != null) return stats.pts_half_ppr;
  return getFantasyPoints(stats, format);
}

import { percentileColumnAgainst, clampScore, toFiniteNumber as num } from './percentiles';

export function isQualifiedQb(row: Record<string, unknown>): boolean {
  return num(row.games) >= 5 && num(row.attempts) >= 100;
}

export interface QbCompositeScores {
  volumeScore: number;
  accuracyScore: number;
  explosivenessScore: number;
  mobilityScore: number;
  efficiencyScore: number;
  overallQBGrade: number;
}

export type QbScoreKey = keyof QbCompositeScores;

export interface QbScoreCategory {
  key: QbScoreKey;
  label: string;
  shortLabel: string;
  description: string;
}

export const QB_SCORE_CATEGORIES: QbScoreCategory[] = [
  {
    key: 'overallQBGrade',
    label: 'Overall QB Grade',
    shortLabel: 'Overall',
    description: 'Overall QB Grade (0-100): equal blend of Volume, Accuracy, Explosiveness, Mobility, and Efficiency. Percentile-based across all QBs in the selected season.',
  },
  {
    key: 'volumeScore',
    label: 'Volume',
    shortLabel: 'Vol',
    description: 'Volume (0-100): workload & opportunity. Attempts 35%, RZ Attempts 25%, Passing Yds 20%, Rush Attempts 10%, Rush Yds 10%.',
  },
  {
    key: 'accuracyScore',
    label: 'Accuracy',
    shortLabel: 'Acc',
    description: 'Accuracy (0-100): throwing precision & ball placement. Comp% 25%, On-Target% 25%, CPOE 25%, Bad-Throw% 15% (inv), Poor Throws 10% (inv).',
  },
  {
    key: 'explosivenessScore',
    label: 'Explosiveness',
    shortLabel: 'Exp',
    description: 'Explosiveness (0-100): aggressiveness & deep-ball upside. AY/Att 20%, Deep-Att% 20%, 20+ 20%, 30+ 15%, 40+ 10%, 50+ 5%, Longest 10%.',
  },
  {
    key: 'mobilityScore',
    label: 'Mobility',
    shortLabel: 'Mob',
    description: 'Mobility (0-100): rushing & scrambling value. Rush Yds 30%, Rush Attempts 25%, Rush TDs 20%, Scramble Rate 15%, Yds/Scramble 10%.',
  },
  {
    key: 'efficiencyScore',
    label: 'Efficiency',
    shortLabel: 'Eff',
    description: 'Efficiency (0-100): offensive effectiveness on a rate basis. EPA/Play 35%, Success Rate 25%, TD Rate 20%, Yards/Attempt 15%, Completed AY/Completion 5%.',
  },
];

export const QB_SCORE_KEYS: QbScoreKey[] = QB_SCORE_CATEGORIES.map(c => c.key);

type QbRow = Record<string, unknown>;

const tdRate = (r: QbRow) => { const a = num(r.attempts); return a > 0 ? num(r.passingTouchdowns) / a : 0; };
const yardsPerAttempt = (r: QbRow) => { const a = num(r.attempts); return a > 0 ? num(r.passingYards) / a : 0; };
const airYardsPerAttempt = (r: QbRow) => { const a = num(r.attempts); return a > 0 ? num(r.airYards) / a : 0; };
const compAirYardsPerCompletion = (r: QbRow) => { const c = num(r.completions); return c > 0 ? num(r.completedAirYards) / c : 0; };

export function computeQbCompositeScores<T extends QbRow>(rows: T[]): QbCompositeScores[] {
  if (!rows.length) return [];
  const baseline = rows.filter(isQualifiedQb);
  const pcol = (accessor: (r: QbRow) => number, direction: 'higherIsBetter' | 'lowerIsBetter' = 'higherIsBetter') =>
    percentileColumnAgainst<QbRow, QbRow>(rows, accessor, baseline, direction);

  const p = {
    attempts: pcol(r => num(r.attempts)),
    passingYards: pcol(r => num(r.passingYards)),
    redZoneAttempts: pcol(r => num(r.redZoneAttempts)),
    rushAttempts: pcol(r => num(r.rushAttempts)),
    rushYards: pcol(r => num(r.rushYards)),
    rushTouchdowns: pcol(r => num(r.rushTouchdowns)),
    completionPct: pcol(r => num(r.completionPct)),
    onTargetPct: pcol(r => num(r.onTargetPct)),
    cpoe: pcol(r => num(r.cpoe)),
    badThrowPct: pcol(r => num(r.badThrowPct), 'lowerIsBetter'),
    poorThrows: pcol(r => num(r.poorThrows), 'lowerIsBetter'),
    airYardsPerAttempt: pcol(airYardsPerAttempt),
    deepAttemptPct: pcol(r => num(r.deepAttemptPct)),
    passes20Plus: pcol(r => num(r.passes20Plus)),
    passes30Plus: pcol(r => num(r.passes30Plus)),
    passes40Plus: pcol(r => num(r.passes40Plus)),
    passes50Plus: pcol(r => num(r.passes50Plus)),
    longestPass: pcol(r => num(r.longestPass)),
    scrambleRate: pcol(r => num(r.scrambleRate)),
    yardsPerScramble: pcol(r => num(r.yardsPerScramble)),
    epaPerPlay: pcol(r => num(r.epaPerPlay)),
    successRate: pcol(r => num(r.successRate)),
    tdRate: pcol(tdRate),
    yardsPerAttempt: pcol(yardsPerAttempt),
    compAirYardsPerCompletion: pcol(compAirYardsPerCompletion),
  };

  return rows.map((_, i) => {
    const volumeScore = clampScore(
      p.attempts[i] * 0.35 + p.redZoneAttempts[i] * 0.25 +
      p.passingYards[i] * 0.20 + p.rushAttempts[i] * 0.10 + p.rushYards[i] * 0.10,
    );
    const accuracyScore = clampScore(
      p.completionPct[i] * 0.25 + p.onTargetPct[i] * 0.25 +
      p.cpoe[i] * 0.25 + p.badThrowPct[i] * 0.15 + p.poorThrows[i] * 0.10,
    );
    const explosivenessScore = clampScore(
      p.airYardsPerAttempt[i] * 0.20 + p.deepAttemptPct[i] * 0.20 +
      p.passes20Plus[i] * 0.20 + p.passes30Plus[i] * 0.15 +
      p.passes40Plus[i] * 0.10 + p.passes50Plus[i] * 0.05 + p.longestPass[i] * 0.10,
    );
    const mobilityScore = clampScore(
      p.rushAttempts[i] * 0.25 + p.rushYards[i] * 0.30 +
      p.rushTouchdowns[i] * 0.20 + p.scrambleRate[i] * 0.15 + p.yardsPerScramble[i] * 0.10,
    );
    const efficiencyScore = clampScore(
      p.epaPerPlay[i] * 0.35 + p.successRate[i] * 0.25 +
      p.tdRate[i] * 0.20 + p.yardsPerAttempt[i] * 0.15 + p.compAirYardsPerCompletion[i] * 0.05,
    );
    const overallQBGrade = clampScore(
      volumeScore * 0.20 + accuracyScore * 0.20 + explosivenessScore * 0.20 +
      mobilityScore * 0.20 + efficiencyScore * 0.20,
    );
    return { volumeScore, accuracyScore, explosivenessScore, mobilityScore, efficiencyScore, overallQBGrade };
  });
}

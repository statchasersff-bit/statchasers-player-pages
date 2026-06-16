export function percentileRank(value: number, values: number[]): number {
  if (!values.length) return 0;
  let below = 0;
  for (const v of values) if (v < value) below++;
  return Math.round((below / values.length) * 100);
}

export function invertedPercentile(value: number, values: number[]): number {
  return 100 - percentileRank(value, values);
}

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function toFiniteNumber(v: unknown): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : 0;
}

export type Direction = 'higherIsBetter' | 'lowerIsBetter';

export function percentileColumn<T>(
  rows: T[],
  accessor: (row: T) => number,
  direction: Direction = 'higherIsBetter',
): number[] {
  return percentileColumnAgainst(rows, accessor, rows, direction);
}

export function percentileColumnAgainst<T, B = T>(
  rows: T[],
  accessor: (row: T | B) => number,
  baseline: B[],
  direction: Direction = 'higherIsBetter',
): number[] {
  const baseValues = (baseline.length ? baseline : (rows as unknown as B[])).map(accessor);
  return rows.map(r => {
    const v = accessor(r);
    return direction === 'lowerIsBetter'
      ? invertedPercentile(v, baseValues)
      : percentileRank(v, baseValues);
  });
}

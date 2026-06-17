// Per-position depth cutoffs that define a team's "fantasy-relevant" roster.
// Players ranked deeper than these (the old "Show Full Roster"/bench overflow)
// are excluded from the tool entirely — they don't appear on the roster board,
// in the search autocomplete, or in any player counts.
export const POS_DISPLAY_LIMITS: Record<string, number> = {
  QB: 2, RB: 4, WR: 6, TE: 3,
};

// Return a copy of an indexed `byTeam` map with each fantasy position truncated
// to its depth limit. The per-position arrays are depth-ordered, so slicing the
// top N keeps the starters and drops the bench. Positions without a limit
// (K, DEF, …) pass through unchanged.
export function trimRosterToFantasyRelevant<T>(
  byTeam: Record<string, Record<string, T[]>>,
): Record<string, Record<string, T[]>> {
  const out: Record<string, Record<string, T[]>> = {};
  for (const [team, positions] of Object.entries(byTeam)) {
    const trimmed: Record<string, T[]> = {};
    for (const [pos, players] of Object.entries(positions)) {
      const limit = POS_DISPLAY_LIMITS[pos];
      trimmed[pos] = limit != null ? players.slice(0, limit) : players;
    }
    out[team] = trimmed;
  }
  return out;
}

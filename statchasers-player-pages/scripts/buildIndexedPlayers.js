import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSITION_LIMITS = {
  QB: 2,
  RB: 2,
  WR: 3,
  TE: 2,
  K: 1,
  DEF: 1,
};

const TEAM_ALIAS_MAP = {
  JAC: 'JAX',
  WSH: 'WAS',
  OAK: 'LV',
  STL: 'LAR',
  SD: 'LAC',
  LA: 'LAR',
};

const NFL_TEAMS = [
  'ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE',
  'DAL','DEN','DET','GB','HOU','IND','JAX','KC',
  'LAC','LAR','LV','MIA','MIN','NE','NO','NYG',
  'NYJ','PHI','PIT','SEA','SF','TB','TEN','WAS',
];

function normalizeTeam(abbr) {
  if (!abbr) return 'FA';
  const upper = abbr.toUpperCase().trim();
  return TEAM_ALIAS_MAP[upper] || upper;
}

function rankPlayers(players) {
  return players.sort((a, b) => {
    const aDCO = a.depth_chart_order;
    const bDCO = b.depth_chart_order;

    if (aDCO !== null && bDCO !== null) return aDCO - bDCO;
    if (aDCO !== null && bDCO === null) return -1;
    if (aDCO === null && bDCO !== null) return 1;

    const aActive = a.status === 'Active' ? 1 : 0;
    const bActive = b.status === 'Active' ? 1 : 0;
    if (aActive !== bActive) return bActive - aActive;

    const aYE = a.years_exp ?? -1;
    const bYE = b.years_exp ?? -1;
    if (aYE !== bYE) return bYE - aYE;

    return a.name.localeCompare(b.name);
  });
}

function main() {
  const dataDir = path.resolve(__dirname, '..', 'data');
  const playersPath = path.join(dataDir, 'players.json');

  if (!fs.existsSync(playersPath)) {
    console.error('data/players.json not found. Run buildPlayersIndex.js first.');
    process.exit(1);
  }

  const allPlayers = JSON.parse(fs.readFileSync(playersPath, 'utf8'));
  console.log(`Loaded ${allPlayers.length} total players`);

  const byTeamPosition = {};
  for (const team of NFL_TEAMS) {
    byTeamPosition[team] = {};
    for (const pos of Object.keys(POSITION_LIMITS)) {
      byTeamPosition[team][pos] = [];
    }
  }

  for (const player of allPlayers) {
    const team = normalizeTeam(player.team);
    const pos = player.position;
    if (!team || team === 'FA' || !pos) continue;
    if (!NFL_TEAMS.includes(team)) continue;
    if (!POSITION_LIMITS[pos]) continue;
    byTeamPosition[team][pos].push(player);
  }

  const indexedByTeam = {};
  const allIndexedSlugs = [];
  const counts = { total: 0 };

  for (const team of NFL_TEAMS) {
    indexedByTeam[team] = {};

    for (const [pos, limit] of Object.entries(POSITION_LIMITS)) {
      const candidates = byTeamPosition[team][pos];
      const ranked = rankPlayers([...candidates]);
      const selected = ranked.slice(0, limit);

      indexedByTeam[team][pos] = selected.map((p, i) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        team: normalizeTeam(p.team),
        position: p.position,
        depth_chart_order: p.depth_chart_order,
        years_exp: p.years_exp,
        status: p.status,
        rank_label: `${pos}${i + 1}`,
      }));

      for (const p of selected) {
        allIndexedSlugs.push(p.slug);
      }

      if (!counts[pos]) counts[pos] = 0;
      counts[pos] += selected.length;
      counts.total += selected.length;
    }
  }

  const indexedPlayers = {
    generated_at: new Date().toISOString(),
    source: 'sleeper_depth_chart',
    counts,
    slugs: allIndexedSlugs,
  };

  fs.writeFileSync(
    path.join(dataDir, 'indexed_players.json'),
    JSON.stringify(indexedPlayers, null, 2)
  );
  fs.writeFileSync(
    path.join(dataDir, 'indexed_players_by_team.json'),
    JSON.stringify(indexedByTeam, null, 2)
  );

  console.log(`Generated indexed players:`);
  console.log(`  Total: ${counts.total}`);
  for (const [pos, count] of Object.entries(counts)) {
    if (pos !== 'total') console.log(`  ${pos}: ${count}`);
  }
  console.log(`Wrote data/indexed_players.json (${allIndexedSlugs.length} slugs)`);
  console.log(`Wrote data/indexed_players_by_team.json (${NFL_TEAMS.length} teams)`);
}

main();

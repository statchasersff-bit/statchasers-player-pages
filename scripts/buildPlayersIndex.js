import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_POSITIONS = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

function buildSlug(fullName) {
  if (!fullName) return '';
  return fullName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log('Fetching NFL players from Sleeper API...');
  const res = await fetch('https://api.sleeper.app/v1/players/nfl');
  if (!res.ok) throw new Error(`Sleeper API error: ${res.status}`);

  const playersMap = await res.json();
  console.log(`Received ${Object.keys(playersMap).length} players from API`);

  const players = [];
  const slugSet = new Set();

  for (const [playerId, p] of Object.entries(playersMap)) {
    if (!p.full_name && p.position !== 'DEF') continue;
    if (!VALID_POSITIONS.includes(p.position)) continue;

    const name = p.position === 'DEF' ? (p.full_name || `${p.first_name} ${p.last_name}`) : p.full_name;
    let slug = buildSlug(name);
    if (!slug) continue;

    if (slugSet.has(slug)) {
      slug = `${slug}-${playerId}`;
    }
    slugSet.add(slug);

    players.push({
      id: playerId,
      name,
      slug,
      position: p.position || null,
      team: p.team || "FA",
      status: p.status || null,
      injury_status: p.injury_status || null,
      age: p.age || null,
      height: p.height || null,
      weight: p.weight || null,
    });
  }

  players.sort((a, b) => {
    const posOrder = { QB: 0, RB: 1, WR: 2, TE: 3, K: 4, DEF: 5 };
    const pa = posOrder[a.position] ?? 99;
    const pb = posOrder[b.position] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.name.localeCompare(b.name);
  });

  const outDir = path.resolve(__dirname, '..', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'players.json');
  fs.writeFileSync(outPath, JSON.stringify(players, null, 2));
  console.log(`Wrote ${players.length} players to ${outPath}`);
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});

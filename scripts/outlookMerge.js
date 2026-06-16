/**
 * outlookMerge.js — fold per-player agent outputs into the canonical outlook file.
 *
 * Reads every data/.outlook_parts/<slug>.out.json produced by synthesis agents
 * and merges them into data/fantasy_outlook_2026.json (keyed by player id),
 * preserving any record marked edited:true. Then mirrors the file into the
 * WordPress plugin data dir, exactly like buildFantasyOutlook2026.js does.
 *
 * Idempotent: safe to run repeatedly as more .out.json files appear.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.resolve(ROOT, 'data');
const PARTS = path.resolve(DATA, '.outlook_parts');
const OUT_FILE = path.resolve(DATA, 'fantasy_outlook_2026.json');
const PLUGIN_DIRS = [path.resolve(ROOT, 'wordpress-plugin/statchasers-player-pages/data')];

const existing = fs.existsSync(OUT_FILE) ? JSON.parse(fs.readFileSync(OUT_FILE, 'utf-8')) : {};

let merged = 0, preserved = 0, bad = 0;
for (const f of fs.readdirSync(PARTS)) {
  if (!f.endsWith('.out.json')) continue;
  let rec;
  try { rec = JSON.parse(fs.readFileSync(path.resolve(PARTS, f), 'utf-8')); }
  catch { bad++; continue; }
  if (!rec || !rec.id || !rec.body || !rec.headline) { bad++; continue; }
  const prior = existing[rec.id];
  if (prior && prior.edited) { preserved++; continue; } // never clobber a manual edit
  existing[rec.id] = rec;
  merged++;
}

// Sort keys numerically for a stable, diff-friendly file (matches id ordering).
const sorted = {};
for (const k of Object.keys(existing).sort((a, b) => Number(a) - Number(b))) sorted[k] = existing[k];

fs.writeFileSync(OUT_FILE, JSON.stringify(sorted, null, 0));
for (const dir of PLUGIN_DIRS) {
  if (fs.existsSync(dir)) fs.copyFileSync(OUT_FILE, path.resolve(dir, 'fantasy_outlook_2026.json'));
}

console.log(`Merged ${merged} new/updated, preserved ${preserved} edited, skipped ${bad} bad.`);
console.log(`Total records: ${Object.keys(sorted).length}`);
console.log(`Wrote ${OUT_FILE} (+ plugin mirror).`);

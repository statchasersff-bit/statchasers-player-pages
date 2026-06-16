// buildAdvancedStats.js
// ---------------------------------------------------------------------------
// Generates the per-position x per-season "Advanced Stats" data files that the
// player profile's Advanced Stats tab consumes. Output is bundled into the
// client at client/src/data/advanced_stats/<pos>_advanced_stats_<season>.json.
//
// Source: data/game_logs/<season>.json (weekly box scores keyed by player id)
//         data/players.json            (id -> name / position / team)
//
// Each output file is self-describing: { updated_at, season, columns[], rows[] }.
// Rows are keyed by the app's stable `playerId` (game logs already use it), so
// the UI matches on id — no name normalization required.
//
// Run: node scripts/buildAdvancedStats.js
// ---------------------------------------------------------------------------

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SEASONS = [2023, 2024, 2025];
const POSITIONS = ['QB', 'RB', 'WR', 'TE'];
// Served by the API route /api/advanced-stats/:pos/:season (read from the
// server-side data dir, same as players.json / game_logs).
const OUT_DIR = path.join(ROOT, 'data', 'advanced_stats');

// Frozen build timestamp source — passed via env so re-runs are reproducible in
// CI; falls back to "now" for local runs.
const UPDATED_AT = process.env.ADV_STATS_UPDATED_AT || new Date().toISOString();

// --- helpers ---------------------------------------------------------------
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const ratio = (num, den) => (den > 0 ? num / den : null);
// Percentages are stored as whole numbers (e.g. 92.7), one decimal — the shared
// metadata formatVal has no "percent" type, so the value carries the scale and
// the column label ("Snap %") supplies the unit. Ranking is scale-invariant.
const pct = (num, den) => (den > 0 ? Math.round((num / den) * 1000) / 10 : null);

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// A weekly entry counts as a game played if the player saw the field or
// recorded any offensive box-score activity (filters bye / inactive 0-rows).
function played(s) {
  return (
    (s.off_snp || 0) > 0 ||
    (s.pass_att || 0) > 0 ||
    (s.rush_att || 0) > 0 ||
    (s.rec_tgt || 0) > 0 ||
    (s.rec || 0) > 0
  );
}

// --- column definitions ----------------------------------------------------
// key/label/type/defaultVisible only. Section grouping lives in the shared
// advancedStatsMeta module so the tab, cards and leaderboard never drift.
const COLUMNS = {
  QB: [
    { key: 'rank', label: 'Rank', type: 'number', defaultVisible: true },
    { key: 'playerName', label: 'Player', type: 'string', defaultVisible: true },
    { key: 'team', label: 'Team', type: 'string', defaultVisible: true },
    { key: 'games', label: 'G', type: 'number', defaultVisible: true },
    { key: 'snapPct', label: 'Snap %', type: 'decimal', defaultVisible: true },
    { key: 'attempts', label: 'Att', type: 'number', defaultVisible: true },
    { key: 'attemptsPerGame', label: 'Att/G', type: 'decimal', defaultVisible: true },
    { key: 'completions', label: 'Cmp', type: 'number', defaultVisible: false },
    { key: 'completionPct', label: 'Cmp %', type: 'decimal', defaultVisible: true },
    { key: 'passingYards', label: 'Pass Yds', type: 'number', defaultVisible: true },
    { key: 'passingYardsPerGame', label: 'Pass Y/G', type: 'decimal', defaultVisible: true },
    { key: 'passingTouchdowns', label: 'Pass TD', type: 'number', defaultVisible: true },
    { key: 'interceptions', label: 'INT', type: 'number', defaultVisible: true },
    { key: 'yardsPerAttempt', label: 'Y/A', type: 'decimal', defaultVisible: true },
    { key: 'tdPct', label: 'TD %', type: 'decimal', defaultVisible: true },
    { key: 'intPct', label: 'INT %', type: 'decimal', defaultVisible: true },
    { key: 'rushAttempts', label: 'Rush Att', type: 'number', defaultVisible: true },
    { key: 'rushYards', label: 'Rush Yds', type: 'number', defaultVisible: true },
    { key: 'rushTouchdowns', label: 'Rush TD', type: 'number', defaultVisible: true },
    { key: 'fantasyPoints', label: 'FP (PPR)', type: 'number', defaultVisible: true },
    { key: 'ppg', label: 'PPG', type: 'decimal', defaultVisible: true },
  ],
  RB: [
    { key: 'rank', label: 'Rank', type: 'number', defaultVisible: true },
    { key: 'playerName', label: 'Player', type: 'string', defaultVisible: true },
    { key: 'team', label: 'Team', type: 'string', defaultVisible: true },
    { key: 'games', label: 'G', type: 'number', defaultVisible: true },
    { key: 'snapPct', label: 'Snap %', type: 'decimal', defaultVisible: true },
    { key: 'rushAttempts', label: 'Rush Att', type: 'number', defaultVisible: true },
    { key: 'rushAttemptsPerGame', label: 'Rush/G', type: 'decimal', defaultVisible: true },
    { key: 'touchesPerGame', label: 'Touch/G', type: 'decimal', defaultVisible: true },
    { key: 'rushYards', label: 'Rush Yds', type: 'number', defaultVisible: true },
    { key: 'rushYardsPerGame', label: 'Rush Y/G', type: 'decimal', defaultVisible: true },
    { key: 'rushTouchdowns', label: 'Rush TD', type: 'number', defaultVisible: true },
    { key: 'yardsPerCarry', label: 'Y/Carry', type: 'decimal', defaultVisible: true },
    { key: 'targets', label: 'Tgt', type: 'number', defaultVisible: true },
    { key: 'targetSharePct', label: 'Tgt Share', type: 'decimal', defaultVisible: true },
    { key: 'receptions', label: 'Rec', type: 'number', defaultVisible: true },
    { key: 'receivingYards', label: 'Rec Yds', type: 'number', defaultVisible: true },
    { key: 'receivingTouchdowns', label: 'Rec TD', type: 'number', defaultVisible: false },
    { key: 'catchPct', label: 'Catch %', type: 'decimal', defaultVisible: true },
    { key: 'yardsFromScrimmage', label: 'Scrim Yds', type: 'number', defaultVisible: true },
    { key: 'scrimmageYardsPerGame', label: 'Scrim Y/G', type: 'decimal', defaultVisible: true },
    { key: 'fantasyPoints', label: 'FP (PPR)', type: 'number', defaultVisible: true },
    { key: 'ppg', label: 'PPG', type: 'decimal', defaultVisible: true },
  ],
  WR: [
    { key: 'rank', label: 'Rank', type: 'number', defaultVisible: true },
    { key: 'playerName', label: 'Player', type: 'string', defaultVisible: true },
    { key: 'team', label: 'Team', type: 'string', defaultVisible: true },
    { key: 'games', label: 'G', type: 'number', defaultVisible: true },
    { key: 'snapPct', label: 'Snap %', type: 'decimal', defaultVisible: true },
    { key: 'targets', label: 'Tgt', type: 'number', defaultVisible: true },
    { key: 'targetsPerGame', label: 'Tgt/G', type: 'decimal', defaultVisible: true },
    { key: 'targetSharePct', label: 'Tgt Share', type: 'decimal', defaultVisible: true },
    { key: 'receptions', label: 'Rec', type: 'number', defaultVisible: true },
    { key: 'receivingYards', label: 'Rec Yds', type: 'number', defaultVisible: true },
    { key: 'receivingYardsPerGame', label: 'Rec Y/G', type: 'decimal', defaultVisible: true },
    { key: 'receivingTouchdowns', label: 'Rec TD', type: 'number', defaultVisible: true },
    { key: 'catchPct', label: 'Catch %', type: 'decimal', defaultVisible: true },
    { key: 'yardsPerReception', label: 'Y/Rec', type: 'decimal', defaultVisible: true },
    { key: 'yardsPerTarget', label: 'Y/Tgt', type: 'decimal', defaultVisible: true },
    { key: 'fantasyPoints', label: 'FP (PPR)', type: 'number', defaultVisible: true },
    { key: 'ppg', label: 'PPG', type: 'decimal', defaultVisible: true },
  ],
};
COLUMNS.TE = COLUMNS.WR.map((c) => ({ ...c })); // TE shares the WR receiving shape

// --- per-position derived row ----------------------------------------------
function buildRow(pos, agg) {
  const g = agg.games;
  const common = {
    playerId: agg.playerId,
    playerName: agg.playerName,
    team: agg.team,
    games: g,
    snapPct: pct(agg.offSnp, agg.tmOffSnp),
    fantasyPoints: r1(agg.ptsPpr),
    ppg: r1(ratio(agg.ptsPpr, g)),
  };

  if (pos === 'QB') {
    return {
      ...common,
      attempts: agg.passAtt,
      attemptsPerGame: r1(ratio(agg.passAtt, g)),
      completions: agg.passCmp,
      completionPct: pct(agg.passCmp, agg.passAtt),
      passingYards: agg.passYd,
      passingYardsPerGame: r1(ratio(agg.passYd, g)),
      passingTouchdowns: agg.passTd,
      interceptions: agg.passInt,
      yardsPerAttempt: r2(ratio(agg.passYd, agg.passAtt)),
      tdPct: pct(agg.passTd, agg.passAtt),
      intPct: pct(agg.passInt, agg.passAtt),
      rushAttempts: agg.rushAtt,
      rushYards: agg.rushYd,
      rushTouchdowns: agg.rushTd,
    };
  }

  if (pos === 'RB') {
    const scrim = agg.rushYd + agg.recYd;
    return {
      ...common,
      rushAttempts: agg.rushAtt,
      rushAttemptsPerGame: r1(ratio(agg.rushAtt, g)),
      touchesPerGame: r1(ratio(agg.rushAtt + agg.rec, g)),
      rushYards: agg.rushYd,
      rushYardsPerGame: r1(ratio(agg.rushYd, g)),
      rushTouchdowns: agg.rushTd,
      yardsPerCarry: r2(ratio(agg.rushYd, agg.rushAtt)),
      targets: agg.recTgt,
      targetSharePct: pct(agg.recTgt, agg.teamTgt),
      receptions: agg.rec,
      receivingYards: agg.recYd,
      receivingTouchdowns: agg.recTd,
      catchPct: pct(agg.rec, agg.recTgt),
      yardsFromScrimmage: scrim,
      scrimmageYardsPerGame: r1(ratio(scrim, g)),
    };
  }

  // WR / TE
  return {
    ...common,
    targets: agg.recTgt,
    targetsPerGame: r1(ratio(agg.recTgt, g)),
    targetSharePct: pct(agg.recTgt, agg.teamTgt),
    receptions: agg.rec,
    receivingYards: agg.recYd,
    receivingYardsPerGame: r1(ratio(agg.recYd, g)),
    receivingTouchdowns: agg.recTd,
    catchPct: pct(agg.rec, agg.recTgt),
    yardsPerReception: r2(ratio(agg.recYd, agg.rec)),
    yardsPerTarget: r2(ratio(agg.recYd, agg.recTgt)),
  };
}

// --- main ------------------------------------------------------------------
function main() {
  const players = loadJson(path.join(ROOT, 'data', 'players.json'));
  const byId = new Map();
  for (const p of players) byId.set(String(p.id), p);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const summary = [];

  // Career ("all") accumulators — one aggregator per player, per position,
  // summed across every season so the All-Seasons view is true career totals.
  const SUM_FIELDS = [
    'games', 'offSnp', 'tmOffSnp', 'passAtt', 'passCmp', 'passYd', 'passTd',
    'passInt', 'rushAtt', 'rushYd', 'rushTd', 'recTgt', 'rec', 'recYd', 'recTd',
    'teamTgt', 'ptsPpr',
  ];
  const careerByPos = { QB: new Map(), RB: new Map(), WR: new Map(), TE: new Map() };

  for (const season of SEASONS) {
    const logsPath = path.join(ROOT, 'data', 'game_logs', `${season}.json`);
    if (!fs.existsSync(logsPath)) {
      console.warn(`! missing ${logsPath} — skipping ${season}`);
      continue;
    }
    const logs = loadJson(logsPath);

    // Pass 1 — team weekly target totals (for target share).
    const teamTgtByWeek = new Map(); // `${team}|${week}` -> total targets
    for (const id of Object.keys(logs)) {
      for (const e of logs[id]) {
        const team = e.team;
        if (!team) continue;
        const k = `${team}|${e.week}`;
        teamTgtByWeek.set(k, (teamTgtByWeek.get(k) || 0) + (e.stats.rec_tgt || 0));
      }
    }

    // Pass 2 — per-player season aggregation.
    const aggByPos = { QB: [], RB: [], WR: [], TE: [] };
    for (const id of Object.keys(logs)) {
      const meta = byId.get(String(id));
      if (!meta || !POSITIONS.includes(meta.position)) continue;

      const a = {
        playerId: String(id),
        playerName: meta.name,
        team: meta.team,
        games: 0,
        offSnp: 0, tmOffSnp: 0,
        passAtt: 0, passCmp: 0, passYd: 0, passTd: 0, passInt: 0,
        rushAtt: 0, rushYd: 0, rushTd: 0,
        recTgt: 0, rec: 0, recYd: 0, recTd: 0,
        teamTgt: 0,
        ptsPpr: 0,
        lastTeam: meta.team,
      };

      for (const e of logs[id]) {
        const s = e.stats;
        if (!played(s)) continue;
        a.games += 1;
        a.offSnp += s.off_snp || 0;
        a.tmOffSnp += s.tm_off_snp || 0;
        a.passAtt += s.pass_att || 0;
        a.passCmp += s.pass_cmp || 0;
        a.passYd += s.pass_yd || 0;
        a.passTd += s.pass_td || 0;
        a.passInt += s.pass_int || 0;
        a.rushAtt += s.rush_att || 0;
        a.rushYd += s.rush_yd || 0;
        a.rushTd += s.rush_td || 0;
        a.recTgt += s.rec_tgt || 0;
        a.rec += s.rec || 0;
        a.recYd += s.rec_yd || 0;
        a.recTd += s.rec_td || 0;
        a.ptsPpr += s.pts_ppr || 0;
        if (e.team) {
          a.teamTgt += teamTgtByWeek.get(`${e.team}|${e.week}`) || 0;
          a.lastTeam = e.team; // reflect the team they finished the season on
        }
      }

      if (a.games === 0) continue;
      a.team = a.lastTeam || meta.team;
      aggByPos[meta.position].push(a);

      // Merge into the career accumulator (latest season's team wins).
      const cm = careerByPos[meta.position];
      let c = cm.get(a.playerId);
      if (!c) {
        c = { playerId: a.playerId, playerName: a.playerName, team: a.team };
        for (const f of SUM_FIELDS) c[f] = 0;
        cm.set(a.playerId, c);
      }
      c.playerName = a.playerName;
      c.team = a.team; // SEASONS iterates oldest->newest, so this lands on latest
      for (const f of SUM_FIELDS) c[f] += a[f];
    }

    // Build + write one file per position.
    for (const pos of POSITIONS) {
      const rows = aggByPos[pos].map((a) => buildRow(pos, a));
      // Rank by PPR fantasy points (descending); rank decorates the file rows.
      rows.sort((x, y) => (y.fantasyPoints || 0) - (x.fantasyPoints || 0));
      rows.forEach((row, i) => { row.rank = i + 1; });

      const file = {
        updated_at: UPDATED_AT,
        season,
        position: pos,
        columns: COLUMNS[pos],
        rows,
      };
      const outPath = path.join(OUT_DIR, `${pos.toLowerCase()}_advanced_stats_${season}.json`);
      fs.writeFileSync(outPath, JSON.stringify(file));
      summary.push(`${pos} ${season}: ${rows.length} rows -> ${path.relative(ROOT, outPath)}`);
    }
  }

  // Career ("all") files — same shape, season: "all".
  for (const pos of POSITIONS) {
    const rows = [...careerByPos[pos].values()].map((a) => buildRow(pos, a));
    rows.sort((x, y) => (y.fantasyPoints || 0) - (x.fantasyPoints || 0));
    rows.forEach((row, i) => { row.rank = i + 1; });
    const file = {
      updated_at: UPDATED_AT,
      season: 'all',
      position: pos,
      columns: COLUMNS[pos],
      rows,
    };
    const outPath = path.join(OUT_DIR, `${pos.toLowerCase()}_advanced_stats_all.json`);
    fs.writeFileSync(outPath, JSON.stringify(file));
    summary.push(`${pos} all: ${rows.length} rows -> ${path.relative(ROOT, outPath)}`);
  }

  console.log(summary.join('\n'));
  console.log(`\nDone. updated_at=${UPDATED_AT}`);
}

main();

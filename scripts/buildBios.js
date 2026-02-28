import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const PLAYERS_FILE = path.resolve(DATA_DIR, 'players.json');
const INDEXED_FILE = path.resolve(DATA_DIR, 'indexed_players.json');
const GAME_LOGS_DIR = path.resolve(DATA_DIR, 'game_logs');
const OUTPUT_FILE = path.resolve(DATA_DIR, 'bios.json');

const TEAM_ALIAS_MAP = {
  JAC: 'JAX', WSH: 'WAS', OAK: 'LV', STL: 'LAR', SD: 'LAC', LA: 'LAR',
};

function normalizeTeam(t) { return t ? (TEAM_ALIAS_MAP[t] || t) : t; }

const TEAM_FULL = {
  ARI:'Arizona Cardinals',ATL:'Atlanta Falcons',BAL:'Baltimore Ravens',BUF:'Buffalo Bills',
  CAR:'Carolina Panthers',CHI:'Chicago Bears',CIN:'Cincinnati Bengals',CLE:'Cleveland Browns',
  DAL:'Dallas Cowboys',DEN:'Denver Broncos',DET:'Detroit Lions',GB:'Green Bay Packers',
  HOU:'Houston Texans',IND:'Indianapolis Colts',JAX:'Jacksonville Jaguars',KC:'Kansas City Chiefs',
  LAC:'Los Angeles Chargers',LAR:'Los Angeles Rams',LV:'Las Vegas Raiders',MIA:'Miami Dolphins',
  MIN:'Minnesota Vikings',NE:'New England Patriots',NO:'New Orleans Saints',NYG:'New York Giants',
  NYJ:'New York Jets',PHI:'Philadelphia Eagles',PIT:'Pittsburgh Steelers',SEA:'Seattle Seahawks',
  SF:'San Francisco 49ers',TB:'Tampa Bay Buccaneers',TEN:'Tennessee Titans',WAS:'Washington Commanders',
};

function getFantasyPoints(stats, format) {
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
  if (format === 'ppr') pts += (stats.rec ?? 0) * 1;
  else if (format === 'half') pts += (stats.rec ?? 0) * 0.5;
  return Math.round(pts * 100) / 100;
}

function getEntryPoints(stats, format) {
  if (format === 'ppr') return stats.pts_ppr ?? getFantasyPoints(stats, format);
  if (format === 'half') return stats.pts_half_ppr ?? getFantasyPoints(stats, format);
  return getFantasyPoints(stats, format);
}

function hasParticipation(stats, position) {
  if ((stats.off_snp ?? 0) > 0) return true;
  if (position === 'QB') return (stats.pass_att ?? 0) > 0 || (stats.rush_att ?? 0) > 0;
  if (position === 'K') return (stats.fga ?? 0) > 0 || (stats.xpa ?? 0) > 0;
  return (stats.rec_tgt ?? 0) > 0 || (stats.rec ?? 0) > 0 || (stats.rush_att ?? 0) > 0;
}

const logCache = {};
function loadGameLogs(season) {
  if (logCache[season]) return logCache[season];
  const f = path.resolve(GAME_LOGS_DIR, `${season}.json`);
  if (!fs.existsSync(f)) { logCache[season] = {}; return {}; }
  logCache[season] = JSON.parse(fs.readFileSync(f, 'utf8'));
  return logCache[season];
}

function getAvailableSeasons() {
  return fs.readdirSync(GAME_LOGS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => parseInt(f.replace('.json', '')))
    .sort((a, b) => b - a);
}

function buildSeasonStats(playerId, position, season) {
  const logs = loadGameLogs(season);
  const pLogs = logs[playerId] || [];
  const played = pLogs.filter(e => hasParticipation(e.stats, position));
  if (played.length === 0) return null;

  const totalPts = played.reduce((sum, e) => sum + getEntryPoints(e.stats, 'half'), 0);
  const ppg = totalPts / played.length;

  let totalPassYd = 0, totalPassTd = 0, totalPassAtt = 0, totalPassCmp = 0, totalPassInt = 0;
  let totalRushYd = 0, totalRushTd = 0, totalRushAtt = 0;
  let totalRecYd = 0, totalRecTd = 0, totalRec = 0, totalTgt = 0;

  for (const e of played) {
    const s = e.stats;
    totalPassYd += s.pass_yd ?? 0; totalPassTd += s.pass_td ?? 0;
    totalPassAtt += s.pass_att ?? 0; totalPassCmp += s.pass_cmp ?? 0;
    totalPassInt += s.pass_int ?? 0;
    totalRushYd += s.rush_yd ?? 0; totalRushTd += s.rush_td ?? 0;
    totalRushAtt += s.rush_att ?? 0;
    totalRecYd += s.rec_yd ?? 0; totalRecTd += s.rec_td ?? 0;
    totalRec += s.rec ?? 0; totalTgt += s.rec_tgt ?? 0;
  }

  return {
    season, gamesPlayed: played.length, ppg,
    totalPts,
    passing: { yards: totalPassYd, tds: totalPassTd, atts: totalPassAtt, cmps: totalPassCmp, ints: totalPassInt },
    rushing: { yards: totalRushYd, tds: totalRushTd, atts: totalRushAtt },
    receiving: { yards: totalRecYd, tds: totalRecTd, recs: totalRec, tgts: totalTgt },
  };
}

function detectTeamBySeason(playerId, position, seasons) {
  const teamsBySeason = {};
  for (const s of seasons) {
    const logs = loadGameLogs(s);
    const pLogs = logs[playerId] || [];
    const played = pLogs.filter(e => hasParticipation(e.stats, position));
    if (played.length > 0 && played[0].stats) {
      teamsBySeason[s] = null;
    }
  }
  return teamsBySeason;
}

function generateSnapshotBullets(player, seasonStats, allSeasons) {
  const bullets = [];
  const pos = player.position;
  const yearsExp = player.years_exp ?? 0;
  const rookieYear = yearsExp > 0 ? (new Date().getFullYear() - yearsExp) : null;

  if (rookieYear) {
    bullets.push(`Entered the NFL in ${rookieYear} as a ${pos}`);
  }

  if (seasonStats.length >= 2) {
    const bestSeason = [...seasonStats].sort((a, b) => b.ppg - a.ppg)[0];
    if (bestSeason) {
      bullets.push(`Best fantasy season: ${bestSeason.season} with ${bestSeason.ppg.toFixed(1)} PPG (Half-PPR) over ${bestSeason.gamesPlayed} games`);
    }
  }

  const currentSeason = seasonStats.find(s => s.season === allSeasons[0]);
  if (currentSeason && currentSeason.gamesPlayed >= 4) {
    bullets.push(`${currentSeason.season} production: ${currentSeason.ppg.toFixed(1)} PPG across ${currentSeason.gamesPlayed} games`);
  }

  if (pos === 'QB') {
    const recent = currentSeason || seasonStats[0];
    if (recent) {
      if (recent.rushing.atts > 0) {
        const rushYdPerGame = Math.round(recent.rushing.yards / recent.gamesPlayed);
        if (rushYdPerGame >= 20) {
          bullets.push(`Dual-threat profile with ${rushYdPerGame} rushing yards per game in ${recent.season}`);
        }
      }
      if (recent.passing.atts > 0) {
        const tdRate = ((recent.passing.tds / recent.passing.atts) * 100).toFixed(1);
        bullets.push(`${recent.season} passing: ${recent.passing.yards.toLocaleString()} yards, ${recent.passing.tds} TDs (${tdRate}% TD rate)`);
      }
    }
  }

  if (pos === 'RB') {
    const recent = currentSeason || seasonStats[0];
    if (recent) {
      const totalTouches = recent.rushing.atts + recent.receiving.recs;
      if (totalTouches > 0) {
        bullets.push(`${recent.season} workload: ${recent.rushing.atts} carries, ${recent.receiving.recs} receptions (${totalTouches} touches)`);
      }
      if (recent.receiving.tgts > 20) {
        bullets.push(`Pass-catching involvement with ${recent.receiving.tgts} targets in ${recent.season}`);
      }
    }
  }

  if (pos === 'WR' || pos === 'TE') {
    const recent = currentSeason || seasonStats[0];
    if (recent && recent.receiving.tgts > 0) {
      const tgtPerGame = (recent.receiving.tgts / recent.gamesPlayed).toFixed(1);
      bullets.push(`${recent.season} target volume: ${recent.receiving.tgts} targets (${tgtPerGame}/game)`);
      if (recent.rushing.atts > 10) {
        bullets.push(`Added rushing usage with ${recent.rushing.atts} carries in ${recent.season}`);
      }
    }
  }

  const totalGames = seasonStats.reduce((sum, s) => sum + s.gamesPlayed, 0);
  const maxPossible = seasonStats.length * 17;
  const durability = maxPossible > 0 ? (totalGames / maxPossible) * 100 : 0;
  if (seasonStats.length >= 2) {
    if (durability >= 90) {
      bullets.push(`Strong durability: played ${totalGames} of ${maxPossible} possible games (${Math.round(durability)}%)`);
    } else if (durability < 65) {
      bullets.push(`Durability concern: played ${totalGames} of ${maxPossible} possible games (${Math.round(durability)}%)`);
    }
  }

  return bullets.slice(0, 6);
}

function generatePlayStyle(player, seasonStats) {
  const pos = player.position;
  const recent = seasonStats[0];
  if (!recent) return null;

  let howHeWins = '';
  let howHeWinsTags = [];
  let fantasyTranslation = '';
  let fantasyTranslationTags = [];

  if (pos === 'QB') {
    const rushYPG = recent.gamesPlayed > 0 ? recent.rushing.yards / recent.gamesPlayed : 0;
    const isDualThreat = rushYPG >= 25 || recent.rushing.tds >= 3;
    const passYPG = recent.gamesPlayed > 0 ? recent.passing.yards / recent.gamesPlayed : 0;

    if (isDualThreat) {
      howHeWins = `Combines passing production with meaningful rushing volume, creating a dual-threat profile that generates fantasy value through multiple channels.`;
      howHeWinsTags.push('Dual-threat');
    } else {
      howHeWins = `Operates primarily as a pocket passer, generating value through passing volume and efficiency.`;
      howHeWinsTags.push('Pocket passer');
    }
    if (passYPG >= 260) howHeWinsTags.push('Volume passer');
    if (recent.passing.tds >= 20) howHeWinsTags.push('Red-zone threat');
    if (rushYPG >= 15) howHeWinsTags.push('Scrambler');

    if (isDualThreat) {
      fantasyTranslation = `Rushing output provides a stable weekly floor even in lower passing games, while TD volume drives the ceiling.`;
      fantasyTranslationTags.push('Rushing floor', 'High ceiling');
    } else {
      fantasyTranslation = `Value is tied closely to passing efficiency and TD production. Volume games create the ceiling.`;
      fantasyTranslationTags.push('TD-driven', 'Volume-dependent');
    }
    if (recent.ppg >= 20) fantasyTranslationTags.push('Elite weekly output');
    else if (recent.ppg >= 15) fantasyTranslationTags.push('Solid starter');
  }

  if (pos === 'RB') {
    const catchingBack = recent.receiving.tgts > 30 || (recent.gamesPlayed > 0 && recent.receiving.recs / recent.gamesPlayed >= 3);
    const rushDominant = recent.rushing.atts > 150;
    const goalLine = recent.rushing.tds >= 6;

    if (catchingBack) {
      howHeWins = `Active receiving back who earns targets in the passing game, providing value beyond traditional rushing.`;
      howHeWinsTags.push('Target earner', 'PPR asset');
    } else if (rushDominant) {
      howHeWins = `Volume-based runner who accumulates value through high carry counts and consistent ground work.`;
      howHeWinsTags.push('Workhorse', 'Volume runner');
    } else {
      howHeWins = `Contributes through a mix of rushing and receiving, fitting a complementary role in the offense.`;
      howHeWinsTags.push('Complementary back');
    }
    if (goalLine) howHeWinsTags.push('Goal-line role');
    if (recent.receiving.recs > 30) howHeWinsTags.push('Pass-catching back');

    if (catchingBack) {
      fantasyTranslation = `PPR value is boosted by target volume. Floor is protected by reception totals even in low-rushing games.`;
      fantasyTranslationTags.push('Volume-driven', 'PPR boost');
    } else if (rushDominant) {
      fantasyTranslation = `Fantasy production tracks directly with carry volume and TD opportunities. Standard/half formats benefit most.`;
      fantasyTranslationTags.push('Rushing floor', 'TD equity');
    } else {
      fantasyTranslation = `Flex-range asset whose value fluctuates with game script and role clarity.`;
      fantasyTranslationTags.push('Flex option', 'Role-dependent');
    }
    if (recent.ppg >= 14) fantasyTranslationTags.push('High weekly ceiling');
  }

  if (pos === 'WR') {
    const highVolume = recent.receiving.tgts > 100;
    const yacCreator = recent.receiving.recs > 0 && (recent.receiving.yards / recent.receiving.recs) <= 11;
    const deepThreat = recent.receiving.recs > 0 && (recent.receiving.yards / recent.receiving.recs) >= 15;
    const redZone = recent.receiving.tds >= 7;

    if (highVolume) {
      howHeWins = `High-volume target earner who wins through route running and consistent separation.`;
      howHeWinsTags.push('Target earner', 'Route runner');
    } else if (deepThreat) {
      howHeWins = `Downfield threat who stretches the defense and creates explosive plays.`;
      howHeWinsTags.push('Deep threat', 'Explosive playmaker');
    } else {
      howHeWins = `Contributes through efficiency and situational production within the offense.`;
      howHeWinsTags.push('Efficient');
    }
    if (yacCreator) howHeWinsTags.push('YAC creator');
    if (redZone) howHeWinsTags.push('Red-zone threat');
    if (recent.rushing.atts > 15) howHeWinsTags.push('Rushing usage');

    if (highVolume) {
      fantasyTranslation = `Volume provides a reliable floor, and TD equity drives weekly ceiling. Consistent starter in all formats.`;
      fantasyTranslationTags.push('Volume-driven', 'High floor');
    } else if (deepThreat) {
      fantasyTranslation = `Boom/bust profile where value comes in spikes. Weekly output can be volatile.`;
      fantasyTranslationTags.push('Boom/Bust', 'High weekly ceiling');
    } else {
      fantasyTranslation = `Depth piece whose value is situational and format-dependent.`;
      fantasyTranslationTags.push('Role-dependent');
    }
    if (redZone) fantasyTranslationTags.push('TD upside');
  }

  if (pos === 'TE') {
    const eliteVolume = recent.receiving.tgts > 80;
    const redZone = recent.receiving.tds >= 5;

    if (eliteVolume) {
      howHeWins = `High-volume receiving tight end who operates as a primary pass-catching option.`;
      howHeWinsTags.push('Target earner', 'Primary option');
    } else {
      howHeWins = `Functions as a secondary receiving option with blocking duties, generating situational fantasy value.`;
      howHeWinsTags.push('Complementary role');
    }
    if (redZone) howHeWinsTags.push('Red-zone target');
    if (recent.receiving.recs > 50) howHeWinsTags.push('PPR asset');

    if (eliteVolume) {
      fantasyTranslation = `One of the rare TEs who provides consistent weekly production. Position advantage is significant in PPR.`;
      fantasyTranslationTags.push('Positional edge', 'PPR star');
    } else {
      fantasyTranslation = `Streaming candidate whose value comes from TD-dependent weeks and favorable matchups.`;
      fantasyTranslationTags.push('TD-dependent', 'Streaming option');
    }
  }

  if (!howHeWins) return null;
  return {
    how_he_wins: howHeWins,
    how_he_wins_tags: howHeWinsTags.slice(0, 4),
    fantasy_translation: fantasyTranslation,
    fantasy_translation_tags: fantasyTranslationTags.slice(0, 4),
  };
}

function generateTimeline(player, seasonStats, allSeasons) {
  const timeline = [];
  const yearsExp = player.years_exp ?? 0;
  const rookieYear = yearsExp > 0 ? (new Date().getFullYear() - yearsExp) : null;

  if (rookieYear) {
    timeline.push({
      label: String(rookieYear),
      badge: 'Drafted',
      text: `Entered the league as a ${player.position} and began his NFL career.`,
    });
  }

  const sorted = [...seasonStats].sort((a, b) => a.season - b.season);
  let prevPpg = 0;

  for (const ss of sorted) {
    if (ss.ppg >= prevPpg * 1.35 && prevPpg > 0 && ss.ppg >= 12) {
      timeline.push({
        label: String(ss.season),
        badge: 'Breakout',
        text: `Production jumped to ${ss.ppg.toFixed(1)} PPG, a significant increase from prior output.`,
      });
    }

    if (ss.gamesPlayed <= 8 && ss.season !== allSeasons[0]) {
      timeline.push({
        label: String(ss.season),
        badge: 'Injury',
        text: `Limited to just ${ss.gamesPlayed} games, impacting overall fantasy value.`,
      });
    }

    const bestSeason = [...seasonStats].sort((a, b) => b.ppg - a.ppg)[0];
    if (ss === bestSeason && seasonStats.length >= 2 && ss.ppg >= 14) {
      timeline.push({
        label: String(ss.season),
        badge: 'Peak',
        text: `Career-best fantasy production with ${ss.ppg.toFixed(1)} PPG across ${ss.gamesPlayed} games.`,
      });
    }

    prevPpg = ss.ppg;
  }

  const current = sorted[sorted.length - 1];
  if (current && current.season === allSeasons[0]) {
    timeline.push({
      label: String(current.season),
      badge: 'Current',
      text: `Producing at ${current.ppg.toFixed(1)} PPG through ${current.gamesPlayed} games this season.`,
    });
  }

  const seen = new Set();
  const deduped = timeline.filter(t => {
    const key = t.label + t.badge;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.slice(0, 8);
}

function generateCareerContext(player, seasonStats) {
  const pos = player.position;
  const recent = seasonStats[0];
  if (!recent) return [];

  const tiles = [];

  if (pos === 'QB') {
    const rushYPG = recent.gamesPlayed > 0 ? recent.rushing.yards / recent.gamesPlayed : 0;
    tiles.push({
      title: 'Floor driver',
      text: rushYPG >= 20 ? 'Rushing volume + passing baseline' : 'Passing volume is the primary floor setter',
    });
    tiles.push({
      title: 'Ceiling driver',
      text: `TD production in pass-heavy game scripts`,
    });
  } else if (pos === 'RB') {
    tiles.push({
      title: 'Floor driver',
      text: recent.receiving.recs > 25 ? 'Rushing + receiving touches' : 'Carry volume + goal-line work',
    });
    tiles.push({
      title: 'Ceiling driver',
      text: recent.rushing.tds >= 6 ? 'TD equity + multi-TD game potential' : 'High-volume rushing games',
    });
  } else if (pos === 'WR') {
    tiles.push({
      title: 'Floor driver',
      text: recent.receiving.tgts > 80 ? 'High target share + catch volume' : 'Route running efficiency',
    });
    tiles.push({
      title: 'Ceiling driver',
      text: recent.receiving.tds >= 6 ? 'Red-zone targets + explosive plays' : 'Deep targets + spike weeks',
    });
  } else if (pos === 'TE') {
    tiles.push({
      title: 'Floor driver',
      text: recent.receiving.tgts > 60 ? 'Consistent target volume' : 'Blocking role limits floor',
    });
    tiles.push({
      title: 'Ceiling driver',
      text: 'Red-zone usage + TD-dependent scoring',
    });
  }

  const totalGames = seasonStats.reduce((sum, s) => sum + s.gamesPlayed, 0);
  const maxPossible = seasonStats.length * 17;
  const durability = maxPossible > 0 ? (totalGames / maxPossible) * 100 : 0;

  const ppgs = seasonStats.map(s => s.ppg);
  const avgPpg = ppgs.length > 0 ? ppgs.reduce((a, b) => a + b, 0) / ppgs.length : 0;
  const ppgVariance = ppgs.length > 1 ? ppgs.reduce((sum, v) => sum + Math.pow(v - avgPpg, 2), 0) / (ppgs.length - 1) : 0;
  const ppgStdDev = Math.sqrt(ppgVariance);

  let stabilityLabel;
  if (ppgStdDev < 2) stabilityLabel = 'Stable';
  else if (ppgStdDev < 5) stabilityLabel = 'Moderate';
  else stabilityLabel = 'Volatile';

  tiles.push({
    title: 'Stability',
    text: `${stabilityLabel} role in offense`,
  });

  const risks = [];
  if (durability < 70) risks.push('Injury history');
  if (ppgStdDev >= 5) risks.push('Production swings');
  if (player.years_exp <= 2) risks.push('Limited track record');
  if (player.depth_chart_order > 1) risks.push('Depth chart competition');

  tiles.push({
    title: 'Risk note',
    text: risks.length > 0 ? risks.join(' + ') : 'No major red flags identified',
  });

  return tiles;
}

function generateNarrative(player, seasonStats) {
  const pos = player.position;
  const yearsExp = player.years_exp ?? 0;
  const rookieYear = yearsExp > 0 ? (new Date().getFullYear() - yearsExp) : null;
  const team = TEAM_FULL[player.team] || player.team;
  const paragraphs = [];

  let p1 = `${player.name} is a ${pos} currently with the ${team}.`;
  if (rookieYear) {
    p1 += ` He entered the NFL in ${rookieYear}`;
    if (yearsExp >= 5) p1 += ` and has developed into an established presence at the position over ${yearsExp} seasons.`;
    else if (yearsExp >= 2) p1 += ` and has ${yearsExp} years of NFL experience.`;
    else p1 += ` as a young player still early in his career.`;
  }
  paragraphs.push(p1);

  if (seasonStats.length >= 2) {
    const sorted = [...seasonStats].sort((a, b) => a.season - b.season);
    const first = sorted[0];
    const best = [...seasonStats].sort((a, b) => b.ppg - a.ppg)[0];
    let p2 = '';

    if (best && best.ppg >= 14) {
      p2 = `His peak fantasy production came in ${best.season}, when he averaged ${best.ppg.toFixed(1)} half-PPR points per game across ${best.gamesPlayed} games.`;
    } else if (best) {
      p2 = `His strongest season was ${best.season} with ${best.ppg.toFixed(1)} half-PPR PPG over ${best.gamesPlayed} games.`;
    }

    const ppgTrend = sorted.length >= 2 ? sorted[sorted.length - 1].ppg - sorted[sorted.length - 2].ppg : 0;
    if (ppgTrend > 3) {
      p2 += ` His production has been trending upward recently, suggesting an expanding role.`;
    } else if (ppgTrend < -3) {
      p2 += ` Production has dipped recently, warranting close monitoring.`;
    }

    if (p2) paragraphs.push(p2);
  }

  const current = seasonStats[0];
  if (current) {
    let p3 = `Heading into fantasy drafts, ${player.name}`;
    if (current.ppg >= 18) {
      p3 += ` is a high-value asset averaging ${current.ppg.toFixed(1)} PPG in ${current.season}. He warrants top-tier consideration in all formats.`;
    } else if (current.ppg >= 12) {
      p3 += ` offers solid starter value at ${current.ppg.toFixed(1)} PPG. He profiles as a reliable weekly option with some upside.`;
    } else if (current.ppg >= 7) {
      p3 += ` is a depth/flex consideration at ${current.ppg.toFixed(1)} PPG. Matchup-dependent usage may limit his weekly reliability.`;
    } else {
      p3 += ` is a roster-depth option at ${current.ppg.toFixed(1)} PPG. His value is primarily as a handcuff or bye-week fill-in.`;
    }
    paragraphs.push(p3);
  }

  return paragraphs;
}

function generateSources(player) {
  const teamSlug = (TEAM_FULL[player.team] || '').toLowerCase().replace(/\s+/g, '-');
  const sources = [];
  sources.push({ label: 'Pro-Football-Reference', url: `https://www.pro-football-reference.com/players/${player.name.charAt(0)}/${player.slug}.htm` });
  sources.push({ label: 'NFL Profile', url: `https://www.nfl.com/players/${player.slug}/` });
  if (player.team) {
    sources.push({ label: 'Sleeper', url: `https://sleeper.com/players/nfl/${player.id}` });
  }
  return sources;
}

async function main() {
  console.log('Building bios...');

  const players = JSON.parse(fs.readFileSync(PLAYERS_FILE, 'utf8'));
  const indexed = JSON.parse(fs.readFileSync(INDEXED_FILE, 'utf8'));
  const allSlugs = indexed.slugs || [];
  const seasons = getAvailableSeasons();

  console.log(`Processing ${allSlugs.length} indexed players across seasons: ${seasons.join(', ')}`);

  const playersBySlug = {};
  for (const p of Object.values(players)) {
    playersBySlug[p.slug] = p;
  }

  const bios = {};
  let count = 0;

  for (const slug of allSlugs) {
    const player = playersBySlug[slug];
    if (!player) continue;
    if (!['QB', 'RB', 'WR', 'TE'].includes(player.position)) continue;

    const seasonStats = [];
    for (const s of seasons) {
      const ss = buildSeasonStats(player.id, player.position, s);
      if (ss) seasonStats.push(ss);
    }

    if (seasonStats.length === 0) {
      bios[slug] = {
        snapshot_bullets: [`${player.name} is a ${player.position} for the ${TEAM_FULL[player.team] || player.team}`],
        style: null,
        timeline: [],
        career_context_tiles: [],
        narrative_paragraphs: [`${player.name} is a ${player.position} currently with the ${TEAM_FULL[player.team] || player.team}. Limited game data is available for this player.`],
        last_updated: new Date().toISOString().split('T')[0],
        sources: generateSources(player),
      };
      count++;
      continue;
    }

    const snapshot = generateSnapshotBullets(player, seasonStats, seasons);
    const style = generatePlayStyle(player, seasonStats);
    const timeline = generateTimeline(player, seasonStats, seasons);
    const context = generateCareerContext(player, seasonStats);
    const narrative = generateNarrative(player, seasonStats);
    const sources = generateSources(player);

    bios[slug] = {
      snapshot_bullets: snapshot,
      style,
      timeline,
      career_context_tiles: context,
      narrative_paragraphs: narrative,
      last_updated: new Date().toISOString().split('T')[0],
      sources,
    };

    count++;
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bios, null, 2));
  console.log(`Generated bios for ${count} players → ${OUTPUT_FILE}`);
}

main().catch(err => { console.error(err); process.exit(1); });

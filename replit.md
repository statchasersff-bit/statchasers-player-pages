# StatChasers - Fantasy Football Player Pages

## Overview
Programmatic SEO player pages for NFL fantasy football, powered by Sleeper API data. Creates individual player profile pages at `/nfl/players/[slug]/` with full SEO meta tags, sitemap, and robots.txt. Also includes a WordPress plugin for Divi-compatible sites.

## Project Architecture
- **Stack**: Express + Vite + React (TypeScript)
- **Data Source**: Sleeper API (`https://api.sleeper.app/v1/players/nfl`)
- **Data Storage**: Static JSON files in `data/` directory
- **SEO**: Server-side meta tag injection, JSON-LD structured data, canonical URLs
- **Indexed Players**: 352 fantasy-relevant players (11 per team × 32 teams)
- **Team Mapping**: Normalizes alternate abbreviations (JAC→JAX, WSH→WAS, OAK→LV, STL→LAR, SD→LAC)
- **Name Normalization**: Smart quotes → straight apostrophes in display, stripped from slugs; hyphens preserved

## Key Files
- `scripts/buildPlayersIndex.js` - Fetches Sleeper API, normalizes teams/names, writes full player data (4000+)
- `scripts/buildIndexedPlayers.js` - Generates indexed player set (352 players) from depth charts
- `scripts/buildGameLogs.js` - Ingests weekly stats from Sleeper stats API (2023-2024), stores per-season game logs
- `data/players.json` - Full player dataset (4000+ players)
- `data/indexed_players.json` - Indexed player slugs and metadata
- `data/indexed_players_by_team.json` - Indexed players grouped by team and position
- `data/game_logs/YYYY.json` - Per-season game log data keyed by player_id, ~660 players per season
- `data/game_scores.json` - NFL game final scores by season, keyed by `TEAM_WEEK` (e.g., `BUF_1`), sourced from ESPN API
- `scripts/buildGameScores.js` - Fetches NFL game scores from ESPN scoreboard API (2023-2025)
- `shared/playerTypes.ts` - Player TypeScript interfaces (Player, GameLogEntry, GameLogStats, NewsEntry, PlayerTrends)
- `shared/teamMappings.ts` - Team abbreviation aliases, full names, and normalization helpers
- `shared/scoring.ts` - Scoring format types (ScoringFormat), fantasy point computation (getEntryPoints/getFantasyPoints)
- `server/routes.ts` - API routes + SEO injection + sitemap + robots.txt + game log serving
- `client/src/pages/home.tsx` - Landing page
- `client/src/pages/player-search.tsx` - Player directory (indexed by default, search all)
- `client/src/pages/player-profile.tsx` - Individual player profile page with game log table, trends chart, season selector

## Indexed Player System
Per team: QB(2), RB(2), WR(3), TE(2), K(1), DEF(1) = 11 per team × 32 teams = 352 players
Ranking: depth_chart_order (asc, null last) → active status → years_exp (desc) → name (alpha)

## Routes
- `/` - Home/landing page
- `/nfl/players` - Player directory (indexed players by division, search all 4000+)
- `/nfl/players/:slug/` - Individual player profile (SEO-optimized)
- `/api/players` - All players API
- `/api/indexed-players` - Indexed players API (slugs + byTeam)
- `/sitemap.xml` - XML sitemap (352 indexed player pages + static pages)
- `/robots.txt` - Robots file

## How to Build
1. `node scripts/buildPlayersIndex.js` - Fetch and build full player data
2. `node scripts/buildIndexedPlayers.js` - Generate indexed player set
3. `node scripts/buildGameLogs.js` - Ingest game logs from Sleeper stats API (2023-2024)
4. `npm run dev` - Start development server on port 5000

## WordPress Plugin
Located in `wordpress-plugin/statchasers-player-pages/`
- Container page architecture for Divi compatibility
- Admin panel: Tools → StatChasers Players
- Supports: Generate Indexed Players, Refresh Sleeper Cache, Flush Rewrites

## Metric Calculation Logic
- **Games Played**: Participation-based (any of rec_tgt/rec/rush_att/pass_att>0 for WR/RB/TE; pass_att/rush_att>0 for QB; fga/xpa>0 for K). Includes 0-point goose egg games.
- **Weekly Positional Rank**: Only players who participated that week are ranked (prevents dilution by 200+ inactive players)
- **Tier-Finish Rates** (position-specific):
  - Pos1% = weeks ranked 1–12 / GP (e.g., WR1%, QB1%, RB1%)
  - Pos2% = weeks ranked 13–24 / GP (or 13–bustThreshold for QB/TE)
  - Pos3% = weeks ranked 25–bustThreshold / GP (WR/RB only, where bustThreshold > 24)
  - Bust% = weeks ranked > bustThreshold / GP
  - Bust thresholds: WR >36, RB >30, QB >18, TE >18
  - Pos1% + Pos2% + (Pos3%) + Bust% ≈ 100% (unranked weeks excluded)
- **Volatility**: Sample standard deviation of weekly PPR points across played games
- **Reliability Score**: `round(100 / (1 + (cv / 0.6)^2))` where cv = stdev/ppg. Labels: 70+ Very Reliable, 45-69 Average, <45 Boom/Bust
- **Role Grade**: Starter (pos1+pos2 >= 60%), Flex (>= 35%), Depth (< 35%)
- **Goose Egg %**: (# played weeks with pts==0) / games_played

## Scoring Format System
- **Formats**: Standard, Half-PPR, PPR (default)
- **Toggle**: Pill buttons in player header, affects entire page globally
- **Architecture**: Raw stats stored once; points computed dynamically via `getEntryPoints()` in `shared/scoring.ts`
- **Recalculated per format**: Fantasy points, weekly positional ranks, tier finish rates (WR1%/Bust%), PPG, distribution bar, best/worst week, season rank, career profile, trends chart
- **Server caching**: Weekly ranks and opp ranks cached per `{season}_{format}` key
- **API**: `?format=standard|half|ppr` param on `/api/players/:slug` and `/api/players/:slug/game-log`
- **Point formulas**: Standard = raw stat pts (no reception bonus), Half = +0.5/rec, PPR = +1.0/rec

## Recent Changes
- 2026-02-19: WordPress plugin iframe embed: App Base URL admin setting, templates conditionally embed React app via iframe when URL is set (fallback to static PHP), postMessage-based auto-resize with origin validation, scoped CSS isolation (.scpp-root)
- 2026-02-19: React app iframe-aware: useIframeResize hook in App.tsx sends postMessage height updates to parent when embedded, with cleanup and targeted origin
- 2026-02-19: Opportunity Momentum section (Usage & Trends tab Section 1): Role Momentum Score (0-100) with EXPANDING/STABLE/DECLINING badge, Season vs Last 4 delta comparison table (position-specific metrics), TD Dependency Index (% of fantasy pts from TDs), Usage Stability Score (0-100, CV-based), Production Type badge (Volume-Backed / TD-Driven / Balanced)
- 2026-02-19: Global scoring format toggle (Standard/Half-PPR/PPR): pill UI in player header, dynamically recalculates all metrics including weekly ranks, tier finish rates, PPG, distribution bar, best/worst week, season rank, career profile, and trends across all tabs
- 2026-02-19: Game Score column: compact W/L + score (e.g., "W, 34–10") from ESPN scoreboard data (2023-2025), color-coded W/L
- 2026-02-19: Dynamic rushing columns for WR/TE: CAR/RUSH columns appear only when player has rushing attempts (premium conditional architecture)
- 2026-02-19: Totals/Per-Game toggle: footer row switches between AVG/G and TOTALS views with clickable label
- 2026-02-19: Game scores data pipeline: scripts/buildGameScores.js fetches from ESPN API, stores in data/game_scores.json keyed by team_week
- 2026-02-18: Game Log tab redesign: outcome-focused summary bar (GP/PPG/Best Week/Worst Week with tier badges), Full Season/Last 5 filter toggle, Game Distribution bar (15+/10-14.9/5-9.9/<5), colored tier finish badges (Pos1=green/Pos2=blue/Pos3=orange/Bust=red), Status column (Active/OUT), Opponent Rank vs Position in OPP column (ordinal rank with color coding), server-side opp rank computation from season-wide game log data
- 2026-02-18: Multi-Year Performance Profile: replaced career averages with 3-year window (S, S-1, S-2), shows PPG + durability %, tier breakdown (pos1/pos2/pos3/bust), volatility, career arc mini bar chart; computed server-side with raw weekly data
- 2026-02-18: Quick Outlook restructured: paragraph → structured summary report (Current Form, Role, Volatility, Tier Profile stat lines + best-week sentence)
- 2026-02-18: Role Snapshot redesign: grouped cards (Usage/Efficiency/Context), primary emphasis on usage cards, "Season:" labels, explicit 0% deltas with trend arrows, TDs/Game 2-decimal format, structured 2-line signal (title + detail), tighter spacing
- 2026-02-18: Trend Diagnostics module: unified chart header, Momentum badge (Up/Down/Stable + delta), decisive analytical insights, "Recent Form" highlight label, faded avg reference, horizontal divider between charts, improved rolling avg subtitles
- 2026-02-18: UX polish: fixed microcopy (proper en-dash formatting), visual hierarchy (primary/secondary emphasis), tighter card density, stacked tier distribution bar, Consistency→Reliability rename, color psychology (Pos2=teal, Pos3=gray), Role Grade badge (Starter/Flex/Depth)
- 2026-02-18: Tier-finish rate system: replaced Elite/Starter with position-specific tiers (WR1/WR2/WR3, QB1/QB2, RB1/RB2/RB3, TE1/TE2), all sum to ~100%
- 2026-02-18: Fixed metric calculations: participation-based GP (includes 0-point games), weekly rank pool filters inactive players, smooth consistency curve (replaces CV*1.5), added Goose Egg % risk metric
- 2026-02-18: Player profile 5-tab layout: Overview (PPG stats, trend indicator, weekly chart, stat summary, outlook), Game Log (summary bar + table), Usage & Trends (position-specific usage charts with 3-week rolling averages), Rankings & Value (placeholder rank cards, trade CTA), News & Analysis (articles/empty state)
- 2026-02-18: Added 2025 season game log data (677 players, 7474 week entries)
- 2026-02-17: Game log ingestion from Sleeper stats API (2023-2025 seasons), position-specific stat tables (QB: CMP/ATT/YDS/TD/INT/CAR/Rush, WR/TE: TGT/REC/YDS/TD/CAR, RB: CAR/YDS/TD/TGT/REC, K: FGM/FGA/XPM/XPA), season dropdown selector, totals row, trends bar chart from real weekly fantasy points
- 2026-02-17: Major UX redesign of player directory: dark gradient hero with gold accents, AFC/NFC conference tabs with division sub-tabs, team color left borders on cards, position section headers, slide-over player preview panel (Sheet), Starters Only toggle, sticky mini filter bar, keyboard shortcut (/) for search, rank label badges
- 2026-02-17: Team abbreviation mapping (JAC/WSH/OAK/STL/SD→canonical), DEF fallback for all 32 teams, name normalization (smart quotes, hyphens)
- 2026-02-17: Added indexed player system (352 players), updated directory page, sitemap, JSON-LD, SEO enhancements
- 2026-02-17: Enhanced SEO: dynamic titles, meta descriptions, JSON-LD Person schema, canonical URLs, H1 update
- 2026-02-13: Initial build with player pages, search, SEO, sitemap, robots.txt

# StatChasers - Fantasy Football Player Pages

## Overview
StatChasers is a programmatic SEO project focused on generating comprehensive player profile pages for NFL fantasy football. It leverages data from the Sleeper API to create individual player profiles with robust SEO features, including meta tags, sitemaps, and robots.txt. The project aims to provide fantasy football enthusiasts with detailed player analysis, historical game logs, and performance trends to inform their drafting and roster management decisions. It also includes a WordPress plugin for seamless integration with Divi-compatible sites.

## User Preferences
No specific user preferences were provided in the original `replit.md` file.

## System Architecture
The project is built on an Express, Vite, and React (TypeScript) stack. It sources NFL player data and game statistics from the Sleeper API. Data is processed and stored in static JSON files, which include a comprehensive player dataset, an indexed set of fantasy-relevant players, game logs, and game scores.

**Key Architectural Decisions:**
- **Data Pipeline:** A series of Node.js scripts (`buildPlayersIndex.js`, `buildDepthCharts.js`, `buildIndexedPlayers.js`, `buildGameLogs.js`, `buildGameScores.js`, `buildDynastyRankings.js`, `buildBios.js`, `buildStaticApi.js`) are used to fetch, normalize, and store data as static JSON files. This pre-generates API responses, eliminating the need for a live API server for most data, enhancing performance and scalability.
- **Bio Data:** `scripts/buildBios.js` generates biographical data for all indexed players (snapshot bullets, play style, career timeline, fantasy context tiles, narrative paragraphs, sources). Output saved to `data/bios.json`. Injected into profile JSONs by `buildStaticApi.js` and served via `bio` field in server API responses.
- **Depth Chart Source:** OurLads.com (`https://www.ourlads.com/nfldepthcharts/depthchartpos/`) is the primary source for depth chart ordering. The `buildDepthCharts.js` script scrapes QB, RB, WR, TE, and PK position pages, parses the HTML tables with cheerio, and matches players to Sleeper IDs via fuzzy name matching. For WRs, OurLads provides sub-position roles: LWR (Left WR), RWR (Right WR), SWR (Slot WR) instead of generic WR1/WR2/WR3. Output saved to `data/depth_charts.json`.
- **Indexed Player System:** Focuses on ~548 fantasy-relevant players across 32 teams for core content, with a comprehensive directory for all players. Ranking is driven by OurLads depth chart data when available, with Sleeper depth_chart_order as fallback. Per-position limits: QB: 2, RB: 4, WR: 6 (2 per sub-position: LWR, RWR, SWR), TE: 3, K: 1, DEF: 1.
- **SEO & Performance:** Server-side meta tag injection, JSON-LD structured data, canonical URLs, and a generated sitemap ensure optimal search engine visibility. The use of static JSON files for data serving significantly improves page load times.
- **Player Pages:** Individual player profile pages (`/nfl/players/:slug/`) are highly dynamic, featuring game log tables, trend charts, season selectors, and various calculated metrics.
- **Metric Calculation Logic:** Advanced metrics like Games Played, Weekly Positional Rank, Tier-Finish Rates (Pos1%, Pos2%, Pos3%, Bust%), Volatility, Reliability Score, Role Grade, Goose Egg %, Role Direction (Momentum Score), and Role Consistency (Usage Stability) are computed dynamically.
- **Scoring Format System:** Supports Standard, Half-PPR, and PPR formats. Raw stats are stored once, and fantasy points are computed dynamically based on the selected format, affecting all relevant metrics and visualizations. Server-side caching is implemented for weekly ranks and opponent ranks per season and format.
- **UI/UX:** The player directory features a dark gradient hero, conference/division tabs, team-colored card borders, and a slide-over player preview panel. Player profile pages utilize a 5-tab layout (Overview, Game Log, Usage & Trends, Rankings & Value, News & Analysis) for organized information display. The UI includes dynamic elements like game score columns, totals/per-game toggles, and contextual display of stats (e.g., rushing columns for WR/TE only when applicable).
- **WordPress Integration:** A dedicated WordPress plugin is designed for Divi-compatible sites, allowing player pages to be rendered directly within WordPress using React components and fetching data from static JSON files hosted on GitHub Pages. CSS is scoped to prevent theme conflicts.
- **Team and Name Normalization:** Handles various team abbreviation aliases (e.g., JAC→JAX, WSH→WAS) and normalizes player names (smart quotes to straight apostrophes, hyphens preserved).

## External Dependencies
- **Sleeper API:** (`https://api.sleeper.app/v1/players/nfl`) Primary data source for NFL player data and game statistics.
- **OurLads:** (`https://www.ourlads.com/nfldepthcharts/depthchartpos/`) Primary source for depth chart ordering. Scraped for QB, RB, WR, TE, PK positions. Uses cheerio for HTML parsing. OurLads team abbreviation mapping: ARZ→ARI, RAM→LAR. WR sub-positions: LWR, RWR, SWR.
- **ESPN API:** Used by `scripts/buildGameScores.js` to fetch NFL game scores.
- **KeepTradeCut:** Integrated for dynasty consensus rankings, market value, and ADP data.
- **NFL Team Sites:** Scraped for injury reports and player news/videos. Supported teams: Patriots (NE), Bills (BUF), Dolphins (MIA), Jets (NYJ), Ravens (BAL), Bengals (CIN), Browns (CLE), Steelers (PIT). Unified API routes `/api/team/news` and `/api/team/injury` accept a `team` parameter. Legacy `/api/patriots/*` routes maintained for backward compatibility. Team site configs defined in `TEAM_SITE_CONFIGS` in `server/routes.ts`.
- **GitHub Pages:** Used to host static JSON data files for the WordPress plugin.
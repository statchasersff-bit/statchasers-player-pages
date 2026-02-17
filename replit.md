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
- `data/players.json` - Full player dataset (4000+ players)
- `data/indexed_players.json` - Indexed player slugs and metadata
- `data/indexed_players_by_team.json` - Indexed players grouped by team and position
- `shared/playerTypes.ts` - Player TypeScript interface
- `shared/teamMappings.ts` - Team abbreviation aliases, full names, and normalization helpers
- `server/routes.ts` - API routes + SEO injection + sitemap + robots.txt
- `client/src/pages/home.tsx` - Landing page
- `client/src/pages/player-search.tsx` - Player directory (indexed by default, search all)
- `client/src/pages/player-profile.tsx` - Individual player profile page

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
3. `npm run dev` - Start development server on port 5000

## WordPress Plugin
Located in `wordpress-plugin/statchasers-player-pages/`
- Container page architecture for Divi compatibility
- Admin panel: Tools → StatChasers Players
- Supports: Generate Indexed Players, Refresh Sleeper Cache, Flush Rewrites

## Recent Changes
- 2026-02-17: Major UX redesign of player directory: dark gradient hero with gold accents, AFC/NFC conference tabs with division sub-tabs, team color left borders on cards, position section headers, slide-over player preview panel (Sheet), Starters Only toggle, sticky mini filter bar, keyboard shortcut (/) for search, rank label badges
- 2026-02-17: Team abbreviation mapping (JAC/WSH/OAK/STL/SD→canonical), DEF fallback for all 32 teams, name normalization (smart quotes, hyphens)
- 2026-02-17: Added indexed player system (352 players), updated directory page, sitemap, JSON-LD, SEO enhancements
- 2026-02-17: Enhanced SEO: dynamic titles, meta descriptions, JSON-LD Person schema, canonical URLs, H1 update
- 2026-02-13: Initial build with player pages, search, SEO, sitemap, robots.txt

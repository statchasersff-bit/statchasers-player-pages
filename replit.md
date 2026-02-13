# StatChasers - Fantasy Football Player Pages

## Overview
Programmatic SEO player pages for NFL fantasy football, powered by Sleeper API data. Creates individual player profile pages at `/nfl/players/[slug]/` with full SEO meta tags, sitemap, and robots.txt.

## Project Architecture
- **Stack**: Express + Vite + React (TypeScript)
- **Data Source**: Sleeper API (`https://api.sleeper.app/v1/players/nfl`)
- **Data Storage**: Static JSON file at `data/players.json` (built via script)
- **SEO**: Server-side meta tag injection for player pages

## Key Files
- `scripts/buildPlayersIndex.js` - Fetches Sleeper API, writes trimmed player data
- `data/players.json` - Generated player dataset (4000+ players)
- `shared/playerTypes.ts` - Player TypeScript interface
- `server/routes.ts` - API routes + SEO injection + sitemap + robots.txt
- `client/src/pages/home.tsx` - Landing page
- `client/src/pages/player-search.tsx` - Player search/filter page
- `client/src/pages/player-profile.tsx` - Individual player profile page

## Routes
- `/` - Home/landing page
- `/nfl/players` - Player search page
- `/nfl/players/:slug/` - Individual player profile (SEO-optimized)
- `/rankings/` - Rankings placeholder
- `/tools/` - Tools placeholder
- `/articles/` - Articles placeholder
- `/sitemap.xml` - XML sitemap (305 URLs)
- `/robots.txt` - Robots file

## How to Build
1. `node scripts/buildPlayersIndex.js` - Fetch and build player data
2. `npm run dev` - Start development server on port 5000

## Recent Changes
- 2026-02-13: Initial build with player pages, search, SEO, sitemap, robots.txt

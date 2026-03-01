# StatChasers - Fantasy Football Intelligence

## Overview

StatChasers is a fantasy football analytics platform designed to give users a competitive edge through player profiles, advanced stats, trends, and insights for NFL players. The repository currently contains only the compiled/built frontend assets (Vite build output), including minified JavaScript bundles and CSS.

The application is a Single Page Application (SPA) targeting fantasy football enthusiasts who want data-driven insights to make better roster decisions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React (inferred from Vite build output structure and `id="root"` in HTML)
- **Build Tool**: Vite (confirmed by `.vite/manifest.json` format)
- **Styling**: Tailwind CSS (confirmed by CSS custom property resets like `--tw-border-spacing-x`, `--tw-translate-x`, etc.)
- **Fonts**: Google Fonts — Inter and Open Sans, loaded via `<link rel="preconnect">`
- **Entry Point**: `index.html` → compiled to `assets/index-BqhGZfQl.js` + `assets/index-C-YiVx7t.css`
- **Rendering**: Client-side rendering (CSR) with an `id="root"` div as the React mount point
- **SEO**: Includes Open Graph meta tags and a `<!-- SEO_META_PLACEHOLDER -->` comment, suggesting server-side meta injection may be planned or partially implemented

### Build Output Structure

```
/
├── .vite/manifest.json       # Vite build manifest mapping source to output
├── assets/
│   ├── index-BqhGZfQl.js    # Compiled and minified JS bundle
│   └── index-C-YiVx7t.css   # Compiled Tailwind CSS
└── assets/index.html         # Entry HTML file
```

### Key Architectural Notes

- The repository only contains **compiled output**, not source files. When adding features, source files (typically in `src/`) need to be created or restored.
- The `SEO_META_PLACEHOLDER` in the HTML suggests the app may use or plan to use server-side rendering (SSR) or a middleware layer to inject dynamic meta tags for SEO purposes.
- The Vite manifest enables asset fingerprinting for cache-busting.

### Recommended Source Structure (to be built)

Since only build artifacts exist, the source architecture should follow:

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level page components (player profiles, stats, trends)
├── hooks/            # Custom React hooks
├── services/         # API calls and data fetching
├── store/            # State management (Redux, Zustand, or Context)
└── utils/            # Helper functions
```

## External Dependencies

### Confirmed

| Dependency | Purpose |
|---|---|
| Google Fonts (Inter, Open Sans) | Typography — loaded via CDN |
| Vite | Build tooling and asset bundling |
| Tailwind CSS | Utility-first CSS styling framework |
| React | UI framework (inferred from build output) |

### Likely Needed (Not Yet Confirmed in Source)

| Dependency | Purpose |
|---|---|
| NFL Stats API or similar | Player stats and fantasy data |
| Backend API / Express | Server for data endpoints and SEO meta injection |
| Database (e.g., PostgreSQL) | Storing player data, user preferences, cached stats |
| Authentication service | User accounts for saving lineups or preferences |

### Notes on Data Source

The platform promises "player profiles, advanced stats, trends, and insights for every NFL player." This implies integration with an external NFL data provider such as:
- **Sleeper API** (free, popular in fantasy)
- **SportRadar** (paid, comprehensive)
- **ESPN API** (unofficial)
- **MySportsFeeds** (paid)

A backend service will likely be needed to proxy these API calls (to protect API keys) and cache results to reduce API usage costs.
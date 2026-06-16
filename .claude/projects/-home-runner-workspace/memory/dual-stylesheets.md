---
name: dual-stylesheets
description: Player-profile CSS lives in two parallel files that must be kept in sync
metadata:
  type: project
---

This repo ships the player-profile UI in two build targets with **two parallel, hand-synced stylesheets**:

- `client/src/index.css` — loaded by the standalone app (`client/src/main.tsx`).
- `client/src/sc-components.css` — loaded only by the WordPress build (`client/src/wp-entry.tsx` → `client/src/wp-index.css` → `@import "./sc-components.css"`).

**How to apply:** any new component CSS class must be added to BOTH files or it renders unstyled in one target. They have already drifted (e.g. `ov2-*` styles exist only in `index.css`). Brand tokens (`--sc-blue`, `--sc-gold`, `--sc-muted`, `--sc-card-radius`, etc.) are defined in `:root` in both. A class appearing unstyled "as a block of text" usually means it was added to only one file.

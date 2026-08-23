# CloudCannon experiment (side-by-side with Sanity)

This directory is a **git worktree** of `emmanuel-website` on branch `experiment/cloudcannon`.

| | Sanity site | CloudCannon site |
|---|---|---|
| Folder | `site/` | `site-cloudcannon/` |
| Branch | `main` | `experiment/cloudcannon` |
| Content source | Sanity live fetch | `_data/cms/*.json` (snapshot) |
| Dev server | `npm run dev` → :8080 | `npm run dev` → :8081 |

**Sanity is not modified.** The JSON under `_data/cms` is a one-way export.

## Quick start (local)

```bash
cd site-cloudcannon
npm install
npm run dev          # http://localhost:8081/ui_kits/website/
```

Sanity version in parallel:

```bash
cd site
npm run dev          # http://localhost:8080/ui_kits/website/
```

## Refresh content from Sanity (optional)

```bash
cd site-cloudcannon
node scripts/export-sanity-to-cms.js
```

Needs `SANITY_TOKEN` in `studio/.env` (read-only is fine).

## Connect CloudCannon

1. Push this branch:  
   `git push -u origin experiment/cloudcannon`
2. In CloudCannon: create a site from `gkotak/emmanuel-website`, select branch `experiment/cloudcannon`.
3. Build command: `npm run build`  
   Output: `dist`
4. Edit **Service Times**, **Who’s Who**, **Site Images**, **Site Pages**, etc. in the CloudCannon UI — saves commit to this branch.

## Editing notes

- Structured collections are JSON arrays/objects under `_data/cms/`.
- **Site Pages** are one file per page in `_data/cms/pages/` (same portable-text shape as Sanity so templates keep working).
- Image fields currently store URLs (often still Sanity CDN from the export). For a full cutover later, upload into `assets/uploads/` and point URLs there.
- Re-exporting from Sanity will **overwrite** local JSON — treat CloudCannon edits as the source of truth on this branch once you start editing there.

## Do not merge to main until ready

`main` / production should keep using Sanity until you explicitly decide to cut over.

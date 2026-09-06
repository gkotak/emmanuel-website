# CloudCannon experiment (side-by-side with Sanity)

This directory is a **git worktree** of `emmanuel-website` on branch `experiment/cloudcannon`.

| | Sanity site | CloudCannon site |
|---|---|---|
| Folder | `site/` | `site-cloudcannon/` |
| Branch | `main` | `experiment/cloudcannon` |
| Content source | Sanity live fetch | Page front matter + collection JSON |
| Dev server | `npm run dev` → :8080 | `npm run dev` → :8081 |

**Sanity is not modified.** Legacy `_data/cms/pages` and `site-images` may still exist on disk but are **not** used by templates.

## Content model (greenfield)

**Pages** — copy lives in each `.njk` front matter (YAML + HTML together). Edit via **Pages** in CloudCannon (Visual or Data). File Browser opens the same file.

**Collections** (shared inventories only):
- Who’s Who (`_data/cms/people`)
- Service Times (`_data/cms/service-times`)
- Room Hire Rates (`_data/cms/room-rates`)
- Events (`_data/cms/events`)

**Card patterns**
- **A** — page stores slugs that resolve to a collection (e.g. I’m New `featured_services`, Music `featured_people`)
- **B** — freeform cards on the page (Baptisms, accessibility, donations)

Images are inline on the page (or on person records), not a Site Images library.

## Quick start (local)

```bash
cd site-cloudcannon
npm install
npm run dev          # http://localhost:8081/ui_kits/website/
```

## Connect CloudCannon

1. Branch: `experiment/cloudcannon`
2. Build: `npm run build` · Output: `dist`
3. Do **not** publish to `main` until you explicitly cut over

## Do not merge to main until ready

`main` / production should keep using Sanity until you explicitly decide to cut over.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run preview  # serve dist/ locally
npm run lint     # eslint
```

## Tech stack

- **Vite 8 + React 19 + TypeScript 6** — `react-jsx` transform (no `import React` needed in JSX files)
- **Tailwind CSS v4** — configured via `@theme` block in `src/index.css`; the Vite plugin is in `vite.config.ts` (`@tailwindcss/vite`). There is **no** `tailwind.config.js` — v4 is CSS-first.
- **Framer Motion v12** — `ease` values must be typed as literals (`'easeOut' as const`) or the `Easing` union; plain `string` and `number[]` are rejected. `Variants` objects need the `: Variants` type annotation.
- **React Router v7** — `BrowserRouter` in `main.tsx`; `NavLink` style callback requires explicit `{ isActive: boolean }` destructure type.
- **`react-helmet-async`** — `HelmetProvider` wraps the tree in `main.tsx`; each page uses `<Helmet>` for per-page SEO.
- **`qrcode.react` v3** — use named export `QRCodeSVG` (not the default export). Do **not** install `@types/qrcode.react`; v3 ships its own types.
- **Supabase** — client in `src/lib/supabase.ts`; returns `null` when env vars are absent (fallback to `mailto:`).

## Architecture

All editable content lives in `src/data/` — edit here rather than in page files:
- `projects.ts` — project list with slugs, descriptions, tech, links. `DEMO_PLACEHOLDER` is the sentinel for SkyBook's YouTube link.
- `skills.ts` — skill categories with icons.
- `experience.ts` — work history, education, certifications.

Page routing (`src/App.tsx`) uses `AnimatePresence` + `key={location.pathname}` for page transitions. `ScrollToTop` resets scroll on every route change.

Routes: `/` · `/about` · `/projects` · `/projects/:slug` · `/contact` · `*` (404)

## Assets

| File | Purpose |
|------|---------|
| `src/assets/profile.jpg` | Profile photo — referenced in Home and About |
| `public/resume.pdf` | Résumé — served at `/resume.pdf` |
| `public/screenshots/<slug>.png` | Project screenshots (`furniva`, `cleanloop`, `skybook`) |

All three are graceful-degraded: missing files show placeholders at runtime.

## TypeScript notes

`tsconfig.app.json` has `"noImplicitAny": false` because TypeScript 6 tightened inference on event-handler callbacks. Inline `onMouseEnter`/`onMouseLeave` handlers are untyped on purpose.

## Deployment

`vercel.json` rewrites all paths to `/index.html` for SPA routing. `public/_redirects` does the same for Netlify. No other config needed on either platform — just set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.

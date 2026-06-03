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
- **React Three Fiber** (`@react-three/fiber` + `@react-three/drei`) — used for `HeroScene` and `CTAScene`, both lazy-loaded via `React.lazy`.
- **`react-helmet-async`** — `HelmetProvider` wraps the tree in `main.tsx`; each page uses `<Helmet>` for per-page SEO.
- **`qrcode.react` v3** — use named export `QRCodeSVG` (not the default export). Do **not** install `@types/qrcode.react`; v3 ships its own types.
- **Supabase** — client in `src/lib/supabase.ts`; returns `null` when env vars are absent (fallback to `mailto:`).

## Architecture

All editable content lives in `src/data/` — edit here rather than in page files:
- `projects.ts` — project list with slugs, descriptions, tech, links. `DEMO_PLACEHOLDER` is the sentinel for SkyBook's YouTube link. Project images are imported here from `src/assets/` (not `public/`).
- `skills.ts` — skill categories with icons.
- `experience.ts` — work history, education, certifications.

Page routing (`src/App.tsx`) uses `AnimatePresence` + `key={location.pathname}` for page transitions. `ScrollToTop` resets scroll on every route change.

Routes: `/` · `/about` · `/projects` · `/projects/:slug` · `/contact` · `*` (404)

`src/pages/Home.tsx` is a long monolithic file containing all homepage sections (Hero, Stats, Experience, Skills, Education, Projects, CTA) plus several local helper components (`TiltPhoto`, `TimelineItem`, `ExpCard`, etc.).

## Styling

Almost all styling uses **inline `style` props** with hardcoded hex values — Tailwind utility classes are rarely used. Only a handful of CSS utility classes from `src/index.css` are applied directly: `.glass` (glassmorphism card), `.gradient-text`, `.dot-grid`, `.card`, `.badge-dot`.

Two Google Fonts are used everywhere via hardcoded `fontFamily` in inline styles:
- `'Space Grotesk', sans-serif` — headings and display text
- `'DM Sans', sans-serif` — body and UI text

Design tokens (colors, fonts) are defined in the `@theme` block of `src/index.css` but **not** widely consumed via CSS variables in JSX — use the literal hex values (`#06B6D4` cyan accent, `#8B5CF6` purple accent, `#060A14` background, `#F1F5F9` text) when adding new inline styles.

## Assets

| Path | Purpose |
|------|---------|
| `src/assets/profile.webp` | Primary profile photo (hero + about) |
| `src/assets/profile1.webp` | Alternate profile photo (cross-fades in hero) |
| `src/assets/mediisha.png` · `diyalo.jpg` · `pcps.png` · `advance.jpg` | Company logos for experience timeline |
| `src/assets/furniva1-3.jpg` · `cleenloop1-2.jpeg` · `skybook1-2.jpeg` | Project screenshots, imported in `projects.ts` |
| `public/resume.pdf` | Résumé — served at `/resume.pdf` |
| `public/screenshots/` | Empty placeholder dir (`.gitkeep` only) |

## TypeScript notes

`tsconfig.app.json` has `"noImplicitAny": false` because TypeScript 6 tightened inference on event-handler callbacks. Inline `onMouseEnter`/`onMouseLeave` handlers are untyped on purpose.

## Deployment

`vercel.json` rewrites all paths to `/index.html` for SPA routing. `public/_redirects` does the same for Netlify. No other config needed on either platform — just set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.

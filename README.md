# Rijan Acharya — Personal Portfolio

Multi-page personal website built with **Vite + React + TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Supabase**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the build locally
```

## Before you run

### 1. Add your profile photo

Copy your photo to:

```
src/assets/profile.jpg
```

It appears in the Home hero and the About page.

### 2. Add your résumé

Copy your PDF to:

```
public/resume.pdf
```

The "Resume" button in the nav and footer links directly to `/resume.pdf`.

### 3. Add project screenshots (optional)

Place screenshots in `public/screenshots/` matching the project slug:

```
public/screenshots/furniva.png
public/screenshots/cleanloop.png
public/screenshots/skybook.png
```

Any missing screenshot shows a placeholder automatically.

### 4. Add the SkyBook demo link

Open `src/data/projects.ts` and replace `'DEMO_PLACEHOLDER'` with your YouTube URL:

```ts
demo: 'https://youtu.be/YOUR_VIDEO_ID',
```

### 5. Set up Supabase (optional — contact form)

If you skip this, the form falls back to opening your email client.

**Create the table** in your Supabase project (SQL editor):

```sql
create table messages (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz default now()
);

-- Allow anonymous inserts (for the contact form)
alter table messages enable row level security;
create policy "allow anon insert" on messages for insert with check (true);
```

**Add env vars** — copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> **Tip:** You can later move the projects data from `src/data/projects.ts` into a Supabase table and fetch it at runtime — this lets you add/edit projects without redeploying. Create a `projects` table with columns matching the `Project` interface, enable public read access, and replace the static import with a `useEffect` that calls `supabase.from('projects').select('*')`.

## Deploying

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.
4. Deploy — `vercel.json` handles SPA routing automatically.

### Netlify

1. Push to GitHub.
2. Import in Netlify, set build command `npm run build` and publish directory `dist`.
3. Add your env vars in Site settings → Environment variables.
4. `public/_redirects` handles SPA routing automatically.

## Project structure

```
src/
  assets/         profile.jpg (add your photo here)
  components/     Layout, Navbar, Footer, PageTransition, ScrollToTop, ProjectCard
  data/           projects.ts · skills.ts · experience.ts  ← edit content here
  lib/            supabase.ts
  pages/          Home · About · Projects · ProjectDetail · Contact · NotFound
public/
  resume.pdf      (add your CV here)
  screenshots/    furniva.png · cleanloop.png · skybook.png
```

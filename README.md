# Alexander Urs-Badet — Portfolio

Personal developer portfolio. Dark theme, pastel accents, code-window project visuals, scroll-linked SVG trail.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion.

## Commands

```sh
npm run dev      # dev server on :5173
npm run build    # typecheck + production build to dist/
npm run lint     # eslint
npm run preview  # serve the production build locally
```

## Editing content

All copy lives in `src/data/` — components only render it:

- `site.ts` — name, role, tagline, email, socials, nav links
- `projects.ts` — project cards, including the `snippet` (code window) and `uiChip` per project
- `experience.ts` — jobs + impact stats
- `skills.ts` — skill groups

## Deploying

The build is a fully static site (`dist/`), so any static host works.

**Vercel (recommended):** import the repo at vercel.com/new, framework preset "Vite", build command `npm run build`, output directory `dist`. Done.

**Netlify:** same settings (build `npm run build`, publish `dist`).

**After deploying:** in `index.html`, prefix the `og:image`, `twitter:image`, and (optionally add) `og:url` values with the production domain — social scrapers need absolute URLs.

## Notes

- `public/og.jpg` is the social share card (1200x630). Regenerate if the name/role changes.
- `unused-assets/` holds retired assets (old case-study screenshots, the resume PDF) kept out of `public/` so they don't ship. The site deliberately links no resume and no GitHub profile until the public repos are ready — LinkedIn and email are the contact spine.

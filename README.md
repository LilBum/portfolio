# Alexander Urs-Badet - Portfolio

Personal developer portfolio. Light theme, pastel accents, code-window project visuals, source browser, and scroll-linked SVG trail.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion.

## Commands

```sh
npm run dev      # dev server on :5173
npm run build    # typecheck + production build to dist/
npm run lint     # eslint
npm run preview  # serve the production build locally
```

## Editing content

Most page copy lives in `src/data/` - components render it:

- `site.ts` - name, role, tagline, email, socials, nav links
- `projects.ts` - project cards, including the `snippet` code window and `uiChip` per project
- `experience.ts` - jobs + impact stats
- `skills.ts` - skill groups

Source-browser files live under `src/content/code/`. Keep the allowlist in `src/content/code.ts` aligned with project `codeSlug` values so unrelated samples do not ship in the public bundle.

## Deploying

The build is a fully static site (`dist/`), so any static host works.

**Vercel (recommended):** import the repo at vercel.com/new, framework preset "Vite", build command `npm run build`, output directory `dist`. Done.

**Netlify:** same settings (build `npm run build`, publish `dist`).

**After deploying:** keep the `og:url`, `og:image`, and `twitter:image` values in `index.html` aligned with the production domain. Social scrapers need absolute URLs.

## Notes

- `public/og.jpg` is the social share card (1200x630). Regenerate if the name/role changes.
- `public/Alexander-Urs-Badet-Resume.pdf` is linked from the hero, contact section, and footer.
- `unused-assets/` holds retired assets kept out of `public/` so they do not ship.

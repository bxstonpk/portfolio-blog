# Portfolio + Blog

A personal portfolio and blog built with React, Vite, and Tailwind CSS. Blog posts are plain Markdown files — no CMS or backend required — and the site is designed to host for free on GitHub Pages. The site is bilingual (English/Thai) with a language switcher in the navbar.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Customize your info

Edit [src/data/site.js](src/data/site.js) (name, role, bio, contact links), [src/data/projects.js](src/data/projects.js), and [src/data/skills.js](src/data/skills.js).

## Languages / i18n

- UI text (nav, buttons, headings, etc.) lives in [src/i18n/translations.js](src/i18n/translations.js) as `{ en: {...}, th: {...} }`. Use `useLanguage().t('some.key')` in components.
- Bilingual content fields in the data files (role, bio, project descriptions, etc.) are `{ en: '...', th: '...' }` objects, resolved with `pick(field, lang)` from `src/i18n/translations.js`. A plain string (not an `{en, th}` object) is shown as-is in both languages — useful for names, links, tech terms.
- The switcher in the navbar sets the language and remembers it in `localStorage`. On first visit it guesses from the browser's language.

## Writing blog posts

- Drafts go in `blogs/draft/*.md` — these are **not** shown on the site.
- When a post is ready to publish, move it to `blogs/published/*.md`. Anything in that folder is picked up automatically.

Each post needs frontmatter like this:

```md
---
title: "Your Post Title"
date: "2026-06-01"
category: "Technology"
tags:
  - React
  - Vite
---

Your markdown content starts here.
```

`category` powers the filter tabs on the Blog page. `excerpt` is optional — if omitted, one is generated automatically from the post body. The URL slug is taken from the filename (e.g. `my-post.md` → `/blog/my-post`).

**Bilingual posts:** `my-post.md` is the English version; add `my-post.th.md` alongside it for the Thai translation (own title/date/category/tags — each language file is independent). Both are optional — if a translation is missing, the site falls back to whichever language exists and shows a small notice.

## Building

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that builds and deploys automatically on every push to `main`.

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow builds the site and publishes it.

The app uses `HashRouter` and a relative Vite `base`, so it works out of the box at any GitHub Pages URL (user site or project site) without extra path configuration.

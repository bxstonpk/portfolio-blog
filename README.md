# Portfolio + Blog

A personal portfolio and blog built with React, Vite, and Tailwind CSS. Blog posts are plain Markdown files — no CMS or backend required — and the site is designed to host for free on GitHub Pages.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Customize your info

Edit [src/data/site.js](src/data/site.js) (name, role, bio, contact links), [src/data/projects.js](src/data/projects.js), and [src/data/skills.js](src/data/skills.js).

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

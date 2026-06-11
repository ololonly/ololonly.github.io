# ololonly.github.io

Personal resume site — a dark, terminal / man-page themed single page.

Live: **https://iam.waytoo.dev**

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- Font: [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)

## Develop

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Content

All resume data lives in [`src/data/resume.ts`](src/data/resume.ts) — edit that
file to update experience, skills, projects, etc.

## Deploy

Pushed to `master` → built and published to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Enable **Settings → Pages → Build and deployment → Source: GitHub Actions** once.

<div align="center">

<img src="public/favicon.svg" alt="logo" width="64" height="64" />

# ololonly.github.io

**A dark, terminal-themed personal resume — built with React, Tailwind CSS and Framer Motion.**

</div>

---

## Overview

A single-page resume styled like a terminal / man-page: shell prompts, `git log`-style
experience timeline, animated grid background, typewriter effects and scroll reveals.
All content (experience, skills, projects, certs) is data-driven from a single TypeScript
file, so updating the resume doesn't require touching any markup.

## Features

- **Terminal aesthetic** — Roboto Mono, violet accent, man-page section headers (`man ivan`, `git log`, `ls -la ~/projects`, ...)
- **Animated** — scroll-triggered reveals, typewriter hero text, blinking cursor, drifting background glows, scroll progress bar
- **Live GitHub stars** — project cards fetch star counts from the GitHub API at runtime, with a hardcoded fallback
- **Data-driven content** — everything (bio, skills, jobs, projects, certs, socials) lives in [`src/data/resume.ts`](src/data/resume.ts)
- **Zero-config deploy** — GitHub Actions workflow builds and publishes to GitHub Pages on every push to `master`

## Tech stack

|                |                                                                             |
| -------------- | --------------------------------------------------------------------------- |
| **Framework**  | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build tool** | [Vite](https://vitejs.dev/)                                                 |
| **Styling**    | [Tailwind CSS v4](https://tailwindcss.com/)                                 |
| **Animation**  | [Framer Motion](https://www.framer.com/motion/)                             |
| **Font**       | [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)                |

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build to /dist
npm run preview  # preview the production build locally
```

## Customizing the content

> [!TIP]
> All resume data — bio, facts, skill groups, work experience, projects, certifications and
> social links — is centralized in [`src/data/resume.ts`](src/data/resume.ts). Edit that file
> to make this your own; no component changes needed for content updates.

Project structure at a glance:

```
src/
├── components/   # shared UI primitives (terminal window, nav, background, icons)
├── sections/     # page sections (hero, about, skills, experience, projects, contact)
├── hooks/        # data hooks (e.g. live GitHub star counts)
└── data/         # resume.ts — all your content lives here
```

## Deployment

Every push to `master` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes it to GitHub Pages.

> [!NOTE]
> Make sure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.
> The custom domain is configured via [`public/CNAME`](public/CNAME).

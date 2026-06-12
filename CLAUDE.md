# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page personal resume (ololonly.github.io / iam.waytoo.dev) built as a dark,
terminal/man-page-themed React site. React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion.

## Commands

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc -b) then build to /dist
npm run preview  # preview the production build locally
```

There is no test suite or linter configured. `npm run build` (which runs `tsc -b` with strict
mode, `noUnusedLocals`, `noUnusedParameters`) is the primary correctness check.

## Architecture

- `src/main.tsx` → `src/App.tsx` composes the page as a fixed sequence of full sections, each
  rendered inside a `<TerminalWindow>`-style shell: `Hero → About → Skills → Experience →
  Projects → Credentials → Contact`, plus persistent `Background` and `ScrollProgress` overlays
  and a `NavBar`.
- **Content is fully data-driven.** All resume content — profile, bio, skill groups, work
  experience, projects, certifications, social links — lives in `src/data/resume.ts`. Editing
  the resume should almost always mean editing this file, not the section components.
- `src/components/primitives.tsx` holds the shared animation/UI building blocks used across
  sections: `Reveal` (scroll-triggered fade+rise), `Stagger`/`staggerItem` (staggered children),
  `Typewriter` (cycling hero text), `CountUp`, and `SectionHeading` (the `$ <cmd>` man-page-style
  section titles). Reuse these instead of re-implementing scroll/typing animations.
- `src/hooks/useGithubStars.ts` fetches live GitHub star counts for project cards via the GitHub
  REST API at runtime; it fails silently (returns an empty map) so callers in `Projects.tsx` must
  keep a hardcoded fallback star count in `resume.ts`.
- Styling is Tailwind v4 with design tokens defined in `src/index.css` via `@theme` (colors like
  `--color-bg`, `--color-accent`, `--color-term-green`, etc., plus the `glow-accent` and
  `text-glow` utilities and the blinking-cursor effect). Prefer these CSS variables/utilities over
  introducing new ad-hoc colors.
- `vite.config.ts` sets `base: "/"` because this is a GitHub user/organization page served from
  the domain root — do not change this for project-page-style basing.

## Deployment

`.github/workflows/deploy.yml` builds and deploys `/dist` to GitHub Pages on every push to
`master` (via `npm ci && npm run build`). The custom domain is set in `public/CNAME`
(`iam.waytoo.dev`).

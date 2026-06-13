<div align="center">

<img src="public/favicon.svg" alt="logo" width="64" height="64" />

# ololonly.github.io

**A personal resume that behaves like a terminal — live prompt, vim keys, tmux status bar.**

[iam.waytoo.dev](https://iam.waytoo.dev)

</div>

---

## Overview

A single-page resume rendered as one continuous terminal session. Window chrome sits up top,
the resume flows below as a scrollback transcript of `prompt → output` blocks, and a tmux-style
status bar is docked to the bottom. It's keyboard-driven the way a terminal is: a real command
prompt you can type into, vim-style navigation, and a `man`-page help overlay.

All content — bio, skills, experience, projects, certifications, links — is data-driven from a
single TypeScript file, so updating the resume never means touching markup.

## Features

- **Live command prompt** — a real REPL docked above the status bar. Run `help`, `ls`, `cd <section>`,
  `cat about.md`, `open github`, `clear`, and more, with command history (`↑`/`↓`) and `Tab` completion.
- **Vim-style keyboard navigation** — `j`/`k` to move between sections, `gg`/`G` for top/bottom,
  `1`–`6` to jump directly, `/` to focus the prompt, `?` to toggle help.
- **tmux status bar** — persistent bottom bar with one "window" per section, the active one
  highlighted in sync with scroll position, plus host and a live clock.
- **Midnight Commander listing** — the hero's `ls -la ~/` renders as a navigable directory
  pane: `↑`/`↓` to move the selection, `Enter` to jump.
- **`man ivan` help overlay** — a modal listing every command and keybinding, sourced from the
  same command registry as the prompt so the two can't drift out of sync.
- **Transcript sections** — each section is introduced by a shell `PromptLine`
  (`ivan@waytoo.dev:~$ <command>`) and revealed on scroll.
- **Live GitHub stars** — project cards fetch star counts from the GitHub API at runtime, with a
  hardcoded fallback.
- **Mobile-aware** — desktop gets the full keyboard/status-bar experience; small screens get a
  compact `cd`-chip nav bar.
- **Zero-config deploy** — a GitHub Actions workflow builds and publishes to GitHub Pages on
  every push to `master`.

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
npm run build    # type-check (tsc -b) and build to /dist
npm run preview  # preview the production build locally
```

> [!NOTE]
> There's no test suite or linter. `npm run build` runs `tsc -b` in strict mode
> (`noUnusedLocals`, `noUnusedParameters`) and is the primary correctness check.

## Keybindings & commands

Active on desktop (≥1024px):

| Key       | Action                                  |
| --------- | --------------------------------------- |
| `j` / `k` | scroll to next / previous section       |
| `gg`      | jump to top                             |
| `G`       | jump to last section                    |
| `1`–`6`   | jump to a section (1:about … 6:contact) |
| `/`       | focus the command prompt                |
| `?`       | toggle the help overlay                 |
| `Esc`     | blur prompt / close help                |

Prompt commands include `help`, `ls`, `cd <section>`, `cat about.md`, `whoami`, `contact`,
`open <github\|linkedin\|telegram\|email>`, and `clear`. Type `help` (or press `?`) for the full list.

## Customizing the content

> [!TIP]
> All resume data — bio, facts, skill groups, work experience, projects, certifications,
> social links, and the section list — is centralized in [`src/data/resume.ts`](src/data/resume.ts).
> Edit that file to make this your own; no component changes needed for content updates.

Project structure at a glance:

```
src/
├── App.tsx                # composes the terminal session: chrome → transcript → status bar
├── components/
│   ├── transcript/        # PromptLine, SessionBlock, LivePrompt (the REPL)
│   ├── CommanderPanel.tsx # the navigable `ls -la ~/` directory listing
│   ├── StatusBar.tsx      # tmux-style bottom bar (desktop)
│   ├── MobileNav.tsx      # compact `cd`-chip nav (mobile)
│   ├── HelpOverlay.tsx    # `man ivan` keybindings/commands modal
│   └── primitives.tsx     # shared Reveal / Stagger / Typewriter / CountUp building blocks
├── context/
│   └── CommanderContext.tsx  # keyboard nav + shared active-section state
├── terminal/
│   └── commands.ts        # pure-TS command registry (parsing, execution, completion)
├── sections/              # hero, about, skills, experience, projects, credentials, contact
├── hooks/                 # active-section tracking, live GitHub star counts
└── data/
    └── resume.ts          # all your content lives here
```

> [!NOTE]
> [`src/terminal/commands.ts`](src/terminal/commands.ts) is intentionally free of React/DOM
> imports — it's a pure command registry. UI side effects (scrolling, opening links) are handled
> by the caller based on the returned `CommandResult`.

## Deployment

Every push to `master` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes it to GitHub Pages.

> [!NOTE]
> Make sure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.
> The custom domain is configured via [`public/CNAME`](public/CNAME).

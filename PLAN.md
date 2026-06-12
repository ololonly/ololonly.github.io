# Terminal Transcript Rebuild — Working Plan

> Working document for the "variant 2" rebuild: the page becomes a single scrollable
> terminal session transcript with a live prompt and vim-style keybindings.
> Orchestrated by Claude Code; implementation delegated to subagents stage by stage.
> Delete this file when the rebuild ships.

## Concept

The whole page is **one terminal session** (`ivan@waytoo.dev: ~`), rendered as a
scrollback transcript: a sequence of `$ command` lines, each followed by its rich
output (the current resume sections, restyled as command output). Normal scrolling
scrolls the transcript. A persistent tmux-style status bar shows "windows"
(`[0:about] [1:skills] …`) with the active section highlighted. At the bottom sits a
**live prompt** that accepts real commands (mostly navigation), plus vim/less
keybindings.

Key principles:

- Content stays in `src/data/resume.ts` (data-driven, do not hardcode content in components).
- All content stays in the DOM — SEO, accessibility and Ctrl+F must keep working.
- Reuse design tokens from `src/index.css` (`--color-*`, `glow-accent`, `text-glow`,
  `.cursor-blink`); do not invent new colors.
- Reuse `primitives.tsx` (Reveal, Stagger, Typewriter, CountUp) for animation.
- Architecture must allow a future upgrade to a full REPL (variant 1): the command
  registry is pure TS, decoupled from rendering.

## Section → command mapping

| Section     | Rendered as                                                            |
| ----------- | ---------------------------------------------------------------------- |
| Hero        | MOTD banner (ascii logo + "Last login…") → `$ whoami` → profile output |
| Nav panel   | `$ ls -la ~/` → CommanderPanel-style directory listing (links to sections) |
| About       | `$ cat ~/about.md` → bio lines + facts as front-matter-style key/values |
| Skills      | `$ tree ~/skills` (or `ls` per group) → grouped skill chips             |
| Experience  | `$ git log --author="ivan" --reverse` → each job as an expanded commit (hash, date, message = role@company, body = bullets, stack) |
| Projects    | `$ gh repo list ololonly` → project cards with live stars (`useGithubStars`) |
| Credentials | `$ ls ~/credentials/` → certs + education                              |
| Contact     | `$ contact --list` (or similar) → social links + email CTA             |

## Stages

### Stage 1 — Transcript rebuild (App shell + all sections)
- New transcript primitives in `src/components/transcript/`:
  `PromptLine` (PS1 + command, replaces SectionHeading), `SessionBlock`
  (prompt + output wrapper with Reveal animation).
- `App.tsx`: single full-page terminal session layout (one window chrome at top,
  max-w container, sections as a continuous transcript flow, `id` anchors kept
  for nav: top/about/skills/experience/projects/credentials/contact).
- Rework every section per the mapping table above.
- Rework `StatusBar` into a tmux-style bar: left — windows `[0:about] [1:skills]…`
  (active via `useActiveSection`), right — host/session info. Keep it desktop-only
  for now (mobile handled in stage 3).
- Remove/absorb: old `NavBar` (replaced by tmux bar), `ScrollProgress` (optional:
  keep as thin top line). `CommanderPanel` becomes the `ls -la ~/` block.
- Acceptance: `npm run build` green; all content present; anchors work.

### Stage 2 — Live prompt + command registry + keybindings
- `src/terminal/commands.ts`: pure-TS `CommandRegistry` — parse, complete, execute.
  Commands: `help`, `ls`, `cd <section>` (+ `cd ..`/`cd ~` → top), `cat about.md`,
  `whoami`, `contact`, `open github|linkedin|telegram`, `clear` (scroll to top),
  unknown → `command not found` hint.
- Live prompt UI docked above/into the status bar (desktop): focus via click or `/`,
  command history (↑/↓), Tab completion, Esc blurs.
- `useKeybindings` (replaces arrow-key logic in `CommanderContext`): `j`/`k` —
  next/prev section, `gg`/`G` — top/bottom, `1`–`7` — jump to section, `?` — help
  overlay (cheat-sheet modal), `/` — focus prompt. Ignore keys when an editable
  element is focused. Desktop only (≥1024px).
- Acceptance: `npm run build` green; commands navigate; keybindings work; `?` overlay lists everything.

### Stage 3 — Mobile + polish
- Mobile: compact tmux bar (current section indicator), prompt replaced by a
  horizontal scrollable row of command chips (`cd about`, `cd projects`, `contact`…)
  acting as nav buttons. No keyboard input required on touch.
- No horizontal overflow at 360px; touch targets ≥ 40px; `prefers-reduced-motion`
  respected (already global).
- Final pass: visual consistency, dead code removal, `npm run build` green.

## Bugfix round 1 (user feedback after stages 1–3)

Accepted behavior model:
- The shared `cursor` state is split into two concepts:
  - **activeIndex** — which section is in view, derived from scroll only; drives the
    StatusBar windows and MobileNav highlight. Never moved by arrow keys.
  - **panel selection** — local to the hero `ls -la ~/` CommanderPanel; moved by
    ↑/↓ ONLY while the panel is visible on screen; Enter opens the selected section.
- Global keybindings keep: j/k, gg/G, 1–6, ?, /. Global ArrowUp/Down/Left/Right,
  F3 and F10 handlers are REMOVED.
- Programmatic navigation (cd/chips/digits/j/k/G/statusbar clicks) sets activeIndex
  to the target immediately and locks out IntersectionObserver updates until the
  smooth scroll settles (scrollend event + debounce fallback) — no flicker through
  intermediate windows (bug A1).
- Active-section detection must reliably highlight the last section (contact) when
  scrolled to the bottom of the page (bug A2).
- HelpOverlay: proper two-column grid (key/command | description) instead of padEnd
  `<pre>`, wider modal, no wrapped mid-description lines (C1); remove the duplicated
  dim "commands: …" / "keybindings: …" summary paragraphs (C2); "g g" → "gg" (C3);
  document the panel's ↑/↓ + Enter as context keybindings (C4).

## Rules for implementation agents

- Do NOT commit; leave changes in the working tree.
- Do NOT touch `vite.config.ts` `base`, `public/CNAME`, deploy workflow.
- Run `npm run build` before reporting done; fix all TS errors (strict,
  noUnusedLocals/noUnusedParameters).
- Respect existing code style: function components, Tailwind classes with
  `var(--color-*)` tokens, comments only where non-obvious.

## Status

- [x] Stage 1 — transcript rebuild (done: transcript primitives, sections converted, tmux StatusBar, NavBar/TerminalWindow deleted)
- [x] Stage 2 — prompt + keybindings (done: src/terminal/commands.ts registry, LivePrompt docked above StatusBar, j/k/gg/G/1-6/?// keybindings in CommanderContext, HelpOverlay)
- [x] Stage 3 — mobile + polish (done: added MobileNav fixed bottom chip bar for <lg with active-section highlight via CommanderContext, `<main>` bottom padding so it never overlaps content, `.scrollbar-hide` utility; verified no horizontal overflow and readable layout at 360px for all sections via headless-browser checks; no dead code found beyond prior stages)

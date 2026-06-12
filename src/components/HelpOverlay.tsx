import { AnimatePresence, motion } from "framer-motion";
import { useCommander } from "../context/CommanderContext";
import { COMMANDS, KEYBINDINGS, CONTEXT_KEYBINDINGS, type HelpEntry } from "../terminal/commands";

/* Two-column "key/command | description" table. Left column is fixed-width
   accent mono (no wrap), right column wraps cleanly in muted color. */
function HelpTable({ entries }: { entries: HelpEntry[] }) {
  return (
    <div className="grid grid-cols-[minmax(7rem,auto)_1fr] gap-x-4 gap-y-1.5">
      {entries.map(({ keys, description }) => (
        <div key={keys} className="contents">
          <span className="whitespace-nowrap text-[var(--color-accent)]">{keys}</span>
          <span className="text-[var(--color-muted)]">{description}</span>
        </div>
      ))}
    </div>
  );
}

/* Centered "man page" style modal listing keybindings and available
   commands, sourced from the command registry so it can't drift out of
   sync. Opened via `?`, closed via Esc / `?` / click outside. */
export default function HelpOverlay() {
  const { helpOpen, closeHelp } = useCommander();

  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          className="fixed inset-0 z-50 hidden items-center justify-center bg-[var(--color-bg)]/70 backdrop-blur-sm lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closeHelp}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Keybindings and commands help"
            className="w-full max-w-2xl overflow-hidden rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_0_40px_-12px_var(--color-accent)]"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: [0.21, 0.5, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/60 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#fb7185]/80" />
                <span className="h-3 w-3 rounded-full bg-[#fcd34d]/80" />
                <span className="h-3 w-3 rounded-full bg-[#6ee7a8]/80" />
                <span className="ml-2 text-xs text-[var(--color-dim)]">man ivan</span>
              </div>
              <button
                type="button"
                onClick={closeHelp}
                className="text-xs text-[var(--color-dim)] transition-colors hover:text-[var(--color-accent-bright)]"
              >
                Esc to close
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4 font-mono text-sm">
              <p className="mb-3 text-[var(--color-term-green)]">$ help</p>

              <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-dim)]">commands</p>
              <HelpTable entries={COMMANDS} />

              <p className="mt-5 mb-2 text-xs uppercase tracking-wide text-[var(--color-dim)]">keybindings</p>
              <HelpTable entries={KEYBINDINGS} />

              <p className="mt-5 mb-2 text-xs uppercase tracking-wide text-[var(--color-dim)]">context</p>
              <HelpTable entries={CONTEXT_KEYBINDINGS} />

              <p className="mt-5 text-xs text-[var(--color-dim)]">press ? to toggle this overlay</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

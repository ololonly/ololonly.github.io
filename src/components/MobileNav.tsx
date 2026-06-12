import { navSections } from "../data/resume";
import { useCommander } from "../context/CommanderContext";

/* Compact mobile bottom bar (< lg): a tmux-style "current window" badge plus a
   horizontally scrollable row of `cd <section>` chips that jump to the
   matching section. Mirrors the desktop StatusBar's window list, sharing the
   same activeIndex from CommanderContext so the active chip stays in sync
   with scroll position. */
export default function MobileNav() {
  const { activeIndex, navigate } = useCommander();
  const current = navSections[activeIndex] ?? navSections[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2 px-2 py-2">
        <span className="shrink-0 rounded bg-[var(--color-accent)] px-2 py-3 text-xs font-semibold text-[var(--color-bg)]">
          {activeIndex + 1}:{current.label}
        </span>
        <div className="scrollbar-hide flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {navSections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(s.id)}
              className={`shrink-0 whitespace-nowrap rounded px-3 py-3 font-mono text-xs transition-colors ${
                i === activeIndex
                  ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                  : "bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-accent-bright)]"
              }`}
            >
              cd {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

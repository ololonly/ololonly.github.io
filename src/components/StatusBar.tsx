import { useEffect, useState } from "react";
import { navSections } from "../data/resume";
import { useCommander } from "../context/CommanderContext";

function formatClock(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/* Persistent tmux-style bottom status bar — always visible on desktop.
   Left: session badge + "windows" (one per section), active one highlighted,
   driven by CommanderContext's activeIndex. Right: host + live clock. */
export default function StatusBar() {
  const { activeIndex, navigate, toggleHelp } = useCommander();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-2 font-mono text-xs sm:px-8">
        <div className="flex items-center gap-3">
          <span className="rounded bg-[var(--color-accent)] px-2 py-1 font-semibold text-[var(--color-bg)]">
            [ivan]
          </span>
          <div className="flex items-center gap-1">
            {navSections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(s.id);
                }}
                className={`rounded px-2 py-1 transition-colors ${
                  i === activeIndex
                    ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-accent-bright)]"
                }`}
              >
                {i + 1}:{s.label}
                {i === activeIndex && "*"}
              </a>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 text-[var(--color-muted)]">
          <button
            type="button"
            onClick={toggleHelp}
            className="transition-colors hover:text-[var(--color-accent-bright)]"
          >
            ? help
          </button>
          <span>iam.waytoo.dev</span>
          <span className="text-[var(--color-accent-bright)]">{formatClock(now)}</span>
        </div>
      </div>
    </div>
  );
}

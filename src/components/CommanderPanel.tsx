import { useEffect, useRef, useState } from "react";
import { navSections } from "../data/resume";
import { useCommander } from "../context/CommanderContext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMtime(d: Date): string {
  const month = MONTHS[d.getMonth()];
  const day = String(d.getDate()).padStart(2, " ");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${month} ${day} ${hh}:${mm}`;
}

const COLS = "grid-cols-[4.5rem_1fr_3rem] sm:grid-cols-[5rem_1fr_3rem_5.5rem]";

const EDITABLE_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

/* Midnight-Commander-style directory listing — the output of `ls -la ~/` in
   the hero transcript. Keeps its own row-selection state (independent of the
   global StatusBar/MobileNav activeIndex): ↑/↓ move the highlighted row and
   Enter navigates to it, but only while this panel is visible on screen and
   only on desktop (≥1024px), matching the other global keybindings. */
export default function CommanderPanel() {
  const { navigate } = useCommander();
  const [mtime] = useState(() => formatMtime(new Date()));
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  // Track on-screen visibility with our own observer.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ↑/↓ move the selection, Enter navigates — only while visible, desktop only.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!visibleRef.current) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = document.activeElement;
      if (target instanceof HTMLElement && (EDITABLE_TAGS.includes(target.tagName) || target.isContentEditable)) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelected((s) => Math.max(0, s - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelected((s) => Math.min(navSections.length - 1, s + 1));
          break;
        case "Enter":
          e.preventDefault();
          navigate(navSections[selected].id);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, selected]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-lg border border-[var(--color-border)] text-xs sm:text-sm">
      <div className={`grid gap-x-3 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/60 px-4 py-2 text-[var(--color-dim)] ${COLS}`}>
        <span />
        <span>Name</span>
        <span className="text-right">Size</span>
        <span className="hidden text-right sm:block">Modified</span>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {navSections.map((s, i) => {
          const isActive = i === selected;
          const dim = isActive ? "text-[var(--color-bg)]/70" : "text-[var(--color-dim)]";
          const muted = isActive ? "text-[var(--color-bg)]/70" : "text-[var(--color-muted)]";
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                setSelected(i);
                navigate(s.id);
              }}
              className={`grid items-center gap-x-3 px-4 py-3 transition-colors sm:py-2 ${COLS} ${
                isActive
                  ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                  : "text-[var(--color-fg)] hover:bg-[var(--color-surface-2)]"
              }`}
            >
              <span className={dim}>drwxr-xr-x</span>
              <span className={isActive ? "" : "text-[var(--color-accent)]"}>{s.label}/</span>
              <span className={`text-right ${muted}`}>4096</span>
              <span className={`hidden text-right sm:block ${muted}`}>{mtime}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

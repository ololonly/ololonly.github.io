import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { navSections } from "../data/resume";
import { useActiveSection } from "../hooks/useActiveSection";

type CommanderState = {
  /** Index into navSections of the active "window" (-1 while in the hero, before "about"). */
  activeIndex: number;
  /** Centralized programmatic navigation: scrolls to `id` ("top" or a navSections id),
   *  setting activeIndex immediately and locking out scroll-derived updates until the
   *  smooth scroll settles. */
  navigate: (id: string) => void;
  helpOpen: boolean;
  toggleHelp: () => void;
  closeHelp: () => void;
  /** Registers the live prompt's focus handler so the `/` keybinding can focus it. */
  registerPromptFocus: (fn: (() => void) | null) => void;
};

const CommanderContext = createContext<CommanderState | null>(null);

const EDITABLE_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

/** All section ids in jump order: top, then every nav section (about…contact). */
const ALL_IDS = ["top", ...navSections.map((s) => s.id)];

/** Index into navSections for a given section id, or -1 for "top"/unknown. */
function indexForId(id: string): number {
  if (id === "top") return -1;
  return navSections.findIndex((s) => s.id === id);
}

/* Drives the always-on desktop keyboard nav and the shared `activeIndex` used
   by the StatusBar windows + MobileNav chips:
   - j/k: scroll to next/previous section
   - gg / G: jump to top / last section
   - 1-6: jump straight to a section (1:about … 6:contact)
   - ?: toggle the keybindings/commands help overlay
   - /: focus the live prompt (registered by LivePrompt)
   All navigation (keys, clicks, commands) goes through `navigate`, which sets
   activeIndex immediately and locks scroll-derived updates until the smooth
   scroll settles, so multi-section jumps don't flash through intermediate
   windows. */
export function CommanderProvider({ children }: { children: ReactNode }) {
  const scrollActiveIndex = useActiveSection(navSections.map((s) => s.id));
  const [activeIndex, setActiveIndex] = useState(-1);
  const [helpOpen, setHelpOpen] = useState(false);
  const promptFocusRef = useRef<(() => void) | null>(null);
  const pendingGRef = useRef(false);
  const pendingGTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLockRef = useRef(false);
  const navLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navLockMaxTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Follow scroll-derived active section, unless a programmatic navigation is in flight.
  useEffect(() => {
    if (navLockRef.current) return;
    setActiveIndex(scrollActiveIndex);
  }, [scrollActiveIndex]);

  // Cleans up listeners/timeouts from a previous in-flight navigation, if any.
  const navCleanupRef = useRef<(() => void) | null>(null);

  // Release any in-flight navigation lock on unmount.
  useEffect(() => {
    return () => navCleanupRef.current?.();
  }, []);

  const navigate = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    // Cancel any previous in-flight navigation lock before starting a new one.
    navCleanupRef.current?.();

    setActiveIndex(indexForId(id));
    navLockRef.current = true;

    const release = () => {
      navLockRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("scroll", onScroll);
      if (navLockTimeoutRef.current) {
        clearTimeout(navLockTimeoutRef.current);
        navLockTimeoutRef.current = null;
      }
      if (navLockMaxTimeoutRef.current) {
        clearTimeout(navLockMaxTimeoutRef.current);
        navLockMaxTimeoutRef.current = null;
      }
      navCleanupRef.current = null;
    };

    // Primary: release once the browser fires `scrollend`.
    const onScrollEnd = () => release();
    // Fallback: debounce on `scroll` events for browsers without `scrollend`.
    const onScroll = () => {
      if (navLockTimeoutRef.current) clearTimeout(navLockTimeoutRef.current);
      navLockTimeoutRef.current = setTimeout(release, 150);
    };

    window.addEventListener("scrollend", onScrollEnd, { once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    navCleanupRef.current = release;

    // Safety net: if navigating to the already-current section produces no
    // scroll/scrollend events at all, the lock would otherwise never release.
    navLockMaxTimeoutRef.current = setTimeout(release, 1000);

    target.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleHelp = useCallback(() => setHelpOpen((v) => !v), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  const registerPromptFocus = useCallback((fn: (() => void) | null) => {
    promptFocusRef.current = fn;
  }, []);

  useEffect(() => {
    const clearPendingG = () => {
      pendingGRef.current = false;
      if (pendingGTimeoutRef.current) {
        clearTimeout(pendingGTimeoutRef.current);
        pendingGTimeoutRef.current = null;
      }
    };

    const handler = (e: KeyboardEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      // Leave browser/OS shortcuts (Ctrl+G, Alt+digit, Cmd+/ …) alone.
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = document.activeElement;
      if (target instanceof HTMLElement && (EDITABLE_TAGS.includes(target.tagName) || target.isContentEditable)) {
        return;
      }

      // Esc closes the help overlay if open (handled regardless of other keys).
      if (e.key === "Escape" && helpOpen) {
        e.preventDefault();
        closeHelp();
        return;
      }

      // "gg" chord: two 'g' presses within 500ms jumps to top.
      if (e.key === "g") {
        if (pendingGRef.current) {
          clearPendingG();
          e.preventDefault();
          navigate("top");
          return;
        }
        pendingGRef.current = true;
        pendingGTimeoutRef.current = setTimeout(clearPendingG, 500);
        return;
      }
      if (pendingGRef.current) clearPendingG();

      switch (e.key) {
        case "j": {
          e.preventDefault();
          const idx = Math.max(0, ALL_IDS.indexOf(navSections[activeIndex]?.id ?? "top"));
          const next = ALL_IDS[Math.min(ALL_IDS.length - 1, idx + 1)];
          navigate(next);
          break;
        }
        case "k": {
          e.preventDefault();
          const idx = Math.max(0, ALL_IDS.indexOf(navSections[activeIndex]?.id ?? "top"));
          const prev = ALL_IDS[Math.max(0, idx - 1)];
          navigate(prev);
          break;
        }
        case "G":
          e.preventDefault();
          navigate(navSections[navSections.length - 1].id);
          break;
        case "?":
          e.preventDefault();
          toggleHelp();
          break;
        case "/":
          e.preventDefault();
          promptFocusRef.current?.();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6": {
          e.preventDefault();
          const idx = Number(e.key) - 1;
          const section = navSections[idx];
          if (section) navigate(section.id);
          break;
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearPendingG();
    };
  }, [activeIndex, helpOpen, closeHelp, toggleHelp, navigate]);

  return (
    <CommanderContext.Provider
      value={{ activeIndex, navigate, helpOpen, toggleHelp, closeHelp, registerPromptFocus }}
    >
      {children}
    </CommanderContext.Provider>
  );
}

export function useCommander(): CommanderState {
  const ctx = useContext(CommanderContext);
  if (!ctx) throw new Error("useCommander must be used within a CommanderProvider");
  return ctx;
}

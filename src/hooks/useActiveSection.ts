import { useEffect, useState } from "react";

/**
 * Scroll-position based "active section" tracker.
 *
 * Returns the index into `ids` of the section currently considered active,
 * or -1 if the scroll position is still above the first section (the hero).
 *
 * A section becomes active once its top has scrolled past the 45% line of
 * the viewport. As a special case, when the page is scrolled to (or within
 * ~2px of) the bottom of the document, the LAST section is always active —
 * this reliably highlights short last sections (e.g. contact) that might
 * otherwise never cross the 45% line.
 */
export function useActiveSection(ids: string[]): number {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrolledToBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (scrolledToBottom) {
        setActiveIndex(ids.length - 1);
        return;
      }

      const line = window.innerHeight * 0.45;
      let idx = -1;
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line) {
          idx = i;
        } else {
          break;
        }
      }
      setActiveIndex(idx);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeIndex;
}

import { skillGroups } from "../data/resume";
import { SectionHeading, Reveal, Stagger, staggerItem } from "../components/primitives";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading cmd="cat ~/.skills" title="Tech Stack" />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.06}>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5 transition-colors hover:border-[var(--color-accent-dim)]">
              <div className="mb-4 flex items-center gap-2 text-sm">
                <span className="text-[var(--color-term-green)]">$</span>
                <span className="text-[var(--color-accent)]">{group.cmd}</span>
              </div>
              <Stagger className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <motion.span
                    key={s.name}
                    variants={staggerItem}
                    className="cursor-default rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-fg)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)] hover:shadow-[0_0_16px_-6px_var(--color-accent)]"
                  >
                    {s.name}
                  </motion.span>
                ))}
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { skillGroups } from "../data/resume";
import { Reveal, Stagger, staggerItem } from "../components/primitives";
import { motion } from "framer-motion";
import SessionBlock from "../components/transcript/SessionBlock";

export default function Skills() {
  return (
    <SessionBlock id="skills" command="tree ~/skills">
      <div className="space-y-5 font-mono text-sm">
        <p className="text-[var(--color-dim)]">~/skills</p>
        {skillGroups.map((group, gi) => {
          const isLast = gi === skillGroups.length - 1;
          return (
            <Reveal key={group.label} delay={gi * 0.06}>
              <div className="flex items-start gap-2">
                <span className="select-none text-[var(--color-dim)]">
                  {isLast ? "└──" : "├──"}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-[var(--color-accent)]">{group.label}</span>
                  <Stagger className="mt-2 flex flex-wrap gap-2 pl-4 sm:pl-6">
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
              </div>
            </Reveal>
          );
        })}
      </div>
    </SessionBlock>
  );
}

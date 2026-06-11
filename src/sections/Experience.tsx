import { experience } from "../data/resume";
import { SectionHeading, Reveal } from "../components/primitives";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading cmd="git log --author=ivan --oneline" title="Experience" />

      <div className="relative">
        {/* vertical timeline rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)]/60 via-[var(--color-border-strong)] to-transparent sm:left-[9px]" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <div className="relative pl-8 sm:pl-10">
                {/* commit dot */}
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:h-5 sm:w-5">
                  <span className="absolute h-full w-full rounded-full bg-[var(--color-accent)]/20" />
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] sm:h-2.5 sm:w-2.5" />
                </span>

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5 transition-colors hover:border-[var(--color-accent-dim)] sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold text-[var(--color-fg)] sm:text-lg">
                      {job.role}
                      <span className="text-[var(--color-accent)]"> @ {job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-[var(--color-dim)]">{job.period}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-[var(--color-dim)]">
                    <span className="rounded border border-[var(--color-border)] px-1.5 py-0.5">
                      {job.kind}
                    </span>
                    <span>{job.location}</span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        <span className="mt-0.5 shrink-0 text-[var(--color-term-green)]">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {job.stack && (
                    <p className="mt-4 border-t border-[var(--color-border)] pt-3 font-mono text-xs text-[var(--color-accent-dim)]">
                      {job.stack}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

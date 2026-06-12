import { experience } from "../data/resume";
import { Reveal } from "../components/primitives";
import SessionBlock from "../components/transcript/SessionBlock";

export default function Experience() {
  return (
    <SessionBlock id="experience" command='git log --reverse --author="ivan"'>
      <div className="space-y-8">
        {experience
          .slice()
          .reverse()
          .map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <div className="font-mono text-sm leading-relaxed">
                <p className="text-[var(--color-term-yellow)]">commit {job.hash}</p>
                <p className="text-[var(--color-dim)]">
                  Author: Ivan Kostiashov &lt;iam@waytoo.dev&gt;
                </p>
                <p className="text-[var(--color-dim)]">Date:   {job.period}</p>

                <p className="mt-3 pl-4 text-base text-[var(--color-fg)]">
                  {job.role}
                  <span className="text-[var(--color-accent)]"> @ {job.company}</span>
                  <span className="text-[var(--color-dim)]"> ({job.kind}, {job.location})</span>
                </p>

                <ul className="mt-3 space-y-2 pl-4">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2 text-[13px] leading-relaxed text-[var(--color-muted)] sm:text-sm">
                      <span className="mt-0.5 shrink-0 text-[var(--color-term-green)]">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {job.stack && (
                  <p className="mt-3 pl-4 text-xs text-[var(--color-accent-dim)] sm:text-[13px]">
                    <span className="text-[var(--color-dim)]">stack:</span> {job.stack}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
      </div>
    </SessionBlock>
  );
}

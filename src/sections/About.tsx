import { about } from "../data/resume";
import { SectionHeading, Reveal } from "../components/primitives";
import TerminalWindow from "../components/TerminalWindow";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading cmd="man ivan" title="About" />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <TerminalWindow title="ivan(1) — General Commands Manual">
            <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-[15px]">
              <p>
                <span className="text-[var(--color-accent)]">NAME</span>
                <br />
                <span className="pl-6 text-[var(--color-fg)]">
                  ivan — senior fullstack engineer
                </span>
              </p>
              <p>
                <span className="text-[var(--color-accent)]">DESCRIPTION</span>
              </p>
              {about.lines.map((line, i) => (
                <p key={i} className="pl-6">
                  {line}
                </p>
              ))}
            </div>
          </TerminalWindow>
        </Reveal>

        <Reveal delay={0.1}>
          <TerminalWindow title="~/.config/ivan/facts" className="h-full">
            <dl className="space-y-4 text-sm">
              {about.facts.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-[var(--color-dim)]">
                    <span className="text-[var(--color-term-green)]">›</span> {k}
                  </dt>
                  <dd className="pl-4 text-[var(--color-fg)]">{v}</dd>
                </div>
              ))}
            </dl>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}

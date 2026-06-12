import { about } from "../data/resume";
import { Reveal } from "../components/primitives";
import SessionBlock from "../components/transcript/SessionBlock";

export default function About() {
  return (
    <SessionBlock id="about" command="cat ~/about.md">
      <Reveal>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-[15px]">
          {about.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-3 font-mono text-xs sm:text-sm">
          <p className="text-[var(--color-dim)]">---</p>
          {about.facts.map(([k, v]) => (
            <p key={k}>
              <span className="text-[var(--color-dim)]">{k}:</span>{" "}
              <span className="text-[var(--color-fg)]">{v}</span>
            </p>
          ))}
          <p className="text-[var(--color-dim)]">---</p>
        </div>
      </Reveal>
    </SessionBlock>
  );
}

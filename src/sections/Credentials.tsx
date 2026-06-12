import { certs, education } from "../data/resume";
import { Reveal } from "../components/primitives";
import SessionBlock from "../components/transcript/SessionBlock";

export default function Credentials() {
  return (
    <SessionBlock id="credentials" command="ls ~/credentials/">
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6">
            <div className="mb-4 text-xs uppercase tracking-widest text-[var(--color-dim)]">
              # education
            </div>
            <h3 className="font-semibold text-[var(--color-fg)]">{education.school}</h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{education.degree}</p>
            <p className="mt-2 font-mono text-xs text-[var(--color-accent-dim)]">
              {education.period}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6">
            <div className="mb-4 text-xs uppercase tracking-widest text-[var(--color-dim)]">
              # licenses &amp; certifications
            </div>
            <ul className="space-y-4">
              {certs.map((c) => (
                <li key={c.credentialId} className="flex gap-3">
                  <span className="mt-1 text-[var(--color-term-green)]">✓</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">{c.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-[var(--color-dim)]">
                      {c.issuer} · {c.date}
                      {c.credentialId && (
                        <span className="text-[var(--color-accent-dim)]"> · id:{c.credentialId}</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SessionBlock>
  );
}

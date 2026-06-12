import { projects } from "../data/resume";
import { Reveal } from "../components/primitives";
import { StarIcon, ArrowIcon, GithubIcon } from "../components/icons";
import { useGithubStars } from "../hooks/useGithubStars";
import SessionBlock from "../components/transcript/SessionBlock";

const projectUrls = projects.map((p) => p.url);

export default function Projects() {
  const liveStars = useGithubStars(projectUrls);

  return (
    <SessionBlock id="projects" command="gh repo list ololonly">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => {
          const stars = liveStars[p.url] ?? p.stars;
          return (
          <Reveal key={p.name} delay={i * 0.08}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex h-full flex-col rounded-xl border bg-[var(--color-surface)]/60 p-6 transition-all duration-300 hover:-translate-y-1 ${
                p.highlight
                  ? "border-[var(--color-accent-dim)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent-dim)]"
              } hover:shadow-[0_8px_40px_-12px_var(--color-accent)]`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-[var(--color-accent)]">
                  <GithubIcon className="h-4 w-4 text-[var(--color-dim)]" />
                  <span className="font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-accent-bright)]">
                    {p.name}
                  </span>
                </div>
                <ArrowIcon className="h-4 w-4 text-[var(--color-dim)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]" />
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-[var(--color-border-strong)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-dim)]"
                  >
                    {s}
                  </span>
                ))}
                {stars != null && (
                  <span className="ml-auto flex items-center gap-1 font-mono text-xs text-[var(--color-term-yellow)]">
                    <StarIcon className="h-3.5 w-3.5" />
                    {stars}
                  </span>
                )}
              </div>
            </a>
          </Reveal>
          );
        })}
      </div>
    </SessionBlock>
  );
}

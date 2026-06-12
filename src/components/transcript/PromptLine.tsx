/* A single shell prompt line: ivan@waytoo.dev:~$ <command>
   Introduces each transcript block (replaces the old SectionHeading). */
export default function PromptLine({
  command,
  path = "~",
}: {
  command: string;
  path?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-sm sm:text-base">
      <span className="flex items-baseline gap-1">
        <span className="text-[var(--color-term-green)]">ivan@waytoo.dev</span>
        <span className="text-[var(--color-dim)]">:</span>
        <span className="text-[var(--color-term-cyan)]">{path}</span>
        <span className="text-[var(--color-dim)]">$</span>
      </span>
      <span className="text-[var(--color-accent)]">{command}</span>
    </div>
  );
}

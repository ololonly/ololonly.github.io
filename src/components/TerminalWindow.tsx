import type { ReactNode } from "react";

/* A framed "terminal window" card with traffic-light dots and a title bar. */
export default function TerminalWindow({
  title,
  children,
  className = "",
  glow = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[var(--color-accent-dim)] ${
        glow ? "glow-accent" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#fb7185]/80" />
        <span className="h-3 w-3 rounded-full bg-[#fcd34d]/80" />
        <span className="h-3 w-3 rounded-full bg-[#6ee7a8]/80" />
        <span className="ml-3 truncate text-xs text-[var(--color-dim)]">{title}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

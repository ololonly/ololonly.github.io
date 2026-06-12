import type { ReactNode } from "react";
import { Reveal } from "../primitives";
import PromptLine from "./PromptLine";

/* Wraps a PromptLine + its "output" in the scrollback transcript, with the
   shared Reveal scroll animation, consistent vertical rhythm, and an anchor
   id for in-page navigation. */
export default function SessionBlock({
  id,
  command,
  path,
  children,
  className = "",
}: {
  id: string;
  command: string;
  path?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16 ${className}`}
    >
      <Reveal className="mb-6 sm:mb-8">
        <PromptLine command={command} path={path} />
      </Reveal>
      {children}
    </section>
  );
}

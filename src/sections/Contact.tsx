import { social, profile } from "../data/resume";
import { Reveal } from "../components/primitives";
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon } from "../components/icons";
import SessionBlock from "../components/transcript/SessionBlock";

const channels = [
  { label: "github", value: "@ololonly", href: social.github, Icon: GithubIcon },
  { label: "telegram", value: "@ololonly", href: social.telegram, Icon: TelegramIcon },
  { label: "linkedin", value: "in/ivan-kostiashov", href: social.linkedin, Icon: LinkedinIcon },
  { label: "email", value: social.email, href: `mailto:${social.email}`, Icon: MailIcon },
];

export default function Contact() {
  return (
    <SessionBlock id="contact" command="contact --list">
      <Reveal>
        <p className="text-[var(--color-fg)]">
          Open to interesting problems
          <span className="cursor-blink" aria-hidden />
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_0_20px_-8px_var(--color-accent)]"
            >
              <Icon className="h-5 w-5 text-[var(--color-dim)] transition-colors group-hover:text-[var(--color-accent-bright)]" />
              <div className="min-w-0">
                <div className="text-xs text-[var(--color-dim)]">{label}</div>
                <div className="truncate text-[var(--color-fg)] group-hover:text-[var(--color-accent-bright)]">
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center gap-2 border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-dim)]">
        <p>
          <span className="text-[var(--color-term-green)]">$</span> built by {profile.name} ·
          React · Tailwind · Framer Motion
        </p>
        <p>© {new Date().getFullYear()} · iam.waytoo.dev</p>
      </footer>
    </SessionBlock>
  );
}

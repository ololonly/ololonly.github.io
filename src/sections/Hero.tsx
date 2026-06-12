import { motion } from "framer-motion";
import { profile, social } from "../data/resume";
import { Reveal, Typewriter } from "../components/primitives";
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, ArrowIcon } from "../components/icons";
import CommanderPanel from "../components/CommanderPanel";
import PromptLine from "../components/transcript/PromptLine";

const ascii = `   _       _       _
  (_)_   _| | ___ | | __
  | \\ \\ / / |/ _ \\| |/ /
  | |\\ V /| | (_) |   <
  |_| \\_/ |_|\\___/|_|\\_\\   `;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatLastLogin(d: Date): string {
  const weekday = WEEKDAYS[d.getDay()];
  const month = MONTHS[d.getMonth()];
  const day = String(d.getDate()).padStart(2, " ");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `Last login: ${weekday} ${month} ${day} ${hh}:${mm}:${ss} on ttys001`;
}

/* Hero is the start of the transcript: an MOTD banner (ascii logo + last
   login line), then `$ whoami` (profile) and `$ ls -la ~/` (CommanderPanel
   directory listing). No longer a full-viewport hero — just the opening of
   the session. */
export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl scroll-mt-24 px-5 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16">
      {/* MOTD */}
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="mb-4 hidden select-none text-[10px] leading-tight text-[var(--color-accent-dim)] sm:block"
        aria-hidden
      >
        {ascii}
      </motion.pre>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs text-[var(--color-dim)] sm:text-sm"
      >
        {formatLastLogin(new Date())}
      </motion.p>

      {/* $ whoami */}
      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PromptLine command="whoami" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-xl sm:text-2xl lg:text-xl"
        >
          <span className="text-[var(--color-muted)]">&gt; </span>
          <Typewriter words={profile.roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base"
        >
          {profile.tagline}
          <span className="mt-1 block text-[var(--color-dim)]">
            # based in {profile.location}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[#15101f] transition-all hover:bg-[var(--color-accent-bright)] hover:shadow-[0_0_24px_-4px_var(--color-accent)]"
          >
            ./get-in-touch
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] px-5 py-2.5 text-sm text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)]"
          >
            <GithubIcon className="h-4 w-4" />
            github
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 flex items-center gap-4 text-[var(--color-dim)]"
        >
          <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-[var(--color-accent-bright)]">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href={social.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="transition-colors hover:text-[var(--color-accent-bright)]">
            <TelegramIcon className="h-5 w-5" />
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[var(--color-accent-bright)]">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a href={`mailto:${social.email}`} aria-label="Email" className="transition-colors hover:text-[var(--color-accent-bright)]">
            <MailIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* $ ls -la ~/ */}
      <Reveal delay={0.1} className="mt-12">
        <PromptLine command="ls -la ~/" />
        <div className="mt-4">
          <CommanderPanel />
        </div>
      </Reveal>
    </section>
  );
}

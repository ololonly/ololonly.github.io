import { motion } from "framer-motion";
import { profile, social } from "../data/resume";
import { Typewriter } from "../components/primitives";
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, ArrowIcon } from "../components/icons";

const ascii = `   _       _       _
  (_)_   _| | ___ | | __
  | \\ \\ / / |/ _ \\| |/ /
  | |\\ V /| | (_) |   <
  |_| \\_/ |_|\\___/|_|\\_\\   `;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center px-5 pt-24 pb-16 sm:px-8"
    >
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="mb-6 hidden select-none text-[10px] leading-tight text-[var(--color-accent-dim)] sm:block"
        aria-hidden
      >
        {ascii}
      </motion.pre>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex items-center gap-2 text-sm text-[var(--color-muted)]"
      >
        <span className="text-[var(--color-term-green)]">{profile.handle}@dev</span>
        <span className="text-[var(--color-dim)]">:</span>
        <span className="text-[var(--color-term-cyan)]">~</span>
        <span className="text-[var(--color-dim)]">$ whoami</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        {profile.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-4 text-xl sm:text-2xl"
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
        transition={{ duration: 0.6, delay: 0.75 }}
        className="mt-9 flex flex-wrap items-center gap-3"
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
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 flex items-center gap-4 text-[var(--color-dim)]"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-xs text-[var(--color-dim)]"
        >
          <span>scroll</span>
          <span>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

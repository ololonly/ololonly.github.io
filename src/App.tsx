import Background from "./components/Background";
import ScrollProgress from "./components/ScrollProgress";
import StatusBar from "./components/StatusBar";
import MobileNav from "./components/MobileNav";
import HelpOverlay from "./components/HelpOverlay";
import LivePrompt from "./components/transcript/LivePrompt";
import { CommanderProvider } from "./context/CommanderContext";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";

/* The whole page is one terminal session: a sticky window-chrome bar up top,
   then the transcript (prompt + output blocks) flows as a normal scrollable
   document, with a tmux-style status bar docked to the bottom on desktop. */
export default function App() {
  return (
    <CommanderProvider>
      <Background />
      <ScrollProgress />

      <div className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-5 py-2.5 sm:px-8">
          <span className="h-3 w-3 rounded-full bg-[#fb7185]/80" />
          <span className="h-3 w-3 rounded-full bg-[#fcd34d]/80" />
          <span className="h-3 w-3 rounded-full bg-[#6ee7a8]/80" />
          <span className="ml-3 truncate text-xs text-[var(--color-dim)]">
            ivan@waytoo.dev: ~ — tmux
          </span>
        </div>
      </div>

      <main className="pb-16 lg:pb-24">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 hidden lg:flex lg:flex-col">
        <LivePrompt />
        <StatusBar />
      </div>

      <MobileNav />

      <HelpOverlay />
    </CommanderProvider>
  );
}

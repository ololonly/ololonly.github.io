import { navSections, social } from "../data/resume";

/* Pure-TS command registry for the live prompt. No React/DOM imports — this
   must stay unit-testable and reusable for a future full REPL. Anything that
   needs the DOM (scrolling, window.open) is handled by the caller based on
   the returned CommandResult. */

export type CommandResult =
  | { kind: "nav"; target: string }
  | { kind: "open"; url: string }
  | { kind: "text"; lines: string[] }
  | { kind: "error"; message: string }
  | { kind: "clear" }
  | { kind: "none" };

/** Openable external targets for `open <target>`. */
const OPEN_TARGETS: Record<string, string> = {
  github: social.github,
  linkedin: social.linkedin,
  telegram: social.telegram,
  email: `mailto:${social.email}`,
};

/** A single entry in the COMMANDS / KEYBINDINGS tables, shared by the `help`
 *  command output and the HelpOverlay's two-column grid. */
export type HelpEntry = { keys: string; description: string };

export const COMMANDS: HelpEntry[] = [
  { keys: "help", description: "show this message" },
  { keys: "ls", description: "list sections" },
  { keys: "cd <section>", description: "jump to a section (cd ~ / cd .. → top)" },
  { keys: "cat about.md", description: "jump to the about section" },
  { keys: "whoami", description: "jump to the top" },
  { keys: "contact", description: "jump to the contact section" },
  { keys: "open <target>", description: `open a link (${Object.keys(OPEN_TARGETS).join("|")})` },
  { keys: "clear", description: "clear output and scroll to top" },
];

export const COMMAND_NAMES = COMMANDS.map((c) => c.keys.split(" ")[0]) as readonly string[];

/** Global keybindings, active anywhere on the page (desktop only). */
export const KEYBINDINGS: HelpEntry[] = [
  { keys: "j / k", description: "scroll to next / previous section" },
  { keys: "gg", description: "jump to top" },
  { keys: "G", description: "jump to last section (contact)" },
  { keys: "1-6", description: "jump to section 1:about … 6:contact" },
  { keys: "/", description: "focus the prompt" },
  { keys: "?", description: "toggle this help" },
  { keys: "Esc", description: "blur prompt / close help" },
];

/** Contextual keybindings that only apply while a specific element is focused/visible. */
export const CONTEXT_KEYBINDINGS: HelpEntry[] = [
  { keys: "↑ / ↓, Enter", description: "browse the ls -la listing (while it's on screen)" },
  { keys: "↑ / ↓ history, Tab", description: "command history / completion in the prompt" },
];

/** Lines rendered by `help`, derived from the same COMMANDS/KEYBINDINGS data
 *  as the HelpOverlay so they can't drift out of sync. */
export function helpLines(): string[] {
  const lines: string[] = [];
  lines.push("available commands:");
  for (const { keys, description } of COMMANDS) {
    lines.push(`  ${keys.padEnd(18, " ")} ${description}`);
  }
  lines.push("");
  lines.push("keybindings:");
  for (const { keys, description } of KEYBINDINGS) {
    lines.push(`  ${keys.padEnd(18, " ")} ${description}`);
  }
  lines.push("");
  lines.push("context keybindings:");
  for (const { keys, description } of CONTEXT_KEYBINDINGS) {
    lines.push(`  ${keys.padEnd(18, " ")} ${description}`);
  }
  return lines;
}

function lsLines(): string[] {
  return ["sections:", ...navSections.map((s) => `  ${s.label}/`)];
}

/** Normalizes a `cd`-style argument: strips trailing slash and `~/` prefix. */
function normalizeDirArg(arg: string): string {
  let v = arg.trim();
  if (v.startsWith("~/")) v = v.slice(2);
  else if (v === "~") v = "";
  v = v.replace(/\/+$/, "");
  return v;
}

function resolveSection(arg: string): string | null {
  const v = normalizeDirArg(arg);
  if (v === "" || v === "..") return "top";
  const match = navSections.find((s) => s.id === v || s.label === v);
  return match ? match.id : null;
}

/** Splits raw input into a command name and the rest of the line (trimmed). */
function parse(input: string): { cmd: string; rest: string } {
  const trimmed = input.trim();
  const spaceIdx = trimmed.indexOf(" ");
  if (spaceIdx === -1) return { cmd: trimmed, rest: "" };
  return { cmd: trimmed.slice(0, spaceIdx), rest: trimmed.slice(spaceIdx + 1).trim() };
}

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (trimmed === "") return { kind: "none" };

  const { cmd, rest } = parse(trimmed);

  switch (cmd) {
    case "help":
      return { kind: "text", lines: helpLines() };

    case "ls":
      return { kind: "text", lines: lsLines() };

    case "cd": {
      const target = resolveSection(rest || "~");
      if (!target) return { kind: "error", message: `cd: no such file or directory: ${rest}` };
      return { kind: "nav", target };
    }

    case "cat": {
      const arg = normalizeDirArg(rest);
      if (arg === "about.md") return { kind: "nav", target: "about" };
      return { kind: "error", message: `cat: ${rest}: No such file or directory` };
    }

    case "whoami":
      return { kind: "nav", target: "top" };

    case "contact":
      return { kind: "nav", target: "contact" };

    case "open": {
      const target = rest.toLowerCase();
      const url = OPEN_TARGETS[target];
      if (!url) {
        return {
          kind: "error",
          message: `open: unknown target '${rest}'. try: ${Object.keys(OPEN_TARGETS).join(", ")}`,
        };
      }
      return { kind: "open", url };
    }

    case "clear":
      return { kind: "clear" };

    default:
      return { kind: "error", message: `command not found: ${cmd}. Type 'help'.` };
  }
}

/** Returns Tab-completion candidates for the given (partial) input. */
export function completeCommand(input: string): string[] {
  const { cmd, rest } = parse(input);

  // Still typing the command name itself.
  if (input.trim() === cmd && !input.endsWith(" ")) {
    return COMMAND_NAMES.filter((name) => name.startsWith(cmd) && name !== cmd);
  }

  switch (cmd) {
    case "cd": {
      const candidates = ["~", "..", ...navSections.map((s) => `${s.label}/`)];
      return candidates.filter((c) => c.startsWith(rest));
    }
    case "cat": {
      const candidates = ["about.md", "~/about.md"];
      return candidates.filter((c) => c.startsWith(rest));
    }
    case "open": {
      const candidates = Object.keys(OPEN_TARGETS);
      return candidates.filter((c) => c.startsWith(rest));
    }
    default:
      return [];
  }
}


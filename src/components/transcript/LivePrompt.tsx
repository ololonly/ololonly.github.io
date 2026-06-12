import { useCallback, useEffect, useRef, useState } from "react";
import { completeCommand, executeCommand, type CommandResult } from "../../terminal/commands";
import { useCommander } from "../../context/CommanderContext";

/* The live prompt: a real <input> styled into a shell prompt row, docked
   above the StatusBar on desktop. Executes commands via the pure-TS
   registry in src/terminal/commands.ts and renders text/error output in a
   small ephemeral panel directly above the prompt. */
export default function LivePrompt() {
  const { registerPromptFocus, navigate } = useCommander();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [output, setOutput] = useState<{ lines: string[]; isError: boolean } | null>(null);

  // session-only command history
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number | null>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Let the global `/` keybinding focus this input.
  useEffect(() => {
    registerPromptFocus(focusInput);
    return () => registerPromptFocus(null);
  }, [registerPromptFocus, focusInput]);

  const runCommand = (raw: string) => {
    const result: CommandResult = executeCommand(raw);
    handleResult(result);

    const trimmed = raw.trim();
    if (trimmed !== "") {
      historyRef.current = [...historyRef.current, trimmed];
    }
    historyIndexRef.current = null;
    setValue("");
  };

  const handleResult = (result: CommandResult) => {
    switch (result.kind) {
      case "nav":
        setOutput(null);
        navigate(result.target);
        break;
      case "open":
        setOutput(null);
        window.open(result.url, "_blank", "noreferrer");
        break;
      case "text":
        setOutput({ lines: result.lines, isError: false });
        break;
      case "error":
        setOutput({ lines: [result.message], isError: true });
        break;
      case "clear":
        setOutput(null);
        navigate("top");
        break;
      case "none":
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        runCommand(value);
        break;
      case "Escape":
        e.preventDefault();
        if (output) {
          setOutput(null);
        } else {
          inputRef.current?.blur();
        }
        break;
      case "ArrowUp": {
        const hist = historyRef.current;
        if (hist.length === 0) break;
        e.preventDefault();
        const idx = historyIndexRef.current === null ? hist.length - 1 : Math.max(0, historyIndexRef.current - 1);
        historyIndexRef.current = idx;
        setValue(hist[idx]);
        break;
      }
      case "ArrowDown": {
        const hist = historyRef.current;
        if (historyIndexRef.current === null) break;
        e.preventDefault();
        const idx = historyIndexRef.current + 1;
        if (idx >= hist.length) {
          historyIndexRef.current = null;
          setValue("");
        } else {
          historyIndexRef.current = idx;
          setValue(hist[idx]);
        }
        break;
      }
      case "Tab": {
        e.preventDefault();
        const candidates = completeCommand(value);
        if (candidates.length === 1) {
          const { cmd, rest } = splitInput(value);
          if (rest === undefined) {
            setValue(`${candidates[0]} `);
          } else {
            setValue(`${cmd} ${candidates[0]}`);
          }
        } else if (candidates.length > 1) {
          setOutput({ lines: candidates, isError: false });
        }
        break;
      }
    }
  };

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      {output && (
        <div className="mx-auto max-w-5xl px-5 py-2 font-mono text-xs sm:px-8">
          <div
            className={`max-h-40 overflow-y-auto whitespace-pre-wrap ${
              output.isError ? "text-[var(--color-term-red)]" : "text-[var(--color-dim)]"
            }`}
          >
            {output.lines.map((line, i) => (
              <div key={i}>{line || " "}</div>
            ))}
          </div>
        </div>
      )}
      <div
        className="mx-auto flex max-w-5xl cursor-text items-center gap-2 px-5 py-2 font-mono text-xs sm:px-8"
        onClick={focusInput}
      >
        <span className="flex items-baseline gap-1 shrink-0">
          <span className="text-[var(--color-term-green)]">ivan@waytoo.dev</span>
          <span className="text-[var(--color-dim)]">:</span>
          <span className="text-[var(--color-term-cyan)]">~</span>
          <span className="text-[var(--color-dim)]">$</span>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="command prompt"
          placeholder="type a command… ('help' for a list, '/' to focus)"
          className="w-full flex-1 bg-transparent text-[var(--color-accent)] caret-[var(--color-accent)] outline-none placeholder:text-[var(--color-dim)]"
        />
      </div>
    </div>
  );
}

/** Splits input into command + rest, where rest is undefined if there's no space yet. */
function splitInput(input: string): { cmd: string; rest: string | undefined } {
  const spaceIdx = input.indexOf(" ");
  if (spaceIdx === -1) return { cmd: input, rest: undefined };
  return { cmd: input.slice(0, spaceIdx), rest: input.slice(spaceIdx + 1) };
}

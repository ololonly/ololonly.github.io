import { useEffect, useState } from "react";

/** Parse "owner/repo" out of a github.com URL, or null if it isn't one. */
function repoFromUrl(url: string): string | null {
  const m = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?\/?$/);
  return m ? m[1] : null;
}

/**
 * Fetches live star counts for the given github URLs.
 * Returns a map keyed by URL. Unresolved/failed entries are simply absent,
 * so callers should fall back to a hardcoded value.
 */
export function useGithubStars(urls: string[]): Record<string, number> {
  const [stars, setStars] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    const repos = urls
      .map((url) => ({ url, repo: repoFromUrl(url) }))
      .filter((x): x is { url: string; repo: string } => x.repo !== null);

    Promise.all(
      repos.map(async ({ url, repo }) => {
        try {
          const res = await fetch(`https://api.github.com/repos/${repo}`);
          if (!res.ok) return null;
          const data = (await res.json()) as { stargazers_count?: number };
          if (typeof data.stargazers_count !== "number") return null;
          return [url, data.stargazers_count] as const;
        } catch {
          return null;
        }
      }),
    ).then((results) => {
      if (cancelled) return;
      const next: Record<string, number> = {};
      for (const r of results) if (r) next[r[0]] = r[1];
      if (Object.keys(next).length) setStars(next);
    });

    return () => {
      cancelled = true;
    };
  }, [urls.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  return stars;
}

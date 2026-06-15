"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PROBLEMS } from "@/lib/data/problems";
import { PATTERN_MAP } from "@/lib/data/patterns";
import { useProgress } from "@/lib/store";
import { DifficultyBadge, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { Difficulty } from "@/lib/types";

const DIFFS: (Difficulty | "All")[] = ["All", "Easy", "Medium", "Hard"];

export function ProblemList({ initialTopic = "All" }: { initialTopic?: string }) {
  const solved = useProgress((s) => s.solved);
  const bookmarks = useProgress((s) => s.bookmarks);
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<Difficulty | "All">("All");
  const [pattern, setPattern] = useState<string>("All");
  const [topic, setTopic] = useState<string>(initialTopic);

  const patterns = useMemo(
    () => Array.from(new Set(PROBLEMS.flatMap((p) => p.patterns))),
    [],
  );
  const topics = useMemo(
    () => Array.from(new Set(PROBLEMS.flatMap((p) => p.topics))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (diff !== "All" && p.difficulty !== diff) return false;
      if (pattern !== "All" && !p.patterns.includes(pattern)) return false;
      if (topic !== "All" && !p.topics.includes(topic)) return false;
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, diff, pattern, topic]);

  const solvedCount = filtered.filter((p) => solved[p.slug]).length;

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search problems…"
          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-brand sm:max-w-xs"
        />
        <div className="flex gap-1.5">
          {DIFFS.map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                diff === d
                  ? "border-brand bg-brand/10 text-fg"
                  : "border-border bg-surface text-muted hover:text-fg",
              )}
            >
              {d}
            </button>
          ))}
        </div>
        <select
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="All">All patterns</option>
          {patterns.map((p) => (
            <option key={p} value={p}>
              {PATTERN_MAP[p]?.name ?? p}
            </option>
          ))}
        </select>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="All">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-3 text-sm text-muted">
        {filtered.length} problems · {solvedCount} solved
      </p>

      <div className="overflow-hidden rounded-2xl border border-border">
        {filtered.map((p, i) => (
          <Link key={p.slug} href={`/problems/${p.slug}`}>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2",
                i !== 0 && "border-t border-border",
              )}
            >
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px]",
                  solved[p.slug]
                    ? "border-easy bg-easy/20 text-easy"
                    : "border-border text-transparent",
                )}
                aria-label={solved[p.slug] ? "Solved" : "Unsolved"}
              >
                ✓
              </span>
              <span className="flex-1 font-medium">{p.title}</span>
              {bookmarks.includes(p.slug) && <span title="Bookmarked">🔖</span>}
              <div className="hidden gap-1 sm:flex">
                {p.patterns.slice(0, 2).map((pat) => (
                  <Badge key={pat}>{PATTERN_MAP[pat]?.name ?? pat}</Badge>
                ))}
              </div>
              <DifficultyBadge difficulty={p.difficulty} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/cn";

export function ProblemActions({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const solved = useProgress((s) => s.solved);
  const bookmarks = useProgress((s) => s.bookmarks);
  const toggleSolved = useProgress((s) => s.toggleSolved);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const touchStreak = useProgress((s) => s.touchStreak);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-10" />;

  const isSolved = !!solved[slug];
  const isBookmarked = bookmarks.includes(slug);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => {
          toggleSolved(slug);
          touchStreak();
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all active:scale-[0.98]",
          isSolved
            ? "bg-easy/15 text-easy ring-1 ring-easy/40"
            : "bg-brand text-brand-fg hover:opacity-90",
        )}
      >
        {isSolved ? "✓ Solved" : "Mark as solved"}
      </button>
      <button
        onClick={() => toggleBookmark(slug)}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all active:scale-[0.98]",
          isBookmarked
            ? "border-brand bg-brand/10 text-fg"
            : "border-border bg-surface text-muted hover:text-fg",
        )}
      >
        {isBookmarked ? "🔖 Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROBLEMS } from "@/lib/data/problems";
import { SHEET_MAP } from "@/lib/data/roadmaps";
import { useProgress } from "@/lib/store";
import { Card, ProgressBar, DifficultyBadge, Badge } from "@/components/ui/primitives";
import type { SheetId } from "@/lib/types";
import { cn } from "@/lib/cn";

export function SheetView({ id }: { id: SheetId }) {
  const [mounted, setMounted] = useState(false);
  const solved = useProgress((s) => s.solved);
  const bookmarks = useProgress((s) => s.bookmarks);
  const toggleSolved = useProgress((s) => s.toggleSolved);
  const touchStreak = useProgress((s) => s.touchStreak);
  useEffect(() => setMounted(true), []);

  const meta = SHEET_MAP[id];
  const problems = PROBLEMS.filter((p) => p.sheets.includes(id));
  const done = mounted ? problems.filter((p) => solved[p.slug]).length : 0;
  const pct = problems.length ? Math.round((done / problems.length) * 100) : 0;

  return (
    <div>
      <Link href="/sheets" className="text-sm text-muted hover:text-fg">
        ← All sheets
      </Link>
      <header className="mb-6 mt-3">
        <h1 className="text-3xl font-bold tracking-tight">{meta.name}</h1>
        <p className="mt-2 text-muted">{meta.description}</p>
      </header>

      {id === "striver" && (
        <Link href="/course">
          <Card className="mb-6 border-brand/40 bg-brand/5 transition-colors hover:border-brand">
            <p className="text-sm font-semibold">
              📚 The complete A2Z sheet lives in the Full DSA Course →
            </p>
            <p className="mt-1 text-sm text-muted">
              All 369 problems across 16 steps, with check-off progress and links into full
              Beacon explanations.
            </p>
          </Card>
        </Link>
      )}

      <Card className="mb-6">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Your progress (seeded problems)</span>
          <span className="text-muted">
            {done} / {problems.length} · {pct}%
          </span>
        </div>
        <ProgressBar value={pct} className="mt-3" />
        <p className="mt-2 text-xs text-muted">
          {problems.length} of the canonical {meta.total} are wired up in this build.
        </p>
      </Card>

      <div className="overflow-hidden rounded-2xl border border-border">
        {problems.map((p, i) => (
          <div
            key={p.slug}
            className={cn(
              "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2",
              i !== 0 && "border-t border-border",
            )}
          >
            <button
              onClick={() => {
                toggleSolved(p.slug);
                touchStreak();
              }}
              aria-label="Toggle solved"
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] transition-colors",
                mounted && solved[p.slug]
                  ? "border-easy bg-easy/20 text-easy"
                  : "border-border text-transparent hover:border-brand",
              )}
            >
              ✓
            </button>
            <Link href={`/problems/${p.slug}`} className="flex-1 font-medium hover:text-brand">
              {p.title}
            </Link>
            {mounted && bookmarks.includes(p.slug) && <span title="Bookmarked">🔖</span>}
            <Badge>★ {p.frequency}</Badge>
            <DifficultyBadge difficulty={p.difficulty} />
          </div>
        ))}
      </div>
    </div>
  );
}

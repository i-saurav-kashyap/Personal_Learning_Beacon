"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROBLEMS, PROBLEM_MAP } from "@/lib/data/problems";
import { SHEET_MAP } from "@/lib/data/roadmaps";
import { SHEET_TITLES } from "@/lib/data/sheets-content";
import { librarySlugForTitle } from "@/lib/courseMatch";
import { useProgress } from "@/lib/store";
import { Card, ProgressBar, DifficultyBadge, Badge } from "@/components/ui/primitives";
import type { Difficulty, SheetId } from "@/lib/types";
import { cn } from "@/lib/cn";

interface Row {
  title: string;
  slug?: string;
  difficulty?: Difficulty;
  frequency?: number;
}

export function SheetView({ id }: { id: SheetId }) {
  const [mounted, setMounted] = useState(false);
  const solved = useProgress((s) => s.solved);
  const bookmarks = useProgress((s) => s.bookmarks);
  const toggleSolved = useProgress((s) => s.toggleSolved);
  const touchStreak = useProgress((s) => s.touchStreak);
  useEffect(() => setMounted(true), []);

  const meta = SHEET_MAP[id];

  // Canonical ordered list (Blind 75 / NeetCode 150 / Top 50) resolved to our
  // library; or tag-based membership for the others.
  const canonical = SHEET_TITLES[id];
  const rows: Row[] = canonical
    ? canonical.map((title) => {
        const slug = librarySlugForTitle(title);
        const p = slug ? PROBLEM_MAP[slug] : undefined;
        return p
          ? { title: p.title, slug: p.slug, difficulty: p.difficulty, frequency: p.frequency }
          : { title };
      })
    : PROBLEMS.filter((p) => p.sheets.includes(id)).map((p) => ({
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        frequency: p.frequency,
      }));

  const solvable = rows.filter((r) => r.slug);
  const done = mounted ? solvable.filter((r) => solved[r.slug!]).length : 0;
  const pct = solvable.length ? Math.round((done / solvable.length) * 100) : 0;
  const withContent = rows.filter((r) => r.slug).length;

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
          <span className="font-medium">Your progress</span>
          <span className="text-muted">
            {done} / {rows.length} · {pct}%
          </span>
        </div>
        <ProgressBar value={pct} className="mt-3" />
        <p className="mt-2 text-xs text-muted">
          {rows.length} problems
          {withContent < rows.length
            ? ` · ${withContent} with full Beacon solutions`
            : " · every one with a full Beacon solution"}
        </p>
      </Card>

      <div className="overflow-hidden rounded-2xl border border-border">
        {rows.map((r, i) => {
          const isSolved = mounted && r.slug ? !!solved[r.slug] : false;
          return (
            <div
              key={`${r.title}-${i}`}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2",
                i !== 0 && "border-t border-border",
              )}
            >
              <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted">
                {i + 1}
              </span>
              <button
                onClick={() => {
                  if (!r.slug) return;
                  toggleSolved(r.slug);
                  touchStreak();
                }}
                disabled={!r.slug}
                aria-label="Toggle solved"
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] transition-colors",
                  isSolved
                    ? "border-easy bg-easy/20 text-easy"
                    : "border-border text-transparent hover:border-brand",
                  !r.slug && "opacity-30",
                )}
              >
                ✓
              </button>
              {r.slug ? (
                <Link href={`/problems/${r.slug}`} className="flex-1 font-medium hover:text-brand">
                  {r.title}
                </Link>
              ) : (
                <span className="flex-1 font-medium text-muted">{r.title}</span>
              )}
              {mounted && r.slug && bookmarks.includes(r.slug) && <span title="Bookmarked">🔖</span>}
              {r.frequency !== undefined && <Badge>★ {r.frequency}</Badge>}
              {r.difficulty && <DifficultyBadge difficulty={r.difficulty} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

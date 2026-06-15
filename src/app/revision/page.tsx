"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress, dueReviews, SR_INTERVALS, type ReviewItem } from "@/lib/store";
import { PROBLEM_MAP } from "@/lib/data/problems";
import { Card, SectionHeading, Badge, DifficultyBadge } from "@/components/ui/primitives";

export default function RevisionPage() {
  const [mounted, setMounted] = useState(false);
  const reviews = useProgress((s) => s.reviews);
  const promoteReview = useProgress((s) => s.promoteReview);
  const touchStreak = useProgress((s) => s.touchStreak);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />;

  const due = dueReviews(reviews);
  const hasAny = Object.keys(reviews).length > 0;

  function Bucket({ title, items, actionable }: { title: string; items: ReviewItem[]; actionable?: boolean }) {
    return (
      <Card>
        <h2 className="mb-3 flex items-center gap-2 font-semibold">
          {title} <Badge>{items.length}</Badge>
        </h2>
        {items.length === 0 ? (
          <p className="text-sm text-muted">Nothing here right now.</p>
        ) : (
          <div className="space-y-2">
            {items.map((r) => {
              const p = PROBLEM_MAP[r.slug];
              if (!p) return null;
              return (
                <div
                  key={r.slug}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2"
                >
                  <div className="min-w-0">
                    <Link href={`/problems/${r.slug}`} className="font-medium hover:text-brand">
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted">
                      Interval: {SR_INTERVALS[r.stage]}d
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DifficultyBadge difficulty={p.difficulty} />
                    {actionable && (
                      <button
                        onClick={() => {
                          promoteReview(r.slug);
                          touchStreak();
                        }}
                        className="rounded-lg bg-brand px-2.5 py-1 text-xs font-semibold text-brand-fg"
                      >
                        Recalled ✓
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Don't forget what you learn"
        title="Revision Hub"
        subtitle="Solved problems auto-enrol into spaced repetition on a 1 · 3 · 7 · 15 · 30-day schedule. Recall a problem to push it to the next interval."
      />

      {!hasAny ? (
        <Card className="text-sm text-muted">
          No problems in your revision queue yet. Mark a problem as solved in the{" "}
          <Link href="/problems" className="text-brand hover:underline">
            question library
          </Link>{" "}
          and it will appear here on its review date.
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <Bucket title="Due today" items={due.today} actionable />
          <Bucket title="Tomorrow" items={due.tomorrow} />
          <Bucket title="This week" items={due.week} />
        </div>
      )}
    </div>
  );
}

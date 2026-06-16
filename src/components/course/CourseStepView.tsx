"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCourseStep } from "@/lib/data/course";
import { librarySlugForTitle } from "@/lib/courseMatch";
import { conceptSlugForTitle } from "@/lib/data/concepts";
import { useProgress } from "@/lib/store";
import { Card, ProgressBar, DifficultyBadge } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export function CourseStepView({ stepId }: { stepId: number }) {
  const [mounted, setMounted] = useState(false);
  const tracked = useProgress((s) => s.tracked);
  const toggleTracked = useProgress((s) => s.toggleTracked);
  useEffect(() => setMounted(true), []);

  const step = getCourseStep(stepId);
  if (!step) return null;

  const allSlugs = step.sections.flatMap((s) => s.problems.map((p) => p.slug));
  const done = mounted ? allSlugs.filter((s) => tracked[s]).length : 0;
  const pct = allSlugs.length ? Math.round((done / allSlugs.length) * 100) : 0;

  const prev = stepId > 1 ? stepId - 1 : null;
  const next = getCourseStep(stepId + 1) ? stepId + 1 : null;

  return (
    <div>
      <Link href="/course" className="text-sm text-muted hover:text-fg">
        ← Full DSA Course
      </Link>
      <header className="mb-5 mt-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Step {step.id}</p>
        <h1 className="text-3xl font-bold tracking-tight">{step.name}</h1>
      </header>

      <Card className="mb-6">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Step progress</span>
          <span className="text-muted">
            {done} / {allSlugs.length} · {pct}%
          </span>
        </div>
        <ProgressBar value={pct} className="mt-3" />
      </Card>

      <div className="space-y-6">
        {step.sections.map((section) => (
          <section key={section.name}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
              {section.name}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              {section.problems.map((p, i) => {
                const lib = librarySlugForTitle(p.title);
                const concept = lib ? undefined : conceptSlugForTitle(p.title);
                const isDone = mounted && !!tracked[p.slug];
                return (
                  <div
                    key={p.slug}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-surface-2",
                      i !== 0 && "border-t border-border",
                    )}
                  >
                    <button
                      onClick={() => toggleTracked(p.slug)}
                      aria-label={isDone ? "Mark not done" : "Mark done"}
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] transition-colors",
                        isDone
                          ? "border-easy bg-easy/20 text-easy"
                          : "border-border text-transparent hover:border-brand",
                      )}
                    >
                      ✓
                    </button>
                    <span className={cn("flex-1 text-sm", isDone && "text-muted line-through")}>
                      {p.title}
                    </span>
                    {lib ? (
                      <Link
                        href={`/problems/${lib}`}
                        className="rounded-lg border border-brand/40 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand hover:bg-brand/20"
                      >
                        Study →
                      </Link>
                    ) : concept ? (
                      <Link
                        href={`/concepts/${concept}`}
                        className="rounded-lg border border-easy/40 bg-easy/10 px-2 py-0.5 text-xs font-medium text-easy hover:bg-easy/20"
                      >
                        Learn →
                      </Link>
                    ) : (
                      <a
                        href={`https://leetcode.com/problemset/?search=${encodeURIComponent(p.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-border px-2 py-0.5 text-xs font-medium text-muted hover:bg-surface-2 hover:text-fg"
                      >
                        LeetCode ↗
                      </a>
                    )}
                    <DifficultyBadge difficulty={p.difficulty} />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        {prev ? (
          <Link
            href={`/course/${prev}`}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-surface-2"
          >
            ← Step {prev}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/course/${next}`}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-fg"
          >
            Step {next} →
          </Link>
        )}
      </div>
    </div>
  );
}

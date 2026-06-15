"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { generateRoadmap } from "@/lib/data/roadmaps";
import { PROBLEM_MAP } from "@/lib/data/problems";
import { useProgress } from "@/lib/store";
import { Card, ProgressBar, DifficultyBadge } from "@/components/ui/primitives";
import type { PlanLength } from "@/lib/types";

export function RoadmapView({ length }: { length: PlanLength }) {
  const [mounted, setMounted] = useState(false);
  const solved = useProgress((s) => s.solved);
  useEffect(() => setMounted(true), []);

  const roadmap = generateRoadmap(length);
  const allSlugs = Array.from(new Set(roadmap.days.flatMap((d) => d.problems)));
  const doneCount = mounted ? allSlugs.filter((s) => solved[s]).length : 0;
  const pct = allSlugs.length ? Math.round((doneCount / allSlugs.length) * 100) : 0;

  return (
    <div>
      <Link href="/roadmaps" className="text-sm text-muted hover:text-fg">
        ← All roadmaps
      </Link>
      <header className="mb-6 mt-3">
        <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
        <p className="mt-2 text-muted">{roadmap.summary}</p>
      </header>

      <Card className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Plan progress</span>
          <span className="text-muted">
            {doneCount} / {allSlugs.length} unique problems · {pct}%
          </span>
        </div>
        <ProgressBar value={pct} className="mt-3" />
      </Card>

      <ol className="space-y-3">
        {roadmap.days.map((day) => {
          const dayProblems = day.problems
            .map((s) => PROBLEM_MAP[s])
            .filter(Boolean);
          const dayDone = mounted && dayProblems.every((p) => solved[p.slug]);
          return (
            <li key={day.day}>
              <Card className={dayDone ? "border-easy/40" : ""}>
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                      dayDone ? "bg-easy/20 text-easy" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {dayDone ? "✓" : day.day}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      Day {day.day}: {day.title}
                    </h3>
                    <p className="text-sm text-muted">{day.focus}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {dayProblems.map((p) => (
                        <Link key={p.slug} href={`/problems/${p.slug}`}>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors hover:border-brand/50 ${
                              mounted && solved[p.slug]
                                ? "border-easy/40 bg-easy/10"
                                : "border-border bg-surface"
                            }`}
                          >
                            {mounted && solved[p.slug] && <span className="text-easy">✓</span>}
                            {p.title}
                            <DifficultyBadge difficulty={p.difficulty} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COURSE_STEPS, COURSE_TOTAL } from "@/lib/data/course";
import { useProgress } from "@/lib/store";
import { Card, ProgressBar, Badge } from "@/components/ui/primitives";

function stepSlugs(stepId: number): string[] {
  const step = COURSE_STEPS.find((s) => s.id === stepId);
  if (!step) return [];
  return step.sections.flatMap((sec) => sec.problems.map((p) => p.slug));
}

export function CourseOverview() {
  const [mounted, setMounted] = useState(false);
  const tracked = useProgress((s) => s.tracked);
  useEffect(() => setMounted(true), []);

  const doneTotal = mounted
    ? COURSE_STEPS.reduce(
        (n, s) => n + stepSlugs(s.id).filter((slug) => tracked[slug]).length,
        0,
      )
    : 0;
  const pct = COURSE_TOTAL ? Math.round((doneTotal / COURSE_TOTAL) * 100) : 0;

  return (
    <div>
      <Card className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Course progress</span>
          <span className="text-muted">
            {doneTotal} / {COURSE_TOTAL} · {pct}%
          </span>
        </div>
        <ProgressBar value={pct} className="mt-3" />
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {COURSE_STEPS.map((step) => {
          const slugs = stepSlugs(step.id);
          const done = mounted ? slugs.filter((s) => tracked[s]).length : 0;
          const sp = slugs.length ? Math.round((done / slugs.length) * 100) : 0;
          return (
            <Link key={step.id} href={`/course/${step.id}`}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    <span className="text-muted">Step {step.id}.</span> {step.name}
                  </h3>
                  <Badge>{slugs.length}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {step.sections.length} section{step.sections.length > 1 ? "s" : ""} · {done}/
                  {slugs.length} done
                </p>
                <ProgressBar value={sp} className="mt-3" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

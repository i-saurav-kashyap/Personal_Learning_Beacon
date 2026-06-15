"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress, dueReviews } from "@/lib/store";
import { PROBLEMS } from "@/lib/data/problems";
import { COMPANY_MAP } from "@/lib/data/companies";
import { Card, ProgressBar, Badge, Button } from "@/components/ui/primitives";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { profile, solved, bookmarks, reviews, streak } = useProgress();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />;
  }

  const total = PROBLEMS.length;
  const solvedSlugs = Object.keys(solved);
  const solvedCount = solvedSlugs.length;
  const pct = total ? Math.round((solvedCount / total) * 100) : 0;

  // topic strength: per-topic solved ratio
  const topicStats = new Map<string, { total: number; done: number }>();
  for (const p of PROBLEMS) {
    for (const t of p.topics) {
      const s = topicStats.get(t) ?? { total: 0, done: 0 };
      s.total++;
      if (solved[p.slug]) s.done++;
      topicStats.set(t, s);
    }
  }
  const topics = Array.from(topicStats.entries()).map(([name, s]) => ({
    name,
    ratio: s.done / s.total,
    ...s,
  }));
  const weak = [...topics].sort((a, b) => a.ratio - b.ratio).slice(0, 3);
  const strong = [...topics].sort((a, b) => b.ratio - a.ratio).filter((t) => t.done > 0).slice(0, 3);

  const due = dueReviews(reviews);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {profile ? (
            <p className="mt-1 text-muted">
              {profile.level} · targeting{" "}
              <span className="font-medium text-fg">
                {COMPANY_MAP[profile.company]?.name ?? profile.company}
              </span>{" "}
              · {profile.plan}-day plan · {profile.language}
            </p>
          ) : (
            <p className="mt-1 text-muted">
              No profile yet —{" "}
              <Link href="/" className="text-brand hover:underline">
                take the 30-second onboarding
              </Link>
              .
            </p>
          )}
        </div>
        {profile && <Button href={`/roadmaps/${profile.plan}`}>Open my roadmap →</Button>}
      </div>

      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-muted">Overall progress</p>
          <p className="mt-1 text-3xl font-bold">{pct}%</p>
          <ProgressBar value={pct} className="mt-3" />
          <p className="mt-2 text-xs text-muted">
            {solvedCount} / {total} solved
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Current streak</p>
          <p className="mt-1 text-3xl font-bold">🔥 {streak}</p>
          <p className="mt-3 text-xs text-muted">Solve one problem a day to keep it alive.</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Bookmarked</p>
          <p className="mt-1 text-3xl font-bold">🔖 {bookmarks.length}</p>
          <p className="mt-3 text-xs text-muted">Saved for later review.</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Due for revision</p>
          <p className="mt-1 text-3xl font-bold">{due.today.length}</p>
          <Link href="/revision" className="mt-3 inline-block text-xs text-brand hover:underline">
            Open Revision Hub →
          </Link>
        </Card>
      </div>

      {/* Strength */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">💪 Strong topics</h2>
          {strong.length === 0 ? (
            <p className="text-sm text-muted">Solve a few problems to see your strengths emerge.</p>
          ) : (
            <div className="space-y-3">
              {strong.map((t) => (
                <TopicRow key={t.name} {...t} />
              ))}
            </div>
          )}
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">🎯 Focus next (weak topics)</h2>
          <div className="space-y-3">
            {weak.map((t) => (
              <TopicRow key={t.name} {...t} />
            ))}
          </div>
        </Card>
      </div>

      {/* Revision schedule */}
      <Card className="mt-6">
        <h2 className="mb-3 font-semibold">🔁 Revision schedule</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <RevisionBucket title="Due today" items={due.today.map((r) => r.slug)} />
          <RevisionBucket title="Tomorrow" items={due.tomorrow.map((r) => r.slug)} />
          <RevisionBucket title="This week" items={due.week.map((r) => r.slug)} />
        </div>
      </Card>
    </div>
  );
}

function TopicRow({ name, ratio, done, total }: { name: string; ratio: number; done: number; total: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted">
          {done}/{total}
        </span>
      </div>
      <ProgressBar value={ratio * 100} />
    </div>
  );
}

function RevisionBucket({ title, items }: { title: string; items: string[] }) {
  const map = Object.fromEntries(PROBLEMS.map((p) => [p.slug, p.title]));
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3">
      <p className="mb-2 text-sm font-semibold">
        {title} <Badge className="ml-1">{items.length}</Badge>
      </p>
      {items.length === 0 ? (
        <p className="text-xs text-muted">Nothing scheduled.</p>
      ) : (
        <ul className="space-y-1">
          {items.slice(0, 5).map((s) => (
            <li key={s}>
              <Link href={`/problems/${s}`} className="text-xs text-brand hover:underline">
                {map[s] ?? s}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

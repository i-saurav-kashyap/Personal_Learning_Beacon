import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPANIES, getCompany } from "@/lib/data/companies";
import { getProblem } from "@/lib/data/problems";
import { Card, Badge, DifficultyBadge, Button } from "@/components/ui/primitives";

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompany(slug);
  return { title: c ? `${c.name} Preparation` : "Company" };
}

function DistroBar({ data }: { data: { label: string; pct: number }[] }) {
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{d.label}</span>
            <span className="text-muted">{d.pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-brand" style={{ width: `${d.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function CompanyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) notFound();

  const { easy, medium, hard } = c.difficultyDistribution;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/companies" className="text-sm text-muted hover:text-fg">
        ← All companies
      </Link>
      <header className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{c.name}</h1>
          <p className="mt-2 max-w-xl text-muted">{c.blurb}</p>
        </div>
        <Button href={`/roadmaps/${c.recommendedPlan}`}>
          Start {c.recommendedPlan}-day plan →
        </Button>
      </header>

      <div className="mb-6 rounded-xl border border-medium/30 bg-medium/10 px-4 py-3 text-sm text-muted">
        ℹ️ These breakdowns reflect publicly reported interview experiences and community
        trends — not officially disclosed questions.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">Topic distribution</h2>
          <DistroBar data={c.topicDistribution} />
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">Pattern distribution</h2>
          <DistroBar data={c.patternDistribution} />
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="mb-3 font-semibold">Difficulty mix</h2>
        <div className="flex h-4 overflow-hidden rounded-full">
          <div className="bg-easy" style={{ width: `${easy}%` }} title={`Easy ${easy}%`} />
          <div className="bg-medium" style={{ width: `${medium}%` }} title={`Medium ${medium}%`} />
          <div className="bg-hard" style={{ width: `${hard}%` }} title={`Hard ${hard}%`} />
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted">
          <span>🟢 Easy {easy}%</span>
          <span>🟡 Medium {medium}%</span>
          <span>🔴 Hard {hard}%</span>
        </div>
      </Card>

      <section className="mt-6">
        <h2 className="mb-3 font-semibold">Commonly reported problems</h2>
        <div className="space-y-2">
          {c.reportedProblems.map((s) => {
            const p = getProblem(s);
            if (!p) return null;
            return (
              <Link key={s} href={`/problems/${s}`}>
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-brand/50">
                  <span className="font-medium">{p.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge>★ {p.frequency}/5</Badge>
                    <DifficultyBadge difficulty={p.difficulty} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

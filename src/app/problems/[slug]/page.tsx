import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROBLEMS, getProblem } from "@/lib/data/problems";
import { PATTERN_MAP } from "@/lib/data/patterns";
import { Card, DifficultyBadge, Badge } from "@/components/ui/primitives";
import { CodeTabs } from "@/components/problems/CodeTabs";
import { ProblemActions } from "@/components/problems/ProblemActions";
import { NotesEditor } from "@/components/problems/NotesEditor";
import type { Approach } from "@/lib/types";

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProblem(slug);
  return { title: p ? p.title : "Problem" };
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

const TIER_COLOR: Record<Approach["tier"], string> = {
  "Brute Force": "text-hard",
  Better: "text-medium",
  Optimal: "text-easy",
};

export default async function ProblemDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProblem(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/problems" className="text-sm text-muted hover:text-fg">
        ← Question library
      </Link>

      <header className="mb-6 mt-3">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={p.difficulty} />
          {p.patterns.map((pat) => (
            <Link key={pat} href={`/patterns/${pat}`}>
              <Badge className="hover:border-brand/50">{PATTERN_MAP[pat]?.name ?? pat}</Badge>
            </Link>
          ))}
          <Badge>★ {p.frequency}/5 frequency</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{p.title}</h1>
      </header>

      <div className="mb-8">
        <ProblemActions slug={p.slug} />
      </div>

      <Block title="Problem statement">
        <Card>
          <p className="leading-relaxed">{p.statement}</p>
        </Card>
      </Block>

      <Block title="Explain like I'm new" icon="🌱">
        <p className="leading-relaxed text-muted">{p.beginnerExplanation}</p>
      </Block>

      <Block title="Real-world analogy" icon="🌍">
        <Card className="bg-surface-2">
          <p className="italic leading-relaxed">{p.realWorldAnalogy}</p>
        </Card>
      </Block>

      <Block title="Visual walkthrough" icon="👁️">
        <pre className="overflow-x-auto rounded-2xl border border-border bg-surface-2 p-4 text-sm">
          <code className="font-mono">{p.visualExplanation}</code>
        </pre>
      </Block>

      <Block title="Approaches: brute → optimal" icon="🪜">
        <div className="space-y-3">
          {p.approaches.map((a, i) => (
            <Card key={i}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">
                  <span className={TIER_COLOR[a.tier]}>{a.tier}</span> · {a.title}
                </h3>
                <div className="flex gap-2 text-xs">
                  <Badge>⏱ {a.time}</Badge>
                  <Badge>💾 {a.space}</Badge>
                </div>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-muted">{a.idea}</p>
              <ol className="ml-4 list-decimal space-y-1 text-sm text-muted">
                {a.steps.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ol>
            </Card>
          ))}
        </div>
      </Block>

      <Block title="Dry run" icon="🔬">
        <pre className="overflow-x-auto rounded-2xl border border-border bg-surface-2 p-4 text-sm">
          <code className="font-mono">{p.dryRun}</code>
        </pre>
      </Block>

      <Block title="Solutions" icon="💻">
        <CodeTabs solutions={p.solutions} />
      </Block>

      <div className="grid gap-6 sm:grid-cols-2">
        <Block title="Interview tips" icon="🎤">
          <ul className="space-y-2">
            {p.interviewTips.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="mt-0.5 text-brand">→</span>
                {t}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Common mistakes" icon="🚫">
          <ul className="space-y-2">
            {p.commonMistakes.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="mt-0.5 text-hard">×</span>
                {t}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <Block title="Follow-up questions" icon="🔁">
        <ul className="space-y-2">
          {p.followUps.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted">
              <span className="mt-0.5 text-brand">?</span>
              {t}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="My revision notes" icon="📝">
        <NotesEditor slug={p.slug} />
      </Block>

      {p.related.filter((r) => r !== p.slug).length > 0 && (
        <Block title="Related problems" icon="🔗">
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(p.related.filter((r) => r !== p.slug))).map((r) => {
              const rp = getProblem(r);
              if (!rp) return null;
              return (
                <Link key={r} href={`/problems/${r}`}>
                  <Badge className="hover:border-brand/50">{rp.title}</Badge>
                </Link>
              );
            })}
          </div>
        </Block>
      )}
    </article>
  );
}

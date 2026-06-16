import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CONCEPTS, getConcept } from "@/lib/data/concepts";
import { getProblem } from "@/lib/data/problems";
import { Card, Badge, DifficultyBadge } from "@/components/ui/primitives";

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getConcept(slug);
  return { title: c ? c.title : "Concept" };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default async function ConceptDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/concepts" className="text-sm text-muted hover:text-fg">
        ← All concept lessons
      </Link>

      <header className="mb-8 mt-3">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl">{c.icon}</span>
          <Badge>{c.group}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h1>
        <p className="mt-2 text-lg text-muted">{c.tagline}</p>
      </header>

      <Section title="What it is">
        <p className="leading-relaxed text-muted">{c.explanation}</p>
      </Section>

      <Section title="🧠 The analogy">
        <Card className="bg-surface-2">
          <p className="italic leading-relaxed">{c.analogy}</p>
        </Card>
      </Section>

      <Section title="👁️ Visual">
        <pre className="overflow-x-auto rounded-2xl border border-border bg-surface-2 p-4 text-sm">
          <code className="font-mono">{c.visual}</code>
        </pre>
      </Section>

      {c.code && (
        <Section title="💻 In code">
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="border-b border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted">
              {c.code.language}
            </div>
            <pre className="overflow-x-auto bg-surface p-4 text-sm leading-relaxed">
              <code className="font-mono">{c.code.snippet}</code>
            </pre>
          </div>
        </Section>
      )}

      <Section title="🎯 Key points">
        <ul className="space-y-2">
          {c.keyPoints.map((k, i) => (
            <li key={i} className="flex gap-2.5 text-muted">
              <span className="mt-1 text-brand">✓</span>
              <span>{k}</span>
            </li>
          ))}
        </ul>
      </Section>

      {c.related.length > 0 && (
        <Section title="Practice next">
          <div className="space-y-2">
            {c.related.map((s) => {
              const p = getProblem(s);
              if (!p) return null;
              return (
                <Link key={s} href={`/problems/${s}`}>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-brand/50">
                    <span className="font-medium">{p.title}</span>
                    <DifficultyBadge difficulty={p.difficulty} />
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      )}
    </article>
  );
}

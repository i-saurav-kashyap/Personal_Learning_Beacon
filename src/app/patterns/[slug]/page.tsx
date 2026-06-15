import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PATTERNS, getPattern } from "@/lib/data/patterns";
import { Card, DifficultyBadge, Badge } from "@/components/ui/primitives";

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  return { title: pattern ? pattern.name : "Pattern" };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default async function PatternDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/patterns" className="text-sm text-muted hover:text-fg">
        ← All patterns
      </Link>

      <header className="mb-8 mt-3">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl">{pattern.icon}</span>
          <Badge>{pattern.group}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{pattern.name}</h1>
        <p className="mt-2 text-lg text-muted">{pattern.tagline}</p>
      </header>

      <Section title="What it is">
        <p className="leading-relaxed text-muted">{pattern.explanation}</p>
      </Section>

      <Section title="🧠 The analogy">
        <Card className="bg-surface-2">
          <p className="leading-relaxed italic">{pattern.analogy}</p>
        </Card>
      </Section>

      <Section title="🔍 How to recognise it">
        <ul className="space-y-2">
          {pattern.recognition.map((r, i) => (
            <li key={i} className="flex gap-2.5 text-muted">
              <span className="mt-1 text-brand">✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="⚠️ Common traps">
        <ul className="space-y-2">
          {pattern.traps.map((t, i) => (
            <li key={i} className="flex gap-2.5 text-muted">
              <span className="mt-0.5 text-hard">!</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {pattern.template && (
        <Section title="📐 The template">
          <pre className="overflow-x-auto rounded-2xl border border-border bg-surface-2 p-4 text-sm">
            <code className="font-mono">{pattern.template.code}</code>
          </pre>
          <p className="mt-1 text-xs text-muted">Reference skeleton ({pattern.template.language})</p>
        </Section>
      )}

      <Section title="Practice problems">
        {pattern.questions.length === 0 ? (
          <Card className="text-sm text-muted">
            Curated problems for this pattern are being added. Explore the{" "}
            <Link href="/problems" className="text-brand hover:underline">
              full library
            </Link>{" "}
            in the meantime.
          </Card>
        ) : (
          <div className="space-y-2">
            {pattern.questions.map((q) => (
              <Link key={q.slug} href={`/problems/${q.slug}`}>
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-brand/50">
                  <span className="font-medium">{q.title}</span>
                  <DifficultyBadge difficulty={q.difficulty} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </article>
  );
}

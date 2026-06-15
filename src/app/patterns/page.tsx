import Link from "next/link";
import type { Metadata } from "next";
import { PATTERNS } from "@/lib/data/patterns";
import { Card, SectionHeading, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Patterns" };

export default function PatternsPage() {
  const groups = Array.from(new Set(PATTERNS.map((p) => p.group)));
  return (
    <div>
      <SectionHeading
        eyebrow="The core curriculum"
        title="Patterns"
        subtitle="Most sites teach topics. We teach you to recognise the underlying pattern — the skill that lets one idea unlock dozens of problems."
      />
      {groups.map((group) => (
        <section key={group} className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
            {group}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PATTERNS.filter((p) => p.group === group).map((p) => (
              <Link key={p.slug} href={`/patterns/${p.slug}`}>
                <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl">{p.icon}</span>
                    <Badge>{p.questions.length} problems</Badge>
                  </div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.tagline}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

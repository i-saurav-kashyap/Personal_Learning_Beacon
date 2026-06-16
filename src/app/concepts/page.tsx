import Link from "next/link";
import type { Metadata } from "next";
import { CONCEPTS } from "@/lib/data/concepts";
import { Card, SectionHeading, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Concept Lessons" };

export default function ConceptsPage() {
  const groups = Array.from(new Set(CONCEPTS.map((c) => c.group)));
  return (
    <div>
      <SectionHeading
        eyebrow="Learn the idea first"
        title="Concept Lessons"
        subtitle="Short, plain-English primers for the foundational ideas — what a structure is and how it works — before you start solving problems on it."
      />
      {groups.map((group) => (
        <section key={group} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">{group}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONCEPTS.filter((c) => c.group === group).map((c) => (
              <Link key={c.slug} href={`/concepts/${c.slug}`}>
                <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl">{c.icon}</span>
                    <Badge>Lesson</Badge>
                  </div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.tagline}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

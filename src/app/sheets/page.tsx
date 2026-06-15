import Link from "next/link";
import type { Metadata } from "next";
import { SHEETS } from "@/lib/data/roadmaps";
import { PROBLEMS } from "@/lib/data/problems";
import { Card, SectionHeading, Badge, ProgressBar } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Curated Sheets" };

export default function SheetsPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="The famous lists"
        title="Curated Sheets"
        subtitle="Blind 75, NeetCode 150, Namaste DSA, Striver A2Z and our Top 50 — each tracked with progress, bookmarks and notes."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {SHEETS.map((s) => {
          const seeded = PROBLEMS.filter((p) => p.sheets.includes(s.id)).length;
          return (
            <Link key={s.id} href={`/sheets/${s.id}`}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  <Badge>{s.total} problems</Badge>
                </div>
                <p className="mt-1 text-xs text-muted">{s.source}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <p className="mt-4 text-xs text-muted">
                  {seeded} available now · more being added
                </p>
                <ProgressBar value={(seeded / s.total) * 100} className="mt-2" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { SHEETS } from "@/lib/data/roadmaps";
import { PROBLEMS } from "@/lib/data/problems";
import { SHEET_TITLES } from "@/lib/data/sheets-content";
import { librarySlugForTitle } from "@/lib/courseMatch";
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
          const canonical = SHEET_TITLES[s.id];
          const total = canonical ? canonical.length : s.total;
          const withContent = canonical
            ? canonical.filter((t) => librarySlugForTitle(t)).length
            : PROBLEMS.filter((p) => p.sheets.includes(s.id)).length;
          const complete = canonical && withContent === total;
          return (
            <Link key={s.id} href={`/sheets/${s.id}`}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  <Badge>{total} problems</Badge>
                </div>
                <p className="mt-1 text-xs text-muted">{s.source}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <p className="mt-4 text-xs text-muted">
                  {complete
                    ? `✓ all ${total} with full solutions`
                    : `${withContent} of ${total} with full solutions`}
                </p>
                <ProgressBar value={(withContent / total) * 100} className="mt-2" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

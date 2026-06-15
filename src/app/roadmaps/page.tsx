import Link from "next/link";
import type { Metadata } from "next";
import { PLAN_LENGTHS, generateRoadmap } from "@/lib/data/roadmaps";
import { Card, SectionHeading, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Roadmaps" };

export default function RoadmapsPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="A plan, not a pile"
        title="Roadmaps"
        subtitle="Pick the runway you have. Each plan sequences the core patterns, tracks your progress, and ends with mock-interview reps."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {PLAN_LENGTHS.map((len) => {
          const r = generateRoadmap(len);
          return (
            <Link key={len} href={`/roadmaps/${len}`}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{r.title}</h3>
                  <Badge>{r.days.length} days</Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.summary}</p>
                <p className="mt-4 text-sm font-medium text-brand">
                  View plan <span className="transition-transform group-hover:translate-x-1">→</span>
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

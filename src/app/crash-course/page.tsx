import Link from "next/link";
import type { Metadata } from "next";
import { PROBLEMS } from "@/lib/data/problems";
import { PATTERN_MAP } from "@/lib/data/patterns";
import { Card, SectionHeading, Badge, DifficultyBadge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Interview Crash Course" };

export default function CrashCoursePage() {
  const ranked = [...PROBLEMS].sort((a, b) => b.frequency - a.frequency);

  const lists = [
    { label: "Top 25", n: 25 },
    { label: "Top 50", n: 50 },
    { label: "Top 100", n: 100 },
    { label: "FAANG Most Repeated", n: 100 },
  ];

  return (
    <div>
      <SectionHeading
        eyebrow="🚀 Last-minute revision"
        title="Interview Crash Course"
        subtitle="The night-before pass: 2-minute summaries, the pattern used, the optimal approach and its complexity — for the highest-frequency problems."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {lists.map((l) => (
          <Badge key={l.label} className="px-3 py-1.5 text-sm">
            {l.label}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {ranked.map((p) => {
          const optimal = p.approaches.find((a) => a.tier === "Optimal") ?? p.approaches.at(-1)!;
          return (
            <Card key={p.slug}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link href={`/problems/${p.slug}`} className="text-lg font-semibold hover:text-brand">
                  {p.title}
                </Link>
                <div className="flex items-center gap-2">
                  {p.patterns.map((pat) => (
                    <Badge key={pat}>{PATTERN_MAP[pat]?.name ?? pat}</Badge>
                  ))}
                  <Badge>★ {p.frequency}/5</Badge>
                  <DifficultyBadge difficulty={p.difficulty} />
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-fg">2-min summary: </span>
                {p.beginnerExplanation}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <span>
                  <span className="font-semibold text-easy">Optimal:</span> {optimal.title}
                </span>
                <Badge>⏱ {optimal.time}</Badge>
                <Badge>💾 {optimal.space}</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

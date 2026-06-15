import Link from "next/link";
import type { Metadata } from "next";
import { PROBLEMS } from "@/lib/data/problems";
import { Card, SectionHeading, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Topics" };

const TOPIC_SYLLABUS = [
  "Complexity Analysis",
  "Arrays",
  "Strings",
  "Hashing",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Trees",
  "Binary Search Trees",
  "Heaps",
  "Tries",
  "Graphs",
  "Recursion",
  "Backtracking",
  "Greedy",
  "Dynamic Programming",
  "Bit Manipulation",
  "Union Find",
  "Binary Search",
  "Advanced String Algorithms",
];

export default function TopicsPage() {
  const counts = new Map<string, number>();
  for (const p of PROBLEMS) for (const t of p.topics) counts.set(t, (counts.get(t) ?? 0) + 1);

  return (
    <div>
      <SectionHeading
        eyebrow="The fundamentals"
        title="Topics"
        subtitle="The full DSA syllabus from complexity analysis to advanced string algorithms. Each topic links to its problems in the library."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOPIC_SYLLABUS.map((t) => {
          const n = counts.get(t) ?? 0;
          return (
            <Link key={t} href={`/problems?topic=${encodeURIComponent(t)}`}>
              <Card className="group flex h-full items-center justify-between transition-all hover:border-brand/50">
                <span className="font-medium">{t}</span>
                {n > 0 ? <Badge>{n} problems</Badge> : <Badge>Soon</Badge>}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

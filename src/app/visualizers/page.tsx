import Link from "next/link";
import type { Metadata } from "next";
import { Card, SectionHeading, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Visualizers" };

const GROUPS = [
  {
    group: "Sorting",
    items: [
      { name: "Bubble / Selection / Insertion / Merge / Quick", href: "/visualizers/sorting", live: true },
    ],
  },
  {
    group: "Searching",
    items: [
      { name: "Linear Search", href: "/visualizers/sorting", live: false },
      { name: "Binary Search", href: "/visualizers/binary-search", live: true },
    ],
  },
  {
    group: "Trees",
    items: [
      { name: "Traversals (in/pre/post/level)", href: "/visualizers/trees", live: true },
      { name: "BST Operations", href: "/visualizers/sorting", live: false },
    ],
  },
  {
    group: "Graphs",
    items: [
      { name: "BFS / DFS", href: "/visualizers/graphs", live: true },
      { name: "Dijkstra", href: "/visualizers/sorting", live: false },
      { name: "Topological Sort", href: "/visualizers/sorting", live: false },
    ],
  },
  {
    group: "Dynamic Programming",
    items: [{ name: "State transitions", href: "/visualizers/sorting", live: false }],
  },
];

export default function VisualizersPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="See it move"
        title="Interactive Visualizers"
        subtitle="Play, pause, step forward/back and control speed. Watching an algorithm execute beats reading it ten times."
      />
      <div className="space-y-8">
        {GROUPS.map((g) => (
          <section key={g.group}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
              {g.group}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <Link key={it.name} href={it.href}>
                  <Card className="group flex h-full items-center justify-between transition-all hover:border-brand/50">
                    <span className="font-medium">{it.name}</span>
                    {it.live ? (
                      <Badge className="border-easy/30 bg-easy/10 text-easy">Live</Badge>
                    ) : (
                      <Badge>Soon</Badge>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

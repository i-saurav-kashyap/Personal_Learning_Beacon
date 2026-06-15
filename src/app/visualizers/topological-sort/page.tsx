import Link from "next/link";
import type { Metadata } from "next";
import { TopologicalSortVisualizer } from "@/components/visualizers/TopologicalSortVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Topological Sort Visualizer" };

export default function TopologicalSortVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Graphs"
          title="Topological Sort Visualizer"
          subtitle="Watch Kahn's algorithm order a dependency graph: enqueue in-degree-0 nodes, process them, and peel away edges until every node is ordered."
        />
      </div>
      <TopologicalSortVisualizer />
    </div>
  );
}

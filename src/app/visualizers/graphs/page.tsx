import Link from "next/link";
import type { Metadata } from "next";
import { GraphVisualizer } from "@/components/visualizers/GraphVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Graph Traversal Visualizer" };

export default function GraphVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Graphs"
          title="Graph Traversal Visualizer"
          subtitle="Compare BFS and DFS from node A. Amber marks discovered nodes (the queue / next target), red is the node being processed, green is visited."
        />
      </div>
      <GraphVisualizer />
    </div>
  );
}

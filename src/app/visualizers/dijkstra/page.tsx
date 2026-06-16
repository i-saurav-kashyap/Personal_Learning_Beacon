import Link from "next/link";
import type { Metadata } from "next";
import { DijkstraVisualizer } from "@/components/visualizers/DijkstraVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Dijkstra Visualizer" };

export default function DijkstraVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Graphs"
          title="Dijkstra's Shortest Path"
          subtitle="Greedily settle the closest unvisited node, then relax its edges. Watch tentative distances shrink until every node holds its true shortest distance from A. Red = settling, amber = relaxed edge, green = finalized."
        />
      </div>
      <DijkstraVisualizer />
    </div>
  );
}

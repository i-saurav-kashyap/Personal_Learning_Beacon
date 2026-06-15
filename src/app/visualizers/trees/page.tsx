import Link from "next/link";
import type { Metadata } from "next";
import { TreeTraversalVisualizer } from "@/components/visualizers/TreeTraversalVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Tree Traversal Visualizer" };

export default function TreeTraversalVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Trees"
          title="Tree Traversal Visualizer"
          subtitle="Step through In-order, Pre-order, Post-order and Level-order (BFS) on a binary search tree. The amber node is the one being visited; green nodes are done."
        />
      </div>
      <TreeTraversalVisualizer />
    </div>
  );
}

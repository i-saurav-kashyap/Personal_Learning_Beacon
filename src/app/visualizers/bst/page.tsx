import Link from "next/link";
import type { Metadata } from "next";
import { BSTVisualizer } from "@/components/visualizers/BSTVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "BST Operations Visualizer" };

export default function BSTVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Trees"
          title="BST Operations Visualizer"
          subtitle="Watch a binary search tree grow as values are inserted, then search it. Amber = comparing, green = inserted/found."
        />
      </div>
      <BSTVisualizer />
    </div>
  );
}

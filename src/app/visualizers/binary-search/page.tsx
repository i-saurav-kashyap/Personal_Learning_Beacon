import Link from "next/link";
import type { Metadata } from "next";
import { BinarySearchVisualizer } from "@/components/visualizers/BinarySearchVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Binary Search Visualizer" };

export default function BinarySearchVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Searching"
          title="Binary Search Visualizer"
          subtitle="Watch the lo / mid / hi pointers halve the search space each step. Eliminated cells dim out; the target turns green when found."
        />
      </div>
      <BinarySearchVisualizer />
    </div>
  );
}

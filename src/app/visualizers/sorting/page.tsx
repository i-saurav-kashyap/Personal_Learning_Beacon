import Link from "next/link";
import type { Metadata } from "next";
import { SortingVisualizer } from "@/components/visualizers/SortingVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Sorting Visualizer" };

export default function SortingVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Sorting"
          title="Sorting Visualizer"
          subtitle="Compare five classic sorts. Yellow = comparing, red = swapping, green = locked in place."
        />
      </div>
      <SortingVisualizer />
    </div>
  );
}

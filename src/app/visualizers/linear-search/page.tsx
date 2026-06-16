import Link from "next/link";
import type { Metadata } from "next";
import { LinearSearchVisualizer } from "@/components/visualizers/LinearSearchVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Linear Search Visualizer" };

export default function LinearSearchVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Searching"
          title="Linear Search Visualizer"
          subtitle="The simplest search: walk the array one cell at a time until the target appears (or you run off the end). Yellow = scanning, green = found, dimmed = already checked."
        />
      </div>
      <LinearSearchVisualizer />
    </div>
  );
}

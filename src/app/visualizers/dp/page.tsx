import Link from "next/link";
import type { Metadata } from "next";
import { DPVisualizer } from "@/components/visualizers/DPVisualizer";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Dynamic Programming Visualizer" };

export default function DPVisualizerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/visualizers" className="text-sm text-muted hover:text-fg">
        ← All visualizers
      </Link>
      <div className="mt-3">
        <SectionHeading
          eyebrow="Dynamic Programming"
          title="DP Table Visualizer"
          subtitle="See a DP table fill in: each cell combines its smaller subproblems. Switch between Unique Paths (2-D) and Climbing Stairs (1-D)."
        />
      </div>
      <DPVisualizer />
    </div>
  );
}

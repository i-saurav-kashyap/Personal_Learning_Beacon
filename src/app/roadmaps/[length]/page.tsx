import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PLAN_LENGTHS } from "@/lib/data/roadmaps";
import { RoadmapView } from "./RoadmapView";
import type { PlanLength } from "@/lib/types";

export function generateStaticParams() {
  return PLAN_LENGTHS.map((l) => ({ length: String(l) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ length: string }>;
}): Promise<Metadata> {
  const { length } = await params;
  return { title: `${length}-Day Roadmap` };
}

export default async function RoadmapDetail({
  params,
}: {
  params: Promise<{ length: string }>;
}) {
  const { length } = await params;
  const n = Number(length) as PlanLength;
  if (!PLAN_LENGTHS.includes(n)) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <RoadmapView length={n} />
    </div>
  );
}

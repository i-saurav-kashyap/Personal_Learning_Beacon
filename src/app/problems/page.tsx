import type { Metadata } from "next";
import { ProblemList } from "@/components/problems/ProblemList";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Question Library" };

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <div>
      <SectionHeading
        eyebrow="Question library"
        title="Problems"
        subtitle="Every problem walks brute → better → optimal, with a dry run, complexity, interview tips, common mistakes, follow-ups, and solutions in Java, Python, JavaScript & Apex."
      />
      <ProblemList initialTopic={topic ?? "All"} />
    </div>
  );
}

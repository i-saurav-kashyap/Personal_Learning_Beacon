import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COURSE_STEPS, getCourseStep } from "@/lib/data/course";
import { CourseStepView } from "@/components/course/CourseStepView";

export function generateStaticParams() {
  return COURSE_STEPS.map((s) => ({ step: String(s.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: string }>;
}): Promise<Metadata> {
  const { step } = await params;
  const s = getCourseStep(Number(step));
  return { title: s ? `Step ${s.id}: ${s.name}` : "DSA Course" };
}

export default async function CourseStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const id = Number(step);
  if (!getCourseStep(id)) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <CourseStepView stepId={id} />
    </div>
  );
}

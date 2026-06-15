import type { Metadata } from "next";
import { CourseOverview } from "@/components/course/CourseOverview";
import { SectionHeading } from "@/components/ui/primitives";
import { COURSE_STEPS, COURSE_TOTAL } from "@/lib/data/course";

export const metadata: Metadata = { title: "Full DSA Course" };

export default function CoursePage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Zero → hero, step by step"
        title="Full DSA Course"
        subtitle={`A complete A-to-Z curriculum: ${COURSE_STEPS.length} steps and ${COURSE_TOTAL} problems from basics to advanced, following the renowned Striver A2Z structure. Check problems off as you go — links open full Beacon explanations where available.`}
      />
      <CourseOverview />
    </div>
  );
}

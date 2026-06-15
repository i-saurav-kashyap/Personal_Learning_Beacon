import Link from "next/link";
import type { Metadata } from "next";
import { COMPANIES } from "@/lib/data/companies";
import { Card, SectionHeading, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Company Wise Preparation" };

export default function CompaniesPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Target your prep"
        title="Company Wise Preparation"
        subtitle="Topic, pattern and difficulty breakdowns plus a recommended plan for each company — drawn from publicly reported community interview experiences and trends."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c) => (
          <Link key={c.slug} href={`/companies/${c.slug}`}>
            <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <Badge>{c.recommendedPlan}-day plan</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.blurb}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

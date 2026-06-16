import Link from "next/link";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Card } from "@/components/ui/primitives";
import { PATTERNS } from "@/lib/data/patterns";
import { PROBLEMS } from "@/lib/data/problems";
import { COMPANIES } from "@/lib/data/companies";

const PILLARS = [
  { icon: "🧭", title: "Pattern-Driven", body: "Learn the 20 patterns that unlock thousands of problems — recognition over rote." },
  { icon: "🎯", title: "Interview-Driven", body: "Every problem teaches how to explain, optimise, and dodge the interviewer's traps." },
  { icon: "🏢", title: "Company-Driven", body: "Topic, pattern & difficulty breakdowns from publicly reported interview trends." },
  { icon: "🔁", title: "Revision-Driven", body: "Spaced repetition (1·3·7·15·30 days) so nothing you learn slips away." },
];

const FEATURES = [
  { href: "/patterns", title: "Patterns", desc: "The core curriculum — recognise the shape of any problem." },
  { href: "/problems", title: "Question Library", desc: "Brute → better → optimal, with Java · Python · JS · Apex." },
  { href: "/visualizers", title: "Visualizers", desc: "Watch sorting, search, trees & graphs animate step by step." },
  { href: "/companies", title: "Company Wise", desc: "Targeted prep for Google, Amazon, Meta and more." },
  { href: "/crash-course", title: "Crash Course", desc: "Last-minute revision: top 25 / 50 / 100 with 2-minute summaries." },
  { href: "/dashboard", title: "Dashboard", desc: "Streaks, weak topics, accuracy and your revision schedule." },
];

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-2">
        <div className="animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-2 w-2 rounded-full bg-easy" /> Built for beginners → MAANG
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Don't just learn DSA.
            <br />
            <span className="text-brand">Crack the interview.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            A pattern-driven, interview-focused platform that teaches you to recognise
            patterns, optimise solutions, and explain them like a senior engineer sitting
            right beside you.
          </p>
          <div className="mt-7 flex flex-wrap gap-6 text-sm">
            <Stat n={`${PATTERNS.length}+`} label="Patterns" />
            <Stat n={`${PROBLEMS.length}+`} label="Curated problems" />
            <Stat n={`${COMPANIES.length}`} label="Companies" />
            <Stat n="4" label="Languages" />
          </div>
        </div>

        <div className="animate-fade-in">
          <p className="mb-3 text-sm font-semibold text-muted">
            🚀 Get a personalized roadmap in 30 seconds
          </p>
          <OnboardingFlow />
        </div>
      </section>

      {/* Philosophy pillars */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          Five pillars, one outcome — offers.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <Card key={p.title} className="hover:border-brand/40">
              <div className="mb-3 text-2xl">{p.icon}</div>
              <h3 className="mb-1.5 font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Everything you need, in one place</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{f.title}</h3>
                  <span className="text-muted transition-transform group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-fg">{n}</div>
      <div className="text-muted">{label}</div>
    </div>
  );
}

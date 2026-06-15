import type { Metadata } from "next";
import { Card, SectionHeading, Badge, Button } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Mock Interviews" };

const FEATURES = [
  { icon: "⏱️", title: "Realistic timer", body: "45-minute rounds that mirror the real onsite clock and pressure." },
  { icon: "💻", title: "In-browser editor", body: "Write and run code in Java, Python, JS or Apex without leaving the page." },
  { icon: "🤖", title: "AI interviewer", body: "Asks the problem, probes your approach, and pushes back like a real interviewer." },
  { icon: "💡", title: "Graduated hints", body: "Stuck? Get a nudge, not the answer — just like a good interviewer would." },
  { icon: "🔀", title: "Follow-up questions", body: "Solve it fast and the difficulty escalates with realistic follow-ups." },
  { icon: "📊", title: "Feedback report", body: "Scores on correctness, optimality, communication and time management." },
];

export default function MockInterviewsPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Train under pressure"
        title="Mock Interview System"
        subtitle="A realistic simulator: timed rounds, a coding editor, an AI interviewer that probes your thinking, and a structured feedback report."
      />
      <div className="mb-6 flex items-center gap-3">
        <Badge className="border-medium/30 bg-medium/10 text-medium">Preview</Badge>
        <span className="text-sm text-muted">
          The engine and editor land in the next milestone. Here's the experience you'll get.
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title}>
            <div className="mb-2 text-2xl">{f.icon}</div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{f.body}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-surface-2">
        <h2 className="mb-2 font-semibold">How a session will flow</h2>
        <ol className="ml-4 list-decimal space-y-1 text-sm text-muted">
          <li>Pick a focus (pattern, company, or random) and a difficulty band.</li>
          <li>The AI interviewer presents a problem and starts the clock.</li>
          <li>You think aloud and code; the interviewer reacts and offers hints.</li>
          <li>Follow-ups escalate as you progress.</li>
          <li>You receive a scored report with concrete next steps.</li>
        </ol>
        <div className="mt-4">
          <Button href="/crash-course" variant="secondary">
            Warm up with the crash course →
          </Button>
        </div>
      </Card>
    </div>
  );
}

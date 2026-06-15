import type { Metadata } from "next";
import { Card, SectionHeading, Badge, Button } from "@/components/ui/primitives";
import { TutorChat } from "@/components/ai/TutorChat";

export const metadata: Metadata = { title: "AI Tutor" };

const CAPS = [
  { icon: "🔎", title: "Explain code line by line", body: "Paste any solution and get a plain-English walkthrough of every line." },
  { icon: "📈", title: "Explain complexity", body: "Why is this O(n log n)? The tutor derives it from the structure of your code." },
  { icon: "💡", title: "Generate hints", body: "Get a hint calibrated to how stuck you are — never the full answer too soon." },
  { icon: "🧬", title: "Similar questions", body: "Ask for more problems on the same pattern at the right difficulty." },
  { icon: "🩹", title: "Explain your mistakes", body: "Submit a wrong attempt and learn exactly where the logic broke." },
  { icon: "🎤", title: "Conduct mock interviews", body: "Run a full timed mock with a conversational interviewer." },
];

export default function AiTutorPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="A senior engineer beside you"
        title="AI Tutor"
        subtitle="Built on the latest Claude models. The tutor explains, hints, generates practice, and diagnoses mistakes — patiently, in plain English."
      />
      <div className="mb-6 flex items-center gap-3">
        <Badge className="border-easy/30 bg-easy/10 text-easy">Live</Badge>
        <span className="text-sm text-muted">
          Streaming on the latest Claude models. Set <code>ANTHROPIC_API_KEY</code> to go fully
          live — without it the tutor explains how to connect.
        </span>
      </div>

      {/* Interactive tutor */}
      <div className="mb-10">
        <TutorChat />
      </div>

      <h2 className="mb-4 text-xl font-bold tracking-tight">What the tutor does</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPS.map((c) => (
          <Card key={c.title}>
            <div className="mb-2 text-2xl">{c.icon}</div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{c.body}</p>
          </Card>
        ))}
      </div>

      {/* Mock chat preview */}
      <Card className="mt-6">
        <h2 className="mb-3 font-semibold">A glimpse of a session</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-end">
            <p className="max-w-md rounded-2xl rounded-br-sm bg-brand px-4 py-2 text-brand-fg">
              Why is my Two Sum O(n²)?
            </p>
          </div>
          <div className="flex justify-start">
            <p className="max-w-md rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2">
              Because you have a loop inside a loop — for each element you re-scan the rest of the
              array. Swap the inner scan for a hash map that remembers what you've seen, and each
              lookup becomes O(1), bringing the whole thing down to O(n). Want me to show the diff?
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <Button href="/problems/two-sum" variant="secondary">
          Try a problem the tutor will teach →
        </Button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROBLEMS, getProblem } from "@/lib/data/problems";
import { useProgress } from "@/lib/store";
import { Card, Button, DifficultyBadge, Badge, ProgressBar } from "@/components/ui/primitives";
import { CodeEditor, starterFor } from "@/components/mock/CodeEditor";
import type { Language } from "@/lib/types";
import { cn } from "@/lib/cn";

type Phase = "config" | "live" | "report";
interface Turn {
  role: "interviewer" | "candidate";
  content: string;
}
interface MockReport {
  scores: {
    correctness: number;
    optimality: number;
    communication: number;
    codeQuality: number;
    timeManagement: number;
  };
  overall: number;
  strengths: string[];
  improvements: string[];
  verdict: string;
  source: "ai" | "heuristic";
}

const SCORE_LABELS: { key: keyof MockReport["scores"]; label: string }[] = [
  { key: "correctness", label: "Correctness" },
  { key: "optimality", label: "Optimality" },
  { key: "communication", label: "Communication" },
  { key: "codeQuality", label: "Code quality" },
  { key: "timeManagement", label: "Time management" },
];

function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MockInterview() {
  const [phase, setPhase] = useState<Phase>("config");
  const [problemSlug, setProblemSlug] = useState(PROBLEMS[0].slug);
  const [language, setLanguage] = useState<Language>("Python");

  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [code, setCode] = useState(starterFor("Python"));
  const [streaming, setStreaming] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [report, setReport] = useState<MockReport | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  const touchStreak = useProgress((s) => s.touchStreak);
  const problem = getProblem(problemSlug);

  // live timer
  useEffect(() => {
    if (phase !== "live") return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // autoscroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns]);

  async function streamChat(action: "start" | "reply" | "hint", history: Turn[]) {
    setStreaming(true);
    setTurns((t) => [...t, { role: "interviewer", content: "" }]);
    const messages = history
      .filter((t) => t.content.trim())
      .map((t) => ({ role: t.role === "interviewer" ? "assistant" : "user", content: t.content }));
    try {
      const res = await fetch("/api/mock/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ problemSlug, action, language, code, messages }),
      });
      const reader = res.body?.getReader();
      const dec = new TextDecoder();
      let acc = "";
      if (reader) {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setTurns((t) => {
            const copy = [...t];
            copy[copy.length - 1] = { role: "interviewer", content: acc };
            return copy;
          });
        }
      }
    } catch {
      setTurns((t) => {
        const copy = [...t];
        copy[copy.length - 1] = {
          role: "interviewer",
          content: "⚠️ Connection issue — please try again.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  function startInterview() {
    setPhase("live");
    startRef.current = Date.now();
    setElapsed(0);
    setCode(starterFor(language));
    setTurns([]);
    setReport(null);
    void streamChat("start", []);
    touchStreak();
  }

  function sendReply() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    const next = [...turns, { role: "candidate" as const, content: text }];
    setTurns(next);
    void streamChat("reply", next);
  }

  async function finish() {
    setLoadingReport(true);
    setPhase("report");
    try {
      const res = await fetch("/api/mock/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          problemSlug,
          transcript: turns.filter((t) => t.content.trim()),
          code,
          language,
          elapsedSeconds: elapsed,
        }),
      });
      setReport((await res.json()) as MockReport);
    } catch {
      setReport(null);
    } finally {
      setLoadingReport(false);
    }
  }

  // ----- CONFIG -----
  if (phase === "config") {
    return (
      <Card>
        <h2 className="text-lg font-bold">Start a mock interview</h2>
        <p className="mt-1 text-sm text-muted">
          A live AI interviewer presents a problem, probes your reasoning, offers graduated hints,
          and grades you at the end. No pressure timer — just a running clock.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Problem</span>
            <select
              value={problemSlug}
              onChange={(e) => setProblemSlug(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {PROBLEMS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title} ({p.difficulty})
                </option>
              ))}
            </select>
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-medium">Language</span>
            <div className="flex flex-wrap gap-1.5">
              {(["Python", "JavaScript", "Java", "Apex"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    language === l
                      ? "border-brand bg-brand/10 text-fg"
                      : "border-border text-muted hover:text-fg",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button onClick={startInterview}>Begin interview →</Button>
        </div>
      </Card>
    );
  }

  // ----- REPORT -----
  if (phase === "report") {
    return (
      <Card>
        {loadingReport || !report ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
            <p className="text-sm text-muted">Scoring your interview…</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Feedback report</h2>
                <p className="text-sm text-muted">
                  {problem?.title} · {mmss(elapsed)} ·{" "}
                  {report.source === "ai" ? (
                    <Badge className="border-easy/30 bg-easy/10 text-easy">AI-graded</Badge>
                  ) : (
                    <Badge className="border-medium/30 bg-medium/10 text-medium">Heuristic estimate</Badge>
                  )}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{report.overall}</div>
                <div className="text-xs text-muted">Overall</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {SCORE_LABELS.map(({ key, label }) => (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted">{report.scores[key]}</span>
                  </div>
                  <ProgressBar value={report.scores[key]} />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-easy">✓ Strengths</h3>
                <ul className="space-y-1.5 text-sm text-muted">
                  {report.strengths.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-medium">→ To improve</h3>
                <ul className="space-y-1.5 text-sm text-muted">
                  {report.improvements.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-surface-2 p-4 text-sm leading-relaxed">
              {report.verdict}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={() => setPhase("config")}>New interview</Button>
              {problem && (
                <Button href={`/problems/${problem.slug}`} variant="secondary">
                  Study the full solution →
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    );
  }

  // ----- LIVE -----
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold">{problem?.title}</span>
          {problem && <DifficultyBadge difficulty={problem.difficulty} />}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm tabular-nums text-muted">⏱ {mmss(elapsed)}</span>
          <button
            onClick={() => void streamChat("hint", turns)}
            disabled={streaming}
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-surface-2 disabled:opacity-40"
          >
            💡 Hint
          </button>
          <button
            onClick={finish}
            disabled={streaming}
            className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-brand-fg disabled:opacity-40"
          >
            Submit & finish
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Interviewer chat */}
        <div className="flex max-h-[560px] flex-col rounded-2xl border border-border bg-surface">
          <div className="border-b border-border px-4 py-2 text-sm font-semibold">Interviewer</div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" role="log" aria-live="polite">
            {turns.map((t, i) => (
              <div key={i} className={cn("flex", t.role === "candidate" ? "justify-end" : "justify-start")}>
                <p
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    t.role === "candidate"
                      ? "rounded-br-sm bg-brand text-brand-fg"
                      : "rounded-bl-sm bg-surface-2",
                  )}
                >
                  {t.content || (streaming ? "…" : "")}
                </p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t border-border p-2">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendReply();
                  }
                }}
                rows={2}
                placeholder="Think out loud — explain your approach…"
                className="flex-1 resize-none rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <button
                onClick={sendReply}
                disabled={streaming || !input.trim()}
                className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-fg disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <CodeEditor value={code} language={language} onChange={setCode} onLanguageChange={setLanguage} />
      </div>
    </div>
  );
}

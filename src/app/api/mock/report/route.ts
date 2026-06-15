import Anthropic from "@anthropic-ai/sdk";
import { getProblem } from "@/lib/data/problems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-6";

interface TranscriptMsg {
  role: "interviewer" | "candidate";
  content: string;
}

interface ReportRequest {
  problemSlug: string;
  transcript: TranscriptMsg[];
  code: string;
  language: string;
  elapsedSeconds: number;
}

export interface MockReport {
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

function clamp(n: number): number {
  if (typeof n !== "number" || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function average(s: MockReport["scores"]): number {
  const vals = Object.values(s);
  return clamp(vals.reduce((a, b) => a + b, 0) / vals.length);
}

// Heuristic scoring when no API key — transparent, never pretends to be the AI judge.
function heuristicReport(body: ReportRequest): MockReport {
  const code = (body.code ?? "").trim();
  const candidateTurns = (body.transcript ?? []).filter((m) => m.role === "candidate");
  const wordCount = candidateTurns.reduce((n, m) => n + m.content.split(/\s+/).length, 0);
  const mins = (body.elapsedSeconds ?? 0) / 60;

  const hasCode = code.length > 40;
  const mentionsComplexity = /o\(|complexity|time|space/i.test(
    candidateTurns.map((m) => m.content).join(" "),
  );

  const scores = {
    correctness: clamp(hasCode ? 70 : 30),
    optimality: clamp(mentionsComplexity ? 70 : 45),
    communication: clamp(40 + Math.min(40, wordCount / 3)),
    codeQuality: clamp(hasCode ? 60 : 25),
    timeManagement: clamp(mins === 0 ? 50 : mins < 35 ? 75 : 55),
  };

  return {
    scores,
    overall: average(scores),
    strengths: [
      hasCode ? "Produced a concrete code attempt." : "Engaged with the problem.",
      mentionsComplexity ? "Reasoned about complexity out loud." : "Stayed in the conversation.",
    ],
    improvements: [
      mentionsComplexity ? "Tighten the optimal approach and prove the bound." : "Always state time/space complexity explicitly.",
      "Talk through at least one edge case before coding.",
    ],
    verdict:
      "This is a transparent heuristic estimate. Set ANTHROPIC_API_KEY in .env.local for a real AI-graded report (correctness, optimality, communication, code quality and time management with specific feedback).",
    source: "heuristic",
  };
}

function extractJson(text: string): unknown {
  // Tolerate code fences / prose around the JSON object.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("no JSON object found");
  return JSON.parse(raw.slice(start, end + 1));
}

export async function POST(req: Request) {
  let body: ReportRequest;
  try {
    body = (await req.json()) as ReportRequest;
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return Response.json(heuristicReport(body));
  }

  const p = getProblem(body.problemSlug);
  const optimal = p?.approaches.find((a) => a.tier === "Optimal");
  const transcriptText = (body.transcript ?? [])
    .map((m) => `${m.role === "interviewer" ? "Interviewer" : "Candidate"}: ${m.content}`)
    .join("\n");

  const system = `You are a rigorous but fair interview evaluator. Grade the candidate's mock coding interview and return ONLY a JSON object (no prose, no code fences) with this exact shape:
{
  "scores": { "correctness": 0-100, "optimality": 0-100, "communication": 0-100, "codeQuality": 0-100, "timeManagement": 0-100 },
  "strengths": ["short bullet", "short bullet"],
  "improvements": ["specific, actionable bullet", "specific, actionable bullet"],
  "verdict": "2-3 sentence overall assessment as if briefing a hiring committee"
}
Be specific and reference what the candidate actually said/wrote. Do not be inflated; reserve 85+ for genuinely strong performances.`;

  const userMsg = `Problem: ${p?.title ?? body.problemSlug} (${p?.difficulty ?? "?"})
Known optimal: ${optimal ? `${optimal.title}, Time ${optimal.time}, Space ${optimal.space}` : "n/a"}
Time taken: ${Math.round((body.elapsedSeconds ?? 0) / 60)} min
Language: ${body.language}

Candidate's final code:
\`\`\`
${(body.code ?? "").slice(0, 6000)}
\`\`\`

Interview transcript:
${transcriptText.slice(0, 8000)}`;

  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system,
      messages: [{ role: "user", content: userMsg }],
    });
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    const parsed = extractJson(text) as Partial<MockReport> & { scores?: MockReport["scores"] };
    const scores = {
      correctness: clamp(parsed.scores?.correctness ?? 0),
      optimality: clamp(parsed.scores?.optimality ?? 0),
      communication: clamp(parsed.scores?.communication ?? 0),
      codeQuality: clamp(parsed.scores?.codeQuality ?? 0),
      timeManagement: clamp(parsed.scores?.timeManagement ?? 0),
    };
    const report: MockReport = {
      scores,
      overall: average(scores),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 5) : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 5) : [],
      verdict: typeof parsed.verdict === "string" ? parsed.verdict : "Evaluation complete.",
      source: "ai",
    };
    return Response.json(report);
  } catch {
    // On any model/parse failure, fall back to the transparent heuristic.
    return Response.json(heuristicReport(body));
  }
}

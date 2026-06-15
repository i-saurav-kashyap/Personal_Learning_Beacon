import Anthropic from "@anthropic-ai/sdk";
import { getProblem } from "@/lib/data/problems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-haiku-4-5-20251001";

type ChatRole = "user" | "assistant";
interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface MockChatRequest {
  problemSlug: string;
  messages: ChatMessage[];
  action: "start" | "reply" | "hint";
  language?: string;
  code?: string;
}

const BASE_SYSTEM = `You are a senior software engineer conducting a live coding interview on the Beacon platform. You are professional, warm but rigorous — like a real FAANG interviewer.

Rules of conduct:
- NEVER reveal the optimal solution or write the answer for the candidate. You may know it, but your job is to evaluate THEM.
- Keep every message short (2-4 sentences). This is a live conversation, not a lecture.
- Probe their reasoning: ask about complexity, edge cases, and why they chose an approach.
- React to what they actually said or wrote. If they're on track, acknowledge and push further (a follow-up or a harder constraint). If they're stuck, ask a guiding question — don't give the answer.
- Stay in character as the interviewer at all times. No markdown headers; plain conversational text.`;

function buildSystem(action: string, problemSlug: string, language?: string, code?: string): string {
  let s = BASE_SYSTEM;
  const p = getProblem(problemSlug);
  if (p) {
    const optimal = p.approaches.find((a) => a.tier === "Optimal") ?? p.approaches[p.approaches.length - 1];
    s += `

THE PROBLEM (for your reference only — present it in your own words, don't paste it):
Title: ${p.title} (${p.difficulty})
Statement: ${p.statement}
Patterns it trains: ${p.patterns.join(", ")}`;
    if (optimal) {
      s += `
Known optimal: ${optimal.title} — Time ${optimal.time}, Space ${optimal.space}. (Use this only to judge the candidate; never reveal it.)`;
    }
  }
  if (action === "start") {
    s += `

ACTION = START: Greet the candidate by name-free welcome in ONE sentence, present the problem in your own words and give a concrete example input/output, then ask how they'd approach it. Do not hint at the solution.`;
  } else if (action === "hint") {
    s += `

ACTION = HINT: The candidate asked for a hint. Give the SMALLEST possible nudge — the key observation or which direction to think, never the full approach. One or two sentences.`;
  } else {
    s += `

ACTION = REPLY: Respond to the candidate's latest message. Acknowledge what's right, probe what's missing (complexity? edge cases? a cleaner approach?). If they've essentially solved it, raise a realistic follow-up.`;
  }
  if (code && code.trim()) {
    s += `

The candidate's current editor contents (${language ?? "code"}):
\`\`\`
${code.slice(0, 4000)}
\`\`\``;
  }
  return s;
}

function streamText(text: string, status = 200): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// Scripted interviewer used when no API key is configured, so the flow is demoable.
function fallback(action: string, problemSlug: string): string {
  const p = getProblem(problemSlug);
  const title = p?.title ?? "this problem";
  if (action === "start") {
    return `Welcome — let's begin. Today's question: **${title}**. ${p?.statement ?? ""}

(Demo interviewer — set \`ANTHROPIC_API_KEY\` in \`.env.local\` for a fully adaptive AI interviewer.)

Take a moment, then tell me: how would you approach this, and what's your first instinct on the time complexity?`;
  }
  if (action === "hint") {
    const pat = p?.patterns?.[0];
    return `Here's a small nudge: think about which *pattern* fits — ${
      pat ? `this one rewards the **${pat}** pattern` : "look for repeated work you can avoid"
    }. What data structure would let you avoid re-scanning? (Demo hint — connect an API key for adaptive hints.)`;
  }
  return `Good — keep going. Can you state the time and space complexity of that approach, and walk me through one tricky edge case? (Demo interviewer — set ANTHROPIC_API_KEY for adaptive follow-ups.)`;
}

export async function POST(req: Request) {
  let body: MockChatRequest;
  try {
    body = (await req.json()) as MockChatRequest;
  } catch {
    return streamText("⚠️ Could not read the request.", 400);
  }

  const action = body.action ?? "reply";
  const messages = Array.isArray(body.messages) ? body.messages : [];

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return streamText(fallback(action, body.problemSlug));
  }

  const system = buildSystem(action, body.problemSlug, body.language, body.code);
  const apiMessages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content }));
  // The API requires a non-empty messages array; seed the opener for "start".
  if (apiMessages.length === 0) {
    apiMessages.push({ role: "user", content: "I'm ready to start the interview." });
  }

  try {
    const client = new Anthropic({ apiKey });
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          const ms = client.messages.stream({ model: MODEL, max_tokens: 600, system, messages: apiMessages });
          ms.on("text", (delta: string) => controller.enqueue(encoder.encode(delta)));
          await ms.finalMessage();
          controller.close();
        } catch (err) {
          const msg = err instanceof Error ? err.message : "unexpected error";
          controller.enqueue(encoder.encode(`\n\n⚠️ Interviewer hit a snag (${msg}).`));
          controller.close();
        }
      },
    });
    return new Response(stream, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unexpected error";
    return streamText(`⚠️ Could not start the interviewer (${msg}).`);
  }
}

import Anthropic from "@anthropic-ai/sdk";
import { getProblem } from "@/lib/data/problems";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fast model for hints / quick explanations; deep model for line-by-line walkthroughs.
const FAST_MODEL = "claude-haiku-4-5-20251001";
const DEEP_MODEL = "claude-opus-4-8";

type ChatRole = "user" | "assistant";
interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface TutorRequest {
  messages: ChatMessage[];
  mode?: string;
  problemSlug?: string;
}

const BASE_SYSTEM = `You are the Beacon AI Tutor — a patient, encouraging senior software engineer who teaches Data Structures & Algorithms for coding interviews.

How you teach:
- Plain English first. Avoid jargon; when you must use a term, define it in one short phrase.
- Be interview-focused: connect every idea to how it shows up in real interviews (patterns, trade-offs, what the interviewer is really probing for).
- Use small concrete examples and analogies. Keep answers tight — a few short paragraphs or a compact list, not an essay.
- Use Markdown sparingly: short code blocks with language fences when showing code, bold for key terms.
- Be warm and motivating, like a mentor sitting beside the learner.`;

const HINT_RULES = `
HINT MODE — graduated help, this is critical:
- NEVER dump the full solution first. Start with the smallest nudge that unblocks the learner (the key observation or which pattern to consider).
- Ask if they'd like a bigger hint before revealing more.
- Only give complete code if the learner explicitly asks for the full answer.`;

const LINE_BY_LINE_RULES = `
EXPLAIN-LINE-BY-LINE MODE:
- Walk through the code one logical step at a time, explaining WHY each line exists, not just what it does.
- Call out the invariant the code maintains and where the complexity comes from.`;

function buildSystemPrompt(mode?: string, problemSlug?: string): string {
  let prompt = BASE_SYSTEM;

  if (mode === "hint") prompt += "\n" + HINT_RULES;
  if (mode === "line-by-line" || mode === "explain") prompt += "\n" + LINE_BY_LINE_RULES;

  if (problemSlug) {
    const p = getProblem(problemSlug);
    if (p) {
      const optimal =
        p.approaches.find((a) => a.tier === "Optimal") ?? p.approaches[p.approaches.length - 1];
      prompt += `

GROUNDING CONTEXT — the learner is working on this problem:
Title: ${p.title} (${p.difficulty})
Statement: ${p.statement}
Patterns: ${p.patterns.join(", ")}`;
      if (optimal) {
        prompt += `
Optimal approach: ${optimal.title} — ${optimal.idea} (Time ${optimal.time}, Space ${optimal.space})`;
      }
      prompt += `
Use this context to keep your guidance accurate, but follow the teaching rules above (especially graduated hints).`;
    }
  }

  return prompt;
}

/** Stream a plain-text string as a one-shot ReadableStream response. */
function streamText(text: string, status = 200): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

const NO_KEY_MESSAGE = `👋 The AI Tutor isn't connected yet.

To bring me to life, set an \`ANTHROPIC_API_KEY\` in a \`.env.local\` file at the project root, then restart the dev server:

\`\`\`
ANTHROPIC_API_KEY=sk-ant-...
\`\`\`

Everything else on Beacon — patterns, the full question library, visualizers, roadmaps and spaced repetition — works right now without any key. Once the key is set, ask me to explain a problem, drop a hint, or walk through any solution line by line!`;

export async function POST(req: Request) {
  let body: TutorRequest;
  try {
    body = (await req.json()) as TutorRequest;
  } catch {
    return streamText("⚠️ I couldn't read that request. Please try sending your message again.", 400);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return streamText("Ask me anything about DSA — a problem, a pattern, or why a solution has its complexity.");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    // Graceful fallback so the feature is demoable with no key configured.
    return streamText(NO_KEY_MESSAGE);
  }

  const system = buildSystemPrompt(body.mode, body.problemSlug);
  const model = body.mode === "line-by-line" ? DEEP_MODEL : FAST_MODEL;

  // Sanitise messages to the roles the API accepts.
  const apiMessages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content }));

  try {
    const client = new Anthropic({ apiKey });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          const messageStream = client.messages.stream({
            model,
            max_tokens: 1024,
            system,
            messages: apiMessages,
          });

          messageStream.on("text", (delta: string) => {
            controller.enqueue(encoder.encode(delta));
          });

          await messageStream.finalMessage();
          controller.close();
        } catch (err) {
          const msg =
            err instanceof Error ? err.message : "an unexpected error occurred";
          controller.enqueue(
            encoder.encode(
              `\n\n⚠️ The tutor hit a snag talking to the model (${msg}). Please check the API key and try again.`,
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "an unexpected error occurred";
    return streamText(
      `⚠️ The tutor couldn't start (${msg}). Make sure ANTHROPIC_API_KEY is valid, then try again.`,
    );
  }
}

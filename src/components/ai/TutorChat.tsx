"use client";

import { useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { label: "Explain Two Sum", text: "Explain the Two Sum problem and the key insight.", slug: "two-sum" },
  { label: "Hint for 3Sum", text: "I'm stuck on 3Sum. Give me a small hint.", slug: "three-sum", mode: "hint" },
  { label: "Why O(n log n)?", text: "Why is merge sort O(n log n)? Explain it simply." },
];

const WELCOME =
  "Hi! I'm your Beacon tutor 👋 Ask me to explain a problem, drop a graduated hint when you're stuck, or walk through any solution line by line. What are we working on?";

export function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  async function send(text: string, opts?: { mode?: string; problemSlug?: string }) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);
    // Placeholder assistant message we'll stream into.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    scrollToBottom();

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send the conversation excluding the local welcome message.
          messages: nextMessages.filter((_, i) => i !== 0 || nextMessages[0].role === "user"),
          mode: opts?.mode,
          problemSlug: opts?.problemSlug,
        }),
      });

      if (!res.body) {
        throw new Error("No response stream");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
        scrollToBottom();
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "⚠️ Something went wrong reaching the tutor. Please try again in a moment.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
      scrollToBottom();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-sm">
      {/* Message list */}
      <div
        ref={listRef}
        className="max-h-[460px] min-h-[280px] space-y-3 overflow-y-auto p-4 text-sm"
        role="log"
        aria-live="polite"
        aria-label="AI tutor conversation"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-md whitespace-pre-wrap rounded-2xl px-4 py-2 leading-relaxed",
                m.role === "user"
                  ? "rounded-br-sm bg-brand text-brand-fg"
                  : "rounded-bl-sm bg-surface-2 text-fg",
              )}
            >
              {m.content || (streaming && i === messages.length - 1 ? "…" : "")}
            </div>
          </div>
        ))}
      </div>

      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2 border-t border-border px-4 pt-3">
        {QUICK_PROMPTS.map((q) => (
          <button
            key={q.label}
            type="button"
            disabled={streaming}
            onClick={() => void send(q.text, { mode: q.mode, problemSlug: q.slug })}
            className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted transition-colors hover:text-fg disabled:opacity-50"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Composer */}
      <form onSubmit={onSubmit} className="flex items-end gap-2 p-4">
        <label htmlFor="tutor-input" className="sr-only">
          Ask the AI tutor
        </label>
        <textarea
          id="tutor-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={1}
          placeholder="Ask anything — e.g. “Hint for Longest Substring” (Enter to send, Shift+Enter for newline)"
          className="max-h-32 min-h-[42px] flex-1 resize-none rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm outline-none transition-colors focus:border-brand"
          disabled={streaming}
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="inline-flex h-[42px] items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-brand-fg transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {streaming ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}

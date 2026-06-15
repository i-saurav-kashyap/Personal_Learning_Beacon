"use client";

import { useState } from "react";
import type { CodeSolution, Language } from "@/lib/types";
import { cn } from "@/lib/cn";

export function CodeTabs({ solutions }: { solutions: CodeSolution[] }) {
  const languages = Array.from(new Set(solutions.map((s) => s.language)));
  const [lang, setLang] = useState<Language>(languages[0]);
  const [copied, setCopied] = useState(false);
  const active = solutions.find((s) => s.language === lang) ?? solutions[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-2">
        <div className="flex">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                lang === l
                  ? "border-brand text-fg"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted hover:bg-surface hover:text-fg"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-surface p-4 text-sm leading-relaxed">
        <code className="font-mono">{active.code}</code>
      </pre>
    </div>
  );
}

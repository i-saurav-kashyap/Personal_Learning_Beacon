"use client";

import { useMemo, useRef } from "react";
import type { Language } from "@/lib/types";
import { cn } from "@/lib/cn";

const LANGS: Language[] = ["Java", "Python", "JavaScript", "Apex"];

const STARTERS: Record<Language, string> = {
  Python: "def solve(nums):\n    # your code here\n    pass\n",
  JavaScript: "function solve(nums) {\n  // your code here\n}\n",
  Java: "class Solution {\n    // your code here\n}\n",
  Apex: "public class Solution {\n    // your code here\n}\n",
};

export function starterFor(lang: Language): string {
  return STARTERS[lang];
}

export function CodeEditor({
  value,
  language,
  onChange,
  onLanguageChange,
}: {
  value: string;
  language: Language;
  onChange: (v: string) => void;
  onLanguageChange: (l: Language) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const lineCount = useMemo(() => Math.max(value.split("\n").length, 1), [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.slice(0, start) + "    " + value.slice(end);
      onChange(next);
      // restore caret after the inserted spaces
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-2 py-1.5">
        <div className="flex gap-1">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => onLanguageChange(l)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                language === l ? "bg-brand text-brand-fg" : "text-muted hover:text-fg",
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <span className="pr-1 text-[11px] text-muted">{lineCount} lines · Tab = indent</span>
      </div>
      <div className="flex max-h-[420px] min-h-[260px] overflow-auto">
        <div
          aria-hidden
          className="select-none border-r border-border bg-surface-2 px-3 py-3 text-right font-mono text-xs leading-6 text-muted"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Code editor"
          className="w-full resize-none bg-surface px-3 py-3 font-mono text-sm leading-6 text-fg outline-none"
          placeholder="Write your solution here…"
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/store";

export function NotesEditor({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  const [val, setVal] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) setVal(notes[slug] ?? "");
  }, [mounted, notes, slug]);

  if (!mounted) return null;

  return (
    <textarea
      value={val}
      onChange={(e) => {
        setVal(e.target.value);
        setNote(slug, e.target.value);
      }}
      placeholder="Your revision notes — the one-liner that makes this click for you. Saved automatically."
      rows={4}
      className="w-full rounded-2xl border border-border bg-surface p-4 text-sm outline-none focus:border-brand"
    />
  );
}

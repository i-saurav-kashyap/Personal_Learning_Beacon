"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Frame {
  idx: number; // currently scanned index, -1 when none
  found: boolean;
  note: string;
}

const ARRAY = [17, 4, 23, 8, 42, 15, 31, 6, 99, 11, 27, 50];
// Mix of present values and one absent (100) to show the "not found" path.
const TARGETS = [42, 17, 50, 6, 100];

function genFrames(arr: number[], target: number): Frame[] {
  const frames: Frame[] = [
    { idx: -1, found: false, note: `Scan left → right for ${target}` },
  ];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      frames.push({ idx: i, found: true, note: `Found ${target} at index ${i} ✓` });
      return frames;
    }
    frames.push({ idx: i, found: false, note: `Index ${i} holds ${arr[i]} — not ${target}, keep going` });
  }
  frames.push({ idx: -1, found: false, note: `Reached the end — ${target} is not in the array` });
  return frames;
}

export function LinearSearchVisualizer() {
  const [targetIdx, setTargetIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const target = TARGETS[targetIdx];
  const frames = useMemo(() => genFrames(ARRAY, target), [target]);
  const frame = frames[Math.min(step, frames.length - 1)];

  useEffect(() => {
    if (!playing) return;
    if (step >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setStep((s) => s + 1), 700 / speed);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, step, frames.length, speed]);

  function reset(nextTarget?: number) {
    setPlaying(false);
    setStep(0);
    if (nextTarget !== undefined) setTargetIdx(nextTarget);
  }

  function cycle() {
    reset((targetIdx + 1) % TARGETS.length);
  }

  const cellClass = (i: number) => {
    if (frame.found && i === frame.idx) return "border-easy bg-easy/20 text-easy";
    if (i === frame.idx) return "border-medium bg-medium/20 text-fg ring-2 ring-medium/40";
    if (frame.idx === -1 || i < frame.idx) return "border-border bg-surface-2 text-muted opacity-50";
    return "border-brand/40 bg-brand/10 text-fg";
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      {/* Target selector */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-sm text-muted">Target:</span>
        {TARGETS.map((t, i) => (
          <button
            key={t}
            onClick={() => reset(i)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium tabular-nums transition-colors",
              targetIdx === i
                ? "border-brand bg-brand/10 text-fg"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {t}
            {!ARRAY.includes(t) ? " (absent)" : ""}
          </button>
        ))}
      </div>

      {/* Cells */}
      <div className="flex items-end justify-center gap-1.5 rounded-xl bg-surface-2 p-4">
        {ARRAY.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-4 flex-col items-center justify-end text-[9px] font-semibold uppercase text-medium">
              {i === frame.idx ? "scan" : ""}
            </div>
            <div
              className={cn(
                "flex h-12 w-full items-center justify-center rounded-lg border text-sm font-semibold tabular-nums transition-all duration-200",
                cellClass(i),
              )}
            >
              {v}
            </div>
            <span className="text-[10px] tabular-nums text-muted">{i}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} · O(n)
        </span>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2"
        >
          ⏮ Step back
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-fg"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => setStep((s) => Math.min(frames.length - 1, s + 1))}
          className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2"
        >
          Step forward ⏭
        </button>
        <button
          onClick={() => reset()}
          className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2"
        >
          ↺ Reset
        </button>
        <button
          onClick={cycle}
          className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2"
        >
          🎲 New target
        </button>
        <div className="ml-auto flex items-center gap-1">
          <span className="text-xs text-muted">Speed</span>
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium",
                speed === s ? "bg-brand text-brand-fg" : "text-muted hover:text-fg",
              )}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
        <Legend color="bg-brand" label="Unchecked" />
        <Legend color="bg-medium" label="Scanning" />
        <Legend color="bg-easy" label="Found" />
        <Legend color="bg-surface-2 border border-border" label="Checked (passed)" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded", color)} /> {label}
    </span>
  );
}

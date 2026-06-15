"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Frame {
  array: number[];
  compare: number[]; // indices being compared
  swap: number[]; // indices being swapped
  sorted: number[]; // indices locked in place
  note: string;
}

type Algo = "bubble" | "selection" | "insertion" | "merge" | "quick";

const ALGOS: { id: Algo; name: string; complexity: string }[] = [
  { id: "bubble", name: "Bubble Sort", complexity: "O(n²)" },
  { id: "selection", name: "Selection Sort", complexity: "O(n²)" },
  { id: "insertion", name: "Insertion Sort", complexity: "O(n²)" },
  { id: "merge", name: "Merge Sort", complexity: "O(n log n)" },
  { id: "quick", name: "Quick Sort", complexity: "O(n log n) avg" },
];

function snapshot(
  array: number[],
  partial: Partial<Frame>,
): Frame {
  return {
    array: [...array],
    compare: [],
    swap: [],
    sorted: [],
    note: "",
    ...partial,
  };
}

function bubble(a: number[]): Frame[] {
  const arr = [...a];
  const frames: Frame[] = [snapshot(arr, { note: "Start" })];
  const sorted: number[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      frames.push(snapshot(arr, { compare: [j, j + 1], sorted: [...sorted], note: `Compare ${arr[j]} & ${arr[j + 1]}` }));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        frames.push(snapshot(arr, { swap: [j, j + 1], sorted: [...sorted], note: "Swap — out of order" }));
      }
    }
    sorted.unshift(arr.length - 1 - i);
  }
  sorted.unshift(0);
  frames.push(snapshot(arr, { sorted: arr.map((_, i) => i), note: "Sorted ✓" }));
  return frames;
}

function selection(a: number[]): Frame[] {
  const arr = [...a];
  const frames: Frame[] = [snapshot(arr, { note: "Start" })];
  const sorted: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      frames.push(snapshot(arr, { compare: [min, j], sorted: [...sorted], note: `Seek min in unsorted part` }));
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      frames.push(snapshot(arr, { swap: [i, min], sorted: [...sorted], note: "Move min to front" }));
    }
    sorted.push(i);
  }
  frames.push(snapshot(arr, { sorted: arr.map((_, i) => i), note: "Sorted ✓" }));
  return frames;
}

function insertion(a: number[]): Frame[] {
  const arr = [...a];
  const frames: Frame[] = [snapshot(arr, { note: "Start" })];
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      frames.push(snapshot(arr, { compare: [j - 1, j], note: `Shift ${arr[j]} left` }));
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      frames.push(snapshot(arr, { swap: [j - 1, j], note: "Insert into place" }));
      j--;
    }
  }
  frames.push(snapshot(arr, { sorted: arr.map((_, i) => i), note: "Sorted ✓" }));
  return frames;
}

function merge(a: number[]): Frame[] {
  const arr = [...a];
  const frames: Frame[] = [snapshot(arr, { note: "Start" })];
  function ms(lo: number, hi: number) {
    if (hi - lo <= 1) return;
    const mid = (lo + hi) >> 1;
    ms(lo, mid);
    ms(mid, hi);
    const merged: number[] = [];
    let i = lo,
      j = mid;
    while (i < mid && j < hi) {
      frames.push(snapshot(arr, { compare: [i, j], note: `Merge halves [${lo}, ${hi})` }));
      if (arr[i] <= arr[j]) merged.push(arr[i++]);
      else merged.push(arr[j++]);
    }
    while (i < mid) merged.push(arr[i++]);
    while (j < hi) merged.push(arr[j++]);
    for (let k = 0; k < merged.length; k++) arr[lo + k] = merged[k];
    frames.push(snapshot(arr, { swap: merged.map((_, k) => lo + k), note: "Write merged run" }));
  }
  ms(0, arr.length);
  frames.push(snapshot(arr, { sorted: arr.map((_, i) => i), note: "Sorted ✓" }));
  return frames;
}

function quick(a: number[]): Frame[] {
  const arr = [...a];
  const frames: Frame[] = [snapshot(arr, { note: "Start" })];
  const sorted: number[] = [];
  function qs(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) sorted.push(lo);
      return;
    }
    const pivot = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      frames.push(snapshot(arr, { compare: [j, hi], sorted: [...sorted], note: `Pivot ${pivot}` }));
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        frames.push(snapshot(arr, { swap: [i, j], sorted: [...sorted], note: "Swap toward pivot" }));
        i++;
      }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    frames.push(snapshot(arr, { swap: [i, hi], sorted: [...sorted], note: "Place pivot" }));
    sorted.push(i);
    qs(lo, i - 1);
    qs(i + 1, hi);
  }
  qs(0, arr.length - 1);
  frames.push(snapshot(arr, { sorted: arr.map((_, i) => i), note: "Sorted ✓" }));
  return frames;
}

const GENERATORS: Record<Algo, (a: number[]) => Frame[]> = {
  bubble,
  selection,
  insertion,
  merge,
  quick,
};

const INITIAL = [42, 13, 67, 8, 55, 30, 21, 90, 4, 73];

export function SortingVisualizer() {
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [data, setData] = useState<number[]>(INITIAL);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5, 1, 2, 4
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useMemo(() => GENERATORS[algo](data), [algo, data]);
  const frame = frames[Math.min(step, frames.length - 1)];
  const maxVal = Math.max(...frame.array);

  useEffect(() => {
    if (!playing) return;
    if (step >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setStep((s) => s + 1), 600 / speed);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, step, frames.length, speed]);

  function reset(newData?: number[]) {
    setPlaying(false);
    setStep(0);
    if (newData) setData(newData);
  }

  function shuffle() {
    const arr = Array.from({ length: 10 }, (_, i) => (i * 9 + 7) % 97);
    // deterministic-ish shuffle so SSR/CSR agree isn't a concern (client only)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    reset(arr.map((x) => x + 4));
  }

  const colorFor = (i: number) => {
    // ring + scale make the active comparison/swap unmistakable while playing.
    if (frame.swap.includes(i)) return "bg-hard ring-2 ring-hard scale-y-105";
    if (frame.compare.includes(i)) return "bg-medium ring-2 ring-medium scale-y-105";
    if (frame.sorted.includes(i)) return "bg-easy";
    return "bg-brand";
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex flex-wrap gap-1.5">
        {ALGOS.map((a) => (
          <button
            key={a.id}
            onClick={() => {
              setAlgo(a.id);
              reset();
            }}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              algo === a.id
                ? "border-brand bg-brand/10 text-fg"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Bars */}
      <div className="flex h-64 items-end justify-center gap-1.5 rounded-xl bg-surface-2 p-4">
        {frame.array.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div
              className={cn("w-full rounded-t-md transition-all duration-200", colorFor(i))}
              style={{ height: `${(v / maxVal) * 100}%` }}
            />
            <span className="text-[10px] tabular-nums text-muted">{v}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} ·{" "}
          {ALGOS.find((a) => a.id === algo)?.complexity}
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
          onClick={shuffle}
          className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2"
        >
          🎲 Shuffle
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
        <Legend color="bg-brand" label="Unsorted" />
        <Legend color="bg-medium" label="Comparing" />
        <Legend color="bg-hard" label="Swapping" />
        <Legend color="bg-easy" label="Sorted" />
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

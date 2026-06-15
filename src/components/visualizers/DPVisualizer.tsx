"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Mode = "paths" | "stairs";

const MODES: { id: Mode; name: string; complexity: string }[] = [
  { id: "paths", name: "Unique Paths (2-D)", complexity: "O(m·n)" },
  { id: "stairs", name: "Climbing Stairs (1-D)", complexity: "O(n)" },
];

interface Frame {
  grid: number[][]; // -1 = not yet computed
  current: [number, number] | null;
  sources: [number, number][];
  note: string;
}

const PATHS_ROWS = 3;
const PATHS_COLS = 4;
const STAIRS_N = 8;

const sameCell = (a: [number, number], b: [number, number] | null) => !!b && a[0] === b[0] && a[1] === b[1];
const inList = (a: [number, number], list: [number, number][]) => list.some((c) => c[0] === a[0] && c[1] === a[1]);

function genPaths(): Frame[] {
  const rows = PATHS_ROWS;
  const cols = PATHS_COLS;
  const grid: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(-1));
  const frames: Frame[] = [{ grid: grid.map((r) => [...r]), current: null, sources: [], note: "Each cell = number of ways to reach it from the top-left, moving only right or down." }];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let sources: [number, number][] = [];
      let note: string;
      if (i === 0 || j === 0) {
        grid[i][j] = 1;
        note = `Edge cell (${i},${j}) → only one straight path → 1`;
      } else {
        sources = [
          [i - 1, j],
          [i, j - 1],
        ];
        grid[i][j] = grid[i - 1][j] + grid[i][j - 1];
        note = `dp[${i}][${j}] = top + left = ${grid[i - 1][j]} + ${grid[i][j - 1]} = ${grid[i][j]}`;
      }
      frames.push({ grid: grid.map((r) => [...r]), current: [i, j], sources, note });
    }
  }
  frames.push({ grid: grid.map((r) => [...r]), current: null, sources: [], note: `Answer = bottom-right = ${grid[rows - 1][cols - 1]} unique paths ✓` });
  return frames;
}

function genStairs(): Frame[] {
  const n = STAIRS_N;
  const row = new Array(n + 1).fill(-1);
  const grid = () => [[...row]];
  const frames: Frame[] = [{ grid: grid(), current: null, sources: [], note: `Ways to climb to step i = ways to i-1 (one step) + ways to i-2 (two steps).` }];
  for (let i = 0; i <= n; i++) {
    let sources: [number, number][] = [];
    let note: string;
    if (i <= 1) {
      row[i] = 1;
      note = `Base case: dp[${i}] = 1`;
    } else {
      sources = [
        [0, i - 1],
        [0, i - 2],
      ];
      row[i] = row[i - 1] + row[i - 2];
      note = `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${row[i - 1]} + ${row[i - 2]} = ${row[i]}`;
    }
    frames.push({ grid: grid(), current: [0, i], sources, note });
  }
  frames.push({ grid: grid(), current: null, sources: [], note: `Answer = dp[${n}] = ${row[n]} ways to climb ${n} stairs ✓` });
  return frames;
}

export function DPVisualizer() {
  const [mode, setMode] = useState<Mode>("paths");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useMemo(() => (mode === "paths" ? genPaths() : genStairs()), [mode]);
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

  function reset(next?: Mode) {
    setPlaying(false);
    setStep(0);
    if (next) setMode(next);
  }

  const cellClass = (i: number, j: number) => {
    const v = frame.grid[i][j];
    const cell: [number, number] = [i, j];
    if (sameCell(cell, frame.current)) return "bg-medium text-fg ring-2 ring-medium";
    if (inList(cell, frame.sources)) return "bg-brand/30 text-fg ring-2 ring-brand";
    if (v >= 0) return "bg-easy/20 text-fg";
    return "bg-surface-2 text-muted";
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex flex-wrap gap-1.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => reset(m.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              mode === m.id ? "border-brand bg-brand/10 text-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* DP table */}
      <div className="flex justify-center rounded-xl bg-surface-2 p-4">
        <div className="flex flex-col gap-1.5">
          {frame.grid.map((rowArr, i) => (
            <div key={i} className="flex gap-1.5">
              {rowArr.map((v, j) => (
                <div
                  key={j}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg border border-border text-sm font-semibold tabular-nums transition-all duration-200",
                    cellClass(i, j),
                  )}
                >
                  {v >= 0 ? v : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} · {MODES.find((m) => m.id === mode)?.complexity}
        </span>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2">
          ⏮ Step back
        </button>
        <button onClick={() => setPlaying((p) => !p)} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-fg">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={() => setStep((s) => Math.min(frames.length - 1, s + 1))} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2">
          Step forward ⏭
        </button>
        <button onClick={() => reset()} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2">
          ↺ Reset
        </button>
        <div className="ml-auto flex items-center gap-1">
          <span className="text-xs text-muted">Speed</span>
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={cn("rounded-md px-2 py-1 text-xs font-medium", speed === s ? "bg-brand text-brand-fg" : "text-muted hover:text-fg")}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
        <Legend color="bg-surface-2 border border-border" label="Empty" />
        <Legend color="bg-medium" label="Computing" />
        <Legend color="bg-brand/30 ring-1 ring-brand" label="Source cells (top + left)" />
        <Legend color="bg-easy/20 border border-easy" label="Filled" />
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

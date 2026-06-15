"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface GNode {
  label: string;
  x: number;
  y: number;
}

const W = 800;
const H = 360;

// 7-node undirected graph laid out left-to-right from the start node A.
const NODES: GNode[] = [
  { label: "A", x: 90, y: 180 }, // 0
  { label: "B", x: 260, y: 80 }, // 1
  { label: "C", x: 260, y: 280 }, // 2
  { label: "D", x: 450, y: 80 }, // 3
  { label: "E", x: 450, y: 280 }, // 4
  { label: "F", x: 630, y: 150 }, // 5
  { label: "G", x: 630, y: 310 }, // 6
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
];

// Adjacency list, neighbours kept ascending for deterministic traversal order.
const ADJ: number[][] = NODES.map((_, i) =>
  EDGES.flatMap(([a, b]) => (a === i ? [b] : b === i ? [a] : [])).sort((x, y) => x - y),
);

type Mode = "bfs" | "dfs";

const MODES: { id: Mode; name: string; complexity: string }[] = [
  { id: "bfs", name: "BFS", complexity: "O(V + E)" },
  { id: "dfs", name: "DFS", complexity: "O(V + E)" },
];

interface Frame {
  current: number | null;
  visited: number[];
  frontier: number[]; // discovered, awaiting processing
  note: string;
}

const label = (id: number) => NODES[id].label;

function genBFS(): Frame[] {
  const frames: Frame[] = [];
  const visited: number[] = [];
  const seen = new Set<number>([0]);
  const queue: number[] = [0];
  frames.push({ current: null, visited: [], frontier: [0], note: `Enqueue start node ${label(0)}` });
  while (queue.length) {
    const node = queue.shift()!;
    visited.push(node);
    frames.push({ current: node, visited: [...visited], frontier: [...queue], note: `Dequeue & visit ${label(node)}` });
    for (const nb of ADJ[node]) {
      if (!seen.has(nb)) {
        seen.add(nb);
        queue.push(nb);
        frames.push({ current: node, visited: [...visited], frontier: [...queue], note: `Discover ${label(nb)} → enqueue` });
      }
    }
  }
  frames.push({ current: null, visited: [...visited], frontier: [], note: "Done ✓" });
  return frames;
}

function genDFS(): Frame[] {
  const frames: Frame[] = [];
  const visited: number[] = [];
  frames.push({ current: null, visited: [], frontier: [0], note: `Start DFS at ${label(0)}` });
  const walk = (node: number) => {
    visited.push(node);
    frames.push({ current: node, visited: [...visited], frontier: [], note: `Visit ${label(node)}` });
    for (const nb of ADJ[node]) {
      if (!visited.includes(nb)) {
        frames.push({ current: node, visited: [...visited], frontier: [nb], note: `Recurse deeper into ${label(nb)}` });
        walk(nb);
      }
    }
  };
  walk(0);
  frames.push({ current: null, visited: [...visited], frontier: [], note: "Done ✓" });
  return frames;
}

const FILL_DEFAULT = "rgb(var(--surface))";
const FILL_VISITED = "rgb(34 197 94)"; // easy
const FILL_FRONTIER = "rgb(234 179 8)"; // medium
const FILL_CURRENT = "rgb(239 68 68)"; // hard

export function GraphVisualizer() {
  const [mode, setMode] = useState<Mode>("bfs");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useMemo(() => (mode === "bfs" ? genBFS() : genDFS()), [mode]);
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

  const fillFor = (id: number) => {
    if (frame.current === id) return FILL_CURRENT;
    if (frame.visited.includes(id)) return FILL_VISITED;
    if (frame.frontier.includes(id)) return FILL_FRONTIER;
    return FILL_DEFAULT;
  };
  const isColored = (id: number) =>
    frame.current === id || frame.visited.includes(id) || frame.frontier.includes(id);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex flex-wrap gap-1.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => reset(m.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              mode === m.id
                ? "border-brand bg-brand/10 text-fg"
                : "border-border text-muted hover:text-fg",
            )}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div className="rounded-xl bg-surface-2 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Graph traversal">
          {EDGES.map(([a, b], i) => {
            const lit =
              (frame.visited.includes(a) || frame.current === a) &&
              (frame.visited.includes(b) || frame.current === b);
            return (
              <line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke={lit ? "rgb(34 197 94)" : "rgb(var(--border))"}
                strokeWidth={lit ? 3 : 2}
                style={{ transition: "stroke 0.2s" }}
              />
            );
          })}
          {NODES.map((n, id) => (
            <g key={id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={28}
                fill={fillFor(id)}
                stroke={frame.current === id ? "rgb(239 68 68)" : "rgb(var(--border))"}
                strokeWidth={frame.current === id ? 4 : 2}
                style={{ transition: "fill 0.2s" }}
              />
              <text
                x={n.x}
                y={n.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={18}
                fontWeight={700}
                fill={isColored(id) ? "#0c0c14" : "rgb(var(--fg))"}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Visit order */}
      <div className="mt-3 min-h-6 text-sm">
        <span className="text-muted">Visit order: </span>
        <span className="font-mono font-medium">
          {frame.visited.map(label).join(" → ") || "—"}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} · {MODES.find((m) => m.id === mode)?.complexity}
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
        <Legend color="bg-surface border border-border" label="Unvisited" />
        <Legend color="bg-medium" label={mode === "bfs" ? "In queue" : "Next target"} />
        <Legend color="bg-hard" label="Processing" />
        <Legend color="bg-easy" label="Visited" />
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

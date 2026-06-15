"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface TreeNode {
  val: number;
  left: number | null;
  right: number | null;
}

// Fixed BST (indices are node ids):
//            50
//          /    \
//        30      70
//       /  \    /  \
//      20  40  60   80
//     /
//    10
const NODES: TreeNode[] = [
  { val: 50, left: 1, right: 2 }, // 0 root
  { val: 30, left: 3, right: 4 }, // 1
  { val: 70, left: 5, right: 6 }, // 2
  { val: 20, left: 7, right: null }, // 3
  { val: 40, left: null, right: null }, // 4
  { val: 60, left: null, right: null }, // 5
  { val: 80, left: null, right: null }, // 6
  { val: 10, left: null, right: null }, // 7
];

// In-order column position (0..7) and depth for layout.
const COL: Record<number, number> = { 7: 0, 3: 1, 1: 2, 4: 3, 0: 4, 5: 5, 2: 6, 6: 7 };
const DEPTH: Record<number, number> = { 0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 2, 7: 3 };

const W = 800;
const H = 340;
const cx = (id: number) => ((COL[id] + 0.5) / 8) * W;
const cy = (id: number) => DEPTH[id] * 95 + 50;

type Mode = "inorder" | "preorder" | "postorder" | "levelorder";

const MODES: { id: Mode; name: string }[] = [
  { id: "inorder", name: "In-order" },
  { id: "preorder", name: "Pre-order" },
  { id: "postorder", name: "Post-order" },
  { id: "levelorder", name: "Level-order (BFS)" },
];

function order(mode: Mode): number[] {
  const out: number[] = [];
  if (mode === "levelorder") {
    const q = [0];
    while (q.length) {
      const id = q.shift()!;
      out.push(id);
      if (NODES[id].left !== null) q.push(NODES[id].left!);
      if (NODES[id].right !== null) q.push(NODES[id].right!);
    }
    return out;
  }
  const walk = (id: number | null) => {
    if (id === null) return;
    if (mode === "preorder") out.push(id);
    walk(NODES[id].left);
    if (mode === "inorder") out.push(id);
    walk(NODES[id].right);
    if (mode === "postorder") out.push(id);
  };
  walk(0);
  return out;
}

interface Frame {
  current: number | null;
  visited: number[];
  note: string;
}

function genFrames(mode: Mode): Frame[] {
  const seq = order(mode);
  const frames: Frame[] = [{ current: null, visited: [], note: "Start traversal" }];
  const visited: number[] = [];
  for (const id of seq) {
    visited.push(id);
    frames.push({ current: id, visited: [...visited], note: `Visit ${NODES[id].val}` });
  }
  frames.push({ current: null, visited: [...visited], note: "Traversal complete ✓" });
  return frames;
}

const FILL_DEFAULT = "rgb(var(--surface))";
const FILL_VISITED = "rgb(34 197 94)"; // easy / green
const FILL_CURRENT = "rgb(234 179 8)"; // medium / amber

export function TreeTraversalVisualizer() {
  const [mode, setMode] = useState<Mode>("inorder");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useMemo(() => genFrames(mode), [mode]);
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

  const edges: [number, number][] = [];
  NODES.forEach((n, i) => {
    if (n.left !== null) edges.push([i, n.left]);
    if (n.right !== null) edges.push([i, n.right]);
  });

  const fillFor = (id: number) => {
    if (frame.current === id) return FILL_CURRENT;
    if (frame.visited.includes(id)) return FILL_VISITED;
    return FILL_DEFAULT;
  };
  const isColored = (id: number) =>
    frame.current === id || frame.visited.includes(id);

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

      {/* Tree */}
      <div className="rounded-xl bg-surface-2 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Binary search tree traversal">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={cx(a)}
              y1={cy(a)}
              x2={cx(b)}
              y2={cy(b)}
              stroke="rgb(var(--border))"
              strokeWidth={2}
            />
          ))}
          {NODES.map((n, id) => (
            <g key={id}>
              <circle
                cx={cx(id)}
                cy={cy(id)}
                r={26}
                fill={fillFor(id)}
                stroke={frame.current === id ? "rgb(234 179 8)" : "rgb(var(--border))"}
                strokeWidth={frame.current === id ? 4 : 2}
                style={{ transition: "fill 0.2s" }}
              />
              <text
                x={cx(id)}
                y={cy(id)}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={16}
                fontWeight={600}
                fill={isColored(id) ? "#0c0c14" : "rgb(var(--fg))"}
              >
                {n.val}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Visit order */}
      <div className="mt-3 min-h-6 text-sm">
        <span className="text-muted">Visit order: </span>
        <span className="font-mono font-medium">
          {frame.visited.map((id) => NODES[id].val).join(" → ") || "—"}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length}
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
        <Legend color="bg-medium" label="Current node" />
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

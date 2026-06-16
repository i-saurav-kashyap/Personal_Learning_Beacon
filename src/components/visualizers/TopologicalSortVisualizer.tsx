"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface GNode {
  label: string;
  x: number;
  y: number;
}

const W = 840;
const H = 360;

// A small DAG (course-prerequisite style). Edge a→b means "a must come before b".
const NODES: GNode[] = [
  { label: "A", x: 80, y: 90 }, // 0
  { label: "B", x: 80, y: 270 }, // 1
  { label: "C", x: 250, y: 180 }, // 2
  { label: "D", x: 430, y: 90 }, // 3
  { label: "E", x: 430, y: 270 }, // 4
  { label: "F", x: 610, y: 180 }, // 5
  { label: "G", x: 770, y: 180 }, // 6
];

// directed edges (from → to)
const EDGES: [number, number][] = [
  [0, 2], // A→C
  [1, 2], // B→C
  [1, 4], // B→E
  [2, 3], // C→D
  [2, 4], // C→E
  [3, 5], // D→F
  [4, 5], // E→F
  [5, 6], // F→G
];

const OUT: number[][] = NODES.map((_, i) =>
  EDGES.filter(([a]) => a === i)
    .map(([, b]) => b)
    .sort((x, y) => x - y),
);

interface Frame {
  current: number | null;
  order: number[]; // settled (topo order)
  queue: number[];
  indeg: number[];
  activeEdge: [number, number] | null;
  note: string;
}

function genFrames(): Frame[] {
  const n = NODES.length;
  const indeg = new Array(n).fill(0);
  for (const [, b] of EDGES) indeg[b]++;
  const frames: Frame[] = [];
  const snap = (extra: Partial<Frame>): Frame => ({
    current: null,
    order: [],
    queue: [],
    indeg: [...indeg],
    activeEdge: null,
    note: "",
    ...extra,
  });

  frames.push(snap({ note: "Compute every node's in-degree (incoming edges)" }));

  const order: number[] = [];
  const queue: number[] = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);
  frames.push(snap({ queue: [...queue], note: "Enqueue all nodes with in-degree 0 (no prerequisites)" }));

  while (queue.length) {
    const node = queue.shift()!;
    frames.push(snap({ current: node, order: [...order], queue: [...queue], note: `Dequeue ${NODES[node].label} → take it next` }));
    order.push(node);
    frames.push(snap({ current: node, order: [...order], queue: [...queue], note: `Append ${NODES[node].label} to the topological order` }));
    for (const nb of OUT[node]) {
      indeg[nb]--;
      const becameZero = indeg[nb] === 0;
      if (becameZero) queue.push(nb);
      frames.push(
        snap({
          current: node,
          order: [...order],
          queue: [...queue],
          activeEdge: [node, nb],
          note: becameZero
            ? `${NODES[nb].label}'s in-degree hits 0 → enqueue it`
            : `Decrement ${NODES[nb].label}'s in-degree to ${indeg[nb]}`,
        }),
      );
    }
  }
  frames.push(snap({ order: [...order], note: "Done — a valid topological order ✓" }));
  return frames;
}

const FILL_DEFAULT = "rgb(var(--surface))";
const FILL_SETTLED = "rgb(34 197 94)"; // easy / green
const FILL_QUEUE = "rgb(234 179 8)"; // medium / amber
const FILL_CURRENT = "rgb(239 68 68)"; // hard / red

export function TopologicalSortVisualizer() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useMemo(() => genFrames(), []);
  const frame = frames[Math.min(step, frames.length - 1)];

  useEffect(() => {
    if (!playing) return;
    if (step >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setStep((s) => s + 1), 800 / speed);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, step, frames.length, speed]);

  function reset() {
    setPlaying(false);
    setStep(0);
  }

  const fillFor = (id: number) => {
    if (frame.current === id) return FILL_CURRENT;
    if (frame.order.includes(id)) return FILL_SETTLED;
    if (frame.queue.includes(id)) return FILL_QUEUE;
    return FILL_DEFAULT;
  };
  const isColored = (id: number) =>
    frame.current === id || frame.order.includes(id) || frame.queue.includes(id);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      {/* Graph */}
      <div className="rounded-xl bg-surface-2 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Topological sort">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L9,3 L0,6 Z" fill="rgb(var(--muted))" />
            </marker>
            <marker id="arrowLit" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L9,3 L0,6 Z" fill="rgb(239 68 68)" />
            </marker>
          </defs>
          {EDGES.map(([a, b], i) => {
            const lit = frame.activeEdge && frame.activeEdge[0] === a && frame.activeEdge[1] === b;
            // shorten the line so the arrowhead sits at the node edge (r=28)
            const dx = NODES[b].x - NODES[a].x;
            const dy = NODES[b].y - NODES[a].y;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            return (
              <line
                key={i}
                x1={NODES[a].x + ux * 28}
                y1={NODES[a].y + uy * 28}
                x2={NODES[b].x - ux * 30}
                y2={NODES[b].y - uy * 30}
                stroke={lit ? "rgb(239 68 68)" : "rgb(var(--border))"}
                strokeWidth={lit ? 3 : 2}
                markerEnd={lit ? "url(#arrowLit)" : "url(#arrow)"}
                style={{ transition: "stroke 0.2s" }}
              />
            );
          })}
          {NODES.map((nd, id) => (
            <g key={id}>
              <circle
                cx={nd.x}
                cy={nd.y}
                r={28}
                fill={fillFor(id)}
                stroke={frame.current === id ? "rgb(239 68 68)" : "rgb(var(--border))"}
                strokeWidth={frame.current === id ? 4 : 2}
                style={{ transition: "fill 0.2s" }}
              />
              <text
                x={nd.x}
                y={nd.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={18}
                fontWeight={700}
                fill={isColored(id) ? "#0c0c14" : "rgb(var(--fg))"}
              >
                {nd.label}
              </text>
              {/* in-degree badge */}
              <circle cx={nd.x + 22} cy={nd.y - 22} r={11} fill="rgb(var(--surface-2))" stroke="rgb(var(--border))" />
              <text x={nd.x + 22} y={nd.y - 22} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill="rgb(var(--fg))">
                {frame.indeg[id]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Order + queue */}
      <div className="mt-3 space-y-1 text-sm">
        <div>
          <span className="text-muted">Topological order: </span>
          <span className="font-mono font-medium">{frame.order.map((id) => NODES[id].label).join(" → ") || "—"}</span>
        </div>
        <div>
          <span className="text-muted">Queue (in-degree 0): </span>
          <span className="font-mono font-medium">{frame.queue.map((id) => NODES[id].label).join(", ") || "—"}</span>
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} · O(V + E)
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
        <button onClick={reset} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-2">
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
        <Legend color="bg-surface border border-border" label="Unprocessed" />
        <Legend color="bg-medium" label="In queue (in-degree 0)" />
        <Legend color="bg-hard" label="Processing" />
        <Legend color="bg-easy" label="In topo order" />
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

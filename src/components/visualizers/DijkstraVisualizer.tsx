"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface GNode {
  label: string;
  x: number;
  y: number;
}

const W = 800;
const H = 380;

// 6-node weighted undirected graph with fixed positions.
const NODES: GNode[] = [
  { label: "A", x: 90, y: 200 }, // 0
  { label: "B", x: 280, y: 80 }, // 1
  { label: "C", x: 280, y: 320 }, // 2
  { label: "D", x: 500, y: 90 }, // 3
  { label: "E", x: 500, y: 300 }, // 4
  { label: "F", x: 710, y: 200 }, // 5
];

// [u, v, weight]
const EDGES: [number, number, number][] = [
  [0, 1, 4],
  [0, 2, 2],
  [1, 2, 1],
  [1, 3, 5],
  [2, 3, 8],
  [2, 4, 10],
  [3, 4, 2],
  [3, 5, 6],
  [4, 5, 3],
];

// Adjacency list with weights.
const ADJ: { to: number; w: number }[][] = NODES.map((_, i) =>
  EDGES.flatMap(([u, v, w]) =>
    u === i ? [{ to: v, w }] : v === i ? [{ to: u, w }] : [],
  ),
);

const INF = Infinity;

interface Frame {
  current: number | null; // node being settled (processing)
  visited: number[]; // settled nodes
  frontier: number[]; // discovered, not yet settled
  dist: number[]; // snapshot of tentative distances
  relaxed: [number, number] | null; // edge just relaxed (u,v)
  note: string;
}

function genFrames(start: number): Frame[] {
  const n = NODES.length;
  const dist = new Array<number>(n).fill(INF);
  const visited = new Array<boolean>(n).fill(false);
  dist[start] = 0;
  const frames: Frame[] = [];
  const frontier = () =>
    NODES.map((_, i) => i).filter((i) => !visited[i] && dist[i] < INF);

  frames.push({
    current: null,
    visited: [],
    frontier: frontier(),
    dist: [...dist],
    relaxed: null,
    note: `Start at ${NODES[start].label}; its distance is 0, all others ∞`,
  });

  for (let iter = 0; iter < n; iter++) {
    // pick unvisited node with smallest tentative distance
    let u = -1;
    let best = INF;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && dist[i] < best) {
        best = dist[i];
        u = i;
      }
    }
    if (u === -1) break; // remaining nodes unreachable

    frames.push({
      current: u,
      visited: NODES.map((_, i) => i).filter((i) => visited[i]),
      frontier: frontier().filter((i) => i !== u),
      dist: [...dist],
      relaxed: null,
      note: `Pick the closest unsettled node: ${NODES[u].label} (distance ${dist[u]})`,
    });

    visited[u] = true;

    for (const { to, w } of ADJ[u]) {
      if (visited[to]) continue;
      const nd = dist[u] + w;
      if (nd < dist[to]) {
        dist[to] = nd;
        frames.push({
          current: u,
          visited: NODES.map((_, i) => i).filter((i) => visited[i]),
          frontier: frontier(),
          dist: [...dist],
          relaxed: [u, to],
          note: `Relax ${NODES[u].label}→${NODES[to].label}: ${dist[u]}+${w} = ${nd} < old → update`,
        });
      }
    }

    frames.push({
      current: null,
      visited: NODES.map((_, i) => i).filter((i) => visited[i]),
      frontier: frontier(),
      dist: [...dist],
      relaxed: null,
      note: `Settled ${NODES[u].label} — its distance ${dist[u]} is now final`,
    });
  }

  frames.push({
    current: null,
    visited: NODES.map((_, i) => i),
    frontier: [],
    dist: [...dist],
    relaxed: null,
    note: "Done ✓ — every node holds its shortest distance from A",
  });
  return frames;
}

const FILL_DEFAULT = "rgb(var(--surface))";
const FILL_FRONTIER = "rgb(234 179 8)"; // medium / amber
const FILL_CURRENT = "rgb(239 68 68)"; // hard / red
const FILL_VISITED = "rgb(34 197 94)"; // easy / green

const fmt = (d: number) => (d === INF ? "∞" : String(d));

export function DijkstraVisualizer() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useMemo(() => genFrames(0), []);
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
    if (frame.visited.includes(id)) return FILL_VISITED;
    if (frame.frontier.includes(id)) return FILL_FRONTIER;
    return FILL_DEFAULT;
  };
  const isColored = (id: number) =>
    frame.current === id || frame.visited.includes(id) || frame.frontier.includes(id);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      {/* Graph */}
      <div className="rounded-xl bg-surface-2 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Dijkstra shortest paths">
          {EDGES.map(([u, v, w], i) => {
            const relaxed =
              frame.relaxed && frame.relaxed[0] === u && frame.relaxed[1] === v;
            const settled = frame.visited.includes(u) && frame.visited.includes(v);
            const mx = (NODES[u].x + NODES[v].x) / 2;
            const my = (NODES[u].y + NODES[v].y) / 2;
            return (
              <g key={i}>
                <line
                  x1={NODES[u].x}
                  y1={NODES[u].y}
                  x2={NODES[v].x}
                  y2={NODES[v].y}
                  stroke={relaxed ? "rgb(234 179 8)" : settled ? "rgb(34 197 94)" : "rgb(var(--border))"}
                  strokeWidth={relaxed ? 4 : settled ? 3 : 2}
                  style={{ transition: "stroke 0.2s" }}
                />
                <circle cx={mx} cy={my} r={12} fill="rgb(var(--surface))" stroke="rgb(var(--border))" strokeWidth={1} />
                <text x={mx} y={my} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600} fill="rgb(var(--muted))">
                  {w}
                </text>
              </g>
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
              <text x={nd.x} y={nd.y - 4} textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight={700} fill={isColored(id) ? "#0c0c14" : "rgb(var(--fg))"}>
                {nd.label}
              </text>
              <text x={nd.x} y={nd.y + 11} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600} fill={isColored(id) ? "#0c0c14" : "rgb(var(--muted))"}>
                {fmt(frame.dist[id])}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Distance table */}
      <div className="mt-3 flex flex-wrap gap-2">
        {NODES.map((nd, id) => (
          <div
            key={id}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm tabular-nums",
              frame.visited.includes(id)
                ? "border-easy/40 bg-easy/10"
                : "border-border bg-surface-2",
            )}
          >
            <span className="font-semibold">{nd.label}</span>
            <span className="text-muted">{fmt(frame.dist[id])}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} · O((V+E) log V)
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
          onClick={reset}
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
        <Legend color="bg-surface border border-border" label="Unvisited (∞)" />
        <Legend color="bg-medium" label="In frontier" />
        <Legend color="bg-hard" label="Processing" />
        <Legend color="bg-easy" label="Settled" />
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

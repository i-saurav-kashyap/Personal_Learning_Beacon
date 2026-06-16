"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Node {
  val: number;
  left: number | null;
  right: number | null;
}

// Fixed insertion sequence — ids are assigned in insertion order.
const SEQ = [50, 30, 70, 20, 40, 60, 80, 10, 45];
const SEARCH_TARGETS = [45, 80, 55, 10]; // mix of present + absent (55)

// Build the final BST once; layout is derived from this so node positions stay
// stable while the tree grows during the insert animation.
function buildFullTree(seq: number[]): Node[] {
  const nodes: Node[] = [];
  for (const v of seq) {
    const id = nodes.length;
    if (id === 0) {
      nodes.push({ val: v, left: null, right: null });
      continue;
    }
    let cur = 0;
    for (;;) {
      if (v < nodes[cur].val) {
        if (nodes[cur].left === null) {
          nodes[cur].left = id;
          break;
        }
        cur = nodes[cur].left!;
      } else {
        if (nodes[cur].right === null) {
          nodes[cur].right = id;
          break;
        }
        cur = nodes[cur].right!;
      }
    }
    nodes.push({ val: v, left: null, right: null });
  }
  return nodes;
}

const FULL = buildFullTree(SEQ);

// In-order index → column (guarantees no horizontal overlap); BFS depth → row.
function computeLayout(nodes: Node[]) {
  const col: Record<number, number> = {};
  const depth: Record<number, number> = {};
  const inorder: number[] = [];
  const walk = (id: number | null) => {
    if (id === null) return;
    walk(nodes[id].left);
    inorder.push(id);
    walk(nodes[id].right);
  };
  walk(0);
  inorder.forEach((id, i) => (col[id] = i));
  const dwalk = (id: number | null, d: number) => {
    if (id === null) return;
    depth[id] = d;
    dwalk(nodes[id].left, d + 1);
    dwalk(nodes[id].right, d + 1);
  };
  dwalk(0, 0);
  return { col, depth, total: inorder.length, maxDepth: Math.max(...Object.values(depth)) };
}

const LAYOUT = computeLayout(FULL);
const W = 760;
const H = (LAYOUT.maxDepth + 1) * 85 + 20;
const cx = (id: number) => ((LAYOUT.col[id] + 0.5) / LAYOUT.total) * W;
const cy = (id: number) => LAYOUT.depth[id] * 85 + 45;

type Mode = "insert" | "search";

interface Frame {
  count: number; // number of nodes present (insertion prefix)
  current: number | null; // node being compared (amber)
  placed: number | null; // node just inserted / found (green)
  note: string;
}

function insertFrames(): Frame[] {
  const frames: Frame[] = [{ count: 0, current: null, placed: null, note: "Start with an empty tree" }];
  for (let id = 0; id < FULL.length; id++) {
    const v = FULL[id].val;
    if (id === 0) {
      frames.push({ count: 1, current: null, placed: 0, note: `${v} is the first value → it becomes the root` });
      continue;
    }
    let cur = 0;
    for (;;) {
      const goLeft = v < FULL[cur].val;
      frames.push({
        count: id,
        current: cur,
        placed: null,
        note: `${v} ${goLeft ? "<" : ">"} ${FULL[cur].val} → go ${goLeft ? "left" : "right"}`,
      });
      const next = goLeft ? FULL[cur].left : FULL[cur].right;
      if (next === null || next === id) {
        frames.push({
          count: id + 1,
          current: null,
          placed: id,
          note: `Empty spot found → insert ${v} as the ${goLeft ? "left" : "right"} child of ${FULL[cur].val}`,
        });
        break;
      }
      cur = next;
    }
  }
  frames.push({ count: FULL.length, current: null, placed: null, note: "All values inserted ✓" });
  return frames;
}

function searchFrames(target: number): Frame[] {
  const n = FULL.length;
  const frames: Frame[] = [{ count: n, current: null, placed: null, note: `Search for ${target} from the root` }];
  let cur = 0;
  let searching = true;
  while (searching) {
    const node = FULL[cur];
    if (target === node.val) {
      frames.push({ count: n, current: null, placed: cur, note: `Found ${target} ✓` });
      return frames;
    }
    const goLeft = target < node.val;
    frames.push({
      count: n,
      current: cur,
      placed: null,
      note: `${target} ${goLeft ? "<" : ">"} ${node.val} → go ${goLeft ? "left" : "right"}`,
    });
    const next = goLeft ? node.left : node.right;
    if (next === null) searching = false;
    else cur = next;
  }
  frames.push({ count: n, current: null, placed: null, note: `Reached an empty spot — ${target} is not in the tree` });
  return frames;
}

const FILL_DEFAULT = "rgb(var(--surface))";
const FILL_PLACED = "rgb(34 197 94)"; // easy / green
const FILL_CURRENT = "rgb(234 179 8)"; // medium / amber

export function BSTVisualizer() {
  const [mode, setMode] = useState<Mode>("insert");
  const [targetIdx, setTargetIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const target = SEARCH_TARGETS[targetIdx];
  const frames = useMemo(
    () => (mode === "insert" ? insertFrames() : searchFrames(target)),
    [mode, target],
  );
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

  function reset() {
    setPlaying(false);
    setStep(0);
  }

  const present = (id: number) => id < frame.count;
  const edges: [number, number][] = [];
  FULL.forEach((n, i) => {
    if (n.left !== null) edges.push([i, n.left]);
    if (n.right !== null) edges.push([i, n.right]);
  });

  const fillFor = (id: number) => {
    if (frame.placed === id) return FILL_PLACED;
    if (frame.current === id) return FILL_CURRENT;
    return FILL_DEFAULT;
  };
  const isColored = (id: number) => frame.placed === id || frame.current === id;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      {/* Mode + target controls */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        {(["insert", "search"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              reset();
            }}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium capitalize transition-colors",
              mode === m ? "border-brand bg-brand/10 text-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {m}
          </button>
        ))}
        {mode === "search" && (
          <>
            <span className="ml-2 mr-1 text-sm text-muted">Target:</span>
            {SEARCH_TARGETS.map((t, i) => (
              <button
                key={t}
                onClick={() => {
                  setTargetIdx(i);
                  reset();
                }}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium tabular-nums transition-colors",
                  targetIdx === i ? "border-brand bg-brand/10 text-fg" : "border-border text-muted hover:text-fg",
                )}
              >
                {t}
                {!SEQ.includes(t) ? " (absent)" : ""}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Tree */}
      <div className="rounded-xl bg-surface-2 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="BST operations">
          {edges.map(([a, b], i) =>
            present(a) && present(b) ? (
              <line
                key={i}
                x1={cx(a)}
                y1={cy(a)}
                x2={cx(b)}
                y2={cy(b)}
                stroke="rgb(var(--border))"
                strokeWidth={2}
              />
            ) : null,
          )}
          {FULL.map((n, id) =>
            present(id) ? (
              <g key={id}>
                <circle
                  cx={cx(id)}
                  cy={cy(id)}
                  r={24}
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
                  fontSize={15}
                  fontWeight={600}
                  fill={isColored(id) ? "#0c0c14" : "rgb(var(--fg))"}
                >
                  {n.val}
                </text>
              </g>
            ) : null,
          )}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{frame.note}</span>
        <span className="text-muted">
          Step {step + 1} / {frames.length} · {mode === "insert" ? "Insert O(h)" : "Search O(h)"}
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
        <Legend color="bg-surface border border-border" label="Node" />
        <Legend color="bg-medium" label="Comparing" />
        <Legend color="bg-easy" label={mode === "insert" ? "Inserted" : "Found"} />
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

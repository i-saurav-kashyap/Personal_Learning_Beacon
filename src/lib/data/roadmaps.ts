import type { PlanLength, Roadmap, SheetId } from "@/lib/types";
import { PROBLEMS } from "@/lib/data/problems";

// ---------------------------------------------------------------------------
// Roadmaps and curated-sheet metadata.
// Roadmaps are generated from a curriculum skeleton; in production these would
// be tuned per experience level and target company.
// ---------------------------------------------------------------------------

interface CurriculumBlock {
  focus: string;
  title: string;
  patterns: string[];
}

const CURRICULUM: CurriculumBlock[] = [
  { title: "Foundations & Complexity", focus: "Big-O, arrays, basic iteration", patterns: ["hashing"] },
  { title: "Hashing", focus: "Frequency counts, complements, grouping", patterns: ["hashing"] },
  { title: "Two Pointers", focus: "Sorted-array sweeps, pair/triplet sums", patterns: ["two-pointers"] },
  { title: "Sliding Window", focus: "Contiguous subarray/substring optimisation", patterns: ["sliding-window"] },
  { title: "Binary Search", focus: "Sorted search & search-on-answer", patterns: ["binary-search"] },
  { title: "Linked Lists", focus: "Fast/slow pointers, reversal, cycles", patterns: ["fast-slow-pointers"] },
  { title: "Stacks & Monotonic Stack", focus: "Next-greater, spans, histograms", patterns: ["monotonic-stack"] },
  { title: "Trees & BFS/DFS", focus: "Traversals, depth, level order", patterns: ["graphs"] },
  { title: "Graphs", focus: "Connectivity, topo sort, shortest paths", patterns: ["graphs"] },
  { title: "Backtracking", focus: "Subsets, permutations, constraint puzzles", patterns: ["backtracking"] },
  { title: "Dynamic Programming I", focus: "1-D DP, Fibonacci-style, house robber", patterns: ["dynamic-programming"] },
  { title: "Dynamic Programming II", focus: "Grid, knapsack, subsequence DP", patterns: ["dynamic-programming"] },
];

/** Pick problems whose patterns intersect the block, falling back to all. */
function problemsForBlock(block: CurriculumBlock): string[] {
  const matches = PROBLEMS.filter((p) =>
    p.patterns.some((pat) => block.patterns.includes(pat)),
  ).map((p) => p.slug);
  return matches.length ? matches : PROBLEMS.slice(0, 2).map((p) => p.slug);
}

export function generateRoadmap(length: PlanLength): Roadmap {
  const blocks = CURRICULUM;
  const daysPerBlock = Math.max(1, Math.round(length / blocks.length));
  const days = [];
  let day = 1;

  for (const block of blocks) {
    for (let d = 0; d < daysPerBlock && day <= length; d++, day++) {
      days.push({
        day,
        title: block.title + (daysPerBlock > 1 ? ` (part ${d + 1})` : ""),
        focus: block.focus,
        problems: problemsForBlock(block),
      });
    }
  }
  // pad remaining days with revision
  while (day <= length) {
    days.push({
      day,
      title: "Mixed revision & mock",
      focus: "Spaced repetition of weak areas + a timed mock interview",
      problems: PROBLEMS.slice(0, 3).map((p) => p.slug),
    });
    day++;
  }

  const titles: Record<PlanLength, string> = {
    14: "14-Day Sprint",
    30: "30-Day Plan",
    60: "60-Day Deep Dive",
    90: "90-Day Mastery",
  };
  const summaries: Record<PlanLength, string> = {
    14: "An intense crash plan for an imminent interview — patterns over breadth.",
    30: "The balanced default: every core pattern with room to practice.",
    60: "Thorough coverage with extra reps on graphs and DP.",
    90: "Comprehensive mastery including advanced topics and weekly mocks.",
  };

  return { length, title: titles[length], summary: summaries[length], days };
}

export const PLAN_LENGTHS: PlanLength[] = [14, 30, 60, 90];

// --- Curated sheets metadata -----------------------------------------------

export interface SheetMeta {
  id: SheetId;
  name: string;
  source: string;
  description: string;
  total: number; // canonical size of the full sheet
}

export const SHEETS: SheetMeta[] = [
  {
    id: "blind75",
    name: "Blind 75",
    source: "Community classic",
    description:
      "The 75 problems that cover the highest-leverage patterns for interviews — the fastest path from zero to interview-ready.",
    total: 75,
  },
  {
    id: "neetcode150",
    name: "NeetCode 150",
    source: "NeetCode-style",
    description:
      "An expanded 150-problem set organised by pattern, giving more reps per category than Blind 75.",
    total: 150,
  },
  {
    id: "namaste",
    name: "Namaste DSA Sheet",
    source: "Namaste DSA-style",
    description:
      "A beginner-friendly progression with deep explanations and revision checkpoints.",
    total: 120,
  },
  {
    id: "striver",
    name: "Striver A2Z Sheet",
    source: "A2Z-style",
    description:
      "A comprehensive A-to-Z curriculum taking you from basics to advanced, step by step.",
    total: 180,
  },
  {
    id: "top50",
    name: "Top 50 Must-Solve",
    source: "Curated",
    description:
      "Fifty highest-frequency questions spanning every major topic — ideal for a final pass.",
    total: 50,
  },
];

export const SHEET_MAP: Record<SheetId, SheetMeta> = Object.fromEntries(
  SHEETS.map((s) => [s.id, s]),
) as Record<SheetId, SheetMeta>;

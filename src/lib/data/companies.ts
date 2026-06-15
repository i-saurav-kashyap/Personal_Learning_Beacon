import type { Company } from "@/lib/types";

// ---------------------------------------------------------------------------
// Company taxonomy. IMPORTANT: distributions and problem lists reflect
// PUBLICLY REPORTED community interview experiences and trends — we never
// claim a problem was officially asked by a company.
// ---------------------------------------------------------------------------

export const COMPANIES: Company[] = [
  {
    slug: "google",
    name: "Google",
    blurb:
      "Leans on clean problem decomposition, graphs and dynamic programming. Communication and edge-case handling weigh heavily.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 30 },
      { label: "Graphs", pct: 22 },
      { label: "Dynamic Programming", pct: 20 },
      { label: "Trees", pct: 16 },
      { label: "Math/Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Graph Traversal", pct: 28 },
      { label: "Dynamic Programming", pct: 24 },
      { label: "Two Pointers / Sliding Window", pct: 22 },
      { label: "Hashing", pct: 16 },
      { label: "Binary Search", pct: 10 },
    ],
    difficultyDistribution: { easy: 15, medium: 55, hard: 30 },
    reportedProblems: ["two-sum", "longest-substring-without-repeating", "three-sum", "binary-search"],
    recommendedPlan: 60,
  },
  {
    slug: "amazon",
    name: "Amazon",
    blurb:
      "Heavy on practical data-structure manipulation and BFS/BFS-on-grids, paired with Leadership Principle behavioural rounds.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 34 },
      { label: "Trees & Graphs", pct: 24 },
      { label: "Hashing", pct: 18 },
      { label: "Dynamic Programming", pct: 14 },
      { label: "Heaps", pct: 10 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 26 },
      { label: "Graph Traversal", pct: 24 },
      { label: "Sliding Window", pct: 20 },
      { label: "Heap / Top-K", pct: 16 },
      { label: "Two Pointers", pct: 14 },
    ],
    difficultyDistribution: { easy: 25, medium: 60, hard: 15 },
    reportedProblems: [
      "two-sum",
      "best-time-to-buy-sell-stock",
      "longest-substring-without-repeating",
      "linked-list-cycle",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "meta",
    name: "Meta",
    blurb:
      "Fast-paced rounds favouring arrays, strings, graphs and BFS. Expect to code multiple problems quickly and cleanly.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 38 },
      { label: "Graphs", pct: 22 },
      { label: "Trees", pct: 18 },
      { label: "Hashing", pct: 12 },
      { label: "Dynamic Programming", pct: 10 },
    ],
    patternDistribution: [
      { label: "Two Pointers", pct: 26 },
      { label: "Graph Traversal", pct: 24 },
      { label: "Hashing", pct: 22 },
      { label: "Sliding Window", pct: 18 },
      { label: "Binary Search", pct: 10 },
    ],
    difficultyDistribution: { easy: 20, medium: 62, hard: 18 },
    reportedProblems: ["three-sum", "valid-anagram", "longest-substring-without-repeating", "two-sum"],
    recommendedPlan: 30,
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    blurb:
      "Balanced and fundamentals-first: linked lists, trees, strings and classic recursion, with approachable medium difficulty.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 30 },
      { label: "Linked Lists", pct: 22 },
      { label: "Trees", pct: 20 },
      { label: "Dynamic Programming", pct: 16 },
      { label: "Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 24 },
      { label: "Fast & Slow Pointers", pct: 22 },
      { label: "Binary Search", pct: 20 },
      { label: "Graph Traversal", pct: 18 },
      { label: "DP", pct: 16 },
    ],
    difficultyDistribution: { easy: 30, medium: 58, hard: 12 },
    reportedProblems: ["binary-search", "linked-list-cycle", "two-sum", "climbing-stairs"],
    recommendedPlan: 30,
  },
  {
    slug: "apple",
    name: "Apple",
    blurb:
      "Pragmatic problem solving with attention to detail and clean code; arrays, strings and DP feature prominently.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 34 },
      { label: "Dynamic Programming", pct: 20 },
      { label: "Trees", pct: 18 },
      { label: "Hashing", pct: 16 },
      { label: "Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 26 },
      { label: "DP", pct: 24 },
      { label: "Two Pointers", pct: 20 },
      { label: "Binary Search", pct: 16 },
      { label: "Graphs", pct: 14 },
    ],
    difficultyDistribution: { easy: 28, medium: 58, hard: 14 },
    reportedProblems: ["climbing-stairs", "two-sum", "valid-anagram", "binary-search"],
    recommendedPlan: 30,
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    blurb:
      "Fundamentals plus practical engineering. Apex-flavoured roles make data-structure fluency in Apex a genuine edge.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 36 },
      { label: "Hashing", pct: 20 },
      { label: "Trees", pct: 18 },
      { label: "Linked Lists", pct: 14 },
      { label: "Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 30 },
      { label: "Two Pointers", pct: 22 },
      { label: "Sliding Window", pct: 18 },
      { label: "Binary Search", pct: 16 },
      { label: "Graphs", pct: 14 },
    ],
    difficultyDistribution: { easy: 35, medium: 55, hard: 10 },
    reportedProblems: ["two-sum", "valid-anagram", "best-time-to-buy-sell-stock", "binary-search"],
    recommendedPlan: 30,
  },
];

export const COMPANY_MAP: Record<string, Company> = Object.fromEntries(
  COMPANIES.map((c) => [c.slug, c]),
);

export function getCompany(slug: string): Company | undefined {
  return COMPANY_MAP[slug];
}

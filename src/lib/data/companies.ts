import type { Company } from "@/lib/types";

// ---------------------------------------------------------------------------
// Company taxonomy. IMPORTANT: distributions and problem lists reflect
// PUBLICLY REPORTED community interview experiences and trends (LeetCode
// Discuss, Glassdoor, blogs) — we never claim a problem was officially asked.
// reportedProblems reference Beacon library slugs; unknown slugs are ignored.
// ---------------------------------------------------------------------------

export const COMPANIES: Company[] = [
  {
    slug: "google",
    name: "Google",
    blurb:
      "Leans on clean problem decomposition, graphs and dynamic programming. Communication, edge-case handling and follow-ups weigh heavily.",
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
    reportedProblems: [
      "two-sum", "longest-substring-without-repeating", "three-sum", "word-ladder",
      "alien-dictionary", "course-schedule", "number-of-islands", "edit-distance",
      "median-of-two-sorted-arrays", "trapping-rain-water", "lru-cache",
      "binary-tree-maximum-path-sum", "longest-increasing-subsequence",
    ],
    recommendedPlan: 60,
  },
  {
    slug: "amazon",
    name: "Amazon",
    blurb:
      "Heavy on practical data-structure manipulation, BFS on grids, and heaps/top-K, paired with Leadership Principle behavioural rounds.",
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
      "two-sum", "number-of-islands", "lru-cache", "k-closest-points-to-origin",
      "top-k-frequent-elements", "merge-k-sorted-lists", "rotting-oranges",
      "word-break", "copy-list-with-random-pointer", "trapping-rain-water",
      "course-schedule", "reorder-list", "best-time-to-buy-sell-stock",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "meta",
    name: "Meta",
    blurb:
      "Fast-paced rounds favouring arrays, strings, graphs and BFS. Expect to solve multiple problems quickly and cleanly, plus sharp follow-ups.",
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
    reportedProblems: [
      "three-sum", "valid-palindrome", "merge-intervals", "binary-tree-right-side-view",
      "lowest-common-ancestor-of-a-binary-tree", "subarray-sum-equals-k",
      "minimum-window-substring", "clone-graph", "kth-largest-element-in-an-array",
      "add-two-numbers", "valid-parentheses", "diameter-of-binary-tree",
      "longest-substring-without-repeating",
    ],
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
    reportedProblems: [
      "reverse-linked-list", "linked-list-cycle", "binary-tree-level-order-traversal",
      "validate-binary-search-tree", "spiral-matrix", "two-sum", "merge-two-sorted-lists",
      "copy-list-with-random-pointer", "lowest-common-ancestor-of-a-bst", "climbing-stairs",
      "set-matrix-zeroes", "serialize-and-deserialize-binary-tree",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "apple",
    name: "Apple",
    blurb:
      "Pragmatic problem solving with attention to detail and clean code; arrays, strings, DP and design-flavoured questions feature prominently.",
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
    reportedProblems: [
      "two-sum", "valid-anagram", "lru-cache", "merge-intervals", "trapping-rain-water",
      "maximum-subarray", "binary-search", "add-two-numbers", "longest-palindromic-substring",
      "kth-largest-element-in-an-array", "rotate-image", "coin-change",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "netflix",
    name: "Netflix",
    blurb:
      "Senior-leaning bar: fewer but deeper problems emphasising clean design, complexity trade-offs and strong communication.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 30 },
      { label: "Dynamic Programming", pct: 22 },
      { label: "Graphs", pct: 20 },
      { label: "Design/Heap", pct: 16 },
      { label: "Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Dynamic Programming", pct: 26 },
      { label: "Heap / Top-K", pct: 22 },
      { label: "Graph Traversal", pct: 20 },
      { label: "Hashing", pct: 18 },
      { label: "Intervals", pct: 14 },
    ],
    difficultyDistribution: { easy: 12, medium: 58, hard: 30 },
    reportedProblems: [
      "find-median-from-data-stream", "merge-intervals", "lru-cache", "word-break",
      "top-k-frequent-elements", "maximum-product-subarray", "course-schedule",
      "edit-distance", "task-scheduler", "kth-largest-element-in-an-array",
    ],
    recommendedPlan: 60,
  },
  {
    slug: "uber",
    name: "Uber",
    blurb:
      "Graphs, intervals and real-world modelling (maps, scheduling) show up often, with solid medium-to-hard difficulty.",
    topicDistribution: [
      { label: "Graphs", pct: 26 },
      { label: "Arrays & Strings", pct: 26 },
      { label: "Intervals", pct: 18 },
      { label: "Dynamic Programming", pct: 16 },
      { label: "Heaps", pct: 14 },
    ],
    patternDistribution: [
      { label: "Graph Traversal", pct: 28 },
      { label: "Intervals", pct: 20 },
      { label: "Hashing", pct: 18 },
      { label: "Heap / Top-K", pct: 18 },
      { label: "DP", pct: 16 },
    ],
    difficultyDistribution: { easy: 18, medium: 60, hard: 22 },
    reportedProblems: [
      "merge-intervals", "meeting-rooms-ii", "network-delay-time", "number-of-islands",
      "course-schedule", "k-closest-points-to-origin", "lru-cache", "word-search",
      "min-cost-to-connect-all-points", "top-k-frequent-elements",
    ],
    recommendedPlan: 60,
  },
  {
    slug: "adobe",
    name: "Adobe",
    blurb:
      "Fundamentals-heavy: arrays, strings, DP and trees at a comfortable medium difficulty, with clean-code emphasis.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 36 },
      { label: "Dynamic Programming", pct: 20 },
      { label: "Trees", pct: 18 },
      { label: "Hashing", pct: 14 },
      { label: "Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 26 },
      { label: "DP", pct: 22 },
      { label: "Two Pointers", pct: 20 },
      { label: "Trees", pct: 18 },
      { label: "Binary Search", pct: 14 },
    ],
    difficultyDistribution: { easy: 32, medium: 56, hard: 12 },
    reportedProblems: [
      "two-sum", "maximum-subarray", "product-of-array-except-self", "coin-change",
      "valid-parentheses", "merge-intervals", "climbing-stairs", "group-anagrams",
      "longest-palindromic-substring", "binary-tree-level-order-traversal",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "atlassian",
    name: "Atlassian",
    blurb:
      "Practical engineering problems: hashing, design, trees and intervals, often framed around real product scenarios.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 32 },
      { label: "Hashing/Design", pct: 22 },
      { label: "Trees", pct: 18 },
      { label: "Intervals", pct: 16 },
      { label: "Graphs", pct: 12 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 28 },
      { label: "Intervals", pct: 20 },
      { label: "Trees", pct: 18 },
      { label: "Heap / Top-K", pct: 18 },
      { label: "Graph Traversal", pct: 16 },
    ],
    difficultyDistribution: { easy: 28, medium: 60, hard: 12 },
    reportedProblems: [
      "merge-intervals", "insert-interval", "top-k-frequent-elements", "lru-cache",
      "group-anagrams", "course-schedule", "kth-largest-element-in-an-array",
      "binary-tree-level-order-traversal", "two-sum", "task-scheduler",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "oracle",
    name: "Oracle",
    blurb:
      "Solid fundamentals across arrays, strings, linked lists and trees, with classic medium problems and SQL/system rounds alongside.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 34 },
      { label: "Linked Lists", pct: 20 },
      { label: "Trees", pct: 18 },
      { label: "Hashing", pct: 16 },
      { label: "DP", pct: 12 },
    ],
    patternDistribution: [
      { label: "Hashing", pct: 26 },
      { label: "Two Pointers", pct: 22 },
      { label: "Fast & Slow Pointers", pct: 18 },
      { label: "Binary Search", pct: 18 },
      { label: "DP", pct: 16 },
    ],
    difficultyDistribution: { easy: 34, medium: 56, hard: 10 },
    reportedProblems: [
      "two-sum", "reverse-linked-list", "valid-anagram", "merge-two-sorted-lists",
      "maximum-subarray", "binary-search", "spiral-matrix", "climbing-stairs",
      "longest-substring-without-repeating", "lowest-common-ancestor-of-a-bst",
    ],
    recommendedPlan: 30,
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    blurb:
      "Distinctive mix of design, heaps, graphs and trees; expect well-known LinkedIn-tagged classics and strong follow-up depth.",
    topicDistribution: [
      { label: "Arrays & Strings", pct: 28 },
      { label: "Trees & Graphs", pct: 24 },
      { label: "Design/Heap", pct: 20 },
      { label: "Dynamic Programming", pct: 16 },
      { label: "Other", pct: 12 },
    ],
    patternDistribution: [
      { label: "Heap / Top-K", pct: 24 },
      { label: "Graph Traversal", pct: 22 },
      { label: "Hashing", pct: 20 },
      { label: "DP", pct: 18 },
      { label: "Trees", pct: 16 },
    ],
    difficultyDistribution: { easy: 22, medium: 58, hard: 20 },
    reportedProblems: [
      "merge-k-sorted-lists", "find-median-from-data-stream", "maximum-subarray",
      "lowest-common-ancestor-of-a-binary-tree", "word-ladder", "coin-change",
      "kth-largest-element-in-an-array", "binary-tree-level-order-traversal",
      "evaluate-reverse-polish-notation", "course-schedule",
    ],
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
    reportedProblems: [
      "two-sum", "valid-anagram", "best-time-to-buy-sell-stock", "binary-search",
      "group-anagrams", "merge-intervals", "valid-parentheses", "climbing-stairs",
      "number-of-islands", "lowest-common-ancestor-of-a-bst",
    ],
    recommendedPlan: 30,
  },
];

export const COMPANY_MAP: Record<string, Company> = Object.fromEntries(
  COMPANIES.map((c) => [c.slug, c]),
);

export function getCompany(slug: string): Company | undefined {
  return COMPANY_MAP[slug];
}

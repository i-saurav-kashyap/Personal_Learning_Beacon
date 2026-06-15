import { PROBLEMS, PROBLEM_MAP } from "@/lib/data/problems";

// Maps a Striver-A2Z problem title to a Beacon library problem slug (when we
// have full teaching content for it), so the course can deep-link into it.

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const TITLE_TO_SLUG = new Map<string, string>();
for (const p of PROBLEMS) TITLE_TO_SLUG.set(norm(p.title), p.slug);

// A few hand-curated aliases where the A2Z naming differs from ours.
const ALIASES: Record<string, string> = {
  "2sumproblem": "two-sum",
  kadanesalgorithm: "maximum-subarray",
  stockbuysell: "best-time-to-buy-sell-stock",
  longestconsecutivesubsequence: "longest-consecutive-sequence",
  mergeoverlappingsubinterval: "merge-intervals",
  searchxinsortedarray: "binary-search",
  lowestcommonancestorofabinarysearchtree: "lowest-common-ancestor-of-a-bst",
};

export function librarySlugForTitle(title: string): string | undefined {
  const n = norm(title);
  const direct = TITLE_TO_SLUG.get(n);
  if (direct) return direct;
  const alias = ALIASES[n];
  // Guard: only return an alias that actually resolves to a real problem.
  return alias && PROBLEM_MAP[alias] ? alias : undefined;
}

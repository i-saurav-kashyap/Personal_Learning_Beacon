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
  // A2Z / course naming → Beacon slugs (hand-verified as the SAME problem).
  numberofsubarraysumequalk: "subarray-sum-equals-k",
  pascaltriangle: "pascals-triangle",
  findtheminimumelementinsortedrotatedarray: "find-minimum-in-rotated-sorted-array",
  findsingleelementinsortedarray: "single-element-in-a-sorted-array",
  reversewordsinstring: "reverse-words-in-a-string",
  lettercombinationsofphone: "letter-combinations-of-a-phone-number",
  kthlargestelement: "kth-largest-element-in-an-array",
  kthlargestelementinstream: "kth-largest-element-in-a-stream",
  kthsmallestelementinbst: "kth-smallest-element-in-a-bst",
  cheapestflightswithkstops: "cheapest-flights-within-k-stops",
  besttimetobuyandsellstocks: "best-time-to-buy-sell-stock",
  levelordertraversal: "binary-tree-level-order-traversal",
  maximumpathsum: "binary-tree-maximum-path-sum",
  lowestcommonancestor: "lowest-common-ancestor-of-a-bst",
  nextgreaterelement: "next-greater-element-i",
  longestrepeatingcharacter: "longest-repeating-character-replacement",
  implementminstack: "min-stack",
  wordsearchingrid: "word-search",
  mergeksortedarrays: "merge-k-sorted-lists",
  searchinrotatedsortedarraywithduplicates: "search-in-rotated-sorted-array",
  combinationsum1: "combination-sum",
  combinationsum2: "combination-sum-ii",
  jumpgame2: "jump-game-ii",
  houserobber2: "house-robber-ii",
  sort012: "sort-colors",
  setmatrix0s: "set-matrix-zeroes",
  rotatematrix: "rotate-image",
  spiraltraversal: "spiral-matrix",
  findxinsortedarray: "binary-search",
  kokoeatingbanana: "koko-eating-bananas",
  majorityelement2: "majority-element-ii",
  searchinsortedmatrix: "search-a-2d-matrix",
  searchinrowwisesortedmatrix: "search-a-2d-matrix",
  validparenthesis: "valid-parentheses",
  // A2Z course names → newly-authored batch K/L/M/N problems.
  subarrayswithxork: "subarray-with-given-xor",
  largestsubarraywith0sum: "largest-subarray-with-zero-sum",
  merge2sortedarraywithoutspace: "merge-sorted-array",
  repeatingandmissingnumbers: "set-mismatch",
  longestsubarraywithgivensum: "longest-subarray-with-sum-k",
  longestsubarraywithsumkcontaingvesandves: "longest-subarray-with-sum-k",
  rearangeelementsbysign: "rearrange-array-elements-by-sign",
  leadersinarray: "leaders-in-an-array",
  unionof2sortedarrays: "union-of-two-sorted-arrays",
  findelementpresentonlyonce: "single-number",
  squarerootofnumber: "sqrt-x",
  nthrootofinteger: "nth-root-of-a-number",
  minimumdaystomakeboquets: "minimum-number-of-days-to-make-m-bouquets",
  capacitytoshippackages: "capacity-to-ship-packages-within-d-days",
  aggresivecows: "aggressive-cows",
  bookallocation: "allocate-minimum-number-of-pages",
  splitarraylargest: "split-array-largest-sum",
  kthmissingnumber: "kth-missing-positive-number",
  firstandlastposition: "find-first-and-last-position-of-element-in-sorted-array",
  peakelementinmatrix: "find-peak-element-ii",
  isomorphicstring: "isomorphic-strings",
  implementatoi: "string-to-integer-atoi",
  removeouterparenthesis: "remove-outermost-parentheses",
  maxnestingdepthofparenthesis: "maximum-nesting-depth-of-the-parentheses",
  checkforrotatedstring: "rotate-string",
  sortll: "sort-list",
  sort012inll: "sort-linked-list-of-0s-1s-and-2s",
  oddevenll: "odd-even-linked-list",
  rotatellktimes: "rotate-list",
  deletemidofll: "delete-the-middle-node-of-a-linked-list",
  add1toll: "add-one-to-a-linked-list",
  reverseknodeingroups: "reverse-nodes-in-k-group",
  flattenall: "flatten-a-linked-list",
};

export function librarySlugForTitle(title: string): string | undefined {
  const n = norm(title);
  const direct = TITLE_TO_SLUG.get(n);
  if (direct) return direct;
  const alias = ALIASES[n];
  // Guard: only return an alias that actually resolves to a real problem.
  return alias && PROBLEM_MAP[alias] ? alias : undefined;
}

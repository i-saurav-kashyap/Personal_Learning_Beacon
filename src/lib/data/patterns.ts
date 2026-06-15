import type { Pattern } from "@/lib/types";

// ---------------------------------------------------------------------------
// Pattern taxonomy. Patterns are the heart of the platform: we teach users to
// RECOGNISE the shape of a problem, not just memorise solutions.
// ---------------------------------------------------------------------------

export const PATTERNS: Pattern[] = [
  {
    slug: "hashing",
    name: "Hashing",
    group: "Core",
    icon: "🗂️",
    tagline: "Trade memory for instant lookups.",
    explanation:
      "A hash map (or set) gives you near-O(1) insert and lookup. The pattern shows up whenever you'd otherwise re-scan data to answer 'have I seen X?' or 'how many of X are there?'. You convert a quadratic re-scan into a single linear pass by remembering what you've already encountered.",
    analogy:
      "It's a coat-check at a theatre. Instead of searching the whole cloakroom for your coat, you hand over a ticket number and the attendant retrieves it instantly. The ticket is the hash key.",
    recognition: [
      "The prompt asks 'does a pair/complement exist?'",
      "You catch yourself writing a nested loop just to look something up.",
      "You need frequency counts, grouping, or de-duplication.",
    ],
    traps: [
      "Hash lookups are O(1) *average* — adversarial inputs can degrade to O(n).",
      "Inserting before checking lets an element match itself.",
      "Mutable keys (lists/arrays) can't be hashed in most languages.",
    ],
    template: {
      language: "Python",
      code: `seen = {}
for i, x in enumerate(arr):
    if complement(x) in seen:
        handle(seen[complement(x)], i)
    seen[x] = i`,
    },
    questions: [
      { slug: "two-sum", title: "Two Sum", difficulty: "Easy" },
      { slug: "valid-anagram", title: "Valid Anagram", difficulty: "Easy" },
      { slug: "contains-duplicate", title: "Contains Duplicate", difficulty: "Easy" },
      { slug: "group-anagrams", title: "Group Anagrams", difficulty: "Medium" },
      {
        slug: "longest-substring-without-repeating",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
      },
      {
        slug: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
      },
    ],
  },
  {
    slug: "two-pointers",
    name: "Two Pointers",
    group: "Core",
    icon: "👉",
    tagline: "Two indices sweeping a sorted structure.",
    explanation:
      "Place two indices on a (usually sorted) array and move them toward or away from each other based on a comparison. You collapse an O(n²) pair search into O(n) because each step rules out a whole range of impossible answers.",
    analogy:
      "Tuning an old radio dial with two hands — one nudges the frequency up, the other down — converging on the exact station instead of scanning every frequency.",
    recognition: [
      "The array is sorted (or you can afford to sort it).",
      "You're searching for a pair/triplet meeting a sum or difference condition.",
      "You need to partition or reverse in place.",
    ],
    traps: [
      "Forgetting to skip duplicate values when unique results are required.",
      "Moving the wrong pointer and missing valid answers.",
      "Sorting destroys original indices — track them if you need them.",
    ],
    template: {
      language: "Python",
      code: `l, r = 0, len(arr) - 1
while l < r:
    s = arr[l] + arr[r]
    if s == target: record(); l += 1; r -= 1
    elif s < target: l += 1
    else: r -= 1`,
    },
    questions: [
      { slug: "three-sum", title: "3Sum", difficulty: "Medium" },
      {
        slug: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
      },
      { slug: "valid-palindrome", title: "Valid Palindrome", difficulty: "Easy" },
    ],
  },
  {
    slug: "sliding-window",
    name: "Sliding Window",
    group: "Core",
    icon: "🪟",
    tagline: "A moving sub-range over a sequence.",
    explanation:
      "Maintain a contiguous window [left, right] and slide it across the data. Grow the window on the right; shrink it from the left when a constraint breaks. Each element enters and leaves the window at most once, giving O(n) over what looks like an O(n²) substring problem.",
    analogy:
      "A bus with limited seats driving down a street of passengers. New passengers board at the back; when it's over capacity, people get off the front. The bus never backtracks.",
    recognition: [
      "You want the longest/shortest/最 contiguous subarray or substring meeting a condition.",
      "Keywords: 'contiguous', 'subarray', 'substring', 'at most K', 'exactly K'.",
      "A brute force would re-examine overlapping ranges.",
    ],
    traps: [
      "Confusing fixed-size vs variable-size windows.",
      "Moving `left` backward (it should only ever advance).",
      "Off-by-one in the window length `right - left + 1`.",
    ],
    template: {
      language: "Python",
      code: `left = 0
for right in range(n):
    add(arr[right])
    while invalid():
        remove(arr[left]); left += 1
    best = max(best, right - left + 1)`,
    },
    questions: [
      {
        slug: "best-time-to-buy-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
      },
      {
        slug: "longest-substring-without-repeating",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
      },
    ],
  },
  {
    slug: "fast-slow-pointers",
    name: "Fast & Slow Pointers",
    group: "Core",
    icon: "🐢",
    tagline: "Two speeds to detect cycles and midpoints.",
    explanation:
      "Run one pointer twice as fast as another. The gap between them encodes structure: on a cycle they collide; on a list the fast one reaching the end leaves the slow one at the midpoint. Constant extra space, single pass.",
    analogy:
      "A tortoise and a hare on the same path. On a loop the hare laps the tortoise; on a straight road the hare just reaches the finish first.",
    recognition: [
      "Linked-list cycle detection or finding a cycle's entry.",
      "Finding the middle of a list in one pass.",
      "Detecting cycles in implicit graphs (e.g. 'happy number').",
    ],
    traps: [
      "Null dereference: check both `fast` and `fast.next`.",
      "Comparing node values rather than identity.",
    ],
    template: {
      language: "Python",
      code: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast: return True`,
    },
    questions: [
      { slug: "linked-list-cycle", title: "Linked List Cycle", difficulty: "Easy" },
    ],
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    group: "Core",
    icon: "🎯",
    tagline: "Halve the search space every step.",
    explanation:
      "When data is sorted (or the answer space is monotonic), repeatedly probe the middle and discard half. The deeper interview skill is 'binary search on the answer': guessing a candidate value and checking feasibility, even when no array is explicitly sorted.",
    analogy:
      "The 'guess my number 1–100' game. You always guess the middle and are told higher/lower, halving the possibilities each turn — about 7 guesses for 100 numbers.",
    recognition: [
      "Sorted input and a target/boundary to locate.",
      "Phrases like 'minimum X such that…' or 'maximum capacity that still…'.",
      "A monotonic feasibility check (`true` then `false` past some threshold).",
    ],
    traps: [
      "Overflow in `(lo + hi) / 2` — use `lo + (hi - lo) / 2`.",
      "Infinite loops from updating bounds to `mid` instead of `mid ± 1`.",
      "Inconsistent inclusive/exclusive bounds.",
    ],
    template: {
      language: "Python",
      code: `lo, hi = 0, n - 1
while lo <= hi:
    mid = lo + (hi - lo) // 2
    if ok(mid): hi = mid - 1
    else: lo = mid + 1`,
    },
    questions: [
      { slug: "binary-search", title: "Binary Search", difficulty: "Easy" },
    ],
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    group: "Advanced",
    icon: "🧩",
    tagline: "Solve once, remember, reuse.",
    explanation:
      "DP applies when a problem has overlapping subproblems and optimal substructure. You define a state, write a recurrence relating it to smaller states, then either memoise (top-down) or tabulate (bottom-up) so each state is computed exactly once. Sub-families include Fibonacci-style, knapsack, grid, subsequence, partition and interval DP.",
    analogy:
      "Filling in a crossword where each answer reuses letters already placed. You never re-solve a clue you've solved — you build on the cells already filled.",
    recognition: [
      "'Count the number of ways…' or 'find the min/max cost…'.",
      "A greedy choice gives wrong answers on some cases.",
      "The brute-force recursion recomputes the same arguments repeatedly.",
    ],
    traps: [
      "Choosing a state that doesn't capture everything the recurrence needs.",
      "Wrong iteration order so a cell is read before it's written.",
      "Missing or incorrect base cases.",
    ],
    template: {
      language: "Python",
      code: `dp = [base] * (n + 1)
for i in range(1, n + 1):
    dp[i] = combine(dp[i - 1], dp[i - 2])  # problem-specific
return dp[n]`,
    },
    questions: [
      { slug: "climbing-stairs", title: "Climbing Stairs", difficulty: "Easy" },
      { slug: "maximum-subarray", title: "Maximum Subarray", difficulty: "Medium" },
      { slug: "house-robber", title: "House Robber", difficulty: "Medium" },
      { slug: "coin-change", title: "Coin Change", difficulty: "Medium" },
    ],
  },
  {
    slug: "monotonic-stack",
    name: "Monotonic Stack",
    group: "Core",
    icon: "📚",
    tagline: "A stack that stays sorted to find next-greater elements.",
    explanation:
      "Maintain a stack whose values are always increasing (or decreasing). When a new element violates the order, you pop — and each pop resolves a 'next greater/smaller element' relationship in O(1) amortised. Total work is O(n) despite the inner loop.",
    analogy:
      "People queueing by height for a photo; anyone shorter who can't be seen behind you steps out as you arrive. The line stays neatly ordered.",
    recognition: [
      "'Next greater element', 'previous smaller element', daily temperatures.",
      "Histogram / rectangle area problems.",
      "You need, for each element, the nearest bigger/smaller neighbour.",
    ],
    traps: [
      "Storing values when you actually need indices (or vice-versa).",
      "Picking the wrong monotonic direction for the question.",
    ],
    questions: [],
  },
  {
    slug: "backtracking",
    name: "Backtracking",
    group: "Advanced",
    icon: "🌳",
    tagline: "Explore choices, undo, try the next.",
    explanation:
      "Build a candidate solution incrementally; at each step try a choice, recurse, then undo it before trying the next ('choose → explore → un-choose'). Prune branches that can't lead to a valid answer. This generates permutations, combinations, subsets and constraint-satisfaction solutions.",
    analogy:
      "Walking a maze with a ball of string. At each junction you pick a path; if it dead-ends you reel the string back to the last junction and try another door.",
    recognition: [
      "'Generate all…', 'find every combination/permutation/subset'.",
      "Constraint puzzles: N-Queens, Sudoku, word search.",
      "The solution is a sequence of decisions with backtrack-able state.",
    ],
    traps: [
      "Forgetting to undo state after recursing (the 'un-choose' step).",
      "Weak or missing pruning → exponential blow-up.",
      "Mutating shared state without copying when recording a solution.",
    ],
    questions: [],
  },
  {
    slug: "graphs",
    name: "Graph Traversal",
    group: "Advanced",
    icon: "🕸️",
    tagline: "BFS, DFS and the algorithms built on them.",
    explanation:
      "Most graph problems reduce to a traversal: DFS (recursion/stack) for connectivity, cycles and topological order; BFS (queue) for shortest paths in unweighted graphs. Weighted shortest paths layer a priority queue on top (Dijkstra). Recognising the underlying graph in a grid or dependency list is half the battle.",
    analogy:
      "Exploring a subway map. BFS fans out station-by-station in rings (fewest stops); DFS charges down one line to its end before backtracking.",
    recognition: [
      "Entities with relationships: nodes + edges, grids, dependencies.",
      "'Shortest path', 'connected components', 'detect a cycle', 'order tasks'.",
      "A 2-D grid where you move between adjacent cells.",
    ],
    traps: [
      "Forgetting a visited set → infinite loops.",
      "Using DFS for shortest path in an unweighted graph (use BFS).",
      "Off-by-one neighbour generation in grid problems.",
    ],
    questions: [
      { slug: "number-of-islands", title: "Number of Islands", difficulty: "Medium" },
      { slug: "course-schedule", title: "Course Schedule", difficulty: "Medium" },
    ],
  },
  {
    slug: "stack",
    name: "Stack",
    group: "Core",
    icon: "🥞",
    tagline: "Last in, first out — match the most recent thing.",
    explanation:
      "A stack handles problems where the most recently seen item must be resolved first (LIFO). It shines for matching nested structures (brackets, tags), evaluating expressions, and undo-style processing. You push as you encounter things and pop when the current item resolves the one on top.",
    analogy:
      "A stack of plates. You can only add to or take from the top — the last plate you put down is the first one you pick up.",
    recognition: [
      "Nested or balanced structures: parentheses, tags, expressions.",
      "You need the most recent unresolved item, not the oldest.",
      "Phrases like 'valid', 'balanced', 'evaluate', or 'undo'.",
    ],
    traps: [
      "Forgetting to check the stack is non-empty before popping on a closer.",
      "Skipping the final 'stack must be empty' check, so unclosed openers pass.",
    ],
    template: {
      language: "Python",
      code: `stack = []
for token in tokens:
    if opens(token):
        stack.append(token)
    elif not stack or not matches(stack.pop(), token):
        return False
return not stack`,
    },
    questions: [
      { slug: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy" },
    ],
  },
  {
    slug: "prefix-sum",
    name: "Prefix Sum",
    group: "Core",
    icon: "➕",
    tagline: "Precompute running totals for O(1) range queries.",
    explanation:
      "Precompute cumulative aggregates (sums or products) so any range can be answered by combining two endpoints instead of re-scanning. The prefix/suffix idea also powers 'everything except me' problems by combining a left pass with a right pass.",
    analogy:
      "Mile markers on a highway. To find the distance between two exits you subtract their markers — no need to re-measure the road each time.",
    recognition: [
      "Repeated range-sum / range-aggregate queries over a static array.",
      "'Product/sum of all elements except this one'.",
      "Counting subarrays with a target sum (prefix sum + hash map).",
    ],
    traps: [
      "Off-by-one between inclusive and exclusive prefix indexing.",
      "Integer overflow when sums grow large.",
      "Using division for 'except self' and breaking on zeros.",
    ],
    template: {
      language: "Python",
      code: `prefix = [0]
for x in arr:
    prefix.append(prefix[-1] + x)
# sum of arr[i:j] == prefix[j] - prefix[i]`,
    },
    questions: [
      {
        slug: "product-of-array-except-self",
        title: "Product of Array Except Self",
        difficulty: "Medium",
      },
    ],
  },
  {
    slug: "intervals",
    name: "Intervals",
    group: "Core",
    icon: "📏",
    tagline: "Sort by an endpoint, then sweep.",
    explanation:
      "Interval problems — merging, inserting, counting overlaps, scheduling — almost always start by sorting on the start (or end) point. Once sorted, overlaps become adjacent and a single linear sweep resolves them.",
    analogy:
      "Arranging calendar events on a timeline. Once they're lined up by start time, clashes sit side by side and are easy to spot and combine.",
    recognition: [
      "Inputs are pairs [start, end] (times, ranges, segments).",
      "'Merge', 'overlap', 'meeting rooms', 'insert interval'.",
      "The naive approach compares every pair of ranges.",
    ],
    traps: [
      "Forgetting to sort first, so overlaps aren't adjacent.",
      "Updating the merged end to the new end instead of max(old, new).",
      "Edge cases when intervals merely touch at an endpoint.",
    ],
    template: {
      language: "Python",
      code: `intervals.sort(key=lambda x: x[0])
merged = []
for s, e in intervals:
    if merged and s <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], e)
    else:
        merged.append([s, e])`,
    },
    questions: [
      { slug: "merge-intervals", title: "Merge Intervals", difficulty: "Medium" },
    ],
  },
  {
    slug: "linked-list",
    name: "Linked List",
    group: "Core",
    icon: "🔗",
    tagline: "In-place pointer surgery with a dummy node.",
    explanation:
      "Linked-list problems are about carefully re-wiring `next` pointers without losing the rest of the list. Two staples make them tractable: a dummy head node to avoid special-casing the first element, and always saving the next pointer before you overwrite it.",
    analogy:
      "Re-coupling train carriages. You can detach and reattach couplings one at a time, but you must hold onto the carriage you're about to disconnect or the rest of the train rolls away.",
    recognition: [
      "Reversing, merging, reordering, or removing nodes.",
      "'In place', 'O(1) extra space', or 'do not modify values, only pointers'.",
      "A dummy node would simplify head/edge handling.",
    ],
    traps: [
      "Overwriting `node.next` before saving the original next pointer.",
      "Returning the old head instead of the new one after restructuring.",
      "Null dereferences at the list boundaries.",
    ],
    template: {
      language: "Python",
      code: `dummy = ListNode(0, head)
prev = dummy
while prev.next:
    # inspect / rewire prev.next, then advance
    prev = prev.next
return dummy.next`,
    },
    questions: [
      { slug: "reverse-linked-list", title: "Reverse Linked List", difficulty: "Easy" },
      {
        slug: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
      },
    ],
  },
  {
    slug: "trees",
    name: "Trees (DFS/BFS)",
    group: "Core",
    icon: "🌲",
    tagline: "Recurse on subtrees, or sweep level by level.",
    explanation:
      "Most binary-tree problems fold into a recursive definition: solve the left subtree, solve the right subtree, then combine at the current node. Depth-first recursion handles 'aggregate over the whole tree' questions; breadth-first (a queue) handles 'level by level' questions.",
    analogy:
      "Reporting headcount up a company org chart. Each manager asks their reports for a number and adds their own — the answer bubbles up from the leaves to the CEO.",
    recognition: [
      "Binary tree input with left/right children.",
      "'Depth', 'height', 'path', 'mirror', 'level order', 'diameter'.",
      "The answer at a node depends on answers from its subtrees.",
    ],
    traps: [
      "Missing the null base case in the recursion.",
      "Confusing depth measured in nodes vs edges (off by one).",
      "Deep recursion on a skewed tree — consider an iterative/BFS form.",
    ],
    template: {
      language: "Python",
      code: `def solve(node):
    if not node:
        return base_case
    left = solve(node.left)
    right = solve(node.right)
    return combine(node, left, right)`,
    },
    questions: [
      {
        slug: "maximum-depth-of-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
      },
      { slug: "invert-binary-tree", title: "Invert Binary Tree", difficulty: "Easy" },
    ],
  },
  {
    slug: "heap",
    name: "Heap / Priority Queue",
    group: "Advanced",
    icon: "⛰️",
    tagline: "Always keep the best (or worst) element one pop away.",
    explanation:
      "A heap gives you the minimum or maximum in O(1) and insert/extract in O(log n). It's the go-to for 'top K', 'k-th largest', merging sorted streams, and any time you repeatedly need the current extreme without fully sorting.",
    analogy:
      "A hospital triage queue. Patients aren't served first-come-first-served but by severity — the most urgent is always next, and adding a new patient just slots them into the right priority.",
    recognition: [
      "'Top K', 'k-th largest/smallest', 'k closest'.",
      "Merging k sorted lists or streams.",
      "You repeatedly need the current min/max but don't need a full sort.",
    ],
    traps: [
      "Using a max-heap of everything (O(n log n)) when a size-k heap (O(n log k)) suffices.",
      "Forgetting many languages' heaps are min-heaps — negate keys for a max-heap.",
    ],
    template: {
      language: "Python",
      code: `import heapq
heap = []
for x in stream:
    heapq.heappush(heap, x)
    if len(heap) > k:
        heapq.heappop(heap)   # keep k largest`,
    },
    questions: [
      {
        slug: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
      },
    ],
  },
];

export const PATTERN_MAP: Record<string, Pattern> = Object.fromEntries(
  PATTERNS.map((p) => [p.slug, p]),
);

export function getPattern(slug: string): Pattern | undefined {
  return PATTERN_MAP[slug];
}

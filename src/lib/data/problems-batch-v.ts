import type { Problem } from "@/lib/types";

// Batch V — Heaps / Greedy / Tries / hard Strings (Striver A2Z gaps).
export const PROBLEMS_BATCH_V: Problem[] = [
  {
    slug: "implement-min-heap",
    title: "Implement Min Heap",
    difficulty: "Medium",
    patterns: ["heap"],
    topics: ["Heaps"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement a min-heap supporting `push(x)`, `peek()` (smallest element) and `pop()` (remove & return the smallest), each in O(log n).",
    beginnerExplanation:
      "A heap is a complete binary tree stored in an array where every parent is ≤ its children. Pushing appends to the end then 'bubbles up'; popping swaps the root with the last element, removes it, then 'bubbles down' to restore order.",
    realWorldAnalogy:
      "A hospital triage queue: the most urgent patient is always at the front. New arrivals slot into the right place, and when the top is treated the queue re-orders itself so the next-most-urgent surfaces.",
    visualExplanation:
      "push 5,3,8,1 → array [1,3,8,5]\n        1\n      /   \\\n     3     8\n    /\n   5\npop → returns 1, array becomes [3,5,8]",
    approaches: [
      {
        title: "Sorted list",
        tier: "Brute Force",
        idea: "Keep the list sorted; peek is O(1) but insert is O(n).",
        steps: ["Insert in sorted position", "Smallest is at index 0"],
        time: "O(n) push",
        space: "O(n)",
      },
      {
        title: "Binary heap (array)",
        tier: "Optimal",
        idea: "Store the complete tree in an array; sift up on push, sift down on pop.",
        steps: [
          "Parent of i is (i-1)/2; children are 2i+1, 2i+2",
          "push: append, swap upward while smaller than parent",
          "pop: move last to root, swap downward with smaller child",
        ],
        time: "O(log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "push 4 → [4]\npush 2 → [2,4] (2<4 bubbles up)\npush 6 → [2,4,6]\npop → return 2; move 6 to root [6,4] → sift down → [4,6]",
    interviewTips: [
      "Know the index math cold: parent (i-1)/2, children 2i+1 / 2i+2.",
      "Mention that building a heap from an array is O(n), not O(n log n), via bottom-up heapify.",
    ],
    commonMistakes: [
      "Forgetting to handle the empty-heap case in pop/peek.",
      "Sifting down against the wrong (larger) child.",
    ],
    followUps: ["Turn it into a max-heap.", "Support decrease-key for Dijkstra.", "Build a heap from an array in O(n)."],
    related: ["kth-largest-element-in-an-array", "connect-n-ropes-with-minimum-cost"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class MinHeap:
    def __init__(self):
        self.h = []

    def push(self, x):
        self.h.append(x)
        i = len(self.h) - 1
        while i > 0 and self.h[(i - 1) // 2] > self.h[i]:
            p = (i - 1) // 2
            self.h[p], self.h[i] = self.h[i], self.h[p]
            i = p

    def peek(self):
        return self.h[0] if self.h else None

    def pop(self):
        if not self.h:
            return None
        top = self.h[0]
        last = self.h.pop()
        if self.h:
            self.h[0] = last
            i, n = 0, len(self.h)
            while True:
                l, r, sm = 2 * i + 1, 2 * i + 2, i
                if l < n and self.h[l] < self.h[sm]: sm = l
                if r < n and self.h[r] < self.h[sm]: sm = r
                if sm == i: break
                self.h[i], self.h[sm] = self.h[sm], self.h[i]
                i = sm
        return top`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class MinHeap {
    private List<Integer> h = new ArrayList<>();

    public void push(int x) {
        h.add(x);
        int i = h.size() - 1;
        while (i > 0 && h.get((i - 1) / 2) > h.get(i)) {
            int p = (i - 1) / 2;
            Collections.swap(h, p, i);
            i = p;
        }
    }

    public Integer peek() { return h.isEmpty() ? null : h.get(0); }

    public Integer pop() {
        if (h.isEmpty()) return null;
        int top = h.get(0), last = h.remove(h.size() - 1);
        if (!h.isEmpty()) {
            h.set(0, last);
            int i = 0, n = h.size();
            while (true) {
                int l = 2 * i + 1, r = 2 * i + 2, sm = i;
                if (l < n && h.get(l) < h.get(sm)) sm = l;
                if (r < n && h.get(r) < h.get(sm)) sm = r;
                if (sm == i) break;
                Collections.swap(h, i, sm);
                i = sm;
            }
        }
        return top;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class MinHeap {
  constructor() { this.h = []; }
  push(x) {
    this.h.push(x);
    let i = this.h.length - 1;
    while (i > 0 && this.h[(i - 1) >> 1] > this.h[i]) {
      const p = (i - 1) >> 1;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  peek() { return this.h.length ? this.h[0] : null; }
  pop() {
    if (!this.h.length) return null;
    const top = this.h[0], last = this.h.pop();
    if (this.h.length) {
      this.h[0] = last;
      let i = 0; const n = this.h.length;
      while (true) {
        let l = 2 * i + 1, r = 2 * i + 2, sm = i;
        if (l < n && this.h[l] < this.h[sm]) sm = l;
        if (r < n && this.h[r] < this.h[sm]) sm = r;
        if (sm === i) break;
        [this.h[i], this.h[sm]] = [this.h[sm], this.h[i]];
        i = sm;
      }
    }
    return top;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class MinHeap {
    private List<Integer> h = new List<Integer>();

    public void push(Integer x) {
        h.add(x);
        Integer i = h.size() - 1;
        while (i > 0 && h[(i - 1) / 2] > h[i]) {
            Integer p = (i - 1) / 2;
            Integer t = h[p]; h[p] = h[i]; h[i] = t;
            i = p;
        }
    }

    public Integer peek() { return h.isEmpty() ? null : h[0]; }

    public Integer pop() {
        if (h.isEmpty()) return null;
        Integer top = h[0];
        Integer last = h.remove(h.size() - 1);
        if (!h.isEmpty()) {
            h[0] = last;
            Integer i = 0, n = h.size();
            while (true) {
                Integer l = 2 * i + 1, r = 2 * i + 2, sm = i;
                if (l < n && h[l] < h[sm]) sm = l;
                if (r < n && h[r] < h[sm]) sm = r;
                if (sm == i) break;
                Integer t = h[i]; h[i] = h[sm]; h[sm] = t;
                i = sm;
            }
        }
        return top;
    }
}`,
      },
    ],
  },
  {
    slug: "connect-n-ropes-with-minimum-cost",
    title: "Connect N Ropes with Minimum Cost",
    difficulty: "Medium",
    patterns: ["heap", "greedy"],
    topics: ["Heaps", "Greedy"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given `n` ropes of given lengths, connect them into one rope. The cost to connect two ropes equals the sum of their lengths. Return the minimum total cost to connect all ropes.",
    beginnerExplanation:
      "Always join the two shortest ropes available — because every length you join gets re-counted in every future join, so you want small lengths to be added early and often. A min-heap keeps the two smallest at your fingertips.",
    realWorldAnalogy:
      "Like Huffman coding: the cheapest way to merge is to repeatedly combine the two smallest piles, so heavy piles get touched the fewest times.",
    visualExplanation:
      "ropes [4,3,2,6]\njoin 2+3=5 (cost 5) → [4,5,6]\njoin 4+5=9 (cost 9) → [9,6]\njoin 6+9=15 (cost 15) → total 5+9+15 = 29",
    approaches: [
      {
        title: "Join in given order",
        tier: "Brute Force",
        idea: "Connecting arbitrarily (or largest-first) overcounts big lengths — not minimal.",
        steps: ["Any non-greedy order", "Produces a higher total"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Min-heap, always merge two smallest",
        tier: "Optimal",
        idea: "Pop the two smallest, add their sum to the cost, push the sum back; repeat until one rope remains.",
        steps: [
          "Heapify all lengths",
          "While >1 element: a=pop, b=pop, cost+=a+b, push(a+b)",
          "Return cost",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "[1,2,5,10,35,89,...] → repeatedly merge two smallest; each merged sum re-enters the heap and is eligible to merge again.",
    interviewTips: [
      "Name the Huffman connection — it signals you see the optimal-merge structure.",
      "A max-heap or sorting once is wrong; you must re-insert each merged sum.",
    ],
    commonMistakes: [
      "Sorting once and summing adjacent pairs — you must re-heapify the merged value.",
      "Integer overflow on large totals (use 64-bit).",
    ],
    followUps: ["What if connecting has a different cost function?", "Huffman encoding tree reconstruction."],
    related: ["implement-min-heap", "task-scheduler"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def min_cost_connect_ropes(ropes):
    if len(ropes) <= 1:
        return 0
    heapq.heapify(ropes)
    cost = 0
    while len(ropes) > 1:
        a = heapq.heappop(ropes)
        b = heapq.heappop(ropes)
        cost += a + b
        heapq.heappush(ropes, a + b)
    return cost`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public long minCost(int[] ropes) {
        if (ropes.length <= 1) return 0;
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int r : ropes) pq.add((long) r);
        long cost = 0;
        while (pq.size() > 1) {
            long s = pq.poll() + pq.poll();
            cost += s;
            pq.add(s);
        }
        return cost;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// Sorted-array stand-in for a min-heap (clear; optimal would use a binary heap).
function minCostConnectRopes(ropes) {
  if (ropes.length <= 1) return 0;
  const h = [...ropes].sort((a, b) => a - b);
  let cost = 0;
  while (h.length > 1) {
    const s = h.shift() + h.shift();
    cost += s;
    let lo = 0, hi = h.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (h[m] < s) lo = m + 1; else hi = m; }
    h.splice(lo, 0, s);
  }
  return cost;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Apex has no PriorityQueue; keep a sorted List and binary-insert each merge.
    public static Long minCost(List<Integer> ropes) {
        if (ropes.size() <= 1) return 0;
        List<Long> h = new List<Long>();
        for (Integer r : ropes) h.add((Long) r);
        h.sort();
        Long cost = 0;
        while (h.size() > 1) {
            Long s = h.remove(0) + h.remove(0);
            cost += s;
            Integer lo = 0, hi = h.size();
            while (lo < hi) {
                Integer m = (lo + hi) / 2;
                if (h[m] < s) lo = m + 1; else hi = m;
            }
            h.add(lo, s);
        }
        return cost;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-sum-combinations",
    title: "Maximum Sum Combinations",
    difficulty: "Medium",
    patterns: ["heap"],
    topics: ["Heaps"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given two integer arrays `A` and `B` of size N and an integer `K`, return the K largest values of `A[i] + B[j]` (one element from each array), in descending order.",
    beginnerExplanation:
      "Sort both arrays descending. The very largest sum is A[0]+B[0]. The next candidates are A[1]+B[0] and A[0]+B[1]. Use a max-heap to always expand the current best, tracking visited (i,j) pairs so you don't double-count.",
    realWorldAnalogy:
      "Picking the K best pairings at a dance: start with the two top-ranked partners, then explore the next-best swaps outward, never revisiting a pairing you've already considered.",
    visualExplanation:
      "A=[3,2], B=[1,4] → desc A=[3,2] B=[4,1]\nbest (0,0)=7 → expand (1,0)=6,(0,1)=4\npop 6 → expand (1,1)=3 ... K=2 → [7,6]",
    approaches: [
      {
        title: "All pairs, sort",
        tier: "Brute Force",
        idea: "Compute all N² sums, sort, take top K.",
        steps: ["Form every A[i]+B[j]", "Sort descending", "Take first K"],
        time: "O(n² log n)",
        space: "O(n²)",
      },
      {
        title: "Max-heap of frontier + visited set",
        tier: "Optimal",
        idea: "Sort both desc; push (A[0]+B[0],0,0); pop K times, each time pushing (i+1,j) and (i,j+1) if unseen.",
        steps: [
          "Sort A, B descending",
          "Seed heap with the top pair and a visited set",
          "Pop max K times, expanding right/down neighbours",
        ],
        time: "O(K log K)",
        space: "O(K)",
      },
    ],
    dryRun:
      "A=[1,4,2,3] B=[2,5,1,6] → desc A=[4,3,2,1] B=[6,5,2,1]\n(0,0)=10 → (1,0)=9,(0,1)=9 → next 9, etc.",
    interviewTips: [
      "Sorting descending plus a visited set is the standard 'k-th largest pair sum' technique.",
      "Encode (i,j) compactly (i*n+j) for the visited set to avoid string keys.",
    ],
    commonMistakes: [
      "Re-adding the same (i,j) and over-counting — always mark visited before pushing.",
      "Forgetting to sort both arrays first.",
    ],
    followUps: ["K smallest sums.", "K-th smallest sum in a sorted matrix.", "Sum of K elements (one per array of M arrays)."],
    related: ["implement-min-heap", "k-closest-points-to-origin"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def max_sum_combinations(A, B, K):
    A.sort(reverse=True)
    B.sort(reverse=True)
    n = len(A)
    res = []
    heap = [(-(A[0] + B[0]), 0, 0)]
    seen = {(0, 0)}
    while heap and len(res) < K:
        s, i, j = heapq.heappop(heap)
        res.append(-s)
        if i + 1 < n and (i + 1, j) not in seen:
            seen.add((i + 1, j))
            heapq.heappush(heap, (-(A[i + 1] + B[j]), i + 1, j))
        if j + 1 < n and (i, j + 1) not in seen:
            seen.add((i, j + 1))
            heapq.heappush(heap, (-(A[i] + B[j + 1]), i, j + 1))
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> maxSumCombinations(int[] A, int[] B, int K) {
        Arrays.sort(A); Arrays.sort(B);
        int n = A.length;
        // sort descending by reversing indices
        PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> y[0] - x[0]);
        Set<Long> seen = new HashSet<>();
        pq.add(new int[] { A[n - 1] + B[n - 1], n - 1, n - 1 });
        seen.add((long) (n - 1) * n + (n - 1));
        List<Integer> res = new ArrayList<>();
        while (!pq.isEmpty() && res.size() < K) {
            int[] cur = pq.poll();
            res.add(cur[0]);
            int i = cur[1], j = cur[2];
            if (i - 1 >= 0 && seen.add((long) (i - 1) * n + j))
                pq.add(new int[] { A[i - 1] + B[j], i - 1, j });
            if (j - 1 >= 0 && seen.add((long) i * n + (j - 1)))
                pq.add(new int[] { A[i] + B[j - 1], i, j - 1 });
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// Frontier expanded with a max-pick over a small candidate list (clear stand-in
// for a max-heap).
function maxSumCombinations(A, B, K) {
  A = [...A].sort((a, b) => b - a);
  B = [...B].sort((a, b) => b - a);
  const n = A.length;
  const seen = new Set([0]);
  let frontier = [[A[0] + B[0], 0, 0]];
  const res = [];
  while (frontier.length && res.length < K) {
    let best = 0;
    for (let k = 1; k < frontier.length; k++) if (frontier[k][0] > frontier[best][0]) best = k;
    const [s, i, j] = frontier.splice(best, 1)[0];
    res.push(s);
    for (const [ni, nj] of [[i + 1, j], [i, j + 1]]) {
      if (ni < n && nj < n && !seen.has(ni * n + nj)) {
        seen.add(ni * n + nj);
        frontier.push([A[ni] + B[nj], ni, nj]);
      }
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> maxSumCombinations(List<Integer> A, List<Integer> B, Integer K) {
        A.sort(); B.sort();
        Integer n = A.size();
        // use descending access via (n-1-idx)
        Set<Long> seen = new Set<Long>{ 0L };
        List<List<Integer>> frontier = new List<List<Integer>>();
        frontier.add(new List<Integer>{ A[n - 1] + B[n - 1], 0, 0 });
        List<Integer> res = new List<Integer>();
        while (!frontier.isEmpty() && res.size() < K) {
            Integer best = 0;
            for (Integer k = 1; k < frontier.size(); k++)
                if (frontier[k][0] > frontier[best][0]) best = k;
            List<Integer> cur = frontier.remove(best);
            res.add(cur[0]);
            Integer i = cur[1], j = cur[2];
            for (List<Integer> nb : new List<List<Integer>>{ new List<Integer>{ i + 1, j }, new List<Integer>{ i, j + 1 } }) {
                Integer ni = nb[0], nj = nb[1];
                Long key = (Long) ni * n + nj;
                if (ni < n && nj < n && !seen.contains(key)) {
                    seen.add(key);
                    frontier.add(new List<Integer>{ A[n - 1 - ni] + B[n - 1 - nj], ni, nj });
                }
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "assign-cookies",
    title: "Assign Cookies",
    difficulty: "Easy",
    patterns: ["greedy", "two-pointers"],
    topics: ["Greedy"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Each child i has a greed factor g[i] (the minimum cookie size that content them) and each cookie j has size s[j]. Each child gets at most one cookie. Maximise the number of content children.",
    beginnerExplanation:
      "Sort both. Hand the smallest cookie that can satisfy the least-greedy remaining child — never 'waste' a big cookie on a child a small one would have pleased. A two-pointer sweep does exactly this.",
    realWorldAnalogy:
      "Seating people by patience: give the next free table to the least-picky person it can satisfy, saving bigger tables for pickier guests.",
    visualExplanation: "g=[1,2,3] s=[1,1] → child(1) takes cookie(1); child(2) no cookie left → 1 content child",
    approaches: [
      {
        title: "Try all assignments",
        tier: "Brute Force",
        idea: "Bipartite matching of children to cookies.",
        steps: ["Match each child to any unused cookie ≥ greed"],
        time: "O(n·m)",
        space: "O(n)",
      },
      {
        title: "Sort both + two pointers",
        tier: "Optimal",
        idea: "Advance the cookie pointer always; advance the child pointer only when the cookie satisfies it.",
        steps: ["Sort g and s ascending", "For each cookie, if it satisfies the current child, content them"],
        time: "O(n log n)",
        space: "O(1)",
      },
    ],
    dryRun: "g=[1,2] s=[1,2,3]\nj=0 s=1≥g=1 → child++ (1)\nj=1 s=2≥g=2 → child++ (2) → 2",
    interviewTips: ["Greedy exchange argument: a smaller cookie can only ever serve a less-greedy child, so use it there."],
    commonMistakes: ["Sorting only one array.", "Advancing the child pointer even when the cookie is too small."],
    followUps: ["Each child may get multiple cookies summing to greed.", "Maximise total satisfaction instead of count."],
    related: ["fractional-knapsack"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_content_children(g, s):
    g.sort()
    s.sort()
    i = j = 0
    while i < len(g) and j < len(s):
        if s[j] >= g[i]:
            i += 1
        j += 1
    return i`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g); Arrays.sort(s);
        int i = 0, j = 0;
        while (i < g.length && j < s.length) {
            if (s[j] >= g[i]) i++;
            j++;
        }
        return i;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0, j = 0;
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) i++;
    j++;
  }
  return i;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findContentChildren(List<Integer> g, List<Integer> s) {
        g.sort(); s.sort();
        Integer i = 0, j = 0;
        while (i < g.size() && j < s.size()) {
            if (s[j] >= g[i]) i++;
            j++;
        }
        return i;
    }
}`,
      },
    ],
  },
  {
    slug: "fractional-knapsack",
    title: "Fractional Knapsack",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Greedy"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given items with (value, weight) and a knapsack capacity W, maximise the total value you can carry. You may take fractions of an item.",
    beginnerExplanation:
      "Because you can take fractions, the greedy choice is provably optimal: sort items by value-per-unit-weight (density) descending and keep filling — take whole items until one doesn't fit, then take the fraction that fits.",
    realWorldAnalogy:
      "Filling a tank with liquids of different prices per litre — pour the most valuable liquid first until you run out of room, topping off with a partial pour.",
    visualExplanation:
      "W=50, items (v,w)=(60,10),(100,20),(120,30) → densities 6,5,4\ntake 10 (60) + 20 (100) → 30 used; 20 left of item3 → 20/30*120=80 → 240",
    approaches: [
      {
        title: "Try subsets (0/1 thinking)",
        tier: "Brute Force",
        idea: "Without fractions this is NP-style; here fractions make greedy optimal.",
        steps: ["Enumerate choices"],
        time: "exponential",
        space: "O(n)",
      },
      {
        title: "Sort by value/weight density",
        tier: "Optimal",
        idea: "Take highest-density items first; take a fraction of the first item that overflows.",
        steps: ["Sort by value/weight desc", "Greedily fill; add fractional value of the last item"],
        time: "O(n log n)",
        space: "O(1)",
      },
    ],
    dryRun: "cap 10, items (100,20)d5 (60,10)d6 → take (60,10) fully → cap 0 → 60",
    interviewTips: ["State why greedy is optimal HERE (fractions) but not for 0/1 knapsack (no fractions → DP)."],
    commonMistakes: ["Sorting by value or weight instead of the ratio.", "Forgetting the final fractional take."],
    followUps: ["0/1 Knapsack (→ DP).", "Bounded counts per item."],
    related: ["assign-cookies", "job-sequencing-problem"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def fractional_knapsack(W, items):
    # items: list of (value, weight)
    items.sort(key=lambda it: it[0] / it[1], reverse=True)
    total = 0.0
    for v, w in items:
        if W >= w:
            total += v
            W -= w
        else:
            total += v * (W / w)
            break
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    // items[i] = {value, weight}
    public double fractionalKnapsack(int W, int[][] items) {
        Arrays.sort(items, (a, b) ->
            Double.compare((double) b[0] / b[1], (double) a[0] / a[1]));
        double total = 0;
        for (int[] it : items) {
            if (W >= it[1]) { total += it[0]; W -= it[1]; }
            else { total += (double) it[0] * W / it[1]; break; }
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function fractionalKnapsack(W, items) {
  // items: [value, weight]
  items.sort((a, b) => b[0] / b[1] - a[0] / a[1]);
  let total = 0;
  for (const [v, w] of items) {
    if (W >= w) { total += v; W -= w; }
    else { total += (v * W) / w; break; }
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // items[i] = {value, weight}; Apex sort on a derived ratio via selection.
    public static Double fractionalKnapsack(Integer W, List<List<Integer>> items) {
        // selection sort by descending value/weight
        for (Integer i = 0; i < items.size(); i++) {
            Integer best = i;
            for (Integer j = i + 1; j < items.size(); j++) {
                Double rj = (Double) items[j][0] / items[j][1];
                Double rb = (Double) items[best][0] / items[best][1];
                if (rj > rb) best = j;
            }
            List<Integer> t = items[i]; items[i] = items[best]; items[best] = t;
        }
        Double total = 0;
        for (List<Integer> it : items) {
            if (W >= it[1]) { total += it[0]; W -= it[1]; }
            else { total += (Double) it[0] * W / it[1]; break; }
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "lemonade-change",
    title: "Lemonade Change",
    difficulty: "Easy",
    patterns: ["greedy"],
    topics: ["Greedy"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Each lemonade costs $5. Customers pay with $5, $10 or $20 bills (in order given). Return true if you can give every customer correct change, starting with no money.",
    beginnerExplanation:
      "Track how many $5 and $10 bills you hold. For a $20 you'd rather give back a $10+$5 than three $5s — hold onto $5s because they're the only bill that makes change for a $10.",
    realWorldAnalogy:
      "A cash drawer: small bills are precious because they're the only way to break larger ones, so spend big bills as change first.",
    visualExplanation:
      "[5,5,10,20] → +5; +5; 10→give 5 (have one 5,one 10); 20→give 10+5 → true",
    approaches: [
      {
        title: "Simulate with greedy change",
        tier: "Optimal",
        idea: "Prefer giving a $10 over two $5s when making change for a $20.",
        steps: [
          "$5: keep it",
          "$10: need a $5",
          "$20: prefer 10+5, else 5+5+5",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[5,5,5,10,20]: fives 1,2,3 → 10: fives 2,tens1 → 20: ten1+five → fives1,tens0 → true",
    interviewTips: ["The only non-obvious step is preferring 10+5 over 5+5+5 for a $20 — explain why ($5s are scarce)."],
    commonMistakes: ["Giving three $5s when a $10 is available, then failing a later $10 customer."],
    followUps: ["Arbitrary denominations.", "Minimise leftover small bills."],
    related: ["assign-cookies"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def lemonade_change(bills):
    five = ten = 0
    for b in bills:
        if b == 5:
            five += 1
        elif b == 10:
            if five == 0:
                return False
            five -= 1
            ten += 1
        else:  # 20
            if ten > 0 and five > 0:
                ten -= 1
                five -= 1
            elif five >= 3:
                five -= 3
            else:
                return False
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) five++;
            else if (b == 10) { if (five == 0) return false; five--; ten++; }
            else {
                if (ten > 0 && five > 0) { ten--; five--; }
                else if (five >= 3) five -= 3;
                else return false;
            }
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lemonadeChange(bills) {
  let five = 0, ten = 0;
  for (const b of bills) {
    if (b === 5) five++;
    else if (b === 10) { if (five === 0) return false; five--; ten++; }
    else {
      if (ten > 0 && five > 0) { ten--; five--; }
      else if (five >= 3) five -= 3;
      else return false;
    }
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean lemonadeChange(List<Integer> bills) {
        Integer five = 0, ten = 0;
        for (Integer b : bills) {
            if (b == 5) five++;
            else if (b == 10) { if (five == 0) return false; five--; ten++; }
            else {
                if (ten > 0 && five > 0) { ten--; five--; }
                else if (five >= 3) five -= 3;
                else return false;
            }
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "n-meetings-in-one-room",
    title: "N Meetings in One Room",
    difficulty: "Easy",
    patterns: ["greedy", "intervals"],
    topics: ["Greedy", "Intervals"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given start[] and end[] times of N meetings for a single room, return the maximum number of meetings that can be held without overlap.",
    beginnerExplanation:
      "Classic activity selection: always pick the meeting that finishes earliest among those that can still start. Finishing early leaves the most room for future meetings.",
    realWorldAnalogy:
      "Booking a single conference room for the day — greedily accept the talk that ends soonest, freeing the room earliest for the next.",
    visualExplanation:
      "starts [1,3,0,5,8,5] ends [2,4,6,7,9,9] → sort by end → pick (1,2),(3,4),(5,7),(8,9) → 4",
    approaches: [
      {
        title: "Try all orderings",
        tier: "Brute Force",
        idea: "Exponential subset search of compatible meetings.",
        steps: ["Enumerate subsets of non-overlapping meetings"],
        time: "exponential",
        space: "O(n)",
      },
      {
        title: "Sort by end time (activity selection)",
        tier: "Optimal",
        idea: "Sort by finish time; greedily take a meeting if it starts after the last selected one ends.",
        steps: ["Pair (start,end), sort by end", "Track lastEnd; count meetings with start > lastEnd"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "sorted ends → take e=2 (last=2); next start 3>2 take e=4; 5>4 take e=7; 8>7 take e=9 → 4",
    interviewTips: ["Sorting by END time is the key — sorting by start or duration gives wrong answers."],
    commonMistakes: ["Sorting by start time.", "Using >= vs > inconsistently with the overlap definition."],
    followUps: ["Return which meetings.", "Multiple rooms (→ Minimum Platforms / Meeting Rooms II)."],
    related: ["minimum-platforms", "non-overlapping-intervals"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_meetings(start, end):
    meetings = sorted(zip(start, end), key=lambda x: x[1])
    count = 0
    last_end = float("-inf")
    for s, e in meetings:
        if s > last_end:
            count += 1
            last_end = e
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int maxMeetings(int[] start, int[] end) {
        int n = start.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> end[a] - end[b]);
        int count = 0, lastEnd = Integer.MIN_VALUE;
        for (int i : idx) {
            if (start[i] > lastEnd) { count++; lastEnd = end[i]; }
        }
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxMeetings(start, end) {
  const m = start.map((s, i) => [s, end[i]]).sort((a, b) => a[1] - b[1]);
  let count = 0, lastEnd = -Infinity;
  for (const [s, e] of m) {
    if (s > lastEnd) { count++; lastEnd = e; }
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxMeetings(List<Integer> startT, List<Integer> endT) {
        Integer n = startT.size();
        List<Integer> idx = new List<Integer>();
        for (Integer i = 0; i < n; i++) idx.add(i);
        // selection sort indices by end time
        for (Integer i = 0; i < n; i++) {
            Integer best = i;
            for (Integer j = i + 1; j < n; j++)
                if (endT[idx[j]] < endT[idx[best]]) best = j;
            Integer t = idx[i]; idx[i] = idx[best]; idx[best] = t;
        }
        Integer count = 0, lastEnd = -2147483648;
        for (Integer i : idx) {
            if (startT[i] > lastEnd) { count++; lastEnd = endT[i]; }
        }
        return count;
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-platforms",
    title: "Minimum Platforms",
    difficulty: "Medium",
    patterns: ["greedy", "two-pointers"],
    topics: ["Greedy", "Intervals"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given arrival[] and departure[] times of trains at a station, find the minimum number of platforms needed so that no train waits.",
    beginnerExplanation:
      "The answer is the maximum number of trains present at the same time. Sort arrivals and departures separately and sweep with two pointers: a new arrival before the next departure needs another platform.",
    realWorldAnalogy:
      "Counting how many cars are in a parking lot at peak — track entries and exits over time; the busiest moment is how many spots you need.",
    visualExplanation:
      "arr [9,9.4,9.5] dep [9.1,12,11] → sort; sweep: at 9 +1, 9.4 +1, 9.5 +1 (3) then departures release → peak 3",
    approaches: [
      {
        title: "Count overlaps per train",
        tier: "Brute Force",
        idea: "For each train, count how many others overlap it.",
        steps: ["Compare every pair of intervals"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Sort + two-pointer sweep",
        tier: "Optimal",
        idea: "Sort arrivals and departures; if next arrival ≤ next departure, need a platform, else free one.",
        steps: [
          "Sort arr[] and dep[]",
          "If arr[i] <= dep[j]: platforms++, i++, track max; else platforms--, j++",
        ],
        time: "O(n log n)",
        space: "O(1)",
      },
    ],
    dryRun: "arr[900,940,950,1100,1500,1800] dep[910,1200,1120,1130,1900,2000] → peak 3 platforms",
    interviewTips: ["Use <= when an arrival coincides with a departure if the platform can't be reused instantly."],
    commonMistakes: ["Pairing arr[i] with dep[i] (wrong — sort independently).", "Off-by-one in the overlap comparison."],
    followUps: ["Return the time window of peak demand.", "Meeting Rooms II is the same problem."],
    related: ["n-meetings-in-one-room", "non-overlapping-intervals"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_platforms(arr, dep):
    arr.sort()
    dep.sort()
    n = len(arr)
    i = j = 0
    platforms = res = 0
    while i < n:
        if arr[i] <= dep[j]:
            platforms += 1
            i += 1
            res = max(res, platforms)
        else:
            platforms -= 1
            j += 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int minPlatforms(int[] arr, int[] dep) {
        Arrays.sort(arr); Arrays.sort(dep);
        int n = arr.length, i = 0, j = 0, platforms = 0, res = 0;
        while (i < n) {
            if (arr[i] <= dep[j]) { platforms++; i++; res = Math.max(res, platforms); }
            else { platforms--; j++; }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minPlatforms(arr, dep) {
  arr.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);
  const n = arr.length;
  let i = 0, j = 0, platforms = 0, res = 0;
  while (i < n) {
    if (arr[i] <= dep[j]) { platforms++; i++; res = Math.max(res, platforms); }
    else { platforms--; j++; }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minPlatforms(List<Integer> arr, List<Integer> dep) {
        arr.sort(); dep.sort();
        Integer n = arr.size(), i = 0, j = 0, platforms = 0, res = 0;
        while (i < n) {
            if (arr[i] <= dep[j]) { platforms++; i++; res = Math.max(res, platforms); }
            else { platforms--; j++; }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "job-sequencing-problem",
    title: "Job Sequencing Problem",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Greedy"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Each job has a deadline and a profit, and takes one unit of time. Only one job runs per time slot. Maximise total profit (and count of jobs done) by scheduling jobs before their deadlines.",
    beginnerExplanation:
      "Sort jobs by profit descending. For each job, place it in the latest still-free slot at or before its deadline — saving earlier slots for other jobs. A boolean slot array (or DSU) tracks free slots.",
    realWorldAnalogy:
      "Booking the most lucrative gigs first, each into the last open day before its deadline so earlier days stay available for other gigs.",
    visualExplanation:
      "jobs (deadline,profit): (2,100),(1,19),(2,27),(1,25),(3,15) → sort by profit → place 100@slot2, 27@slot1, 15@slot3 → profit 142, 3 jobs",
    approaches: [
      {
        title: "Try every ordering",
        tier: "Brute Force",
        idea: "Permute jobs and simulate.",
        steps: ["Check all permutations for feasibility"],
        time: "O(n!)",
        space: "O(n)",
      },
      {
        title: "Sort by profit + latest-free-slot",
        tier: "Optimal",
        idea: "Greedily take high-profit jobs, each in the latest free slot ≤ its deadline.",
        steps: [
          "Sort jobs by profit descending",
          "For each job, scan from min(maxDeadline, deadline) down to 1 for a free slot",
          "If found, occupy it and add profit",
        ],
        time: "O(n·d) (or O(n log n) with DSU)",
        space: "O(d)",
      },
    ],
    dryRun: "(2,100)→slot2; (2,27)→slot1; (1,19)→slot1 taken→skip; (1,25)→slot1 taken→skip; (3,15)→slot3 → 142",
    interviewTips: ["Mention the union-find optimisation that finds the next free slot in near-O(1)."],
    commonMistakes: ["Scanning slots upward instead of downward.", "Forgetting deadlines are 1-indexed time units."],
    followUps: ["Jobs with arbitrary durations.", "Weighted interval scheduling (→ DP)."],
    related: ["fractional-knapsack", "n-meetings-in-one-room"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def job_sequencing(jobs):
    # jobs: list of (deadline, profit)
    jobs.sort(key=lambda x: x[1], reverse=True)
    max_d = max(d for d, _ in jobs)
    slot = [False] * (max_d + 1)
    count = profit = 0
    for d, p in jobs:
        t = min(max_d, d)
        while t > 0 and slot[t]:
            t -= 1
        if t > 0:
            slot[t] = True
            count += 1
            profit += p
    return (count, profit)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    // jobs[i] = {deadline, profit}; returns {count, profit}
    public int[] jobSequencing(int[][] jobs) {
        Arrays.sort(jobs, (a, b) -> b[1] - a[1]);
        int maxD = 0;
        for (int[] j : jobs) maxD = Math.max(maxD, j[0]);
        boolean[] slot = new boolean[maxD + 1];
        int count = 0, profit = 0;
        for (int[] j : jobs) {
            for (int t = Math.min(maxD, j[0]); t > 0; t--) {
                if (!slot[t]) { slot[t] = true; count++; profit += j[1]; break; }
            }
        }
        return new int[] { count, profit };
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// jobs: [deadline, profit] → [count, profit]
function jobSequencing(jobs) {
  jobs.sort((a, b) => b[1] - a[1]);
  const maxD = Math.max(...jobs.map((j) => j[0]));
  const slot = new Array(maxD + 1).fill(false);
  let count = 0, profit = 0;
  for (const [d, p] of jobs) {
    for (let t = Math.min(maxD, d); t > 0; t--) {
      if (!slot[t]) { slot[t] = true; count++; profit += p; break; }
    }
  }
  return [count, profit];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // jobs[i] = {deadline, profit}; returns {count, profit}
    public static List<Integer> jobSequencing(List<List<Integer>> jobs) {
        // selection sort by descending profit
        for (Integer i = 0; i < jobs.size(); i++) {
            Integer best = i;
            for (Integer j = i + 1; j < jobs.size(); j++)
                if (jobs[j][1] > jobs[best][1]) best = j;
            List<Integer> t = jobs[i]; jobs[i] = jobs[best]; jobs[best] = t;
        }
        Integer maxD = 0;
        for (List<Integer> j : jobs) maxD = Math.max(maxD, j[0]);
        Boolean[] slot = new Boolean[maxD + 1];
        for (Integer i = 0; i <= maxD; i++) slot[i] = false;
        Integer count = 0, profit = 0;
        for (List<Integer> j : jobs) {
            for (Integer t = Math.min(maxD, j[0]); t > 0; t--) {
                if (!slot[t]) { slot[t] = true; count++; profit += j[1]; break; }
            }
        }
        return new List<Integer>{ count, profit };
    }
}`,
      },
    ],
  },
  {
    slug: "candy",
    title: "Candy",
    difficulty: "Hard",
    patterns: ["greedy"],
    topics: ["Greedy"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Children stand in a line, each with a rating. Give each at least one candy, and any child must get more candies than an immediate neighbour with a lower rating. Return the minimum total candies.",
    beginnerExplanation:
      "Do two sweeps. Left→right guarantees the 'higher than left neighbour' rule; right→left guarantees the 'higher than right neighbour' rule. Take the max of the two requirements at each child so both rules hold with the fewest candies.",
    realWorldAnalogy:
      "Grading on a curve where you must out-reward any lower-scoring neighbour — you check the constraint from both sides and give the larger of the two minimums.",
    visualExplanation:
      "ratings [1,0,2]\nL→R candies [1,1,2]\nR→L candies [2,1,1]\nmax → [2,1,2] → total 5",
    approaches: [
      {
        title: "Repeated relaxation",
        tier: "Brute Force",
        idea: "Keep sweeping bumping violators until stable.",
        steps: ["Loop until no child violates a neighbour rule"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "Two passes (left then right)",
        tier: "Optimal",
        idea: "Left pass enforces left-neighbour rule; right pass enforces right; combine with max.",
        steps: [
          "candies all 1",
          "i L→R: if r[i]>r[i-1], c[i]=c[i-1]+1",
          "i R→L: if r[i]>r[i+1], c[i]=max(c[i], c[i+1]+1)",
          "sum",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "ratings [1,2,2]\nL→R [1,2,1]\nR→L unchanged\nmax → [1,2,1] → 4",
    interviewTips: ["The two-pass max trick generalises to any 'must beat both neighbours' constraint.", "There's an O(1)-space slope-counting variant — mention it for bonus points."],
    commonMistakes: ["Doing only one pass.", "Using > vs >= incorrectly for equal ratings (equal neighbours have no constraint)."],
    followUps: ["O(1) extra space via up/down slope counting.", "Circular line of children."],
    related: ["assign-cookies"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def candy(ratings):
    n = len(ratings)
    c = [1] * n
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            c[i] = c[i - 1] + 1
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            c[i] = max(c[i], c[i + 1] + 1)
    return sum(c)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] c = new int[n];
        Arrays.fill(c, 1);
        for (int i = 1; i < n; i++)
            if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
        for (int i = n - 2; i >= 0; i--)
            if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
        int total = 0;
        for (int x : c) total += x;
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function candy(ratings) {
  const n = ratings.length;
  const c = new Array(n).fill(1);
  for (let i = 1; i < n; i++)
    if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
  for (let i = n - 2; i >= 0; i--)
    if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
  return c.reduce((a, b) => a + b, 0);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer candy(List<Integer> ratings) {
        Integer n = ratings.size();
        List<Integer> c = new List<Integer>();
        for (Integer i = 0; i < n; i++) c.add(1);
        for (Integer i = 1; i < n; i++)
            if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
        for (Integer i = n - 2; i >= 0; i--)
            if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
        Integer total = 0;
        for (Integer x : c) total += x;
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-xor-of-two-numbers-in-an-array",
    title: "Maximum XOR of Two Numbers in an Array",
    difficulty: "Medium",
    patterns: ["bit-manipulation", "hashing"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer array `nums`, return the maximum value of `nums[i] XOR nums[j]` over all pairs.",
    beginnerExplanation:
      "Build the answer bit by bit from the most significant bit. At each bit, greedily assume you can set it (making the answer bigger) and check — using a set of bit-prefixes — whether two numbers exist whose prefixes XOR to your candidate. If so, keep the bit.",
    realWorldAnalogy:
      "Negotiating the biggest possible number digit-by-digit from the left: at each digit you ask 'can I still achieve a 1 here?' and lock it in if any pair supports it.",
    visualExplanation:
      "nums=[3,10,5,25,2,8] → answer 28 (5 XOR 25). Greedy from bit 4 down, building 11100.",
    approaches: [
      {
        title: "All pairs",
        tier: "Brute Force",
        idea: "XOR every pair, take the max.",
        steps: ["Double loop over pairs"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Greedy bits + prefix set (or binary trie)",
        tier: "Optimal",
        idea: "From the top bit down, try to set each answer bit; verify via prefixes that a pair achieves it.",
        steps: [
          "For bit i from high to low: extend mask, collect prefixes = {n & mask}",
          "candidate = best | (1<<i); if some p has (candidate ^ p) in prefixes, keep it",
        ],
        time: "O(32·n)",
        space: "O(n)",
      },
    ],
    dryRun: "bit4: prefixes of n&16 → can we get 16? yes → best=16 ... continue down to build 28",
    interviewTips: ["The binary-trie solution is the classic; the prefix-set version is shorter and equivalent.", "Use bits 30..0 to avoid the sign bit on 32-bit ints."],
    commonMistakes: ["Using bit 31 and hitting the sign bit.", "Checking the wrong direction of the XOR identity (a^b=c ⇔ a^c=b)."],
    followUps: ["Maximum XOR with an element ≤ a query bound.", "Max XOR pair in a stream."],
    related: ["single-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_maximum_xor(nums):
    best = 0
    mask = 0
    for i in range(30, -1, -1):
        mask |= (1 << i)
        prefixes = {n & mask for n in nums}
        candidate = best | (1 << i)
        if any((candidate ^ p) in prefixes for p in prefixes):
            best = candidate
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int findMaximumXOR(int[] nums) {
        int best = 0, mask = 0;
        for (int i = 30; i >= 0; i--) {
            mask |= (1 << i);
            Set<Integer> prefixes = new HashSet<>();
            for (int n : nums) prefixes.add(n & mask);
            int candidate = best | (1 << i);
            for (int p : prefixes) {
                if (prefixes.contains(candidate ^ p)) { best = candidate; break; }
            }
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findMaximumXOR(nums) {
  let best = 0, mask = 0;
  for (let i = 30; i >= 0; i--) {
    mask |= (1 << i);
    const prefixes = new Set();
    for (const n of nums) prefixes.add(n & mask);
    const candidate = best | (1 << i);
    for (const p of prefixes) {
      if (prefixes.has(candidate ^ p)) { best = candidate; break; }
    }
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findMaximumXOR(List<Integer> nums) {
        Integer best = 0, mask = 0;
        for (Integer i = 30; i >= 0; i--) {
            mask |= (1 << i);
            Set<Integer> prefixes = new Set<Integer>();
            for (Integer n : nums) prefixes.add(n & mask);
            Integer candidate = best | (1 << i);
            for (Integer p : prefixes) {
                if (prefixes.contains(candidate ^ p)) { best = candidate; break; }
            }
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-happy-prefix",
    title: "Longest Happy Prefix",
    difficulty: "Hard",
    patterns: ["two-pointers"],
    topics: ["Strings"],
    companies: ["google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A happy prefix is a non-empty prefix that is also a (proper) suffix of the string. Return the longest happy prefix of `s` (or the empty string if none).",
    beginnerExplanation:
      "This is exactly the last value of the KMP 'longest proper prefix that is also suffix' (LPS / failure) array. Build the LPS array in O(n); the answer is the prefix of that length.",
    realWorldAnalogy:
      "Finding the biggest overlap when you fold a strip of tape onto itself so the start lines up with the end — KMP's failure function measures that overlap at every position.",
    visualExplanation:
      '"level" → lps=[0,0,0,0,1] → answer "l"\n"ababab" → lps last = 4 → answer "abab"',
    approaches: [
      {
        title: "Check every prefix length",
        tier: "Brute Force",
        idea: "For each length L, test if prefix==suffix.",
        steps: ["For L from n-1 down to 1, compare s[:L] with s[n-L:]"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "KMP failure function",
        tier: "Optimal",
        idea: "Compute the LPS array; the last entry is the longest proper prefix that is also a suffix.",
        steps: [
          "k=0; for i in 1..n-1: while k>0 and s[i]!=s[k]: k=lps[k-1]",
          "if s[i]==s[k]: k++; lps[i]=k",
          "answer = s[:lps[n-1]]",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: '"aabaa" → lps=[0,1,0,1,2] → last=2 → "aa"',
    interviewTips: ["Recognise this IS the KMP prefix function — say so explicitly.", "The failure function underpins KMP pattern matching too."],
    commonMistakes: ["Returning an improper prefix (the whole string).", "Resetting k to 0 instead of lps[k-1] on mismatch."],
    followUps: ["Use it for KMP substring search.", "Shortest Palindrome builds on the same idea."],
    related: ["shortest-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_prefix(s):
    n = len(s)
    lps = [0] * n
    k = 0
    for i in range(1, n):
        while k > 0 and s[i] != s[k]:
            k = lps[k - 1]
        if s[i] == s[k]:
            k += 1
        lps[i] = k
    return s[: lps[n - 1]] if n else ""`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String longestPrefix(String s) {
        int n = s.length();
        int[] lps = new int[n];
        int k = 0;
        for (int i = 1; i < n; i++) {
            while (k > 0 && s.charAt(i) != s.charAt(k)) k = lps[k - 1];
            if (s.charAt(i) == s.charAt(k)) k++;
            lps[i] = k;
        }
        return s.substring(0, n == 0 ? 0 : lps[n - 1]);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestPrefix(s) {
  const n = s.length;
  const lps = new Array(n).fill(0);
  let k = 0;
  for (let i = 1; i < n; i++) {
    while (k > 0 && s[i] !== s[k]) k = lps[k - 1];
    if (s[i] === s[k]) k++;
    lps[i] = k;
  }
  return n ? s.slice(0, lps[n - 1]) : "";
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String longestPrefix(String s) {
        Integer n = s.length();
        if (n == 0) return '';
        List<Integer> lps = new List<Integer>();
        for (Integer i = 0; i < n; i++) lps.add(0);
        Integer k = 0;
        for (Integer i = 1; i < n; i++) {
            while (k > 0 && s.charAt(i) != s.charAt(k)) k = lps[k - 1];
            if (s.charAt(i) == s.charAt(k)) k++;
            lps[i] = k;
        }
        return s.substring(0, lps[n - 1]);
    }
}`,
      },
    ],
  },
  {
    slug: "shortest-palindrome",
    title: "Shortest Palindrome",
    difficulty: "Hard",
    patterns: ["two-pointers"],
    topics: ["Strings"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "You may add characters only in front of `s`. Return the shortest palindrome you can form this way.",
    beginnerExplanation:
      "Find the longest prefix of s that is already a palindrome; whatever follows it must be mirrored in front. Compute that prefix length with KMP on `s + '#' + reverse(s)` — the failure value tells you the longest palindromic prefix.",
    realWorldAnalogy:
      "Folding a ribbon so the front mirrors the back: you keep the part that already matches and prepend a reversed copy of the leftover tail.",
    visualExplanation:
      '"aacecaaa" → longest palindromic prefix "aacecaa" → prepend reverse of remaining "a" → "aaacecaaa"',
    approaches: [
      {
        title: "Try each prefix",
        tier: "Brute Force",
        idea: "Find the longest palindromic prefix by checking each length.",
        steps: ["For L from n down: is s[:L] a palindrome? prepend reverse(s[L:])"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "KMP on s + '#' + reverse(s)",
        tier: "Optimal",
        idea: "The LPS value of the combined string is the longest palindromic prefix length.",
        steps: [
          "temp = s + '#' + reverse(s); build LPS",
          "add = reverse(s)[: n - lps[-1]]",
          "return add + s",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: '"abcd" → longest pal prefix "a" → prepend reverse("bcd")="dcb" → "dcbabcd"',
    interviewTips: ["The '#' separator prevents the prefix/suffix overlap from crossing the join.", "Same failure-function machinery as Longest Happy Prefix."],
    commonMistakes: ["Omitting the separator (causes overcounting).", "Prepending the wrong (non-reversed) tail."],
    followUps: ["Append-only variant.", "Minimum insertions anywhere to make a palindrome (→ DP)."],
    related: ["longest-happy-prefix"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def shortest_palindrome(s):
    if not s:
        return s
    rev = s[::-1]
    temp = s + "#" + rev
    n = len(temp)
    lps = [0] * n
    k = 0
    for i in range(1, n):
        while k > 0 and temp[i] != temp[k]:
            k = lps[k - 1]
        if temp[i] == temp[k]:
            k += 1
        lps[i] = k
    return rev[: len(s) - lps[-1]] + s`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String shortestPalindrome(String s) {
        if (s.isEmpty()) return s;
        String rev = new StringBuilder(s).reverse().toString();
        String temp = s + "#" + rev;
        int n = temp.length();
        int[] lps = new int[n];
        int k = 0;
        for (int i = 1; i < n; i++) {
            while (k > 0 && temp.charAt(i) != temp.charAt(k)) k = lps[k - 1];
            if (temp.charAt(i) == temp.charAt(k)) k++;
            lps[i] = k;
        }
        return rev.substring(0, s.length() - lps[n - 1]) + s;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function shortestPalindrome(s) {
  if (!s) return s;
  const rev = s.split("").reverse().join("");
  const temp = s + "#" + rev;
  const n = temp.length;
  const lps = new Array(n).fill(0);
  let k = 0;
  for (let i = 1; i < n; i++) {
    while (k > 0 && temp[i] !== temp[k]) k = lps[k - 1];
    if (temp[i] === temp[k]) k++;
    lps[i] = k;
  }
  return rev.slice(0, s.length - lps[n - 1]) + s;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String shortestPalindrome(String s) {
        if (String.isEmpty(s)) return s;
        String rev = s.reverse();
        String temp = s + '#' + rev;
        Integer n = temp.length();
        List<Integer> lps = new List<Integer>();
        for (Integer i = 0; i < n; i++) lps.add(0);
        Integer k = 0;
        for (Integer i = 1; i < n; i++) {
            while (k > 0 && temp.charAt(i) != temp.charAt(k)) k = lps[k - 1];
            if (temp.charAt(i) == temp.charAt(k)) k++;
            lps[i] = k;
        }
        return rev.substring(0, s.length() - lps[n - 1]) + s;
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-add-to-make-parentheses-valid",
    title: "Minimum Add to Make Parentheses Valid",
    difficulty: "Medium",
    patterns: ["stack", "greedy"],
    topics: ["Strings", "Stacks"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string of '(' and ')', return the minimum number of parentheses to insert (anywhere) so the string is valid.",
    beginnerExplanation:
      "Sweep left to right tracking the running balance. A ')' with no open '(' to match needs an inserted '(' — count it. At the end, whatever open '(' remain unmatched each need a ')'. The total is your answer.",
    realWorldAnalogy:
      "Balancing a ledger: every unmatched debit needs a credit added, and any leftover credits at the end need matching debits.",
    visualExplanation: '"())" → balance 1,0,-1→need ( (open_needed=1, balance reset 0) → total 1\n"(((" → leftover 3 → total 3',
    approaches: [
      {
        title: "Stack of unmatched",
        tier: "Better",
        idea: "Push '(' , pop on ')'; count ')' with empty stack; leftover stack size adds.",
        steps: ["Stack-based matching", "Sum unmatched of both kinds"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two counters",
        tier: "Optimal",
        idea: "Track balance of open; when it goes negative, count an insertion and reset.",
        steps: [
          "balance=0, add=0",
          "'(' → balance++; ')' → balance-- ; if balance<0: add++, balance=0",
          "return add + balance",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: '"()))((" → ( ) ok (bal0); ) → add1 bal0; ) → add2 bal0; ( bal1; ( bal2 → add2+bal2 = 4',
    interviewTips: ["The two-counter version is O(1) space — lead with it.", "Generalises to 'minimum remove to make valid' with small tweaks."],
    commonMistakes: ["Forgetting to add the leftover positive balance at the end.", "Not resetting balance after counting a needed '('."],
    followUps: ["Minimum Remove to Make Valid Parentheses.", "With wildcards '*' (→ Valid Parenthesis String)."],
    related: ["valid-parentheses", "generate-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_add_to_make_valid(s):
    add = balance = 0
    for c in s:
        if c == "(":
            balance += 1
        else:
            if balance > 0:
                balance -= 1
            else:
                add += 1
    return add + balance`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minAddToMakeValid(String s) {
        int add = 0, balance = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') balance++;
            else if (balance > 0) balance--;
            else add++;
        }
        return add + balance;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minAddToMakeValid(s) {
  let add = 0, balance = 0;
  for (const c of s) {
    if (c === "(") balance++;
    else if (balance > 0) balance--;
    else add++;
  }
  return add + balance;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minAddToMakeValid(String s) {
        Integer add = 0, balance = 0;
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            if (c == '(') balance++;
            else if (balance > 0) balance--;
            else add++;
        }
        return add + balance;
    }
}`,
      },
    ],
  },
  {
    slug: "count-square-submatrices-with-all-ones",
    title: "Count Square Submatrices with All Ones",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an m×n binary matrix, return the total number of square submatrices that contain only 1s.",
    beginnerExplanation:
      "Let dp[i][j] be the side length of the largest all-ones square whose bottom-right corner is (i,j). For a 1-cell, dp is 1 + min of its top, left, and top-left neighbours. The sum of all dp values is the count of squares, because a square of side k ending at a cell implies k squares (sides 1..k) end there.",
    realWorldAnalogy:
      "Stacking the biggest possible square tile that fits snugly into each corner; the size of that tile equals how many nested squares end at that corner.",
    visualExplanation:
      "matrix\n0 1 1 1\n1 1 1 1\n0 1 1 1\ndp →\n0 1 1 1\n1 1 2 2\n0 1 2 3\nsum = 15",
    approaches: [
      {
        title: "Check every square",
        tier: "Brute Force",
        idea: "For every cell and side, verify all cells are 1.",
        steps: ["Enumerate top-left + side; validate"],
        time: "O((mn)·min(m,n)²)",
        space: "O(1)",
      },
      {
        title: "DP on bottom-right corner",
        tier: "Optimal",
        idea: "dp[i][j] = 1 + min(up, left, up-left) if cell is 1; answer is the sum of dp.",
        steps: [
          "For each 1-cell with i>0 and j>0: dp = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])",
          "Add dp[i][j] to the running total",
        ],
        time: "O(m·n)",
        space: "O(1) in-place",
      },
    ],
    dryRun: "single row [1,1,1] → dp [1,1,1] (no row above) → sum 3 squares of side 1",
    interviewTips: ["Same recurrence as Maximal Square — here you SUM the dp grid instead of squaring the max.", "Explain WHY summing dp counts every square size."],
    commonMistakes: ["Squaring the max (that's Maximal Square's area, not the count).", "Mutating the input when not allowed — copy if needed."],
    followUps: ["Maximal Square (largest area).", "Count rectangles (harder)."],
    related: ["maximal-square"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_squares(matrix):
    if not matrix or not matrix[0]:
        return 0
    rows, cols = len(matrix), len(matrix[0])
    total = 0
    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] and i > 0 and j > 0:
                matrix[i][j] = 1 + min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1])
            total += matrix[i][j]
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countSquares(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length, total = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (matrix[i][j] == 1 && i > 0 && j > 0) {
                    matrix[i][j] = 1 + Math.min(matrix[i - 1][j],
                        Math.min(matrix[i][j - 1], matrix[i - 1][j - 1]));
                }
                total += matrix[i][j];
            }
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countSquares(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  let total = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 1 && i > 0 && j > 0) {
        matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
      }
      total += matrix[i][j];
    }
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countSquares(List<List<Integer>> matrix) {
        Integer rows = matrix.size(), cols = matrix[0].size(), total = 0;
        for (Integer i = 0; i < rows; i++) {
            for (Integer j = 0; j < cols; j++) {
                if (matrix[i][j] == 1 && i > 0 && j > 0) {
                    Integer m = Math.min(matrix[i - 1][j],
                        Math.min(matrix[i][j - 1], matrix[i - 1][j - 1]));
                    matrix[i][j] = 1 + m;
                }
                total += matrix[i][j];
            }
        }
        return total;
    }
}`,
      },
    ],
  },
];

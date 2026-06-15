import type { Problem } from "@/lib/types";

// Batch G — Graphs / Hard DP / Intervals (fills the remaining maang-100 gaps).

export const PROBLEMS_BATCH_G: Problem[] = [
  {
    slug: "alien-dictionary",
    title: "Alien Dictionary",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs", "Topological Sort"],
    companies: ["google", "amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given a list of `words` sorted lexicographically by the rules of an unknown alien language, derive a valid ordering of its characters. If no valid ordering exists, return an empty string.",
    beginnerExplanation:
      "Adjacent words tell you which letter comes first: compare two neighbouring words letter by letter, and the first place they differ reveals an ordering rule (left letter < right letter). Collect all such rules into a graph and topologically sort it.",
    realWorldAnalogy:
      "It's like reconstructing the alphabet from a sorted phone book of an unknown language. Each pair of consecutive names leaks one clue about which letter sorts before another; stitch the clues together into the full order.",
    visualExplanation:
      'words = ["wrt","wrf","er","ett","rftt"]\nedges: t→f, w→e, r→t, e→r\ntopo order → "wertf"',
    approaches: [
      {
        title: "Build graph + topological sort (BFS / Kahn)",
        tier: "Optimal",
        idea: "Derive ordering edges from adjacent word pairs, then Kahn's algorithm orders the characters; a leftover cycle means no valid order.",
        steps: [
          "Seed every character as a node (indegree 0)",
          "For each adjacent pair, find the first differing char → edge a→b",
          "Invalid case: w1 is longer but a prefix of w2 → return \"\"",
          "Kahn's BFS over indegrees; if not all nodes emitted, there's a cycle → \"\"",
        ],
        time: "O(C) where C = total characters",
        space: "O(1) (≤26 nodes)",
      },
    ],
    dryRun:
      'Compare "wrt","wrf" → t before f. "wrf","er" → w before e. "er","ett" → r before t. "ett","rftt" → e before r.\nindegrees zero: w → e → r → t → f.',
    interviewTips: [
      "Call out the two failure modes explicitly: a cycle, and the prefix case (\"abc\" after \"ab\").",
      "Only the FIRST differing character yields an edge — stop comparing after it.",
    ],
    commonMistakes: [
      "Adding edges for every differing position instead of just the first.",
      "Missing the invalid prefix case where a longer word precedes its own prefix.",
    ],
    followUps: ["Return all valid orderings.", "Handle Unicode beyond 26 letters."],
    related: ["course-schedule", "course-schedule-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def alien_order(words):
    adj = {c: set() for w in words for c in w}
    indeg = {c: 0 for c in adj}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        m = min(len(w1), len(w2))
        if len(w1) > len(w2) and w1[:m] == w2[:m]:
            return ""
        for j in range(m):
            if w1[j] != w2[j]:
                if w2[j] not in adj[w1[j]]:
                    adj[w1[j]].add(w2[j])
                    indeg[w2[j]] += 1
                break
    q = deque([c for c in indeg if indeg[c] == 0])
    res = []
    while q:
        c = q.popleft()
        res.append(c)
        for nxt in adj[c]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                q.append(nxt)
    return "".join(res) if len(res) == len(indeg) else ""`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> indeg = new HashMap<>();
        for (String w : words)
            for (char c : w.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
                indeg.putIfAbsent(c, 0);
            }
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int m = Math.min(w1.length(), w2.length());
            if (w1.length() > w2.length() && w1.substring(0, m).equals(w2.substring(0, m)))
                return "";
            for (int j = 0; j < m; j++) {
                char a = w1.charAt(j), b = w2.charAt(j);
                if (a != b) {
                    if (!adj.get(a).contains(b)) { adj.get(a).add(b); indeg.put(b, indeg.get(b) + 1); }
                    break;
                }
            }
        }
        Deque<Character> q = new ArrayDeque<>();
        for (char c : indeg.keySet()) if (indeg.get(c) == 0) q.add(c);
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            char c = q.poll();
            sb.append(c);
            for (char nxt : adj.get(c)) {
                indeg.put(nxt, indeg.get(nxt) - 1);
                if (indeg.get(nxt) == 0) q.add(nxt);
            }
        }
        return sb.length() == indeg.size() ? sb.toString() : "";
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function alienOrder(words) {
  const adj = new Map(), indeg = new Map();
  for (const w of words)
    for (const c of w) if (!adj.has(c)) { adj.set(c, new Set()); indeg.set(c, 0); }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1], m = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.slice(0, m) === w2.slice(0, m)) return "";
    for (let j = 0; j < m; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) { adj.get(w1[j]).add(w2[j]); indeg.set(w2[j], indeg.get(w2[j]) + 1); }
        break;
      }
    }
  }
  const q = [];
  for (const [c, d] of indeg) if (d === 0) q.push(c);
  const res = [];
  while (q.length) {
    const c = q.shift();
    res.push(c);
    for (const nxt of adj.get(c)) {
      indeg.set(nxt, indeg.get(nxt) - 1);
      if (indeg.get(nxt) === 0) q.push(nxt);
    }
  }
  return res.length === indeg.size ? res.join("") : "";
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String alienOrder(List<String> words) {
        Map<String, Set<String>> adj = new Map<String, Set<String>>();
        Map<String, Integer> indeg = new Map<String, Integer>();
        for (String w : words) {
            for (Integer k = 0; k < w.length(); k++) {
                String c = w.substring(k, k + 1);
                if (!adj.containsKey(c)) { adj.put(c, new Set<String>()); indeg.put(c, 0); }
            }
        }
        for (Integer i = 0; i < words.size() - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            Integer m = Math.min(w1.length(), w2.length());
            if (w1.length() > w2.length() && w1.substring(0, m) == w2.substring(0, m)) return '';
            for (Integer j = 0; j < m; j++) {
                String a = w1.substring(j, j + 1), b = w2.substring(j, j + 1);
                if (a != b) {
                    if (!adj.get(a).contains(b)) { adj.get(a).add(b); indeg.put(b, indeg.get(b) + 1); }
                    break;
                }
            }
        }
        List<String> q = new List<String>();
        for (String c : indeg.keySet()) if (indeg.get(c) == 0) q.add(c);
        String res = '';
        Integer qi = 0;
        while (qi < q.size()) {
            String c = q[qi]; qi++;
            res += c;
            for (String nxt : adj.get(c)) {
                indeg.put(nxt, indeg.get(nxt) - 1);
                if (indeg.get(nxt) == 0) q.add(nxt);
            }
        }
        return res.length() == indeg.size() ? res : '';
    }
}`,
      },
    ],
  },
  {
    slug: "cheapest-flights-within-k-stops",
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    patterns: ["graphs", "dynamic-programming"],
    topics: ["Graphs", "Shortest Path"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "There are `n` cities connected by `flights[i] = [from, to, price]`. Find the cheapest price from `src` to `dst` using at most `k` stops. Return -1 if there's no such route.",
    beginnerExplanation:
      "Plain Dijkstra fails because the cheapest path might use too many stops. Instead, relax all edges exactly k+1 times (Bellman-Ford style): after i rounds, dist[] holds the cheapest cost reachable using at most i edges. Use a snapshot per round so one round can't chain multiple hops.",
    realWorldAnalogy:
      "Booking a trip with a layover budget. Each 'round' lets every city update its best fare using one more connecting flight — but only one extra hop per round, so you never exceed your allowed stops.",
    visualExplanation:
      "n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1\nround0: dist=[0,100,500]\nround1: relax → dist[2]=min(500,100+100)=200 → answer 200",
    approaches: [
      {
        title: "Bellman-Ford limited to k+1 relaxations",
        tier: "Optimal",
        idea: "Relax every edge using a snapshot of the previous round's distances, exactly k+1 times.",
        steps: [
          "dist[src]=0, everything else = ∞",
          "Repeat k+1 times: copy dist→tmp, relax each edge into tmp from dist",
          "Answer is dist[dst] (or -1 if ∞)",
        ],
        time: "O(k · E)",
        space: "O(n)",
      },
    ],
    dryRun:
      "k=1 means up to 2 edges. After round 1, 0→1→2 (200) beats the direct 0→2 (500). Returns 200.",
    interviewTips: [
      "The snapshot (`tmp = dist.copy()`) is the whole trick — without it a single round chains many hops and over-counts stops.",
      "Contrast with Dijkstra: greedy shortest-path can prune a cheaper-but-longer route you actually need.",
    ],
    commonMistakes: [
      "Relaxing in place (no snapshot), allowing more than one hop per round.",
      "Using k instead of k+1 rounds (k stops = k+1 edges).",
    ],
    followUps: ["Reconstruct the actual route.", "Dijkstra variant tracking (cost, stops) in the heap state."],
    related: ["network-delay-time", "course-schedule"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_cheapest_price(n, flights, src, dst, k):
    INF = float("inf")
    dist = [INF] * n
    dist[src] = 0
    for _ in range(k + 1):
        tmp = dist[:]
        for u, v, w in flights:
            if dist[u] != INF and dist[u] + w < tmp[v]:
                tmp[v] = dist[u] + w
        dist = tmp
    return -1 if dist[dst] == INF else dist[dst]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int INF = Integer.MAX_VALUE;
        int[] dist = new int[n];
        Arrays.fill(dist, INF);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            int[] tmp = dist.clone();
            for (int[] f : flights) {
                int u = f[0], v = f[1], w = f[2];
                if (dist[u] != INF && dist[u] + w < tmp[v]) tmp[v] = dist[u] + w;
            }
            dist = tmp;
        }
        return dist[dst] == INF ? -1 : dist[dst];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findCheapestPrice(n, flights, src, dst, k) {
  const INF = Infinity;
  let dist = new Array(n).fill(INF);
  dist[src] = 0;
  for (let i = 0; i <= k; i++) {
    const tmp = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== INF && dist[u] + w < tmp[v]) tmp[v] = dist[u] + w;
    }
    dist = tmp;
  }
  return dist[dst] === INF ? -1 : dist[dst];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findCheapestPrice(Integer n, List<List<Integer>> flights,
                                            Integer src, Integer dst, Integer k) {
        Integer INF = 2147483647;
        List<Integer> dist = new List<Integer>();
        for (Integer i = 0; i < n; i++) dist.add(INF);
        dist[src] = 0;
        for (Integer it = 0; it <= k; it++) {
            List<Integer> tmp = dist.clone();
            for (List<Integer> f : flights) {
                Integer u = f[0], v = f[1], w = f[2];
                if (dist[u] != INF && dist[u] + w < tmp[v]) tmp[v] = dist[u] + w;
            }
            dist = tmp;
        }
        return dist[dst] == INF ? -1 : dist[dst];
    }
}`,
      },
    ],
  },
  {
    slug: "critical-connections-in-a-network",
    title: "Critical Connections in a Network",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given `n` servers and a list of undirected `connections`, return all critical connections — edges whose removal disconnects some servers (the bridges of the graph).",
    beginnerExplanation:
      "A bridge is an edge that isn't part of any cycle: remove it and the graph splits. Tarjan's algorithm finds them in one DFS using a discovery time and a 'low-link' (the earliest node reachable from a subtree). An edge u→v is a bridge when v's subtree can't reach back above u.",
    realWorldAnalogy:
      "Think of roads between towns. A bridge road is one with no alternate detour — if a flood closes it, the towns on the far side are cut off. Any road that's part of a loop has a backup and isn't critical.",
    visualExplanation:
      "n=4, edges 0-1,1-2,2-0,1-3\n0-1-2 form a cycle (no bridges there). Edge 1-3 has no detour → bridge [1,3].",
    approaches: [
      {
        title: "Tarjan's bridge-finding DFS (discovery + low-link)",
        tier: "Optimal",
        idea: "DFS assigning each node a discovery time; low[u] = earliest reachable discovery time. Edge (u,v) is a bridge iff low[v] > disc[u].",
        steps: [
          "Build adjacency list",
          "DFS from each unvisited node, tracking disc[] and low[]",
          "After visiting child v: low[u]=min(low[u],low[v]); if low[v]>disc[u], record bridge",
          "For an already-visited non-parent v: low[u]=min(low[u],disc[v])",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "DFS 0→1→2→(back-edge to 0 lowers low to disc[0]). low[2],low[1] reach 0 so 0-1,1-2,2-0 are not bridges. 1→3: low[3]=disc[3]>disc[1] → bridge [1,3].",
    interviewTips: [
      "Name it Tarjan's bridges and define low-link precisely — that's what's being tested.",
      "Mention the parent-skip caveat and that LeetCode guarantees no duplicate edges.",
    ],
    commonMistakes: [
      "Using disc[v] instead of low[v] in the bridge test.",
      "Skipping the parent unconditionally even with multi-edges (fine here since edges are unique).",
    ],
    followUps: ["Find articulation points (critical nodes).", "Make the DFS iterative to avoid stack overflow."],
    related: ["number-of-connected-components-in-an-undirected-graph", "redundant-connection"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import sys

def critical_connections(n, connections):
    sys.setrecursionlimit(10**6)
    graph = [[] for _ in range(n)]
    for a, b in connections:
        graph[a].append(b)
        graph[b].append(a)
    disc = [-1] * n
    low = [0] * n
    res = []
    timer = [0]

    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        for v in graph[u]:
            if v == parent:
                continue
            if disc[v] == -1:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    res.append([u, v])
            else:
                low[u] = min(low[u], disc[v])

    for i in range(n):
        if disc[i] == -1:
            dfs(i, -1)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    int timer = 0;
    int[] disc, low;
    List<List<Integer>> graph, res;

    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (List<Integer> e : connections) {
            graph.get(e.get(0)).add(e.get(1));
            graph.get(e.get(1)).add(e.get(0));
        }
        disc = new int[n];
        low = new int[n];
        Arrays.fill(disc, -1);
        res = new ArrayList<>();
        for (int i = 0; i < n; i++) if (disc[i] == -1) dfs(i, -1);
        return res;
    }

    void dfs(int u, int parent) {
        disc[u] = low[u] = timer++;
        for (int v : graph.get(u)) {
            if (v == parent) continue;
            if (disc[v] == -1) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) res.add(Arrays.asList(u, v));
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function criticalConnections(n, connections) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) { graph[a].push(b); graph[b].push(a); }
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0), res = [];
  let timer = 0;
  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) res.push([u, v]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<List<Integer>> graph;
    static List<Integer> disc;
    static List<Integer> low;
    static List<List<Integer>> res;
    static Integer timer;

    public static List<List<Integer>> criticalConnections(Integer n, List<List<Integer>> connections) {
        graph = new List<List<Integer>>();
        for (Integer i = 0; i < n; i++) graph.add(new List<Integer>());
        for (List<Integer> e : connections) { graph[e[0]].add(e[1]); graph[e[1]].add(e[0]); }
        disc = new List<Integer>();
        low = new List<Integer>();
        for (Integer i = 0; i < n; i++) { disc.add(-1); low.add(0); }
        res = new List<List<Integer>>();
        timer = 0;
        for (Integer i = 0; i < n; i++) if (disc[i] == -1) dfs(i, -1);
        return res;
    }

    static void dfs(Integer u, Integer parent) {
        disc[u] = timer; low[u] = timer; timer++;
        for (Integer v : graph[u]) {
            if (v == parent) continue;
            if (disc[v] == -1) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) res.add(new List<Integer>{ u, v });
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}`,
      },
    ],
  },
  {
    slug: "graph-valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Union Find"],
    companies: ["google", "meta", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given `n` nodes labelled 0..n-1 and a list of undirected `edges`, determine whether they form a valid tree (fully connected, with no cycles).",
    beginnerExplanation:
      "A tree with n nodes has two defining facts: exactly n-1 edges, and no cycles. If both hold, it's automatically connected. Use union-find: merge the endpoints of each edge; if you ever try to merge two nodes already in the same set, there's a cycle.",
    realWorldAnalogy:
      "Wiring n computers with cables. With exactly n-1 cables and no redundant loop, every machine ends up on one network. A cable between two already-connected machines is a wasteful loop — not a tree.",
    visualExplanation:
      "n=5, edges=[[0,1],[0,2],[0,3],[1,4]] → 4 edges = n-1, no cycle → tree ✓\nAdd [1,2] → union(1,2) but both reach root 0 → cycle ✗",
    approaches: [
      {
        title: "Edge-count check + union-find",
        tier: "Optimal",
        idea: "If edges ≠ n-1 it can't be a tree. Otherwise union each edge; a union of already-connected nodes means a cycle.",
        steps: [
          "If len(edges) != n-1 → false",
          "Initialise parent[i]=i",
          "For each edge, find both roots; if equal → false; else union",
          "All unions succeeded → true",
        ],
        time: "O(n · α(n))",
        space: "O(n)",
      },
    ],
    dryRun:
      "n=5, 4 edges. union(0,1),(0,2),(0,3),(1,4) all join distinct sets. No conflict, edge count = n-1 → valid tree.",
    interviewTips: [
      "Lead with the n-1 edge invariant — it instantly rejects many inputs and proves connectivity for free.",
      "Union-find or a single DFS/BFS counting visited nodes both work; state which and why.",
    ],
    commonMistakes: [
      "Forgetting the edge-count check and only testing for cycles (misses disconnected graphs).",
      "Adding each undirected edge twice in a DFS without tracking the parent.",
    ],
    followUps: ["Return the connected components if it's not a tree.", "Handle self-loops / duplicate edges."],
    related: ["redundant-connection", "number-of-connected-components-in-an-undirected-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def valid_tree(n, edges):
    if len(edges) != n - 1:
        return False
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        parent[ra] = rb
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int[] parent;

    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int[] e : edges) {
            int ra = find(e[0]), rb = find(e[1]);
            if (ra == rb) return false;
            parent[ra] = rb;
        }
        return true;
    }

    int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra === rb) return false;
    parent[ra] = rb;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> parent;

    public static Boolean validTree(Integer n, List<List<Integer>> edges) {
        if (edges.size() != n - 1) return false;
        parent = new List<Integer>();
        for (Integer i = 0; i < n; i++) parent.add(i);
        for (List<Integer> e : edges) {
            Integer ra = find(e[0]), rb = find(e[1]);
            if (ra == rb) return false;
            parent[ra] = rb;
        }
        return true;
    }

    static Integer find(Integer x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
}`,
      },
    ],
  },
  {
    slug: "redundant-connection",
    title: "Redundant Connection",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Union Find"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "A tree of `n` nodes had one extra edge added, creating exactly one cycle. Given the `edges` in order, return the edge that can be removed so the result is a tree. Return the last such edge if there are multiple answers.",
    beginnerExplanation:
      "Process edges in order with union-find. Each edge normally joins two separate groups. The first edge whose two endpoints are ALREADY in the same group is the one that closes the cycle — return it.",
    realWorldAnalogy:
      "Adding roads between towns one by one. The first road you build between two towns that were already reachable from each other is redundant — it just makes a loop.",
    visualExplanation:
      "edges=[[1,2],[1,3],[2,3]] → union(1,2), union(1,3). Edge [2,3]: 2 and 3 already share root → redundant → [2,3].",
    approaches: [
      {
        title: "Union-find, return the cycle-closing edge",
        tier: "Optimal",
        idea: "Union endpoints in input order; the edge whose endpoints already share a root is redundant.",
        steps: [
          "parent[i]=i for 1..n",
          "For each edge (a,b): if find(a)==find(b) return it; else union",
        ],
        time: "O(n · α(n))",
        space: "O(n)",
      },
    ],
    dryRun:
      "[1,2]: union ok. [1,3]: union ok. [2,3]: find(2)=find(3)=1 → already connected → answer [2,3].",
    interviewTips: [
      "Because the problem guarantees exactly one extra edge, the first conflict in input order IS the answer.",
      "Path compression keeps find near O(1); mention amortised inverse-Ackermann.",
    ],
    commonMistakes: [
      "Off-by-one: nodes are 1-indexed, so size the parent array n+1.",
      "Returning the first edge of the cycle rather than the conflicting one.",
    ],
    followUps: ["Redundant Connection II (directed graph) — harder, two candidate edges.", "Add union by rank."],
    related: ["graph-valid-tree", "number-of-connected-components-in-an-undirected-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_redundant_connection(edges):
    parent = list(range(len(edges) + 1))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return [a, b]
        parent[ra] = rb
    return []`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int[] parent;

    public int[] findRedundantConnection(int[][] edges) {
        parent = new int[edges.length + 1];
        for (int i = 0; i < parent.length; i++) parent[i] = i;
        for (int[] e : edges) {
            int ra = find(e[0]), rb = find(e[1]);
            if (ra == rb) return e;
            parent[ra] = rb;
        }
        return new int[] {};
    }

    int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findRedundantConnection(edges) {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra === rb) return [a, b];
    parent[ra] = rb;
  }
  return [];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> parent;

    public static List<Integer> findRedundantConnection(List<List<Integer>> edges) {
        parent = new List<Integer>();
        for (Integer i = 0; i <= edges.size(); i++) parent.add(i);
        for (List<Integer> e : edges) {
            Integer ra = find(e[0]), rb = find(e[1]);
            if (ra == rb) return new List<Integer>{ e[0], e[1] };
            parent[ra] = rb;
        }
        return new List<Integer>();
    }

    static Integer find(Integer x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
}`,
      },
    ],
  },
  {
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs", "BFS"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given `beginWord`, `endWord`, and a `wordList`, return the number of words in the shortest transformation sequence where each step changes exactly one letter and every intermediate word is in the list. Return 0 if impossible.",
    beginnerExplanation:
      "Treat each word as a graph node; two words are neighbours if they differ by one letter. The shortest transformation is the shortest path, so run BFS level by level from beginWord, generating neighbours by trying every letter at every position.",
    realWorldAnalogy:
      "A word-morph puzzle: change one tile at a time, and every step must still spell a real (allowed) word. BFS explores all one-change words first, then two-change, so the first time you reach the target it's via the fewest moves.",
    visualExplanation:
      'begin="hit", end="cog", list=[hot,dot,dog,lot,log,cog]\nhit → hot → dot/lot → dog/log → cog : length 5',
    approaches: [
      {
        title: "BFS over one-letter neighbours",
        tier: "Optimal",
        idea: "BFS from beginWord; for each word try all 26 letters at each index, enqueue valid unseen words in the list.",
        steps: [
          "Put wordList in a set; if endWord absent → 0",
          "BFS queue of (word, steps); mark seen",
          "Generate neighbours by swapping each position with a..z",
          "Return steps when word == endWord",
        ],
        time: "O(N · L · 26) where L = word length",
        space: "O(N · L)",
      },
    ],
    dryRun:
      "Level1: hit. Level2: hot. Level3: dot,lot. Level4: dog,log. Level5: cog == end → return 5.",
    interviewTips: [
      "BFS (not DFS) guarantees the shortest path in an unweighted graph — say so.",
      "Bidirectional BFS from both ends is the classic optimisation; mention it as a follow-up.",
    ],
    commonMistakes: [
      "Building the full pairwise graph (O(N²·L)) instead of generating neighbours on the fly.",
      "Forgetting to mark words seen, causing revisits / TLE.",
    ],
    followUps: ["Bidirectional BFS.", "Word Ladder II — return all shortest sequences."],
    related: ["clone-graph", "rotting-oranges"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def ladder_length(begin_word, end_word, word_list):
    words = set(word_list)
    if end_word not in words:
        return 0
    q = deque([(begin_word, 1)])
    seen = {begin_word}
    while q:
        word, steps = q.popleft()
        if word == end_word:
            return steps
        for i in range(len(word)):
            for c in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + c + word[i + 1:]
                if nxt in words and nxt not in seen:
                    seen.add(nxt)
                    q.append((nxt, steps + 1))
    return 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> words = new HashSet<>(wordList);
        if (!words.contains(endWord)) return 0;
        Queue<String> q = new LinkedList<>();
        q.add(beginWord);
        Set<String> seen = new HashSet<>();
        seen.add(beginWord);
        int steps = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int s = 0; s < size; s++) {
                String word = q.poll();
                if (word.equals(endWord)) return steps;
                char[] arr = word.toCharArray();
                for (int i = 0; i < arr.length; i++) {
                    char old = arr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        arr[i] = c;
                        String nxt = new String(arr);
                        if (words.contains(nxt) && !seen.contains(nxt)) {
                            seen.add(nxt);
                            q.add(nxt);
                        }
                    }
                    arr[i] = old;
                }
            }
            steps++;
        }
        return 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function ladderLength(beginWord, endWord, wordList) {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  let q = [beginWord];
  const seen = new Set([beginWord]);
  let steps = 1;
  while (q.length) {
    const next = [];
    for (const word of q) {
      if (word === endWord) return steps;
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {
          const nxt = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (words.has(nxt) && !seen.has(nxt)) { seen.add(nxt); next.push(nxt); }
        }
      }
    }
    q = next;
    steps++;
  }
  return 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> words = new Set<String>(wordList);
        if (!words.contains(endWord)) return 0;
        String alphabet = 'abcdefghijklmnopqrstuvwxyz';
        List<String> q = new List<String>{ beginWord };
        Set<String> seen = new Set<String>{ beginWord };
        Integer steps = 1;
        while (!q.isEmpty()) {
            List<String> nextLevel = new List<String>();
            for (String word : q) {
                if (word == endWord) return steps;
                for (Integer i = 0; i < word.length(); i++) {
                    for (Integer c = 0; c < 26; c++) {
                        String ch = alphabet.substring(c, c + 1);
                        String nxt = word.substring(0, i) + ch + word.substring(i + 1);
                        if (words.contains(nxt) && !seen.contains(nxt)) {
                            seen.add(nxt);
                            nextLevel.add(nxt);
                        }
                    }
                }
            }
            q = nextLevel;
            steps++;
        }
        return 0;
    }
}`,
      },
    ],
  },
  {
    slug: "best-time-to-buy-and-sell-stock-with-cooldown",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given daily `prices`, maximise profit with unlimited transactions, but after you sell you must rest one day (cooldown) before buying again. You can't hold more than one share.",
    beginnerExplanation:
      "Each day you're in one of three states: holding a stock, just sold (must cooldown tomorrow), or resting and free to buy. Track the best profit for each state and roll them forward day by day.",
    realWorldAnalogy:
      "Day-trading with a mandatory one-day breather after every sale. You constantly weigh: keep holding, sell today and rest, or stay on the sidelines ready to pounce.",
    visualExplanation:
      "prices=[1,2,3,0,2]\nbuy 1, sell 3 (profit 2), cooldown day(0), buy 0, sell 2 (profit 2) → total 3? best is buy@1 sell@3=2 then cooldown then buy@0 sell@2=2 → 3.",
    approaches: [
      {
        title: "Three-state rolling DP",
        tier: "Optimal",
        idea: "States hold / sold / rest; transitions: sold=hold+price, hold=max(hold, rest-price), rest=max(rest, prevSold).",
        steps: [
          "hold = -∞, sold = 0, rest = 0",
          "For each price, compute new sold from old hold, new hold from old rest, new rest from old sold",
          "Answer = max(sold, rest) at the end",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "prices=[1,2,3,0,2]: after processing, sold=3, rest=2 → max = 3.",
    interviewTips: [
      "Draw the 3-state machine — naming the states and their transitions is what the interviewer wants.",
      "Capture `prevSold` BEFORE overwriting `sold`, or rest will read the wrong value.",
    ],
    commonMistakes: [
      "Updating the three variables out of order so one reads another's new value.",
      "Initialising hold to 0 instead of -∞ (lets you 'profit' without ever buying).",
    ],
    followUps: ["Add a transaction fee instead of cooldown.", "Limit to at most k transactions."],
    related: ["best-time-to-buy-sell-stock", "house-robber"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_profit(prices):
    hold = float("-inf")
    sold = 0
    rest = 0
    for p in prices:
        prev_sold = sold
        sold = hold + p
        hold = max(hold, rest - p)
        rest = max(rest, prev_sold)
    return max(sold, rest)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int NEG = -1000000000;
        int hold = NEG, sold = 0, rest = 0;
        for (int p : prices) {
            int prevSold = sold;
            sold = hold + p;
            hold = Math.max(hold, rest - p);
            rest = Math.max(rest, prevSold);
        }
        return Math.max(sold, rest);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProfit(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = hold + p;
    hold = Math.max(hold, rest - p);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProfit(List<Integer> prices) {
        Integer NEG = -1000000000;
        Integer hold = NEG, sold = 0, rest = 0;
        for (Integer p : prices) {
            Integer prevSold = sold;
            sold = hold + p;
            hold = Math.max(hold, rest - p);
            rest = Math.max(rest, prevSold);
        }
        return Math.max(sold, rest);
    }
}`,
      },
    ],
  },
  {
    slug: "burst-balloons",
    title: "Burst Balloons",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Interval DP"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given `nums` balloons each with a number, bursting balloon i earns `nums[i-1]*nums[i]*nums[i+1]` coins (treat out-of-range as 1). Return the maximum coins obtainable by bursting all balloons in some order.",
    beginnerExplanation:
      "Instead of choosing which balloon to burst FIRST, decide which to burst LAST in each sub-range. If k is last in range (left,right), its neighbours are the (untouched) boundaries left and right, so coins = a[left]*a[k]*a[right] plus the best for the two sub-ranges. That makes the subproblems independent — classic interval DP.",
    realWorldAnalogy:
      "Planning a fireworks finale backwards: decide which shell goes off last in each segment so its 'neighbours' are the fixed segment edges, then recurse on the cleaner halves.",
    visualExplanation:
      "nums=[3,1,5,8] → pad to [1,3,1,5,8,1]. Best order yields 167.\ndp over ranges, k = last balloon burst in (left,right).",
    approaches: [
      {
        title: "Interval DP (choose last-to-burst)",
        tier: "Optimal",
        idea: "Pad with 1s; dp[l][r] = max coins bursting all strictly between l and r, where k is the last burst.",
        steps: [
          "a = [1] + nums + [1]",
          "For each gap length, each window (l, r), try every k in (l, r) as the last burst",
          "dp[l][r] = max(dp[l][k] + a[l]*a[k]*a[r] + dp[k][r])",
        ],
        time: "O(n³)",
        space: "O(n²)",
      },
    ],
    dryRun:
      "Padded [1,3,1,5,8,1]. Building dp bottom-up over widening windows gives dp[0][5] = 167.",
    interviewTips: [
      "The key insight is 'last to burst', not 'first' — say it out loud; it's the entire trick.",
      "Padding with 1s removes all the boundary special-casing.",
    ],
    commonMistakes: [
      "Thinking forward (first burst) — neighbours keep changing, so subproblems aren't independent.",
      "Off-by-one in the window/gap loops.",
    ],
    followUps: ["Reconstruct the burst order.", "Matrix Chain Multiplication is the same interval-DP shape."],
    related: ["coin-change", "unique-paths"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_coins(nums):
    a = [1] + nums + [1]
    n = len(a)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length
            for k in range(left + 1, right):
                dp[left][right] = max(
                    dp[left][right],
                    dp[left][k] + a[left] * a[k] * a[right] + dp[k][right],
                )
    return dp[0][n - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length + 2;
        int[] a = new int[n];
        a[0] = 1; a[n - 1] = 1;
        for (int i = 0; i < nums.length; i++) a[i + 1] = nums[i];
        int[][] dp = new int[n][n];
        for (int length = 2; length < n; length++) {
            for (int left = 0; left + length < n; left++) {
                int right = left + length;
                for (int k = left + 1; k < right; k++) {
                    dp[left][right] = Math.max(dp[left][right],
                        dp[left][k] + a[left] * a[k] * a[right] + dp[k][right]);
                }
            }
        }
        return dp[0][n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxCoins(nums) {
  const a = [1, ...nums, 1];
  const n = a.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let length = 2; length < n; length++) {
    for (let left = 0; left + length < n; left++) {
      const right = left + length;
      for (let k = left + 1; k < right; k++) {
        dp[left][right] = Math.max(dp[left][right],
          dp[left][k] + a[left] * a[k] * a[right] + dp[k][right]);
      }
    }
  }
  return dp[0][n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxCoins(List<Integer> nums) {
        Integer n = nums.size() + 2;
        List<Integer> a = new List<Integer>();
        for (Integer i = 0; i < n; i++) a.add(1);
        for (Integer i = 0; i < nums.size(); i++) a[i + 1] = nums[i];
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i < n; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j < n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer length = 2; length < n; length++) {
            for (Integer left = 0; left + length < n; left++) {
                Integer right = left + length;
                for (Integer k = left + 1; k < right; k++) {
                    Integer cand = dp[left][k] + a[left] * a[k] * a[right] + dp[k][right];
                    if (cand > dp[left][right]) dp[left][right] = cand;
                }
            }
        }
        return dp[0][n - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["google", "meta", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Implement regular-expression matching with support for `.` (any single character) and `*` (zero or more of the preceding element). The match must cover the ENTIRE input string `s` against pattern `p`.",
    beginnerExplanation:
      "Build a table dp[i][j] = does the first i chars of s match the first j chars of p? The only tricky operator is `*`, which can mean 'zero of the preceding char' (skip two pattern chars) or 'one more of it' (consume an s char if it matches the preceding pattern char).",
    realWorldAnalogy:
      "Like a customs officer checking a passport (s) against a rule sheet (p) stamp by stamp. A `*` rule is a flexible stamp: it can be skipped entirely or applied repeatedly as long as each application matches.",
    visualExplanation:
      's="aab", p="c*a*b"\nc* → zero c\'s, a* → two a\'s, b → b ✓  → true',
    approaches: [
      {
        title: "2-D dynamic programming",
        tier: "Optimal",
        idea: "dp[i][j] over prefixes; `*` either drops the pair (dp[i][j-2]) or, if the preceding pattern char matches s[i-1], extends (dp[i-1][j]).",
        steps: [
          "dp[0][0]=true; seed dp[0][j] for patterns like a*b* matching empty",
          "If p[j-1]=='*': dp[i][j]=dp[i][j-2]; if p[j-2] matches s[i-1], OR in dp[i-1][j]",
          "Else if p[j-1]=='.' or equals s[i-1]: dp[i][j]=dp[i-1][j-1]",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun:
      'matching "aab" vs "c*a*b": c* contributes dp[0][2]; a* consumes the two a\'s; final b matches → dp[3][5]=true.',
    interviewTips: [
      "Separate the `*` case cleanly into zero-occurrence vs one-more-occurrence — that's the crux.",
      "Don't forget seeding row 0 so empty s can still match patterns like `a*b*c*`.",
    ],
    commonMistakes: [
      "Treating `*` as 'exactly one' or forgetting the zero-occurrence branch (dp[i][j-2]).",
      "Comparing against p[j-1] instead of the char before `*` (p[j-2]).",
    ],
    followUps: ["Add `+` and `?` operators.", "Wildcard Matching (`?` and `*` with different semantics)."],
    related: ["edit-distance", "longest-common-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_match(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        if p[j - 1] == "*":
            dp[0][j] = dp[0][j - 2]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == "*":
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == "." or p[j - 2] == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            elif p[j - 1] == "." or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    return dp[m][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int j = 1; j <= n; j++)
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2];
                    char prev = p.charAt(j - 2);
                    if (prev == '.' || prev == s.charAt(i - 1))
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                } else if (pc == '.' || pc == s.charAt(i - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2];
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2];
        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
      } else if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  return dp[m][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isMatch(String s, String p) {
        Integer m = s.length(), n = p.length();
        List<List<Boolean>> dp = new List<List<Boolean>>();
        for (Integer i = 0; i <= m; i++) {
            List<Boolean> row = new List<Boolean>();
            for (Integer j = 0; j <= n; j++) row.add(false);
            dp.add(row);
        }
        dp[0][0] = true;
        for (Integer j = 1; j <= n; j++) {
            if (p.substring(j - 1, j) == '*') dp[0][j] = dp[0][j - 2];
        }
        for (Integer i = 1; i <= m; i++) {
            String sc = s.substring(i - 1, i);
            for (Integer j = 1; j <= n; j++) {
                String pc = p.substring(j - 1, j);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2];
                    String prev = p.substring(j - 2, j - 1);
                    if ((prev == '.' || prev == sc) && dp[i - 1][j]) dp[i][j] = true;
                } else if (pc == '.' || pc == sc) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    difficulty: "Easy",
    patterns: ["intervals"],
    topics: ["Intervals", "Sorting"],
    companies: ["google", "meta", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given an array of meeting time `intervals` [start, end], determine whether a single person could attend all of them (i.e. no two meetings overlap).",
    beginnerExplanation:
      "Sort the meetings by start time, then walk through them: if any meeting starts before the previous one ends, they overlap and you can't attend both.",
    realWorldAnalogy:
      "Checking your calendar for double-bookings: line up appointments by start time and look for any that begin before the one before it has finished.",
    visualExplanation:
      "[[0,30],[5,10],[15,20]] sorted → [0,30],[5,10]: 5 < 30 → overlap → false.",
    approaches: [
      {
        title: "Sort by start, scan for overlap",
        tier: "Optimal",
        idea: "After sorting, an overlap exists iff some interval's start is before the previous interval's end.",
        steps: ["Sort intervals by start", "For i≥1, if start[i] < end[i-1] → false", "Else true"],
        time: "O(n log n)",
        space: "O(1)",
      },
    ],
    dryRun: "[0,30],[5,10],[15,20]: 5 < 30 → cannot attend all → false.",
    interviewTips: [
      "This is the warm-up to Meeting Rooms II — frame it as 'is max overlap ≤ 1?'.",
      "Touching ends ([0,5],[5,10]) usually count as non-overlapping; clarify the boundary.",
    ],
    commonMistakes: ["Sorting by end instead of start.", "Using <= vs < inconsistently at the boundary."],
    followUps: ["Meeting Rooms II — minimum rooms needed.", "Return the conflicting pair."],
    related: ["meeting-rooms-ii", "merge-intervals"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def can_attend_meetings(intervals):
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Apex can't sort List<List<Integer>> directly, so we reduce to the
    // max-concurrent-meetings count (two sorted endpoint arrays) and check it is <= 1.
    public static Boolean canAttendMeetings(List<List<Integer>> intervals) {
        List<Integer> starts = new List<Integer>();
        List<Integer> ends = new List<Integer>();
        for (List<Integer> iv : intervals) { starts.add(iv[0]); ends.add(iv[1]); }
        starts.sort();
        ends.sort();
        Integer rooms = 0, maxRooms = 0, s = 0, e = 0, n = intervals.size();
        while (s < n) {
            if (starts[s] < ends[e]) { rooms++; if (rooms > maxRooms) maxRooms = rooms; s++; }
            else { rooms--; e++; }
        }
        return maxRooms <= 1;
    }
}`,
      },
    ],
  },
  {
    slug: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    patterns: ["intervals", "heap"],
    topics: ["Intervals", "Heap"],
    companies: ["google", "amazon", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given meeting time `intervals` [start, end], return the minimum number of conference rooms required so that no meeting is double-booked.",
    beginnerExplanation:
      "The answer is the maximum number of meetings happening at the same instant. Separate and sort all start times and all end times, then sweep: each start opens a room, each end frees one. The peak number of simultaneously open rooms is the answer.",
    realWorldAnalogy:
      "Counting how many cash registers you need at peak: every customer arrival opens a lane, every departure frees one — staff for the busiest moment.",
    visualExplanation:
      "[[0,30],[5,10],[15,20]]\nstarts 0,5,15 | ends 10,20,30\n0→1 room, 5→2 rooms (peak), 10 frees, 15→2... → max 2.",
    approaches: [
      {
        title: "Sort starts & ends, two-pointer sweep",
        tier: "Optimal",
        idea: "Sort starts and ends separately; advance through starts, releasing a room whenever the next end is ≤ the current start. Track the peak.",
        steps: [
          "Build sorted starts[] and ends[]",
          "Two pointers s, e; if starts[s] < ends[e]: rooms++, s++ else rooms--, e++",
          "Track max rooms",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "starts[0,5,15], ends[10,20,30]: 0<10 rooms=1; 5<10 rooms=2 (peak); 15<10? no → rooms=1; 15<20 rooms=2; done → max 2.",
    interviewTips: [
      "Equivalent framing: a min-heap of end times — pop when the earliest end ≤ next start. Mention both.",
      "Boundary: a meeting that ends exactly when another starts can reuse the room (use <).",
    ],
    commonMistakes: [
      "Keeping intervals paired and sorting only by start (loses the end ordering you need).",
      "Wrong comparison at equal start/end boundaries.",
    ],
    followUps: ["Return which meeting goes in which room.", "Heap-based variant with (end) keys."],
    related: ["meeting-rooms", "merge-intervals", "minimum-interval-to-include-each-query"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_meeting_rooms(intervals):
    if not intervals:
        return 0
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = max_rooms = 0
    s = e = 0
    n = len(intervals)
    while s < n:
        if starts[s] < ends[e]:
            rooms += 1
            max_rooms = max(max_rooms, rooms)
            s += 1
        else:
            rooms -= 1
            e += 1
    return max_rooms`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        int[] starts = new int[n], ends = new int[n];
        for (int i = 0; i < n; i++) { starts[i] = intervals[i][0]; ends[i] = intervals[i][1]; }
        Arrays.sort(starts);
        Arrays.sort(ends);
        int rooms = 0, maxRooms = 0, s = 0, e = 0;
        while (s < n) {
            if (starts[s] < ends[e]) { rooms++; maxRooms = Math.max(maxRooms, rooms); s++; }
            else { rooms--; e++; }
        }
        return maxRooms;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minMeetingRooms(intervals) {
  const n = intervals.length;
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
  let rooms = 0, maxRooms = 0, s = 0, e = 0;
  while (s < n) {
    if (starts[s] < ends[e]) { rooms++; maxRooms = Math.max(maxRooms, rooms); s++; }
    else { rooms--; e++; }
  }
  return maxRooms;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minMeetingRooms(List<List<Integer>> intervals) {
        Integer n = intervals.size();
        List<Integer> starts = new List<Integer>();
        List<Integer> ends = new List<Integer>();
        for (List<Integer> iv : intervals) { starts.add(iv[0]); ends.add(iv[1]); }
        starts.sort();
        ends.sort();
        Integer rooms = 0, maxRooms = 0, s = 0, e = 0;
        while (s < n) {
            if (starts[s] < ends[e]) { rooms++; if (rooms > maxRooms) maxRooms = rooms; s++; }
            else { rooms--; e++; }
        }
        return maxRooms;
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-interval-to-include-each-query",
    title: "Minimum Interval to Include Each Query",
    difficulty: "Hard",
    patterns: ["intervals", "heap"],
    topics: ["Intervals", "Heap"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given `intervals` [left, right] and an array of `queries`, for each query q return the size (right-left+1) of the smallest interval containing q, or -1 if none. Answer in the original query order.",
    beginnerExplanation:
      "Sort queries ascending and intervals by left. As you process queries in order, add every interval whose left ≤ q into a min-heap keyed by size, lazily discarding intervals whose right < q. The heap top is then the smallest valid interval for that query.",
    realWorldAnalogy:
      "For each moment in time, find the shortest event currently running. Walk forward in time adding events as they begin, drop events that have ended, and the shortest still-active event is your answer.",
    visualExplanation:
      "intervals=[[1,4],[2,4],[3,6],[4,4]], queries=[2,3,4,5]\nq2→ sizes{4,3} min 3? [2,4] size3; q5→ only [3,6] size4.",
    approaches: [
      {
        title: "Offline: sort queries + min-heap by interval size",
        tier: "Optimal",
        idea: "Process queries in increasing order; push intervals as their left passes the query, pop intervals whose right is already behind the query; heap top is the smallest covering interval.",
        steps: [
          "Sort intervals by left; sort a copy of queries ascending",
          "For each q: push all intervals with left ≤ q as (size, right)",
          "Pop while heap top's right < q",
          "Record heap top size (or -1) for q; finally map back to original order",
        ],
        time: "O((n+q) log n)",
        space: "O(n + q)",
      },
    ],
    dryRun:
      "Sorted queries 2,3,4,5. At q=2 heap has sizes for [1,4],[2,4] → min 3. At q=5, only [3,6] valid → 4. Map answers back to input order.",
    interviewTips: [
      "'Offline processing' — sorting the queries — is the unlock; say it explicitly.",
      "Lazy deletion (pop expired tops only when needed) keeps it O(log n) amortised.",
    ],
    commonMistakes: [
      "Forgetting to restore the original query order at the end.",
      "Eagerly removing intervals instead of lazily popping the heap top.",
    ],
    followUps: ["Online queries (no sorting) need a segment tree / merge-sort tree.", "Return the interval itself."],
    related: ["meeting-rooms-ii", "merge-intervals"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def min_interval(intervals, queries):
    intervals.sort()
    res = {}
    heap = []
    i = 0
    for q in sorted(queries):
        while i < len(intervals) and intervals[i][0] <= q:
            l, r = intervals[i]
            heapq.heappush(heap, (r - l + 1, r))
            i += 1
        while heap and heap[0][1] < q:
            heapq.heappop(heap)
        res[q] = heap[0][0] if heap else -1
    return [res[q] for q in queries]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        Integer[] order = new Integer[queries.length];
        for (int i = 0; i < queries.length; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(queries[a], queries[b]));
        // min-heap of {size, right}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        int[] ans = new int[queries.length];
        int i = 0;
        for (int idx : order) {
            int q = queries[idx];
            while (i < intervals.length && intervals[i][0] <= q) {
                pq.offer(new int[] { intervals[i][1] - intervals[i][0] + 1, intervals[i][1] });
                i++;
            }
            while (!pq.isEmpty() && pq.peek()[1] < q) pq.poll();
            ans[idx] = pq.isEmpty() ? -1 : pq.peek()[0];
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class MinHeap {
  constructor() { this.a = []; }
  get size() { return this.a.length; }
  peek() { return this.a[0]; }
  push(x) {
    const a = this.a; a.push(x); let i = a.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; }
  }
  pop() {
    const a = this.a, top = a[0], last = a.pop();
    if (a.length) { a[0] = last; let i = 0; const n = a.length;
      while (true) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
        if (l < n && a[l][0] < a[s][0]) s = l;
        if (r < n && a[r][0] < a[s][0]) s = r;
        if (s === i) break; [a[s], a[i]] = [a[i], a[s]]; i = s; } }
    return top;
  }
}

function minInterval(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  const order = queries.map((_, i) => i).sort((a, b) => queries[a] - queries[b]);
  const heap = new MinHeap();
  const ans = new Array(queries.length);
  let i = 0;
  for (const idx of order) {
    const q = queries[idx];
    while (i < intervals.length && intervals[i][0] <= q) {
      heap.push([intervals[i][1] - intervals[i][0] + 1, intervals[i][1]]);
      i++;
    }
    while (heap.size && heap.peek()[1] < q) heap.pop();
    ans[idx] = heap.size ? heap.peek()[0] : -1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Apex has no built-in priority queue; this uses a clear O(Q*N) scan
    // (for each query, find the smallest covering interval). Correct and
    // readable; the heap version above is the optimal O((N+Q)logN) approach.
    public static List<Integer> minInterval(List<List<Integer>> intervals, List<Integer> queries) {
        List<Integer> ans = new List<Integer>();
        for (Integer q : queries) {
            Integer best = -1;
            for (List<Integer> iv : intervals) {
                if (iv[0] <= q && q <= iv[1]) {
                    Integer size = iv[1] - iv[0] + 1;
                    if (best == -1 || size < best) best = size;
                }
            }
            ans.add(best);
        }
        return ans;
    }
}`,
      },
    ],
  },
];

import type { Problem } from "@/lib/types";

export const PROBLEMS_BATCH_AC: Problem[] = [
  {
    slug: "dijkstras-algorithm",
    title: "Dijkstra's Algorithm",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "google", "uber"],
    sheets: ["striver"],
    frequency: 5,
    statement:
      "Given a weighted, non-negative undirected graph with V vertices and an adjacency list where adj[u] holds [v, weight] pairs, return the shortest distance from a source vertex to every vertex.",
    beginnerExplanation:
      "Always expand the closest-known unsettled vertex first, then relax its edges (try to improve neighbours' distances). A min-heap keeps the closest frontier vertex at the top, so each vertex is settled with its final shortest distance.",
    realWorldAnalogy:
      "A GPS computing fastest routes: it keeps a priority list of 'cheapest reachable so far' intersections and always processes the cheapest next, never overshooting.",
    visualExplanation:
      "src=0, edges 0-1(2),0-2(4),1-2(1)\ndist:[0,2,4]→settle 1→relax 2: 2+1=3<4→dist[2]=3\nfinal:[0,2,3]",
    approaches: [
      {
        title: "Dijkstra with a min-heap",
        tier: "Optimal",
        idea: "Pop the closest vertex, skip stale entries, relax neighbours and push improved distances.",
        steps: [
          "dist[src]=0, push (0, src)",
          "Pop (d, u); if d > dist[u] skip (stale)",
          "For each edge (v, w): if d + w < dist[v], update and push",
        ],
        time: "O(E log V)",
        space: "O(V + E)",
      },
      {
        title: "O(V²) selection (no heap)",
        tier: "Better",
        idea: "Each step linearly scan for the closest unvisited vertex. Fine for dense graphs / heap-less languages.",
        steps: ["Repeat V times: pick min-dist unvisited u", "Mark visited, relax its edges"],
        time: "O(V²)",
        space: "O(V)",
      },
    ],
    dryRun:
      "src 0, adj 0→[(1,2),(2,4)] 1→[(0,2),(2,1)]\npop(0,0) relax→dist[1]=2,dist[2]=4\npop(2,1) relax 2→3\npop(3,2) done → [0,2,3]",
    interviewTips: [
      "State the non-negative-weights precondition — Dijkstra breaks with negative edges (use Bellman-Ford there).",
      "The 'if d > dist[u]: continue' stale-skip is what keeps it efficient with a lazy heap.",
    ],
    commonMistakes: [
      "Using Dijkstra on graphs with negative edges.",
      "Re-processing settled vertices because you forgot the stale-entry check.",
    ],
    followUps: [
      "Reconstruct the actual path (store parents).",
      "Count the number of shortest paths (see Number of Ways to Arrive at Destination).",
    ],
    related: ["number-of-ways-to-arrive-at-destination", "network-delay-time"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def dijkstra(V, adj, src):
    dist = [float("inf")] * V
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] dijkstra(int V, List<List<int[]>> adj, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[] { 0, src });
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int d = top[0], u = top[1];
            if (d > dist[u]) continue;
            for (int[] e : adj.get(u)) {
                int v = e[0], w = e[1];
                if (dist[u] != Integer.MAX_VALUE && d + w < dist[v]) {
                    dist[v] = d + w;
                    pq.add(new int[] { dist[v], v });
                }
            }
        }
        return dist;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function dijkstra(V, adj, src) {
  const dist = new Array(V).fill(Infinity);
  dist[src] = 0;
  const heap = [[0, src]]; // [d, node], kept as a binary min-heap
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const down = () => {
    let i = 0;
    const n = heap.length;
    for (;;) {
      let s = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && heap[l][0] < heap[s][0]) s = l;
      if (r < n && heap[r][0] < heap[s][0]) s = r;
      if (s === i) break;
      [heap[s], heap[i]] = [heap[i], heap[s]];
      i = s;
    }
  };
  while (heap.length) {
    const [d, u] = heap[0];
    const last = heap.pop();
    if (heap.length) { heap[0] = last; down(); }
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) { dist[v] = d + w; heap.push([dist[v], v]); up(heap.length - 1); }
    }
  }
  return dist;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Apex has no priority queue, so this is the O(V^2) selection variant.
    public static List<Integer> dijkstra(Integer V, List<List<List<Integer>>> adj, Integer src) {
        List<Integer> dist = new List<Integer>();
        for (Integer i = 0; i < V; i++) dist.add(2147483647);
        dist[src] = 0;
        Set<Integer> visited = new Set<Integer>();
        for (Integer c = 0; c < V; c++) {
            Integer u = -1, best = 2147483647;
            for (Integer i = 0; i < V; i++) {
                if (!visited.contains(i) && dist[i] < best) { best = dist[i]; u = i; }
            }
            if (u == -1) break;
            visited.add(u);
            for (List<Integer> e : adj[u]) {
                Integer v = e[0], w = e[1];
                if (best + w < dist[v]) dist[v] = best + w;
            }
        }
        return dist;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-ways-to-arrive-at-destination",
    title: "Number of Ways to Arrive at Destination",
    difficulty: "Medium",
    patterns: ["graphs", "dynamic-programming"],
    topics: ["Graphs"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "You have n intersections (0..n-1) connected by bidirectional roads, roads[i] = [u, v, time]. Count the number of ways to travel from 0 to n-1 in the shortest amount of time, modulo 1e9+7.",
    beginnerExplanation:
      "Run Dijkstra for shortest times, but alongside each distance keep a count of how many shortest ways reach that node. When you find a strictly shorter route, the count resets; when you find an equally-short route, the counts add up.",
    realWorldAnalogy:
      "Counting how many different fastest commutes exist: every time you discover another route that ties the record time, you add it to the tally.",
    visualExplanation:
      "ways[0]=1. Relax v with d+t:\nif d+t<dist[v]: dist[v]=d+t, ways[v]=ways[u]\nelif d+t==dist[v]: ways[v]+=ways[u]",
    approaches: [
      {
        title: "Dijkstra + ways counter",
        tier: "Optimal",
        idea: "Maintain dist[] and ways[]; reset ways on improvement, accumulate (mod) on a tie.",
        steps: [
          "dist[0]=0, ways[0]=1",
          "On strictly shorter: dist[v]=d+t, ways[v]=ways[u], push",
          "On equal: ways[v]=(ways[v]+ways[u]) % MOD",
        ],
        time: "O(E log V)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "Two equal shortest routes into node v from u1,u2 (each 1 way) → ways[v]=1+1=2",
    interviewTips: [
      "Take the modulo on every accumulation, not just at the end, to avoid overflow.",
      "Only add ways[u] when the candidate equals the CURRENT best (not a stale value).",
    ],
    commonMistakes: [
      "Forgetting the modulo, causing overflow.",
      "Adding counts on a strictly-shorter update instead of resetting.",
    ],
    followUps: ["Return the count of longest paths in a DAG.", "Reconstruct one shortest path."],
    related: ["dijkstras-algorithm"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def count_paths(n, roads):
    MOD = 10**9 + 7
    adj = [[] for _ in range(n)]
    for u, v, t in roads:
        adj[u].append((v, t))
        adj[v].append((u, t))
    dist = [float("inf")] * n
    ways = [0] * n
    dist[0] = 0
    ways[0] = 1
    pq = [(0, 0)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, t in adj[u]:
            if d + t < dist[v]:
                dist[v] = d + t
                ways[v] = ways[u]
                heapq.heappush(pq, (dist[v], v))
            elif d + t == dist[v]:
                ways[v] = (ways[v] + ways[u]) % MOD
    return ways[n - 1] % MOD`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int countPaths(int n, int[][] roads) {
        long MOD = 1_000_000_007L;
        List<List<long[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) {
            adj.get(r[0]).add(new long[] { r[1], r[2] });
            adj.get(r[1]).add(new long[] { r[0], r[2] });
        }
        long[] dist = new long[n];
        long[] ways = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[0] = 0; ways[0] = 1;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        pq.add(new long[] { 0, 0 });
        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0]; int u = (int) top[1];
            if (d > dist[u]) continue;
            for (long[] e : adj.get(u)) {
                int v = (int) e[0]; long t = e[1];
                if (d + t < dist[v]) {
                    dist[v] = d + t;
                    ways[v] = ways[u];
                    pq.add(new long[] { dist[v], v });
                } else if (d + t == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        return (int) (ways[n - 1] % MOD);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countPaths(n, roads) {
  const MOD = 1000000007n;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, t] of roads) { adj[u].push([v, t]); adj[v].push([u, t]); }
  const dist = new Array(n).fill(Infinity);
  const ways = new Array(n).fill(0n);
  dist[0] = 0; ways[0] = 1n;
  const heap = [[0, 0]];
  const up = (i) => { while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const down = () => { let i = 0; const m = heap.length; for (;;) { let s = i; const l = 2*i+1, r = 2*i+2; if (l < m && heap[l][0] < heap[s][0]) s = l; if (r < m && heap[r][0] < heap[s][0]) s = r; if (s === i) break; [heap[s], heap[i]] = [heap[i], heap[s]]; i = s; } };
  while (heap.length) {
    const [d, u] = heap[0];
    const last = heap.pop();
    if (heap.length) { heap[0] = last; down(); }
    if (d > dist[u]) continue;
    for (const [v, t] of adj[u]) {
      if (d + t < dist[v]) { dist[v] = d + t; ways[v] = ways[u]; heap.push([dist[v], v]); up(heap.length - 1); }
      else if (d + t === dist[v]) { ways[v] = (ways[v] + ways[u]) % MOD; }
    }
  }
  return Number(ways[n - 1] % MOD);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // O(V^2) Dijkstra + ways counter (Apex has no priority queue).
    public static Integer countPaths(Integer n, List<List<Integer>> roads) {
        Long MOD = 1000000007L;
        List<List<List<Integer>>> adj = new List<List<List<Integer>>>();
        for (Integer i = 0; i < n; i++) adj.add(new List<List<Integer>>());
        for (List<Integer> r : roads) {
            adj[r[0]].add(new List<Integer>{ r[1], r[2] });
            adj[r[1]].add(new List<Integer>{ r[0], r[2] });
        }
        List<Long> dist = new List<Long>();
        List<Long> ways = new List<Long>();
        for (Integer i = 0; i < n; i++) { dist.add(Long.valueOf('4611686018427387903')); ways.add(0L); }
        dist[0] = 0L; ways[0] = 1L;
        Set<Integer> visited = new Set<Integer>();
        for (Integer c = 0; c < n; c++) {
            Integer u = -1; Long best = Long.valueOf('4611686018427387903');
            for (Integer i = 0; i < n; i++) {
                if (!visited.contains(i) && dist[i] < best) { best = dist[i]; u = i; }
            }
            if (u == -1) break;
            visited.add(u);
            for (List<Integer> e : adj[u]) {
                Integer v = e[0]; Long t = (Long) e[1];
                if (best + t < dist[v]) { dist[v] = best + t; ways[v] = ways[u]; }
                else if (best + t == dist[v]) { ways[v] = Math.mod(ways[v] + ways[u], MOD); }
            }
        }
        return (Integer) Math.mod(ways[n - 1], MOD);
    }
}`,
      },
    ],
  },
  {
    slug: "bridges-in-graph",
    title: "Bridges in Graph",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an undirected graph with V vertices and a list of edges, find all bridges — edges whose removal increases the number of connected components.",
    beginnerExplanation:
      "Do a DFS and stamp each node with a discovery time. For each node track the lowest discovery time reachable from its subtree (via a back-edge). An edge u-v is a bridge when nothing in v's subtree can reach back to u or earlier — i.e. low[v] > disc[u].",
    realWorldAnalogy:
      "A bridge is the only road connecting two halves of a town — remove it and you can't get across. If there's any other loop-around route, it's not a bridge.",
    visualExplanation:
      "disc/low via DFS; edge (u,v) is a bridge iff low[v] > disc[u] (v's subtree has no back-edge above u).",
    approaches: [
      {
        title: "Tarjan's bridge-finding (DFS low-link)",
        tier: "Optimal",
        idea: "Single DFS computing discovery times and low-links; a tree edge is a bridge when low[child] > disc[node].",
        steps: [
          "DFS assigning disc[u]=low[u]=timer++",
          "For tree child v: recurse, low[u]=min(low[u],low[v]); if low[v]>disc[u] record bridge",
          "For visited non-parent v: low[u]=min(low[u],disc[v])",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "Chain 0-1-2: disc 0,1,2. low[2]=2>disc[1]=1 → bridge 1-2; low[1]=1>disc[0]=0 → bridge 0-1",
    interviewTips: [
      "low[v] > disc[u] (strict) marks a bridge; for articulation points the condition is low[v] >= disc[u].",
      "Skip the immediate parent edge, but be careful with parallel edges (track edge id, not just parent).",
    ],
    commonMistakes: [
      "Updating low[u] with low[v] for a back-edge instead of disc[v].",
      "Using >= instead of > (that finds articulation points, not bridges).",
    ],
    followUps: ["Find articulation points.", "Find strongly connected components (directed)."],
    related: ["articulation-points-in-graph", "strongly-connected-components"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import sys

def find_bridges(V, edges):
    sys.setrecursionlimit(10**6)
    adj = [[] for _ in range(V)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    disc = [-1] * V
    low = [0] * V
    timer = [0]
    bridges = []

    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        for v in adj[u]:
            if v == parent:
                continue
            if disc[v] == -1:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    bridges.append([u, v])
            else:
                low[u] = min(low[u], disc[v])

    for i in range(V):
        if disc[i] == -1:
            dfs(i, -1)
    return bridges`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private int timer = 0;
    private List<int[]> bridges = new ArrayList<>();

    public List<int[]> findBridges(int V, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        int[] disc = new int[V], low = new int[V];
        Arrays.fill(disc, -1);
        for (int i = 0; i < V; i++) if (disc[i] == -1) dfs(i, -1, adj, disc, low);
        return bridges;
    }

    private void dfs(int u, int parent, List<List<Integer>> adj, int[] disc, int[] low) {
        disc[u] = low[u] = timer++;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            if (disc[v] == -1) {
                dfs(v, u, adj, disc, low);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) bridges.add(new int[] { u, v });
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
        code: `function findBridges(V, edges) {
  const adj = Array.from({ length: V }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
  const disc = new Array(V).fill(-1);
  const low = new Array(V).fill(0);
  const bridges = [];
  let timer = 0;
  const dfs = (u, parent) => {
    disc[u] = low[u] = timer++;
    for (const v of adj[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([u, v]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  };
  for (let i = 0; i < V; i++) if (disc[i] === -1) dfs(i, -1);
  return bridges;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Integer timer = 0;
    private List<List<Integer>> bridges = new List<List<Integer>>();
    private List<List<Integer>> adj;
    private List<Integer> disc;
    private List<Integer> low;

    public List<List<Integer>> findBridges(Integer V, List<List<Integer>> edges) {
        adj = new List<List<Integer>>();
        disc = new List<Integer>();
        low = new List<Integer>();
        for (Integer i = 0; i < V; i++) { adj.add(new List<Integer>()); disc.add(-1); low.add(0); }
        for (List<Integer> e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        for (Integer i = 0; i < V; i++) if (disc[i] == -1) dfs(i, -1);
        return bridges;
    }

    private void dfs(Integer u, Integer parent) {
        disc[u] = timer; low[u] = timer; timer++;
        for (Integer v : adj[u]) {
            if (v == parent) continue;
            if (disc[v] == -1) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) bridges.add(new List<Integer>{ u, v });
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
    slug: "articulation-points-in-graph",
    title: "Articulation Points in Graph",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an undirected graph with V vertices and edges, find all articulation points — vertices whose removal increases the number of connected components.",
    beginnerExplanation:
      "Like bridges, but for vertices. Using DFS discovery/low times: a non-root vertex u is an articulation point if it has a child v whose subtree cannot reach above u (low[v] >= disc[u]). The DFS root is special — it's an articulation point only if it has more than one DFS child.",
    realWorldAnalogy:
      "A single airport that, if shut down, splits the flight network into disconnected regions — everyone must route through it.",
    visualExplanation:
      "Non-root u is an AP iff some child v has low[v] >= disc[u]. Root is an AP iff it has 2+ DFS children.",
    approaches: [
      {
        title: "Tarjan's articulation points (DFS low-link)",
        tier: "Optimal",
        idea: "DFS with disc/low; flag u when a child can't escape above it, with the special root rule.",
        steps: [
          "DFS assigning disc[u]=low[u]=timer++; count children",
          "Tree child v: recurse; low[u]=min(low[u],low[v]); if parent!=-1 and low[v]>=disc[u] mark u",
          "Root marked iff children > 1",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun: "Star center c with 3 leaves: each leaf's low >= disc[c] → c is an articulation point",
    interviewTips: [
      "The condition is low[v] >= disc[u] (note >=, vs > for bridges).",
      "Handle the DFS root separately — it needs 2+ children to be an AP.",
    ],
    commonMistakes: [
      "Applying the >= rule to the root (gives wrong roots).",
      "Counting the same vertex multiple times — use a boolean flag, then collect.",
    ],
    followUps: ["Find bridges.", "Biconnected components."],
    related: ["bridges-in-graph", "strongly-connected-components"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import sys

def articulation_points(V, edges):
    sys.setrecursionlimit(10**6)
    adj = [[] for _ in range(V)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    disc = [-1] * V
    low = [0] * V
    is_ap = [False] * V
    timer = [0]

    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        children = 0
        for v in adj[u]:
            if v == parent:
                continue
            if disc[v] == -1:
                children += 1
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if parent != -1 and low[v] >= disc[u]:
                    is_ap[u] = True
            else:
                low[u] = min(low[u], disc[v])
        if parent == -1 and children > 1:
            is_ap[u] = True

    for i in range(V):
        if disc[i] == -1:
            dfs(i, -1)
    return [i for i in range(V) if is_ap[i]]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private int timer = 0;

    public List<Integer> articulationPoints(int V, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        int[] disc = new int[V], low = new int[V];
        boolean[] isAp = new boolean[V];
        Arrays.fill(disc, -1);
        for (int i = 0; i < V; i++) if (disc[i] == -1) dfs(i, -1, adj, disc, low, isAp);
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < V; i++) if (isAp[i]) res.add(i);
        return res;
    }

    private void dfs(int u, int parent, List<List<Integer>> adj, int[] disc, int[] low, boolean[] isAp) {
        disc[u] = low[u] = timer++;
        int children = 0;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            if (disc[v] == -1) {
                children++;
                dfs(v, u, adj, disc, low, isAp);
                low[u] = Math.min(low[u], low[v]);
                if (parent != -1 && low[v] >= disc[u]) isAp[u] = true;
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        if (parent == -1 && children > 1) isAp[u] = true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function articulationPoints(V, edges) {
  const adj = Array.from({ length: V }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
  const disc = new Array(V).fill(-1);
  const low = new Array(V).fill(0);
  const isAp = new Array(V).fill(false);
  let timer = 0;
  const dfs = (u, parent) => {
    disc[u] = low[u] = timer++;
    let children = 0;
    for (const v of adj[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        children++;
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (parent !== -1 && low[v] >= disc[u]) isAp[u] = true;
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
    if (parent === -1 && children > 1) isAp[u] = true;
  };
  for (let i = 0; i < V; i++) if (disc[i] === -1) dfs(i, -1);
  const res = [];
  for (let i = 0; i < V; i++) if (isAp[i]) res.push(i);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Integer timer = 0;
    private List<List<Integer>> adj;
    private List<Integer> disc;
    private List<Integer> low;
    private List<Boolean> isAp;

    public List<Integer> articulationPoints(Integer V, List<List<Integer>> edges) {
        adj = new List<List<Integer>>();
        disc = new List<Integer>();
        low = new List<Integer>();
        isAp = new List<Boolean>();
        for (Integer i = 0; i < V; i++) { adj.add(new List<Integer>()); disc.add(-1); low.add(0); isAp.add(false); }
        for (List<Integer> e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        for (Integer i = 0; i < V; i++) if (disc[i] == -1) dfs(i, -1);
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < V; i++) if (isAp[i]) res.add(i);
        return res;
    }

    private void dfs(Integer u, Integer parent) {
        disc[u] = timer; low[u] = timer; timer++;
        Integer children = 0;
        for (Integer v : adj[u]) {
            if (v == parent) continue;
            if (disc[v] == -1) {
                children++;
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (parent != -1 && low[v] >= disc[u]) isAp[u] = true;
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        if (parent == -1 && children > 1) isAp[u] = true;
    }
}`,
      },
    ],
  },
  {
    slug: "strongly-connected-components",
    title: "Strongly Connected Components",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a directed graph with V vertices and edges, count the number of strongly connected components (maximal sets where every vertex can reach every other).",
    beginnerExplanation:
      "Kosaraju's algorithm: (1) DFS the graph pushing each vertex onto a stack in finish order; (2) reverse all edges; (3) pop vertices from the stack and DFS on the reversed graph — each fresh DFS uncovers exactly one SCC.",
    realWorldAnalogy:
      "Groups of cities where you can drive from any city to any other and back, even on one-way roads — each such cluster is one SCC.",
    visualExplanation:
      "finish-order stack from DFS1; transpose edges; DFS2 in reverse finish order → each tree = 1 SCC.",
    approaches: [
      {
        title: "Kosaraju's algorithm (two passes)",
        tier: "Optimal",
        idea: "Order by finish time, transpose the graph, then DFS in reverse finish order counting components.",
        steps: [
          "DFS1 on original graph, push vertices on finish",
          "Build the transposed (reversed) adjacency",
          "Pop vertices; each unvisited start in DFS2 is a new SCC",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun: "0→1→2→0 and 2→3: cycle {0,1,2} is one SCC, {3} another → count 2",
    interviewTips: [
      "Kosaraju = 2 DFS + a transpose; Tarjan does it in one DFS with low-links if asked for fewer passes.",
      "The finish-order stack is the crux — process the LAST-finished vertex first on the transpose.",
    ],
    commonMistakes: [
      "Forgetting to transpose the graph for the second pass.",
      "Using the wrong order (must be reverse finish order).",
    ],
    followUps: ["Tarjan's one-pass SCC.", "Condense the graph into a DAG of SCCs."],
    related: ["bridges-in-graph", "articulation-points-in-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import sys

def count_scc(V, edges):
    sys.setrecursionlimit(10**6)
    adj = [[] for _ in range(V)]
    radj = [[] for _ in range(V)]
    for u, v in edges:
        adj[u].append(v)
        radj[v].append(u)
    visited = [False] * V
    order = []

    def dfs1(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                dfs1(v)
        order.append(u)

    for i in range(V):
        if not visited[i]:
            dfs1(i)

    visited = [False] * V
    count = 0

    def dfs2(u):
        visited[u] = True
        for v in radj[u]:
            if not visited[v]:
                dfs2(v)

    for u in reversed(order):
        if not visited[u]:
            count += 1
            dfs2(u)
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int countSCC(int V, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>(), radj = new ArrayList<>();
        for (int i = 0; i < V; i++) { adj.add(new ArrayList<>()); radj.add(new ArrayList<>()); }
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); radj.get(e[1]).add(e[0]); }
        boolean[] visited = new boolean[V];
        Deque<Integer> order = new ArrayDeque<>();
        for (int i = 0; i < V; i++) if (!visited[i]) dfs1(i, adj, visited, order);
        Arrays.fill(visited, false);
        int count = 0;
        while (!order.isEmpty()) {
            int u = order.pop();
            if (!visited[u]) { count++; dfs2(u, radj, visited); }
        }
        return count;
    }

    private void dfs1(int u, List<List<Integer>> adj, boolean[] vis, Deque<Integer> order) {
        vis[u] = true;
        for (int v : adj.get(u)) if (!vis[v]) dfs1(v, adj, vis, order);
        order.push(u);
    }

    private void dfs2(int u, List<List<Integer>> radj, boolean[] vis) {
        vis[u] = true;
        for (int v : radj.get(u)) if (!vis[v]) dfs2(v, radj, vis);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countSCC(V, edges) {
  const adj = Array.from({ length: V }, () => []);
  const radj = Array.from({ length: V }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); radj[v].push(u); }
  const visited = new Array(V).fill(false);
  const order = [];
  const dfs1 = (u) => {
    visited[u] = true;
    for (const v of adj[u]) if (!visited[v]) dfs1(v);
    order.push(u);
  };
  for (let i = 0; i < V; i++) if (!visited[i]) dfs1(i);
  visited.fill(false);
  let count = 0;
  const dfs2 = (u) => {
    visited[u] = true;
    for (const v of radj[u]) if (!visited[v]) dfs2(v);
  };
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!visited[u]) { count++; dfs2(u); }
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private List<List<Integer>> adj;
    private List<List<Integer>> radj;
    private List<Boolean> visited;
    private List<Integer> order;

    public Integer countSCC(Integer V, List<List<Integer>> edges) {
        adj = new List<List<Integer>>();
        radj = new List<List<Integer>>();
        visited = new List<Boolean>();
        order = new List<Integer>();
        for (Integer i = 0; i < V; i++) { adj.add(new List<Integer>()); radj.add(new List<Integer>()); visited.add(false); }
        for (List<Integer> e : edges) { adj[e[0]].add(e[1]); radj[e[1]].add(e[0]); }
        for (Integer i = 0; i < V; i++) if (!visited[i]) dfs1(i);
        for (Integer i = 0; i < V; i++) visited[i] = false;
        Integer count = 0;
        for (Integer i = order.size() - 1; i >= 0; i--) {
            Integer u = order[i];
            if (!visited[u]) { count++; dfs2(u); }
        }
        return count;
    }

    private void dfs1(Integer u) {
        visited[u] = true;
        for (Integer v : adj[u]) if (!visited[v]) dfs1(v);
        order.add(u);
    }

    private void dfs2(Integer u) {
        visited[u] = true;
        for (Integer v : radj[u]) if (!visited[v]) dfs2(v);
    }
}`,
      },
    ],
  },
  {
    slug: "check-if-array-represents-a-min-heap",
    title: "Check if Array Represents a Min Heap",
    difficulty: "Easy",
    patterns: ["heap"],
    topics: ["Heaps"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a 0-indexed array, determine whether it represents a valid binary min-heap — every node is <= its children (children of i are at 2i+1 and 2i+2).",
    beginnerExplanation:
      "A binary heap stores a complete tree in an array. For a min-heap, each parent must be no larger than its children. You only need to check the parents (the first n/2 indices); leaves have no children.",
    realWorldAnalogy:
      "A company org chart where every manager earns no more than each direct report — scan managers, verify the rule.",
    visualExplanation:
      "i with children 2i+1, 2i+2; valid iff arr[i] <= both. Only check i in [0, n/2).",
    approaches: [
      {
        title: "Scan internal nodes",
        tier: "Optimal",
        idea: "For each parent index, verify it does not exceed its (existing) children.",
        steps: [
          "For i from 0 to n/2 - 1:",
          "Left = 2i+1, Right = 2i+2",
          "If a child exists and arr[i] > child, return false",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[1,3,2,5,4]: i0(1<=3,2)ok i1(3<=5,4)ok → true; [2,1,...] i0(2>1) → false",
    interviewTips: [
      "Only the first floor(n/2) indices are parents — checking leaves is wasted work.",
      "Guard child indices against n (the last parent may have only a left child).",
    ],
    commonMistakes: [
      "Checking all n indices including leaves.",
      "Index out of bounds when the right child doesn't exist.",
    ],
    followUps: ["Check for a max-heap.", "Convert a min-heap to a max-heap."],
    related: ["convert-min-heap-to-max-heap"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_min_heap(arr):
    n = len(arr)
    for i in range(n // 2):
        l, r = 2 * i + 1, 2 * i + 2
        if l < n and arr[i] > arr[l]:
            return False
        if r < n and arr[i] > arr[r]:
            return False
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isMinHeap(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n / 2; i++) {
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && arr[i] > arr[l]) return false;
            if (r < n && arr[i] > arr[r]) return false;
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isMinHeap(arr) {
  const n = arr.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[i] > arr[l]) return false;
    if (r < n && arr[i] > arr[r]) return false;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isMinHeap(List<Integer> arr) {
        Integer n = arr.size();
        for (Integer i = 0; i < n / 2; i++) {
            Integer l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && arr[i] > arr[l]) return false;
            if (r < n && arr[i] > arr[r]) return false;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "convert-min-heap-to-max-heap",
    title: "Convert Min Heap to Max Heap",
    difficulty: "Medium",
    patterns: ["heap"],
    topics: ["Heaps"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array that is already a valid binary min-heap, rearrange it in place so it becomes a valid binary max-heap.",
    beginnerExplanation:
      "Ignore that it's currently a min-heap and just build a max-heap from scratch using the standard bottom-up heapify: starting from the last internal node down to the root, sift each node down so the larger child bubbles up. Bottom-up heapify is O(n), not O(n log n).",
    realWorldAnalogy:
      "Re-stacking a pile so the biggest item sits on top: you fix small sub-piles from the bottom up, and the heaviest naturally rises to the summit.",
    visualExplanation:
      "Heapify from i = n/2-1 down to 0, sifting down with the LARGER child → max-heap.",
    approaches: [
      {
        title: "Bottom-up max-heapify",
        tier: "Optimal",
        idea: "Sift down every internal node from last to first; total work is O(n).",
        steps: [
          "For i from n/2-1 down to 0: siftDown(i)",
          "siftDown swaps with the larger child while a child is bigger",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[1,2,3] heapify i0: larger child 3>1 → swap → [3,2,1] (max-heap)",
    interviewTips: [
      "Bottom-up heapify is O(n); inserting one-by-one would be O(n log n).",
      "The min-heap property gives no shortcut — you rebuild as a max-heap.",
    ],
    commonMistakes: [
      "Sifting up instead of down, or starting from the root.",
      "Comparing against the smaller child (that builds a min-heap again).",
    ],
    followUps: ["Heap sort.", "Build a heap from an arbitrary array."],
    related: ["check-if-array-represents-a-min-heap"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def convert_to_max_heap(arr):
    n = len(arr)

    def sift_down(i):
        while True:
            largest = i
            l, r = 2 * i + 1, 2 * i + 2
            if l < n and arr[l] > arr[largest]:
                largest = l
            if r < n and arr[r] > arr[largest]:
                largest = r
            if largest == i:
                break
            arr[i], arr[largest] = arr[largest], arr[i]
            i = largest

    for i in range(n // 2 - 1, -1, -1):
        sift_down(i)
    return arr`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void convertToMaxHeap(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) siftDown(arr, i, n);
    }

    private void siftDown(int[] arr, int i, int n) {
        while (true) {
            int largest = i, l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && arr[l] > arr[largest]) largest = l;
            if (r < n && arr[r] > arr[largest]) largest = r;
            if (largest == i) break;
            int tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
            i = largest;
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function convertToMaxHeap(arr) {
  const n = arr.length;
  const siftDown = (i) => {
    for (;;) {
      let largest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;
      if (largest === i) break;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      i = largest;
    }
  };
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(i);
  return arr;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> convertToMaxHeap(List<Integer> arr) {
        Integer n = arr.size();
        for (Integer i = n / 2 - 1; i >= 0; i--) siftDown(arr, i, n);
        return arr;
    }

    private static void siftDown(List<Integer> arr, Integer i, Integer n) {
        while (true) {
            Integer largest = i, l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && arr[l] > arr[largest]) largest = l;
            if (r < n && arr[r] > arr[largest]) largest = r;
            if (largest == i) break;
            Integer tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
            i = largest;
        }
    }
}`,
      },
    ],
  },
  {
    slug: "kth-smallest-element-in-an-array",
    title: "Kth Smallest Element in an Array",
    difficulty: "Easy",
    patterns: ["heap"],
    topics: ["Heaps"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an array and an integer k, return the kth smallest element (1-indexed).",
    beginnerExplanation:
      "Maintain a max-heap of the k smallest values seen so far. Push each element; if the heap grows beyond k, pop the largest. The top is then the kth smallest. (Quickselect gives O(n) average if a heap isn't wanted.)",
    realWorldAnalogy:
      "Keeping only the k cheapest items on a 'shortlist' board: whenever a cheaper item appears and the board is full, the most expensive of the shortlist falls off.",
    visualExplanation:
      "max-heap size k of smallest-so-far; after the pass, heap top = kth smallest.",
    approaches: [
      {
        title: "Max-heap of size k",
        tier: "Optimal",
        idea: "Keep the k smallest in a max-heap; the root is the answer.",
        steps: [
          "Push each element into a max-heap",
          "If size > k, pop the max",
          "Return the heap root",
        ],
        time: "O(n log k)",
        space: "O(k)",
      },
      {
        title: "Quickselect",
        tier: "Better",
        idea: "Partition like quicksort but recurse only into the side containing the kth index.",
        steps: ["Partition around a pivot", "Recurse into the half holding index k-1"],
        time: "O(n) average, O(n²) worst",
        space: "O(1)",
      },
    ],
    dryRun: "[7,10,4,3,20,15], k=3 → smallest three {3,4,7}, max of them = 7",
    interviewTips: [
      "Max-heap of size k for kth SMALLEST; min-heap of size k for kth LARGEST.",
      "Mention quickselect for the O(n)-average follow-up.",
    ],
    commonMistakes: [
      "Mixing up which heap polarity gives smallest vs largest.",
      "Off-by-one with 1-indexed k.",
    ],
    followUps: ["Kth largest element.", "Median of a stream."],
    related: ["kth-largest-element-in-an-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def kth_smallest(arr, k):
    heap = []  # max-heap via negation, holds the k smallest
    for x in arr:
        heapq.heappush(heap, -x)
        if len(heap) > k:
            heapq.heappop(heap)
    return -heap[0]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int kthSmallest(int[] arr, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int x : arr) {
            maxHeap.add(x);
            if (maxHeap.size() > k) maxHeap.poll();
        }
        return maxHeap.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function kthSmallest(arr, k) {
  // Simple and clear: sort and index. O(n log n).
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[k - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer kthSmallest(List<Integer> arr, Integer k) {
        List<Integer> sorted = new List<Integer>(arr);
        sorted.sort();
        return sorted[k - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "divide-array-into-sets-of-k-consecutive-numbers",
    title: "Divide Array into Sets of K Consecutive Numbers",
    difficulty: "Medium",
    patterns: ["greedy", "hashing"],
    topics: ["Greedy", "Hashing"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array nums and an integer k, return true if nums can be partitioned into groups of exactly k consecutive numbers.",
    beginnerExplanation:
      "Count how many of each number you have. Then repeatedly take the smallest remaining number x and try to form a run x, x+1, ..., x+k-1, decrementing each count. If any required number runs short, it's impossible.",
    realWorldAnalogy:
      "Dealing cards into straights of length k: always start a straight from the lowest card you still hold, and it must extend k in a row.",
    visualExplanation:
      "count={1:1,2:1,3:1,4:1}, k=2: start 1→use 1,2; start 3→use 3,4 → true",
    approaches: [
      {
        title: "Greedy from the smallest with a frequency map",
        tier: "Optimal",
        idea: "Always start a group at the smallest available number; greedily consume the next k-1 numbers.",
        steps: [
          "If len % k != 0 → false",
          "Count frequencies; iterate keys in sorted order",
          "For a key with leftover c, consume c of each of x..x+k-1 (fail if short)",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "[1,2,3,3,4,4,5,6], k=4 → {1,2,3,4} and {3,4,5,6} → true",
    interviewTips: [
      "Early-exit when n % k != 0.",
      "Starting from the smallest is what makes the greedy correct — the smallest must begin some group.",
    ],
    commonMistakes: [
      "Not iterating keys in sorted order.",
      "Forgetting to scale by the leftover count c (decrement by c, not 1).",
    ],
    followUps: ["Hand of Straights (identical problem).", "Split into runs of varying length."],
    related: ["hand-of-straights"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import Counter

def is_possible_divide(nums, k):
    if len(nums) % k != 0:
        return False
    count = Counter(nums)
    for x in sorted(count):
        c = count[x]
        if c > 0:
            for j in range(x, x + k):
                if count[j] < c:
                    return False
                count[j] -= c
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isPossibleDivide(int[] nums, int k) {
        if (nums.length % k != 0) return false;
        TreeMap<Integer, Integer> count = new TreeMap<>();
        for (int x : nums) count.merge(x, 1, Integer::sum);
        for (int x : new ArrayList<>(count.keySet())) {
            int c = count.getOrDefault(x, 0);
            if (c > 0) {
                for (int j = x; j < x + k; j++) {
                    int have = count.getOrDefault(j, 0);
                    if (have < c) return false;
                    count.put(j, have - c);
                }
            }
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isPossibleDivide(nums, k) {
  if (nums.length % k !== 0) return false;
  const count = new Map();
  for (const x of nums) count.set(x, (count.get(x) || 0) + 1);
  const keys = [...count.keys()].sort((a, b) => a - b);
  for (const x of keys) {
    const c = count.get(x) || 0;
    if (c > 0) {
      for (let j = x; j < x + k; j++) {
        const have = count.get(j) || 0;
        if (have < c) return false;
        count.set(j, have - c);
      }
    }
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isPossibleDivide(List<Integer> nums, Integer k) {
        if (Math.mod(nums.size(), k) != 0) return false;
        Map<Integer, Integer> count = new Map<Integer, Integer>();
        for (Integer x : nums) count.put(x, (count.containsKey(x) ? count.get(x) : 0) + 1);
        List<Integer> keys = new List<Integer>(count.keySet());
        keys.sort();
        for (Integer x : keys) {
            Integer c = count.containsKey(x) ? count.get(x) : 0;
            if (c > 0) {
                for (Integer j = x; j < x + k; j++) {
                    Integer have = count.containsKey(j) ? count.get(j) : 0;
                    if (have < c) return false;
                    count.put(j, have - c);
                }
            }
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-xor-with-an-element-from-array",
    title: "Maximum XOR With an Element From Array",
    difficulty: "Hard",
    patterns: ["bit-manipulation", "trees"],
    topics: ["Bit Manipulation", "Tries"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given nums and queries[i] = [xi, mi], for each query return the maximum value of (xi XOR nums[j]) over all nums[j] <= mi, or -1 if no such element exists.",
    beginnerExplanation:
      "Process queries OFFLINE: sort queries by mi ascending and sort nums. Walk a pointer inserting all nums <= mi into a binary trie (bits from high to low), then for xi greedily walk the trie choosing the opposite bit at each level to maximise XOR.",
    realWorldAnalogy:
      "Answering 'best match under a budget' questions in budget order: as the budget grows you only ever ADD more candidates to your searchable index, never remove.",
    visualExplanation:
      "sort queries by m; pointer inserts nums<=m into a bit-trie; per query greedily pick opposite bit high→low for max XOR.",
    approaches: [
      {
        title: "Offline queries + binary (bitwise) trie",
        tier: "Optimal",
        idea: "Sort queries by the cap m; insert eligible nums into a trie once; greedy opposite-bit walk per query.",
        steps: [
          "Sort nums; sort query indices by m",
          "For each query, insert all nums <= m into the trie",
          "Greedy-walk the trie for x choosing the opposite bit when possible",
        ],
        time: "O((n + q) log(maxVal) + q log q)",
        space: "O(n log(maxVal))",
      },
    ],
    dryRun:
      "nums=[0,1,2,3,4], q=[0,1]→nums<=1 {0,1}; max(0^0,0^1)=1",
    interviewTips: [
      "Offline + monotonic pointer works because sorting queries by m makes insertions append-only.",
      "Use a fixed bit width (e.g. 30 bits for values < 1e9) for the trie depth.",
    ],
    commonMistakes: [
      "Returning -1 logic wrong when no nums qualify for the smallest m.",
      "Walking the trie low-to-high instead of high-to-low (XOR is maximised from the top bit).",
    ],
    followUps: ["Maximum XOR of two numbers in an array.", "XOR queries with deletions (harder)."],
    related: ["maximum-xor-of-two-numbers-in-an-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def maximize_xor(nums, queries):
    HIGH = 29
    nums = sorted(nums)
    order = sorted(range(len(queries)), key=lambda i: queries[i][1])
    ans = [-1] * len(queries)
    root = {}
    any_inserted = False

    def insert(num):
        node = root
        for b in range(HIGH, -1, -1):
            bit = (num >> b) & 1
            node = node.setdefault(bit, {})

    def query(num):
        node = root
        res = 0
        for b in range(HIGH, -1, -1):
            bit = (num >> b) & 1
            want = 1 - bit
            if want in node:
                res |= (1 << b)
                node = node[want]
            else:
                node = node[bit]
        return res

    j = 0
    for i in order:
        x, m = queries[i]
        while j < len(nums) and nums[j] <= m:
            insert(nums[j])
            any_inserted = True
            j += 1
        ans[i] = query(x) if any_inserted else -1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    static class Node { Node[] ch = new Node[2]; }
    private final int HIGH = 29;
    private final Node root = new Node();

    public int[] maximizeXor(int[] nums, int[][] queries) {
        Arrays.sort(nums);
        int n = queries.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> queries[a][1] - queries[b][1]);
        int[] ans = new int[n];
        boolean any = false;
        int j = 0;
        for (int qi : order) {
            int x = queries[qi][0], m = queries[qi][1];
            while (j < nums.length && nums[j] <= m) { insert(nums[j]); any = true; j++; }
            ans[qi] = any ? query(x) : -1;
        }
        return ans;
    }

    private void insert(int num) {
        Node node = root;
        for (int b = HIGH; b >= 0; b--) {
            int bit = (num >> b) & 1;
            if (node.ch[bit] == null) node.ch[bit] = new Node();
            node = node.ch[bit];
        }
    }

    private int query(int num) {
        Node node = root; int res = 0;
        for (int b = HIGH; b >= 0; b--) {
            int bit = (num >> b) & 1, want = 1 - bit;
            if (node.ch[want] != null) { res |= (1 << b); node = node.ch[want]; }
            else node = node.ch[bit];
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maximizeXor(nums, queries) {
  const HIGH = 29;
  nums = [...nums].sort((a, b) => a - b);
  const n = queries.length;
  const order = [...Array(n).keys()].sort((a, b) => queries[a][1] - queries[b][1]);
  const ans = new Array(n).fill(-1);
  const root = [null, null];
  let any = false, j = 0;
  const insert = (num) => {
    let node = root;
    for (let b = HIGH; b >= 0; b--) {
      const bit = (num >> b) & 1;
      if (!node[bit]) node[bit] = [null, null];
      node = node[bit];
    }
  };
  const query = (num) => {
    let node = root, res = 0;
    for (let b = HIGH; b >= 0; b--) {
      const bit = (num >> b) & 1, want = bit ^ 1;
      if (node[want]) { res |= (1 << b); node = node[want]; }
      else node = node[bit];
    }
    return res;
  };
  for (const qi of order) {
    const [x, m] = queries[qi];
    while (j < nums.length && nums[j] <= m) { insert(nums[j]); any = true; j++; }
    ans[qi] = any ? query(x) : -1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Apex version uses the straightforward O(n * q) scan for clarity; the
    // other languages show the optimal offline-trie approach.
    public static List<Integer> maximizeXor(List<Integer> nums, List<List<Integer>> queries) {
        List<Integer> ans = new List<Integer>();
        for (List<Integer> q : queries) {
            Integer x = q[0], m = q[1], best = -1;
            for (Integer num : nums) {
                if (num <= m) {
                    Integer xr = x ^ num;
                    if (xr > best) best = xr;
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
  {
    slug: "replace-each-element-with-rank-in-array",
    title: "Replace Each Element with Rank in Array",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Replace each element of an array with its rank: the smallest distinct value has rank 1, the next distinct value rank 2, and so on. Equal values share the same rank.",
    beginnerExplanation:
      "Collect the distinct values, sort them, and map each value to its 1-based position. Then rewrite the array using that map.",
    realWorldAnalogy:
      "Converting exam scores to placement positions — everyone with the same score gets the same rank, and the next distinct score is one rank lower.",
    visualExplanation:
      "[20,15,26,2,98,6] → sorted distinct [2,6,15,20,26,98] → ranks {2:1,6:2,15:3,20:4,26:5,98:6} → [4,3,5,1,6,2]",
    approaches: [
      {
        title: "Sort distinct values + map to rank",
        tier: "Optimal",
        idea: "Map each distinct value to its index+1 in the sorted unique list, then remap the array.",
        steps: [
          "Build the set of distinct values and sort it",
          "rank[value] = position + 1",
          "Replace each element via the map",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "[10,8,15,12,6,20,1] distinct-sorted [1,6,8,10,12,15,20] → ranks → [4,3,6,5,2,7,1]",
    interviewTips: [
      "Use a set first so duplicates collapse to one rank.",
      "Ranks are 1-indexed by convention.",
    ],
    commonMistakes: [
      "Giving duplicates different ranks (must share).",
      "Off-by-one (rank starts at 1, not 0).",
    ],
    followUps: ["Coordinate compression (the same idea, used in segment-tree problems)."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def replace_with_rank(arr):
    rank = {v: i + 1 for i, v in enumerate(sorted(set(arr)))}
    return [rank[x] for x in arr]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] replaceWithRank(int[] arr) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        Map<Integer, Integer> rank = new HashMap<>();
        int r = 1;
        for (int v : sorted) if (!rank.containsKey(v)) rank.put(v, r++);
        int[] res = new int[arr.length];
        for (int i = 0; i < arr.length; i++) res[i] = rank.get(arr[i]);
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function replaceWithRank(arr) {
  const sorted = [...new Set(arr)].sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((v, i) => rank.set(v, i + 1));
  return arr.map((x) => rank.get(x));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> replaceWithRank(List<Integer> arr) {
        List<Integer> sorted = new List<Integer>(arr);
        sorted.sort();
        Map<Integer, Integer> rank = new Map<Integer, Integer>();
        Integer r = 1;
        for (Integer v : sorted) if (!rank.containsKey(v)) rank.put(v, r++);
        List<Integer> res = new List<Integer>();
        for (Integer x : arr) res.add(rank.get(x));
        return res;
    }
}`,
      },
    ],
  },
];

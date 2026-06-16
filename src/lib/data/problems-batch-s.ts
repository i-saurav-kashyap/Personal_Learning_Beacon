import type { Problem } from "@/lib/types";

// Graphs — shortest paths, MST, and union-find (Striver A2Z gaps).
export const PROBLEMS_BATCH_S: Problem[] = [
  {
    slug: "shortest-path-in-undirected-graph-with-unit-weights",
    title: "Shortest Path in Undirected Graph with Unit Weights",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Shortest Path"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an undirected graph of V nodes (0..V-1) with unit-weight edges and a source `src`, return the shortest distance from src to every node, or -1 for unreachable nodes.",
    beginnerExplanation:
      "Every edge costs the same (1), so the fewest-edges path is the shortest path. A plain BFS from the source visits nodes in increasing distance, so the first time you reach a node is via its shortest path.",
    realWorldAnalogy:
      "Ripples from a stone in a pond reach all points one ring at a time — BFS expands in exactly those concentric rings of equal distance.",
    visualExplanation:
      "BFS layer 0 = {src}, layer 1 = its neighbours, layer 2 = their unseen neighbours … dist = the layer number a node first appears in.",
    approaches: [
      {
        title: "Dijkstra (overkill)",
        tier: "Better",
        idea: "Works but the priority queue is unnecessary when all weights are equal.",
        steps: ["Run Dijkstra from src"],
        time: "O(E log V)",
        space: "O(V + E)",
      },
      {
        title: "Breadth-first search",
        tier: "Optimal",
        idea: "With unit weights, BFS settles each node at its shortest distance on first visit.",
        steps: [
          "dist[] = -1, dist[src] = 0, queue = [src]",
          "Pop u; for each neighbour w with dist[w] == -1 set dist[w] = dist[u] + 1 and enqueue",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "edges 0-1,1-2,0-3, src=0: dist[0]=0 → visit 1,3 (dist 1) → visit 2 (dist 2). Result [0,1,2,1].",
    interviewTips: [
      "Name it: 'unit weights → BFS, not Dijkstra'. Interviewers want you to avoid the heap here.",
      "BFS only gives shortest paths when every edge weight is identical.",
    ],
    commonMistakes: [
      "Using DFS (it does not produce shortest distances).",
      "Marking distance when popping instead of when first discovered → wrong distances / repeats.",
    ],
    followUps: ["Weighted edges (→ Dijkstra).", "0/1 weights (→ 0-1 BFS with a deque)."],
    related: ["shortest-path-in-a-dag"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def shortest_path(V, edges, src):
    g = [[] for _ in range(V)]
    for u, v in edges:
        g[u].append(v)
        g[v].append(u)
    dist = [-1] * V
    dist[src] = 0
    q = deque([src])
    while q:
        u = q.popleft()
        for w in g[u]:
            if dist[w] == -1:
                dist[w] = dist[u] + 1
                q.append(w)
    return dist`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] shortestPath(int V, int[][] edges, int src) {
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i < V; i++) g.add(new ArrayList<>());
        for (int[] e : edges) { g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]); }
        int[] dist = new int[V];
        Arrays.fill(dist, -1);
        dist[src] = 0;
        Queue<Integer> q = new LinkedList<>();
        q.add(src);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int w : g.get(u)) {
                if (dist[w] == -1) { dist[w] = dist[u] + 1; q.add(w); }
            }
        }
        return dist;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function shortestPath(V, edges, src) {
  const g = Array.from({ length: V }, () => []);
  for (const [u, v] of edges) { g[u].push(v); g[v].push(u); }
  const dist = new Array(V).fill(-1);
  dist[src] = 0;
  const q = [src];
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    for (const w of g[u]) {
      if (dist[w] === -1) { dist[w] = dist[u] + 1; q.push(w); }
    }
  }
  return dist;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> shortestPath(Integer V, List<List<Integer>> edges, Integer src) {
        Map<Integer, List<Integer>> g = new Map<Integer, List<Integer>>();
        for (Integer i = 0; i < V; i++) g.put(i, new List<Integer>());
        for (List<Integer> e : edges) { g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]); }
        List<Integer> dist = new List<Integer>();
        for (Integer i = 0; i < V; i++) dist.add(-1);
        dist[src] = 0;
        List<Integer> q = new List<Integer>{ src };
        Integer head = 0;
        while (head < q.size()) {
            Integer u = q[head++];
            for (Integer w : g.get(u)) {
                if (dist[w] == -1) { dist[w] = dist[u] + 1; q.add(w); }
            }
        }
        return dist;
    }
}`,
      },
    ],
  },
  {
    slug: "shortest-path-in-a-dag",
    title: "Shortest Path in a DAG",
    difficulty: "Medium",
    patterns: ["graphs", "dynamic-programming"],
    topics: ["Graphs", "Shortest Path", "Topological Sort"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a weighted Directed Acyclic Graph (DAG) with V nodes and a source, return the shortest distance to every node, or -1 if unreachable.",
    beginnerExplanation:
      "In a DAG there are no cycles, so you can lay the nodes out in a linear topological order. Processing nodes in that order means a node's shortest distance is final before you use it to relax its neighbours — no priority queue needed.",
    realWorldAnalogy:
      "Like a build pipeline: you can only start a task after its prerequisites, so order tasks by dependency and the earliest finish time of each is fixed once you reach it.",
    visualExplanation:
      "Topological sort gives an order where every edge points 'forward'. Relax edges in that order; distances settle left to right.",
    approaches: [
      {
        title: "Dijkstra",
        tier: "Better",
        idea: "Works on the non-negative DAG but the heap is unnecessary.",
        steps: ["Run Dijkstra"],
        time: "O(E log V)",
        space: "O(V + E)",
      },
      {
        title: "Topological order + relax",
        tier: "Optimal",
        idea: "Compute a topo order (DFS), then relax each node's edges once in that order.",
        steps: [
          "Build a topological order via DFS post-order reversed",
          "dist[src] = 0, others ∞",
          "For u in topo order, if reachable relax each edge u→v",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "0→1(2), 0→2(1), 2→1(-? no, DAG positive) … process topo [0,2,1]: dist[0]=0, relax →dist[2]=1, dist[1]=2; from 2 relax to 1 if shorter.",
    interviewTips: [
      "'DAG → topo sort + one relaxation pass, O(V+E)'. Mention it beats Dijkstra here.",
      "DAG shortest path even works with negative weights (no cycles to exploit).",
    ],
    commonMistakes: [
      "Forgetting to skip unreachable nodes (dist still ∞) when relaxing.",
      "Relaxing in arbitrary order instead of topological order.",
    ],
    followUps: ["Longest path in a DAG (negate weights).", "General graph with negatives (Bellman-Ford)."],
    related: ["shortest-path-in-undirected-graph-with-unit-weights"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def shortest_path_dag(V, edges, src):
    g = [[] for _ in range(V)]
    for u, v, w in edges:
        g[u].append((v, w))
    visited = [False] * V
    order = []
    def dfs(u):
        visited[u] = True
        for v, _ in g[u]:
            if not visited[v]:
                dfs(v)
        order.append(u)
    for i in range(V):
        if not visited[i]:
            dfs(i)
    order.reverse()
    INF = float("inf")
    dist = [INF] * V
    dist[src] = 0
    for u in order:
        if dist[u] != INF:
            for v, w in g[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
    return [-1 if d == INF else d for d in dist]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] shortestPath(int V, int[][] edges, int src) {
        List<List<int[]>> g = new ArrayList<>();
        for (int i = 0; i < V; i++) g.add(new ArrayList<>());
        for (int[] e : edges) g.get(e[0]).add(new int[]{e[1], e[2]});
        boolean[] vis = new boolean[V];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < V; i++) if (!vis[i]) topo(i, g, vis, stack);
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        while (!stack.isEmpty()) {
            int u = stack.pop();
            if (dist[u] == Integer.MAX_VALUE) continue;
            for (int[] e : g.get(u))
                if (dist[u] + e[1] < dist[e[0]]) dist[e[0]] = dist[u] + e[1];
        }
        for (int i = 0; i < V; i++) if (dist[i] == Integer.MAX_VALUE) dist[i] = -1;
        return dist;
    }
    private void topo(int u, List<List<int[]>> g, boolean[] vis, Deque<Integer> st) {
        vis[u] = true;
        for (int[] e : g.get(u)) if (!vis[e[0]]) topo(e[0], g, vis, st);
        st.push(u);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function shortestPathDAG(V, edges, src) {
  const g = Array.from({ length: V }, () => []);
  for (const [u, v, w] of edges) g[u].push([v, w]);
  const vis = new Array(V).fill(false);
  const order = [];
  const dfs = (u) => {
    vis[u] = true;
    for (const [v] of g[u]) if (!vis[v]) dfs(v);
    order.push(u);
  };
  for (let i = 0; i < V; i++) if (!vis[i]) dfs(i);
  order.reverse();
  const INF = Infinity;
  const dist = new Array(V).fill(INF);
  dist[src] = 0;
  for (const u of order) {
    if (dist[u] === INF) continue;
    for (const [v, w] of g[u]) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  }
  return dist.map((d) => (d === INF ? -1 : d));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Map<Integer, List<List<Integer>>> g;
    static Boolean[] vis;
    static List<Integer> order;
    public static List<Integer> shortestPath(Integer V, List<List<Integer>> edges, Integer src) {
        g = new Map<Integer, List<List<Integer>>>();
        for (Integer i = 0; i < V; i++) g.put(i, new List<List<Integer>>());
        for (List<Integer> e : edges) g.get(e[0]).add(new List<Integer>{ e[1], e[2] });
        vis = new List<Boolean>(); for (Integer i = 0; i < V; i++) vis.add(false);
        order = new List<Integer>();
        for (Integer i = 0; i < V; i++) if (!vis[i]) topo(i);
        Integer INF = 2147483647;
        List<Integer> dist = new List<Integer>(); for (Integer i = 0; i < V; i++) dist.add(INF);
        dist[src] = 0;
        for (Integer idx = order.size() - 1; idx >= 0; idx--) {
            Integer u = order[idx];
            if (dist[u] == INF) continue;
            for (List<Integer> e : g.get(u))
                if (dist[u] + e[1] < dist[e[0]]) dist[e[0]] = dist[u] + e[1];
        }
        for (Integer i = 0; i < V; i++) if (dist[i] == INF) dist[i] = -1;
        return dist;
    }
    static void topo(Integer u) {
        vis[u] = true;
        for (List<Integer> e : g.get(u)) if (!vis[e[0]]) topo(e[0]);
        order.add(u);
    }
}`,
      },
    ],
  },
  {
    slug: "shortest-path-in-binary-matrix",
    title: "Shortest Path in Binary Matrix",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix", "Shortest Path"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an n×n binary grid (0 = open, 1 = blocked), return the length (number of cells) of the shortest clear path from the top-left to the bottom-right, moving in 8 directions, or -1 if none exists.",
    beginnerExplanation:
      "Each open cell is a node; you can step to any of its 8 open neighbours at cost 1. Equal step cost means BFS from the start finds the fewest-cells path.",
    realWorldAnalogy:
      "A king on a chessboard reaching the opposite corner in the fewest moves, skipping blocked squares.",
    visualExplanation:
      "BFS rings expand from (0,0). The first time (n-1,n-1) is dequeued, its ring number (path length) is the answer.",
    approaches: [
      {
        title: "DFS / try all paths",
        tier: "Brute Force",
        idea: "Explore every path and keep the shortest — exponential and needless.",
        steps: ["Recurse over neighbours tracking length"],
        time: "Exponential",
        space: "O(n²)",
      },
      {
        title: "BFS (8-directional)",
        tier: "Optimal",
        idea: "Unit step cost ⇒ BFS gives the shortest cell count; mark cells visited as you enqueue.",
        steps: [
          "If start or end is blocked, return -1",
          "Queue (0,0) with dist 1, mark visited",
          "Pop; if it's the target return dist; else enqueue open unvisited neighbours with dist+1",
        ],
        time: "O(n²)",
        space: "O(n²)",
      },
    ],
    dryRun: "grid=[[0,1],[1,0]]: start(0,0) d=1 → diagonal to (1,1) d=2 → target → 2.",
    interviewTips: [
      "Path length here counts CELLS, not edges — start cell is length 1.",
      "Mark visited at enqueue time to avoid the same cell entering the queue twice.",
    ],
    commonMistakes: [
      "Only 4 directions (the problem allows 8).",
      "Forgetting the blocked start/end early return.",
    ],
    followUps: ["Weighted cells (→ Dijkstra).", "Return the actual path (store parents)."],
    related: ["shortest-path-in-undirected-graph-with-unit-weights"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def shortest_path_binary_matrix(grid):
    n = len(grid)
    if grid[0][0] or grid[n - 1][n - 1]:
        return -1
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    q = deque([(0, 0, 1)])
    grid[0][0] = 1
    while q:
        r, c, d = q.popleft()
        if r == n - 1 and c == n - 1:
            return d
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                q.append((nr, nc, d + 1))
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;
        int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{0, 0, 1});
        grid[0][0] = 1;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1], d = cur[2];
            if (r == n-1 && c == n-1) return d;
            for (int[] dd : dirs) {
                int nr = r + dd[0], nc = c + dd[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.add(new int[]{nr, nc, d + 1});
                }
            }
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] || grid[n-1][n-1]) return -1;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const q = [[0, 0, 1]];
  grid[0][0] = 1;
  for (let i = 0; i < q.length; i++) {
    const [r, c, d] = q[i];
    if (r === n-1 && c === n-1) return d;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer shortestPathBinaryMatrix(List<List<Integer>> grid) {
        Integer n = grid.size();
        if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{-1,-1}, new List<Integer>{-1,0}, new List<Integer>{-1,1},
            new List<Integer>{0,-1}, new List<Integer>{0,1},
            new List<Integer>{1,-1}, new List<Integer>{1,0}, new List<Integer>{1,1}
        };
        List<List<Integer>> q = new List<List<Integer>>{ new List<Integer>{0,0,1} };
        Integer head = 0;
        grid[0][0] = 1;
        while (head < q.size()) {
            List<Integer> cur = q[head++];
            Integer r = cur[0], c = cur[1], d = cur[2];
            if (r == n-1 && c == n-1) return d;
            for (List<Integer> dd : dirs) {
                Integer nr = r + dd[0], nc = c + dd[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.add(new List<Integer>{nr, nc, d + 1});
                }
            }
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "path-with-minimum-effort",
    title: "Path with Minimum Effort",
    difficulty: "Medium",
    patterns: ["graphs", "binary-search"],
    topics: ["Graphs", "Matrix", "Shortest Path"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a grid of heights, find a path from the top-left to the bottom-right (moving up/down/left/right) that minimises the maximum absolute height difference between consecutive cells. Return that minimum effort.",
    beginnerExplanation:
      "The 'cost' of a path is its single worst step (largest height jump), not the sum. So this is a shortest-path variant where a path's weight is the MAX edge on it — Dijkstra works if you track the running max instead of a running sum.",
    realWorldAnalogy:
      "Hiking to a summit where what tires you is the single steepest climb on the route — you want the route whose steepest step is as gentle as possible.",
    visualExplanation:
      "Dijkstra by 'max edge so far': pop the cell reachable with the smallest worst-step; relax neighbours with max(current, |Δheight|).",
    approaches: [
      {
        title: "Binary search on the effort + BFS/DFS",
        tier: "Better",
        idea: "Guess a max effort k; check (BFS) if the target is reachable using only steps ≤ k; binary search the smallest feasible k.",
        steps: ["lo=0, hi=max diff", "For mid, BFS allowing steps with |Δ| ≤ mid", "Shrink to smallest feasible"],
        time: "O(rows·cols·log(maxDiff))",
        space: "O(rows·cols)",
      },
      {
        title: "Dijkstra on max-edge",
        tier: "Optimal",
        idea: "Priority queue keyed by the worst step so far; first time the target pops, that's the answer.",
        steps: [
          "effort[][] = ∞, effort[0][0] = 0, push (0,0,0)",
          "Pop smallest effort cell; if target return it",
          "Relax neighbour: newEffort = max(effort, |Δheight|)",
        ],
        time: "O(rows·cols·log(rows·cols))",
        space: "O(rows·cols)",
      },
    ],
    dryRun:
      "[[1,2,2],[3,8,2],[5,3,5]]: best route keeps every step ≤ 2 (down the sides), so answer = 2.",
    interviewTips: [
      "The key insight to verbalise: path weight is the MAX edge, so relax with max(...) not sum.",
      "Binary-search-on-answer is the clean fallback when you have no priority queue.",
    ],
    commonMistakes: [
      "Summing differences instead of taking the maximum.",
      "Stopping at first arrival in a plain BFS — without the effort ordering it isn't optimal.",
    ],
    followUps: ["Swim in Rising Water (same max-edge Dijkstra).", "Return the actual path."],
    related: ["swim-in-rising-water", "network-delay-time"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def minimum_effort_path(heights):
    rows, cols = len(heights), len(heights[0])
    effort = [[float("inf")] * cols for _ in range(rows)]
    effort[0][0] = 0
    pq = [(0, 0, 0)]  # (effort, r, c)
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    while pq:
        e, r, c = heapq.heappop(pq)
        if r == rows - 1 and c == cols - 1:
            return e
        if e > effort[r][c]:
            continue
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                ne = max(e, abs(heights[nr][nc] - heights[r][c]))
                if ne < effort[nr][nc]:
                    effort[nr][nc] = ne
                    heapq.heappush(pq, (ne, nr, nc))
    return 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length, cols = heights[0].length;
        int[][] effort = new int[rows][cols];
        for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);
        effort[0][0] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, 0, 0});
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int e = cur[0], r = cur[1], c = cur[2];
            if (r == rows-1 && c == cols-1) return e;
            if (e > effort[r][c]) continue;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
                    if (ne < effort[nr][nc]) { effort[nr][nc] = ne; pq.add(new int[]{ne, nr, nc}); }
                }
            }
        }
        return 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minimumEffortPath(heights) {
  const rows = heights.length, cols = heights[0].length;
  const effort = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
  effort[0][0] = 0;
  // simple binary-heap-free PQ via sorted insert is fine for interview sizes
  const pq = [[0, 0, 0]];
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [e, r, c] = pq.shift();
    if (r === rows-1 && c === cols-1) return e;
    if (e > effort[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
        if (ne < effort[nr][nc]) { effort[nr][nc] = ne; pq.push([ne, nr, nc]); }
      }
    }
  }
  return 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // No priority queue in Apex — binary search the answer + BFS feasibility check.
    public static Integer minimumEffortPath(List<List<Integer>> heights) {
        Integer rows = heights.size(), cols = heights[0].size();
        Integer lo = 0, hi = 1000000, ans = 0;
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{1,0}, new List<Integer>{-1,0},
            new List<Integer>{0,1}, new List<Integer>{0,-1}
        };
        while (lo <= hi) {
            Integer mid = (lo + hi) / 2;
            if (canReach(heights, dirs, rows, cols, mid)) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
    static Boolean canReach(List<List<Integer>> h, List<List<Integer>> dirs, Integer rows, Integer cols, Integer limit) {
        Set<Integer> seen = new Set<Integer>{ 0 };
        List<Integer> q = new List<Integer>{ 0 };
        Integer head = 0;
        while (head < q.size()) {
            Integer cell = q[head++];
            Integer r = cell / cols, c = Math.mod(cell, cols);
            if (r == rows-1 && c == cols-1) return true;
            for (List<Integer> d : dirs) {
                Integer nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    Integer key = nr * cols + nc;
                    if (!seen.contains(key) && Math.abs(h[nr][nc] - h[r][c]) <= limit) {
                        seen.add(key); q.add(key);
                    }
                }
            }
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "bellman-ford-algorithm",
    title: "Bellman-Ford Algorithm",
    difficulty: "Medium",
    patterns: ["graphs", "dynamic-programming"],
    topics: ["Graphs", "Shortest Path"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a directed graph with V nodes and weighted edges (weights may be negative) and a source S, return the shortest distance to every node. If a negative-weight cycle exists, return [-1].",
    beginnerExplanation:
      "Dijkstra breaks with negative edges. Bellman-Ford instead relaxes EVERY edge V−1 times — enough for the shortest path (at most V−1 edges) to propagate. One extra relaxation round that still improves something proves a negative cycle.",
    realWorldAnalogy:
      "Currency arbitrage: repeatedly updating best exchange rates; if a rate keeps improving forever, there's a money-printing loop (negative cycle).",
    visualExplanation:
      "After round i, all shortest paths using ≤ i edges are correct. V−1 rounds settle everything; a V-th improvement ⇒ negative cycle.",
    approaches: [
      {
        title: "Relax all edges V−1 times",
        tier: "Optimal",
        idea: "Each round lets shortest paths grow by one more edge; V−1 rounds suffice. A V-th successful relaxation flags a negative cycle.",
        steps: [
          "dist[S] = 0, others ∞",
          "Repeat V−1 times: for each edge (u,v,w) if dist[u]+w < dist[v] update",
          "One more pass: if any edge still relaxes → negative cycle → return [-1]",
        ],
        time: "O(V·E)",
        space: "O(V)",
      },
    ],
    dryRun:
      "0→1(5),1→2(-2),0→2(4): round1 dist=[0,5,3]; stable after. No further relaxation → no neg cycle.",
    interviewTips: [
      "Justify V−1 rounds: a simple shortest path has at most V−1 edges.",
      "Bellman-Ford is the go-to when weights can be negative; Dijkstra is for non-negative only.",
    ],
    commonMistakes: [
      "Doing V rounds instead of V−1 (the V-th is only the cycle check).",
      "Relaxing from an unreachable node (dist[u] == ∞).",
    ],
    followUps: ["Print the negative cycle.", "SPFA queue optimisation.", "Floyd-Warshall for all pairs."],
    related: ["floyd-warshall-algorithm", "network-delay-time"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def bellman_ford(V, edges, S):
    INF = 10**8
    dist = [INF] * V
    dist[S] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:                 # V-th pass: detect negative cycle
        if dist[u] != INF and dist[u] + w < dist[v]:
            return [-1]
    return dist`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] bellmanFord(int V, int[][] edges, int S) {
        final int INF = 100000000;
        int[] dist = new int[V];
        java.util.Arrays.fill(dist, INF);
        dist[S] = 0;
        for (int i = 0; i < V - 1; i++) {
            for (int[] e : edges) {
                if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]])
                    dist[e[1]] = dist[e[0]] + e[2];
            }
        }
        for (int[] e : edges) {
            if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]])
                return new int[]{-1};
        }
        return dist;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function bellmanFord(V, edges, S) {
  const INF = 1e8;
  const dist = new Array(V).fill(INF);
  dist[S] = 0;
  for (let i = 0; i < V - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== INF && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }
  for (const [u, v, w] of edges) {
    if (dist[u] !== INF && dist[u] + w < dist[v]) return [-1];
  }
  return dist;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> bellmanFord(Integer V, List<List<Integer>> edges, Integer S) {
        Integer INF = 100000000;
        List<Integer> dist = new List<Integer>();
        for (Integer i = 0; i < V; i++) dist.add(INF);
        dist[S] = 0;
        for (Integer i = 0; i < V - 1; i++) {
            for (List<Integer> e : edges) {
                if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]])
                    dist[e[1]] = dist[e[0]] + e[2];
            }
        }
        for (List<Integer> e : edges) {
            if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]])
                return new List<Integer>{ -1 };
        }
        return dist;
    }
}`,
      },
    ],
  },
  {
    slug: "floyd-warshall-algorithm",
    title: "Floyd Warshall Algorithm",
    difficulty: "Medium",
    patterns: ["graphs", "dynamic-programming"],
    topics: ["Graphs", "Shortest Path"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an n×n adjacency matrix where matrix[i][j] is the edge weight (or -1 if no edge), compute all-pairs shortest paths in place. Use -1 for pairs that remain unreachable.",
    beginnerExplanation:
      "For every possible intermediate node k, ask: 'is going i→k→j cheaper than my current i→j?'. Doing this for all k considers every routing option, giving shortest paths between every pair at once.",
    realWorldAnalogy:
      "A travel agent checking whether routing each trip through some hub city beats the direct fare — trying every hub eventually finds the cheapest itinerary between all city pairs.",
    visualExplanation:
      "Triple loop k,i,j: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). After all k, the matrix holds shortest paths.",
    approaches: [
      {
        title: "DP over intermediate nodes",
        tier: "Optimal",
        idea: "dist[i][j] using only nodes ≤ k as intermediates; grow k from 0..n−1.",
        steps: [
          "Replace -1 with ∞, set diagonal to 0",
          "For k, i, j: relax dist[i][j] via k",
          "Convert remaining ∞ back to -1 (a negative diagonal means a negative cycle)",
        ],
        time: "O(n³)",
        space: "O(1) extra",
      },
    ],
    dryRun:
      "3 nodes, 0→1=2,1→2=3,0→2=10: via k=1, dist[0][2]=min(10,2+3)=5.",
    interviewTips: [
      "k must be the OUTERMOST loop — that's the DP order that makes it correct.",
      "Great when you need every pair and n is small (≤ ~500); else run Dijkstra per source.",
    ],
    commonMistakes: [
      "Putting k as an inner loop (produces wrong answers).",
      "Integer overflow adding two ∞ — guard with the 'reachable' check or a big-but-safe INF.",
    ],
    followUps: ["Detect negative cycles (dist[i][i] < 0).", "Reconstruct the actual paths (next matrix)."],
    related: ["bellman-ford-algorithm"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def floyd_warshall(matrix):
    n = len(matrix)
    INF = 10**9
    for i in range(n):
        for j in range(n):
            if matrix[i][j] == -1:
                matrix[i][j] = INF
            if i == j:
                matrix[i][j] = 0
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if matrix[i][k] + matrix[k][j] < matrix[i][j]:
                    matrix[i][j] = matrix[i][k] + matrix[k][j]
    for i in range(n):
        for j in range(n):
            if matrix[i][j] >= INF:
                matrix[i][j] = -1
    return matrix`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void floydWarshall(int[][] m) {
        int n = m.length;
        final int INF = 1000000000;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                if (m[i][j] == -1) m[i][j] = INF;
                if (i == j) m[i][j] = 0;
            }
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (m[i][k] + m[k][j] < m[i][j]) m[i][j] = m[i][k] + m[k][j];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (m[i][j] >= INF) m[i][j] = -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function floydWarshall(m) {
  const n = m.length;
  const INF = 1e9;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      if (m[i][j] === -1) m[i][j] = INF;
      if (i === j) m[i][j] = 0;
    }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (m[i][k] + m[k][j] < m[i][j]) m[i][j] = m[i][k] + m[k][j];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (m[i][j] >= INF) m[i][j] = -1;
  return m;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void floydWarshall(List<List<Integer>> m) {
        Integer n = m.size();
        Integer INF = 1000000000;
        for (Integer i = 0; i < n; i++)
            for (Integer j = 0; j < n; j++) {
                if (m[i][j] == -1) m[i][j] = INF;
                if (i == j) m[i][j] = 0;
            }
        for (Integer k = 0; k < n; k++)
            for (Integer i = 0; i < n; i++)
                for (Integer j = 0; j < n; j++)
                    if (m[i][k] + m[k][j] < m[i][j]) m[i][j] = m[i][k] + m[k][j];
        for (Integer i = 0; i < n; i++)
            for (Integer j = 0; j < n; j++)
                if (m[i][j] >= INF) m[i][j] = -1;
    }
}`,
      },
    ],
  },
  {
    slug: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
    title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
    difficulty: "Medium",
    patterns: ["graphs", "dynamic-programming"],
    topics: ["Graphs", "Shortest Path"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "There are n cities connected by weighted bidirectional edges. Find the city that can reach the fewest other cities within `distanceThreshold`. If several tie, return the city with the greatest index.",
    beginnerExplanation:
      "First compute the shortest distance between every pair of cities (all-pairs shortest path = Floyd-Warshall). Then for each city count how many others are within the threshold, and pick the smallest count (largest index on ties).",
    realWorldAnalogy:
      "Choosing where to live by how few neighbours are within a short commute — you compute everyone's commute to everyone, then count who's 'close'.",
    visualExplanation:
      "Floyd-Warshall fills a distance matrix; row i's entries ≤ threshold (excluding self) = reachable count for city i.",
    approaches: [
      {
        title: "Dijkstra from each city",
        tier: "Better",
        idea: "Run Dijkstra n times for all-pairs distances, then count.",
        steps: ["For each source run Dijkstra", "Count neighbours ≤ threshold"],
        time: "O(n·E log n)",
        space: "O(n²)",
      },
      {
        title: "Floyd-Warshall + count",
        tier: "Optimal",
        idea: "n is small, so all-pairs Floyd-Warshall then a counting sweep is simplest.",
        steps: [
          "dist[i][j] via Floyd-Warshall",
          "For each city count j≠i with dist ≤ threshold",
          "Track min count, breaking ties toward the larger index",
        ],
        time: "O(n³)",
        space: "O(n²)",
      },
    ],
    dryRun:
      "n=4 threshold=4, edges form a line 0-1-2-3 weight 3 each: city 0 reaches {1}(=3); city 3 reaches {2}; tie count 1 → larger index 3.",
    interviewTips: [
      "Iterate cities ascending and use '<=' on the count so the LAST (largest-index) minimum wins the tie naturally.",
      "Floyd-Warshall is ideal here because n is tiny and you need all pairs.",
    ],
    commonMistakes: [
      "Counting the city itself.",
      "Wrong tie-break (must prefer the greater index).",
    ],
    followUps: ["Return the actual reachable set.", "Very large n (→ per-source Dijkstra)."],
    related: ["floyd-warshall-algorithm"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_the_city(n, edges, distance_threshold):
    INF = 10**9
    dist = [[INF] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = w
        dist[v][u] = w
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    best_city, best_count = 0, n + 1
    for i in range(n):
        cnt = sum(1 for j in range(n) if i != j and dist[i][j] <= distance_threshold)
        if cnt <= best_count:
            best_count = cnt
            best_city = i
    return best_city`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        final int INF = 1000000000;
        int[][] dist = new int[n][n];
        for (int[] row : dist) java.util.Arrays.fill(row, INF);
        for (int i = 0; i < n; i++) dist[i][i] = 0;
        for (int[] e : edges) { dist[e[0]][e[1]] = e[2]; dist[e[1]][e[0]] = e[2]; }
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
        int bestCity = 0, bestCount = n + 1;
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = 0; j < n; j++) if (i != j && dist[i][j] <= distanceThreshold) cnt++;
            if (cnt <= bestCount) { bestCount = cnt; bestCity = i; }
        }
        return bestCity;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findTheCity(n, edges, distanceThreshold) {
  const INF = 1e9;
  const dist = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) { dist[u][v] = w; dist[v][u] = w; }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
  let bestCity = 0, bestCount = n + 1;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) if (i !== j && dist[i][j] <= distanceThreshold) cnt++;
    if (cnt <= bestCount) { bestCount = cnt; bestCity = i; }
  }
  return bestCity;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findTheCity(Integer n, List<List<Integer>> edges, Integer distanceThreshold) {
        Integer INF = 1000000000;
        List<List<Integer>> dist = new List<List<Integer>>();
        for (Integer i = 0; i < n; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j < n; j++) row.add(i == j ? 0 : INF);
            dist.add(row);
        }
        for (List<Integer> e : edges) { dist[e[0]][e[1]] = e[2]; dist[e[1]][e[0]] = e[2]; }
        for (Integer k = 0; k < n; k++)
            for (Integer i = 0; i < n; i++)
                for (Integer j = 0; j < n; j++)
                    if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
        Integer bestCity = 0, bestCount = n + 1;
        for (Integer i = 0; i < n; i++) {
            Integer cnt = 0;
            for (Integer j = 0; j < n; j++) if (i != j && dist[i][j] <= distanceThreshold) cnt++;
            if (cnt <= bestCount) { bestCount = cnt; bestCity = i; }
        }
        return bestCity;
    }
}`,
      },
    ],
  },
  {
    slug: "prims-algorithm-minimum-spanning-tree",
    title: "Prim's Algorithm Minimum Spanning Tree",
    difficulty: "Medium",
    patterns: ["graphs", "greedy"],
    topics: ["Graphs", "Minimum Spanning Tree"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a connected, undirected, weighted graph with V nodes and an edge list [u, v, w], return the total weight of its Minimum Spanning Tree (MST).",
    beginnerExplanation:
      "Grow the tree one node at a time: from all edges crossing out of the tree, always add the cheapest one that reaches a new node. A min-heap of candidate edges makes 'cheapest crossing edge' fast.",
    realWorldAnalogy:
      "Laying cable to connect towns: start from one town and repeatedly lay the cheapest new wire that hooks up an unconnected town, until all are joined.",
    visualExplanation:
      "Heap holds (weight, node) candidates. Pop the smallest reaching an unvisited node, add its weight, then push that node's outgoing edges.",
    approaches: [
      {
        title: "Prim's with a min-heap",
        tier: "Optimal",
        idea: "Greedily attach the minimum-weight edge leaving the visited set.",
        steps: [
          "Push (0, start). total = 0",
          "Pop (w, u); skip if u visited; else mark visited, total += w",
          "Push (weight, neighbour) for each unvisited neighbour",
        ],
        time: "O(E log V)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "Triangle 0-1=1,1-2=2,0-2=3: take 0-1(1), then cheapest crossing is 1-2(2). MST weight = 3.",
    interviewTips: [
      "Prim's grows a tree (good for dense graphs); Kruskal's sorts edges with union-find (good for sparse).",
      "Mark visited when POPPED, not when pushed, so the cheapest copy wins.",
    ],
    commonMistakes: [
      "Adding an edge to an already-visited node (creates a cycle / overcounts).",
      "Forgetting the graph is undirected — add both directions.",
    ],
    followUps: ["Return the MST edges, not just the weight.", "Kruskal's alternative."],
    related: ["kruskals-algorithm-minimum-spanning-tree", "min-cost-to-connect-all-points"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def prims_mst(V, edges):
    g = [[] for _ in range(V)]
    for u, v, w in edges:
        g[u].append((w, v))
        g[v].append((w, u))
    visited = [False] * V
    pq = [(0, 0)]  # (weight, node)
    total = 0
    while pq:
        w, u = heapq.heappop(pq)
        if visited[u]:
            continue
        visited[u] = True
        total += w
        for nw, nv in g[u]:
            if not visited[nv]:
                heapq.heappush(pq, (nw, nv))
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int spanningTree(int V, int[][] edges) {
        List<List<int[]>> g = new ArrayList<>();
        for (int i = 0; i < V; i++) g.add(new ArrayList<>());
        for (int[] e : edges) { g.get(e[0]).add(new int[]{e[2], e[1]}); g.get(e[1]).add(new int[]{e[2], e[0]}); }
        boolean[] visited = new boolean[V];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, 0});
        int total = 0;
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int w = cur[0], u = cur[1];
            if (visited[u]) continue;
            visited[u] = true;
            total += w;
            for (int[] e : g.get(u)) if (!visited[e[1]]) pq.add(e);
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function spanningTree(V, edges) {
  const g = Array.from({ length: V }, () => []);
  for (const [u, v, w] of edges) { g[u].push([w, v]); g[v].push([w, u]); }
  const visited = new Array(V).fill(false);
  const pq = [[0, 0]]; // sorted-array PQ; fine for interview sizes
  let total = 0;
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [w, u] = pq.shift();
    if (visited[u]) continue;
    visited[u] = true;
    total += w;
    for (const [nw, nv] of g[u]) if (!visited[nv]) pq.push([nw, nv]);
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // O(V^2) Prim's with a key array — no priority queue needed.
    public static Integer spanningTree(Integer V, List<List<Integer>> edges) {
        Map<Integer, List<List<Integer>>> g = new Map<Integer, List<List<Integer>>>();
        for (Integer i = 0; i < V; i++) g.put(i, new List<List<Integer>>());
        for (List<Integer> e : edges) {
            g.get(e[0]).add(new List<Integer>{ e[1], e[2] });
            g.get(e[1]).add(new List<Integer>{ e[0], e[2] });
        }
        Integer INF = 1000000000;
        List<Integer> key = new List<Integer>();
        List<Boolean> inMST = new List<Boolean>();
        for (Integer i = 0; i < V; i++) { key.add(INF); inMST.add(false); }
        key[0] = 0;
        Integer total = 0;
        for (Integer c = 0; c < V; c++) {
            Integer u = -1;
            for (Integer i = 0; i < V; i++)
                if (!inMST[i] && (u == -1 || key[i] < key[u])) u = i;
            inMST[u] = true;
            total += key[u];
            for (List<Integer> nb : g.get(u)) {
                if (!inMST[nb[0]] && nb[1] < key[nb[0]]) key[nb[0]] = nb[1];
            }
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "kruskals-algorithm-minimum-spanning-tree",
    title: "Kruskal's Algorithm Minimum Spanning Tree",
    difficulty: "Medium",
    patterns: ["graphs", "greedy"],
    topics: ["Graphs", "Minimum Spanning Tree", "Union Find"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a connected, undirected, weighted graph (V nodes, edge list [u, v, w]), return the total weight of its Minimum Spanning Tree using Kruskal's algorithm.",
    beginnerExplanation:
      "Sort every edge by weight and add them cheapest-first, skipping any edge that would join two nodes already connected (that would make a cycle). A Disjoint Set Union (union-find) tells you instantly whether two nodes are already connected.",
    realWorldAnalogy:
      "Building the cheapest road network: consider roads from cheapest to most expensive, build a road only if it links two currently-separate clusters.",
    visualExplanation:
      "Sort edges → walk them → union(u,v) if find(u) != find(v), adding the weight; stop after V−1 edges.",
    approaches: [
      {
        title: "Sort edges + union-find",
        tier: "Optimal",
        idea: "Greedy by weight; DSU detects cycles in near-O(1).",
        steps: [
          "Sort edges ascending by weight",
          "For each edge, if endpoints are in different sets, union them and add the weight",
          "Done once V−1 edges are taken",
        ],
        time: "O(E log E)",
        space: "O(V)",
      },
    ],
    dryRun:
      "Edges sorted 0-1(1),1-2(2),0-2(3): take 0-1, take 1-2 (different sets), skip 0-2 (same set). MST = 3.",
    interviewTips: [
      "Pair Kruskal's with union-find + path compression & union by rank for near-linear performance.",
      "Kruskal's shines on sparse graphs; Prim's on dense ones.",
    ],
    commonMistakes: [
      "Not using union by rank/size + path compression (DSU becomes slow).",
      "Adding an edge whose endpoints are already connected (forms a cycle).",
    ],
    followUps: ["Return the chosen edges.", "Maximum spanning tree (sort descending)."],
    related: ["prims-algorithm-minimum-spanning-tree", "number-of-operations-to-make-network-connected"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def kruskal_mst(V, edges):
    parent = list(range(V))
    rank = [0] * V
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1
        return True
    total = 0
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        if union(u, v):
            total += w
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    int[] parent, rank;
    int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        if (rank[ra] == rank[rb]) rank[ra]++;
        return true;
    }
    public int spanningTree(int V, int[][] edges) {
        parent = new int[V]; rank = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;
        Arrays.sort(edges, (a, b) -> a[2] - b[2]);
        int total = 0;
        for (int[] e : edges) if (union(e[0], e[1])) total += e[2];
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function kruskalMST(V, edges) {
  const parent = Array.from({ length: V }, (_, i) => i);
  const rank = new Array(V).fill(0);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  const union = (a, b) => {
    let ra = find(a), rb = find(b);
    if (ra === rb) return false;
    if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    if (rank[ra] === rank[rb]) rank[ra]++;
    return true;
  };
  let total = 0;
  for (const [u, v, w] of [...edges].sort((a, b) => a[2] - b[2])) if (union(u, v)) total += w;
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> parent, rnk;
    static Integer find(Integer x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
    static Boolean unite(Integer a, Integer b) {
        Integer ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rnk[ra] < rnk[rb]) { Integer t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        if (rnk[ra] == rnk[rb]) rnk[ra]++;
        return true;
    }
    public static Integer spanningTree(Integer V, List<List<Integer>> edges) {
        parent = new List<Integer>(); rnk = new List<Integer>();
        for (Integer i = 0; i < V; i++) { parent.add(i); rnk.add(0); }
        List<List<Integer>> es = edges.clone();
        // sort by weight (index 2)
        for (Integer i = 0; i < es.size(); i++)
            for (Integer j = 0; j < es.size() - 1 - i; j++)
                if (es[j][2] > es[j + 1][2]) { List<Integer> t = es[j]; es[j] = es[j + 1]; es[j + 1] = t; }
        Integer total = 0;
        for (List<Integer> e : es) if (unite(e[0], e[1])) total += e[2];
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-operations-to-make-network-connected",
    title: "Number of Operations to Make Network Connected",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Union Find"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "There are n computers numbered 0..n-1 connected by `connections[i] = [a, b]` cables. You can unplug any cable and replug it elsewhere. Return the minimum operations to connect all computers, or -1 if impossible.",
    beginnerExplanation:
      "To connect n computers you need at least n−1 cables; if you have fewer, it's impossible. Otherwise, every extra (redundant) cable can be moved to bridge two separate groups. The answer is simply (number of connected components − 1).",
    realWorldAnalogy:
      "Joining islands with bridges — if you already have spare bridges, you just relocate one to link each still-separate island. You need (#islands − 1) moves.",
    visualExplanation:
      "Union-find groups the computers. components−1 moves merge all groups, as long as total cables ≥ n−1.",
    approaches: [
      {
        title: "Union-find component count",
        tier: "Optimal",
        idea: "Count components; if edges < n−1 return −1, else components−1.",
        steps: [
          "If connections.length < n−1 → -1",
          "Union every connection, counting components",
          "Answer = components − 1",
        ],
        time: "O(E·α(n))",
        space: "O(n)",
      },
    ],
    dryRun: "n=4, conns=[[0,1],[0,2],[1,2]]: 3 edges ≥ 3, components after union = 2 ({0,1,2},{3}) → 1 op.",
    interviewTips: [
      "The 'enough cables?' check is just edges ≥ n−1 — state it first.",
      "Redundant edges (cycles) are exactly the spare cables you relocate.",
    ],
    commonMistakes: ["Forgetting the edges < n−1 → -1 case.", "Counting edges instead of components."],
    followUps: ["Return which cables to move.", "Weighted relocation cost."],
    related: ["kruskals-algorithm-minimum-spanning-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def make_connected(n, connections):
    if len(connections) < n - 1:
        return -1
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    components = n
    for a, b in connections:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra
            components -= 1
    return components - 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int[] parent;
    int find(int x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) return -1;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        int components = n;
        for (int[] c : connections) {
            int ra = find(c[0]), rb = find(c[1]);
            if (ra != rb) { parent[rb] = ra; components--; }
        }
        return components - 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  let components = n;
  for (const [a, b] of connections) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) { parent[rb] = ra; components--; }
  }
  return components - 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> parent;
    static Integer find(Integer x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    public static Integer makeConnected(Integer n, List<List<Integer>> connections) {
        if (connections.size() < n - 1) return -1;
        parent = new List<Integer>();
        for (Integer i = 0; i < n; i++) parent.add(i);
        Integer components = n;
        for (List<Integer> c : connections) {
            Integer ra = find(c[0]), rb = find(c[1]);
            if (ra != rb) { parent[rb] = ra; components--; }
        }
        return components - 1;
    }
}`,
      },
    ],
  },
  {
    slug: "accounts-merge",
    title: "Accounts Merge",
    difficulty: "Medium",
    patterns: ["graphs", "hashing"],
    topics: ["Union Find", "Hashing"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Each account is [name, email1, email2, ...]. Two accounts belong to the same person if they share any email. Merge them: return [name, ...sorted unique emails] per person (names can repeat across different people).",
    beginnerExplanation:
      "Treat each account as a node; if two accounts share an email they're the same person, so union them. Map every email to the account that first owned it; when an email reappears, union the two accounts. Finally group emails by their account's root.",
    realWorldAnalogy:
      "Deduping contacts: if two contact cards share a phone/email, they're the same person — keep merging until every card that touches another is in one pile.",
    visualExplanation:
      "email→ownerAccount map drives unions; then bucket emails by find(owner), sort each bucket, prefix the name.",
    approaches: [
      {
        title: "Union-find on account indices",
        tier: "Optimal",
        idea: "Union accounts that share an email via an email→accountIndex map, then group.",
        steps: [
          "For each email: if seen before, union(currentAccount, firstOwner); else record owner",
          "Group every email under find(owner)",
          "Sort each group's emails; output [name, ...emails]",
        ],
        time: "O(N·K·log + α)",
        space: "O(N·K)",
      },
    ],
    dryRun:
      "[John, a, b], [John, b, c], [Mary, x]: emails b shared → union acct0,acct1 → {a,b,c} under John; Mary separate.",
    interviewTips: [
      "Union by ACCOUNT index keyed through an email map — cleaner than building an email graph + DFS.",
      "Two different people can share the same name, so never merge on name.",
    ],
    commonMistakes: [
      "Merging accounts with the same name (wrong).",
      "Forgetting to sort the emails or dedupe them.",
    ],
    followUps: ["Email-as-node DFS alternative.", "Streaming merges as accounts arrive."],
    related: ["number-of-operations-to-make-network-connected"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def accounts_merge(accounts):
    parent = list(range(len(accounts)))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    owner = {}  # email -> account index
    for i, acc in enumerate(accounts):
        for email in acc[1:]:
            if email in owner:
                parent[find(i)] = find(owner[email])
            else:
                owner[email] = i
    groups = {}
    for email, i in owner.items():
        groups.setdefault(find(i), []).append(email)
    return [[accounts[root][0]] + sorted(emails) for root, emails in groups.items()]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    int[] parent;
    int find(int x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        Map<String, Integer> owner = new HashMap<>();
        for (int i = 0; i < n; i++) {
            List<String> acc = accounts.get(i);
            for (int j = 1; j < acc.size(); j++) {
                String email = acc.get(j);
                if (owner.containsKey(email)) parent[find(i)] = find(owner.get(email));
                else owner.put(email, i);
            }
        }
        Map<Integer, TreeSet<String>> groups = new HashMap<>();
        for (Map.Entry<String, Integer> e : owner.entrySet())
            groups.computeIfAbsent(find(e.getValue()), k -> new TreeSet<>()).add(e.getKey());
        List<List<String>> res = new ArrayList<>();
        for (Map.Entry<Integer, TreeSet<String>> g : groups.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(accounts.get(g.getKey()).get(0));
            row.addAll(g.getValue());
            res.add(row);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function accountsMerge(accounts) {
  const parent = accounts.map((_, i) => i);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const owner = new Map();
  accounts.forEach((acc, i) => {
    for (let j = 1; j < acc.length; j++) {
      const email = acc[j];
      if (owner.has(email)) parent[find(i)] = find(owner.get(email));
      else owner.set(email, i);
    }
  });
  const groups = new Map();
  for (const [email, i] of owner) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(email);
  }
  const res = [];
  for (const [root, emails] of groups) res.push([accounts[root][0], ...emails.sort()]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> parent;
    static Integer find(Integer x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    public static List<List<String>> accountsMerge(List<List<String>> accounts) {
        Integer n = accounts.size();
        parent = new List<Integer>();
        for (Integer i = 0; i < n; i++) parent.add(i);
        Map<String, Integer> owner = new Map<String, Integer>();
        for (Integer i = 0; i < n; i++) {
            List<String> acc = accounts[i];
            for (Integer j = 1; j < acc.size(); j++) {
                String email = acc[j];
                if (owner.containsKey(email)) parent[find(i)] = find(owner.get(email));
                else owner.put(email, i);
            }
        }
        Map<Integer, List<String>> groups = new Map<Integer, List<String>>();
        for (String email : owner.keySet()) {
            Integer r = find(owner.get(email));
            if (!groups.containsKey(r)) groups.put(r, new List<String>());
            groups.get(r).add(email);
        }
        List<List<String>> res = new List<List<String>>();
        for (Integer root : groups.keySet()) {
            List<String> emails = groups.get(root);
            emails.sort();
            List<String> row = new List<String>{ accounts[root][0] };
            row.addAll(emails);
            res.add(row);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "most-stones-removed-with-same-row-or-column",
    title: "Most Stones Removed with Same Row or Column",
    difficulty: "Medium",
    patterns: ["graphs", "hashing"],
    topics: ["Union Find"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Stones sit on a grid at given (row, col) coordinates. You may remove a stone if it shares a row or column with another remaining stone. Return the maximum number of stones you can remove.",
    beginnerExplanation:
      "Stones in the same row or column are connected. Within any connected group of k stones, you can remove all but one. So the answer is total stones minus the number of connected components.",
    realWorldAnalogy:
      "Knocking out dominoes that line up in rows/columns — each connected cluster collapses down to a single survivor.",
    visualExplanation:
      "Union every stone with its row-key and column-key; #components = distinct roots; answer = stones − components.",
    approaches: [
      {
        title: "Union-find on rows & columns",
        tier: "Optimal",
        idea: "Treat row r and column c as nodes; union each stone's row and column. Components = clusters.",
        steps: [
          "For each stone (r,c): union(rowKey(r), colKey(c))",
          "Count distinct roots among all stones' row keys",
          "Answer = totalStones − components",
        ],
        time: "O(N·α)",
        space: "O(N)",
      },
    ],
    dryRun: "stones (0,0),(0,1),(1,0): all share rows/cols → 1 component → 3 − 1 = 2 removable.",
    interviewTips: [
      "Key insight: answer = stones − connectedComponents. Verbalise it.",
      "Offset column keys (e.g. ~c or c+10001) so rows and columns never collide.",
    ],
    commonMistakes: [
      "Letting row and column ids collide (use distinct key spaces).",
      "Counting components over the wrong node set.",
    ],
    followUps: ["What's the removal order?", "Generalise to 3-D coordinates."],
    related: ["number-of-operations-to-make-network-connected"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def remove_stones(stones):
    parent = {}
    def find(x):
        parent.setdefault(x, x)
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(a, b):
        parent[find(a)] = find(b)
    for r, c in stones:
        union(("r", r), ("c", c))
    roots = {find(("r", r)) for r, c in stones}
    return len(stones) - len(roots)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    Map<Integer, Integer> parent = new HashMap<>();
    int find(int x) {
        parent.putIfAbsent(x, x);
        while (parent.get(x) != x) { parent.put(x, parent.get(parent.get(x))); x = parent.get(x); }
        return x;
    }
    public int removeStones(int[][] stones) {
        for (int[] s : stones) parent.put(find(s[0]), find(~s[1])); // columns as ~c
        Set<Integer> roots = new HashSet<>();
        for (int[] s : stones) roots.add(find(s[0]));
        return stones.length - roots.size();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function removeStones(stones) {
  const parent = new Map();
  const find = (x) => {
    if (!parent.has(x)) parent.set(x, x);
    while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); }
    return x;
  };
  for (const [r, c] of stones) parent.set(find("r" + r), find("c" + c));
  const roots = new Set();
  for (const [r] of stones) roots.add(find("r" + r));
  return stones.length - roots.size;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Map<String, String> parent = new Map<String, String>();
    static String find(String x) {
        if (!parent.containsKey(x)) parent.put(x, x);
        while (parent.get(x) != x) { parent.put(x, parent.get(parent.get(x))); x = parent.get(x); }
        return x;
    }
    public static Integer removeStones(List<List<Integer>> stones) {
        for (List<Integer> s : stones) parent.put(find('r' + String.valueOf(s[0])), find('c' + String.valueOf(s[1])));
        Set<String> roots = new Set<String>();
        for (List<Integer> s : stones) roots.add(find('r' + String.valueOf(s[0])));
        return stones.size() - roots.size();
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-islands-ii",
    title: "Number of Islands II",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Union Find", "Matrix"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "On an m×n grid that starts all water, you add land one cell at a time at the given positions. After each addition, return the current number of islands.",
    beginnerExplanation:
      "Each new land cell starts as its own island (count +1). Then for each of its 4 already-land neighbours, union them; every successful union merges two islands into one (count −1). Record the count after each step.",
    realWorldAnalogy:
      "Reclaiming land from the sea plot by plot — a new plot is a new island until it touches existing land, at which point the touching islands fuse.",
    visualExplanation:
      "Dynamic union-find: add cell → count++ → for each land neighbour, if union merges distinct sets → count−−. Append count.",
    approaches: [
      {
        title: "Incremental union-find",
        tier: "Optimal",
        idea: "Maintain a live component count as cells are added and merged.",
        steps: [
          "On add (r,c): if already land, repeat count; else mark land, count++",
          "For each land neighbour, union; on a real merge count−−",
          "Append count after each position",
        ],
        time: "O(P·α)",
        space: "O(m·n)",
      },
    ],
    dryRun:
      "3x3, add (0,0)→1, (0,1)→ touches (0,0) → 1, (1,2)→2, (2,1)→3 …",
    interviewTips: [
      "Use r*n + c as the flat union-find id; keep a -1 sentinel for water.",
      "Only decrement the count on a genuine merge (different roots).",
    ],
    commonMistakes: [
      "Decrementing for every neighbour instead of only on a true union.",
      "Re-adding an existing land cell (handle the duplicate).",
    ],
    followUps: ["Largest island after each step.", "Allow removals too (harder — DSU isn't undo-friendly)."],
    related: ["number-of-operations-to-make-network-connected", "making-a-large-island"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def num_islands2(m, n, positions):
    parent = {}
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    count = 0
    res = []
    for r, c in positions:
        idx = (r, c)
        if idx in parent:
            res.append(count)
            continue
        parent[idx] = idx
        count += 1
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nb = (r + dr, c + dc)
            if nb in parent:
                ra, rb = find(idx), find(nb)
                if ra != rb:
                    parent[ra] = rb
                    count -= 1
        res.append(count)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    int[] parent;
    int find(int x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        parent = new int[m * n];
        Arrays.fill(parent, -1);
        int count = 0;
        List<Integer> res = new ArrayList<>();
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] p : positions) {
            int r = p[0], c = p[1], id = r * n + c;
            if (parent[id] != -1) { res.add(count); continue; }
            parent[id] = id;
            count++;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                int nid = nr * n + nc;
                if (parent[nid] == -1) continue;
                int ra = find(id), rb = find(nid);
                if (ra != rb) { parent[ra] = rb; count--; }
            }
            res.add(count);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numIslands2(m, n, positions) {
  const parent = new Array(m * n).fill(-1);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  let count = 0;
  const res = [];
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  for (const [r, c] of positions) {
    const id = r * n + c;
    if (parent[id] !== -1) { res.push(count); continue; }
    parent[id] = id;
    count++;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
      const nid = nr * n + nc;
      if (parent[nid] === -1) continue;
      const ra = find(id), rb = find(nid);
      if (ra !== rb) { parent[ra] = rb; count--; }
    }
    res.push(count);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> parent;
    static Integer find(Integer x) { while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    public static List<Integer> numIslands2(Integer m, Integer n, List<List<Integer>> positions) {
        parent = new List<Integer>();
        for (Integer i = 0; i < m * n; i++) parent.add(-1);
        Integer count = 0;
        List<Integer> res = new List<Integer>();
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{1,0}, new List<Integer>{-1,0}, new List<Integer>{0,1}, new List<Integer>{0,-1}
        };
        for (List<Integer> p : positions) {
            Integer r = p[0], c = p[1], id = r * n + c;
            if (parent[id] != -1) { res.add(count); continue; }
            parent[id] = id;
            count++;
            for (List<Integer> d : dirs) {
                Integer nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                Integer nid = nr * n + nc;
                if (parent[nid] == -1) continue;
                Integer ra = find(id), rb = find(nid);
                if (ra != rb) { parent[ra] = rb; count--; }
            }
            res.add(count);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "making-a-large-island",
    title: "Making A Large Island",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Union Find", "Matrix"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an n×n binary grid, you may change at most one 0 to a 1. Return the size of the largest island (4-directionally connected 1s) achievable.",
    beginnerExplanation:
      "First label every existing island with a unique id and record its size. Then for each 0 cell, imagine flipping it: sum the sizes of the DISTINCT islands touching it (don't double-count the same island) plus 1 for the flipped cell. The best such sum (or the largest existing island) is the answer.",
    realWorldAnalogy:
      "Filling a single gap between land masses to fuse them — you pick the gap that joins the biggest combined landmass.",
    visualExplanation:
      "Pass 1: flood-fill islands → id→size. Pass 2: each 0 → 1 + sum of unique neighbouring island sizes; track the max.",
    approaches: [
      {
        title: "Label islands, then test each 0",
        tier: "Optimal",
        idea: "Give every island an id+size, then evaluate flipping each 0 by merging its distinct neighbour islands.",
        steps: [
          "Flood-fill each island with a unique id (≥2), store id→size",
          "best = largest existing island",
          "For each 0: sum distinct neighbour island sizes + 1; update best",
        ],
        time: "O(n²)",
        space: "O(n²)",
      },
    ],
    dryRun: "[[1,0],[0,1]]: two size-1 islands; flipping (0,1) joins both → 1+1+1 = 3.",
    interviewTips: [
      "Use a SET of neighbour island ids per 0 cell so a single island isn't counted twice.",
      "Handle the all-1s grid: the answer is n² (no 0 to flip).",
    ],
    commonMistakes: [
      "Double-counting the same island touched on two sides.",
      "Forgetting the no-zero case (grid already one big island).",
    ],
    followUps: ["Flip up to k zeros.", "Return which cell to flip."],
    related: ["number-of-islands-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def largest_island(grid):
    n = len(grid)
    sizes = {}
    iid = 2
    def dfs(r, c, i):
        if r < 0 or r >= n or c < 0 or c >= n or grid[r][c] != 1:
            return 0
        grid[r][c] = i
        return 1 + dfs(r+1, c, i) + dfs(r-1, c, i) + dfs(r, c+1, i) + dfs(r, c-1, i)
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1:
                sizes[iid] = dfs(r, c, iid)
                iid += 1
    best = max(sizes.values(), default=0)
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 0:
                seen = set()
                total = 1
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1 and grid[nr][nc] not in seen:
                        seen.add(grid[nr][nc])
                        total += sizes[grid[nr][nc]]
                best = max(best, total)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    int n;
    int dfs(int[][] g, int r, int c, int id) {
        if (r < 0 || r >= n || c < 0 || c >= n || g[r][c] != 1) return 0;
        g[r][c] = id;
        return 1 + dfs(g, r+1, c, id) + dfs(g, r-1, c, id) + dfs(g, r, c+1, id) + dfs(g, r, c-1, id);
    }
    public int largestIsland(int[][] grid) {
        n = grid.length;
        Map<Integer, Integer> sizes = new HashMap<>();
        int id = 2;
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                if (grid[r][c] == 1) sizes.put(id, dfs(grid, r, c, id++));
        int best = 0;
        for (int v : sizes.values()) best = Math.max(best, v);
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                if (grid[r][c] == 0) {
                    Set<Integer> seen = new HashSet<>();
                    int total = 1;
                    for (int[] d : dirs) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 1 && seen.add(grid[nr][nc]))
                            total += sizes.get(grid[nr][nc]);
                    }
                    best = Math.max(best, total);
                }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function largestIsland(grid) {
  const n = grid.length;
  const sizes = new Map();
  let id = 2;
  const dfs = (r, c, i) => {
    if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] !== 1) return 0;
    grid[r][c] = i;
    return 1 + dfs(r+1, c, i) + dfs(r-1, c, i) + dfs(r, c+1, i) + dfs(r, c-1, i);
  };
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c] === 1) sizes.set(id, dfs(r, c, id++));
  let best = 0;
  for (const v of sizes.values()) best = Math.max(best, v);
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c] === 0) {
        const seen = new Set();
        let total = 1;
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 1 && !seen.has(grid[nr][nc])) {
            seen.add(grid[nr][nc]);
            total += sizes.get(grid[nr][nc]);
          }
        }
        best = Math.max(best, total);
      }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer n;
    static List<List<Integer>> g;
    static Integer dfs(Integer r, Integer c, Integer id) {
        if (r < 0 || r >= n || c < 0 || c >= n || g[r][c] != 1) return 0;
        g[r][c] = id;
        return 1 + dfs(r+1, c, id) + dfs(r-1, c, id) + dfs(r, c+1, id) + dfs(r, c-1, id);
    }
    public static Integer largestIsland(List<List<Integer>> grid) {
        g = grid; n = grid.size();
        Map<Integer, Integer> sizes = new Map<Integer, Integer>();
        Integer id = 2;
        for (Integer r = 0; r < n; r++)
            for (Integer c = 0; c < n; c++)
                if (g[r][c] == 1) { sizes.put(id, dfs(r, c, id)); id++; }
        Integer best = 0;
        for (Integer v : sizes.values()) best = Math.max(best, v);
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{1,0}, new List<Integer>{-1,0}, new List<Integer>{0,1}, new List<Integer>{0,-1}
        };
        for (Integer r = 0; r < n; r++)
            for (Integer c = 0; c < n; c++)
                if (g[r][c] == 0) {
                    Set<Integer> seen = new Set<Integer>();
                    Integer total = 1;
                    for (List<Integer> d : dirs) {
                        Integer nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && g[nr][nc] > 1 && !seen.contains(g[nr][nc])) {
                            seen.add(g[nr][nc]);
                            total += sizes.get(g[nr][nc]);
                        }
                    }
                    best = Math.max(best, total);
                }
        return best;
    }
}`,
      },
    ],
  },
];

import type { Problem } from "@/lib/types";

export const PROBLEMS_BATCH_R: Problem[] = [
  {
    slug: "bfs-of-graph",
    title: "Breadth First Search of Graph",
    difficulty: "Easy",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given a connected undirected graph with V vertices (0-indexed) and an adjacency list `adj`, return the Breadth-First-Search traversal starting from vertex 0.",
    beginnerExplanation:
      "BFS explores the graph in rings: visit the start, then all its neighbours, then their unvisited neighbours, and so on. A queue holds the 'next to visit' frontier, and a visited array stops you revisiting nodes.",
    realWorldAnalogy:
      "Ripples from a stone dropped in a pond — the wave reaches everything one ring of distance at a time.",
    visualExplanation:
      "adj: 0→[1,2], 1→[0,3], 2→[0], 3→[1]\nqueue:[0] → visit 0 → push 1,2\nvisit 1 → push 3\nvisit 2 → visit 3 → order: 0 1 2 3",
    approaches: [
      {
        title: "Queue + visited array",
        tier: "Optimal",
        idea: "Push the start, mark visited, then repeatedly pop and enqueue unvisited neighbours.",
        steps: [
          "visited[0] = true, queue = [0]",
          "Pop node, append to result",
          "Enqueue each unvisited neighbour, marking it visited",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "Start 0 → [0] → neighbours 1,2 → [1,2] → 1's nb 3 → final 0,1,2,3",
    interviewTips: [
      "Mark a node visited when you ENQUEUE it, not when you dequeue — otherwise it can be queued twice.",
      "BFS gives shortest paths in an unweighted graph.",
    ],
    commonMistakes: [
      "Marking visited on dequeue → duplicates in the queue.",
      "Forgetting the graph may be disconnected (loop over all vertices if so).",
    ],
    followUps: ["Shortest path in an unweighted graph.", "Level-order distances from the source."],
    related: ["dfs-of-graph", "number-of-provinces"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def bfs_of_graph(V, adj):
    visited = [False] * V
    q = deque([0])
    visited[0] = True
    res = []
    while q:
        node = q.popleft()
        res.append(node)
        for nb in adj[node]:
            if not visited[nb]:
                visited[nb] = True
                q.append(nb)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> bfsOfGraph(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        List<Integer> res = new ArrayList<>();
        Queue<Integer> q = new LinkedList<>();
        q.add(0);
        visited[0] = true;
        while (!q.isEmpty()) {
            int node = q.poll();
            res.add(node);
            for (int nb : adj.get(node)) {
                if (!visited[nb]) { visited[nb] = true; q.add(nb); }
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function bfsOfGraph(V, adj) {
  const visited = new Array(V).fill(false);
  const res = [], q = [0];
  visited[0] = true;
  let i = 0;
  while (i < q.length) {
    const node = q[i++];
    res.push(node);
    for (const nb of adj[node]) {
      if (!visited[nb]) { visited[nb] = true; q.push(nb); }
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> bfsOfGraph(Integer V, List<List<Integer>> adj) {
        Boolean[] visited = new Boolean[V];
        for (Integer i = 0; i < V; i++) visited[i] = false;
        List<Integer> res = new List<Integer>();
        List<Integer> q = new List<Integer>{ 0 };
        visited[0] = true;
        Integer head = 0;
        while (head < q.size()) {
            Integer node = q[head]; head++;
            res.add(node);
            for (Integer nb : adj[node]) {
                if (!visited[nb]) { visited[nb] = true; q.add(nb); }
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "dfs-of-graph",
    title: "Depth First Search of Graph",
    difficulty: "Easy",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given a connected undirected graph with V vertices and an adjacency list `adj`, return the Depth-First-Search traversal starting from vertex 0.",
    beginnerExplanation:
      "DFS dives as deep as possible down one path before backtracking. Recursion (or an explicit stack) remembers where to resume; a visited array prevents cycles from looping forever.",
    realWorldAnalogy:
      "Exploring a cave system: follow one tunnel to its dead end, then back up to the last fork and try the next tunnel.",
    visualExplanation:
      "adj: 0→[1,2], 1→[0,3], 2→[0], 3→[1]\n0 → 1 → 3 (back) → 2 → order: 0 1 3 2",
    approaches: [
      {
        title: "Recursion + visited array",
        tier: "Optimal",
        idea: "Visit a node, recurse into each unvisited neighbour.",
        steps: ["Mark node visited, append to result", "Recurse on each unvisited neighbour"],
        time: "O(V + E)",
        space: "O(V) recursion stack",
      },
    ],
    dryRun: "Start 0 → recurse 1 → recurse 3 → back → recurse 2 → 0,1,3,2",
    interviewTips: [
      "An explicit stack avoids recursion-depth limits on large graphs.",
      "DFS underpins cycle detection, topological sort and connected components.",
    ],
    commonMistakes: ["No visited array → infinite recursion on cycles.", "Visiting in wrong order vs the expected output."],
    followUps: ["Count connected components.", "Detect a cycle."],
    related: ["bfs-of-graph", "number-of-provinces"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def dfs_of_graph(V, adj):
    visited = [False] * V
    res = []

    def dfs(node):
        visited[node] = True
        res.append(node)
        for nb in adj[node]:
            if not visited[nb]:
                dfs(nb)

    dfs(0)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> dfsOfGraph(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        List<Integer> res = new ArrayList<>();
        dfs(0, adj, visited, res);
        return res;
    }
    private void dfs(int node, List<List<Integer>> adj, boolean[] visited, List<Integer> res) {
        visited[node] = true;
        res.add(node);
        for (int nb : adj.get(node)) if (!visited[nb]) dfs(nb, adj, visited, res);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function dfsOfGraph(V, adj) {
  const visited = new Array(V).fill(false);
  const res = [];
  function dfs(node) {
    visited[node] = true;
    res.push(node);
    for (const nb of adj[node]) if (!visited[nb]) dfs(nb);
  }
  dfs(0);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> dfsOfGraph(Integer V, List<List<Integer>> adj) {
        Boolean[] visited = new Boolean[V];
        for (Integer i = 0; i < V; i++) visited[i] = false;
        List<Integer> res = new List<Integer>();
        dfs(0, adj, visited, res);
        return res;
    }
    static void dfs(Integer node, List<List<Integer>> adj, Boolean[] visited, List<Integer> res) {
        visited[node] = true;
        res.add(node);
        for (Integer nb : adj[node]) if (!visited[nb]) dfs(nb, adj, visited, res);
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-provinces",
    title: "Number of Provinces",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an n×n adjacency matrix `isConnected` where isConnected[i][j] = 1 means city i and j are directly connected, return the number of provinces (connected components).",
    beginnerExplanation:
      "Treat cities as graph nodes and direct connections as edges. Each time you find a city not yet assigned to a province, start a DFS/BFS that marks everyone reachable from it — that's one whole province.",
    realWorldAnalogy:
      "Friend groups in a class: pick anyone, find all their friends-of-friends, that's one clique; repeat for unpicked people to count the groups.",
    visualExplanation:
      "isConnected:\n1 1 0\n1 1 0\n0 0 1\ncity0↔1 form one province; city2 alone → 2 provinces",
    approaches: [
      {
        title: "DFS over components",
        tier: "Optimal",
        idea: "For each unvisited city, DFS all connected cities; count starts.",
        steps: ["Loop cities 0..n-1", "If unvisited: count++ and DFS its connected cities", "Return count"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "Union-Find",
        tier: "Optimal",
        idea: "Union connected cities; the answer is the number of distinct roots.",
        steps: ["Union i,j when isConnected[i][j]=1", "Count distinct find(i)"],
        time: "O(n² · α)",
        space: "O(n)",
      },
    ],
    dryRun: "n=3, edges 0-1 → DFS from 0 marks 0,1 (count=1); city2 unvisited → count=2",
    interviewTips: [
      "This is just 'count connected components' dressed up as cities.",
      "Union-Find shines if connections stream in dynamically.",
    ],
    commonMistakes: ["Treating the matrix as directed (it's symmetric).", "Re-counting already-visited cities."],
    followUps: ["Number of operations to make the network connected.", "Dynamic connectivity with Union-Find."],
    related: ["bfs-of-graph", "number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_circle_num(is_connected):
    n = len(is_connected)
    visited = [False] * n

    def dfs(i):
        visited[i] = True
        for j in range(n):
            if is_connected[i][j] == 1 and not visited[j]:
                dfs(j)

    count = 0
    for i in range(n):
        if not visited[i]:
            count += 1
            dfs(i)
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length, count = 0;
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (!visited[i]) { count++; dfs(i, isConnected, visited); }
        }
        return count;
    }
    private void dfs(int i, int[][] g, boolean[] visited) {
        visited[i] = true;
        for (int j = 0; j < g.length; j++)
            if (g[i][j] == 1 && !visited[j]) dfs(j, g, visited);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findCircleNum(isConnected) {
  const n = isConnected.length;
  const visited = new Array(n).fill(false);
  let count = 0;
  function dfs(i) {
    visited[i] = true;
    for (let j = 0; j < n; j++)
      if (isConnected[i][j] === 1 && !visited[j]) dfs(j);
  }
  for (let i = 0; i < n; i++) if (!visited[i]) { count++; dfs(i); }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findCircleNum(List<List<Integer>> isConnected) {
        Integer n = isConnected.size();
        Boolean[] visited = new Boolean[n];
        for (Integer i = 0; i < n; i++) visited[i] = false;
        Integer count = 0;
        for (Integer i = 0; i < n; i++) {
            if (!visited[i]) { count++; dfs(i, isConnected, visited); }
        }
        return count;
    }
    static void dfs(Integer i, List<List<Integer>> g, Boolean[] visited) {
        visited[i] = true;
        for (Integer j = 0; j < g.size(); j++)
            if (g[i][j] == 1 && !visited[j]) dfs(j, g, visited);
    }
}`,
      },
    ],
  },
  {
    slug: "flood-fill",
    title: "Flood Fill",
    difficulty: "Easy",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an image grid, a starting pixel (sr, sc) and a new color, repaint the starting pixel and all 4-directionally connected pixels of the SAME original color with the new color. Return the image.",
    beginnerExplanation:
      "It's the paint-bucket tool. Remember the starting colour, then flood outward to every touching pixel that shares that original colour, recolouring as you go.",
    realWorldAnalogy:
      "Spilling paint on a tiled floor — it spreads to every adjacent tile of the same colour until it hits a different colour or the wall.",
    visualExplanation:
      "image=[[1,1,1],[1,1,0],[1,0,1]], sr=1,sc=1,color=2\nflood the connected 1-region touching (1,1) → [[2,2,2],[2,2,0],[2,0,1]]",
    approaches: [
      {
        title: "DFS/BFS flood",
        tier: "Optimal",
        idea: "From the start, recolour and recurse into same-original-colour neighbours.",
        steps: [
          "Record start = image[sr][sc]; if it already equals newColor, return",
          "DFS: set newColor, recurse to 4 neighbours with the start colour",
        ],
        time: "O(rows × cols)",
        space: "O(rows × cols)",
      },
    ],
    dryRun: "start colour 1 at (1,1); recolour connected 1s to 2; cells with 0 untouched",
    interviewTips: [
      "Guard the case newColor == startColor or you'll infinite-loop.",
      "Same skeleton as Number of Islands — flood fill is the core primitive.",
    ],
    commonMistakes: [
      "Forgetting the start-equals-new-color early return.",
      "Comparing against the new colour mid-flood instead of the original.",
    ],
    followUps: ["Number of Islands.", "Max Area of Island."],
    related: ["number-of-islands", "01-matrix"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def flood_fill(image, sr, sc, color):
    start = image[sr][sc]
    if start == color:
        return image
    rows, cols = len(image), len(image[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or image[r][c] != start:
            return
        image[r][c] = color
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)

    dfs(sr, sc)
    return image`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int start = image[sr][sc];
        if (start != color) dfs(image, sr, sc, start, color);
        return image;
    }
    private void dfs(int[][] img, int r, int c, int start, int color) {
        if (r < 0 || c < 0 || r >= img.length || c >= img[0].length || img[r][c] != start) return;
        img[r][c] = color;
        dfs(img, r + 1, c, start, color);
        dfs(img, r - 1, c, start, color);
        dfs(img, r, c + 1, start, color);
        dfs(img, r, c - 1, start, color);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function floodFill(image, sr, sc, color) {
  const start = image[sr][sc];
  if (start === color) return image;
  const rows = image.length, cols = image[0].length;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r][c] !== start) return;
    image[r][c] = color;
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  dfs(sr, sc);
  return image;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> floodFill(List<List<Integer>> image, Integer sr, Integer sc, Integer color) {
        Integer start = image[sr][sc];
        if (start != color) dfs(image, sr, sc, start, color);
        return image;
    }
    static void dfs(List<List<Integer>> img, Integer r, Integer c, Integer start, Integer color) {
        if (r < 0 || c < 0 || r >= img.size() || c >= img[0].size() || img[r][c] != start) return;
        img[r][c] = color;
        dfs(img, r + 1, c, start, color);
        dfs(img, r - 1, c, start, color);
        dfs(img, r, c + 1, start, color);
        dfs(img, r, c - 1, start, color);
    }
}`,
      },
    ],
  },
  {
    slug: "detect-cycle-in-an-undirected-graph",
    title: "Detect Cycle in an Undirected Graph",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an undirected graph with V vertices and adjacency list `adj`, determine whether it contains any cycle.",
    beginnerExplanation:
      "Walk the graph (BFS/DFS). If you ever reach an already-visited node that ISN'T the neighbour you just came from, you've looped back — that's a cycle. Tracking the parent is what distinguishes a real cycle from the edge you arrived on.",
    realWorldAnalogy:
      "Walking a corridor maze trailing a string: if you bump into your own string somewhere other than right behind you, the corridors form a loop.",
    visualExplanation:
      "0-1, 1-2, 2-0 → start 0, visit 1 (parent0), visit 2 (parent1), 2 sees 0 already visited & ≠ parent → cycle",
    approaches: [
      {
        title: "BFS/DFS with parent tracking",
        tier: "Optimal",
        idea: "Traverse each component; a visited neighbour that isn't the parent means a cycle.",
        steps: [
          "For each unvisited node, BFS/DFS storing the parent",
          "If a neighbour is visited and != parent → cycle",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "triangle 0-1-2-0 → reaching 0 from 2 (parent 1) flags a cycle → true",
    interviewTips: [
      "Parent tracking is the whole trick for undirected cycles — directed graphs use a recursion stack instead.",
      "Loop over all vertices to cover disconnected components.",
    ],
    commonMistakes: [
      "Flagging the edge back to the parent as a cycle.",
      "Only checking from node 0 (misses other components).",
    ],
    followUps: ["Detect cycle in a directed graph.", "Graph Valid Tree (no cycle + connected)."],
    related: ["detect-cycle-in-a-directed-graph", "graph-valid-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def is_cycle(V, adj):
    visited = [False] * V

    def bfs(src):
        q = deque([(src, -1)])
        visited[src] = True
        while q:
            node, parent = q.popleft()
            for nb in adj[node]:
                if not visited[nb]:
                    visited[nb] = True
                    q.append((nb, node))
                elif nb != parent:
                    return True
        return False

    for i in range(V):
        if not visited[i] and bfs(i):
            return True
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isCycle(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        for (int i = 0; i < V; i++)
            if (!visited[i] && bfs(i, adj, visited)) return true;
        return false;
    }
    private boolean bfs(int src, List<List<Integer>> adj, boolean[] visited) {
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{src, -1});
        visited[src] = true;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int nb : adj.get(cur[0])) {
                if (!visited[nb]) { visited[nb] = true; q.add(new int[]{nb, cur[0]}); }
                else if (nb != cur[1]) return true;
            }
        }
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isCycle(V, adj) {
  const visited = new Array(V).fill(false);
  function bfs(src) {
    const q = [[src, -1]];
    visited[src] = true;
    let i = 0;
    while (i < q.length) {
      const [node, parent] = q[i++];
      for (const nb of adj[node]) {
        if (!visited[nb]) { visited[nb] = true; q.push([nb, node]); }
        else if (nb !== parent) return true;
      }
    }
    return false;
  }
  for (let i = 0; i < V; i++) if (!visited[i] && bfs(i)) return true;
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isCycle(Integer V, List<List<Integer>> adj) {
        Boolean[] visited = new Boolean[V];
        for (Integer i = 0; i < V; i++) visited[i] = false;
        for (Integer i = 0; i < V; i++)
            if (!visited[i] && bfs(i, adj, visited)) return true;
        return false;
    }
    static Boolean bfs(Integer src, List<List<Integer>> adj, Boolean[] visited) {
        List<List<Integer>> q = new List<List<Integer>>{ new List<Integer>{ src, -1 } };
        visited[src] = true;
        Integer head = 0;
        while (head < q.size()) {
            List<Integer> cur = q[head]; head++;
            Integer node = cur[0], parent = cur[1];
            for (Integer nb : adj[node]) {
                if (!visited[nb]) { visited[nb] = true; q.add(new List<Integer>{ nb, node }); }
                else if (nb != parent) return true;
            }
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "detect-cycle-in-a-directed-graph",
    title: "Detect Cycle in a Directed Graph",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given a directed graph with V vertices and adjacency list `adj`, determine whether it contains a cycle.",
    beginnerExplanation:
      "In a directed graph, a cycle exists if during DFS you reach a node that's still on the current recursion path. Two flags help: 'visited' (ever seen) and 'inPath' (on the active DFS stack). Hitting an inPath node means a back-edge → cycle.",
    realWorldAnalogy:
      "Task dependencies: if finishing task A eventually requires task A again, the project can never start — a circular dependency.",
    visualExplanation:
      "0→1→2→0 : DFS 0(inPath) →1(inPath) →2(inPath) →0 still inPath → cycle",
    approaches: [
      {
        title: "DFS with recursion-stack flag",
        tier: "Optimal",
        idea: "Track nodes on the current path; a neighbour already on the path is a back-edge (cycle).",
        steps: [
          "visited[] and inPath[] arrays",
          "DFS: mark visited + inPath; recurse neighbours; if neighbour inPath → cycle",
          "Unmark inPath on the way out",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
      {
        title: "Kahn's algorithm (BFS topo)",
        tier: "Optimal",
        idea: "If a topological order can't include all nodes, there's a cycle.",
        steps: ["Compute in-degrees", "Repeatedly remove 0-in-degree nodes", "If processed < V → cycle"],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "0→1, 1→2, 2→0 : recursion reaches 0 while 0 is inPath → cycle = true",
    interviewTips: [
      "The 'inPath/recursion-stack' flag is the key difference from undirected cycle detection.",
      "Kahn's algorithm doubles as cycle detection AND topological sort.",
    ],
    commonMistakes: [
      "Using only a visited array (works for undirected, fails for directed).",
      "Forgetting to clear inPath when backtracking.",
    ],
    followUps: ["Topological Sort.", "Course Schedule.", "Find Eventual Safe States."],
    related: ["topological-sort", "course-schedule", "find-eventual-safe-states"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_cyclic(V, adj):
    visited = [False] * V
    in_path = [False] * V

    def dfs(node):
        visited[node] = True
        in_path[node] = True
        for nb in adj[node]:
            if not visited[nb]:
                if dfs(nb):
                    return True
            elif in_path[nb]:
                return True
        in_path[node] = False
        return False

    for i in range(V):
        if not visited[i] and dfs(i):
            return True
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isCyclic(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V], inPath = new boolean[V];
        for (int i = 0; i < V; i++)
            if (!visited[i] && dfs(i, adj, visited, inPath)) return true;
        return false;
    }
    private boolean dfs(int node, List<List<Integer>> adj, boolean[] visited, boolean[] inPath) {
        visited[node] = true; inPath[node] = true;
        for (int nb : adj.get(node)) {
            if (!visited[nb]) { if (dfs(nb, adj, visited, inPath)) return true; }
            else if (inPath[nb]) return true;
        }
        inPath[node] = false;
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isCyclic(V, adj) {
  const visited = new Array(V).fill(false), inPath = new Array(V).fill(false);
  function dfs(node) {
    visited[node] = true; inPath[node] = true;
    for (const nb of adj[node]) {
      if (!visited[nb]) { if (dfs(nb)) return true; }
      else if (inPath[nb]) return true;
    }
    inPath[node] = false;
    return false;
  }
  for (let i = 0; i < V; i++) if (!visited[i] && dfs(i)) return true;
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isCyclic(Integer V, List<List<Integer>> adj) {
        Boolean[] visited = new Boolean[V], inPath = new Boolean[V];
        for (Integer i = 0; i < V; i++) { visited[i] = false; inPath[i] = false; }
        for (Integer i = 0; i < V; i++)
            if (!visited[i] && dfs(i, adj, visited, inPath)) return true;
        return false;
    }
    static Boolean dfs(Integer node, List<List<Integer>> adj, Boolean[] visited, Boolean[] inPath) {
        visited[node] = true; inPath[node] = true;
        for (Integer nb : adj[node]) {
            if (!visited[nb]) { if (dfs(nb, adj, visited, inPath)) return true; }
            else if (inPath[nb]) return true;
        }
        inPath[node] = false;
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "is-graph-bipartite",
    title: "Is Graph Bipartite",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an undirected graph as adjacency list `graph` (0-indexed), return true if it is bipartite — i.e. its nodes can be split into two sets with every edge crossing between the sets (equivalently, it is 2-colorable).",
    beginnerExplanation:
      "Try to 2-colour the graph: colour the start, give every neighbour the opposite colour, and so on. If you're ever forced to give a node the same colour as an already-coloured neighbour, it can't be bipartite.",
    realWorldAnalogy:
      "Seating guests at two tables so no two people who dislike each other share a table. If a 3-way feud exists, it's impossible.",
    visualExplanation:
      "0-1, 1-2, 2-0 (odd cycle) → colour 0=A,1=B,2=A but edge 2-0 same colour → not bipartite",
    approaches: [
      {
        title: "2-coloring BFS/DFS",
        tier: "Optimal",
        idea: "Colour each component alternately; conflict ⇒ not bipartite.",
        steps: [
          "color[] = -1; for each uncoloured node BFS",
          "Assign neighbour the opposite colour",
          "Same colour on an edge → return false",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "even cycle 0-1-2-3-0 → A B A B, all edges cross → bipartite; odd cycle fails",
    interviewTips: [
      "Bipartite ⇔ no odd-length cycle.",
      "Handle disconnected graphs by looping over all nodes.",
    ],
    commonMistakes: ["Assuming connectivity.", "Comparing colours before the neighbour is coloured."],
    followUps: ["Possible Bipartition.", "Graph coloring with k colours."],
    related: ["detect-cycle-in-an-undirected-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def is_bipartite(graph):
    n = len(graph)
    color = [-1] * n
    for start in range(n):
        if color[start] != -1:
            continue
        color[start] = 0
        q = deque([start])
        while q:
            node = q.popleft()
            for nb in graph[node]:
                if color[nb] == -1:
                    color[nb] = color[node] ^ 1
                    q.append(nb)
                elif color[nb] == color[node]:
                    return False
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);
        for (int start = 0; start < n; start++) {
            if (color[start] != -1) continue;
            color[start] = 0;
            Queue<Integer> q = new LinkedList<>();
            q.add(start);
            while (!q.isEmpty()) {
                int node = q.poll();
                for (int nb : graph[node]) {
                    if (color[nb] == -1) { color[nb] = color[node] ^ 1; q.add(nb); }
                    else if (color[nb] == color[node]) return false;
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
        code: `function isBipartite(graph) {
  const n = graph.length;
  const color = new Array(n).fill(-1);
  for (let start = 0; start < n; start++) {
    if (color[start] !== -1) continue;
    color[start] = 0;
    const q = [start];
    let i = 0;
    while (i < q.length) {
      const node = q[i++];
      for (const nb of graph[node]) {
        if (color[nb] === -1) { color[nb] = color[node] ^ 1; q.push(nb); }
        else if (color[nb] === color[node]) return false;
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
    public static Boolean isBipartite(List<List<Integer>> graph) {
        Integer n = graph.size();
        Integer[] color = new Integer[n];
        for (Integer i = 0; i < n; i++) color[i] = -1;
        for (Integer start = 0; start < n; start++) {
            if (color[start] != -1) continue;
            color[start] = 0;
            List<Integer> q = new List<Integer>{ start };
            Integer head = 0;
            while (head < q.size()) {
                Integer node = q[head]; head++;
                for (Integer nb : graph[node]) {
                    if (color[nb] == -1) { color[nb] = color[node] == 0 ? 1 : 0; q.add(nb); }
                    else if (color[nb] == color[node]) return false;
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
    slug: "find-eventual-safe-states",
    title: "Find Eventual Safe States",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "A directed graph is given as adjacency list `graph`. A node is SAFE if every path starting from it leads to a terminal node (no outgoing edges) — i.e. it can never get stuck in a cycle. Return all safe nodes in ascending order.",
    beginnerExplanation:
      "A node is safe if none of its paths can fall into a cycle. Run DFS with three colours: unvisited, in-progress (on the current path), and safe. If a DFS hits an in-progress node, that path loops, so the node is unsafe.",
    realWorldAnalogy:
      "Exits in a building: a room is 'safe' only if every corridor from it eventually reaches an exit, never circling back into a loop of rooms.",
    visualExplanation:
      "terminal nodes are safe; a node all of whose edges lead to safe nodes is safe; any node that can reach a cycle is unsafe",
    approaches: [
      {
        title: "DFS 3-color cycle detection",
        tier: "Optimal",
        idea: "Mark cycles; nodes that never touch a cycle are safe.",
        steps: [
          "color 0=unvisited,1=in-progress,2=safe",
          "DFS: if a neighbour is in-progress → unsafe; if any neighbour unsafe → unsafe",
          "Else mark safe (2)",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
      {
        title: "Reverse graph + Kahn's",
        tier: "Optimal",
        idea: "Topologically peel terminal nodes from the reversed graph; survivors are safe.",
        steps: ["Reverse edges", "Kahn's on reversed graph", "Nodes processed are safe"],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "node with edge into a 2-cycle → unsafe; terminal node → safe; collect safe nodes sorted",
    interviewTips: [
      "Same recursion-stack idea as directed cycle detection — safe = 'cannot reach a cycle'.",
      "The reverse-topo approach avoids recursion depth issues.",
    ],
    commonMistakes: ["Marking a node safe before all its DFS children resolve.", "Not returning results sorted."],
    followUps: ["Detect Cycle in a Directed Graph.", "Course Schedule."],
    related: ["detect-cycle-in-a-directed-graph", "topological-sort"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def eventual_safe_nodes(graph):
    n = len(graph)
    color = [0] * n  # 0 unvisited, 1 in-progress, 2 safe

    def dfs(node):
        if color[node] != 0:
            return color[node] == 2
        color[node] = 1
        for nb in graph[node]:
            if not dfs(nb):
                return False
        color[node] = 2
        return True

    return [i for i in range(n) if dfs(i)]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) if (dfs(i, graph, color)) res.add(i);
        return res;
    }
    private boolean dfs(int node, int[][] graph, int[] color) {
        if (color[node] != 0) return color[node] == 2;
        color[node] = 1;
        for (int nb : graph[node]) if (!dfs(nb, graph, color)) return false;
        color[node] = 2;
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function eventualSafeNodes(graph) {
  const n = graph.length;
  const color = new Array(n).fill(0);
  function dfs(node) {
    if (color[node] !== 0) return color[node] === 2;
    color[node] = 1;
    for (const nb of graph[node]) if (!dfs(nb)) return false;
    color[node] = 2;
    return true;
  }
  const res = [];
  for (let i = 0; i < n; i++) if (dfs(i)) res.push(i);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> eventualSafeNodes(List<List<Integer>> graph) {
        Integer n = graph.size();
        Integer[] color = new Integer[n];
        for (Integer i = 0; i < n; i++) color[i] = 0;
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < n; i++) if (dfs(i, graph, color)) res.add(i);
        return res;
    }
    static Boolean dfs(Integer node, List<List<Integer>> graph, Integer[] color) {
        if (color[node] != 0) return color[node] == 2;
        color[node] = 1;
        for (Integer nb : graph[node]) if (!dfs(nb, graph, color)) return false;
        color[node] = 2;
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "01-matrix",
    title: "01 Matrix",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an m×n binary matrix, return a matrix of the same size where each cell holds the distance to the nearest 0 (4-directional steps).",
    beginnerExplanation:
      "Instead of searching outward from every 1 (slow), start a single BFS from ALL the 0-cells at once. The wavefront expands one ring at a time, so the first time it reaches a 1, that's its true nearest-zero distance.",
    realWorldAnalogy:
      "Every 0 is a fire lit at the same moment; the time the fire reaches a cell is its distance to the closest fire source.",
    visualExplanation:
      "[[0,0,0],[0,1,0],[1,1,1]] → seed all 0s at dist 0 → BFS → [[0,0,0],[0,1,0],[1,2,1]]",
    approaches: [
      {
        title: "Per-cell BFS",
        tier: "Brute Force",
        idea: "From each 1, BFS to the nearest 0.",
        steps: ["For each 1, BFS until a 0 is found"],
        time: "O((m·n)²)",
        space: "O(m·n)",
      },
      {
        title: "Multi-source BFS",
        tier: "Optimal",
        idea: "Seed the queue with every 0 (distance 0); expand once.",
        steps: [
          "dist=0 for zeros (enqueue), -1/unknown for ones",
          "BFS: a neighbour with unknown distance gets dist+1, enqueue",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun: "queue all zeros → pop, relax unknown neighbours to dist+1 → fills entire grid in one sweep",
    interviewTips: [
      "Multi-source BFS is the key trick — don't BFS from each 1 separately.",
      "Mark cells as you enqueue to avoid re-processing.",
    ],
    commonMistakes: [
      "Single-source BFS from each 1 (TLE).",
      "Not marking visited, causing repeated enqueues.",
    ],
    followUps: ["Walls and Gates.", "Rotting Oranges."],
    related: ["rotting-oranges", "flood-fill"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def update_matrix(mat):
    rows, cols = len(mat), len(mat[0])
    dist = [[-1] * cols for _ in range(rows)]
    q = deque()
    for r in range(rows):
        for c in range(cols):
            if mat[r][c] == 0:
                dist[r][c] = 0
                q.append((r, c))
    while q:
        r, c = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return dist`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int rows = mat.length, cols = mat[0].length;
        int[][] dist = new int[rows][cols];
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++) {
                if (mat[r][c] == 0) q.add(new int[]{r, c});
                else dist[r][c] = -1;
            }
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0]+d[0], nc = cur[1]+d[1];
                if (nr>=0 && nc>=0 && nr<rows && nc<cols && dist[nr][nc]==-1) {
                    dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
                    q.add(new int[]{nr, nc});
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
        code: `function updateMatrix(mat) {
  const rows = mat.length, cols = mat[0].length;
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
  const q = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (mat[r][c] === 0) { dist[r][c] = 0; q.push([r, c]); }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let i = 0;
  while (i < q.length) {
    const [r, c] = q[i++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr>=0 && nc>=0 && nr<rows && nc<cols && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        q.push([nr, nc]);
      }
    }
  }
  return dist;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> updateMatrix(List<List<Integer>> mat) {
        Integer rows = mat.size(), cols = mat[0].size();
        List<List<Integer>> dist = new List<List<Integer>>();
        List<List<Integer>> q = new List<List<Integer>>();
        for (Integer r = 0; r < rows; r++) {
            List<Integer> row = new List<Integer>();
            for (Integer c = 0; c < cols; c++) {
                if (mat[r][c] == 0) { row.add(0); q.add(new List<Integer>{ r, c }); }
                else row.add(-1);
            }
            dist.add(row);
        }
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{1,0}, new List<Integer>{-1,0},
            new List<Integer>{0,1}, new List<Integer>{0,-1}
        };
        Integer head = 0;
        while (head < q.size()) {
            List<Integer> cur = q[head]; head++;
            Integer r = cur[0], c = cur[1];
            for (List<Integer> d : dirs) {
                Integer nr = r + d[0], nc = c + d[1];
                if (nr>=0 && nc>=0 && nr<rows && nc<cols && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.add(new List<Integer>{ nr, nc });
                }
            }
        }
        return dist;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-enclaves",
    title: "Number of Enclaves",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an m×n binary grid (1 = land, 0 = sea), return the number of land cells from which you CANNOT walk off the boundary of the grid in 4 directions.",
    beginnerExplanation:
      "Any land touching the border (or connected to border-land) can escape. So flood-fill from every border land cell and sink it; whatever land remains is trapped — count it.",
    realWorldAnalogy:
      "Islands that don't touch the coastline of the map — boats can't reach them from the open sea at the edges.",
    visualExplanation:
      "[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]] → border land flooded; the inner 1s that can't reach an edge are enclaves → 3",
    approaches: [
      {
        title: "Flood from borders, count survivors",
        tier: "Optimal",
        idea: "Sink all land reachable from the border; remaining land is enclosed.",
        steps: [
          "DFS/BFS from every land cell on the 4 borders, marking visited",
          "Count unvisited land cells",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun: "flood border-connected 1s → remaining interior 1s counted as enclaves",
    interviewTips: [
      "Reverse the question: it's easier to eliminate escapable land than to test each cell.",
      "Same border-flood trick as Surrounded Regions.",
    ],
    commonMistakes: ["Counting border-connected land.", "Diagonal moves (it's 4-directional)."],
    followUps: ["Surrounded Regions.", "Number of Closed Islands."],
    related: ["surrounded-regions", "number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def num_enclaves(grid):
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != 1:
            return
        grid[r][c] = 0
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if (r in (0, rows - 1) or c in (0, cols - 1)) and grid[r][c] == 1:
                dfs(r, c)
    return sum(row.count(1) for row in grid)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numEnclaves(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if ((r == 0 || c == 0 || r == rows - 1 || c == cols - 1) && grid[r][c] == 1)
                    dfs(grid, r, c);
        int count = 0;
        for (int[] row : grid) for (int v : row) count += v;
        return count;
    }
    private void dfs(int[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != 1) return;
        g[r][c] = 0;
        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numEnclaves(grid) {
  const rows = grid.length, cols = grid[0].length;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return;
    grid[r][c] = 0;
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if ((r === 0 || c === 0 || r === rows-1 || c === cols-1) && grid[r][c] === 1) dfs(r, c);
  let count = 0;
  for (const row of grid) for (const v of row) count += v;
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer numEnclaves(List<List<Integer>> grid) {
        Integer rows = grid.size(), cols = grid[0].size();
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                if ((r == 0 || c == 0 || r == rows-1 || c == cols-1) && grid[r][c] == 1)
                    dfs(grid, r, c);
        Integer count = 0;
        for (List<Integer> row : grid) for (Integer v : row) count += v;
        return count;
    }
    static void dfs(List<List<Integer>> g, Integer r, Integer c) {
        if (r < 0 || c < 0 || r >= g.size() || c >= g[0].size() || g[r][c] != 1) return;
        g[r][c] = 0;
        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-distinct-islands",
    title: "Number of Distinct Islands",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a binary grid, count the number of islands with DISTINCT shapes. Two islands are the same shape if one can be translated (not rotated/reflected) onto the other.",
    beginnerExplanation:
      "Flood-fill each island like normal, but record the SHAPE — the cell offsets relative to the island's starting cell. Two islands with the same set of relative offsets are the same shape, so store each shape signature in a set and count distinct ones.",
    realWorldAnalogy:
      "Sorting cookie-cutter shapes: slide each cutter to a corner and compare outlines; identical outlines count once.",
    visualExplanation:
      "DFS from island start (r0,c0); record (r-r0, c-c0) for each cell → a tuple/string signature; set of signatures → distinct count",
    approaches: [
      {
        title: "DFS + normalized shape signature",
        tier: "Optimal",
        idea: "Encode each island as offsets from its top-left start; dedupe in a set.",
        steps: [
          "For each unvisited land cell, DFS recording (dr, dc) from the start",
          "Serialize the offsets to a key; add to a set",
          "Answer = set size",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun: "two L-shaped islands → identical offset signatures → counted once → distinct = 1",
    interviewTips: [
      "Offsets relative to the FIRST visited cell normalize position; a fixed DFS order keeps signatures consistent.",
      "Recording the move-path ('D','R',...) also works as a signature.",
    ],
    commonMistakes: [
      "Using absolute coordinates (every island looks distinct).",
      "Inconsistent traversal order making equal shapes differ.",
    ],
    followUps: ["Number of Islands.", "Make a Large Island."],
    related: ["number-of-islands", "max-area-of-island"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_distinct_islands(grid):
    rows, cols = len(grid), len(grid[0])
    shapes = set()

    def dfs(r, c, r0, c0, shape):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != 1:
            return
        grid[r][c] = 0
        shape.append((r - r0, c - c0))
        dfs(r + 1, c, r0, c0, shape); dfs(r - 1, c, r0, c0, shape)
        dfs(r, c + 1, r0, c0, shape); dfs(r, c - 1, r0, c0, shape)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                shape = []
                dfs(r, c, r, c, shape)
                shapes.add(tuple(shape))
    return len(shapes)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int countDistinctIslands(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        Set<String> shapes = new HashSet<>();
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == 1) {
                    StringBuilder sb = new StringBuilder();
                    dfs(grid, r, c, r, c, sb);
                    shapes.add(sb.toString());
                }
        return shapes.size();
    }
    private void dfs(int[][] g, int r, int c, int r0, int c0, StringBuilder sb) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != 1) return;
        g[r][c] = 0;
        sb.append(r - r0).append(',').append(c - c0).append(';');
        dfs(g, r+1, c, r0, c0, sb); dfs(g, r-1, c, r0, c0, sb);
        dfs(g, r, c+1, r0, c0, sb); dfs(g, r, c-1, r0, c0, sb);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countDistinctIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  const shapes = new Set();
  function dfs(r, c, r0, c0, acc) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return;
    grid[r][c] = 0;
    acc.push((r - r0) + "," + (c - c0));
    dfs(r+1, c, r0, c0, acc); dfs(r-1, c, r0, c0, acc);
    dfs(r, c+1, r0, c0, acc); dfs(r, c-1, r0, c0, acc);
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) {
        const acc = [];
        dfs(r, c, r, c, acc);
        shapes.add(acc.join(";"));
      }
  return shapes.size;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countDistinctIslands(List<List<Integer>> grid) {
        Integer rows = grid.size(), cols = grid[0].size();
        Set<String> shapes = new Set<String>();
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                if (grid[r][c] == 1) {
                    List<String> acc = new List<String>();
                    dfs(grid, r, c, r, c, acc);
                    shapes.add(String.join(acc, ';'));
                }
        return shapes.size();
    }
    static void dfs(List<List<Integer>> g, Integer r, Integer c, Integer r0, Integer c0, List<String> acc) {
        if (r < 0 || c < 0 || r >= g.size() || c >= g[0].size() || g[r][c] != 1) return;
        g[r][c] = 0;
        acc.add((r - r0) + ',' + (c - c0));
        dfs(g, r+1, c, r0, c0, acc); dfs(g, r-1, c, r0, c0, acc);
        dfs(g, r, c+1, r0, c0, acc); dfs(g, r, c-1, r0, c0, acc);
    }
}`,
      },
    ],
  },
  {
    slug: "topological-sort",
    title: "Topological Sort",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given a Directed Acyclic Graph (DAG) with V vertices and adjacency list `adj`, return any valid topological ordering — a linear order where every directed edge u→v has u before v.",
    beginnerExplanation:
      "A topo order respects dependencies. Kahn's algorithm: repeatedly take any node with no remaining incoming edges (in-degree 0), output it, and remove its outgoing edges (decrementing neighbours' in-degrees). DFS post-order reversed works too.",
    realWorldAnalogy:
      "Course prerequisites: you can only take a course once all its prerequisites are done — the order you take them in is a topological sort.",
    visualExplanation:
      "edges 5→0,5→2,4→0,4→1,2→3,3→1 → in-degree-0 {4,5} first → e.g. 5 4 2 3 1 0",
    approaches: [
      {
        title: "Kahn's algorithm (BFS)",
        tier: "Optimal",
        idea: "Repeatedly emit in-degree-0 nodes, decrementing neighbours.",
        steps: [
          "Compute in-degrees; enqueue all with in-degree 0",
          "Pop, append to order, decrement neighbours; enqueue any that hit 0",
          "Order length < V ⇒ there was a cycle (not a DAG)",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
      {
        title: "DFS post-order reversed",
        tier: "Optimal",
        idea: "Push nodes after exploring all descendants; reverse at the end.",
        steps: ["DFS each unvisited node", "On exit, push to stack", "Reverse the stack"],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "in-degree: 0:2,1:2,2:1,3:1,4:0,5:0 → emit 4,5 → 0,2 reach 0 → ... valid order produced",
    interviewTips: [
      "Kahn's algorithm also detects cycles: if you can't emit all V nodes, the graph isn't a DAG.",
      "Multiple valid orders exist — interviewers accept any correct one.",
    ],
    commonMistakes: [
      "Running it on a graph with a cycle and expecting a full order.",
      "Forgetting to reverse the DFS post-order.",
    ],
    followUps: ["Course Schedule / Course Schedule II.", "Alien Dictionary."],
    related: ["course-schedule", "course-schedule-ii", "detect-cycle-in-a-directed-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def topo_sort(V, adj):
    indeg = [0] * V
    for u in range(V):
        for v in adj[u]:
            indeg[v] += 1
    q = deque([i for i in range(V) if indeg[i] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nb in adj[node]:
            indeg[nb] -= 1
            if indeg[nb] == 0:
                q.append(nb)
    return order  # len(order) < V means a cycle exists`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] topoSort(int V, List<List<Integer>> adj) {
        int[] indeg = new int[V];
        for (int u = 0; u < V; u++) for (int v : adj.get(u)) indeg[v]++;
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) if (indeg[i] == 0) q.add(i);
        int[] order = new int[V];
        int idx = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            order[idx++] = node;
            for (int nb : adj.get(node)) if (--indeg[nb] == 0) q.add(nb);
        }
        return order;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function topoSort(V, adj) {
  const indeg = new Array(V).fill(0);
  for (let u = 0; u < V; u++) for (const v of adj[u]) indeg[v]++;
  const q = [];
  for (let i = 0; i < V; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  let i = 0;
  while (i < q.length) {
    const node = q[i++];
    order.push(node);
    for (const nb of adj[node]) if (--indeg[nb] === 0) q.push(nb);
  }
  return order;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> topoSort(Integer V, List<List<Integer>> adj) {
        Integer[] indeg = new Integer[V];
        for (Integer i = 0; i < V; i++) indeg[i] = 0;
        for (Integer u = 0; u < V; u++) for (Integer v : adj[u]) indeg[v]++;
        List<Integer> q = new List<Integer>();
        for (Integer i = 0; i < V; i++) if (indeg[i] == 0) q.add(i);
        List<Integer> order = new List<Integer>();
        Integer head = 0;
        while (head < q.size()) {
            Integer node = q[head]; head++;
            order.add(node);
            for (Integer nb : adj[node]) { indeg[nb]--; if (indeg[nb] == 0) q.add(nb); }
        }
        return order;
    }
}`,
      },
    ],
  },
];

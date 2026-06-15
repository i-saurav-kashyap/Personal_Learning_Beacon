import type { Problem } from "@/lib/types";

// Graphs / matrix DFS-BFS / advanced graphs batch (NeetCode 150 gap).
// Grid problems use their canonical LeetCode input type (stated per problem),
// consistent across all four languages.

export const PROBLEMS_BATCH_I: Problem[] = [
  {
    slug: "max-area-of-island",
    title: "Max Area of Island",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given an `m x n` binary grid of 1 (land) and 0 (water), return the area of the largest island (4-directionally connected land cells). If there is no island, return 0.",
    beginnerExplanation:
      "It's Number of Islands, but instead of counting islands you measure each one. Walk the grid; the first time you touch an unvisited land cell, flood-fill its whole connected blob, counting cells as you go, and keep the biggest area you ever flood.",
    realWorldAnalogy:
      "Pouring dye on connected oil slicks in water and timing how big each slick spreads — you remember the largest spread.",
    visualExplanation:
      "grid:\n1 1 0\n1 0 0\n0 0 1\nflood top-left blob → area 3\nflood bottom-right blob → area 1\nmax = 3",
    approaches: [
      {
        title: "Flood fill, track max",
        tier: "Optimal",
        idea: "DFS/BFS from each unvisited land cell, summing its connected area, and keep the maximum. Sink visited land to avoid recounting.",
        steps: [
          "Loop every cell",
          "On a land cell, DFS returning 1 + areas of its 4 neighbours, sinking each to 0",
          "Track the largest area returned",
        ],
        time: "O(m × n)",
        space: "O(m × n) recursion worst case",
      },
    ],
    dryRun:
      "grid=[[1,1],[0,1]]\n(0,0) land → dfs sinks (0,0),(0,1),(1,1) → area 3\nremaining cells water → max = 3",
    interviewTips: [
      "Same skeleton as Number of Islands — say that out loud, then change the accumulator from a counter to an area sum.",
      "Mutating the grid to 0 is the cleanest visited-marker; mention a visited set if mutation is disallowed.",
    ],
    commonMistakes: [
      "Forgetting to sink visited cells → infinite recursion or inflated areas.",
      "Counting diagonal neighbours (it's 4-directional).",
    ],
    followUps: ["Count distinct island shapes.", "Largest island after flipping one 0 to 1."],
    related: ["number-of-islands", "surrounded-regions"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_area_of_island(grid):
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == 0:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int rows, cols;

    public int maxAreaOfIsland(int[][] grid) {
        rows = grid.length;
        cols = grid[0].length;
        int best = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == 1) best = Math.max(best, dfs(grid, r, c));
        return best;
    }

    private int dfs(int[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || g[r][c] == 0) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r + 1, c) + dfs(g, r - 1, c) + dfs(g, r, c + 1) + dfs(g, r, c - 1);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0].length;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }
  let best = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) best = Math.max(best, dfs(r, c));
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer rows, cols;

    public static Integer maxAreaOfIsland(List<List<Integer>> grid) {
        rows = grid.size();
        cols = grid[0].size();
        Integer best = 0;
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                if (grid[r][c] == 1) best = Math.max(best, dfs(grid, r, c));
        return best;
    }

    static Integer dfs(List<List<Integer>> g, Integer r, Integer c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || g[r][c] == 0) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r + 1, c) + dfs(g, r - 1, c) + dfs(g, r, c + 1) + dfs(g, r, c - 1);
    }
}`,
      },
    ],
  },
  {
    slug: "surrounded-regions",
    title: "Surrounded Regions",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given an `m x n` board of 'X' and 'O', capture every region of 'O' that is completely surrounded by 'X' by flipping those 'O's to 'X'. An 'O' is safe if it can reach the border through other 'O's.",
    beginnerExplanation:
      "Flip the logic: instead of hunting for surrounded regions, find the SAFE ones. Any 'O' connected to the border can't be captured. Mark all border-connected 'O's, then everything still 'O' is surrounded — flip it.",
    realWorldAnalogy:
      "Territory on a Go board: stones touching the edge can always breathe; only fully enclosed groups get captured.",
    visualExplanation:
      "X X X\nX O X   → the middle O can't reach the border → captured\nX X X\nResult: all X",
    approaches: [
      {
        title: "Brute: check each region for border contact",
        tier: "Brute Force",
        idea: "For every 'O' region, flood it and test whether any cell sits on the border.",
        steps: ["For each unvisited 'O' region, BFS it", "If it never touches the border, flip the whole region"],
        time: "O(m × n)",
        space: "O(m × n)",
      },
      {
        title: "Mark border-connected 'O's, flip the rest",
        tier: "Optimal",
        idea: "DFS inward from every border 'O', marking safe cells; then flip unmarked 'O'→'X' and restore safe→'O'.",
        steps: [
          "DFS from all border cells that are 'O', marking them (e.g. 'S')",
          "Scan the board: 'O' → 'X' (captured), 'S' → 'O' (restore)",
        ],
        time: "O(m × n)",
        space: "O(m × n) recursion",
      },
    ],
    dryRun:
      "border DFS marks edge-touching O's as S\ninterior O with no border path stays O → becomes X\nS's revert to O",
    interviewTips: [
      "The 'invert the problem' insight (find safe, not surrounded) is exactly what the interviewer is probing — verbalise it.",
      "Only border cells need to seed the DFS — don't scan the interior to start.",
    ],
    commonMistakes: [
      "Trying to detect 'surrounded' directly and mishandling regions touching the edge.",
      "Forgetting to restore the safe-marked cells back to 'O'.",
    ],
    followUps: ["Number of enclaves (count captured cells).", "Same idea on a graph instead of a grid."],
    related: ["number-of-islands", "max-area-of-island"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def solve(board):
    if not board or not board[0]:
        return board
    rows, cols = len(board), len(board[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != "O":
            return
        board[r][c] = "S"
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)

    for r in range(rows):
        dfs(r, 0); dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c); dfs(rows - 1, c)
    for r in range(rows):
        for c in range(cols):
            board[r][c] = "X" if board[r][c] == "O" else ("O" if board[r][c] == "S" else board[r][c])
    return board`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int rows, cols;

    public void solve(char[][] board) {
        if (board.length == 0) return;
        rows = board.length;
        cols = board[0].length;
        for (int r = 0; r < rows; r++) { dfs(board, r, 0); dfs(board, r, cols - 1); }
        for (int c = 0; c < cols; c++) { dfs(board, 0, c); dfs(board, rows - 1, c); }
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                else if (board[r][c] == 'S') board[r][c] = 'O';
            }
    }

    private void dfs(char[][] b, int r, int c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || b[r][c] != 'O') return;
        b[r][c] = 'S';
        dfs(b, r + 1, c); dfs(b, r - 1, c); dfs(b, r, c + 1); dfs(b, r, c - 1);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function solve(board) {
  if (!board.length) return board;
  const rows = board.length, cols = board[0].length;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== "O") return;
    board[r][c] = "S";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols - 1); }
  for (let c = 0; c < cols; c++) { dfs(0, c); dfs(rows - 1, c); }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === "O") board[r][c] = "X";
      else if (board[r][c] === "S") board[r][c] = "O";
    }
  return board;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer rows, cols;

    public static List<List<String>> solve(List<List<String>> board) {
        if (board.isEmpty()) return board;
        rows = board.size();
        cols = board[0].size();
        for (Integer r = 0; r < rows; r++) { dfs(board, r, 0); dfs(board, r, cols - 1); }
        for (Integer c = 0; c < cols; c++) { dfs(board, 0, c); dfs(board, rows - 1, c); }
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++) {
                if (board[r][c] == 'O') board[r].set(c, 'X');
                else if (board[r][c] == 'S') board[r].set(c, 'O');
            }
        return board;
    }

    static void dfs(List<List<String>> b, Integer r, Integer c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || b[r][c] != 'O') return;
        b[r].set(c, 'S');
        dfs(b, r + 1, c); dfs(b, r - 1, c); dfs(b, r, c + 1); dfs(b, r, c - 1);
    }
}`,
      },
    ],
  },
  {
    slug: "walls-and-gates",
    title: "Walls and Gates",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["google", "meta", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "You're given an `m x n` grid where -1 is a wall, 0 is a gate, and 2147483647 (INF) is an empty room. Fill each empty room with the distance to its nearest gate. If a room can't reach any gate, leave it as INF.",
    beginnerExplanation:
      "Don't BFS outward from every room (slow). Instead start a single BFS from ALL gates at once — they expand in lockstep, so the first time a wave reaches a room, that's its shortest distance to the nearest gate.",
    realWorldAnalogy:
      "Drop dye into every gate simultaneously; the dye spreads one ring per second. The second a room turns colored is exactly its distance to the closest gate.",
    visualExplanation:
      "INF=∞, gates=0, walls=W\n∞ -1  0 ∞      3 -1 0 1\n∞ ∞  ∞ -1  →   2  2 1 -1\n∞ -1 ∞ -1      1 -1 2 -1\n0 -1 ∞ ∞       0 -1 3  4",
    approaches: [
      {
        title: "BFS from each room",
        tier: "Brute Force",
        idea: "For every empty room, BFS to the nearest gate.",
        steps: ["For each INF room", "BFS until a gate is found", "Record the distance"],
        time: "O((m·n)²)",
        space: "O(m·n)",
      },
      {
        title: "Multi-source BFS from all gates",
        tier: "Optimal",
        idea: "Seed the queue with every gate (distance 0) and BFS once; each room is reached first by its closest gate.",
        steps: [
          "Enqueue all gate cells (value 0)",
          "BFS; for each INF neighbour, set it to current + 1 and enqueue",
          "INF acts as the visited check (only unvisited rooms are still INF)",
        ],
        time: "O(m × n)",
        space: "O(m × n)",
      },
    ],
    dryRun:
      "queue starts with all gates.\nlevel 1: rooms adjacent to a gate → 1\nlevel 2: their unfilled neighbours → 2 … until queue empties.",
    interviewTips: [
      "Say 'multi-source BFS' explicitly — seeding all gates at once is the whole trick.",
      "Checking `== INF` doubles as the visited test, so no separate visited set is needed.",
    ],
    commonMistakes: [
      "Single-source BFS per room (quadratic) instead of multi-source.",
      "Overwriting a room that already has a smaller distance (won't happen if you only touch INF cells).",
    ],
    followUps: ["01 Matrix (distance to nearest 0).", "Rotting Oranges is the same multi-source BFS shape."],
    related: ["rotting-oranges", "number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def walls_and_gates(rooms):
    if not rooms or not rooms[0]:
        return rooms
    rows, cols = len(rooms), len(rooms[0])
    INF = 2147483647
    q = deque()
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                q.append((r, c))
    while q:
        r, c = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                rooms[nr][nc] = rooms[r][c] + 1
                q.append((nr, nc))
    return rooms`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public void wallsAndGates(int[][] rooms) {
        if (rooms.length == 0) return;
        int rows = rooms.length, cols = rooms[0].length;
        int INF = 2147483647;
        Deque<int[]> q = new ArrayDeque<>();
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (rooms[r][c] == 0) q.offer(new int[]{r, c});
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && rooms[nr][nc] == INF) {
                    rooms[nr][nc] = rooms[r][c] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function wallsAndGates(rooms) {
  if (!rooms.length) return rooms;
  const rows = rooms.length, cols = rooms[0].length;
  const INF = 2147483647;
  let q = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (rooms[r][c] === 0) q.push([r, c]);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length) {
    const next = [];
    for (const [r, c] of q) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && rooms[nr][nc] === INF) {
          rooms[nr][nc] = rooms[r][c] + 1;
          next.push([nr, nc]);
        }
      }
    }
    q = next;
  }
  return rooms;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> wallsAndGates(List<List<Integer>> rooms) {
        if (rooms.isEmpty()) return rooms;
        Integer rows = rooms.size(), cols = rooms[0].size();
        Integer INF = 2147483647;
        // encode cell as r * cols + c
        List<Integer> q = new List<Integer>();
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                if (rooms[r][c] == 0) q.add(r * cols + c);
        Integer[] dr = new Integer[]{1, -1, 0, 0};
        Integer[] dc = new Integer[]{0, 0, 1, -1};
        Integer head = 0;
        while (head < q.size()) {
            Integer cell = q[head]; head++;
            Integer r = cell / cols, c = Math.mod(cell, cols);
            for (Integer k = 0; k < 4; k++) {
                Integer nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && rooms[nr][nc] == INF) {
                    rooms[nr].set(nc, rooms[r][c] + 1);
                    q.add(nr * cols + nc);
                }
            }
        }
        return rooms;
    }
}`,
      },
    ],
  },
  {
    slug: "reconstruct-itinerary",
    title: "Reconstruct Itinerary",
    difficulty: "Hard",
    patterns: ["graphs"],
    topics: ["Graphs"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given a list of airline `tickets` [from, to], reconstruct the itinerary that uses every ticket exactly once, starting at 'JFK'. If multiple valid itineraries exist, return the one that is smallest in lexical order. A valid itinerary always exists.",
    beginnerExplanation:
      "This is finding an Eulerian path (use every edge once). Build the graph with each airport's destinations sorted, then do a DFS that always takes the smallest available next flight; append airports as you get stuck and reverse at the end.",
    realWorldAnalogy:
      "Walking every street in a town exactly once: you keep taking the alphabetically-first unused road; when you hit a dead end you note the spot and back up — the reversed list of dead-ends is your full route.",
    visualExplanation:
      'tickets=[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]\nHierholzer from JFK, always smallest first →\nJFK → ATL → JFK → SFO → ATL → SFO',
    approaches: [
      {
        title: "Backtracking over permutations",
        tier: "Brute Force",
        idea: "Try orderings of tickets, keep the first lexicographically valid full path.",
        steps: ["DFS trying each unused ticket from the current airport", "Backtrack on dead ends"],
        time: "Exponential",
        space: "O(E)",
      },
      {
        title: "Hierholzer's algorithm (Eulerian path)",
        tier: "Optimal",
        idea: "Keep destinations sorted; DFS taking the smallest edge, push airports onto the route when stuck, then reverse.",
        steps: [
          "Build adjacency with destinations sorted ascending",
          "Iterative DFS: while the top airport has flights, follow the smallest",
          "When stuck, pop the airport into the route; reverse the route at the end",
        ],
        time: "O(E log E)",
        space: "O(E)",
      },
    ],
    dryRun:
      'graph: JFK→[ATL,SFO], ATL→[JFK,SFO], SFO→[ATL]\nfollow smallest each time, recording dead-ends, reverse →\n["JFK","ATL","JFK","SFO","ATL","SFO"]',
    interviewTips: [
      "Name it: Eulerian path via Hierholzer's algorithm — that framing is the signal the interviewer wants.",
      "Sorting destinations (or using a min-heap/PQ) is what guarantees the lexically smallest itinerary.",
    ],
    commonMistakes: [
      "Plain DFS without the post-order 'append when stuck' step — fails on graphs with branches that dead-end early.",
      "Forgetting to reverse the collected route.",
    ],
    followUps: ["Detect whether any valid itinerary exists.", "Cracking the Safe (Eulerian circuit variant)."],
    related: ["course-schedule-ii", "clone-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import defaultdict

def find_itinerary(tickets):
    graph = defaultdict(list)
    # sort descending so list.pop() (from the end) yields the smallest
    for src, dst in sorted(tickets, reverse=True):
        graph[src].append(dst)
    route, stack = [], ["JFK"]
    while stack:
        while graph[stack[-1]]:
            stack.append(graph[stack[-1]].pop())
        route.append(stack.pop())
    return route[::-1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        Map<String, PriorityQueue<String>> graph = new HashMap<>();
        for (List<String> t : tickets)
            graph.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).add(t.get(1));
        LinkedList<String> route = new LinkedList<>();
        Deque<String> stack = new ArrayDeque<>();
        stack.push("JFK");
        while (!stack.isEmpty()) {
            String node = stack.peek();
            PriorityQueue<String> pq = graph.get(node);
            if (pq != null && !pq.isEmpty()) stack.push(pq.poll());
            else route.addFirst(stack.pop());
        }
        return route;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findItinerary(tickets) {
  const graph = {};
  for (const [s, d] of tickets) (graph[s] ||= []).push(d);
  for (const k in graph) graph[k].sort().reverse(); // pop() => smallest
  const route = [], stack = ["JFK"];
  while (stack.length) {
    const node = stack[stack.length - 1];
    if (graph[node] && graph[node].length) stack.push(graph[node].pop());
    else route.push(stack.pop());
  }
  return route.reverse();
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<String> findItinerary(List<List<String>> tickets) {
        Map<String, List<String>> graph = new Map<String, List<String>>();
        for (List<String> t : tickets) {
            if (!graph.containsKey(t[0])) graph.put(t[0], new List<String>());
            graph.get(t[0]).add(t[1]);
        }
        for (String k : graph.keySet()) graph.get(k).sort(); // ascending
        List<String> route = new List<String>();
        List<String> stack = new List<String>{ 'JFK' };
        while (!stack.isEmpty()) {
            String node = stack[stack.size() - 1];
            List<String> dests = graph.get(node);
            if (dests != null && !dests.isEmpty()) {
                stack.add(dests.remove(0)); // smallest first
            } else {
                route.add(stack.remove(stack.size() - 1));
            }
        }
        List<String> result = new List<String>();
        for (Integer i = route.size() - 1; i >= 0; i--) result.add(route[i]);
        return result;
    }
}`,
      },
    ],
  },
  {
    slug: "swim-in-rising-water",
    title: "Swim in Rising Water",
    difficulty: "Hard",
    patterns: ["graphs", "binary-search"],
    topics: ["Graphs", "Matrix", "Binary Search"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "On an `n x n` grid, `grid[r][c]` is the elevation at that cell. At time t, water level is t; you can swim between 4-adjacent cells if both elevations are ≤ t. Return the least time to swim from the top-left to the bottom-right.",
    beginnerExplanation:
      "You want the path from start to finish whose HIGHEST cell is as low as possible (the bottleneck). Two clean ways: Dijkstra where a path's cost is the max elevation on it, or binary-search the answer t and check reachability with t-or-lower cells.",
    realWorldAnalogy:
      "Crossing stepping stones as a flood rises — you care only about the tallest stone you must wait to submerge, not the sum. Find the route that minimises that tallest required level.",
    visualExplanation:
      "grid:\n0 2\n1 3\npaths: 0→2→3 (max 3) or 0→1→3 (max 3) → answer 3\n(grid is a permutation 0..n²−1)",
    approaches: [
      {
        title: "Dijkstra on max-elevation cost",
        tier: "Optimal",
        idea: "Min-heap by the max elevation seen so far; settle cells in increasing bottleneck order. The time the target settles is the answer.",
        steps: [
          "Heap of (maxElevationSoFar, r, c), start at (grid[0][0], 0, 0)",
          "Pop the smallest; if it's the target, return its value",
          "Push neighbours with cost = max(current, neighbour elevation)",
        ],
        time: "O(n² log n)",
        space: "O(n²)",
      },
      {
        title: "Binary search the answer + DFS/BFS",
        tier: "Optimal",
        idea: "Binary-search t in [grid[0][0], n²−1]; feasible if a flood-fill using only cells ≤ t connects start to end.",
        steps: [
          "lo = grid[0][0], hi = n²−1",
          "For mid, DFS/BFS through cells with elevation ≤ mid",
          "Shrink hi if the end is reachable, else raise lo",
        ],
        time: "O(n² log n)",
        space: "O(n²)",
      },
    ],
    dryRun:
      "n=2 grid=[[0,2],[1,3]]\nDijkstra: pop 0(0,0); push max(0,2)=2 and max(0,1)=1\npop 1(1,0); push max(1,3)=3\npop 2(0,1); push max(2,3)=3\npop 3 = target → 3",
    interviewTips: [
      "Frame the cost as the path's MAX edge, not the sum — that reframing unlocks both Dijkstra and binary-search-on-answer.",
      "Mention the grid is a permutation of 0..n²−1, so hi = n²−1 is a tight upper bound.",
    ],
    commonMistakes: [
      "Summing elevations like normal Dijkstra instead of taking the max.",
      "Binary-search bounds: lo must start at grid[0][0] (you can never beat the start cell).",
    ],
    followUps: ["Path With Minimum Effort (minimise max adjacent difference).", "Trapping Rain Water II uses a similar heap idea."],
    related: ["network-delay-time", "koko-eating-bananas"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def swim_in_water(grid):
    n = len(grid)
    visited = set()
    heap = [(grid[0][0], 0, 0)]
    while heap:
        t, r, c = heapq.heappop(heap)
        if (r, c) in visited:
            continue
        visited.add((r, c))
        if r == n - 1 and c == n - 1:
            return t
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        boolean[][] visited = new boolean[n][n];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{grid[0][0], 0, 0});
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int t = cur[0], r = cur[1], c = cur[2];
            if (visited[r][c]) continue;
            visited[r][c] = true;
            if (r == n - 1 && c == n - 1) return t;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc])
                    pq.offer(new int[]{Math.max(t, grid[nr][nc]), nr, nc});
            }
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function swimInWater(grid) {
  // Binary search the answer + DFS reachability (no heap needed).
  const n = grid.length;
  const canReach = (t) => {
    if (grid[0][0] > t) return false;
    const seen = Array.from({ length: n }, () => new Array(n).fill(false));
    const stack = [[0, 0]];
    seen[0][0] = true;
    while (stack.length) {
      const [r, c] = stack.pop();
      if (r === n - 1 && c === n - 1) return true;
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < n && nc < n && !seen[nr][nc] && grid[nr][nc] <= t) {
          seen[nr][nc] = true;
          stack.push([nr, nc]);
        }
      }
    }
    return false;
  };
  let lo = grid[0][0], hi = n * n - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (canReach(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer n;

    public static Integer swimInWater(List<List<Integer>> grid) {
        // Binary search the answer + DFS reachability (Apex has no built-in heap).
        n = grid.size();
        Integer lo = grid[0][0], hi = n * n - 1;
        while (lo < hi) {
            Integer mid = (lo + hi) / 2;
            if (canReach(grid, mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    static Boolean canReach(List<List<Integer>> grid, Integer t) {
        if (grid[0][0] > t) return false;
        Set<Integer> seen = new Set<Integer>{ 0 };
        List<Integer> stack = new List<Integer>{ 0 }; // encode r*n + c
        Integer[] dr = new Integer[]{1, -1, 0, 0};
        Integer[] dc = new Integer[]{0, 0, 1, -1};
        while (!stack.isEmpty()) {
            Integer cell = stack.remove(stack.size() - 1);
            Integer r = cell / n, c = Math.mod(cell, n);
            if (r == n - 1 && c == n - 1) return true;
            for (Integer k = 0; k < 4; k++) {
                Integer nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nc >= 0 && nr < n && nc < n) {
                    Integer code = nr * n + nc;
                    if (!seen.contains(code) && grid[nr][nc] <= t) {
                        seen.add(code);
                        stack.add(code);
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
    slug: "longest-increasing-path-in-a-matrix",
    title: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    patterns: ["dynamic-programming", "graphs"],
    topics: ["Dynamic Programming", "Graphs", "Matrix"],
    companies: ["google", "amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given an `m x n` integer matrix, return the length of the longest strictly increasing path. You may move 4-directionally (no diagonals, no wrapping).",
    beginnerExplanation:
      "From any cell, the longest increasing path is 1 plus the best among neighbours strictly greater than it. Because edges only go low→high there are no cycles, so a DFS with memoisation computes each cell's answer once.",
    realWorldAnalogy:
      "Water never flows uphill, so tracing 'always to a higher neighbour' can never loop — you can safely cache the longest downhill-from-here once and reuse it.",
    visualExplanation:
      "matrix:\n9 9 4\n6 6 8\n2 1 1\nlongest: 1→2→6→9 (length 4)",
    approaches: [
      {
        title: "DFS from every cell",
        tier: "Brute Force",
        idea: "Explore the increasing path from each cell with no caching.",
        steps: ["DFS each cell following strictly-greater neighbours", "Track the longest"],
        time: "Exponential",
        space: "O(m·n) stack",
      },
      {
        title: "DFS + memoisation",
        tier: "Optimal",
        idea: "Cache each cell's longest increasing path; the strictly-increasing constraint makes the graph a DAG, so memo is safe.",
        steps: [
          "memo[r][c] = longest increasing path starting at (r,c)",
          "dfs = 1 + max(dfs(neighbour) for neighbours strictly greater)",
          "Answer = max over all cells",
        ],
        time: "O(m × n)",
        space: "O(m × n)",
      },
    ],
    dryRun:
      "cell value 1 at (2,1): neighbours >1 are 6(up) → dfs(6)\n6's neighbour >6 is 9 → dfs(9)=1, so dfs(6)=2, dfs(1)=3, plus the other 1 path → max length 4",
    interviewTips: [
      "Point out there are no cycles (edges only go to strictly larger values) — that's why plain memoisation works without a visited set.",
      "Topological-sort / peeling by value is an alternative O(mn) approach worth mentioning.",
    ],
    commonMistakes: [
      "Adding a visited set as if cycles were possible (unnecessary and can be wrong here).",
      "Using ≥ instead of strictly > for the increasing condition.",
    ],
    followUps: ["Count the number of longest increasing paths.", "Allow diagonal moves."],
    related: ["course-schedule", "word-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_increasing_path(matrix):
    if not matrix or not matrix[0]:
        return 0
    rows, cols = len(matrix), len(matrix[0])
    memo = [[0] * cols for _ in range(rows)]

    def dfs(r, c):
        if memo[r][c]:
            return memo[r][c]
        best = 1
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))
        memo[r][c] = best
        return best

    return max(dfs(r, c) for r in range(rows) for c in range(cols))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int rows, cols;
    int[][] memo;
    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public int longestIncreasingPath(int[][] matrix) {
        if (matrix.length == 0) return 0;
        rows = matrix.length;
        cols = matrix[0].length;
        memo = new int[rows][cols];
        int best = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                best = Math.max(best, dfs(matrix, r, c));
        return best;
    }

    private int dfs(int[][] m, int r, int c) {
        if (memo[r][c] != 0) return memo[r][c];
        int best = 1;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && m[nr][nc] > m[r][c])
                best = Math.max(best, 1 + dfs(m, nr, nc));
        }
        memo[r][c] = best;
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestIncreasingPath(matrix) {
  if (!matrix.length) return 0;
  const rows = matrix.length, cols = matrix[0].length;
  const memo = Array.from({ length: rows }, () => new Array(cols).fill(0));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  function dfs(r, c) {
    if (memo[r][c]) return memo[r][c];
    let best = 1;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && matrix[nr][nc] > matrix[r][c])
        best = Math.max(best, 1 + dfs(nr, nc));
    }
    memo[r][c] = best;
    return best;
  }
  let best = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      best = Math.max(best, dfs(r, c));
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer rows, cols;
    static List<List<Integer>> memo;
    static List<List<Integer>> mat;

    public static Integer longestIncreasingPath(List<List<Integer>> matrix) {
        if (matrix.isEmpty()) return 0;
        mat = matrix;
        rows = matrix.size();
        cols = matrix[0].size();
        memo = new List<List<Integer>>();
        for (Integer r = 0; r < rows; r++) {
            List<Integer> row = new List<Integer>();
            for (Integer c = 0; c < cols; c++) row.add(0);
            memo.add(row);
        }
        Integer best = 0;
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                best = Math.max(best, dfs(r, c));
        return best;
    }

    static Integer dfs(Integer r, Integer c) {
        if (memo[r][c] != 0) return memo[r][c];
        Integer best = 1;
        Integer[] dr = new Integer[]{1, -1, 0, 0};
        Integer[] dc = new Integer[]{0, 0, 1, -1};
        for (Integer k = 0; k < 4; k++) {
            Integer nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && mat[nr][nc] > mat[r][c])
                best = Math.max(best, 1 + dfs(nr, nc));
        }
        memo[r].set(c, best);
        return best;
    }
}`,
      },
    ],
  },
];

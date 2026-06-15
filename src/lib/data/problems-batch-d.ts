import type { Problem } from "@/lib/types";

// Batch D — Heaps / Greedy / Graphs / DP / Tries / Bit manipulation.
// Merged into PROBLEMS by src/lib/data/problems.ts.

export const PROBLEMS_BATCH_D: Problem[] = [
  {
    slug: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Tries", "Design"],
    companies: ["google", "amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Implement a trie (prefix tree) supporting insert(word), search(word) (exact match), and startsWith(prefix). All inputs are lowercase a–z.",
    beginnerExplanation:
      "A trie stores words by sharing common prefixes on a tree of characters. Each node holds links to its next possible letters and a flag marking the end of a word. Insert walks/creates the path; search walks it and checks the end flag; startsWith just checks the path exists.",
    realWorldAnalogy:
      "Think of an old phone directory split by first letter, then second letter, then third… To find a name you follow the tabs letter by letter instead of scanning every page. The trie is that nested tab system.",
    visualExplanation:
      'insert "app", "apple":\nroot→a→p→p(end)→l→e(end)\nsearch("app")=true (end flag set)\nstartsWith("ap")=true; search("ap")=false',
    approaches: [
      {
        title: "Hash set of all words + prefixes",
        tier: "Brute Force",
        idea: "Store every word in a set and every prefix in another set. Wastes memory and loses the shared structure.",
        steps: ["On insert, add the word and all its prefixes", "search/startsWith become set lookups"],
        time: "O(L) per op but O(N·L) memory of prefixes",
        space: "O(N·L²)",
      },
      {
        title: "Trie of character nodes",
        tier: "Optimal",
        idea: "Each node has up to 26 children plus an end-of-word flag; walk the path character by character.",
        steps: [
          "insert: for each char, create the child if missing, descend; mark end at the last node",
          "search: walk the path; true only if it exists AND the final node is an end",
          "startsWith: walk the path; true if it exists",
        ],
        time: "O(L) per operation",
        space: "O(total characters inserted)",
      },
    ],
    dryRun:
      'insert("apple"); search("apple")→walk a-p-p-l-e, end=true → true; search("app")→node exists but end=false → false; startsWith("app")→node exists → true',
    interviewTips: [
      "Lowercase-only lets you use a fixed 26-slot array per node (fast) instead of a hash map.",
      "Separate the 'does the path exist' helper from the end-flag check — search and startsWith share it.",
    ],
    commonMistakes: [
      "Returning true from search for a prefix that was never inserted as a full word (missing end flag check).",
      "Forgetting to create missing child nodes during insert.",
    ],
    followUps: [
      "Add delete(word).",
      "Support wildcard '.' matching (→ Design Add and Search Words).",
    ],
    related: ["word-search-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def _find(self, s):
        node = self.root
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word):
        node = self._find(word)
        return node is not None and node.end

    def startsWith(self, prefix):
        return self._find(prefix) is not None`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Trie {
    private final Trie[] children = new Trie[26];
    private boolean end;

    public void insert(String word) {
        Trie node = this;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (node.children[i] == null) node.children[i] = new Trie();
            node = node.children[i];
        }
        node.end = true;
    }

    private Trie find(String s) {
        Trie node = this;
        for (char c : s.toCharArray()) {
            int i = c - 'a';
            if (node.children[i] == null) return null;
            node = node.children[i];
        }
        return node;
    }

    public boolean search(String word) {
        Trie node = find(word);
        return node != null && node.end;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class Trie {
  constructor() {
    this.children = {};
    this.end = false;
  }
  insert(word) {
    let node = this;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new Trie();
      node = node.children[ch];
    }
    node.end = true;
  }
  _find(s) {
    let node = this;
    for (const ch of s) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
  search(word) {
    const node = this._find(word);
    return node !== null && node.end;
  }
  startsWith(prefix) {
    return this._find(prefix) !== null;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Trie {
    private Map<String, Trie> children = new Map<String, Trie>();
    private Boolean isEnd = false;

    public void insert(String word) {
        Trie node = this;
        for (Integer i = 0; i < word.length(); i++) {
            String ch = word.substring(i, i + 1);
            if (!node.children.containsKey(ch)) node.children.put(ch, new Trie());
            node = node.children.get(ch);
        }
        node.isEnd = true;
    }

    private Trie findNode(String s) {
        Trie node = this;
        for (Integer i = 0; i < s.length(); i++) {
            String ch = s.substring(i, i + 1);
            if (!node.children.containsKey(ch)) return null;
            node = node.children.get(ch);
        }
        return node;
    }

    public Boolean search(String word) {
        Trie node = findNode(word);
        return node != null && node.isEnd;
    }

    public Boolean startsWith(String prefix) {
        return findNode(prefix) != null;
    }
}`,
      },
    ],
  },
  {
    slug: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Matrix"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an m×n grid of characters and a word, return true if the word can be formed from sequentially adjacent (up/down/left/right) cells, where the same cell may not be used more than once.",
    beginnerExplanation:
      "From every cell that matches the first letter, try to walk the word out across neighbours. Mark a cell as used while you're standing on it so you can't reuse it, then unmark it when you back out (backtracking) so other paths can use it.",
    realWorldAnalogy:
      "It's a word-search puzzle from a newspaper: you put your finger on a matching letter and trace in the four directions, lifting your finger and trying elsewhere whenever the trail stops matching.",
    visualExplanation:
      'board=[[A,B],[C,D]], word="ABDC"\nA(0,0)→B(0,1)→D(1,1)→C(1,0) all adjacent & unused → true',
    approaches: [
      {
        title: "DFS + backtracking",
        tier: "Optimal",
        idea: "Depth-first search from each cell; temporarily blank the current cell to prevent reuse, restore on return.",
        steps: [
          "For each cell, start a DFS matching word[0]",
          "If current char mismatches or out of bounds, fail this branch",
          "Mark the cell visited, recurse in 4 directions for the next index, then restore",
          "Success when the index reaches word length",
        ],
        time: "O(m·n·4^L)",
        space: "O(L) recursion depth",
      },
    ],
    dryRun:
      'word="AB": start at A(0,0); mark; go right to (0,1)=B, index reaches 2 == len → true. Restore A on unwind.',
    interviewTips: [
      "Mutating the board in place (then restoring) avoids a separate visited matrix — mention the space win.",
      "Prune early: if the board doesn't even contain enough of each needed letter, you can bail (good follow-up).",
    ],
    commonMistakes: [
      "Forgetting to restore the cell after recursion, corrupting other paths.",
      "Allowing diagonal moves — only 4-directional is permitted.",
    ],
    followUps: ["Search many words at once efficiently (→ Word Search II with a trie)."],
    related: ["word-search-ii", "number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def exist(board, word):
    rows, cols = len(board), len(board[0])

    def dfs(r, c, i):
        if i == len(word):
            return True
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != word[i]:
            return False
        tmp, board[r][c] = board[r][c], "#"
        found = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1)
                 or dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))
        board[r][c] = tmp
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean exist(char[][] board, String word) {
        for (int r = 0; r < board.length; r++)
            for (int c = 0; c < board[0].length; c++)
                if (dfs(board, word, r, c, 0)) return true;
        return false;
    }
    private boolean dfs(char[][] b, String w, int r, int c, int i) {
        if (i == w.length()) return true;
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != w.charAt(i))
            return false;
        char tmp = b[r][c];
        b[r][c] = '#';
        boolean found = dfs(b, w, r + 1, c, i + 1) || dfs(b, w, r - 1, c, i + 1)
                     || dfs(b, w, r, c + 1, i + 1) || dfs(b, w, r, c - 1, i + 1);
        b[r][c] = tmp;
        return found;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;
    const tmp = board[r][c];
    board[r][c] = "#";
    const found =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = tmp;
    return found;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean exist(List<List<String>> board, String word) {
        for (Integer r = 0; r < board.size(); r++)
            for (Integer c = 0; c < board[0].size(); c++)
                if (dfs(board, word, r, c, 0)) return true;
        return false;
    }
    private static Boolean dfs(List<List<String>> b, String w, Integer r, Integer c, Integer i) {
        if (i == w.length()) return true;
        if (r < 0 || c < 0 || r >= b.size() || c >= b[0].size()
            || b[r][c] != w.substring(i, i + 1)) return false;
        String tmp = b[r][c];
        b[r].set(c, '#');
        Boolean found = dfs(b, w, r + 1, c, i + 1) || dfs(b, w, r - 1, c, i + 1)
                     || dfs(b, w, r, c + 1, i + 1) || dfs(b, w, r, c - 1, i + 1);
        b[r].set(c, tmp);
        return found;
    }
}`,
      },
    ],
  },
  {
    slug: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["google", "amazon", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an m×n matrix of heights, water flows from a cell to an adjacent cell of equal or lower height. The Pacific touches the top and left edges; the Atlantic touches the bottom and right edges. Return all cells from which water can reach BOTH oceans.",
    beginnerExplanation:
      "Instead of asking 'can this cell reach the ocean?' (expensive from every cell), flip it: start at the ocean borders and flow UPHILL inward, marking everything reachable. Do that for each ocean; the answer is the cells marked by both.",
    realWorldAnalogy:
      "Imagine dye poured along each coastline creeping uphill into the land. Wherever the Pacific dye and the Atlantic dye both stain a cell, that cell can drain to both seas.",
    visualExplanation:
      "Run DFS from top+left borders → Pacific-reachable set.\nRun DFS from bottom+right borders → Atlantic-reachable set.\nAnswer = intersection.",
    approaches: [
      {
        title: "DFS/BFS from each cell to the edges",
        tier: "Brute Force",
        idea: "From every cell search downhill to see if it reaches each ocean.",
        steps: ["For each cell, BFS following non-increasing heights", "Record which oceans it reaches"],
        time: "O((m·n)²)",
        space: "O(m·n)",
      },
      {
        title: "Reverse DFS from the ocean borders",
        tier: "Optimal",
        idea: "Search inward from each ocean's border cells, moving only to equal-or-higher neighbours; intersect the two reachable sets.",
        steps: [
          "DFS from top row & left column → mark Pacific-reachable",
          "DFS from bottom row & right column → mark Atlantic-reachable",
          "Move to a neighbour only if its height ≥ current (uphill)",
          "Return cells present in both sets",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun:
      "Border cells seed each ocean's set. A cell reachable from a Pacific-border path AND an Atlantic-border path appears in both sets → included.",
    interviewTips: [
      "The key insight is reversing the flow — say it explicitly; it turns O((mn)²) into O(mn).",
      "Each ocean needs its own visited set; don't share one.",
    ],
    commonMistakes: [
      "Searching downhill from the borders instead of uphill (wrong direction after the reversal).",
      "Using one visited matrix for both oceans.",
    ],
    followUps: ["Return only the count, or the boundary between the two basins."],
    related: ["number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def pacific_atlantic(heights):
    if not heights or not heights[0]:
        return []
    rows, cols = len(heights), len(heights[0])
    pac, atl = set(), set()

    def dfs(r, c, seen, prev):
        if (r, c) in seen or r < 0 or c < 0 or r >= rows or c >= cols or heights[r][c] < prev:
            return
        seen.add((r, c))
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(r + dr, c + dc, seen, heights[r][c])

    for c in range(cols):
        dfs(0, c, pac, heights[0][c])
        dfs(rows - 1, c, atl, heights[rows - 1][c])
    for r in range(rows):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, cols - 1, atl, heights[r][cols - 1])

    return [[r, c] for r in range(rows) for c in range(cols)
            if (r, c) in pac and (r, c) in atl]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private int rows, cols;
    private int[][] h;
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        h = heights; rows = heights.length; cols = heights[0].length;
        boolean[][] pac = new boolean[rows][cols], atl = new boolean[rows][cols];
        for (int c = 0; c < cols; c++) { dfs(0, c, pac); dfs(rows - 1, c, atl); }
        for (int r = 0; r < rows; r++) { dfs(r, 0, pac); dfs(r, cols - 1, atl); }
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (pac[r][c] && atl[r][c]) res.add(Arrays.asList(r, c));
        return res;
    }
    private void dfs(int r, int c, boolean[][] seen) {
        seen[r][c] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && !seen[nr][nc] && h[nr][nc] >= h[r][c])
                dfs(nr, nc, seen);
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const make = () => Array.from({ length: rows }, () => new Array(cols).fill(false));
  const pac = make(), atl = make();
  const dfs = (r, c, seen) => {
    seen[r][c] = true;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && !seen[nr][nc] && heights[nr][nc] >= heights[r][c])
        dfs(nr, nc, seen);
    }
  };
  for (let c = 0; c < cols; c++) { dfs(0, c, pac); dfs(rows - 1, c, atl); }
  for (let r = 0; r < rows; r++) { dfs(r, 0, pac); dfs(r, cols - 1, atl); }
  const res = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private static Integer rows, cols;
    private static List<List<Integer>> h;
    public static List<List<Integer>> pacificAtlantic(List<List<Integer>> heights) {
        h = heights; rows = heights.size(); cols = heights[0].size();
        Set<String> pac = new Set<String>(), atl = new Set<String>();
        for (Integer c = 0; c < cols; c++) { dfs(0, c, pac); dfs(rows - 1, c, atl); }
        for (Integer r = 0; r < rows; r++) { dfs(r, 0, pac); dfs(r, cols - 1, atl); }
        List<List<Integer>> res = new List<List<Integer>>();
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                if (pac.contains(r + ',' + c) && atl.contains(r + ',' + c))
                    res.add(new List<Integer>{ r, c });
        return res;
    }
    private static void dfs(Integer r, Integer c, Set<String> seen) {
        seen.add(r + ',' + c);
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{1,0}, new List<Integer>{-1,0},
            new List<Integer>{0,1}, new List<Integer>{0,-1}};
        for (List<Integer> d : dirs) {
            Integer nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols
                && !seen.contains(nr + ',' + nc) && h[nr][nc] >= h[r][c])
                dfs(nr, nc, seen);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-connected-components-in-an-undirected-graph",
    title: "Number of Connected Components in an Undirected Graph",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Union Find"],
    companies: ["amazon", "google", "salesforce"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given n nodes labelled 0..n-1 and a list of undirected edges, return the number of connected components in the graph.",
    beginnerExplanation:
      "Start by assuming every node is its own island (n components). Each edge that links two nodes from DIFFERENT islands merges them, dropping the count by one. Union-Find tracks which island each node belongs to in near-constant time.",
    realWorldAnalogy:
      "Think of friend groups at a party. Everyone starts alone; each introduction that connects two strangers merges their groups. Count the groups left at the end.",
    visualExplanation:
      "n=5, edges=[[0,1],[1,2],[3,4]]\nmerge 0-1 (4 left), 1-2 (3 left), 3-4 (2 left) → 2 components: {0,1,2} and {3,4}",
    approaches: [
      {
        title: "DFS/BFS flood fill",
        tier: "Better",
        idea: "Build an adjacency list; run DFS from each unvisited node, counting how many times you start a new search.",
        steps: ["Build adjacency list", "For each unvisited node, DFS its whole component, count++"],
        time: "O(V + E)",
        space: "O(V + E)",
      },
      {
        title: "Union-Find (Disjoint Set Union)",
        tier: "Optimal",
        idea: "Start with n components; union the endpoints of each edge, decrementing the count on every successful merge.",
        steps: [
          "parent[i] = i; count = n",
          "For each edge (a,b): find roots; if different, union them and count--",
          "Use path compression on find for near-O(1) amortised cost",
        ],
        time: "O(V + E·α(V))",
        space: "O(V)",
      },
    ],
    dryRun:
      "edges=[[0,1],[1,2]]: find(0)=0,find(1)=1 → union, count 3→2; find(1)→2(root),find(2)=2 same after union 1's root to 2 → count 2→1 ... ends at correct component total.",
    interviewTips: [
      "Union-Find is the canonical answer; mention path compression (and union by rank/size) for the complexity claim.",
      "DFS is perfectly acceptable too — state the trade-off.",
    ],
    commonMistakes: [
      "Decrementing the count even when the two nodes were already in the same component.",
      "Forgetting path compression, degrading to O(n) finds.",
    ],
    followUps: ["Graph Valid Tree (components == 1 AND edges == n-1).", "Dynamic connectivity with online queries."],
    related: ["course-schedule", "number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_components(n, edges):
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # path compression
            x = parent[x]
        return x

    count = n
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            count -= 1
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int[] parent;
    public int countComponents(int n, int[][] edges) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        int count = n;
        for (int[] e : edges) {
            int ra = find(e[0]), rb = find(e[1]);
            if (ra != rb) { parent[ra] = rb; count--; }
        }
        return count;
    }
    private int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  let count = n;
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) { parent[ra] = rb; count--; }
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private static List<Integer> parent;
    public static Integer countComponents(Integer n, List<List<Integer>> edges) {
        parent = new List<Integer>();
        for (Integer i = 0; i < n; i++) parent.add(i);
        Integer count = n;
        for (List<Integer> e : edges) {
            Integer ra = find(e[0]), rb = find(e[1]);
            if (ra != rb) { parent.set(ra, rb); count--; }
        }
        return count;
    }
    private static Integer find(Integer x) {
        while (parent[x] != x) {
            parent.set(x, parent[parent[x]]);
            x = parent[x];
        }
        return x;
    }
}`,
      },
    ],
  },
  {
    slug: "course-schedule-ii",
    title: "Course Schedule II",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Topological Sort"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "There are numCourses labelled 0..numCourses-1. prerequisites[i] = [a, b] means you must take b before a. Return any valid ordering of courses to finish all of them, or an empty array if it's impossible.",
    beginnerExplanation:
      "This is a dependency-ordering problem (topological sort). Count how many prerequisites each course has (its in-degree). Repeatedly take any course with zero remaining prerequisites, append it to the order, and 'remove' it — which lowers the in-degree of the courses that depended on it. If you can't place every course, there's a cycle.",
    realWorldAnalogy:
      "Getting dressed: socks before shoes, shirt before jacket. You can only put on an item once everything it depends on is already on. A topological sort is a valid get-dressed order.",
    visualExplanation:
      "numCourses=4, prereqs=[[1,0],[2,0],[3,1],[3,2]]\nin-degree: 0:0,1:1,2:1,3:2\nstart 0 → frees 1,2 → take 1,2 → frees 3 → order [0,1,2,3]",
    approaches: [
      {
        title: "Kahn's algorithm (BFS topo sort)",
        tier: "Optimal",
        idea: "Repeatedly dequeue zero-in-degree nodes, append to the order, and decrement neighbours' in-degrees.",
        steps: [
          "Build adjacency list b→a and an in-degree array",
          "Queue all courses with in-degree 0",
          "Pop a course, add to order, decrement each neighbour; enqueue any that hit 0",
          "If the order has all courses, return it; otherwise there's a cycle → []",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
      {
        title: "DFS post-order + cycle check",
        tier: "Better",
        idea: "DFS each node; on finishing, push to a stack; reverse it. Detect cycles with a recursion-stack marker.",
        steps: ["Colour nodes white/grey/black", "A grey node revisited = cycle → []", "Reverse finish order"],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "prereqs=[[1,0]]: in-deg 0:0,1:1. queue=[0]; pop 0→order[0], dec in-deg[1]→0, enqueue 1; pop 1→order[0,1]. size==2 → [0,1].",
    interviewTips: [
      "Be explicit about edge direction: [a,b] means b → a. Getting this backwards is the #1 bug.",
      "Returning [] on a cycle is the same as Course Schedule I returning false — relate the two.",
    ],
    commonMistakes: [
      "Reversing the edge direction when building the graph.",
      "Forgetting the cycle case (order shorter than numCourses).",
    ],
    followUps: ["Detect and return the cycle itself.", "Alien Dictionary (topo sort over letters)."],
    related: ["course-schedule"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def find_order(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indeg = [0] * num_courses
    for a, b in prerequisites:      # b -> a
        graph[b].append(a)
        indeg[a] += 1
    q = deque(i for i in range(num_courses) if indeg[i] == 0)
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nxt in graph[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                q.append(nxt)
    return order if len(order) == num_courses else []`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
        int[] indeg = new int[numCourses];
        for (int[] p : prerequisites) { graph.get(p[1]).add(p[0]); indeg[p[0]]++; }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);
        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            order[idx++] = node;
            for (int nxt : graph.get(node)) if (--indeg[nxt] == 0) q.add(nxt);
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indeg = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { graph[b].push(a); indeg[a]++; }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  while (q.length) {
    const node = q.shift();
    order.push(node);
    for (const nxt of graph[node]) if (--indeg[nxt] === 0) q.push(nxt);
  }
  return order.length === numCourses ? order : [];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> findOrder(Integer numCourses, List<List<Integer>> prerequisites) {
        List<List<Integer>> graph = new List<List<Integer>>();
        List<Integer> indeg = new List<Integer>();
        for (Integer i = 0; i < numCourses; i++) { graph.add(new List<Integer>()); indeg.add(0); }
        for (List<Integer> p : prerequisites) {
            graph[p[1]].add(p[0]);
            indeg.set(p[0], indeg[p[0]] + 1);
        }
        List<Integer> q = new List<Integer>();
        for (Integer i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);
        List<Integer> order = new List<Integer>();
        Integer head = 0;
        while (head < q.size()) {
            Integer node = q[head++];
            order.add(node);
            for (Integer nxt : graph[node]) {
                indeg.set(nxt, indeg[nxt] - 1);
                if (indeg[nxt] == 0) q.add(nxt);
            }
        }
        return order.size() == numCourses ? order : new List<Integer>();
    }
}`,
      },
    ],
  },
  {
    slug: "min-cost-to-connect-all-points",
    title: "Min Cost to Connect All Points",
    difficulty: "Medium",
    patterns: ["graphs", "greedy"],
    topics: ["Graphs", "Minimum Spanning Tree"],
    companies: ["amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given points on a 2D plane, the cost to connect two points is their Manhattan distance. Return the minimum total cost to connect all points so every pair is reachable.",
    beginnerExplanation:
      "This is a Minimum Spanning Tree: connect all points with the cheapest set of edges and no redundant loops. Prim's algorithm grows the tree one point at a time, always adding the cheapest edge that reaches a point not yet connected.",
    realWorldAnalogy:
      "You're laying the least possible cable to connect a set of houses so electricity reaches all of them. You never build a loop — every new stretch of cable must hook up a house that isn't yet powered.",
    visualExplanation:
      "Start in the tree = {0}. Repeatedly pick the not-yet-connected point with the smallest distance to the tree, add it, and refresh the others' distances. Sum the chosen distances.",
    approaches: [
      {
        title: "Prim's MST with a min-distance array",
        tier: "Optimal",
        idea: "Track each outside point's cheapest distance to the growing tree; repeatedly absorb the nearest one and relax the rest.",
        steps: [
          "minDist[0]=0, others=∞; inMST all false",
          "Repeat n times: pick the non-tree point u with smallest minDist, add its cost",
          "Mark u in the tree; for every outside v, minDist[v] = min(minDist[v], dist(u,v))",
          "Return the summed costs",
        ],
        time: "O(n²)",
        space: "O(n)",
      },
    ],
    dryRun:
      "points=[[0,0],[2,2],[3,10]]: add 0 (cost0). dist to 1=4,to 2=13. add 1 (cost4). refresh dist to 2=min(13,|2-3|+|2-10|=9)=9. add 2 (cost9). total=13.",
    interviewTips: [
      "Manhattan distance means no need to build all edges explicitly — compute on the fly in the O(n²) Prim.",
      "Kruskal + Union-Find is the alternative; Prim's array form is simplest for a dense complete graph.",
    ],
    commonMistakes: [
      "Using Euclidean instead of Manhattan distance.",
      "Re-adding a point already in the tree (forgetting the inMST check).",
    ],
    followUps: ["Solve with Kruskal + Union-Find.", "What if edges were sparse rather than a complete graph?"],
    related: ["number-of-connected-components-in-an-undirected-graph"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_cost_connect_points(points):
    n = len(points)
    min_dist = [float("inf")] * n
    in_mst = [False] * n
    min_dist[0] = 0
    total = 0
    for _ in range(n):
        u = -1
        for v in range(n):
            if not in_mst[v] and (u == -1 or min_dist[v] < min_dist[u]):
                u = v
        in_mst[u] = True
        total += min_dist[u]
        for v in range(n):
            if not in_mst[v]:
                d = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                if d < min_dist[v]:
                    min_dist[v] = d
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length, total = 0;
        int[] minDist = new int[n];
        boolean[] inMST = new boolean[n];
        Arrays.fill(minDist, Integer.MAX_VALUE);
        minDist[0] = 0;
        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int v = 0; v < n; v++)
                if (!inMST[v] && (u == -1 || minDist[v] < minDist[u])) u = v;
            inMST[u] = true;
            total += minDist[u];
            for (int v = 0; v < n; v++) {
                if (!inMST[v]) {
                    int d = Math.abs(points[u][0] - points[v][0])
                          + Math.abs(points[u][1] - points[v][1]);
                    if (d < minDist[v]) minDist[v] = d;
                }
            }
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minCostConnectPoints(points) {
  const n = points.length;
  const minDist = new Array(n).fill(Infinity);
  const inMST = new Array(n).fill(false);
  minDist[0] = 0;
  let total = 0;
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++)
      if (!inMST[v] && (u === -1 || minDist[v] < minDist[u])) u = v;
    inMST[u] = true;
    total += minDist[u];
    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
        if (d < minDist[v]) minDist[v] = d;
      }
    }
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minCostConnectPoints(List<List<Integer>> points) {
        Integer n = points.size(), total = 0;
        List<Integer> minDist = new List<Integer>();
        List<Boolean> inMST = new List<Boolean>();
        for (Integer i = 0; i < n; i++) { minDist.add(2147483647); inMST.add(false); }
        minDist.set(0, 0);
        for (Integer i = 0; i < n; i++) {
            Integer u = -1;
            for (Integer v = 0; v < n; v++)
                if (!inMST[v] && (u == -1 || minDist[v] < minDist[u])) u = v;
            inMST.set(u, true);
            total += minDist[u];
            for (Integer v = 0; v < n; v++) {
                if (!inMST[v]) {
                    Integer d = Math.abs(points[u][0] - points[v][0])
                              + Math.abs(points[u][1] - points[v][1]);
                    if (d < minDist[v]) minDist.set(v, d);
                }
            }
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Shortest Path"],
    companies: ["amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "A network has n nodes labelled 1..n. times[i] = [u, v, w] is a directed edge from u to v taking w time. Starting a signal at node k, return the time for ALL nodes to receive it, or -1 if some node is unreachable.",
    beginnerExplanation:
      "You want the shortest time from the source to every node; the answer is the LARGEST of those shortest times (the last node to hear the signal). That's a single-source shortest-path problem on a weighted graph — Dijkstra's algorithm.",
    realWorldAnalogy:
      "A rumour starts with one person and spreads along friendships, each hop taking some minutes. The rumour is 'fully spread' only when the very last person hears it — so you care about the slowest of all the fastest paths.",
    visualExplanation:
      "Dijkstra finalises nodes in increasing distance. The largest finalised distance is the answer; if any node stays at ∞, return -1.",
    approaches: [
      {
        title: "Bellman-Ford (relax all edges n-1 times)",
        tier: "Better",
        idea: "Repeatedly relax every edge; simple, handles the problem but slower.",
        steps: ["dist[k]=0", "Repeat n-1 times: for each edge relax dist", "Answer = max dist or -1"],
        time: "O(V·E)",
        space: "O(V)",
      },
      {
        title: "Dijkstra's algorithm",
        tier: "Optimal",
        idea: "Greedily finalise the closest unfinalised node and relax its outgoing edges. All weights are non-negative, so Dijkstra applies.",
        steps: [
          "dist[k]=0, all others ∞",
          "Repeatedly pick the unvisited node u with smallest dist, mark done",
          "Relax each edge u→v: dist[v] = min(dist[v], dist[u] + w)",
          "Answer = max over all dist, or -1 if any is ∞",
        ],
        time: "O(V² ) array form (O(E log V) with a heap)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "n=2,k=1,times=[[1,2,5]]: dist[1]=0,dist[2]=∞. finalise 1, relax →dist[2]=5. finalise 2. max=5.",
    interviewTips: [
      "Say 'non-negative weights → Dijkstra' explicitly; if negatives were allowed you'd switch to Bellman-Ford.",
      "The answer is the MAX of shortest paths, a classic twist people miss.",
    ],
    commonMistakes: [
      "Returning the sum or the source's distance instead of the maximum shortest path.",
      "1-indexed nodes — off-by-one in the arrays.",
    ],
    followUps: ["Cheapest Flights Within K Stops (Dijkstra/BFS with a hop limit).", "Handle negative edges (Bellman-Ford)."],
    related: ["course-schedule-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def network_delay_time(times, n, k):
    INF = float("inf")
    graph = [[] for _ in range(n + 1)]
    for u, v, w in times:
        graph[u].append((v, w))
    dist = [INF] * (n + 1)
    done = [False] * (n + 1)
    dist[k] = 0
    for _ in range(n):
        u = -1
        for v in range(1, n + 1):
            if not done[v] and dist[v] < INF and (u == -1 or dist[v] < dist[u]):
                u = v
        if u == -1:
            break
        done[u] = True
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    ans = 0
    for v in range(1, n + 1):
        if dist[v] == INF:
            return -1
        ans = max(ans, dist[v])
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
        for (int[] t : times) graph.get(t[0]).add(new int[]{t[1], t[2]});
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        boolean[] done = new boolean[n + 1];
        dist[k] = 0;
        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int v = 1; v <= n; v++)
                if (!done[v] && dist[v] != Integer.MAX_VALUE && (u == -1 || dist[v] < dist[u])) u = v;
            if (u == -1) break;
            done[u] = true;
            for (int[] e : graph.get(u))
                if (dist[u] + e[1] < dist[e[0]]) dist[e[0]] = dist[u] + e[1];
        }
        int ans = 0;
        for (int v = 1; v <= n; v++) {
            if (dist[v] == Integer.MAX_VALUE) return -1;
            ans = Math.max(ans, dist[v]);
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function networkDelayTime(times, n, k) {
  const INF = Infinity;
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) graph[u].push([v, w]);
  const dist = new Array(n + 1).fill(INF);
  const done = new Array(n + 1).fill(false);
  dist[k] = 0;
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 1; v <= n; v++)
      if (!done[v] && dist[v] < INF && (u === -1 || dist[v] < dist[u])) u = v;
    if (u === -1) break;
    done[u] = true;
    for (const [v, w] of graph[u])
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  }
  let ans = 0;
  for (let v = 1; v <= n; v++) {
    if (dist[v] === INF) return -1;
    ans = Math.max(ans, dist[v]);
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer networkDelayTime(List<List<Integer>> times, Integer n, Integer k) {
        Integer INF = 2147483647;
        List<List<List<Integer>>> graph = new List<List<List<Integer>>>();
        for (Integer i = 0; i <= n; i++) graph.add(new List<List<Integer>>());
        for (List<Integer> t : times) graph[t[0]].add(new List<Integer>{ t[1], t[2] });
        List<Integer> dist = new List<Integer>();
        List<Boolean> done = new List<Boolean>();
        for (Integer i = 0; i <= n; i++) { dist.add(INF); done.add(false); }
        dist.set(k, 0);
        for (Integer i = 0; i < n; i++) {
            Integer u = -1;
            for (Integer v = 1; v <= n; v++)
                if (!done[v] && dist[v] != INF && (u == -1 || dist[v] < dist[u])) u = v;
            if (u == -1) break;
            done.set(u, true);
            for (List<Integer> e : graph[u])
                if (dist[u] + e[1] < dist[e[0]]) dist.set(e[0], dist[u] + e[1]);
        }
        Integer ans = 0;
        for (Integer v = 1; v <= n; v++) {
            if (dist[v] == INF) return -1;
            ans = Math.max(ans, dist[v]);
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given two strings text1 and text2, return the length of their longest common subsequence (characters appearing left-to-right in both, not necessarily contiguous). Return 0 if there is none.",
    beginnerExplanation:
      "Compare the two strings character by character in a grid. If the current characters match, the answer extends the diagonal by 1. If not, you take the best of dropping one character from either string. Filling the grid bottom-up gives the answer in the corner.",
    realWorldAnalogy:
      "It's how 'diff' tools and DNA-similarity tools work: line up two sequences and find the longest shared thread running through both in order, even with gaps.",
    visualExplanation:
      'text1="abcde", text2="ace"\ndp grid fills so dp[5][3]=3 ("ace").\nMatch → diagonal+1; mismatch → max(up, left).',
    approaches: [
      {
        title: "Recursion (exponential)",
        tier: "Brute Force",
        idea: "Recurse on (i,j): match → 1 + solve(i-1,j-1); else max of the two drops. Recomputes subproblems.",
        steps: ["Branch on match/mismatch", "No memo → exponential"],
        time: "O(2^(m+n))",
        space: "O(m+n)",
      },
      {
        title: "2-D bottom-up DP",
        tier: "Optimal",
        idea: "dp[i][j] = LCS of the first i and first j characters; fill row by row.",
        steps: [
          "dp[i][j] = dp[i-1][j-1] + 1 if chars match",
          "else dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
          "Answer = dp[m][n]",
        ],
        time: "O(m·n)",
        space: "O(m·n) (reducible to O(n))",
      },
    ],
    dryRun:
      'text1="ace", text2="abcde": matches a,c,e build up the diagonal → dp[3][5]=3.',
    interviewTips: [
      "This is THE template for string-DP — Edit Distance, shortest common supersequence, and diffing all derive from it.",
      "Mention the O(n) space optimisation (keep two rows).",
    ],
    commonMistakes: [
      "Confusing subsequence (gaps allowed) with substring (contiguous).",
      "Off-by-one between the 1-indexed dp table and 0-indexed strings.",
    ],
    followUps: ["Reconstruct the actual subsequence.", "Longest common substring (contiguous — different recurrence)."],
    related: ["edit-distance", "longest-increasing-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = text1.charAt(i - 1) == text2.charAt(j - 1)
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
        return dp[m][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = text1[i - 1] === text2[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestCommonSubsequence(String text1, String text2) {
        Integer m = text1.length(), n = text2.length();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= m; i++)
            for (Integer j = 1; j <= n; j++)
                if (text1.substring(i - 1, i) == text2.substring(j - 1, j))
                    dp[i].set(j, dp[i - 1][j - 1] + 1);
                else
                    dp[i].set(j, Math.max(dp[i - 1][j], dp[i][j - 1]));
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    slug: "edit-distance",
    title: "Edit Distance",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["google", "amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given two strings word1 and word2, return the minimum number of operations to convert word1 into word2. Allowed operations: insert a character, delete a character, or replace a character.",
    beginnerExplanation:
      "Build a grid where dp[i][j] is the cheapest way to turn the first i letters of word1 into the first j letters of word2. If the current letters match, you carry the diagonal cost for free. If not, you pay 1 plus the cheapest of insert (left), delete (up), or replace (diagonal).",
    realWorldAnalogy:
      "It's exactly how spell-checkers rank suggestions: how few keystrokes (insert/delete/replace) turn your typo into a real word. Fewer edits = a closer match.",
    visualExplanation:
      'word1="horse", word2="ros" → 3 (replace h→r, delete r, delete e). dp[5][3]=3.',
    approaches: [
      {
        title: "Recursion on the two ends",
        tier: "Brute Force",
        idea: "Match → recurse on the rest; else 1 + min(insert, delete, replace). Recomputes overlapping subproblems.",
        steps: ["Branch on match/mismatch into three sub-cases", "Exponential without memo"],
        time: "O(3^(m+n))",
        space: "O(m+n)",
      },
      {
        title: "2-D bottom-up DP",
        tier: "Optimal",
        idea: "Base rows/cols are 'turn a prefix into empty' = its length; fill the grid with the recurrence.",
        steps: [
          "dp[i][0]=i, dp[0][j]=j",
          "match: dp[i][j]=dp[i-1][j-1]",
          "else: dp[i][j]=1+min(replace dp[i-1][j-1], delete dp[i-1][j], insert dp[i][j-1])",
          "Answer = dp[m][n]",
        ],
        time: "O(m·n)",
        space: "O(m·n) (reducible to O(n))",
      },
    ],
    dryRun:
      'word1="ab", word2="a": dp[0][*]=0,1; dp[*][0]=0,1,2. match a → dp[1][1]=0; "b" vs nothing → dp[2][1]=dp[1][1]+1=1.',
    interviewTips: [
      "Name the three transitions precisely (insert/delete/replace) and which neighbour each maps to — interviewers probe this.",
      "It's a direct generalisation of LCS; relate them.",
    ],
    commonMistakes: [
      "Wrong base cases (the empty-prefix row/column must be 0..n).",
      "Mapping insert/delete to the wrong neighbour cell.",
    ],
    followUps: ["Recover the actual edit sequence.", "Weighted edits (different costs per operation)."],
    related: ["longest-common-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = word1.charAt(i - 1) == word2.charAt(j - 1)
                    ? dp[i - 1][j - 1]
                    : 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
        return dp[m][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = word1[i - 1] === word2[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minDistance(String word1, String word2) {
        Integer m = word1.length(), n = word2.length();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 0; i <= m; i++) dp[i].set(0, i);
        for (Integer j = 0; j <= n; j++) dp[0].set(j, j);
        for (Integer i = 1; i <= m; i++)
            for (Integer j = 1; j <= n; j++)
                if (word1.substring(i - 1, i) == word2.substring(j - 1, j))
                    dp[i].set(j, dp[i - 1][j - 1]);
                else
                    dp[i].set(j, 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])));
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    slug: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an array of positive integers nums, return true if it can be split into two subsets with equal sum.",
    beginnerExplanation:
      "If the total sum is odd you can't split it evenly — done. Otherwise the question becomes: can some subset add up to exactly half the total? That's the classic 0/1 knapsack subset-sum: track which sums are achievable as you consider each number.",
    realWorldAnalogy:
      "Splitting a restaurant bill evenly between two people using whole items only — can you hand each person items that total the same amount?",
    visualExplanation:
      "nums=[1,5,11,5], total=22, target=11.\nReachable sums grow: {0}→{0,1}→{0,1,5,6}→…→ includes 11 → true ({11} vs {1,5,5}).",
    approaches: [
      {
        title: "Recurse on include/exclude",
        tier: "Brute Force",
        idea: "For each number, try taking it or not toward the target. Exponential without memo.",
        steps: ["solve(i, remaining)", "take nums[i] or skip", "2^n branches"],
        time: "O(2^n)",
        space: "O(n)",
      },
      {
        title: "1-D subset-sum DP",
        tier: "Optimal",
        idea: "Boolean dp[s] = 'sum s is achievable'. For each number, update sums from high to low so each item is used once.",
        steps: [
          "If total is odd → false; target = total/2",
          "dp[0]=true",
          "For each num, for s from target down to num: dp[s] |= dp[s-num]",
          "Return dp[target]",
        ],
        time: "O(n·target)",
        space: "O(target)",
      },
    ],
    dryRun:
      "nums=[1,5,5], total=11 odd → false immediately. nums=[1,5,11,5] target 11 → dp[11] becomes true → true.",
    interviewTips: [
      "Iterate the inner sum loop DOWNWARD — going upward would reuse a number multiple times (that's unbounded knapsack).",
      "The odd-total early exit is a freebie that interviewers like to see.",
    ],
    commonMistakes: [
      "Looping the sum upward and accidentally allowing item reuse.",
      "Forgetting the odd-sum short-circuit.",
    ],
    followUps: ["Return the actual subsets.", "Minimum subset-sum difference (closest split)."],
    related: ["coin-change"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]
    return dp[target]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums)
            for (int s = target; s >= num; s--)
                dp[s] = dp[s] || dp[s - num];
        return dp[target];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums)
    for (let s = target; s >= num; s--)
      dp[s] = dp[s] || dp[s - num];
  return dp[target];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean canPartition(List<Integer> nums) {
        Integer total = 0;
        for (Integer x : nums) total += x;
        if (Math.mod(total, 2) != 0) return false;
        Integer target = total / 2;
        List<Boolean> dp = new List<Boolean>();
        for (Integer i = 0; i <= target; i++) dp.add(false);
        dp.set(0, true);
        for (Integer num : nums)
            for (Integer s = target; s >= num; s--)
                dp.set(s, dp[s] || dp[s - num]);
        return dp[target];
    }
}`,
      },
    ],
  },
  {
    slug: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["meta", "amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "A message of digits is encoded with A=1 … Z=26. Given a digit string s, return the number of ways to decode it. Leading zeros are invalid (e.g. '06' is not a valid '6').",
    beginnerExplanation:
      "At each position you can decode a single digit (if it's 1–9) or a pair of digits (if it forms 10–26). The number of ways to decode up to position i is the ways ending with a valid single digit plus the ways ending with a valid two-digit number — a Fibonacci-shaped recurrence with validity guards.",
    realWorldAnalogy:
      "Reading a run-together number like a phone keypad code: '12' could be 'AB' or 'L'. You count every legal way to chop the string into 1–26 pieces.",
    visualExplanation:
      '"226": "2|2|6"(BBF), "22|6"(VF), "2|26"(BZ) → 3 ways. dp builds 1,1,2,3.',
    approaches: [
      {
        title: "Recursion over split points",
        tier: "Brute Force",
        idea: "At each index, branch on taking one digit or two valid digits. Exponential without memo.",
        steps: ["decode(i): if s[i]!='0' add decode(i+1)", "if s[i:i+2] in 10..26 add decode(i+2)"],
        time: "O(2^n)",
        space: "O(n)",
      },
      {
        title: "1-D DP (Fibonacci-style with guards)",
        tier: "Optimal",
        idea: "dp[i] = ways to decode the first i characters; add dp[i-1] when the single digit is valid and dp[i-2] when the pair is 10–26.",
        steps: [
          "Return 0 if empty or starts with '0'",
          "dp[0]=dp[1]=1",
          "For i in 2..n: if s[i-1]≠'0' dp[i]+=dp[i-1]; if 10≤int(s[i-2:i])≤26 dp[i]+=dp[i-2]",
          "Return dp[n]",
        ],
        time: "O(n)",
        space: "O(n) (reducible to O(1))",
      },
    ],
    dryRun:
      '"226": dp[0]=1,dp[1]=1. i=2: s[1]=2→+dp[1]=1; "22"=22∈[10,26]→+dp[0]=1 → dp[2]=2. i=3: s[2]=6→+dp[2]=2; "26"=26→+dp[1]=1 → dp[3]=3.',
    interviewTips: [
      "The '0' cases are the whole difficulty: a lone 0 is invalid, and only 10 & 20 are valid pairs containing 0.",
      "Mention the O(1)-space rolling-variable version.",
    ],
    commonMistakes: [
      "Treating '0' as decodable on its own.",
      "Allowing pairs like '06' or '27'+ as valid.",
    ],
    followUps: ["Decode Ways II with '*' wildcards.", "Return the decodings themselves for small inputs."],
    related: ["climbing-stairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def num_decodings(s):
    if not s or s[0] == "0":
        return 0
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        if s[i - 1] != "0":
            dp[i] += dp[i - 1]
        two = int(s[i - 2:i])
        if 10 <= two <= 26:
            dp[i] += dp[i - 2]
    return dp[n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numDecodings(String s) {
        if (s == null || s.isEmpty() || s.charAt(0) == '0') return 0;
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1; dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            if (s.charAt(i - 1) != '0') dp[i] += dp[i - 1];
            int two = Integer.parseInt(s.substring(i - 2, i));
            if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
        }
        return dp[n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numDecodings(s) {
  if (!s || s[0] === "0") return 0;
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    if (s[i - 1] !== "0") dp[i] += dp[i - 1];
    const two = parseInt(s.slice(i - 2, i), 10);
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }
  return dp[n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer numDecodings(String s) {
        if (s == null || s.length() == 0 || s.substring(0, 1) == '0') return 0;
        Integer n = s.length();
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= n; i++) dp.add(0);
        dp.set(0, 1);
        dp.set(1, 1);
        for (Integer i = 2; i <= n; i++) {
            if (s.substring(i - 1, i) != '0') dp.set(i, dp[i] + dp[i - 1]);
            Integer two = Integer.valueOf(s.substring(i - 2, i));
            if (two >= 10 && two <= 26) dp.set(i, dp[i] + dp[i - 2]);
        }
        return dp[n];
    }
}`,
      },
    ],
  },
  {
    slug: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    patterns: ["bit-manipulation", "dynamic-programming"],
    topics: ["Bit Manipulation", "Dynamic Programming"],
    companies: ["amazon", "apple"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an integer n, return an array ans of length n+1 where ans[i] is the number of 1-bits in the binary representation of i.",
    beginnerExplanation:
      "You could popcount each number independently, but there's a neat recurrence: i has the same one-bits as i/2 (i >> 1) plus one extra if i is odd (its lowest bit is 1). So each answer is built in O(1) from a smaller one.",
    realWorldAnalogy:
      "Dropping the last binary digit (right shift) is like erasing the ones column. The count is whatever the rest already had, plus 1 if that erased digit was a 1.",
    visualExplanation:
      "i:0 1 2 3 4 5\nbits:0 1 1 2 1 2\ndp[5]=dp[2]+ (5&1)=1+1=2.",
    approaches: [
      {
        title: "Popcount each number",
        tier: "Brute Force",
        idea: "For each i, count bits by repeatedly clearing the lowest set bit.",
        steps: ["For each i, while i: i &= i-1, count++"],
        time: "O(n log n)",
        space: "O(1) extra",
      },
      {
        title: "DP on i >> 1",
        tier: "Optimal",
        idea: "dp[i] = dp[i >> 1] + (i & 1).",
        steps: ["dp[0]=0", "dp[i] = dp[i>>1] + (i&1) for i=1..n"],
        time: "O(n)",
        space: "O(n) for the output",
      },
    ],
    dryRun: "dp[1]=dp[0]+1=1; dp[2]=dp[1]+0=1; dp[3]=dp[1]+1=2; dp[4]=dp[2]+0=1.",
    interviewTips: [
      "Mention multiple recurrences: dp[i>>1]+(i&1) or dp[i & (i-1)]+1 — both are O(n).",
      "Clarify whether O(n) time / O(n) space is required vs the trivial O(n log n).",
    ],
    commonMistakes: ["Using i/2 with truncation issues in languages without integer division (fine here).", "Off-by-one in the output length (n+1)."],
    followUps: ["Number of 1 Bits (single integer).", "Bitwise AND of a number range."],
    related: ["number-of-1-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_bits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> countBits(Integer n) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= n; i++) dp.add(0);
        for (Integer i = 1; i <= n; i++) {
            dp.set(i, dp[i / 2] + Math.mod(i, 2));
        }
        return dp;
    }
}`,
      },
    ],
  },
  {
    slug: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 2,
    statement:
      "Compute the sum of two integers a and b WITHOUT using the operators + or -.",
    beginnerExplanation:
      "Addition in binary splits into two parts: the sum WITHOUT carrying (that's XOR), and the carry itself (that's AND shifted left by one). Keep folding the carry back in until there's no carry left.",
    realWorldAnalogy:
      "It's grade-school column addition: XOR is 'write the digit', AND-shift is 'carry the one'. You repeat carrying until nothing is left to carry.",
    visualExplanation:
      "a=2(10), b=3(11): xor=01, carry=(10)<<? (10&11=10)<<1=100. next a=001,b=100 → xor=101=5, carry 0 → 5.",
    approaches: [
      {
        title: "XOR sum + AND carry loop",
        tier: "Optimal",
        idea: "sum = a ^ b (addition ignoring carry); carry = (a & b) << 1; repeat until carry is 0.",
        steps: [
          "While b != 0: carry = (a & b) << 1",
          "a = a ^ b (partial sum)",
          "b = carry",
          "Return a",
        ],
        time: "O(1) (≤32 iterations)",
        space: "O(1)",
      },
    ],
    dryRun:
      "a=1,b=1: carry=(1&1)<<1=2; a=1^1=0; b=2. next carry=(0&2)<<1=0; a=0^2=2; b=0 → 2.",
    interviewTips: [
      "In Python you must mask to 32 bits (0xFFFFFFFF) and re-interpret the sign — languages with fixed 32-bit ints (Java/JS/Apex) don't need that.",
      "Subtraction follows the same idea with a borrow instead of a carry.",
    ],
    commonMistakes: [
      "In Python, infinite loop from not masking to 32 bits.",
      "Forgetting the left shift on the carry.",
    ],
    followUps: ["Subtract without - .", "Multiply using shifts and adds."],
    related: ["counting-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def get_sum(a, b):
    mask = 0xFFFFFFFF
    while b != 0:
        carry = ((a & b) << 1) & mask
        a = (a ^ b) & mask
        b = carry
    # convert back to signed 32-bit
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1; // 32-bit bitwise in JS
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer getSum(Integer a, Integer b) {
        while (b != 0) {
            Integer carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["apple", "amazon"],
    sheets: ["striver", "neetcode150"],
    frequency: 2,
    statement:
      "Reverse the bits of a given 32-bit unsigned integer and return the result.",
    beginnerExplanation:
      "Walk all 32 bits. Each step, shift your result left to make room, then drop in the current lowest bit of n, and shift n right. After 32 steps the bit order is fully mirrored.",
    realWorldAnalogy:
      "Like reading a 32-character string into a stack and popping it out — the last bit in becomes the first bit out, mirroring the whole sequence.",
    visualExplanation:
      "n=...0011 (4-bit demo): build result bit by bit → 1100. Over 32 bits the whole word mirrors end-to-end.",
    approaches: [
      {
        title: "Bit-by-bit build",
        tier: "Optimal",
        idea: "For 32 iterations: result = (result << 1) | (n & 1); then n >>>= 1.",
        steps: [
          "result = 0",
          "Repeat 32 times: shift result left, OR in n's lowest bit, shift n right (unsigned)",
          "Return result",
        ],
        time: "O(1) (32 steps)",
        space: "O(1)",
      },
    ],
    dryRun:
      "Take lowest bit of n into result each round while shifting; after 32 rounds bit i of n sits at position 31-i.",
    interviewTips: [
      "Use the UNSIGNED right shift (>>> in Java/JS) so the sign bit doesn't smear in.",
      "A divide-and-conquer mask swap (swap halves, then quarters…) does it in O(log 32) — nice follow-up.",
    ],
    commonMistakes: [
      "Signed right shift introducing 1s from the sign bit.",
      "In JS, forgetting the final `>>> 0` to return an unsigned value.",
    ],
    followUps: ["Reverse with mask-swapping in 5 steps.", "Reverse bits within a byte only."],
    related: ["number-of-1-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1;
        }
        return result;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0; // return as unsigned 32-bit
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer reverseBits(Integer n) {
        Integer result = 0;
        for (Integer i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n = n >>> 1; // unsigned right shift
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    slug: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    patterns: ["backtracking", "trees"],
    topics: ["Backtracking", "Tries", "Matrix"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an m×n board of characters and a list of words, return all words that can be formed from sequentially adjacent (4-directional) cells, where a cell is used at most once per word.",
    beginnerExplanation:
      "Searching each word separately (Word Search once per word) is too slow. Instead, put ALL the words into a trie, then do ONE DFS over the board that walks the trie in lockstep — so every word is hunted simultaneously and dead prefixes are pruned instantly.",
    realWorldAnalogy:
      "Instead of doing the newspaper word-search puzzle once per target word, you overlay all the target words on a single shared map of letter-paths (the trie) and sweep the grid once.",
    visualExplanation:
      "Trie of words → DFS each board cell following trie edges. When a trie node marks end-of-word, record it (then null it out to avoid duplicates).",
    approaches: [
      {
        title: "Run Word Search once per word",
        tier: "Brute Force",
        idea: "For each word, do the single-word board DFS. Re-walks the board repeatedly.",
        steps: ["For each word: DFS the whole board"],
        time: "O(W · m·n·4^L)",
        space: "O(L)",
      },
      {
        title: "Trie + single board DFS",
        tier: "Optimal",
        idea: "Build a trie of all words; DFS the board advancing through the trie, collecting words at end-nodes and pruning when no trie edge matches.",
        steps: [
          "Insert all words into a trie; store the full word at terminal nodes",
          "DFS from each cell, descending the trie by the current letter",
          "On reaching a terminal node, add the word and clear it (dedupe)",
          "Mark cells visited during the path; restore on backtrack",
        ],
        time: "O(m·n·4^L) shared across all words",
        space: "O(total word length) for the trie",
      },
    ],
    dryRun:
      'words=["oath","eat"]: trie has both. DFS finds o-a-t-h path → record "oath"; e-a-t path → record "eat". Non-matching prefixes are pruned immediately.',
    interviewTips: [
      "The trie is the whole point — it turns per-word work into shared work and prunes dead branches early.",
      "Null out a word at its terminal node once found to avoid duplicate results without a set.",
    ],
    commonMistakes: [
      "Not pruning — falling back to per-word search and timing out.",
      "Forgetting to restore the board cell after the DFS (corrupting other paths).",
    ],
    followUps: ["Remove exhausted trie branches to speed up large boards.", "Return positions/paths, not just the words."],
    related: ["word-search", "implement-trie-prefix-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_words(board, words):
    trie = {}
    for w in words:
        node = trie
        for ch in w:
            node = node.setdefault(ch, {})
        node["#"] = w  # full word at terminal

    rows, cols = len(board), len(board[0])
    res = []

    def dfs(r, c, node):
        ch = board[r][c]
        if ch not in node:
            return
        nxt = node[ch]
        word = nxt.pop("#", None)
        if word:
            res.append(word)
        board[r][c] = "*"
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "*":
                dfs(nr, nc, nxt)
        board[r][c] = ch

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word;
    }
    private final List<String> res = new ArrayList<>();
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode node = root;
            for (char c : w.toCharArray()) {
                int i = c - 'a';
                if (node.children[i] == null) node.children[i] = new TrieNode();
                node = node.children[i];
            }
            node.word = w;
        }
        for (int r = 0; r < board.length; r++)
            for (int c = 0; c < board[0].length; c++)
                dfs(board, r, c, root);
        return res;
    }
    private void dfs(char[][] b, int r, int c, TrieNode node) {
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] == '*') return;
        char ch = b[r][c];
        TrieNode nxt = node.children[ch - 'a'];
        if (nxt == null) return;
        if (nxt.word != null) { res.add(nxt.word); nxt.word = null; }
        b[r][c] = '*';
        dfs(b, r + 1, c, nxt); dfs(b, r - 1, c, nxt);
        dfs(b, r, c + 1, nxt); dfs(b, r, c - 1, nxt);
        b[r][c] = ch;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findWords(board, words) {
  const root = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) node = node[ch] || (node[ch] = {});
    node.word = w;
  }
  const rows = board.length, cols = board[0].length;
  const res = [];
  const dfs = (r, c, node) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] === "*") return;
    const ch = board[r][c];
    const nxt = node[ch];
    if (!nxt) return;
    if (nxt.word) { res.push(nxt.word); nxt.word = null; }
    board[r][c] = "*";
    dfs(r + 1, c, nxt); dfs(r - 1, c, nxt);
    dfs(r, c + 1, nxt); dfs(r, c - 1, nxt);
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dfs(r, c, root);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    class TrieNode {
        Map<String, TrieNode> children = new Map<String, TrieNode>();
        String word;
    }
    private List<String> res;
    private Integer rows, cols;
    private List<List<String>> grid;

    public List<String> findWords(List<List<String>> board, List<String> words) {
        grid = board;
        res = new List<String>();
        rows = board.size();
        cols = board[0].size();
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode node = root;
            for (Integer i = 0; i < w.length(); i++) {
                String ch = w.substring(i, i + 1);
                if (!node.children.containsKey(ch)) node.children.put(ch, new TrieNode());
                node = node.children.get(ch);
            }
            node.word = w;
        }
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++)
                dfs(r, c, root);
        return res;
    }
    private void dfs(Integer r, Integer c, TrieNode node) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == '*') return;
        String ch = grid[r][c];
        if (!node.children.containsKey(ch)) return;
        TrieNode nxt = node.children.get(ch);
        if (nxt.word != null) { res.add(nxt.word); nxt.word = null; }
        grid[r].set(c, '*');
        dfs(r + 1, c, nxt); dfs(r - 1, c, nxt);
        dfs(r, c + 1, nxt); dfs(r, c - 1, nxt);
        grid[r].set(c, ch);
    }
}`,
      },
    ],
  },
];

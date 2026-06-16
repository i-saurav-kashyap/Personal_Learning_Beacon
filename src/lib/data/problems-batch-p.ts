import type { Problem } from "@/lib/types";

// Binary Tree (advanced) — Striver A2Z gaps. Assumes TreeNode { val, left, right }.
export const PROBLEMS_BATCH_P: Problem[] = [
  {
    slug: "root-to-leaf-paths-in-binary-tree",
    title: "Root to Leaf Paths in Binary Tree",
    difficulty: "Easy",
    patterns: ["trees", "backtracking"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a binary tree, return every root-to-leaf path as a list (e.g. \"1->2->5\").",
    beginnerExplanation:
      "Walk down the tree carrying the path so far. When you reach a leaf, record the path. The trick is to undo your last step (backtrack) when you return, so siblings start from the correct prefix.",
    realWorldAnalogy:
      "Tracing every route from a building's lobby to each exit: you note the corridors as you go, write down a full route at each exit, then step back to try the next branch.",
    visualExplanation: "1{2{5},3} -> paths: \"1->2->5\", \"1->3\"",
    approaches: [
      {
        title: "DFS with backtracking",
        tier: "Optimal",
        idea: "Carry a running path; append at a leaf; pop on the way back up.",
        steps: ["Push node value", "If leaf, join the path into the result", "Recurse left/right", "Pop before returning"],
        time: "O(n)",
        space: "O(h) recursion + O(n) output",
      },
    ],
    dryRun: "push1; push2; push5(leaf)->'1->2->5'; pop5,pop2; push3(leaf)->'1->3'",
    interviewTips: ["Backtracking with a shared list is cleaner than passing new strings everywhere.", "Clarify the separator and whether values can be negative."],
    commonMistakes: ["Forgetting to pop after recursion (paths leak into siblings).", "Treating a one-child node as a leaf."],
    followUps: ["Sum of all root-to-leaf numbers.", "Path with a target sum."],
    related: ["binary-tree-maximum-path-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def binary_tree_paths(root):
    res = []
    def dfs(node, path):
        if not node:
            return
        path.append(str(node.val))
        if not node.left and not node.right:
            res.append("->".join(path))
        else:
            dfs(node.left, path)
            dfs(node.right, path)
        path.pop()
    dfs(root, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        dfs(root, new ArrayList<>(), res);
        return res;
    }
    private void dfs(TreeNode node, List<String> path, List<String> res) {
        if (node == null) return;
        path.add(String.valueOf(node.val));
        if (node.left == null && node.right == null) {
            res.add(String.join("->", path));
        } else {
            dfs(node.left, path, res);
            dfs(node.right, path, res);
        }
        path.remove(path.size() - 1);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function binaryTreePaths(root) {
  const res = [];
  function dfs(node, path) {
    if (!node) return;
    path.push(String(node.val));
    if (!node.left && !node.right) res.push(path.join("->"));
    else {
      dfs(node.left, path);
      dfs(node.right, path);
    }
    path.pop();
  }
  dfs(root, []);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new List<String>();
        dfs(root, new List<String>(), res);
        return res;
    }
    static void dfs(TreeNode node, List<String> path, List<String> res) {
        if (node == null) return;
        path.add(String.valueOf(node.val));
        if (node.left == null && node.right == null) {
            res.add(String.join(path, '->'));
        } else {
            dfs(node.left, path, res);
            dfs(node.right, path, res);
        }
        path.remove(path.size() - 1);
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-width-of-binary-tree",
    title: "Maximum Width of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the maximum width of a binary tree: the largest number of nodes in any level, counting the gaps between the leftmost and rightmost non-null nodes as if the level were full.",
    beginnerExplanation:
      "Number each node like a heap: a node at index i has children 2i and 2i+1. The width of a level is (rightmost index − leftmost index + 1). Do a level-order pass tracking those indices.",
    realWorldAnalogy:
      "Measuring the widest shelf in a bookcase by where the first and last books sit — empty slots between them still count toward the span.",
    visualExplanation: "level indices [1] -> [2,3] -> [4,_,_,7] width=7-4+1=4",
    approaches: [
      {
        title: "BFS with heap-style indexing",
        tier: "Optimal",
        idea: "Assign each node an index; per level, width = lastIdx − firstIdx + 1. Subtract the level's first index to keep numbers small.",
        steps: ["Queue (node, index)", "For each level record first & last index", "Children get 2i and 2i+1", "Track the max width"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "root idx0; children 0,1; next 0,_,_,3 -> width 3-0+1=4",
    interviewTips: ["Normalize indices per level (subtract the first) to avoid overflow on deep trees.", "Width counts the gaps, not just present nodes."],
    commonMistakes: ["Letting indices overflow without normalizing.", "Counting only non-null nodes (ignores gaps)."],
    followUps: ["Maximum width by actual node count (no gaps).", "Vertical width."],
    related: ["binary-tree-level-order-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def width_of_binary_tree(root):
    if not root:
        return 0
    best = 0
    q = deque([(root, 0)])
    while q:
        first = q[0][1]
        last = first
        for _ in range(len(q)):
            node, idx = q.popleft()
            idx -= first  # normalize to avoid overflow
            last = idx
            if node.left:
                q.append((node.left, 2 * idx))
            if node.right:
                q.append((node.right, 2 * idx + 1))
        best = max(best, last + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int best = 0;
        Deque<int[]> q = new ArrayDeque<>(); // {nodeIndexInArr, colIndex}
        Map<TreeNode, Integer> ids = new HashMap<>();
        Deque<TreeNode> nodes = new ArrayDeque<>();
        nodes.add(root); ids.put(root, 0);
        List<TreeNode> level = new ArrayList<>();
        level.add(root);
        while (!level.isEmpty()) {
            int first = ids.get(level.get(0));
            int last = ids.get(level.get(level.size() - 1));
            best = Math.max(best, last - first + 1);
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode n : level) {
                int idx = ids.get(n) - first;
                if (n.left != null) { ids.put(n.left, 2 * idx); next.add(n.left); }
                if (n.right != null) { ids.put(n.right, 2 * idx + 1); next.add(n.right); }
            }
            level = next;
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function widthOfBinaryTree(root) {
  if (!root) return 0;
  let best = 0;
  let level = [[root, 0]];
  while (level.length) {
    const first = level[0][1];
    best = Math.max(best, level[level.length - 1][1] - first + 1);
    const next = [];
    for (const [node, idx] of level) {
      const i = idx - first;
      if (node.left) next.push([node.left, 2 * i]);
      if (node.right) next.push([node.right, 2 * i + 1]);
    }
    level = next;
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        Integer best = 0;
        List<TreeNode> level = new List<TreeNode>{ root };
        Map<TreeNode, Integer> idx = new Map<TreeNode, Integer>();
        idx.put(root, 0);
        while (!level.isEmpty()) {
            Integer first = idx.get(level[0]);
            Integer last = idx.get(level[level.size() - 1]);
            if (last - first + 1 > best) best = last - first + 1;
            List<TreeNode> next = new List<TreeNode>();
            for (TreeNode n : level) {
                Integer i = idx.get(n) - first;
                if (n.left != null) { idx.put(n.left, 2 * i); next.add(n.left); }
                if (n.right != null) { idx.put(n.right, 2 * i + 1); next.add(n.right); }
            }
            level = next;
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "children-sum-property-in-binary-tree",
    title: "Children Sum Property in Binary Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Check whether a binary tree satisfies the Children Sum Property: for every node with at least one child, the node's value equals the sum of its children's values (a missing child counts as 0). Leaves trivially satisfy it.",
    beginnerExplanation:
      "Visit each node. If it has children, their values must add up to the node's value. Recurse so every internal node holds.",
    realWorldAnalogy:
      "An org chart where each manager's headcount equals the sum of their direct reports' team sizes — verified all the way down.",
    visualExplanation: "10{4,6} ok (4+6=10); 10{4,5} fails (9!=10)",
    approaches: [
      {
        title: "Post-order verification",
        tier: "Optimal",
        idea: "At each internal node compare value to left+right; AND the recursive results.",
        steps: ["Leaf -> true", "sum = left.val(or 0) + right.val(or 0)", "Return node.val == sum AND recurse both"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "leaf 4 ok; leaf 6 ok; node10 4+6=10 ok -> true",
    interviewTips: ["Clarify whether a single child means the other counts as 0.", "Striver also asks to CONVERT a tree to satisfy this — know both."],
    commonMistakes: ["Treating leaves as failing.", "Crashing on a missing child instead of using 0."],
    followUps: ["Modify the tree to satisfy the property with minimal increments.", "Sum property for n-ary trees."],
    related: ["maximum-depth-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_children_sum(root):
    if not root or (not root.left and not root.right):
        return True
    total = (root.left.val if root.left else 0) + (root.right.val if root.right else 0)
    if root.val != total:
        return False
    return is_children_sum(root.left) and is_children_sum(root.right)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isChildrenSum(TreeNode root) {
        if (root == null || (root.left == null && root.right == null)) return true;
        int total = (root.left != null ? root.left.val : 0)
                  + (root.right != null ? root.right.val : 0);
        if (root.val != total) return false;
        return isChildrenSum(root.left) && isChildrenSum(root.right);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isChildrenSum(root) {
  if (!root || (!root.left && !root.right)) return true;
  const total = (root.left ? root.left.val : 0) + (root.right ? root.right.val : 0);
  if (root.val !== total) return false;
  return isChildrenSum(root.left) && isChildrenSum(root.right);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isChildrenSum(TreeNode root) {
        if (root == null || (root.left == null && root.right == null)) return true;
        Integer total = (root.left != null ? root.left.val : 0)
                      + (root.right != null ? root.right.val : 0);
        if (root.val != total) return false;
        return isChildrenSum(root.left) && isChildrenSum(root.right);
    }
}`,
      },
    ],
  },
  {
    slug: "all-nodes-distance-k-in-binary-tree",
    title: "All Nodes Distance K in Binary Tree",
    difficulty: "Medium",
    patterns: ["trees", "graphs"],
    topics: ["Trees", "Graphs"],
    companies: ["amazon", "meta", "google"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given the root, a target node, and an integer k, return the values of all nodes that are exactly distance k from the target (edges count in any direction — up via parent or down via children).",
    beginnerExplanation:
      "A tree only lets you go down, but distance can go up too. So first record each node's parent, turning the tree into an undirected graph, then BFS outward from the target k layers — the layer k nodes are the answer.",
    realWorldAnalogy:
      "Finding everyone exactly k handshakes from you in a family: you can reach parents, children — so treat relationships as two-way and fan out k steps.",
    visualExplanation: "target=5,k=2 -> go up to parent, across, down -> collect nodes 2 edges away",
    approaches: [
      {
        title: "Parent map + BFS",
        tier: "Optimal",
        idea: "DFS to map child->parent, then BFS from target treating left/right/parent as neighbours.",
        steps: ["Build parent map", "BFS from target with a visited set", "After k layers, the queue holds the answer"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "parent map built; BFS level0={target}; level1=neighbours; level k -> emit values",
    interviewTips: ["The parent-pointer trick converts many 'distance in a tree' problems into graph BFS.", "Use a visited set so you don't bounce back the way you came."],
    commonMistakes: ["Forgetting the upward (parent) direction.", "Revisiting the node you came from."],
    followUps: ["Minimum time to burn the tree (same technique).", "Count instead of list."],
    related: ["minimum-time-to-burn-a-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def distance_k(root, target, k):
    parent = {}
    def dfs(node, par):
        if not node:
            return
        parent[node] = par
        dfs(node.left, node)
        dfs(node.right, node)
    dfs(root, None)
    visited = {target}
    q = deque([target])
    dist = 0
    while q:
        if dist == k:
            return [n.val for n in q]
        for _ in range(len(q)):
            node = q.popleft()
            for nb in (node.left, node.right, parent[node]):
                if nb and nb not in visited:
                    visited.add(nb)
                    q.append(nb)
        dist += 1
    return []`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        dfs(root, null, parent);
        Set<TreeNode> visited = new HashSet<>();
        Deque<TreeNode> q = new ArrayDeque<>();
        q.add(target); visited.add(target);
        int dist = 0;
        while (!q.isEmpty()) {
            if (dist == k) {
                List<Integer> res = new ArrayList<>();
                for (TreeNode n : q) res.add(n.val);
                return res;
            }
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll();
                for (TreeNode nb : new TreeNode[]{ n.left, n.right, parent.get(n) }) {
                    if (nb != null && visited.add(nb)) q.add(nb);
                }
            }
            dist++;
        }
        return new ArrayList<>();
    }
    private void dfs(TreeNode n, TreeNode par, Map<TreeNode, TreeNode> parent) {
        if (n == null) return;
        parent.put(n, par);
        dfs(n.left, n, parent);
        dfs(n.right, n, parent);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function distanceK(root, target, k) {
  const parent = new Map();
  (function dfs(n, par) {
    if (!n) return;
    parent.set(n, par);
    dfs(n.left, n);
    dfs(n.right, n);
  })(root, null);
  const visited = new Set([target]);
  let q = [target], dist = 0;
  while (q.length) {
    if (dist === k) return q.map((n) => n.val);
    const next = [];
    for (const n of q) {
      for (const nb of [n.left, n.right, parent.get(n)]) {
        if (nb && !visited.has(nb)) { visited.add(nb); next.push(nb); }
      }
    }
    q = next;
    dist++;
  }
  return [];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> distanceK(TreeNode root, TreeNode target, Integer k) {
        Map<TreeNode, TreeNode> parent = new Map<TreeNode, TreeNode>();
        build(root, null, parent);
        Set<TreeNode> visited = new Set<TreeNode>{ target };
        List<TreeNode> q = new List<TreeNode>{ target };
        Integer dist = 0;
        while (!q.isEmpty()) {
            if (dist == k) {
                List<Integer> res = new List<Integer>();
                for (TreeNode n : q) res.add(n.val);
                return res;
            }
            List<TreeNode> next = new List<TreeNode>();
            for (TreeNode n : q) {
                for (TreeNode nb : new List<TreeNode>{ n.left, n.right, parent.get(n) }) {
                    if (nb != null && !visited.contains(nb)) { visited.add(nb); next.add(nb); }
                }
            }
            q = next;
            dist++;
        }
        return new List<Integer>();
    }
    static void build(TreeNode n, TreeNode par, Map<TreeNode, TreeNode> parent) {
        if (n == null) return;
        parent.put(n, par);
        build(n.left, n, parent);
        build(n.right, n, parent);
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-time-to-burn-a-binary-tree",
    title: "Minimum Time to Burn a Binary Tree",
    difficulty: "Hard",
    patterns: ["trees", "graphs"],
    topics: ["Trees", "Graphs"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Fire starts at a given node and spreads to adjacent nodes (children and parent) each second. Return the minimum time for the entire tree to burn.",
    beginnerExplanation:
      "Same idea as 'nodes at distance k', but instead of one ring you keep fanning out until everything is reached — the number of BFS layers minus one is the time.",
    realWorldAnalogy:
      "A rumour starting with one person and spreading to every neighbour each minute; the time to reach everyone is the longest shortest-path from the source.",
    visualExplanation: "burn from node: layer0=start, +1s per ring, answer = last ring index",
    approaches: [
      {
        title: "Parent map + multi-ring BFS",
        tier: "Optimal",
        idea: "Map parents, BFS from the start node counting how many layers until the queue empties.",
        steps: ["Locate start node, build parent map", "BFS outward, increment time per fully-processed layer", "Time = layers - 1"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "start at deep node; ring1, ring2... last ring at t -> return t",
    interviewTips: ["It's literally graph BFS for the eccentricity of the source node.", "Increment time only after a full layer drains."],
    commonMistakes: ["Off-by-one: starting time at 0 vs -1.", "Forgetting the parent edge."],
    followUps: ["Burn from a leaf vs root.", "Multiple simultaneous fire sources."],
    related: ["all-nodes-distance-k-in-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def min_time_to_burn(root, start):  # start = value of the burning node
    parent = {}
    start_node = [None]
    def dfs(node, par):
        if not node:
            return
        parent[node] = par
        if node.val == start:
            start_node[0] = node
        dfs(node.left, node)
        dfs(node.right, node)
    dfs(root, None)
    q = deque([start_node[0]])
    visited = {start_node[0]}
    time = -1
    while q:
        time += 1
        for _ in range(len(q)):
            node = q.popleft()
            for nb in (node.left, node.right, parent[node]):
                if nb and nb not in visited:
                    visited.add(nb)
                    q.append(nb)
    return time`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int minTimeToBurn(TreeNode root, int start) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        TreeNode[] startNode = new TreeNode[1];
        dfs(root, null, parent, start, startNode);
        Deque<TreeNode> q = new ArrayDeque<>();
        Set<TreeNode> visited = new HashSet<>();
        q.add(startNode[0]); visited.add(startNode[0]);
        int time = -1;
        while (!q.isEmpty()) {
            time++;
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll();
                for (TreeNode nb : new TreeNode[]{ n.left, n.right, parent.get(n) }) {
                    if (nb != null && visited.add(nb)) q.add(nb);
                }
            }
        }
        return time;
    }
    private void dfs(TreeNode n, TreeNode par, Map<TreeNode, TreeNode> parent, int start, TreeNode[] sn) {
        if (n == null) return;
        parent.put(n, par);
        if (n.val == start) sn[0] = n;
        dfs(n.left, n, parent, start, sn);
        dfs(n.right, n, parent, start, sn);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minTimeToBurn(root, start) {
  const parent = new Map();
  let startNode = null;
  (function dfs(n, par) {
    if (!n) return;
    parent.set(n, par);
    if (n.val === start) startNode = n;
    dfs(n.left, n);
    dfs(n.right, n);
  })(root, null);
  let q = [startNode], time = -1;
  const visited = new Set([startNode]);
  while (q.length) {
    time++;
    const next = [];
    for (const n of q) {
      for (const nb of [n.left, n.right, parent.get(n)]) {
        if (nb && !visited.has(nb)) { visited.add(nb); next.push(nb); }
      }
    }
    q = next;
  }
  return time;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static TreeNode startNode;
    public static Integer minTimeToBurn(TreeNode root, Integer start) {
        startNode = null;
        Map<TreeNode, TreeNode> parent = new Map<TreeNode, TreeNode>();
        build(root, null, parent, start);
        List<TreeNode> q = new List<TreeNode>{ startNode };
        Set<TreeNode> visited = new Set<TreeNode>{ startNode };
        Integer time = -1;
        while (!q.isEmpty()) {
            time++;
            List<TreeNode> next = new List<TreeNode>();
            for (TreeNode n : q) {
                for (TreeNode nb : new List<TreeNode>{ n.left, n.right, parent.get(n) }) {
                    if (nb != null && !visited.contains(nb)) { visited.add(nb); next.add(nb); }
                }
            }
            q = next;
        }
        return time;
    }
    static void build(TreeNode n, TreeNode par, Map<TreeNode, TreeNode> parent, Integer start) {
        if (n == null) return;
        parent.put(n, par);
        if (n.val == start) startNode = n;
        build(n.left, n, parent, start);
        build(n.right, n, parent, start);
    }
}`,
      },
    ],
  },
  {
    slug: "count-complete-tree-nodes",
    title: "Count Complete Tree Nodes",
    difficulty: "Easy",
    patterns: ["trees", "binary-search"],
    topics: ["Trees"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a complete binary tree, count its nodes in better than O(n) time.",
    beginnerExplanation:
      "A complete tree is full except possibly the last row. If the leftmost and rightmost depths match, it's perfect → 2^h − 1 nodes, computed instantly. Otherwise recurse on both children; only one side is imperfect, so this runs in O(log² n).",
    realWorldAnalogy:
      "Counting seats in a nearly-full stadium: any fully-occupied section you count by its capacity formula; only the last partial section needs a manual check.",
    visualExplanation: "leftDepth==rightDepth -> (1<<h)-1; else 1+count(left)+count(right)",
    approaches: [
      {
        title: "Naive traversal",
        tier: "Brute Force",
        idea: "Visit every node.",
        steps: ["DFS counting all nodes"],
        time: "O(n)",
        space: "O(h)",
      },
      {
        title: "Perfect-subtree shortcut",
        tier: "Optimal",
        idea: "If left height == right height the subtree is perfect; else recurse.",
        steps: ["Measure left spine and right spine heights", "Equal -> 2^h - 1", "Else 1 + count(left) + count(right)"],
        time: "O(log² n)",
        space: "O(log n)",
      },
    ],
    dryRun: "h_left=3,h_right=3 -> 2^3-1=7; else recurse",
    interviewTips: ["Mention the O(log² n): each of log n levels does an O(log n) height check.", "Use bit shift for 2^h."],
    commonMistakes: ["Defaulting to the O(n) walk and missing the optimization.", "Off-by-one in height counting."],
    followUps: ["Index of the last node.", "Check if a tree is complete."],
    related: ["maximum-depth-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_nodes(root):
    if not root:
        return 0
    lh = rh = 0
    n = root
    while n:
        lh += 1
        n = n.left
    n = root
    while n:
        rh += 1
        n = n.right
    if lh == rh:
        return (1 << lh) - 1
    return 1 + count_nodes(root.left) + count_nodes(root.right)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int lh = 0, rh = 0;
        for (TreeNode n = root; n != null; n = n.left) lh++;
        for (TreeNode n = root; n != null; n = n.right) rh++;
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countNodes(root) {
  if (!root) return 0;
  let lh = 0, rh = 0;
  for (let n = root; n; n = n.left) lh++;
  for (let n = root; n; n = n.right) rh++;
  if (lh === rh) return (1 << lh) - 1;
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countNodes(TreeNode root) {
        if (root == null) return 0;
        Integer lh = 0, rh = 0;
        for (TreeNode n = root; n != null; n = n.left) lh++;
        for (TreeNode n = root; n != null; n = n.right) rh++;
        if (lh == rh) return (Integer) Math.pow(2, lh) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
      },
    ],
  },
  {
    slug: "construct-binary-tree-from-inorder-and-postorder-traversal",
    title: "Construct Binary Tree from Inorder and Postorder Traversal",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given inorder and postorder traversals of a binary tree with unique values, reconstruct and return the tree.",
    beginnerExplanation:
      "The LAST element of postorder is always the current root. Find it in inorder: everything to its left is the left subtree, everything to its right is the right subtree. Build the RIGHT subtree before the left, because you're consuming postorder from the back.",
    realWorldAnalogy:
      "Rebuilding a pyramid from the order it was dismantled (postorder) and a side-photo (inorder): the last block removed was the capstone (root).",
    visualExplanation: "post=[9,15,7,20,3], in=[9,3,15,20,7] -> root3; right subtree from {15,20,7}",
    approaches: [
      {
        title: "Recursion with index map",
        tier: "Optimal",
        idea: "Map value->inorder index for O(1) splits; consume postorder from the end, building right then left.",
        steps: ["postIdx starts at end", "root = postorder[postIdx--]", "split inorder at root", "build right, then left"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "root=3 (last post); in splits {9}|{15,20,7}; recurse right then left",
    interviewTips: ["Build right subtree FIRST when consuming postorder backward.", "The inorder index map turns O(n²) into O(n)."],
    commonMistakes: ["Building left before right (wrong with backward postorder).", "Re-scanning inorder each call (O(n²))."],
    followUps: ["From preorder + inorder.", "Handle duplicate values."],
    related: ["construct-binary-tree-from-preorder-and-inorder-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def build_tree(inorder, postorder):
    idx = {v: i for i, v in enumerate(inorder)}
    post = [len(postorder) - 1]
    def build(lo, hi):
        if lo > hi:
            return None
        val = postorder[post[0]]
        post[0] -= 1
        node = TreeNode(val)
        mid = idx[val]
        node.right = build(mid + 1, hi)
        node.left = build(lo, mid - 1)
        return node
    return build(0, len(inorder) - 1)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private int postIdx;
    private Map<Integer, Integer> idx = new HashMap<>();
    private int[] post;
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        post = postorder;
        postIdx = postorder.length - 1;
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(0, inorder.length - 1);
    }
    private TreeNode build(int lo, int hi) {
        if (lo > hi) return null;
        int val = post[postIdx--];
        TreeNode node = new TreeNode(val);
        int mid = idx.get(val);
        node.right = build(mid + 1, hi);
        node.left = build(lo, mid - 1);
        return node;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function buildTree(inorder, postorder) {
  const idx = new Map(inorder.map((v, i) => [v, i]));
  let postIdx = postorder.length - 1;
  function build(lo, hi) {
    if (lo > hi) return null;
    const val = postorder[postIdx--];
    const node = new TreeNode(val);
    const mid = idx.get(val);
    node.right = build(mid + 1, hi);
    node.left = build(lo, mid - 1);
    return node;
  }
  return build(0, inorder.length - 1);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    Integer postIdx;
    Map<Integer, Integer> idx = new Map<Integer, Integer>();
    List<Integer> post;
    public TreeNode buildTree(List<Integer> inorder, List<Integer> postorder) {
        post = postorder;
        postIdx = postorder.size() - 1;
        for (Integer i = 0; i < inorder.size(); i++) idx.put(inorder[i], i);
        return build(0, inorder.size() - 1);
    }
    TreeNode build(Integer lo, Integer hi) {
        if (lo > hi) return null;
        Integer val = post[postIdx];
        postIdx--;
        TreeNode node = new TreeNode(val);
        Integer mid = idx.get(val);
        node.right = build(mid + 1, hi);
        node.left = build(lo, mid - 1);
        return node;
    }
}`,
      },
    ],
  },
  {
    slug: "morris-preorder-traversal",
    title: "Morris Preorder Traversal",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["google", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Return the preorder traversal of a binary tree using O(1) extra space (no recursion or explicit stack) — the Morris threading technique.",
    beginnerExplanation:
      "Recursion/stack costs O(h) space. Morris temporarily wires each node's inorder-predecessor's right pointer back to the node, so you can climb back up without a stack. For preorder you record the node the FIRST time you create that thread.",
    realWorldAnalogy:
      "Leaving a trail of string from a dead-end back to the last junction so you can find your way without remembering the whole path.",
    visualExplanation: "if no left: visit, go right; else find predecessor, thread it, record(preorder), go left",
    approaches: [
      {
        title: "Morris threading",
        tier: "Optimal",
        idea: "Thread predecessors to enable upward movement; record on thread creation for preorder.",
        steps: ["No left child: record, go right", "Else find rightmost of left subtree", "No thread: record, set thread, go left", "Thread exists: remove it, go right"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "create thread -> record node -> descend left; later remove thread -> go right",
    interviewTips: ["Difference from Morris inorder is WHERE you record: preorder records when creating the thread.", "Always restore the thread to leave the tree unmodified."],
    commonMistakes: ["Recording at the wrong moment (gives inorder instead).", "Not removing threads (corrupts the tree)."],
    followUps: ["Morris inorder.", "Morris postorder (trickier)."],
    related: ["morris-inorder-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def morris_preorder(root):
    res = []
    cur = root
    while cur:
        if not cur.left:
            res.append(cur.val)
            cur = cur.right
        else:
            pre = cur.left
            while pre.right and pre.right is not cur:
                pre = pre.right
            if not pre.right:
                res.append(cur.val)   # record before descending left
                pre.right = cur
                cur = cur.left
            else:
                pre.right = None
                cur = cur.right
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> morrisPreorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                res.add(cur.val);
                cur = cur.right;
            } else {
                TreeNode pre = cur.left;
                while (pre.right != null && pre.right != cur) pre = pre.right;
                if (pre.right == null) {
                    res.add(cur.val);
                    pre.right = cur;
                    cur = cur.left;
                } else {
                    pre.right = null;
                    cur = cur.right;
                }
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function morrisPreorder(root) {
  const res = [];
  let cur = root;
  while (cur) {
    if (!cur.left) {
      res.push(cur.val);
      cur = cur.right;
    } else {
      let pre = cur.left;
      while (pre.right && pre.right !== cur) pre = pre.right;
      if (!pre.right) {
        res.push(cur.val);
        pre.right = cur;
        cur = cur.left;
      } else {
        pre.right = null;
        cur = cur.right;
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
    public static List<Integer> morrisPreorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                res.add(cur.val);
                cur = cur.right;
            } else {
                TreeNode pre = cur.left;
                while (pre.right != null && pre.right != cur) pre = pre.right;
                if (pre.right == null) {
                    res.add(cur.val);
                    pre.right = cur;
                    cur = cur.left;
                } else {
                    pre.right = null;
                    cur = cur.right;
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
    slug: "morris-inorder-traversal",
    title: "Morris Inorder Traversal",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["google", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Return the inorder traversal of a binary tree in O(1) extra space using Morris threading.",
    beginnerExplanation:
      "Identical to Morris preorder, except you record a node's value the SECOND time you reach it (when you remove the thread) — i.e. after its entire left subtree is done, which is exactly inorder.",
    realWorldAnalogy:
      "Same string-trail maze trick, but you note a junction only on your way back through it, not the first time.",
    visualExplanation: "no left: visit, go right; else thread; when thread exists: remove, VISIT, go right",
    approaches: [
      {
        title: "Morris threading",
        tier: "Optimal",
        idea: "Thread predecessors; record on thread removal for inorder.",
        steps: ["No left: record, go right", "Find predecessor", "No thread: set thread, go left", "Thread exists: remove, record, go right"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "descend left building threads; on return via thread: record then go right",
    interviewTips: ["Only difference vs preorder is recording on thread REMOVAL.", "Tree is restored as you go — non-destructive."],
    commonMistakes: ["Recording when creating the thread (that's preorder).", "Infinite loop if the predecessor scan condition is wrong."],
    followUps: ["BST validation in O(1) space.", "Kth smallest via Morris."],
    related: ["morris-preorder-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def morris_inorder(root):
    res = []
    cur = root
    while cur:
        if not cur.left:
            res.append(cur.val)
            cur = cur.right
        else:
            pre = cur.left
            while pre.right and pre.right is not cur:
                pre = pre.right
            if not pre.right:
                pre.right = cur
                cur = cur.left
            else:
                pre.right = None
                res.append(cur.val)   # record on thread removal
                cur = cur.right
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> morrisInorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                res.add(cur.val);
                cur = cur.right;
            } else {
                TreeNode pre = cur.left;
                while (pre.right != null && pre.right != cur) pre = pre.right;
                if (pre.right == null) {
                    pre.right = cur;
                    cur = cur.left;
                } else {
                    pre.right = null;
                    res.add(cur.val);
                    cur = cur.right;
                }
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function morrisInorder(root) {
  const res = [];
  let cur = root;
  while (cur) {
    if (!cur.left) {
      res.push(cur.val);
      cur = cur.right;
    } else {
      let pre = cur.left;
      while (pre.right && pre.right !== cur) pre = pre.right;
      if (!pre.right) {
        pre.right = cur;
        cur = cur.left;
      } else {
        pre.right = null;
        res.push(cur.val);
        cur = cur.right;
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
    public static List<Integer> morrisInorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                res.add(cur.val);
                cur = cur.right;
            } else {
                TreeNode pre = cur.left;
                while (pre.right != null && pre.right != cur) pre = pre.right;
                if (pre.right == null) {
                    pre.right = cur;
                    cur = cur.left;
                } else {
                    pre.right = null;
                    res.add(cur.val);
                    cur = cur.right;
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
    slug: "flatten-binary-tree-to-linked-list",
    title: "Flatten Binary Tree to Linked List",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Flatten a binary tree into a 'linked list' in-place following preorder: each node's right points to the next preorder node and left is null.",
    beginnerExplanation:
      "For each node that has a left subtree, find the rightmost node of that left subtree, attach the current right subtree under it, move the left subtree to the right, and null the left. Walk right and repeat — this threads the whole tree into a right-leaning chain in O(1) space.",
    realWorldAnalogy:
      "Collapsing a folder tree into a single flat playlist in the order you'd read it top-to-bottom, left-to-right.",
    visualExplanation: "1{2{3,4},5} -> 1->2->3->4->5 (all via right pointers)",
    approaches: [
      {
        title: "Recursion / stack (O(n) space)",
        tier: "Better",
        idea: "Preorder into a list, then relink.",
        steps: ["Collect preorder", "Rewire each as right child"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Morris-style in-place",
        tier: "Optimal",
        idea: "Splice the left subtree between a node and its right subtree using the left subtree's rightmost node.",
        steps: ["If node has left, find left's rightmost", "rightmost.right = node.right", "node.right = node.left; node.left = null", "Move to node.right"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "at 1: leftmost-right of {2,3,4} is 4; 4.right=5; 1.right=2;1.left=null; continue",
    interviewTips: ["The O(1) splice is the expected optimal — describe the rightmost-of-left step.", "Order is preorder; confirm with the interviewer."],
    commonMistakes: ["Losing the right subtree before splicing it.", "Forgetting to null the left pointer."],
    followUps: ["Flatten to a doubly linked list.", "Flatten following inorder."],
    related: ["binary-tree-maximum-path-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def flatten(root):
    cur = root
    while cur:
        if cur.left:
            pre = cur.left
            while pre.right:
                pre = pre.right
            pre.right = cur.right
            cur.right = cur.left
            cur.left = None
        cur = cur.right`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void flatten(TreeNode root) {
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left != null) {
                TreeNode pre = cur.left;
                while (pre.right != null) pre = pre.right;
                pre.right = cur.right;
                cur.right = cur.left;
                cur.left = null;
            }
            cur = cur.right;
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function flatten(root) {
  let cur = root;
  while (cur) {
    if (cur.left) {
      let pre = cur.left;
      while (pre.right) pre = pre.right;
      pre.right = cur.right;
      cur.right = cur.left;
      cur.left = null;
    }
    cur = cur.right;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void flatten(TreeNode root) {
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left != null) {
                TreeNode pre = cur.left;
                while (pre.right != null) pre = pre.right;
                pre.right = cur.right;
                cur.right = cur.left;
                cur.left = null;
            }
            cur = cur.right;
        }
    }
}`,
      },
    ],
  },
];

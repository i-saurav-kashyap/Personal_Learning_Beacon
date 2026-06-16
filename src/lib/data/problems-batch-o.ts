import type { Problem } from "@/lib/types";

// Binary Tree traversals & views (Striver A2Z gaps). TreeNode {val,left,right}
// is assumed to exist, matching the house style of the existing tree problems.

export const PROBLEMS_BATCH_O: Problem[] = [
  {
    slug: "binary-tree-preorder-traversal",
    title: "Binary Tree Preorder Traversal",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a binary tree, return the preorder traversal of its nodes' values (root → left → right).",
    beginnerExplanation:
      "Visit the node first, then recurse left, then recurse right. The order you 'touch' each node as you go down is the preorder.",
    realWorldAnalogy:
      "Reading a nested table of contents: you announce a chapter's title before diving into its sub-sections left to right.",
    visualExplanation: "root 1, left 2, right 3 → [1, 2, 3]",
    approaches: [
      {
        title: "Recursion",
        tier: "Optimal",
        idea: "Append the node, then recurse left and right.",
        steps: ["If null, return", "Append node.val", "Recurse left", "Recurse right"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "1(L=2,R=3): push 1 → go 2 (leaf) push 2 → go 3 (leaf) push 3 → [1,2,3]",
    interviewTips: ["State the visit order (root,left,right) before coding.", "Mention the iterative stack variant as a follow-up."],
    commonMistakes: ["Mixing up the order with inorder/postorder."],
    followUps: ["Do it iteratively with a stack.", "Morris preorder for O(1) space."],
    related: ["binary-tree-inorder-traversal", "iterative-preorder-traversal-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def preorder_traversal(root):
    res = []
    def dfs(n):
        if not n:
            return
        res.append(n.val)
        dfs(n.left)
        dfs(n.right)
    dfs(root)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
    private void dfs(TreeNode n, List<Integer> res) {
        if (n == null) return;
        res.add(n.val);
        dfs(n.left, res);
        dfs(n.right, res);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function preorderTraversal(root) {
  const res = [];
  (function dfs(n) {
    if (!n) return;
    res.push(n.val);
    dfs(n.left);
    dfs(n.right);
  })(root);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> preorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        dfs(root, res);
        return res;
    }
    static void dfs(TreeNode n, List<Integer> res) {
        if (n == null) return;
        res.add(n.val);
        dfs(n.left, res);
        dfs(n.right, res);
    }
}`,
      },
    ],
  },
  {
    slug: "binary-tree-postorder-traversal",
    title: "Binary Tree Postorder Traversal",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a binary tree, return the postorder traversal of its nodes' values (left → right → root).",
    beginnerExplanation:
      "Recurse all the way left, then right, and only record a node AFTER both its children — children before parents.",
    realWorldAnalogy:
      "Computing folder sizes: you must size every sub-folder before you can report the parent folder's total.",
    visualExplanation: "root 1, left 2, right 3 → [2, 3, 1]",
    approaches: [
      {
        title: "Recursion",
        tier: "Optimal",
        idea: "Recurse left, recurse right, then append the node.",
        steps: ["If null, return", "Recurse left", "Recurse right", "Append node.val"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "1(L=2,R=3): go 2 push 2 → go 3 push 3 → push 1 → [2,3,1]",
    interviewTips: ["Postorder is the natural order for freeing/aggregating bottom-up.", "Iterative version is the trickiest of the three."],
    commonMistakes: ["Recording the node before its children."],
    followUps: ["Iterative with two stacks.", "Use it to delete a tree safely."],
    related: ["binary-tree-preorder-traversal", "iterative-postorder-traversal-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def postorder_traversal(root):
    res = []
    def dfs(n):
        if not n:
            return
        dfs(n.left)
        dfs(n.right)
        res.append(n.val)
    dfs(root)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
    private void dfs(TreeNode n, List<Integer> res) {
        if (n == null) return;
        dfs(n.left, res);
        dfs(n.right, res);
        res.add(n.val);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function postorderTraversal(root) {
  const res = [];
  (function dfs(n) {
    if (!n) return;
    dfs(n.left);
    dfs(n.right);
    res.push(n.val);
  })(root);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> postorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        dfs(root, res);
        return res;
    }
    static void dfs(TreeNode n, List<Integer> res) {
        if (n == null) return;
        dfs(n.left, res);
        dfs(n.right, res);
        res.add(n.val);
    }
}`,
      },
    ],
  },
  {
    slug: "iterative-preorder-traversal-of-binary-tree",
    title: "Iterative Preorder Traversal of Binary Tree",
    difficulty: "Easy",
    patterns: ["trees", "stack"],
    topics: ["Trees", "Stacks"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the preorder traversal (root → left → right) of a binary tree WITHOUT recursion, using an explicit stack.",
    beginnerExplanation:
      "Use a stack. Pop a node and record it, then push its RIGHT child first and LEFT child second — so left is processed next (LIFO).",
    realWorldAnalogy:
      "A to-do stack where you jot the current task, then stack the right errand under the left one so you tackle left first.",
    visualExplanation: "stack[1] → pop 1 (out), push 3,2 → pop 2 ... → [1,2,3]",
    approaches: [
      {
        title: "Explicit stack",
        tier: "Optimal",
        idea: "Push root; pop+emit; push right then left.",
        steps: ["Push root", "While stack: pop n, emit n.val", "Push n.right then n.left if present"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "push1 → pop1 emit, push3 push2 → pop2 emit ... [1,2,3]",
    interviewTips: ["Push RIGHT before LEFT so LEFT comes off first.", "Great answer when the interviewer bans recursion."],
    commonMistakes: ["Pushing left before right (reverses the order)."],
    followUps: ["Iterative inorder and postorder."],
    related: ["binary-tree-preorder-traversal", "iterative-inorder-traversal-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def iterative_preorder(root):
    if not root:
        return []
    res, stack = [], [root]
    while stack:
        n = stack.pop()
        res.append(n.val)
        if n.right:
            stack.append(n.right)
        if n.left:
            stack.append(n.left)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode n = stack.pop();
            res.add(n.val);
            if (n.right != null) stack.push(n.right);
            if (n.left != null) stack.push(n.left);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function preorderIterative(root) {
  if (!root) return [];
  const res = [], stack = [root];
  while (stack.length) {
    const n = stack.pop();
    res.push(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> preorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        List<TreeNode> stack = new List<TreeNode>{ root };
        while (!stack.isEmpty()) {
            TreeNode n = stack.remove(stack.size() - 1);
            res.add(n.val);
            if (n.right != null) stack.add(n.right);
            if (n.left != null) stack.add(n.left);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "iterative-inorder-traversal-of-binary-tree",
    title: "Iterative Inorder Traversal of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees", "stack"],
    topics: ["Trees", "Stacks"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the inorder traversal (left → root → right) of a binary tree WITHOUT recursion, using an explicit stack.",
    beginnerExplanation:
      "Walk left as far as possible, pushing each node. When you can't go left, pop a node (record it), then turn to its right subtree and repeat.",
    realWorldAnalogy:
      "Reading a sorted filing cabinet drawer by drawer: dive to the leftmost folder, file it, then step right.",
    visualExplanation: "go left pushing; pop+emit; go right — yields sorted order for a BST",
    approaches: [
      {
        title: "Stack + current pointer",
        tier: "Optimal",
        idea: "Push the whole left spine, pop+emit, move to right child.",
        steps: ["While cur or stack: push cur and go left", "Pop n, emit n.val", "cur = n.right"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "push left spine → pop leftmost emit → go right → repeat",
    interviewTips: ["Inorder of a BST is sorted — call that out.", "The `while cur or stack` condition is the crux."],
    commonMistakes: ["Forgetting to continue when the stack is empty but cur isn't (and vice-versa)."],
    followUps: ["Morris inorder for O(1) space.", "BST iterator using this skeleton."],
    related: ["binary-tree-inorder-traversal", "iterative-preorder-traversal-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def iterative_inorder(root):
    res, stack, cur = [], [], root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        res.append(cur.val)
        cur = cur.right
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) { stack.push(cur); cur = cur.left; }
            cur = stack.pop();
            res.add(cur.val);
            cur = cur.right;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function inorderIterative(root) {
  const res = [], stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> inorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        List<TreeNode> stack = new List<TreeNode>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) { stack.add(cur); cur = cur.left; }
            cur = stack.remove(stack.size() - 1);
            res.add(cur.val);
            cur = cur.right;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "iterative-postorder-traversal-of-binary-tree",
    title: "Iterative Postorder Traversal of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees", "stack"],
    topics: ["Trees", "Stacks"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the postorder traversal (left → right → root) of a binary tree WITHOUT recursion.",
    beginnerExplanation:
      "Easiest trick: do a modified preorder that visits root → right → left, then REVERSE it — that reversal is exactly left → right → root.",
    realWorldAnalogy:
      "Plan a trip root→right→left, then play the itinerary backwards to get the bottom-up wrap-up order.",
    visualExplanation: "modified-pre [1,3,2] reversed → [2,3,1]",
    approaches: [
      {
        title: "Two stacks (reverse of root-right-left)",
        tier: "Optimal",
        idea: "Stack1 drives a root→right→left order pushed onto stack2; pop stack2 for postorder.",
        steps: ["Push root to s1", "Pop n to s2; push n.left then n.right to s1", "Pop all of s2"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "s1[1]→s2[1], push2,3 → s2[1,3], push... pop s2 reversed → [2,3,1]",
    interviewTips: ["The 'reverse a root-right-left preorder' framing is the cleanest to explain.", "One-stack with a lastVisited pointer is the harder alternative."],
    commonMistakes: ["Pushing right before left into s1 (breaks the reversal)."],
    followUps: ["Single-stack version with a prev pointer."],
    related: ["binary-tree-postorder-traversal", "iterative-inorder-traversal-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def iterative_postorder(root):
    if not root:
        return []
    s1, s2 = [root], []
    while s1:
        n = s1.pop()
        s2.append(n.val)
        if n.left:
            s1.append(n.left)
        if n.right:
            s1.append(n.right)
    s2.reverse()
    return s2`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        LinkedList<Integer> res = new LinkedList<>();
        if (root == null) return res;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode n = stack.pop();
            res.addFirst(n.val);
            if (n.left != null) stack.push(n.left);
            if (n.right != null) stack.push(n.right);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function postorderIterative(root) {
  if (!root) return [];
  const res = [], stack = [root];
  while (stack.length) {
    const n = stack.pop();
    res.unshift(n.val);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> postorder(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        List<TreeNode> stack = new List<TreeNode>{ root };
        while (!stack.isEmpty()) {
            TreeNode n = stack.remove(stack.size() - 1);
            res.add(0, n.val);
            if (n.left != null) stack.add(n.left);
            if (n.right != null) stack.add(n.right);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "height-of-binary-tree",
    title: "Height of Binary Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "adobe"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a binary tree, return its height — the number of nodes on the longest root-to-leaf path (an empty tree has height 0).",
    beginnerExplanation:
      "A node's height is 1 plus the taller of its two subtrees. Recurse to the leaves and bubble the max back up.",
    realWorldAnalogy:
      "Measuring a family tree's generations: your depth is one more than your deepest descendant line.",
    visualExplanation: "leaf→1; parent of two leaves→2; root→3",
    approaches: [
      {
        title: "Post-order recursion",
        tier: "Optimal",
        idea: "height(node) = 1 + max(height(left), height(right)).",
        steps: ["If null return 0", "Return 1 + max(left, right)"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "leaf 1; node 1+max(1,0)=2; root 1+max(2,1)=3",
    interviewTips: ["Clarify height-in-nodes vs height-in-edges up front.", "This is the backbone of balanced-tree and diameter checks."],
    commonMistakes: ["Returning edges when nodes were asked (off by one)."],
    followUps: ["Iterative via level-order (count levels).", "Check if the tree is height-balanced."],
    related: ["maximum-depth-of-binary-tree", "diameter-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def height_of_binary_tree(root):
    if not root:
        return 0
    return 1 + max(height_of_binary_tree(root.left), height_of_binary_tree(root.right))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int height(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(height(root.left), height(root.right));
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function heightOfBinaryTree(root) {
  if (!root) return 0;
  return 1 + Math.max(heightOfBinaryTree(root.left), heightOfBinaryTree(root.right));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer height(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(height(root.left), height(root.right));
    }
}`,
      },
    ],
  },
  {
    slug: "binary-tree-zigzag-level-order-traversal",
    title: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "Medium",
    patterns: ["trees", "graphs"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the level-order traversal of a binary tree, but alternate direction each level: left→right, then right→left, and so on.",
    beginnerExplanation:
      "Do a normal BFS level by level. Keep a flag that flips every level; when it says right-to-left, reverse that level's values before adding them.",
    realWorldAnalogy:
      "Reading a boustrophedon inscription — line 1 left-to-right, line 2 right-to-left, snaking down.",
    visualExplanation: "L0 [1] → L1 reversed [3,2] → L2 [4,5,6,7]",
    approaches: [
      {
        title: "BFS with a direction flag",
        tier: "Optimal",
        idea: "Standard level BFS; reverse a level's list when the flag is right-to-left.",
        steps: ["Collect each level via BFS", "Reverse it when ltr is false", "Flip the flag"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "level [1] ltr→keep; level [2,3] rtl→[3,2]; level [4,5,6,7] ltr→keep",
    interviewTips: ["Reversing the collected list is simpler than alternating insert direction.", "Confirm whether the first level is L→R."],
    commonMistakes: ["Reversing the BFS queue itself instead of the output level."],
    followUps: ["Return as a flat list.", "Do it with a deque inserting at both ends."],
    related: ["binary-tree-level-order-traversal", "binary-tree-right-side-view"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def zigzag_level_order(root):
    if not root:
        return []
    res, level, ltr = [], [root], True
    while level:
        vals = [n.val for n in level]
        res.append(vals if ltr else vals[::-1])
        ltr = not ltr
        nxt = []
        for n in level:
            if n.left:
                nxt.append(n.left)
            if n.right:
                nxt.append(n.right)
        level = nxt
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean ltr = true;
        while (!q.isEmpty()) {
            int sz = q.size();
            LinkedList<Integer> level = new LinkedList<>();
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll();
                if (ltr) level.addLast(n.val); else level.addFirst(n.val);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            res.add(level);
            ltr = !ltr;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function zigzagLevelOrder(root) {
  if (!root) return [];
  const res = [];
  let level = [root], ltr = true;
  while (level.length) {
    const vals = level.map((n) => n.val);
    res.push(ltr ? vals : vals.reverse());
    ltr = !ltr;
    const nxt = [];
    for (const n of level) {
      if (n.left) nxt.push(n.left);
      if (n.right) nxt.push(n.right);
    }
    level = nxt;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> zigzag(TreeNode root) {
        List<List<Integer>> res = new List<List<Integer>>();
        if (root == null) return res;
        List<TreeNode> level = new List<TreeNode>{ root };
        Boolean ltr = true;
        while (!level.isEmpty()) {
            List<Integer> vals = new List<Integer>();
            for (TreeNode n : level) vals.add(n.val);
            if (!ltr) {
                List<Integer> rev = new List<Integer>();
                for (Integer i = vals.size() - 1; i >= 0; i--) rev.add(vals[i]);
                vals = rev;
            }
            res.add(vals);
            ltr = !ltr;
            List<TreeNode> nxt = new List<TreeNode>();
            for (TreeNode n : level) {
                if (n.left != null) nxt.add(n.left);
                if (n.right != null) nxt.add(n.right);
            }
            level = nxt;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "boundary-traversal-of-binary-tree",
    title: "Boundary Traversal of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the anti-clockwise boundary of a binary tree: the root, then the left boundary (top→down, excluding leaves), then all leaves (left→right), then the right boundary (bottom→up, excluding leaves).",
    beginnerExplanation:
      "Trace the outline of the tree. Collect the left edge going down (skip leaves), then every leaf, then the right edge going up (skip leaves). Add the root once at the start.",
    realWorldAnalogy:
      "Walking the fence around a property: down the left side, across the bottom, back up the right side.",
    visualExplanation: "root + left-spine(no leaves) + leaves(L→R) + right-spine reversed(no leaves)",
    approaches: [
      {
        title: "Three passes (left boundary, leaves, right boundary)",
        tier: "Optimal",
        idea: "Collect each segment separately, skipping leaves in the boundaries to avoid duplicates.",
        steps: [
          "Add root if not a leaf",
          "Walk left boundary top-down adding non-leaves",
          "Add all leaves left to right",
          "Walk right boundary, collect non-leaves, append reversed",
        ],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "root 1; left 2,(skip leaf) ; leaves 4,5,6,7 ; right 3 reversed",
    interviewTips: ["Excluding leaves from the boundaries is the key to no duplicates.", "Handle the single-node and root-is-leaf edge cases."],
    commonMistakes: ["Double-counting leaf nodes that sit on a boundary.", "Forgetting to reverse the right boundary."],
    followUps: ["Clockwise boundary.", "Boundary of an n-ary tree."],
    related: ["binary-tree-right-side-view", "top-view-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def boundary_traversal(root):
    if not root:
        return []
    def is_leaf(n):
        return not n.left and not n.right
    res = []
    if not is_leaf(root):
        res.append(root.val)
    cur = root.left
    while cur:
        if not is_leaf(cur):
            res.append(cur.val)
        cur = cur.left if cur.left else cur.right
    def leaves(n):
        if not n:
            return
        if is_leaf(n):
            res.append(n.val)
            return
        leaves(n.left)
        leaves(n.right)
    leaves(root)
    tmp = []
    cur = root.right
    while cur:
        if not is_leaf(cur):
            tmp.append(cur.val)
        cur = cur.right if cur.right else cur.left
    res.extend(reversed(tmp))
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private boolean isLeaf(TreeNode n) { return n.left == null && n.right == null; }
    public List<Integer> boundary(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        if (!isLeaf(root)) res.add(root.val);
        TreeNode cur = root.left;
        while (cur != null) {
            if (!isLeaf(cur)) res.add(cur.val);
            cur = cur.left != null ? cur.left : cur.right;
        }
        leaves(root, res);
        List<Integer> tmp = new ArrayList<>();
        cur = root.right;
        while (cur != null) {
            if (!isLeaf(cur)) tmp.add(cur.val);
            cur = cur.right != null ? cur.right : cur.left;
        }
        for (int i = tmp.size() - 1; i >= 0; i--) res.add(tmp.get(i));
        return res;
    }
    private void leaves(TreeNode n, List<Integer> res) {
        if (n == null) return;
        if (isLeaf(n)) { res.add(n.val); return; }
        leaves(n.left, res);
        leaves(n.right, res);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function boundaryTraversal(root) {
  if (!root) return [];
  const isLeaf = (n) => !n.left && !n.right;
  const res = [];
  if (!isLeaf(root)) res.push(root.val);
  let cur = root.left;
  while (cur) {
    if (!isLeaf(cur)) res.push(cur.val);
    cur = cur.left || cur.right;
  }
  (function leaves(n) {
    if (!n) return;
    if (isLeaf(n)) { res.push(n.val); return; }
    leaves(n.left);
    leaves(n.right);
  })(root);
  const tmp = [];
  cur = root.right;
  while (cur) {
    if (!isLeaf(cur)) tmp.push(cur.val);
    cur = cur.right || cur.left;
  }
  for (let i = tmp.length - 1; i >= 0; i--) res.push(tmp[i]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Boolean isLeaf(TreeNode n) { return n.left == null && n.right == null; }
    public static List<Integer> boundary(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        if (!isLeaf(root)) res.add(root.val);
        TreeNode cur = root.left;
        while (cur != null) {
            if (!isLeaf(cur)) res.add(cur.val);
            cur = cur.left != null ? cur.left : cur.right;
        }
        leaves(root, res);
        List<Integer> tmp = new List<Integer>();
        cur = root.right;
        while (cur != null) {
            if (!isLeaf(cur)) tmp.add(cur.val);
            cur = cur.right != null ? cur.right : cur.left;
        }
        for (Integer i = tmp.size() - 1; i >= 0; i--) res.add(tmp[i]);
        return res;
    }
    static void leaves(TreeNode n, List<Integer> res) {
        if (n == null) return;
        if (isLeaf(n)) { res.add(n.val); return; }
        leaves(n.left, res);
        leaves(n.right, res);
    }
}`,
      },
    ],
  },
  {
    slug: "vertical-order-traversal-of-a-binary-tree",
    title: "Vertical Order Traversal of a Binary Tree",
    difficulty: "Hard",
    patterns: ["trees", "hashing"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the vertical order traversal of a binary tree. Going from leftmost to rightmost column, list node values; within a column, order by row (top to bottom), and for ties at the same row+column, by ascending value.",
    beginnerExplanation:
      "Give the root column 0; going left subtracts 1, going right adds 1. Bucket every node by its column. Output columns left→right, and inside each column sort by depth, then value for ties.",
    realWorldAnalogy:
      "Dropping each node straight down onto a number line of columns, then reading the stacks left to right.",
    visualExplanation: "col(-1)=[left child], col(0)=[root, ...], col(1)=[right child]",
    approaches: [
      {
        title: "BFS/DFS recording (col,row,val), then sort",
        tier: "Optimal",
        idea: "Collect (col,row,val) for every node, sort by (col,row,val), group by column.",
        steps: ["Traverse tracking row and col", "Sort all triples", "Group consecutive equal columns"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "root(0,0); left(1,-1); right(1,1) → cols -1,0,1",
    interviewTips: ["The tie-break (row then value) is what makes this Hard vs Medium — clarify it.", "BFS naturally gives row order but you still need the value tie-break."],
    commonMistakes: ["Forgetting the same-cell value tie-break.", "Using a plain map without sorting columns."],
    followUps: ["Top view / bottom view reuse the column idea."],
    related: ["top-view-of-binary-tree", "bottom-view-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def vertical_order_traversal(root):
    if not root:
        return []
    triples = []
    stack = [(root, 0, 0)]
    while stack:
        n, r, c = stack.pop()
        triples.append((c, r, n.val))
        if n.left:
            stack.append((n.left, r + 1, c - 1))
        if n.right:
            stack.append((n.right, r + 1, c + 1))
    triples.sort()
    cols = {}
    order = []
    for c, r, v in triples:
        if c not in cols:
            cols[c] = []
            order.append(c)
        cols[c].append(v)
    return [cols[c] for c in sorted(order)]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        List<int[]> triples = new ArrayList<>(); // {col, row, val}
        dfs(root, 0, 0, triples);
        triples.sort((a, b) -> a[0] != b[0] ? a[0] - b[0]
                : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]);
        List<List<Integer>> res = new ArrayList<>();
        Integer prev = null;
        for (int[] t : triples) {
            if (prev == null || t[0] != prev) { res.add(new ArrayList<>()); prev = t[0]; }
            res.get(res.size() - 1).add(t[2]);
        }
        return res;
    }
    private void dfs(TreeNode n, int r, int c, List<int[]> out) {
        if (n == null) return;
        out.add(new int[]{ c, r, n.val });
        dfs(n.left, r + 1, c - 1, out);
        dfs(n.right, r + 1, c + 1, out);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function verticalOrderTraversal(root) {
  if (!root) return [];
  const triples = [];
  (function dfs(n, r, c) {
    if (!n) return;
    triples.push([c, r, n.val]);
    dfs(n.left, r + 1, c - 1);
    dfs(n.right, r + 1, c + 1);
  })(root, 0, 0);
  triples.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  const res = [];
  let prev;
  for (const [c, , v] of triples) {
    if (prev === undefined || c !== prev) { res.push([]); prev = c; }
    res[res.length - 1].push(v);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> verticalOrder(TreeNode root) {
        List<List<Integer>> triples = new List<List<Integer>>(); // {col,row,val}
        dfs(root, 0, 0, triples);
        // sort by col, then row, then val (simple insertion sort for clarity)
        for (Integer i = 1; i < triples.size(); i++) {
            List<Integer> key = triples[i];
            Integer j = i - 1;
            while (j >= 0 && cmp(triples[j], key) > 0) { triples[j + 1] = triples[j]; j--; }
            triples[j + 1] = key;
        }
        List<List<Integer>> res = new List<List<Integer>>();
        Integer prev = null;
        for (List<Integer> t : triples) {
            if (prev == null || t[0] != prev) { res.add(new List<Integer>()); prev = t[0]; }
            res[res.size() - 1].add(t[2]);
        }
        return res;
    }
    static Integer cmp(List<Integer> a, List<Integer> b) {
        if (a[0] != b[0]) return a[0] - b[0];
        if (a[1] != b[1]) return a[1] - b[1];
        return a[2] - b[2];
    }
    static void dfs(TreeNode n, Integer r, Integer c, List<List<Integer>> out) {
        if (n == null) return;
        out.add(new List<Integer>{ c, r, n.val });
        dfs(n.left, r + 1, c - 1, out);
        dfs(n.right, r + 1, c + 1, out);
    }
}`,
      },
    ],
  },
  {
    slug: "top-view-of-binary-tree",
    title: "Top View of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees", "hashing"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the top view of a binary tree — the nodes visible when looking straight down from above, ordered left to right by column.",
    beginnerExplanation:
      "Give the root column 0 (left −1, right +1). For each column, the visible node is the FIRST one reached in a level-order (BFS) sweep. Output columns left to right.",
    realWorldAnalogy:
      "Looking down on a tree from a drone: for each vertical strip you only see the topmost leaf.",
    visualExplanation: "BFS; first node seen per column wins; sort columns ascending",
    approaches: [
      {
        title: "BFS keeping first node per column",
        tier: "Optimal",
        idea: "BFS with (node,col); record a column only the first time it appears.",
        steps: ["BFS from root with col 0", "If col unseen, store node.val", "Output by sorted column"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "root col0 seen; left col-1 seen; right col1 seen → [-1,0,1] vals",
    interviewTips: ["BFS (not DFS) guarantees the topmost node per column without comparing depths.", "Use a sorted/tree map keyed by column."],
    commonMistakes: ["Using DFS and overwriting with deeper nodes.", "Forgetting to sort columns at the end."],
    followUps: ["Bottom view (last node per column).", "Left/right view."],
    related: ["bottom-view-of-binary-tree", "vertical-order-traversal-of-a-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def top_view(root):
    if not root:
        return []
    cols = {}
    level = [(root, 0)]
    while level:
        nxt = []
        for n, c in level:
            if c not in cols:
                cols[c] = n.val
            if n.left:
                nxt.append((n.left, c - 1))
            if n.right:
                nxt.append((n.right, c + 1))
        level = nxt
    return [cols[c] for c in sorted(cols)]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> topView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        TreeMap<Integer, Integer> cols = new TreeMap<>();
        Queue<TreeNode> nodes = new LinkedList<>();
        Queue<Integer> colq = new LinkedList<>();
        nodes.add(root); colq.add(0);
        while (!nodes.isEmpty()) {
            TreeNode n = nodes.poll(); int c = colq.poll();
            if (!cols.containsKey(c)) cols.put(c, n.val);
            if (n.left != null) { nodes.add(n.left); colq.add(c - 1); }
            if (n.right != null) { nodes.add(n.right); colq.add(c + 1); }
        }
        res.addAll(cols.values());
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function topView(root) {
  if (!root) return [];
  const cols = new Map();
  let level = [[root, 0]];
  while (level.length) {
    const nxt = [];
    for (const [n, c] of level) {
      if (!cols.has(c)) cols.set(c, n.val);
      if (n.left) nxt.push([n.left, c - 1]);
      if (n.right) nxt.push([n.right, c + 1]);
    }
    level = nxt;
  }
  return [...cols.keys()].sort((a, b) => a - b).map((c) => cols.get(c));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> topView(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        Map<Integer, Integer> cols = new Map<Integer, Integer>();
        List<TreeNode> nodes = new List<TreeNode>{ root };
        List<Integer> colq = new List<Integer>{ 0 };
        Integer i = 0;
        while (i < nodes.size()) {
            TreeNode n = nodes[i]; Integer c = colq[i]; i++;
            if (!cols.containsKey(c)) cols.put(c, n.val);
            if (n.left != null) { nodes.add(n.left); colq.add(c - 1); }
            if (n.right != null) { nodes.add(n.right); colq.add(c + 1); }
        }
        List<Integer> keys = new List<Integer>(cols.keySet());
        keys.sort();
        for (Integer k : keys) res.add(cols.get(k));
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "bottom-view-of-binary-tree",
    title: "Bottom View of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees", "hashing"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the bottom view of a binary tree — the nodes visible when looking up from directly below, ordered left to right by column.",
    beginnerExplanation:
      "Same column idea as the top view, but now the LAST node reached in a level-order sweep for each column wins (it sits lowest). Output columns left to right.",
    realWorldAnalogy:
      "Lying under a glass tree looking up: for each vertical strip you see the lowest node.",
    visualExplanation: "BFS; overwrite column with each new node; last (lowest) wins",
    approaches: [
      {
        title: "BFS overwriting per column",
        tier: "Optimal",
        idea: "BFS with (node,col); always overwrite the column's value so the last wins.",
        steps: ["BFS from root with col 0", "Always set cols[col] = node.val", "Output by sorted column"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "overwrite each column as BFS deepens; final per column is the bottom node",
    interviewTips: ["Only difference from top view: overwrite instead of first-wins.", "BFS ensures left-to-right tie handling for same-column same-depth nodes."],
    commonMistakes: ["Keeping the first node (that's the top view)."],
    followUps: ["Top view.", "Diagonal view."],
    related: ["top-view-of-binary-tree", "vertical-order-traversal-of-a-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def bottom_view(root):
    if not root:
        return []
    cols = {}
    level = [(root, 0)]
    while level:
        nxt = []
        for n, c in level:
            cols[c] = n.val
            if n.left:
                nxt.append((n.left, c - 1))
            if n.right:
                nxt.append((n.right, c + 1))
        level = nxt
    return [cols[c] for c in sorted(cols)]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> bottomView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        TreeMap<Integer, Integer> cols = new TreeMap<>();
        Queue<TreeNode> nodes = new LinkedList<>();
        Queue<Integer> colq = new LinkedList<>();
        nodes.add(root); colq.add(0);
        while (!nodes.isEmpty()) {
            TreeNode n = nodes.poll(); int c = colq.poll();
            cols.put(c, n.val);
            if (n.left != null) { nodes.add(n.left); colq.add(c - 1); }
            if (n.right != null) { nodes.add(n.right); colq.add(c + 1); }
        }
        res.addAll(cols.values());
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function bottomView(root) {
  if (!root) return [];
  const cols = new Map();
  let level = [[root, 0]];
  while (level.length) {
    const nxt = [];
    for (const [n, c] of level) {
      cols.set(c, n.val);
      if (n.left) nxt.push([n.left, c - 1]);
      if (n.right) nxt.push([n.right, c + 1]);
    }
    level = nxt;
  }
  return [...cols.keys()].sort((a, b) => a - b).map((c) => cols.get(c));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> bottomView(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        Map<Integer, Integer> cols = new Map<Integer, Integer>();
        List<TreeNode> nodes = new List<TreeNode>{ root };
        List<Integer> colq = new List<Integer>{ 0 };
        Integer i = 0;
        while (i < nodes.size()) {
            TreeNode n = nodes[i]; Integer c = colq[i]; i++;
            cols.put(c, n.val);
            if (n.left != null) { nodes.add(n.left); colq.add(c - 1); }
            if (n.right != null) { nodes.add(n.right); colq.add(c + 1); }
        }
        List<Integer> keys = new List<Integer>(cols.keySet());
        keys.sort();
        for (Integer k : keys) res.add(cols.get(k));
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "right-view-of-binary-tree",
    title: "Right View of Binary Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the right view of a binary tree — the values visible from the right side, top to bottom (the last node of each level).",
    beginnerExplanation:
      "Do a level-order traversal and grab the LAST node on each level. (The left view is the same idea taking the first node per level.)",
    realWorldAnalogy:
      "Standing to the right of the tree: each level, you only see the rightmost node; the rest are hidden behind it.",
    visualExplanation: "level0 last; level1 last; ... → right silhouette",
    approaches: [
      {
        title: "Level-order, last per level",
        tier: "Optimal",
        idea: "BFS each level; append the last node's value.",
        steps: ["BFS level by level", "Append the last node of each level"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "L0 [1]→1; L1 [2,3]→3; L2 [4,5,6]→6 → [1,3,6]",
    interviewTips: ["Last-per-level for right view, first-per-level for left view.", "A right-first DFS keyed by depth also works in O(h) space."],
    commonMistakes: ["Assuming the right view is just the rightmost path (a missing right child exposes a left-subtree node)."],
    followUps: ["Left view.", "Right view via DFS with depth."],
    related: ["binary-tree-right-side-view", "top-view-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def right_view(root):
    if not root:
        return []
    res, level = [], [root]
    while level:
        res.append(level[-1].val)
        nxt = []
        for n in level:
            if n.left:
                nxt.append(n.left)
            if n.right:
                nxt.append(n.right)
        level = nxt
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> rightView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll();
                if (i == sz - 1) res.add(n.val);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rightView(root) {
  if (!root) return [];
  const res = [];
  let level = [root];
  while (level.length) {
    res.push(level[level.length - 1].val);
    const nxt = [];
    for (const n of level) {
      if (n.left) nxt.push(n.left);
      if (n.right) nxt.push(n.right);
    }
    level = nxt;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> rightView(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        List<TreeNode> level = new List<TreeNode>{ root };
        while (!level.isEmpty()) {
            res.add(level[level.size() - 1].val);
            List<TreeNode> nxt = new List<TreeNode>();
            for (TreeNode n : level) {
                if (n.left != null) nxt.add(n.left);
                if (n.right != null) nxt.add(n.right);
            }
            level = nxt;
        }
        return res;
    }
}`,
      },
    ],
  },
];

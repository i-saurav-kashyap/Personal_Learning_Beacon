import type { Problem } from "@/lib/types";

// Binary Search Trees (Striver A2Z gaps). Solutions assume a TreeNode { val,
// left, right } node type, matching the house style of the existing tree entries.
export const PROBLEMS_BATCH_Q: Problem[] = [
  {
    slug: "search-in-a-binary-search-tree",
    title: "Search in a Binary Search Tree",
    difficulty: "Easy",
    patterns: ["trees", "binary-search"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given the root of a BST and a value, return the subtree rooted at the node whose value equals the target, or null if it doesn't exist.",
    beginnerExplanation:
      "A BST keeps smaller values on the left and larger on the right. So at each node just compare: equal → found; target smaller → go left; target larger → go right. You never look at a whole subtree you can rule out.",
    realWorldAnalogy:
      "Looking up a name in a phone book: one glance tells you to flip earlier or later — you never read the half that can't contain it.",
    visualExplanation: "target=8 at root 10 → 8<10 go left → node 8 → found",
    approaches: [
      {
        title: "Recursive / iterative BST walk",
        tier: "Optimal",
        idea: "Use the ordering invariant to descend one side each step.",
        steps: ["If null or node.val==target return node", "If target<val go left else go right"],
        time: "O(h) — O(log n) balanced, O(n) skewed",
        space: "O(1) iterative",
      },
    ],
    dryRun: "root=4 target=2 → 2<4 left → node 2 → return it",
    interviewTips: ["Iterative version uses O(1) space — mention it.", "Clarify behaviour for duplicates if allowed."],
    commonMistakes: ["Scanning both subtrees (that's a plain tree search, not BST).", "Returning a boolean when the node/subtree is asked for."],
    followUps: ["Ceil/floor of a value.", "Search in a balanced vs skewed tree — complexity."],
    related: ["validate-binary-search-tree", "insert-into-a-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def search_bst(root, val):
    while root and root.val != val:
        root = root.left if val < root.val else root.right
    return root`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        while (root != null && root.val != val)
            root = val < root.val ? root.left : root.right;
        return root;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function searchBST(root, val) {
  while (root && root.val !== val) root = val < root.val ? root.left : root.right;
  return root;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static TreeNode searchBST(TreeNode root, Integer val) {
        while (root != null && root.val != val)
            root = val < root.val ? root.left : root.right;
        return root;
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-element-in-bst",
    title: "Minimum Element in BST",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Binary Search Trees"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement: "Given the root of a non-empty BST, return its minimum value.",
    beginnerExplanation:
      "Because every left child is smaller than its parent in a BST, the smallest value is simply the leftmost node — keep going left until there's no left child.",
    realWorldAnalogy: "Walking to the far-left seat in a sorted row to find the lowest ticket number.",
    visualExplanation: "10 → 5 → 3 → 1(no left) → min = 1",
    approaches: [
      {
        title: "Walk left",
        tier: "Optimal",
        idea: "The leftmost node holds the minimum (rightmost holds the maximum).",
        steps: ["While node.left exists, go left", "Return node.val"],
        time: "O(h)",
        space: "O(1)",
      },
    ],
    dryRun: "root=8 → left 3 → left 1 → no left → min=1",
    interviewTips: ["Symmetric trick: rightmost node is the maximum.", "Handle the empty-tree case in the prompt."],
    commonMistakes: ["Doing a full traversal instead of walking one edge.", "Assuming the root is the min."],
    followUps: ["Maximum element (walk right).", "Inorder successor/predecessor."],
    related: ["search-in-a-binary-search-tree", "floor-in-a-bst"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_value(root):
    while root.left:
        root = root.left
    return root.val`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minValue(TreeNode root) {
        while (root.left != null) root = root.left;
        return root.val;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minValue(root) {
  while (root.left) root = root.left;
  return root.val;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minValue(TreeNode root) {
        while (root.left != null) root = root.left;
        return root.val;
    }
}`,
      },
    ],
  },
  {
    slug: "ceil-in-a-bst",
    title: "Ceil in a BST",
    difficulty: "Easy",
    patterns: ["trees", "binary-search"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a BST and a key, return the ceil of the key — the smallest value in the tree that is ≥ key (or -1 if none).",
    beginnerExplanation:
      "Descend the tree tracking the best candidate. If a node's value equals the key, that's the answer. If it's bigger, it's a possible ceil — record it and try the left subtree for something tighter. If it's smaller, the ceil must be larger, so go right.",
    realWorldAnalogy:
      "Finding the cheapest plan that still covers your need: every option that's big enough is a candidate; you keep hunting for a smaller one that still covers you.",
    visualExplanation: "key=5 in [2,4,6,8] → 6 is smallest value ≥ 5 → ceil=6",
    approaches: [
      {
        title: "Single descent tracking candidate",
        tier: "Optimal",
        idea: "Move left on val≥key (recording it) and right on val<key.",
        steps: ["ceil=-1", "If val==key return val", "If val>key: ceil=val, go left", "Else go right"],
        time: "O(h)",
        space: "O(1)",
      },
    ],
    dryRun: "key=5, tree 8/4/12: 8>5 ceil=8 left; 4<5 right; 6>5 ceil=6 left; null → 6",
    interviewTips: ["Floor is the mirror image (track val≤key, move right when recording).", "Return -1 (or null) when no value qualifies."],
    commonMistakes: ["Forgetting the equal case is an immediate answer.", "Updating the candidate on the wrong branch."],
    followUps: ["Floor in a BST.", "Both floor and ceil in one pass."],
    related: ["floor-in-a-bst", "search-in-a-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_ceil(root, key):
    ceil = -1
    while root:
        if root.val == key:
            return key
        if root.val > key:
            ceil = root.val
            root = root.left
        else:
            root = root.right
    return ceil`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findCeil(TreeNode root, int key) {
        int ceil = -1;
        while (root != null) {
            if (root.val == key) return key;
            if (root.val > key) { ceil = root.val; root = root.left; }
            else root = root.right;
        }
        return ceil;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findCeil(root, key) {
  let ceil = -1;
  while (root) {
    if (root.val === key) return key;
    if (root.val > key) { ceil = root.val; root = root.left; }
    else root = root.right;
  }
  return ceil;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findCeil(TreeNode root, Integer key) {
        Integer ceil = -1;
        while (root != null) {
            if (root.val == key) return key;
            if (root.val > key) { ceil = root.val; root = root.left; }
            else root = root.right;
        }
        return ceil;
    }
}`,
      },
    ],
  },
  {
    slug: "floor-in-a-bst",
    title: "Floor in a BST",
    difficulty: "Easy",
    patterns: ["trees", "binary-search"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a BST and a key, return the floor of the key — the largest value in the tree that is ≤ key (or -1 if none).",
    beginnerExplanation:
      "Mirror image of ceil. Descend the tree: if a node equals the key it's the answer; if it's smaller it's a candidate floor (record it) and you go right hoping for something closer; if it's bigger the floor must be smaller, so go left.",
    realWorldAnalogy:
      "Finding the highest step you can stand on without going over a height limit — every step under the limit is a candidate; you keep climbing for a higher one still under it.",
    visualExplanation: "key=7 in [2,4,6,8] → 6 is largest value ≤ 7 → floor=6",
    approaches: [
      {
        title: "Single descent tracking candidate",
        tier: "Optimal",
        idea: "Move right on val≤key (recording it) and left on val>key.",
        steps: ["floor=-1", "If val==key return val", "If val<key: floor=val, go right", "Else go left"],
        time: "O(h)",
        space: "O(1)",
      },
    ],
    dryRun: "key=7, tree 8/4/12: 8>7 left; 4<7 floor=4 right; 6<7 floor=6 right; null → 6",
    interviewTips: ["Ceil is the mirror (track val≥key, move left when recording).", "Decide -1 vs null for the no-answer case."],
    commonMistakes: ["Recording the candidate on the wrong branch.", "Missing the exact-match shortcut."],
    followUps: ["Ceil in a BST.", "Find both floor and ceil together."],
    related: ["ceil-in-a-bst", "search-in-a-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_floor(root, key):
    floor = -1
    while root:
        if root.val == key:
            return key
        if root.val < key:
            floor = root.val
            root = root.right
        else:
            root = root.left
    return floor`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findFloor(TreeNode root, int key) {
        int floor = -1;
        while (root != null) {
            if (root.val == key) return key;
            if (root.val < key) { floor = root.val; root = root.right; }
            else root = root.left;
        }
        return floor;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findFloor(root, key) {
  let floor = -1;
  while (root) {
    if (root.val === key) return key;
    if (root.val < key) { floor = root.val; root = root.right; }
    else root = root.left;
  }
  return floor;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findFloor(TreeNode root, Integer key) {
        Integer floorVal = -1;
        while (root != null) {
            if (root.val == key) return key;
            if (root.val < key) { floorVal = root.val; root = root.right; }
            else root = root.left;
        }
        return floorVal;
    }
}`,
      },
    ],
  },
  {
    slug: "insert-into-a-binary-search-tree",
    title: "Insert into a Binary Search Tree",
    difficulty: "Medium",
    patterns: ["trees", "binary-search"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a BST and a value to insert, insert it and return the root. The value is guaranteed not to already exist.",
    beginnerExplanation:
      "Walk down as if searching for the value. When you fall off the tree (hit a null child), that empty spot is exactly where the new node belongs — the BST ordering is preserved automatically.",
    realWorldAnalogy:
      "Filing a new folder alphabetically: you follow the existing dividers left/right until you reach the gap where it fits, and drop it in.",
    visualExplanation: "insert 5 into 4(root): 5>4 → right is null → attach 5 as right child",
    approaches: [
      {
        title: "Iterative descent to a null slot",
        tier: "Optimal",
        idea: "Find the leaf parent the value would search to, then attach it.",
        steps: ["If empty tree return new node", "Walk left/right by comparison", "Attach as the null child reached"],
        time: "O(h)",
        space: "O(1)",
      },
    ],
    dryRun: "insert 2 into 4/_ : 2<4 go left → null → attach 2 as left child",
    interviewTips: ["Iterative keeps it O(1) space.", "Insertion always lands at a leaf — no restructuring needed (unlike delete)."],
    commonMistakes: ["Losing the parent pointer so you can't attach.", "Not handling the empty-tree root case."],
    followUps: ["Delete from a BST (harder).", "Keep the tree balanced (AVL / red-black)."],
    related: ["delete-node-in-a-bst", "search-in-a-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def insert_into_bst(root, val):
    node = TreeNode(val)
    if not root:
        return node
    cur = root
    while True:
        if val < cur.val:
            if not cur.left:
                cur.left = node
                return root
            cur = cur.left
        else:
            if not cur.right:
                cur.right = node
                return root
            cur = cur.right`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        TreeNode node = new TreeNode(val);
        if (root == null) return node;
        TreeNode cur = root;
        while (true) {
            if (val < cur.val) {
                if (cur.left == null) { cur.left = node; return root; }
                cur = cur.left;
            } else {
                if (cur.right == null) { cur.right = node; return root; }
                cur = cur.right;
            }
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function insertIntoBST(root, val) {
  const node = new TreeNode(val);
  if (!root) return node;
  let cur = root;
  while (true) {
    if (val < cur.val) {
      if (!cur.left) { cur.left = node; return root; }
      cur = cur.left;
    } else {
      if (!cur.right) { cur.right = node; return root; }
      cur = cur.right;
    }
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static TreeNode insertIntoBST(TreeNode root, Integer val) {
        TreeNode node = new TreeNode(val);
        if (root == null) return node;
        TreeNode cur = root;
        while (true) {
            if (val < cur.val) {
                if (cur.left == null) { cur.left = node; return root; }
                cur = cur.left;
            } else {
                if (cur.right == null) { cur.right = node; return root; }
                cur = cur.right;
            }
        }
        return root;
    }
}`,
      },
    ],
  },
  {
    slug: "delete-node-in-a-bst",
    title: "Delete Node in a BST",
    difficulty: "Medium",
    patterns: ["trees", "binary-search"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given the root of a BST and a key, delete the node with that value (if present) and return the (possibly new) root, keeping it a valid BST.",
    beginnerExplanation:
      "Find the node. Deleting a leaf or a node with one child is easy — splice the child up. The tricky case is two children: replace the node's value with its in-order successor (the smallest value in the right subtree), then delete that successor (which has at most one child).",
    realWorldAnalogy:
      "Removing a manager who has two reports: you promote the next-most-junior person in line (the successor) into the slot so the hierarchy's order stays intact.",
    visualExplanation:
      "delete 5 with children: successor = min of right subtree (say 6) → copy 6 into node → delete original 6",
    approaches: [
      {
        title: "Recursive delete with successor replacement",
        tier: "Optimal",
        idea: "Recurse to the node; handle 0/1-child by returning the other child; 2-child by successor swap.",
        steps: [
          "key<val → recurse left; key>val → recurse right",
          "Found: if no left return right; if no right return left",
          "Else find min of right subtree, copy its value, delete it from the right subtree",
        ],
        time: "O(h)",
        space: "O(h) recursion",
      },
    ],
    dryRun: "delete 3 (leaf) → parent's child becomes null; delete 8 (two kids) → swap with successor 9, remove 9",
    interviewTips: ["Name the three cases explicitly (0, 1, 2 children).", "Successor = leftmost of right subtree; predecessor works symmetrically."],
    commonMistakes: ["Forgetting to actually remove the successor after copying.", "Mishandling the root when it's the deleted node."],
    followUps: ["Keep balance after deletion (AVL).", "Delete by reference without value copy (pointer surgery)."],
    related: ["insert-into-a-binary-search-tree", "minimum-element-in-bst"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def delete_node(root, key):
    if not root:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        succ = root.right
        while succ.left:
            succ = succ.left
        root.val = succ.val
        root.right = delete_node(root.right, succ.val)
    return root`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val) root.left = deleteNode(root.left, key);
        else if (key > root.val) root.right = deleteNode(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode succ = root.right;
            while (succ.left != null) succ = succ.left;
            root.val = succ.val;
            root.right = deleteNode(root.right, succ.val);
        }
        return root;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.val = succ.val;
    root.right = deleteNode(root.right, succ.val);
  }
  return root;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static TreeNode deleteNode(TreeNode root, Integer key) {
        if (root == null) return null;
        if (key < root.val) root.left = deleteNode(root.left, key);
        else if (key > root.val) root.right = deleteNode(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode succ = root.right;
            while (succ.left != null) succ = succ.left;
            root.val = succ.val;
            root.right = deleteNode(root.right, succ.val);
        }
        return root;
    }
}`,
      },
    ],
  },
  {
    slug: "construct-bst-from-preorder-traversal",
    title: "Construct BST from Preorder Traversal",
    difficulty: "Medium",
    patterns: ["trees", "binary-search"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the preorder traversal of a BST, reconstruct the tree and return its root.",
    beginnerExplanation:
      "In preorder the first value is the root. Every later value belongs left if it's smaller, right if it's larger. Carry an 'upper bound' down the recursion: a value only belongs in the current subtree if it's below that bound — otherwise it's for an ancestor's right side.",
    realWorldAnalogy:
      "Re-shelving books from a packing list written root-first: each next book either fits under the current shelf's limit or you back out to a higher shelf.",
    visualExplanation: "[8,5,1,7,10,12]: 8 root; 5,1,7 < 8 (left); 10,12 > 8 (right)",
    approaches: [
      {
        title: "Sort + inorder build",
        tier: "Brute Force",
        idea: "Sorting preorder gives inorder; build from preorder+inorder.",
        steps: ["Sort to get inorder", "Construct from the two traversals"],
        time: "O(n log n)",
        space: "O(n)",
      },
      {
        title: "Upper-bound single pass",
        tier: "Optimal",
        idea: "One index into preorder; recurse with an upper bound that limits each subtree.",
        steps: ["i=0; build(bound)", "If i==n or pre[i]>bound return null", "node=pre[i++]; node.left=build(node.val); node.right=build(bound)"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "[8,5,12]: root 8; build(8)→5<8 node5; build(8) for 5.right→12>8 stop; back, 8.right→12",
    interviewTips: ["The bound trick avoids the O(n log n) sort entirely.", "Same idea reconstructs from preorder alone because BST order is implicit."],
    commonMistakes: ["Using a local index instead of a shared/By-reference one.", "Wrong bound passed to left vs right child."],
    followUps: ["Construct from postorder.", "Construct a general binary tree from preorder+inorder."],
    related: ["validate-binary-search-tree", "construct-binary-tree-from-preorder-and-inorder-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def bst_from_preorder(preorder):
    i = 0
    def build(bound):
        nonlocal i
        if i == len(preorder) or preorder[i] > bound:
            return None
        node = TreeNode(preorder[i]); i += 1
        node.left = build(node.val)
        node.right = build(bound)
        return node
    return build(float('inf'))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    int i = 0;
    public TreeNode bstFromPreorder(int[] preorder) {
        return build(preorder, Integer.MAX_VALUE);
    }
    private TreeNode build(int[] pre, int bound) {
        if (i == pre.length || pre[i] > bound) return null;
        TreeNode node = new TreeNode(pre[i++]);
        node.left = build(pre, node.val);
        node.right = build(pre, bound);
        return node;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function bstFromPreorder(preorder) {
  let i = 0;
  function build(bound) {
    if (i === preorder.length || preorder[i] > bound) return null;
    const node = new TreeNode(preorder[i++]);
    node.left = build(node.val);
    node.right = build(bound);
    return node;
  }
  return build(Infinity);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Integer i = 0;
    private List<Integer> pre;
    public TreeNode bstFromPreorder(List<Integer> preorder) {
        this.pre = preorder; this.i = 0;
        return build(2147483647);
    }
    private TreeNode build(Integer bound) {
        if (i == pre.size() || pre[i] > bound) return null;
        TreeNode node = new TreeNode(pre[i]); i++;
        node.left = build(node.val);
        node.right = build(bound);
        return node;
    }
}`,
      },
    ],
  },
  {
    slug: "binary-search-tree-iterator",
    title: "Binary Search Tree Iterator",
    difficulty: "Medium",
    patterns: ["trees", "stack"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "meta", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement an iterator over a BST: next() returns the next smallest value in in-order, and hasNext() reports whether more values remain. Aim for O(h) memory and amortised O(1) next().",
    beginnerExplanation:
      "Simulate the controlled in-order traversal with an explicit stack. Push the entire left spine from the root. Each next() pops a node (the current smallest), then pushes the left spine of its right child. Each node is pushed and popped once, so next() is O(1) on average and memory is only the current spine, O(h).",
    realWorldAnalogy:
      "A vending machine that dispenses sorted items on demand: it pre-loads just the next column, and only restocks the following column when you take one.",
    visualExplanation: "stack = left spine; next() pops min, then pushes right-child's left spine",
    approaches: [
      {
        title: "Flatten to a list",
        tier: "Brute Force",
        idea: "In-order into an array, then index through it.",
        steps: ["Inorder traversal to a list", "Pointer for next/hasNext"],
        time: "O(n) build, O(1) next",
        space: "O(n)",
      },
      {
        title: "Controlled stack of left spines",
        tier: "Optimal",
        idea: "Hold only the current left spine; restock on next().",
        steps: ["Constructor pushes left spine from root", "next(): pop, push popped.right's left spine", "hasNext(): stack non-empty"],
        time: "amortised O(1) next",
        space: "O(h)",
      },
    ],
    dryRun: "tree 7/3/15/_/_/9/20: stack[7,3]; next→3, push none; next→7, push 15,9; next→9 ...",
    interviewTips: ["Lead with the O(h)-space stack version — it's the point of the question.", "Each node pushed/popped once ⇒ amortised O(1)."],
    commonMistakes: ["Flattening the whole tree when O(h) memory is requested.", "Forgetting to push the right child's left spine after a pop."],
    followUps: ["Add a prev()/bidirectional iterator.", "Iterator over a range [lo, hi]."],
    related: ["kth-smallest-element-in-a-bst", "binary-tree-inorder-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class BSTIterator:
    def __init__(self, root):
        self.stack = []
        self._push_left(root)
    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left
    def next(self):
        node = self.stack.pop()
        self._push_left(node.right)
        return node.val
    def hasNext(self):
        return len(self.stack) > 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class BSTIterator {
    private Deque<TreeNode> stack = new ArrayDeque<>();
    public BSTIterator(TreeNode root) { pushLeft(root); }
    private void pushLeft(TreeNode node) {
        while (node != null) { stack.push(node); node = node.left; }
    }
    public int next() {
        TreeNode node = stack.pop();
        pushLeft(node.right);
        return node.val;
    }
    public boolean hasNext() { return !stack.isEmpty(); }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class BSTIterator {
  constructor(root) { this.stack = []; this._pushLeft(root); }
  _pushLeft(node) { while (node) { this.stack.push(node); node = node.left; } }
  next() { const node = this.stack.pop(); this._pushLeft(node.right); return node.val; }
  hasNext() { return this.stack.length > 0; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class BSTIterator {
    private List<TreeNode> stack = new List<TreeNode>();
    public BSTIterator(TreeNode root) { pushLeft(root); }
    private void pushLeft(TreeNode node) {
        while (node != null) { stack.add(node); node = node.left; }
    }
    public Integer next() {
        TreeNode node = stack.remove(stack.size() - 1);
        pushLeft(node.right);
        return node.val;
    }
    public Boolean hasNext() { return !stack.isEmpty(); }
}`,
      },
    ],
  },
  {
    slug: "two-sum-iv-input-is-a-bst",
    title: "Two Sum IV - Input is a BST",
    difficulty: "Easy",
    patterns: ["trees", "hashing", "two-pointers"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the root of a BST and a target k, return true if there exist two distinct nodes whose values sum to k.",
    beginnerExplanation:
      "Just like Two Sum on an array: walk the tree and keep a set of values you've seen. For each node, check whether (k − value) is already in the set; if so you've found the pair. Otherwise add the value and continue.",
    realWorldAnalogy:
      "Going through receipts looking for two that add to a round number — each time you note the amount and check if its complement already passed by.",
    visualExplanation: "k=9, seen grows {2},{2,7?→2+7=9 found}",
    approaches: [
      {
        title: "Hash set over any traversal",
        tier: "Optimal",
        idea: "Seen-set complement check; works on any tree (ignores BST order).",
        steps: ["Traverse", "If k-val in seen return true", "Add val to seen"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Inorder array + two pointers",
        tier: "Better",
        idea: "Inorder gives a sorted array; two pointers from both ends — O(1) extra beyond the array.",
        steps: ["Inorder to sorted list", "Two pointers move by sum vs k"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "k=9: visit 5 seen{5}; visit 3 need 6 no, seen{5,3}; visit 4 need 5 → found",
    interviewTips: ["Note the BST order lets you do the two-pointer variant; the set version is simplest.", "Distinct nodes — don't pair a node with itself."],
    commonMistakes: ["Pairing a node with itself when k=2*val.", "Assuming you must use the BST property — the set works regardless."],
    followUps: ["Two Sum on a balanced BST in O(h) space (two iterators).", "Three nodes summing to k."],
    related: ["two-sum", "binary-search-tree-iterator"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_target(root, k):
    seen = set()
    stack = [root] if root else []
    while stack:
        node = stack.pop()
        if k - node.val in seen:
            return True
        seen.add(node.val)
        if node.left: stack.append(node.left)
        if node.right: stack.append(node.right)
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean findTarget(TreeNode root, int k) {
        Set<Integer> seen = new HashSet<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (seen.contains(k - node.val)) return true;
            seen.add(node.val);
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findTarget(root, k) {
  const seen = new Set();
  const stack = root ? [root] : [];
  while (stack.length) {
    const node = stack.pop();
    if (seen.has(k - node.val)) return true;
    seen.add(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean findTarget(TreeNode root, Integer k) {
        Set<Integer> seen = new Set<Integer>();
        List<TreeNode> stack = new List<TreeNode>();
        if (root != null) stack.add(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.remove(stack.size() - 1);
            if (seen.contains(k - node.val)) return true;
            seen.add(node.val);
            if (node.left != null) stack.add(node.left);
            if (node.right != null) stack.add(node.right);
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "recover-binary-search-tree",
    title: "Recover Binary Search Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Exactly two nodes of a BST were swapped by mistake. Recover the tree by fixing it in place (ideally without changing its structure).",
    beginnerExplanation:
      "A correct BST has a strictly increasing in-order sequence. If two nodes are swapped, the in-order walk has one or two 'dips' (a value smaller than its predecessor). The first violation's predecessor is one culprit; the last violation's current node is the other. Swap their values back.",
    realWorldAnalogy:
      "Two names got swapped in a sorted attendance sheet — scanning top to bottom you spot where order breaks, identify the two misplaced names, and switch them back.",
    visualExplanation: "inorder 1 3 2 4 → dip at (3,2): first=3, last=2 → swap 3 and 2",
    approaches: [
      {
        title: "Inorder array, find swapped, fix",
        tier: "Better",
        idea: "Collect inorder, find the two out-of-order values, swap them in the tree.",
        steps: ["Inorder traversal", "Find the two misplaced values", "Second pass to swap them"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Inorder with first/middle/last pointers",
        tier: "Optimal",
        idea: "Track prev during inorder; capture the two violators in one pass, swap their values.",
        steps: [
          "On val<prev.val: if first null set first=prev, middle=cur else last=cur",
          "After traversal: last? swap first,last : swap first,middle",
        ],
        time: "O(n)",
        space: "O(h) (O(1) with Morris)",
      },
    ],
    dryRun: "inorder 3 2 1: dip (3,2) first=3 middle=2; dip (2,1) last=1 → swap 3,1",
    interviewTips: ["Two cases: adjacent swap (one dip → swap first,middle) vs non-adjacent (two dips → swap first,last).", "Morris traversal makes it O(1) space — strong bonus."],
    commonMistakes: ["Handling only the two-dip case and missing the adjacent swap.", "Swapping nodes instead of values (changes structure)."],
    followUps: ["Do it in O(1) space with Morris.", "What if three nodes were swapped?"],
    related: ["validate-binary-search-tree", "binary-tree-inorder-traversal"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def recover_tree(root):
    first = middle = last = prev = None
    def inorder(node):
        nonlocal first, middle, last, prev
        if not node:
            return
        inorder(node.left)
        if prev and node.val < prev.val:
            if not first:
                first, middle = prev, node
            else:
                last = node
        prev = node
        inorder(node.right)
    inorder(root)
    if last:
        first.val, last.val = last.val, first.val
    else:
        first.val, middle.val = middle.val, first.val`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private TreeNode first, middle, last, prev;
    public void recoverTree(TreeNode root) {
        inorder(root);
        if (last != null) { int t = first.val; first.val = last.val; last.val = t; }
        else { int t = first.val; first.val = middle.val; middle.val = t; }
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && node.val < prev.val) {
            if (first == null) { first = prev; middle = node; }
            else last = node;
        }
        prev = node;
        inorder(node.right);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function recoverTree(root) {
  let first = null, middle = null, last = null, prev = null;
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (prev && node.val < prev.val) {
      if (!first) { first = prev; middle = node; }
      else last = node;
    }
    prev = node;
    inorder(node.right);
  }
  inorder(root);
  if (last) { const t = first.val; first.val = last.val; last.val = t; }
  else { const t = first.val; first.val = middle.val; middle.val = t; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private TreeNode first, middle, last, prev;
    public void recoverTree(TreeNode root) {
        inorder(root);
        if (last != null) { Integer t = first.val; first.val = last.val; last.val = t; }
        else { Integer t = first.val; first.val = middle.val; middle.val = t; }
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && node.val < prev.val) {
            if (first == null) { first = prev; middle = node; }
            else last = node;
        }
        prev = node;
        inorder(node.right);
    }
}`,
      },
    ],
  },
  {
    slug: "largest-bst-in-a-binary-tree",
    title: "Largest BST in a Binary Tree",
    difficulty: "Hard",
    patterns: ["trees", "dynamic-programming"],
    topics: ["Binary Search Trees"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a binary tree (not necessarily a BST), return the size (number of nodes) of the largest subtree that is itself a valid BST.",
    beginnerExplanation:
      "Solve it bottom-up. From each node, return three facts about its subtree: is it a BST, its min value, its max value, and its size. A node forms a BST only if both children are BSTs and the node's value is greater than the left subtree's max and less than the right subtree's min. Track the largest BST size seen.",
    realWorldAnalogy:
      "Auditing an org chart for the biggest sub-team that's perfectly ranked: each manager is valid only if both their sub-teams are valid and their own rank sits between the sub-teams' extremes.",
    visualExplanation: "post-order returns {isBST,min,max,size}; combine at each node",
    approaches: [
      {
        title: "Validate every subtree",
        tier: "Brute Force",
        idea: "For each node, check if its whole subtree is a BST and count nodes.",
        steps: ["For each node, isBST(subtree)", "If valid, track its size"],
        time: "O(n²)",
        space: "O(h)",
      },
      {
        title: "Post-order returning (isBST, min, max, size)",
        tier: "Optimal",
        idea: "Single bottom-up pass merging child summaries.",
        steps: [
          "Leaf/null → BST with +∞ min, -∞ max, size 0",
          "Node is BST iff both children BST and left.max < val < right.min",
          "If BST size = left+right+1; update global max",
        ],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "node 10 with left BST(max 8) and right BST(min 15): 8<10<15 ✓ → size = l+r+1",
    interviewTips: ["Return a small struct per node — classic 'bottom-up DP on trees'.", "Use ±∞ sentinels so the null/leaf case composes cleanly."],
    commonMistakes: ["Only checking the node's immediate children instead of subtree min/max.", "Wrong sentinel direction (min should start +∞, max -∞)."],
    followUps: ["Return the actual subtree, not just its size.", "Largest BST by value-sum instead of node count."],
    related: ["validate-binary-search-tree", "binary-tree-maximum-path-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def largest_bst(root):
    best = 0
    def dfs(node):
        nonlocal best
        if not node:
            return (True, float('inf'), float('-inf'), 0)
        lb, lmin, lmax, ls = dfs(node.left)
        rb, rmin, rmax, rs = dfs(node.right)
        if lb and rb and lmax < node.val < rmin:
            size = ls + rs + 1
            best = max(best, size)
            return (True, min(lmin, node.val), max(rmax, node.val), size)
        return (False, 0, 0, 0)
    dfs(root)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int best = 0;
    public int largestBST(TreeNode root) { dfs(root); return best; }
    // returns {isBST(1/0), min, max, size}
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{1, Integer.MAX_VALUE, Integer.MIN_VALUE, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        if (l[0] == 1 && r[0] == 1 && l[2] < node.val && node.val < r[1]) {
            int size = l[3] + r[3] + 1;
            best = Math.max(best, size);
            return new int[]{1, Math.min(l[1], node.val), Math.max(r[2], node.val), size};
        }
        return new int[]{0, 0, 0, 0};
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function largestBST(root) {
  let best = 0;
  function dfs(node) {
    if (!node) return { bst: true, min: Infinity, max: -Infinity, size: 0 };
    const l = dfs(node.left), r = dfs(node.right);
    if (l.bst && r.bst && l.max < node.val && node.val < r.min) {
      const size = l.size + r.size + 1;
      best = Math.max(best, size);
      return { bst: true, min: Math.min(l.min, node.val), max: Math.max(r.max, node.val), size };
    }
    return { bst: false, min: 0, max: 0, size: 0 };
  }
  dfs(root);
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Integer best = 0;
    public Integer largestBST(TreeNode root) { dfs(root); return best; }
    // returns List<Integer>{isBST(1/0), min, max, size}
    private List<Integer> dfs(TreeNode node) {
        if (node == null) return new List<Integer>{1, 2147483647, -2147483648, 0};
        List<Integer> l = dfs(node.left), r = dfs(node.right);
        if (l[0] == 1 && r[0] == 1 && l[2] < node.val && node.val < r[1]) {
            Integer size = l[3] + r[3] + 1;
            best = Math.max(best, size);
            return new List<Integer>{1, Math.min(l[1], node.val), Math.max(r[2], node.val), size};
        }
        return new List<Integer>{0, 0, 0, 0};
    }
}`,
      },
    ],
  },
];

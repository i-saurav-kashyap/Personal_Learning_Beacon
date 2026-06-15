import type { Problem } from "@/lib/types";

// Batch C — Linked List, Binary Trees & BST. Titles match the Striver A2Z course
// so the course view auto-links into these full explanations.

export const PROBLEMS_BATCH_C: Problem[] = [
  {
    slug: "middle-of-the-linked-list",
    title: "Middle of the Linked List",
    difficulty: "Easy",
    patterns: ["fast-slow-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.",
    beginnerExplanation:
      "Walk two pointers: a slow one moving one step and a fast one moving two. When the fast pointer falls off the end, the slow one is sitting exactly in the middle — no need to count the length first.",
    realWorldAnalogy:
      "Two runners on the same track, one twice as fast. When the sprinter finishes the lap, the jogger is precisely halfway around.",
    visualExplanation:
      "1→2→3→4→5\nslow:1 2 3\nfast:1 3 5(end) → middle = 3",
    approaches: [
      {
        title: "Count then walk",
        tier: "Brute Force",
        idea: "First pass counts n; second pass walks n/2 nodes.",
        steps: ["Count length n", "Walk floor(n/2) steps from head"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Slow & fast pointers",
        tier: "Optimal",
        idea: "One pass: fast moves twice as fast; slow ends at the middle.",
        steps: ["slow = fast = head", "While fast and fast.next: slow=slow.next, fast=fast.next.next", "Return slow"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "1→2→3→4\nslow1 fast1\nslow2 fast3\nslow3 fast=null(stop) → return 3 (second middle)",
    interviewTips: [
      "This slow/fast trick is the building block for cycle detection and reordering — name the pattern.",
      "Clarify which middle to return for even length; the loop condition decides it.",
    ],
    commonMistakes: ["Returning the first middle when the second is required.", "Null check only on fast, not fast.next."],
    followUps: ["Reorder the list around the middle.", "Detect a cycle with the same two pointers."],
    related: ["linked-list-cycle", "reorder-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
      },
    ],
  },
  {
    slug: "palindrome-linked-list",
    title: "Palindrome Linked List",
    difficulty: "Easy",
    patterns: ["fast-slow-pointers", "linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement: "Given the head of a singly linked list, return true if it reads the same forwards and backwards.",
    beginnerExplanation:
      "Find the middle with slow/fast, reverse the second half in place, then walk both halves together comparing values. Equal all the way means it's a palindrome.",
    realWorldAnalogy:
      "Fold a strip of paper in half at the midpoint and check the two halves line up letter for letter.",
    visualExplanation: "1→2→2→1\nmid after 2nd node; reverse 2nd half: 1→2 | 1→2\ncompare 1=1, 2=2 → true",
    approaches: [
      {
        title: "Copy to array",
        tier: "Brute Force",
        idea: "Dump values into an array and two-pointer check.",
        steps: ["Collect values", "Compare i and n-1-i inward"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Reverse second half",
        tier: "Optimal",
        idea: "Find middle, reverse the back half, compare both halves in lockstep.",
        steps: ["slow/fast to middle", "Reverse from slow", "Walk head and reversed tail comparing values"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "1→2→3→2→1\nmid=3; reverse tail 1→2; compare 1,2 with 1,2 → true",
    interviewTips: ["Mention you can restore the list afterward if mutation isn't allowed.", "O(1) space is the expected follow-up."],
    commonMistakes: ["Off-by-one picking the middle for odd vs even lengths.", "Forgetting to stop comparison when the reversed half ends."],
    followUps: ["Restore the list to its original order.", "Do it recursively."],
    related: ["reverse-linked-list", "middle-of-the-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:
        slow.next, prev, slow = prev, slow, slow.next
    while prev:
        if prev.val != head.val:
            return False
        prev = prev.next
        head = head.next
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null;
        while (slow != null) {
            ListNode nxt = slow.next;
            slow.next = prev;
            prev = slow;
            slow = nxt;
        }
        while (prev != null) {
            if (prev.val != head.val) return false;
            prev = prev.next;
            head = head.next;
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isPalindrome(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null;
  while (slow) { const nxt = slow.next; slow.next = prev; prev = slow; slow = nxt; }
  while (prev) {
    if (prev.val !== head.val) return false;
    prev = prev.next; head = head.next;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null;
        while (slow != null) {
            ListNode nxt = slow.next;
            slow.next = prev;
            prev = slow;
            slow = nxt;
        }
        while (prev != null) {
            if (prev.val != head.val) return false;
            prev = prev.next;
            head = head.next;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "intersection-of-two-linked-lists",
    title: "Intersection of Two Linked Lists",
    difficulty: "Easy",
    patterns: ["two-pointers", "linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the heads of two singly linked lists, return the node where they intersect, or null if they don't. The lists keep their structure.",
    beginnerExplanation:
      "Walk two pointers, each starting on one list. When a pointer hits the end, send it to the other list's head. After at most two passes they've travelled equal distance and meet at the intersection (or both reach null together).",
    realWorldAnalogy:
      "Two friends walk each other's route after finishing their own. Having covered the same total distance, they arrive at the shared landmark at the same moment.",
    visualExplanation: "A: a1→a2→c1→c2\nB: b1→b2→b3→c1→c2\nswap heads at ends → meet at c1",
    approaches: [
      {
        title: "Hash visited nodes",
        tier: "Better",
        idea: "Store every node of list A, then scan B for the first seen node.",
        steps: ["Add all of A to a set", "Walk B; first node in the set is the answer"],
        time: "O(n+m)",
        space: "O(n)",
      },
      {
        title: "Two-pointer switch",
        tier: "Optimal",
        idea: "Redirect each pointer to the other head at the end; they align after equalizing lengths.",
        steps: ["a=headA, b=headB", "Advance both; on null jump to the other head", "They meet at the intersection or both at null"],
        time: "O(n+m)",
        space: "O(1)",
      },
    ],
    dryRun: "lenA=2,lenB=3 before shared tail; after one switch the lead of 1 is cancelled → meet at first shared node",
    interviewTips: ["The pointer-switch trick equalizes lengths without counting — explain why distances become equal.", "Clarify intersection means same node identity, not equal value."],
    commonMistakes: ["Comparing values instead of node references.", "Infinite loop if you never let pointers reach null together."],
    followUps: ["What if a list has a cycle?", "Return the length of the common tail."],
    related: ["linked-list-cycle", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def get_intersection_node(headA, headB):
    a, b = headA, headB
    while a is not b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA, b = headB;
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function getIntersectionNode(headA, headB) {
  let a = headA, b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA, b = headB;
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }
}`,
      },
    ],
  },
  {
    slug: "copy-list-with-random-pointer",
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    patterns: ["hashing", "linked-list"],
    topics: ["Linked Lists", "Hashing"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "A linked list has a next pointer and a random pointer that can point to any node or null. Return a deep copy of the list.",
    beginnerExplanation:
      "The hard part is the random pointers — when you create a clone you may not have built the node it points to yet. Trick: first clone every node and remember original→clone in a map; then a second pass wires up next and random using that map.",
    realWorldAnalogy:
      "Photocopy every page first and keep a key matching each original page to its copy. Then redraw the cross-references on the copies using the key.",
    visualExplanation: "pass1: map[orig]=clone for all nodes\npass2: clone.next=map[orig.next]; clone.random=map[orig.random]",
    approaches: [
      {
        title: "Hash map original→clone",
        tier: "Optimal",
        idea: "Two passes with a map: create clones, then connect pointers.",
        steps: ["Pass 1: create clone for each node, store map[orig]=clone", "Pass 2: set clone.next and clone.random via the map", "Return map[head]"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Interleave clones (O(1) space)",
        tier: "Optimal",
        idea: "Weave each clone after its original, fix randoms, then unweave.",
        steps: ["Insert clone after each node", "clone.random = orig.random.next", "Split the two lists apart"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "node A random→C: clone A' , map[A]=A'; later A'.random = map[C] = C' ✓",
    interviewTips: ["State the map approach first (clear), then offer the O(1)-space interleaving as the optimization.", "Watch null randoms — map.get(null) must yield null."],
    commonMistakes: ["Copying next correctly but forgetting random.", "Crashing on null random pointers."],
    followUps: ["Do it with O(1) extra space.", "Generalize to a graph clone (see Clone Graph)."],
    related: ["clone-graph", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def copy_random_list(head):
    if not head:
        return None
    clones = {}
    cur = head
    while cur:
        clones[cur] = Node(cur.val)
        cur = cur.next
    cur = head
    while cur:
        clones[cur].next = clones.get(cur.next)
        clones[cur].random = clones.get(cur.random)
        cur = cur.next
    return clones[head]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        Map<Node, Node> clones = new HashMap<>();
        for (Node cur = head; cur != null; cur = cur.next)
            clones.put(cur, new Node(cur.val));
        for (Node cur = head; cur != null; cur = cur.next) {
            clones.get(cur).next = clones.get(cur.next);
            clones.get(cur).random = clones.get(cur.random);
        }
        return clones.get(head);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function copyRandomList(head) {
  if (!head) return null;
  const clones = new Map();
  for (let cur = head; cur; cur = cur.next) clones.set(cur, { val: cur.val, next: null, random: null });
  for (let cur = head; cur; cur = cur.next) {
    clones.get(cur).next = cur.next ? clones.get(cur.next) : null;
    clones.get(cur).random = cur.random ? clones.get(cur.random) : null;
  }
  return clones.get(head);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Node copyRandomList(Node head) {
        if (head == null) return null;
        Map<Node, Node> clones = new Map<Node, Node>();
        for (Node cur = head; cur != null; cur = cur.next)
            clones.put(cur, new Node(cur.val));
        for (Node cur = head; cur != null; cur = cur.next) {
            clones.get(cur).next = clones.get(cur.next);
            clones.get(cur).random = clones.get(cur.random);
        }
        return clones.get(head);
    }
}`,
      },
    ],
  },
  {
    slug: "binary-tree-inorder-traversal",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    patterns: ["trees", "stack"],
    topics: ["Trees", "Stacks"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement: "Given the root of a binary tree, return the in-order traversal (left, node, right) of its node values.",
    beginnerExplanation:
      "In-order means: fully explore the left subtree, then visit the node, then the right subtree. Recursion does this naturally; iteratively you push left nodes onto a stack, pop to visit, then move right.",
    realWorldAnalogy:
      "Reading a nested outline by always finishing every sub-bullet on the left before reading the heading, then moving to the right sub-bullets.",
    visualExplanation: "tree 2(1,3) → inorder 1,2,3",
    approaches: [
      {
        title: "Recursion",
        tier: "Brute Force",
        idea: "Recurse left, visit, recurse right.",
        steps: ["inorder(left)", "append node", "inorder(right)"],
        time: "O(n)",
        space: "O(h)",
      },
      {
        title: "Iterative with a stack",
        tier: "Optimal",
        idea: "Push all left nodes, pop to visit, then go right.",
        steps: ["Push left spine", "Pop node, record it, move to node.right", "Repeat until stack empty and node null"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "push 2,1; pop1 visit; pop2 visit, go to 3; push3; pop3 visit → [1,2,3]",
    interviewTips: ["Inorder of a BST yields sorted order — a frequent follow-up hook.", "Be ready to do it iteratively; interviewers often ban recursion."],
    commonMistakes: ["Visiting the node before exhausting the left subtree.", "Losing the right subtree after popping."],
    followUps: ["Morris traversal for O(1) space.", "Pre-order and post-order variants."],
    related: ["kth-smallest-element-in-a-bst", "validate-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def inorder_traversal(root):
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
        code: `function inorderTraversal(root) {
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
    public static List<Integer> inorderTraversal(TreeNode root) {
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
    slug: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["meta", "amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given the root of a binary tree, return the length of its diameter — the number of edges on the longest path between any two nodes (it need not pass through the root).",
    beginnerExplanation:
      "For every node, the longest path through it equals leftHeight + rightHeight. Compute heights with one DFS and, while doing so, keep the best left+right seen anywhere.",
    realWorldAnalogy:
      "The 'width' of a family tree: the longest chain of relatives connecting two people, which may dip down one branch and up another without touching the patriarch.",
    visualExplanation: "node with leftH=2,rightH=1 → path 3 edges through it; track global max",
    approaches: [
      {
        title: "Height at every node (O(n²))",
        tier: "Brute Force",
        idea: "For each node compute left/right height separately.",
        steps: ["For each node, recompute heights", "Track max left+right"],
        time: "O(n²)",
        space: "O(h)",
      },
      {
        title: "Single DFS returning height",
        tier: "Optimal",
        idea: "One post-order pass returns height and updates a global diameter.",
        steps: ["dfs returns height", "At each node update best = max(best, left+right)", "Return 1+max(left,right)"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "leaf→0; parent left=0,right=0 → diameter 0; root left=1,right=1 → 2",
    interviewTips: ["Diameter counts EDGES, not nodes — confirm the definition.", "The single-pass height trick generalizes to many tree DP problems."],
    commonMistakes: ["Returning the diameter from dfs instead of the height.", "Counting nodes when edges are required (off by one)."],
    followUps: ["Return the actual path.", "Weighted edges."],
    related: ["binary-tree-maximum-path-sum", "balanced-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def diameter_of_binary_tree(root):
    best = [0]
    def height(node):
        if not node:
            return 0
        l = height(node.left)
        r = height(node.right)
        best[0] = max(best[0], l + r)
        return 1 + max(l, r)
    height(root)
    return best[0]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int best = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return best;
    }
    private int height(TreeNode node) {
        if (node == null) return 0;
        int l = height(node.left), r = height(node.right);
        best = Math.max(best, l + r);
        return 1 + Math.max(l, r);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function diameterOfBinaryTree(root) {
  let best = 0;
  function height(node) {
    if (!node) return 0;
    const l = height(node.left), r = height(node.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  }
  height(root);
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Integer best = 0;
    public Integer diameterOfBinaryTree(TreeNode root) {
        height(root);
        return best;
    }
    private Integer height(TreeNode node) {
        if (node == null) return 0;
        Integer l = height(node.left), r = height(node.right);
        best = Math.max(best, l + r);
        return 1 + Math.max(l, r);
    }
}`,
      },
    ],
  },
  {
    slug: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given a binary tree, determine if it is height-balanced: every node's two subtrees differ in height by at most 1.",
    beginnerExplanation:
      "Compute heights bottom-up. The instant any node's children differ by more than 1, propagate a sentinel (-1) up so you can bail out early instead of rechecking.",
    realWorldAnalogy:
      "A mobile hanging from the ceiling stays level only if no arm hangs far lower than its sibling at every joint.",
    visualExplanation: "node with leftH=3,rightH=1 → |3-1|=2 >1 → not balanced",
    approaches: [
      {
        title: "Height check per node (O(n²))",
        tier: "Brute Force",
        idea: "For each node compute both subtree heights and compare.",
        steps: ["height(left), height(right) per node", "Check diff ≤ 1 everywhere"],
        time: "O(n²)",
        space: "O(h)",
      },
      {
        title: "DFS with -1 sentinel",
        tier: "Optimal",
        idea: "Return height, or -1 once imbalance is found, short-circuiting.",
        steps: ["dfs returns height or -1", "If a child is -1 or diff>1, return -1", "Balanced iff root dfs ≠ -1"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "leaf→1; parent 1,1→2; if other subtree height 0 vs 2 → diff>1 → -1 bubbles up",
    interviewTips: ["The -1 sentinel turns an O(n²) double-recursion into O(n) — call that out.", "Define 'balanced' precisely before coding."],
    commonMistakes: ["Recomputing heights repeatedly (quadratic).", "Off-by-one in the height base case."],
    followUps: ["Return how unbalanced (max diff).", "Self-balancing trees (AVL)."],
    related: ["diameter-of-binary-tree", "maximum-depth-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_balanced(root):
    def dfs(node):
        if not node:
            return 0
        l = dfs(node.left)
        if l == -1:
            return -1
        r = dfs(node.right)
        if r == -1 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)
    return dfs(root) != -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return dfs(root) != -1;
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int l = dfs(node.left);
        if (l == -1) return -1;
        int r = dfs(node.right);
        if (r == -1 || Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isBalanced(root) {
  function dfs(node) {
    if (!node) return 0;
    const l = dfs(node.left);
    if (l === -1) return -1;
    const r = dfs(node.right);
    if (r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  }
  return dfs(root) !== -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isBalanced(TreeNode root) {
        return dfs(root) != -1;
    }
    static Integer dfs(TreeNode node) {
        if (node == null) return 0;
        Integer l = dfs(node.left);
        if (l == -1) return -1;
        Integer r = dfs(node.right);
        if (r == -1 || Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
}`,
      },
    ],
  },
  {
    slug: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    patterns: ["trees", "graphs"],
    topics: ["Trees"],
    companies: ["meta", "amazon"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given the root of a binary tree, return the values of the nodes you can see ordered top to bottom when looking from the right side.",
    beginnerExplanation:
      "Do a level-order (BFS) traversal and take the last node on each level — that's the rightmost visible node. (Equivalently, a right-first DFS recording the first node seen at each new depth.)",
    realWorldAnalogy:
      "Standing to the right of a staircase-shaped hedge: at each height you only see the plant furthest to the right.",
    visualExplanation: "levels [1],[2,3],[4,5,6] → rightmost 1,3,6",
    approaches: [
      {
        title: "BFS, take last per level",
        tier: "Optimal",
        idea: "Standard level-order; the last dequeued node of each level is visible.",
        steps: ["Queue the root", "For each level, record the last node", "Enqueue children left→right"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Right-first DFS",
        tier: "Optimal",
        idea: "Visit right before left; the first node at each new depth is visible.",
        steps: ["dfs(node, depth)", "If depth == len(res), append node.val", "Recurse right then left"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "BFS level2=[2,3] → take 3; level3=[4,5,6] → take 6",
    interviewTips: ["Either BFS-last or right-first-DFS works — mention both.", "Left view is the symmetric variant (first per level)."],
    commonMistakes: ["Taking the first node per level (that's the left view).", "Enqueuing children in the wrong order."],
    followUps: ["Left side view.", "Top view / bottom view."],
    related: ["binary-tree-level-order-traversal", "maximum-depth-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def right_side_view(root):
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        size = len(q)
        for i in range(size):
            node = q.popleft()
            if i == size - 1:
                res.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (i == size - 1) res.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rightSideView(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const node = q.shift();
      if (i === size - 1) res.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new List<Integer>();
        if (root == null) return res;
        List<TreeNode> q = new List<TreeNode>{ root };
        while (!q.isEmpty()) {
            Integer size = q.size();
            List<TreeNode> next = new List<TreeNode>();
            for (Integer i = 0; i < size; i++) {
                TreeNode node = q[i];
                if (i == size - 1) res.add(node.val);
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            q = next;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "lowest-common-ancestor-of-a-binary-tree",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["meta", "amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given a binary tree and two nodes p and q, return their lowest common ancestor — the deepest node that has both as descendants (a node can be its own ancestor).",
    beginnerExplanation:
      "Recurse. If the current node is null or equals p or q, return it. Recurse left and right; if both sides return non-null, the current node is the split point — the LCA. Otherwise bubble up whichever side found something.",
    realWorldAnalogy:
      "Tracing two people back up a family tree to the closest shared ancestor — the first relative both lines pass through.",
    visualExplanation: "p in left subtree, q in right subtree of node X → X is the LCA",
    approaches: [
      {
        title: "Find both paths",
        tier: "Brute Force",
        idea: "Record root→p and root→q paths, compare for the last common node.",
        steps: ["Find path to p and to q", "Walk both paths; last equal node is LCA"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Single recursion",
        tier: "Optimal",
        idea: "Return p/q on match; the node where left and right both return non-null is the LCA.",
        steps: ["If node is null/p/q return node", "l = rec(left), r = rec(right)", "If both non-null return node, else the non-null one"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "node where left finds p and right finds q → returns itself as LCA",
    interviewTips: ["Clarify whether both nodes are guaranteed present.", "For a BST you can do better using ordering (separate problem)."],
    commonMistakes: ["Assuming BST ordering on a plain binary tree.", "Returning too early before checking both subtrees."],
    followUps: ["LCA in a BST (O(h) via values).", "LCA with parent pointers."],
    related: ["lowest-common-ancestor-of-a-bst", "same-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def lowest_common_ancestor(root, p, q):
    if root is None or root is p or root is q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    return left or right`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      },
    ],
  },
  {
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    patterns: ["trees", "hashing"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given preorder and inorder traversals of a binary tree with unique values, reconstruct and return the tree.",
    beginnerExplanation:
      "Preorder's first value is always the root. Find that value in inorder: everything to its left is the left subtree, everything right is the right subtree. Recurse, consuming preorder left to right. A value→index map on inorder makes the lookup O(1).",
    realWorldAnalogy:
      "Preorder tells you who's in charge first; inorder tells you who sits to their left vs right. Together you can rebuild the whole org chart.",
    visualExplanation: "pre=[3,9,20,15,7] in=[9,3,15,20,7]\nroot=3; left of 3 in inorder=[9]; right=[15,20,7]",
    approaches: [
      {
        title: "Recursion with inorder index map",
        tier: "Optimal",
        idea: "Root from preorder; split inorder at the root to size the subtrees.",
        steps: ["Map value→inorder index", "Track a moving preorder pointer", "Recurse build(l,r) on inorder bounds"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "pre ptr at 3 → root; build left over in[0..0]=9; build right over in[2..4]=15,20,7",
    interviewTips: ["The index map is what turns O(n²) into O(n) — mention it.", "Preorder pointer must advance globally, not per call."],
    commonMistakes: ["Re-scanning inorder for the root each time (quadratic).", "Wrong inorder bounds for the right subtree."],
    followUps: ["Build from inorder + postorder.", "Build from preorder + postorder (full trees only)."],
    related: ["binary-tree-inorder-traversal", "validate-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def build_tree(preorder, inorder):
    idx = {v: i for i, v in enumerate(inorder)}
    pre = [0]
    def build(lo, hi):
        if lo > hi:
            return None
        val = preorder[pre[0]]
        pre[0] += 1
        node = TreeNode(val)
        mid = idx[val]
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node
    return build(0, len(inorder) - 1)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int pre = 0;
    private Map<Integer, Integer> idx = new HashMap<>();
    private int[] preorder;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        this.preorder = preorder;
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(0, inorder.length - 1);
    }
    private TreeNode build(int lo, int hi) {
        if (lo > hi) return null;
        int val = preorder[pre++];
        TreeNode node = new TreeNode(val);
        int mid = idx.get(val);
        node.left = build(lo, mid - 1);
        node.right = build(mid + 1, hi);
        return node;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function buildTree(preorder, inorder) {
  const idx = new Map();
  inorder.forEach((v, i) => idx.set(v, i));
  let pre = 0;
  function build(lo, hi) {
    if (lo > hi) return null;
    const val = preorder[pre++];
    const node = { val, left: null, right: null };
    const mid = idx.get(val);
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  }
  return build(0, inorder.length - 1);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    Integer pre = 0;
    Map<Integer, Integer> idx = new Map<Integer, Integer>();
    List<Integer> preorder;
    public TreeNode buildTree(List<Integer> preorder, List<Integer> inorder) {
        this.preorder = preorder;
        for (Integer i = 0; i < inorder.size(); i++) idx.put(inorder[i], i);
        return build(0, inorder.size() - 1);
    }
    TreeNode build(Integer lo, Integer hi) {
        if (lo > hi) return null;
        Integer val = preorder[pre];
        pre++;
        TreeNode node = new TreeNode(val);
        Integer mid = idx.get(val);
        node.left = build(lo, mid - 1);
        node.right = build(mid + 1, hi);
        return node;
    }
}`,
      },
    ],
  },
  {
    slug: "kth-smallest-element-in-a-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    patterns: ["trees", "stack"],
    topics: ["Binary Search Trees", "Trees"],
    companies: ["amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement: "Given the root of a BST and an integer k, return the kth smallest value (1-indexed).",
    beginnerExplanation:
      "An in-order traversal of a BST visits values in sorted order. So do an in-order walk and stop at the kth value — no need to traverse the whole tree.",
    realWorldAnalogy:
      "Reading a sorted ledger from the top and stopping once you've counted k entries.",
    visualExplanation: "BST inorder = sorted; k=3 → third value visited",
    approaches: [
      {
        title: "Inorder collect then index",
        tier: "Better",
        idea: "Full inorder into a list, return list[k-1].",
        steps: ["Inorder traversal", "Return the (k-1)th element"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Iterative inorder, early stop",
        tier: "Optimal",
        idea: "Stack-based inorder; decrement k and stop at zero.",
        steps: ["Push left spine", "Pop, decrement k; if k==0 return val", "Go right"],
        time: "O(h+k)",
        space: "O(h)",
      },
    ],
    dryRun: "k=2: visit smallest (k→1), visit next (k→0) → return it",
    interviewTips: ["Lean on the BST inorder = sorted property explicitly.", "Early-stop gives O(h+k), better than O(n) for small k."],
    commonMistakes: ["Forgetting 1-indexing.", "Traversing the entire tree when you can stop early."],
    followUps: ["Kth largest (reverse inorder).", "Frequent queries → augment nodes with subtree sizes."],
    related: ["binary-tree-inorder-traversal", "validate-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def kth_smallest(root, k):
    stack, cur = [], root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        k -= 1
        if k == 0:
            return cur.val
        cur = cur.right
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) { stack.push(cur); cur = cur.left; }
            cur = stack.pop();
            if (--k == 0) return cur.val;
            cur = cur.right;
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function kthSmallest(root, k) {
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer kthSmallest(TreeNode root, Integer k) {
        List<TreeNode> stack = new List<TreeNode>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) { stack.add(cur); cur = cur.left; }
            cur = stack.remove(stack.size() - 1);
            k--;
            if (k == 0) return cur.val;
            cur = cur.right;
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    patterns: ["trees", "dynamic-programming"],
    topics: ["Trees"],
    companies: ["meta", "amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given a binary tree, return the maximum path sum of any non-empty path. A path follows parent-child connections and need not pass through the root.",
    beginnerExplanation:
      "At each node, the best 'downward gain' you can hand to a parent is the node's value plus the larger of its two child gains (ignoring negatives by clamping at 0). But the best path THROUGH a node is node + leftGain + rightGain — track that as a global maximum.",
    realWorldAnalogy:
      "Hiking ridgelines: from any peak you can extend down one side to your parent, but the most scenic single hike might go down both sides of a peak without ever reaching the summit you started from.",
    visualExplanation: "node 2 with leftGain 1, rightGain 3 → through = 2+1+3=6; return up 2+max(1,3)=5",
    approaches: [
      {
        title: "DFS gain with clamping",
        tier: "Optimal",
        idea: "Post-order: each node returns its best single-branch gain; update a global best with the through-node sum.",
        steps: ["gain(node): l=max(gain(left),0), r=max(gain(right),0)", "best = max(best, node.val+l+r)", "return node.val+max(l,r)"],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "negatives clamped to 0; best updated with node+l+r at every node; answer = global best",
    interviewTips: ["Clamping negative child gains to 0 is the key insight — explain it.", "Distinguish 'gain to return upward' from 'best path through node'."],
    commonMistakes: ["Returning node.val+l+r upward (a parent can't use a fork).", "Not handling all-negative trees (don't clamp the node's own value)."],
    followUps: ["Return the path itself.", "Path sum equal to a target (different problem)."],
    related: ["diameter-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_path_sum(root):
    best = [float("-inf")]
    def gain(node):
        if not node:
            return 0
        l = max(gain(node.left), 0)
        r = max(gain(node.right), 0)
        best[0] = max(best[0], node.val + l + r)
        return node.val + max(l, r)
    gain(root)
    return best[0]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int best = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        gain(root);
        return best;
    }
    private int gain(TreeNode node) {
        if (node == null) return 0;
        int l = Math.max(gain(node.left), 0);
        int r = Math.max(gain(node.right), 0);
        best = Math.max(best, node.val + l + r);
        return node.val + Math.max(l, r);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxPathSum(root) {
  let best = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const l = Math.max(gain(node.left), 0);
    const r = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + l + r);
    return node.val + Math.max(l, r);
  }
  gain(root);
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Integer best;
    public Integer maxPathSum(TreeNode root) {
        best = -2147483648;
        gain(root);
        return best;
    }
    Integer gain(TreeNode node) {
        if (node == null) return 0;
        Integer l = Math.max(gain(node.left), 0);
        Integer r = Math.max(gain(node.right), 0);
        best = Math.max(best, node.val + l + r);
        return node.val + Math.max(l, r);
    }
}`,
      },
    ],
  },
  {
    slug: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given the roots of two trees root and subRoot, return true if subRoot is a subtree of root (a node of root and all its descendants match subRoot exactly).",
    beginnerExplanation:
      "Walk every node of the big tree; at each one, check whether the subtree rooted there is identical to subRoot using a same-tree comparison.",
    realWorldAnalogy:
      "Searching a big org chart for a specific sub-team — at each manager you check if the team hanging off them matches the team you're looking for, person for person.",
    visualExplanation: "for each node in root: sameTree(node, subRoot)? → true if any match",
    approaches: [
      {
        title: "DFS + same-tree check",
        tier: "Optimal",
        idea: "At each node of root, run an identical-tree test against subRoot.",
        steps: ["traverse root", "if sameTree(node, subRoot) return true", "else recurse children"],
        time: "O(n·m)",
        space: "O(h)",
      },
      {
        title: "Serialize + substring",
        tier: "Optimal",
        idea: "Serialize both trees with null markers; check substring containment.",
        steps: ["Serialize with sentinels", "subRoot string is a substring of root string"],
        time: "O(n+m)",
        space: "O(n+m)",
      },
    ],
    dryRun: "node equals subRoot value and both subtrees match recursively → true",
    interviewTips: ["Reuse your Same Tree routine — composition impresses.", "Mention the serialization trick for linear time."],
    commonMistakes: ["Matching values but not full structure.", "Forgetting both-null vs one-null in the same-tree base case."],
    followUps: ["Count occurrences of the subtree.", "Largest common subtree."],
    related: ["same-tree", "symmetric-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_subtree(root, sub_root):
    def same(a, b):
        if not a and not b:
            return True
        if not a or not b or a.val != b.val:
            return False
        return same(a.left, b.left) and same(a.right, b.right)
    if not root:
        return sub_root is None
    if same(root, sub_root):
        return True
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return subRoot == null;
        if (same(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    private boolean same(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return same(a.left, b.left) && same(a.right, b.right);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isSubtree(root, subRoot) {
  function same(a, b) {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  }
  if (!root) return subRoot === null;
  if (same(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return subRoot == null;
        if (same(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    static Boolean same(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return same(a.left, b.left) && same(a.right, b.right);
    }
}`,
      },
    ],
  },
  {
    slug: "symmetric-tree",
    title: "Symmetric Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement: "Given the root of a binary tree, return true if it is a mirror of itself around its center.",
    beginnerExplanation:
      "Compare two pointers walking the tree in mirror image: the left child of one against the right child of the other. Values must match and the outer/inner pairs must themselves be mirrors.",
    realWorldAnalogy:
      "Holding a mirror down the middle of a butterfly — the left wing must reflect onto the right exactly.",
    visualExplanation: "1(2,2(left=3,right=4),(left=4,right=3)) → compare 2.left(3) vs 2.right(3)? mirror check",
    approaches: [
      {
        title: "Mirror recursion",
        tier: "Optimal",
        idea: "Check (a.left, b.right) and (a.right, b.left) recursively.",
        steps: ["mirror(a,b): both null → true", "values equal AND mirror(a.left,b.right) AND mirror(a.right,b.left)"],
        time: "O(n)",
        space: "O(h)",
      },
      {
        title: "Iterative with a queue",
        tier: "Optimal",
        idea: "Enqueue mirror pairs and validate each.",
        steps: ["Queue (root.left, root.right)", "Pop pairs, compare, enqueue mirrored children"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "compare left.left with right.right and left.right with right.left → all equal → symmetric",
    interviewTips: ["It's Same Tree with the comparison flipped — connect the two.", "Offer the iterative version if recursion is discouraged."],
    commonMistakes: ["Comparing left-with-left instead of left-with-right.", "Missing the both-null base case."],
    followUps: ["Iterative solution.", "Check if a tree is a mirror of a second tree."],
    related: ["same-tree", "invert-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_symmetric(root):
    def mirror(a, b):
        if not a and not b:
            return True
        if not a or not b or a.val != b.val:
            return False
        return mirror(a.left, b.right) and mirror(a.right, b.left)
    return mirror(root.left, root.right) if root else True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || mirror(root.left, root.right);
    }
    private boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isSymmetric(root) {
  function mirror(a, b) {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
  }
  return !root || mirror(root.left, root.right);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isSymmetric(TreeNode root) {
        return root == null || mirror(root.left, root.right);
    }
    static Boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }
}`,
      },
    ],
  },
];

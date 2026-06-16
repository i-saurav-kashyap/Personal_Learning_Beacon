import type { Language } from "@/lib/types";

// ---------------------------------------------------------------------------
// "Concept" lessons — for course steps that teach an idea rather than pose a
// solvable problem (e.g. "Introduction to Trees"). Each has a plain-English
// explanation, an analogy, a visual, starter code, key points, and links into
// real problems to practice next.
// ---------------------------------------------------------------------------

export interface Concept {
  slug: string;
  title: string;
  group: string;
  icon: string;
  tagline: string;
  explanation: string;
  analogy: string;
  visual: string;
  code?: { language: Language; snippet: string };
  keyPoints: string[];
  related: string[]; // problem slugs to practice next
  /** A2Z course titles this lesson satisfies (for course deep-linking). */
  courseTitles: string[];
}

export const CONCEPTS: Concept[] = [
  {
    slug: "introduction-to-linked-list",
    title: "Introduction to Linked Lists",
    group: "Linked List",
    icon: "🔗",
    tagline: "Nodes connected by pointers — a list that grows without shifting.",
    explanation:
      "A linked list stores each value in a node that also holds a reference (pointer) to the next node. Unlike an array, the nodes are not contiguous in memory, so inserting or deleting at the front is O(1) — you just rewire a pointer instead of shifting elements. The trade-off is no O(1) random access: to reach the k-th node you must walk from the head.",
    analogy:
      "A treasure hunt: each clue (node) holds a prize (value) and tells you where the next clue is (the next pointer). You can only follow the trail in order — but inserting a new clue mid-trail just means re-pointing two arrows.",
    visual: "head → [10|•] → [20|•] → [30|•] → null",
    code: {
      language: "Python",
      snippet: `class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# build 10 -> 20 -> 30
head = ListNode(10, ListNode(20, ListNode(30)))

# traverse
node = head
while node:
    print(node.val)
    node = node.next`,
    },
    keyPoints: [
      "Node = value + pointer to the next node; the list is found via its head.",
      "Insert/delete at head is O(1); random access is O(n).",
      "A null next marks the end — always guard against null when traversing.",
    ],
    related: ["reverse-linked-list", "middle-of-the-linked-list", "linked-list-cycle"],
    courseTitles: ["Intro to linked list", "Introduction to linked list"],
  },
  {
    slug: "introduction-to-doubly-linked-list",
    title: "Introduction to Doubly Linked Lists",
    group: "Linked List",
    icon: "↔️",
    tagline: "Each node points both ways — walk forward and backward.",
    explanation:
      "A doubly linked list (DLL) adds a `prev` pointer to every node, so you can traverse in both directions and delete a node in O(1) when you already hold a reference to it (no need to track the predecessor). The cost is an extra pointer per node and more rewiring on insert/delete.",
    analogy:
      "A conga line where everyone holds the shoulder of the person in front AND behind — so anyone can leave and the two neighbours just join hands directly.",
    visual: "null ← [10] ⇄ [20] ⇄ [30] → null",
    code: {
      language: "Python",
      snippet: `class DNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

# delete node x in O(1) when you hold x
def delete(x):
    if x.prev: x.prev.next = x.next
    if x.next: x.next.prev = x.prev`,
    },
    keyPoints: [
      "Two pointers per node: prev and next.",
      "O(1) deletion given the node itself — the basis of LRU caches.",
      "Bidirectional traversal at the cost of extra memory and bookkeeping.",
    ],
    related: ["reverse-a-doubly-linked-list", "lru-cache", "pairs-with-given-sum-in-doubly-linked-list"],
    courseTitles: ["Introduction to Double LL", "Intro to Doubly Linked List"],
  },
  {
    slug: "introduction-to-trees",
    title: "Introduction to Trees",
    group: "Trees",
    icon: "🌳",
    tagline: "A hierarchy of nodes — one root, no cycles.",
    explanation:
      "A tree is a connected, acyclic structure where each node has one parent (except the root) and zero or more children. A binary tree restricts each node to at most two children (left and right). Trees model hierarchy (file systems, org charts, the DOM) and are the backbone of search structures, heaps and tries. Depth = distance from the root; height = longest path to a leaf.",
    analogy:
      "A family tree turned upside-down: the root is the ancestor at the top, branches fan downward to children, and leaves are the descendants with no children of their own.",
    visual: "        1\n      /   \\\n     2     3\n    / \\\n   4   5",
    code: {
      language: "Python",
      snippet: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#        1
#       / \\
#      2   3
root = TreeNode(1, TreeNode(2), TreeNode(3))`,
    },
    keyPoints: [
      "Root has no parent; leaves have no children; every other node has exactly one parent.",
      "Binary tree = ≤ 2 children per node (left, right).",
      "Most tree problems are a traversal (DFS or BFS) in disguise.",
    ],
    related: ["maximum-depth-of-binary-tree", "binary-tree-level-order-traversal", "diameter-of-binary-tree"],
    courseTitles: ["Introduction to trees", "Intro to trees"],
  },
  {
    slug: "binary-tree-representation",
    title: "Binary Tree Representation",
    group: "Trees",
    icon: "🧱",
    tagline: "How a tree lives in memory: linked nodes vs. an array.",
    explanation:
      "Two common representations. (1) Linked nodes: each node object holds a value plus left/right references — flexible and the default for most problems. (2) Array form: store the tree level by level; for a node at index i, its children are at 2i+1 and 2i+2 and its parent at (i-1)/2. The array form is compact for complete trees and is exactly how a binary heap is stored.",
    analogy:
      "Linked nodes are like sticky notes connected by strings; the array form is like numbering every seat in an auditorium row by row so you can find anyone's neighbours by arithmetic.",
    visual:
      "tree:        1\n           /   \\\n          2     3\n         / \\\narray:  [1, 2, 3, 4, 5]\nindex i → left 2i+1, right 2i+2, parent (i-1)/2",
    code: {
      language: "JavaScript",
      snippet: `// array representation: children of i are 2i+1, 2i+2
const tree = [1, 2, 3, 4, 5];
const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;
const parent = (i) => (i - 1) >> 1;`,
    },
    keyPoints: [
      "Linked representation: flexible, pointer-based, used in nearly all tree problems.",
      "Array representation: index math (2i+1 / 2i+2) — the storage behind heaps.",
      "Array form wastes space for sparse/skewed trees but is perfect for complete ones.",
    ],
    related: ["implement-min-heap", "binary-tree-level-order-traversal", "count-complete-tree-nodes"],
    courseTitles: ["Binary Tree representation", "Binary Tree Representation"],
  },
  {
    slug: "introduction-to-binary-search-tree",
    title: "Introduction to Binary Search Trees",
    group: "Binary Search Trees",
    icon: "🔎",
    tagline: "An ordered binary tree: left < node < right, everywhere.",
    explanation:
      "A Binary Search Tree (BST) is a binary tree with an ordering invariant: every value in a node's left subtree is smaller, and every value in its right subtree is larger. That invariant lets you search, insert and delete in O(h) time, where h is the height — O(log n) when balanced, but O(n) if the tree degenerates into a chain. An in-order traversal of a BST visits values in sorted order.",
    analogy:
      "A well-organised library where, at every shelf, everything to the left has a smaller call number and everything to the right is larger — so you binary-search your way to any book.",
    visual: "        8\n      /   \\\n     3     10\n    / \\      \\\n   1   6      14",
    code: {
      language: "Python",
      snippet: `def search(root, target):
    while root:
        if target == root.val: return root
        root = root.left if target < root.val else root.right
    return None  # O(h): O(log n) balanced, O(n) skewed`,
    },
    keyPoints: [
      "Invariant: left subtree < node < right subtree (recursively).",
      "Search / insert / delete are O(h); balance keeps h ≈ log n.",
      "In-order traversal yields sorted output — a frequent trick.",
    ],
    related: ["search-in-a-binary-search-tree", "validate-binary-search-tree", "kth-smallest-element-in-a-bst"],
    courseTitles: ["Intro to BST", "Introduction to BST"],
  },
  {
    slug: "graph-representation",
    title: "Graphs & How to Represent Them",
    group: "Graphs",
    icon: "🕸️",
    tagline: "Nodes and edges — and the two ways to store them in code.",
    explanation:
      "A graph is a set of vertices connected by edges; edges may be directed or undirected, weighted or unweighted. Two storage forms dominate. (1) Adjacency list: an array/map where index u holds the list of u's neighbours — O(V+E) space, ideal for sparse graphs and almost every interview problem. (2) Adjacency matrix: a V×V grid where cell [u][v] marks an edge — O(V²) space, O(1) edge lookup. The number of labelled simple undirected graphs on n vertices is 2^(n(n−1)/2), since each possible edge is independently present or absent.",
    analogy:
      "A city map: intersections are vertices, roads are edges. An adjacency list is each intersection's little signpost of where you can drive next; an adjacency matrix is a giant grid table marking every pair 'connected or not'.",
    visual:
      "edges: A–B, A–C, B–D\n\nadjacency list:        adjacency matrix:\nA: [B, C]                 A B C D\nB: [A, D]              A [0 1 1 0]\nC: [A]                 B [1 0 0 1]\nD: [B]                 C [1 0 0 0]\n                       D [0 1 0 0]",
    code: {
      language: "Python",
      snippet: `from collections import defaultdict
adj = defaultdict(list)
for u, v in [("A","B"), ("A","C"), ("B","D")]:
    adj[u].append(v)
    adj[v].append(u)   # undirected: add both directions`,
    },
    keyPoints: [
      "Adjacency list: O(V+E) space — the default for sparse graphs.",
      "Adjacency matrix: O(V²) space, O(1) edge lookup — good for dense graphs.",
      "Directed vs undirected, weighted vs unweighted change how you build edges.",
    ],
    related: ["bfs-of-graph", "dfs-of-graph", "number-of-provinces"],
    courseTitles: ["Graph Representation", "Count the number of graphs", "Graph and its representation"],
  },
  {
    slug: "bit-manipulation-basics",
    title: "Bit Manipulation Basics",
    group: "Bit Manipulation",
    icon: "🔢",
    tagline: "Operate directly on the binary bits of a number.",
    explanation:
      "Every integer is a string of bits; bitwise operators let you read and flip them in O(1). The core toolkit: AND (&) masks bits, OR (|) sets bits, XOR (^) flips/compares bits, NOT (~) inverts, and shifts (<<, >>) multiply or divide by powers of two. Handy idioms: `x & 1` tests odd/even, `x & (x-1)` clears the lowest set bit (and counts set bits), `x & -x` isolates the lowest set bit, and `1 << k` builds a mask for bit k.",
    analogy:
      "A row of light switches. AND/OR/XOR are ways of combining two switch-rows; shifting is sliding the whole row left or right; masking is using a stencil to touch only the switches you care about.",
    visual:
      "  5 = 0101\n  3 = 0011\n  & = 0001 (1)\n  | = 0111 (7)\n  ^ = 0110 (6)\n5<<1 = 1010 (10)   5>>1 = 0010 (2)",
    code: {
      language: "JavaScript",
      snippet: `const isOdd  = (x) => (x & 1) === 1;
const isPow2 = (x) => x > 0 && (x & (x - 1)) === 0;
const setBit = (x, k) => x | (1 << k);
const clearLowest = (x) => x & (x - 1);   // also: popcount loop`,
    },
    keyPoints: [
      "& masks, | sets, ^ flips/compares, ~ inverts, <<,>> shift (×/÷ by 2^k).",
      "x & (x-1) clears the lowest set bit; x & -x isolates it.",
      "XOR is self-inverse (a^a=0) — the key to many 'find the unique' tricks.",
    ],
    related: ["single-number", "number-of-1-bits", "check-if-a-number-is-a-power-of-two"],
    courseTitles: ["Bit Manipulation", "Bitwise basic operations", "Introduction to bit manipulation"],
  },
];

export const CONCEPT_MAP: Record<string, Concept> = Object.fromEntries(
  CONCEPTS.map((c) => [c.slug, c]),
);

export function getConcept(slug: string): Concept | undefined {
  return CONCEPT_MAP[slug];
}

// Resolve a course problem title to a concept lesson (when it's a teaching topic).
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const TITLE_TO_CONCEPT = new Map<string, string>();
for (const c of CONCEPTS) {
  TITLE_TO_CONCEPT.set(norm(c.title), c.slug);
  for (const t of c.courseTitles) TITLE_TO_CONCEPT.set(norm(t), c.slug);
}

export function conceptSlugForTitle(title: string): string | undefined {
  return TITLE_TO_CONCEPT.get(norm(title));
}

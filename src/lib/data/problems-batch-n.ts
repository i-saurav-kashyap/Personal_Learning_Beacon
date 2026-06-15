import type { Problem } from "@/lib/types";

// Striver A2Z linked-list gaps. Solutions assume a singly ListNode with
// `val` + `next` (as the existing linked-list entries do); the Flatten problem
// uses a node with an extra `bottom` pointer, defined in its snippets.

export const PROBLEMS_BATCH_N: Problem[] = [
  {
    slug: "sort-list",
    title: "Sort List",
    difficulty: "Medium",
    patterns: ["linked-list", "fast-slow-pointers"],
    topics: ["Linked Lists", "Sorting"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given the head of a linked list, sort it in ascending order and return the sorted list. Aim for O(n log n) time and O(1) auxiliary space (besides recursion).",
    beginnerExplanation:
      "Merge sort fits a linked list perfectly: split the list in half using a slow/fast pointer, recursively sort each half, then merge the two sorted halves by repeatedly picking the smaller head. No random access needed, so it beats quicksort here.",
    realWorldAnalogy:
      "Splitting a deck of cards in two, having two people each sort their half, then interleaving the two sorted piles into one ordered stack.",
    visualExplanation:
      "4→2→1→3\nsplit → (4→2) (1→3)\nsort → (2→4) (1→3)\nmerge → 1→2→3→4",
    approaches: [
      {
        title: "Copy to array, sort, rebuild",
        tier: "Brute Force",
        idea: "Dump values into an array, sort it, write values back.",
        steps: ["Collect values", "Sort array", "Overwrite node values in order"],
        time: "O(n log n)",
        space: "O(n)",
      },
      {
        title: "Top-down merge sort",
        tier: "Optimal",
        idea: "Find the middle with slow/fast, sort each half recursively, merge.",
        steps: [
          "Split at the middle (slow/fast)",
          "Recursively sort left and right",
          "Merge two sorted lists with a dummy head",
        ],
        time: "O(n log n)",
        space: "O(log n) recursion",
      },
    ],
    dryRun:
      "list 3→1→2\nmid split → (3) (1→2)\nright: (1) (2) → merge → 1→2\nmerge (3) and (1→2) → 1→2→3",
    interviewTips: [
      "Say 'merge sort, because linked lists have no O(1) random access for quicksort partitioning'.",
      "Be careful to cut the list at the middle (set slow.next = null) before recursing.",
    ],
    commonMistakes: [
      "Not severing the first half (infinite recursion).",
      "Using slow=head, fast=head — start fast at head.next so a 2-node list splits evenly.",
    ],
    followUps: ["Sort in O(1) space with bottom-up merge sort.", "Sort a doubly linked list."],
    related: ["merge-two-sorted-lists", "insertion-sort-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def sort_list(head):
    if not head or not head.next:
        return head
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = None
    left = sort_list(head)
    right = sort_list(mid)
    dummy = tail = ListNode(0)
    while left and right:
        if left.val <= right.val:
            tail.next = left
            left = left.next
        else:
            tail.next = right
            right = right.next
        tail = tail.next
    tail.next = left or right
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode mid = slow.next;
        slow.next = null;
        ListNode left = sortList(head), right = sortList(mid);
        ListNode dummy = new ListNode(0), tail = dummy;
        while (left != null && right != null) {
            if (left.val <= right.val) { tail.next = left; left = left.next; }
            else { tail.next = right; right = right.next; }
            tail = tail.next;
        }
        tail.next = (left != null) ? left : right;
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function sortList(head) {
  if (!head || !head.next) return head;
  let slow = head, fast = head.next;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  const mid = slow.next;
  slow.next = null;
  let left = sortList(head), right = sortList(mid);
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (left && right) {
    if (left.val <= right.val) { tail.next = left; left = left.next; }
    else { tail.next = right; right = right.next; }
    tail = tail.next;
  }
  tail.next = left || right;
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode mid = slow.next;
        slow.next = null;
        ListNode left = sortList(head), right = sortList(mid);
        ListNode dummy = new ListNode(0), tail = dummy;
        while (left != null && right != null) {
            if (left.val <= right.val) { tail.next = left; left = left.next; }
            else { tail.next = right; right = right.next; }
            tail = tail.next;
        }
        tail.next = (left != null) ? left : right;
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "sort-linked-list-of-0s-1s-and-2s",
    title: "Sort Linked List of 0s 1s and 2s",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists", "Sorting"],
    companies: ["amazon", "microsoft", "salesforce"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the head of a linked list whose node values are only 0, 1 or 2, sort it so all 0s come first, then 1s, then 2s. Prefer a single pass that re-links nodes (no value swapping).",
    beginnerExplanation:
      "Keep three separate little lists — one for 0s, one for 1s, one for 2s. Walk the list once, appending each node to the list matching its value. Finally stitch the three lists together: zeros → ones → twos.",
    realWorldAnalogy:
      "Sorting laundry into three baskets (whites, colours, darks) as you pull items out, then stacking the baskets in a fixed order.",
    visualExplanation:
      "1→2→0→1→2→0\nzeros: 0→0  ones: 1→1  twos: 2→2\njoin → 0→0→1→1→2→2",
    approaches: [
      {
        title: "Count and overwrite",
        tier: "Better",
        idea: "Count how many 0s/1s/2s, then rewrite node values.",
        steps: ["First pass counts each value", "Second pass writes 0s then 1s then 2s"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Three dummy lists, re-link",
        tier: "Optimal",
        idea: "Append each node to its value's list, then concatenate. Keeps node identity (no value mutation).",
        steps: [
          "Create dummy heads for 0, 1, 2",
          "Traverse, appending each node to its bucket",
          "Connect zero→one→two, terminate with null",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "2→0→1\nzeros:0 ones:1 twos:2\njoin: zeroD.next=0; 0.next=oneD.next=1; 1.next=twoD.next=2; 2.next=null → 0→1→2",
    interviewTips: [
      "Re-linking (not value-swapping) is what interviewers want — mention it preserves node objects.",
      "Handle empty buckets when concatenating (a list might have no 1s).",
    ],
    commonMistakes: [
      "Forgetting to null-terminate the 2s list → cycle.",
      "Mishandling the join when the 1s bucket is empty (connect 0s directly to 2s).",
    ],
    followUps: ["Generalise to k distinct values.", "Do it with the Dutch National Flag idea on an array."],
    related: ["sort-list", "sort-colors"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def sort_012_list(head):
    zeroD = zero = ListNode(0)
    oneD = one = ListNode(0)
    twoD = two = ListNode(0)
    cur = head
    while cur:
        if cur.val == 0:
            zero.next = cur; zero = zero.next
        elif cur.val == 1:
            one.next = cur; one = one.next
        else:
            two.next = cur; two = two.next
        cur = cur.next
    two.next = None
    one.next = twoD.next
    zero.next = oneD.next if oneD.next else twoD.next
    return zeroD.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode sortList012(ListNode head) {
        ListNode zeroD = new ListNode(0), zero = zeroD;
        ListNode oneD = new ListNode(0), one = oneD;
        ListNode twoD = new ListNode(0), two = twoD;
        ListNode cur = head;
        while (cur != null) {
            if (cur.val == 0) { zero.next = cur; zero = zero.next; }
            else if (cur.val == 1) { one.next = cur; one = one.next; }
            else { two.next = cur; two = two.next; }
            cur = cur.next;
        }
        two.next = null;
        one.next = twoD.next;
        zero.next = (oneD.next != null) ? oneD.next : twoD.next;
        return zeroD.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function sortList012(head) {
  const zeroD = { val: 0, next: null }; let zero = zeroD;
  const oneD = { val: 0, next: null }; let one = oneD;
  const twoD = { val: 0, next: null }; let two = twoD;
  let cur = head;
  while (cur) {
    if (cur.val === 0) { zero.next = cur; zero = zero.next; }
    else if (cur.val === 1) { one.next = cur; one = one.next; }
    else { two.next = cur; two = two.next; }
    cur = cur.next;
  }
  two.next = null;
  one.next = twoD.next;
  zero.next = oneD.next ? oneD.next : twoD.next;
  return zeroD.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode sortList012(ListNode head) {
        ListNode zeroD = new ListNode(0), zero = zeroD;
        ListNode oneD = new ListNode(0), one = oneD;
        ListNode twoD = new ListNode(0), two = twoD;
        ListNode cur = head;
        while (cur != null) {
            if (cur.val == 0) { zero.next = cur; zero = zero.next; }
            else if (cur.val == 1) { one.next = cur; one = one.next; }
            else { two.next = cur; two = two.next; }
            cur = cur.next;
        }
        two.next = null;
        one.next = twoD.next;
        zero.next = (oneD.next != null) ? oneD.next : twoD.next;
        return zeroD.next;
    }
}`,
      },
    ],
  },
  {
    slug: "odd-even-linked-list",
    title: "Odd Even Linked List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Group all the odd-indexed nodes together followed by the even-indexed nodes (1st, 3rd, … then 2nd, 4th, …), preserving relative order, using O(1) space and O(n) time.",
    beginnerExplanation:
      "Weave two chains as you walk: an 'odd' chain (positions 1,3,5…) and an 'even' chain (2,4,6…). Each odd node points to the node two ahead. At the end, attach the head of the even chain after the tail of the odd chain.",
    realWorldAnalogy:
      "Splitting a parade into 'odd-numbered floats' and 'even-numbered floats', then sending all odd floats through first and the even ones right behind.",
    visualExplanation:
      "1→2→3→4→5\nodd:1→3→5  even:2→4\njoin → 1→3→5→2→4",
    approaches: [
      {
        title: "Two passes with extra lists",
        tier: "Better",
        idea: "Build an odd list and an even list separately, then join.",
        steps: ["Collect odd-position nodes", "Collect even-position nodes", "Concatenate"],
        time: "O(n)",
        space: "O(1) (re-links) ",
      },
      {
        title: "In-place pointer weaving",
        tier: "Optimal",
        idea: "Maintain odd and even tails; advance both by hopping over each other.",
        steps: [
          "odd=head, even=head.next, evenHead=even",
          "While even and even.next: odd.next=even.next; odd=odd.next; even.next=odd.next; even=even.next",
          "odd.next = evenHead",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1→2→3→4\nodd1 even2 evenHead2\nodd.next=3 odd=3; even.next=4 even=4\neven.next null stop\nodd(3).next=evenHead(2) → 1→3→2→4",
    interviewTips: [
      "Clarify it's by INDEX (position), not by node value.",
      "Save evenHead before you start rewiring — you need it to reconnect.",
    ],
    commonMistakes: [
      "Losing evenHead.",
      "Loop condition: must check both `even` and `even.next` to avoid null deref.",
    ],
    followUps: ["Group by value parity instead of index.", "Do the same for a doubly linked list."],
    related: ["partition-list", "reorder-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def odd_even_list(head):
    if not head or not head.next:
        return head
    odd = head
    even = head.next
    even_head = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = even_head
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function oddEvenList(head) {
  if (!head || !head.next) return head;
  let odd = head, even = head.next;
  const evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "rotate-list",
    title: "Rotate List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the head of a linked list, rotate the list to the right by k places. k can be larger than the list length.",
    beginnerExplanation:
      "Rotating right by k means the last k nodes move to the front. Find the length n, reduce k to k % n, then the new tail is the node at position n−k; everything after it becomes the new front. Closing the list into a ring first makes the re-cut clean.",
    realWorldAnalogy:
      "A circular conveyor belt: instead of physically moving every item, you just pick a new starting point on the loop and cut there.",
    visualExplanation:
      "1→2→3→4→5, k=2\nn=5, k=2, newTail at pos 3 (node 3)\nnewHead=4 → 4→5→1→2→3",
    approaches: [
      {
        title: "Rotate one step k times",
        tier: "Brute Force",
        idea: "Move the last node to the front, repeated k times.",
        steps: ["Find tail and second-last", "Move tail to head", "Repeat k%n times"],
        time: "O(n·k)",
        space: "O(1)",
      },
      {
        title: "Close into a ring, cut",
        tier: "Optimal",
        idea: "Connect tail to head, walk n−k%n steps to the new tail, break the ring there.",
        steps: [
          "Count length n and find tail",
          "k %= n; if 0 return head",
          "tail.next = head (ring); step n−k from head to new tail; newHead = newTail.next; newTail.next = null",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1→2→3, k=4 → k%3=1\nring 1→2→3→1; steps=n-k=2; newTail=node2; newHead=3; cut → 3→1→2",
    interviewTips: [
      "Always reduce k with k % n first — k can exceed n.",
      "Building the temporary ring avoids tracking two pointers manually.",
    ],
    commonMistakes: [
      "Not taking k % n (TLE / wrong answer for large k).",
      "Forgetting to break the ring (cycle in the result).",
    ],
    followUps: ["Rotate left by k.", "Rotate a doubly linked list."],
    related: ["reverse-linked-list", "reorder-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rotate_right(head, k):
    if not head or not head.next or k == 0:
        return head
    n = 1
    tail = head
    while tail.next:
        tail = tail.next
        n += 1
    k %= n
    if k == 0:
        return head
    tail.next = head
    steps = n - k
    new_tail = head
    for _ in range(steps - 1):
        new_tail = new_tail.next
    new_head = new_tail.next
    new_tail.next = None
    return new_head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        int n = 1;
        ListNode tail = head;
        while (tail.next != null) { tail = tail.next; n++; }
        k %= n;
        if (k == 0) return head;
        tail.next = head;
        int steps = n - k;
        ListNode newTail = head;
        for (int i = 0; i < steps - 1; i++) newTail = newTail.next;
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;
  let n = 1, tail = head;
  while (tail.next) { tail = tail.next; n++; }
  k %= n;
  if (k === 0) return head;
  tail.next = head;
  let newTail = head;
  for (let i = 0; i < n - k - 1; i++) newTail = newTail.next;
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode rotateRight(ListNode head, Integer k) {
        if (head == null || head.next == null || k == 0) return head;
        Integer n = 1;
        ListNode tail = head;
        while (tail.next != null) { tail = tail.next; n++; }
        k = Math.mod(k, n);
        if (k == 0) return head;
        tail.next = head;
        ListNode newTail = head;
        for (Integer i = 0; i < n - k - 1; i++) newTail = newTail.next;
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }
}`,
      },
    ],
  },
  {
    slug: "partition-list",
    title: "Partition List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the head of a linked list and a value x, reorder it so all nodes < x come before all nodes ≥ x, preserving the original relative order within each group.",
    beginnerExplanation:
      "Build two chains while you walk once: a 'less' chain for nodes below x and a 'greater-or-equal' chain for the rest. Because you append in encounter order, relative order is preserved. Finally join less → ge and terminate.",
    realWorldAnalogy:
      "Sorting a stack of invoices into 'under budget' and 'over budget' piles in the order you pick them up, then placing the under-budget pile on top.",
    visualExplanation:
      "1→4→3→2→5→2, x=3\nless: 1→2→2  ge: 4→3→5\njoin → 1→2→2→4→3→5",
    approaches: [
      {
        title: "Two dummy lists",
        tier: "Optimal",
        idea: "Append each node to a less-list or ge-list, then concatenate; null-terminate the ge-list.",
        steps: [
          "Create dummy heads less and ge",
          "Traverse: val < x → less, else → ge",
          "ge.next = null; less.next = geDummy.next; return lessDummy.next",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1→4→2, x=3\nless:1→2 ge:4\nge.next=null; less.next=geD.next=4 → 1→2→4",
    interviewTips: [
      "Stability (preserving order) is the catch — appending in order gives it for free.",
      "Don't forget to terminate the ge-list or you'll create a cycle.",
    ],
    commonMistakes: [
      "Using `>` instead of `>=` for the split.",
      "Forgetting `ge.next = null`.",
    ],
    followUps: ["Three-way partition (< , =, >).", "Partition an array in place (Dutch flag)."],
    related: ["sort-linked-list-of-0s-1s-and-2s", "odd-even-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def partition(head, x):
    less_d = less = ListNode(0)
    ge_d = ge = ListNode(0)
    cur = head
    while cur:
        if cur.val < x:
            less.next = cur; less = less.next
        else:
            ge.next = cur; ge = ge.next
        cur = cur.next
    ge.next = None
    less.next = ge_d.next
    return less_d.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode lessD = new ListNode(0), less = lessD;
        ListNode geD = new ListNode(0), ge = geD;
        ListNode cur = head;
        while (cur != null) {
            if (cur.val < x) { less.next = cur; less = less.next; }
            else { ge.next = cur; ge = ge.next; }
            cur = cur.next;
        }
        ge.next = null;
        less.next = geD.next;
        return lessD.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function partition(head, x) {
  const lessD = { val: 0, next: null }; let less = lessD;
  const geD = { val: 0, next: null }; let ge = geD;
  let cur = head;
  while (cur) {
    if (cur.val < x) { less.next = cur; less = less.next; }
    else { ge.next = cur; ge = ge.next; }
    cur = cur.next;
  }
  ge.next = null;
  less.next = geD.next;
  return lessD.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode partition(ListNode head, Integer x) {
        ListNode lessD = new ListNode(0), less = lessD;
        ListNode geD = new ListNode(0), ge = geD;
        ListNode cur = head;
        while (cur != null) {
            if (cur.val < x) { less.next = cur; less = less.next; }
            else { ge.next = cur; ge = ge.next; }
            cur = cur.next;
        }
        ge.next = null;
        less.next = geD.next;
        return lessD.next;
    }
}`,
      },
    ],
  },
  {
    slug: "swap-nodes-in-pairs",
    title: "Swap Nodes in Pairs",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a linked list, swap every two adjacent nodes and return its head. You must swap the nodes themselves (not just their values).",
    beginnerExplanation:
      "Use a dummy node in front so the head is easy to handle. Repeatedly take the next two nodes a and b, rewire so b comes before a, then move your 'previous' pointer to a and continue.",
    realWorldAnalogy:
      "Going down a row of dancers and having each adjacent pair switch places, one pair at a time.",
    visualExplanation:
      "dummy→1→2→3→4\nswap (1,2): dummy→2→1→3→4\nswap (3,4): dummy→2→1→4→3",
    approaches: [
      {
        title: "Iterative with dummy",
        tier: "Optimal",
        idea: "For each pair (a,b): a.next=b.next; b.next=a; prev.next=b; prev=a.",
        steps: [
          "dummy.next=head, prev=dummy",
          "While prev.next and prev.next.next: grab a,b and rewire",
          "Advance prev to a",
        ],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Recursion",
        tier: "Optimal",
        idea: "Swap the first two, recurse on the rest, link them.",
        steps: ["If <2 nodes return head", "second=head.next; head.next=swap(second.next); second.next=head; return second"],
        time: "O(n)",
        space: "O(n) stack",
      },
    ],
    dryRun:
      "dummy→1→2→3\nprev=dummy a=1 b=2: 1.next=3; 2.next=1; dummy.next=2; prev=1\nprev=1: prev.next=3, prev.next.next=null → stop → 2→1→3",
    interviewTips: [
      "A dummy head removes the special-case for swapping the first pair.",
      "They may forbid value swaps — be ready to rewire pointers.",
    ],
    commonMistakes: [
      "Swapping values instead of nodes when the prompt forbids it.",
      "Wrong loop guard → null dereference on an odd-length list.",
    ],
    followUps: ["Reverse nodes in groups of k (generalisation).", "Swap pairs in a doubly linked list."],
    related: ["reverse-nodes-in-k-group", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def swap_pairs(head):
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    while prev.next and prev.next.next:
        a = prev.next
        b = a.next
        a.next = b.next
        b.next = a
        prev.next = b
        prev = a
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode a = prev.next, b = a.next;
            a.next = b.next;
            b.next = a;
            prev.next = b;
            prev = a;
        }
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function swapPairs(head) {
  const dummy = { val: 0, next: head };
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next, b = a.next;
    a.next = b.next;
    b.next = a;
    prev.next = b;
    prev = a;
  }
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode a = prev.next, b = a.next;
            a.next = b.next;
            b.next = a;
            prev.next = b;
            prev = a;
        }
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "delete-the-middle-node-of-a-linked-list",
    title: "Delete the Middle Node of a Linked List",
    difficulty: "Medium",
    patterns: ["linked-list", "fast-slow-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Delete the middle node of a linked list (the ⌊n/2⌋-th node, 0-indexed) and return the head. For a list of length 1, return an empty list.",
    beginnerExplanation:
      "Use the slow/fast trick to land slow on the middle while also tracking the node just before it. Then bypass the middle by pointing prev.next at slow.next.",
    realWorldAnalogy:
      "Two walkers on the same path, one moving twice as fast; when the fast one reaches the end, the slow one is at the midpoint — and you remember who was just behind.",
    visualExplanation:
      "1→2→3→4→5 (n=5, mid index 2 = node 3)\nprev lands on 2 → 2.next = 4 → 1→2→4→5",
    approaches: [
      {
        title: "Count then delete",
        tier: "Better",
        idea: "Find n, walk to node n/2−1, unlink the next.",
        steps: ["First pass counts n", "Walk to predecessor of middle", "Unlink"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Slow/fast with prev",
        tier: "Optimal",
        idea: "Single pass; prev trails slow so you can unlink in one go.",
        steps: [
          "If head.next is null return null",
          "slow=fast=head, prev=null",
          "Advance prev=slow, slow=slow.next, fast=fast.next.next while fast and fast.next; prev.next=slow.next",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1→2→3→4 (n=4, mid index 2 = node 3)\nprev=2 slow=3 → 2.next=4 → 1→2→4",
    interviewTips: [
      "Confirm the index convention (⌊n/2⌋) with the interviewer.",
      "Single-node list is the edge case — return null.",
    ],
    commonMistakes: [
      "Off-by-one between ⌊n/2⌋ and ⌈n/2⌉ middle definitions.",
      "Not handling the single-node list.",
    ],
    followUps: ["Find (not delete) the middle.", "Delete the kth node from the middle."],
    related: ["middle-of-the-linked-list", "remove-nth-node-from-end-of-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def delete_middle(head):
    if not head or not head.next:
        return None
    slow = fast = head
    prev = None
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    prev.next = slow.next
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode deleteMiddle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = slow.next;
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function deleteMiddle(head) {
  if (!head || !head.next) return null;
  let slow = head, fast = head, prev = null;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = slow.next;
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode deleteMiddle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = slow.next;
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "remove-duplicates-from-sorted-list-ii",
    title: "Remove Duplicates from Sorted List II",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the sorted list.",
    beginnerExplanation:
      "Because the list is sorted, duplicates are adjacent. Use a dummy head and a `prev` pointer. When you spot a value that repeats, skip the entire run of that value; otherwise advance prev normally.",
    realWorldAnalogy:
      "Scanning a sorted guest list and crossing out any name that appears more than once entirely — only truly unique names remain.",
    visualExplanation:
      "1→2→3→3→4→4→5\nkeep 1,2; drop both 3s; drop both 4s; keep 5 → 1→2→5",
    approaches: [
      {
        title: "Count occurrences then rebuild",
        tier: "Better",
        idea: "Tally counts in a map, rebuild with count==1 nodes.",
        steps: ["Count each value", "Rebuild keeping singletons"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Dummy + skip duplicate runs",
        tier: "Optimal",
        idea: "prev points to the last confirmed-unique node; jump cur past any duplicated value.",
        steps: [
          "dummy.next=head, prev=dummy, cur=head",
          "If cur.next has same val, advance cur past the whole run, set prev.next=cur",
          "Else prev=cur; always cur=cur.next",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1→1→2\ncur=1 sees dup → skip run → prev(dummy).next=2; cur=2\ncur=2 no dup → prev=2 → result 2",
    interviewTips: [
      "Contrast with the easy version (keep one copy) — here you remove ALL copies.",
      "A dummy head handles duplicates that start at the head.",
    ],
    commonMistakes: [
      "Advancing prev onto a node that later turns out duplicated.",
      "Only removing extra copies instead of every copy.",
    ],
    followUps: ["Keep exactly one copy (LeetCode 83).", "Do it for an unsorted list."],
    related: ["sort-list", "partition-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def delete_duplicates(head):
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    cur = head
    while cur:
        if cur.next and cur.val == cur.next.val:
            v = cur.val
            while cur and cur.val == v:
                cur = cur.next
            prev.next = cur
        else:
            prev = cur
            cur = cur.next
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy, cur = head;
        while (cur != null) {
            if (cur.next != null && cur.val == cur.next.val) {
                int v = cur.val;
                while (cur != null && cur.val == v) cur = cur.next;
                prev.next = cur;
            } else {
                prev = cur;
                cur = cur.next;
            }
        }
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function deleteDuplicates(head) {
  const dummy = { val: 0, next: head };
  let prev = dummy, cur = head;
  while (cur) {
    if (cur.next && cur.val === cur.next.val) {
      const v = cur.val;
      while (cur && cur.val === v) cur = cur.next;
      prev.next = cur;
    } else {
      prev = cur;
      cur = cur.next;
    }
  }
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy, cur = head;
        while (cur != null) {
            if (cur.next != null && cur.val == cur.next.val) {
                Integer v = cur.val;
                while (cur != null && cur.val == v) cur = cur.next;
                prev.next = cur;
            } else {
                prev = cur;
                cur = cur.next;
            }
        }
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "insertion-sort-list",
    title: "Insertion Sort List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists", "Sorting"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Sort a linked list using insertion sort and return the sorted head.",
    beginnerExplanation:
      "Grow a sorted prefix one node at a time. For each original node, walk the already-sorted part from a dummy head to find its slot, then splice it in. Save the next node first so you don't lose the unsorted remainder.",
    realWorldAnalogy:
      "Sorting a hand of cards: pick the next card and slide it left into its correct position among the cards you've already ordered.",
    visualExplanation:
      "4→2→1\ninsert 4 → 4\ninsert 2 → 2→4\ninsert 1 → 1→2→4",
    approaches: [
      {
        title: "Insertion sort with dummy",
        tier: "Optimal",
        idea: "Maintain a sorted list behind a dummy; for each node find its position and splice.",
        steps: [
          "dummy with empty sorted list",
          "For each node: save next; scan dummy until p.next.val >= node.val; insert node after p",
          "Continue with saved next",
        ],
        time: "O(n²)",
        space: "O(1)",
      },
    ],
    dryRun:
      "3→1→2\ninsert 3 → dummy→3\ninsert 1 → dummy→1→3\ninsert 2 → dummy→1→2→3",
    interviewTips: [
      "An optimisation: if the next node is ≥ the current sorted tail, skip the scan from the front.",
      "It's O(n²) — fine when they specifically ask for insertion sort; otherwise prefer merge sort.",
    ],
    commonMistakes: [
      "Not saving `next` before splicing (lose the rest).",
      "Scanning from head each time without resetting p to the dummy.",
    ],
    followUps: ["Do merge sort instead for O(n log n).", "Insertion sort a doubly linked list."],
    related: ["sort-list", "merge-two-sorted-lists"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def insertion_sort_list(head):
    dummy = ListNode(0)
    cur = head
    while cur:
        nxt = cur.next
        p = dummy
        while p.next and p.next.val < cur.val:
            p = p.next
        cur.next = p.next
        p.next = cur
        cur = nxt
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0);
        ListNode cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            ListNode p = dummy;
            while (p.next != null && p.next.val < cur.val) p = p.next;
            cur.next = p.next;
            p.next = cur;
            cur = nxt;
        }
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function insertionSortList(head) {
  const dummy = { val: 0, next: null };
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    let p = dummy;
    while (p.next && p.next.val < cur.val) p = p.next;
    cur.next = p.next;
    p.next = cur;
    cur = nxt;
  }
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0);
        ListNode cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            ListNode p = dummy;
            while (p.next != null && p.next.val < cur.val) p = p.next;
            cur.next = p.next;
            p.next = cur;
            cur = nxt;
        }
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "add-one-to-a-linked-list",
    title: "Add One to a Linked List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists", "Math"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A non-negative integer is represented by a linked list, most-significant digit first (e.g. 1→2→3 is 123). Add one to it and return the head of the resulting list.",
    beginnerExplanation:
      "Addition carries from the least-significant digit, which is the END of this list. The clean trick: reverse the list so the ones digit is first, add 1 with a carry, then reverse back. If a carry survives past the front, append a new leading digit.",
    realWorldAnalogy:
      "Adding 1 to 199 on an odometer: the rightmost wheel rolls 9→0 and pushes a carry left, cascading 199→200.",
    visualExplanation:
      "1→2→9 (=129) +1\nreverse → 9→2→1; add1: 9+1=10 → 0 carry1; 2+1=3; 1 → 0→3→1\nreverse → 1→3→0 (=130)",
    approaches: [
      {
        title: "Reverse, add, reverse",
        tier: "Optimal",
        idea: "Reverse to expose the ones digit, propagate the carry, reverse back; append a node if a carry remains.",
        steps: [
          "Reverse the list",
          "Walk adding carry (start carry=1); set digit = sum%10, carry = sum/10",
          "If carry left, append ListNode(carry); reverse back",
        ],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Recursion (carry on the way back)",
        tier: "Optimal",
        idea: "Recurse to the tail, add 1 returning a carry up the stack.",
        steps: ["Recurse to last node", "Add carry, return new carry", "If head carry remains, prepend a node"],
        time: "O(n)",
        space: "O(n) stack",
      },
    ],
    dryRun:
      "9→9 (=99) +1\nreverse 9→9; 9+1=10→0 c1; 9+1=10→0 c1; carry1 left → append 1 → 0→0→1\nreverse → 1→0→0 (=100)",
    interviewTips: [
      "Reversing twice is the simplest correct approach; mention the recursive alternative for O(1) extra besides stack.",
      "The all-9s case (carry past the front) is the key edge case.",
    ],
    commonMistakes: [
      "Forgetting to append a new leading node when the final carry is 1.",
      "Adding from the head (most-significant) end without handling carry direction.",
    ],
    followUps: ["Add two numbers given as linked lists.", "Handle MSB-first without reversing (recursion)."],
    related: ["add-two-numbers", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def add_one(head):
    def reverse(node):
        prev = None
        while node:
            nxt = node.next
            node.next = prev
            prev = node
            node = nxt
        return prev
    head = reverse(head)
    cur, carry, prev = head, 1, None
    while cur:
        total = cur.val + carry
        cur.val = total % 10
        carry = total // 10
        prev = cur
        cur = cur.next
    if carry:
        prev.next = ListNode(carry)
    return reverse(head)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private ListNode reverse(ListNode node) {
        ListNode prev = null;
        while (node != null) {
            ListNode nxt = node.next;
            node.next = prev;
            prev = node;
            node = nxt;
        }
        return prev;
    }
    public ListNode addOne(ListNode head) {
        head = reverse(head);
        ListNode cur = head, prev = null;
        int carry = 1;
        while (cur != null) {
            int total = cur.val + carry;
            cur.val = total % 10;
            carry = total / 10;
            prev = cur;
            cur = cur.next;
        }
        if (carry > 0) prev.next = new ListNode(carry);
        return reverse(head);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function addOne(head) {
  const reverse = (node) => {
    let prev = null;
    while (node) { const nxt = node.next; node.next = prev; prev = node; node = nxt; }
    return prev;
  };
  head = reverse(head);
  let cur = head, prev = null, carry = 1;
  while (cur) {
    const total = cur.val + carry;
    cur.val = total % 10;
    carry = Math.floor(total / 10);
    prev = cur;
    cur = cur.next;
  }
  if (carry > 0) prev.next = { val: carry, next: null };
  return reverse(head);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private static ListNode reverse(ListNode node) {
        ListNode prev = null;
        while (node != null) {
            ListNode nxt = node.next;
            node.next = prev;
            prev = node;
            node = nxt;
        }
        return prev;
    }
    public static ListNode addOne(ListNode head) {
        head = reverse(head);
        ListNode cur = head, prev = null;
        Integer carry = 1;
        while (cur != null) {
            Integer total = cur.val + carry;
            cur.val = Math.mod(total, 10);
            carry = total / 10;
            prev = cur;
            cur = cur.next;
        }
        if (carry > 0) prev.next = new ListNode(carry);
        return reverse(head);
    }
}`,
      },
    ],
  },
  {
    slug: "flatten-a-linked-list",
    title: "Flatten a Linked List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Each node has a `next` pointer (to the next sub-list head) and a `bottom` pointer (to a vertically-sorted sub-list). Each vertical sub-list is sorted by `bottom`, and heads are sorted by `next`. Flatten everything into a single list sorted via `bottom` (set `next` aside).",
    beginnerExplanation:
      "You have several already-sorted vertical lists side by side. Merge them like merge-sort's merge step, two at a time, comparing by value and stitching with the `bottom` pointer. Recursing from the right and merging leftward keeps it sorted.",
    realWorldAnalogy:
      "Several sorted columns of beads on parallel wires; you zip them into one long sorted strand by always threading the smallest available bead next.",
    visualExplanation:
      "5→10→19  (each with bottom chains)\nmerge rightmost pair, then merge result with the next-left head → one sorted bottom chain",
    approaches: [
      {
        title: "Collect all values, sort, rebuild",
        tier: "Brute Force",
        idea: "Gather every value, sort, rebuild a single bottom list.",
        steps: ["Traverse next+bottom collecting values", "Sort", "Rebuild via bottom"],
        time: "O(N log N)",
        space: "O(N)",
      },
      {
        title: "Recursive merge of vertical lists",
        tier: "Optimal",
        idea: "Flatten the rest first, then merge the current vertical list with it by `bottom`.",
        steps: [
          "If no next, return root",
          "root.next = flatten(root.next)",
          "Return merge(root, root.next) using bottom pointers",
        ],
        time: "O(N·k) (k = number of sub-lists)",
        space: "O(k) recursion",
      },
    ],
    dryRun:
      "heads 5(↓7) , 10(↓20)\nflatten(10..)=10→20\nmerge(5→7, 10→20) → 5→7→10→20 (via bottom)",
    interviewTips: [
      "It's merge-sort's merge step generalised to k sorted lists, done pairwise from the right.",
      "Make sure you stitch with `bottom`, not `next`, in the result.",
    ],
    commonMistakes: [
      "Merging with `next` instead of `bottom`.",
      "Forgetting the base case (single sub-list).",
    ],
    followUps: ["Merge k vertical lists with a heap for O(N log k).", "Flatten a multilevel doubly linked list."],
    related: ["merge-two-sorted-lists", "merge-k-sorted-lists"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `# Node has: val, next, bottom
def merge(a, b):
    dummy = Node(0)
    tail = dummy
    while a and b:
        if a.val <= b.val:
            tail.bottom = a; a = a.bottom
        else:
            tail.bottom = b; b = b.bottom
        tail = tail.bottom
    tail.bottom = a if a else b
    return dummy.bottom

def flatten(root):
    if root is None or root.next is None:
        return root
    root.next = flatten(root.next)
    return merge(root, root.next)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `// Node has: int val; Node next; Node bottom;
class Solution {
    private Node merge(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { tail.bottom = a; a = a.bottom; }
            else { tail.bottom = b; b = b.bottom; }
            tail = tail.bottom;
        }
        tail.bottom = (a != null) ? a : b;
        return dummy.bottom;
    }
    public Node flatten(Node root) {
        if (root == null || root.next == null) return root;
        root.next = flatten(root.next);
        return merge(root, root.next);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// Node has: val, next, bottom
function merge(a, b) {
  const dummy = { val: 0, bottom: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.bottom = a; a = a.bottom; }
    else { tail.bottom = b; b = b.bottom; }
    tail = tail.bottom;
  }
  tail.bottom = a || b;
  return dummy.bottom;
}
function flatten(root) {
  if (!root || !root.next) return root;
  root.next = flatten(root.next);
  return merge(root, root.next);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `// Node has: Integer val; Node next; Node bottom;
public class Solution {
    private static Node merge(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { tail.bottom = a; a = a.bottom; }
            else { tail.bottom = b; b = b.bottom; }
            tail = tail.bottom;
        }
        tail.bottom = (a != null) ? a : b;
        return dummy.bottom;
    }
    public static Node flatten(Node root) {
        if (root == null || root.next == null) return root;
        root.next = flatten(root.next);
        return merge(root, root.next);
    }
}`,
      },
    ],
  },
  {
    slug: "delete-node-in-a-linked-list",
    title: "Delete Node in a Linked List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "You are given access ONLY to the node to be deleted (not the head), and it is guaranteed not to be the tail. Delete it from the list.",
    beginnerExplanation:
      "You can't reach the previous node to bypass this one — but you don't need to. Copy the NEXT node's value into this node, then unlink the next node. Effectively this node becomes its successor.",
    realWorldAnalogy:
      "You can't remove a link from a chain without access to the link before it — so instead you overwrite this link to look like the one after it, then drop that one.",
    visualExplanation:
      "1→2→3→4, delete node(3)\ncopy 4 into 3 → 1→2→4→4\nunlink → 1→2→4",
    approaches: [
      {
        title: "Copy-next-then-skip",
        tier: "Optimal",
        idea: "Overwrite the node's value with its next's value, then point past the next node.",
        steps: ["node.val = node.next.val", "node.next = node.next.next"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "…→5→1→9, delete node(1)\n1.val = 9 → …→5→9→9; 1.next = 9.next → …→5→9",
    interviewTips: [
      "The twist is you DON'T have the head — recognise you can 'become' the next node.",
      "Only works because the node is guaranteed not to be the tail.",
    ],
    commonMistakes: [
      "Trying to find the previous node (impossible with only this node).",
      "Assuming it could be the tail (the problem rules that out).",
    ],
    followUps: ["Why can't this delete the tail?", "Delete by value given the head instead."],
    related: ["remove-nth-node-from-end-of-list", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def delete_node(node):
    node.val = node.next.val
    node.next = node.next.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}`,
      },
    ],
  },
];

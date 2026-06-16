import type { Problem } from "@/lib/types";

// Striver A2Z linked-list & doubly-linked-list operation problems.
export const PROBLEMS_BATCH_AB: Problem[] = [
  {
    slug: "insert-a-node-in-singly-linked-list",
    title: "Insert a Node in Singly Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the head of a singly linked list, a value `val`, and a 0-indexed position `pos`, insert a new node with `val` at `pos` and return the (possibly new) head. `pos` ranges from 0 (before the head) to the length of the list (append at the end).",
    beginnerExplanation:
      "A linked list is a chain of boxes, each pointing to the next. To slip a new box in, you walk to the box just before the target spot, point your new box at whatever that box pointed to, then point that box at your new box. Inserting at the very front is the special case — there's no node before it, so the new node becomes the head.",
    realWorldAnalogy:
      "Think of a paper-chain. To add a link in the middle, you unhook one connection, hook your new link onto the loose end, and re-hook it to the chain. Only the two neighbours change — the rest of the chain is untouched.",
    visualExplanation:
      "list: 10 -> 20 -> 30, insert 99 at pos 2\nwalk to node before index 2 (the '20')\n20.next was 30; set new.next = 30, then 20.next = new\nresult: 10 -> 20 -> 99 -> 30",
    approaches: [
      {
        title: "Rebuild into a new list",
        tier: "Brute Force",
        idea: "Copy nodes into an array, splice the value in, rebuild a fresh list.",
        steps: ["Collect values into an array", "Insert val at pos", "Build a new linked list"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Walk to predecessor and relink",
        tier: "Optimal",
        idea: "Advance to the node just before pos and rewire two pointers in place.",
        steps: [
          "If pos == 0, new node points to head and becomes the new head",
          "Else walk pos-1 steps to the predecessor",
          "new.next = pred.next; pred.next = new",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "10->20->30, val=99, pos=2\npos!=0, walk 1 step -> at node 20\nnew=ListNode(99); new.next=20.next(30); 20.next=new\n10->20->99->30",
    interviewTips: [
      "Clarify whether pos is 0-indexed and whether inserting at length (append) is allowed.",
      "Handle the head-insertion case first — it's the one that changes the return value.",
    ],
    commonMistakes: [
      "Forgetting to return the new head when inserting at position 0.",
      "Linking in the wrong order (losing the rest of the list by overwriting pred.next first).",
    ],
    followUps: ["Insert into a sorted list keeping it sorted.", "Insert at the tail in O(1) with a tail pointer."],
    related: ["delete-a-node-in-singly-linked-list", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def insert_node(head, val, pos):
    if pos == 0:
        return ListNode(val, head)
    prev = head
    for _ in range(pos - 1):
        prev = prev.next
    prev.next = ListNode(val, prev.next)
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class ListNode { int val; ListNode next; ListNode(int v){val=v;} }

class Solution {
    public ListNode insertNode(ListNode head, int val, int pos) {
        if (pos == 0) { ListNode n = new ListNode(val); n.next = head; return n; }
        ListNode prev = head;
        for (int i = 0; i < pos - 1; i++) prev = prev.next;
        ListNode n = new ListNode(val);
        n.next = prev.next;
        prev.next = n;
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function insertNode(head, val, pos) {
  if (pos === 0) return { val, next: head };
  let prev = head;
  for (let i = 0; i < pos - 1; i++) prev = prev.next;
  prev.next = { val, next: prev.next };
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class ListNode { public Integer val; public ListNode next; public ListNode(Integer v){ val = v; } }

public class Solution {
    public static ListNode insertNode(ListNode head, Integer val, Integer pos) {
        if (pos == 0) { ListNode n = new ListNode(val); n.next = head; return n; }
        ListNode prev = head;
        for (Integer i = 0; i < pos - 1; i++) prev = prev.next;
        ListNode n = new ListNode(val);
        n.next = prev.next;
        prev.next = n;
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "delete-a-node-in-singly-linked-list",
    title: "Delete a Node in Singly Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given the head of a singly linked list and a 0-indexed position `pos`, delete the node at `pos` and return the (possibly new) head. Assume `pos` is a valid index.",
    beginnerExplanation:
      "To remove a box from the chain, you make the box before it skip over the one being removed and point straight to the one after. Removing the first box is special — the head simply becomes the second box.",
    realWorldAnalogy:
      "Unhooking a single link from a paper-chain: you bridge its two neighbours directly so the chain stays connected, and the removed link falls away.",
    visualExplanation:
      "10 -> 20 -> 30 -> 40, delete pos 2 (the '30')\nwalk to node before -> '20'\n20.next = 30.next (40)\nresult: 10 -> 20 -> 40",
    approaches: [
      {
        title: "Predecessor bridge",
        tier: "Optimal",
        idea: "Find the node before pos and point it past the deleted node.",
        steps: [
          "If pos == 0, return head.next",
          "Walk pos-1 steps to the predecessor",
          "pred.next = pred.next.next",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "10->20->30->40, pos=2\nwalk 1 step -> 20\n20.next = 20.next.next = 40\n10->20->40",
    interviewTips: [
      "The head-deletion case (pos 0) returns a different head — handle it before the loop.",
      "Mention guarding against an out-of-range pos in production code.",
    ],
    commonMistakes: [
      "Dereferencing pred.next.next when pos is the last node without checking bounds.",
      "Not updating the head when deleting the first node.",
    ],
    followUps: ["Delete by value instead of position.", "Delete the node given only a pointer to it."],
    related: ["insert-a-node-in-singly-linked-list", "remove-nth-node-from-end-of-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def delete_node(head, pos):
    if pos == 0:
        return head.next
    prev = head
    for _ in range(pos - 1):
        prev = prev.next
    prev.next = prev.next.next
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode deleteNode(ListNode head, int pos) {
        if (pos == 0) return head.next;
        ListNode prev = head;
        for (int i = 0; i < pos - 1; i++) prev = prev.next;
        prev.next = prev.next.next;
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function deleteNode(head, pos) {
  if (pos === 0) return head.next;
  let prev = head;
  for (let i = 0; i < pos - 1; i++) prev = prev.next;
  prev.next = prev.next.next;
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode deleteNode(ListNode head, Integer pos) {
        if (pos == 0) return head.next;
        ListNode prev = head;
        for (Integer i = 0; i < pos - 1; i++) prev = prev.next;
        prev.next = prev.next.next;
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "search-an-element-in-linked-list",
    title: "Search an Element in Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a singly linked list and a target value, return true if the value exists in the list, otherwise false.",
    beginnerExplanation:
      "Because a linked list has no indexes, you simply walk from the head one node at a time, checking each value until you find the target or fall off the end.",
    realWorldAnalogy:
      "Looking for a friend in a conga line where you can only see the person in front: you tap shoulders one by one from the front until you find them or reach the end.",
    visualExplanation: "10 -> 7 -> 22 -> 5, target 22\n10? no -> 7? no -> 22? yes -> return true",
    approaches: [
      {
        title: "Linear traversal",
        tier: "Optimal",
        idea: "Walk node by node comparing each value to the target.",
        steps: ["Start at head", "While node not null: if node.val == target return true; advance", "Return false"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "10->7->22->5, target=5\n10 no, 7 no, 22 no, 5 yes -> true",
    interviewTips: [
      "There's no faster-than-O(n) search on an unsorted singly linked list — say so up front.",
      "Mention you compare identity vs value depending on whether nodes hold objects.",
    ],
    commonMistakes: ["Looping with `node.next` instead of `node` and missing the last node."],
    followUps: ["Return the 0-indexed position instead of a boolean.", "Search a sorted list — still O(n) without random access."],
    related: ["length-of-a-linked-list", "linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def search_list(head, target):
    node = head
    while node:
        if node.val == target:
            return True
        node = node.next
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean searchList(ListNode head, int target) {
        for (ListNode node = head; node != null; node = node.next)
            if (node.val == target) return true;
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function searchList(head, target) {
  for (let node = head; node; node = node.next)
    if (node.val === target) return true;
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean searchList(ListNode head, Integer target) {
        for (ListNode node = head; node != null; node = node.next)
            if (node.val == target) return true;
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "length-of-a-linked-list",
    title: "Length of a Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement: "Given the head of a singly linked list, return the number of nodes in it.",
    beginnerExplanation:
      "Since there's no built-in size, you count as you walk: start a tally at zero and add one for every node until you fall off the end.",
    realWorldAnalogy:
      "Counting train carriages by walking from the engine to the caboose, ticking each one off as you pass.",
    visualExplanation: "10 -> 20 -> 30 -> null\ncount: 1 (10), 2 (20), 3 (30) -> length 3",
    approaches: [
      {
        title: "Single traversal counter",
        tier: "Optimal",
        idea: "Walk to the end incrementing a counter.",
        steps: ["count = 0", "While node not null: count++, advance", "Return count"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "10->20->30\nnode=10 count1, node=20 count2, node=30 count3, node=null -> 3",
    interviewTips: ["Often a helper inside bigger problems (e.g. find middle, rotate by k % len)."],
    commonMistakes: ["Off-by-one from counting links instead of nodes."],
    followUps: ["Maintain the length in O(1) with a counter on insert/delete."],
    related: ["search-an-element-in-linked-list", "middle-of-the-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def length_of_list(head):
    count = 0
    node = head
    while node:
        count += 1
        node = node.next
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int lengthOfList(ListNode head) {
        int count = 0;
        for (ListNode node = head; node != null; node = node.next) count++;
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lengthOfList(head) {
  let count = 0;
  for (let node = head; node; node = node.next) count++;
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lengthOfList(ListNode head) {
        Integer count = 0;
        for (ListNode node = head; node != null; node = node.next) count++;
        return count;
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-a-doubly-linked-list",
    title: "Reverse a Doubly Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a doubly linked list (each node has `prev` and `next`), reverse it in place and return the new head.",
    beginnerExplanation:
      "In a doubly linked list every node points both forward and backward. To reverse it, walk through and swap each node's prev and next pointers. When you're done, the node that was the tail is the new head.",
    realWorldAnalogy:
      "A two-way street where every sign points 'north' and 'south'. Reversing direction just means swapping which way each pair of signs points — the road is the same, traffic now flows the other way.",
    visualExplanation:
      "1 <-> 2 <-> 3\nswap prev/next at each node\n3 <-> 2 <-> 1; new head = old tail (3)",
    approaches: [
      {
        title: "Swap prev/next per node",
        tier: "Optimal",
        idea: "Walk the list swapping each node's two pointers; the last visited node is the new head.",
        steps: [
          "cur = head, last = null",
          "While cur: swap cur.prev and cur.next; last = cur; advance via the OLD next (now cur.prev)",
          "Return last",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1<->2<->3\ncur=1: swap -> 1.next=null,1.prev=2; advance to 2\ncur=2: swap; advance to 3\ncur=3: swap; last=3\nreturn 3 (3<->2<->1)",
    interviewTips: [
      "After swapping, advance using the node's NEW prev (which is the old next) — a classic slip.",
      "Contrast with singly-list reversal: here you flip two pointers, not one.",
    ],
    commonMistakes: [
      "Advancing with cur.next after swapping (that's now the old prev) — causes an infinite loop or early stop.",
      "Returning the old head instead of the last node.",
    ],
    followUps: ["Reverse a singly linked list.", "Reverse in groups of k."],
    related: ["reverse-linked-list", "insert-a-node-in-doubly-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class DListNode:
    def __init__(self, val=0):
        self.val, self.prev, self.next = val, None, None

def reverse_dll(head):
    cur, last = head, None
    while cur:
        cur.prev, cur.next = cur.next, cur.prev
        last = cur
        cur = cur.prev  # old next
    return last`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class DListNode { int val; DListNode prev, next; DListNode(int v){val=v;} }

class Solution {
    public DListNode reverseDLL(DListNode head) {
        DListNode cur = head, last = null;
        while (cur != null) {
            DListNode tmp = cur.prev;
            cur.prev = cur.next;
            cur.next = tmp;
            last = cur;
            cur = cur.prev; // old next
        }
        return last;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverseDLL(head) {
  let cur = head, last = null;
  while (cur) {
    [cur.prev, cur.next] = [cur.next, cur.prev];
    last = cur;
    cur = cur.prev; // old next
  }
  return last;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class DListNode { public Integer val; public DListNode prev; public DListNode next; public DListNode(Integer v){ val = v; } }

public class Solution {
    public static DListNode reverseDLL(DListNode head) {
        DListNode cur = head, last = null;
        while (cur != null) {
            DListNode tmp = cur.prev;
            cur.prev = cur.next;
            cur.next = tmp;
            last = cur;
            cur = cur.prev; // old next
        }
        return last;
    }
}`,
      },
    ],
  },
  {
    slug: "insert-a-node-in-doubly-linked-list",
    title: "Insert a Node in Doubly Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a doubly linked list, a value, and a 0-indexed position, insert a new node at that position and return the (possibly new) head.",
    beginnerExplanation:
      "Inserting into a doubly linked list means wiring up FOUR pointers: the new node's prev and next, plus the next pointer of the node before and the prev pointer of the node after. Inserting at the front makes the new node the head.",
    realWorldAnalogy:
      "Adding a carriage to a two-way train: you couple it to the carriage in front AND the one behind, and both neighbours couple back to it.",
    visualExplanation:
      "1 <-> 2 <-> 3, insert 9 at pos 1\npred=1, succ=2\n9.prev=1, 9.next=2, 1.next=9, 2.prev=9\n1 <-> 9 <-> 2 <-> 3",
    approaches: [
      {
        title: "Relink four pointers",
        tier: "Optimal",
        idea: "Find the predecessor, then wire the new node between predecessor and successor updating both directions.",
        steps: [
          "If pos == 0: new.next = head; if head: head.prev = new; return new",
          "Walk pos-1 steps to pred; succ = pred.next",
          "new.prev = pred; new.next = succ; pred.next = new; if succ: succ.prev = new",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1<->2<->3, val=9, pos=1\npred=1, succ=2\n9.prev=1;9.next=2;1.next=9;2.prev=9\n1<->9<->2<->3",
    interviewTips: ["Update both the predecessor's next AND the successor's prev — forgetting one corrupts back-traversal."],
    commonMistakes: ["Skipping succ.prev = new, so walking backwards breaks.", "Not guarding succ being null at the tail."],
    followUps: ["Delete a node from a DLL.", "Keep a DLL sorted on insert."],
    related: ["delete-a-node-in-doubly-linked-list", "reverse-a-doubly-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def insert_dll(head, val, pos):
    node = DListNode(val)
    if pos == 0:
        node.next = head
        if head:
            head.prev = node
        return node
    pred = head
    for _ in range(pos - 1):
        pred = pred.next
    succ = pred.next
    node.prev, node.next = pred, succ
    pred.next = node
    if succ:
        succ.prev = node
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public DListNode insertDLL(DListNode head, int val, int pos) {
        DListNode node = new DListNode(val);
        if (pos == 0) { node.next = head; if (head != null) head.prev = node; return node; }
        DListNode pred = head;
        for (int i = 0; i < pos - 1; i++) pred = pred.next;
        DListNode succ = pred.next;
        node.prev = pred; node.next = succ;
        pred.next = node;
        if (succ != null) succ.prev = node;
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function insertDLL(head, val, pos) {
  const node = { val, prev: null, next: null };
  if (pos === 0) { node.next = head; if (head) head.prev = node; return node; }
  let pred = head;
  for (let i = 0; i < pos - 1; i++) pred = pred.next;
  const succ = pred.next;
  node.prev = pred; node.next = succ;
  pred.next = node;
  if (succ) succ.prev = node;
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static DListNode insertDLL(DListNode head, Integer val, Integer pos) {
        DListNode node = new DListNode(val);
        if (pos == 0) { node.next = head; if (head != null) head.prev = node; return node; }
        DListNode pred = head;
        for (Integer i = 0; i < pos - 1; i++) pred = pred.next;
        DListNode succ = pred.next;
        node.prev = pred; node.next = succ;
        pred.next = node;
        if (succ != null) succ.prev = node;
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "delete-a-node-in-doubly-linked-list",
    title: "Delete a Node in Doubly Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a doubly linked list and a 0-indexed position, delete that node and return the (possibly new) head.",
    beginnerExplanation:
      "Removing a node from a doubly linked list means bridging its two neighbours in BOTH directions: the previous node's next skips to the following node, and the following node's prev points back to the previous one.",
    realWorldAnalogy:
      "Uncoupling a carriage from a two-way train: the carriages in front and behind re-couple directly to each other, in both directions.",
    visualExplanation:
      "1 <-> 2 <-> 3 <-> 4, delete pos 1 (the '2')\npred=1, succ=3\n1.next=3, 3.prev=1\n1 <-> 3 <-> 4",
    approaches: [
      {
        title: "Bridge neighbours both ways",
        tier: "Optimal",
        idea: "Connect the target's prev and next to each other, handling head/tail edges.",
        steps: [
          "Walk to the target node",
          "If it has a prev, prev.next = target.next; else new head = target.next",
          "If it has a next, target.next.prev = target.prev",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "1<->2<->3<->4, pos=1 -> target=2\nprev=1,next=3\n1.next=3; 3.prev=1\n1<->3<->4",
    interviewTips: ["Deleting the head returns a new head (target.next, with its prev set to null)."],
    commonMistakes: ["Updating only one direction, breaking backward traversal.", "Not handling head/tail null neighbours."],
    followUps: ["Delete by value.", "Delete all occurrences of a value."],
    related: ["insert-a-node-in-doubly-linked-list", "remove-duplicates-from-sorted-doubly-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def delete_dll(head, pos):
    node = head
    for _ in range(pos):
        node = node.next
    if node.prev:
        node.prev.next = node.next
    else:
        head = node.next
    if node.next:
        node.next.prev = node.prev
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public DListNode deleteDLL(DListNode head, int pos) {
        DListNode node = head;
        for (int i = 0; i < pos; i++) node = node.next;
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;
        if (node.next != null) node.next.prev = node.prev;
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function deleteDLL(head, pos) {
  let node = head;
  for (let i = 0; i < pos; i++) node = node.next;
  if (node.prev) node.prev.next = node.next;
  else head = node.next;
  if (node.next) node.next.prev = node.prev;
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static DListNode deleteDLL(DListNode head, Integer pos) {
        DListNode node = head;
        for (Integer i = 0; i < pos; i++) node = node.next;
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;
        if (node.next != null) node.next.prev = node.prev;
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "remove-duplicates-from-sorted-doubly-linked-list",
    title: "Remove Duplicates from Sorted Doubly Linked List",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a SORTED doubly linked list, remove all duplicate values so each value appears once, and return the head.",
    beginnerExplanation:
      "Because the list is sorted, duplicates sit next to each other. Walk through; whenever the next node has the same value, skip past it (rewiring next and prev) until the value changes.",
    realWorldAnalogy:
      "Scanning a sorted guest list and crossing out repeated names — since it's alphabetical, repeats are always adjacent, so one pass suffices.",
    visualExplanation:
      "1 <-> 1 <-> 2 <-> 3 <-> 3\nat 1: next is 1 (dup) -> skip; then next is 2 -> keep\nresult: 1 <-> 2 <-> 3",
    approaches: [
      {
        title: "Adjacent-skip on sorted list",
        tier: "Optimal",
        idea: "For each node, swallow all following nodes with the same value by relinking.",
        steps: [
          "cur = head",
          "While cur and cur.next: if cur.next.val == cur.val: cur.next = cur.next.next; if cur.next: cur.next.prev = cur; else advance cur",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "1<->1<->2<->3<->3\ncur=1: next 1 dup -> cur.next=2,2.prev=1; next 2 != 1 -> advance\ncur=2: next 3 -> advance\ncur=3: next 3 dup -> cur.next=null\n1<->2<->3",
    interviewTips: ["Rely on the sorted invariant — without it you'd need a hash set (O(n) space)."],
    commonMistakes: ["Advancing cur when you removed a node (you should re-check the new next first).", "Forgetting to fix the new next's prev pointer."],
    followUps: ["Remove duplicates from an UNsorted DLL (hash set).", "Keep only nodes that were never duplicated."],
    related: ["delete-a-node-in-doubly-linked-list", "pairs-with-given-sum-in-doubly-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def remove_dups_sorted_dll(head):
    cur = head
    while cur and cur.next:
        if cur.next.val == cur.val:
            cur.next = cur.next.next
            if cur.next:
                cur.next.prev = cur
        else:
            cur = cur.next
    return head`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public DListNode removeDups(DListNode head) {
        DListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.next.val == cur.val) {
                cur.next = cur.next.next;
                if (cur.next != null) cur.next.prev = cur;
            } else cur = cur.next;
        }
        return head;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function removeDups(head) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.next.val === cur.val) {
      cur.next = cur.next.next;
      if (cur.next) cur.next.prev = cur;
    } else cur = cur.next;
  }
  return head;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static DListNode removeDups(DListNode head) {
        DListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.next.val == cur.val) {
                cur.next = cur.next.next;
                if (cur.next != null) cur.next.prev = cur;
            } else cur = cur.next;
        }
        return head;
    }
}`,
      },
    ],
  },
  {
    slug: "pairs-with-given-sum-in-doubly-linked-list",
    title: "Pairs with Given Sum in Doubly Linked List",
    difficulty: "Medium",
    patterns: ["linked-list", "two-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a SORTED doubly linked list, return all pairs of values that add up to a given target.",
    beginnerExplanation:
      "Because the list is sorted, you can use two pointers: one at the smallest value (head) and one at the largest (tail). If their sum is too small move the left pointer forward; too big, move the right pointer backward; equal, record the pair and move both inward.",
    realWorldAnalogy:
      "Two people walking toward each other along a sorted number line, adjusting their steps until their positions sum to the target — exactly like the array two-pointer trick, but the DLL gives you the backward pointer for free.",
    visualExplanation:
      "1<->2<->4<->5<->6<->8<->9, target 7\nL=1,R=9 -> 10>7 R--; L=1,R=8 ->9>7 R--; L=1,R=6 ->7 ✓ (1,6); L=2,R=5 ->7 ✓ (2,5); L=4,R=4 stop",
    approaches: [
      {
        title: "Brute force pairs",
        tier: "Brute Force",
        idea: "For each node, scan the rest for a complement.",
        steps: ["For each node i", "Scan j after i", "Record pairs summing to target"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Two pointers from both ends",
        tier: "Optimal",
        idea: "Use the sorted order: left at head, right at tail, converge.",
        steps: [
          "left = head, right = tail",
          "While left != right and they haven't crossed: compare sum to target",
          "sum<target: left=left.next; sum>target: right=right.prev; equal: record, move both",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "1<->2<->4<->5<->6, target 6\nL1 R6 ->7>6 R--; L1 R5 ->6 ✓; L2 R4 ->6 ✓; L4 R4 cross -> stop -> [(1,5),(2,4)]",
    interviewTips: [
      "The DLL's prev pointer is what lets you walk the right pointer backward in O(1) — say why a singly list can't do this trick.",
      "Stop when left and right meet or cross.",
    ],
    commonMistakes: ["Continuing after the pointers cross (double-counting).", "Not advancing both pointers on a hit."],
    followUps: ["Count pairs only.", "Triplets summing to target in a sorted DLL."],
    related: ["remove-duplicates-from-sorted-doubly-linked-list", "two-sum-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def pairs_with_sum(head, target):
    if not head:
        return []
    right = head
    while right.next:
        right = right.next
    left, res = head, []
    while left and right and left != right and left.prev != right:
        s = left.val + right.val
        if s == target:
            res.append((left.val, right.val))
            left, right = left.next, right.prev
        elif s < target:
            left = left.next
        else:
            right = right.prev
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<int[]> pairsWithSum(DListNode head, int target) {
        List<int[]> res = new ArrayList<>();
        if (head == null) return res;
        DListNode right = head;
        while (right.next != null) right = right.next;
        DListNode left = head;
        while (left != null && right != null && left != right && left.prev != right) {
            int s = left.val + right.val;
            if (s == target) { res.add(new int[]{left.val, right.val}); left = left.next; right = right.prev; }
            else if (s < target) left = left.next;
            else right = right.prev;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function pairsWithSum(head, target) {
  const res = [];
  if (!head) return res;
  let right = head;
  while (right.next) right = right.next;
  let left = head;
  while (left && right && left !== right && left.prev !== right) {
    const s = left.val + right.val;
    if (s === target) { res.push([left.val, right.val]); left = left.next; right = right.prev; }
    else if (s < target) left = left.next;
    else right = right.prev;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> pairsWithSum(DListNode head, Integer target) {
        List<List<Integer>> res = new List<List<Integer>>();
        if (head == null) return res;
        DListNode right = head;
        while (right.next != null) right = right.next;
        DListNode left = head;
        while (left != null && right != null && left != right && left.prev != right) {
            Integer s = left.val + right.val;
            if (s == target) { res.add(new List<Integer>{ left.val, right.val }); left = left.next; right = right.prev; }
            else if (s < target) left = left.next;
            else right = right.prev;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "length-of-loop-in-linked-list",
    title: "Length of Loop in Linked List",
    difficulty: "Medium",
    patterns: ["fast-slow-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given the head of a linked list that may contain a cycle, return the number of nodes in the loop, or 0 if there is no loop.",
    beginnerExplanation:
      "First detect the loop with the tortoise-and-hare (slow/fast) pointers. Once they meet inside the loop, keep one pointer fixed and walk the other around until it comes back — the number of steps it took is the loop's length.",
    realWorldAnalogy:
      "Two runners on a track collide; to measure the lap, one stays put while the other jogs all the way around back to them, counting paces.",
    visualExplanation:
      "1->2->3->4->5->3(loop back to 3)\nslow/fast meet inside loop; from meeting point, walk until back -> nodes {3,4,5} -> length 3",
    approaches: [
      {
        title: "Hash map of visit index",
        tier: "Brute Force",
        idea: "Store each node with the step count; on revisit, length = currentStep − storedStep.",
        steps: ["Walk storing node -> step", "On a repeat node, length = step − seen[node]"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Floyd's meet, then count the loop",
        tier: "Optimal",
        idea: "Detect the meeting point with slow/fast, then count nodes by looping back to it.",
        steps: [
          "Advance slow by 1, fast by 2 until they meet (or fast hits null -> no loop, return 0)",
          "From the meeting node, move one step at a time counting until you return to it",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "1->2->3->4->5->3\nslow/fast meet at (say) 4\ncount from 4: 4->5->3->4 back -> 3 nodes -> length 3",
    interviewTips: ["Reuse the cycle-detection skill; the only new part is the counting loop after they meet."],
    commonMistakes: ["Counting from the head instead of the meeting node.", "Off-by-one on the counting loop (count the start node once)."],
    followUps: ["Return the node where the loop starts.", "Remove the loop."],
    related: ["linked-list-cycle", "linked-list-cycle-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def length_of_loop(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            count, cur = 1, slow.next
            while cur is not slow:
                count += 1
                cur = cur.next
            return count
    return 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int lengthOfLoop(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                int count = 1;
                ListNode cur = slow.next;
                while (cur != slow) { count++; cur = cur.next; }
                return count;
            }
        }
        return 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lengthOfLoop(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let count = 1, cur = slow.next;
      while (cur !== slow) { count++; cur = cur.next; }
      return count;
    }
  }
  return 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lengthOfLoop(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                Integer count = 1;
                ListNode cur = slow.next;
                while (cur != slow) { count++; cur = cur.next; }
                return count;
            }
        }
        return 0;
    }
}`,
      },
    ],
  },
];

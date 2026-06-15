import type { Problem } from "@/lib/types";

// Batch J — Design / Linked List / Tree / Heap / 2-D DP. Completes the
// NeetCode 150 gap. Titles match the canonical NeetCode/LeetCode names.

export const PROBLEMS_BATCH_J: Problem[] = [
  {
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    patterns: ["linked-list", "hashing"],
    topics: ["Hashing", "Linked Lists"],
    companies: ["amazon", "google", "meta", "microsoft"],
    sheets: ["neetcode150", "top50"],
    frequency: 5,
    statement:
      "Design a data structure for a Least Recently Used (LRU) cache with capacity. `get(key)` returns the value (or -1) and marks it most-recently used; `put(key, value)` inserts/updates and evicts the least-recently-used entry when over capacity. Both must run in O(1).",
    beginnerExplanation:
      "You need two things at once: instant key lookup AND a record of usage order. A hash map gives O(1) lookup; a doubly linked list gives O(1) move-to-front and remove-from-back. Combine them: the map points to list nodes, the list tracks recency.",
    realWorldAnalogy:
      "A small desk that holds N papers. Every time you read a paper you move it to the top of the pile; when the desk overflows you toss the paper at the very bottom — the one you haven't touched longest.",
    visualExplanation:
      "cap=2\nput(1,1) put(2,2) → [2,1]\nget(1)=1 → [1,2]\nput(3,3) evicts 2 → [3,1]\nget(2) = -1",
    approaches: [
      {
        title: "Array / list scan",
        tier: "Brute Force",
        idea: "Keep entries in a list; on access move to front by scanning.",
        steps: ["Linear search for the key", "Splice to front", "Pop tail on overflow"],
        time: "O(n) per op",
        space: "O(n)",
      },
      {
        title: "Hash map + doubly linked list",
        tier: "Optimal",
        idea: "Map key→node for O(1) lookup; DLL keeps usage order so move/evict are O(1). (Languages with ordered maps — Python OrderedDict, Java LinkedHashMap, JS Map — give this for free.)",
        steps: [
          "On get: if present, move node to front (most recent), return value",
          "On put: upsert, move to front",
          "If size > capacity, remove the tail (least recent)",
        ],
        time: "O(1) per op",
        space: "O(capacity)",
      },
    ],
    dryRun:
      "cap=2\nput(1,1)→{1}\nput(2,2)→{1,2}\nget(1)→1, order {2,1}\nput(3,3)→evict 2, {1,3}\nget(2)→-1",
    interviewTips: [
      "State the two-data-structure insight first: hash map for lookup, DLL for order. That's the whole answer.",
      "Mention that built-in ordered maps (LinkedHashMap/OrderedDict) are an acceptable, idiomatic shortcut — but be ready to hand-roll the DLL if asked.",
    ],
    commonMistakes: [
      "Forgetting to update recency on get (not just put).",
      "Evicting before inserting an updated existing key.",
      "Off-by-one on capacity (evict only when strictly over).",
    ],
    followUps: ["LFU cache (evict least-frequently used).", "Make it thread-safe.", "Add TTL expiry."],
    related: ["design-twitter"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()  # key -> value, ordered by recency

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)   # mark most-recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # evict least-recently used`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class LRUCache {
    private final LinkedHashMap<Integer, Integer> map;

    public LRUCache(int capacity) {
        // accessOrder=true reorders on get/put; removeEldestEntry evicts LRU
        map = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> e) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map(); // JS Map preserves insertion order
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, v); // re-insert => most recent
    return v;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value); // evict oldest
    }
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class LRUCache {
    private Integer cap;
    private Map<Integer, Integer> cache = new Map<Integer, Integer>();
    private List<Integer> order = new List<Integer>(); // front = LRU, back = MRU

    public LRUCache(Integer capacity) { this.cap = capacity; }

    public Integer get(Integer key) {
        if (!cache.containsKey(key)) return -1;
        touch(key);
        return cache.get(key);
    }

    public void put(Integer key, Integer value) {
        if (cache.containsKey(key)) { cache.put(key, value); touch(key); return; }
        if (cache.size() >= cap) cache.remove(order.remove(0)); // evict LRU
        cache.put(key, value);
        order.add(key);
    }

    // Apex has no O(1) linked list, so recency update is O(n) — note the tradeoff.
    private void touch(Integer key) {
        for (Integer i = 0; i < order.size(); i++) {
            if (order[i] == key) { order.remove(i); break; }
        }
        order.add(key);
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-nodes-in-k-group",
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    patterns: ["linked-list"],
    topics: ["Linked Lists", "Recursion"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given the head of a linked list, reverse the nodes k at a time and return the modified list. Nodes left over at the end (fewer than k) stay in their original order.",
    beginnerExplanation:
      "Check whether the next k nodes exist. If they do, reverse exactly those k, and recursively wire the reversed block to the result of solving the rest. If fewer than k remain, leave them as-is.",
    realWorldAnalogy:
      "A train where you flip every group of k carriages end-to-end. The last short group (fewer than k) is left coupled the way it was.",
    visualExplanation:
      "1→2→3→4→5, k=2\nreverse [1,2] → 2→1, reverse [3,4] → 4→3, 5 stays\nresult: 2→1→4→3→5",
    approaches: [
      {
        title: "Collect values, rewrite",
        tier: "Brute Force",
        idea: "Copy k values into an array, reverse, write back. Uses extra space and isn't a true pointer exercise.",
        steps: ["Chunk into groups of k", "Reverse full groups", "Skip the short tail"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Recursive in-place reversal",
        tier: "Optimal",
        idea: "Verify k nodes exist; recurse on the remainder first; reverse the current k and point the block's new tail (old head) at the recursion result.",
        steps: [
          "Walk k nodes to confirm a full group; if not, return head unchanged",
          "prev = solve(node after the group)",
          "Reverse the k nodes, attaching each to prev",
          "Return the new head of the block",
        ],
        time: "O(n)",
        space: "O(n/k) recursion (O(1) iterative variant exists)",
      },
    ],
    dryRun:
      "1→2→3→4→5, k=3\nfirst 3 exist → solve(4→5) returns 4→5 (only 2, unchanged)\nreverse 1,2,3 attaching to 4 → 3→2→1→4→5",
    interviewTips: [
      "Always confirm a FULL group of k exists before reversing — that guard is what keeps the short tail untouched.",
      "Be ready to convert the recursion to an O(1)-space iterative version with a dummy head.",
    ],
    commonMistakes: [
      "Reversing a partial final group.",
      "Losing the link between consecutive groups.",
    ],
    followUps: ["Do it with O(1) extra space iteratively.", "Reverse only alternate groups."],
    related: ["reverse-linked-list", "merge-two-sorted-lists"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `# class ListNode: def __init__(self, val=0, next=None): ...

def reverse_k_group(head, k):
    node, count = head, 0
    while node and count < k:
        node = node.next
        count += 1
    if count < k:
        return head                      # fewer than k: leave as-is
    prev = reverse_k_group(node, k)       # reverse the rest first
    cur = head
    for _ in range(k):
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode node = head;
        int count = 0;
        while (node != null && count < k) { node = node.next; count++; }
        if (count < k) return head;
        ListNode prev = reverseKGroup(node, k);
        ListNode cur = head;
        for (int i = 0; i < k; i++) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverseKGroup(head, k) {
  let node = head, count = 0;
  while (node && count < k) { node = node.next; count++; }
  if (count < k) return head;
  let prev = reverseKGroup(node, k);
  let cur = head;
  for (let i = 0; i < k; i++) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode reverseKGroup(ListNode head, Integer k) {
        ListNode node = head;
        Integer count = 0;
        while (node != null && count < k) { node = node.next; count++; }
        if (count < k) return head;
        ListNode prev = reverseKGroup(node, k);
        ListNode cur = head;
        for (Integer i = 0; i < k; i++) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
}`,
      },
    ],
  },
  {
    slug: "count-good-nodes-in-binary-tree",
    title: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees"],
    companies: ["amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "A node X in a binary tree is 'good' if no node on the path from the root to X has a value greater than X. Return the number of good nodes.",
    beginnerExplanation:
      "Walk down from the root carrying the maximum value seen so far on the path. A node is good when its value is at least that running maximum. Recurse, updating the max as you descend.",
    realWorldAnalogy:
      "Hiking up a ridge, you 'see a peak' only if it's at least as tall as every peak behind you on the trail. Count those record-or-tying peaks.",
    visualExplanation:
      "      3\n     / \\\n    1   4\n   /   / \\\n  3   1   5\ngood: 3(root),4,5,3(left leaf) → 4",
    approaches: [
      {
        title: "Path recomputation",
        tier: "Brute Force",
        idea: "For each node, re-walk the root path and check the max.",
        steps: ["For every node, collect its root path", "Good if node ≥ path max"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "DFS with running max",
        tier: "Optimal",
        idea: "Pass the path maximum down the recursion; count nodes ≥ it in one traversal.",
        steps: [
          "dfs(node, maxSoFar)",
          "good = 1 if node.val ≥ maxSoFar else 0",
          "Recurse left/right with max(maxSoFar, node.val)",
        ],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun:
      "root 3 (max=-inf → good); left 1 (max3, 1<3 not good); its child 3 (max3, 3≥3 good); right 4 (good, max4); 1(<4 no); 5(≥4 good) → 4",
    interviewTips: [
      "The single threaded-state (running max passed down) is the whole trick — no global needed.",
      "Initialise the max to negative infinity so the root always counts.",
    ],
    commonMistakes: [
      "Using `>` instead of `>=` (a node equal to the max is still good).",
      "Sharing one mutable max across siblings instead of passing per-branch.",
    ],
    followUps: ["Return the good nodes themselves.", "Count 'bad' nodes instead."],
    related: ["binary-tree-maximum-path-sum", "validate-binary-search-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def good_nodes(root):
    def dfs(node, mx):
        if not node:
            return 0
        good = 1 if node.val >= mx else 0
        m = max(mx, node.val)
        return good + dfs(node.left, m) + dfs(node.right, m)
    return dfs(root, float("-inf"))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root, Integer.MIN_VALUE);
    }
    private int dfs(TreeNode node, int mx) {
        if (node == null) return 0;
        int good = node.val >= mx ? 1 : 0;
        int m = Math.max(mx, node.val);
        return good + dfs(node.left, m) + dfs(node.right, m);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function goodNodes(root) {
  const dfs = (node, mx) => {
    if (!node) return 0;
    const good = node.val >= mx ? 1 : 0;
    const m = Math.max(mx, node.val);
    return good + dfs(node.left, m) + dfs(node.right, m);
  };
  return dfs(root, -Infinity);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer goodNodes(TreeNode root) {
        return dfs(root, -2147483648);
    }
    private static Integer dfs(TreeNode node, Integer mx) {
        if (node == null) return 0;
        Integer good = node.val >= mx ? 1 : 0;
        Integer m = Math.max(mx, node.val);
        return good + dfs(node.left, m) + dfs(node.right, m);
    }
}`,
      },
    ],
  },
  {
    slug: "kth-largest-element-in-a-stream",
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    patterns: ["heap"],
    topics: ["Heaps"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Design a class that, given k and an initial stream of numbers, returns the kth largest element after each `add(val)`. (kth largest in sorted order, not distinct.)",
    beginnerExplanation:
      "Keep a min-heap of only the k largest values seen so far. Its smallest element (the heap root) is exactly the kth largest. On each add, push, and if the heap exceeds size k, pop the smallest.",
    realWorldAnalogy:
      "A VIP rope line that holds only the top k scorers. A new score joins; if the line is over capacity, the lowest scorer is dropped. The person at the front of the rope is your kth best.",
    visualExplanation:
      "k=3, stream 4,5,8,2\nheap keeps top 3 → [4,5,8]; add 3 → still [4,5,8], 3rd largest=4; add 9 → [5,8,9], 3rd=5",
    approaches: [
      {
        title: "Re-sort every query",
        tier: "Brute Force",
        idea: "Store all values; sort and index k-th largest on each add.",
        steps: ["Append value", "Sort descending", "Return element k-1"],
        time: "O(n log n) per add",
        space: "O(n)",
      },
      {
        title: "Size-k min-heap",
        tier: "Optimal",
        idea: "Maintain a min-heap capped at size k; the root is the kth largest.",
        steps: ["Heapify initial nums, trim to size k", "add: push, pop if size > k", "Return heap root"],
        time: "O(log k) per add",
        space: "O(k)",
      },
    ],
    dryRun: "k=3, init [4,5,8,2] → heap [4,5,8]; add(3)→[4,5,8] root 4; add(5)→[5,5,8] root 5",
    interviewTips: [
      "A MIN-heap (not max) of size k is the classic trick — the smallest of the top-k is the kth largest.",
      "Heapify the initial batch once, then each add is O(log k).",
    ],
    commonMistakes: ["Using a max-heap and scanning k times.", "Forgetting to trim the heap back to size k."],
    followUps: ["Kth smallest in a stream.", "Sliding-window kth largest."],
    related: ["kth-largest-element-in-an-array", "find-median-from-data-stream"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums[:]
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class KthLargest {
    private final int k;
    private final PriorityQueue<Integer> heap = new PriorityQueue<>(); // min-heap

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int n : nums) add(n);
    }

    public int add(int val) {
        heap.offer(val);
        if (heap.size() > k) heap.poll();
        return heap.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// No built-in heap; keep a sorted array (kth largest = arr[len - k]).
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.arr = [...nums].sort((a, b) => a - b);
  }

  add(val) {
    let lo = 0, hi = this.arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.arr[mid] < val) lo = mid + 1;
      else hi = mid;
    }
    this.arr.splice(lo, 0, val);
    return this.arr[this.arr.length - this.k];
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class KthLargest {
    private Integer k;
    private List<Integer> arr = new List<Integer>(); // kept sorted ascending (no built-in heap)

    public KthLargest(Integer k, List<Integer> nums) {
        this.k = k;
        for (Integer n : nums) insert(n);
    }

    public Integer add(Integer val) {
        insert(val);
        return arr[arr.size() - k];
    }

    private void insert(Integer val) {
        Integer lo = 0, hi = arr.size();
        while (lo < hi) {
            Integer mid = (lo + hi) / 2;
            if (arr[mid] < val) lo = mid + 1;
            else hi = mid;
        }
        arr.add(lo, val);
    }
}`,
      },
    ],
  },
  {
    slug: "design-twitter",
    title: "Design Twitter",
    difficulty: "Medium",
    patterns: ["heap", "hashing"],
    topics: ["Heaps", "Hashing"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Design a simplified Twitter: postTweet(userId, tweetId), getNewsFeed(userId) returning the 10 most recent tweet ids from the user and everyone they follow, follow(a,b), and unfollow(a,b).",
    beginnerExplanation:
      "Stamp every tweet with a global time counter. For a feed, gather the relevant users' tweets and take the 10 with the largest timestamps. A heap merges the per-user tweet lists efficiently; a simple sort also works.",
    realWorldAnalogy:
      "Each person keeps a dated diary. To build your feed, you pull the diaries of yourself + everyone you follow and read off the 10 most recent entries across all of them.",
    visualExplanation:
      "post(1,5)@t0, post(2,6)@t1, 1 follows 2\nfeed(1): tweets of {1,2} by time desc → [6,5]",
    approaches: [
      {
        title: "Gather + sort",
        tier: "Brute Force",
        idea: "Collect all relevant tweets, sort by time descending, take 10.",
        steps: ["Union of self + followees", "Concatenate their tweets", "Sort by timestamp desc, slice 10"],
        time: "O(T log T) per feed",
        space: "O(T)",
      },
      {
        title: "k-way merge with a heap",
        tier: "Optimal",
        idea: "Each user's tweets are already time-ordered; push each list's newest into a max-heap and pop 10.",
        steps: ["Maps: user→tweets, user→followees", "Heap of (time, tweet) heads", "Pop 10 most recent"],
        time: "O(10 log F) per feed",
        space: "O(T)",
      },
    ],
    dryRun:
      "post(1,5)t0; post(1,3)t1; feed(1)=[3,5]; follow(1,2); post(2,6)t2; feed(1)=[6,3,5]",
    interviewTips: [
      "Lead with the global timestamp — it's what makes 'most recent' well-defined across users.",
      "Mention the heap optimisation but note a sort is fine given the feed cap of 10.",
    ],
    commonMistakes: ["Forgetting to include the user's own tweets.", "Not de-duplicating followees / self."],
    followUps: ["Paginate beyond 10.", "Trending tweets by engagement."],
    related: ["merge-k-sorted-lists", "kth-largest-element-in-a-stream"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = {}   # user -> [(time, tweetId)]
        self.follows = {}  # user -> set(followees)

    def postTweet(self, userId, tweetId):
        self.tweets.setdefault(userId, []).append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId):
        users = set(self.follows.get(userId, set())) | {userId}
        feed = []
        for u in users:
            feed.extend(self.tweets.get(u, []))
        feed.sort(reverse=True)
        return [tid for _, tid in feed[:10]]

    def follow(self, followerId, followeeId):
        self.follows.setdefault(followerId, set()).add(followeeId)

    def unfollow(self, followerId, followeeId):
        self.follows.get(followerId, set()).discard(followeeId)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Twitter {
    private int time = 0;
    private final Map<Integer, List<int[]>> tweets = new HashMap<>();
    private final Map<Integer, Set<Integer>> follows = new HashMap<>();

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, x -> new ArrayList<>()).add(new int[]{ time++, tweetId });
    }

    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> users = new HashSet<>(follows.getOrDefault(userId, new HashSet<>()));
        users.add(userId);
        List<int[]> feed = new ArrayList<>();
        for (int u : users) feed.addAll(tweets.getOrDefault(u, new ArrayList<>()));
        feed.sort((a, b) -> b[0] - a[0]);
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < Math.min(10, feed.size()); i++) res.add(feed.get(i)[1]);
        return res;
    }

    public void follow(int followerId, int followeeId) {
        follows.computeIfAbsent(followerId, x -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        follows.getOrDefault(followerId, new HashSet<>()).remove(followeeId);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class Twitter {
  constructor() {
    this.time = 0;
    this.tweets = new Map();  // user -> [[time, id]]
    this.follows = new Map(); // user -> Set
  }

  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push([this.time++, tweetId]);
  }

  getNewsFeed(userId) {
    const users = new Set(this.follows.get(userId) || []);
    users.add(userId);
    let feed = [];
    for (const u of users) feed = feed.concat(this.tweets.get(u) || []);
    feed.sort((a, b) => b[0] - a[0]);
    return feed.slice(0, 10).map((t) => t[1]);
  }

  follow(followerId, followeeId) {
    if (!this.follows.has(followerId)) this.follows.set(followerId, new Set());
    this.follows.get(followerId).add(followeeId);
  }

  unfollow(followerId, followeeId) {
    if (this.follows.has(followerId)) this.follows.get(followerId).delete(followeeId);
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Twitter {
    private Integer time = 0;
    private Map<Integer, List<List<Integer>>> tweets = new Map<Integer, List<List<Integer>>>();
    private Map<Integer, Set<Integer>> follows = new Map<Integer, Set<Integer>>();

    public void postTweet(Integer userId, Integer tweetId) {
        if (!tweets.containsKey(userId)) tweets.put(userId, new List<List<Integer>>());
        tweets.get(userId).add(new List<Integer>{ time, tweetId });
        time++;
    }

    public List<Integer> getNewsFeed(Integer userId) {
        Set<Integer> users = new Set<Integer>();
        if (follows.containsKey(userId)) users.addAll(follows.get(userId));
        users.add(userId);
        List<List<Integer>> feed = new List<List<Integer>>();
        for (Integer u : users) if (tweets.containsKey(u)) feed.addAll(tweets.get(u));
        // insertion sort by time desc (Apex can't sort List<List<Integer>> directly)
        for (Integer i = 1; i < feed.size(); i++) {
            List<Integer> cur = feed[i];
            Integer j = i - 1;
            while (j >= 0 && feed[j][0] < cur[0]) { feed[j + 1] = feed[j]; j--; }
            feed[j + 1] = cur;
        }
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < Math.min(10, feed.size()); i++) res.add(feed[i][1]);
        return res;
    }

    public void follow(Integer followerId, Integer followeeId) {
        if (!follows.containsKey(followerId)) follows.put(followerId, new Set<Integer>());
        follows.get(followerId).add(followeeId);
    }

    public void unfollow(Integer followerId, Integer followeeId) {
        if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);
    }
}`,
      },
    ],
  },
  {
    slug: "coin-change-2",
    title: "Coin Change 2",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given an integer `amount` and an array of `coins` (unlimited supply of each), return the number of distinct combinations that sum to amount. Order does not matter.",
    beginnerExplanation:
      "Count combinations, not permutations — so iterate coins on the OUTER loop. dp[a] = number of ways to make amount a. Adding a coin lets you extend every way of making (a − coin).",
    realWorldAnalogy:
      "Counting the ways to make change with given denominations where {1,2} and {2,1} are the SAME — so you commit to using a denomination fully before moving to the next, avoiding double-counting orderings.",
    visualExplanation:
      "amount=5, coins=[1,2,5]\nafter coin1: all dp=1\nafter coin2: dp[5]=3 ({5×1},{2+2+1},{2+1+1+1})... after coin5: dp[5]=4",
    approaches: [
      {
        title: "Brute-force recursion",
        tier: "Brute Force",
        idea: "Recurse on (index, remaining) choosing take/skip each coin — exponential.",
        steps: ["At each coin: skip it, or take it and stay (unlimited)", "Base: remaining==0 → 1 way"],
        time: "O(2^(amount))",
        space: "O(amount)",
      },
      {
        title: "1-D combinations DP",
        tier: "Optimal",
        idea: "Coins outer, amount inner; dp[a] += dp[a − coin]. Outer-coin ordering counts each combination once.",
        steps: ["dp[0] = 1", "For each coin c: for a from c..amount: dp[a] += dp[a−c]", "Return dp[amount]"],
        time: "O(amount × coins)",
        space: "O(amount)",
      },
    ],
    dryRun: "amount=5 coins=[1,2,5]\nc=1→dp all 1\nc=2→dp[2]=2,dp[3]=2,dp[4]=3,dp[5]=3\nc=5→dp[5]=4",
    interviewTips: [
      "Outer loop = coins is THE detail. Swapping the loops counts permutations (that's Combination Sum IV).",
      "Contrast with Coin Change (min coins) — same shape, different recurrence.",
    ],
    commonMistakes: ["Putting amount on the outer loop → counts ordered sequences.", "Forgetting dp[0]=1 base case."],
    followUps: ["Combination Sum IV (order matters).", "Reconstruct one actual combination."],
    related: ["coin-change", "target-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int c : coins)
            for (int a = c; a <= amount; a++)
                dp[a] += dp[a - c];
        return dp[amount];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins)
    for (let a = c; a <= amount; a++)
      dp[a] += dp[a - c];
  return dp[amount];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer change(Integer amount, List<Integer> coins) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= amount; i++) dp.add(0);
        dp[0] = 1;
        for (Integer c : coins)
            for (Integer a = c; a <= amount; a++)
                dp[a] += dp[a - c];
        return dp[amount];
    }
}`,
      },
    ],
  },
  {
    slug: "target-sum",
    title: "Target Sum",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given an integer array `nums` and an integer `target`, assign a '+' or '−' to each number so the resulting expression equals target. Return the number of ways to do so.",
    beginnerExplanation:
      "Split the numbers into a positive set P and negative set N. Then P − N = target and P + N = total, so P = (total + target) / 2. The answer is simply the number of subsets that sum to P — a classic subset-count DP.",
    realWorldAnalogy:
      "You're splitting weights onto two pans of a scale to hit a target imbalance. Once you know how heavy the '+' pan must be, you just count the ways to pick weights that reach it.",
    visualExplanation:
      "nums=[1,1,1,1,1], target=3\ntotal=5 → P=(5+3)/2=4 → count subsets summing to 4 = 5 ways",
    approaches: [
      {
        title: "Enumerate all sign choices",
        tier: "Brute Force",
        idea: "Try +/− for each number; count those hitting target.",
        steps: ["Recurse choosing sign per index", "Count when sum == target at the end"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "Subset-sum reduction DP",
        tier: "Optimal",
        idea: "Reduce to counting subsets summing to S=(total+target)/2 with a 1-D 0/1-knapsack count.",
        steps: [
          "If |target|>total or (total+target) is odd → 0",
          "dp[0]=1; for each n: for a from S down to n: dp[a] += dp[a−n]",
          "Return dp[S]",
        ],
        time: "O(n × S)",
        space: "O(S)",
      },
    ],
    dryRun: "nums=[1,1,1,1,1] target=3 → S=4; dp builds to dp[4]=5",
    interviewTips: [
      "The P=(total+target)/2 algebra is the unlock — name it; then it's just subset-sum counting.",
      "Guard the parity and range up front, or you'll index a negative/fractional S.",
    ],
    commonMistakes: [
      "Iterating the inner loop ascending (allows reusing a number → wrong count).",
      "Missing the odd-sum / out-of-range early return.",
    ],
    followUps: ["Return one valid assignment.", "Handle very large totals with a hash-map DP."],
    related: ["partition-equal-subset-sum", "coin-change-2"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_target_sum_ways(nums, target):
    total = sum(nums)
    if abs(target) > total or (total + target) % 2:
        return 0
    s = (total + target) // 2
    dp = [0] * (s + 1)
    dp[0] = 1
    for n in nums:
        for a in range(s, n - 1, -1):
            dp[a] += dp[a - n]
    return dp[s]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int n : nums) total += n;
        if (Math.abs(target) > total || (total + target) % 2 != 0) return 0;
        int s = (total + target) / 2;
        int[] dp = new int[s + 1];
        dp[0] = 1;
        for (int n : nums)
            for (int a = s; a >= n; a--)
                dp[a] += dp[a - n];
        return dp[s];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findTargetSumWays(nums, target) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
  const s = (total + target) / 2;
  const dp = new Array(s + 1).fill(0);
  dp[0] = 1;
  for (const n of nums)
    for (let a = s; a >= n; a--)
      dp[a] += dp[a - n];
  return dp[s];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findTargetSumWays(List<Integer> nums, Integer target) {
        Integer total = 0;
        for (Integer n : nums) total += n;
        if (Math.abs(target) > total || Math.mod(total + target, 2) != 0) return 0;
        Integer s = (total + target) / 2;
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= s; i++) dp.add(0);
        dp[0] = 1;
        for (Integer n : nums)
            for (Integer a = s; a >= n; a--)
                dp[a] += dp[a - n];
        return dp[s];
    }
}`,
      },
    ],
  },
  {
    slug: "interleaving-string",
    title: "Interleaving String",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given strings s1, s2 and s3, return true if s3 is formed by an interleaving of s1 and s2 — i.e. s3 contains all characters of s1 and s2 in their original relative orders.",
    beginnerExplanation:
      "dp[i][j] answers: can s3's first i+j characters be built from s1's first i and s2's first j? You reach dp[i][j] either by matching s1's i-th char (from dp[i-1][j]) or s2's j-th char (from dp[i][j-1]).",
    realWorldAnalogy:
      "Two card dealers each deal from their own ordered deck into one shared pile. Given the pile, decide whether it could have come from interleaving the two decks without reordering either.",
    visualExplanation:
      's1="aab" s2="axy" s3="aaxaby"? lengths 3+3=6 ✓; fill dp grid, dp[3][3] decides',
    approaches: [
      {
        title: "Recursive try-both",
        tier: "Brute Force",
        idea: "At each step consume from s1 or s2 if it matches s3's next char; recurse.",
        steps: ["Match pointer i in s1 or j in s2 against s3[i+j]", "Recurse; memoize to avoid blow-up"],
        time: "O(2^(m+n)) naive",
        space: "O(m+n)",
      },
      {
        title: "2-D DP grid",
        tier: "Optimal",
        idea: "Bottom-up boolean grid; each cell depends on the cell above or to the left when the corresponding char matches.",
        steps: [
          "If len(s1)+len(s2) != len(s3) → false",
          "dp[0][0]=true",
          "dp[i][j] = (i>0 && s1[i-1]==s3[i+j-1] && dp[i-1][j]) || (j>0 && s2[j-1]==s3[i+j-1] && dp[i][j-1])",
        ],
        time: "O(m × n)",
        space: "O(m × n) (O(n) optimisable)",
      },
    ],
    dryRun: 's1="ab" s2="cd" s3="acbd" → dp[2][2]=true (a,c,b,d alternates)',
    interviewTips: [
      "State the dp meaning precisely ('first i+j chars from first i of s1 and j of s2') — the recurrence falls out of it.",
      "The length check is a free early-out; always do it first.",
    ],
    commonMistakes: [
      "Indexing s3 with i or j alone instead of i+j-1.",
      "Skipping the length pre-check and getting out-of-range.",
    ],
    followUps: ["Reduce to O(n) space (one row).", "Reconstruct the interleaving."],
    related: ["edit-distance", "distinct-subsequences"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_interleave(s1, s2, s3):
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for i in range(m + 1):
        for j in range(n + 1):
            if i > 0 and s1[i-1] == s3[i+j-1] and dp[i-1][j]:
                dp[i][j] = True
            if j > 0 and s2[j-1] == s3[i+j-1] and dp[i][j-1]:
                dp[i][j] = True
    return dp[m][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i > 0 && s1.charAt(i-1) == s3.charAt(i+j-1) && dp[i-1][j]) dp[i][j] = true;
                if (j > 0 && s2.charAt(j-1) == s3.charAt(i+j-1) && dp[i][j-1]) dp[i][j] = true;
            }
        }
        return dp[m][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i > 0 && s1[i-1] === s3[i+j-1] && dp[i-1][j]) dp[i][j] = true;
      if (j > 0 && s2[j-1] === s3[i+j-1] && dp[i][j-1]) dp[i][j] = true;
    }
  }
  return dp[m][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isInterleave(String s1, String s2, String s3) {
        Integer m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        List<List<Boolean>> dp = new List<List<Boolean>>();
        for (Integer i = 0; i <= m; i++) {
            List<Boolean> row = new List<Boolean>();
            for (Integer j = 0; j <= n; j++) row.add(false);
            dp.add(row);
        }
        dp[0][0] = true;
        for (Integer i = 0; i <= m; i++) {
            for (Integer j = 0; j <= n; j++) {
                if (i > 0 && s1.substring(i-1, i) == s3.substring(i+j-1, i+j) && dp[i-1][j]) dp[i][j] = true;
                if (j > 0 && s2.substring(j-1, j) == s3.substring(i+j-1, i+j) && dp[i][j-1]) dp[i][j] = true;
            }
        }
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    slug: "distinct-subsequences",
    title: "Distinct Subsequences",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given strings s and t, return the number of distinct subsequences of s that equal t. (A subsequence keeps relative order but may drop characters.)",
    beginnerExplanation:
      "dp[i][j] = number of ways the first i chars of s form the first j chars of t. You can always skip s[i-1] (dp[i-1][j]); if s[i-1]==t[j-1], you may also use it (add dp[i-1][j-1]).",
    realWorldAnalogy:
      "Counting how many ways you can cross out letters from a long word to spell a shorter target — different sets of crossings that yield the same target each count once.",
    visualExplanation:
      's="rabbbit" t="rabbit" → 3 (the three b-choices give 3 distinct subsequences)',
    approaches: [
      {
        title: "Enumerate subsequences",
        tier: "Brute Force",
        idea: "Generate subsequences of s and count matches to t — exponential.",
        steps: ["For each char: skip or take", "Count sequences equal to t"],
        time: "O(2^|s|)",
        space: "O(|s|)",
      },
      {
        title: "2-D DP",
        tier: "Optimal",
        idea: "Build counts bottom-up: empty t is matched 1 way by any prefix of s.",
        steps: [
          "dp[i][0] = 1 for all i",
          "dp[i][j] = dp[i-1][j] + (s[i-1]==t[j-1] ? dp[i-1][j-1] : 0)",
          "Return dp[|s|][|t|]",
        ],
        time: "O(|s| × |t|)",
        space: "O(|s| × |t|) (O(|t|) optimisable)",
      },
    ],
    dryRun: 's="babgbag" t="bag" → dp fills to 5',
    interviewTips: [
      "Base case dp[i][0]=1 (deleting everything matches the empty string) is essential — set it explicitly.",
      "The 'skip vs take' split is the same shape as edit distance / LCS — relate them.",
    ],
    commonMistakes: [
      "Initialising dp[0][j>0] to anything but 0.",
      "Adding the diagonal even when characters don't match.",
    ],
    followUps: ["Reduce to one row (O(|t|) space).", "Return the actual subsequences."],
    related: ["edit-distance", "longest-common-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def num_distinct(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = 1
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i-1][j]
            if s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]
    return dp[m][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                dp[i][j] = dp[i-1][j];
                if (s.charAt(i-1) == t.charAt(j-1)) dp[i][j] += dp[i-1][j-1];
            }
        }
        return dp[m][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numDistinct(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = 1;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i-1][j];
      if (s[i-1] === t[j-1]) dp[i][j] += dp[i-1][j-1];
    }
  }
  return dp[m][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer numDistinct(String s, String t) {
        Integer m = s.length(), n = t.length();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            row[0] = 1;
            dp.add(row);
        }
        for (Integer i = 1; i <= m; i++) {
            for (Integer j = 1; j <= n; j++) {
                dp[i][j] = dp[i-1][j];
                if (s.substring(i-1, i) == t.substring(j-1, j)) dp[i][j] += dp[i-1][j-1];
            }
        }
        return dp[m][n];
    }
}`,
      },
    ],
  },
];

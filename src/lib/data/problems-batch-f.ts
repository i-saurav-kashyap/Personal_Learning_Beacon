import type { Problem } from "@/lib/types";

// Batch F — Trees / Backtracking / Heap / Design. Fills the remaining
// maang-100 gaps. Titles match the MAANG/A2Z names so the course auto-links.

export const PROBLEMS_BATCH_F: Problem[] = [
  {
    slug: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    patterns: ["trees"],
    topics: ["Trees", "Design"],
    companies: ["meta", "amazon", "google", "microsoft"],
    sheets: ["neetcode150", "blind75"],
    frequency: 5,
    statement:
      "Design an algorithm to serialize a binary tree to a string and deserialize that string back to the identical tree. There is no restriction on the format.",
    beginnerExplanation:
      "Walk the tree in a fixed order (preorder) and write each value down; for an empty child write a placeholder like '#'. Those placeholders record the exact shape, so reading the same list back in the same order rebuilds the identical tree.",
    realWorldAnalogy:
      "Like flat-packing furniture: you write down every part and every empty slot in a strict order. Following the same order in reverse reassembles the exact same piece — no guesswork about what goes where.",
    visualExplanation:
      "tree:    1\n        / \\\n       2   3\n          / \\\n         4   5\npreorder w/ nulls: 1,2,#,#,3,4,#,#,5,#,#",
    approaches: [
      {
        title: "Level-order with null markers",
        tier: "Better",
        idea: "BFS queue, emitting values and '#' for missing children.",
        steps: ["Queue from root", "Emit value or '#'", "Rebuild level by level from the tokens"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Preorder DFS with sentinels",
        tier: "Optimal",
        idea: "Preorder traversal writing '#' for null; deserialize by consuming tokens in the same order.",
        steps: [
          "serialize: preorder, append value or '#'",
          "deserialize: read next token; '#' → null, else make node and recurse left then right",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "serialize [1,2,#,#,3] → '1,2,#,#,3,#,#'\ndeserialize: read 1→node, left: read 2→node, its left '#'→null, right '#'→null, back up, right: read 3...",
    interviewTips: [
      "Preorder is the cleanest: serialization and reconstruction share the exact same recursion order.",
      "State your token format and delimiter up front; mention how you'd handle negative values / large trees.",
    ],
    commonMistakes: [
      "Forgetting null markers — without them the structure is ambiguous.",
      "Reading tokens in a different order than they were written.",
    ],
    followUps: ["Serialize a BST more compactly (no null markers needed).", "Serialize an N-ary tree."],
    related: ["binary-tree-level-order-traversal", "invert-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `# class TreeNode: def __init__(self, val=0, left=None, right=None): ...
class Codec:
    def serialize(self, root):
        out = []
        def dfs(node):
            if not node:
                out.append("#")
                return
            out.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(out)

    def deserialize(self, data):
        vals = iter(data.split(","))
        def build():
            v = next(vals)
            if v == "#":
                return None
            node = TreeNode(int(v))
            node.left = build()
            node.right = build()
            return node
        return build()`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        dfs(root, sb);
        return sb.toString();
    }
    private void dfs(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("#,"); return; }
        sb.append(node.val).append(",");
        dfs(node.left, sb);
        dfs(node.right, sb);
    }

    private int idx;
    public TreeNode deserialize(String data) {
        idx = 0;
        return build(data.split(","));
    }
    private TreeNode build(String[] vals) {
        String v = vals[idx++];
        if (v.equals("#")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(v));
        node.left = build(vals);
        node.right = build(vals);
        return node;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function serialize(root) {
  const out = [];
  const dfs = (node) => {
    if (!node) { out.push("#"); return; }
    out.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return out.join(",");
}

function deserialize(data) {
  const vals = data.split(",");
  let i = 0;
  const build = () => {
    const v = vals[i++];
    if (v === "#") return null;
    const node = new TreeNode(Number(v));
    node.left = build();
    node.right = build();
    return node;
  };
  return build();
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Codec {
    public String serialize(TreeNode root) {
        List<String> out = new List<String>();
        dfs(root, out);
        return String.join(out, ',');
    }
    private void dfs(TreeNode node, List<String> out) {
        if (node == null) { out.add('#'); return; }
        out.add(String.valueOf(node.val));
        dfs(node.left, out);
        dfs(node.right, out);
    }

    private Integer idx;
    public TreeNode deserialize(String data) {
        idx = 0;
        return build(data.split(','));
    }
    private TreeNode build(List<String> vals) {
        String v = vals[idx];
        idx++;
        if (v == '#') return null;
        TreeNode node = new TreeNode(Integer.valueOf(v));
        node.left = build(vals);
        node.right = build(vals);
        return node;
    }
}`,
      },
    ],
  },
  {
    slug: "design-add-and-search-words-data-structure",
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Tries", "Design"],
    companies: ["meta", "amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Design a data structure that supports addWord(word) and search(word), where search may contain '.' as a wildcard that matches any single letter.",
    beginnerExplanation:
      "Store words in a trie (prefix tree). For a normal letter you follow that one branch; for a '.' you must try every branch at that level. So search is a small depth-first exploration over the trie.",
    realWorldAnalogy:
      "A filing cabinet where each drawer is a letter. A '.' means 'open every drawer at this level and keep looking' — you fan out instead of going straight to one drawer.",
    visualExplanation:
      'add "bad","dad","mad"\nsearch ".ad" → try b→a→d ✓ (also d.., m..)\nsearch "b.." → b→a→d ✓',
    approaches: [
      {
        title: "Store words in a list, regex/scan each",
        tier: "Brute Force",
        idea: "Keep all words; on search compare against each, treating '.' as any char.",
        steps: ["Append on add", "On search, scan every word of equal length"],
        time: "search O(n·L)",
        space: "O(n·L)",
      },
      {
        title: "Trie with wildcard DFS",
        tier: "Optimal",
        idea: "Insert into a trie; on '.' recurse into all children, else into the matching child.",
        steps: [
          "addWord: walk/create nodes, mark end",
          "search: at '.' try all children, else the one child; success = reached end flag at word length",
        ],
        time: "add O(L); search O(L) avg, O(26^L) worst with many dots",
        space: "O(total chars)",
      },
    ],
    dryRun: 'add "bad"; search "b.d": b→ then "." tries a→ then d (end) → true',
    interviewTips: [
      "Lead with the trie; the wildcard is just 'branch on all children' inside the DFS.",
      "Mention the worst case (a query of all dots) is exponential — bound it by noting words are short.",
    ],
    commonMistakes: [
      "Checking the end flag at the wrong depth.",
      "On '.' returning after the first child instead of trying all of them.",
    ],
    followUps: ["Support '*' (match zero or more).", "Delete a word from the structure."],
    related: ["implement-trie-prefix-tree", "word-search-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return "$" in node
            ch = word[i]
            if ch == ".":
                return any(k != "$" and dfs(child, i + 1) for k, child in node.items())
            return ch in node and dfs(node[ch], i + 1)
        return dfs(self.root, 0)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class WordDictionary {
    static class Node { Node[] kids = new Node[26]; boolean end; }
    private final Node root = new Node();

    public void addWord(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (node.kids[i] == null) node.kids[i] = new Node();
            node = node.kids[i];
        }
        node.end = true;
    }

    public boolean search(String word) { return dfs(word, 0, root); }

    private boolean dfs(String word, int i, Node node) {
        if (node == null) return false;
        if (i == word.length()) return node.end;
        char c = word.charAt(i);
        if (c == '.') {
            for (Node child : node.kids)
                if (child != null && dfs(word, i + 1, child)) return true;
            return false;
        }
        return dfs(word, i + 1, node.kids[c - 'a']);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class WordDictionary {
  constructor() { this.root = {}; }

  addWord(word) {
    let node = this.root;
    for (const ch of word) node = node[ch] || (node[ch] = {});
    node.$ = true;
  }

  search(word) {
    const dfs = (node, i) => {
      if (i === word.length) return node.$ === true;
      const ch = word[i];
      if (ch === ".") {
        for (const k in node) if (k !== "$" && dfs(node[k], i + 1)) return true;
        return false;
      }
      return node[ch] !== undefined && dfs(node[ch], i + 1);
    };
    return dfs(this.root, 0);
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class WordDictionary {
    class Node {
        Map<String, Node> kids = new Map<String, Node>();
        Boolean isEnd = false;
    }
    Node root = new Node();

    public void addWord(String word) {
        Node node = root;
        for (Integer i = 0; i < word.length(); i++) {
            String c = word.substring(i, i + 1);
            if (!node.kids.containsKey(c)) node.kids.put(c, new Node());
            node = node.kids.get(c);
        }
        node.isEnd = true;
    }

    public Boolean search(String word) { return dfs(word, 0, root); }

    private Boolean dfs(String word, Integer i, Node node) {
        if (node == null) return false;
        if (i == word.length()) return node.isEnd;
        String c = word.substring(i, i + 1);
        if (c == '.') {
            for (Node child : node.kids.values())
                if (dfs(word, i + 1, child)) return true;
            return false;
        }
        return node.kids.containsKey(c) && dfs(word, i + 1, node.kids.get(c));
    }
}`,
      },
    ],
  },
  {
    slug: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Strings", "Backtracking"],
    companies: ["amazon", "meta", "google"],
    sheets: ["neetcode150", "blind75"],
    frequency: 4,
    statement:
      "Given a string of digits 2–9, return all letter combinations the number could spell, using the classic phone keypad mapping. Return an empty list for empty input.",
    beginnerExplanation:
      "Each digit maps to a few letters. Build combinations one digit at a time: pick a letter for the current digit, recurse to the next, then undo and try the next letter. That choose/recurse/undo loop is backtracking.",
    realWorldAnalogy:
      "An old odometer where each wheel (digit) has a few letters. You spin through every combination of wheel positions to read off every possible word.",
    visualExplanation:
      'digits="23"\n2→[a,b,c], 3→[d,e,f]\na: ad ae af\nb: bd be bf\nc: cd ce cf',
    approaches: [
      {
        title: "Iterative product build-up",
        tier: "Better",
        idea: "Start with [''] and for each digit replace the list with every existing string × each letter.",
        steps: ["res=['']", "for digit: res = [p+ch for p in res for ch in letters]"],
        time: "O(4^n · n)",
        space: "O(4^n · n)",
      },
      {
        title: "Backtracking",
        tier: "Optimal",
        idea: "DFS choosing one letter per digit; record the string at full depth.",
        steps: ["map digit→letters", "backtrack(i, path): at i==len record; else loop letters of digits[i]"],
        time: "O(4^n · n)",
        space: "O(n) recursion (excluding output)",
      },
    ],
    dryRun: 'digits="2": backtrack picks a→"a", b→"b", c→"c" → ["a","b","c"]',
    interviewTips: [
      "Handle the empty-input edge case explicitly — it's the most-missed test.",
      "Complexity is output-bound: ~4^n combinations, so you can't beat exponential.",
    ],
    commonMistakes: [
      "Returning ['' ] instead of [] for empty input.",
      "Mutating a shared buffer without restoring it (when using a list path).",
    ],
    followUps: ["What if digits include 0/1 (no letters)?", "Generate combinations lazily as a stream."],
    related: ["permutations", "subsets"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def letter_combinations(digits):
    if not digits:
        return []
    m = {"2":"abc","3":"def","4":"ghi","5":"jkl",
         "6":"mno","7":"pqrs","8":"tuv","9":"wxyz"}
    res = []
    def backtrack(i, path):
        if i == len(digits):
            res.append("".join(path))
            return
        for ch in m[digits[i]]:
            path.append(ch)
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private static final String[] MAP =
        {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits == null || digits.isEmpty()) return res;
        backtrack(digits, 0, new StringBuilder(), res);
        return res;
    }
    private void backtrack(String digits, int i, StringBuilder sb, List<String> res) {
        if (i == digits.length()) { res.add(sb.toString()); return; }
        for (char c : MAP[digits.charAt(i) - '0'].toCharArray()) {
            sb.append(c);
            backtrack(digits, i + 1, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function letterCombinations(digits) {
  if (!digits) return [];
  const m = { 2:"abc",3:"def",4:"ghi",5:"jkl",6:"mno",7:"pqrs",8:"tuv",9:"wxyz" };
  const res = [];
  const backtrack = (i, path) => {
    if (i === digits.length) { res.push(path); return; }
    for (const ch of m[digits[i]]) backtrack(i + 1, path + ch);
  };
  backtrack(0, "");
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Map<String, String> M = new Map<String, String>{
        '2'=>'abc','3'=>'def','4'=>'ghi','5'=>'jkl',
        '6'=>'mno','7'=>'pqrs','8'=>'tuv','9'=>'wxyz'
    };
    public static List<String> letterCombinations(String digits) {
        List<String> res = new List<String>();
        if (String.isBlank(digits)) return res;
        backtrack(digits, 0, '', res);
        return res;
    }
    private static void backtrack(String digits, Integer i, String path, List<String> res) {
        if (i == digits.length()) { res.add(path); return; }
        String letters = M.get(digits.substring(i, i + 1));
        for (Integer j = 0; j < letters.length(); j++) {
            backtrack(digits, i + 1, path + letters.substring(j, j + 1), res);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Arrays"],
    companies: ["amazon", "meta", "google", "microsoft"],
    sheets: ["neetcode150", "blind75", "striver"],
    frequency: 4,
    statement:
      "Given an array of distinct integers, return all possible permutations in any order.",
    beginnerExplanation:
      "Build a permutation by repeatedly picking an unused number, recursing, then putting it back. A 'used' marker per index keeps you from reusing a number within the same arrangement.",
    realWorldAnalogy:
      "Seating distinct guests in a row: choose who sits first, then who's next from those remaining, and so on — every distinct seating is one permutation.",
    visualExplanation:
      "[1,2,3]\n1→[2,3]: 123,132\n2→[1,3]: 213,231\n3→[1,2]: 312,321",
    approaches: [
      {
        title: "Insert-everywhere",
        tier: "Better",
        idea: "Build up by inserting each number into every position of existing partial permutations.",
        steps: ["Start with [[]]", "For each num, splice it into every gap of every current permutation"],
        time: "O(n! · n)",
        space: "O(n! · n)",
      },
      {
        title: "Backtracking with used[]",
        tier: "Optimal",
        idea: "DFS choosing an unused index each level; record at full length.",
        steps: ["used = all false", "loop indices; skip used; choose → recurse → unchoose"],
        time: "O(n! · n)",
        space: "O(n) recursion",
      },
    ],
    dryRun: "[1,2]: choose 1 → choose 2 → [1,2]; back; choose 2 → choose 1 → [2,1]",
    interviewTips: [
      "Distinguish permutations (order matters, use all) from subsets/combinations.",
      "The 'used' set vs swapping in place are two equivalent framings — pick one and be consistent.",
    ],
    commonMistakes: [
      "Appending the path reference instead of a copy.",
      "Forgetting to reset the used marker after recursing.",
    ],
    followUps: ["Permutations II (with duplicates).", "Next permutation in O(n)."],
    related: ["subsets", "combination-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def permute(nums):
    res = []
    used = [False] * len(nums)
    def backtrack(path):
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            path.append(nums[i])
            backtrack(path)
            path.pop()
            used[i] = False
    backtrack([])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    private void backtrack(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> res) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true; path.add(nums[i]);
            backtrack(nums, path, used, res);
            path.remove(path.size() - 1); used[i] = false;
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function permute(nums) {
  const res = [];
  const used = Array(nums.length).fill(false);
  const backtrack = (path) => {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      backtrack(path);
      path.pop(); used[i] = false;
    }
  };
  backtrack([]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> permute(List<Integer> nums) {
        List<List<Integer>> res = new List<List<Integer>>();
        backtrack(nums, new List<Integer>(), new Set<Integer>(), res);
        return res;
    }
    private static void backtrack(List<Integer> nums, List<Integer> path, Set<Integer> used, List<List<Integer>> res) {
        if (path.size() == nums.size()) { res.add(new List<Integer>(path)); return; }
        for (Integer i = 0; i < nums.size(); i++) {
            if (used.contains(i)) continue;
            used.add(i); path.add(nums[i]);
            backtrack(nums, path, used, res);
            path.remove(path.size() - 1); used.remove(i);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "subsets-ii",
    title: "Subsets II",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Arrays"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150", "striver"],
    frequency: 3,
    statement:
      "Given an integer array that may contain duplicates, return all possible subsets (the power set) with no duplicate subsets.",
    beginnerExplanation:
      "Sort first so equal numbers sit together. As you build subsets, at each level skip a value that's identical to the previous sibling you already tried — that's what prevents duplicate subsets.",
    realWorldAnalogy:
      "Choosing toppings where you have two identical olives: picking 'olive #1' vs 'olive #2' makes the same pizza, so you only count it once.",
    visualExplanation:
      "[1,2,2] sorted\n[] [1] [1,2] [1,2,2] [2] [2,2]\nthe second 2 at the same level is skipped to avoid repeats",
    approaches: [
      {
        title: "All subsets then dedupe via set",
        tier: "Brute Force",
        idea: "Generate every subset, sort each, store in a set of tuples.",
        steps: ["Generate 2^n subsets", "Canonicalize and dedupe"],
        time: "O(2^n · n log n)",
        space: "O(2^n · n)",
      },
      {
        title: "Sort + skip duplicate siblings",
        tier: "Optimal",
        idea: "Backtrack; at each start, skip nums[i]==nums[i-1] when i>start.",
        steps: ["sort", "record path at every node", "for i in [start..]: if i>start and equal to prev, skip"],
        time: "O(2^n · n)",
        space: "O(n) recursion",
      },
    ],
    dryRun: "[1,2,2]: start0 add1 → add2 → add2 → pop... at start after first 2, second 2 (i>start, equal) skipped",
    interviewTips: [
      "The 'i > start' guard (not 'i > 0') is the crux — it skips duplicates only at the same tree level.",
      "Sorting is mandatory for the dedupe trick to work.",
    ],
    commonMistakes: [
      "Using i > 0 instead of i > start, which wrongly drops valid subsets.",
      "Forgetting to sort first.",
    ],
    followUps: ["Subsets (no duplicates).", "Count distinct subsets without listing them."],
    related: ["subsets", "combination-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subsets_with_dup(nums):
    nums.sort()
    res = []
    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.add(nums[i]);
            backtrack(nums, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const backtrack = (start, path) => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> subsetsWithDup(List<Integer> nums) {
        nums.sort();
        List<List<Integer>> res = new List<List<Integer>>();
        backtrack(nums, 0, new List<Integer>(), res);
        return res;
    }
    private static void backtrack(List<Integer> nums, Integer start, List<Integer> path, List<List<Integer>> res) {
        res.add(new List<Integer>(path));
        for (Integer i = start; i < nums.size(); i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.add(nums[i]);
            backtrack(nums, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "combination-sum-ii",
    title: "Combination Sum II",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150", "striver"],
    frequency: 3,
    statement:
      "Given a collection of candidate numbers (which may contain duplicates) and a target, return all unique combinations summing to target. Each number may be used at most once.",
    beginnerExplanation:
      "Sort, then backtrack advancing the start index by one each pick (so a number isn't reused). Skip a duplicate at the same level to avoid repeated combinations, and stop early once a candidate exceeds the remaining target.",
    realWorldAnalogy:
      "Picking distinct coins from a pile (some coins identical) to hit an exact amount — using each physical coin once and not counting the same multiset twice.",
    visualExplanation:
      "candidates=[1,1,2,5,6,7,10], target=8\n[1,7] [1,2,5] [2,6] [1,1,6] ...\nsecond leading 1 at a level skipped",
    approaches: [
      {
        title: "Subsets then filter",
        tier: "Brute Force",
        idea: "Enumerate all subsets, keep those summing to target, dedupe.",
        steps: ["Generate 2^n subsets", "Filter by sum, dedupe"],
        time: "O(2^n · n)",
        space: "O(2^n)",
      },
      {
        title: "Sort + backtrack i+1 with skip & prune",
        tier: "Optimal",
        idea: "Advance start by 1 (use-once); skip duplicate siblings; break when candidate > remaining.",
        steps: ["sort", "remain==0 → record", "loop from start; skip dup; break if c[i]>remain; recurse i+1"],
        time: "O(2^n)",
        space: "O(n) recursion",
      },
    ],
    dryRun: "[1,1,2], t=3: 1→1→(remain1) ; 1→2 → [1,2] ✓ ; second top-level 1 skipped (dup)",
    interviewTips: [
      "Two differences from Combination Sum I: recurse on i+1 (use-once) and skip duplicate siblings.",
      "Sorting enables both the dup-skip and the early break prune.",
    ],
    commonMistakes: [
      "Recursing on i instead of i+1 (reuses a number).",
      "Missing the duplicate-sibling skip → duplicate combinations.",
    ],
    followUps: ["Combination Sum I (unlimited reuse).", "Count combinations only."],
    related: ["combination-sum", "subsets-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def combination_sum2(candidates, target):
    candidates.sort()
    res = []
    def backtrack(start, remain, path):
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            backtrack(i + 1, remain - candidates[i], path)
            path.pop()
    backtrack(0, target, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] c, int start, int remain, List<Integer> path, List<List<Integer>> res) {
        if (remain == 0) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i < c.length; i++) {
            if (i > start && c[i] == c[i - 1]) continue;
            if (c[i] > remain) break;
            path.add(c[i]);
            backtrack(c, i + 1, remain - c[i], path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];
  const backtrack = (start, remain, path) => {
    if (remain === 0) { res.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > remain) break;
      path.push(candidates[i]);
      backtrack(i + 1, remain - candidates[i], path);
      path.pop();
    }
  };
  backtrack(0, target, []);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> combinationSum2(List<Integer> candidates, Integer target) {
        candidates.sort();
        List<List<Integer>> res = new List<List<Integer>>();
        backtrack(candidates, 0, target, new List<Integer>(), res);
        return res;
    }
    private static void backtrack(List<Integer> c, Integer start, Integer remain, List<Integer> path, List<List<Integer>> res) {
        if (remain == 0) { res.add(new List<Integer>(path)); return; }
        for (Integer i = start; i < c.size(); i++) {
            if (i > start && c[i] == c[i - 1]) continue;
            if (c[i] > remain) break;
            path.add(c[i]);
            backtrack(c, i + 1, remain - c[i], path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150", "striver"],
    frequency: 3,
    statement:
      "Given a string s, partition it so that every substring of the partition is a palindrome. Return all possible palindrome partitionings.",
    beginnerExplanation:
      "Try every prefix of the remaining string; if that prefix is a palindrome, fix it as one piece and recurse on the rest. Collect a full partition whenever you consume the whole string.",
    realWorldAnalogy:
      "Cutting a ribbon printed with letters so that every segment reads the same both ways — you test each possible cut point and keep exploring only the valid ones.",
    visualExplanation:
      's="aab"\n"a" | "a" | "b" ✓\n"aa" | "b" ✓\n"aab" not palindrome → prune',
    approaches: [
      {
        title: "Backtracking with on-the-fly palindrome check",
        tier: "Better",
        idea: "For each end, if s[start..end] is a palindrome, recurse from end+1.",
        steps: ["loop end from start", "if palindrome, add slice, recurse, remove"],
        time: "O(2^n · n)",
        space: "O(n) recursion",
      },
      {
        title: "Backtracking + DP palindrome table",
        tier: "Optimal",
        idea: "Precompute pal[i][j] so each palindrome test is O(1).",
        steps: ["build pal[i][j] via DP", "backtrack using O(1) lookups"],
        time: "O(2^n · n)",
        space: "O(n²)",
      },
    ],
    dryRun: 's="aab": start0 "a" pal → start1 "a" pal → start2 "b" pal → ["a","a","b"]; also "aa"+"b"',
    interviewTips: [
      "Precomputing the palindrome DP table removes repeated O(n) checks — mention the trade-off.",
      "It's the partitioning cousin of subsets: the 'cut points' are your choices.",
    ],
    commonMistakes: [
      "Off-by-one in the substring end index.",
      "Re-checking palindromes repeatedly instead of caching when asked to optimize.",
    ],
    followUps: ["Palindrome Partitioning II (min cuts).", "Count partitions only."],
    related: ["subsets", "longest-palindromic-substring"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def partition(s):
    res = []
    def is_pal(l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1; r -= 1
        return True
    def backtrack(start, path):
        if start == len(s):
            res.append(path[:])
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                path.append(s[start:end + 1])
                backtrack(end + 1, path)
                path.pop()
    backtrack(0, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(String s, int start, List<String> path, List<List<String>> res) {
        if (start == s.length()) { res.add(new ArrayList<>(path)); return; }
        for (int end = start; end < s.length(); end++) {
            if (isPal(s, start, end)) {
                path.add(s.substring(start, end + 1));
                backtrack(s, end + 1, path, res);
                path.remove(path.size() - 1);
            }
        }
    }
    private boolean isPal(String s, int l, int r) {
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function partition(s) {
  const res = [];
  const isPal = (l, r) => { while (l < r) { if (s[l++] !== s[r--]) return false; } return true; };
  const backtrack = (start, path) => {
    if (start === s.length) { res.push([...path]); return; }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };
  backtrack(0, []);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<String>> partition(String s) {
        List<List<String>> res = new List<List<String>>();
        backtrack(s, 0, new List<String>(), res);
        return res;
    }
    private static void backtrack(String s, Integer start, List<String> path, List<List<String>> res) {
        if (start == s.length()) { res.add(new List<String>(path)); return; }
        for (Integer endi = start; endi < s.length(); endi++) {
            if (isPal(s, start, endi)) {
                path.add(s.substring(start, endi + 1));
                backtrack(s, endi + 1, path, res);
                path.remove(path.size() - 1);
            }
        }
    }
    private static Boolean isPal(String s, Integer l, Integer r) {
        while (l < r) {
            if (s.substring(l, l + 1) != s.substring(r, r + 1)) return false;
            l++; r--;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    patterns: ["backtracking"],
    topics: ["Backtracking"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Place n queens on an n×n board so no two attack each other (no shared row, column, or diagonal). Return all distinct board configurations.",
    beginnerExplanation:
      "Place one queen per row. For each row, try every column that isn't already threatened along a column or either diagonal. Track threats with three sets (columns, r−c, r+c) so each check is O(1); undo on backtrack.",
    realWorldAnalogy:
      "Seating n guests who each refuse to share a row, column, or diagonal line of sight — you fill row by row, skipping any seat someone already 'sees'.",
    visualExplanation:
      "diagonals: cells on a ↘ share (r−c); cells on a ↙ share (r+c)\nplace row0 col1 → block col1, diag(-1), anti(1) for deeper rows",
    approaches: [
      {
        title: "Scan board for conflicts each placement",
        tier: "Brute Force",
        idea: "Try columns per row; validate by scanning column and both diagonals.",
        steps: ["place per row", "O(n) validity scan each try"],
        time: "O(n! · n)",
        space: "O(n²)",
      },
      {
        title: "Backtracking with column/diagonal sets",
        tier: "Optimal",
        idea: "Three hash sets give O(1) attack checks; place row by row.",
        steps: ["per row, per col: skip if col/(r−c)/(r+c) used", "mark, recurse, unmark", "record at row==n"],
        time: "O(n!)",
        space: "O(n)",
      },
    ],
    dryRun: "n=4: row0 c1 → row1 c3 → row2 c0 → row3 c2 → valid board; backtrack finds the second solution too",
    interviewTips: [
      "The (r−c) and (r+c) diagonal keys are the trick that turns O(n) checks into O(1).",
      "If only the count is needed (N-Queens II), skip building the board strings.",
    ],
    commonMistakes: [
      "Using one diagonal set instead of two (↘ and ↙ are different).",
      "Forgetting to remove markers when backtracking.",
    ],
    followUps: ["N-Queens II (count only).", "Return one valid solution as fast as possible."],
    related: ["permutations", "word-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def solve_n_queens(n):
    res = []
    cols, diag, anti = set(), set(), set()
    board = [["."] * n for _ in range(n)]
    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag or (r + c) in anti:
                continue
            cols.add(c); diag.add(r - c); anti.add(r + c)
            board[r][c] = "Q"
            backtrack(r + 1)
            board[r][c] = "."
            cols.discard(c); diag.discard(r - c); anti.discard(r + c)
    backtrack(0)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        backtrack(0, n, board, new HashSet<>(), new HashSet<>(), new HashSet<>(), res);
        return res;
    }
    private void backtrack(int r, int n, char[][] board, Set<Integer> cols,
                           Set<Integer> diag, Set<Integer> anti, List<List<String>> res) {
        if (r == n) {
            List<String> sol = new ArrayList<>();
            for (char[] row : board) sol.add(new String(row));
            res.add(sol);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols.contains(c) || diag.contains(r - c) || anti.contains(r + c)) continue;
            cols.add(c); diag.add(r - c); anti.add(r + c); board[r][c] = 'Q';
            backtrack(r + 1, n, board, cols, diag, anti, res);
            board[r][c] = '.'; cols.remove(c); diag.remove(r - c); anti.remove(r + c);
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function solveNQueens(n) {
  const res = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const cols = new Set(), diag = new Set(), anti = new Set();
  const backtrack = (r) => {
    if (r === n) { res.push(board.map((row) => row.join(""))); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c); diag.add(r - c); anti.add(r + c); board[r][c] = "Q";
      backtrack(r + 1);
      board[r][c] = "."; cols.delete(c); diag.delete(r - c); anti.delete(r + c);
    }
  };
  backtrack(0);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<String>> solveNQueens(Integer n) {
        List<List<String>> res = new List<List<String>>();
        List<List<String>> board = new List<List<String>>();
        for (Integer i = 0; i < n; i++) {
            List<String> row = new List<String>();
            for (Integer j = 0; j < n; j++) row.add('.');
            board.add(row);
        }
        backtrack(0, n, board, new Set<Integer>(), new Set<Integer>(), new Set<Integer>(), res);
        return res;
    }
    private static void backtrack(Integer r, Integer n, List<List<String>> board,
            Set<Integer> cols, Set<Integer> diag, Set<Integer> anti, List<List<String>> res) {
        if (r == n) {
            List<String> sol = new List<String>();
            for (List<String> row : board) sol.add(String.join(row, ''));
            res.add(sol);
            return;
        }
        for (Integer c = 0; c < n; c++) {
            if (cols.contains(c) || diag.contains(r - c) || anti.contains(r + c)) continue;
            cols.add(c); diag.add(r - c); anti.add(r + c); board[r][c] = 'Q';
            backtrack(r + 1, n, board, cols, diag, anti, res);
            board[r][c] = '.'; cols.remove(c); diag.remove(r - c); anti.remove(r + c);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "time-based-key-value-store",
    title: "Time Based Key-Value Store",
    difficulty: "Medium",
    patterns: ["binary-search", "hashing"],
    topics: ["Binary Search", "Design", "Hashing"],
    companies: ["google", "amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Design a store with set(key, value, timestamp) and get(key, timestamp) that returns the value with the largest timestamp ≤ the query (or '' if none). Timestamps for a key are strictly increasing.",
    beginnerExplanation:
      "For each key keep its (timestamp, value) pairs appended in increasing time order. Because they're sorted by time, get is a binary search for the rightmost timestamp not exceeding the query.",
    realWorldAnalogy:
      "Version history of a document: to see what it looked like at 3pm, you jump to the latest save at or before 3pm — binary search over the save timeline.",
    visualExplanation:
      'set(foo,"a",1) set(foo,"b",4)\nget(foo,3) → largest ts ≤ 3 is 1 → "a"\nget(foo,4) → "b"',
    approaches: [
      {
        title: "Linear scan back from the end",
        tier: "Brute Force",
        idea: "Walk the key's list backward to find the first timestamp ≤ query.",
        steps: ["append on set", "scan from end on get"],
        time: "get O(n)",
        space: "O(n)",
      },
      {
        title: "Binary search on the time-sorted list",
        tier: "Optimal",
        idea: "Append keeps order; get binary-searches the rightmost ts ≤ query.",
        steps: ["store key → list of (ts, val)", "get: binary search, track best candidate as you go right"],
        time: "set O(1), get O(log n)",
        space: "O(n)",
      },
    ],
    dryRun: "ts=[1,4], query 3: mid0 ts1≤3 res='a' lo=1; mid1 ts4>3 hi=0; stop → 'a'",
    interviewTips: [
      "Timestamps arriving in increasing order is the key invariant that lets you binary-search without re-sorting.",
      "Return the candidate captured at the last ts ≤ query, not just arr[lo].",
    ],
    commonMistakes: [
      "Returning the wrong boundary element off the binary search.",
      "Re-sorting on every set instead of relying on increasing timestamps.",
    ],
    followUps: ["What if timestamps can arrive out of order?", "Support range queries between two timestamps."],
    related: ["binary-search", "search-in-rotated-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class TimeMap:
    def __init__(self):
        self.store = {}  # key -> list of [timestamp, value]

    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).append([timestamp, value])

    def get(self, key, timestamp):
        arr = self.store.get(key, [])
        lo, hi, res = 0, len(arr) - 1, ""
        while lo <= hi:
            mid = (lo + hi) // 2
            if arr[mid][0] <= timestamp:
                res = arr[mid][1]
                lo = mid + 1
            else:
                hi = mid - 1
        return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class TimeMap {
    private final Map<String, List<Integer>> times = new HashMap<>();
    private final Map<String, List<String>> values = new HashMap<>();

    public void set(String key, String value, int timestamp) {
        times.computeIfAbsent(key, k -> new ArrayList<>()).add(timestamp);
        values.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
    }

    public String get(String key, int timestamp) {
        List<Integer> ts = times.get(key);
        if (ts == null) return "";
        List<String> vs = values.get(key);
        int lo = 0, hi = ts.size() - 1;
        String res = "";
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            if (ts.get(mid) <= timestamp) { res = vs.get(mid); lo = mid + 1; }
            else hi = mid - 1;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class TimeMap {
  constructor() { this.store = new Map(); }

  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push([timestamp, value]);
  }

  get(key, timestamp) {
    const arr = this.store.get(key) || [];
    let lo = 0, hi = arr.length - 1, res = "";
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= timestamp) { res = arr[mid][1]; lo = mid + 1; }
      else hi = mid - 1;
    }
    return res;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class TimeMap {
    // Apex method names can't be 'set' cleanly across contexts — use put/get.
    Map<String, List<Integer>> times = new Map<String, List<Integer>>();
    Map<String, List<String>> values = new Map<String, List<String>>();

    public void put(String key, String value, Integer timestamp) {
        if (!times.containsKey(key)) {
            times.put(key, new List<Integer>());
            values.put(key, new List<String>());
        }
        times.get(key).add(timestamp);
        values.get(key).add(value);
    }

    public String get(String key, Integer timestamp) {
        if (!times.containsKey(key)) return '';
        List<Integer> ts = times.get(key);
        List<String> vs = values.get(key);
        Integer lo = 0, hi = ts.size() - 1;
        String res = '';
        while (lo <= hi) {
            Integer mid = (lo + hi) / 2;
            if (ts[mid] <= timestamp) { res = vs[mid]; lo = mid + 1; }
            else hi = mid - 1;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    patterns: ["heap"],
    topics: ["Heaps", "Design"],
    companies: ["amazon", "google", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Design a data structure that supports adding numbers from a stream and returning the median of all numbers so far.",
    beginnerExplanation:
      "Keep the smaller half in a max-heap and the larger half in a min-heap, balanced in size. The median is then the top of the larger heap (odd count) or the average of both tops (even count) — all without ever sorting.",
    realWorldAnalogy:
      "A see-saw with a pile of weights on each side kept balanced. The middle value(s) always sit right at the pivot, so you read the median straight off the tops.",
    visualExplanation:
      "add 1,2,3\nlo(max-heap)=[2,1]  hi(min-heap)=[3]\nsizes 2 vs 1 → median = top(lo) = 2",
    approaches: [
      {
        title: "Keep a sorted list",
        tier: "Better",
        idea: "Insert each number into sorted order; median is the middle index.",
        steps: ["binary-search insert", "median from middle index(es)"],
        time: "add O(n), median O(1)",
        space: "O(n)",
      },
      {
        title: "Two balanced heaps",
        tier: "Optimal",
        idea: "Max-heap for the low half, min-heap for the high half, sizes within 1.",
        steps: ["push to lo, move lo's max to hi", "rebalance if hi bigger", "median from tops"],
        time: "add O(log n), median O(1)",
        space: "O(n)",
      },
    ],
    dryRun: "add 1 → lo[1]; add 2 → lo[1],hi[2]; median=(1+2)/2=1.5; add 3 → median=2",
    interviewTips: [
      "Invariant: max-heap size equals or is one greater than min-heap size — state it explicitly.",
      "Languages without a built-in heap (JS/Apex) can use a sorted-insert list; mention the O(n) vs O(log n) trade-off.",
    ],
    commonMistakes: [
      "Letting the heaps get out of balance, so the tops aren't the medians.",
      "Integer division when averaging the two middles (use floating point).",
    ],
    followUps: ["Median in a sliding window.", "Median when numbers are within a small fixed range (bucket counts)."],
    related: ["kth-largest-element-in-an-array", "last-stone-weight"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap via negation
        self.hi = []  # min-heap

    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class MedianFinder {
    private final PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder());
    private final PriorityQueue<Integer> hi = new PriorityQueue<>();

    public void addNum(int num) {
        lo.offer(num);
        hi.offer(lo.poll());
        if (hi.size() > lo.size()) lo.offer(hi.poll());
    }

    public double findMedian() {
        if (lo.size() > hi.size()) return lo.peek();
        return (lo.peek() + hi.peek()) / 2.0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// No built-in heap — sorted-insert list (O(n) add). Two heaps give O(log n).
class MedianFinder {
  constructor() { this.a = []; }
  addNum(num) {
    let lo = 0, hi = this.a.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (this.a[m] < num) lo = m + 1; else hi = m; }
    this.a.splice(lo, 0, num);
  }
  findMedian() {
    const n = this.a.length, m = n >> 1;
    return n % 2 ? this.a[m] : (this.a[m - 1] + this.a[m]) / 2;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class MedianFinder {
    // No built-in heap in Apex — sorted-insert list (O(n) add).
    List<Integer> a = new List<Integer>();

    public void addNum(Integer num) {
        Integer lo = 0, hi = a.size();
        while (lo < hi) {
            Integer m = (lo + hi) / 2;
            if (a[m] < num) lo = m + 1; else hi = m;
        }
        a.add(lo, num);
    }

    public Double findMedian() {
        Integer n = a.size(), m = n / 2;
        if (Math.mod(n, 2) == 1) return Double.valueOf(a[m]);
        return (a[m - 1] + a[m]) / 2.0;
    }
}`,
      },
    ],
  },
  {
    slug: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    patterns: ["heap", "linked-list"],
    topics: ["Linked Lists", "Heaps"],
    companies: ["amazon", "google", "meta", "microsoft"],
    sheets: ["neetcode150", "blind75"],
    frequency: 5,
    statement:
      "Merge k sorted linked lists into one sorted linked list and return its head.",
    beginnerExplanation:
      "Either always take the smallest current head among the k lists (a min-heap of heads), or pair up lists and merge two at a time like merge sort. Both give O(N log k) where N is the total node count.",
    realWorldAnalogy:
      "Merging k sorted stacks of papers: repeatedly grab the smallest top sheet across all stacks — a min-heap tells you which stack that is in O(log k).",
    visualExplanation:
      "lists: [1→4], [1→3], [2→6]\nheap tops 1,1,2 → take 1, push 4 → 1, take 1 push 3 → ...\nresult 1→1→2→3→4→6",
    approaches: [
      {
        title: "Concatenate then sort",
        tier: "Brute Force",
        idea: "Collect all values, sort, rebuild a list.",
        steps: ["gather all N values", "sort", "rebuild"],
        time: "O(N log N)",
        space: "O(N)",
      },
      {
        title: "Min-heap of heads / pairwise merge",
        tier: "Optimal",
        idea: "Heap of the k current heads, or divide-and-conquer merging pairs of lists.",
        steps: ["heap: pop min, append, push its next", "or: merge lists pairwise until one remains"],
        time: "O(N log k)",
        space: "O(k) heap or O(1) pairwise",
      },
    ],
    dryRun: "[1→4],[2→6]: take1, take2, take4, take6 → 1→2→4→6 (pairwise merge of two, generalize to k)",
    interviewTips: [
      "State O(N log k): k-way merge beats merging one-by-one (O(Nk)).",
      "In languages without a heap, divide-and-conquer pairwise merge gets the same O(N log k) with O(1) extra space.",
    ],
    commonMistakes: [
      "Merging sequentially into an accumulator → O(Nk).",
      "Losing the tail pointer or not terminating the final next pointer.",
    ],
    followUps: ["Merge k sorted arrays.", "External merge when lists don't fit in memory."],
    related: ["merge-two-sorted-lists", "kth-largest-element-in-an-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq
# class ListNode: def __init__(self, val=0, next=None): ...

def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = tail = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next = node
        tail = node
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode node : lists) if (node != null) pq.offer(node);
        ListNode dummy = new ListNode(0), tail = dummy;
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            tail.next = node; tail = node;
            if (node.next != null) pq.offer(node.next);
        }
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `// Divide-and-conquer pairwise merge — O(N log k), O(1) extra.
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;
  const mergeTwo = (a, b) => {
    const dummy = { val: 0, next: null };
    let tail = dummy;
    while (a && b) {
      if (a.val <= b.val) { tail.next = a; a = a.next; }
      else { tail.next = b; b = b.next; }
      tail = tail.next;
    }
    tail.next = a || b;
    return dummy.next;
  };
  let interval = 1;
  while (interval < lists.length) {
    for (let i = 0; i + interval < lists.length; i += interval * 2) {
      lists[i] = mergeTwo(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }
  return lists[0];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode mergeKLists(List<ListNode> lists) {
        if (lists == null || lists.isEmpty()) return null;
        Integer interval = 1;
        while (interval < lists.size()) {
            for (Integer i = 0; i + interval < lists.size(); i += interval * 2) {
                lists[i] = mergeTwo(lists[i], lists[i + interval]);
            }
            interval *= 2;
        }
        return lists[0];
    }
    private static ListNode mergeTwo(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = (a != null) ? a : b;
        return dummy.next;
    }
}`,
      },
    ],
  },
];

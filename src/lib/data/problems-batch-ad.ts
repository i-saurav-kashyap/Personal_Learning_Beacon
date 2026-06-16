import type { Problem } from "@/lib/types";

// Striver A2Z leftovers: Tries + DP/String problems.

export const PROBLEMS_BATCH_AD: Problem[] = [
  {
    slug: "implement-trie-ii",
    title: "Implement Trie II (Prefix Tree with Counts)",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Tries", "Strings"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Design a trie supporting: insert(word), countWordsEqualTo(word) — how many times exactly `word` was inserted, countWordsStartingWith(prefix) — how many inserted words start with `prefix`, and erase(word) — remove one occurrence of `word`.",
    beginnerExplanation:
      "It's the usual prefix tree, but each node also stores two counters: how many words END here, and how many words PASS THROUGH here. Insert bumps the pass-through counter on every node along the path and the end counter at the last node; erase decrements them.",
    realWorldAnalogy:
      "Think of a directory tree that also tracks, at each folder, how many files live exactly here and how many files live anywhere beneath it. Adding or deleting a file updates the counts along its path.",
    visualExplanation:
      'insert("apple") x2, insert("app")\n"app" node: cntPrefix=3 (apple,apple,app pass), cntEnd=1\ncountWordsEqualTo("apple")=2, countWordsStartingWith("app")=3',
    approaches: [
      {
        title: "HashMap of word counts",
        tier: "Brute Force",
        idea: "Store a frequency map; prefix queries scan all keys.",
        steps: ["Keep Map<word,count>", "countStartingWith scans every key for the prefix"],
        time: "O(N·L) per prefix query",
        space: "O(total chars)",
      },
      {
        title: "Trie with end + prefix counters",
        tier: "Optimal",
        idea: "Each node carries cntEnd and cntPrefix; all ops are O(word length).",
        steps: [
          "Walk/create nodes char by char, incrementing cntPrefix on each",
          "Increment cntEnd at the terminal node",
          "Queries walk the path and read the relevant counter",
          "erase walks the path decrementing both counters",
        ],
        time: "O(L) per operation",
        space: "O(total chars)",
      },
    ],
    dryRun:
      'insert("app"); countWordsStartingWith("a")=1; insert("apple"); countWordsStartingWith("app")=2; countWordsEqualTo("app")=1; erase("app"); countWordsEqualTo("app")=0',
    interviewTips: [
      "Naming the two counters precisely (ends-here vs passes-through) makes the whole design obvious.",
      "Mention that erase assumes the word exists — clarify the contract with the interviewer.",
    ],
    commonMistakes: [
      "Forgetting to decrement cntPrefix on every node during erase.",
      "Using a fixed array of 26 when the alphabet may be larger.",
    ],
    followUps: ["Support wildcard search.", "Return the actual words for a prefix (autocomplete)."],
    related: ["implement-trie-prefix-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class Trie:
    def __init__(self):
        self.children = {}
        self.cnt_end = 0
        self.cnt_prefix = 0

    def insert(self, word):
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Trie()
            node = node.children[ch]
            node.cnt_prefix += 1
        node.cnt_end += 1

    def count_words_equal_to(self, word):
        node = self
        for ch in word:
            if ch not in node.children:
                return 0
            node = node.children[ch]
        return node.cnt_end

    def count_words_starting_with(self, prefix):
        node = self
        for ch in prefix:
            if ch not in node.children:
                return 0
            node = node.children[ch]
        return node.cnt_prefix

    def erase(self, word):
        node = self
        for ch in word:
            node = node.children[ch]
            node.cnt_prefix -= 1
        node.cnt_end -= 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Trie {
    Trie[] links = new Trie[26];
    int cntEnd = 0, cntPrefix = 0;

    public void insert(String w) {
        Trie n = this;
        for (char c : w.toCharArray()) {
            int i = c - 'a';
            if (n.links[i] == null) n.links[i] = new Trie();
            n = n.links[i];
            n.cntPrefix++;
        }
        n.cntEnd++;
    }
    public int countWordsEqualTo(String w) {
        Trie n = this;
        for (char c : w.toCharArray()) {
            int i = c - 'a';
            if (n.links[i] == null) return 0;
            n = n.links[i];
        }
        return n.cntEnd;
    }
    public int countWordsStartingWith(String p) {
        Trie n = this;
        for (char c : p.toCharArray()) {
            int i = c - 'a';
            if (n.links[i] == null) return 0;
            n = n.links[i];
        }
        return n.cntPrefix;
    }
    public void erase(String w) {
        Trie n = this;
        for (char c : w.toCharArray()) {
            n = n.links[c - 'a'];
            n.cntPrefix--;
        }
        n.cntEnd--;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class Trie {
  constructor() {
    this.children = {};
    this.cntEnd = 0;
    this.cntPrefix = 0;
  }
  insert(w) {
    let n = this;
    for (const c of w) {
      if (!n.children[c]) n.children[c] = new Trie();
      n = n.children[c];
      n.cntPrefix++;
    }
    n.cntEnd++;
  }
  countWordsEqualTo(w) {
    let n = this;
    for (const c of w) {
      if (!n.children[c]) return 0;
      n = n.children[c];
    }
    return n.cntEnd;
  }
  countWordsStartingWith(p) {
    let n = this;
    for (const c of p) {
      if (!n.children[c]) return 0;
      n = n.children[c];
    }
    return n.cntPrefix;
  }
  erase(w) {
    let n = this;
    for (const c of w) {
      n = n.children[c];
      n.cntPrefix--;
    }
    n.cntEnd--;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Trie {
    Map<String, Trie> children = new Map<String, Trie>();
    Integer cntEnd = 0;
    Integer cntPrefix = 0;

    public void insert(String w) {
        Trie n = this;
        for (Integer i = 0; i < w.length(); i++) {
            String c = w.substring(i, i + 1);
            if (!n.children.containsKey(c)) n.children.put(c, new Trie());
            n = n.children.get(c);
            n.cntPrefix++;
        }
        n.cntEnd++;
    }
    public Integer countWordsEqualTo(String w) {
        Trie n = this;
        for (Integer i = 0; i < w.length(); i++) {
            String c = w.substring(i, i + 1);
            if (!n.children.containsKey(c)) return 0;
            n = n.children.get(c);
        }
        return n.cntEnd;
    }
    public Integer countWordsStartingWith(String p) {
        Trie n = this;
        for (Integer i = 0; i < p.length(); i++) {
            String c = p.substring(i, i + 1);
            if (!n.children.containsKey(c)) return 0;
            n = n.children.get(c);
        }
        return n.cntPrefix;
    }
    public void erase(String w) {
        Trie n = this;
        for (Integer i = 0; i < w.length(); i++) {
            String c = w.substring(i, i + 1);
            n = n.children.get(c);
            n.cntPrefix--;
        }
        n.cntEnd--;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-word-with-all-prefixes",
    title: "Longest Word with All Prefixes",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Tries", "Strings"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a list of words, return the longest word such that every one of its prefixes is also present in the list. If several qualify, return the lexicographically smallest; if none, return an empty string.",
    beginnerExplanation:
      "A word qualifies only if you can build it one letter at a time and every intermediate string is itself a word in the set. Put all words in a set (or trie) and test each word's prefixes.",
    realWorldAnalogy:
      "Climbing a ladder where every rung must exist: 'a' → 'ap' → 'app' → 'appl' → 'apple'. If any rung is missing, you can't reach the top.",
    visualExplanation:
      'words = ["n","ni","nin","ninj","ninja","ninга?"]\n"ninja": prefixes n, ni, nin, ninj, ninja all present → valid (len 5)',
    approaches: [
      {
        title: "Set of words + prefix check",
        tier: "Optimal",
        idea: "For each word, verify all its prefixes are in the set; keep the best by (length desc, lexicographic asc).",
        steps: [
          "Put all words in a hash set",
          "For each word, check prefixes word[:1..len]",
          "Track the best valid word",
        ],
        time: "O(N·L²) (or O(N·L) with a trie)",
        space: "O(N·L)",
      },
    ],
    dryRun:
      'words=["ab","abc","a","x"] → "a" ok; "ab" needs "a"(ok); "abc" needs "ab","a"(ok) len3 → answer "abc"; "x" alone ok len1',
    interviewTips: [
      "Mention the trie version is O(N·L): insert all, then DFS only through nodes that are word-ends.",
      "Pin down the tie-break rule (length then lexicographic) up front.",
    ],
    commonMistakes: [
      "Forgetting the lexicographic tie-break.",
      "Off-by-one in prefix slicing (must include the full word's shorter prefixes, not the word itself necessarily).",
    ],
    followUps: ["Return all qualifying words.", "Do it with a trie in O(N·L)."],
    related: ["implement-trie-prefix-tree", "implement-trie-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_word_with_all_prefixes(words):
    present = set(words)
    best = ""
    for w in words:
        if all(w[:i] in present for i in range(1, len(w) + 1)):
            if len(w) > len(best) or (len(w) == len(best) and w < best):
                best = w
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String longestWord(String[] words) {
        Set<String> present = new HashSet<>(Arrays.asList(words));
        String best = "";
        for (String w : words) {
            boolean ok = true;
            for (int i = 1; i <= w.length(); i++) {
                if (!present.contains(w.substring(0, i))) { ok = false; break; }
            }
            if (ok && (w.length() > best.length()
                    || (w.length() == best.length() && w.compareTo(best) < 0))) {
                best = w;
            }
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestWord(words) {
  const present = new Set(words);
  let best = "";
  for (const w of words) {
    let ok = true;
    for (let i = 1; i <= w.length; i++) {
      if (!present.has(w.slice(0, i))) { ok = false; break; }
    }
    if (ok && (w.length > best.length || (w.length === best.length && w < best))) {
      best = w;
    }
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String longestWord(List<String> words) {
        Set<String> present = new Set<String>(words);
        String best = '';
        for (String w : words) {
            Boolean ok = true;
            for (Integer i = 1; i <= w.length(); i++) {
                if (!present.contains(w.substring(0, i))) { ok = false; break; }
            }
            if (ok && (w.length() > best.length()
                    || (w.length() == best.length() && w.compareTo(best) < 0))) {
                best = w;
            }
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "count-distinct-substrings-using-trie",
    title: "Count Distinct Substrings using Trie",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Tries", "Strings"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string, count the number of distinct substrings (including the empty string is usually excluded). Use a trie of all suffixes so each new trie node corresponds to one distinct substring.",
    beginnerExplanation:
      "Every substring is a prefix of some suffix. If you insert all suffixes into a trie, each newly-created node is exactly one distinct substring — so just count the nodes you create.",
    realWorldAnalogy:
      "Filing every suffix into a shared folder tree: each time you have to create a brand-new folder, that path is a substring you hadn't seen before.",
    visualExplanation:
      's = "aba"\nsuffixes: "aba","ba","a"\ndistinct substrings: a, b, ab, ba, aba, aba? → {a,b,ab,ba,aba} = 5 (new trie nodes)',
    approaches: [
      {
        title: "Generate all substrings into a set",
        tier: "Brute Force",
        idea: "Add every substring to a hash set and return its size.",
        steps: ["Two loops for all (i,j)", "Insert s[i:j] into a set"],
        time: "O(n³) (or O(n²) amortised with rolling hash)",
        space: "O(n²)",
      },
      {
        title: "Trie of all suffixes",
        tier: "Optimal",
        idea: "Insert each suffix; count nodes created — each is a distinct substring.",
        steps: [
          "For each start i, walk a trie inserting s[i..n-1]",
          "Every time a child is missing, create it and increment the count",
        ],
        time: "O(n²)",
        space: "O(n²)",
      },
    ],
    dryRun: 's="aa" → suffixes "aa","a"; nodes: a (new,1), a→a (new,2) → 2 distinct: {"a","aa"}',
    interviewTips: [
      "Frame it as 'distinct substrings = distinct trie nodes over all suffixes'.",
      "Mention suffix automaton / suffix array for the O(n) / O(n log n) advanced versions.",
    ],
    commonMistakes: [
      "Counting the root node.",
      "Re-counting substrings already inserted by an earlier suffix.",
    ],
    followUps: ["Do it in O(n) with a suffix automaton.", "Return the k-th distinct substring."],
    related: ["implement-trie-prefix-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_distinct_substrings(s):
    root = {}
    count = 0
    n = len(s)
    for i in range(n):
        node = root
        for j in range(i, n):
            ch = s[j]
            if ch not in node:
                node[ch] = {}
                count += 1
            node = node[ch]
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int countDistinctSubstrings(String s) {
        Map<String, Map> root = new HashMap<>(); // simple nested map trie
        int count = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            Map<String, Map> node = root;
            for (int j = i; j < n; j++) {
                String ch = String.valueOf(s.charAt(j));
                if (!node.containsKey(ch)) {
                    node.put(ch, new HashMap<>());
                    count++;
                }
                node = node.get(ch);
            }
        }
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countDistinctSubstrings(s) {
  const root = {};
  let count = 0;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    let node = root;
    for (let j = i; j < n; j++) {
      const ch = s[j];
      if (!node[ch]) { node[ch] = {}; count++; }
      node = node[ch];
    }
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Encode trie paths as strings in a Set (Apex lacks recursive map typing).
    public static Integer countDistinctSubstrings(String s) {
        Set<String> seen = new Set<String>();
        Integer n = s.length();
        for (Integer i = 0; i < n; i++) {
            String cur = '';
            for (Integer j = i; j < n; j++) {
                cur += s.substring(j, j + 1);
                seen.add(cur);
            }
        }
        return seen.size();
    }
}`,
      },
    ],
  },
  {
    slug: "unique-paths-ii",
    title: "Unique Paths II",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "A robot starts at the top-left of an m×n grid and wants to reach the bottom-right, moving only right or down. Some cells contain obstacles (marked 1). Return the number of distinct obstacle-free paths.",
    beginnerExplanation:
      "Same as Unique Paths, but a cell with an obstacle contributes 0 paths. Each free cell's path count is the sum of the cell above and the cell to the left.",
    realWorldAnalogy:
      "Water flowing down-right through a grid of pipes where some junctions are blocked: the flow into a junction is the sum of flow from above and from the left, and blocked junctions pass nothing.",
    visualExplanation:
      "grid=[[0,0,0],[0,1,0],[0,0,0]]\ndp rows: 1 1 1 / 1 0 1 / 1 1 2 → answer 2",
    approaches: [
      {
        title: "Recursion",
        tier: "Brute Force",
        idea: "Recurse from (0,0); return 0 at obstacles/out-of-bounds, 1 at target.",
        steps: ["f(i,j)=f(i+1,j)+f(i,j+1)", "0 if obstacle or out of grid"],
        time: "O(2^(m+n))",
        space: "O(m+n)",
      },
      {
        title: "1-D rolling DP",
        tier: "Optimal",
        idea: "Keep one row; obstacle cells reset to 0, else add the value to the left.",
        steps: [
          "dp[0]=1 if start free",
          "Sweep rows; dp[j]=0 if obstacle else dp[j]+=dp[j-1]",
        ],
        time: "O(m·n)",
        space: "O(n)",
      },
    ],
    dryRun: "single obstacle in the middle of a 3x3 → top path and left path remain → 2",
    interviewTips: [
      "Handle the start/end being an obstacle (answer 0).",
      "1-D DP halves the space and reads cleanly.",
    ],
    commonMistakes: ["Not zeroing obstacle cells.", "Forgetting the start-cell obstacle case."],
    followUps: ["Minimum path sum with obstacles.", "Count paths with at most k obstacle removals."],
    related: ["unique-paths", "minimum-path-sum-in-grid"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def unique_paths_with_obstacles(grid):
    if not grid or grid[0][0] == 1:
        return 0
    m, n = len(grid), len(grid[0])
    dp = [0] * n
    dp[0] = 1
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                dp[j] = 0
            elif j > 0:
                dp[j] += dp[j - 1]
    return dp[n - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        if (grid.length == 0 || grid[0][0] == 1) return 0;
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function uniquePathsWithObstacles(grid) {
  if (!grid.length || grid[0][0] === 1) return 0;
  const m = grid.length, n = grid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) dp[j] = 0;
      else if (j > 0) dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer uniquePathsWithObstacles(List<List<Integer>> grid) {
        if (grid.isEmpty() || grid[0][0] == 1) return 0;
        Integer m = grid.size(), n = grid[0].size();
        List<Integer> dp = new List<Integer>();
        for (Integer j = 0; j < n; j++) dp.add(0);
        dp[0] = 1;
        for (Integer i = 0; i < m; i++) {
            for (Integer j = 0; j < n; j++) {
                if (grid[i][j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] = dp[j] + dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-insertions-and-deletions-to-convert-string",
    title: "Minimum Insertions and Deletions to Convert String",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given strings s1 and s2, return the minimum number of insertions plus deletions on s1 to transform it into s2.",
    beginnerExplanation:
      "Keep the characters that already form the Longest Common Subsequence; delete the rest of s1 and insert the rest of s2. So the answer is (len(s1)−LCS) deletions + (len(s2)−LCS) insertions.",
    realWorldAnalogy:
      "Editing a draft into a target: the words that already line up (in order) stay; you cross out the extras and type in what's missing.",
    visualExplanation:
      's1="heap", s2="pea" → LCS="ea" (len 2)\ndeletions=4-2=2, insertions=3-2=1, total=3',
    approaches: [
      {
        title: "LCS-based formula",
        tier: "Optimal",
        idea: "Compute LCS(s1,s2); answer = (m−lcs)+(n−lcs).",
        steps: [
          "Fill the standard LCS DP table",
          "deletions = m − lcs, insertions = n − lcs",
          "Return their sum",
        ],
        time: "O(m·n)",
        space: "O(m·n) (or O(n) rolling)",
      },
    ],
    dryRun: 's1="abc", s2="ac" → LCS=2; del=1, ins=0 → total 1',
    interviewTips: [
      "Recognising this reduces to LCS is the whole insight — say it explicitly.",
      "Note it differs from edit distance because substitutions aren't allowed here.",
    ],
    commonMistakes: ["Confusing it with edit distance (which allows replace).", "Swapping the m/n roles."],
    followUps: ["Edit distance (with replace).", "Shortest common supersequence length = m+n−lcs."],
    related: ["longest-common-subsequence", "edit-distance", "shortest-common-supersequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_insertions_deletions(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    lcs = dp[m][n]
    return (m - lcs) + (n - lcs)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minOperations(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s1.charAt(i - 1) == s2.charAt(j - 1)
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
        int lcs = dp[m][n];
        return (m - lcs) + (n - lcs);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minInsertionsDeletions(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = s1[i - 1] === s2[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  const lcs = dp[m][n];
  return (m - lcs) + (n - lcs);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minOperations(String s1, String s2) {
        Integer m = s1.length(), n = s2.length();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= m; i++) {
            for (Integer j = 1; j <= n; j++) {
                if (s1.substring(i - 1, i) == s2.substring(j - 1, j)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        Integer lcs = dp[m][n];
        return (m - lcs) + (n - lcs);
    }
}`,
      },
    ],
  },
  {
    slug: "partition-array-for-maximum-sum",
    title: "Partition Array for Maximum Sum",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer array and an integer k, partition it into contiguous subarrays of length at most k. After partitioning, each subarray's values all become its maximum. Return the largest sum the array can have.",
    beginnerExplanation:
      "Walk from the end (or front) deciding the length of the last block (1..k). For each choice, that block contributes blockMax × blockLength, plus the best result for the remainder.",
    realWorldAnalogy:
      "Cutting a chocolate bar into pieces of at most k squares, where every square in a piece is upgraded to the piece's tastiest square — choose cuts to maximise total tastiness.",
    visualExplanation:
      "arr=[1,15,7,9,2,5,10], k=3\nbest groups → [1,15,7] uses 15·3, then [9] 9, then [2,5,10] 10·3 → 45+9+30=84",
    approaches: [
      {
        title: "DP over prefix",
        tier: "Optimal",
        idea: "dp[i] = best sum for the first i elements; try last block lengths 1..k.",
        steps: [
          "For each i, scan j=1..min(k,i)",
          "Track curMax over the last j elements",
          "dp[i] = max(dp[i], dp[i-j] + curMax*j)",
        ],
        time: "O(n·k)",
        space: "O(n)",
      },
    ],
    dryRun: "arr=[1,4,1,5,7,3,6,1,9,9,3], k=4 → 83 (group greedily by max within each ≤k block via DP)",
    interviewTips: [
      "The state is 'best for the first i elements'; the transition is the choice of the last block length.",
      "Track the running max as you extend the block to avoid an inner max scan.",
    ],
    commonMistakes: ["Forgetting min(k,i) bound.", "Recomputing the block max instead of rolling it."],
    followUps: ["Reconstruct the actual partition.", "Variant: each value becomes the block minimum."],
    related: ["maximum-subarray"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_sum_after_partitioning(arr, k):
    n = len(arr)
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        cur_max = 0
        for j in range(1, min(k, i) + 1):
            cur_max = max(cur_max, arr[i - j])
            dp[i] = max(dp[i], dp[i - j] + cur_max * j)
    return dp[n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int curMax = 0;
            for (int j = 1; j <= Math.min(k, i); j++) {
                curMax = Math.max(curMax, arr[i - j]);
                dp[i] = Math.max(dp[i], dp[i - j] + curMax * j);
            }
        }
        return dp[n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxSumAfterPartitioning(arr, k) {
  const n = arr.length;
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let curMax = 0;
    for (let j = 1; j <= Math.min(k, i); j++) {
      curMax = Math.max(curMax, arr[i - j]);
      dp[i] = Math.max(dp[i], dp[i - j] + curMax * j);
    }
  }
  return dp[n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxSumAfterPartitioning(List<Integer> arr, Integer k) {
        Integer n = arr.size();
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= n; i++) dp.add(0);
        for (Integer i = 1; i <= n; i++) {
            Integer curMax = 0;
            for (Integer j = 1; j <= Math.min(k, i); j++) {
                curMax = Math.max(curMax, arr[i - j]);
                dp[i] = Math.max(dp[i], dp[i - j] + curMax * j);
            }
        }
        return dp[n];
    }
}`,
      },
    ],
  },
  {
    slug: "count-substrings-with-k-distinct-characters",
    title: "Count Substrings with K Distinct Characters",
    difficulty: "Medium",
    patterns: ["sliding-window", "hashing"],
    topics: ["Strings", "Sliding Window"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string and an integer K, count the number of substrings that contain exactly K distinct characters.",
    beginnerExplanation:
      "Counting 'exactly K' directly is fiddly, so use a trick: substrings with at most K distinct, minus substrings with at most (K−1) distinct, equals exactly K. Each 'at most' count is a clean sliding window.",
    realWorldAnalogy:
      "Measuring how many people are exactly 30 = (people ≤ 30) − (people ≤ 29). The same subtraction turns a hard 'exactly' into two easy 'at most' counts.",
    visualExplanation:
      's="abc", k=2 → atMost(2)=5, atMost(1)=3 → exactly 2 = 2 ("ab","bc")',
    approaches: [
      {
        title: "Enumerate all substrings",
        tier: "Brute Force",
        idea: "For each start, extend and count distinct characters.",
        steps: ["Two loops", "Maintain a frequency map; count when distinct == K"],
        time: "O(n²)",
        space: "O(charset)",
      },
      {
        title: "atMost(K) − atMost(K−1)",
        tier: "Optimal",
        idea: "Each atMost is a variable-size sliding window summing (right−left+1).",
        steps: [
          "Window grows on the right; shrink while distinct > limit",
          "Add window length to the running total each step",
          "Return atMost(K) − atMost(K−1)",
        ],
        time: "O(n)",
        space: "O(charset)",
      },
    ],
    dryRun: 's="aba", k=2 → atMost2=6, atMost1=3 → 3 ("ab","ba","aba")',
    interviewTips: [
      "The exactly-K = atMost(K) − atMost(K−1) identity is reusable across many counting problems.",
      "Sum (right−left+1) inside atMost — every new right adds that many valid windows.",
    ],
    commonMistakes: ["Trying to count 'exactly K' in one window directly.", "Forgetting K−1 can be 0."],
    followUps: ["At most K distinct (the helper itself).", "Longest substring with K distinct."],
    related: ["longest-substring-without-repeating", "number-of-substrings-containing-all-three-characters"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_substrings_k_distinct(s, k):
    def at_most(m):
        if m < 0:
            return 0
        count = {}
        left = res = 0
        for right, ch in enumerate(s):
            count[ch] = count.get(ch, 0) + 1
            while len(count) > m:
                count[s[left]] -= 1
                if count[s[left]] == 0:
                    del count[s[left]]
                left += 1
            res += right - left + 1
        return res
    return at_most(k) - at_most(k - 1)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int countKDistinct(String s, int k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
    private int atMost(String s, int m) {
        if (m < 0) return 0;
        Map<Character, Integer> count = new HashMap<>();
        int left = 0, res = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            count.merge(c, 1, Integer::sum);
            while (count.size() > m) {
                char l = s.charAt(left++);
                if (count.merge(l, -1, Integer::sum) == 0) count.remove(l);
            }
            res += right - left + 1;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countKDistinct(s, k) {
  const atMost = (m) => {
    if (m < 0) return 0;
    const count = new Map();
    let left = 0, res = 0;
    for (let right = 0; right < s.length; right++) {
      const c = s[right];
      count.set(c, (count.get(c) || 0) + 1);
      while (count.size > m) {
        const l = s[left++];
        count.set(l, count.get(l) - 1);
        if (count.get(l) === 0) count.delete(l);
      }
      res += right - left + 1;
    }
    return res;
  };
  return atMost(k) - atMost(k - 1);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countKDistinct(String s, Integer k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
    static Integer atMost(String s, Integer m) {
        if (m < 0) return 0;
        Map<String, Integer> count = new Map<String, Integer>();
        Integer left = 0, res = 0;
        for (Integer right = 0; right < s.length(); right++) {
            String c = s.substring(right, right + 1);
            count.put(c, (count.containsKey(c) ? count.get(c) : 0) + 1);
            while (count.size() > m) {
                String l = s.substring(left, left + 1);
                count.put(l, count.get(l) - 1);
                if (count.get(l) == 0) count.remove(l);
                left++;
            }
            res += right - left + 1;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "sum-of-beauty-of-all-substrings",
    title: "Sum of Beauty of All Substrings",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Strings"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "The beauty of a string is the difference between the highest and lowest character frequency in it. Return the sum of beauty over all substrings of the given string.",
    beginnerExplanation:
      "Fix a start index and extend the substring one character at a time, maintaining a frequency array. After each extension, beauty = max frequency − min positive frequency; add it to the total.",
    realWorldAnalogy:
      "Sliding a growing window over the string and, at each size, measuring the gap between the most-common and least-common letter inside it.",
    visualExplanation:
      's="aabcb" → e.g. "aab": freq a=2,b=1 → beauty 1; sum every substring\'s beauty',
    approaches: [
      {
        title: "All substrings + per-substring scan",
        tier: "Brute Force",
        idea: "For each substring recompute frequencies from scratch.",
        steps: ["Triple loop", "Compute max−min freq each time"],
        time: "O(n³)",
        space: "O(charset)",
      },
      {
        title: "Incremental frequency",
        tier: "Optimal",
        idea: "Reuse the frequency array as the substring extends; max/min over 26 buckets is O(26).",
        steps: ["Outer loop start i", "Inner extend j; bump freq[s[j]]", "Add (max − min positive) each step"],
        time: "O(n²·26)",
        space: "O(26)",
      },
    ],
    dryRun: 's="aab" → "aa":0, "aab":1, "ab":0, "a":0, "a":0, "b":0 → total 1',
    interviewTips: [
      "Keep the 26-bucket frequency array; recompute max/min in O(26) — overall O(n²).",
      "Min must ignore zero-frequency letters.",
    ],
    commonMistakes: ["Including zero frequencies in the minimum.", "Recomputing frequencies from scratch (O(n³))."],
    followUps: ["Only lowercase vs full Unicode (changes the bucket size)."],
    related: ["count-substrings-with-k-distinct-characters"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def beauty_sum(s):
    n = len(s)
    total = 0
    for i in range(n):
        freq = [0] * 26
        for j in range(i, n):
            freq[ord(s[j]) - 97] += 1
            mx = max(freq)
            mn = min(f for f in freq if f > 0)
            total += mx - mn
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int beautySum(String s) {
        int n = s.length(), total = 0;
        for (int i = 0; i < n; i++) {
            int[] freq = new int[26];
            for (int j = i; j < n; j++) {
                freq[s.charAt(j) - 'a']++;
                int mx = 0, mn = Integer.MAX_VALUE;
                for (int f : freq) {
                    if (f > 0) { mx = Math.max(mx, f); mn = Math.min(mn, f); }
                }
                total += mx - mn;
            }
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function beautySum(s) {
  const n = s.length;
  let total = 0;
  for (let i = 0; i < n; i++) {
    const freq = new Array(26).fill(0);
    for (let j = i; j < n; j++) {
      freq[s.charCodeAt(j) - 97]++;
      let mx = 0, mn = Infinity;
      for (const f of freq) if (f > 0) { mx = Math.max(mx, f); mn = Math.min(mn, f); }
      total += mx - mn;
    }
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer beautySum(String s) {
        Integer n = s.length(), total = 0;
        for (Integer i = 0; i < n; i++) {
            List<Integer> freq = new List<Integer>();
            for (Integer t = 0; t < 26; t++) freq.add(0);
            for (Integer j = i; j < n; j++) {
                Integer idx = s.charAt(j) - 97;
                freq[idx] = freq[idx] + 1;
                Integer mx = 0, mn = 2147483647;
                for (Integer f : freq) {
                    if (f > 0) { mx = Math.max(mx, f); mn = Math.min(mn, f); }
                }
                total += mx - mn;
            }
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-substrings-containing-all-three-characters",
    title: "Number of Substrings Containing All Three Characters",
    difficulty: "Medium",
    patterns: ["sliding-window", "hashing"],
    topics: ["Strings", "Sliding Window"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string consisting only of characters a, b and c, return the number of substrings that contain at least one occurrence of all three characters.",
    beginnerExplanation:
      "For each end index, track the most recent position of a, b and c. The smallest of those three positions tells you the latest start that still includes all three — so (min position + 1) substrings ending here are valid.",
    realWorldAnalogy:
      "You need a meal with all three of bread, cheese and tomato. The earliest you could have started shopping and still have all three by now is bounded by whichever you picked up most recently-but-earliest.",
    visualExplanation:
      's="abcabc"\nat each i track last[a],last[b],last[c]; add 1+min(last) → totals 1+...=10',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "For each (i,j) verify all of a,b,c appear.",
        steps: ["Two loops + presence check"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Last-seen positions",
        tier: "Optimal",
        idea: "For each right, valid starts = 1 + min(last[a],last[b],last[c]).",
        steps: [
          "Maintain last index of a, b, c (init −1)",
          "Update last[s[i]] = i",
          "Add 1 + min(last a,b,c) to the answer",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: 's="abc" → i=2: last a=0,b=1,c=2 → 1+min(0,1,2)=1 → total 1',
    interviewTips: [
      "The 'add 1+min(last)' trick counts all valid left endpoints in O(1) per step.",
      "When any character is still unseen its last index is −1, contributing 0 — exactly right.",
    ],
    commonMistakes: ["Recounting overlapping windows.", "Initialising last-seen to 0 instead of −1."],
    followUps: ["Generalise to K required characters.", "Count substrings with all distinct characters of the alphabet."],
    related: ["count-substrings-with-k-distinct-characters", "longest-substring-without-repeating"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def number_of_substrings(s):
    last = {"a": -1, "b": -1, "c": -1}
    res = 0
    for i, ch in enumerate(s):
        last[ch] = i
        res += 1 + min(last["a"], last["b"], last["c"])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numberOfSubstrings(String s) {
        int[] last = {-1, -1, -1};
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
            res += 1 + Math.min(last[0], Math.min(last[1], last[2]));
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numberOfSubstrings(s) {
  const last = { a: -1, b: -1, c: -1 };
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    last[s[i]] = i;
    res += 1 + Math.min(last.a, last.b, last.c);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer numberOfSubstrings(String s) {
        Map<String, Integer> last = new Map<String, Integer>{ 'a' => -1, 'b' => -1, 'c' => -1 };
        Integer res = 0;
        for (Integer i = 0; i < s.length(); i++) {
            last.put(s.substring(i, i + 1), i);
            res += 1 + Math.min(last.get('a'), Math.min(last.get('b'), last.get('c')));
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "word-break-ii",
    title: "Word Break II",
    difficulty: "Hard",
    patterns: ["backtracking", "dynamic-programming"],
    topics: ["Dynamic Programming", "Backtracking", "Strings"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string s and a dictionary of words, return all the ways to add spaces in s so that every resulting word is in the dictionary. Return all such sentences.",
    beginnerExplanation:
      "From a position, try every dictionary word that matches the upcoming characters; for each, recursively solve the remainder and prepend the word. Memoise by start index so repeated suffixes aren't re-solved.",
    realWorldAnalogy:
      "Segmenting a run-on label like 'catsanddog' into valid words — you branch on each legal first word and recursively segment what's left.",
    visualExplanation:
      's="catsanddog", dict={cat,cats,and,sand,dog}\n→ "cats and dog", "cat sand dog"',
    approaches: [
      {
        title: "Plain recursion",
        tier: "Brute Force",
        idea: "Try every prefix; recurse on the suffix. Exponential on adversarial inputs.",
        steps: ["For each split point, if prefix in dict, recurse on rest"],
        time: "O(2^n) worst case",
        space: "O(n) recursion",
      },
      {
        title: "Backtracking + memo on start index",
        tier: "Optimal",
        idea: "Cache the list of sentences buildable from each index to avoid recomputation.",
        steps: [
          "dfs(i) returns all sentences for s[i:]",
          "For each j with s[i:j] in dict, combine word with dfs(j)",
          "Memoise dfs(i)",
        ],
        time: "O(n²·2^n) worst, fast in practice with memo",
        space: "O(n·#results)",
      },
    ],
    dryRun: 's="aaa", dict={a,aa} → "a a a","a aa","aa a"',
    interviewTips: [
      "Memoise by index (the suffix), not by string, to dedupe overlapping subproblems.",
      "Pre-check with Word Break I (boolean DP) to bail early when no segmentation exists.",
    ],
    commonMistakes: ["Joining words with wrong spacing.", "No memoisation → TLE on repeated suffixes."],
    followUps: ["Word Break I (does any segmentation exist?).", "Return only the count of segmentations."],
    related: ["word-break"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def word_break(s, word_dict):
    words = set(word_dict)
    memo = {}
    def dfs(i):
        if i == len(s):
            return [""]
        if i in memo:
            return memo[i]
        res = []
        for j in range(i + 1, len(s) + 1):
            w = s[i:j]
            if w in words:
                for rest in dfs(j):
                    res.append(w if rest == "" else w + " " + rest)
        memo[i] = res
        return res
    return dfs(0)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        Map<Integer, List<String>> memo = new HashMap<>();
        return dfs(s, 0, words, memo);
    }
    private List<String> dfs(String s, int i, Set<String> words, Map<Integer, List<String>> memo) {
        if (memo.containsKey(i)) return memo.get(i);
        List<String> res = new ArrayList<>();
        if (i == s.length()) { res.add(""); return res; }
        for (int j = i + 1; j <= s.length(); j++) {
            String w = s.substring(i, j);
            if (words.contains(w)) {
                for (String rest : dfs(s, j, words, memo)) {
                    res.add(rest.isEmpty() ? w : w + " " + rest);
                }
            }
        }
        memo.put(i, res);
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const memo = new Map();
  function dfs(i) {
    if (i === s.length) return [""];
    if (memo.has(i)) return memo.get(i);
    const res = [];
    for (let j = i + 1; j <= s.length; j++) {
      const w = s.slice(i, j);
      if (words.has(w)) {
        for (const rest of dfs(j)) res.push(rest === "" ? w : w + " " + rest);
      }
    }
    memo.set(i, res);
    return res;
  }
  return dfs(0);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> words = new Set<String>(wordDict);
        Map<Integer, List<String>> memo = new Map<Integer, List<String>>();
        return dfs(s, 0, words, memo);
    }
    static List<String> dfs(String s, Integer i, Set<String> words, Map<Integer, List<String>> memo) {
        if (memo.containsKey(i)) return memo.get(i);
        List<String> res = new List<String>();
        if (i == s.length()) { res.add(''); return res; }
        for (Integer j = i + 1; j <= s.length(); j++) {
            String w = s.substring(i, j);
            if (words.contains(w)) {
                for (String rest : dfs(s, j, words, memo)) {
                    res.add(rest == '' ? w : w + ' ' + rest);
                }
            }
        }
        memo.put(i, res);
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-product-of-word-lengths",
    title: "Maximum Product of Word Lengths",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation", "Strings"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array of lowercase words, return the maximum value of length(word[i]) × length(word[j]) where the two words share no common letters. Return 0 if no such pair exists.",
    beginnerExplanation:
      "Represent each word's set of letters as a 26-bit mask. Two words share no letter exactly when the AND of their masks is 0 — then their length product is a candidate.",
    realWorldAnalogy:
      "Each word gets a 26-light switchboard (one light per letter it uses). Two words are 'disjoint' if no light is on in both — a quick bitwise AND tells you instantly.",
    visualExplanation:
      'words=["abcw","baz","foo","bar","xtfn","abcdef"]\n"abcw"&"xtfn"=0 → 4*4=16 (max)',
    approaches: [
      {
        title: "Compare letter sets directly",
        tier: "Brute Force",
        idea: "For each pair, check letter overlap with sets.",
        steps: ["Double loop", "Set intersection per pair"],
        time: "O(n²·L)",
        space: "O(L)",
      },
      {
        title: "Bitmask per word",
        tier: "Optimal",
        idea: "Precompute a 26-bit mask per word; pair overlap is a single AND.",
        steps: [
          "mask |= 1 << (ch − 'a') for each word",
          "For each pair, if masks AND to 0, update max length product",
        ],
        time: "O(n² + total chars)",
        space: "O(n)",
      },
    ],
    dryRun: 'words=["a","ab","abc","cd"] → "ab"&"cd"=0 → 2*2=4',
    interviewTips: [
      "The 26-bit mask + AND is the canonical trick for 'no common letters'.",
      "Precompute masks once; the pair loop is then pure integer AND.",
    ],
    commonMistakes: ["Recomputing masks inside the pair loop.", "Using char codes without subtracting 'a'."],
    followUps: ["Words with arbitrary Unicode (mask no longer fits 32 bits).", "Maximum over triples."],
    related: ["maximum-xor-of-two-numbers-in-an-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_product(words):
    masks = []
    for w in words:
        m = 0
        for ch in w:
            m |= 1 << (ord(ch) - 97)
        masks.append(m)
    best = 0
    n = len(words)
    for i in range(n):
        for j in range(i + 1, n):
            if masks[i] & masks[j] == 0:
                best = max(best, len(words[i]) * len(words[j]))
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProduct(String[] words) {
        int n = words.length;
        int[] mask = new int[n];
        for (int i = 0; i < n; i++)
            for (char c : words[i].toCharArray())
                mask[i] |= 1 << (c - 'a');
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if ((mask[i] & mask[j]) == 0)
                    best = Math.max(best, words[i].length() * words[j].length());
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProduct(words) {
  const n = words.length;
  const mask = new Array(n).fill(0);
  for (let i = 0; i < n; i++)
    for (const c of words[i]) mask[i] |= 1 << (c.charCodeAt(0) - 97);
  let best = 0;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      if ((mask[i] & mask[j]) === 0)
        best = Math.max(best, words[i].length * words[j].length);
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProduct(List<String> words) {
        Integer n = words.size();
        List<Integer> mask = new List<Integer>();
        for (Integer i = 0; i < n; i++) {
            Integer m = 0;
            String w = words[i];
            for (Integer j = 0; j < w.length(); j++) {
                m |= 1 << (w.charAt(j) - 97);
            }
            mask.add(m);
        }
        Integer best = 0;
        for (Integer i = 0; i < n; i++) {
            for (Integer j = i + 1; j < n; j++) {
                if ((mask[i] & mask[j]) == 0) {
                    best = Math.max(best, words[i].length() * words[j].length());
                }
            }
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "camelcase-matching",
    title: "Camelcase Matching",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Strings", "Two Pointers"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Given an array of queries and a pattern, return a boolean for each query: true if you can insert lowercase letters into the pattern (anywhere, any number) to make it equal to the query.",
    beginnerExplanation:
      "Walk the query with a pointer into the pattern. If the current query char equals the next pattern char, advance the pattern pointer. Otherwise the char must be lowercase (a free insertion); if it's uppercase and doesn't match, this query fails. At the end the whole pattern must have been consumed.",
    realWorldAnalogy:
      "Pattern letters are mandatory checkpoints in order; lowercase query letters are optional filler you're allowed to add, but every uppercase letter must be an actual checkpoint.",
    visualExplanation:
      'queries=["FooBar","FooBarTest"], pattern="FoBa"\n"FooBar": F-o-o-B-a-r consumes F,o,B,a → all pattern used → true\n"FooBarTest": leftover uppercase T not in pattern → false',
    approaches: [
      {
        title: "Two-pointer subsequence + case rule",
        tier: "Optimal",
        idea: "Match pattern as a subsequence; any unmatched uppercase query char fails.",
        steps: [
          "Pointer p over pattern",
          "For each query char: if it equals pattern[p], advance p",
          "else if it's uppercase → false",
          "Finally require p reached pattern end",
        ],
        time: "O(total query length)",
        space: "O(1)",
      },
    ],
    dryRun: 'q="FooBar", p="FoBa": F→p1, o→p2, o(lower,ok), B→p3, a→p4, r(lower,ok); p==len → true',
    interviewTips: [
      "Two rules: pattern must match as a subsequence AND every extra char must be lowercase.",
      "Don't forget the final check that the whole pattern was consumed.",
    ],
    commonMistakes: [
      "Allowing leftover uppercase characters in the query.",
      "Not requiring the pattern pointer to reach the end.",
    ],
    followUps: ["Wildcards in the pattern.", "Return matched index ranges."],
    related: ["isomorphic-strings"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def camel_match(queries, pattern):
    def matches(q):
        i = 0
        for ch in q:
            if i < len(pattern) and ch == pattern[i]:
                i += 1
            elif ch.isupper():
                return False
        return i == len(pattern)
    return [matches(q) for q in queries]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Boolean> camelMatch(String[] queries, String pattern) {
        List<Boolean> res = new ArrayList<>();
        for (String q : queries) res.add(matches(q, pattern));
        return res;
    }
    private boolean matches(String q, String p) {
        int i = 0;
        for (char ch : q.toCharArray()) {
            if (i < p.length() && ch == p.charAt(i)) i++;
            else if (Character.isUpperCase(ch)) return false;
        }
        return i == p.length();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function camelMatch(queries, pattern) {
  const matches = (q) => {
    let i = 0;
    for (const ch of q) {
      if (i < pattern.length && ch === pattern[i]) i++;
      else if (ch >= "A" && ch <= "Z") return false;
    }
    return i === pattern.length;
  };
  return queries.map(matches);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Boolean> camelMatch(List<String> queries, String pattern) {
        List<Boolean> res = new List<Boolean>();
        for (String q : queries) res.add(matches(q, pattern));
        return res;
    }
    static Boolean matches(String q, String p) {
        Integer i = 0;
        for (Integer k = 0; k < q.length(); k++) {
            String ch = q.substring(k, k + 1);
            if (i < p.length() && ch == p.substring(i, i + 1)) {
                i++;
            } else if (ch == ch.toUpperCase() && ch != ch.toLowerCase()) {
                return false;
            }
        }
        return i == p.length();
    }
}`,
      },
    ],
  },
];

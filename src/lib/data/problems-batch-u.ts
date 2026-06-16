import type { Problem } from "@/lib/types";

export const PROBLEMS_BATCH_U: Problem[] = [
  {
    slug: "longest-common-substring",
    title: "Longest Common Substring",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given two strings s and t, return the length of their longest common substring — the longest run of characters appearing contiguously in both.",
    beginnerExplanation:
      "Like Longest Common Subsequence, but the match must be contiguous. So dp[i][j] = length of the common substring ENDING at s[i-1] and t[j-1]: if the characters match it extends the diagonal by 1, and if they don't it resets to 0. The answer is the largest value anywhere in the grid.",
    realWorldAnalogy:
      "Finding the longest identical passage shared by two documents — it has to be an unbroken stretch, not scattered words.",
    visualExplanation:
      's="abcde", t="abfde": runs "ab" (len 2) and "de" (len 2) → answer 2. A mismatch zeroes the cell.',
    approaches: [
      {
        title: "Check every pair of start positions",
        tier: "Brute Force",
        idea: "For each (i,j) extend while characters keep matching; track the max.",
        steps: ["Loop all start pairs", "Extend the matching run", "Track the best length"],
        time: "O(m·n·min(m,n))",
        space: "O(1)",
      },
      {
        title: "2-D DP on ending position",
        tier: "Optimal",
        idea: "dp[i][j] = common-substring length ending here; match → diagonal+1, else 0.",
        steps: [
          "dp[i][j] = dp[i-1][j-1] + 1 when s[i-1]==t[j-1], else 0",
          "Track the global maximum cell",
        ],
        time: "O(m·n)",
        space: "O(m·n) (reducible to O(n))",
      },
    ],
    dryRun: 's="abcde", t="bcde": diagonal run b,c,d,e builds 1,2,3,4 → answer 4.',
    interviewTips: [
      "The one-line difference from LCS: on a mismatch you RESET to 0 (no carry-over), and the answer is the max cell, not dp[m][n].",
    ],
    commonMistakes: [
      "Returning dp[m][n] like LCS instead of the running maximum.",
      "Forgetting to reset the cell to 0 on a mismatch.",
    ],
    followUps: ["Return the substring itself.", "Longest common subsequence (gaps allowed)."],
    related: ["longest-common-subsequence", "edit-distance"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_common_substring(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    best = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s[i - 1] == t[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                best = max(best, dp[i][j])
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int longestCommonSubstring(String s, String t) {
        int m = s.length(), n = t.length(), best = 0;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    best = Math.max(best, dp[i][j]);
                }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestCommonSubstring(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        best = Math.max(best, dp[i][j]);
      }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestCommonSubstring(String s, String t) {
        Integer m = s.length(), n = t.length(), best = 0;
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= m; i++)
            for (Integer j = 1; j <= n; j++)
                if (s.substring(i - 1, i) == t.substring(j - 1, j)) {
                    dp[i].set(j, dp[i - 1][j - 1] + 1);
                    best = Math.max(best, dp[i][j]);
                }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-palindromic-subsequence",
    title: "Longest Palindromic Subsequence",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a string s, return the length of its longest palindromic subsequence (characters in order, not necessarily contiguous, reading the same forwards and backwards).",
    beginnerExplanation:
      "A palindrome reads the same reversed — so the longest palindromic subsequence of s is exactly the Longest Common Subsequence of s and its reverse. Reverse the string, run LCS, done.",
    realWorldAnalogy:
      "Folding a strip of letters in half and finding the longest set of letters that line up when one half is flipped onto the other.",
    visualExplanation:
      's="bbbab" → reverse "babbb"; LCS = "bbbb" → 4.',
    approaches: [
      {
        title: "LCS of s and reverse(s)",
        tier: "Optimal",
        idea: "The LPS of s equals LCS(s, reversed s); reuse the LCS grid.",
        steps: ["t = reverse(s)", "Run standard LCS on (s, t)", "Answer = dp[n][n]"],
        time: "O(n²)",
        space: "O(n²)",
      },
    ],
    dryRun: 's="bbbab", t="babbb" → LCS builds to 4 ("bbbb").',
    interviewTips: [
      "Recognising 'palindromic subsequence = LCS with the reverse' instantly turns a scary prompt into a known template.",
      "Min insertions/deletions to make a palindrome both reduce to n − LPS.",
    ],
    commonMistakes: [
      "Confusing subsequence with substring (the substring version is a different, expand-around-center DP).",
    ],
    followUps: ["Minimum insertions to make it a palindrome (n − LPS).", "Reconstruct the palindrome."],
    related: ["longest-common-subsequence", "minimum-insertions-to-make-string-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_palindromic_subsequence(s):
    t = s[::-1]
    n = len(s)
    dp = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if s[i - 1] == t[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        String t = new StringBuilder(s).reverse().toString();
        int[][] dp = new int[n + 1][n + 1];
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s.charAt(i - 1) == t.charAt(j - 1)
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
        return dp[n][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const t = s.split("").reverse().join("");
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = s[i - 1] === t[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[n][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestPalindromeSubseq(String s) {
        Integer n = s.length();
        String t = '';
        for (Integer i = n - 1; i >= 0; i--) t += s.substring(i, i + 1);
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= n; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= n; i++)
            for (Integer j = 1; j <= n; j++)
                if (s.substring(i - 1, i) == t.substring(j - 1, j))
                    dp[i].set(j, dp[i - 1][j - 1] + 1);
                else
                    dp[i].set(j, Math.max(dp[i - 1][j], dp[i][j - 1]));
        return dp[n][n];
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-insertions-to-make-string-palindrome",
    title: "Minimum Insertions to Make String Palindrome",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string s, return the minimum number of characters you must insert (anywhere) to make it a palindrome.",
    beginnerExplanation:
      "The characters you can KEEP for free are the longest palindromic subsequence (LPS). Every other character needs a matching insertion. So the answer is simply length(s) − LPS(s).",
    realWorldAnalogy:
      "You already have a symmetric skeleton (the LPS); you just pad in the missing mirror characters — one insertion per unmatched character.",
    visualExplanation:
      's="abcaa": LPS = "aca" (3) → insertions = 5 − 3 = 2.',
    approaches: [
      {
        title: "n − Longest Palindromic Subsequence",
        tier: "Optimal",
        idea: "LPS = LCS(s, reverse s); answer = n − LPS.",
        steps: ["Compute LPS via LCS with the reverse", "Return n − LPS"],
        time: "O(n²)",
        space: "O(n²)",
      },
    ],
    dryRun: 's="abcaa" → LPS 3 → 5 − 3 = 2.',
    interviewTips: [
      "Same DP also answers 'minimum DELETIONS to make a palindrome' — both equal n − LPS.",
    ],
    commonMistakes: ["Trying to greedily insert characters instead of reducing to LPS."],
    followUps: ["Minimum deletions to make a palindrome (same answer).", "Make two strings equal via insert/delete."],
    related: ["longest-palindromic-subsequence", "longest-common-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_insertions(s):
    t = s[::-1]
    n = len(s)
    dp = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if s[i - 1] == t[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return n - dp[n][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minInsertions(String s) {
        int n = s.length();
        String t = new StringBuilder(s).reverse().toString();
        int[][] dp = new int[n + 1][n + 1];
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s.charAt(i - 1) == t.charAt(j - 1)
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
        return n - dp[n][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minInsertions(s) {
  const n = s.length;
  const t = s.split("").reverse().join("");
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = s[i - 1] === t[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return n - dp[n][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minInsertions(String s) {
        Integer n = s.length();
        String t = '';
        for (Integer i = n - 1; i >= 0; i--) t += s.substring(i, i + 1);
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= n; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= n; i++)
            for (Integer j = 1; j <= n; j++)
                if (s.substring(i - 1, i) == t.substring(j - 1, j))
                    dp[i].set(j, dp[i - 1][j - 1] + 1);
                else
                    dp[i].set(j, Math.max(dp[i - 1][j], dp[i][j - 1]));
        return n - dp[n][n];
    }
}`,
      },
    ],
  },
  {
    slug: "shortest-common-supersequence",
    title: "Shortest Common Supersequence",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given two strings s and t, return the shortest string that has both s and t as subsequences. (If several exist, any is acceptable.)",
    beginnerExplanation:
      "Build the LCS grid for s and t. The shared characters (the LCS) are written once; everything else from each string is woven in around them. Walk the grid backwards: on a match take one character and step diagonally; otherwise take the character from whichever side the DP came from.",
    realWorldAnalogy:
      "Merging two edit histories of the same document into the shortest combined timeline that still contains both, sharing the common edits.",
    visualExplanation:
      's="abac", t="cab" → LCS "ab"; supersequence "cabac" (length 5 = 4 + 3 − 2).',
    approaches: [
      {
        title: "LCS grid + backtrack to build the string",
        tier: "Optimal",
        idea: "Length is m + n − LCS; reconstruct by walking the LCS table from (m,n).",
        steps: [
          "Fill the standard LCS dp table",
          "Backtrack: match → emit once & go diagonal; else emit the larger-neighbour side",
          "Append leftovers, then reverse",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun: 's="abac", t="cab": backtrack weaves c + ab + ac → "cabac".',
    interviewTips: [
      "Two parts: (1) LCS length gives the answer length m+n−LCS, (2) reconstruction is the real test — practice the backtrack.",
    ],
    commonMistakes: [
      "Emitting the shared character twice during the merge.",
      "Forgetting to drain the leftover prefix of whichever string remains.",
    ],
    followUps: ["Just the length (m + n − LCS).", "Number of distinct shortest supersequences."],
    related: ["longest-common-subsequence", "edit-distance"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def shortest_common_supersequence(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s[i - 1] == t[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    i, j, res = m, n, []
    while i > 0 and j > 0:
        if s[i - 1] == t[j - 1]:
            res.append(s[i - 1]); i -= 1; j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            res.append(s[i - 1]); i -= 1
        else:
            res.append(t[j - 1]); j -= 1
    while i > 0:
        res.append(s[i - 1]); i -= 1
    while j > 0:
        res.append(t[j - 1]); j -= 1
    return "".join(reversed(res))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String shortestCommonSupersequence(String s, String t) {
        int m = s.length(), n = t.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = s.charAt(i - 1) == t.charAt(j - 1)
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
        StringBuilder sb = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (s.charAt(i - 1) == t.charAt(j - 1)) { sb.append(s.charAt(i - 1)); i--; j--; }
            else if (dp[i - 1][j] >= dp[i][j - 1]) { sb.append(s.charAt(i - 1)); i--; }
            else { sb.append(t.charAt(j - 1)); j--; }
        }
        while (i > 0) { sb.append(s.charAt(i - 1)); i--; }
        while (j > 0) { sb.append(t.charAt(j - 1)); j--; }
        return sb.reverse().toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function shortestCommonSupersequence(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = s[i - 1] === t[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  let i = m, j = n;
  const res = [];
  while (i > 0 && j > 0) {
    if (s[i - 1] === t[j - 1]) { res.push(s[i - 1]); i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) { res.push(s[i - 1]); i--; }
    else { res.push(t[j - 1]); j--; }
  }
  while (i > 0) { res.push(s[i - 1]); i--; }
  while (j > 0) { res.push(t[j - 1]); j--; }
  return res.reverse().join("");
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String shortestCommonSupersequence(String s, String t) {
        Integer m = s.length(), n = t.length();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= m; i++)
            for (Integer j = 1; j <= n; j++)
                if (s.substring(i - 1, i) == t.substring(j - 1, j))
                    dp[i].set(j, dp[i - 1][j - 1] + 1);
                else
                    dp[i].set(j, Math.max(dp[i - 1][j], dp[i][j - 1]));
        Integer i = m, j = n;
        String res = '';
        while (i > 0 && j > 0) {
            if (s.substring(i - 1, i) == t.substring(j - 1, j)) { res = s.substring(i - 1, i) + res; i--; j--; }
            else if (dp[i - 1][j] >= dp[i][j - 1]) { res = s.substring(i - 1, i) + res; i--; }
            else { res = t.substring(j - 1, j) + res; j--; }
        }
        while (i > 0) { res = s.substring(i - 1, i) + res; i--; }
        while (j > 0) { res = t.substring(j - 1, j) + res; j--; }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "wildcard-matching",
    title: "Wildcard Matching",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["google", "amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an input string s and a pattern p containing '?' (matches any single character) and '*' (matches any sequence of characters, including empty), return whether p matches the entire string s.",
    beginnerExplanation:
      "dp[i][j] = does the first i characters of s match the first j of p? A '*' is the only tricky case: it can match nothing (look left, dp[i][j-1]) or one-more character (look up, dp[i-1][j]). '?' or an exact letter just inherits the diagonal.",
    realWorldAnalogy:
      "Shell glob matching — `*.txt` against a filename: the '*' expands to swallow as much or as little as needed.",
    visualExplanation:
      's="adceb", p="*a*b" → true. The leading * matches "", a matches a, * matches "dce", b matches b.',
    approaches: [
      {
        title: "Greedy with backtrack pointer",
        tier: "Better",
        idea: "Track the last '*' and the position it last matched; backtrack on mismatch.",
        steps: ["Advance on ?/match", "On '*' remember positions", "Backtrack to the star on mismatch"],
        time: "O(m·n) worst, O(m+n) typical",
        space: "O(1)",
      },
      {
        title: "2-D DP",
        tier: "Optimal",
        idea: "Fill dp where '*' = dp[i-1][j] OR dp[i][j-1]; base row handles leading stars.",
        steps: [
          "dp[0][0]=true; dp[0][j]=dp[0][j-1] if p[j-1]=='*'",
          "'*' → dp[i-1][j] || dp[i][j-1]",
          "'?' or equal → dp[i-1][j-1]",
        ],
        time: "O(m·n)",
        space: "O(m·n)",
      },
    ],
    dryRun: 's="ab", p="?*": dp[0][0]=T; ? matches a; * covers b → dp[2][2]=true.',
    interviewTips: [
      "Be precise that '*' matches the EMPTY string too — that's the dp[i][j-1] branch and the base-row seeding.",
      "Contrast with Regex Matching where '*' applies to the preceding character (different recurrence).",
    ],
    commonMistakes: [
      "Forgetting to seed dp[0][j] for leading stars.",
      "Mixing up the two '*' branches (consume a char vs match empty).",
    ],
    followUps: ["Regular Expression Matching (LC 10).", "Return the matched segments."],
    related: ["edit-distance", "longest-common-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_match(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        if p[j - 1] == "*":
            dp[0][j] = dp[0][j - 1]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == "*":
                dp[i][j] = dp[i - 1][j] or dp[i][j - 1]
            elif p[j - 1] == "?" or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    return dp[m][n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int j = 1; j <= n; j++)
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                char c = p.charAt(j - 1);
                if (c == '*') dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                else if (c == '?' || c == s.charAt(i - 1)) dp[i][j] = dp[i - 1][j - 1];
            }
        return dp[m][n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++)
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1];
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      const c = p[j - 1];
      if (c === "*") dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      else if (c === "?" || c === s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
    }
  return dp[m][n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isMatch(String s, String p) {
        Integer m = s.length(), n = p.length();
        List<List<Boolean>> dp = new List<List<Boolean>>();
        for (Integer i = 0; i <= m; i++) {
            List<Boolean> row = new List<Boolean>();
            for (Integer j = 0; j <= n; j++) row.add(false);
            dp.add(row);
        }
        dp[0].set(0, true);
        for (Integer j = 1; j <= n; j++)
            if (p.substring(j - 1, j) == '*') dp[0].set(j, dp[0][j - 1]);
        for (Integer i = 1; i <= m; i++)
            for (Integer j = 1; j <= n; j++) {
                String c = p.substring(j - 1, j);
                if (c == '*') dp[i].set(j, dp[i - 1][j] || dp[i][j - 1]);
                else if (c == '?' || c == s.substring(i - 1, i)) dp[i].set(j, dp[i - 1][j - 1]);
            }
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    slug: "best-time-to-buy-and-sell-stock-ii",
    title: "Best Time to Buy and Sell Stock II",
    difficulty: "Medium",
    patterns: ["dynamic-programming", "greedy"],
    topics: ["Dynamic Programming", "Arrays", "Greedy"],
    companies: ["amazon", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an array prices where prices[i] is the price on day i, you may complete as many transactions as you like (buy then sell, never holding more than one share at a time). Return the maximum profit.",
    beginnerExplanation:
      "With unlimited transactions, the maximum profit is just the sum of every upward step. Any rising stretch can be captured as a series of one-day gains, so you grab profit on every day the price went up.",
    realWorldAnalogy:
      "If you could perfectly trade a stock with no fees, you'd ride every uphill and sit out every downhill — the total climb is the sum of all the up-moves.",
    visualExplanation:
      "prices=[7,1,5,3,6,4]: up-steps 1→5 (+4) and 3→6 (+3) → 7.",
    approaches: [
      {
        title: "Sum of positive consecutive differences",
        tier: "Optimal",
        idea: "Add prices[i]-prices[i-1] whenever it's positive.",
        steps: ["Loop from day 1", "Add any positive day-over-day gain"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "prices=[1,2,3,4,5]: +1+1+1+1 = 4.",
    interviewTips: [
      "Prove why grabbing every up-step is optimal: a multi-day rise A→D equals (B−A)+(C−B)+(D−C).",
      "There's an equivalent buy/sell state DP — mention it, but the greedy is cleaner here.",
    ],
    commonMistakes: ["Trying to find one global min/max pair (that's Stock I, the single-transaction version)."],
    followUps: ["At most 2 transactions (Stock III).", "At most k transactions (Stock IV).", "With a transaction fee."],
    related: ["best-time-to-buy-sell-stock", "best-time-to-buy-and-sell-stock-with-transaction-fee"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_profit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++)
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        return profit;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++)
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  return profit;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProfit(List<Integer> prices) {
        Integer profit = 0;
        for (Integer i = 1; i < prices.size(); i++)
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        return profit;
    }
}`,
      },
    ],
  },
  {
    slug: "best-time-to-buy-and-sell-stock-iii",
    title: "Best Time to Buy and Sell Stock III",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given prices where prices[i] is the price on day i, return the maximum profit from at most TWO transactions. You must sell before buying again.",
    beginnerExplanation:
      "Track four running states as you scan: best balance after buying once (buy1), after selling once (sell1), after buying a second time (buy2), and after selling twice (sell2). Each day, update them in order so each builds on the previous stage's best.",
    realWorldAnalogy:
      "Two rounds of buy-low/sell-high, where the cash from round one funds round two — you carry the best running result of each milestone.",
    visualExplanation:
      "prices=[3,3,5,0,0,3,1,4]: best is buy 0 sell 3, buy 1 sell 4 → 6.",
    approaches: [
      {
        title: "Four rolling states",
        tier: "Optimal",
        idea: "buy1=max(buy1,-p); sell1=max(sell1,buy1+p); buy2=max(buy2,sell1-p); sell2=max(sell2,buy2+p).",
        steps: ["Init buy1,buy2=-inf; sell1,sell2=0", "Update the four states each day", "Answer = sell2"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "prices=[1,2,3,4,5]: collapses to one transaction profit 4 (sell2 caps at 2 txns but uses fewer).",
    interviewTips: [
      "This is Stock IV with k=2 unrolled — knowing the generalisation (a 2D k×state DP) shows depth.",
      "Order of the four updates matters: each later state reads the just-updated earlier one.",
    ],
    commonMistakes: ["Wrong update order.", "Initialising buy states to 0 instead of −infinity."],
    followUps: ["At most k transactions (Stock IV).", "Unlimited transactions (Stock II)."],
    related: ["best-time-to-buy-and-sell-stock-iv", "best-time-to-buy-and-sell-stock-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_profit(prices):
    buy1 = buy2 = float("-inf")
    sell1 = sell2 = 0
    for p in prices:
        buy1 = max(buy1, -p)
        sell1 = max(sell1, buy1 + p)
        buy2 = max(buy2, sell1 - p)
        sell2 = max(sell2, buy2 + p)
    return sell2`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = Integer.MIN_VALUE, buy2 = Integer.MIN_VALUE, sell1 = 0, sell2 = 0;
        for (int p : prices) {
            buy1 = Math.max(buy1, -p);
            sell1 = Math.max(sell1, buy1 + p);
            buy2 = Math.max(buy2, sell1 - p);
            sell2 = Math.max(sell2, buy2 + p);
        }
        return sell2;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProfit(prices) {
  let buy1 = -Infinity, buy2 = -Infinity, sell1 = 0, sell2 = 0;
  for (const p of prices) {
    buy1 = Math.max(buy1, -p);
    sell1 = Math.max(sell1, buy1 + p);
    buy2 = Math.max(buy2, sell1 - p);
    sell2 = Math.max(sell2, buy2 + p);
  }
  return sell2;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProfit(List<Integer> prices) {
        Integer buy1 = -2147483647, buy2 = -2147483647, sell1 = 0, sell2 = 0;
        for (Integer p : prices) {
            buy1 = Math.max(buy1, -p);
            sell1 = Math.max(sell1, buy1 + p);
            buy2 = Math.max(buy2, sell1 - p);
            sell2 = Math.max(sell2, buy2 + p);
        }
        return sell2;
    }
}`,
      },
    ],
  },
  {
    slug: "best-time-to-buy-and-sell-stock-iv",
    title: "Best Time to Buy and Sell Stock IV",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an integer k and an array prices, return the maximum profit from at most k transactions (sell before buying again).",
    beginnerExplanation:
      "Generalise Stock III: keep arrays buy[1..k] and sell[1..k]. For each price, update each transaction tier. If k is at least half the days, transactions are effectively unlimited, so fall back to the Stock II greedy.",
    realWorldAnalogy:
      "k rounds of buy-low/sell-high stacked, each funded by the prior round's proceeds.",
    visualExplanation:
      "k=2, prices=[2,4,1]: buy 2 sell 4 → 2; second txn adds nothing → 2.",
    approaches: [
      {
        title: "k×2 rolling DP (+ unlimited shortcut)",
        tier: "Optimal",
        idea: "For each price update buy[j]=max(buy[j],sell[j-1]-p); sell[j]=max(sell[j],buy[j]+p).",
        steps: [
          "If k ≥ n/2 → sum of positive steps (unlimited)",
          "Else maintain buy[1..k], sell[1..k]",
          "Answer = sell[k]",
        ],
        time: "O(n·k)",
        space: "O(k)",
      },
    ],
    dryRun: "k=2, prices=[3,2,6,5,0,3]: buy2 sell6 (+4), buy0 sell3 (+3) → 7.",
    interviewTips: [
      "The k ≥ n/2 shortcut avoids TLE and is the detail interviewers look for.",
      "Iterate prices outer, transactions inner, updating buy before sell each tier.",
    ],
    commonMistakes: ["Skipping the unlimited shortcut.", "Off-by-one in the buy[j-1]/sell[j-1] indexing."],
    followUps: ["With cooldown.", "With transaction fee."],
    related: ["best-time-to-buy-and-sell-stock-iii", "best-time-to-buy-and-sell-stock-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_profit(k, prices):
    n = len(prices)
    if n == 0 or k == 0:
        return 0
    if k >= n // 2:
        return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, n))
    buy = [float("-inf")] * (k + 1)
    sell = [0] * (k + 1)
    for p in prices:
        for j in range(1, k + 1):
            buy[j] = max(buy[j], sell[j - 1] - p)
            sell[j] = max(sell[j], buy[j] + p)
    return sell[k]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0 || k == 0) return 0;
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            return profit;
        }
        int[] buy = new int[k + 1], sell = new int[k + 1];
        java.util.Arrays.fill(buy, Integer.MIN_VALUE);
        for (int p : prices)
            for (int j = 1; j <= k; j++) {
                buy[j] = Math.max(buy[j], sell[j - 1] - p);
                sell[j] = Math.max(sell[j], buy[j] + p);
            }
        return sell[k];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProfit(k, prices) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;
  if (k >= n >> 1) {
    let profit = 0;
    for (let i = 1; i < n; i++) if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
    return profit;
  }
  const buy = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);
  for (const p of prices)
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - p);
      sell[j] = Math.max(sell[j], buy[j] + p);
    }
  return sell[k];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProfit(Integer k, List<Integer> prices) {
        Integer n = prices.size();
        if (n == 0 || k == 0) return 0;
        if (k >= n / 2) {
            Integer profit = 0;
            for (Integer i = 1; i < n; i++) if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            return profit;
        }
        List<Integer> buy = new List<Integer>();
        List<Integer> sell = new List<Integer>();
        for (Integer j = 0; j <= k; j++) { buy.add(-2147483647); sell.add(0); }
        for (Integer p : prices)
            for (Integer j = 1; j <= k; j++) {
                buy.set(j, Math.max(buy[j], sell[j - 1] - p));
                sell.set(j, Math.max(sell[j], buy[j] + p));
            }
        return sell[k];
    }
}`,
      },
    ],
  },
  {
    slug: "best-time-to-buy-and-sell-stock-with-transaction-fee",
    title: "Best Time to Buy and Sell Stock with Transaction Fee",
    difficulty: "Medium",
    patterns: ["dynamic-programming", "greedy"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given prices and an integer fee, complete as many transactions as you like but pay fee per transaction. Return the maximum profit.",
    beginnerExplanation:
      "Two states each day: cash (not holding a share) and hold (holding one). cash = best of staying in cash or selling today (paying the fee); hold = best of staying held or buying today. The answer is the final cash.",
    realWorldAnalogy:
      "Unlimited trading but the broker charges a flat fee per round-trip, so you only trade when the gain clears the fee.",
    visualExplanation:
      "prices=[1,3,2,8,4,9], fee=2 → 8 (buy 1 sell 8 net 5, buy 4 sell 9 net 3).",
    approaches: [
      {
        title: "Two-state DP (cash / hold)",
        tier: "Optimal",
        idea: "cash=max(cash, hold+p−fee); hold=max(hold, cash−p).",
        steps: ["Init cash=0, hold=−inf", "Update both each day", "Answer = cash"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "prices=[1,3,2,8,4,9], fee=2 → cash ends at 8.",
    interviewTips: [
      "Charge the fee on SELL (or on buy) — just be consistent; selling is the common convention.",
      "This is the cleanest of the stock-DP family — a great one to template the state machine on.",
    ],
    commonMistakes: ["Charging the fee on both buy and sell.", "Initialising hold to 0."],
    followUps: ["With cooldown instead of a fee.", "At most k transactions."],
    related: ["best-time-to-buy-and-sell-stock-ii", "best-time-to-buy-sell-stock"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_profit(prices, fee):
    cash, hold = 0, float("-inf")
    for p in prices:
        cash = max(cash, hold + p - fee)
        hold = max(hold, cash - p)
    return cash`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProfit(int[] prices, int fee) {
        int cash = 0, hold = Integer.MIN_VALUE;
        for (int p : prices) {
            cash = Math.max(cash, hold + p - fee);
            hold = Math.max(hold, cash - p);
        }
        return cash;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProfit(prices, fee) {
  let cash = 0, hold = -Infinity;
  for (const p of prices) {
    cash = Math.max(cash, hold + p - fee);
    hold = Math.max(hold, cash - p);
  }
  return cash;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProfit(List<Integer> prices, Integer fee) {
        Integer cash = 0, hold = -2147483647;
        for (Integer p : prices) {
            cash = Math.max(cash, hold + p - fee);
            hold = Math.max(hold, cash - p);
        }
        return cash;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-longest-increasing-subsequence",
    title: "Number of Longest Increasing Subsequence",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer array nums, return the number of longest strictly increasing subsequences.",
    beginnerExplanation:
      "Run the O(n²) LIS DP but keep TWO arrays: length[i] (longest increasing subsequence ending at i) and count[i] (how many achieve it). When extending from j: if it yields a strictly longer subsequence, copy count[j]; if it ties the current best length, add count[j]. Finally sum counts over all i with the global max length.",
    realWorldAnalogy:
      "Not just the longest winning streak, but how many distinct longest streaks tie for first place.",
    visualExplanation:
      "nums=[1,3,5,4,7]: longest length 4; two of them ([1,3,5,7] and [1,3,4,7]) → 2.",
    approaches: [
      {
        title: "LIS DP with count tracking",
        tier: "Optimal",
        idea: "Maintain length[] and count[]; combine on extend (reset vs accumulate).",
        steps: [
          "For each i, scan j<i with nums[j]<nums[i]",
          "length[j]+1 > length[i] → set length, count[i]=count[j]",
          "length[j]+1 == length[i] → count[i]+=count[j]",
          "Sum count[i] where length[i]==max",
        ],
        time: "O(n²)",
        space: "O(n)",
      },
    ],
    dryRun: "nums=[2,2,2,2,2]: each is its own LIS of length 1 → count 5.",
    interviewTips: [
      "The subtlety is STRICTLY-longer (reset count) vs EQUAL length (accumulate count) — state both branches explicitly.",
    ],
    commonMistakes: [
      "Adding instead of replacing count when a strictly longer subsequence is found.",
      "Summing only one max index instead of all of them.",
    ],
    followUps: ["Reconstruct one such subsequence.", "O(n log n) with Fenwick trees."],
    related: ["longest-increasing-subsequence", "longest-bitonic-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_number_of_lis(nums):
    n = len(nums)
    if n == 0:
        return 0
    length = [1] * n
    count = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                if length[j] + 1 > length[i]:
                    length[i] = length[j] + 1
                    count[i] = count[j]
                elif length[j] + 1 == length[i]:
                    count[i] += count[j]
    longest = max(length)
    return sum(c for l, c in zip(length, count) if l == longest)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int[] length = new int[n], count = new int[n];
        java.util.Arrays.fill(length, 1);
        java.util.Arrays.fill(count, 1);
        int longest = 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++)
                if (nums[j] < nums[i]) {
                    if (length[j] + 1 > length[i]) { length[i] = length[j] + 1; count[i] = count[j]; }
                    else if (length[j] + 1 == length[i]) count[i] += count[j];
                }
            longest = Math.max(longest, length[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) if (length[i] == longest) res += count[i];
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findNumberOfLIS(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const length = new Array(n).fill(1), count = new Array(n).fill(1);
  let longest = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++)
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) { length[i] = length[j] + 1; count[i] = count[j]; }
        else if (length[j] + 1 === length[i]) count[i] += count[j];
      }
    longest = Math.max(longest, length[i]);
  }
  let res = 0;
  for (let i = 0; i < n; i++) if (length[i] === longest) res += count[i];
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findNumberOfLIS(List<Integer> nums) {
        Integer n = nums.size();
        if (n == 0) return 0;
        List<Integer> length = new List<Integer>(), count = new List<Integer>();
        for (Integer i = 0; i < n; i++) { length.add(1); count.add(1); }
        Integer longest = 1;
        for (Integer i = 0; i < n; i++) {
            for (Integer j = 0; j < i; j++)
                if (nums[j] < nums[i]) {
                    if (length[j] + 1 > length[i]) { length.set(i, length[j] + 1); count.set(i, count[j]); }
                    else if (length[j] + 1 == length[i]) count.set(i, count[i] + count[j]);
                }
            longest = Math.max(longest, length[i]);
        }
        Integer res = 0;
        for (Integer i = 0; i < n; i++) if (length[i] == longest) res += count[i];
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-bitonic-subsequence",
    title: "Longest Bitonic Subsequence",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A bitonic subsequence first strictly increases, then strictly decreases (either part may be empty). Given an array nums, return the length of the longest bitonic subsequence.",
    beginnerExplanation:
      "Compute, for each index, the longest increasing subsequence ENDING there (lis[i]) and the longest decreasing subsequence STARTING there (lds[i]). A peak at i contributes lis[i] + lds[i] − 1 (the peak is counted twice). The answer is the max over all peaks.",
    realWorldAnalogy:
      "A mountain profile: the longest climb up to a summit plus the longest descent down the other side, sharing the summit.",
    visualExplanation:
      "nums=[1,2,1,2,1]: lis up to a 2 is 2, lds from it is 2 → 2+2−1 = 3.",
    approaches: [
      {
        title: "LIS-from-left + LDS-from-right",
        tier: "Optimal",
        idea: "Combine increasing-ending-here and decreasing-starting-here at each peak.",
        steps: ["lis[i] via forward O(n²) DP", "lds[i] via backward O(n²) DP", "max(lis[i]+lds[i]−1)"],
        time: "O(n²)",
        space: "O(n)",
      },
    ],
    dryRun: "nums=[1,11,2,10,4,5,2,1]: peak 10 → up [1,2,10]=3, down [10,4,2,1]=4 → 3+4−1=6.",
    interviewTips: [
      "Two independent O(n²) LIS passes (one reversed) — say that and it's straightforward.",
      "Decide whether a pure increasing/decreasing run counts as bitonic; clarify with the interviewer.",
    ],
    commonMistakes: ["Forgetting the −1 for the double-counted peak.", "Using ≤ instead of strict <."],
    followUps: ["Longest mountain in an array (contiguous variant).", "O(n log n) LIS speedups."],
    related: ["longest-increasing-subsequence", "number-of-longest-increasing-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_bitonic_subsequence(nums):
    n = len(nums)
    if n == 0:
        return 0
    lis = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                lis[i] = max(lis[i], lis[j] + 1)
    lds = [1] * n
    for i in range(n - 1, -1, -1):
        for j in range(n - 1, i, -1):
            if nums[j] < nums[i]:
                lds[i] = max(lds[i], lds[j] + 1)
    return max(lis[i] + lds[i] - 1 for i in range(n))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int longestBitonicSubsequence(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int[] lis = new int[n], lds = new int[n];
        java.util.Arrays.fill(lis, 1);
        java.util.Arrays.fill(lds, 1);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < i; j++)
                if (nums[j] < nums[i]) lis[i] = Math.max(lis[i], lis[j] + 1);
        for (int i = n - 1; i >= 0; i--)
            for (int j = n - 1; j > i; j--)
                if (nums[j] < nums[i]) lds[i] = Math.max(lds[i], lds[j] + 1);
        int best = 0;
        for (int i = 0; i < n; i++) best = Math.max(best, lis[i] + lds[i] - 1);
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestBitonicSubsequence(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const lis = new Array(n).fill(1), lds = new Array(n).fill(1);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < i; j++)
      if (nums[j] < nums[i]) lis[i] = Math.max(lis[i], lis[j] + 1);
  for (let i = n - 1; i >= 0; i--)
    for (let j = n - 1; j > i; j--)
      if (nums[j] < nums[i]) lds[i] = Math.max(lds[i], lds[j] + 1);
  let best = 0;
  for (let i = 0; i < n; i++) best = Math.max(best, lis[i] + lds[i] - 1);
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestBitonicSubsequence(List<Integer> nums) {
        Integer n = nums.size();
        if (n == 0) return 0;
        List<Integer> lis = new List<Integer>(), lds = new List<Integer>();
        for (Integer i = 0; i < n; i++) { lis.add(1); lds.add(1); }
        for (Integer i = 0; i < n; i++)
            for (Integer j = 0; j < i; j++)
                if (nums[j] < nums[i]) lis.set(i, Math.max(lis[i], lis[j] + 1));
        for (Integer i = n - 1; i >= 0; i--)
            for (Integer j = n - 1; j > i; j--)
                if (nums[j] < nums[i]) lds.set(i, Math.max(lds[i], lds[j] + 1));
        Integer best = 0;
        for (Integer i = 0; i < n; i++) best = Math.max(best, lis[i] + lds[i] - 1);
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "largest-divisible-subset",
    title: "Largest Divisible Subset",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a set of distinct positive integers nums, return the largest subset such that every pair (a, b) in it satisfies a % b == 0 or b % a == 0. If multiple exist, return any.",
    beginnerExplanation:
      "Sort the numbers. Then it's exactly Longest Increasing Subsequence, but the 'increasing' condition is 'divisible by the previous'. In a sorted list, if nums[i] % nums[j] == 0 then nums[i] is divisible by every element in nums[j]'s chain. Track a parent pointer to rebuild the actual subset.",
    realWorldAnalogy:
      "Building the longest chain of nested gears where each bigger gear's tooth count is a multiple of the smaller one it meshes with.",
    visualExplanation:
      "nums=[1,2,4,8]: 1→2→4→8 all divide forward → subset [1,2,4,8].",
    approaches: [
      {
        title: "Sort + LIS-style DP with parent pointers",
        tier: "Optimal",
        idea: "Sort; dp[i]=longest divisible chain ending at i; backtrack via prev[].",
        steps: [
          "Sort ascending",
          "dp[i]=max(dp[j]+1) over j<i with nums[i]%nums[j]==0; set prev[i]=j",
          "Track best index, then walk prev[] to rebuild",
        ],
        time: "O(n²)",
        space: "O(n)",
      },
    ],
    dryRun: "nums=[1,2,3]: chains 1→2 and 1→3 (len 2) → e.g. [1,2].",
    interviewTips: [
      "Sorting is the key insight that reduces pairwise divisibility to a transitive chain (LIS).",
      "Practise the parent-pointer reconstruction — returning the subset (not just its size) is the ask.",
    ],
    commonMistakes: ["Forgetting to sort first.", "Returning length instead of the subset."],
    followUps: ["Count the number of largest divisible subsets.", "Largest subset with GCD > 1."],
    related: ["longest-increasing-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def largest_divisible_subset(nums):
    if not nums:
        return []
    nums.sort()
    n = len(nums)
    dp = [1] * n
    prev = [-1] * n
    best = 0
    for i in range(n):
        for j in range(i):
            if nums[i] % nums[j] == 0 and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                prev[i] = j
        if dp[i] > dp[best]:
            best = i
    res = []
    k = best
    while k != -1:
        res.append(nums[k])
        k = prev[k]
    return res[::-1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        if (nums.length == 0) return new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length, best = 0;
        int[] dp = new int[n], prev = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(prev, -1);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++)
                if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; prev[i] = j; }
            if (dp[i] > dp[best]) best = i;
        }
        LinkedList<Integer> res = new LinkedList<>();
        for (int k = best; k != -1; k = prev[k]) res.addFirst(nums[k]);
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function largestDivisibleSubset(nums) {
  if (nums.length === 0) return [];
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const dp = new Array(n).fill(1), prev = new Array(n).fill(-1);
  let best = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++)
      if (nums[i] % nums[j] === 0 && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; prev[i] = j; }
    if (dp[i] > dp[best]) best = i;
  }
  const res = [];
  for (let k = best; k !== -1; k = prev[k]) res.unshift(nums[k]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> largestDivisibleSubset(List<Integer> nums) {
        if (nums.isEmpty()) return new List<Integer>();
        nums.sort();
        Integer n = nums.size(), best = 0;
        List<Integer> dp = new List<Integer>(), prev = new List<Integer>();
        for (Integer i = 0; i < n; i++) { dp.add(1); prev.add(-1); }
        for (Integer i = 0; i < n; i++) {
            for (Integer j = 0; j < i; j++)
                if (Math.mod(nums[i], nums[j]) == 0 && dp[j] + 1 > dp[i]) { dp.set(i, dp[j] + 1); prev.set(i, j); }
            if (dp[i] > dp[best]) best = i;
        }
        List<Integer> res = new List<Integer>();
        for (Integer k = best; k != -1; k = prev[k]) res.add(0, nums[k]);
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "matrix-chain-multiplication",
    title: "Matrix Chain Multiplication",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array dims where matrix i has dimensions dims[i-1] × dims[i] (for i from 1 to n-1), return the minimum number of scalar multiplications needed to multiply the whole chain.",
    beginnerExplanation:
      "Matrix multiplication is associative, so the order of multiplying changes the cost but not the result. dp[i][j] = cheapest way to multiply matrices i..j. Try every split point k: cost = dp[i][k] + dp[k+1][j] + (cost of multiplying the two resulting matrices). It's the classic interval DP.",
    realWorldAnalogy:
      "Choosing the cheapest order to combine a chain of conversions where each pairing has a different price — parenthesise to minimise total work.",
    visualExplanation:
      "dims=[1,2,3,4] (matrices 1×2, 2×3, 3×4) → minimum 18 multiplications.",
    approaches: [
      {
        title: "Interval DP over split points",
        tier: "Optimal",
        idea: "dp[i][j] = min over k of dp[i][k]+dp[k+1][j]+dims[i-1]*dims[k]*dims[j].",
        steps: [
          "Iterate by chain length",
          "For each (i,j) try every split k",
          "Answer = dp[1][n-1]",
        ],
        time: "O(n³)",
        space: "O(n²)",
      },
    ],
    dryRun: "dims=[10,20,30]: one product 10*20*30 = 6000 → dp[1][2]=6000.",
    interviewTips: [
      "The template (partition DP: fix an interval, try every split) generalises to Min Cost to Cut a Stick and Burst Balloons.",
      "Be careful with the dimension indexing — matrix i is dims[i-1] × dims[i].",
    ],
    commonMistakes: ["Off-by-one in the dims indices.", "Iterating by index instead of by interval length."],
    followUps: ["Print the optimal parenthesisation.", "Minimum Cost to Cut a Stick (same pattern)."],
    related: ["minimum-cost-to-cut-a-stick", "burst-balloons"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def matrix_chain_multiplication(dims):
    n = len(dims)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for i in range(1, n - length + 1):
            j = i + length - 1
            dp[i][j] = float("inf")
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j]
                dp[i][j] = min(dp[i][j], cost)
    return dp[1][n - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int matrixChainMultiplication(int[] dims) {
        int n = dims.length;
        int[][] dp = new int[n][n];
        for (int len = 2; len < n; len++)
            for (int i = 1; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++)
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j]);
            }
        return dp[1][n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function matrixChainMultiplication(dims) {
  const n = dims.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let len = 2; len < n; len++)
    for (let i = 1; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++)
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j]);
    }
  return dp[1][n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer matrixChainMultiplication(List<Integer> dims) {
        Integer n = dims.size();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i < n; i++) { List<Integer> row = new List<Integer>(); for (Integer j = 0; j < n; j++) row.add(0); dp.add(row); }
        for (Integer len = 2; len < n; len++)
            for (Integer i = 1; i <= n - len; i++) {
                Integer j = i + len - 1;
                dp[i].set(j, 2147483647);
                for (Integer k = i; k < j; k++) {
                    Integer cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
                    if (cost < dp[i][j]) dp[i].set(j, cost);
                }
            }
        return dp[1][n - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-cost-to-cut-a-stick",
    title: "Minimum Cost to Cut a Stick",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A stick of length n has marked cut positions in cuts. The cost of one cut equals the current length of the stick being cut. You may perform the cuts in any order. Return the minimum total cost.",
    beginnerExplanation:
      "Add 0 and n as boundaries and sort all the cut positions. Then it's interval DP over the cut indices: dp[i][j] = min cost to make all cuts strictly between boundary i and j. Try each cut k between them — its cost is the segment length (arr[j]−arr[i]) plus the two sub-intervals.",
    realWorldAnalogy:
      "Sawing a plank at marked lines: each cut costs the length of the piece you're sawing, so the order matters — cutting big pieces last is cheaper.",
    visualExplanation:
      "n=7, cuts=[1,3,4,5] → minimum total cost 16.",
    approaches: [
      {
        title: "Interval DP over sorted cut boundaries",
        tier: "Optimal",
        idea: "With boundaries arr=[0]+sorted(cuts)+[n], dp[i][j]=min over k of dp[i][k]+dp[k][j]+(arr[j]-arr[i]).",
        steps: [
          "Sort cuts, pad with 0 and n",
          "Interval DP by length; try each interior cut k",
          "Answer = dp[0][m-1]",
        ],
        time: "O(m³)",
        space: "O(m²)",
      },
    ],
    dryRun: "n=7, cuts=[1,3,4,5]: optimal ordering yields 16 (vs 22 left-to-right).",
    interviewTips: [
      "Same partition-DP skeleton as Matrix Chain Multiplication and Burst Balloons — adding the 0 and n sentinels is the key setup step.",
    ],
    commonMistakes: ["Forgetting the 0 and n sentinels.", "Using arr[k] instead of the full segment length arr[j]−arr[i] as the cut cost."],
    followUps: ["Burst Balloons.", "Matrix Chain Multiplication."],
    related: ["matrix-chain-multiplication", "burst-balloons"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_cost(n, cuts):
    arr = [0] + sorted(cuts) + [n]
    m = len(arr)
    dp = [[0] * m for _ in range(m)]
    for length in range(2, m):
        for i in range(m - length):
            j = i + length
            dp[i][j] = float("inf")
            for k in range(i + 1, j):
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + arr[j] - arr[i])
    return dp[0][m - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int minCost(int n, int[] cuts) {
        int[] arr = new int[cuts.length + 2];
        for (int i = 0; i < cuts.length; i++) arr[i + 1] = cuts[i];
        arr[0] = 0;
        arr[arr.length - 1] = n;
        Arrays.sort(arr);
        int m = arr.length;
        int[][] dp = new int[m][m];
        for (int len = 2; len < m; len++)
            for (int i = 0; i + len < m; i++) {
                int j = i + len;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i + 1; k < j; k++)
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + arr[j] - arr[i]);
            }
        return dp[0][m - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minCost(n, cuts) {
  const arr = [0, ...[...cuts].sort((a, b) => a - b), n];
  const m = arr.length;
  const dp = Array.from({ length: m }, () => new Array(m).fill(0));
  for (let len = 2; len < m; len++)
    for (let i = 0; i + len < m; i++) {
      const j = i + len;
      dp[i][j] = Infinity;
      for (let k = i + 1; k < j; k++)
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + arr[j] - arr[i]);
    }
  return dp[0][m - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minCost(Integer n, List<Integer> cuts) {
        cuts.sort();
        List<Integer> arr = new List<Integer>{ 0 };
        arr.addAll(cuts);
        arr.add(n);
        Integer m = arr.size();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i < m; i++) { List<Integer> row = new List<Integer>(); for (Integer j = 0; j < m; j++) row.add(0); dp.add(row); }
        for (Integer len = 2; len < m; len++)
            for (Integer i = 0; i + len < m; i++) {
                Integer j = i + len;
                dp[i].set(j, 2147483647);
                for (Integer k = i + 1; k < j; k++) {
                    Integer cost = dp[i][k] + dp[k][j] + arr[j] - arr[i];
                    if (cost < dp[i][j]) dp[i].set(j, cost);
                }
            }
        return dp[0][m - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "palindrome-partitioning-ii",
    title: "Palindrome Partitioning II",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string s, partition it so every substring is a palindrome. Return the minimum number of cuts needed.",
    beginnerExplanation:
      "Precompute pal[i][j] = is s[i..j] a palindrome (an O(n²) DP). Then dp[i] = min cuts for the prefix s[0..i]: if the whole prefix is already a palindrome, 0 cuts; otherwise try every j where s[j..i] is a palindrome and take 1 + dp[j-1].",
    realWorldAnalogy:
      "Slicing a ribbon into the fewest pieces where every piece reads the same both ways — find the cheapest set of cut lines.",
    visualExplanation:
      's="aab": "aa" | "b" → 1 cut.',
    approaches: [
      {
        title: "Palindrome table + prefix DP",
        tier: "Optimal",
        idea: "pal[i][j] via interval DP; dp[i]=0 if pal[0][i] else min(dp[j-1]+1) over palindromic suffixes.",
        steps: [
          "Build pal[i][j] for all substrings",
          "dp[i] = 0 if s[0..i] palindrome",
          "else min over j of dp[j-1]+1 where s[j..i] palindrome",
        ],
        time: "O(n²)",
        space: "O(n²)",
      },
    ],
    dryRun: 's="aab": pal["aa"]=true → dp[1]=0; "aab" not pal, "b" pal → dp[2]=dp[1]+1=1.',
    interviewTips: [
      "Two layers: the palindrome table, then the cut DP — describe them separately.",
      "The dp[i]=0 shortcut when the whole prefix is a palindrome is what makes it clean.",
    ],
    commonMistakes: ["Recomputing palindrome checks inside the cut DP (O(n³)).", "Off-by-one with dp[j-1] vs dp[j]."],
    followUps: ["Palindrome Partitioning I (list all partitions — backtracking).", "Minimum insertions to make a palindrome."],
    related: ["longest-palindromic-subsequence", "minimum-insertions-to-make-string-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_cut(s):
    n = len(s)
    pal = [[False] * n for _ in range(n)]
    for i in range(n):
        pal[i][i] = True
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                pal[i][j] = (length == 2) or pal[i + 1][j - 1]
    dp = [0] * n
    for i in range(n):
        if pal[0][i]:
            dp[i] = 0
        else:
            dp[i] = min(dp[j - 1] + 1 for j in range(1, i + 1) if pal[j][i])
    return dp[n - 1] if n else 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minCut(String s) {
        int n = s.length();
        boolean[][] pal = new boolean[n][n];
        for (int i = 0; i < n; i++) pal[i][i] = true;
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (s.charAt(i) == s.charAt(j)) pal[i][j] = (len == 2) || pal[i + 1][j - 1];
            }
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            if (pal[0][i]) { dp[i] = 0; continue; }
            dp[i] = Integer.MAX_VALUE;
            for (int j = 1; j <= i; j++)
                if (pal[j][i]) dp[i] = Math.min(dp[i], dp[j - 1] + 1);
        }
        return n == 0 ? 0 : dp[n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minCut(s) {
  const n = s.length;
  if (n === 0) return 0;
  const pal = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let i = 0; i < n; i++) pal[i][i] = true;
  for (let len = 2; len <= n; len++)
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) pal[i][j] = len === 2 || pal[i + 1][j - 1];
    }
  const dp = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (pal[0][i]) { dp[i] = 0; continue; }
    dp[i] = Infinity;
    for (let j = 1; j <= i; j++)
      if (pal[j][i]) dp[i] = Math.min(dp[i], dp[j - 1] + 1);
  }
  return dp[n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minCut(String s) {
        Integer n = s.length();
        if (n == 0) return 0;
        List<List<Boolean>> pal = new List<List<Boolean>>();
        for (Integer i = 0; i < n; i++) { List<Boolean> row = new List<Boolean>(); for (Integer j = 0; j < n; j++) row.add(false); pal.add(row); }
        for (Integer i = 0; i < n; i++) pal[i].set(i, true);
        for (Integer len = 2; len <= n; len++)
            for (Integer i = 0; i + len - 1 < n; i++) {
                Integer j = i + len - 1;
                if (s.substring(i, i + 1) == s.substring(j, j + 1))
                    pal[i].set(j, (len == 2) || pal[i + 1][j - 1]);
            }
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i < n; i++) dp.add(0);
        for (Integer i = 0; i < n; i++) {
            if (pal[0][i]) { dp.set(i, 0); continue; }
            Integer best = 2147483647;
            for (Integer j = 1; j <= i; j++)
                if (pal[j][i]) best = Math.min(best, dp[j - 1] + 1);
            dp.set(i, best);
        }
        return dp[n - 1];
    }
}`,
      },
    ],
  },
];

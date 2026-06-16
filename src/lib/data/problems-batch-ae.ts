import type { Problem } from "@/lib/types";

// Final A2Z gaps: the last few genuinely-solvable problems (expression
// conversions, sortedness check, KMP). Full template + Java/Python/JS/Apex.
export const PROBLEMS_BATCH_AE: Problem[] = [
  {
    slug: "prefix-to-postfix-conversion",
    title: "Prefix to Postfix Conversion",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks", "Strings"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a valid prefix expression with single-character operands and the operators + - * / ^, convert it to its equivalent postfix expression.",
    beginnerExplanation:
      "Prefix puts the operator before its two operands; postfix puts it after. Scan the prefix string from RIGHT to LEFT, pushing operands onto a stack; when you hit an operator, pop two operands and glue them as `op1 op2 operator`, then push that back.",
    realWorldAnalogy:
      "Like rebuilding a sentence read backwards: each time you have a verb (operator), you grab the two nouns waiting on the table (stack) and rewrite the little phrase in postfix order, then set it back down for the next verb.",
    visualExplanation:
      "prefix = *+AB-CD  (scan right→left: D C - B A + *)\nD,C  -> pop C,D -> \"CD-\"\nB,A  -> pop A,B -> \"AB+\"\n*    -> pop AB+,CD- -> \"AB+CD-*\"",
    approaches: [
      {
        title: "Right-to-left stack scan",
        tier: "Optimal",
        idea: "Operands go on the stack; each operator combines the top two into a postfix sub-expression.",
        steps: [
          "Scan the prefix string from the last character to the first",
          "If the char is an operand, push it",
          "If it is an operator, pop t1 then t2, push (t1 + t2 + operator)",
          "The single remaining stack element is the postfix expression",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      'prefix="+AB": scan B->push "B"; A->push "A"; +->pop t1="A",t2="B"-> "AB+". Result "AB+".',
    interviewTips: [
      "State the operand order carefully: the FIRST popped element is the left operand in postfix.",
      "Clarify whether operands can be multi-character — if so, tokenise first.",
    ],
    commonMistakes: [
      "Swapping t1/t2 and producing a reversed expression.",
      "Scanning left-to-right (that's the postfix→prefix direction).",
    ],
    followUps: ["Convert prefix to infix.", "Evaluate a prefix expression directly."],
    related: ["postfix-to-prefix-conversion", "infix-to-postfix-conversion"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def prefix_to_postfix(prefix):
    ops = set("+-*/^")
    st = []
    for ch in reversed(prefix):
        if ch in ops:
            t1 = st.pop()
            t2 = st.pop()
            st.append(t1 + t2 + ch)
        else:
            st.append(ch)
    return st[-1] if st else ""`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String prefixToPostfix(String prefix) {
        Deque<String> st = new ArrayDeque<>();
        String ops = "+-*/^";
        for (int i = prefix.length() - 1; i >= 0; i--) {
            char ch = prefix.charAt(i);
            if (ops.indexOf(ch) >= 0) {
                String t1 = st.pop();
                String t2 = st.pop();
                st.push(t1 + t2 + ch);
            } else {
                st.push(String.valueOf(ch));
            }
        }
        return st.isEmpty() ? "" : st.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function prefixToPostfix(prefix) {
  const ops = new Set(["+", "-", "*", "/", "^"]);
  const st = [];
  for (let i = prefix.length - 1; i >= 0; i--) {
    const ch = prefix[i];
    if (ops.has(ch)) {
      const t1 = st.pop();
      const t2 = st.pop();
      st.push(t1 + t2 + ch);
    } else {
      st.push(ch);
    }
  }
  return st.length ? st[st.length - 1] : "";
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String prefixToPostfix(String prefix) {
        List<String> st = new List<String>();
        String ops = '+-*/^';
        for (Integer i = prefix.length() - 1; i >= 0; i--) {
            String ch = prefix.substring(i, i + 1);
            if (ops.contains(ch)) {
                String t1 = st.remove(st.size() - 1);
                String t2 = st.remove(st.size() - 1);
                st.add(t1 + t2 + ch);
            } else {
                st.add(ch);
            }
        }
        return st.isEmpty() ? '' : st[st.size() - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "postfix-to-prefix-conversion",
    title: "Postfix to Prefix Conversion",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks", "Strings"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a valid postfix expression with single-character operands and the operators + - * / ^, convert it to its equivalent prefix expression.",
    beginnerExplanation:
      "Scan the postfix string from LEFT to RIGHT, pushing operands. When you hit an operator, pop two operands and glue them as `operator op2 op1` (operator first, then the two operands in their original order), then push that back.",
    realWorldAnalogy:
      "Reading a recipe where the action word comes last: each time you reach an instruction (operator), you take the two most recent ingredients off the counter and rewrite the step with the action first.",
    visualExplanation:
      'postfix = AB+CD-*  (scan left→right)\nA,B,+ -> "+AB"\nC,D,- -> "-CD"\n*     -> pop "-CD","+AB" -> "*" + "+AB" + "-CD" = "*+AB-CD"',
    approaches: [
      {
        title: "Left-to-right stack scan",
        tier: "Optimal",
        idea: "Operands go on the stack; each operator prepends itself to the concatenation of the two popped operands (in original order).",
        steps: [
          "Scan the postfix string left to right",
          "If the char is an operand, push it",
          "If it is an operator, pop t1 then t2, push (operator + t2 + t1)",
          "The single remaining stack element is the prefix expression",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      'postfix="AB+": A->push; B->push; +->t1="B",t2="A"-> "+" + "A" + "B" = "+AB". Result "+AB".',
    interviewTips: [
      "Order matters: result is operator + t2 + t1 (t2 is the second popped, the left operand).",
      "Mirror of prefix→postfix: here you scan forward, there you scan backward.",
    ],
    commonMistakes: [
      "Writing operator + t1 + t2 (reverses operand order).",
      "Forgetting the operator goes in FRONT for prefix.",
    ],
    followUps: ["Convert postfix to infix.", "Evaluate a postfix expression."],
    related: ["prefix-to-postfix-conversion", "postfix-to-infix-conversion"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def postfix_to_prefix(postfix):
    ops = set("+-*/^")
    st = []
    for ch in postfix:
        if ch in ops:
            t1 = st.pop()
            t2 = st.pop()
            st.append(ch + t2 + t1)
        else:
            st.append(ch)
    return st[-1] if st else ""`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String postfixToPrefix(String postfix) {
        Deque<String> st = new ArrayDeque<>();
        String ops = "+-*/^";
        for (int i = 0; i < postfix.length(); i++) {
            char ch = postfix.charAt(i);
            if (ops.indexOf(ch) >= 0) {
                String t1 = st.pop();
                String t2 = st.pop();
                st.push(ch + t2 + t1);
            } else {
                st.push(String.valueOf(ch));
            }
        }
        return st.isEmpty() ? "" : st.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function postfixToPrefix(postfix) {
  const ops = new Set(["+", "-", "*", "/", "^"]);
  const st = [];
  for (const ch of postfix) {
    if (ops.has(ch)) {
      const t1 = st.pop();
      const t2 = st.pop();
      st.push(ch + t2 + t1);
    } else {
      st.push(ch);
    }
  }
  return st.length ? st[st.length - 1] : "";
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String postfixToPrefix(String postfix) {
        List<String> st = new List<String>();
        String ops = '+-*/^';
        for (Integer i = 0; i < postfix.length(); i++) {
            String ch = postfix.substring(i, i + 1);
            if (ops.contains(ch)) {
                String t1 = st.remove(st.size() - 1);
                String t2 = st.remove(st.size() - 1);
                st.add(ch + t2 + t1);
            } else {
                st.add(ch);
            }
        }
        return st.isEmpty() ? '' : st[st.size() - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "check-if-array-is-sorted",
    title: "Check if Array Is Sorted",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "salesforce"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array `nums`, return true if it is sorted in non-decreasing order (each element is ≥ the one before it), otherwise false.",
    beginnerExplanation:
      "Walk through the array once. The moment you find an element smaller than the one just before it, it isn't sorted. If you reach the end without that happening, it is sorted.",
    realWorldAnalogy:
      "Checking a bookshelf is in height order: glance from left to right; the first time a taller book sits before a shorter one, the order is broken.",
    visualExplanation:
      "nums = [1,2,2,5]  -> 1≤2≤2≤5 -> true\nnums = [1,3,2]    -> 3 > 2 at index 2 -> false",
    approaches: [
      {
        title: "Single linear pass",
        tier: "Optimal",
        idea: "Compare each element with its predecessor; fail fast on the first inversion.",
        steps: [
          "Loop i from 1 to n-1",
          "If nums[i] < nums[i-1] return false",
          "If the loop completes, return true",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[1,2,2,5]: 2≥1 ok, 2≥2 ok, 5≥2 ok -> true. [5,4]: 4<5 -> false.",
    interviewTips: [
      "Clarify non-decreasing (duplicates allowed) vs strictly increasing.",
      "Follow-up variant: check if a rotated sorted array could become sorted (allow one wrap).",
    ],
    commonMistakes: [
      "Using strict `<` when duplicates should be allowed (or vice-versa).",
      "Starting the loop at 0 and reading nums[-1].",
    ],
    followUps: [
      "Check if the array is sorted AND rotated.",
      "Return the first index where the order breaks.",
    ],
    related: ["check-if-array-is-sorted-and-rotated", "remove-duplicates-from-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_sorted(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return False
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isSorted(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < nums[i - 1]) return false;
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isSorted(nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return false;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isSorted(List<Integer> nums) {
        for (Integer i = 1; i < nums.size(); i++) {
            if (nums[i] < nums[i - 1]) return false;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "kmp-algorithm-for-pattern-matching",
    title: "KMP Algorithm for Pattern Matching",
    difficulty: "Hard",
    patterns: ["sliding-window"],
    topics: ["Strings", "Advanced String Algorithms"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a text and a pattern, find all starting indices where the pattern occurs in the text, in O(n + m) time using the Knuth–Morris–Pratt algorithm.",
    beginnerExplanation:
      "Naive matching restarts from scratch after every mismatch. KMP precomputes, for each prefix of the pattern, the length of the longest proper prefix that is also a suffix (the LPS array). On a mismatch it jumps the pattern forward by that amount instead of re-checking characters the text already matched.",
    realWorldAnalogy:
      "Like a detective who, after a clue fails, doesn't re-interview everyone — they remember which earlier statements still partially match and resume from there, never re-reading the same page twice.",
    visualExplanation:
      'pattern="aab"  LPS=[0,1,0]\ntext="a+aabaab"...\nOn mismatch at pattern[k], jump k = LPS[k-1] instead of restarting at 0.',
    approaches: [
      {
        title: "Naive scan",
        tier: "Brute Force",
        idea: "Try to match the pattern starting at every text index.",
        steps: ["For each start i in text", "Compare pattern char-by-char", "Record i on a full match"],
        time: "O(n·m)",
        space: "O(1)",
      },
      {
        title: "KMP with LPS (failure function)",
        tier: "Optimal",
        idea: "Build the LPS array, then scan the text once; on mismatch fall back via LPS rather than restarting.",
        steps: [
          "Build LPS[i] = longest proper prefix of pattern[0..i] that is also a suffix",
          "Scan text with pointer k into pattern",
          "On mismatch with k>0, set k = LPS[k-1]; else advance text",
          "When k reaches m, record (i - m + 1) and set k = LPS[k-1]",
        ],
        time: "O(n + m)",
        space: "O(m)",
      },
    ],
    dryRun:
      'pattern="ab", LPS=[0,0]. text="abab": i0 a k1; i1 b k2==m -> match at 0, k=LPS[1]=0; i2 a k1; i3 b k2 -> match at 2. Result [0,2].',
    interviewTips: [
      "Be ready to derive the LPS array on the board — that's the part interviewers probe.",
      "Mention Z-algorithm and Rabin–Karp as alternatives and their trade-offs.",
    ],
    commonMistakes: [
      "Off-by-one in the LPS construction (mixing the index and the length).",
      "Not resetting k via LPS after a full match, so overlapping matches are missed.",
    ],
    followUps: [
      "Return only the first occurrence (implement strStr).",
      "Use the Z-algorithm instead.",
      "Count overlapping vs non-overlapping occurrences.",
    ],
    related: ["implement-strstr", "longest-happy-prefix", "shortest-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def kmp_search(text, pattern):
    m = len(pattern)
    if m == 0:
        return []
    lps = [0] * m
    k = 0
    for i in range(1, m):
        while k > 0 and pattern[i] != pattern[k]:
            k = lps[k - 1]
        if pattern[i] == pattern[k]:
            k += 1
        lps[i] = k
    res = []
    k = 0
    for i in range(len(text)):
        while k > 0 and text[i] != pattern[k]:
            k = lps[k - 1]
        if text[i] == pattern[k]:
            k += 1
        if k == m:
            res.append(i - m + 1)
            k = lps[k - 1]
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> kmpSearch(String text, String pattern) {
        List<Integer> res = new ArrayList<>();
        int m = pattern.length(), n = text.length();
        if (m == 0) return res;
        int[] lps = new int[m];
        int k = 0;
        for (int i = 1; i < m; i++) {
            while (k > 0 && pattern.charAt(i) != pattern.charAt(k)) k = lps[k - 1];
            if (pattern.charAt(i) == pattern.charAt(k)) k++;
            lps[i] = k;
        }
        k = 0;
        for (int i = 0; i < n; i++) {
            while (k > 0 && text.charAt(i) != pattern.charAt(k)) k = lps[k - 1];
            if (text.charAt(i) == pattern.charAt(k)) k++;
            if (k == m) {
                res.add(i - m + 1);
                k = lps[k - 1];
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function kmpSearch(text, pattern) {
  const m = pattern.length, n = text.length;
  if (m === 0) return [];
  const lps = new Array(m).fill(0);
  let k = 0;
  for (let i = 1; i < m; i++) {
    while (k > 0 && pattern[i] !== pattern[k]) k = lps[k - 1];
    if (pattern[i] === pattern[k]) k++;
    lps[i] = k;
  }
  const res = [];
  k = 0;
  for (let i = 0; i < n; i++) {
    while (k > 0 && text[i] !== pattern[k]) k = lps[k - 1];
    if (text[i] === pattern[k]) k++;
    if (k === m) {
      res.push(i - m + 1);
      k = lps[k - 1];
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> kmpSearch(String text, String pattern) {
        List<Integer> res = new List<Integer>();
        Integer m = pattern.length(), n = text.length();
        if (m == 0) return res;
        List<Integer> lps = new List<Integer>();
        for (Integer i = 0; i < m; i++) lps.add(0);
        Integer k = 0;
        for (Integer i = 1; i < m; i++) {
            while (k > 0 && pattern.substring(i, i + 1) != pattern.substring(k, k + 1)) k = lps[k - 1];
            if (pattern.substring(i, i + 1) == pattern.substring(k, k + 1)) k++;
            lps[i] = k;
        }
        k = 0;
        for (Integer i = 0; i < n; i++) {
            while (k > 0 && text.substring(i, i + 1) != pattern.substring(k, k + 1)) k = lps[k - 1];
            if (text.substring(i, i + 1) == pattern.substring(k, k + 1)) k++;
            if (k == m) {
                res.add(i - m + 1);
                k = lps[k - 1];
            }
        }
        return res;
    }
}`,
      },
    ],
  },
];


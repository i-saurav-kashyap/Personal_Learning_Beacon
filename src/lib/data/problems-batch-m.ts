import type { Problem } from "@/lib/types";

// Batch M — Strings (Striver A2Z gaps). Titles match the course for deep-linking.

export const PROBLEMS_BATCH_M: Problem[] = [
  {
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Strings"],
    companies: ["amazon", "microsoft", "adobe"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    beginnerExplanation:
      "Start by assuming the whole first word is the common prefix. Then walk through the other words; whenever a word doesn't start with your current guess, chop the last character off the guess and try again. Whatever survives every word is the answer.",
    realWorldAnalogy:
      "Like finding the shared start of phone numbers in a region: you keep the longest leading digits that every number agrees on, trimming one digit whenever a number disagrees.",
    visualExplanation:
      'strs = ["flower","flow","flight"]\nprefix="flower" → vs "flow" → trim to "flow" → vs "flight" → trim "flo","fl" → "fl"',
    approaches: [
      {
        title: "Horizontal scanning",
        tier: "Optimal",
        idea: "Hold a running prefix and shrink it from the right until each next word starts with it.",
        steps: [
          "prefix = strs[0]",
          "For each later word, while it doesn't start with prefix, drop prefix's last char",
          "If prefix becomes empty, return \"\"",
        ],
        time: "O(S) where S is total characters",
        space: "O(1)",
      },
      {
        title: "Vertical scanning",
        tier: "Better",
        idea: "Compare character by character across all words column by column.",
        steps: ["For column i", "Check strs[0][i] against every word", "Stop at first mismatch or end"],
        time: "O(S)",
        space: "O(1)",
      },
    ],
    dryRun: 'prefix="flower"; "flow" not prefixed → "flow"; "flight" → "flo"→"fl"; return "fl"',
    interviewTips: [
      "Edge cases: empty array, an empty string in the array (answer is \"\").",
      "Mention sorting + comparing only first/last as a neat alternative.",
    ],
    commonMistakes: ["Indexing past the shortest string.", "Forgetting the empty-array case."],
    followUps: ["Return the longest common suffix.", "Binary search on prefix length."],
    related: ["valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String longestCommonPrefix(List<String> strs) {
        if (strs.isEmpty()) return '';
        String prefix = strs[0];
        for (Integer i = 1; i < strs.size(); i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix == '') return '';
            }
        }
        return prefix;
    }
}`,
      },
    ],
  },
  {
    slug: "isomorphic-strings",
    title: "Isomorphic Strings",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given two strings `s` and `t`, determine if they are isomorphic. Two strings are isomorphic if the characters in `s` can be replaced to get `t`, with a consistent one-to-one mapping (no two characters map to the same character, and order is preserved).",
    beginnerExplanation:
      "You need a consistent two-way dictionary: each letter of s must always translate to the same letter of t, AND each letter of t must come from only one letter of s. Keep two maps and the first time a rule is broken, they're not isomorphic.",
    realWorldAnalogy:
      "Like a substitution cipher: 'A' always becomes 'X' and nothing else also becomes 'X'. If the cipher is ever inconsistent in either direction, the decoding falls apart.",
    visualExplanation:
      's="egg", t="add"\ne→a, g→d, g→d ✓ and a←e, d←g consistent → true\ns="foo", t="bar": o→a then o→r ✗ → false',
    approaches: [
      {
        title: "Two hash maps",
        tier: "Optimal",
        idea: "Track s→t and t→s mappings; any contradiction means not isomorphic.",
        steps: [
          "If lengths differ, return false",
          "For each pair (a,b): if a maps to something ≠ b, or b maps to something ≠ a, return false",
          "Otherwise record both mappings",
        ],
        time: "O(n)",
        space: "O(1) for a fixed alphabet",
      },
    ],
    dryRun: 's="paper",t="title": p→t,a→i,p→t✓,e→l,r→e → true',
    interviewTips: [
      "Stress the BOTH-directions check — a single map wrongly accepts 'ab'→'aa'.",
      "Index-of-first-occurrence encoding is a clever one-pass alternative.",
    ],
    commonMistakes: ["Using only one map.", "Forgetting the length check."],
    followUps: ["Word pattern (map words ↔ a pattern string)."],
    related: ["valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_isomorphic(s, t):
    if len(s) != len(t):
        return False
    map_st, map_ts = {}, {}
    for a, b in zip(s, t):
        if a in map_st and map_st[a] != b:
            return False
        if b in map_ts and map_ts[b] != a:
            return False
        map_st[a] = b
        map_ts[b] = a
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;
        Map<Character, Character> st = new HashMap<>(), ts = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i), b = t.charAt(i);
            if (st.containsKey(a) && st.get(a) != b) return false;
            if (ts.containsKey(b) && ts.get(b) != a) return false;
            st.put(a, b);
            ts.put(b, a);
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const st = {}, ts = {};
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (a in st && st[a] !== b) return false;
    if (b in ts && ts[b] !== a) return false;
    st[a] = b;
    ts[b] = a;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;
        Map<String, String> st = new Map<String, String>();
        Map<String, String> ts = new Map<String, String>();
        for (Integer i = 0; i < s.length(); i++) {
            String a = s.substring(i, i + 1), b = t.substring(i, i + 1);
            if (st.containsKey(a) && st.get(a) != b) return false;
            if (ts.containsKey(b) && ts.get(b) != a) return false;
            st.put(a, b);
            ts.put(b, a);
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Strings", "Math"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a Roman numeral string, convert it to an integer. Symbols are I=1, V=5, X=10, L=50, C=100, D=500, M=1000; a smaller value placed before a larger one is subtracted (e.g. IV = 4).",
    beginnerExplanation:
      "Scan left to right. Normally you add each symbol's value. The only twist: when a symbol is smaller than the one right after it (like I before V), you subtract it instead of adding.",
    realWorldAnalogy:
      "Like reading a clock face engraved in Roman numerals — you read left to right, and the only special rule is the 'one before five/ten' subtraction shorthand.",
    visualExplanation:
      'MCMXCIV: M(+1000) C<M(-100) M(+1000) X<C(-10) C(+100) I<V(-1) V(+5) = 1994',
    approaches: [
      {
        title: "Single pass with lookahead",
        tier: "Optimal",
        idea: "Add each value, but subtract when the current symbol is smaller than the next.",
        steps: [
          "Build a value map",
          "For each index i: if value[i] < value[i+1] subtract, else add",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: '"LVIII": L(50)+V(5)+I(1)+I(1)+I(1)=58',
    interviewTips: [
      "There are only 6 subtractive pairs — the lookahead rule captures them all generically.",
      "Inputs are guaranteed valid (1–3999); no need to validate.",
    ],
    commonMistakes: ["Hard-coding the six subtractive pairs instead of the generic compare.", "Reading past the end on the last symbol."],
    followUps: ["Integer to Roman (the reverse)."],
    related: ["integer-to-roman"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def roman_to_int(s):
    vals = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    total = 0
    for i, ch in enumerate(s):
        if i + 1 < len(s) and vals[ch] < vals[s[i + 1]]:
            total -= vals[ch]
        else:
            total += vals[ch]
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> v = new HashMap<>();
        v.put('I', 1); v.put('V', 5); v.put('X', 10); v.put('L', 50);
        v.put('C', 100); v.put('D', 500); v.put('M', 1000);
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int cur = v.get(s.charAt(i));
            if (i + 1 < s.length() && cur < v.get(s.charAt(i + 1))) total -= cur;
            else total += cur;
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function romanToInt(s) {
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && v[s[i]] < v[s[i + 1]]) total -= v[s[i]];
    else total += v[s[i]];
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer romanToInt(String s) {
        Map<String, Integer> v = new Map<String, Integer>{
            'I' => 1, 'V' => 5, 'X' => 10, 'L' => 50,
            'C' => 100, 'D' => 500, 'M' => 1000
        };
        Integer total = 0;
        for (Integer i = 0; i < s.length(); i++) {
            Integer cur = v.get(s.substring(i, i + 1));
            if (i + 1 < s.length() && cur < v.get(s.substring(i + 1, i + 2))) total -= cur;
            else total += cur;
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "integer-to-roman",
    title: "Integer to Roman",
    difficulty: "Medium",
    patterns: ["greedy", "hashing"],
    topics: ["Strings", "Math"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer (1–3999), convert it to a Roman numeral using the symbols I, V, X, L, C, D, M and the subtractive forms (IV, IX, XL, XC, CD, CM).",
    beginnerExplanation:
      "Keep a table of values from biggest to smallest, including the subtractive pairs like 900='CM'. Greedily subtract the largest value you can and append its symbol, repeating until the number reaches zero.",
    realWorldAnalogy:
      "Like making change with coins, but biggest-denomination-first and with a fixed set that already includes the odd '900' and '400' coins so you never get stuck.",
    visualExplanation:
      "1994 → 1000(M) → 900(CM) → 90(XC) → 4(IV) = MCMXCIV",
    approaches: [
      {
        title: "Greedy with value/symbol table",
        tier: "Optimal",
        idea: "Iterate value→symbol pairs descending; while num ≥ value, append symbol and subtract.",
        steps: [
          "Define the 13 value/symbol pairs incl. subtractive ones",
          "For each pair, append its symbol while num ≥ its value",
        ],
        time: "O(1) (bounded by 3999)",
        space: "O(1)",
      },
    ],
    dryRun: "58 → 50(L) → 8: 5(V)+1(I)+1(I)+1(I) = LVIII",
    interviewTips: [
      "Including the subtractive pairs in the table avoids any special-casing.",
      "The table order MUST be strictly descending.",
    ],
    commonMistakes: ["Omitting the subtractive pairs and post-patching.", "Wrong table order."],
    followUps: ["Roman to Integer (the reverse)."],
    related: ["roman-to-integer"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def int_to_roman(num):
    vals = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"),
            (90, "XC"), (50, "L"), (40, "XL"), (10, "X"), (9, "IX"),
            (5, "V"), (4, "IV"), (1, "I")]
    res = []
    for v, sym in vals:
        while num >= v:
            res.append(sym)
            num -= v
    return "".join(res)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String intToRoman(int num) {
        int[] vals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] syms = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < vals.length; i++) {
            while (num >= vals[i]) {
                sb.append(syms[i]);
                num -= vals[i];
            }
        }
        return sb.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function intToRoman(num) {
  const vals = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
    [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let res = "";
  for (const [v, sym] of vals) {
    while (num >= v) { res += sym; num -= v; }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String intToRoman(Integer num) {
        List<Integer> vals = new List<Integer>{1000,900,500,400,100,90,50,40,10,9,5,4,1};
        List<String> syms = new List<String>{'M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'};
        String res = '';
        for (Integer i = 0; i < vals.size(); i++) {
            while (num >= vals[i]) {
                res += syms[i];
                num -= vals[i];
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "sort-characters-by-frequency",
    title: "Sort Characters By Frequency",
    difficulty: "Medium",
    patterns: ["hashing", "heap"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a string `s`, sort its characters in decreasing order of frequency and return the resulting string. Characters with the same frequency may appear in any order.",
    beginnerExplanation:
      "Count how often each character appears, then rebuild the string putting the most frequent characters first — each repeated as many times as it occurred.",
    realWorldAnalogy:
      "Like organising a tally chart: the option with the most votes goes at the top, and you write its name once per vote.",
    visualExplanation:
      's="tree": counts {t:1,r:1,e:2} → e(2) first → "eert" (or "eetr")',
    approaches: [
      {
        title: "Count then sort by frequency",
        tier: "Optimal",
        idea: "Tally counts, sort unique chars by descending count, expand each.",
        steps: ["Count characters", "Sort keys by count desc", "Append each char count-times"],
        time: "O(n + k log k)",
        space: "O(n)",
      },
    ],
    dryRun: '"cccaaa": counts {c:3,a:3} → "cccaaa" (ties arbitrary)',
    interviewTips: [
      "Bucket sort by frequency gives strict O(n) if asked to beat the sort.",
      "Clarify tie-breaking — usually any order is accepted.",
    ],
    commonMistakes: ["Sorting characters alphabetically instead of by count.", "Forgetting to repeat each char by its count."],
    followUps: ["Top K frequent characters only."],
    related: ["top-k-frequent-elements"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import Counter

def frequency_sort(s):
    counts = Counter(s)
    ordered = sorted(counts.items(), key=lambda kv: -kv[1])
    return "".join(ch * cnt for ch, cnt in ordered)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        List<Character> chars = new ArrayList<>(freq.keySet());
        chars.sort((a, b) -> freq.get(b) - freq.get(a));
        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            for (int i = 0; i < freq.get(c); i++) sb.append(c);
        }
        return sb.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function frequencySort(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .map((c) => c.repeat(freq[c]))
    .join("");
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String frequencySort(String s) {
        Map<String, Integer> freq = new Map<String, Integer>();
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            freq.put(c, (freq.containsKey(c) ? freq.get(c) : 0) + 1);
        }
        List<String> keys = new List<String>(freq.keySet());
        String res = '';
        Integer n = keys.size();
        for (Integer pass = 0; pass < n; pass++) {
            String bestKey = null;
            Integer bestCnt = -1;
            for (String k : keys) {
                if (freq.get(k) > bestCnt) { bestCnt = freq.get(k); bestKey = k; }
            }
            for (Integer i = 0; i < bestCnt; i++) res += bestKey;
            freq.put(bestKey, -1);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "remove-outermost-parentheses",
    title: "Remove Outermost Parentheses",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Strings", "Stacks"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A valid parentheses string is primitive if it is non-empty and cannot be split into two non-empty valid parts. Given a valid parentheses string, remove the outermost parentheses of every primitive component and return the result.",
    beginnerExplanation:
      "Track nesting depth as you scan. An opening bracket is 'outermost' when depth is 0 (don't keep it); a closing bracket is outermost when it brings depth back to 0 (don't keep it). Keep everything else.",
    realWorldAnalogy:
      "Like stripping the outer gift box from each present in a stack of nested boxes — you keep all the inner wrapping, just discard the single outermost layer of each package.",
    visualExplanation:
      '"(()())(())": primitives "(()())" and "(())" → strip outer → "()()" + "()" = "()()()"',
    approaches: [
      {
        title: "Depth counter",
        tier: "Optimal",
        idea: "Append '(' only when current depth > 0; append ')' only when depth would stay > 0 after closing.",
        steps: [
          "depth = 0",
          "On '(': if depth>0 keep it, then depth++",
          "On ')': depth--, if depth>0 keep it",
        ],
        time: "O(n)",
        space: "O(n) output",
      },
    ],
    dryRun: '"(())": ( depth0 skip,depth1; ( depth1 keep,depth2; ) depth1 keep; ) depth0 skip → "()"',
    interviewTips: ["A simple integer depth beats an explicit stack here.", "Input is guaranteed valid — no balance checks needed."],
    commonMistakes: ["Off-by-one on when to keep the closing bracket.", "Incrementing depth before the keep-check on '('."],
    followUps: ["Remove all redundant (but valid) parentheses."],
    related: ["valid-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def remove_outer_parentheses(s):
    res = []
    depth = 0
    for ch in s:
        if ch == "(":
            if depth > 0:
                res.append(ch)
            depth += 1
        else:
            depth -= 1
            if depth > 0:
                res.append(ch)
    return "".join(res)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        int depth = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                if (depth > 0) sb.append(c);
                depth++;
            } else {
                depth--;
                if (depth > 0) sb.append(c);
            }
        }
        return sb.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function removeOuterParentheses(s) {
  let res = "", depth = 0;
  for (const c of s) {
    if (c === "(") { if (depth > 0) res += c; depth++; }
    else { depth--; if (depth > 0) res += c; }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String removeOuterParentheses(String s) {
        String res = '';
        Integer depth = 0;
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            if (c == '(') {
                if (depth > 0) res += c;
                depth++;
            } else {
                depth--;
                if (depth > 0) res += c;
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-nesting-depth-of-the-parentheses",
    title: "Maximum Nesting Depth of the Parentheses",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Strings", "Stacks"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a valid parentheses string `s` (which may also contain digits and operators), return the maximum nesting depth of the parentheses.",
    beginnerExplanation:
      "Walk the string keeping a running 'how deep am I inside brackets' counter: +1 on '(', −1 on ')'. The answer is the highest value that counter ever reaches.",
    realWorldAnalogy:
      "Like tracking how many floors underground you go in a building: each '(' takes you one level down, each ')' brings you back up — the deepest basement you touch is the answer.",
    visualExplanation:
      '"(1+(2*3)+((8)/4))+1": depth rises 1,2(after 2*3 back),...,3 at "((8" → max depth 3',
    approaches: [
      {
        title: "Running depth maximum",
        tier: "Optimal",
        idea: "Increment on '(', decrement on ')', track the max depth seen.",
        steps: ["depth=0,best=0", "On '(' depth++ and best=max(best,depth)", "On ')' depth--"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: '"(())": ( d1 best1; ( d2 best2; ) d1; ) d0 → 2',
    interviewTips: ["No stack needed — a single counter suffices because the string is valid.", "Ignore non-bracket characters."],
    commonMistakes: ["Updating best on ')' instead of '('.", "Using a full stack unnecessarily."],
    followUps: ["Validate arbitrary bracket types with a stack."],
    related: ["valid-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_depth(s):
    depth = best = 0
    for ch in s:
        if ch == "(":
            depth += 1
            best = max(best, depth)
        elif ch == ")":
            depth -= 1
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxDepth(String s) {
        int depth = 0, best = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') { depth++; best = Math.max(best, depth); }
            else if (c == ')') depth--;
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxDepth(s) {
  let depth = 0, best = 0;
  for (const c of s) {
    if (c === "(") { depth++; best = Math.max(best, depth); }
    else if (c === ")") depth--;
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxDepth(String s) {
        Integer depth = 0, best = 0;
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            if (c == '(') { depth++; best = Math.max(best, depth); }
            else if (c == ')') depth--;
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "rotate-string",
    title: "Rotate String",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given two strings `s` and `goal`, return true if and only if `s` can become `goal` after some number of left shifts (moving the leftmost character to the end).",
    beginnerExplanation:
      "Every rotation of s is a substring of s concatenated with itself. So if goal has the same length as s and appears somewhere inside s+s, then goal is a rotation of s.",
    realWorldAnalogy:
      "Imagine the string written on a rotating drum. Spinning the drum to any position just shows a window into 's' repeated twice — so any rotation must appear within that doubled string.",
    visualExplanation:
      's="abcde", goal="cdeab": s+s="abcdeabcde" contains "cdeab" → true',
    approaches: [
      {
        title: "Doubled-string containment",
        tier: "Optimal",
        idea: "goal is a rotation of s iff lengths match and (s+s) contains goal.",
        steps: ["If lengths differ, false", "Return (s + s) contains goal"],
        time: "O(n²) with naive contains, O(n) with KMP",
        space: "O(n)",
      },
    ],
    dryRun: 's="abcde",goal="abced": "abcdeabcde" does not contain "abced" → false',
    interviewTips: ["The s+s trick is the elegant answer; mention KMP for true O(n).", "Don't forget the length check (else short goals false-positive)."],
    commonMistakes: ["Skipping the length-equality check.", "Rotating manually n times (O(n²) and error-prone)."],
    followUps: ["Use KMP to make containment O(n)."],
    related: ["repeated-string-match"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rotate_string(s, goal):
    return len(s) == len(goal) and goal in (s + s)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean rotateString(String s, String goal) {
        return s.length() == goal.length() && (s + s).contains(goal);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rotateString(s, goal) {
  return s.length === goal.length && (s + s).includes(goal);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean rotateString(String s, String goal) {
        return s.length() == goal.length() && (s + s).contains(goal);
    }
}`,
      },
    ],
  },
  {
    slug: "repeated-string-match",
    title: "Repeated String Match",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Strings"],
    companies: ["google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given strings `a` and `b`, return the minimum number of times you must repeat `a` so that `b` is a substring of the result. If impossible, return −1.",
    beginnerExplanation:
      "Keep gluing copies of `a` together until it's at least as long as `b`. If `b` fits inside now, that's your count. If not, one more copy can cover a straddling alignment; beyond that it's impossible.",
    realWorldAnalogy:
      "Like laying down a repeating tile pattern (a) until a target motif (b) fits within the laid tiles — you only ever need enough tiles to cover b plus possibly one extra for an offset.",
    visualExplanation:
      'a="abcd", b="cdabcdab": repeat to "abcdabcdabcd" (3x) contains b → 3',
    approaches: [
      {
        title: "Repeat until long enough, then check +1",
        tier: "Optimal",
        idea: "Build until length ≥ |b|; if b not found, one extra copy covers any offset; else −1.",
        steps: [
          "Repeat a (count copies) until length ≥ |b|",
          "If b is a substring → count",
          "Else if b is a substring of (that + a) → count + 1",
          "Else → −1",
        ],
        time: "O((|a|+|b|)·|b|) naive contains",
        space: "O(|a|+|b|)",
      },
    ],
    dryRun: 'a="abc",b="cabcabca": repeat→"abcabcabcabc"(4) contains b → 4',
    interviewTips: ["The key insight is you never need more than ⌈|b|/|a|⌉ + 1 copies.", "KMP makes the substring test linear."],
    commonMistakes: ["Stopping one copy too early (missing the straddling case).", "Looping forever when b can never match."],
    followUps: ["Prove the +1 upper bound.", "Use KMP for O(|a|+|b|)."],
    related: ["rotate-string"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def repeated_string_match(a, b):
    s = a
    count = 1
    while len(s) < len(b):
        s += a
        count += 1
    if b in s:
        return count
    if b in s + a:
        return count + 1
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int repeatedStringMatch(String a, String b) {
        StringBuilder sb = new StringBuilder(a);
        int count = 1;
        while (sb.length() < b.length()) { sb.append(a); count++; }
        if (sb.indexOf(b) != -1) return count;
        sb.append(a);
        if (sb.indexOf(b) != -1) return count + 1;
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function repeatedStringMatch(a, b) {
  let s = a, count = 1;
  while (s.length < b.length) { s += a; count++; }
  if (s.includes(b)) return count;
  if ((s + a).includes(b)) return count + 1;
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer repeatedStringMatch(String a, String b) {
        String s = a;
        Integer count = 1;
        while (s.length() < b.length()) { s += a; count++; }
        if (s.contains(b)) return count;
        if ((s + a).contains(b)) return count + 1;
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "count-and-say",
    title: "Count and Say",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Strings"],
    companies: ["amazon", "meta"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "The count-and-say sequence starts with \"1\". Each subsequent term is produced by reading the previous term as runs of identical digits, saying the count then the digit. Given n, return the n-th term.",
    beginnerExplanation:
      "To build the next term, read the current one out loud in groups: '1' is 'one 1' → '11'; '11' is 'two 1s' → '21'; '21' is 'one 2, one 1' → '1211'. Repeat n−1 times starting from '1'.",
    realWorldAnalogy:
      "Like describing a row of coloured beads to someone over the phone: 'three reds, then two blues' — you encode runs as a count followed by the item.",
    visualExplanation:
      "n=1:1 → n=2:11 → n=3:21 → n=4:1211 → n=5:111221",
    approaches: [
      {
        title: "Iterative run-length encoding",
        tier: "Optimal",
        idea: "Starting from \"1\", repeatedly scan runs of equal digits and emit count+digit.",
        steps: [
          "result = \"1\"",
          "Repeat n−1 times: walk runs, append str(count)+digit",
        ],
        time: "O(n · L) where L is the term length",
        space: "O(L)",
      },
    ],
    dryRun: '"1211" → runs: (1)x1,(2)x1,(1)x2 → "11" + "12" + "21" = "111221"',
    interviewTips: ["It's pure run-length encoding repeated; no math formula.", "Term lengths grow ~1.3x each step (Conway's constant)."],
    commonMistakes: ["Off-by-one on the number of iterations (start from \"1\").", "Mishandling the final run at the end of the string."],
    followUps: ["Generalise to arbitrary starting strings."],
    related: ["string-compression"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_and_say(n):
    result = "1"
    for _ in range(n - 1):
        parts = []
        i = 0
        while i < len(result):
            count = 1
            while i + 1 < len(result) and result[i] == result[i + 1]:
                count += 1
                i += 1
            parts.append(str(count) + result[i])
            i += 1
        result = "".join(parts)
    return result`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String countAndSay(int n) {
        String result = "1";
        for (int k = 1; k < n; k++) {
            StringBuilder sb = new StringBuilder();
            int i = 0;
            while (i < result.length()) {
                int count = 1;
                while (i + 1 < result.length() && result.charAt(i) == result.charAt(i + 1)) {
                    count++;
                    i++;
                }
                sb.append(count).append(result.charAt(i));
                i++;
            }
            result = sb.toString();
        }
        return result;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countAndSay(n) {
  let result = "1";
  for (let k = 1; k < n; k++) {
    let next = "", i = 0;
    while (i < result.length) {
      let count = 1;
      while (i + 1 < result.length && result[i] === result[i + 1]) { count++; i++; }
      next += count + result[i];
      i++;
    }
    result = next;
  }
  return result;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String countAndSay(Integer n) {
        String result = '1';
        for (Integer k = 1; k < n; k++) {
            String next = '';
            Integer i = 0;
            while (i < result.length()) {
                Integer count = 1;
                while (i + 1 < result.length() && result.substring(i, i + 1) == result.substring(i + 1, i + 2)) {
                    count++;
                    i++;
                }
                next += String.valueOf(count) + result.substring(i, i + 1);
                i++;
            }
            result = next;
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    slug: "largest-odd-number-in-string",
    title: "Largest Odd Number in String",
    difficulty: "Easy",
    patterns: ["greedy"],
    topics: ["Strings", "Math"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string `num` representing a large integer, return the largest-valued odd integer that is a non-empty substring of `num`, or an empty string if none exists.",
    beginnerExplanation:
      "A number is odd iff its last digit is odd. To get the largest odd substring, keep as many leading digits as possible — so scan from the right for the first odd digit and return everything from the start up to (and including) it.",
    realWorldAnalogy:
      "Like trimming a number from the right until it ends in an odd digit: you keep the biggest possible front portion that still ends odd.",
    visualExplanation:
      '"35427": rightmost odd digit is 7 (index 4) → whole string "35427"\n"1004": rightmost odd is 1 (index 0) → "1"',
    approaches: [
      {
        title: "Scan from the right for an odd digit",
        tier: "Optimal",
        idea: "The answer is the prefix ending at the last odd digit (keeps the most digits → largest value).",
        steps: ["From the right, find the first odd digit at index i", "Return num[0..i]", "If none, return \"\""],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: '"52": index1 \'2\' even, index0 \'5\' odd → return "5"',
    interviewTips: ["No big-integer parsing needed — it's purely about the last odd digit position.", "Leading zeros are fine to keep (it's a substring problem)."],
    commonMistakes: ["Scanning from the left and stopping too early.", "Returning just the digit instead of the whole prefix."],
    followUps: ["Largest even substring instead."],
    related: ["reverse-integer"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def largest_odd_number(num):
    for i in range(len(num) - 1, -1, -1):
        if int(num[i]) % 2 == 1:
            return num[: i + 1]
    return ""`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            if ((num.charAt(i) - '0') % 2 == 1) return num.substring(0, i + 1);
        }
        return "";
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function largestOddNumber(num) {
  for (let i = num.length - 1; i >= 0; i--) {
    if ((num.charCodeAt(i) - 48) % 2 === 1) return num.slice(0, i + 1);
  }
  return "";
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String largestOddNumber(String num) {
        for (Integer i = num.length() - 1; i >= 0; i--) {
            Integer d = Integer.valueOf(num.substring(i, i + 1));
            if (Math.mod(d, 2) == 1) return num.substring(0, i + 1);
        }
        return '';
    }
}`,
      },
    ],
  },
  {
    slug: "string-compression",
    title: "String Compression",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Strings"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Compress a string by replacing each run of repeated characters with the character followed by the run length (lengths greater than 1 only). For example \"aabccccc\" → \"a2bc5\". Return the compressed string.",
    beginnerExplanation:
      "Walk the string grouping consecutive equal characters. For each group, write the character once; if the group has more than one character, also write the count. Single characters get no number.",
    realWorldAnalogy:
      "Like shorthand for a tally: instead of writing 'ccccc' you jot 'c5'. A lone 'b' just stays 'b'.",
    visualExplanation:
      '"aabccccc": a×2→"a2", b×1→"b", c×5→"c5" ⇒ "a2bc5"',
    approaches: [
      {
        title: "Two pointers over runs",
        tier: "Optimal",
        idea: "Pointer i marks a run start; advance j over equal chars; emit char and (length>1 ? length : '').",
        steps: [
          "i = 0",
          "Advance j while chars equal; run length = j − i",
          "Append char; if length > 1 append the number; set i = j",
        ],
        time: "O(n)",
        space: "O(n) output (O(1) extra for the in-place variant)",
      },
    ],
    dryRun: '"abc": each run length 1 → "abc" (no numbers)',
    interviewTips: [
      "Clarify whether single chars get a '1' — the LeetCode variant omits it.",
      "The classic follow-up is doing it in place on a char array with O(1) extra space.",
    ],
    commonMistakes: ["Always writing the count (even for length 1).", "Forgetting to flush the final run."],
    followUps: ["In-place compression returning the new length.", "Decompress the encoded string."],
    related: ["count-and-say"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def compress(chars):
    res = []
    i, n = 0, len(chars)
    while i < n:
        ch = chars[i]
        j = i
        while j < n and chars[j] == ch:
            j += 1
        res.append(ch)
        if j - i > 1:
            res.append(str(j - i))
        i = j
    return "".join(res)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String compress(String chars) {
        StringBuilder sb = new StringBuilder();
        int i = 0, n = chars.length();
        while (i < n) {
            char ch = chars.charAt(i);
            int j = i;
            while (j < n && chars.charAt(j) == ch) j++;
            sb.append(ch);
            if (j - i > 1) sb.append(j - i);
            i = j;
        }
        return sb.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function compress(chars) {
  let res = "", i = 0;
  const n = chars.length;
  while (i < n) {
    const ch = chars[i];
    let j = i;
    while (j < n && chars[j] === ch) j++;
    res += ch;
    if (j - i > 1) res += (j - i);
    i = j;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String compress(String chars) {
        String res = '';
        Integer i = 0, n = chars.length();
        while (i < n) {
            String ch = chars.substring(i, i + 1);
            Integer j = i;
            while (j < n && chars.substring(j, j + 1) == ch) j++;
            res += ch;
            if (j - i > 1) res += String.valueOf(j - i);
            i = j;
        }
        return res;
    }
}`,
      },
    ],
  },
];

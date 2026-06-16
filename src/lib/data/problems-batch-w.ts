import type { Problem } from "@/lib/types";

// Striver A2Z — Recursion / Backtracking batch.
export const PROBLEMS_BATCH_W: Problem[] = [
  {
    slug: "implement-atoi-using-recursion",
    title: "Implement Atoi using Recursion",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Recursion", "Strings"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Implement `atoi` — convert a string to a 32-bit signed integer — using recursion. Skip leading spaces, handle an optional `+`/`-` sign, read digits until a non-digit, and clamp the result to the 32-bit range [-2³¹, 2³¹−1].",
    beginnerExplanation:
      "Read the number one digit at a time. Each step multiplies the running value by 10 and adds the new digit — that repeated 'build-up' is naturally expressed as a recursive call that carries the accumulated value forward.",
    realWorldAnalogy:
      "Like reading a price tag left to right: '4', then '47', then '472' — each new digit shifts everything you've read so far one place to the left and tacks the new digit on the end.",
    visualExplanation:
      's = "  -472xyz"\ntrim+sign → start at "472xyz", sign = -1\nrec: 0 → 4 → 47 → 472, stop at "x"\nresult = -472',
    approaches: [
      {
        title: "Recursive digit accumulation",
        tier: "Optimal",
        idea: "Strip spaces/sign, then recurse over the digits carrying an accumulator; clamp at the end.",
        steps: [
          "Trim, capture optional sign, find the first digit index",
          "rec(idx, acc): if idx is past the end or not a digit, return acc",
          "Otherwise return rec(idx+1, acc*10 + digit)",
          "Apply the sign and clamp to the 32-bit range",
        ],
        time: "O(n)",
        space: "O(n) recursion stack",
      },
    ],
    dryRun:
      's = "42"\nrec(0,0) → rec(1,4) → rec(2,42) → idx==len → 42\nsign +1 → 42',
    interviewTips: [
      "Clamp BEFORE the value overflows — track in a wider type (long) and bound to INT_MIN/INT_MAX.",
      "Clarify edge cases: leading spaces, lone '+'/'-', non-digit terminators.",
    ],
    commonMistakes: [
      "Integer overflow when the number exceeds 32 bits.",
      "Forgetting to stop at the first non-digit character.",
    ],
    followUps: ["Do it iteratively.", "Support different bases."],
    related: ["string-to-integer-atoi"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def my_atoi(s):
    s = s.strip()
    if not s:
        return 0
    sign, i = 1, 0
    if s[0] in "+-":
        sign = -1 if s[0] == "-" else 1
        i = 1

    def rec(idx, acc):
        if idx == len(s) or not s[idx].isdigit():
            return acc
        if acc > 2147483648:
            return acc
        return rec(idx + 1, acc * 10 + int(s[idx]))

    val = sign * rec(i, 0)
    return max(-2147483648, min(2147483647, val))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int myAtoi(String s) {
        s = s.trim();
        if (s.isEmpty()) return 0;
        int i = 0, sign = 1;
        char c0 = s.charAt(0);
        if (c0 == '+' || c0 == '-') { sign = c0 == '-' ? -1 : 1; i = 1; }
        long val = sign * rec(s, i, 0L);
        if (val > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (val < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int) val;
    }
    private long rec(String s, int idx, long acc) {
        if (idx == s.length() || !Character.isDigit(s.charAt(idx))) return acc;
        if (acc > 2147483648L) return acc;
        return rec(s, idx + 1, acc * 10 + (s.charAt(idx) - '0'));
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function myAtoi(s) {
  s = s.trim();
  if (s.length === 0) return 0;
  let i = 0, sign = 1;
  if (s[0] === "+" || s[0] === "-") { sign = s[0] === "-" ? -1 : 1; i = 1; }
  const rec = (idx, acc) => {
    if (idx === s.length || s[idx] < "0" || s[idx] > "9") return acc;
    if (acc > 2147483648) return acc;
    return rec(idx + 1, acc * 10 + (s.charCodeAt(idx) - 48));
  };
  const val = sign * rec(i, 0);
  return Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, val));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer myAtoi(String s) {
        s = s.trim();
        if (s.length() == 0) return 0;
        Integer i = 0, sign = 1;
        String c0 = s.substring(0, 1);
        if (c0 == '+' || c0 == '-') { sign = c0 == '-' ? -1 : 1; i = 1; }
        Long val = rec(s, i, 0L) * sign;
        if (val > 2147483647L) return 2147483647;
        if (val < -2147483648L) return -2147483648;
        return val.intValue();
    }
    private static Long rec(String s, Integer idx, Long acc) {
        if (idx == s.length()) return acc;
        String ch = s.substring(idx, idx + 1);
        if (!ch.isNumeric()) return acc;
        if (acc > 2147483648L) return acc;
        return rec(s, idx + 1, acc * 10 + Long.valueOf(ch));
    }
}`,
      },
    ],
  },
  {
    slug: "count-good-numbers",
    title: "Count Good Numbers",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Math", "Recursion"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A digit string of length `n` is good if digits at even indices (0-indexed) are even (0,2,4,6,8) and digits at odd indices are prime (2,3,5,7). Count the good numbers of length `n`, modulo 1e9+7.",
    beginnerExplanation:
      "Each even position has 5 independent choices and each odd position has 4. So the answer is 5^(number of even positions) × 4^(number of odd positions). The only trick is computing those big powers fast (binary exponentiation) under a modulus.",
    realWorldAnalogy:
      "Like counting license plates where even slots accept 5 symbols and odd slots accept 4 — total combinations multiply, and you raise each count to the number of slots of that kind.",
    visualExplanation:
      "n=4 → positions 0,1,2,3 → even {0,2} (2 of them), odd {1,3} (2)\nanswer = 5^2 * 4^2 = 25 * 16 = 400",
    approaches: [
      {
        title: "Counting + modular fast power",
        tier: "Optimal",
        idea: "evenCount = ⌈n/2⌉, oddCount = ⌊n/2⌋; answer = 5^evenCount · 4^oddCount mod p via binary exponentiation.",
        steps: [
          "evenCount = (n+1)/2, oddCount = n/2",
          "Compute modular power with the square-and-multiply recurrence",
          "Multiply the two powers mod 1e9+7",
        ],
        time: "O(log n)",
        space: "O(log n)",
      },
    ],
    dryRun: "n=1 → even=1, odd=0 → 5^1 * 4^0 = 5",
    interviewTips: [
      "n can be up to 1e15 — you MUST use fast exponentiation, not a loop to n.",
      "Take the modulus at every multiplication to avoid overflow.",
    ],
    commonMistakes: [
      "Looping n times (TLE for large n).",
      "Overflow from not applying mod inside the power loop.",
    ],
    followUps: ["Prove the count formula.", "Generalise the per-position choice counts."],
    related: ["pow-x-n"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_good_numbers(n):
    MOD = 10**9 + 7

    def power(b, e):
        res, b = 1, b % MOD
        while e:
            if e & 1:
                res = res * b % MOD
            b = b * b % MOD
            e >>= 1
        return res

    return power(5, (n + 1) // 2) * power(4, n // 2) % MOD`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    static final long MOD = 1_000_000_007L;
    public int countGoodNumbers(long n) {
        return (int) (power(5, (n + 1) / 2) * power(4, n / 2) % MOD);
    }
    private long power(long b, long e) {
        long res = 1; b %= MOD;
        while (e > 0) {
            if ((e & 1) == 1) res = res * b % MOD;
            b = b * b % MOD;
            e >>= 1;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countGoodNumbers(n) {
  const MOD = 1000000007n;
  const power = (b, e) => {
    let res = 1n; b %= MOD;
    while (e > 0n) {
      if (e & 1n) res = (res * b) % MOD;
      b = (b * b) % MOD;
      e >>= 1n;
    }
    return res;
  };
  const N = BigInt(n);
  return Number((power(5n, (N + 1n) / 2n) * power(4n, N / 2n)) % MOD);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static final Long MOD = 1000000007L;
    public static Long countGoodNumbers(Long n) {
        Long a = power(5, (n + 1) / 2);
        Long b = power(4, n / 2);
        return Math.mod(a * b, MOD);
    }
    private static Long power(Long b, Long e) {
        Long res = 1;
        b = Math.mod(b, MOD);
        while (e > 0) {
            if (Math.mod(e, 2) == 1) res = Math.mod(res * b, MOD);
            b = Math.mod(b * b, MOD);
            e = e / 2;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-a-stack-using-recursion",
    title: "Reverse a Stack using Recursion",
    difficulty: "Medium",
    patterns: ["stack", "backtracking"],
    topics: ["Stack", "Recursion"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Reverse a stack using recursion only — no auxiliary data structure (no extra stack/array/queue). You may only use the recursion call stack and the stack's push/pop/empty operations.",
    beginnerExplanation:
      "Pop everything off, holding each value in a recursive frame. When the stack is empty, push the held values back — but each one has to be inserted at the BOTTOM, which itself is a small recursive routine.",
    realWorldAnalogy:
      "Like reversing a stack of plates with only your two hands: lift the top plate, reverse the rest, then slide that plate all the way to the bottom of the pile.",
    visualExplanation:
      "stack [1,2,3] (3 top)\npop 3, reverse [1,2] → [2,1]\ninsert 3 at bottom → [3,2,1] (1 top) = reversed",
    approaches: [
      {
        title: "Recursion + insert-at-bottom helper",
        tier: "Optimal",
        idea: "Pop the top, recursively reverse the rest, then insert the popped value at the bottom via a second recursion.",
        steps: [
          "reverse(): if empty return; top = pop(); reverse(); insertAtBottom(top)",
          "insertAtBottom(x): if empty push(x); else t=pop(); insertAtBottom(x); push(t)",
        ],
        time: "O(n²)",
        space: "O(n) recursion stack",
      },
    ],
    dryRun:
      "[1,2] → pop 2, reverse [1] (pop1, insertBottom1→[1]), insertBottom 2 → push under 1 → [2,1]",
    interviewTips: [
      "The whole point is 'no extra data structure' — the recursion stack is the only allowed storage.",
      "Two recursive functions: one to unwind, one to insert at the bottom.",
    ],
    commonMistakes: [
      "Using an auxiliary stack/array (defeats the exercise).",
      "Inserting at the top instead of the bottom.",
    ],
    followUps: ["Sort a stack using recursion (same insert-at-bottom idea).", "Do it iteratively with one extra stack."],
    related: ["sort-a-stack-using-recursion"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reverse_stack(st):
    if not st:
        return
    top = st.pop()
    reverse_stack(st)
    _insert_at_bottom(st, top)

def _insert_at_bottom(st, x):
    if not st:
        st.append(x)
        return
    top = st.pop()
    _insert_at_bottom(st, x)
    st.append(top)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public void reverse(Deque<Integer> st) {
        if (st.isEmpty()) return;
        int top = st.pop();
        reverse(st);
        insertAtBottom(st, top);
    }
    private void insertAtBottom(Deque<Integer> st, int x) {
        if (st.isEmpty()) { st.push(x); return; }
        int top = st.pop();
        insertAtBottom(st, x);
        st.push(top);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverseStack(st) {
  if (st.length === 0) return;
  const top = st.pop();
  reverseStack(st);
  insertAtBottom(st, top);
}
function insertAtBottom(st, x) {
  if (st.length === 0) { st.push(x); return; }
  const top = st.pop();
  insertAtBottom(st, x);
  st.push(top);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void reverse(List<Integer> st) {
        if (st.isEmpty()) return;
        Integer top = st.remove(st.size() - 1);
        reverse(st);
        insertAtBottom(st, top);
    }
    private static void insertAtBottom(List<Integer> st, Integer x) {
        if (st.isEmpty()) { st.add(x); return; }
        Integer top = st.remove(st.size() - 1);
        insertAtBottom(st, x);
        st.add(top);
    }
}`,
      },
    ],
  },
  {
    slug: "sort-a-stack-using-recursion",
    title: "Sort a Stack using Recursion",
    difficulty: "Medium",
    patterns: ["stack", "backtracking"],
    topics: ["Stack", "Recursion"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Sort a stack in ascending order (largest on top) using recursion only — no extra data structure beyond the recursion stack.",
    beginnerExplanation:
      "Pop the top, sort the smaller stack recursively, then insert the popped element back into its sorted position — a helper that pops larger elements off, places the value, then pushes them back.",
    realWorldAnalogy:
      "Inserting a card into a sorted hand held face-up: lift cards larger than the new one, slot it in, then lay the lifted cards back on top.",
    visualExplanation:
      "[3,1,2] (2 top) → pop2, sort[3,1]→[1,3], insert2 → pop3,push2,push3 → [1,2,3]",
    approaches: [
      {
        title: "Recursion + sorted-insert helper",
        tier: "Optimal",
        idea: "Pop top, sort the rest, then insert the element keeping the stack sorted.",
        steps: [
          "sort(): if empty return; t=pop(); sort(); insertSorted(t)",
          "insertSorted(x): if empty or top<=x push(x); else t=pop(); insertSorted(x); push(t)",
        ],
        time: "O(n²)",
        space: "O(n) recursion stack",
      },
    ],
    dryRun: "[2,1] → pop1, sort[2], insert1: top2>1 → pop2, push1, push2 → [1,2]",
    interviewTips: [
      "Same skeleton as reverse-a-stack but the insert is order-aware.",
      "Decide the sort direction (ascending => largest on top) up front.",
    ],
    commonMistakes: [
      "Wrong comparison direction in insertSorted.",
      "Using an auxiliary stack.",
    ],
    followUps: ["Reverse a stack using recursion.", "Sort using an explicit temporary stack."],
    related: ["reverse-a-stack-using-recursion"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def sort_stack(st):
    if not st:
        return
    top = st.pop()
    sort_stack(st)
    _insert_sorted(st, top)

def _insert_sorted(st, x):
    if not st or st[-1] <= x:
        st.append(x)
        return
    top = st.pop()
    _insert_sorted(st, x)
    st.append(top)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public void sort(Deque<Integer> st) {
        if (st.isEmpty()) return;
        int top = st.pop();
        sort(st);
        insertSorted(st, top);
    }
    private void insertSorted(Deque<Integer> st, int x) {
        if (st.isEmpty() || st.peek() <= x) { st.push(x); return; }
        int top = st.pop();
        insertSorted(st, x);
        st.push(top);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function sortStack(st) {
  if (st.length === 0) return;
  const top = st.pop();
  sortStack(st);
  insertSorted(st, top);
}
function insertSorted(st, x) {
  if (st.length === 0 || st[st.length - 1] <= x) { st.push(x); return; }
  const top = st.pop();
  insertSorted(st, x);
  st.push(top);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void sortStack(List<Integer> st) {
        if (st.isEmpty()) return;
        Integer top = st.remove(st.size() - 1);
        sortStack(st);
        insertSorted(st, top);
    }
    private static void insertSorted(List<Integer> st, Integer x) {
        if (st.isEmpty() || st[st.size() - 1] <= x) { st.add(x); return; }
        Integer top = st.remove(st.size() - 1);
        insertSorted(st, x);
        st.add(top);
    }
}`,
      },
    ],
  },
  {
    slug: "power-set",
    title: "Power Set",
    difficulty: "Medium",
    patterns: ["backtracking", "bit-manipulation"],
    topics: ["Recursion", "Bit Manipulation"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an array of distinct integers, return its power set — every possible subset, including the empty set.",
    beginnerExplanation:
      "For each element you make a binary choice: include it or not. With n elements that's 2ⁿ combinations. You can recurse on the choice, or map each subset to the bits of a number 0..2ⁿ−1.",
    realWorldAnalogy:
      "Choosing pizza toppings: each topping is in or out, and every distinct yes/no combination is one possible pizza.",
    visualExplanation:
      "[1,2] → masks 00,01,10,11 → [], [1], [2], [1,2]",
    approaches: [
      {
        title: "Recursive pick / not-pick",
        tier: "Optimal",
        idea: "At index i, recurse excluding nums[i], then including it.",
        steps: ["rec(i, cur): if i==n add a copy; else rec(i+1) excluding, then include nums[i] and rec(i+1)"],
        time: "O(2ⁿ · n)",
        space: "O(n) recursion (plus output)",
      },
      {
        title: "Bitmask enumeration",
        tier: "Optimal",
        idea: "For mask 0..2ⁿ−1, include nums[j] when bit j is set.",
        steps: ["Loop mask 0..(1<<n)-1", "For each set bit j add nums[j]"],
        time: "O(2ⁿ · n)",
        space: "O(1) extra",
      },
    ],
    dryRun: "[1,2,3] masks 0..7 → 8 subsets from [] to [1,2,3]",
    interviewTips: [
      "Mention both the recursive and the bitmask formulations.",
      "2ⁿ subsets means it's only feasible for small n (~20).",
    ],
    commonMistakes: [
      "Appending the same list reference instead of a copy (recursion).",
      "Off-by-one in the bit loop (1<<n, not 1<<(n-1)).",
    ],
    followUps: ["Subsets with duplicates (Subsets II).", "Generate in lexicographic order."],
    related: ["subsets", "subsets-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def power_set(nums):
    res = []

    def rec(i, cur):
        if i == len(nums):
            res.append(cur[:])
            return
        rec(i + 1, cur)              # exclude nums[i]
        cur.append(nums[i])         # include nums[i]
        rec(i + 1, cur)
        cur.pop()

    rec(0, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> powerSet(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int mask = 0; mask < (1 << n); mask++) {
            List<Integer> sub = new ArrayList<>();
            for (int j = 0; j < n; j++)
                if ((mask & (1 << j)) != 0) sub.add(nums[j]);
            res.add(sub);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function powerSet(nums) {
  const res = [];
  const rec = (i, cur) => {
    if (i === nums.length) { res.push([...cur]); return; }
    rec(i + 1, cur);
    cur.push(nums[i]);
    rec(i + 1, cur);
    cur.pop();
  };
  rec(0, []);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> powerSet(List<Integer> nums) {
        List<List<Integer>> res = new List<List<Integer>>();
        Integer n = nums.size();
        for (Integer mask = 0; mask < (1 << n); mask++) {
            List<Integer> sub = new List<Integer>();
            for (Integer j = 0; j < n; j++) {
                if ((mask & (1 << j)) != 0) sub.add(nums[j]);
            }
            res.add(sub);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "combination-sum-iii",
    title: "Combination Sum III",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Find all unique combinations of `k` numbers chosen from 1–9 (each used at most once) that sum to `n`. Return the list of combinations.",
    beginnerExplanation:
      "Walk the digits 1..9 in order, choosing each at most once. Track how many you still need (k) and how much sum is left (n). When both hit zero you've found a valid combination; starting each branch one past the last chosen digit guarantees uniqueness.",
    realWorldAnalogy:
      "Picking exactly k distinct coins from denominations 1–9 so they total n — try them in increasing order so you never count the same set twice.",
    visualExplanation:
      "k=2, n=4 → start 1: need 1 more summing to 3 → pick 3 → [1,3]; start 2: need 2 → none>2 valid → only [1,3]",
    approaches: [
      {
        title: "Backtracking with start index",
        tier: "Optimal",
        idea: "Recurse over digits start..9, decrementing k and n; prune when n<0 or k<0.",
        steps: [
          "rec(start, k, n, cur): if k==0 and n==0 record; if k==0 or n<=0 return",
          "for d in start..9 (break if d>n): choose d, rec(d+1, k-1, n-d), un-choose",
        ],
        time: "O(C(9,k) · k)",
        space: "O(k)",
      },
    ],
    dryRun: "k=3,n=7 → [1,2,4]; (1+2+4=7). Others like [1,2,5]=8>7 pruned.",
    interviewTips: [
      "The start index (d+1) is what enforces 'each number once' and uniqueness.",
      "Prune with `if (d > n) break` since digits are increasing.",
    ],
    commonMistakes: [
      "Reusing the same digit (passing d instead of d+1).",
      "Forgetting the k==0 && n==0 dual base case.",
    ],
    followUps: ["Combination Sum (unlimited reuse).", "Combination Sum II (with duplicates)."],
    related: ["combination-sum", "combination-sum-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def combination_sum3(k, n):
    res = []

    def rec(start, k, n, cur):
        if k == 0 and n == 0:
            res.append(cur[:])
            return
        if k == 0 or n <= 0:
            return
        for d in range(start, 10):
            if d > n:
                break
            cur.append(d)
            rec(d + 1, k - 1, n - d, cur)
            cur.pop()

    rec(1, k, n, [])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        rec(1, k, n, new ArrayList<>(), res);
        return res;
    }
    private void rec(int start, int k, int n, List<Integer> cur, List<List<Integer>> res) {
        if (k == 0 && n == 0) { res.add(new ArrayList<>(cur)); return; }
        if (k == 0 || n <= 0) return;
        for (int d = start; d <= 9; d++) {
            if (d > n) break;
            cur.add(d);
            rec(d + 1, k - 1, n - d, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function combinationSum3(k, n) {
  const res = [];
  const rec = (start, k, n, cur) => {
    if (k === 0 && n === 0) { res.push([...cur]); return; }
    if (k === 0 || n <= 0) return;
    for (let d = start; d <= 9; d++) {
      if (d > n) break;
      cur.push(d);
      rec(d + 1, k - 1, n - d, cur);
      cur.pop();
    }
  };
  rec(1, k, n, []);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> combinationSum3(Integer k, Integer n) {
        List<List<Integer>> res = new List<List<Integer>>();
        rec(1, k, n, new List<Integer>(), res);
        return res;
    }
    private static void rec(Integer start, Integer k, Integer n, List<Integer> cur, List<List<Integer>> res) {
        if (k == 0 && n == 0) { res.add(new List<Integer>(cur)); return; }
        if (k == 0 || n <= 0) return;
        for (Integer d = start; d <= 9; d++) {
            if (d > n) break;
            cur.add(d);
            rec(d + 1, k - 1, n - d, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
      },
    ],
  },
  {
    slug: "rat-in-a-maze",
    title: "Rat in a Maze",
    difficulty: "Hard",
    patterns: ["backtracking"],
    topics: ["Backtracking"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an n×n grid of 0s (blocked) and 1s (open), find all paths for a rat from the top-left (0,0) to the bottom-right (n−1,n−1), moving only on open cells in directions Down, Left, Right, Up. Return each path as a string of moves (in lexical order: D, L, R, U).",
    beginnerExplanation:
      "Explore from the start cell, trying each direction. Mark a cell visited before recursing so you never loop, then unmark it when you backtrack so other paths can reuse it. Record the move string whenever you reach the destination.",
    realWorldAnalogy:
      "A mouse exploring a hedge maze with a marker: it chalks a cell on the way in and erases it on the way back, so it can find every route without ever circling forever.",
    visualExplanation:
      "grid 1 1 / 0 1 → from (0,0): R to (0,1), D to (1,1)=dest → path 'RD'",
    approaches: [
      {
        title: "Backtracking with a visited grid",
        tier: "Optimal",
        idea: "DFS in fixed direction order, marking/unmarking visited cells, collecting strings at the destination.",
        steps: [
          "If start or end is blocked, no path",
          "rec(i,j,path): at destination push path; mark visited",
          "Try D,L,R,U; recurse into in-bounds, open, unvisited neighbours",
          "Unmark on the way out",
        ],
        time: "O(4^(n²)) worst case",
        space: "O(n²)",
      },
    ],
    dryRun: "all-open 2x2 → paths 'DR' and 'RD'",
    interviewTips: [
      "Fix the direction order (D,L,R,U) so outputs come out lexicographically sorted.",
      "Mark visited BEFORE recursing and unmark AFTER — the classic backtracking pair.",
    ],
    commonMistakes: [
      "Forgetting to unmark visited cells (misses valid paths).",
      "Not checking the start/end cell is open.",
    ],
    followUps: ["Count paths only.", "Allow only Down/Right moves (simpler grid DP)."],
    related: ["word-search", "n-queens"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rat_in_maze(grid):
    n = len(grid)
    res = []
    if n == 0 or grid[0][0] == 0 or grid[n - 1][n - 1] == 0:
        return res
    visited = [[False] * n for _ in range(n)]
    di, dj, ds = [1, 0, 0, -1], [0, -1, 1, 0], "DLRU"

    def rec(i, j, path):
        if i == n - 1 and j == n - 1:
            res.append(path)
            return
        visited[i][j] = True
        for k in range(4):
            ni, nj = i + di[k], j + dj[k]
            if 0 <= ni < n and 0 <= nj < n and not visited[ni][nj] and grid[ni][nj] == 1:
                rec(ni, nj, path + ds[k])
        visited[i][j] = False

    rec(0, 0, "")
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<String> findPaths(int[][] grid) {
        int n = grid.length;
        List<String> res = new ArrayList<>();
        if (n == 0 || grid[0][0] == 0 || grid[n - 1][n - 1] == 0) return res;
        boolean[][] vis = new boolean[n][n];
        int[] di = {1, 0, 0, -1}, dj = {0, -1, 1, 0};
        char[] ds = {'D', 'L', 'R', 'U'};
        rec(0, 0, n, grid, vis, di, dj, ds, new StringBuilder(), res);
        return res;
    }
    private void rec(int i, int j, int n, int[][] g, boolean[][] vis,
                     int[] di, int[] dj, char[] ds, StringBuilder path, List<String> res) {
        if (i == n - 1 && j == n - 1) { res.add(path.toString()); return; }
        vis[i][j] = true;
        for (int k = 0; k < 4; k++) {
            int ni = i + di[k], nj = j + dj[k];
            if (ni >= 0 && ni < n && nj >= 0 && nj < n && !vis[ni][nj] && g[ni][nj] == 1) {
                path.append(ds[k]);
                rec(ni, nj, n, g, vis, di, dj, ds, path, res);
                path.deleteCharAt(path.length() - 1);
            }
        }
        vis[i][j] = false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function ratInMaze(grid) {
  const n = grid.length;
  const res = [];
  if (n === 0 || grid[0][0] === 0 || grid[n - 1][n - 1] === 0) return res;
  const vis = Array.from({ length: n }, () => new Array(n).fill(false));
  const di = [1, 0, 0, -1], dj = [0, -1, 1, 0], ds = "DLRU";
  const rec = (i, j, path) => {
    if (i === n - 1 && j === n - 1) { res.push(path); return; }
    vis[i][j] = true;
    for (let k = 0; k < 4; k++) {
      const ni = i + di[k], nj = j + dj[k];
      if (ni >= 0 && ni < n && nj >= 0 && nj < n && !vis[ni][nj] && grid[ni][nj] === 1)
        rec(ni, nj, path + ds[k]);
    }
    vis[i][j] = false;
  };
  rec(0, 0, "");
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static List<Integer> di = new List<Integer>{1, 0, 0, -1};
    static List<Integer> dj = new List<Integer>{0, -1, 1, 0};
    static String ds = 'DLRU';
    public static List<String> findPaths(List<List<Integer>> grid) {
        Integer n = grid.size();
        List<String> res = new List<String>();
        if (n == 0 || grid[0][0] == 0 || grid[n - 1][n - 1] == 0) return res;
        Boolean[][] vis = new Boolean[n][n];
        for (Integer a = 0; a < n; a++) for (Integer b = 0; b < n; b++) vis[a][b] = false;
        rec(0, 0, n, grid, vis, '', res);
        return res;
    }
    static void rec(Integer i, Integer j, Integer n, List<List<Integer>> g, Boolean[][] vis, String path, List<String> res) {
        if (i == n - 1 && j == n - 1) { res.add(path); return; }
        vis[i][j] = true;
        for (Integer k = 0; k < 4; k++) {
            Integer ni = i + di[k], nj = j + dj[k];
            if (ni >= 0 && ni < n && nj >= 0 && nj < n && !vis[ni][nj] && g[ni][nj] == 1) {
                rec(ni, nj, n, g, vis, path + ds.substring(k, k + 1), res);
            }
        }
        vis[i][j] = false;
    }
}`,
      },
    ],
  },
  {
    slug: "m-coloring-problem",
    title: "M-Coloring Problem",
    difficulty: "Hard",
    patterns: ["backtracking", "graphs"],
    topics: ["Backtracking", "Graphs"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an undirected graph with `n` vertices and a number `m`, determine whether the graph can be coloured with at most `m` colours so that no two adjacent vertices share a colour. Return true/false.",
    beginnerExplanation:
      "Colour vertices one at a time. For each vertex try every colour, but only keep a colour if none of its already-coloured neighbours use it. If you reach a dead end, backtrack and try a different colour earlier.",
    realWorldAnalogy:
      "Colouring a map so neighbouring countries differ — you fill regions one by one, backing up whenever you paint yourself into a corner.",
    visualExplanation:
      "triangle (3 mutually adjacent) needs m>=3; with m=2 every assignment clashes → false",
    approaches: [
      {
        title: "Backtracking over vertices",
        tier: "Optimal",
        idea: "Assign colours vertex by vertex; a colour is valid if no adjacent vertex already has it.",
        steps: [
          "rec(v): if v==n return true",
          "for c in 1..m: if safe(v,c) set color[v]=c, recurse, else reset",
          "safe(v,c): no neighbour of v has colour c",
        ],
        time: "O(m^n)",
        space: "O(n)",
      },
    ],
    dryRun: "square cycle A-B-C-D-A, m=2 → A=1,B=2,C=1,D=2 works → true",
    interviewTips: [
      "The safety check only inspects already-coloured neighbours.",
      "Chromatic number is the smallest m that works; this just tests a given m.",
    ],
    commonMistakes: [
      "Not resetting color[v] to 0 on backtrack.",
      "Checking all vertices instead of only neighbours in `safe`.",
    ],
    followUps: ["Return an actual valid colouring.", "Find the chromatic number."],
    related: ["sudoku-solver"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def graph_coloring(n, edges, m):
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    color = [0] * n

    def safe(v, c):
        return all(color[nb] != c for nb in adj[v])

    def rec(v):
        if v == n:
            return True
        for c in range(1, m + 1):
            if safe(v, c):
                color[v] = c
                if rec(v + 1):
                    return True
                color[v] = 0
        return False

    return rec(0)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean graphColoring(int n, int[][] edges, int m) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        return rec(0, n, m, new int[n], adj);
    }
    private boolean rec(int v, int n, int m, int[] color, List<List<Integer>> adj) {
        if (v == n) return true;
        for (int c = 1; c <= m; c++) {
            if (safe(v, c, color, adj)) {
                color[v] = c;
                if (rec(v + 1, n, m, color, adj)) return true;
                color[v] = 0;
            }
        }
        return false;
    }
    private boolean safe(int v, int c, int[] color, List<List<Integer>> adj) {
        for (int nb : adj.get(v)) if (color[nb] == c) return false;
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function graphColoring(n, edges, m) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
  const color = new Array(n).fill(0);
  const safe = (v, c) => adj[v].every((nb) => color[nb] !== c);
  const rec = (v) => {
    if (v === n) return true;
    for (let c = 1; c <= m; c++) {
      if (safe(v, c)) {
        color[v] = c;
        if (rec(v + 1)) return true;
        color[v] = 0;
      }
    }
    return false;
  };
  return rec(0);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean graphColoring(Integer n, List<List<Integer>> edges, Integer m) {
        List<List<Integer>> adj = new List<List<Integer>>();
        for (Integer i = 0; i < n; i++) adj.add(new List<Integer>());
        for (List<Integer> e : edges) { adj[e[0]].add(e[1]); adj[e[1]].add(e[0]); }
        List<Integer> color = new List<Integer>();
        for (Integer i = 0; i < n; i++) color.add(0);
        return rec(0, n, m, color, adj);
    }
    static Boolean rec(Integer v, Integer n, Integer m, List<Integer> color, List<List<Integer>> adj) {
        if (v == n) return true;
        for (Integer c = 1; c <= m; c++) {
            if (safe(v, c, color, adj)) {
                color[v] = c;
                if (rec(v + 1, n, m, color, adj)) return true;
                color[v] = 0;
            }
        }
        return false;
    }
    static Boolean safe(Integer v, Integer c, List<Integer> color, List<List<Integer>> adj) {
        for (Integer nb : adj[v]) if (color[nb] == c) return false;
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "sudoku-solver",
    title: "Sudoku Solver",
    difficulty: "Hard",
    patterns: ["backtracking"],
    topics: ["Backtracking"],
    companies: ["google", "amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Fill a partially-filled 9×9 Sudoku board (empty cells are '.') so every row, column and 3×3 box contains the digits 1–9 exactly once. Modify the board in place; a unique solution is guaranteed.",
    beginnerExplanation:
      "Scan for the first empty cell, try digits 1–9 that don't already appear in its row, column, or 3×3 box, place one, and recurse. If the recursion can't finish, undo the digit and try the next — classic constraint-satisfaction backtracking.",
    realWorldAnalogy:
      "Solving a Sudoku in pen-with-an-eraser: pencil in a candidate, push on; if it leads to a contradiction, rub it out and try the next number.",
    visualExplanation:
      "find first '.', try 1..9 valid for its row/col/box → place → recurse → on failure erase and continue",
    approaches: [
      {
        title: "Backtracking with validity check",
        tier: "Optimal",
        idea: "Recurse cell by cell; for each empty cell try each valid digit, backtrack on failure.",
        steps: [
          "Find next empty cell; if none, solved",
          "For digit '1'..'9': if valid in row/col/box, place and recurse",
          "If recursion fails, reset cell to '.' and try next digit",
        ],
        time: "O(9^(empty cells)) worst case",
        space: "O(1) board in place (plus recursion)",
      },
    ],
    dryRun: "first empty at (0,2): 1,2 used in row → try 3 valid → place, recurse on next empty…",
    interviewTips: [
      "Validity check covers row, column, and the 3×3 box (r/3*3, c/3*3).",
      "Returning a boolean from the recursion lets you stop as soon as it's solved.",
    ],
    commonMistakes: [
      "Wrong box index math for the 3×3 sub-grid.",
      "Not resetting the cell to '.' when backtracking.",
    ],
    followUps: ["Count all solutions.", "Add constraint propagation (e.g., naked singles) to speed it up."],
    related: ["n-queens", "m-coloring-problem"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def solve_sudoku(board):
    def valid(r, c, ch):
        for i in range(9):
            if board[r][i] == ch or board[i][c] == ch:
                return False
            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:
                return False
        return True

    def rec():
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    for d in "123456789":
                        if valid(r, c, d):
                            board[r][c] = d
                            if rec():
                                return True
                            board[r][c] = "."
                    return False
        return True

    rec()
    return board`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void solveSudoku(char[][] board) { rec(board); }
    private boolean rec(char[][] b) {
        for (int r = 0; r < 9; r++)
            for (int c = 0; c < 9; c++)
                if (b[r][c] == '.') {
                    for (char d = '1'; d <= '9'; d++)
                        if (valid(b, r, c, d)) {
                            b[r][c] = d;
                            if (rec(b)) return true;
                            b[r][c] = '.';
                        }
                    return false;
                }
        return true;
    }
    private boolean valid(char[][] b, int r, int c, char d) {
        for (int i = 0; i < 9; i++) {
            if (b[r][i] == d || b[i][c] == d) return false;
            if (b[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == d) return false;
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function solveSudoku(board) {
  const valid = (r, c, ch) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch || board[i][c] === ch) return false;
      if (board[3 * ((r / 3) | 0) + ((i / 3) | 0)][3 * ((c / 3) | 0) + (i % 3)] === ch) return false;
    }
    return true;
  };
  const rec = () => {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++)
        if (board[r][c] === ".") {
          for (let d = 1; d <= 9; d++) {
            const ch = String(d);
            if (valid(r, c, ch)) {
              board[r][c] = ch;
              if (rec()) return true;
              board[r][c] = ".";
            }
          }
          return false;
        }
    return true;
  };
  rec();
  return board;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void solveSudoku(List<List<String>> board) { rec(board); }
    static Boolean rec(List<List<String>> b) {
        for (Integer r = 0; r < 9; r++) {
            for (Integer c = 0; c < 9; c++) {
                if (b[r][c] == '.') {
                    for (Integer d = 1; d <= 9; d++) {
                        String ch = String.valueOf(d);
                        if (valid(b, r, c, ch)) {
                            b[r][c] = ch;
                            if (rec(b)) return true;
                            b[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    static Boolean valid(List<List<String>> b, Integer r, Integer c, String d) {
        for (Integer i = 0; i < 9; i++) {
            if (b[r][i] == d || b[i][c] == d) return false;
            if (b[3 * (r / 3) + i / 3][3 * (c / 3) + Math.mod(i, 3)] == d) return false;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "count-distinct-subsequences",
    title: "Count Distinct Subsequences",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string `s`, count the number of distinct non-empty subsequences of `s`, modulo 1e9+7. (Subsequences equal as strings count once, even if formed from different positions.)",
    beginnerExplanation:
      "Track the running total of distinct subsequences. Adding a new character c roughly doubles the count (every existing subsequence with or without c), plus the single-character c — but you must subtract the subsequences that ended with c the LAST time it appeared, or you'd double-count.",
    realWorldAnalogy:
      "Like tallying unique playlists as you add songs: a repeated song doesn't create brand-new playlists for the combinations it already produced last time, so you discount that overlap.",
    visualExplanation:
      's = "aba"\n"a"→1 ; +"b"→ a,b,ab =3 ; +"a"→ double 3 +1 =7, minus dup from prev "a" (1) → 6',
    approaches: [
      {
        title: "Last-occurrence DP",
        tier: "Optimal",
        idea: "total' = 2·total + 1; if c seen before, subtract the total just before its previous occurrence.",
        steps: [
          "Maintain total and a map last[c] = total before c was last added",
          "For each c: new = (total + 1); if c in last subtract last[c]; total = new + total - last.get(c)",
          "Store the contribution so future duplicates can subtract it",
        ],
        time: "O(n)",
        space: "O(alphabet)",
      },
    ],
    dryRun: 's="aa" → after 1st a: total=1 ; 2nd a: new=2, subtract prev contribution(1) → total=2 ("a","aa")',
    interviewTips: [
      "The subtraction of the previous-occurrence contribution is THE crux — be ready to justify it.",
      "Watch the modulo: add MOD before subtracting to avoid negatives.",
    ],
    commonMistakes: [
      "Negative values after the modular subtraction.",
      "Counting the empty subsequence when the problem asks for non-empty (or vice-versa).",
    ],
    followUps: ["Include the empty subsequence.", "Distinct Subsequences of t within s (the two-string variant)."],
    related: ["distinct-subsequences", "subsequence-sum-equals-k"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def distinct_subseq_count(s):
    MOD = 10**9 + 7
    contributed = {}
    total = 0
    for c in s:
        new_total = (2 * total + 1) % MOD
        if c in contributed:
            new_total = (new_total - contributed[c]) % MOD
        contributed[c] = (total + 1) % MOD
        total = new_total % MOD
    return total % MOD`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int distinctSubseqII(String s) {
        long MOD = 1_000_000_007L, total = 0;
        Map<Character, Long> contributed = new HashMap<>();
        for (char c : s.toCharArray()) {
            long newTotal = (2 * total + 1) % MOD;
            if (contributed.containsKey(c)) newTotal = (newTotal - contributed.get(c) + MOD) % MOD;
            contributed.put(c, (total + 1) % MOD);
            total = newTotal;
        }
        return (int) (total % MOD);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function distinctSubseqCount(s) {
  const MOD = 1000000007n;
  const contributed = new Map();
  let total = 0n;
  for (const c of s) {
    let newTotal = (2n * total + 1n) % MOD;
    if (contributed.has(c)) newTotal = (newTotal - contributed.get(c) + MOD) % MOD;
    contributed.set(c, (total + 1n) % MOD);
    total = newTotal;
  }
  return Number(total % MOD);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Long distinctSubseqCount(String s) {
        Long MOD = 1000000007L, total = 0;
        Map<String, Long> contributed = new Map<String, Long>();
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            Long newTotal = Math.mod(2 * total + 1, MOD);
            if (contributed.containsKey(c)) newTotal = Math.mod(newTotal - contributed.get(c) + MOD, MOD);
            contributed.put(c, Math.mod(total + 1, MOD));
            total = newTotal;
        }
        return Math.mod(total, MOD);
    }
}`,
      },
    ],
  },
  {
    slug: "subsequence-sum-equals-k",
    title: "Subsequence Sum Equals K",
    difficulty: "Easy",
    patterns: ["backtracking", "dynamic-programming"],
    topics: ["Recursion"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array of non-negative integers and a target `k`, determine whether any subsequence sums exactly to `k`. Return true/false.",
    beginnerExplanation:
      "At each element you make a choice: include it in your running sum or skip it. Recurse on both choices; if the target hits exactly zero you've found a valid subsequence.",
    realWorldAnalogy:
      "Picking a subset of bills from your wallet to pay an exact amount — for each bill you decide to hand it over or keep it.",
    visualExplanation:
      "nums=[1,2,3], k=5 → pick 2+3 → true",
    approaches: [
      {
        title: "Pick / not-pick recursion",
        tier: "Optimal",
        idea: "rec(i, target): true if target hits 0; try including or excluding nums[i].",
        steps: [
          "If target == 0 return true",
          "If i == n or target < 0 return false",
          "Return rec(i+1, target-nums[i]) OR rec(i+1, target)",
        ],
        time: "O(2ⁿ) (O(n·k) with memoisation)",
        space: "O(n)",
      },
    ],
    dryRun: "nums=[1,3], k=2 → pick1(need1)→pick3 no/skip no; skip1→pick3 no → false",
    interviewTips: [
      "Mention the memoised / subset-sum DP upgrade to O(n·k) for the follow-up.",
      "The early `target < 0` prune assumes non-negative values.",
    ],
    commonMistakes: [
      "Forgetting the target==0 success base case before the i==n check.",
      "Applying the negative-target prune when values can be negative.",
    ],
    followUps: ["Count such subsequences.", "Return one such subsequence.", "Subset-sum DP for large n."],
    related: ["subset-sum-equal-to-target", "count-subsets-with-sum-k"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subsequence_sum(nums, k):
    def rec(i, target):
        if target == 0:
            return True
        if i == len(nums) or target < 0:
            return False
        return rec(i + 1, target - nums[i]) or rec(i + 1, target)

    return rec(0, k)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean subsequenceSum(int[] nums, int k) {
        return rec(nums, 0, k);
    }
    private boolean rec(int[] nums, int i, int target) {
        if (target == 0) return true;
        if (i == nums.length || target < 0) return false;
        return rec(nums, i + 1, target - nums[i]) || rec(nums, i + 1, target);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function subsequenceSum(nums, k) {
  const rec = (i, target) => {
    if (target === 0) return true;
    if (i === nums.length || target < 0) return false;
    return rec(i + 1, target - nums[i]) || rec(i + 1, target);
  };
  return rec(0, k);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean subsequenceSum(List<Integer> nums, Integer k) {
        return rec(nums, 0, k);
    }
    static Boolean rec(List<Integer> nums, Integer i, Integer target) {
        if (target == 0) return true;
        if (i == nums.size() || target < 0) return false;
        return rec(nums, i + 1, target - nums[i]) || rec(nums, i + 1, target);
    }
}`,
      },
    ],
  },
];

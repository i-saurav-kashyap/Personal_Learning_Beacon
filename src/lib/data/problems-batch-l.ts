import type { Problem } from "@/lib/types";

// Striver A2Z binary-search gaps — classic "binary search on the answer" set.
export const PROBLEMS_BATCH_L: Problem[] = [
  {
    slug: "sqrt-x",
    title: "Sqrt(x)",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Math"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a non-negative integer `x`, return the floor of its square root (the largest integer whose square is ≤ x), computed without using built-in sqrt.",
    beginnerExplanation:
      "The answer lives between 1 and x. Guess the middle; if its square is too big, the real answer is smaller, otherwise it could be this number or bigger. Halve the range each time.",
    realWorldAnalogy:
      "Guessing someone's age where you only get 'too high / too low'. You start in the middle of the plausible range and halve it every guess.",
    visualExplanation:
      "x=28\nlo=1 hi=14 mid=7 → 49>28 hi=6\nlo=1 hi=6 mid=3 → 9≤28 ans=3 lo=4\nlo=4 hi=6 mid=5 → 25≤28 ans=5 lo=6\nlo=6 hi=6 mid=6 → 36>28 hi=5 → answer 5",
    approaches: [
      {
        title: "Linear scan",
        tier: "Brute Force",
        idea: "Increment i until i*i exceeds x.",
        steps: ["For i from 1 upward", "Stop when i*i > x", "Return i-1"],
        time: "O(√x)",
        space: "O(1)",
      },
      {
        title: "Binary search on the answer",
        tier: "Optimal",
        idea: "Search the range [1, x/2] for the largest mid with mid² ≤ x.",
        steps: [
          "lo=1, hi=x/2",
          "If mid² ≤ x record mid and search right, else search left",
        ],
        time: "O(log x)",
        space: "O(1)",
      },
    ],
    dryRun: "x=8 → lo1 hi4 mid2 (4≤8 ans2 lo3); lo3 hi4 mid3 (9>8 hi2) → 2",
    interviewTips: [
      "Use a 64-bit type (or compare mid <= x/mid) so mid*mid doesn't overflow.",
      "State that you're binary-searching the answer space, not an array.",
    ],
    commonMistakes: ["Overflow on mid*mid in fixed-width ints.", "Returning ceil instead of floor."],
    followUps: ["Return the root to a given precision (continue into decimals).", "Nth root variant."],
    related: ["binary-search", "nth-root-of-a-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def my_sqrt(x):
    if x < 2:
        return x
    lo, hi, ans = 1, x // 2, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int mySqrt(int x) {
        if (x < 2) return x;
        long lo = 1, hi = x / 2, ans = 0;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            if (mid * mid <= x) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return (int) ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function mySqrt(x) {
  if (x < 2) return x;
  let lo = 1, hi = Math.floor(x / 2), ans = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid <= x) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer mySqrt(Integer x) {
        if (x < 2) return x;
        Long lo = 1, hi = (Long) (x / 2), ans = 0;
        while (lo <= hi) {
            Long mid = (lo + hi) / 2;
            if (mid * mid <= x) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans.intValue();
    }
}`,
      },
    ],
  },
  {
    slug: "nth-root-of-a-number",
    title: "Nth Root of a Number",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Math"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given integers `n` and `x`, find the integer `m` such that mⁿ = x. If no such integer exists, return −1.",
    beginnerExplanation:
      "The nth root is between 1 and x. Binary-search it: raise the midpoint to the nth power and compare to x — but stop multiplying early once you exceed x so the number doesn't blow up.",
    realWorldAnalogy:
      "Tuning a dial where each notch's effect is amplified n times. You bracket the target and halve the range, cutting off as soon as you clearly overshoot.",
    visualExplanation:
      "n=3, x=27\nlo=1 hi=27 mid=14 →14³≫27 hi=13 … converges to mid=3 → 3³=27 ✓",
    approaches: [
      {
        title: "Linear power test",
        tier: "Brute Force",
        idea: "Try m=1,2,3… computing mⁿ until it meets or passes x.",
        steps: ["For m from 1", "If mⁿ == x return m", "If mⁿ > x return -1"],
        time: "O(x · n)",
        space: "O(1)",
      },
      {
        title: "Binary search + capped power",
        tier: "Optimal",
        idea: "Binary-search m in [1, x]; compute mⁿ with early cut-off to avoid overflow.",
        steps: [
          "lo=1, hi=x",
          "power(mid,n) capped at x+1; compare to x and move bounds",
        ],
        time: "O(n · log x)",
        space: "O(1)",
      },
    ],
    dryRun: "n=2 x=16 → lo1 hi16 mid8 (64>16 hi7)…mid4 (16==16) → 4",
    interviewTips: [
      "The cap trick (stop multiplying once you pass x) is the key to avoiding overflow.",
      "Clarify whether only exact integer roots count.",
    ],
    commonMistakes: ["Overflow from computing mⁿ fully.", "Off-by-one bounds."],
    followUps: ["Real-valued nth root to a precision.", "Sqrt as the n=2 case."],
    related: ["sqrt-x", "binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def nth_root(n, x):
    def power(base, exp, limit):
        result = 1
        for _ in range(exp):
            result *= base
            if result > limit:
                return limit + 1
        return result

    lo, hi = 1, x
    while lo <= hi:
        mid = (lo + hi) // 2
        val = power(mid, n, x)
        if val == x:
            return mid
        if val < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private long power(long base, int exp, long limit) {
        long result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
            if (result > limit) return limit + 1;
        }
        return result;
    }
    public int nthRoot(int n, int x) {
        long lo = 1, hi = x;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long val = power(mid, n, x);
            if (val == x) return (int) mid;
            if (val < x) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function nthRoot(n, x) {
  const power = (base, exp, limit) => {
    let result = 1;
    for (let i = 0; i < exp; i++) {
      result *= base;
      if (result > limit) return limit + 1;
    }
    return result;
  };
  let lo = 1, hi = x;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const val = power(mid, n, x);
    if (val === x) return mid;
    if (val < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Long power(Long base, Integer exp, Long limit) {
        Long result = 1;
        for (Integer i = 0; i < exp; i++) {
            result *= base;
            if (result > limit) return limit + 1;
        }
        return result;
    }
    public static Integer nthRoot(Integer n, Integer x) {
        Long lo = 1, hi = (Long) x;
        while (lo <= hi) {
            Long mid = (lo + hi) / 2;
            Long val = power(mid, n, (Long) x);
            if (val == x) return mid.intValue();
            if (val < x) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-number-of-days-to-make-m-bouquets",
    title: "Minimum Number of Days to Make m Bouquets",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "`bloomDay[i]` is the day flower i blooms. You need `m` bouquets, each of `k` adjacent already-bloomed flowers. Return the minimum number of days to wait, or −1 if impossible.",
    beginnerExplanation:
      "More days = more flowers bloomed = easier to make bouquets. That monotonic 'feasible after some day' is the cue to binary-search the day: for a candidate day, greedily count how many bouquets you can form from adjacent bloomed runs.",
    realWorldAnalogy:
      "Waiting for a garden to bloom enough to make flower bunches. The longer you wait the more you can make — so you binary-search the earliest day that's 'enough'.",
    visualExplanation:
      "bloom=[1,10,3,10,2] m=3 k=1 → need 3 single flowers; earliest day where ≥3 bloomed = 3",
    approaches: [
      {
        title: "Try every day",
        tier: "Brute Force",
        idea: "For each day from min to max, check feasibility.",
        steps: ["For day in [min..max]", "Count bouquets", "Return first feasible day"],
        time: "O((max−min) · n)",
        space: "O(1)",
      },
      {
        title: "Binary search on day + greedy check",
        tier: "Optimal",
        idea: "Binary-search the day; canMake(day) scans counting adjacent bloomed runs of length k.",
        steps: [
          "If m*k > n → impossible (-1)",
          "lo=min(bloom), hi=max(bloom)",
          "canMake(mid): walk array, reset run on un-bloomed, +1 bouquet per k",
          "Shrink toward the smallest feasible day",
        ],
        time: "O(n · log(max−min))",
        space: "O(1)",
      },
    ],
    dryRun:
      "bloom=[1,10,3,10,2] m=3 k=1 → can(3): flowers ≤3 are days 1,3,2 → 3 bouquets ✓; smaller days give <3 → answer 3",
    interviewTips: [
      "Lead with the monotonic insight: feasibility only improves with more days.",
      "The early m*k>n impossibility check avoids wasted work.",
    ],
    commonMistakes: [
      "Forgetting to reset the adjacent-run counter on an un-bloomed flower.",
      "Off-by-one in lo/hi initial bounds.",
    ],
    followUps: ["Bouquets needn't be adjacent (different counting).", "Maximize bouquets in D days."],
    related: ["aggressive-cows", "capacity-to-ship-packages-within-d-days"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_days(bloom_day, m, k):
    n = len(bloom_day)
    if m * k > n:
        return -1

    def can(day):
        bouquets = flowers = 0
        for b in bloom_day:
            if b <= day:
                flowers += 1
                if flowers == k:
                    bouquets += 1
                    flowers = 0
            else:
                flowers = 0
        return bouquets >= m

    lo, hi, ans = min(bloom_day), max(bloom_day), -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if can(mid):
            ans = mid
            hi = mid - 1
        else:
            lo = mid + 1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private boolean can(int[] bloom, int m, int k, int day) {
        int bouquets = 0, flowers = 0;
        for (int b : bloom) {
            if (b <= day) {
                if (++flowers == k) { bouquets++; flowers = 0; }
            } else flowers = 0;
        }
        return bouquets >= m;
    }
    public int minDays(int[] bloom, int m, int k) {
        long need = (long) m * k;
        if (need > bloom.length) return -1;
        int lo = Integer.MAX_VALUE, hi = Integer.MIN_VALUE, ans = -1;
        for (int b : bloom) { lo = Math.min(lo, b); hi = Math.max(hi, b); }
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(bloom, m, k, mid)) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minDays(bloomDay, m, k) {
  const n = bloomDay.length;
  if (m * k > n) return -1;
  const can = (day) => {
    let bouquets = 0, flowers = 0;
    for (const b of bloomDay) {
      if (b <= day) {
        if (++flowers === k) { bouquets++; flowers = 0; }
      } else flowers = 0;
    }
    return bouquets >= m;
  };
  let lo = Math.min(...bloomDay), hi = Math.max(...bloomDay), ans = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (can(mid)) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Boolean can(List<Integer> bloom, Integer m, Integer k, Integer day) {
        Integer bouquets = 0, flowers = 0;
        for (Integer b : bloom) {
            if (b <= day) {
                flowers++;
                if (flowers == k) { bouquets++; flowers = 0; }
            } else flowers = 0;
        }
        return bouquets >= m;
    }
    public static Integer minDays(List<Integer> bloom, Integer m, Integer k) {
        Integer n = bloom.size();
        if ((Long) m * k > n) return -1;
        Integer lo = 2147483647, hi = -2147483648, ans = -1;
        for (Integer b : bloom) { lo = Math.min(lo, b); hi = Math.max(hi, b); }
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (can(bloom, m, k, mid)) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "capacity-to-ship-packages-within-d-days",
    title: "Capacity To Ship Packages Within D Days",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Packages with given `weights` must ship in order within `days` days on one ship. Each day loads packages (in order) up to the ship's capacity. Return the least capacity that ships everything within `days`.",
    beginnerExplanation:
      "A bigger ship finishes in fewer days — monotonic. So binary-search the capacity: for a candidate capacity, greedily fill each day until adding the next package would overflow, then count the days needed.",
    realWorldAnalogy:
      "Renting the smallest truck that still finishes your move by the deadline. Bigger truck → fewer trips, so you search for the smallest truck that makes the deadline.",
    visualExplanation:
      "w=[1,2,3,4,5] days=2 → capacity must be ≥ max(5) and ≥ sum/2; answer 9 → day1[1,2,3,4]=10>9 so [1,2,3]=6 then [4,5]=9 → wait, tune to 9 fits in 2 days",
    approaches: [
      {
        title: "Try every capacity",
        tier: "Brute Force",
        idea: "From max(weights) to sum(weights), find first that fits in days.",
        steps: ["For cap in [max..sum]", "Simulate days", "Return first feasible"],
        time: "O(sum · n)",
        space: "O(1)",
      },
      {
        title: "Binary search on capacity",
        tier: "Optimal",
        idea: "lo=max(weights), hi=sum(weights); count days greedily for mid capacity.",
        steps: [
          "daysNeeded(cap): walk weights, start a new day when overflow",
          "If daysNeeded ≤ days search left (smaller cap), else right",
        ],
        time: "O(n · log(sum))",
        space: "O(1)",
      },
    ],
    dryRun: "w=[3,2,2,4,1,4] days=3 → answer 6: [3,2],[2,4? =6],[1,4]→3 days at cap6",
    interviewTips: [
      "lo must be max(weights) — no single package can exceed capacity.",
      "Name it 'binary search on the answer' and prove the monotonic feasibility.",
    ],
    commonMistakes: ["Starting lo at 1 instead of max(weights).", "Counting days off by one."],
    followUps: ["Split array into k subarrays minimizing the max sum (same shape)."],
    related: ["split-array-largest-sum", "allocate-minimum-number-of-pages"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def ship_within_days(weights, days):
    def needed(cap):
        d, cur = 1, 0
        for w in weights:
            if cur + w > cap:
                d += 1
                cur = 0
            cur += w
        return d

    lo, hi, ans = max(weights), sum(weights), 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if needed(mid) <= days:
            ans = mid
            hi = mid - 1
        else:
            lo = mid + 1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int needed(int[] w, int cap) {
        int d = 1, cur = 0;
        for (int x : w) {
            if (cur + x > cap) { d++; cur = 0; }
            cur += x;
        }
        return d;
    }
    public int shipWithinDays(int[] weights, int days) {
        int lo = 0, hi = 0, ans = 0;
        for (int x : weights) { lo = Math.max(lo, x); hi += x; }
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (needed(weights, mid) <= days) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function shipWithinDays(weights, days) {
  const needed = (cap) => {
    let d = 1, cur = 0;
    for (const x of weights) {
      if (cur + x > cap) { d++; cur = 0; }
      cur += x;
    }
    return d;
  };
  let lo = Math.max(...weights), hi = weights.reduce((a, b) => a + b, 0), ans = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (needed(mid) <= days) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer needed(List<Integer> w, Integer cap) {
        Integer d = 1, cur = 0;
        for (Integer x : w) {
            if (cur + x > cap) { d++; cur = 0; }
            cur += x;
        }
        return d;
    }
    public static Integer shipWithinDays(List<Integer> weights, Integer days) {
        Integer lo = 0, hi = 0, ans = 0;
        for (Integer x : weights) { lo = Math.max(lo, x); hi += x; }
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (needed(weights, mid) <= days) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "aggressive-cows",
    title: "Aggressive Cows",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays", "Greedy"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given stall positions on a line and `c` cows, place the cows so the minimum distance between any two is as large as possible. Return that largest minimum distance.",
    beginnerExplanation:
      "If a spacing `d` is achievable, any smaller spacing is too — monotonic. Binary-search the spacing: for a candidate `d`, greedily place a cow, then the next cow only when it's at least `d` away; if you seat all `c`, `d` works.",
    realWorldAnalogy:
      "Seating quarrelsome guests as far apart as possible along a bench. You test 'can everyone sit at least d apart?' and push d as high as it'll go.",
    visualExplanation:
      "stalls=[1,2,4,8,9] c=3 → sort; try d=3: place 1, next ≥4 →4, next ≥7 →8 → 3 cows ✓; d=4: 1,8 only 2 ✗ → answer 3",
    approaches: [
      {
        title: "Try every distance",
        tier: "Brute Force",
        idea: "For each candidate distance, greedily check feasibility.",
        steps: ["Sort stalls", "For d from 1..range", "Return last feasible d"],
        time: "O(range · n)",
        space: "O(1)",
      },
      {
        title: "Binary search on distance",
        tier: "Optimal",
        idea: "Sort, then binary-search d in [1, max−min]; maximize feasible d.",
        steps: [
          "can(d): place at stalls[0], advance when gap ≥ d, count cows",
          "If can(mid) record and search right (bigger d), else left",
        ],
        time: "O(n log n + n · log(range))",
        space: "O(1)",
      },
    ],
    dryRun: "stalls=[1,2,8,4,9] c=3 → sorted [1,2,4,8,9]; d=3 feasible (1,4,8); d=4 not → 3",
    interviewTips: [
      "Sort first — the greedy placement relies on order.",
      "This is the maximisation flavour: on success move lo up, not hi down.",
    ],
    commonMistakes: ["Forgetting to sort.", "Searching for min instead of max (wrong bound update)."],
    followUps: ["Minimise the maximum gap instead (different objective)."],
    related: ["allocate-minimum-number-of-pages", "split-array-largest-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def aggressive_cows(stalls, c):
    stalls.sort()
    def can(d):
        count, last = 1, stalls[0]
        for p in stalls[1:]:
            if p - last >= d:
                count += 1
                last = p
        return count >= c

    lo, hi, ans = 1, stalls[-1] - stalls[0], 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can(mid):
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private boolean can(int[] stalls, int c, int d) {
        int count = 1, last = stalls[0];
        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= d) { count++; last = stalls[i]; }
        }
        return count >= c;
    }
    public int aggressiveCows(int[] stalls, int c) {
        Arrays.sort(stalls);
        int lo = 1, hi = stalls[stalls.length - 1] - stalls[0], ans = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(stalls, c, mid)) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function aggressiveCows(stalls, c) {
  stalls.sort((a, b) => a - b);
  const can = (d) => {
    let count = 1, last = stalls[0];
    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - last >= d) { count++; last = stalls[i]; }
    }
    return count >= c;
  };
  let lo = 1, hi = stalls[stalls.length - 1] - stalls[0], ans = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (can(mid)) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Boolean can(List<Integer> stalls, Integer c, Integer d) {
        Integer count = 1, last = stalls[0];
        for (Integer i = 1; i < stalls.size(); i++) {
            if (stalls[i] - last >= d) { count++; last = stalls[i]; }
        }
        return count >= c;
    }
    public static Integer aggressiveCows(List<Integer> stalls, Integer c) {
        stalls.sort();
        Integer lo = 1, hi = stalls[stalls.size() - 1] - stalls[0], ans = 0;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (can(stalls, c, mid)) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "allocate-minimum-number-of-pages",
    title: "Allocate Minimum Number of Pages",
    difficulty: "Hard",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays", "Greedy"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given `books[]` page counts and `m` students, allocate contiguous books to students so each student gets ≥1 book and the maximum pages assigned to any student is minimised. Return that minimum. Return −1 if m > number of books.",
    beginnerExplanation:
      "Guess a page limit. With a generous limit one student can take many books, so you need few students; with a tight limit you need many. Fewer-students-needed shrinks as the limit grows — monotonic — so binary-search the limit and greedily count students.",
    realWorldAnalogy:
      "Splitting a pile of chores among people so the busiest person's load is as light as possible. You test 'can everyone stay under load L?' and push L down.",
    visualExplanation:
      "books=[12,34,67,90] m=2 → answer 113: [12,34,67]=113 | [90]=90 → max 113, the smallest achievable",
    approaches: [
      {
        title: "Try every page limit",
        tier: "Brute Force",
        idea: "From max(books) to sum(books), find first limit needing ≤ m students.",
        steps: ["For L in [max..sum]", "Count students greedily", "Return first feasible"],
        time: "O(sum · n)",
        space: "O(1)",
      },
      {
        title: "Binary search on the max-pages limit",
        tier: "Optimal",
        idea: "lo=max(books), hi=sum(books); studentsNeeded(L) greedily, minimise feasible L.",
        steps: [
          "If m > n → -1",
          "studentsNeeded(L): new student when adding a book exceeds L",
          "If needed ≤ m search left, else right",
        ],
        time: "O(n · log(sum))",
        space: "O(1)",
      },
    ],
    dryRun: "books=[12,34,67,90] m=2 → L=113 needs 2 students ✓; L=112 needs 3 ✗ → 113",
    interviewTips: [
      "Identical structure to 'Split Array Largest Sum' and 'Ship Within D Days' — name the family.",
      "lo=max(books) because a single book can't be split.",
    ],
    commonMistakes: ["Allowing a student to exceed L.", "Missing the m>n impossibility case."],
    followUps: ["Painter's partition problem is the same recurrence."],
    related: ["split-array-largest-sum", "capacity-to-ship-packages-within-d-days"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def allocate_books(books, m):
    if m > len(books):
        return -1

    def students(limit):
        count, cur = 1, 0
        for b in books:
            if cur + b > limit:
                count += 1
                cur = 0
            cur += b
        return count

    lo, hi, ans = max(books), sum(books), -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if students(mid) <= m:
            ans = mid
            hi = mid - 1
        else:
            lo = mid + 1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int students(int[] books, int limit) {
        int count = 1, cur = 0;
        for (int b : books) {
            if (cur + b > limit) { count++; cur = 0; }
            cur += b;
        }
        return count;
    }
    public int findPages(int[] books, int m) {
        if (m > books.length) return -1;
        int lo = 0, hi = 0, ans = -1;
        for (int b : books) { lo = Math.max(lo, b); hi += b; }
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (students(books, mid) <= m) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findPages(books, m) {
  if (m > books.length) return -1;
  const students = (limit) => {
    let count = 1, cur = 0;
    for (const b of books) {
      if (cur + b > limit) { count++; cur = 0; }
      cur += b;
    }
    return count;
  };
  let lo = Math.max(...books), hi = books.reduce((a, b) => a + b, 0), ans = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (students(mid) <= m) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer studentsNeeded(List<Integer> books, Integer limit) {
        Integer count = 1, cur = 0;
        for (Integer b : books) {
            if (cur + b > limit) { count++; cur = 0; }
            cur += b;
        }
        return count;
    }
    public static Integer findPages(List<Integer> books, Integer m) {
        if (m > books.size()) return -1;
        Integer lo = 0, hi = 0, ans = -1;
        for (Integer b : books) { lo = Math.max(lo, b); hi += b; }
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (studentsNeeded(books, mid) <= m) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "split-array-largest-sum",
    title: "Split Array Largest Sum",
    difficulty: "Hard",
    patterns: ["binary-search", "dynamic-programming"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "google", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Split `nums` into `k` non-empty contiguous subarrays to minimise the largest subarray sum. Return that minimised largest sum.",
    beginnerExplanation:
      "Identical in spirit to the book-allocation problem: guess a cap on a subarray's sum; a bigger cap needs fewer pieces. Binary-search the cap and greedily count how many pieces you'd need.",
    realWorldAnalogy:
      "Breaking a long conveyor of parcels into k bins so the heaviest bin is as light as possible.",
    visualExplanation:
      "nums=[7,2,5,10,8] k=2 → answer 18: [7,2,5]=14 | [10,8]=18 → max 18 (smallest possible)",
    approaches: [
      {
        title: "Try every cap",
        tier: "Brute Force",
        idea: "From max to sum, find the first cap needing ≤ k pieces.",
        steps: ["For cap in [max..sum]", "Count pieces", "Return first feasible"],
        time: "O(sum · n)",
        space: "O(1)",
      },
      {
        title: "Binary search on the largest-sum cap",
        tier: "Optimal",
        idea: "lo=max(nums), hi=sum(nums); piecesNeeded(cap) greedy; minimise feasible cap.",
        steps: ["piecesNeeded(cap): new piece when overflow", "Shrink to smallest feasible cap"],
        time: "O(n · log(sum))",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[1,2,3,4,5] k=2 → cap 9 → [1,2,3]?=6,[4,5]=9 → 2 pieces ✓; cap 8 → 3 pieces ✗ → 9",
    interviewTips: [
      "Recognise it as the same family as Allocate Pages / Ship Within D Days.",
      "There is also an O(n·k) DP; mention it but prefer binary search.",
    ],
    commonMistakes: ["lo too small (must be max(nums)).", "Counting pieces off by one."],
    followUps: ["The O(n²k) DP formulation for small k."],
    related: ["allocate-minimum-number-of-pages", "capacity-to-ship-packages-within-d-days"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def split_array(nums, k):
    def pieces(cap):
        count, cur = 1, 0
        for x in nums:
            if cur + x > cap:
                count += 1
                cur = 0
            cur += x
        return count

    lo, hi, ans = max(nums), sum(nums), 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if pieces(mid) <= k:
            ans = mid
            hi = mid - 1
        else:
            lo = mid + 1
    return ans`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int pieces(int[] nums, int cap) {
        int count = 1, cur = 0;
        for (int x : nums) {
            if (cur + x > cap) { count++; cur = 0; }
            cur += x;
        }
        return count;
    }
    public int splitArray(int[] nums, int k) {
        int lo = 0, hi = 0, ans = 0;
        for (int x : nums) { lo = Math.max(lo, x); hi += x; }
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (pieces(nums, mid) <= k) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function splitArray(nums, k) {
  const pieces = (cap) => {
    let count = 1, cur = 0;
    for (const x of nums) {
      if (cur + x > cap) { count++; cur = 0; }
      cur += x;
    }
    return count;
  };
  let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b, 0), ans = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (pieces(mid) <= k) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer pieces(List<Integer> nums, Integer cap) {
        Integer count = 1, cur = 0;
        for (Integer x : nums) {
            if (cur + x > cap) { count++; cur = 0; }
            cur += x;
        }
        return count;
    }
    public static Integer splitArray(List<Integer> nums, Integer k) {
        Integer lo = 0, hi = 0, ans = 0;
        for (Integer x : nums) { lo = Math.max(lo, x); hi += x; }
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (pieces(nums, mid) <= k) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "kth-missing-positive-number",
    title: "Kth Missing Positive Number",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a strictly increasing array `arr` of positive integers and an integer `k`, return the kth positive integer missing from `arr`.",
    beginnerExplanation:
      "At index i, the count of missing numbers before arr[i] is arr[i] − (i+1). That count only grows, so binary-search the first index where the missing count reaches k; the answer is that index plus k.",
    realWorldAnalogy:
      "Reading house numbers on a street with gaps and asking 'what's the kth missing number?' — the gap size so far tells you how far to jump.",
    visualExplanation:
      "arr=[2,3,4,7,11] k=5 → missing before each: 1,1,1,3,6 → first index with missing≥5 is 4 → answer lo+k where lo=4 → 4+5=9",
    approaches: [
      {
        title: "Walk the integers",
        tier: "Brute Force",
        idea: "Count missing numbers one by one until you reach the kth.",
        steps: ["Iterate candidates", "Skip ones present in arr", "Return the kth missing"],
        time: "O(n + k)",
        space: "O(1)",
      },
      {
        title: "Binary search on missing count",
        tier: "Optimal",
        idea: "missing(i)=arr[i]−(i+1) is monotonic; find first index where missing ≥ k.",
        steps: ["lo=0, hi=n−1", "If arr[mid]−(mid+1) < k → lo=mid+1 else hi=mid−1", "Answer = lo + k"],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "arr=[2,3,4,7,11] k=5 → converges lo=4 → 4+5 = 9",
    interviewTips: [
      "Deriving missing(i)=arr[i]−(i+1) is the whole trick — say it out loud.",
      "The final answer 'lo + k' surprises people; justify it from the invariant.",
    ],
    commonMistakes: ["Off-by-one in the missing formula.", "Returning arr value instead of lo+k."],
    followUps: ["Kth missing in an unsorted array (use a set / sort first)."],
    related: ["binary-search", "missing-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_kth_positive(arr, k):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        missing = arr[mid] - (mid + 1)
        if missing < k:
            lo = mid + 1
        else:
            hi = mid - 1
    return lo + k`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findKthPositive(int[] arr, int k) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int missing = arr[mid] - (mid + 1);
            if (missing < k) lo = mid + 1;
            else hi = mid - 1;
        }
        return lo + k;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findKthPositive(arr, k) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const missing = arr[mid] - (mid + 1);
    if (missing < k) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo + k;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findKthPositive(List<Integer> arr, Integer k) {
        Integer lo = 0, hi = arr.size() - 1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            Integer missing = arr[mid] - (mid + 1);
            if (missing < k) lo = mid + 1;
            else hi = mid - 1;
        }
        return lo + k;
    }
}`,
      },
    ],
  },
  {
    slug: "find-first-and-last-position-of-element-in-sorted-array",
    title: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given a sorted array `nums` and a `target`, return the first and last index of target as `[first, last]`, or `[-1, -1]` if absent. Must run in O(log n).",
    beginnerExplanation:
      "Run binary search twice: once biased to keep going left after a match (to find the first occurrence), once biased right (to find the last). Two log-n passes give both boundaries.",
    realWorldAnalogy:
      "Finding where a repeated word first and last appears in a sorted index — you don't scan the block, you binary-search each edge.",
    visualExplanation:
      "nums=[5,7,7,8,8,10] target=8 → lower-bound finds index 3, upper-bound finds index 4 → [3,4]",
    approaches: [
      {
        title: "Linear scan",
        tier: "Brute Force",
        idea: "Walk to find first and last occurrence.",
        steps: ["Scan for first match", "Scan for last match"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Two boundary binary searches",
        tier: "Optimal",
        idea: "findBound(leftBiased): on equality, record and continue toward the wanted side.",
        steps: [
          "First: when nums[mid]==target record and search left half",
          "Last: when nums[mid]==target record and search right half",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[2,2] target=2 → first: keeps going left → 0; last: keeps going right → 1 → [0,1]",
    interviewTips: [
      "Factor a single helper parameterised by left/right bias — cleaner than duplicating.",
      "Equivalent to lower_bound / upper_bound; mention the STL parallel.",
    ],
    commonMistakes: ["Not continuing the search after a match.", "Returning mid immediately (gives any index, not the boundary)."],
    followUps: ["Count occurrences = last − first + 1.", "Search insert position (lower bound)."],
    related: ["binary-search", "search-insert-position"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def search_range(nums, target):
    def bound(left_biased):
        lo, hi, res = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                res = mid
                if left_biased:
                    hi = mid - 1
                else:
                    lo = mid + 1
            elif nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return res

    return [bound(True), bound(False)]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int bound(int[] nums, int target, boolean leftBiased) {
        int lo = 0, hi = nums.length - 1, res = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                res = mid;
                if (leftBiased) hi = mid - 1; else lo = mid + 1;
            } else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return res;
    }
    public int[] searchRange(int[] nums, int target) {
        return new int[] { bound(nums, target, true), bound(nums, target, false) };
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function searchRange(nums, target) {
  const bound = (leftBiased) => {
    let lo = 0, hi = nums.length - 1, res = -1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (nums[mid] === target) {
        res = mid;
        if (leftBiased) hi = mid - 1; else lo = mid + 1;
      } else if (nums[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    return res;
  };
  return [bound(true), bound(false)];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer bound(List<Integer> nums, Integer target, Boolean leftBiased) {
        Integer lo = 0, hi = nums.size() - 1, res = -1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                res = mid;
                if (leftBiased) hi = mid - 1; else lo = mid + 1;
            } else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return res;
    }
    public static List<Integer> searchRange(List<Integer> nums, Integer target) {
        return new List<Integer>{ bound(nums, target, true), bound(nums, target, false) };
    }
}`,
      },
    ],
  },
  {
    slug: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a sorted array of distinct integers and a `target`, return the index if found, otherwise the index where it would be inserted to keep the array sorted. O(log n).",
    beginnerExplanation:
      "This is exactly the 'lower bound': the first index whose value is ≥ target. Binary-search for that boundary; if target exists you land on it, otherwise on its insertion slot.",
    realWorldAnalogy:
      "Slotting a new card into a sorted hand — you binary-search for the first card not smaller than yours and insert there.",
    visualExplanation: "nums=[1,3,5,6] target=5 → index 2; target=2 → index 1; target=7 → index 4",
    approaches: [
      {
        title: "Linear scan",
        tier: "Brute Force",
        idea: "Walk until you find a value ≥ target.",
        steps: ["Scan left to right", "Return first index with nums[i] ≥ target", "Else n"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Lower-bound binary search",
        tier: "Optimal",
        idea: "Search [0, n] for the first index with nums[mid] ≥ target.",
        steps: ["lo=0, hi=n", "If nums[mid] < target → lo=mid+1 else hi=mid", "Return lo"],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[1,3,5,6] target=2 → lo0 hi4 mid2(5≥2 hi2); mid1(3≥2 hi1); mid0(1<2 lo1) → 1",
    interviewTips: [
      "Use the half-open [lo, hi=n] form so the insert-at-end case falls out naturally.",
      "Call it lower_bound — it's the building block for many BS problems.",
    ],
    commonMistakes: ["Setting hi=n-1 (misses insertion at the end).", "Using <= with hi=n (out of range)."],
    followUps: ["Upper bound (first index strictly greater).", "First/last position of a value."],
    related: ["binary-search", "find-first-and-last-position-of-element-in-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def search_insert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function searchInsert(nums, target) {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer searchInsert(List<Integer> nums, Integer target) {
        Integer lo = 0, hi = nums.size();
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      },
    ],
  },
  {
    slug: "find-peak-element-ii",
    title: "Find Peak Element II",
    difficulty: "Hard",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Matrix"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an `m x n` grid where no two adjacent cells are equal, find any peak — a cell strictly greater than its up/down/left/right neighbours — and return its coordinates. Aim for O(m log n).",
    beginnerExplanation:
      "Binary-search the columns. In the middle column find the row holding that column's maximum. If that cell beats its left and right neighbours it's a peak; otherwise a bigger neighbour lies toward one side, and a peak is guaranteed in that half — recurse there.",
    realWorldAnalogy:
      "Hiking toward higher ground: stand on the tallest point of the middle ridge; whichever side rises higher, a summit must be over there.",
    visualExplanation:
      "Pick mid column → find its max-row cell → if it's ≥ both horizontal neighbours, it's a peak; else move toward the taller side.",
    approaches: [
      {
        title: "Scan every cell",
        tier: "Brute Force",
        idea: "Check each cell against its neighbours.",
        steps: ["For each cell", "Compare with 4 neighbours", "Return first peak"],
        time: "O(m·n)",
        space: "O(1)",
      },
      {
        title: "Binary search on columns",
        tier: "Optimal",
        idea: "On the mid column take the column-max row; move toward the larger horizontal neighbour.",
        steps: [
          "lo=0, hi=cols-1",
          "row = argmax over column mid",
          "If cell ≥ left and right → peak; else go to the bigger side",
        ],
        time: "O(m · log n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "mat=[[1,4],[3,2]] → mid col 0 → column max is row1 (3); right neighbour mat[1][1]=2<3 → peak at [1,0]",
    interviewTips: [
      "The guarantee 'a peak exists toward the taller neighbour' is what makes binary search valid — state it.",
      "Treat out-of-grid neighbours as −∞.",
    ],
    commonMistakes: [
      "Searching rows and columns both (loses the log factor / breaks the invariant).",
      "Not taking the column maximum before comparing horizontally.",
    ],
    followUps: ["1-D Find Peak Element.", "Return all peaks."],
    related: ["binary-search", "find-peak-element"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_peak_grid(mat):
    rows, cols = len(mat), len(mat[0])
    lo, hi = 0, cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        best = 0
        for r in range(rows):
            if mat[r][mid] > mat[best][mid]:
                best = r
        left = mat[best][mid - 1] if mid > 0 else -1
        right = mat[best][mid + 1] if mid < cols - 1 else -1
        if mat[best][mid] > left and mat[best][mid] > right:
            return [best, mid]
        elif left > mat[best][mid]:
            hi = mid - 1
        else:
            lo = mid + 1
    return [-1, -1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] findPeakGrid(int[][] mat) {
        int rows = mat.length, cols = mat[0].length;
        int lo = 0, hi = cols - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2, best = 0;
            for (int r = 0; r < rows; r++) if (mat[r][mid] > mat[best][mid]) best = r;
            int left = mid > 0 ? mat[best][mid - 1] : -1;
            int right = mid < cols - 1 ? mat[best][mid + 1] : -1;
            if (mat[best][mid] > left && mat[best][mid] > right) return new int[] { best, mid };
            else if (left > mat[best][mid]) hi = mid - 1;
            else lo = mid + 1;
        }
        return new int[] { -1, -1 };
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findPeakGrid(mat) {
  const rows = mat.length, cols = mat[0].length;
  let lo = 0, hi = cols - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    let best = 0;
    for (let r = 0; r < rows; r++) if (mat[r][mid] > mat[best][mid]) best = r;
    const left = mid > 0 ? mat[best][mid - 1] : -1;
    const right = mid < cols - 1 ? mat[best][mid + 1] : -1;
    if (mat[best][mid] > left && mat[best][mid] > right) return [best, mid];
    else if (left > mat[best][mid]) hi = mid - 1;
    else lo = mid + 1;
  }
  return [-1, -1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> findPeakGrid(List<List<Integer>> mat) {
        Integer rows = mat.size(), cols = mat[0].size();
        Integer lo = 0, hi = cols - 1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2, best = 0;
            for (Integer r = 0; r < rows; r++) if (mat[r][mid] > mat[best][mid]) best = r;
            Integer left = mid > 0 ? mat[best][mid - 1] : -1;
            Integer right = mid < cols - 1 ? mat[best][mid + 1] : -1;
            if (mat[best][mid] > left && mat[best][mid] > right) return new List<Integer>{ best, mid };
            else if (left > mat[best][mid]) hi = mid - 1;
            else lo = mid + 1;
        }
        return new List<Integer>{ -1, -1 };
    }
}`,
      },
    ],
  },
  {
    slug: "kth-element-of-two-sorted-arrays",
    title: "Kth Element of Two Sorted Arrays",
    difficulty: "Hard",
    patterns: ["binary-search"],
    topics: ["Binary Search", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given two sorted arrays `a` and `b`, return the kth smallest element (1-indexed) of their combined order, in O(log(min(n, m))).",
    beginnerExplanation:
      "Binary-search a partition of the smaller array: take `cut1` elements from `a` and `k − cut1` from `b`. The partition is correct when the largest on each left side doesn't exceed the smallest on the other's right side; then the answer is the max of the two left edges.",
    realWorldAnalogy:
      "Interleaving two sorted card piles and stopping at the kth card — you guess how many to take from each pile and adjust until the cut is consistent.",
    visualExplanation:
      "a=[2,3,6,7,9] b=[1,4,8,10] k=5 → partition so 5 elements are on the left across both; answer = max(left1,left2)=6",
    approaches: [
      {
        title: "Merge until k",
        tier: "Brute Force",
        idea: "Two-pointer merge, stop after popping k elements.",
        steps: ["Walk both arrays in order", "Count to k", "Return the kth popped"],
        time: "O(k)",
        space: "O(1)",
      },
      {
        title: "Binary search the partition",
        tier: "Optimal",
        idea: "Search cut1 in the smaller array within [max(0,k−m), min(k,n)]; balance the two halves.",
        steps: [
          "Ensure a is the shorter array",
          "cut1=mid, cut2=k−cut1; compute l1,l2,r1,r2 with ±∞ sentinels",
          "If l1≤r2 and l2≤r1 → answer max(l1,l2); else move the cut",
        ],
        time: "O(log(min(n, m)))",
        space: "O(1)",
      },
    ],
    dryRun:
      "a=[2,3,6,7,9] b=[1,4,8,10] k=5 → settles on cut1=2 (a:2,3) cut2=3 (b:1,4,8)? adjust until l1≤r2 & l2≤r1 → answer 6",
    interviewTips: [
      "Always binary-search the SHORTER array so the range is O(log min(n,m)).",
      "Use ±∞ sentinels for the empty-side edges to avoid branchy index checks.",
    ],
    commonMistakes: [
      "Wrong cut1 range (must be [max(0,k−m), min(k,n)]).",
      "Mixing 0- and 1-indexed k.",
    ],
    followUps: ["Median of two sorted arrays is k = (n+m)/2 (and the average for even total)."],
    related: ["median-of-two-sorted-arrays", "binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def kth_element(a, b, k):
    if len(a) > len(b):
        return kth_element(b, a, k)
    n, m = len(a), len(b)
    lo, hi = max(0, k - m), min(k, n)
    INF = float("inf")
    while lo <= hi:
        cut1 = (lo + hi) // 2
        cut2 = k - cut1
        l1 = a[cut1 - 1] if cut1 > 0 else -INF
        l2 = b[cut2 - 1] if cut2 > 0 else -INF
        r1 = a[cut1] if cut1 < n else INF
        r2 = b[cut2] if cut2 < m else INF
        if l1 <= r2 and l2 <= r1:
            return max(l1, l2)
        elif l1 > r2:
            hi = cut1 - 1
        else:
            lo = cut1 + 1
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int kthElement(int[] a, int[] b, int k) {
        if (a.length > b.length) return kthElement(b, a, k);
        int n = a.length, m = b.length;
        int lo = Math.max(0, k - m), hi = Math.min(k, n);
        while (lo <= hi) {
            int cut1 = lo + (hi - lo) / 2, cut2 = k - cut1;
            int l1 = cut1 > 0 ? a[cut1 - 1] : Integer.MIN_VALUE;
            int l2 = cut2 > 0 ? b[cut2 - 1] : Integer.MIN_VALUE;
            int r1 = cut1 < n ? a[cut1] : Integer.MAX_VALUE;
            int r2 = cut2 < m ? b[cut2] : Integer.MAX_VALUE;
            if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
            else if (l1 > r2) hi = cut1 - 1;
            else lo = cut1 + 1;
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function kthElement(a, b, k) {
  if (a.length > b.length) return kthElement(b, a, k);
  const n = a.length, m = b.length;
  let lo = Math.max(0, k - m), hi = Math.min(k, n);
  while (lo <= hi) {
    const cut1 = Math.floor((lo + hi) / 2), cut2 = k - cut1;
    const l1 = cut1 > 0 ? a[cut1 - 1] : -Infinity;
    const l2 = cut2 > 0 ? b[cut2 - 1] : -Infinity;
    const r1 = cut1 < n ? a[cut1] : Infinity;
    const r2 = cut2 < m ? b[cut2] : Infinity;
    if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
    else if (l1 > r2) hi = cut1 - 1;
    else lo = cut1 + 1;
  }
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer kthElement(List<Integer> a, List<Integer> b, Integer k) {
        if (a.size() > b.size()) return kthElement(b, a, k);
        Integer n = a.size(), m = b.size();
        Integer lo = Math.max(0, k - m), hi = Math.min(k, n);
        Integer NEG = -2147483648, POS = 2147483647;
        while (lo <= hi) {
            Integer cut1 = lo + (hi - lo) / 2, cut2 = k - cut1;
            Integer l1 = cut1 > 0 ? a[cut1 - 1] : NEG;
            Integer l2 = cut2 > 0 ? b[cut2 - 1] : NEG;
            Integer r1 = cut1 < n ? a[cut1] : POS;
            Integer r2 = cut2 < m ? b[cut2] : POS;
            if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
            else if (l1 > r2) hi = cut1 - 1;
            else lo = cut1 + 1;
        }
        return -1;
    }
}`,
      },
    ],
  },
];

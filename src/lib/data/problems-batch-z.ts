import type { Problem } from "@/lib/types";

// Sliding Window & Two Pointers — Striver A2Z gaps.
export const PROBLEMS_BATCH_Z: Problem[] = [
  {
    slug: "max-consecutive-ones-iii",
    title: "Max Consecutive Ones III",
    difficulty: "Medium",
    patterns: ["sliding-window"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a binary array `nums` and an integer `k`, return the length of the longest subarray containing only 1s after flipping at most `k` zeros.",
    beginnerExplanation:
      "Slide a window that is allowed to contain at most k zeros. Grow the right edge; whenever the window holds more than k zeros, shrink from the left until it's valid again. The widest window you ever held is the answer.",
    realWorldAnalogy:
      "You're patching a fence and have k spare planks. You walk along looking for the longest run you can make solid — each gap costs one plank, and once you run out you must start dropping the earliest section.",
    visualExplanation:
      "nums = [1,1,0,0,1,1,1,0,1], k = 2\nwindow keeps <= 2 zeros; widest valid window length = 6",
    approaches: [
      {
        title: "Check every subarray",
        tier: "Brute Force",
        idea: "For each subarray, count zeros and check it is <= k.",
        steps: ["Enumerate all subarrays", "Count zeros; keep those with zeros <= k"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "Sliding window on zero count",
        tier: "Optimal",
        idea: "Maintain a window with at most k zeros, shrinking left when it overflows.",
        steps: [
          "Expand right; if nums[right] == 0 increment zeros",
          "While zeros > k, if nums[left] == 0 decrement zeros, left++",
          "Track the largest window length",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "Keep a running zero count in [left,right]; whenever it exceeds k, advance left past a zero. Track max length.",
    interviewTips: [
      "Identify it as a variable-size window keyed on a single constraint (zeros <= k).",
      "Note it is the same template as 'longest subarray with at most K of something'.",
    ],
    commonMistakes: ["Forgetting to only decrement zeros when the dropped element is a 0.", "Off-by-one in window length."],
    followUps: ["Return the actual subarray.", "What if you could also flip 1s to 0s?"],
    related: ["longest-repeating-character-replacement", "fruit-into-baskets"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_ones(nums, k):
    left = zeros = best = 0
    for right, v in enumerate(nums):
        if v == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, zeros = 0, best = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestOnes(nums, k) {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestOnes(List<Integer> nums, Integer k) {
        Integer left = 0, zeros = 0, best = 0;
        for (Integer right = 0; right < nums.size(); right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "fruit-into-baskets",
    title: "Fruit Into Baskets",
    difficulty: "Medium",
    patterns: ["sliding-window", "hashing"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "You have two baskets, each holding a single type of fruit. Given `fruits` where `fruits[i]` is the type on tree `i`, pick from a contiguous run of trees. Return the maximum number of fruits you can collect — i.e. the longest subarray with at most 2 distinct values.",
    beginnerExplanation:
      "It's 'longest subarray with at most 2 distinct numbers'. Slide a window keeping a count of each type inside it; when a third type appears, shrink from the left until only two remain.",
    realWorldAnalogy:
      "Walking down a row of fruit trees with two baskets. You keep collecting until a third kind of fruit shows up — then you must stop and dump the earliest trees from your run.",
    visualExplanation:
      "fruits = [1,2,3,2,2], window of at most 2 types\nbest window = [3,2,2] -> length 3",
    approaches: [
      {
        title: "Try every starting tree",
        tier: "Brute Force",
        idea: "From each start, extend until a third type appears.",
        steps: ["For each start i", "Extend while distinct types <= 2"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "Window with a count map",
        tier: "Optimal",
        idea: "Keep a frequency map of types in the window; shrink while more than 2 keys.",
        steps: [
          "Add fruits[right] to the map",
          "While map has > 2 keys, decrement fruits[left] (drop the key at 0), left++",
          "Track widest window",
        ],
        time: "O(n)",
        space: "O(1) (at most 3 keys)",
      },
    ],
    dryRun: "Maintain counts of the <=2 types in [left,right]; when a 3rd type enters, advance left until one type's count hits 0.",
    interviewTips: ["Generalises to 'at most K distinct' — same template with K instead of 2."],
    commonMistakes: ["Not deleting a key when its count reaches 0, so the distinct check breaks."],
    followUps: ["At most K baskets.", "Return which trees were picked."],
    related: ["longest-substring-with-at-most-k-distinct-characters", "longest-subarray-with-at-most-two-distinct"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def total_fruit(fruits):
    count = {}
    left = best = 0
    for right, f in enumerate(fruits):
        count[f] = count.get(f, 0) + 1
        while len(count) > 2:
            count[fruits[left]] -= 1
            if count[fruits[left]] == 0:
                del count[fruits[left]]
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < fruits.length; right++) {
            count.merge(fruits[right], 1, Integer::sum);
            while (count.size() > 2) {
                int lf = fruits[left];
                count.put(lf, count.get(lf) - 1);
                if (count.get(lf) == 0) count.remove(lf);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function totalFruit(fruits) {
  const count = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < fruits.length; right++) {
    count.set(fruits[right], (count.get(fruits[right]) || 0) + 1);
    while (count.size > 2) {
      const lf = fruits[left];
      count.set(lf, count.get(lf) - 1);
      if (count.get(lf) === 0) count.delete(lf);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer totalFruit(List<Integer> fruits) {
        Map<Integer, Integer> count = new Map<Integer, Integer>();
        Integer left = 0, best = 0;
        for (Integer right = 0; right < fruits.size(); right++) {
            Integer f = fruits[right];
            count.put(f, (count.containsKey(f) ? count.get(f) : 0) + 1);
            while (count.size() > 2) {
                Integer lf = fruits[left];
                count.put(lf, count.get(lf) - 1);
                if (count.get(lf) == 0) count.remove(lf);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "binary-subarrays-with-sum",
    title: "Binary Subarrays With Sum",
    difficulty: "Medium",
    patterns: ["sliding-window", "prefix-sum"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["google", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a binary array `nums` and an integer `goal`, return the number of non-empty subarrays whose sum equals `goal`.",
    beginnerExplanation:
      "Counting subarrays with an EXACT sum is hard to do directly with a window (the window isn't monotonic). The trick: count subarrays with sum at most `goal`, then subtract those with sum at most `goal-1`. The difference is exactly those summing to `goal`.",
    realWorldAnalogy:
      "To count people earning exactly $50k, count everyone earning up to $50k and subtract everyone earning up to $49,999 — the leftover is exactly the $50k earners.",
    visualExplanation:
      "nums = [1,0,1,0,1], goal = 2\natMost(2) - atMost(1) = 9 - 5 = 4 subarrays",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Sum every subarray and count matches.",
        steps: ["For each start", "Extend, accumulate sum, count == goal"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "atMost(goal) - atMost(goal-1)",
        tier: "Optimal",
        idea: "Sliding-window count of subarrays with sum <= g is monotonic; subtract two of them.",
        steps: [
          "Define atMost(g): window where sum stays <= g, add (right-left+1) each step",
          "Return atMost(goal) - atMost(goal-1)",
          "Guard atMost(g<0) = 0",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "atMost(g) slides a window keeping sum<=g, adding window length each step; subtract atMost(goal-1) from atMost(goal).",
    interviewTips: [
      "The atMost(K) - atMost(K-1) identity is the key trick for 'exactly K' subarray-count problems — say it explicitly.",
    ],
    commonMistakes: ["Forgetting the goal-1 < 0 guard (returns 0).", "Trying a single window for an exact sum (not monotonic)."],
    followUps: ["Count Number of Nice Subarrays (exactly k odds) uses the same identity.", "Subarrays with K different integers."],
    related: ["count-number-of-nice-subarrays", "subarrays-with-k-different-integers"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def num_subarrays_with_sum(nums, goal):
    def at_most(g):
        if g < 0:
            return 0
        left = cur = res = 0
        for right, v in enumerate(nums):
            cur += v
            while cur > g:
                cur -= nums[left]
                left += 1
            res += right - left + 1
        return res
    return at_most(goal) - at_most(goal - 1)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return atMost(nums, goal) - atMost(nums, goal - 1);
    }
    private int atMost(int[] nums, int g) {
        if (g < 0) return 0;
        int left = 0, cur = 0, res = 0;
        for (int right = 0; right < nums.length; right++) {
            cur += nums[right];
            while (cur > g) cur -= nums[left++];
            res += right - left + 1;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numSubarraysWithSum(nums, goal) {
  const atMost = (g) => {
    if (g < 0) return 0;
    let left = 0, cur = 0, res = 0;
    for (let right = 0; right < nums.length; right++) {
      cur += nums[right];
      while (cur > g) cur -= nums[left++];
      res += right - left + 1;
    }
    return res;
  };
  return atMost(goal) - atMost(goal - 1);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer numSubarraysWithSum(List<Integer> nums, Integer goal) {
        return atMost(nums, goal) - atMost(nums, goal - 1);
    }
    private static Integer atMost(List<Integer> nums, Integer g) {
        if (g < 0) return 0;
        Integer left = 0, cur = 0, res = 0;
        for (Integer right = 0; right < nums.size(); right++) {
            cur += nums[right];
            while (cur > g) { cur -= nums[left]; left++; }
            res += right - left + 1;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "count-number-of-nice-subarrays",
    title: "Count Number of Nice Subarrays",
    difficulty: "Medium",
    patterns: ["sliding-window"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "An array is 'nice' if it contains exactly `k` odd numbers. Given `nums` and `k`, return the number of nice subarrays.",
    beginnerExplanation:
      "Treat each odd number as a 1 and each even as a 0 — then 'exactly k odds' becomes 'sum exactly k'. Use the atMost(k) - atMost(k-1) trick: count subarrays with at most k odds, minus those with at most k-1.",
    realWorldAnalogy:
      "Same accounting trick as before: count groups with up to k odd members, subtract groups with up to k-1 — what's left has exactly k.",
    visualExplanation: "nums = [1,1,2,1,1], k = 3\natMost(3) - atMost(2) = 2 nice subarrays",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Count odds in every subarray.",
        steps: ["For each start", "Extend, count odds, match == k"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "atMost(k) - atMost(k-1) on odd count",
        tier: "Optimal",
        idea: "Window keeping odd count <= K is monotonic; subtract two such counts.",
        steps: [
          "atMost(K): slide window keeping #odds <= K, add window length each step",
          "Return atMost(k) - atMost(k-1)",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "Map odd->1, even->0; this becomes Binary Subarrays With Sum = k. atMost(k) - atMost(k-1).",
    interviewTips: ["Spot that 'exactly k of a property' over subarrays reduces to two atMost windows."],
    commonMistakes: ["Counting value instead of parity.", "Missing the k-1 < 0 guard."],
    followUps: ["Binary Subarrays With Sum is the same problem with explicit 0/1.", "Exactly k distinct values."],
    related: ["binary-subarrays-with-sum", "subarrays-with-k-different-integers"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def number_of_subarrays(nums, k):
    def at_most(K):
        if K < 0:
            return 0
        left = odd = res = 0
        for right, v in enumerate(nums):
            odd += v & 1
            while odd > K:
                odd -= nums[left] & 1
                left += 1
            res += right - left + 1
        return res
    return at_most(k) - at_most(k - 1)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private int atMost(int[] nums, int K) {
        if (K < 0) return 0;
        int left = 0, odd = 0, res = 0;
        for (int right = 0; right < nums.length; right++) {
            odd += nums[right] & 1;
            while (odd > K) odd -= nums[left++] & 1;
            res += right - left + 1;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numberOfSubarrays(nums, k) {
  const atMost = (K) => {
    if (K < 0) return 0;
    let left = 0, odd = 0, res = 0;
    for (let right = 0; right < nums.length; right++) {
      odd += nums[right] & 1;
      while (odd > K) odd -= nums[left++] & 1;
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
    public static Integer numberOfSubarrays(List<Integer> nums, Integer k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private static Integer atMost(List<Integer> nums, Integer K) {
        if (K < 0) return 0;
        Integer left = 0, odd = 0, res = 0;
        for (Integer right = 0; right < nums.size(); right++) {
            odd += Math.mod(nums[right], 2);
            while (odd > K) { odd -= Math.mod(nums[left], 2); left++; }
            res += right - left + 1;
        }
        return res;
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
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string `s` of only the characters a, b and c, return the number of substrings that contain at least one of each.",
    beginnerExplanation:
      "Track the last index at which you saw each of a, b and c. For each right end, the smallest of those three last-seen indices tells you how many valid start positions exist: every start from 0 up to that minimum forms a substring containing all three. Add (min + 1) each step.",
    realWorldAnalogy:
      "For a meal to be complete you need a starter, main and dessert. As you walk the menu, the earliest you can begin and still have all three is bounded by whichever course you saw least recently.",
    visualExplanation: 's = "abcabc"\nfor each i, add 1 + min(lastA,lastB,lastC); total = 10',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "For each substring test it has a, b and c.",
        steps: ["Enumerate substrings", "Check the 3-char set"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "Last-seen index contribution",
        tier: "Optimal",
        idea: "At each right, add 1 + min(last[a], last[b], last[c]).",
        steps: [
          "Maintain last[c] = -1 initially for a,b,c",
          "Set last[s[i]] = i; add 1 + min(last a, b, c)",
          "If any is still -1 the min is -1 and contributes 0",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "last={a:-1,b:-1,c:-1}; per index update last[ch], add 1+min(last values).",
    interviewTips: ["The 'count valid left starts via min last-seen' idea generalises to k required characters."],
    commonMistakes: ["Initialising last-seen to 0 instead of -1 (off-by-one)."],
    followUps: ["At least one of each of K required characters.", "Shortest such substring."],
    related: ["minimum-window-substring", "binary-subarrays-with-sum"],
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
        int[] last = { -1, -1, -1 };
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
            Integer m = Math.min(last.get('a'), Math.min(last.get('b'), last.get('c')));
            res += 1 + m;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-points-you-can-obtain-from-cards",
    title: "Maximum Points You Can Obtain from Cards",
    difficulty: "Medium",
    patterns: ["sliding-window"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "You take exactly `k` cards from either the front or the back of the row `cardPoints`. Return the maximum total points you can collect.",
    beginnerExplanation:
      "Taking k cards from the ends is the same as LEAVING a contiguous block of n-k cards in the middle. So maximise what you take by minimising the sum of that fixed-size middle window. Answer = total - min window sum of size n-k.",
    realWorldAnalogy:
      "You must eat k chocolates from the two ends of a box. Maximising what you eat is the same as leaving behind the cheapest contiguous middle stretch.",
    visualExplanation:
      "cardPoints = [1,2,3,4,5,6,1], k = 3, n-k = 4\nmin middle window sum = 1+2+3+4 = 10; total 22 - 10 = 12",
    approaches: [
      {
        title: "Try every split of front/back",
        tier: "Better",
        idea: "Take i from front and k-i from back for all i; track max.",
        steps: ["Prefix from front, suffix from back", "Combine for each split"],
        time: "O(k)",
        space: "O(1)",
      },
      {
        title: "Minimise the leftover middle window",
        tier: "Optimal",
        idea: "Answer = total - minimum sum of a fixed window of size n-k.",
        steps: [
          "If k == n return total",
          "Compute first window sum of size n-k, slide it tracking the min",
          "Return total - minWindow",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "window size = n-k; slide it to find min sum; answer = total - minSum.",
    interviewTips: ["Reframing 'take from ends' as 'leave a middle window' is the key insight — state it up front."],
    commonMistakes: ["Handling k == n (window size 0) — answer is the whole total.", "Sliding the wrong window size."],
    followUps: ["What if you may take fewer than k cards?", "Take from ends to maximise a product instead of sum."],
    related: ["max-consecutive-ones-iii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_score(card_points, k):
    n = len(card_points)
    total = sum(card_points)
    win = n - k
    if win == 0:
        return total
    cur = sum(card_points[:win])
    min_sub = cur
    for i in range(win, n):
        cur += card_points[i] - card_points[i - win]
        min_sub = min(min_sub, cur)
    return total - min_sub`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length, total = 0;
        for (int v : cardPoints) total += v;
        int win = n - k;
        if (win == 0) return total;
        int cur = 0;
        for (int i = 0; i < win; i++) cur += cardPoints[i];
        int minSub = cur;
        for (int i = win; i < n; i++) {
            cur += cardPoints[i] - cardPoints[i - win];
            minSub = Math.min(minSub, cur);
        }
        return total - minSub;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxScore(cardPoints, k) {
  const n = cardPoints.length;
  const total = cardPoints.reduce((a, b) => a + b, 0);
  const win = n - k;
  if (win === 0) return total;
  let cur = 0;
  for (let i = 0; i < win; i++) cur += cardPoints[i];
  let minSub = cur;
  for (let i = win; i < n; i++) {
    cur += cardPoints[i] - cardPoints[i - win];
    minSub = Math.min(minSub, cur);
  }
  return total - minSub;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxScore(List<Integer> cardPoints, Integer k) {
        Integer n = cardPoints.size(), total = 0;
        for (Integer v : cardPoints) total += v;
        Integer win = n - k;
        if (win == 0) return total;
        Integer cur = 0;
        for (Integer i = 0; i < win; i++) cur += cardPoints[i];
        Integer minSub = cur;
        for (Integer i = win; i < n; i++) {
            cur += cardPoints[i] - cardPoints[i - win];
            minSub = Math.min(minSub, cur);
        }
        return total - minSub;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-substring-with-at-most-k-distinct-characters",
    title: "Longest Substring with At Most K Distinct Characters",
    difficulty: "Medium",
    patterns: ["sliding-window", "hashing"],
    topics: ["Strings", "Sliding Window"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a string `s` and integer `k`, return the length of the longest substring containing at most `k` distinct characters.",
    beginnerExplanation:
      "Slide a window with a count map of the characters inside it. Whenever the map holds more than k distinct keys, shrink from the left (dropping keys whose count hits zero) until it's back to k. Track the widest valid window.",
    realWorldAnalogy:
      "A tasting menu where you're allowed at most k different flavours on the table at once — keep adding dishes from the right, and clear the oldest ones whenever a (k+1)-th flavour appears.",
    visualExplanation: 's = "eceba", k = 2\nlongest window with <= 2 distinct = "ece" -> length 3',
    approaches: [
      {
        title: "Every substring",
        tier: "Brute Force",
        idea: "Check distinct count of each substring.",
        steps: ["For each start", "Extend while distinct <= k"],
        time: "O(n^2)",
        space: "O(k)",
      },
      {
        title: "Window with count map",
        tier: "Optimal",
        idea: "Maintain <= k distinct keys; shrink when exceeded.",
        steps: [
          "Add s[right] to the map",
          "While map size > k, decrement s[left] (drop at 0), left++",
          "Track widest window",
        ],
        time: "O(n)",
        space: "O(k)",
      },
    ],
    dryRun: "count map over [left,right]; when distinct > k advance left until a key drops to 0; record max length.",
    interviewTips: ["This is the generalised 'Fruit Into Baskets' (k=2). Mention the connection."],
    commonMistakes: ["Not deleting zero-count keys, so the size check is wrong."],
    followUps: ["Exactly k distinct (atMost(k) - atMost(k-1)).", "Return the substring."],
    related: ["fruit-into-baskets", "subarrays-with-k-different-integers"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_k_distinct(s, k):
    count = {}
    left = best = 0
    for right, ch in enumerate(s):
        count[ch] = count.get(ch, 0) + 1
        while len(count) > k:
            count[s[left]] -= 1
            if count[s[left]] == 0:
                del count[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        Map<Character, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            count.merge(c, 1, Integer::sum);
            while (count.size() > k) {
                char lc = s.charAt(left);
                count.put(lc, count.get(lc) - 1);
                if (count.get(lc) == 0) count.remove(lc);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lengthOfLongestSubstringKDistinct(s, k) {
  const count = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    count.set(c, (count.get(c) || 0) + 1);
    while (count.size > k) {
      const lc = s[left];
      count.set(lc, count.get(lc) - 1);
      if (count.get(lc) === 0) count.delete(lc);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lengthOfLongestSubstringKDistinct(String s, Integer k) {
        Map<String, Integer> count = new Map<String, Integer>();
        Integer left = 0, best = 0;
        for (Integer right = 0; right < s.length(); right++) {
            String c = s.substring(right, right + 1);
            count.put(c, (count.containsKey(c) ? count.get(c) : 0) + 1);
            while (count.size() > k) {
                String lc = s.substring(left, left + 1);
                count.put(lc, count.get(lc) - 1);
                if (count.get(lc) == 0) count.remove(lc);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "subarrays-with-k-different-integers",
    title: "Subarrays with K Different Integers",
    difficulty: "Hard",
    patterns: ["sliding-window", "hashing"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer array `nums` and an integer `k`, return the number of subarrays containing exactly `k` distinct integers.",
    beginnerExplanation:
      "Exactly k distinct is hard to window directly, but 'at most k distinct' is monotonic. So count subarrays with at most k distinct and subtract those with at most k-1 — the difference has exactly k.",
    realWorldAnalogy:
      "Count playlists using up to k genres, subtract playlists using up to k-1 genres — what remains uses exactly k.",
    visualExplanation: "nums = [1,2,1,2,3], k = 2\natMost(2) - atMost(1) = 12 - 5 = 7 subarrays",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Count distinct in each subarray.",
        steps: ["For each start, extend tracking a set", "Count == k"],
        time: "O(n^2)",
        space: "O(k)",
      },
      {
        title: "atMost(k) - atMost(k-1)",
        tier: "Optimal",
        idea: "Window counting subarrays with <= K distinct (monotonic), subtract two of them.",
        steps: [
          "atMost(K): window keeping distinct <= K, add (right-left+1) each step",
          "Return atMost(k) - atMost(k-1)",
        ],
        time: "O(n)",
        space: "O(k)",
      },
    ],
    dryRun: "atMost(K) slides a window keeping distinct<=K and accumulates window lengths; subtract atMost(k-1) from atMost(k).",
    interviewTips: ["Same atMost identity as Binary Subarrays With Sum / Nice Subarrays — recognise the family."],
    commonMistakes: ["Trying to window 'exactly k' directly (not monotonic).", "Not removing zero-count keys."],
    followUps: ["Exactly k odds (Nice Subarrays).", "Longest (not count) subarray with exactly k distinct."],
    related: ["binary-subarrays-with-sum", "count-number-of-nice-subarrays"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subarrays_with_k_distinct(nums, k):
    def at_most(K):
        count = {}
        left = res = 0
        for right, v in enumerate(nums):
            count[v] = count.get(v, 0) + 1
            while len(count) > K:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    del count[nums[left]]
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
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private int atMost(int[] nums, int K) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, res = 0;
        for (int right = 0; right < nums.length; right++) {
            count.merge(nums[right], 1, Integer::sum);
            while (count.size() > K) {
                count.put(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) == 0) count.remove(nums[left]);
                left++;
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
        code: `function subarraysWithKDistinct(nums, k) {
  const atMost = (K) => {
    const count = new Map();
    let left = 0, res = 0;
    for (let right = 0; right < nums.length; right++) {
      count.set(nums[right], (count.get(nums[right]) || 0) + 1);
      while (count.size > K) {
        count.set(nums[left], count.get(nums[left]) - 1);
        if (count.get(nums[left]) === 0) count.delete(nums[left]);
        left++;
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
    public static Integer subarraysWithKDistinct(List<Integer> nums, Integer k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private static Integer atMost(List<Integer> nums, Integer K) {
        Map<Integer, Integer> count = new Map<Integer, Integer>();
        Integer left = 0, res = 0;
        for (Integer right = 0; right < nums.size(); right++) {
            Integer v = nums[right];
            count.put(v, (count.containsKey(v) ? count.get(v) : 0) + 1);
            while (count.size() > K) {
                Integer lv = nums[left];
                count.put(lv, count.get(lv) - 1);
                if (count.get(lv) == 0) count.remove(lv);
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
    slug: "longest-subarray-with-at-most-two-distinct",
    title: "Longest Subarray with At Most Two Distinct",
    difficulty: "Medium",
    patterns: ["sliding-window", "hashing"],
    topics: ["Arrays", "Sliding Window"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer array `nums`, return the length of the longest contiguous subarray containing at most two distinct values.",
    beginnerExplanation:
      "Exactly the Fruit Into Baskets idea in array form: slide a window with a count map and keep it to at most two distinct keys, shrinking from the left whenever a third appears. Track the widest window.",
    realWorldAnalogy:
      "Two bins to sort items into; as you scan a conveyor you keep going until a third kind of item forces you to discard from the start of your current run.",
    visualExplanation: "nums = [1,2,1,2,3], longest with <= 2 distinct = [1,2,1,2] -> length 4",
    approaches: [
      {
        title: "Every subarray",
        tier: "Brute Force",
        idea: "Check distinct count of each subarray.",
        steps: ["For each start", "Extend while distinct <= 2"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "Window with count map",
        tier: "Optimal",
        idea: "Keep at most 2 keys; shrink when a third enters.",
        steps: [
          "Add nums[right] to the map",
          "While map size > 2, decrement nums[left] (drop at 0), left++",
          "Track widest window",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "count map over the window; when keys > 2 advance left until a key reaches 0; record max length.",
    interviewTips: ["Identical template to 'at most K distinct' with K = 2."],
    commonMistakes: ["Forgetting to remove a key at count 0."],
    followUps: ["At most K distinct.", "Return the subarray bounds."],
    related: ["fruit-into-baskets", "longest-substring-with-at-most-k-distinct-characters"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_two_distinct(nums):
    count = {}
    left = best = 0
    for right, v in enumerate(nums):
        count[v] = count.get(v, 0) + 1
        while len(count) > 2:
            count[nums[left]] -= 1
            if count[nums[left]] == 0:
                del count[nums[left]]
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int longestTwoDistinct(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < nums.length; right++) {
            count.merge(nums[right], 1, Integer::sum);
            while (count.size() > 2) {
                count.put(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) == 0) count.remove(nums[left]);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestTwoDistinct(nums) {
  const count = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    count.set(nums[right], (count.get(nums[right]) || 0) + 1);
    while (count.size > 2) {
      count.set(nums[left], count.get(nums[left]) - 1);
      if (count.get(nums[left]) === 0) count.delete(nums[left]);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestTwoDistinct(List<Integer> nums) {
        Map<Integer, Integer> count = new Map<Integer, Integer>();
        Integer left = 0, best = 0;
        for (Integer right = 0; right < nums.size(); right++) {
            Integer v = nums[right];
            count.put(v, (count.containsKey(v) ? count.get(v) : 0) + 1);
            while (count.size() > 2) {
                Integer lv = nums[left];
                count.put(lv, count.get(lv) - 1);
                if (count.get(lv) == 0) count.remove(lv);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
    ],
  },
];

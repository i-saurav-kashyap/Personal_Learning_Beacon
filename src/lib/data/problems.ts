import type { Problem } from "@/lib/types";

// ---------------------------------------------------------------------------
// Seed question library. Each entry follows the full teaching template:
// statement → beginner → analogy → visual → brute/better/optimal → dry run →
// complexity → tips → mistakes → follow-ups → related → multi-language code.
// Content is original / community-style; we never claim a question was
// "officially asked" by any company.
// ---------------------------------------------------------------------------

export const PROBLEMS: Problem[] = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["google", "amazon", "meta", "microsoft"],
    sheets: ["blind75", "neetcode150", "top50", "striver"],
    frequency: 5,
    statement:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Each input has exactly one solution, and you may not use the same element twice.",
    beginnerExplanation:
      "You're looking for two numbers in a list that, when added together, hit a target. The naive instinct is to try every pair — but the trick interviewers want is: as you walk the list, remember what you've already seen so you can instantly check whether the number that *completes* the pair has shown up before.",
    realWorldAnalogy:
      "Imagine you owe a friend $10 and you're emptying your pockets one bill at a time. Each time you pull a bill out, you ask: 'Have I already seen the bill that, combined with this one, makes exactly $10?' If yes, you're done. You keep a little mental note of every bill you've seen — that note is the hash map.",
    visualExplanation:
      "nums = [2, 7, 11, 15], target = 9\n\nseen = {}\ni=0 → 2, need 7, not seen → store {2:0}\ni=1 → 7, need 2, FOUND at index 0 → answer [0, 1]",
    approaches: [
      {
        title: "Check every pair",
        tier: "Brute Force",
        idea: "For each element, scan every other element to see if they sum to target.",
        steps: [
          "Loop i from 0..n-1",
          "Loop j from i+1..n-1",
          "If nums[i] + nums[j] == target, return [i, j]",
        ],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Sort + two pointers",
        tier: "Better",
        idea: "Sort the values, then close in from both ends. Faster than brute force but loses original indices (needs bookkeeping).",
        steps: [
          "Pair each value with its index, then sort by value",
          "Move left/right pointers inward based on the sum vs target",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
      {
        title: "One-pass hash map",
        tier: "Optimal",
        idea: "Store each number's index as you go; for each number check if its complement (target − num) was already seen.",
        steps: [
          "Create an empty map value→index",
          "For each num at index i, compute need = target − num",
          "If need is in the map, return [map[need], i]",
          "Otherwise store map[num] = i",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "target = 9, nums = [3, 2, 4]\n• i=0 num=3 need=6 → map={3:0}\n• i=1 num=2 need=7 → map={3:0, 2:1}\n• i=2 num=4 need=5 → 5 not in map... wait, need=9-4=5, not present → store. Hmm, but answer is [1,2] (2+4=6? no). Correct target for this array is 6 → at i=2, need=2 which IS in map at index 1 → return [1, 2].",
    interviewTips: [
      "State the brute force first, then say 'we can trade space for time with a hash map' — interviewers love hearing the trade-off named explicitly.",
      "Clarify whether the array is sorted (changes the optimal approach) and whether there can be multiple answers.",
      "Mention that hash lookups are O(1) average but O(n) worst case under adversarial collisions.",
    ],
    commonMistakes: [
      "Returning the values instead of the indices.",
      "Using the same element twice (forgetting to check the complement *before* inserting).",
      "Assuming the array is sorted when it isn't.",
    ],
    followUps: [
      "What if the array is sorted? (→ two pointers, O(1) extra space)",
      "What if you need all unique pairs that sum to target? (→ 3Sum-style logic)",
      "What if the array doesn't fit in memory? (→ external sort / streaming)",
    ],
    related: ["three-sum", "valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def two_sum(nums, target):
    seen = {}                 # value -> index
    for i, num in enumerate(nums):
        need = target - num
        if need in seen:
            return [seen[need], i]
        seen[num] = i
    return []`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> twoSum(List<Integer> nums, Integer target) {
        Map<Integer, Integer> seen = new Map<Integer, Integer>();
        for (Integer i = 0; i < nums.size(); i++) {
            Integer need = target - nums[i];
            if (seen.containsKey(need)) {
                return new List<Integer>{ seen.get(need), i };
            }
            seen.put(nums[i], i);
        }
        return new List<Integer>();
    }
}`,
      },
    ],
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon", "meta", "adobe"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given two strings `s` and `t`, return true if `t` is an anagram of `s` — i.e. it uses exactly the same characters with the same frequencies.",
    beginnerExplanation:
      "Two words are anagrams if you can rearrange the letters of one to spell the other. The reliable way to check is to count how many of each letter each word has and compare the counts.",
    realWorldAnalogy:
      "Think of two bags of Scrabble tiles. They're anagrams if both bags contain the exact same tiles — same letters, same quantities. You don't care about order, just the multiset of tiles.",
    visualExplanation:
      's = "anagram", t = "nagaram"\ncount(s) = {a:3, n:1, g:1, r:1, m:1}\ncount(t) = {n:1, a:3, g:1, r:1, m:1}  → equal → true',
    approaches: [
      {
        title: "Sort both strings",
        tier: "Brute Force",
        idea: "If they're anagrams, sorting both produces identical strings.",
        steps: ["Sort s", "Sort t", "Compare for equality"],
        time: "O(n log n)",
        space: "O(n)",
      },
      {
        title: "Frequency count",
        tier: "Optimal",
        idea: "Count characters of s, decrement for t; all counts must end at zero.",
        steps: [
          "If lengths differ, return false immediately",
          "Increment a counter per char in s",
          "Decrement per char in t",
          "Every count must be zero",
        ],
        time: "O(n)",
        space: "O(1) for fixed alphabet",
      },
    ],
    dryRun:
      's="rat", t="car"\ncount: r+1 a+1 t+1 → {r:1,a:1,t:1}\nthen c-1 a-1 r-1 → c becomes -1 → not all zero → false',
    interviewTips: [
      "Ask about the character set: lowercase a–z lets you use a fixed-size array of 26 instead of a hash map.",
      "Ask about Unicode — emoji and accents break the 'array of 26' assumption.",
    ],
    commonMistakes: [
      "Forgetting the early length check.",
      "Assuming ASCII when the prompt allows Unicode.",
    ],
    followUps: [
      "Group a list of words into anagram groups (→ sort each word as a key).",
      "What if the strings are gigabytes long and streamed?",
    ],
    related: ["two-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import Counter

def is_anagram(s, t):
    return len(s) == len(t) and Counter(s) == Counter(t)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (const ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        Map<String, Integer> count = new Map<String, Integer>();
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            count.put(c, (count.containsKey(c) ? count.get(c) : 0) + 1);
        }
        for (Integer i = 0; i < t.length(); i++) {
            String c = t.substring(i, i + 1);
            if (!count.containsKey(c) || count.get(c) == 0) return false;
            count.put(c, count.get(c) - 1);
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    patterns: ["sliding-window"],
    topics: ["Arrays"],
    companies: ["amazon", "google", "uber"],
    sheets: ["blind75", "neetcode150", "top50"],
    frequency: 5,
    statement:
      "You're given an array `prices` where `prices[i]` is the price of a stock on day `i`. Maximize profit by choosing a single day to buy and a later day to sell. Return the max profit, or 0 if no profit is possible.",
    beginnerExplanation:
      "You want to buy low and sell high, but you can only sell *after* you buy. As you scan the prices day by day, keep track of the cheapest price you've seen so far — that's the best day you *could have* bought. At every day, ask: if I sold today, how much would I make?",
    realWorldAnalogy:
      "You're walking through a valley and recording the lowest point behind you. At each step you check: 'If I'd started at the lowest point so far and climbed to here, how high did I rise?' The biggest rise is your answer.",
    visualExplanation:
      "prices = [7,1,5,3,6,4]\nminSoFar:  7  1  1  1  1  1\nprofit:    0  0  4  2  5  3   → max = 5",
    approaches: [
      {
        title: "Try every buy/sell pair",
        tier: "Brute Force",
        idea: "For every buy day, check every later sell day.",
        steps: ["Loop buy day i", "Loop sell day j>i", "Track max(prices[j]-prices[i])"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Track running minimum",
        tier: "Optimal",
        idea: "One pass: maintain the minimum price so far and the best profit if selling today.",
        steps: [
          "minPrice = +∞, best = 0",
          "For each price: best = max(best, price − minPrice)",
          "minPrice = min(minPrice, price)",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "prices=[7,1,5,3,6,4]\nday0 p=7 min=7 best=0\nday1 p=1 min=1 best=0\nday2 p=5 best=max(0,4)=4 min=1\nday3 p=3 best=4 min=1\nday4 p=6 best=max(4,5)=5\nday5 p=4 best=5 → 5",
    interviewTips: [
      "Frame it as a sliding-window / running-extremum problem, not DP — it signals you see the simple structure.",
      "Clarify: single transaction only? The multi-transaction variant is a different (greedy) problem.",
    ],
    commonMistakes: [
      "Allowing the sell day to be before the buy day.",
      "Returning a negative profit instead of 0.",
    ],
    followUps: [
      "Unlimited transactions (→ sum every upward step).",
      "At most k transactions (→ DP).",
      "With a cooldown or transaction fee.",
    ],
    related: ["two-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_profit(prices):
    min_price = float("inf")
    best = 0
    for p in prices:
        best = max(best, p - min_price)
        min_price = min(min_price, p)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, best = 0;
        for (int p : prices) {
            best = Math.max(best, p - minPrice);
            minPrice = Math.min(minPrice, p);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProfit(prices) {
  let minPrice = Infinity, best = 0;
  for (const p of prices) {
    best = Math.max(best, p - minPrice);
    minPrice = Math.min(minPrice, p);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProfit(List<Integer> prices) {
        Integer minPrice = 2147483647, best = 0;
        for (Integer p : prices) {
            best = Math.max(best, p - minPrice);
            minPrice = Math.min(minPrice, p);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    patterns: ["sliding-window", "hashing"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon", "meta", "google", "adobe", "uber"],
    sheets: ["neetcode150", "top50"],
    frequency: 5,
    statement:
      "Given a string `s`, find the length of the longest substring that contains no repeating characters.",
    beginnerExplanation:
      "Slide a window across the string. Grow it on the right; whenever you hit a character already inside the window, shrink it from the left until the duplicate is gone. Track the biggest window you ever held.",
    realWorldAnalogy:
      "Imagine reading a sentence with a sticky-note frame. You push the right edge forward letter by letter. The moment a letter repeats inside the frame, you pull the left edge forward until the repeat is outside the frame. The widest frame you ever achieved is the answer.",
    visualExplanation:
      's = "abcabcbb"\n[a]bcabcbb → 1\n[ab]cabcbb → 2\n[abc]abcbb → 3\na[bca]bcbb → 3 (slid past first a)\n...max stays 3',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "Enumerate all substrings, test each for uniqueness.",
        steps: ["For each start i", "For each end j", "Check the substring has all-unique chars"],
        time: "O(n³)",
        space: "O(n)",
      },
      {
        title: "Sliding window + last-seen map",
        tier: "Optimal",
        idea: "Track the last index each char was seen; jump the left edge past any duplicate.",
        steps: [
          "left = 0, store last index per char",
          "For right in 0..n-1: if char seen at index ≥ left, move left to seen+1",
          "Update answer with (right − left + 1)",
        ],
        time: "O(n)",
        space: "O(min(n, charset))",
      },
    ],
    dryRun:
      's="abba"\nr=0 a last={a:0} len=1\nr=1 b last={a:0,b:1} len=2\nr=2 b seen at 1≥left0 → left=2 last={..b:2} len=1\nr=3 a seen at 0 <left2 → keep left=2 last={a:3} len=2 → max=2',
    interviewTips: [
      "Say the words 'variable-size sliding window' — it tells the interviewer you've classified the pattern.",
      "The subtle bug is moving `left` backwards; guard with `max(left, lastSeen + 1)`.",
    ],
    commonMistakes: [
      "Moving the left pointer backward when a duplicate is *outside* the current window.",
      "Confusing substring (contiguous) with subsequence (not contiguous).",
    ],
    followUps: [
      "Longest substring with at most K distinct characters.",
      "Return the substring itself, not just its length.",
    ],
    related: ["longest-substring-without-repeating"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def length_of_longest_substring(s):
    last = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (last.containsKey(ch) && last.get(ch) >= left) {
                left = last.get(ch) + 1;
            }
            last.put(ch, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch) >= left) left = last.get(ch) + 1;
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lengthOfLongestSubstring(String s) {
        Map<String, Integer> last = new Map<String, Integer>();
        Integer left = 0, best = 0;
        for (Integer right = 0; right < s.length(); right++) {
            String ch = s.substring(right, right + 1);
            if (last.containsKey(ch) && last.get(ch) >= left) {
                left = last.get(ch) + 1;
            }
            last.put(ch, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["meta", "amazon", "google"],
    sheets: ["blind75", "neetcode150", "top50"],
    frequency: 5,
    statement:
      "Given an integer array `nums`, return all unique triplets `[a, b, c]` such that a + b + c = 0. The solution set must not contain duplicate triplets.",
    beginnerExplanation:
      "Sort the array first. Then fix one number and use two pointers (one from the left, one from the right) to find pairs that cancel it out. Sorting is what makes the two-pointer sweep and duplicate-skipping possible.",
    realWorldAnalogy:
      "You have a line of people sorted by weight and want trios that balance a seesaw at zero. Anchor one person, then have a light person and a heavy person step toward each other until the trio balances.",
    visualExplanation:
      "nums sorted = [-4,-1,-1,0,1,2]\nfix -1 → L=0, R=2 → -1+0+2=1 >0 move R\n-1+0+1=0 ✓ → [-1,0,1]; also [-1,-1,2]",
    approaches: [
      {
        title: "Three nested loops",
        tier: "Brute Force",
        idea: "Try every triplet, dedupe with a set.",
        steps: ["Loop i", "Loop j", "Loop k", "Collect sums == 0 into a set"],
        time: "O(n³)",
        space: "O(n)",
      },
      {
        title: "Sort + two pointers",
        tier: "Optimal",
        idea: "Sort, fix each i, two-pointer the rest; skip duplicates to keep triplets unique.",
        steps: [
          "Sort the array",
          "For each i (skip duplicate i values)",
          "L = i+1, R = n−1; move pointers by comparing sum to 0",
          "On a hit, record it and skip duplicate L/R values",
        ],
        time: "O(n²)",
        space: "O(1) extra (ignoring output)",
      },
    ],
    dryRun:
      "nums=[-1,0,1,2,-1,-4] → sorted [-4,-1,-1,0,1,2]\ni=-4: L,R sweep no zero\ni=-1(first): L=-1 R=2 → 0 ✓ [-1,-1,2]; then L=0 R=1 → 0 ✓ [-1,0,1]\ni=-1(second): skip duplicate",
    interviewTips: [
      "The two pointer + sort combo is THE signature of 'k numbers summing to target' problems.",
      "Be explicit about *where* you skip duplicates — that's the part candidates fumble.",
    ],
    commonMistakes: [
      "Not skipping duplicate values, producing repeated triplets.",
      "Off-by-one when moving L/R after recording a hit.",
    ],
    followUps: ["4Sum (add another fixed loop).", "3Sum closest to a target.", "Count triplets rather than list them."],
    related: ["two-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def three_sum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, n - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total < 0:
                l += 1
            elif total > 0:
                r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1
                while l < r and nums[l] == nums[l - 1]:
                    l += 1
                while l < r and nums[r] == nums[r + 1]:
                    r -= 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum < 0) l++;
                else if (sum > 0) r--;
                else {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                }
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      }
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> threeSum(List<Integer> nums) {
        nums.sort();
        List<List<Integer>> res = new List<List<Integer>>();
        for (Integer i = 0; i < nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            Integer l = i + 1, r = nums.size() - 1;
            while (l < r) {
                Integer sum = nums[i] + nums[l] + nums[r];
                if (sum < 0) l++;
                else if (sum > 0) r--;
                else {
                    res.add(new List<Integer>{ nums[i], nums[l], nums[r] });
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                }
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["microsoft", "amazon", "google"],
    sheets: ["neetcode150", "top50", "striver"],
    frequency: 4,
    statement:
      "Given a sorted array `nums` and a target value, return the index of the target if present, otherwise −1. Must run in O(log n).",
    beginnerExplanation:
      "Because the array is sorted, you can repeatedly look at the middle element and throw away half the array every time. Too small? Search the right half. Too big? Search the left half. You halve the problem each step.",
    realWorldAnalogy:
      "Looking up a word in a physical dictionary. You don't read page 1 to 1000 — you flip to the middle, decide 'earlier' or 'later', and repeat. Each flip eliminates half the remaining pages.",
    visualExplanation:
      "nums=[1,3,5,7,9] target=7\nlo=0 hi=4 mid=2 →5<7 lo=3\nlo=3 hi=4 mid=3 →7==7 → return 3",
    approaches: [
      {
        title: "Linear scan",
        tier: "Brute Force",
        idea: "Walk every element until you find the target.",
        steps: ["For each index", "Return when equal"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Iterative binary search",
        tier: "Optimal",
        idea: "Maintain [lo, hi] and discard half each iteration. Use lo + (hi−lo)/2 to avoid overflow.",
        steps: [
          "lo=0, hi=n−1",
          "While lo ≤ hi: mid = lo + (hi−lo)/2",
          "Compare nums[mid] with target and move lo or hi",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[2,4,6,8] target=5\nlo0 hi3 mid1 →4<5 lo=2\nlo2 hi3 mid2 →6>5 hi=1\nlo2>hi1 → return -1",
    interviewTips: [
      "Always write `mid = lo + (hi - lo) / 2` to avoid integer overflow — interviewers notice.",
      "Be crisp on your loop invariant: is `hi` inclusive or exclusive? Pick one and stay consistent.",
    ],
    commonMistakes: [
      "Infinite loops from updating lo/hi to mid instead of mid±1.",
      "Overflow in (lo+hi)/2 in fixed-width languages.",
    ],
    followUps: [
      "Find the first/last occurrence of a value.",
      "Search in a rotated sorted array.",
      "Binary search on the answer (e.g. min capacity to ship in D days).",
    ],
    related: ["best-time-to-buy-sell-stock"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function binarySearch(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer search(List<Integer> nums, Integer target) {
        Integer lo = 0, hi = nums.size() - 1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    patterns: ["fast-slow-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given the head of a linked list, determine whether the list contains a cycle (some node's next points back to an earlier node).",
    beginnerExplanation:
      "Run two pointers: a slow one moving one step at a time and a fast one moving two steps. If the list is a straight line, fast reaches the end. If there's a loop, fast eventually laps slow and they collide — like runners on a circular track.",
    realWorldAnalogy:
      "Two runners on a track: a jogger and a sprinter. On a straight road the sprinter just finishes first. On a circular track, the sprinter eventually catches up and taps the jogger on the shoulder — proof the track loops.",
    visualExplanation:
      "1→2→3→4→2(back to 2)\nslow:1,2,3,4,2...\nfast:1,3,2,4,3... they meet inside the loop → cycle",
    approaches: [
      {
        title: "Hash set of visited nodes",
        tier: "Better",
        idea: "Store each node you visit; a repeat means a cycle.",
        steps: ["Walk the list", "If node already in set → cycle", "Else add it"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Floyd's tortoise & hare",
        tier: "Optimal",
        idea: "Two pointers at different speeds; they meet iff there's a cycle.",
        steps: [
          "slow = head, fast = head",
          "While fast and fast.next: slow=slow.next, fast=fast.next.next",
          "If slow == fast → cycle",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "1→2→3→1(loop)\nslow1 fast1\nslow2 fast3\nslow3 fast2\nslow1 fast1 → meet → true",
    interviewTips: [
      "Naming it 'Floyd's cycle detection' signals you know the canonical algorithm.",
      "Follow-up is usually 'find where the cycle starts' — know the reset-one-pointer-to-head trick.",
    ],
    commonMistakes: [
      "Null-pointer crash from not checking both `fast` and `fast.next`.",
      "Comparing values instead of node identity.",
    ],
    followUps: [
      "Return the node where the cycle begins.",
      "Find the length of the cycle.",
    ],
    related: ["linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Recursion"],
    companies: ["amazon", "adobe", "apple"],
    sheets: ["neetcode150", "top50"],
    frequency: 4,
    statement:
      "You're climbing a staircase with `n` steps. Each move you can climb 1 or 2 steps. In how many distinct ways can you reach the top?",
    beginnerExplanation:
      "The number of ways to reach step n equals the ways to reach step n−1 (then a single step) plus the ways to reach step n−2 (then a double step). That recurrence is exactly the Fibonacci sequence.",
    realWorldAnalogy:
      "To stand on the top stair, your last hop came either from one stair below or two stairs below. So the routes into the top equal the routes into those two stairs added together — like a family tree merging.",
    visualExplanation:
      "n: 1 2 3 4 5\nways: 1 2 3 5 8  (each = sum of previous two)",
    approaches: [
      {
        title: "Naive recursion",
        tier: "Brute Force",
        idea: "ways(n) = ways(n−1) + ways(n−2), recomputing everything.",
        steps: ["Base: ways(0)=ways(1)=1", "Recurse on n−1 and n−2"],
        time: "O(2ⁿ)",
        space: "O(n) stack",
      },
      {
        title: "Memoized / tabulated DP",
        tier: "Better",
        idea: "Cache subresults so each step is computed once.",
        steps: ["dp[0]=dp[1]=1", "dp[i]=dp[i-1]+dp[i-2]"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two rolling variables",
        tier: "Optimal",
        idea: "Only the last two values matter, so keep two variables.",
        steps: ["a=1, b=1", "Repeat n−1 times: a, b = b, a+b", "Return b"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "n=4\na=1 b=1\n→ a=1 b=2\n→ a=2 b=3\n→ a=3 b=5 → answer 5",
    interviewTips: [
      "Explicitly recognising 'this is Fibonacci' is the fast path; then optimise space from O(n) to O(1).",
      "It's the canonical gateway to 1-D DP — relate it to 'min cost climbing stairs' and 'house robber'.",
    ],
    commonMistakes: ["Wrong base cases.", "Stopping the loop one iteration early/late."],
    followUps: [
      "Steps of size 1, 2, or 3.",
      "Each step has a cost — minimise total cost.",
    ],
    related: ["climbing-stairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def climb_stairs(n):
    a = b = 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int climbStairs(int n) {
        int a = 1, b = 1;
        for (int i = 0; i < n - 1; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 0; i < n - 1; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer climbStairs(Integer n) {
        Integer a = 1, b = 1;
        for (Integer i = 0; i < n - 1; i++) {
            Integer next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}`,
      },
    ],
  },
  {
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "apple", "microsoft"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given an integer array `nums`, return true if any value appears at least twice, and false if every element is distinct.",
    beginnerExplanation:
      "You want to know if anything repeats. Walk the list once and drop every number into a set. The instant you try to add a number that's already there, you've found your duplicate.",
    realWorldAnalogy:
      "Checking guests into an event by name. You keep a clipboard of everyone who's arrived; if someone gives a name already on the list, you've caught a duplicate immediately — no need to re-read the whole clipboard each time.",
    visualExplanation:
      "nums = [1, 2, 3, 1]\nseen = {}\n1 → add → {1}\n2 → add → {1,2}\n3 → add → {1,2,3}\n1 → already in set → return true",
    approaches: [
      {
        title: "Compare every pair",
        tier: "Brute Force",
        idea: "Check each element against every other element.",
        steps: ["Loop i", "Loop j > i", "If nums[i] == nums[j] return true"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Sort then scan neighbours",
        tier: "Better",
        idea: "After sorting, duplicates sit next to each other.",
        steps: ["Sort the array", "Scan adjacent pairs for equality"],
        time: "O(n log n)",
        space: "O(1) or O(n) depending on sort",
      },
      {
        title: "Hash set",
        tier: "Optimal",
        idea: "Add to a set as you go; a failed add means a duplicate.",
        steps: ["Create an empty set", "For each n, if n in set return true, else add it", "Return false"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "nums=[2,2]\nn=2 → set empty → add → {2}\nn=2 → already in {2} → return true",
    interviewTips: [
      "Name the space/time trade-off out loud: the set buys O(n) time at the cost of O(n) memory.",
      "Ask whether the values fit a bounded range — a boolean/bit array can replace the set.",
    ],
    commonMistakes: [
      "Adding before checking, which can't distinguish a real duplicate.",
      "Assuming the array is sorted.",
    ],
    followUps: [
      "Contains Duplicate II: a duplicate within distance k (sliding window of a set).",
      "Find the single duplicate when values are in 1..n (Floyd's cycle).",
    ],
    related: ["two-sum", "valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def contains_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true; // add returns false if already present
        }
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean containsDuplicate(List<Integer> nums) {
        Set<Integer> seen = new Set<Integer>();
        for (Integer n : nums) {
            if (seen.contains(n)) return true;
            seen.add(n);
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon", "meta", "microsoft", "apple"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given an array of strings, group together the ones that are anagrams of each other. Return the groups in any order.",
    beginnerExplanation:
      "Anagrams share the same letters, so they share the same 'sorted' form. Use that sorted form as a dictionary key, and throw every word into the bucket for its key. Words that sort to the same thing land in the same bucket.",
    realWorldAnalogy:
      "Sorting socks into drawers by their colour pattern. Two socks with identical patterns go in the same drawer — the pattern is the key, the drawer is the bucket.",
    visualExplanation:
      'strs = ["eat","tea","tan","ate"]\n"eat"→key "aet" → {aet:[eat]}\n"tea"→key "aet" → {aet:[eat,tea]}\n"tan"→key "ant" → {aet:[eat,tea], ant:[tan]}\n"ate"→key "aet" → {aet:[eat,tea,ate], ant:[tan]}',
    approaches: [
      {
        title: "Compare every pair for anagram-ness",
        tier: "Brute Force",
        idea: "For each unplaced word, scan all others and group matches.",
        steps: ["For each word", "Compare char counts against every other word"],
        time: "O(n² · k)",
        space: "O(nk)",
      },
      {
        title: "Sorted-string key",
        tier: "Optimal",
        idea: "Sort each word's letters to form a canonical key; bucket by key.",
        steps: ["For each word, sort its characters into a key", "Append the word to map[key]", "Return map values"],
        time: "O(n · k log k)",
        space: "O(nk)",
      },
      {
        title: "Char-count key",
        tier: "Optimal",
        idea: "Use a 26-length count signature as the key to skip the sort (O(k) per word).",
        steps: ["Count letters into a fixed array", "Stringify the counts as the key", "Bucket by key"],
        time: "O(n · k)",
        space: "O(nk)",
      },
    ],
    dryRun:
      'strs=["abc","bca","xyz"]\n"abc"→"abc" → {abc:[abc]}\n"bca"→"abc" → {abc:[abc,bca]}\n"xyz"→"xyz" → {abc:[abc,bca], xyz:[xyz]}\nresult: [[abc,bca],[xyz]]',
    interviewTips: [
      "Mention both keys: sorted-string is simpler to write; count-array is asymptotically faster.",
      "Clarify the alphabet — lowercase a–z enables the 26-length count trick.",
    ],
    commonMistakes: [
      "Using the unsorted word as a key (only groups exact duplicates).",
      "Forgetting that the same key must map to a list, not overwrite.",
    ],
    followUps: ["Return only groups of size > 1.", "Stream millions of words (external grouping)."],
    related: ["valid-anagram", "contains-duplicate"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();
        for (String s : strs) {
            char[] c = s.toCharArray();
            Arrays.sort(c);
            String key = new String(c);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(groups.values());
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<String>> groupAnagrams(List<String> strs) {
        Map<String, List<String>> groups = new Map<String, List<String>>();
        for (String s : strs) {
            List<String> chars = new List<String>();
            for (Integer i = 0; i < s.length(); i++) chars.add(s.substring(i, i + 1));
            chars.sort();
            String key = String.join(chars, '');
            if (!groups.containsKey(key)) groups.put(key, new List<String>());
            groups.get(key).add(s);
        }
        return groups.values();
    }
}`,
      },
    ],
  },
  {
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    patterns: ["heap", "hashing"],
    topics: ["Arrays", "Hashing", "Heaps"],
    companies: ["amazon", "meta", "google"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
    beginnerExplanation:
      "First count how often each number appears. Then you need the k biggest counts. A heap can hand you the top k, but there's an even slicker trick: since a count can be at most n, drop numbers into buckets indexed by their frequency and read the buckets from the high end.",
    realWorldAnalogy:
      "A music app ranking your most-played songs. It tallies plays per song (the counts), then lines songs up on shelves labelled by play-count and reads from the busiest shelf down.",
    visualExplanation:
      "nums=[1,1,1,2,2,3], k=2\ncount = {1:3, 2:2, 3:1}\nbuckets (index = freq): [_, [3], [2], [1]]\nread from right: freq3→1, freq2→2 → answer [1, 2]",
    approaches: [
      {
        title: "Sort by frequency",
        tier: "Brute Force",
        idea: "Count, then sort entries by count and take the first k.",
        steps: ["Build a count map", "Sort entries descending by count", "Take first k keys"],
        time: "O(n log n)",
        space: "O(n)",
      },
      {
        title: "Min-heap of size k",
        tier: "Better",
        idea: "Keep a heap of the k largest counts seen so far.",
        steps: ["Count frequencies", "Push (count, num); if heap > k pop the smallest", "Heap holds the answer"],
        time: "O(n log k)",
        space: "O(n)",
      },
      {
        title: "Bucket sort by frequency",
        tier: "Optimal",
        idea: "Counts range 1..n, so bucket numbers by count and read buckets high→low.",
        steps: ["Count frequencies", "Place each num into buckets[count]", "Walk buckets from the top, collect k"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "nums=[4,4,5], k=1\ncount={4:2,5:1}\nbuckets=[_, [5], [4]]\nfrom right: freq2→4 → collected 1 → answer [4]",
    interviewTips: [
      "Lead with the heap (it's the expected answer), then upgrade to O(n) bucket sort to impress.",
      "Note that bucket sort works precisely because a frequency cannot exceed n.",
    ],
    commonMistakes: [
      "Sizing buckets to max(count) instead of n+1 and indexing out of range.",
      "A max-heap of all elements (O(n log n)) instead of a size-k min-heap.",
    ],
    followUps: ["Top k frequent words (tie-break alphabetically).", "Streaming top-k (count-min sketch)."],
    related: ["contains-duplicate", "valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import Counter

def top_k_frequent(nums, k):
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    res = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            res.append(num)
            if len(res) == k:
                return res
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.merge(n, 1, Integer::sum);
        List<Integer>[] buckets = new List[nums.length + 1];
        for (Map.Entry<Integer, Integer> e : count.entrySet()) {
            int f = e.getValue();
            if (buckets[f] == null) buckets[f] = new ArrayList<>();
            buckets[f].add(e.getKey());
        }
        int[] res = new int[k];
        int idx = 0;
        for (int f = buckets.length - 1; f > 0 && idx < k; f--) {
            if (buckets[f] == null) continue;
            for (int num : buckets[f]) {
                res[idx++] = num;
                if (idx == k) break;
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of count) buckets[freq].push(num);
  const res = [];
  for (let f = buckets.length - 1; f > 0 && res.length < k; f--) {
    for (const num of buckets[f]) {
      res.push(num);
      if (res.length === k) break;
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> topKFrequent(List<Integer> nums, Integer k) {
        Map<Integer, Integer> count = new Map<Integer, Integer>();
        for (Integer n : nums) {
            count.put(n, (count.containsKey(n) ? count.get(n) : 0) + 1);
        }
        List<List<Integer>> buckets = new List<List<Integer>>();
        for (Integer i = 0; i <= nums.size(); i++) buckets.add(new List<Integer>());
        for (Integer num : count.keySet()) {
            buckets[count.get(num)].add(num);
        }
        List<Integer> res = new List<Integer>();
        for (Integer f = buckets.size() - 1; f > 0 && res.size() < k; f--) {
            for (Integer num : buckets[f]) {
                res.add(num);
                if (res.size() == k) break;
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    patterns: ["prefix-sum"],
    topics: ["Arrays", "Prefix Sum"],
    companies: ["amazon", "meta", "apple", "microsoft"],
    sheets: ["blind75", "neetcode150"],
    frequency: 5,
    statement:
      "Given an integer array `nums`, return an array `answer` where `answer[i]` equals the product of all elements except `nums[i]`. Solve it without division and in O(n) time.",
    beginnerExplanation:
      "For each position, the answer is 'everything to my left multiplied by everything to my right'. So make one pass left-to-right carrying a running prefix product, then one pass right-to-left carrying a running suffix product, multiplying them together.",
    realWorldAnalogy:
      "A relay race told from both ends: one runner sweeps left-to-right handing each position the product of everyone before it; another sweeps right-to-left handing each position the product of everyone after it. Each spot multiplies the two batons it receives.",
    visualExplanation:
      "nums = [1,2,3,4]\nprefix → [1, 1, 2, 6]\nsuffix→ [24,12, 4, 1]\nresult = prefix*suffix = [24,12,8,6]",
    approaches: [
      {
        title: "Divide total product",
        tier: "Brute Force",
        idea: "Multiply everything, then divide by each element — but division is disallowed and breaks on zeros.",
        steps: ["Compute total product", "answer[i] = total / nums[i]"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Recompute product per index",
        tier: "Better",
        idea: "For each i, multiply all other elements.",
        steps: ["Loop i", "Inner loop multiplies all j != i"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Prefix × suffix passes",
        tier: "Optimal",
        idea: "Carry a prefix product forward, then a suffix product backward, storing into the result in place.",
        steps: [
          "Pass 1: res[i] = product of everything left of i",
          "Pass 2: multiply res[i] by a running product of everything right of i",
        ],
        time: "O(n)",
        space: "O(1) extra (output aside)",
      },
    ],
    dryRun:
      "nums=[2,3]\nprefix pass: res=[1, 2] (res[0]=1, then prefix=2 → res[1]=2)\nsuffix pass: i=1 res[1]*=1=2, suffix=3; i=0 res[0]*=3=3\nresult=[3,2]",
    interviewTips: [
      "Call out the two forbidden traps up front: no division, and watch for zeros.",
      "Mention you reuse the output array so extra space is O(1).",
    ],
    commonMistakes: [
      "Initialising the result with 0 instead of 1.",
      "Using division and crashing on an input containing 0.",
    ],
    followUps: ["Handle it if division were allowed (count zeros).", "Sum-except-self / max-except-self variants."],
    related: ["maximum-subarray", "two-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> productExceptSelf(List<Integer> nums) {
        Integer n = nums.size();
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < n; i++) res.add(1);
        Integer prefix = 1;
        for (Integer i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        Integer suffix = 1;
        for (Integer i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Arrays", "Dynamic Programming"],
    companies: ["amazon", "microsoft", "apple", "google"],
    sheets: ["blind75", "neetcode150", "top50"],
    frequency: 5,
    statement:
      "Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.",
    beginnerExplanation:
      "Scan left to right keeping a running sum. At each number ask: 'is it better to extend the run I'm on, or start fresh from here?' If the running sum ever goes negative it can only drag the next number down, so you reset. This is Kadane's algorithm.",
    realWorldAnalogy:
      "Tracking your bank balance day by day looking for your best winning streak. The moment your streak total dips below zero, it's pointless to carry that debt forward — you start a new streak from today.",
    visualExplanation:
      "nums = [-2,1,-3,4,-1,2,1,-5,4]\ncur:  -2 1 -2 4 3 5 6 1 5\nbest: -2 1  1 4 4 5 6 6 6  → 6 (subarray [4,-1,2,1])",
    approaches: [
      {
        title: "Every subarray",
        tier: "Brute Force",
        idea: "Try all start/end pairs and sum each.",
        steps: ["Loop start", "Loop end", "Sum and track the max"],
        time: "O(n²) (or O(n³) naive)",
        space: "O(1)",
      },
      {
        title: "Kadane's running max",
        tier: "Optimal",
        idea: "cur = max(num, cur + num); best tracks the max cur seen.",
        steps: ["Init best = cur = nums[0]", "For each later num: cur = max(num, cur + num)", "best = max(best, cur)"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[-1,2,-1,3]\ncur=-1 best=-1\nn=2: cur=max(2,1)=2 best=2\nn=-1: cur=max(-1,1)=1 best=2\nn=3: cur=max(3,4)=4 best=4 → 4",
    interviewTips: [
      "Say the recurrence aloud — 'extend or restart' — it shows you understand the DP, not just memorised code.",
      "Initialise best to nums[0], not 0, so all-negative arrays work.",
    ],
    commonMistakes: [
      "Starting best at 0 and returning 0 for an all-negative array.",
      "Resetting cur to 0 instead of to the current number.",
    ],
    followUps: ["Return the subarray bounds, not just the sum.", "Maximum product subarray.", "Circular maximum subarray."],
    related: ["best-time-to-buy-sell-stock", "product-of-array-except-self"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_sub_array(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxSubArray(nums) {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxSubArray(List<Integer> nums) {
        Integer best = nums[0], cur = nums[0];
        for (Integer i = 1; i < nums.size(); i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Two Pointers"],
    companies: ["amazon", "meta", "google"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given an array `height` where each value is a vertical line's height at that index, pick two lines that with the x-axis form a container holding the most water. Return that maximum area.",
    beginnerExplanation:
      "Area = width × the shorter of the two walls. Start with the widest container (both ends). To possibly do better you must raise the limiting (shorter) wall, so move that pointer inward; moving the taller one can never help because width only shrinks.",
    realWorldAnalogy:
      "Two people holding a sagging sheet between them to catch water. The lower hand sets how much you can hold, so the lower hand is the one that should move to find a taller spot — raising the higher hand does nothing.",
    visualExplanation:
      "height=[1,8,6,2,5,4,8,3,7]\nl=0(1) r=8(7): area=8*min(1,7)=8 → move l (shorter)\nl=1(8) r=8(7): area=7*7=49 → best so far\n...max = 49",
    approaches: [
      {
        title: "Every pair of lines",
        tier: "Brute Force",
        idea: "Compute area for all pairs.",
        steps: ["Loop i", "Loop j > i", "area = (j-i) * min(h[i],h[j])"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Converging two pointers",
        tier: "Optimal",
        idea: "Start wide; always move the pointer at the shorter line inward.",
        steps: ["l=0, r=n-1", "Record area; move whichever side is shorter", "Stop when they meet"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "height=[1,2,1]\nl=0(1) r=2(1): area=2*1=2 best=2; equal heights → move r\nl=0(1) r=1(2): area=1*1=1 best=2\nl<r false → 2",
    interviewTips: [
      "Justify *why* you move the shorter side — that reasoning is the whole point of the problem.",
      "Contrast with Trapping Rain Water, which is a related but different two-pointer problem.",
    ],
    commonMistakes: [
      "Moving the taller pointer, which can never increase the area.",
      "Using height sum instead of min(height) for capacity.",
    ],
    followUps: ["Trapping Rain Water.", "Return the indices of the best pair."],
    related: ["three-sum", "valid-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_area(height):
    l, r = 0, len(height) - 1
    best = 0
    while l < r:
        best = max(best, (r - l) * min(height[l], height[r]))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1, best = 0;
        while (l < r) {
            best = Math.max(best, (r - l) * Math.min(height[l], height[r]));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxArea(height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, (r - l) * Math.min(height[l], height[r]));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxArea(List<Integer> height) {
        Integer l = 0, r = height.size() - 1, best = 0;
        while (l < r) {
            best = Math.max(best, (r - l) * Math.min(height[l], height[r]));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Strings", "Two Pointers"],
    companies: ["meta", "amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given a string `s`, return true if it reads the same forwards and backwards after lowercasing and ignoring everything that isn't a letter or digit.",
    beginnerExplanation:
      "Put one finger on each end of the string and walk inward. Skip anything that isn't a letter or number. Compare the two characters (case-insensitively); the moment they differ, it's not a palindrome.",
    realWorldAnalogy:
      "Two people reading a banner from opposite ends toward the middle, ignoring spaces and punctuation. If they ever call out different letters at the same step, the banner isn't symmetric.",
    visualExplanation:
      's = "A man, a plan, a canal: Panama"\ncleaned = "amanaplanacanalpanama"\nl→ a m a n ...   ←r a m a n ...   all match → true',
    approaches: [
      {
        title: "Clean and reverse",
        tier: "Better",
        idea: "Strip non-alphanumerics, lowercase, and compare to the reversed string.",
        steps: ["Filter to alphanumerics, lowercase", "Return cleaned == reversed(cleaned)"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two pointers in place",
        tier: "Optimal",
        idea: "Walk pointers inward, skipping non-alphanumerics, comparing as you go.",
        steps: ["l=0, r=n-1", "Advance l/r past non-alphanumerics", "Compare lowercased chars; mismatch → false"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      's="0P"\nl=0 \'0\' r=1 \'P\'\nboth alphanumeric → compare \'0\' vs \'p\' → differ → false',
    interviewTips: [
      "The in-place two-pointer version is O(1) space — call that out versus the clean-and-reverse approach.",
      "Clarify the exact definition of 'alphanumeric' and whether to consider Unicode.",
    ],
    commonMistakes: [
      "Forgetting to lowercase before comparing.",
      "Skipping non-alphanumerics on only one side, desynchronising the pointers.",
    ],
    followUps: ["Valid Palindrome II: allow deleting at most one character.", "Longest palindromic substring."],
    related: ["container-with-most-water", "valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++;
    r--;
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isPalindrome(String s) {
        String clean = s.toLowerCase().replaceAll('[^a-z0-9]', '');
        Integer l = 0, r = clean.length() - 1;
        while (l < r) {
            if (clean.substring(l, l + 1) != clean.substring(r, r + 1)) return false;
            l++;
            r--;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    patterns: ["intervals"],
    topics: ["Arrays", "Intervals", "Sorting"],
    companies: ["google", "amazon", "meta", "microsoft"],
    sheets: ["blind75", "neetcode150"],
    frequency: 5,
    statement:
      "Given an array of intervals `[start, end]`, merge all overlapping intervals and return the non-overlapping intervals that cover all the input ranges.",
    beginnerExplanation:
      "Sort the intervals by their start. Then walk through them keeping the last merged interval; if the next one starts before that interval ends, they overlap — stretch the end. Otherwise it's a brand-new interval.",
    realWorldAnalogy:
      "Booking a meeting room from a list of requested time slots. You line the requests up by start time and combine any that touch or overlap into one long booking, so the calendar shows the true busy blocks.",
    visualExplanation:
      "intervals=[[1,3],[2,6],[8,10]] (already sorted)\n[1,3] → merged=[[1,3]]\n[2,6]: 2 <= 3 → merge → [[1,6]]\n[8,10]: 8 > 6 → new → [[1,6],[8,10]]",
    approaches: [
      {
        title: "Repeatedly merge any overlapping pair",
        tier: "Brute Force",
        idea: "Scan for any two overlapping intervals, merge them, repeat until none overlap.",
        steps: ["Find an overlapping pair", "Merge and restart", "Stop when no overlaps remain"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "Sort by start, sweep once",
        tier: "Optimal",
        idea: "After sorting, a single pass merges because overlaps are now adjacent.",
        steps: ["Sort by start", "For each interval, extend the last merged end if it overlaps, else append"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "intervals=[[1,4],[4,5]]\nsort → same\n[1,4] → merged=[[1,4]]\n[4,5]: 4 <= 4 → merge end=max(4,5)=5 → [[1,5]]",
    interviewTips: [
      "The whole trick is 'sort first' — say it immediately; everything else is a linear sweep.",
      "Clarify whether touching intervals like [1,4] and [4,5] count as overlapping.",
    ],
    commonMistakes: [
      "Forgetting to sort, so overlaps aren't adjacent.",
      "Setting the merged end to the new end instead of max(old end, new end).",
    ],
    followUps: ["Insert Interval into an already-sorted list.", "Count the minimum meeting rooms needed."],
    related: ["maximum-subarray"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] iv : intervals) {
            int last = merged.size() - 1;
            if (!merged.isEmpty() && iv[0] <= merged.get(last)[1]) {
                merged.get(last)[1] = Math.max(merged.get(last)[1], iv[1]);
            } else {
                merged.add(new int[] { iv[0], iv[1] });
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public class Interval implements Comparable {
        public Integer startVal, endVal;
        public Interval(Integer s, Integer e) { startVal = s; endVal = e; }
        public Integer compareTo(Object o) {
            return startVal - ((Interval) o).startVal;
        }
    }
    public static List<List<Integer>> merge(List<List<Integer>> intervals) {
        List<Interval> ivs = new List<Interval>();
        for (List<Integer> iv : intervals) ivs.add(new Interval(iv[0], iv[1]));
        ivs.sort();
        List<List<Integer>> merged = new List<List<Integer>>();
        for (Interval iv : ivs) {
            Integer last = merged.size() - 1;
            if (!merged.isEmpty() && iv.startVal <= merged[last][1]) {
                merged[last][1] = Math.max(merged[last][1], iv.endVal);
            } else {
                merged.add(new List<Integer>{ iv.startVal, iv.endVal });
            }
        }
        return merged;
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "meta", "apple"],
    sheets: ["blind75", "neetcode150", "top50"],
    frequency: 5,
    statement:
      "Given the head of a singly linked list, reverse the list and return the new head.",
    beginnerExplanation:
      "Walk the list flipping each node's arrow to point at the node behind it. You carry three references: the node before you (prev), the one you're on (cur), and a saved pointer to the next one so you don't lose the rest of the list when you flip.",
    realWorldAnalogy:
      "A line of people each facing the person in front. To reverse the line, each person turns around to face who was behind them — you just need to remember who came next before everyone spins.",
    visualExplanation:
      "1→2→3→null\nprev=null cur=1: save 2, 1→null, prev=1, cur=2\nprev=1 cur=2: save 3, 2→1, prev=2, cur=3\nprev=2 cur=3: save null, 3→2, prev=3 → head=3 (3→2→1→null)",
    approaches: [
      {
        title: "Push values to a stack / array",
        tier: "Brute Force",
        idea: "Collect values, then rebuild or overwrite in reverse.",
        steps: ["Traverse storing values", "Re-assign node values in reverse order"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Iterative pointer flip",
        tier: "Optimal",
        idea: "Re-link each node to its predecessor with three pointers.",
        steps: ["prev=null, cur=head", "Save next, point cur.next at prev", "Advance prev and cur"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Recursion",
        tier: "Optimal",
        idea: "Reverse the rest, then fix the link at the current node.",
        steps: ["Recurse to the tail", "Set head.next.next = head and head.next = null"],
        time: "O(n)",
        space: "O(n) call stack",
      },
    ],
    dryRun:
      "list 1→2\nprev=null cur=1: nxt=2, 1.next=null, prev=1, cur=2\nprev=1 cur=2: nxt=null, 2.next=1, prev=2, cur=null\nreturn prev=2 (2→1→null)",
    interviewTips: [
      "Draw the three pointers (prev, cur, next) on the whiteboard — interviewers want to see you not lose the list.",
      "Be ready to do it both iteratively (O(1) space) and recursively.",
    ],
    commonMistakes: [
      "Forgetting to save `next` before overwriting `cur.next`, losing the rest of the list.",
      "Returning `head` (now the tail) instead of `prev`.",
    ],
    followUps: ["Reverse only between positions m and n.", "Reverse nodes in groups of k."],
    related: ["merge-two-sorted-lists", "linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reverse_list(head):
    prev = None
    cur = head
    while cur:
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
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverseList(head) {
  let prev = null, cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
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
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    patterns: ["linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given the heads of two sorted linked lists, splice them into one sorted list and return its head. The result is built by re-linking the existing nodes.",
    beginnerExplanation:
      "Use a dummy 'anchor' node so you never special-case the head. Walk both lists with a tail pointer, always attaching the smaller current node, and advance that list. When one list runs out, attach whatever remains of the other.",
    realWorldAnalogy:
      "Merging two sorted stacks of graded papers into one pile. You repeatedly take whichever top paper has the lower score and place it on the new pile until one stack is empty, then drop the rest of the other stack on top.",
    visualExplanation:
      "l1: 1→3  l2: 2→4\ndummy→ ; take 1 → 1 ; take 2 → 1→2 ; take 3 → 1→2→3 ; l1 empty → attach 4\nresult: 1→2→3→4",
    approaches: [
      {
        title: "Collect, sort, rebuild",
        tier: "Brute Force",
        idea: "Dump all values into an array, sort, build a new list.",
        steps: ["Traverse both lists into an array", "Sort", "Create nodes in order"],
        time: "O((n+m) log(n+m))",
        space: "O(n+m)",
      },
      {
        title: "Two-pointer splice with dummy",
        tier: "Optimal",
        idea: "Merge in place by re-linking nodes, smaller first.",
        steps: ["Dummy + tail", "While both non-null, attach the smaller and advance", "Attach the remaining list"],
        time: "O(n+m)",
        space: "O(1)",
      },
    ],
    dryRun:
      "l1:2 l2:1\ndummy ; 1<2 → attach l2(1), l2=null ; l2 empty → tail.next = l1(2)\nresult: 1→2",
    interviewTips: [
      "Introduce the dummy node explicitly — it removes the awkward 'which head is smaller' branch.",
      "Mention you're re-linking existing nodes, not allocating new ones (O(1) space).",
    ],
    commonMistakes: [
      "Not handling the leftover tail when one list empties.",
      "Losing the head reference by not using a dummy.",
    ],
    followUps: ["Merge k sorted lists (heap or divide & conquer).", "Do it recursively."],
    related: ["reverse-linked-list", "binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def merge_two_lists(l1, l2):
    dummy = ListNode()
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 if l1 else l2
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function mergeTwoLists(l1, l2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Matrix"],
    companies: ["amazon", "meta", "google", "microsoft"],
    sheets: ["blind75", "neetcode150"],
    frequency: 5,
    statement:
      "Given a 2-D grid of '1' (land) and '0' (water), count the number of islands. An island is land connected horizontally or vertically, surrounded by water.",
    beginnerExplanation:
      "Scan the grid cell by cell. Each time you hit a piece of land you've never visited, that's a new island — so increment your count, then flood-fill outward (DFS or BFS) sinking the whole connected landmass so you don't count it again.",
    realWorldAnalogy:
      "Counting puddles on a paper towel. Each time you spot a new wet patch, you dab the entire connected blob dry before moving on, so you never count the same puddle twice.",
    visualExplanation:
      "grid:\n1 1 0\n0 1 0\n0 0 1\nfind land at (0,0) → flood the top-left blob → count=1\nnext unvisited land at (2,2) → flood → count=2",
    approaches: [
      {
        title: "Flood fill each new landmass (DFS/BFS)",
        tier: "Optimal",
        idea: "On each unvisited land cell, count it and sink the whole connected region.",
        steps: [
          "Loop over every cell",
          "If it's '1', increment count and DFS/BFS marking connected land as visited ('0')",
          "Return count",
        ],
        time: "O(rows × cols)",
        space: "O(rows × cols) worst-case stack/queue",
      },
      {
        title: "Union-Find",
        tier: "Optimal",
        idea: "Union adjacent land cells; the answer is the number of distinct land roots.",
        steps: ["Make a set per land cell", "Union right/down land neighbours", "Count distinct roots"],
        time: "O(rows × cols · α)",
        space: "O(rows × cols)",
      },
    ],
    dryRun:
      'grid=[[1,0],[0,1]]\n(0,0)=1 → count=1, sink (0,0)\n(0,1)=0 skip\n(1,0)=0 skip\n(1,1)=1 → count=2, sink → answer 2',
    interviewTips: [
      "Mutating the grid to mark visited is clean and O(1) extra; mention the alternative visited-set if mutation isn't allowed.",
      "BFS avoids deep recursion stack overflow on huge grids — worth naming.",
    ],
    commonMistakes: [
      "Not marking cells visited → infinite recursion or overcounting.",
      "Including diagonal neighbours (the problem is 4-directional).",
    ],
    followUps: ["Max area of an island.", "Number of distinct island shapes.", "Islands with diagonal connectivity."],
    related: ["course-schedule"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int numIslands(char[][] grid) {
        int rows = grid.length, cols = grid[0].length, count = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer rows, cols;
    public static Integer numIslands(List<List<String>> grid) {
        rows = grid.size();
        cols = grid[0].size();
        Integer count = 0;
        for (Integer r = 0; r < rows; r++) {
            for (Integer c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    static void dfs(List<List<String>> grid, Integer r, Integer c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
      },
    ],
  },
  {
    slug: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Topological Sort"],
    companies: ["amazon", "google", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "There are `numCourses` courses labelled 0..n-1. Given prerequisite pairs `[a, b]` meaning you must take b before a, return true if you can finish every course (i.e. the prerequisite graph has no cycle).",
    beginnerExplanation:
      "Model courses as nodes and prerequisites as directed edges. You can finish everything exactly when there's no cycle. Kahn's algorithm peels off courses with zero remaining prerequisites one by one; if you manage to peel off all of them, there was no cycle.",
    realWorldAnalogy:
      "A to-do list where some tasks depend on others. You keep doing whatever currently has nothing blocking it, which unblocks more tasks. If you ever get stuck with tasks left but nothing doable, they're trapped in a dependency loop.",
    visualExplanation:
      "numCourses=2, prereqs=[[1,0]]\nindeg: course0=0, course1=1\nqueue starts [0] → take 0, unblock 1 (indeg→0), queue [1] → take 1\nseen=2 == numCourses → true",
    approaches: [
      {
        title: "DFS cycle detection",
        tier: "Optimal",
        idea: "DFS with three states (unseen / in-progress / done); revisiting an in-progress node is a cycle.",
        steps: ["Build adjacency list", "DFS each node tracking the recursion stack", "A back-edge to an in-progress node → cycle → false"],
        time: "O(V + E)",
        space: "O(V + E)",
      },
      {
        title: "Kahn's topological sort (BFS)",
        tier: "Optimal",
        idea: "Repeatedly remove zero-indegree nodes; if all get removed there's no cycle.",
        steps: [
          "Compute indegree of every course",
          "Queue all indegree-0 courses",
          "Pop one, decrement neighbours' indegree, enqueue new zeros",
          "Finishable iff processed count == numCourses",
        ],
        time: "O(V + E)",
        space: "O(V + E)",
      },
    ],
    dryRun:
      "numCourses=2, prereqs=[[1,0],[0,1]] (cycle)\nindeg: 0→1, 1→1\nno course has indeg 0 → queue empty → seen=0 != 2 → false",
    interviewTips: [
      "Frame it as 'detect a cycle in a directed graph' — the interviewer wants that translation.",
      "Kahn's also naturally produces a valid course order (the Course Schedule II follow-up).",
    ],
    commonMistakes: [
      "Reversing the edge direction (prereq [a,b] means b → a).",
      "DFS without an in-progress marker, so you can't tell a cycle from an already-finished node.",
    ],
    followUps: ["Course Schedule II: return a valid ordering.", "Detect and report the cycle itself."],
    related: ["number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque, defaultdict

def can_finish(num_courses, prerequisites):
    graph = defaultdict(list)
    indeg = [0] * num_courses
    for course, pre in prerequisites:
        graph[pre].append(course)
        indeg[course] += 1
    queue = deque(i for i in range(num_courses) if indeg[i] == 0)
    seen = 0
    while queue:
        node = queue.popleft()
        seen += 1
        for nxt in graph[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                queue.append(nxt)
    return seen == num_courses`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
        int[] indeg = new int[numCourses];
        for (int[] p : prerequisites) {
            graph.get(p[1]).add(p[0]);
            indeg[p[0]]++;
        }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) queue.add(i);
        int seen = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            seen++;
            for (int next : graph.get(node)) {
                if (--indeg[next] == 0) queue.add(next);
            }
        }
        return seen == numCourses;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indeg = new Array(numCourses).fill(0);
  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    indeg[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let seen = 0;
  while (queue.length) {
    const node = queue.shift();
    seen++;
    for (const next of graph[node]) {
      if (--indeg[next] === 0) queue.push(next);
    }
  }
  return seen === numCourses;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean canFinish(Integer numCourses, List<List<Integer>> prerequisites) {
        Map<Integer, List<Integer>> graph = new Map<Integer, List<Integer>>();
        List<Integer> indeg = new List<Integer>();
        for (Integer i = 0; i < numCourses; i++) {
            graph.put(i, new List<Integer>());
            indeg.add(0);
        }
        for (List<Integer> p : prerequisites) {
            graph.get(p[1]).add(p[0]);
            indeg[p[0]] += 1;
        }
        List<Integer> queue = new List<Integer>();
        for (Integer i = 0; i < numCourses; i++) {
            if (indeg[i] == 0) queue.add(i);
        }
        Integer seen = 0, head = 0;
        while (head < queue.size()) {
            Integer node = queue[head];
            head++;
            seen++;
            for (Integer nxt : graph.get(node)) {
                indeg[nxt] -= 1;
                if (indeg[nxt] == 0) queue.add(nxt);
            }
        }
        return seen == numCourses;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees", "Recursion"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root down to a leaf.",
    beginnerExplanation:
      "A tree's depth is 1 (for the current node) plus the deeper of its two subtrees. Define it recursively: an empty tree has depth 0, and any node's depth is 1 + max(depth of left, depth of right). The recursion does the rest.",
    realWorldAnalogy:
      "Measuring the height of a family tree by branches. Your generation count is one more than the tallest sub-lineage beneath you — you just take the taller of your two children's trees and add yourself.",
    visualExplanation:
      "    3\n   / \\\n  9   20\n     /  \\\n    15   7\ndepth(9)=1, depth(15)=depth(7)=1 → depth(20)=2 → depth(3)=1+max(1,2)=3",
    approaches: [
      {
        title: "Recursive DFS",
        tier: "Optimal",
        idea: "depth(node) = 1 + max(depth(left), depth(right)); null → 0.",
        steps: ["If node is null return 0", "Return 1 + max of the two recursive subtree depths"],
        time: "O(n)",
        space: "O(h) recursion stack (h = height)",
      },
      {
        title: "Iterative BFS level count",
        tier: "Optimal",
        idea: "Process the tree level by level with a queue and count the levels.",
        steps: ["Queue the root", "For each level, expand all nodes and enqueue children", "Increment a depth counter per level"],
        time: "O(n)",
        space: "O(n) widest level",
      },
    ],
    dryRun:
      "tree: 1 with left 2 (leaf)\ndepth(2)=1+max(0,0)=1\ndepth(1)=1+max(depth(2)=1, 0)=2 → 2",
    interviewTips: [
      "Offer both: recursion is the natural answer; BFS avoids stack overflow on a pathological skewed tree.",
      "Note the space cost is the tree height for recursion (O(log n) balanced, O(n) skewed).",
    ],
    commonMistakes: [
      "Returning depth as edges instead of nodes (off by one).",
      "Forgetting the null base case.",
    ],
    followUps: ["Minimum depth to a leaf.", "Check whether the tree is height-balanced.", "Diameter of the tree."],
    related: ["invert-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      },
    ],
  },
  {
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees", "Recursion"],
    companies: ["google", "amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given the root of a binary tree, invert it (mirror it left-to-right) and return the root.",
    beginnerExplanation:
      "Mirroring a tree just means swapping every node's left and right children. Do it recursively: swap the current node's two children, then invert each subtree. Order doesn't matter as long as you don't lose a reference during the swap.",
    realWorldAnalogy:
      "Holding a tree-shaped mobile up to a mirror. Every branch that pointed left now points right and vice-versa, all the way down — you flip each fork in turn.",
    visualExplanation:
      "   4              4\n  / \\            / \\\n 2   7    →     7   2\n/ \\ / \\        / \\ / \\\n1 3 6 9        9 6 3 1",
    approaches: [
      {
        title: "Recursive swap",
        tier: "Optimal",
        idea: "Swap children at each node, recursing into both subtrees.",
        steps: ["If null return null", "Swap left/right (carefully saving one)", "Recurse into both children"],
        time: "O(n)",
        space: "O(h) recursion stack",
      },
      {
        title: "Iterative with a queue/stack",
        tier: "Optimal",
        idea: "Traverse, swapping children at each popped node.",
        steps: ["Push root", "Pop a node, swap its children, push the children", "Repeat until empty"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "tree: 1 (left 2, right 3)\nswap → 1 (left 3, right 2); invert(3)=3, invert(2)=2 → done",
    interviewTips: [
      "Save one child reference before overwriting so you don't lose a subtree mid-swap.",
      "It's trivially short — use the moment to demonstrate crisp recursion and base cases.",
    ],
    commonMistakes: [
      "Overwriting root.left before stashing it, then assigning a now-mutated value to root.right.",
      "Forgetting to return the root.",
    ],
    followUps: ["Check if a tree is symmetric (mirror of itself).", "Do it iteratively without recursion."],
    related: ["maximum-depth-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        root.left = invertTree(root.right);
        root.right = left;
        return root;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        root.left = invertTree(root.right);
        root.right = left;
        return root;
    }
}`,
      },
    ],
  },
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Strings", "Stacks"],
    companies: ["amazon", "meta", "google", "microsoft"],
    sheets: ["blind75", "neetcode150", "top50"],
    frequency: 5,
    statement:
      "Given a string containing just '()', '[]' and '{}', determine if the brackets are validly matched and properly nested.",
    beginnerExplanation:
      "Every closing bracket must match the most recently opened one — that's last-in-first-out, which is exactly a stack. Push opening brackets; on a closing bracket, the top of the stack must be its partner. At the end the stack must be empty.",
    realWorldAnalogy:
      "Stacking plates as you open them and removing the top plate when you close. You can only take off the plate you put on last; if the plate on top doesn't match the lid you're closing, something's wrong.",
    visualExplanation:
      's = "([])"\n( → push, stack=[(]\n[ → push, stack=[(,[]\n] → top [ matches → pop, stack=[(]\n) → top ( matches → pop, stack=[]\nempty → valid',
    approaches: [
      {
        title: "Repeatedly strip matched pairs",
        tier: "Brute Force",
        idea: "Keep removing adjacent '()', '[]', '{}' until nothing changes; valid iff empty.",
        steps: ["Replace inner-most pairs with empty string", "Repeat until stable", "Valid iff result is empty"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "Stack of expected closers",
        tier: "Optimal",
        idea: "Push the matching closing bracket on each opener; verify on each closer.",
        steps: [
          "For each char: if opener, push its matching closer",
          "If closer, it must equal the popped top (or stack empty → invalid)",
          "Valid iff the stack ends empty",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      's="(]"\n( → push ), stack=[)]\n] → pop → ) != ] → return false',
    interviewTips: [
      "Say 'LIFO ⇒ stack' explicitly — that classification is what's being tested.",
      "Handle the empty-stack-on-closer case, otherwise ')' alone crashes or wrongly passes.",
    ],
    commonMistakes: [
      "Forgetting the final empty-stack check, so '(((' passes.",
      "Popping an empty stack without guarding it.",
    ],
    followUps: [
      "Minimum additions to make the parentheses valid.",
      "Longest valid parentheses substring (DP / stack of indices).",
    ],
    related: ["climbing-stairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(') stack.push(')');
            else if (ch == '[') stack.push(']');
            else if (ch == '{') stack.push('}');
            else if (stack.isEmpty() || stack.pop() != ch) return false;
        }
        return stack.isEmpty();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isValid(String s) {
        Map<String, String> pairs = new Map<String, String>{
            ')' => '(', ']' => '[', '}' => '{'
        };
        List<String> stack = new List<String>();
        for (Integer i = 0; i < s.length(); i++) {
            String ch = s.substring(i, i + 1);
            if (pairs.containsKey(ch)) {
                if (stack.isEmpty() || stack.remove(stack.size() - 1) != pairs.get(ch)) {
                    return false;
                }
            } else {
                stack.add(ch);
            }
        }
        return stack.isEmpty();
    }
}`,
      },
    ],
  },
  {
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google", "apple"],
    sheets: ["neetcode150", "top50"],
    frequency: 4,
    statement:
      "Given coin denominations `coins` and a target `amount`, return the fewest coins needed to make that amount, or -1 if it can't be made. You have an unlimited supply of each coin.",
    beginnerExplanation:
      "Build the answer up from amount 0. For each amount, try every coin: the best way to make `a` is one coin plus the best way to make `a - coin`. Fill a table from 0 up to the target, and the last cell is your answer.",
    realWorldAnalogy:
      "Making exact change at a till with the fewest coins. You figure out the cheapest way to make 1¢, then 2¢, and so on — each new amount reuses the cheapest answer for a smaller amount plus one more coin.",
    visualExplanation:
      "coins=[1,2,5], amount=6\ndp[0]=0\ndp[1]=1 dp[2]=1 dp[3]=2 dp[4]=2 dp[5]=1 dp[6]=min(dp[5],dp[4],dp[1])+1=2  (5+1 or ... → 2 coins)",
    approaches: [
      {
        title: "Exhaustive recursion",
        tier: "Brute Force",
        idea: "Try every coin at every step; explore all combinations.",
        steps: ["best(a) = 1 + min over coins of best(a - coin)", "Recompute overlapping subproblems"],
        time: "O(amount^coins) exponential",
        space: "O(amount) stack",
      },
      {
        title: "Bottom-up DP table",
        tier: "Optimal",
        idea: "dp[a] = fewest coins for amount a, built from smaller amounts.",
        steps: [
          "dp[0]=0, rest = amount+1 (sentinel for 'impossible')",
          "For a in 1..amount, for each coin ≤ a: dp[a] = min(dp[a], dp[a-coin]+1)",
          "Return dp[amount] if reachable else -1",
        ],
        time: "O(amount × coins)",
        space: "O(amount)",
      },
    ],
    dryRun:
      "coins=[2], amount=3\ndp=[0,4,4,4]\na=1: no coin ≤1 except 2? 2>1 → stays 4\na=2: dp[2]=min(4, dp[0]+1)=1\na=3: dp[3]=min(4, dp[1]+1=5)=4 → 4 > 3 → return -1",
    interviewTips: [
      "Explain the sentinel (amount+1) — it represents 'unreachable' and never beats a real answer.",
      "Note that a greedy 'largest coin first' is wrong in general (e.g. coins [1,3,4], amount 6).",
    ],
    commonMistakes: [
      "Greedily taking the biggest coin — fails for many denomination sets.",
      "Returning the sentinel instead of -1 when the amount is unreachable.",
    ],
    followUps: [
      "Count the number of distinct combinations (Coin Change II).",
      "Reconstruct which coins were used.",
    ],
    related: ["climbing-stairs", "house-robber"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] <= amount else -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer coinChange(List<Integer> coins, Integer amount) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= amount; i++) dp.add(amount + 1);
        dp[0] = 0;
        for (Integer a = 1; a <= amount; a++) {
            for (Integer c : coins) {
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      },
    ],
  },
  {
    slug: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "You're a robber on a street of houses, each holding some money. You can't rob two adjacent houses (alarms link them). Given an array `nums` of house values, return the maximum you can steal.",
    beginnerExplanation:
      "At each house you choose: skip it (keep your previous best) or rob it (its value plus the best from two houses back, since the neighbour is off-limits). Carry just those two running bests — no full array needed.",
    realWorldAnalogy:
      "Picking non-adjacent stepping stones across a stream to gather the most coins. Landing on a stone means you couldn't have used the one right before it, so each choice looks two stones back.",
    visualExplanation:
      "nums = [2,7,9,3,1]\nrob/skip running max:\n2 → 7 → max(9+2,7)=11 → max(3+7,11)=11 → max(1+11,11)=12  → 12",
    approaches: [
      {
        title: "Recurse over rob/skip choices",
        tier: "Brute Force",
        idea: "At each house branch into rob (skip neighbour) vs skip.",
        steps: ["best(i) = max(best(i-1), nums[i] + best(i-2))", "Recompute overlapping subproblems"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "DP with two rolling variables",
        tier: "Optimal",
        idea: "Track best-excluding-current and best-including-options with two scalars.",
        steps: [
          "prev2 = 0, prev1 = 0",
          "For each n: cur = max(prev1, prev2 + n); shift prev2=prev1, prev1=cur",
          "Return prev1",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[2,1,1,2]\nprev2=0 prev1=0\nn=2: cur=max(0,0+2)=2 → prev2=0 prev1=2\nn=1: cur=max(2,0+1)=2 → prev2=2 prev1=2\nn=1: cur=max(2,2+1)=3 → prev2=2 prev1=3\nn=2: cur=max(3,2+2)=4 → 4",
    interviewTips: [
      "State the recurrence 'rob or skip' first; the O(1)-space rolling version follows naturally.",
      "It's the gateway to House Robber II (circular) and III (tree) — mention them as follow-ups.",
    ],
    commonMistakes: [
      "Looking back only one house instead of two.",
      "Mishandling the empty array or a single house.",
    ],
    followUps: [
      "House Robber II: houses in a circle.",
      "House Robber III: houses arranged as a binary tree.",
    ],
    related: ["coin-change", "climbing-stairs", "maximum-subarray"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rob(nums):
    prev2 = prev1 = 0
    for n in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + n)
    return prev1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int n : nums) {
            int cur = Math.max(prev1, prev2 + n);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const n of nums) {
    const cur = Math.max(prev1, prev2 + n);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer rob(List<Integer> nums) {
        Integer prev2 = 0, prev1 = 0;
        for (Integer n : nums) {
            Integer cur = Math.max(prev1, prev2 + n);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}`,
      },
    ],
  },
];

export const PROBLEM_MAP: Record<string, Problem> = Object.fromEntries(
  PROBLEMS.map((p) => [p.slug, p]),
);

export function getProblem(slug: string): Problem | undefined {
  return PROBLEM_MAP[slug];
}

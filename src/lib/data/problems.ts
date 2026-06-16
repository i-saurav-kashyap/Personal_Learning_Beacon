import type { Problem } from "@/lib/types";
import { PROBLEMS_BATCH_A } from "@/lib/data/problems-batch-a";
import { PROBLEMS_BATCH_B } from "@/lib/data/problems-batch-b";
import { PROBLEMS_BATCH_C } from "@/lib/data/problems-batch-c";
import { PROBLEMS_BATCH_D } from "@/lib/data/problems-batch-d";
import { PROBLEMS_BATCH_E } from "@/lib/data/problems-batch-e";
import { PROBLEMS_BATCH_F } from "@/lib/data/problems-batch-f";
import { PROBLEMS_BATCH_G } from "@/lib/data/problems-batch-g";
import { PROBLEMS_BATCH_H } from "@/lib/data/problems-batch-h";
import { PROBLEMS_BATCH_I } from "@/lib/data/problems-batch-i";
import { PROBLEMS_BATCH_J } from "@/lib/data/problems-batch-j";
import { PROBLEMS_BATCH_K } from "@/lib/data/problems-batch-k";
import { PROBLEMS_BATCH_L } from "@/lib/data/problems-batch-l";
import { PROBLEMS_BATCH_M } from "@/lib/data/problems-batch-m";
import { PROBLEMS_BATCH_N } from "@/lib/data/problems-batch-n";
import { PROBLEMS_BATCH_O } from "@/lib/data/problems-batch-o";
import { PROBLEMS_BATCH_P } from "@/lib/data/problems-batch-p";
import { PROBLEMS_BATCH_Q } from "@/lib/data/problems-batch-q";
import { PROBLEMS_BATCH_R } from "@/lib/data/problems-batch-r";
import { PROBLEMS_BATCH_S } from "@/lib/data/problems-batch-s";
import { PROBLEMS_BATCH_T } from "@/lib/data/problems-batch-t";
import { PROBLEMS_BATCH_U } from "@/lib/data/problems-batch-u";
import { PROBLEMS_BATCH_V } from "@/lib/data/problems-batch-v";

// ---------------------------------------------------------------------------
// Seed question library. Each entry follows the full teaching template:
// statement → beginner → analogy → visual → brute/better/optimal → dry run →
// complexity → tips → mistakes → follow-ups → related → multi-language code.
// Content is original / community-style; we never claim a question was
// "officially asked" by any company.
// ---------------------------------------------------------------------------

const BASE_PROBLEMS: Problem[] = [
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
  {
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["google", "amazon", "meta"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given an unsorted array of integers `nums`, return the length of the longest sequence of consecutive integers. The algorithm must run in O(n).",
    beginnerExplanation:
      "Sorting would give O(n log n). The trick is to dump everything into a set, then only start counting from numbers that are the START of a run (i.e. the number one smaller isn't present). Each number is visited at most twice, so it's O(n).",
    realWorldAnalogy:
      "Imagine scattered house numbers on a street. You only bother walking the street starting from a house whose left neighbour is missing — that way you walk each block exactly once instead of restarting from the middle.",
    visualExplanation:
      "nums = [100,4,200,1,3,2]\nset = {1,2,3,4,100,200}\n1 has no 0 -> count 1,2,3,4 = 4\n100 has no 99 -> 1\n200 has no 199 -> 1\nlongest = 4",
    approaches: [
      {
        title: "Sort then scan",
        tier: "Brute Force",
        idea: "Sort and count consecutive runs.",
        steps: ["Sort the array", "Walk it counting runs where each value is prev+1"],
        time: "O(n log n)",
        space: "O(1)",
      },
      {
        title: "Hash set, count from run starts",
        tier: "Optimal",
        idea: "Only expand sequences from numbers that have no predecessor in the set.",
        steps: [
          "Put all numbers in a set",
          "For each n where n-1 is absent, walk n, n+1, n+2... counting length",
          "Track the maximum length",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "n=4: 3 present so 4 is not a start, skip\nn=1: 0 absent -> walk 1,2,3,4 length 4\nresult 4",
    interviewTips: [
      "Say out loud why it's O(n) despite the inner while loop — the 'only start from run beginnings' guard is the whole point.",
      "Clarify whether duplicates exist; a set handles them naturally.",
    ],
    commonMistakes: [
      "Expanding a sequence from every element (that's O(n^2)).",
      "Forgetting the 'n-1 not in set' guard.",
    ],
    followUps: ["Return the actual sequence, not just its length.", "What if the stream is too big for memory?"],
    related: ["two-sum", "contains-duplicate"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_consecutive(nums):
    s = set(nums)
    best = 0
    for n in s:
        if n - 1 not in s:
            length = 1
            while n + length in s:
                length += 1
            best = max(best, length)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> s = new HashSet<>();
        for (int n : nums) s.add(n);
        int best = 0;
        for (int n : s) {
            if (!s.contains(n - 1)) {
                int length = 1;
                while (s.contains(n + length)) length++;
                best = Math.max(best, length);
            }
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestConsecutive(nums) {
  const s = new Set(nums);
  let best = 0;
  for (const n of s) {
    if (!s.has(n - 1)) {
      let length = 1;
      while (s.has(n + length)) length++;
      best = Math.max(best, length);
    }
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestConsecutive(List<Integer> nums) {
        Set<Integer> s = new Set<Integer>(nums);
        Integer best = 0;
        for (Integer n : s) {
            if (!s.contains(n - 1)) {
                Integer length = 1;
                while (s.contains(n + length)) length++;
                best = Math.max(best, length);
            }
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "two-sum-ii",
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "apple"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given a 1-indexed array `numbers` sorted in non-decreasing order, return the 1-based indices of the two numbers that add up to `target`. Use O(1) extra space.",
    beginnerExplanation:
      "Because the array is already sorted, you don't need a hash map. Put one pointer at the start and one at the end; if the sum is too big move the right pointer left, if too small move the left pointer right.",
    realWorldAnalogy:
      "Two people walking toward each other on a sorted number line, adjusting their steps until their values add up to exactly the target.",
    visualExplanation:
      "numbers = [2,7,11,15], target = 9\nl=0 r=3 -> 2+15=17 >9 -> r--\nl=0 r=2 -> 2+11=13 >9 -> r--\nl=0 r=1 -> 2+7=9 -> [1,2]",
    approaches: [
      {
        title: "Hash map",
        tier: "Better",
        idea: "Same as Two Sum, but ignores the sorted property and uses O(n) space.",
        steps: ["Store seen values", "Look for complement"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two pointers",
        tier: "Optimal",
        idea: "Exploit the sorted order to converge from both ends with no extra space.",
        steps: [
          "l = 0, r = n-1",
          "If numbers[l]+numbers[r] == target return [l+1, r+1]",
          "If sum < target l++ else r--",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "target=9 [2,7,11,15]\n2+15=17>9 r--\n2+11=13>9 r--\n2+7=9 -> answer [1,2]",
    interviewTips: [
      "Mention the 1-indexed return — a classic off-by-one trap.",
      "Contrast with Two Sum: sorted input unlocks O(1) space.",
    ],
    commonMistakes: ["Returning 0-based indices.", "Using a hash map and missing the O(1)-space ask."],
    followUps: ["What if there are multiple valid pairs?", "Three numbers summing to target (3Sum)."],
    related: ["two-sum", "three-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def two_sum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l + 1, r + 1]
        if s < target:
            l += 1
        else:
            r -= 1
    return []`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int l = 0, r = numbers.length - 1;
        while (l < r) {
            int s = numbers[l] + numbers[r];
            if (s == target) return new int[] { l + 1, r + 1 };
            if (s < target) l++;
            else r--;
        }
        return new int[] {};
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function twoSum(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const s = numbers[l] + numbers[r];
    if (s === target) return [l + 1, r + 1];
    if (s < target) l++;
    else r--;
  }
  return [];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> twoSum(List<Integer> numbers, Integer target) {
        Integer l = 0, r = numbers.size() - 1;
        while (l < r) {
            Integer s = numbers[l] + numbers[r];
            if (s == target) return new List<Integer>{ l + 1, r + 1 };
            if (s < target) l++;
            else r--;
        }
        return new List<Integer>();
    }
}`,
      },
    ],
  },
  {
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given `height[]` representing an elevation map where each bar has width 1, compute how much water it can trap after raining.",
    beginnerExplanation:
      "Water above any bar is limited by the shorter of the tallest wall to its left and the tallest wall to its right. With two pointers you always process the side with the smaller wall, because that side's answer is fully determined.",
    realWorldAnalogy:
      "Water pooling between buildings — each puddle's depth is capped by the lower of the two tallest buildings flanking it.",
    visualExplanation:
      "height = [0,1,0,2,1,0,1,3,2,1,2,1]\nwater above each dip is min(leftMax,rightMax)-height\ntotal = 6",
    approaches: [
      {
        title: "Prefix max arrays",
        tier: "Better",
        idea: "Precompute leftMax and rightMax for every index.",
        steps: ["Build leftMax[] and rightMax[]", "Sum min(leftMax[i],rightMax[i])-height[i]"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two pointers",
        tier: "Optimal",
        idea: "Move the pointer on the smaller side; that side's bound is known.",
        steps: [
          "l=0,r=n-1, leftMax=rightMax=0, total=0",
          "If height[l] < height[r]: update leftMax, add leftMax-height[l], l++",
          "Else update rightMax, add rightMax-height[r], r--",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "Smaller side dictates the bound. Walk inward, accumulating (curMax - height) on whichever side is lower.",
    interviewTips: [
      "Explain WHY moving the smaller side is safe: its trapped water depends only on its own max.",
      "The O(1)-space two-pointer version is the impressive answer.",
    ],
    commonMistakes: ["Off-by-one on pointer movement.", "Updating max after adding water instead of before."],
    followUps: ["2D version (Trapping Rain Water II) uses a heap.", "Return the per-index water profile."],
    related: ["container-with-most-water"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def trap(height):
    l, r = 0, len(height) - 1
    left_max = right_max = total = 0
    while l < r:
        if height[l] < height[r]:
            left_max = max(left_max, height[l])
            total += left_max - height[l]
            l += 1
        else:
            right_max = max(right_max, height[r])
            total += right_max - height[r]
            r -= 1
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int leftMax = 0, rightMax = 0, total = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                leftMax = Math.max(leftMax, height[l]);
                total += leftMax - height[l];
                l++;
            } else {
                rightMax = Math.max(rightMax, height[r]);
                total += rightMax - height[r];
                r--;
            }
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function trap(height) {
  let l = 0, r = height.length - 1;
  let leftMax = 0, rightMax = 0, total = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      leftMax = Math.max(leftMax, height[l]);
      total += leftMax - height[l];
      l++;
    } else {
      rightMax = Math.max(rightMax, height[r]);
      total += rightMax - height[r];
      r--;
    }
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer trap(List<Integer> height) {
        Integer l = 0, r = height.size() - 1;
        Integer leftMax = 0, rightMax = 0, total = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                leftMax = Math.max(leftMax, height[l]);
                total += leftMax - height[l];
                l++;
            } else {
                rightMax = Math.max(rightMax, height[r]);
                total += rightMax - height[r];
                r--;
            }
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    patterns: ["sliding-window"],
    topics: ["Strings", "Hashing"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given a string `s` and integer `k`, you may replace at most `k` characters. Return the length of the longest substring containing the same letter after replacements.",
    beginnerExplanation:
      "Slide a window. A window is valid if (window length - count of its most frequent char) <= k, meaning the other chars can all be converted. Grow right; if invalid, shrink left.",
    realWorldAnalogy:
      "You have k coats of paint to make a stretch of fence one colour. The longest stretch you can unify is bounded by how many planks already share the dominant colour plus your k coats.",
    visualExplanation:
      's = "AABABBA", k = 1\nwindow grows; valid while (len - maxFreq) <= 1\nbest window length = 4',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "For each substring, see if it can be unified within k swaps.",
        steps: ["Enumerate substrings", "Count chars, check len-maxFreq<=k"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "Sliding window with frequency",
        tier: "Optimal",
        idea: "Track counts and the max frequency; shrink when (len - maxFreq) > k.",
        steps: [
          "Expand right, increment count[s[right]], update maxFreq",
          "If (right-left+1 - maxFreq) > k, drop count[s[left]], left++",
          "Answer is the largest window seen",
        ],
        time: "O(n)",
        space: "O(1) (26 letters)",
      },
    ],
    dryRun: "Keep maxFreq of the window; valid iff windowLen - maxFreq <= k. Track widest valid window.",
    interviewTips: [
      "You don't strictly need to recompute maxFreq when shrinking — a stale maxFreq still yields the correct answer because the window only grows when it can beat the best.",
    ],
    commonMistakes: ["Recomputing maxFreq every shrink (unnecessary, but harmless).", "Off-by-one in window length."],
    followUps: ["At most k distinct characters.", "Return the substring itself."],
    related: ["longest-substring-without-repeating", "permutation-in-string"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def character_replacement(s, k):
    count = {}
    left = max_freq = best = 0
    for right, ch in enumerate(s):
        count[ch] = count.get(ch, 0) + 1
        max_freq = max(max_freq, count[ch])
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);
            while ((right - left + 1) - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
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
        code: `function characterReplacement(s, k) {
  const count = {};
  let left = 0, maxFreq = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    count[ch] = (count[ch] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[ch]);
    while (right - left + 1 - maxFreq > k) {
      count[s[left]]--;
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
    public static Integer characterReplacement(String s, Integer k) {
        Map<String, Integer> count = new Map<String, Integer>();
        Integer left = 0, maxFreq = 0, best = 0;
        for (Integer right = 0; right < s.length(); right++) {
            String ch = s.substring(right, right + 1);
            count.put(ch, (count.containsKey(ch) ? count.get(ch) : 0) + 1);
            maxFreq = Math.max(maxFreq, count.get(ch));
            while ((right - left + 1) - maxFreq > k) {
                String lc = s.substring(left, left + 1);
                count.put(lc, count.get(lc) - 1);
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
    slug: "permutation-in-string",
    title: "Permutation in String",
    difficulty: "Medium",
    patterns: ["sliding-window"],
    topics: ["Strings", "Hashing"],
    companies: ["microsoft", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given strings `s1` and `s2`, return true if `s2` contains a permutation of `s1` as a contiguous substring.",
    beginnerExplanation:
      "A permutation has the exact same character counts. Slide a fixed-size window (length of s1) across s2 and check whether the window's character counts match s1's counts.",
    realWorldAnalogy:
      "Looking for an anagram of a word hidden inside a longer text by sliding a fixed-width frame and comparing letter tallies.",
    visualExplanation:
      's1 = "ab", s2 = "eidbaooo"\nwindow size 2 slides: "ei","id","db","ba" <- matches counts of "ab" -> true',
    approaches: [
      {
        title: "Sort every window",
        tier: "Brute Force",
        idea: "Sort each length-|s1| window and compare to sorted s1.",
        steps: ["For each window sort and compare"],
        time: "O(n * k log k)",
        space: "O(k)",
      },
      {
        title: "Fixed sliding window of counts",
        tier: "Optimal",
        idea: "Maintain a count array for the current window and compare to s1's counts.",
        steps: [
          "Build count of s1",
          "Slide a window of size |s1| over s2 updating counts",
          "Return true when window counts equal s1 counts",
        ],
        time: "O(n)",
        space: "O(1) (26 letters)",
      },
    ],
    dryRun: "Compare 26-length count arrays of s1 and each window; match means a permutation is present.",
    interviewTips: [
      "Track a 'matches' counter of how many of the 26 buckets are equal to avoid re-scanning all 26 each step.",
    ],
    commonMistakes: ["Window size off by one.", "Comparing strings instead of multisets."],
    followUps: ["Find all start indices (Find All Anagrams).", "Unicode alphabets."],
    related: ["valid-anagram", "group-anagrams"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def check_inclusion(s1, s2):
    if len(s1) > len(s2):
        return False
    need = [0] * 26
    win = [0] * 26
    for c in s1:
        need[ord(c) - 97] += 1
    for i, c in enumerate(s2):
        win[ord(c) - 97] += 1
        if i >= len(s1):
            win[ord(s2[i - len(s1)]) - 97] -= 1
        if win == need:
            return True
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] need = new int[26], win = new int[26];
        for (char c : s1.toCharArray()) need[c - 'a']++;
        for (int i = 0; i < s2.length(); i++) {
            win[s2.charAt(i) - 'a']++;
            if (i >= s1.length()) win[s2.charAt(i - s1.length()) - 'a']--;
            if (Arrays.equals(win, need)) return true;
        }
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const idx = (c) => c.charCodeAt(0) - 97;
  for (const c of s1) need[idx(c)]++;
  for (let i = 0; i < s2.length; i++) {
    win[idx(s2[i])]++;
    if (i >= s1.length) win[idx(s2[i - s1.length])]--;
    if (win.every((v, j) => v === need[j])) return true;
  }
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        List<Integer> need = new List<Integer>();
        List<Integer> win = new List<Integer>();
        for (Integer i = 0; i < 26; i++) { need.add(0); win.add(0); }
        for (Integer i = 0; i < s1.length(); i++) {
            Integer c = s1.charAt(i) - 97;
            need[c] = need[c] + 1;
        }
        for (Integer i = 0; i < s2.length(); i++) {
            Integer c = s2.charAt(i) - 97;
            win[c] = win[c] + 1;
            if (i >= s1.length()) {
                Integer old = s2.charAt(i - s1.length()) - 97;
                win[old] = win[old] - 1;
            }
            if (win == need) return true;
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Design a stack supporting push, pop, top, and retrieving the minimum element — all in O(1).",
    beginnerExplanation:
      "The tricky part is O(1) min. Alongside the main stack, keep a second stack that records the minimum so far at each level. When you pop, both stacks pop together, so the top of the min-stack is always the current minimum.",
    realWorldAnalogy:
      "A stack of plates where each plate has a sticky note saying 'lightest plate at or below me'. Glance at the top note and you instantly know the lightest plate.",
    visualExplanation:
      "push 5 -> min[5]\npush 3 -> min[5,3]\npush 7 -> min[5,3,3]\ngetMin -> 3; pop; getMin -> 3; pop; getMin -> 5",
    approaches: [
      {
        title: "Scan for min on demand",
        tier: "Brute Force",
        idea: "Keep a normal stack; compute min by scanning when asked.",
        steps: ["push/pop normally", "getMin scans the whole stack"],
        time: "O(n) getMin",
        space: "O(n)",
      },
      {
        title: "Auxiliary min stack",
        tier: "Optimal",
        idea: "Mirror stack storing the running minimum at each depth.",
        steps: [
          "On push, push min(value, currentMin) onto the min stack",
          "On pop, pop both stacks",
          "getMin returns the min stack's top",
        ],
        time: "O(1) all ops",
        space: "O(n)",
      },
    ],
    dryRun: "push 2 (min2), push 0 (min0), push 3 (min0); getMin=0; pop; getMin=0; pop; getMin=2",
    interviewTips: [
      "Mention you could store just deltas to the min to save space — but the two-stack version is clearest.",
    ],
    commonMistakes: ["Forgetting to pop the min stack in lockstep.", "Using strict < and mishandling duplicate minима."],
    followUps: ["Implement a Max Stack.", "Do it with a single stack of (val, min) pairs."],
    related: ["valid-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        self.mins.append(val if not self.mins else min(val, self.mins[-1]))

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class MinStack {
    private Deque<Integer> stack = new ArrayDeque<>();
    private Deque<Integer> mins = new ArrayDeque<>();

    public void push(int val) {
        stack.push(val);
        mins.push(mins.isEmpty() ? val : Math.min(val, mins.peek()));
    }
    public void pop() { stack.pop(); mins.pop(); }
    public int top() { return stack.peek(); }
    public int getMin() { return mins.peek(); }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }
  push(val) {
    this.stack.push(val);
    this.mins.push(this.mins.length ? Math.min(val, this.mins[this.mins.length - 1]) : val);
  }
  pop() { this.stack.pop(); this.mins.pop(); }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.mins[this.mins.length - 1]; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class MinStack {
    private List<Integer> stack = new List<Integer>();
    private List<Integer> mins = new List<Integer>();

    public void push(Integer val) {
        stack.add(val);
        mins.add(mins.isEmpty() ? val : Math.min(val, mins[mins.size() - 1]));
    }
    public void pop() {
        stack.remove(stack.size() - 1);
        mins.remove(mins.size() - 1);
    }
    public Integer top() { return stack[stack.size() - 1]; }
    public Integer getMin() { return mins[mins.size() - 1]; }
}`,
      },
    ],
  },
  {
    slug: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks"],
    companies: ["amazon", "linkedin"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Evaluate an arithmetic expression in Reverse Polish Notation (postfix). Valid operators are +, -, *, /; division truncates toward zero.",
    beginnerExplanation:
      "In postfix, operators come after their operands. Push numbers onto a stack; when you hit an operator, pop the top two, apply it, and push the result back. The final stack value is the answer.",
    realWorldAnalogy:
      "A cafeteria tray stack: you set down plates (numbers), and when an operator arrives it takes the top two plates, combines them, and puts the single result back.",
    visualExplanation:
      'tokens = ["2","1","+","3","*"]\npush2,push1 -> +: 3 -> push3 -> *: 9 -> result 9',
    approaches: [
      {
        title: "Stack evaluation",
        tier: "Optimal",
        idea: "Push operands; on an operator, pop two and combine.",
        steps: [
          "For each token: if a number, push it",
          "If an operator, pop b then a, push a op b",
          "Return the remaining stack value",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[4,13,5,/,+] -> 13/5=2 -> 4+2=6",
    interviewTips: [
      "Watch operand order for - and /: it's a (op) b where a was pushed first (popped second).",
      "Clarify truncation direction for division.",
    ],
    commonMistakes: ["Reversing operands for subtraction/division.", "Float division instead of truncating toward zero."],
    followUps: ["Convert infix to postfix.", "Support parentheses and precedence (full calculator)."],
    related: ["valid-parentheses", "min-stack"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def eval_rpn(tokens):
    stack = []
    ops = {"+", "-", "*", "/"}
    for t in tokens:
        if t in ops:
            b = stack.pop()
            a = stack.pop()
            if t == "+": stack.append(a + b)
            elif t == "-": stack.append(a - b)
            elif t == "*": stack.append(a * b)
            else: stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(t))
    return stack[-1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> st = new ArrayDeque<>();
        for (String t : tokens) {
            switch (t) {
                case "+": st.push(st.pop() + st.pop()); break;
                case "*": st.push(st.pop() * st.pop()); break;
                case "-": { int b = st.pop(), a = st.pop(); st.push(a - b); break; }
                case "/": { int b = st.pop(), a = st.pop(); st.push(a / b); break; }
                default: st.push(Integer.parseInt(t));
            }
        }
        return st.pop();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function evalRPN(tokens) {
  const st = [];
  for (const t of tokens) {
    if (t === "+" || t === "-" || t === "*" || t === "/") {
      const b = st.pop(), a = st.pop();
      if (t === "+") st.push(a + b);
      else if (t === "-") st.push(a - b);
      else if (t === "*") st.push(a * b);
      else st.push(Math.trunc(a / b));
    } else st.push(parseInt(t, 10));
  }
  return st.pop();
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer evalRPN(List<String> tokens) {
        List<Integer> st = new List<Integer>();
        for (String t : tokens) {
            if (t == '+' || t == '-' || t == '*' || t == '/') {
                Integer b = st.remove(st.size() - 1);
                Integer a = st.remove(st.size() - 1);
                if (t == '+') st.add(a + b);
                else if (t == '-') st.add(a - b);
                else if (t == '*') st.add(a * b);
                else st.add(a / b);
            } else {
                st.add(Integer.valueOf(t));
            }
        }
        return st[st.size() - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    patterns: ["monotonic-stack"],
    topics: ["Arrays", "Stacks"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given daily `temperatures`, return an array where answer[i] is how many days until a warmer temperature. If none, put 0.",
    beginnerExplanation:
      "Keep a stack of indices whose warmer-day is still unknown, kept in decreasing temperature order. When today is warmer than the temperature at the stack top, we've found that day's answer — pop and record the gap.",
    realWorldAnalogy:
      "People waiting in line for 'the next taller person behind me'. As a taller person arrives, everyone shorter who was waiting gets their answer at once.",
    visualExplanation:
      "temps = [73,74,75,71,69,72,76,73]\nanswer = [1,1,4,2,1,1,0,0]",
    approaches: [
      {
        title: "Look ahead for each day",
        tier: "Brute Force",
        idea: "For each day scan forward to the next warmer day.",
        steps: ["For each i, scan j>i until temps[j]>temps[i]"],
        time: "O(n^2)",
        space: "O(1)",
      },
      {
        title: "Monotonic decreasing stack",
        tier: "Optimal",
        idea: "Stack holds indices of unresolved days; resolve them when a warmer day appears.",
        steps: [
          "For each i, while stack top's temp < temps[i]: pop j, answer[j] = i - j",
          "Push i",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "Each index is pushed and popped at most once -> linear. Gap = poppedIndex distance.",
    interviewTips: ["Store indices, not temperatures — you need the distance.", "This is the 'next greater element' template."],
    commonMistakes: ["Storing temps instead of indices.", "Wrong comparison direction for the monotonic stack."],
    followUps: ["Next Greater Element I/II (circular).", "Stock span problem."],
    related: ["valid-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def daily_temperatures(temperatures):
    answer = [0] * len(temperatures)
    stack = []  # indices, decreasing temps
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {
                int j = stack.pop();
                answer[j] = i - j;
            }
            stack.push(i);
        }
        return answer;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> dailyTemperatures(List<Integer> temperatures) {
        Integer n = temperatures.size();
        List<Integer> answer = new List<Integer>();
        for (Integer i = 0; i < n; i++) answer.add(0);
        List<Integer> stack = new List<Integer>();
        for (Integer i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[stack[stack.size() - 1]] < temperatures[i]) {
                Integer j = stack.remove(stack.size() - 1);
                answer[j] = i - j;
            }
            stack.add(i);
        }
        return answer;
    }
}`,
      },
    ],
  },
  {
    slug: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Strings"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
    beginnerExplanation:
      "Build strings character by character. You may add '(' while you still have opens left, and ')' only when there are more opens than closes already placed (so it stays valid). Recurse until the string is length 2n.",
    realWorldAnalogy:
      "Filling seats so every opener has a matching closer — you can't close a bracket you never opened, so you track how many are still open.",
    visualExplanation:
      "n=2 -> ['(())','()()']\nrule: add '(' if open<n; add ')' if close<open",
    approaches: [
      {
        title: "Generate all, filter valid",
        tier: "Brute Force",
        idea: "Produce every 2n-length string of brackets, keep the valid ones.",
        steps: ["Enumerate 2^(2n) strings", "Validate each"],
        time: "O(2^(2n) * n)",
        space: "O(n)",
      },
      {
        title: "Backtracking with open/close counts",
        tier: "Optimal",
        idea: "Only ever extend a prefix that can still become valid.",
        steps: [
          "Track open and close used",
          "Add '(' if open < n; recurse; undo",
          "Add ')' if close < open; recurse; undo",
          "Record string when length == 2n",
        ],
        time: "O(4^n / sqrt(n)) (Catalan)",
        space: "O(n)",
      },
    ],
    dryRun: "n=2: ( -> (( -> (()) ; ( -> () -> ()( -> ()()",
    interviewTips: ["State the invariant: close can never exceed open.", "Mention the count is the nth Catalan number."],
    commonMistakes: ["Allowing ')' when close == open.", "Forgetting the base case at length 2n."],
    followUps: ["Count valid combinations without listing them.", "Different bracket types."],
    related: ["valid-parentheses", "subsets"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def generate_parenthesis(n):
    res = []
    def backtrack(cur, open_n, close_n):
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if open_n < n:
            backtrack(cur + "(", open_n + 1, close_n)
        if close_n < open_n:
            backtrack(cur + ")", open_n, close_n + 1)
    backtrack("", 0, 0)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, "", 0, 0, n);
        return res;
    }
    private void backtrack(List<String> res, String cur, int open, int close, int n) {
        if (cur.length() == 2 * n) { res.add(cur); return; }
        if (open < n) backtrack(res, cur + "(", open + 1, close, n);
        if (close < open) backtrack(res, cur + ")", open, close + 1, n);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function generateParenthesis(n) {
  const res = [];
  function backtrack(cur, open, close) {
    if (cur.length === 2 * n) { res.push(cur); return; }
    if (open < n) backtrack(cur + "(", open + 1, close);
    if (close < open) backtrack(cur + ")", open, close + 1);
  }
  backtrack("", 0, 0);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<String> generateParenthesis(Integer n) {
        List<String> res = new List<String>();
        backtrack(res, '', 0, 0, n);
        return res;
    }
    private static void backtrack(List<String> res, String cur, Integer open, Integer close, Integer n) {
        if (cur.length() == 2 * n) { res.add(cur); return; }
        if (open < n) backtrack(res, cur + '(', open + 1, close, n);
        if (close < open) backtrack(res, cur + ')', open, close + 1, n);
    }
}`,
      },
    ],
  },
  {
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["blind75", "neetcode150"],
    frequency: 5,
    statement:
      "A sorted array was rotated at an unknown pivot. Given the array and a target, return its index, or -1, in O(log n).",
    beginnerExplanation:
      "Even after rotation, at any midpoint at least one half is still perfectly sorted. Figure out which half is sorted, check whether the target falls inside that sorted half, and discard the other half.",
    realWorldAnalogy:
      "A clock face cut and rotated: from any position, one arc still runs in clean numeric order — use that ordered arc to decide which way to go.",
    visualExplanation:
      "nums = [4,5,6,7,0,1,2], target = 0\nmid=7 left sorted (4..7), 0 not in it -> go right\n...find index 4",
    approaches: [
      {
        title: "Linear scan",
        tier: "Brute Force",
        idea: "Walk the array.",
        steps: ["Return index when found"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Modified binary search",
        tier: "Optimal",
        idea: "Identify the sorted half each step and narrow accordingly.",
        steps: [
          "If nums[lo] <= nums[mid], left half is sorted",
          "Target in [nums[lo], nums[mid]) -> hi=mid-1 else lo=mid+1",
          "Otherwise right half is sorted; mirror the logic",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "[4,5,6,7,0,1,2] t=0: left sorted, 0 not in [4,7) -> search right -> found at 4",
    interviewTips: ["Use <= when testing the left-sorted boundary to handle the mid==lo edge.", "Draw the two rotation cases."],
    commonMistakes: ["Wrong inclusive/exclusive bound when checking the sorted half.", "Infinite loop from bad lo/hi updates."],
    followUps: ["Array with duplicates (search II).", "Find the rotation pivot index."],
    related: ["binary-search", "find-minimum-in-rotated-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:           # left sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:                               # right sorted
            if nums[mid] < target <= nums[hi]:
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
            if (nums[lo] <= nums[mid]) {
                if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
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
            if (nums[lo] <= nums[mid]) {
                if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "A sorted array of unique values was rotated. Find the minimum element in O(log n).",
    beginnerExplanation:
      "Compare the middle to the rightmost element. If mid is bigger than the right end, the minimum must be to the right of mid; otherwise it's at mid or to its left. Shrink accordingly.",
    realWorldAnalogy:
      "Finding the lowest point in a rotated ring by always stepping toward the side that looks 'out of order'.",
    visualExplanation:
      "nums = [4,5,6,7,0,1,2]\nmid=7 > right(2) -> min on right -> lo=mid+1\nconverges to 0",
    approaches: [
      {
        title: "Linear min",
        tier: "Brute Force",
        idea: "Scan for the smallest.",
        steps: ["Track minimum across one pass"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Binary search vs right end",
        tier: "Optimal",
        idea: "The inflection (minimum) is where order breaks; compare mid to hi.",
        steps: [
          "If nums[mid] > nums[hi], min is right: lo = mid + 1",
          "Else min is at mid or left: hi = mid",
          "Stop when lo == hi",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "[3,4,5,1,2]: mid=5>2 -> lo=mid+1; mid=1<2 -> hi=mid; converge to 1",
    interviewTips: ["Compare to nums[hi], NOT nums[lo] — comparing to lo breaks on a non-rotated array.", "Use hi = mid (not mid-1) since mid could be the answer."],
    commonMistakes: ["Comparing mid to lo.", "Setting hi = mid - 1 and skipping the true minimum."],
    followUps: ["With duplicates (harder, O(n) worst case).", "Return the pivot index too."],
    related: ["search-in-rotated-sorted-array", "binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_min(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findMin(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findMin(List<Integer> nums) {
        Integer lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
}`,
      },
    ],
  },
  {
    slug: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Koko eats bananas at speed k per hour, finishing one pile per hour (leftovers wait). Given `piles` and `h` hours, find the minimum integer k to finish all piles within h hours.",
    beginnerExplanation:
      "This is 'binary search on the answer'. Speeds from 1 to max(pile) are monotonic: if speed k works, any faster speed also works. Binary search the smallest k whose total hours fit within h.",
    realWorldAnalogy:
      "Tuning a machine's throughput dial to the lowest setting that still finishes the job before the deadline — guess a setting, check if it's fast enough, adjust.",
    visualExplanation:
      "piles=[3,6,7,11], h=8\nspeed 4 -> ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4)=1+2+2+3=8 <=8 OK\nspeed 3 too slow -> answer 4",
    approaches: [
      {
        title: "Try every speed",
        tier: "Brute Force",
        idea: "Increment k from 1 until hours fit.",
        steps: ["For k=1..max: compute hours; return first that fits"],
        time: "O(max * n)",
        space: "O(1)",
      },
      {
        title: "Binary search on speed",
        tier: "Optimal",
        idea: "Feasibility is monotonic in k; binary search the boundary.",
        steps: [
          "lo=1, hi=max(piles)",
          "mid feasible (sum of ceil(pile/mid) <= h)? hi=mid else lo=mid+1",
          "Return lo",
        ],
        time: "O(n log max)",
        space: "O(1)",
      },
    ],
    dryRun: "lo=1 hi=11; mid=6 fits -> hi=6; mid=3 too slow -> lo=4; mid=5 fits -> hi=5; mid=4 fits -> hi=4 -> 4",
    interviewTips: ["Name the pattern: 'binary search on the answer'.", "Use ceil division via (pile + k - 1) / k to avoid floats."],
    commonMistakes: ["Float division rounding errors.", "Wrong hi (must be the largest pile)."],
    followUps: ["Minimum capacity to ship within D days.", "Split array into k subarrays minimising the max sum."],
    related: ["binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import math

def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum((p + mid - 1) // mid for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = Math.max(hi, p);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            long hours = 0;
            for (int p : piles) hours += (p + mid - 1) / mid;
            if (hours <= h) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / mid);
    if (hours <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minEatingSpeed(List<Integer> piles, Integer h) {
        Integer lo = 1, hi = 0;
        for (Integer p : piles) hi = Math.max(hi, p);
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            Integer hours = 0;
            for (Integer p : piles) hours += (p + mid - 1) / mid;
            if (hours <= h) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
}`,
      },
    ],
  },
  {
    slug: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    patterns: ["fast-slow-pointers", "linked-list"],
    topics: ["Linked Lists"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["blind75", "neetcode150"],
    frequency: 4,
    statement:
      "Given the head of a linked list, remove the nth node from the end and return the head. Do it in one pass.",
    beginnerExplanation:
      "Use two pointers with a fixed gap of n. Advance the fast pointer n steps first; then move both until fast hits the end. Now slow sits just before the node to delete. A dummy head handles deleting the first node cleanly.",
    realWorldAnalogy:
      "Two runners keeping exactly n metres apart. When the front runner crosses the finish, the back runner is exactly n from the end — right where you need to cut.",
    visualExplanation:
      "1->2->3->4->5, n=2\nfast +2, then both move; slow stops at 3 -> link 3.next to 5",
    approaches: [
      {
        title: "Two passes",
        tier: "Better",
        idea: "Count length, then walk to length-n.",
        steps: ["Find length L", "Walk to node L-n-1 and relink"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Two pointers, one pass",
        tier: "Optimal",
        idea: "Maintain an n-gap between fast and slow using a dummy head.",
        steps: [
          "dummy -> head; fast = slow = dummy",
          "Advance fast n+1 steps",
          "Move both until fast is null; slow.next = slow.next.next",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "dummy->1->2->3->4->5, n=2: fast to node3 region; slow ends at 3; slow.next=5",
    interviewTips: ["Use a dummy node so removing the head needs no special case.", "Advance fast n+1 (not n) when starting from dummy."],
    commonMistakes: ["Off-by-one in the initial fast advance.", "Not handling removal of the head node."],
    followUps: ["Remove the nth node from the start.", "Detect if n exceeds the list length."],
    related: ["reverse-linked-list", "linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i < n + 1; i++) fast = fast.next;
        while (fast != null) { fast = fast.next; slow = slow.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i < n + 1; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode removeNthFromEnd(ListNode head, Integer n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;
        for (Integer i = 0; i < n + 1; i++) fast = fast.next;
        while (fast != null) { fast = fast.next; slow = slow.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    patterns: ["linked-list"],
    topics: ["Linked Lists", "Math"],
    companies: ["amazon", "microsoft", "adobe"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Two non-empty linked lists represent two non-negative integers with digits stored in reverse order. Add them and return the sum as a linked list.",
    beginnerExplanation:
      "Because digits are reversed, the heads are the ones places — perfect for grade-school addition. Walk both lists adding digit by digit, carrying the tens into the next node.",
    realWorldAnalogy:
      "Adding two numbers on paper from right to left, carrying the 1 — except the lists already hand you the rightmost digit first.",
    visualExplanation:
      "(2->4->3) + (5->6->4) = 342 + 465 = 807 -> 7->0->8",
    approaches: [
      {
        title: "Digit-by-digit with carry",
        tier: "Optimal",
        idea: "Sum corresponding digits plus carry, build a new list.",
        steps: [
          "carry=0, dummy head",
          "While either list or carry remains: sum = a + b + carry",
          "Append (sum % 10); carry = sum / 10",
        ],
        time: "O(max(m,n))",
        space: "O(max(m,n))",
      },
    ],
    dryRun: "2+5=7 c0; 4+6=10 ->0 c1; 3+4+1=8 -> 7->0->8",
    interviewTips: ["A dummy head keeps the build loop clean.", "Don't forget a trailing carry node."],
    commonMistakes: ["Dropping the final carry.", "Mishandling lists of different lengths."],
    followUps: ["Digits stored in forward order (use stacks).", "Add k lists."],
    related: ["merge-two-sorted-lists", "reverse-linked-list"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def add_two_numbers(l1, l2):
    dummy = ListNode(0)
    cur = dummy
    carry = 0
    while l1 or l2 or carry:
        total = carry
        if l1: total += l1.val; l1 = l1.next
        if l2: total += l2.val; l2 = l2.next
        carry = total // 10
        cur.next = ListNode(total % 10)
        cur = cur.next
    return dummy.next`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), cur = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int total = carry;
            if (l1 != null) { total += l1.val; l1 = l1.next; }
            if (l2 != null) { total += l2.val; l2 = l2.next; }
            carry = total / 10;
            cur.next = new ListNode(total % 10);
            cur = cur.next;
        }
        return dummy.next;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let cur = dummy, carry = 0;
  while (l1 || l2 || carry) {
    let total = carry;
    if (l1) { total += l1.val; l1 = l1.next; }
    if (l2) { total += l2.val; l2 = l2.next; }
    carry = Math.floor(total / 10);
    cur.next = new ListNode(total % 10);
    cur = cur.next;
  }
  return dummy.next;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), cur = dummy;
        Integer carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            Integer total = carry;
            if (l1 != null) { total += l1.val; l1 = l1.next; }
            if (l2 != null) { total += l2.val; l2 = l2.next; }
            carry = total / 10;
            cur.next = new ListNode(Math.mod(total, 10));
            cur = cur.next;
        }
        return dummy.next;
    }
}`,
      },
    ],
  },
  {
    slug: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    patterns: ["linked-list", "fast-slow-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Reorder a list L0->L1->...->Ln so it becomes L0->Ln->L1->Ln-1->... You may not change node values, only relink nodes.",
    beginnerExplanation:
      "Three moves: find the middle (slow/fast pointers), reverse the second half, then weave the two halves together one node at a time.",
    realWorldAnalogy:
      "Splitting a deck in half, flipping the bottom half, then interleaving the two stacks like a riffle shuffle.",
    visualExplanation:
      "1->2->3->4->5\nmid: 3 | reverse 2nd: 5->4 | weave: 1->5->2->4->3",
    approaches: [
      {
        title: "Store in array, two pointers",
        tier: "Better",
        idea: "Copy nodes to an array and relink from both ends.",
        steps: ["Push nodes to a list", "Relink alternating front/back"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Mid + reverse + merge",
        tier: "Optimal",
        idea: "Pointer tricks only — constant extra space.",
        steps: [
          "Find middle with slow/fast",
          "Reverse the second half",
          "Merge the two halves alternately",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "find mid 3; reverse 4->5 to 5->4; merge 1,5,2,4,3",
    interviewTips: ["The three sub-routines (mid, reverse, merge) are each reusable interview building blocks.", "Cut the list at the middle to avoid a cycle when merging."],
    commonMistakes: ["Creating a cycle by not terminating the first half.", "Off-by-one choosing the middle."],
    followUps: ["Reverse in groups of k.", "Detect palindrome list (mid + reverse)."],
    related: ["reverse-linked-list", "linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reorder_list(head):
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt
    first, second = head, prev
    while second:
        f, s = first.next, second.next
        first.next = second
        second.next = f
        first, second = f, s`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void reorderList(ListNode head) {
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
        ListNode second = slow.next; slow.next = null;
        ListNode prev = null;
        while (second != null) { ListNode nxt = second.next; second.next = prev; prev = second; second = nxt; }
        ListNode first = head; second = prev;
        while (second != null) {
            ListNode f = first.next, s = second.next;
            first.next = second; second.next = f;
            first = f; second = s;
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reorderList(head) {
  let slow = head, fast = head.next;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  let second = slow.next; slow.next = null;
  let prev = null;
  while (second) { const nxt = second.next; second.next = prev; prev = second; second = nxt; }
  let first = head; second = prev;
  while (second) {
    const f = first.next, s = second.next;
    first.next = second; second.next = f;
    first = f; second = s;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void reorderList(ListNode head) {
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
        ListNode second = slow.next; slow.next = null;
        ListNode prev = null;
        while (second != null) { ListNode nxt = second.next; second.next = prev; prev = second; second = nxt; }
        ListNode first = head; second = prev;
        while (second != null) {
            ListNode f = first.next, s = second.next;
            first.next = second; second.next = f;
            first = f; second = s;
        }
    }
}`,
      },
    ],
  },
  {
    slug: "linked-list-cycle-ii",
    title: "Linked List Cycle II",
    difficulty: "Medium",
    patterns: ["fast-slow-pointers"],
    topics: ["Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. O(1) space.",
    beginnerExplanation:
      "First detect a cycle with slow/fast (Floyd). After they meet, reset one pointer to the head and advance both one step at a time — they meet again exactly at the cycle's entrance (a neat consequence of the distance math).",
    realWorldAnalogy:
      "Two runners on a looped track meet somewhere on the loop; if one walks back to the start and both then pace evenly, they reunite precisely at the on-ramp to the loop.",
    visualExplanation:
      "3->2->0->-4->(back to 2)\nmeet inside loop, reset one to head, step together -> meet at node 2",
    approaches: [
      {
        title: "Hash set of nodes",
        tier: "Better",
        idea: "First node seen twice is the entry.",
        steps: ["Walk storing visited nodes", "Return the first repeat"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Floyd's two-phase",
        tier: "Optimal",
        idea: "Detect the meeting point, then find the entry via the head reset.",
        steps: [
          "Phase 1: slow/fast until they meet (or fast hits null -> no cycle)",
          "Phase 2: move one pointer to head; advance both by 1",
          "Their meeting node is the cycle start",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "After meeting in the loop, head and meet-point converge at the entry node.",
    interviewTips: ["Be ready to sketch the distance proof (head-to-entry = meet-to-entry).", "Guard fast and fast.next for the no-cycle case."],
    commonMistakes: ["Forgetting the no-cycle return.", "Resetting the wrong pointer."],
    followUps: ["Return the cycle length.", "Detect a cycle in a functional graph."],
    related: ["linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            p = head
            while p is not slow:
                p = p.next
                slow = slow.next
            return p
    return None`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode p = head;
                while (p != slow) { p = p.next; slow = slow.next; }
                return p;
            }
        }
        return null;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) { p = p.next; slow = slow.next; }
      return p;
    }
  }
  return null;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode p = head;
                while (p != slow) { p = p.next; slow = slow.next; }
                return p;
            }
        }
        return null;
    }
}`,
      },
    ],
  },
  {
    slug: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    patterns: ["trees"],
    topics: ["Trees", "Recursion"],
    companies: ["amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given the roots of two binary trees, return true if they are structurally identical and every corresponding node has the same value.",
    beginnerExplanation:
      "Compare the two trees node by node, in lockstep. Both empty here? equal. One empty or values differ? not equal. Otherwise recurse on left-vs-left and right-vs-right.",
    realWorldAnalogy:
      "Holding two mobiles (the hanging kind) side by side and checking that every arm and ornament matches in shape and label.",
    visualExplanation: "p: 1(2,3)  q: 1(2,3) -> same\np: 1(2,_) q: 1(_,2) -> different shape",
    approaches: [
      {
        title: "Parallel recursion",
        tier: "Optimal",
        idea: "Recurse both trees simultaneously.",
        steps: [
          "If both null -> true",
          "If one null or values differ -> false",
          "Return sameTree(left,left) AND sameTree(right,right)",
        ],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "compare roots, then (left,left) and (right,right) recursively.",
    interviewTips: ["Handle the both-null base case before dereferencing.", "Generalises to 'Subtree of Another Tree'."],
    commonMistakes: ["NPE from checking values before null checks.", "Comparing left-to-right mirror by accident."],
    followUps: ["Symmetric tree (mirror).", "Subtree check."],
    related: ["invert-binary-tree", "maximum-depth-of-binary-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
      },
    ],
  },
  {
    slug: "lowest-common-ancestor-of-a-bst",
    title: "Lowest Common Ancestor of a BST",
    difficulty: "Medium",
    patterns: ["trees", "binary-search"],
    topics: ["Trees", "Binary Search Trees"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given a BST and two nodes p and q, return their lowest common ancestor (the deepest node that has both as descendants).",
    beginnerExplanation:
      "Use the BST ordering. Start at the root: if both p and q are larger, go right; if both smaller, go left. The first node where they split (one on each side, or equal to the node) is the LCA.",
    realWorldAnalogy:
      "Two people descending a family tree following 'go left if smaller, right if bigger' — the room where their paths first diverge is their closest shared ancestor.",
    visualExplanation:
      "root 6, p=2 q=8 -> 2<6<8 split at 6 -> LCA 6\np=2 q=4 -> both <6 go left to 2; 4>2 split -> LCA 2",
    approaches: [
      {
        title: "BST walk",
        tier: "Optimal",
        idea: "Descend choosing the side both targets fall on.",
        steps: [
          "If both p,q > node.val -> go right",
          "If both < node.val -> go left",
          "Else this node is the split point -> return it",
        ],
        time: "O(h)",
        space: "O(1)",
      },
    ],
    dryRun: "root6 p2 q8: 2 and 8 straddle 6 -> return 6",
    interviewTips: ["Exploit the BST property — don't do a generic tree LCA here.", "Iterative version is O(1) space."],
    commonMistakes: ["Treating it as a generic binary tree (slower).", "Missing the equality (a node can be its own ancestor)."],
    followUps: ["LCA in a generic binary tree.", "LCA with parent pointers."],
    related: ["validate-binary-search-tree", "same-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def lowest_common_ancestor(root, p, q):
    node = root
    while node:
        if p.val > node.val and q.val > node.val:
            node = node.right
        elif p.val < node.val and q.val < node.val:
            node = node.left
        else:
            return node`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode node = root;
        while (node != null) {
            if (p.val > node.val && q.val > node.val) node = node.right;
            else if (p.val < node.val && q.val < node.val) node = node.left;
            else return node;
        }
        return null;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p.val > node.val && q.val > node.val) node = node.right;
    else if (p.val < node.val && q.val < node.val) node = node.left;
    else return node;
  }
  return null;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode node = root;
        while (node != null) {
            if (p.val > node.val && q.val > node.val) node = node.right;
            else if (p.val < node.val && q.val < node.val) node = node.left;
            else return node;
        }
        return null;
    }
}`,
      },
    ],
  },
  {
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    patterns: ["trees", "graphs"],
    topics: ["Trees"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given the root of a binary tree, return its level-order traversal: a list of levels, each a list of node values left to right.",
    beginnerExplanation:
      "This is breadth-first search. Use a queue; process the tree one full level at a time by recording the queue's size at the start of each level, then dequeuing exactly that many nodes and enqueuing their children.",
    realWorldAnalogy:
      "Reading a family tree generation by generation, left to right, before moving to the next generation.",
    visualExplanation: "3(9,20(15,7)) -> [[3],[9,20],[15,7]]",
    approaches: [
      {
        title: "BFS with level sizing",
        tier: "Optimal",
        idea: "Snapshot the queue size to know where each level ends.",
        steps: [
          "Enqueue root",
          "While queue: take levelSize = queue length; pop that many, collect values, enqueue children",
          "Append the level list",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "queue[3] -> level[3]; queue[9,20] -> level[9,20]; queue[15,7] -> level[15,7]",
    interviewTips: ["Capturing the level size up front is the clean way to group levels.", "DFS with a depth index also works."],
    commonMistakes: ["Mixing levels by not fixing the size before the inner loop.", "Forgetting the empty-tree case."],
    followUps: ["Zigzag level order.", "Right side view (last node of each level)."],
    related: ["maximum-depth-of-binary-tree", "number-of-islands"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def level_order(root):
    res = []
    if not root:
        return res
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function levelOrder(root) {
  const res = [];
  if (!root) return res;
  let q = [root];
  while (q.length) {
    const level = [];
    const next = [];
    for (const node of q) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(level);
    q = next;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new List<List<Integer>>();
        if (root == null) return res;
        List<TreeNode> q = new List<TreeNode>{ root };
        while (!q.isEmpty()) {
            List<Integer> level = new List<Integer>();
            List<TreeNode> next = new List<TreeNode>();
            for (TreeNode node : q) {
                level.add(node.val);
                if (node.left != null) next.add(node.left);
                if (node.right != null) next.add(node.right);
            }
            res.add(level);
            q = next;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    patterns: ["trees"],
    topics: ["Trees", "Binary Search Trees"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given the root of a binary tree, determine whether it is a valid BST (every left subtree < node < every right subtree).",
    beginnerExplanation:
      "It's not enough to check each node against its immediate children — a deep descendant could violate the rule. Carry a valid (low, high) range down the recursion; each node must fall strictly inside its range, and it tightens the range for its children.",
    realWorldAnalogy:
      "Each room in a sorted building must fit within the floor's allowed number range; entering a left wing lowers the ceiling, a right wing raises the floor.",
    visualExplanation:
      "valid: 5(3,7)\ninvalid: 5(1,(4)... where a right-subtree node 4 < 5 sneaks below the root bound",
    approaches: [
      {
        title: "Check node vs children only",
        tier: "Brute Force",
        idea: "Naively compare each node to its direct children (WRONG — misses deep violations).",
        steps: ["Compare node to left/right child"],
        time: "O(n)",
        space: "O(h)",
      },
      {
        title: "Range-bounded recursion",
        tier: "Optimal",
        idea: "Pass down (low, high) bounds; tighten as you descend.",
        steps: [
          "Each node must satisfy low < val < high",
          "Recurse left with high = val, right with low = val",
        ],
        time: "O(n)",
        space: "O(h)",
      },
    ],
    dryRun: "root5 (-inf,inf); left3 (-inf,5); right7 (5,inf); all inside -> valid",
    interviewTips: ["The (low, high) bounds trick is the canonical answer.", "An in-order traversal must be strictly increasing — an alternative."],
    commonMistakes: ["Only comparing to immediate children.", "Using <= where strict < is required (no duplicates)."],
    followUps: ["Recover a BST with two swapped nodes.", "Count BST subtrees."],
    related: ["lowest-common-ancestor-of-a-bst", "same-tree"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_valid_bst(root):
    def valid(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)
    return valid(root, float("-inf"), float("inf"))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean valid(TreeNode node, long low, long high) {
        if (node == null) return true;
        if (node.val <= low || node.val >= high) return false;
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isValidBST(root) {
  function valid(node, low, high) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }
  return valid(root, -Infinity, Infinity);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isValidBST(TreeNode root) {
        return valid(root, null, null);
    }
    private static Boolean valid(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) return false;
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
    }
}`,
      },
    ],
  },
  {
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    patterns: ["heap"],
    topics: ["Arrays", "Heaps"],
    companies: ["amazon", "meta", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement: "Return the kth largest element in an unsorted array (the kth largest in sorted order, not the kth distinct).",
    beginnerExplanation:
      "Keep a min-heap of size k. Push elements; whenever the heap exceeds size k, pop the smallest. After processing everything, the heap's smallest element is the kth largest overall.",
    realWorldAnalogy:
      "A talent show keeping only the top k scores on a leaderboard — each new score bumps the lowest survivor; the lowest of the final k is your answer.",
    visualExplanation: "nums=[3,2,1,5,6,4], k=2 -> sorted desc [6,5,..] -> 2nd largest = 5",
    approaches: [
      {
        title: "Sort",
        tier: "Better",
        idea: "Sort and index from the end.",
        steps: ["Sort ascending", "Return nums[n-k]"],
        time: "O(n log n)",
        space: "O(1)",
      },
      {
        title: "Size-k min-heap",
        tier: "Optimal",
        idea: "Maintain only the k largest seen so far.",
        steps: ["Push each value", "If heap size > k pop the min", "Return heap top"],
        time: "O(n log k)",
        space: "O(k)",
      },
    ],
    dryRun: "k=2: heap keeps 2 largest -> [5,6]; min is 5 -> answer",
    interviewTips: ["Quickselect gives O(n) average if asked to beat the heap.", "Min-heap of size k beats a max-heap of size n when k is small."],
    commonMistakes: ["Confusing kth largest with kth smallest indexing.", "Building an n-sized max-heap when a k-sized min-heap suffices."],
    followUps: ["Quickselect O(n) average.", "Kth largest in a stream (running heap)."],
    related: ["k-closest-points-to-origin", "top-k-frequent-elements"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int n : nums) {
            heap.offer(n);
            if (heap.size() > k) heap.poll();
        }
        return heap.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findKthLargest(nums, k) {
  // Sort-based (clear and correct); a size-k min-heap gives O(n log k).
  nums.sort((a, b) => a - b);
  return nums[nums.length - k];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findKthLargest(List<Integer> nums, Integer k) {
        nums.sort();
        return nums[nums.size() - k];
    }
}`,
      },
    ],
  },
  {
    slug: "last-stone-weight",
    title: "Last Stone Weight",
    difficulty: "Easy",
    patterns: ["heap"],
    topics: ["Heaps", "Arrays"],
    companies: ["amazon"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Each turn, smash the two heaviest stones; if unequal, the difference returns to the pile. Return the weight of the last remaining stone (or 0).",
    beginnerExplanation:
      "You repeatedly need the two largest values, so a max-heap is ideal. Pop the two biggest, push back their difference if non-zero, and repeat until at most one stone remains.",
    realWorldAnalogy:
      "A demolition derby where the two biggest wreckers collide each round; the dented survivor rejoins the lineup until one (or none) is left.",
    visualExplanation: "[2,7,4,1,8,1] -> smash 8,7->1 ; [2,4,1,1,1] -> 4,2->2 ; ... last = 1",
    approaches: [
      {
        title: "Max-heap simulation",
        tier: "Optimal",
        idea: "Always extract the two largest via a max-heap.",
        steps: ["Heapify", "Pop two largest; push |diff| if > 0", "Repeat until <=1 stone"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "max-heap: pop 8,7 -> push 1; continue until one stone or empty",
    interviewTips: ["Python's heapq is a min-heap — negate values for a max-heap.", "Edge case: empty pile returns 0."],
    commonMistakes: ["Forgetting Python heapq is min-heap.", "Pushing a zero difference (harmless but unnecessary)."],
    followUps: ["Last Stone Weight II (partition DP).", "K heaviest each round."],
    related: ["kth-largest-element-in-an-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `import heapq

def last_stone_weight(stones):
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        a = -heapq.heappop(heap)
        b = -heapq.heappop(heap)
        if a != b:
            heapq.heappush(heap, -(a - b))
    return -heap[0] if heap else 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        for (int s : stones) heap.offer(s);
        while (heap.size() > 1) {
            int a = heap.poll(), b = heap.poll();
            if (a != b) heap.offer(a - b);
        }
        return heap.isEmpty() ? 0 : heap.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lastStoneWeight(stones) {
  const heap = [...stones];
  while (heap.length > 1) {
    heap.sort((a, b) => a - b);
    const a = heap.pop(), b = heap.pop();
    if (a !== b) heap.push(a - b);
  }
  return heap.length ? heap[0] : 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lastStoneWeight(List<Integer> stones) {
        List<Integer> heap = stones.clone();
        while (heap.size() > 1) {
            heap.sort();
            Integer a = heap.remove(heap.size() - 1);
            Integer b = heap.remove(heap.size() - 1);
            if (a != b) heap.add(a - b);
        }
        return heap.isEmpty() ? 0 : heap[0];
    }
}`,
      },
    ],
  },
  {
    slug: "k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    patterns: ["heap"],
    topics: ["Heaps", "Arrays", "Math"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given an array of points and integer k, return the k points closest to the origin (0,0). Distance is Euclidean; you can compare squared distances.",
    beginnerExplanation:
      "You never need the actual square root — comparing x*x + y*y is enough. Sort by squared distance (or keep a size-k max-heap) and return the first k.",
    realWorldAnalogy:
      "Picking the k nearest stars to Earth: you can rank by squared distance since the ordering is identical and avoids slow square roots.",
    visualExplanation: "points=[[1,3],[-2,2]], k=1 -> dists 10 vs 8 -> closest [-2,2]",
    approaches: [
      {
        title: "Sort by distance",
        tier: "Better",
        idea: "Sort all points by squared distance, take k.",
        steps: ["Compute x*x+y*y", "Sort ascending", "Return first k"],
        time: "O(n log n)",
        space: "O(n)",
      },
      {
        title: "Size-k max-heap",
        tier: "Optimal",
        idea: "Keep only the k closest using a max-heap keyed on distance.",
        steps: ["Push each point", "If heap > k pop the farthest", "Return heap contents"],
        time: "O(n log k)",
        space: "O(k)",
      },
    ],
    dryRun: "compare squared distances; smallest k win",
    interviewTips: ["Skip the sqrt — squared distance preserves order.", "Heap wins when k << n."],
    commonMistakes: ["Computing sqrt unnecessarily.", "Tie-handling assumptions."],
    followUps: ["Streaming points.", "K farthest points."],
    related: ["kth-largest-element-in-an-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def k_closest(points, k):
    points.sort(key=lambda p: p[0] * p[0] + p[1] * p[1])
    return points[:k]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[][] kClosest(int[][] points, int k) {
        Arrays.sort(points, (a, b) -> (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
        return Arrays.copyOfRange(points, 0, k);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function kClosest(points, k) {
  points.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
  return points.slice(0, k);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // Simple selection by squared distance (clear; a heap gives O(n log k)).
    public static List<List<Integer>> kClosest(List<List<Integer>> points, Integer k) {
        List<List<Integer>> result = new List<List<Integer>>();
        List<List<Integer>> pts = points.clone();
        for (Integer c = 0; c < k; c++) {
            Integer bestIdx = 0;
            Long bestDist = null;
            for (Integer i = 0; i < pts.size(); i++) {
                Long d = (Long) pts[i][0] * pts[i][0] + (Long) pts[i][1] * pts[i][1];
                if (bestDist == null || d < bestDist) { bestDist = d; bestIdx = i; }
            }
            result.add(pts.remove(bestIdx));
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    slug: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    patterns: ["intervals"],
    topics: ["Arrays", "Intervals"],
    companies: ["google", "amazon", "linkedin"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given a list of non-overlapping intervals sorted by start, insert a new interval and merge if necessary, returning the result still sorted.",
    beginnerExplanation:
      "Walk the sorted intervals in three phases: copy everything that ends before the new one starts, merge everything that overlaps the new one (expanding its bounds), then copy the rest.",
    realWorldAnalogy:
      "Slotting a new meeting into a sorted calendar — earlier meetings stay, anything that clashes fuses into one longer block, later meetings shift after.",
    visualExplanation:
      "intervals=[[1,3],[6,9]], new=[2,5] -> overlaps [1,3] -> merge to [1,5] -> [[1,5],[6,9]]",
    approaches: [
      {
        title: "Three-phase scan",
        tier: "Optimal",
        idea: "Before / overlapping / after the new interval.",
        steps: [
          "Add all intervals ending before newStart",
          "While overlapping, expand new = [min start, max end]; add it once",
          "Add all remaining intervals",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[[1,3],[6,9]] insert [2,5]: overlap with [1,3] -> [1,5]; then [6,9] -> [[1,5],[6,9]]",
    interviewTips: ["Overlap test: a.start <= b.end AND b.start <= a.end.", "The input being pre-sorted is what makes it linear."],
    commonMistakes: ["Wrong overlap condition (strict vs inclusive).", "Adding the merged interval multiple times."],
    followUps: ["Merge Intervals (unsorted).", "Interval list intersections."],
    related: ["merge-intervals", "non-overlapping-intervals"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def insert(intervals, new_interval):
    res = []
    i, n = 0, len(intervals)
    while i < n and intervals[i][1] < new_interval[0]:
        res.append(intervals[i]); i += 1
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval = [min(new_interval[0], intervals[i][0]), max(new_interval[1], intervals[i][1])]
        i += 1
    res.append(new_interval)
    while i < n:
        res.append(intervals[i]); i += 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;
        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        while (i < n) res.add(intervals[i++]);
        return res.toArray(new int[res.size()][]);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval = [Math.min(newInterval[0], intervals[i][0]), Math.max(newInterval[1], intervals[i][1])];
    i++;
  }
  res.push(newInterval);
  while (i < n) res.push(intervals[i++]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> insert(List<List<Integer>> intervals, List<Integer> newInterval) {
        List<List<Integer>> res = new List<List<Integer>>();
        Integer i = 0, n = intervals.size();
        while (i < n && intervals[i][1] < newInterval[0]) { res.add(intervals[i]); i++; }
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval = new List<Integer>{
                Math.min(newInterval[0], intervals[i][0]),
                Math.max(newInterval[1], intervals[i][1])
            };
            i++;
        }
        res.add(newInterval);
        while (i < n) { res.add(intervals[i]); i++; }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    patterns: ["intervals", "greedy"],
    topics: ["Arrays", "Intervals", "Greedy"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given intervals, return the minimum number you must remove so the rest are non-overlapping.",
    beginnerExplanation:
      "Greedy: sort by end time. Always keep the interval that ends earliest, because it leaves the most room for later ones. Whenever the next interval starts before your last kept end, it overlaps — remove it.",
    realWorldAnalogy:
      "Scheduling the most meetings in one room: always pick the meeting that frees the room soonest, and drop anything that clashes.",
    visualExplanation:
      "[[1,2],[2,3],[3,4],[1,3]] sort by end -> keep [1,2],[2,3],[3,4]; [1,3] overlaps -> remove 1",
    approaches: [
      {
        title: "Greedy by end time",
        tier: "Optimal",
        idea: "Keep earliest-ending intervals; count overlaps removed.",
        steps: [
          "Sort by end",
          "Track prevEnd; if start < prevEnd it overlaps -> removals++",
          "Else update prevEnd",
        ],
        time: "O(n log n)",
        space: "O(1)",
      },
    ],
    dryRun: "sorted by end: [1,2],[2,3],[3,4],[1,3]; last overlaps with prevEnd 2 -> remove -> 1",
    interviewTips: ["Sorting by END (not start) is the crux of the greedy proof.", "This is the classic activity-selection problem."],
    commonMistakes: ["Sorting by start instead of end.", "Using strict vs inclusive overlap incorrectly (touching ends don't overlap)."],
    followUps: ["Maximum number of non-overlapping intervals.", "Minimum arrows to burst balloons."],
    related: ["merge-intervals", "insert-interval"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    removals = 0
    prev_end = float("-inf")
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            removals += 1
    return removals`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
        int removals = 0, prevEnd = Integer.MIN_VALUE;
        for (int[] it : intervals) {
            if (it[0] >= prevEnd) prevEnd = it[1];
            else removals++;
        }
        return removals;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let removals = 0, prevEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= prevEnd) prevEnd = end;
    else removals++;
  }
  return removals;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer eraseOverlapIntervals(List<List<Integer>> intervals) {
        // sort by end ascending
        for (Integer i = 0; i < intervals.size(); i++) {
            for (Integer j = 0; j < intervals.size() - 1 - i; j++) {
                if (intervals[j][1] > intervals[j + 1][1]) {
                    List<Integer> tmp = intervals[j];
                    intervals[j] = intervals[j + 1];
                    intervals[j + 1] = tmp;
                }
            }
        }
        Integer removals = 0, prevEnd = -2147483648;
        for (List<Integer> it : intervals) {
            if (it[0] >= prevEnd) prevEnd = it[1];
            else removals++;
        }
        return removals;
    }
}`,
      },
    ],
  },
  {
    slug: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    patterns: ["greedy", "dynamic-programming"],
    topics: ["Arrays", "Greedy"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Each element of `nums` is your maximum jump length from that position. Starting at index 0, return true if you can reach the last index.",
    beginnerExplanation:
      "Track the furthest index you can currently reach. Walk left to right; if you ever stand on an index beyond your reach, you're stuck. Otherwise extend the reach by i + nums[i].",
    realWorldAnalogy:
      "Crossing a river on stepping stones where each stone tells you the max leap from it — you only care about the farthest stone still in range.",
    visualExplanation: "[2,3,1,1,4] reach: 0->2->4 reaches end -> true\n[3,2,1,0,4] reach stalls at 3 < 4 -> false",
    approaches: [
      {
        title: "DP reachability",
        tier: "Better",
        idea: "Work backwards marking which indices can reach the end.",
        steps: ["dp[n-1]=true", "dp[i] true if any reachable j has dp[j]"],
        time: "O(n^2)",
        space: "O(n)",
      },
      {
        title: "Greedy furthest reach",
        tier: "Optimal",
        idea: "One pass tracking the maximum reachable index.",
        steps: [
          "reach = 0",
          "For each i: if i > reach return false; reach = max(reach, i + nums[i])",
          "Return true",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[2,3,1,1,4]: i0 reach2; i1 reach4; reach>=4 -> true",
    interviewTips: ["The greedy 'furthest reach' is cleaner than DP here.", "Early-exit the moment i exceeds reach."],
    commonMistakes: ["Off-by-one comparing reach to n-1.", "Overcomplicating with DP when greedy suffices."],
    followUps: ["Jump Game II (minimum jumps).", "Jump Game III (reach a zero)."],
    related: ["maximum-subarray"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def can_jump(nums):
    reach = 0
    for i, n in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + n)
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean canJump(int[] nums) {
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean canJump(List<Integer> nums) {
        Integer reach = 0;
        for (Integer i = 0; i < nums.size(); i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Arrays"],
    companies: ["amazon", "meta", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement: "Given an array of distinct integers, return all possible subsets (the power set). The solution must not contain duplicate subsets.",
    beginnerExplanation:
      "For each element you make a binary choice: include it or not. Backtracking explores both branches: add the element, recurse, then remove it and recurse without it. Every leaf of that decision tree is one subset.",
    realWorldAnalogy:
      "Packing for a trip: for each item you either pack it or leave it. Every distinct combination of yes/no choices is a different packed bag.",
    visualExplanation: "[1,2,3] -> [],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3] (8 = 2^3 subsets)",
    approaches: [
      {
        title: "Backtracking (include / exclude)",
        tier: "Optimal",
        idea: "Build subsets incrementally; record a copy at each node.",
        steps: [
          "Recurse with a start index",
          "Record the current path as a subset",
          "For each i from start: choose nums[i], recurse(i+1), un-choose",
        ],
        time: "O(n * 2^n)",
        space: "O(n) recursion",
      },
    ],
    dryRun: "start at []; add 1 -> [1]; add 2 -> [1,2]; add 3 -> [1,2,3]; backtrack...",
    interviewTips: ["Pass start index to avoid duplicate subsets.", "Copy the path when recording — don't store the mutable reference."],
    commonMistakes: ["Storing the live list reference (all entries end up identical).", "Re-using earlier indices and generating duplicates."],
    followUps: ["Subsets II with duplicates.", "Combinations (choose k)."],
    related: ["combination-sum", "permutations"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subsets(nums):
    res = []
    path = []
    def backtrack(start):
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1)
            path.pop()
    backtrack(0)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
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
        code: `function subsets(nums) {
  const res = [];
  const path = [];
  function backtrack(start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> subsets(List<Integer> nums) {
        List<List<Integer>> res = new List<List<Integer>>();
        backtrack(nums, 0, new List<Integer>(), res);
        return res;
    }
    private static void backtrack(List<Integer> nums, Integer start, List<Integer> path, List<List<Integer>> res) {
        res.add(path.clone());
        for (Integer i = start; i < nums.size(); i++) {
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
    slug: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    patterns: ["backtracking"],
    topics: ["Backtracking", "Arrays"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given distinct candidates and a target, return all unique combinations that sum to target. The same number may be used unlimited times.",
    beginnerExplanation:
      "Backtrack, but since numbers can repeat, when you choose candidate i you recurse still allowing index i again. To avoid duplicate combinations, never go back to earlier indices.",
    realWorldAnalogy:
      "Making exact change with unlimited coins of given denominations — you can reuse a coin, but to avoid counting the same combo twice you only ever add coins of the current or larger denomination.",
    visualExplanation: "candidates=[2,3,6,7], target=7 -> [2,2,3] and [7]",
    approaches: [
      {
        title: "Backtracking with reuse",
        tier: "Optimal",
        idea: "Recurse on the same index to allow reuse; prune when remaining < 0.",
        steps: [
          "Track remaining = target - chosen",
          "For i from start: if candidates[i] <= remaining, choose it, recurse with same i",
          "Record path when remaining == 0",
        ],
        time: "O(2^t) worst case",
        space: "O(t) depth",
      },
    ],
    dryRun: "target7: pick 2(rem5)->2(rem3)->3(rem0) [2,2,3]; backtrack; pick 7(rem0) [7]",
    interviewTips: ["Recurse on i (not i+1) to allow reuse.", "Sort candidates to enable early pruning (break when candidate > remaining)."],
    commonMistakes: ["Using i+1 (forbids reuse) by mistake.", "Generating permutations instead of combinations (going back to earlier indices)."],
    followUps: ["Combination Sum II (each used once, with duplicates).", "Combination Sum III (k numbers)."],
    related: ["subsets", "permutations"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def combination_sum(candidates, target):
    res = []
    path = []
    def backtrack(start, remaining):
        if remaining == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] <= remaining:
                path.append(candidates[i])
                backtrack(i, remaining - candidates[i])
                path.pop()
    backtrack(0, target)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] c, int start, int remaining, List<Integer> path, List<List<Integer>> res) {
        if (remaining == 0) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i < c.length; i++) {
            if (c[i] <= remaining) {
                path.add(c[i]);
                backtrack(c, i, remaining - c[i], path, res);
                path.remove(path.size() - 1);
            }
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function combinationSum(candidates, target) {
  const res = [];
  const path = [];
  function backtrack(start, remaining) {
    if (remaining === 0) { res.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] <= remaining) {
        path.push(candidates[i]);
        backtrack(i, remaining - candidates[i]);
        path.pop();
      }
    }
  }
  backtrack(0, target);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> combinationSum(List<Integer> candidates, Integer target) {
        List<List<Integer>> res = new List<List<Integer>>();
        backtrack(candidates, 0, target, new List<Integer>(), res);
        return res;
    }
    private static void backtrack(List<Integer> c, Integer start, Integer remaining, List<Integer> path, List<List<Integer>> res) {
        if (remaining == 0) { res.add(path.clone()); return; }
        for (Integer i = start; i < c.size(); i++) {
            if (c[i] <= remaining) {
                path.add(c[i]);
                backtrack(c, i, remaining - c[i], path, res);
                path.remove(path.size() - 1);
            }
        }
    }
}`,
      },
    ],
  },
  {
    slug: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Hashing"],
    companies: ["meta", "amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    beginnerExplanation:
      "Traverse the graph (DFS or BFS) while keeping a map from each original node to its clone. When you visit a node, create its clone once, then wire up clones of its neighbors — using the map so you never duplicate a node.",
    realWorldAnalogy:
      "Photocopying a social network: you make one copy per person and reconnect the copies with the same friendships, checking a ledger so nobody gets copied twice.",
    visualExplanation: "map[original] = clone; for each neighbor, clone.neighbors.append(map[neighbor])",
    approaches: [
      {
        title: "DFS with a visited map",
        tier: "Optimal",
        idea: "Memoise original->clone to handle cycles and shared nodes.",
        steps: [
          "If node already cloned, return its clone",
          "Create clone; store in map",
          "Recurse on each neighbor, appending their clones",
        ],
        time: "O(V + E)",
        space: "O(V)",
      },
    ],
    dryRun: "clone node1; recurse neighbor2 (clone, then its neighbors include map[1]); cycles resolved via map",
    interviewTips: ["The original->clone map is what prevents infinite loops on cycles.", "BFS works equally well."],
    commonMistakes: ["Re-cloning already-seen nodes (infinite recursion).", "Forgetting the graph is undirected (edges both ways)."],
    followUps: ["Clone a linked list with random pointers.", "Serialize/deserialize the graph."],
    related: ["number-of-islands", "course-schedule"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def clone_graph(node):
    if not node:
        return None
    clones = {}
    def dfs(n):
        if n in clones:
            return clones[n]
        copy = Node(n.val)
        clones[n] = copy
        for nei in n.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy
    return dfs(node)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private Map<Node, Node> clones = new HashMap<>();
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (clones.containsKey(node)) return clones.get(node);
        Node copy = new Node(node.val);
        clones.put(node, copy);
        for (Node nei : node.neighbors) copy.neighbors.add(cloneGraph(nei));
        return copy;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function cloneGraph(node) {
  const clones = new Map();
  function dfs(n) {
    if (!n) return null;
    if (clones.has(n)) return clones.get(n);
    const copy = new Node(n.val);
    clones.set(n, copy);
    for (const nei of n.neighbors) copy.neighbors.push(dfs(nei));
    return copy;
  }
  return dfs(node);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private Map<Node, Node> clones = new Map<Node, Node>();
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (clones.containsKey(node)) return clones.get(node);
        Node copy = new Node(node.val);
        clones.put(node, copy);
        for (Node nei : node.neighbors) copy.neighbors.add(cloneGraph(nei));
        return copy;
    }
}`,
      },
    ],
  },
  {
    slug: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    patterns: ["graphs"],
    topics: ["Graphs", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "In a grid, 0 = empty, 1 = fresh orange, 2 = rotten. Each minute, rotten oranges rot orthogonally adjacent fresh ones. Return the minutes until none are fresh, or -1 if impossible.",
    beginnerExplanation:
      "This is multi-source BFS. Start with ALL rotten oranges in the queue at once (minute 0), then spread level by level — each BFS level is one minute. If fresh oranges remain when the queue empties, return -1.",
    realWorldAnalogy:
      "A rumour spreading through a room from several initial gossips simultaneously — each round, everyone adjacent to someone 'in the know' learns it; count the rounds until everyone knows.",
    visualExplanation: "queue all 2s; each BFS layer = 1 minute; rot neighbors, decrement fresh; answer = layers",
    approaches: [
      {
        title: "Multi-source BFS",
        tier: "Optimal",
        idea: "Seed the queue with every rotten orange; expand layer by layer.",
        steps: [
          "Count fresh; enqueue all rotten cells",
          "BFS by minute: rot fresh neighbors, decrement fresh count",
          "Return minutes if fresh == 0 else -1",
        ],
        time: "O(rows * cols)",
        space: "O(rows * cols)",
      },
    ],
    dryRun: "seed rotten; spread one ring per minute until no fresh; if any fresh unreachable -> -1",
    interviewTips: ["Seeding ALL sources at once is the trick — don't BFS from each separately.", "Track fresh count to detect the impossible case."],
    commonMistakes: ["Starting BFS from a single source.", "Off-by-one counting the initial minute."],
    followUps: ["Walls and Gates (distance to nearest gate).", "01 Matrix (nearest 0)."],
    related: ["number-of-islands", "course-schedule"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    minutes = 0
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    while q and fresh:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length, fresh = 0;
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.add(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] cell = q.poll();
                for (int[] d : dirs) {
                    int nr = cell[0] + d[0], nc = cell[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; fresh--; q.add(new int[]{nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  let q = [], fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  let minutes = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length && fresh) {
    const next = [];
    for (const [r, c] of q) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--; next.push([nr, nc]);
        }
      }
    }
    q = next;
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer orangesRotting(List<List<Integer>> grid) {
        Integer rows = grid.size(), cols = grid[0].size(), fresh = 0;
        List<List<Integer>> q = new List<List<Integer>>();
        for (Integer r = 0; r < rows; r++)
            for (Integer c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.add(new List<Integer>{ r, c });
                else if (grid[r][c] == 1) fresh++;
            }
        Integer minutes = 0;
        List<List<Integer>> dirs = new List<List<Integer>>{
            new List<Integer>{1,0}, new List<Integer>{-1,0},
            new List<Integer>{0,1}, new List<Integer>{0,-1}
        };
        while (!q.isEmpty() && fresh > 0) {
            List<List<Integer>> next = new List<List<Integer>>();
            for (List<Integer> cell : q) {
                for (List<Integer> d : dirs) {
                    Integer nr = cell[0] + d[0], nc = cell[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; fresh--; next.add(new List<Integer>{ nr, nc });
                    }
                }
            }
            q = next;
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given an integer array `nums`, return the length of the longest strictly increasing subsequence (not necessarily contiguous).",
    beginnerExplanation:
      "Let dp[i] be the length of the longest increasing subsequence ending at index i. For each i, look back at every earlier j with nums[j] < nums[i] and take the best dp[j] + 1. The answer is the max over all dp[i].",
    realWorldAnalogy:
      "Building the longest chain of ever-taller people for a photo, where each person can stand on the best chain that ends with someone shorter.",
    visualExplanation: "nums=[10,9,2,5,3,7,101,18] -> LIS [2,3,7,101] length 4",
    approaches: [
      {
        title: "O(n^2) DP",
        tier: "Better",
        idea: "dp[i] = 1 + max(dp[j]) over j<i with nums[j]<nums[i].",
        steps: ["Init dp all 1", "For each i, scan j<i and relax dp[i]", "Answer = max(dp)"],
        time: "O(n^2)",
        space: "O(n)",
      },
      {
        title: "Patience sorting + binary search",
        tier: "Optimal",
        idea: "Maintain tails[] of smallest possible tail for each length; binary-search the insert point.",
        steps: ["For each x, binary search its position in tails", "Replace or append", "Length of tails is the answer"],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "dp evolves; ending at 101 gives chain 2,3,7,101 -> 4",
    interviewTips: ["Have the O(n log n) patience-sorting version ready as the follow-up.", "Strictly increasing means use < not <=."],
    commonMistakes: ["Confusing subsequence with subarray.", "Using <= and allowing equal values."],
    followUps: ["Number of LIS.", "Longest non-decreasing subsequence.", "Russian doll envelopes (2D LIS)."],
    related: ["longest-common-subsequence"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def length_of_lis(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length, best = 0;
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++)
                if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  let best = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++)
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    best = Math.max(best, dp[i]);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lengthOfLIS(List<Integer> nums) {
        Integer n = nums.size(), best = 0;
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i < n; i++) {
            dp.add(1);
            for (Integer j = 0; j < i; j++)
                if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Strings", "Hashing"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150"],
    frequency: 4,
    statement:
      "Given a string `s` and a dictionary `wordDict`, return true if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    beginnerExplanation:
      "Let dp[i] mean 'the first i characters can be segmented'. dp[0] is true (empty). For each position i, if some earlier dp[j] is true AND s[j..i] is a dictionary word, then dp[i] is true too.",
    realWorldAnalogy:
      "Reading a sign with no spaces ('applepie') and checking if you can slice it cleanly into real words you know.",
    visualExplanation:
      's = "leetcode", dict = ["leet","code"]\ndp[4] true ("leet"); dp[8] true since dp[4] and "code" -> true',
    approaches: [
      {
        title: "Recursion with memo",
        tier: "Better",
        idea: "Try every prefix that is a word, recurse on the rest, cache results.",
        steps: ["For each cut, if prefix in dict and rest breakable -> true"],
        time: "O(n^2)",
        space: "O(n)",
      },
      {
        title: "Bottom-up DP",
        tier: "Optimal",
        idea: "dp[i] true if some dp[j] true and s[j..i] is a word.",
        steps: [
          "dp[0] = true",
          "For i in 1..n, for j in 0..i: if dp[j] and s[j:i] in dict -> dp[i]=true",
          "Return dp[n]",
        ],
        time: "O(n^2) (times word check)",
        space: "O(n)",
      },
    ],
    dryRun: 'dp[0]=T; dp[4]=T (leet); dp[8]=T (code after dp[4]) -> True',
    interviewTips: ["Put the dictionary in a set for O(1) membership.", "Bound the inner cut length by the longest word to speed it up."],
    commonMistakes: ["Greedy matching (fails on overlaps like 'aaaaa').", "Forgetting dp[0] = true."],
    followUps: ["Word Break II (return all sentences).", "Minimum number of words."],
    related: ["coin-change"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def word_break(s, word_dict):
    words = set(word_dict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[len(s)]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && words.contains(s.substring(j, i))) { dp[i] = true; break; }
            }
        }
        return dp[s.length()];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new Set<String>(wordDict);
        List<Boolean> dp = new List<Boolean>();
        for (Integer i = 0; i <= s.length(); i++) dp.add(false);
        dp[0] = true;
        for (Integer i = 1; i <= s.length(); i++) {
            for (Integer j = 0; j < i; j++) {
                if (dp[j] && words.contains(s.substring(j, i))) { dp[i] = true; break; }
            }
        }
        return dp[s.length()];
    }
}`,
      },
    ],
  },
  {
    slug: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "A robot at the top-left of an m x n grid can only move right or down. How many unique paths reach the bottom-right corner?",
    beginnerExplanation:
      "The number of ways to reach a cell equals the ways to reach the cell above plus the cell to the left (the only two moves). Fill a grid (or a single rolling row) of these counts; the bottom-right holds the answer.",
    realWorldAnalogy:
      "Counting routes through a city grid where you may only walk east or south — each intersection's route count is the sum of the intersection north of it and the one west of it.",
    visualExplanation: "3x3 counts:\n1 1 1\n1 2 3\n1 3 6 -> answer 6",
    approaches: [
      {
        title: "2D DP",
        tier: "Better",
        idea: "grid[i][j] = grid[i-1][j] + grid[i][j-1].",
        steps: ["First row/col = 1", "Fill by summing top + left"],
        time: "O(m*n)",
        space: "O(m*n)",
      },
      {
        title: "Rolling 1D row",
        tier: "Optimal",
        idea: "Only the previous row is needed; update a single row in place.",
        steps: ["row = [1]*n", "For each subsequent row: row[j] += row[j-1]", "Return row[n-1]"],
        time: "O(m*n)",
        space: "O(n)",
      },
    ],
    dryRun: "row=[1,1,1] -> [1,2,3] -> [1,3,6] -> 6",
    interviewTips: ["Mention the closed-form C(m+n-2, m-1) for a slick O(min(m,n)) answer.", "The 1D rolling array shows space optimisation awareness."],
    commonMistakes: ["Initialising the first row/column wrong.", "Index confusion between m (rows) and n (cols)."],
    followUps: ["Unique Paths II with obstacles.", "Minimum path sum."],
    related: ["climbing-stairs", "coin-change"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def unique_paths(m, n):
    row = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[n - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        java.util.Arrays.fill(row, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                row[j] += row[j - 1];
        return row[n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      row[j] += row[j - 1];
  return row[n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer uniquePaths(Integer m, Integer n) {
        List<Integer> row = new List<Integer>();
        for (Integer j = 0; j < n; j++) row.add(1);
        for (Integer i = 1; i < m; i++)
            for (Integer j = 1; j < n; j++)
                row[j] = row[j] + row[j - 1];
        return row[n - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation", "Arrays"],
    companies: ["amazon", "apple"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Every element appears twice except for one. Find that single one using O(n) time and O(1) extra space.",
    beginnerExplanation:
      "XOR is the magic here: x ^ x = 0 and x ^ 0 = x. XOR-ing every number together cancels all the pairs, leaving exactly the lonely number.",
    realWorldAnalogy:
      "Pairs of dancers leaving the floor cancel out; whoever is left standing when all matched pairs have gone is the single one.",
    visualExplanation: "[4,1,2,1,2] -> 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4",
    approaches: [
      {
        title: "Hash set / count",
        tier: "Brute Force",
        idea: "Tally occurrences and return the one with count 1.",
        steps: ["Count each value", "Return the value seen once"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "XOR accumulation",
        tier: "Optimal",
        idea: "XOR cancels duplicate pairs, leaving the unique value.",
        steps: ["result = 0", "result ^= each number", "Return result"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "0^4=4; 4^1=5; 5^2=7; 7^1=6; 6^2=4 -> 4",
    interviewTips: ["State the two XOR identities explicitly — that's the insight they want.", "Order doesn't matter since XOR is commutative."],
    commonMistakes: ["Reaching for a hash map and missing the O(1)-space ask.", "Forgetting to initialise the accumulator to 0."],
    followUps: ["Single Number II (every other appears 3x).", "Two single numbers (Single Number III)."],
    related: ["missing-number", "number-of-1-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int n : nums) result ^= n;
        return result;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function singleNumber(nums) {
  let result = 0;
  for (const n of nums) result ^= n;
  return result;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer singleNumber(List<Integer> nums) {
        Integer result = 0;
        for (Integer n : nums) result ^= n;
        return result;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["apple", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement: "Return the number of set bits (1s) in the binary representation of an integer (the Hamming weight).",
    beginnerExplanation:
      "The slick trick is n & (n-1): it flips off the lowest set bit. Repeat until n is zero, counting how many times you did it — that's the number of 1 bits.",
    realWorldAnalogy:
      "Turning off the rightmost lit bulb on a string of lights one at a time and counting how many flicks it takes until they're all dark.",
    visualExplanation: "n=11 (1011): 1011 -> 1010 -> 1000 -> 0000, three flips -> 3 set bits",
    approaches: [
      {
        title: "Check each bit",
        tier: "Better",
        idea: "Shift and test the lowest bit 32 times.",
        steps: ["count += n & 1; n >>= 1, repeat"],
        time: "O(32)",
        space: "O(1)",
      },
      {
        title: "Brian Kernighan (n & (n-1))",
        tier: "Optimal",
        idea: "Each step clears the lowest set bit, so it loops only once per 1-bit.",
        steps: ["While n != 0: n &= (n-1); count++", "Return count"],
        time: "O(number of set bits)",
        space: "O(1)",
      },
    ],
    dryRun: "n=1011: clear -> 1010 (1); ->1000 (2); ->0 (3) => 3",
    interviewTips: ["n & (n-1) clearing the lowest set bit is a reusable bit-trick.", "Watch for unsigned vs signed shifts in some languages."],
    commonMistakes: ["Infinite loop from signed right shift on negatives.", "Off-by-one in bit counting."],
    followUps: ["Counting Bits for 0..n.", "Reverse bits."],
    related: ["single-number", "missing-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer hammingWeight(Integer n) {
        Integer count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`,
      },
    ],
  },
  {
    slug: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation", "Math", "Arrays"],
    companies: ["amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given an array of n distinct numbers taken from the range [0, n], return the one number that is missing.",
    beginnerExplanation:
      "Two clean tricks: (1) the sum 0+1+...+n is n*(n+1)/2, so subtract the actual array sum. (2) XOR all indices 0..n with all values; pairs cancel and the missing number survives.",
    realWorldAnalogy:
      "A roll call from 0 to n where exactly one student is absent — compare who should be there to who answered, and the gap is the absentee.",
    visualExplanation: "nums=[3,0,1], n=3 -> expected sum 6, actual 4 -> missing 2",
    approaches: [
      {
        title: "Gauss sum",
        tier: "Optimal",
        idea: "Expected total minus actual total is the missing value.",
        steps: ["expected = n*(n+1)/2", "Return expected - sum(nums)"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "XOR indices and values",
        tier: "Optimal",
        idea: "XOR 0..n and all values; duplicates cancel, the missing one remains.",
        steps: ["res = n", "res ^= i ^ nums[i] for each i", "Return res"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[3,0,1]: expected 6, actual 4 -> 2; or XOR approach yields 2",
    interviewTips: ["Mention the sum approach can overflow for huge n — XOR avoids it.", "Both are O(n) time, O(1) space."],
    commonMistakes: ["Integer overflow in the sum for large n.", "Off-by-one in the expected-sum formula."],
    followUps: ["Find all numbers disappeared in an array.", "Find the duplicate number."],
    related: ["single-number", "number-of-1-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function missingNumber(nums) {
  const n = nums.length;
  let actual = 0;
  for (const x of nums) actual += x;
  return (n * (n + 1)) / 2 - actual;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer missingNumber(List<Integer> nums) {
        Integer n = nums.size();
        Integer expected = n * (n + 1) / 2;
        Integer actual = 0;
        for (Integer x : nums) actual += x;
        return expected - actual;
    }
}`,
      },
    ],
  },
];

// Full library = curated base + topic batches (see problems-batch-*.ts).
export const PROBLEMS: Problem[] = [
  ...BASE_PROBLEMS,
  ...PROBLEMS_BATCH_A,
  ...PROBLEMS_BATCH_B,
  ...PROBLEMS_BATCH_C,
  ...PROBLEMS_BATCH_D,
  ...PROBLEMS_BATCH_E,
  ...PROBLEMS_BATCH_F,
  ...PROBLEMS_BATCH_G,
  ...PROBLEMS_BATCH_H,
  ...PROBLEMS_BATCH_I,
  ...PROBLEMS_BATCH_J,
  ...PROBLEMS_BATCH_K,
  ...PROBLEMS_BATCH_L,
  ...PROBLEMS_BATCH_M,
  ...PROBLEMS_BATCH_N,
  ...PROBLEMS_BATCH_O,
  ...PROBLEMS_BATCH_P,
  ...PROBLEMS_BATCH_Q,
  ...PROBLEMS_BATCH_R,
  ...PROBLEMS_BATCH_S,
  ...PROBLEMS_BATCH_T,
  ...PROBLEMS_BATCH_U,
  ...PROBLEMS_BATCH_V,
];

export const PROBLEM_MAP: Record<string, Problem> = Object.fromEntries(
  PROBLEMS.map((p) => [p.slug, p]),
);

export function getProblem(slug: string): Problem | undefined {
  return PROBLEM_MAP[slug];
}

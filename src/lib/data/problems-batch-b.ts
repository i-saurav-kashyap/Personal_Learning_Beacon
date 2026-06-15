import type { Problem } from "@/lib/types";

// Batch B — Strings / Stack & Queue / Sliding Window. Authored to match the
// Striver A2Z course titles so the course deep-links into these.

export const PROBLEMS_BATCH_B: Problem[] = [
  {
    slug: "reverse-words-in-a-string",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Strings"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given an input string `s`, reverse the order of the words. Words are separated by one or more spaces; trim leading/trailing spaces and collapse multiple spaces between words to a single space.",
    beginnerExplanation:
      "Split the sentence into words, throw away the empty gaps, reverse the list of words, then glue them back with single spaces. The characters inside each word stay put — only the word order flips.",
    realWorldAnalogy:
      "Like reordering train carriages: each carriage (word) stays intact, you just reverse which one is at the front. The couplings (spaces) are all standardised to one gap.",
    visualExplanation:
      's = "  the sky  is blue "\nwords = ["the","sky","is","blue"]\nreversed = ["blue","is","sky","the"]\njoin → "blue is sky the"',
    approaches: [
      {
        title: "Split, reverse, join",
        tier: "Optimal",
        idea: "Use the language's split on whitespace (which drops empties), reverse, and join with one space.",
        steps: ["Trim and split on runs of whitespace", "Reverse the word list", "Join with a single space"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "In-place reversal (follow-up)",
        tier: "Better",
        idea: "Reverse the whole string, then reverse each word back — achieves O(1) extra space on a mutable char array.",
        steps: ["Reverse entire array", "Reverse each individual word", "Compact spaces"],
        time: "O(n)",
        space: "O(1) on a char array",
      },
    ],
    dryRun:
      'split("  hello   world ") → ["hello","world"]\nreverse → ["world","hello"]\njoin(" ") → "world hello"',
    interviewTips: [
      "Clarify whether multiple/leading/trailing spaces must be normalised — they usually must.",
      "If asked for O(1) space, pivot to the reverse-all-then-reverse-each-word trick on a mutable buffer.",
    ],
    commonMistakes: [
      "Leaving double spaces because you split on a single space instead of runs of whitespace.",
      "Reversing the characters of each word instead of the word order.",
    ],
    followUps: ["Do it in-place with O(1) extra space.", "Reverse only the words, keeping original spacing."],
    related: ["valid-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reverse_words(s):
    return " ".join(s.split()[::-1])`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String reverseWords(String s) {
        String[] parts = s.trim().split("\\\\s+");
        Collections.reverse(Arrays.asList(parts));
        return String.join(" ", parts);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(" ");
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String reverseWords(String s) {
        List<String> parts = s.trim().split('\\\\s+');
        List<String> rev = new List<String>();
        for (Integer i = parts.size() - 1; i >= 0; i--) rev.add(parts[i]);
        return String.join(rev, ' ');
    }
}`,
      },
    ],
  },
  {
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    patterns: ["two-pointers", "dynamic-programming"],
    topics: ["Strings"],
    companies: ["amazon", "microsoft", "adobe"],
    sheets: ["striver", "neetcode150"],
    frequency: 5,
    statement:
      "Given a string `s`, return the longest contiguous substring of `s` that reads the same forwards and backwards.",
    beginnerExplanation:
      "Every palindrome has a centre. Stand on each position and 'expand outwards' while the characters on both sides match. Track the widest expansion you ever achieve. Remember palindromes can have an even length (centre between two chars) or odd length (centre on a char).",
    realWorldAnalogy:
      "Like checking a mirror: stand in the middle and step outward in both directions at the same pace. As long as left and right look identical you keep going; the moment they differ, that mirror image ends.",
    visualExplanation:
      's = "babad"\ncentre i=1 (a): expand → "bab" (len 3)\ncentre i=2 (b): expand → "aba" (len 3)\nbest = "bab" (or "aba")',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "Test all O(n²) substrings for palindrome-ness.",
        steps: ["For each start", "For each end", "Verify palindrome in O(n)"],
        time: "O(n³)",
        space: "O(1)",
      },
      {
        title: "Expand around center",
        tier: "Optimal",
        idea: "For each of the 2n−1 centers, expand while both sides match.",
        steps: [
          "For each index i, expand for odd center (i, i)",
          "And even center (i, i+1)",
          "Keep the longest span found",
        ],
        time: "O(n²)",
        space: "O(1)",
      },
    ],
    dryRun:
      's = "cbbd"\ni=1 even center (1,2): s[1]=b==s[2]=b → expand to (0,3) c vs d ✗ → "bb" len 2\nbest = "bb"',
    interviewTips: [
      "Mention Manacher's algorithm exists for O(n) — most interviewers accept the O(n²) expand-around-center.",
      "Handle both odd and even centers; forgetting even centers misses palindromes like 'bb'.",
    ],
    commonMistakes: [
      "Only expanding odd-length centers.",
      "Off-by-one when converting the final (left,right) back into a substring length.",
    ],
    followUps: ["Return the count of palindromic substrings.", "Solve in O(n) with Manacher's algorithm."],
    related: ["valid-palindrome"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_palindrome(s):
    if not s:
        return ""
    start, end = 0, 0

    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1

    for i in range(len(s)):
        l1, r1 = expand(i, i)
        l2, r2 = expand(i, i + 1)
        if r1 - l1 > end - start:
            start, end = l1, r1
        if r2 - l2 > end - start:
            start, end = l2, r2
    return s[start:end + 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len = Math.max(expand(s, i, i), expand(s, i, i + 1));
            if (len > end - start + 1) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        return r - l - 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestPalindrome(s) {
  if (!s) return "";
  let start = 0, end = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return r - l - 1;
  };
  for (let i = 0; i < s.length; i++) {
    const len = Math.max(expand(i, i), expand(i, i + 1));
    if (len > end - start + 1) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.slice(start, end + 1);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private static Integer expand(String s, Integer l, Integer r) {
        while (l >= 0 && r < s.length() && s.substring(l, l + 1) == s.substring(r, r + 1)) { l--; r++; }
        return r - l - 1;
    }

    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return '';
        Integer start = 0, ed = 0;
        for (Integer i = 0; i < s.length(); i++) {
            Integer len = Math.max(expand(s, i, i), expand(s, i, i + 1));
            if (len > ed - start + 1) {
                start = i - (len - 1) / 2;
                ed = i + len / 2;
            }
        }
        return s.substring(start, ed + 1);
    }
}`,
      },
    ],
  },
  {
    slug: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Strings"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement `atoi`: convert a string to a 32-bit signed integer. Skip leading spaces, read an optional sign, then consume digits until a non-digit. Clamp the result to the 32-bit range [−2³¹, 2³¹−1].",
    beginnerExplanation:
      "Walk the string in phases: (1) skip spaces, (2) grab an optional + or −, (3) read digits building the number, stopping at the first non-digit. Finally clamp to the int range so you never overflow.",
    realWorldAnalogy:
      "Like a turnstile reading a ticket number: it ignores the blank margin, notes whether it's a credit or debit (sign), reads digits until the printing stops, and refuses any value beyond the machine's max.",
    visualExplanation:
      's = "   -42abc"\nskip spaces → "-42abc"\nsign = -1\ndigits "42" → 42\nstop at "a" → -42',
    approaches: [
      {
        title: "Single linear scan with clamping",
        tier: "Optimal",
        idea: "One pass through four phases; clamp on overflow using a wider accumulator.",
        steps: [
          "Skip leading spaces",
          "Read optional +/−",
          "Accumulate digits, clamping to INT_MAX/INT_MIN when exceeded",
          "Apply sign and return",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      's = "4193 with words"\ndigits 4→41→419→4193, then space stops → 4193',
    interviewTips: [
      "Clarify the exact rules (this mirrors LeetCode 8): no decimals, stop at first non-digit.",
      "Use a 64-bit accumulator (or check before multiplying) to detect overflow safely.",
    ],
    commonMistakes: [
      "Forgetting to clamp, causing overflow.",
      "Accepting a sign that appears after digits or whitespace in the middle.",
    ],
    followUps: ["Support arbitrary bases.", "Reject strings with trailing garbage entirely."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def my_atoi(s):
    i, n = 0, len(s)
    while i < n and s[i] == " ":
        i += 1
    sign = 1
    if i < n and s[i] in "+-":
        if s[i] == "-":
            sign = -1
        i += 1
    num = 0
    while i < n and s[i].isdigit():
        num = num * 10 + int(s[i])
        i += 1
    num *= sign
    return max(-2**31, min(2**31 - 1, num))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') sign = -1;
            i++;
        }
        long num = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            num = num * 10 + (s.charAt(i) - '0');
            if (sign == 1 && num > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (sign == -1 && -num < Integer.MIN_VALUE) return Integer.MIN_VALUE;
            i++;
        }
        return (int) (sign * num);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function myAtoi(s) {
  let i = 0;
  const n = s.length;
  while (i < n && s[i] === " ") i++;
  let sign = 1;
  if (i < n && (s[i] === "+" || s[i] === "-")) {
    if (s[i] === "-") sign = -1;
    i++;
  }
  let num = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    num = num * 10 + (s.charCodeAt(i) - 48);
    i++;
  }
  num *= sign;
  return Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, num));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer myAtoi(String s) {
        Integer i = 0, n = s.length();
        while (i < n && s.substring(i, i + 1) == ' ') i++;
        Integer sign = 1;
        if (i < n && (s.substring(i, i + 1) == '+' || s.substring(i, i + 1) == '-')) {
            if (s.substring(i, i + 1) == '-') sign = -1;
            i++;
        }
        Long num = 0;
        while (i < n && '0123456789'.indexOf(s.substring(i, i + 1)) >= 0) {
            num = num * 10 + Integer.valueOf(s.substring(i, i + 1));
            if (sign == 1 && num > 2147483647L) return 2147483647;
            if (sign == -1 && -num < -2147483648L) return -2147483648;
            i++;
        }
        return (Integer) (sign * num);
    }
}`,
      },
    ],
  },
  {
    slug: "implement-strstr",
    title: "Implement strStr()",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Strings", "Advanced String Algorithms"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the index of the first occurrence of `needle` in `haystack`, or −1 if it's not present. If `needle` is empty, return 0.",
    beginnerExplanation:
      "Slide the needle across the haystack one starting position at a time and check if it matches there. The naive version re-checks from scratch each time; the optimal KMP precomputes how far it can skip on a mismatch.",
    realWorldAnalogy:
      "Like looking for a short phrase in a paragraph by laying a transparent strip with the phrase over the text and sliding it word by word until the letters line up.",
    visualExplanation:
      'haystack="sadbutsad", needle="sad"\ni=0 "sad"=="sad" ✓ → return 0',
    approaches: [
      {
        title: "Sliding compare",
        tier: "Better",
        idea: "Try each start index and compare the substring.",
        steps: ["For i in 0..n−m", "Compare haystack[i..i+m) with needle", "Return i on match"],
        time: "O(n·m)",
        space: "O(1)",
      },
      {
        title: "KMP",
        tier: "Optimal",
        idea: "Precompute the longest-proper-prefix-suffix table so the search never re-examines characters.",
        steps: ["Build LPS array for needle", "Scan haystack once, falling back via LPS on mismatch"],
        time: "O(n + m)",
        space: "O(m)",
      },
    ],
    dryRun:
      'haystack="leetcode", needle="leeto"\ni=0 compare "leetc" vs "leeto" mismatch at index 4 → slide → ... → not found → -1',
    interviewTips: [
      "Naming KMP and explaining the LPS table signals depth even if you implement the simple version.",
      "Clarify the empty-needle convention (return 0).",
    ],
    commonMistakes: ["Looping i past n−m and indexing out of bounds.", "Mishandling the empty needle."],
    followUps: ["Implement Rabin-Karp with rolling hash.", "Count all occurrences, not just the first."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def str_str(haystack, needle):
    if needle == "":
        return 0
    n, m = len(haystack), len(needle)
    for i in range(n - m + 1):
        if haystack[i:i + m] == needle:
            return i
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        int n = haystack.length(), m = needle.length();
        for (int i = 0; i + m <= n; i++) {
            if (haystack.substring(i, i + m).equals(needle)) return i;
        }
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function strStr(haystack, needle) {
  if (needle === "") return 0;
  const n = haystack.length, m = needle.length;
  for (let i = 0; i + m <= n; i++) {
    if (haystack.slice(i, i + m) === needle) return i;
  }
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer strStr(String haystack, String needle) {
        if (needle == '') return 0;
        Integer n = haystack.length(), m = needle.length();
        for (Integer i = 0; i + m <= n; i++) {
            if (haystack.substring(i, i + m) == needle) return i;
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    patterns: ["monotonic-stack", "stack"],
    topics: ["Stacks"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 4,
    statement:
      "Given an array `heights` of bar heights (each width 1), return the area of the largest rectangle that fits entirely under the histogram.",
    beginnerExplanation:
      "For each bar, the biggest rectangle using that bar as the shortest one stretches left and right until it hits a strictly shorter bar. A monotonic increasing stack lets you find those left/right boundaries for every bar in one pass.",
    realWorldAnalogy:
      "Picture city skyscrapers of width 1. The widest billboard of a given height you can hang spans every neighbouring building at least that tall — you stop where a shorter building breaks the run.",
    visualExplanation:
      "heights = [2,1,5,6,2,3]\nbar 5 & 6 form 5*2=10? bar 6 alone 6, bars 5,6 → min 5 width 2 = 10\nbest = 10",
    approaches: [
      {
        title: "Expand each bar",
        tier: "Brute Force",
        idea: "For each bar, walk left and right while bars are ≥ its height.",
        steps: ["For each i, extend both directions", "width × height[i]"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Monotonic increasing stack",
        tier: "Optimal",
        idea: "Keep indices of increasing heights; when a shorter bar appears, pop and compute the area with the popped bar as the limiting height.",
        steps: [
          "Iterate with a virtual 0-height bar at the end",
          "While stack top is ≥ current, pop it",
          "width = current_index − new_top − 1; area = popped_height × width",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "heights=[2,1,5,6,2,3] append 0\n...pop 6 → width 1 area 6; pop 5 → width 2 area 10 (best); ... best=10",
    interviewTips: [
      "The sentinel 0 at the end flushes the stack cleanly — mention it.",
      "This is the backbone of 'Maximal Rectangle' in a binary matrix.",
    ],
    commonMistakes: [
      "Wrong width formula after popping (it's i − stack.top − 1, not i − popped).",
      "Forgetting the trailing sentinel so the last bars never get measured.",
    ],
    followUps: ["Maximal Rectangle in a 0/1 matrix.", "Largest square instead of rectangle."],
    related: ["daily-temperatures"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def largest_rectangle_area(heights):
    stack = []  # indices, increasing heights
    best = 0
    n = len(heights)
    for i in range(n + 1):
        cur = heights[i] if i < n else 0
        while stack and heights[stack[-1]] >= cur:
            height = heights[stack.pop()]
            left = stack[-1] if stack else -1
            best = max(best, height * (i - left - 1))
        stack.append(i)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length, best = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i <= n; i++) {
            int cur = i < n ? heights[i] : 0;
            while (!stack.isEmpty() && heights[stack.peek()] >= cur) {
                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                best = Math.max(best, height * (i - left - 1));
            }
            stack.push(i);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function largestRectangleArea(heights) {
  const stack = [];
  let best = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const cur = i < n ? heights[i] : 0;
    while (stack.length && heights[stack[stack.length - 1]] >= cur) {
      const height = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] : -1;
      best = Math.max(best, height * (i - left - 1));
    }
    stack.push(i);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer largestRectangleArea(List<Integer> heights) {
        Integer n = heights.size(), best = 0;
        List<Integer> stack = new List<Integer>();
        for (Integer i = 0; i <= n; i++) {
            Integer cur = i < n ? heights[i] : 0;
            while (!stack.isEmpty() && heights[stack[stack.size() - 1]] >= cur) {
                Integer height = heights[stack.remove(stack.size() - 1)];
                Integer left = stack.isEmpty() ? -1 : stack[stack.size() - 1];
                best = Math.max(best, height * (i - left - 1));
            }
            stack.add(i);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    patterns: ["sliding-window", "monotonic-stack"],
    topics: ["Arrays", "Queues"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an array `nums` and a window size `k`, return an array of the maximum value in each contiguous window of size `k` as it slides from left to right.",
    beginnerExplanation:
      "Keep a deque of indices whose values are in decreasing order. The front is always the current window's max. When you slide, drop indices that fell out of the window on the left and drop smaller values from the back before adding the new one.",
    realWorldAnalogy:
      "Like a leaderboard for a moving time window: anyone who scores higher than the people behind them bumps those weaker scores off the board, and anyone whose entry expired (left the window) drops off the top.",
    visualExplanation:
      "nums=[1,3,-1,-3,5,3], k=3\nwindows: [1,3,-1]→3, [3,-1,-3]→3, [-1,-3,5]→5, [-3,5,3]→5\nresult = [3,3,5,5]",
    approaches: [
      {
        title: "Re-scan each window",
        tier: "Brute Force",
        idea: "Compute the max of every window directly.",
        steps: ["For each window start", "Scan k elements for the max"],
        time: "O(n·k)",
        space: "O(1)",
      },
      {
        title: "Monotonic deque",
        tier: "Optimal",
        idea: "Maintain indices with decreasing values; front is the window max.",
        steps: [
          "Pop back while its value ≤ current (they can never be the max again)",
          "Push current index",
          "Pop front if it's outside the window",
          "Record nums[front] once the window is full",
        ],
        time: "O(n)",
        space: "O(k)",
      },
    ],
    dryRun:
      "nums=[1,3,-1], k=3\ni0: dq=[0]; i1: 3>1 pop → dq=[1]; i2: -1 → dq=[1,2]; front=1 → max=3",
    interviewTips: [
      "Store indices, not values, so you can detect when the max expires off the left.",
      "Each index is pushed and popped at most once → amortised O(n).",
    ],
    commonMistakes: [
      "Storing values and being unable to expire the left edge.",
      "Using ≤ vs < incorrectly when popping the back (use ≤ to keep the deque strictly useful).",
    ],
    followUps: ["Sliding window minimum (mirror).", "Stream version where k changes over time."],
    related: ["daily-temperatures"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # indices, decreasing values
    res = []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        int[] res = new int[nums.length - k + 1];
        int idx = 0;
        for (int i = 0; i < nums.length; i++) {
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
            dq.offerLast(i);
            if (dq.peekFirst() <= i - k) dq.pollFirst();
            if (i >= k - 1) res[idx++] = nums[dq.peekFirst()];
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxSlidingWindow(nums, k) {
  const dq = []; // indices
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> maxSlidingWindow(List<Integer> nums, Integer k) {
        List<Integer> dq = new List<Integer>(); // indices
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < nums.size(); i++) {
            while (!dq.isEmpty() && nums[dq[dq.size() - 1]] <= nums[i]) dq.remove(dq.size() - 1);
            dq.add(i);
            if (dq[0] <= i - k) dq.remove(0);
            if (i >= k - 1) res.add(nums[dq[0]]);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    patterns: ["sliding-window", "hashing"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon", "meta", "google", "uber"],
    sheets: ["striver", "neetcode150"],
    frequency: 5,
    statement:
      "Given strings `s` and `t`, return the shortest substring of `s` that contains every character of `t` (including duplicates). If none exists, return the empty string.",
    beginnerExplanation:
      "Grow a window on the right until it covers all of t's character demands, then shrink it from the left as far as possible while it still covers t — recording the smallest covering window seen. A 'missing' counter tells you instantly when the window is valid.",
    realWorldAnalogy:
      "Like packing the shortest stretch of a shopping aisle that still contains everything on your list: you walk forward grabbing items until the list is complete, then trim the back end as long as nothing on the list goes missing.",
    visualExplanation:
      's="ADOBECODEBANC", t="ABC"\nfirst valid window "ADOBEC" → shrink → ... best "BANC" (len 4)',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "Test all substrings for coverage of t.",
        steps: ["Enumerate all O(n²) substrings", "Check coverage in O(m)"],
        time: "O(n²·m)",
        space: "O(m)",
      },
      {
        title: "Sliding window + need counts",
        tier: "Optimal",
        idea: "Track required counts and a 'missing' total; expand right, contract left while valid.",
        steps: [
          "Build need counts from t; missing = len(t)",
          "Expand right: if char was needed, decrement missing",
          "While missing == 0, try to shrink left and record the best window",
        ],
        time: "O(n + m)",
        space: "O(m)",
      },
    ],
    dryRun:
      's="ADOBEC...", t="ABC"\nexpand to index of C → missing 0 → record len 6; shrink left past A → missing 1 → expand again...',
    interviewTips: [
      "The 'missing' integer avoids comparing whole maps each step — call that out.",
      "Works for any alphabet because counts live in a hash map.",
    ],
    commonMistakes: [
      "Incrementing missing on every left move instead of only when a needed char's count goes positive.",
      "Returning a window that's valid but not the minimum (update best only inside the shrink loop).",
    ],
    followUps: ["Window containing at most K distinct chars.", "Return all minimum windows."],
    related: ["longest-substring-without-repeating", "longest-repeating-character-replacement"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import Counter

def min_window(s, t):
    if not s or not t:
        return ""
    need = Counter(t)
    missing = len(t)
    left = 0
    best = (float("inf"), 0)
    for right, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        while missing == 0:
            if right - left + 1 < best[0]:
                best = (right - left + 1, left)
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    return "" if best[0] == float("inf") else s[best[1]:best[1] + best[0]]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty()) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);
        int missing = t.length(), left = 0, bestLen = Integer.MAX_VALUE, bestStart = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.getOrDefault(c, 0) > 0) missing--;
            need.put(c, need.getOrDefault(c, 0) - 1);
            while (missing == 0) {
                if (right - left + 1 < bestLen) { bestLen = right - left + 1; bestStart = left; }
                char lc = s.charAt(left);
                need.put(lc, need.get(lc) + 1);
                if (need.get(lc) > 0) missing++;
                left++;
            }
        }
        return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minWindow(s, t) {
  if (!s || !t) return "";
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let missing = t.length, left = 0, bestLen = Infinity, bestStart = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if ((need.get(c) || 0) > 0) missing--;
    need.set(c, (need.get(c) || 0) - 1);
    while (missing === 0) {
      if (right - left + 1 < bestLen) { bestLen = right - left + 1; bestStart = left; }
      const lc = s[left];
      need.set(lc, need.get(lc) + 1);
      if (need.get(lc) > 0) missing++;
      left++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return '';
        Map<String, Integer> need = new Map<String, Integer>();
        for (Integer i = 0; i < t.length(); i++) {
            String c = t.substring(i, i + 1);
            need.put(c, (need.containsKey(c) ? need.get(c) : 0) + 1);
        }
        Integer missing = t.length(), left = 0, bestLen = 2147483647, bestStart = 0;
        for (Integer right = 0; right < s.length(); right++) {
            String c = s.substring(right, right + 1);
            Integer cv = need.containsKey(c) ? need.get(c) : 0;
            if (cv > 0) missing--;
            need.put(c, cv - 1);
            while (missing == 0) {
                if (right - left + 1 < bestLen) { bestLen = right - left + 1; bestStart = left; }
                String lc = s.substring(left, left + 1);
                need.put(lc, need.get(lc) + 1);
                if (need.get(lc) > 0) missing++;
                left++;
            }
        }
        return bestLen == 2147483647 ? '' : s.substring(bestStart, bestStart + bestLen);
    }
}`,
      },
    ],
  },
  {
    slug: "next-greater-element-i",
    title: "Next Greater Element I",
    difficulty: "Easy",
    patterns: ["monotonic-stack", "stack", "hashing"],
    topics: ["Stacks", "Hashing"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "`nums1` is a subset of `nums2`. For each value in `nums1`, find the first greater value to its right in `nums2`; if none, use −1. Return the answers in `nums1` order.",
    beginnerExplanation:
      "Precompute, for every element in nums2, its next greater element using a decreasing monotonic stack in one pass. Store those answers in a map, then look up each nums1 value.",
    realWorldAnalogy:
      "Like a line of people of various heights: for each person, the next greater is the first taller person ahead. A stack of 'still waiting for someone taller' resolves everyone in one walk.",
    visualExplanation:
      "nums2=[1,3,4,2]\n1→3, 3→4, 4→-1, 2→-1\nnums1=[4,1,2] → [-1,3,-1]",
    approaches: [
      {
        title: "Brute force per query",
        tier: "Brute Force",
        idea: "For each nums1 value, find it in nums2 and scan right.",
        steps: ["Locate value in nums2", "Scan right for first greater"],
        time: "O(n·m)",
        space: "O(1)",
      },
      {
        title: "Monotonic stack + map",
        tier: "Optimal",
        idea: "One decreasing stack over nums2 resolves every next-greater; cache in a map.",
        steps: [
          "For each x in nums2, while stack top < x, pop and map[popped] = x",
          "Push x",
          "Answer each nums1 value via the map (default −1)",
        ],
        time: "O(n + m)",
        space: "O(n)",
      },
    ],
    dryRun:
      "nums2=[2,1,3]\nx=2 push; x=1 push; x=3 pops 1→3, pops 2→3; map={1:3,2:3}",
    interviewTips: [
      "This is the gateway to circular next-greater (loop the array twice).",
      "Values are unique here, simplifying the map keys.",
    ],
    commonMistakes: ["Forgetting to default missing answers to −1.", "Using ≤ instead of < and mis-handling equals."],
    followUps: ["Next Greater Element II (circular array).", "Next greater with duplicates."],
    related: ["daily-temperatures"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def next_greater_element(nums1, nums2):
    nge = {}
    stack = []
    for x in nums2:
        while stack and stack[-1] < x:
            nge[stack.pop()] = x
        stack.append(x)
    return [nge.get(x, -1) for x in nums1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> nge = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int x : nums2) {
            while (!stack.isEmpty() && stack.peek() < x) nge.put(stack.pop(), x);
            stack.push(x);
        }
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) res[i] = nge.getOrDefault(nums1[i], -1);
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function nextGreaterElement(nums1, nums2) {
  const nge = new Map();
  const stack = [];
  for (const x of nums2) {
    while (stack.length && stack[stack.length - 1] < x) nge.set(stack.pop(), x);
    stack.push(x);
  }
  return nums1.map((x) => (nge.has(x) ? nge.get(x) : -1));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> nextGreaterElement(List<Integer> nums1, List<Integer> nums2) {
        Map<Integer, Integer> nge = new Map<Integer, Integer>();
        List<Integer> stack = new List<Integer>();
        for (Integer x : nums2) {
            while (!stack.isEmpty() && stack[stack.size() - 1] < x) nge.put(stack.remove(stack.size() - 1), x);
            stack.add(x);
        }
        List<Integer> res = new List<Integer>();
        for (Integer x : nums1) res.add(nge.containsKey(x) ? nge.get(x) : -1);
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "asteroid-collision",
    title: "Asteroid Collision",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks"],
    companies: ["amazon", "uber"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Each asteroid in `asteroids` moves right (positive) or left (negative) at equal speed; the magnitude is its size. Right-movers and left-movers collide when they meet — the smaller explodes, equal sizes both explode. Return the surviving asteroids.",
    beginnerExplanation:
      "A stack holds surviving asteroids. A new left-mover only threatens right-movers already on the stack. Resolve collisions by comparing sizes: the new one keeps eating right-movers until it dies, ties out, or survives on top.",
    realWorldAnalogy:
      "Bumper cars on a single track: a car going left only crashes into right-going cars behind it on the stack; the heavier one wins, equal weights wreck each other.",
    visualExplanation:
      "[5,10,-5]\n5,10 on stack; -5 vs 10 → 10 bigger, -5 explodes → [5,10]",
    approaches: [
      {
        title: "Stack simulation",
        tier: "Optimal",
        idea: "Push survivors; for each left-mover, resolve collisions against the stack top.",
        steps: [
          "For each asteroid a",
          "While a is left-moving and top is right-moving: compare; pop smaller, both die on tie",
          "If a survives all, push it",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "[8,-8]\npush 8; a=-8 vs 8 equal → pop 8, -8 dies → []",
    interviewTips: [
      "Only a negative meeting a positive on top collides — same signs never collide.",
      "Use a flag (alive) so a fully-destroyed asteroid isn't pushed.",
    ],
    commonMistakes: [
      "Pushing the new asteroid even after it exploded.",
      "Forgetting the equal-size case where both vanish.",
    ],
    followUps: ["Different speeds.", "Report which asteroids destroyed which."],
    related: ["valid-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def asteroid_collision(asteroids):
    stack = []
    for a in asteroids:
        alive = True
        while alive and a < 0 and stack and stack[-1] > 0:
            if stack[-1] < -a:
                stack.pop()
                continue
            elif stack[-1] == -a:
                stack.pop()
            alive = False
        if alive:
            stack.append(a)
    return stack`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (int a : asteroids) {
            boolean alive = true;
            while (alive && a < 0 && !stack.isEmpty() && stack.peek() > 0) {
                if (stack.peek() < -a) { stack.pop(); continue; }
                else if (stack.peek() == -a) { stack.pop(); }
                alive = false;
            }
            if (alive) stack.push(a);
        }
        int[] res = new int[stack.size()];
        for (int i = res.length - 1; i >= 0; i--) res[i] = stack.pop();
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function asteroidCollision(asteroids) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) { stack.pop(); continue; }
      else if (top === -a) { stack.pop(); }
      alive = false;
    }
    if (alive) stack.push(a);
  }
  return stack;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> asteroidCollision(List<Integer> asteroids) {
        List<Integer> stack = new List<Integer>();
        for (Integer a : asteroids) {
            Boolean alive = true;
            while (alive && a < 0 && !stack.isEmpty() && stack[stack.size() - 1] > 0) {
                Integer top = stack[stack.size() - 1];
                if (top < -a) { stack.remove(stack.size() - 1); continue; }
                else if (top == -a) { stack.remove(stack.size() - 1); }
                alive = false;
            }
            if (alive) stack.add(a);
        }
        return stack;
    }
}`,
      },
    ],
  },
  {
    slug: "car-fleet",
    title: "Car Fleet",
    difficulty: "Medium",
    patterns: ["stack", "greedy"],
    topics: ["Stacks"],
    companies: ["google", "amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Cars head to a `target` mile marker; car i starts at `position[i]` with `speed[i]`. A faster car catching a slower one ahead forms a fleet moving at the slower car's pace. Return how many fleets arrive.",
    beginnerExplanation:
      "Sort cars by starting position closest-to-target first. Compute each car's arrival time. Walking from the front, a car forms a new fleet only if it arrives strictly later than the slowest car ahead of it; otherwise it gets absorbed.",
    realWorldAnalogy:
      "Traffic on a one-lane road with no overtaking: a quick car behind a slow one just bunches up behind it. Count the distinct bunches that reach the finish.",
    visualExplanation:
      "target=12, pos=[10,8,0,5,3], speed=[2,4,1,1,3]\ntimes (closest first): 1, 1, 7, 3, 3 → fleets where time strictly increases → 3",
    approaches: [
      {
        title: "Sort by position + arrival times",
        tier: "Optimal",
        idea: "Sort descending by position; a new fleet starts when arrival time exceeds the current fleet's time.",
        steps: [
          "Pair (position, speed) and sort by position descending",
          "time = (target − position) / speed",
          "If time > current max time, it's a new fleet; update max",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "closest car time=1 → fleet1 (cur=1); next time=1 not >1 → absorbed; next time=3 → fleet2 (cur=3)...",
    interviewTips: [
      "Sorting by position and sweeping is the key insight — arrival time is the comparison metric.",
      "Use strict > so equal arrival times merge into one fleet.",
    ],
    commonMistakes: ["Sorting ascending and sweeping the wrong direction.", "Integer division losing precision — use floats."],
    followUps: ["Car Fleet II (when each collision happens).", "Multiple lanes."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def car_fleet(target, position, speed):
    pairs = sorted(zip(position, speed), reverse=True)
    fleets = 0
    cur = 0.0
    for pos, spd in pairs:
        t = (target - pos) / spd
        if t > cur:
            fleets += 1
            cur = t
    return fleets`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        int[][] cars = new int[n][2];
        for (int i = 0; i < n; i++) { cars[i][0] = position[i]; cars[i][1] = speed[i]; }
        Arrays.sort(cars, (a, b) -> b[0] - a[0]);
        int fleets = 0;
        double cur = 0;
        for (int[] c : cars) {
            double t = (double) (target - c[0]) / c[1];
            if (t > cur) { fleets++; cur = t; }
        }
        return fleets;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function carFleet(target, position, speed) {
  const cars = position
    .map((p, i) => [p, speed[i]])
    .sort((a, b) => b[0] - a[0]);
  let fleets = 0, cur = 0;
  for (const [p, s] of cars) {
    const t = (target - p) / s;
    if (t > cur) { fleets++; cur = t; }
  }
  return fleets;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer carFleet(Integer target, List<Integer> position, List<Integer> speed) {
        Map<Integer, Integer> spd = new Map<Integer, Integer>();
        List<Integer> pos = new List<Integer>();
        for (Integer i = 0; i < position.size(); i++) { spd.put(position[i], speed[i]); pos.add(position[i]); }
        pos.sort(); // ascending
        Integer fleets = 0;
        Double cur = 0;
        for (Integer i = pos.size() - 1; i >= 0; i--) { // closest to target first
            Double t = (Double) (target - pos[i]) / spd.get(pos[i]);
            if (t > cur) { fleets++; cur = t; }
        }
        return fleets;
    }
}`,
      },
    ],
  },
  {
    slug: "sum-of-subarray-minimums",
    title: "Sum of Subarray Minimums",
    difficulty: "Medium",
    patterns: ["monotonic-stack"],
    topics: ["Arrays", "Stacks"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array `arr`, return the sum of the minimum value of every contiguous subarray, modulo 1e9+7.",
    beginnerExplanation:
      "Instead of enumerating all subarrays, count how many subarrays each element is the minimum of. That equals (distance to the previous smaller element) × (distance to the next smaller element). Multiply by the value and sum.",
    realWorldAnalogy:
      "Each element 'rules' a stretch of the array where it's the smallest. Its total contribution is its value times how many windows it governs — found with a monotonic stack.",
    visualExplanation:
      "arr=[3,1,2,4]\n1 is min of subarrays spanning it → contributes most; sum of all subarray minimums = 17",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Sum the min of each subarray directly.",
        steps: ["For each start, track running min as end extends"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Monotonic stack contribution",
        tier: "Optimal",
        idea: "For each index find previous-smaller and next-smaller boundaries; contribution = arr[i]·(i−left)·(right−i).",
        steps: [
          "Iterate with an increasing stack and a trailing sentinel",
          "On pop, left = new top, right = current index",
          "Add arr[mid]·(mid−left)·(right−mid) modulo 1e9+7",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "arr=[3,1,2,4]: pop 3 (left −1,right 1) → 3·1·1=3; ... total = 17",
    interviewTips: [
      "Use ≥ on one side and > on the other (here ≥ when popping) so equal minimums aren't double-counted.",
      "Accumulate with a 64-bit type before taking the modulo.",
    ],
    commonMistakes: [
      "Double counting equal elements by using the same strictness on both boundaries.",
      "Integer overflow before applying the modulo.",
    ],
    followUps: ["Sum of subarray maximums.", "Sum of subarray ranges (max − min)."],
    related: ["largest-rectangle-in-histogram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def sum_subarray_mins(arr):
    MOD = 10**9 + 7
    n = len(arr)
    stack = []
    res = 0
    for i in range(n + 1):
        while stack and (i == n or arr[stack[-1]] >= arr[i]):
            mid = stack.pop()
            left = stack[-1] if stack else -1
            res += arr[mid] * (mid - left) * (i - mid)
        stack.append(i)
    return res % MOD`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int sumSubarrayMins(int[] arr) {
        long MOD = 1_000_000_007L, res = 0;
        int n = arr.length;
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && (i == n || arr[stack.peek()] >= arr[i])) {
                int mid = stack.pop();
                int left = stack.isEmpty() ? -1 : stack.peek();
                res = (res + (long) arr[mid] * (mid - left) * (i - mid)) % MOD;
            }
            stack.push(i);
        }
        return (int) res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function sumSubarrayMins(arr) {
  const MOD = 1000000007;
  const n = arr.length;
  const stack = [];
  let res = 0;
  for (let i = 0; i <= n; i++) {
    while (stack.length && (i === n || arr[stack[stack.length - 1]] >= arr[i])) {
      const mid = stack.pop();
      const left = stack.length ? stack[stack.length - 1] : -1;
      res = (res + arr[mid] * (mid - left) * (i - mid)) % MOD;
    }
    stack.push(i);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer sumSubarrayMins(List<Integer> arr) {
        Long MOD = 1000000007L;
        Long res = 0;
        Integer n = arr.size();
        List<Integer> stack = new List<Integer>();
        for (Integer i = 0; i <= n; i++) {
            while (!stack.isEmpty() && (i == n || arr[stack[stack.size() - 1]] >= arr[i])) {
                Integer mid = stack.remove(stack.size() - 1);
                Integer left = stack.isEmpty() ? -1 : stack[stack.size() - 1];
                Long term = (Long) arr[mid] * (mid - left) * (i - mid);
                res = Math.mod(res + term, MOD);
            }
            stack.add(i);
        }
        return (Integer) res;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-palindrome",
    title: "Longest Palindrome",
    difficulty: "Easy",
    patterns: ["hashing", "greedy"],
    topics: ["Strings", "Hashing"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a string `s` of letters, return the length of the longest palindrome that can be built using those letters (each letter used at most as many times as it appears).",
    beginnerExplanation:
      "A palindrome pairs letters around a center. Every letter contributes its count rounded down to an even number. If any letter has a leftover (odd count), you can place one of them in the very middle — so add 1.",
    realWorldAnalogy:
      "Like seating guests symmetrically at a long table: everyone needs a mirror partner, except one VIP who can sit exactly in the middle seat.",
    visualExplanation:
      's="abccccdd"\npairs: c→4, d→2, a/b→0 usable pairs → 6; an odd exists (a) → +1 → 7',
    approaches: [
      {
        title: "Count letters",
        tier: "Optimal",
        idea: "Sum even parts of each count; add 1 if any count is odd.",
        steps: ["Count each character", "length += count − (count % 2)", "If any odd count seen, add 1"],
        time: "O(n)",
        space: "O(1) for fixed alphabet",
      },
    ],
    dryRun: 's="aabb": a→2, b→2 → 4, no odd leftover → 4',
    interviewTips: [
      "Only ONE odd-count letter can sit in the middle — adding 1 once, not per odd letter.",
      "Clarify case sensitivity: 'A' and 'a' may count separately.",
    ],
    commonMistakes: ["Adding 1 for every odd letter instead of just once.", "Forgetting to floor odd counts to even."],
    followUps: ["Return the actual palindrome.", "Allow building multiple palindromes."],
    related: ["valid-palindrome", "valid-anagram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import Counter

def longest_palindrome(s):
    counts = Counter(s)
    length = 0
    odd = False
    for c in counts.values():
        length += c - (c % 2)
        if c % 2 == 1:
            odd = True
    return length + (1 if odd else 0)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int longestPalindrome(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) counts.put(c, counts.getOrDefault(c, 0) + 1);
        int length = 0;
        boolean odd = false;
        for (int c : counts.values()) {
            length += c - (c % 2);
            if (c % 2 == 1) odd = true;
        }
        return length + (odd ? 1 : 0);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestPalindrome(s) {
  const counts = {};
  for (const c of s) counts[c] = (counts[c] || 0) + 1;
  let length = 0, odd = false;
  for (const c of Object.values(counts)) {
    length += c - (c % 2);
    if (c % 2 === 1) odd = true;
  }
  return length + (odd ? 1 : 0);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestPalindrome(String s) {
        Map<String, Integer> counts = new Map<String, Integer>();
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            counts.put(c, (counts.containsKey(c) ? counts.get(c) : 0) + 1);
        }
        Integer length = 0;
        Boolean odd = false;
        for (Integer c : counts.values()) {
            length += c - Math.mod(c, 2);
            if (Math.mod(c, 2) == 1) odd = true;
        }
        return length + (odd ? 1 : 0);
    }
}`,
      },
    ],
  },
  {
    slug: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Stacks", "Queues"],
    companies: ["microsoft", "amazon"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement a FIFO queue (push, pop, peek, empty) using only two LIFO stacks.",
    beginnerExplanation:
      "Use an 'in' stack for pushes and an 'out' stack for pops. When you need the front and 'out' is empty, pour everything from 'in' into 'out' — reversing the order so the oldest element ends up on top. Each element is moved at most once (amortised O(1)).",
    realWorldAnalogy:
      "Two spring-loaded plate dispensers: you stack new plates in one; to serve the oldest, you transfer the whole stack into the second dispenser once, which flips the order so the first plate added comes out first.",
    visualExplanation:
      "push 1,2,3 → in=[1,2,3]\npop: pour to out=[3,2,1]→ top is 1 → pop 1",
    approaches: [
      {
        title: "Two stacks, lazy transfer",
        tier: "Optimal",
        idea: "Amortise: only move elements from in→out when out is empty.",
        steps: ["push → in.push(x)", "peek/pop → if out empty, drain in into out", "return out.top / out.pop"],
        time: "O(1) amortised",
        space: "O(n)",
      },
    ],
    dryRun: "push 1; push 2; pop → drain → out=[2,1]→ pop returns 1; peek → 2",
    interviewTips: [
      "Stress the amortised analysis: each element is transferred exactly once.",
      "Only refill 'out' when it's empty — refilling early breaks FIFO order.",
    ],
    commonMistakes: ["Transferring on every operation (loses amortised O(1)).", "Refilling 'out' while it still has elements, scrambling order."],
    followUps: ["Implement a stack using queues.", "Make it thread-safe."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class MyQueue:
    def __init__(self):
        self.inb = []
        self.out = []

    def push(self, x):
        self.inb.append(x)

    def pop(self):
        self.peek()
        return self.out.pop()

    def peek(self):
        if not self.out:
            while self.inb:
                self.out.append(self.inb.pop())
        return self.out[-1]

    def empty(self):
        return not self.inb and not self.out`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class MyQueue {
    private Deque<Integer> in = new ArrayDeque<>();
    private Deque<Integer> out = new ArrayDeque<>();

    public void push(int x) { in.push(x); }

    public int pop() { peek(); return out.pop(); }

    public int peek() {
        if (out.isEmpty()) while (!in.isEmpty()) out.push(in.pop());
        return out.peek();
    }

    public boolean empty() { return in.isEmpty() && out.isEmpty(); }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class MyQueue {
  constructor() {
    this.inb = [];
    this.out = [];
  }
  push(x) {
    this.inb.push(x);
  }
  pop() {
    this.peek();
    return this.out.pop();
  }
  peek() {
    if (this.out.length === 0) {
      while (this.inb.length) this.out.push(this.inb.pop());
    }
    return this.out[this.out.length - 1];
  }
  empty() {
    return this.inb.length === 0 && this.out.length === 0;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class MyQueue {
    private List<Integer> inb = new List<Integer>();
    private List<Integer> outb = new List<Integer>();

    public void push(Integer x) { inb.add(x); }

    public Integer pop() { peek(); return outb.remove(outb.size() - 1); }

    public Integer peek() {
        if (outb.isEmpty()) {
            while (!inb.isEmpty()) outb.add(inb.remove(inb.size() - 1));
        }
        return outb[outb.size() - 1];
    }

    public Boolean isEmpty() { return inb.isEmpty() && outb.isEmpty(); }
}`,
      },
    ],
  },
  {
    slug: "decode-string",
    title: "Decode String",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Strings", "Stacks"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Decode a string encoded as `k[encoded]`, meaning the bracketed part repeats k times. Brackets can nest, e.g. `3[a2[c]]` → `accaccacc`.",
    beginnerExplanation:
      "Use two stacks (or one of pairs): when you hit '[', push the string built so far and the repeat count, then start fresh. On ']', pop the count and the previous string, and append the current chunk repeated k times.",
    realWorldAnalogy:
      "Like opening Russian nesting dolls: each '[' opens a new doll (saving what you held), and each ']' closes it, multiplying the inner contents before placing them back inside the outer doll.",
    visualExplanation:
      '"3[a2[c]]"\nstack on outer 3 → build "a", inner 2[c] → "cc" → "acc" → ×3 → "accaccacc"',
    approaches: [
      {
        title: "Two stacks (counts + strings)",
        tier: "Optimal",
        idea: "Push context on '[', resolve and multiply on ']'.",
        steps: [
          "Digit → build the current number",
          "'[' → push current string and number, reset both",
          "']' → pop count k and previous string; cur = prev + cur×k",
          "Letter → append to current string",
        ],
        time: "O(output length)",
        space: "O(depth)",
      },
    ],
    dryRun:
      '"2[ab]": read 2; "[" push("",2); read a,b → "ab"; "]" → prev "" + "ab"*2 = "abab"',
    interviewTips: [
      "Build multi-digit counts with num = num*10 + digit.",
      "A recursive parser is an elegant alternative — mention it.",
    ],
    commonMistakes: [
      "Only handling single-digit repeat counts.",
      "Concatenating in the wrong order (prev goes before the repeated chunk).",
    ],
    followUps: ["Decode with malformed-input validation.", "Solve recursively."],
    related: ["valid-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def decode_string(s):
    stack = []  # (prev_string, repeat_count)
    cur = ""
    num = 0
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == "[":
            stack.append((cur, num))
            cur, num = "", 0
        elif ch == "]":
            prev, k = stack.pop()
            cur = prev + cur * k
        else:
            cur += ch
    return cur`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String decodeString(String s) {
        Deque<Integer> counts = new ArrayDeque<>();
        Deque<StringBuilder> strs = new ArrayDeque<>();
        StringBuilder cur = new StringBuilder();
        int num = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
            } else if (ch == '[') {
                counts.push(num);
                strs.push(cur);
                cur = new StringBuilder();
                num = 0;
            } else if (ch == ']') {
                int k = counts.pop();
                StringBuilder prev = strs.pop();
                for (int i = 0; i < k; i++) prev.append(cur);
                cur = prev;
            } else {
                cur.append(ch);
            }
        }
        return cur.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function decodeString(s) {
  const counts = [];
  const strs = [];
  let cur = "";
  let num = 0;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") {
      num = num * 10 + Number(ch);
    } else if (ch === "[") {
      counts.push(num);
      strs.push(cur);
      cur = "";
      num = 0;
    } else if (ch === "]") {
      const k = counts.pop();
      cur = strs.pop() + cur.repeat(k);
    } else {
      cur += ch;
    }
  }
  return cur;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String decodeString(String s) {
        List<Integer> counts = new List<Integer>();
        List<String> strs = new List<String>();
        String cur = '';
        Integer num = 0;
        for (Integer i = 0; i < s.length(); i++) {
            String ch = s.substring(i, i + 1);
            if ('0123456789'.indexOf(ch) >= 0) {
                num = num * 10 + Integer.valueOf(ch);
            } else if (ch == '[') {
                counts.add(num);
                strs.add(cur);
                cur = '';
                num = 0;
            } else if (ch == ']') {
                Integer k = counts.remove(counts.size() - 1);
                String prev = strs.remove(strs.size() - 1);
                String repeated = '';
                for (Integer j = 0; j < k; j++) repeated += cur;
                cur = prev + repeated;
            } else {
                cur += ch;
            }
        }
        return cur;
    }
}`,
      },
    ],
  },
];

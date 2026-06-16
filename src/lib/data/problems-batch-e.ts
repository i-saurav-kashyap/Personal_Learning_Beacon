import type { Problem } from "@/lib/types";

// Batch E — remaining MAANG-100 coverage (Arrays / Strings / Greedy / Intervals / Math).

export const PROBLEMS_BATCH_E: Problem[] = [
  {
    slug: "encode-and-decode-strings",
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Strings", "Design"],
    companies: ["google", "amazon", "meta"],
    sheets: ["neetcode150", "blind75"],
    frequency: 3,
    statement:
      "Design an algorithm to encode a list of strings into a single string, and decode that single string back into the original list. Strings may contain any characters (including digits and delimiters).",
    beginnerExplanation:
      "You can't just glue the strings together with a comma — the strings themselves might contain commas. The robust trick is length-prefixing: before each string write its length and a marker like `#`. To decode, read the number, skip the `#`, then grab exactly that many characters.",
    realWorldAnalogy:
      "Like shipping boxes in one truck: you tape a label on each box saying 'next 7 items belong together'. The reader trusts the count, not where one box visually ends — so even a box full of tape and labels is unpacked correctly.",
    visualExplanation:
      'strs = ["abc", "de#f"]\nencode → "3#abc4#de#f"\ndecode → read 3 → "abc"; read 4 → "de#f"',
    approaches: [
      {
        title: "Delimiter join (broken)",
        tier: "Brute Force",
        idea: "Join with a separator character — fails when the data contains that separator.",
        steps: ["Join with some char", "Split on it", "Breaks on collisions"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Length-prefix encoding",
        tier: "Optimal",
        idea: "Prefix each string with its length and a delimiter so decoding never guesses boundaries.",
        steps: [
          "For each string append `len + '#' + s`",
          "To decode, read digits until '#', parse the length",
          "Slice exactly that many chars, advance, repeat",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      's = "5#hello3#abc"\ni=0 read "5" → len 5 → "hello", i jumps to 7\nread "3" → "abc" → ["hello","abc"]',
    interviewTips: [
      "Name the failure of naive delimiters first — it shows you spotted the edge case.",
      "Length-prefixing is delimiter-agnostic; it works for any character set including Unicode.",
    ],
    commonMistakes: [
      "Using a separator that can appear in the data.",
      "Off-by-one when slicing after the '#'.",
    ],
    followUps: [
      "What if lengths can be huge? (delimiter still works since you read until '#').",
      "How would you stream-decode without loading the whole string?",
    ],
    related: ["group-anagrams"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def encode(strs):
    out = []
    for s in strs:
        out.append(str(len(s)) + "#" + s)
    return "".join(out)


def decode(s):
    res, i = [], 0
    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        res.append(s[j + 1:j + 1 + length])
        i = j + 1 + length
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) sb.append(s.length()).append('#').append(s);
        return sb.toString();
    }

    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            int j = i;
            while (s.charAt(j) != '#') j++;
            int len = Integer.parseInt(s.substring(i, j));
            res.add(s.substring(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function encode(strs) {
  let out = "";
  for (const s of strs) out += s.length + "#" + s;
  return out;
}

function decode(s) {
  const res = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== "#") j++;
    const len = parseInt(s.slice(i, j), 10);
    res.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String encode(List<String> strs) {
        String out = '';
        for (String s : strs) out += String.valueOf(s.length()) + '#' + s;
        return out;
    }

    public static List<String> decode(String s) {
        List<String> res = new List<String>();
        Integer i = 0;
        while (i < s.length()) {
            Integer j = i;
            while (s.substring(j, j + 1) != '#') j++;
            Integer len = Integer.valueOf(s.substring(i, j));
            res.add(s.substring(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    patterns: ["dynamic-programming", "two-pointers"],
    topics: ["Strings"],
    companies: ["amazon", "meta", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given a string `s`, return the number of palindromic substrings in it. A substring is palindromic if it reads the same forwards and backwards; substrings at different positions count separately.",
    beginnerExplanation:
      "Every palindrome has a center. Walk each possible center and expand outward while the characters match — each successful expansion is one more palindrome. There are two kinds of centers: a single character (odd length) and a gap between two characters (even length).",
    realWorldAnalogy:
      "Stand in a hallway of mirrored tiles and step outward in both directions. As long as the tile on your left matches the tile on your right, you're still inside a symmetric stretch — count each matching step.",
    visualExplanation:
      's = "aaa"\ncenters: a|a|a and the gaps\n"a"(x3), "aa"(x2), "aaa"(x1) → 6 palindromes',
    approaches: [
      {
        title: "Check every substring",
        tier: "Brute Force",
        idea: "Enumerate all substrings, test each for being a palindrome.",
        steps: ["For each (i,j)", "Verify palindrome in O(n)", "Count"],
        time: "O(n³)",
        space: "O(1)",
      },
      {
        title: "Expand around center",
        tier: "Optimal",
        idea: "Each of the 2n−1 centers expands while characters mirror; total work is O(n²).",
        steps: [
          "Loop over 2n−1 centers (odd and even)",
          "Expand left/right while s[l]==s[r]",
          "Count one palindrome per successful expansion",
        ],
        time: "O(n²)",
        space: "O(1)",
      },
    ],
    dryRun:
      's = "abc"\ncenter a → "a" (1)\ncenter b → "b" (1)\ncenter c → "c" (1)\neven centers: no match → total 3',
    interviewTips: [
      "Mention the 2n−1 centers explicitly — it's the insight that beats the cubic brute force.",
      "The same expand-around-center idea solves Longest Palindromic Substring.",
    ],
    commonMistakes: [
      "Forgetting even-length centers (the gap between two chars).",
      "Re-checking known palindromes instead of expanding once.",
    ],
    followUps: [
      "Return the longest palindromic substring instead of the count.",
      "Manacher's algorithm for O(n).",
    ],
    related: ["longest-palindromic-substring"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_substrings(s):
    n = len(s)
    count = 0
    for center in range(2 * n - 1):
        l = center // 2
        r = l + center % 2
        while l >= 0 and r < n and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countSubstrings(String s) {
        int n = s.length(), count = 0;
        for (int center = 0; center < 2 * n - 1; center++) {
            int l = center / 2, r = l + center % 2;
            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
                count++;
                l--;
                r++;
            }
        }
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countSubstrings(s) {
  const n = s.length;
  let count = 0;
  for (let center = 0; center < 2 * n - 1; center++) {
    let l = Math.floor(center / 2);
    let r = l + (center % 2);
    while (l >= 0 && r < n && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countSubstrings(String s) {
        Integer n = s.length(), count = 0;
        for (Integer center = 0; center < 2 * n - 1; center++) {
            Integer l = center / 2;
            Integer r = l + Math.mod(center, 2);
            while (l >= 0 && r < n && s.substring(l, l + 1) == s.substring(r, r + 1)) {
                count++;
                l--;
                r++;
            }
        }
        return count;
    }
}`,
      },
    ],
  },
  {
    slug: "gas-station",
    title: "Gas Station",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Arrays", "Greedy"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "There are `n` gas stations in a circle. `gas[i]` is the fuel at station i and `cost[i]` is the fuel needed to travel from i to i+1. Return the starting index from which you can complete the circuit once, or -1 if impossible. The answer is guaranteed unique when it exists.",
    beginnerExplanation:
      "If the total gas is at least the total cost, a solution exists. To find the start: drive forward tracking your tank; the moment it goes negative, no station up to here can be the start, so jump the start to the next station and reset the tank.",
    realWorldAnalogy:
      "A road trip on a loop: if you ever run dry between two towns, none of the towns behind you could have made it either (they'd arrive with even less). So you restart your plan from the next town.",
    visualExplanation:
      "gas=[1,2,3,4,5] cost=[3,4,5,1,2]\ntank dips negative through index 2 → start=3\nfrom 3: 4-1=3, +5-2=6, ... completes → 3",
    approaches: [
      {
        title: "Try every start",
        tier: "Brute Force",
        idea: "Simulate a full loop from each possible starting station.",
        steps: ["For each start", "Simulate n steps", "Return first that survives"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Single greedy pass",
        tier: "Optimal",
        idea: "Total feasibility check + reset start whenever the running tank goes negative.",
        steps: [
          "If sum(gas) < sum(cost) → -1",
          "Track tank += gas[i]-cost[i]",
          "When tank < 0, set start=i+1 and tank=0",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "gas=[2,3,4] cost=[3,4,3]\nsum gas 9 >= sum cost 10? no (9<10) → -1",
    interviewTips: [
      "Lead with the total-sum feasibility argument — it justifies why the greedy reset is correct.",
      "Emphasise the key lemma: if you fail reaching j from i, every station between i and j also fails as a start.",
    ],
    commonMistakes: [
      "Returning the wrong index after reset (use i+1, not i).",
      "Skipping the total-sum check and mis-handling the -1 case.",
    ],
    followUps: ["What if you may refill partially?", "Prove the greedy correctness formally."],
    related: ["jump-game"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    tank = 0
    start = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            tank = 0
            start = i + 1
    return start`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
        }
        if (totalGas < totalCost) return -1;
        int tank = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            tank += gas[i] - cost[i];
            if (tank < 0) {
                tank = 0;
                start = i + 1;
            }
        }
        return start;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function canCompleteCircuit(gas, cost) {
  let total = 0;
  for (let i = 0; i < gas.length; i++) total += gas[i] - cost[i];
  if (total < 0) return -1;
  let tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    tank += gas[i] - cost[i];
    if (tank < 0) {
      tank = 0;
      start = i + 1;
    }
  }
  return start;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer canCompleteCircuit(List<Integer> gas, List<Integer> cost) {
        Integer total = 0;
        for (Integer i = 0; i < gas.size(); i++) total += gas[i] - cost[i];
        if (total < 0) return -1;
        Integer tank = 0, start = 0;
        for (Integer i = 0; i < gas.size(); i++) {
            tank += gas[i] - cost[i];
            if (tank < 0) {
                tank = 0;
                start = i + 1;
            }
        }
        return start;
    }
}`,
      },
    ],
  },
  {
    slug: "hand-of-straights",
    title: "Hand of Straights",
    difficulty: "Medium",
    patterns: ["greedy", "heap"],
    topics: ["Arrays", "Greedy", "Hashing"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given an integer array `hand` and an integer `groupSize`, determine whether the cards can be rearranged into groups, each of `groupSize` consecutive cards. Return true if possible.",
    beginnerExplanation:
      "Always start a group from the smallest available card — it can only ever be a group's lowest card. Count how many of it remain, then require that many of the next groupSize−1 consecutive cards too. Consume them and repeat with the next smallest.",
    realWorldAnalogy:
      "Dealing runs in a card game: the lowest card in your hand has to begin a run, so you immediately reach for the next cards in sequence. If any is missing, the hand can't be split into clean runs.",
    visualExplanation:
      "hand=[1,2,3,6,2,3,4,7,8] size=3\nstart 1 → use 1,2,3\nstart 2 → use 2,3,4\nstart 6 → use 6,7,8 → true",
    approaches: [
      {
        title: "Count + start from smallest",
        tier: "Optimal",
        idea: "Use a frequency map; greedily form groups beginning at the current minimum key.",
        steps: [
          "If n % groupSize != 0 → false",
          "Count occurrences; iterate keys in sorted order",
          "For a key with count c, subtract c from key..key+groupSize-1 (fail if any is short)",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "hand=[1,2,3,4] size=3 → 4 % 3 != 0 → false",
    interviewTips: [
      "This is the same shape as 'Divide Array in Sets of K Consecutive Numbers'.",
      "A min-heap or a TreeMap both give the sorted-by-smallest access you need.",
    ],
    commonMistakes: [
      "Forgetting the divisibility check.",
      "Not consuming exactly `count[start]` copies of each consecutive card.",
    ],
    followUps: ["Return the actual groups.", "What if cards can wrap around?"],
    related: ["task-scheduler"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_n_straight_hand(hand, group_size):
    if len(hand) % group_size != 0:
        return False
    from collections import Counter
    count = Counter(hand)
    for start in sorted(count):
        c = count[start]
        if c > 0:
            for num in range(start, start + group_size):
                if count[num] < c:
                    return False
                count[num] -= c
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;
        TreeMap<Integer, Integer> count = new TreeMap<>();
        for (int n : hand) count.put(n, count.getOrDefault(n, 0) + 1);
        while (!count.isEmpty()) {
            int first = count.firstKey();
            int c = count.get(first);
            for (int num = first; num < first + groupSize; num++) {
                Integer cur = count.get(num);
                if (cur == null || cur < c) return false;
                if (cur == c) count.remove(num);
                else count.put(num, cur - c);
            }
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map();
  for (const n of hand) count.set(n, (count.get(n) || 0) + 1);
  const keys = [...count.keys()].sort((a, b) => a - b);
  for (const start of keys) {
    const c = count.get(start);
    if (c > 0) {
      for (let num = start; num < start + groupSize; num++) {
        if ((count.get(num) || 0) < c) return false;
        count.set(num, count.get(num) - c);
      }
    }
  }
  return true;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isNStraightHand(List<Integer> hand, Integer groupSize) {
        if (Math.mod(hand.size(), groupSize) != 0) return false;
        Map<Integer, Integer> count = new Map<Integer, Integer>();
        for (Integer n : hand) count.put(n, (count.containsKey(n) ? count.get(n) : 0) + 1);
        List<Integer> keys = new List<Integer>(count.keySet());
        keys.sort();
        for (Integer start : keys) {
            Integer c = count.get(start);
            if (c > 0) {
                for (Integer num = start; num < start + groupSize; num++) {
                    Integer cur = count.containsKey(num) ? count.get(num) : 0;
                    if (cur < c) return false;
                    count.put(num, cur - c);
                }
            }
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "merge-triplets-to-form-target-triplet",
    title: "Merge Triplets to Form Target Triplet",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Arrays", "Greedy"],
    companies: ["google"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "You have a list of triplets. A merge takes two triplets and replaces them with the element-wise maximum. Return true if you can obtain the `target` triplet by merging some subset of triplets.",
    beginnerExplanation:
      "Merging only ever takes the max of each position, so any triplet with a value larger than the target in any position is poison — it would overshoot. Among the safe triplets, you just need each target position to be matched exactly by at least one of them.",
    realWorldAnalogy:
      "Mixing the strongest reading on each dial from several gauges. Ignore any gauge that reads too high anywhere (it would push a dial past target); from the rest, make sure each dial's exact target is achievable.",
    visualExplanation:
      "target=[2,7,5]\nkeep triplets with all values <= target\nneed a kept triplet hitting 2, one hitting 7, one hitting 5",
    approaches: [
      {
        title: "Filter then match positions",
        tier: "Optimal",
        idea: "Discard triplets exceeding the target anywhere; track which target positions get matched exactly.",
        steps: [
          "For each triplet, skip if any value > target at that index",
          "Else mark positions where value == target",
          "Return true iff all three positions were matched",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "target=[2,7,5]; triplet [2,5,3] ok→matches idx0; [1,7,5] ok→matches idx1,idx2 → all 3 matched → true",
    interviewTips: [
      "The crux is realising 'exceeds target anywhere' makes a triplet unusable — state it early.",
      "You never need to actually perform merges; you only check achievability per position.",
    ],
    commonMistakes: [
      "Counting a position match from a triplet that exceeds target elsewhere.",
      "Requiring one triplet to match all three (a different, stricter problem).",
    ],
    followUps: ["What if merge took the min instead of max?", "Return one valid subset of merges."],
    related: ["gas-station"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def merge_triplets(triplets, target):
    good = set()
    for t in triplets:
        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:
            continue
        for i in range(3):
            if t[i] == target[i]:
                good.add(i)
    return len(good) == 3`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        boolean[] good = new boolean[3];
        for (int[] t : triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
            for (int i = 0; i < 3; i++) if (t[i] == target[i]) good[i] = true;
        }
        return good[0] && good[1] && good[2];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function mergeTriplets(triplets, target) {
  const good = new Set();
  for (const t of triplets) {
    if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
    for (let i = 0; i < 3; i++) if (t[i] === target[i]) good.add(i);
  }
  return good.size === 3;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean mergeTriplets(List<List<Integer>> triplets, List<Integer> target) {
        Set<Integer> good = new Set<Integer>();
        for (List<Integer> t : triplets) {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
            for (Integer i = 0; i < 3; i++) if (t[i] == target[i]) good.add(i);
        }
        return good.size() == 3;
    }
}`,
      },
    ],
  },
  {
    slug: "partition-labels",
    title: "Partition Labels",
    difficulty: "Medium",
    patterns: ["greedy", "two-pointers"],
    topics: ["Strings", "Greedy", "Hashing"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Partition string `s` into as many parts as possible so that each letter appears in at most one part. Return a list of the part sizes (left to right).",
    beginnerExplanation:
      "First record the last index each letter appears. Then sweep left to right, extending the current part's end to the farthest last-occurrence you've seen. When your index reaches that end, the part is sealed — nothing inside reaches beyond it.",
    realWorldAnalogy:
      "Assigning seats so no group is split: you keep stretching the current section until you've covered the last seat of everyone currently in it, then you cut a clean boundary.",
    visualExplanation:
      's="abacd" last={a:2,b:1,c:3,d:4}\ni0 end=2; i1 end=2; i2==end → part "aba"(3)\nthen "cd"(2) → [3,2]',
    approaches: [
      {
        title: "Last-occurrence + greedy sweep",
        tier: "Optimal",
        idea: "Track the farthest last index of chars in the current window; cut when the index meets it.",
        steps: [
          "Record last[c] for every char",
          "Sweep i, end = max(end, last[s[i]])",
          "When i == end, emit (end-start+1) and move start",
        ],
        time: "O(n)",
        space: "O(1) (fixed alphabet)",
      },
    ],
    dryRun:
      's="eccbe" last={e:4,c:2,b:3}\ni0 end=4 ... i4==end → one part of size 5 → [5]',
    interviewTips: [
      "This is interval-merging in disguise: each letter spans [first,last]; you merge overlaps.",
      "The last-occurrence map is the whole trick — compute it up front.",
    ],
    commonMistakes: [
      "Using first occurrence instead of last.",
      "Resetting `end` incorrectly after sealing a part.",
    ],
    followUps: ["Return the substrings, not just sizes.", "Minimise parts instead of maximise."],
    related: ["merge-intervals"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def partition_labels(s):
    last = {c: i for i, c in enumerate(s)}
    res = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
        List<Integer> res = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                res.add(end - start + 1);
                start = i + 1;
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const res = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> partitionLabels(String s) {
        Map<String, Integer> last = new Map<String, Integer>();
        for (Integer i = 0; i < s.length(); i++) last.put(s.substring(i, i + 1), i);
        List<Integer> res = new List<Integer>();
        Integer start = 0, end = 0;
        for (Integer i = 0; i < s.length(); i++) {
            end = Math.max(end, last.get(s.substring(i, i + 1)));
            if (i == end) {
                res.add(end - start + 1);
                start = i + 1;
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Arrays", "Greedy", "Dynamic Programming"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given a 0-indexed array `nums` where `nums[i]` is the maximum jump length from index i, return the minimum number of jumps to reach the last index. You can always reach the last index.",
    beginnerExplanation:
      "Think in levels, like BFS. From the current reachable window, compute the farthest you could land. When you reach the end of the current window, you've spent one jump and you advance the window to that farthest point.",
    realWorldAnalogy:
      "Crossing a river on lily pads in the fewest hops: from the pads you can currently reach, you note the farthest pad reachable, then commit one hop to that whole new range.",
    visualExplanation:
      "nums=[2,3,1,1,4]\nwindow [0]: farthest=2 → jump1, window ends at 2\nwithin: farthest=4 → jump2 reaches end → 2",
    approaches: [
      {
        title: "DP min-jumps",
        tier: "Brute Force",
        idea: "dp[i] = min jumps to reach i; fill from reachable predecessors.",
        steps: ["dp[0]=0", "For each i, relax all reachable j", "Return dp[n-1]"],
        time: "O(n²)",
        space: "O(n)",
      },
      {
        title: "Greedy BFS levels",
        tier: "Optimal",
        idea: "Track current jump's end and the farthest reachable; bump the jump count at each boundary.",
        steps: [
          "farthest=0, curEnd=0, jumps=0",
          "For i in 0..n-2: farthest=max(farthest, i+nums[i])",
          "When i==curEnd: jumps++, curEnd=farthest",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[2,1]\ni0: farthest=2, i==curEnd0 → jumps=1, curEnd=2 → reaches end → 1",
    interviewTips: [
      "Frame it as implicit BFS over reach-windows — that names the optimal pattern.",
      "Loop only to n−2: landing on the last index needs no further jump.",
    ],
    commonMistakes: [
      "Iterating to n−1 and over-counting a jump.",
      "Updating jumps on every step instead of at window boundaries.",
    ],
    followUps: ["Return the actual jump path.", "Jump Game III with bidirectional jumps."],
    related: ["jump-game"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def jump(nums):
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = farthest;
            }
        }
        return jumps;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer jump(List<Integer> nums) {
        Integer jumps = 0, curEnd = 0, farthest = 0;
        for (Integer i = 0; i < nums.size() - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = farthest;
            }
        }
        return jumps;
    }
}`,
      },
    ],
  },
  {
    slug: "maximal-square",
    title: "Maximal Square",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Matrix"],
    companies: ["amazon", "apple", "google"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given a 2D binary grid of 0s and 1s, find the largest square containing only 1s and return its area.",
    beginnerExplanation:
      "For each cell that's a 1, the biggest square ending there (bottom-right corner) is limited by its top, left, and top-left neighbours. Take the smallest of those three squares and add one. Track the largest side seen; the answer is its square.",
    realWorldAnalogy:
      "Tiling a wall: a tile can only sit flush if the spaces above, to the left, and diagonally up-left are all already filled to the same depth — you're bounded by the weakest neighbour.",
    visualExplanation:
      "grid rows of 1s:\ndp[i][j]=min(up,left,up-left)+1 when grid=1\nlargest side s → area s*s",
    approaches: [
      {
        title: "Check every square",
        tier: "Brute Force",
        idea: "For each cell try growing squares and verify all-ones.",
        steps: ["For each cell", "Expand square size, verify region", "Track max"],
        time: "O((mn)²)",
        space: "O(1)",
      },
      {
        title: "DP on bottom-right corner",
        tier: "Optimal",
        idea: "dp[i][j] = min(top, left, top-left) + 1 for cells that are 1.",
        steps: [
          "Pad dp with a zero row/col",
          "If grid[i-1][j-1]==1: dp[i][j]=min(3 neighbours)+1",
          "Track max side; return side²",
        ],
        time: "O(mn)",
        space: "O(mn)",
      },
    ],
    dryRun:
      "row [1,1] over [1,1]: corner dp = min(1,1,1)+1 = 2 → side 2 → area 4",
    interviewTips: [
      "State the min-of-three recurrence crisply — it's the whole solution.",
      "Mention the O(n) space optimisation keeping just the previous row.",
    ],
    commonMistakes: [
      "Taking max instead of min of the three neighbours.",
      "Returning the side length instead of its square.",
    ],
    followUps: ["O(n) space rolling array.", "Maximal rectangle (harder, uses histograms)."],
    related: ["unique-paths"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def maximal_square(matrix):
    if not matrix or not matrix[0]:
        return 0
    rows, cols = len(matrix), len(matrix[0])
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    best = 0
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            if matrix[i - 1][j - 1] == 1:
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                best = max(best, dp[i][j])
    return best * best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maximalSquare(int[][] matrix) {
        if (matrix.length == 0) return 0;
        int rows = matrix.length, cols = matrix[0].length, best = 0;
        int[][] dp = new int[rows + 1][cols + 1];
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                if (matrix[i - 1][j - 1] == 1) {
                    dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
                    best = Math.max(best, dp[i][j]);
                }
            }
        }
        return best * best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maximalSquare(matrix) {
  if (!matrix.length) return 0;
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === 1) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best * best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maximalSquare(List<List<Integer>> matrix) {
        if (matrix.isEmpty()) return 0;
        Integer rows = matrix.size(), cols = matrix[0].size(), best = 0;
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i <= rows; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= cols; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 1; i <= rows; i++) {
            for (Integer j = 1; j <= cols; j++) {
                if (matrix[i - 1][j - 1] == 1) {
                    Integer m = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
                    dp[i][j] = m;
                    best = Math.max(best, m);
                }
            }
        }
        return best * best;
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Math"],
    companies: ["amazon", "apple", "meta"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes the value to fall outside the 32-bit signed range [-2³¹, 2³¹−1], return 0.",
    beginnerExplanation:
      "Peel digits off the end with %10 and rebuild the number by multiplying by 10 and adding each digit. The only twist is overflow: a reversed value can exceed 32 bits, so check the bound (use a wider 64-bit accumulator, or check before multiplying).",
    realWorldAnalogy:
      "Reading a number off an odometer backwards, digit by digit — but the display only has room for so many digits, so if the reversed value won't fit, you report 0.",
    visualExplanation:
      "x=123\nrev=0 → 3 → 32 → 321\nx=-123 → -321\nx=1534236469 → reversed overflows → 0",
    approaches: [
      {
        title: "Pop and push digits",
        tier: "Optimal",
        idea: "Repeatedly take x%10 and append to the reversed accumulator, guarding the 32-bit range.",
        steps: [
          "Track sign, work on |x|",
          "rev = rev*10 + x%10; x //= 10",
          "If rev exceeds 32-bit signed range → return 0",
        ],
        time: "O(log x)",
        space: "O(1)",
      },
    ],
    dryRun:
      "x=-123\nsign=-1, x=123\nrev: 3, 32, 321 → *sign = -321 → in range → -321",
    interviewTips: [
      "Call out the overflow requirement immediately — it's the entire point of the problem.",
      "In languages without big ints, check `rev > (INT_MAX - digit)/10` before multiplying.",
    ],
    commonMistakes: [
      "Ignoring 32-bit overflow.",
      "Mishandling negative numbers / language-specific truncation of `%`.",
    ],
    followUps: ["Reverse without a wider type (pre-multiplication checks).", "String to Integer (atoi)."],
    related: ["single-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reverse(x):
    sign = -1 if x < 0 else 1
    x = abs(x)
    rev = 0
    while x:
        rev = rev * 10 + x % 10
        x //= 10
    rev *= sign
    if rev < -2 ** 31 or rev > 2 ** 31 - 1:
        return 0
    return rev`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int reverse(int x) {
        long rev = 0;
        while (x != 0) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        if (rev < Integer.MIN_VALUE || rev > Integer.MAX_VALUE) return 0;
        return (int) rev;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reverse(x) {
  const sign = Math.sign(x);
  x = Math.abs(x);
  let rev = 0;
  while (x > 0) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  rev *= sign;
  if (rev < -(2 ** 31) || rev > 2 ** 31 - 1) return 0;
  return rev;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer reverse(Integer x) {
        Long lx = Long.valueOf(x);
        Integer sign = lx < 0 ? -1 : 1;
        lx = Math.abs(lx);
        Long rev = 0L;
        while (lx > 0) {
            rev = rev * 10 + Math.mod(lx, 10);
            lx = lx / 10;
        }
        rev *= sign;
        if (rev < -2147483648L || rev > 2147483647L) return 0;
        return rev.intValue();
    }
}`,
      },
    ],
  },
  {
    slug: "pow-x-n",
    title: "Pow(x, n)",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Math", "Recursion"],
    companies: ["meta", "google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Implement `pow(x, n)`, which computes `x` raised to the integer power `n` (x^n). Handle negative exponents.",
    beginnerExplanation:
      "Multiplying x by itself n times is too slow for large n. Instead use fast (binary) exponentiation: x^n = (x^(n/2))², squaring as you halve the exponent. Each bit of n decides whether to fold the current power into the result.",
    realWorldAnalogy:
      "Doubling your way up: to compute 2^16 you don't multiply 16 times — you square 2→4→16→256… reaching the answer in ~log n steps, like repeatedly folding a paper to gain height fast.",
    visualExplanation:
      "x^13, 13 = 1101b\nresult picks x^1, x^4, x^8 (set bits)\nx, x², x⁴, x⁸ via repeated squaring",
    approaches: [
      {
        title: "Multiply n times",
        tier: "Brute Force",
        idea: "Loop multiplying result by x, n times.",
        steps: ["result=1", "Repeat n times: result*=x"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Binary (fast) exponentiation",
        tier: "Optimal",
        idea: "Square the base and halve the exponent; multiply in the base when the low bit is set.",
        steps: [
          "If n<0: x=1/x, n=-n (use a wider type to negate safely)",
          "While n>0: if n&1 → result*=x; x*=x; n>>=1",
          "Return result",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "x=2,n=10 (1010b)\nbit0=0; sq→4; bit1=1 res=4; sq→16; bit0=0; sq→256; bit1=1 res=4*256=1024",
    interviewTips: [
      "Handle n = INT_MIN carefully — negating it overflows a 32-bit int (widen first).",
      "Recursive and iterative binary exponentiation are both fine; state the O(log n) bound.",
    ],
    commonMistakes: [
      "Overflow when negating n for negative exponents.",
      "Forgetting the n<0 case (reciprocal of the base).",
    ],
    followUps: ["Modular exponentiation (x^n mod m).", "Matrix power for linear recurrences."],
    related: ["reverse-integer"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def my_pow(x, n):
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n:
        if n & 1:
            result *= x
        x *= x
        n >>= 1
    return result`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double result = 1.0;
        while (N > 0) {
            if ((N & 1) == 1) result *= x;
            x *= x;
            N >>= 1;
        }
        return result;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function myPow(x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Double myPow(Double x, Integer n) {
        Long N = Long.valueOf(n);
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        Double result = 1.0;
        while (N > 0) {
            if (Math.mod(N, 2) == 1) result *= x;
            x *= x;
            N = N / 2;
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    slug: "task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    patterns: ["greedy", "heap"],
    topics: ["Arrays", "Greedy", "Hashing"],
    companies: ["amazon", "meta", "google"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Given tasks (each a letter) and an integer `n` cooldown, the same task must be at least `n` intervals apart. Each interval runs one task or is idle. Return the minimum number of intervals to finish all tasks.",
    beginnerExplanation:
      "The most frequent task dictates the schedule. Lay it out with n gaps between its copies, forming (maxCount−1) frames of size (n+1), then fill the gaps with other tasks. The answer is either that framed layout or just the task count when there are enough tasks to leave no idle time.",
    realWorldAnalogy:
      "A chef who must rest n minutes between cooking the same dish slots the most-repeated dish first, spacing it out, then fills the waiting minutes with other dishes — idling only if nothing else is ready.",
    visualExplanation:
      'tasks=["A","A","A","B","B","B"], n=2\nA _ _ A _ _ A → frame size 3, 2 frames + tail\nfill B: A B _ A B _ A B → 8',
    approaches: [
      {
        title: "Greedy formula",
        tier: "Optimal",
        idea: "Frame around the max-frequency task; the result is max(total tasks, framed slots).",
        steps: [
          "Count frequencies; find maxCount and how many tasks share it",
          "frames = (maxCount-1)*(n+1) + (#tasks with maxCount)",
          "Answer = max(len(tasks), frames)",
        ],
        time: "O(T)",
        space: "O(1) (26 letters)",
      },
    ],
    dryRun:
      'tasks=["A","A","A","B","B","B"], n=2\nmaxCount=3, ties=2 (A,B)\nframes=(3-1)*3+2=8; len=6 → max=8',
    interviewTips: [
      "Derive the (maxCount−1)*(n+1)+ties formula on the board — it shows you understand why idles appear.",
      "The max(len(tasks), frames) guard handles the 'plenty of distinct tasks → no idle' case.",
    ],
    commonMistakes: [
      "Forgetting to add the count of tasks tied at the max.",
      "Returning frames without the max(len(tasks), …) guard.",
    ],
    followUps: ["Return an actual valid ordering.", "Solve with a max-heap simulation."],
    related: ["hand-of-straights"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def least_interval(tasks, n):
    from collections import Counter
    counts = Counter(tasks)
    max_count = max(counts.values())
    ties = sum(1 for c in counts.values() if c == max_count)
    return max(len(tasks), (max_count - 1) * (n + 1) + ties)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26];
        for (char t : tasks) counts[t - 'A']++;
        int maxCount = 0;
        for (int c : counts) maxCount = Math.max(maxCount, c);
        int ties = 0;
        for (int c : counts) if (c == maxCount) ties++;
        return Math.max(tasks.length, (maxCount - 1) * (n + 1) + ties);
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function leastInterval(tasks, n) {
  const counts = {};
  for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
  const vals = Object.values(counts);
  const maxCount = Math.max(...vals);
  const ties = vals.filter((c) => c === maxCount).length;
  return Math.max(tasks.length, (maxCount - 1) * (n + 1) + ties);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer leastInterval(List<String> tasks, Integer n) {
        Map<String, Integer> counts = new Map<String, Integer>();
        for (String t : tasks) counts.put(t, (counts.containsKey(t) ? counts.get(t) : 0) + 1);
        Integer maxCount = 0;
        for (Integer c : counts.values()) maxCount = Math.max(maxCount, c);
        Integer ties = 0;
        for (Integer c : counts.values()) if (c == maxCount) ties++;
        return Math.max(tasks.size(), (maxCount - 1) * (n + 1) + ties);
    }
}`,
      },
    ],
  },
  {
    slug: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Houses are arranged in a circle; adjacent houses cannot both be robbed (and the first and last are adjacent). Given the loot per house, return the maximum amount you can rob without alerting the police.",
    beginnerExplanation:
      "The circle adds one constraint: you can't take both the first and last house. So solve the linear House Robber twice — once on houses [0..n−2] and once on [1..n−1] — and take the better result. Handle the single-house case directly.",
    realWorldAnalogy:
      "Picking non-adjacent seats around a round table: because the first and last seats touch, you plan two seatings — one that excludes the first seat, one that excludes the last — and keep whichever earns more.",
    visualExplanation:
      "nums=[2,3,2]\nlinear [2,3] → 3 ; linear [3,2] → 3 ; max = 3",
    approaches: [
      {
        title: "Two linear passes",
        tier: "Optimal",
        idea: "Reduce the circular case to two linear House Robber subproblems and take the max.",
        steps: [
          "If one house, return it",
          "rob_line over [0..n-2] and over [1..n-1]",
          "Each line: rolling prev1/prev2 = max(prev1, prev2+n)",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[1,2,3,1]\nline[1,2,3]→4 ; line[2,3,1]→4 ; max=4",
    interviewTips: [
      "Name the reduction explicitly: circular = max of two linear runs.",
      "Don't forget the n==1 guard, or the [1..n-1] slice will be empty.",
    ],
    commonMistakes: [
      "Running a single linear pass and ignoring the wrap-around adjacency.",
      "Mishandling arrays of length 1.",
    ],
    followUps: ["House Robber III (binary tree).", "Reconstruct which houses were robbed."],
    related: ["house-robber"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rob(nums):
    if len(nums) == 1:
        return nums[0]

    def rob_line(arr):
        prev2 = prev1 = 0
        for n in arr:
            prev2, prev1 = prev1, max(prev1, prev2 + n)
        return prev1

    return max(rob_line(nums[1:]), rob_line(nums[:-1]))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));
    }

    private int robLine(int[] nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int cur = Math.max(prev1, prev2 + nums[i]);
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
  if (nums.length === 1) return nums[0];
  const robLine = (lo, hi) => {
    let prev2 = 0, prev1 = 0;
    for (let i = lo; i <= hi; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  };
  return Math.max(robLine(0, nums.length - 2), robLine(1, nums.length - 1));
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer rob(List<Integer> nums) {
        if (nums.size() == 1) return nums[0];
        return Math.max(robLine(nums, 0, nums.size() - 2), robLine(nums, 1, nums.size() - 1));
    }

    static Integer robLine(List<Integer> nums, Integer lo, Integer hi) {
        Integer prev2 = 0, prev1 = 0;
        for (Integer i = lo; i <= hi; i++) {
            Integer cur = Math.max(prev1, prev2 + nums[i]);
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

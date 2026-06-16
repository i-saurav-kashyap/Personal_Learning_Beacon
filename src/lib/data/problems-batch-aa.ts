import type { Problem } from "@/lib/types";

// Striver A2Z Array & Binary-Search fundamentals — full teaching template,
// beginner-friendly, with correct Java/Python/JavaScript/Apex solutions.
export const PROBLEMS_BATCH_AA: Problem[] = [
  {
    slug: "largest-element-in-array",
    title: "Largest Element in Array",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement: "Given an array `nums`, return the largest element in it.",
    beginnerExplanation:
      "Walk through the array once, keeping a running 'best so far'. Every time you see something bigger, update it. After one pass you've seen everyone, so the best so far is the answer.",
    realWorldAnalogy:
      "Holding auditions: you remember only the strongest performer seen so far and replace them the moment someone better walks in.",
    visualExplanation:
      "nums = [3, 7, 2, 9, 4]\nbest: 3 → 7 → 7 → 9 → 9  → answer 9",
    approaches: [
      {
        title: "Single linear scan",
        tier: "Optimal",
        idea: "Track the maximum while scanning once.",
        steps: ["Start best = nums[0]", "For each x, best = max(best, x)", "Return best"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[2,5,1] → best=2 → 5 → 5 → return 5",
    interviewTips: ["Clarify whether the array can be empty (guard or assume non-empty)."],
    commonMistakes: ["Initialising best to 0 — fails for all-negative arrays; init to nums[0]."],
    followUps: ["Return the index too.", "Find the k largest (→ heap)."],
    related: ["second-largest-element-in-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def largest_element(nums):
    best = nums[0]
    for x in nums:
        if x > best:
            best = x
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int largestElement(int[] nums) {
        int best = nums[0];
        for (int x : nums) if (x > best) best = x;
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function largestElement(nums) {
  let best = nums[0];
  for (const x of nums) if (x > best) best = x;
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer largestElement(List<Integer> nums) {
        Integer best = nums[0];
        for (Integer x : nums) if (x > best) best = x;
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "second-largest-element-in-array",
    title: "Second Largest Element in Array",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array `nums`, return the second largest distinct element, or -1 if it doesn't exist.",
    beginnerExplanation:
      "Keep two running bests: the largest and the second largest. When a new number beats the largest, the old largest slides down into second place. This finds the answer in one pass.",
    realWorldAnalogy:
      "A race where you track gold and silver: when someone overtakes the leader, the old leader drops to silver.",
    visualExplanation:
      "nums=[12,35,1,10,34,1]\nlargest/second: 12/-1 → 35/12 → 35/12 → 35/12 → 35/34 → 35/34 → 34",
    approaches: [
      {
        title: "Sort then scan from the back",
        tier: "Brute Force",
        idea: "Sort and find the first value smaller than the max.",
        steps: ["Sort ascending", "Walk from the end past duplicates of the max"],
        time: "O(n log n)",
        space: "O(1)",
      },
      {
        title: "Two running maxima",
        tier: "Optimal",
        idea: "Track largest and secondLargest in one pass.",
        steps: [
          "largest = second = -∞",
          "If x > largest: second = largest; largest = x",
          "Else if largest > x > second: second = x",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[10,10,9] → largest10 second-∞ → (10 not> 10, not between) → 9 sets second=9 → 9",
    interviewTips: ["Clarify 'second largest' means the second largest *distinct* value, not index."],
    commonMistakes: ["Returning a duplicate of the max as the second largest."],
    followUps: ["Generalise to k-th largest.", "Handle all-equal arrays (return -1)."],
    related: ["largest-element-in-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def second_largest(nums):
    largest = second = float("-inf")
    for x in nums:
        if x > largest:
            second = largest
            largest = x
        elif largest > x > second:
            second = x
    return second if second != float("-inf") else -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int secondLargest(int[] nums) {
        long largest = Long.MIN_VALUE, second = Long.MIN_VALUE;
        for (int x : nums) {
            if (x > largest) { second = largest; largest = x; }
            else if (x < largest && x > second) second = x;
        }
        return second == Long.MIN_VALUE ? -1 : (int) second;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function secondLargest(nums) {
  let largest = -Infinity, second = -Infinity;
  for (const x of nums) {
    if (x > largest) { second = largest; largest = x; }
    else if (x < largest && x > second) second = x;
  }
  return second === -Infinity ? -1 : second;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer secondLargest(List<Integer> nums) {
        Integer largest = null, second = null;
        for (Integer x : nums) {
            if (largest == null || x > largest) { second = largest; largest = x; }
            else if (x < largest && (second == null || x > second)) second = x;
        }
        return second == null ? -1 : second;
    }
}`,
      },
    ],
  },
  {
    slug: "check-if-array-is-sorted-and-rotated",
    title: "Check if Array Is Sorted and Rotated",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Return true if `nums` was originally sorted in non-decreasing order and then rotated some number of positions (possibly zero).",
    beginnerExplanation:
      "A sorted-then-rotated array has at most ONE place where a bigger number is immediately followed by a smaller one (the 'wrap' point). Count those drops across the array treated as circular; if there's more than one, it can't be a rotation of a sorted array.",
    realWorldAnalogy:
      "A clock face read starting from any hour is still 'in order' — it only ever wraps once, from 12 back to 1.",
    visualExplanation:
      "[3,4,5,1,2] drops: 5→1 (1 drop, circular 2→3 ok) → true\n[2,1,3,4] drops: 2→1 and 4→2 (2 drops) → false",
    approaches: [
      {
        title: "Count circular drops",
        tier: "Optimal",
        idea: "Count indices where nums[i] > nums[(i+1) % n]; valid iff ≤ 1.",
        steps: ["For i in 0..n-1, compare nums[i] with nums[(i+1)%n]", "Count drops", "Return drops ≤ 1"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[1,2,3] drops=0 → true. [1,3,2] drops: 3→2 and 2→1(circular)=2 → false",
    interviewTips: ["The circular comparison (i+1)%n elegantly handles the wrap in one loop."],
    commonMistakes: ["Forgetting the circular comparison between the last and first element."],
    followUps: ["Allow strictly increasing only.", "Find the rotation count."],
    related: ["number-of-times-sorted-array-is-rotated"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def check(nums):
    n = len(nums)
    drops = sum(1 for i in range(n) if nums[i] > nums[(i + 1) % n])
    return drops <= 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean check(int[] nums) {
        int n = nums.length, drops = 0;
        for (int i = 0; i < n; i++) if (nums[i] > nums[(i + 1) % n]) drops++;
        return drops <= 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function check(nums) {
  const n = nums.length;
  let drops = 0;
  for (let i = 0; i < n; i++) if (nums[i] > nums[(i + 1) % n]) drops++;
  return drops <= 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean check(List<Integer> nums) {
        Integer n = nums.size(), drops = 0;
        for (Integer i = 0; i < n; i++) if (nums[i] > nums[Math.mod(i + 1, n)]) drops++;
        return drops <= 1;
    }
}`,
      },
    ],
  },
  {
    slug: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Two Pointers"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a sorted array `nums`, remove duplicates in place so each unique value appears once, and return the count `k` of unique elements (the first k slots must hold them in order).",
    beginnerExplanation:
      "Because it's sorted, duplicates are neighbours. Keep a slow pointer marking the last unique slot; move a fast pointer ahead, and whenever it finds a new value, place it right after the slow pointer.",
    realWorldAnalogy:
      "Stacking only one of each book from an already-alphabetised pile: you flip past identical copies and shelve a new title only when the author/name changes.",
    visualExplanation:
      "nums=[1,1,2,3,3]\nslow=0; fast finds 2 → nums[1]=2 slow=1; finds 3 → nums[2]=3 slow=2 → k=3 → [1,2,3,...]",
    approaches: [
      {
        title: "Slow/fast two pointers",
        tier: "Optimal",
        idea: "slow marks the last unique; copy forward only when fast sees a new value.",
        steps: ["slow = 0", "For fast 1..n-1: if nums[fast] != nums[slow]: slow++; nums[slow]=nums[fast]", "Return slow+1"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[0,0,1] slow0 → fast2 val1≠0 → slow1 nums[1]=1 → k=2",
    interviewTips: ["Stress it's in-place O(1) extra space — the interviewer is testing that."],
    commonMistakes: ["Comparing nums[fast] with nums[fast-1] without maintaining the write pointer."],
    followUps: ["Allow each value at most twice (Remove Duplicates II)."],
    related: ["move-zeroes-to-end"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) nums[++slow] = nums[fast];
        }
        return slow + 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast];
  }
  return slow + 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer removeDuplicates(List<Integer> nums) {
        if (nums.isEmpty()) return 0;
        Integer slow = 0;
        for (Integer fast = 1; fast < nums.size(); fast++) {
            if (nums[fast] != nums[slow]) { slow++; nums[slow] = nums[fast]; }
        }
        return slow + 1;
    }
}`,
      },
    ],
  },
  {
    slug: "rotate-array-by-k-places",
    title: "Rotate Array by K Places",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Rotate the array `nums` to the right by `k` steps, in place, where k may be larger than the array length.",
    beginnerExplanation:
      "The clean O(1)-space trick is three reversals: reverse the whole array, then reverse the first k and the rest separately. After taking k modulo n, those three flips land every element in its rotated spot.",
    realWorldAnalogy:
      "Cutting a deck of cards: flip the whole deck, then flip each of the two chunks — the bottom cards end up on top in order.",
    visualExplanation:
      "nums=[1,2,3,4,5] k=2 → reverse all [5,4,3,2,1] → reverse first2 [4,5,3,2,1] → reverse rest [4,5,1,2,3]",
    approaches: [
      {
        title: "Extra array",
        tier: "Brute Force",
        idea: "Place each element at (i+k)%n in a copy.",
        steps: ["new[(i+k)%n] = nums[i]", "Copy back"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Three reversals",
        tier: "Optimal",
        idea: "k %= n; reverse(0,n-1), reverse(0,k-1), reverse(k,n-1).",
        steps: ["k = k % n", "Reverse whole array", "Reverse first k", "Reverse remaining n-k"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "n=3 k=4 → k=1; [1,2,3]→rev all[3,2,1]→rev first1[3,2,1]→rev rest[3,1,2]",
    interviewTips: ["Always take k %= n first, or large k breaks the reversals."],
    commonMistakes: ["Forgetting k %= n.", "Off-by-one in the sub-range reversal bounds."],
    followUps: ["Rotate left by k.", "Do it with cyclic replacements instead of reversals."],
    related: ["remove-duplicates-from-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rotate(nums, k):
    n = len(nums)
    k %= n
    def rev(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            r -= 1
    rev(0, n - 1)
    rev(0, k - 1)
    rev(k, n - 1)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
    private void reverse(int[] a, int l, int r) {
        while (l < r) { int t = a[l]; a[l++] = a[r]; a[r--] = t; }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rotate(nums, k) {
  const n = nums.length;
  k %= n;
  const rev = (l, r) => { while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; } };
  rev(0, n - 1); rev(0, k - 1); rev(k, n - 1);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void rotate(List<Integer> nums, Integer k) {
        Integer n = nums.size();
        k = Math.mod(k, n);
        rev(nums, 0, n - 1);
        rev(nums, 0, k - 1);
        rev(nums, k, n - 1);
    }
    static void rev(List<Integer> a, Integer l, Integer r) {
        while (l < r) { Integer t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
    }
}`,
      },
    ],
  },
  {
    slug: "move-zeroes-to-end",
    title: "Move Zeroes to End",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Two Pointers"],
    companies: ["amazon", "meta", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Move all 0's in `nums` to the end while keeping the relative order of the non-zero elements, in place.",
    beginnerExplanation:
      "Keep a write pointer for the next non-zero slot. Scan the array; every non-zero value gets written at the write pointer, which then advances. Finally, fill the remaining slots with zeroes.",
    realWorldAnalogy:
      "Tidying a shelf: slide every real book to the left, leaving the empty gaps to collect on the right.",
    visualExplanation:
      "nums=[0,1,0,3,12]\nwrite=0: 1→nums[0], 3→nums[1], 12→nums[2] → fill rest with 0 → [1,3,12,0,0]",
    approaches: [
      {
        title: "Write pointer for non-zeros",
        tier: "Optimal",
        idea: "Compact non-zeros to the front, then zero-fill the tail (or swap as you go).",
        steps: ["write=0", "For x in nums: if x!=0: nums[write++]=x", "Fill nums[write..] with 0"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[0,1,0,2] write0 →1 at0 write1 →2 at1 write2 → fill[2..]=0 → [1,2,0,0]",
    interviewTips: ["The swap variant keeps it to a single pass with no separate fill loop."],
    commonMistakes: ["Breaking the relative order of non-zero elements."],
    followUps: ["Move zeroes to the front instead.", "Minimise the number of writes (swap only when needed)."],
    related: ["remove-duplicates-from-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def move_zeroes(nums):
    write = 0
    for x in nums:
        if x != 0:
            nums[write] = x
            write += 1
    for i in range(write, len(nums)):
        nums[i] = 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int x : nums) if (x != 0) nums[write++] = x;
        while (write < nums.length) nums[write++] = 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function moveZeroes(nums) {
  let write = 0;
  for (const x of nums) if (x !== 0) nums[write++] = x;
  while (write < nums.length) nums[write++] = 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void moveZeroes(List<Integer> nums) {
        Integer write = 0;
        for (Integer x : nums) if (x != 0) { nums[write] = x; write++; }
        while (write < nums.size()) { nums[write] = 0; write++; }
    }
}`,
      },
    ],
  },
  {
    slug: "linear-search",
    title: "Linear Search",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement: "Given an array `nums` and a `target`, return the index of the first occurrence of target, or -1.",
    beginnerExplanation:
      "Check each element from left to right; return the moment you find the target. If you reach the end without finding it, it isn't there. This is the baseline every faster search is compared against.",
    realWorldAnalogy:
      "Flipping through an unsorted stack of papers one by one until you spot the page you need.",
    visualExplanation: "nums=[4,2,7,1] target=7 → i0 4≠ → i1 2≠ → i2 7== → return 2",
    approaches: [
      {
        title: "Scan left to right",
        tier: "Optimal",
        idea: "Compare each element to the target; return its index.",
        steps: ["For i in 0..n-1: if nums[i]==target return i", "Return -1"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[5,6] target=9 → 5≠ 6≠ → -1",
    interviewTips: ["Works on unsorted data; if it's sorted, binary search is O(log n)."],
    commonMistakes: ["Returning a boolean when the index is asked for (or vice versa)."],
    followUps: ["Return all indices of the target.", "If sorted, switch to binary search."],
    related: ["binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def linear_search(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) if (nums[i] == target) return i;
        return -1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function linearSearch(nums, target) {
  for (let i = 0; i < nums.length; i++) if (nums[i] === target) return i;
  return -1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer search(List<Integer> nums, Integer target) {
        for (Integer i = 0; i < nums.size(); i++) if (nums[i] == target) return i;
        return -1;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-consecutive-ones",
    title: "Maximum Consecutive Ones",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement: "Given a binary array `nums`, return the maximum number of consecutive 1's.",
    beginnerExplanation:
      "Keep a running streak of consecutive 1's. Each 1 grows the streak; each 0 resets it to zero. Track the longest streak you ever reach.",
    realWorldAnalogy:
      "Counting your longest run of consecutive days at the gym — one missed day resets the current streak, but your record stays.",
    visualExplanation:
      "nums=[1,1,0,1,1,1]\ncur: 1,2,0,1,2,3  best: 1,2,2,2,2,3 → 3",
    approaches: [
      {
        title: "Running streak",
        tier: "Optimal",
        idea: "Increment on 1, reset on 0, track the max.",
        steps: ["cur=0,best=0", "For x: x==1 → cur++ else cur=0", "best=max(best,cur)"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[0,1,1] cur0 best0 → 0 reset → 1 best1 → 2 best2 → 2",
    interviewTips: ["The follow-up (flip at most k zeros) becomes a sliding-window problem."],
    commonMistakes: ["Forgetting to reset the current streak on a 0."],
    followUps: ["Max consecutive ones if you may flip at most one (or k) zero(s)."],
    related: ["longest-repeating-character-replacement"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_max_consecutive_ones(nums):
    cur = best = 0
    for x in nums:
        cur = cur + 1 if x == 1 else 0
        best = max(best, cur)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int cur = 0, best = 0;
        for (int x : nums) { cur = x == 1 ? cur + 1 : 0; best = Math.max(best, cur); }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findMaxConsecutiveOnes(nums) {
  let cur = 0, best = 0;
  for (const x of nums) { cur = x === 1 ? cur + 1 : 0; best = Math.max(best, cur); }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findMaxConsecutiveOnes(List<Integer> nums) {
        Integer cur = 0, best = 0;
        for (Integer x : nums) { cur = x == 1 ? cur + 1 : 0; best = Math.max(best, cur); }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "lower-bound",
    title: "Lower Bound",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["microsoft", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "In a sorted array `nums`, find the lower bound of `x`: the index of the first element that is ≥ x (or n if none).",
    beginnerExplanation:
      "It's binary search, but instead of stopping at an exact match you keep hunting leftward for the FIRST element not smaller than x. When nums[mid] ≥ x, that mid is a candidate — record it and search the left half for an even earlier one.",
    realWorldAnalogy:
      "Finding where a new book of a given height should slot into a shelf sorted by height — the first spot tall enough to hold it.",
    visualExplanation:
      "nums=[1,2,2,3], x=2 → first index with value≥2 is 1 → lower bound = 1",
    approaches: [
      {
        title: "Binary search for first ≥ x",
        tier: "Optimal",
        idea: "Track an answer index; on nums[mid] ≥ x move left, else move right.",
        steps: ["lo=0,hi=n-1,ans=n", "mid: if nums[mid]>=x: ans=mid; hi=mid-1 else lo=mid+1", "Return ans"],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[1,3,5] x=4 → mid1 3<4 lo2 → mid2 5>=4 ans2 hi1 → return 2",
    interviewTips: ["Lower bound = count of elements strictly less than x — handy for insert positions."],
    commonMistakes: ["Returning -1 instead of n when every element is < x."],
    followUps: ["Upper bound (first > x).", "Use it to build floor/ceil and search-insert."],
    related: ["upper-bound", "search-insert-position"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def lower_bound(nums, x):
    lo, hi, ans = 0, len(nums) - 1, len(nums)
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] >= x:
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
    public int lowerBound(int[] nums, int x) {
        int lo = 0, hi = nums.length - 1, ans = nums.length;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] >= x) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function lowerBound(nums, x) {
  let lo = 0, hi = nums.length - 1, ans = nums.length;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] >= x) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer lowerBound(List<Integer> nums, Integer x) {
        Integer lo = 0, hi = nums.size() - 1, ans = nums.size();
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] >= x) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "upper-bound",
    title: "Upper Bound",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["microsoft", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "In a sorted array `nums`, find the upper bound of `x`: the index of the first element strictly greater than x (or n if none).",
    beginnerExplanation:
      "Same as lower bound but the condition is strictly greater. When nums[mid] > x, mid is a candidate — record it and look left for an earlier one; otherwise go right.",
    realWorldAnalogy:
      "Finding the first person in a height-sorted line who is taller than you — everyone before them is your height or shorter.",
    visualExplanation: "nums=[1,2,2,3], x=2 → first index with value>2 is 3 → upper bound = 3",
    approaches: [
      {
        title: "Binary search for first > x",
        tier: "Optimal",
        idea: "On nums[mid] > x record mid and move left; else move right.",
        steps: ["lo=0,hi=n-1,ans=n", "if nums[mid]>x: ans=mid; hi=mid-1 else lo=mid+1", "Return ans"],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[1,2,2,3] x=2 → mid1 2>2? no lo2 → mid2 2>2? no lo3 → mid3 3>2 ans3 hi2 → 3",
    interviewTips: ["upperBound - lowerBound = number of occurrences of x."],
    commonMistakes: ["Using >= (that's lower bound) instead of strict >."],
    followUps: ["Count occurrences via upper-lower.", "Floor/ceil from these two."],
    related: ["lower-bound", "count-occurrences-in-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def upper_bound(nums, x):
    lo, hi, ans = 0, len(nums) - 1, len(nums)
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] > x:
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
    public int upperBound(int[] nums, int x) {
        int lo = 0, hi = nums.length - 1, ans = nums.length;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > x) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function upperBound(nums, x) {
  let lo = 0, hi = nums.length - 1, ans = nums.length;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > x) { ans = mid; hi = mid - 1; }
    else lo = mid + 1;
  }
  return ans;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer upperBound(List<Integer> nums, Integer x) {
        Integer lo = 0, hi = nums.size() - 1, ans = nums.size();
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] > x) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "floor-and-ceil-in-sorted-array",
    title: "Floor and Ceil in Sorted Array",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "In a sorted array `nums`, return [floor, ceil] of `x`: floor is the largest value ≤ x, ceil is the smallest value ≥ x (use -1 when none exists).",
    beginnerExplanation:
      "Two binary searches. For ceil, find the first element ≥ x. For floor, find the last element ≤ x (when nums[mid] ≤ x, record it and search right for a bigger-but-still-≤ candidate).",
    realWorldAnalogy:
      "Finding the closest staircase steps around your foot — the highest step at or below it (floor) and the lowest step at or above it (ceil).",
    visualExplanation: "nums=[2,4,6,8] x=5 → floor=4 (last ≤5), ceil=6 (first ≥5)",
    approaches: [
      {
        title: "Two boundary binary searches",
        tier: "Optimal",
        idea: "Ceil = first value ≥ x; Floor = last value ≤ x.",
        steps: [
          "Ceil: nums[mid] >= x → record, go left",
          "Floor: nums[mid] <= x → record, go right",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[1,2,8,10] x=5 → floor: last≤5 is 2; ceil: first≥5 is 8 → [2,8]",
    interviewTips: ["Return the VALUES, not indices, unless asked otherwise."],
    commonMistakes: ["Swapping the floor/ceil conditions."],
    followUps: ["Return indices instead of values.", "Handle x present exactly (floor=ceil=x)."],
    related: ["lower-bound", "upper-bound"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def floor_ceil(nums, x):
    floor = ceil = -1
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] <= x:
            floor = nums[mid]
            lo = mid + 1
        else:
            hi = mid - 1
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] >= x:
            ceil = nums[mid]
            hi = mid - 1
        else:
            lo = mid + 1
    return [floor, ceil]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] floorCeil(int[] nums, int x) {
        int floor = -1, ceil = -1, lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] <= x) { floor = nums[mid]; lo = mid + 1; }
            else hi = mid - 1;
        }
        lo = 0; hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] >= x) { ceil = nums[mid]; hi = mid - 1; }
            else lo = mid + 1;
        }
        return new int[] { floor, ceil };
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function floorCeil(nums, x) {
  let floor = -1, ceil = -1, lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] <= x) { floor = nums[mid]; lo = mid + 1; }
    else hi = mid - 1;
  }
  lo = 0; hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] >= x) { ceil = nums[mid]; hi = mid - 1; }
    else lo = mid + 1;
  }
  return [floor, ceil];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> floorCeil(List<Integer> nums, Integer x) {
        Integer floorV = -1, ceilV = -1, lo = 0, hi = nums.size() - 1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] <= x) { floorV = nums[mid]; lo = mid + 1; }
            else hi = mid - 1;
        }
        lo = 0; hi = nums.size() - 1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] >= x) { ceilV = nums[mid]; hi = mid - 1; }
            else lo = mid + 1;
        }
        return new List<Integer>{ floorV, ceilV };
    }
}`,
      },
    ],
  },
  {
    slug: "count-occurrences-in-sorted-array",
    title: "Count Occurrences in Sorted Array",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement: "Given a sorted array `nums` and a target `x`, count how many times x appears, in O(log n).",
    beginnerExplanation:
      "Find the first index of x (lower bound) and the first index after the last x (upper bound). The gap between them is the count. Two binary searches, no linear scan.",
    realWorldAnalogy:
      "In an alphabetised guest list, find where the 'Smith's begin and where they end — the span between is how many Smiths attended.",
    visualExplanation: "nums=[1,2,2,2,3] x=2 → lower=1, upper=4 → count = 4-1 = 3",
    approaches: [
      {
        title: "Upper bound − lower bound",
        tier: "Optimal",
        idea: "count = firstIndexGreater(x) − firstIndexAtLeast(x).",
        steps: ["lb = lower bound of x", "ub = upper bound of x", "Return ub − lb"],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[2,2,2] x=2 → lb=0 ub=3 → 3",
    interviewTips: ["Reuse your lower/upper bound helpers — don't re-derive the search each time."],
    commonMistakes: ["Doing a linear count after finding one occurrence (defeats O(log n))."],
    followUps: ["First and last position (return both indices)."],
    related: ["lower-bound", "upper-bound", "find-first-and-last-position-of-element-in-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_occurrences(nums, x):
    def bound(strict):
        lo, hi, ans = 0, len(nums) - 1, len(nums)
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if nums[mid] > x or (not strict and nums[mid] >= x):
                ans = mid
                hi = mid - 1
            else:
                lo = mid + 1
        return ans
    return bound(True) - bound(False)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countOccurrences(int[] nums, int x) {
        return bound(nums, x, true) - bound(nums, x, false);
    }
    private int bound(int[] nums, int x, boolean strict) {
        int lo = 0, hi = nums.length - 1, ans = nums.length;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > x || (!strict && nums[mid] >= x)) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countOccurrences(nums, x) {
  const bound = (strict) => {
    let lo = 0, hi = nums.length - 1, ans = nums.length;
    while (lo <= hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (nums[mid] > x || (!strict && nums[mid] >= x)) { ans = mid; hi = mid - 1; }
      else lo = mid + 1;
    }
    return ans;
  };
  return bound(true) - bound(false);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countOccurrences(List<Integer> nums, Integer x) {
        return bound(nums, x, true) - bound(nums, x, false);
    }
    static Integer bound(List<Integer> nums, Integer x, Boolean strict) {
        Integer lo = 0, hi = nums.size() - 1, ans = nums.size();
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] > x || (!strict && nums[mid] >= x)) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "number-of-times-sorted-array-is-rotated",
    title: "Number of Times Sorted Array Is Rotated",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "A sorted array of distinct values was rotated some number of times. Return how many times — equivalently, the index of the minimum element.",
    beginnerExplanation:
      "The number of rotations equals the index of the smallest element. Binary search for the minimum: if the left half is properly sorted, its first element is the smallest candidate, so the pivot must be to the right (or be mid itself).",
    realWorldAnalogy:
      "A circular calendar started on some random month — the count is how far the 'January' (the minimum) sits from the front.",
    visualExplanation: "nums=[4,5,6,7,0,1,2] → min is 0 at index 4 → rotated 4 times",
    approaches: [
      {
        title: "Binary search for the minimum",
        tier: "Optimal",
        idea: "Compare nums[mid] with nums[hi] to decide which half holds the pivot.",
        steps: [
          "lo=0,hi=n-1",
          "If nums[mid] > nums[hi]: min is right → lo=mid+1",
          "Else hi=mid; loop until lo==hi",
          "Return lo",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[3,4,5,1,2] lo0 hi4 mid2 5>2 lo3 → mid3 1>2? no hi3 → mid3 lo3==hi3 → 3",
    interviewTips: ["Comparing against nums[hi] (not nums[lo]) avoids an extra edge case."],
    commonMistakes: ["Using lo<=hi with hi=mid causes an infinite loop — use lo<hi and hi=mid."],
    followUps: ["Handle duplicates (worst case O(n))."],
    related: ["find-minimum-in-rotated-sorted-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_rotations(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countRotations(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countRotations(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countRotations(List<Integer> nums) {
        Integer lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      },
    ],
  },
  {
    slug: "row-with-maximum-ones",
    title: "Row with Maximum Ones",
    difficulty: "Easy",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search", "Matrix"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a binary matrix where each row is sorted (all 0's then all 1's), return the index of the row containing the most 1's (smallest index on ties).",
    beginnerExplanation:
      "In each sorted row, the count of 1's is n minus the index of the first 1 — which a binary search (lower bound of 1) finds in O(log n). Track the row with the highest count.",
    realWorldAnalogy:
      "Each row is a row of seats filling up from the right; you peek at where the occupied seats begin to know how full each row is, then pick the fullest.",
    visualExplanation:
      "rows: [0,0,1,1]→2 ones, [0,1,1,1]→3 ones, [0,0,0,1]→1 → row index 1 wins",
    approaches: [
      {
        title: "Lower bound of 1 per row",
        tier: "Optimal",
        idea: "ones(row) = n − lowerBound(row, 1); keep the max.",
        steps: ["For each row, binary-search the first 1", "ones = n − firstOne", "Track best row"],
        time: "O(m log n)",
        space: "O(1)",
      },
    ],
    dryRun: "row [0,0,1,1] firstOne=2 ones=4-2=2; row [0,1,1,1] firstOne=1 ones=3 → best row 1",
    interviewTips: ["A clever O(m+n) staircase walk from the top-right also works — mention it."],
    commonMistakes: ["Counting 1's linearly per row (O(m·n)) when binary search is available."],
    followUps: ["Solve in O(m+n) with the top-right staircase traversal."],
    related: ["lower-bound", "search-a-2d-matrix"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def row_with_max_ones(mat):
    def first_one(row):
        lo, hi, ans = 0, len(row) - 1, len(row)
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if row[mid] >= 1:
                ans = mid
                hi = mid - 1
            else:
                lo = mid + 1
        return ans
    best_row, best_ones = -1, -1
    for i, row in enumerate(mat):
        ones = len(row) - first_one(row)
        if ones > best_ones:
            best_ones, best_row = ones, i
    return best_row`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int rowWithMaxOnes(int[][] mat) {
        int bestRow = -1, bestOnes = -1, n = mat[0].length;
        for (int i = 0; i < mat.length; i++) {
            int ones = n - firstOne(mat[i]);
            if (ones > bestOnes) { bestOnes = ones; bestRow = i; }
        }
        return bestRow;
    }
    private int firstOne(int[] row) {
        int lo = 0, hi = row.length - 1, ans = row.length;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (row[mid] >= 1) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rowWithMaxOnes(mat) {
  const n = mat[0].length;
  const firstOne = (row) => {
    let lo = 0, hi = row.length - 1, ans = row.length;
    while (lo <= hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (row[mid] >= 1) { ans = mid; hi = mid - 1; }
      else lo = mid + 1;
    }
    return ans;
  };
  let bestRow = -1, bestOnes = -1;
  for (let i = 0; i < mat.length; i++) {
    const ones = n - firstOne(mat[i]);
    if (ones > bestOnes) { bestOnes = ones; bestRow = i; }
  }
  return bestRow;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer rowWithMaxOnes(List<List<Integer>> mat) {
        Integer n = mat[0].size(), bestRow = -1, bestOnes = -1;
        for (Integer i = 0; i < mat.size(); i++) {
            Integer ones = n - firstOne(mat[i]);
            if (ones > bestOnes) { bestOnes = ones; bestRow = i; }
        }
        return bestRow;
    }
    static Integer firstOne(List<Integer> row) {
        Integer lo = 0, hi = row.size() - 1, ans = row.size();
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (row[mid] >= 1) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "median-of-row-wise-sorted-matrix",
    title: "Median of Row Wise Sorted Matrix",
    difficulty: "Hard",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search", "Matrix"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an m×n matrix where every row is sorted and m×n is odd, find the overall median without flattening and sorting.",
    beginnerExplanation:
      "Binary search on the VALUE range, not indices. For a candidate value `mid`, count how many elements are ≤ mid (sum of per-row upper bounds). The median is the smallest value with at least (m*n)/2 + 1 elements ≤ it.",
    realWorldAnalogy:
      "Guessing a salary cutoff: pick a number, ask each department how many earn at or below it, total them, and adjust the guess until exactly half the company is below.",
    visualExplanation:
      "Range [min..max]; for mid, count ≤ mid across rows via binary search; need count > (m*n)/2.",
    approaches: [
      {
        title: "Binary search on the answer value",
        tier: "Optimal",
        idea: "Search value range; count elements ≤ mid per row with upper bound.",
        steps: [
          "lo=min col0, hi=max last col",
          "mid: count = Σ upperBound(row, mid)",
          "If count <= (m*n)/2: lo=mid+1 else hi=mid",
          "Return lo",
        ],
        time: "O(m · log n · log(range))",
        space: "O(1)",
      },
    ],
    dryRun:
      "1..max; need count > total/2. Smallest value whose ≤-count exceeds half is the median.",
    interviewTips: ["The required count is strictly greater than (m*n)/2 (works because m*n is odd)."],
    commonMistakes: ["Flattening to O(m*n log) — the point is to avoid it.", "Wrong count comparator (≤ vs <)."],
    followUps: ["Kth smallest element in a sorted matrix uses the same value-search."],
    related: ["search-a-2d-matrix", "kth-element-of-two-sorted-arrays"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def matrix_median(mat):
    m, n = len(mat), len(mat[0])
    def count_le(x):
        total = 0
        for row in mat:
            lo, hi = 0, n
            while lo < hi:
                mid = (lo + hi) // 2
                if row[mid] <= x:
                    lo = mid + 1
                else:
                    hi = mid
            total += lo
        return total
    lo = min(row[0] for row in mat)
    hi = max(row[-1] for row in mat)
    need = (m * n) // 2
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if count_le(mid) <= need:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int matrixMedian(int[][] mat) {
        int m = mat.length, n = mat[0].length, lo = Integer.MAX_VALUE, hi = Integer.MIN_VALUE;
        for (int[] row : mat) { lo = Math.min(lo, row[0]); hi = Math.max(hi, row[n - 1]); }
        int need = (m * n) / 2;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLe(mat, mid) <= need) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    private int countLe(int[][] mat, int x) {
        int total = 0;
        for (int[] row : mat) {
            int lo = 0, hi = row.length;
            while (lo < hi) { int mid = (lo + hi) / 2; if (row[mid] <= x) lo = mid + 1; else hi = mid; }
            total += lo;
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function matrixMedian(mat) {
  const m = mat.length, n = mat[0].length;
  const countLe = (x) => {
    let total = 0;
    for (const row of mat) {
      let lo = 0, hi = n;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (row[mid] <= x) lo = mid + 1; else hi = mid; }
      total += lo;
    }
    return total;
  };
  let lo = Infinity, hi = -Infinity;
  for (const row of mat) { lo = Math.min(lo, row[0]); hi = Math.max(hi, row[n - 1]); }
  const need = Math.floor((m * n) / 2);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (countLe(mid) <= need) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer matrixMedian(List<List<Integer>> mat) {
        Integer m = mat.size(), n = mat[0].size();
        Integer lo = 2147483647, hi = -2147483648;
        for (List<Integer> row : mat) { lo = Math.min(lo, row[0]); hi = Math.max(hi, row[n - 1]); }
        Integer need = (m * n) / 2;
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (countLe(mat, mid) <= need) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    static Integer countLe(List<List<Integer>> mat, Integer x) {
        Integer total = 0;
        for (List<Integer> row : mat) {
            Integer lo = 0, hi = row.size();
            while (lo < hi) { Integer mid = (lo + hi) / 2; if (row[mid] <= x) lo = mid + 1; else hi = mid; }
            total += lo;
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "find-the-smallest-missing-positive-number",
    title: "Find the Smallest Missing Positive Number",
    difficulty: "Hard",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an unsorted array `nums`, return the smallest positive integer (≥ 1) that does not appear, in O(n) time and O(1) extra space.",
    beginnerExplanation:
      "The answer must be in 1..n+1. Use the array itself as a hash table: place each value v (where 1 ≤ v ≤ n) at index v-1 by swapping. Then the first index i whose value isn't i+1 reveals the missing number i+1.",
    realWorldAnalogy:
      "Numbered lockers 1..n: send each key to its matching locker. The first locker holding the wrong key tells you which number went missing.",
    visualExplanation:
      "nums=[3,4,-1,1] → place 3→idx2,4(out),1→idx0 → [1,-1,3,4] → idx1 wrong → answer 2",
    approaches: [
      {
        title: "Hash set",
        tier: "Brute Force",
        idea: "Add positives to a set, then probe 1,2,3,... for the first absent.",
        steps: ["Put all values in a set", "For i=1.. : if i not in set return i"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Cyclic placement (index as hash)",
        tier: "Optimal",
        idea: "Swap each v∈[1,n] to index v-1; scan for the first misplaced slot.",
        steps: [
          "While nums[i] in [1,n] and not already placed, swap to its home index",
          "Scan: first i with nums[i] != i+1 → return i+1",
          "Else return n+1",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "nums=[1,2,0] → placed [1,2,0] → idx2 has 0≠3 → return 3",
    interviewTips: ["State the answer is bounded by n+1 up front — it justifies ignoring big/negative values."],
    commonMistakes: ["Infinite swap loop when equal values map to the same home — guard with a value check."],
    followUps: ["First missing positive present in a stream."],
    related: ["set-mismatch", "missing-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def first_missing_positive(nums):
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            j = nums[i] - 1
            nums[i], nums[j] = nums[j], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int j = nums[i] - 1;
                int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            }
        }
        for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
        return n + 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
  return n + 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer firstMissingPositive(List<Integer> nums) {
        Integer n = nums.size();
        for (Integer i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                Integer j = nums[i] - 1;
                Integer t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            }
        }
        for (Integer i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
        return n + 1;
    }
}`,
      },
    ],
  },
];

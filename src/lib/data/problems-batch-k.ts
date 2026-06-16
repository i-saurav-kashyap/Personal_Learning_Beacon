import type { Problem } from "@/lib/types";

// Striver A2Z array/hashing gaps — full teaching template + 4-language solutions.
export const PROBLEMS_BATCH_K: Problem[] = [
  {
    slug: "4sum",
    title: "4Sum",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Two Pointers"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an array `nums` and a `target`, return all unique quadruplets `[a, b, c, d]` such that a + b + c + d = target. The solution set must not contain duplicate quadruplets.",
    beginnerExplanation:
      "It's 3Sum with one more layer. Sort the array, fix the first two numbers with nested loops, then close in on the remaining two with a left/right pointer. Sorting is what lets you skip duplicates and move pointers intelligently.",
    realWorldAnalogy:
      "Picking a team of four whose skill ratings hit an exact total: line everyone up by rating, lock in two players, then slide a low-rated and high-rated candidate toward each other until the total balances.",
    visualExplanation:
      "nums sorted = [-2,-1,0,0,1,2], target=0\nfix -2,-1 → need 3 from two pointers → 0..2 etc.\nfix -2,0 → 0+2=2 ✓ → [-2,0,0,2]",
    approaches: [
      {
        title: "Four nested loops",
        tier: "Brute Force",
        idea: "Try every quadruplet and dedupe with a set.",
        steps: ["Four nested loops i<j<k<l", "Collect sums == target into a set of sorted tuples"],
        time: "O(n⁴)",
        space: "O(n)",
      },
      {
        title: "Sort + two fixed + two pointers",
        tier: "Optimal",
        idea: "Sort, fix i and j, two-pointer the rest; skip duplicates at every level.",
        steps: [
          "Sort the array",
          "For each i (skip dup), for each j>i (skip dup)",
          "left=j+1, right=n−1; move based on sum vs target",
          "On a hit, record and skip duplicate left/right values",
        ],
        time: "O(n³)",
        space: "O(1) extra",
      },
    ],
    dryRun:
      "nums=[1,0,-1,0,-2,2] target=0 → sorted [-2,-1,0,0,1,2]\ni=-2 j=-1 → L=0 R=2: -2-1+0+2=-1<0 →L++; -2-1+0+2... → finds [-2,-1,1,2]\ni=-2 j=0 → [-2,0,0,2]; i=-1 j=0 → [-1,0,0,1]",
    interviewTips: [
      "Use a 64-bit sum in Java/C++ — four ints can overflow 32 bits.",
      "Generalise: kSum is recursion that bottoms out in the two-pointer base case.",
    ],
    commonMistakes: [
      "Integer overflow on the sum.",
      "Missing one of the four duplicate-skip checks → repeated quadruplets.",
    ],
    followUps: ["Generalise to kSum.", "Count quadruplets instead of listing them."],
    related: ["three-sum", "two-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def four_sum(nums, target):
    nums.sort()
    n = len(nums)
    res = []
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            l, r = j + 1, n - 1
            while l < r:
                s = nums[i] + nums[j] + nums[l] + nums[r]
                if s == target:
                    res.append([nums[i], nums[j], nums[l], nums[r]])
                    l += 1
                    r -= 1
                    while l < r and nums[l] == nums[l - 1]:
                        l += 1
                    while l < r and nums[r] == nums[r + 1]:
                        r -= 1
                elif s < target:
                    l += 1
                else:
                    r -= 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        int n = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int l = j + 1, r = n - 1;
                while (l < r) {
                    long s = (long) nums[i] + nums[j] + nums[l] + nums[r];
                    if (s == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));
                        while (l < r && nums[l] == nums[l + 1]) l++;
                        while (l < r && nums[r] == nums[r - 1]) r--;
                        l++; r--;
                    } else if (s < target) l++;
                    else r--;
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
        code: `function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length, res = [];
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1, r = n - 1;
      while (l < r) {
        const s = nums[i] + nums[j] + nums[l] + nums[r];
        if (s === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++; r--;
        } else if (s < target) l++;
        else r--;
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
    public static List<List<Integer>> fourSum(List<Integer> nums, Integer target) {
        nums.sort();
        Integer n = nums.size();
        List<List<Integer>> res = new List<List<Integer>>();
        for (Integer i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (Integer j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                Integer l = j + 1, r = n - 1;
                while (l < r) {
                    Long s = (Long) nums[i] + nums[j] + nums[l] + nums[r];
                    if (s == target) {
                        res.add(new List<Integer>{ nums[i], nums[j], nums[l], nums[r] });
                        while (l < r && nums[l] == nums[l + 1]) l++;
                        while (l < r && nums[r] == nums[r - 1]) r--;
                        l++; r--;
                    } else if (s < target) l++;
                    else r--;
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
    slug: "count-inversions",
    title: "Count Inversions",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Arrays", "Divide & Conquer"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Count the number of inversions in an array — pairs (i, j) with i < j and nums[i] > nums[j]. It measures how far the array is from sorted.",
    beginnerExplanation:
      "An inversion is any pair that's 'out of order'. Counting them naively is O(n²), but a modified merge sort counts them for free: while merging two sorted halves, every time you take an element from the right half before the left is exhausted, it forms inversions with all remaining left-half elements.",
    realWorldAnalogy:
      "Measuring how jumbled a shuffled deck is: every pair of cards where a higher card sits before a lower one is one 'swap of disorder'. Merge sort tallies them as it tidies the deck.",
    visualExplanation:
      "[2,4,1,3,5] inversions: (2,1),(4,1),(4,3) = 3",
    approaches: [
      {
        title: "Check every pair",
        tier: "Brute Force",
        idea: "Count all i<j with nums[i] > nums[j].",
        steps: ["Double loop", "Increment on each out-of-order pair"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Merge sort with counting",
        tier: "Optimal",
        idea: "While merging, when a right element is placed before left ones, add (mid − i) to the count.",
        steps: [
          "Recursively sort+count both halves",
          "Merge; when arr[j] < arr[i], all remaining left elements are inversions",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "[2,4,1,3]: split [2,4]|[1,3]. merge: 1<2 → +2 (2,4 remain); 3 vs 2→2; 3 vs 4→+1. total 3",
    interviewTips: ["Say 'this is merge sort with a counter' — it signals you see the structure."],
    commonMistakes: ["Counting during the wrong branch.", "Using int that overflows for large n (use long)."],
    followUps: ["Reverse Pairs (count nums[i] > 2·nums[j]).", "Count significant inversions."],
    related: ["reverse-pairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_inversions(arr):
    def ms(lo, hi):
        if hi - lo <= 1:
            return 0
        mid = (lo + hi) // 2
        cnt = ms(lo, mid) + ms(mid, hi)
        merged = []
        i, j = lo, mid
        while i < mid and j < hi:
            if arr[i] <= arr[j]:
                merged.append(arr[i]); i += 1
            else:
                merged.append(arr[j]); j += 1
                cnt += mid - i
        merged.extend(arr[i:mid]); merged.extend(arr[j:hi])
        arr[lo:hi] = merged
        return cnt
    return ms(0, len(arr))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public long countInversions(int[] arr) {
        return ms(arr, 0, arr.length);
    }
    private long ms(int[] a, int lo, int hi) {
        if (hi - lo <= 1) return 0;
        int mid = (lo + hi) / 2;
        long cnt = ms(a, lo, mid) + ms(a, mid, hi);
        int[] merged = new int[hi - lo];
        int i = lo, j = mid, k = 0;
        while (i < mid && j < hi) {
            if (a[i] <= a[j]) merged[k++] = a[i++];
            else { merged[k++] = a[j++]; cnt += mid - i; }
        }
        while (i < mid) merged[k++] = a[i++];
        while (j < hi) merged[k++] = a[j++];
        System.arraycopy(merged, 0, a, lo, merged.length);
        return cnt;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countInversions(arr) {
  function ms(lo, hi) {
    if (hi - lo <= 1) return 0;
    const mid = (lo + hi) >> 1;
    let cnt = ms(lo, mid) + ms(mid, hi);
    const merged = [];
    let i = lo, j = mid;
    while (i < mid && j < hi) {
      if (arr[i] <= arr[j]) merged.push(arr[i++]);
      else { merged.push(arr[j++]); cnt += mid - i; }
    }
    while (i < mid) merged.push(arr[i++]);
    while (j < hi) merged.push(arr[j++]);
    for (let k = 0; k < merged.length; k++) arr[lo + k] = merged[k];
    return cnt;
  }
  return ms(0, arr.length);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Long countInversions(List<Integer> arr) {
        return ms(arr, 0, arr.size());
    }
    static Long ms(List<Integer> a, Integer lo, Integer hi) {
        if (hi - lo <= 1) return 0L;
        Integer mid = (lo + hi) / 2;
        Long cnt = ms(a, lo, mid) + ms(a, mid, hi);
        List<Integer> merged = new List<Integer>();
        Integer i = lo, j = mid;
        while (i < mid && j < hi) {
            if (a[i] <= a[j]) { merged.add(a[i]); i++; }
            else { merged.add(a[j]); j++; cnt += mid - i; }
        }
        while (i < mid) { merged.add(a[i]); i++; }
        while (j < hi) { merged.add(a[j]); j++; }
        for (Integer k = 0; k < merged.size(); k++) a[lo + k] = merged[k];
        return cnt;
    }
}`,
      },
    ],
  },
  {
    slug: "subarray-with-given-xor",
    title: "Subarray with Given XOR",
    difficulty: "Medium",
    patterns: ["prefix-sum", "hashing"],
    topics: ["Arrays", "Bit Manipulation"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array and an integer k, count the number of subarrays whose elements XOR to exactly k.",
    beginnerExplanation:
      "Mirror the 'subarray sum equals k' trick, but with XOR. Keep a running prefix XOR. A subarray (i..j) has XOR k when prefix[j] XOR prefix[i-1] = k, i.e. prefix[i-1] = prefix[j] XOR k. Count how many earlier prefixes equal that value.",
    realWorldAnalogy:
      "XOR is a light switch toggled along the way. To know if a stretch leaves the light in state k, you check how many earlier checkpoints were in the complementary state.",
    visualExplanation: "[4,2,2,6,4] k=6 → prefix xor stream, count freq of (xr ^ k)",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Compute XOR of every subarray.",
        steps: ["Double loop accumulating XOR", "Count those equal to k"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Prefix XOR + hash map",
        tier: "Optimal",
        idea: "Track frequency of each prefix XOR; for each, add count of prefix == (xr ^ k).",
        steps: [
          "freq = {0: 1}, xr = 0",
          "For each x: xr ^= x; add freq[xr ^ k]; freq[xr]++",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[4,2,2,6,4] k=6: running xr with freq map yields 4 subarrays",
    interviewTips: ["The seed freq[0]=1 handles subarrays starting at index 0."],
    commonMistakes: ["Forgetting the {0:1} seed.", "Adding to freq before querying (off-by-one)."],
    followUps: ["Longest subarray with XOR k.", "Subarray sum equals k (the additive twin)."],
    related: ["subarray-sum-equals-k"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subarrays_with_xor(nums, k):
    count = 0
    xr = 0
    freq = {0: 1}
    for x in nums:
        xr ^= x
        count += freq.get(xr ^ k, 0)
        freq[xr] = freq.get(xr, 0) + 1
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int subarraysWithXor(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        freq.put(0, 1);
        int xr = 0, count = 0;
        for (int x : nums) {
            xr ^= x;
            count += freq.getOrDefault(xr ^ k, 0);
            freq.merge(xr, 1, Integer::sum);
        }
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function subarraysWithXor(nums, k) {
  const freq = new Map([[0, 1]]);
  let xr = 0, count = 0;
  for (const x of nums) {
    xr ^= x;
    count += freq.get(xr ^ k) || 0;
    freq.set(xr, (freq.get(xr) || 0) + 1);
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer subarraysWithXor(List<Integer> nums, Integer k) {
        Map<Integer, Integer> freq = new Map<Integer, Integer>{ 0 => 1 };
        Integer xr = 0, count = 0;
        for (Integer x : nums) {
            xr ^= x;
            Integer need = xr ^ k;
            if (freq.containsKey(need)) count += freq.get(need);
            freq.put(xr, (freq.containsKey(xr) ? freq.get(xr) : 0) + 1);
        }
        return count;
    }
}`,
      },
    ],
  },
  {
    slug: "reverse-pairs",
    title: "Reverse Pairs",
    difficulty: "Hard",
    patterns: ["dynamic-programming"],
    topics: ["Arrays", "Divide & Conquer"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Count pairs (i, j) with i < j and nums[i] > 2 · nums[j]. Like counting inversions, but with the stricter '> 2×' condition.",
    beginnerExplanation:
      "Same merge-sort machinery as counting inversions, but the counting step is separated from the merge: before merging two sorted halves, for each left element count how many right elements satisfy nums[i] > 2·nums[j] using a moving pointer, then merge normally.",
    realWorldAnalogy:
      "Spotting how many times an earlier reading was more than double a later one — you sweep a window across the sorted right half rather than rechecking every pair.",
    visualExplanation: "[2,4,3,5,1] → pairs where a>2b: (4,1),(3,1),(5,1)? (5>2·1)=yes... count via merge sort",
    approaches: [
      {
        title: "All pairs",
        tier: "Brute Force",
        idea: "Check every i<j.",
        steps: ["Double loop", "Count nums[i] > 2*nums[j]"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Merge sort, count then merge",
        tier: "Optimal",
        idea: "On each merge, advance a right pointer to count valid pairs for each left element, then merge to keep halves sorted.",
        steps: [
          "Recurse on both halves",
          "For each left i, advance j while nums[i] > 2*nums[j]; add (j − mid)",
          "Merge the two sorted halves",
        ],
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    dryRun: "[1,3,2,3,1]: known answer 2 — merge sort counts (3,1) and (3,1)",
    interviewTips: ["Use long for the 2·nums[j] comparison to avoid overflow."],
    commonMistakes: ["Folding the count into the merge loop (must be a separate pass).", "Overflow on 2*nums[j]."],
    followUps: ["Count Inversions (the > variant).", "Count Smaller Numbers After Self."],
    related: ["count-inversions"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def reverse_pairs(nums):
    def ms(lo, hi):
        if hi - lo <= 1:
            return 0
        mid = (lo + hi) // 2
        cnt = ms(lo, mid) + ms(mid, hi)
        j = mid
        for i in range(lo, mid):
            while j < hi and nums[i] > 2 * nums[j]:
                j += 1
            cnt += j - mid
        nums[lo:hi] = sorted(nums[lo:hi])
        return cnt
    return ms(0, len(nums))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int reversePairs(int[] nums) {
        return ms(nums, 0, nums.length);
    }
    private int ms(int[] a, int lo, int hi) {
        if (hi - lo <= 1) return 0;
        int mid = (lo + hi) / 2;
        int cnt = ms(a, lo, mid) + ms(a, mid, hi);
        int j = mid;
        for (int i = lo; i < mid; i++) {
            while (j < hi && a[i] > 2L * a[j]) j++;
            cnt += j - mid;
        }
        int[] tmp = Arrays.copyOfRange(a, lo, hi);
        Arrays.sort(tmp);
        System.arraycopy(tmp, 0, a, lo, tmp.length);
        return cnt;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function reversePairs(nums) {
  function ms(lo, hi) {
    if (hi - lo <= 1) return 0;
    const mid = (lo + hi) >> 1;
    let cnt = ms(lo, mid) + ms(mid, hi);
    let j = mid;
    for (let i = lo; i < mid; i++) {
      while (j < hi && nums[i] > 2 * nums[j]) j++;
      cnt += j - mid;
    }
    const tmp = nums.slice(lo, hi).sort((x, y) => x - y);
    for (let k = 0; k < tmp.length; k++) nums[lo + k] = tmp[k];
    return cnt;
  }
  return ms(0, nums.length);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer reversePairs(List<Integer> nums) {
        return ms(nums, 0, nums.size());
    }
    static Integer ms(List<Integer> a, Integer lo, Integer hi) {
        if (hi - lo <= 1) return 0;
        Integer mid = (lo + hi) / 2;
        Integer cnt = ms(a, lo, mid) + ms(a, mid, hi);
        Integer j = mid;
        for (Integer i = lo; i < mid; i++) {
            while (j < hi && (Long) a[i] > 2L * a[j]) j++;
            cnt += j - mid;
        }
        List<Integer> tmp = new List<Integer>();
        for (Integer i = lo; i < hi; i++) tmp.add(a[i]);
        tmp.sort();
        for (Integer k = 0; k < tmp.size(); k++) a[lo + k] = tmp[k];
        return cnt;
    }
}`,
      },
    ],
  },
  {
    slug: "merge-sorted-array",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Two Pointers"],
    companies: ["microsoft", "amazon", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "nums1 has length m+n with the first m slots filled and n trailing zeros; nums2 has n elements. Merge nums2 into nums1 in-place so nums1 is sorted.",
    beginnerExplanation:
      "The trick is to fill from the BACK. The largest elements go into the empty tail first, so you never overwrite a value you still need. Walk both arrays from their ends, placing the bigger of the two into the current last open slot.",
    realWorldAnalogy:
      "Merging two sorted stacks of plates into one shelf by placing the heaviest plates at the far right end first, working inward — nothing you still need gets crushed.",
    visualExplanation:
      "nums1=[1,2,3,0,0,0] m=3, nums2=[2,5,6] n=3\nfill from index 5: 6,5,3,2,2,1 → [1,2,2,3,5,6]",
    approaches: [
      {
        title: "Concatenate and sort",
        tier: "Brute Force",
        idea: "Copy nums2 into the tail of nums1 and sort the whole thing.",
        steps: ["Place nums2 into nums1[m..]", "Sort nums1"],
        time: "O((m+n) log(m+n))",
        space: "O(1)",
      },
      {
        title: "Three pointers from the back",
        tier: "Optimal",
        idea: "i=m−1, j=n−1, k=m+n−1; write the larger of nums1[i]/nums2[j] at k.",
        steps: [
          "While j ≥ 0",
          "If i ≥ 0 and nums1[i] > nums2[j]: nums1[k]=nums1[i]; i−−",
          "Else nums1[k]=nums2[j]; j−−; then k−−",
        ],
        time: "O(m+n)",
        space: "O(1)",
      },
    ],
    dryRun: "i=2(3) j=2(6) k=5 → 6; k=4 → 5; k=3 → 3; k=2 → 2(from nums2); k=1 → 2; k=0 → 1",
    interviewTips: ["Filling backward is the whole insight — say it explicitly.", "Remaining nums2 must be flushed; remaining nums1 is already in place."],
    commonMistakes: ["Filling front-to-back and clobbering unread nums1 values.", "Forgetting to drain leftover nums2."],
    followUps: ["Merge k sorted lists.", "Merge without the extra trailing space (harder)."],
    related: ["merge-two-sorted-lists", "union-of-two-sorted-arrays"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def merge(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    while j >= 0:
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[k] = nums1[i]; i -= 1
        else:
            nums1[k] = nums2[j]; j -= 1
        k -= 1
    return nums1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }
  return nums1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void merge(List<Integer> nums1, Integer m, List<Integer> nums2, Integer n) {
        Integer i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) { nums1[k] = nums1[i]; i--; }
            else { nums1[k] = nums2[j]; j--; }
            k--;
        }
    }
}`,
      },
    ],
  },
  {
    slug: "set-mismatch",
    title: "Set Mismatch",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "An array should contain 1..n but one number is duplicated (replacing a missing one). Return [duplicated, missing].",
    beginnerExplanation:
      "Count which value appears twice and which 1..n value never appears. A frequency set finds both in one pass plus a scan of 1..n. (The O(1)-space trick negates the value at index |x|−1 to mark seen.)",
    realWorldAnalogy:
      "A class roll where one student answered twice and one is absent — you tally attendance and read off the double and the blank.",
    visualExplanation: "[1,2,2,4] → dup=2, missing=3 → [2,3]",
    approaches: [
      {
        title: "Frequency set",
        tier: "Better",
        idea: "Track seen values; the repeat is the duplicate; the unseen 1..n is missing.",
        steps: ["Walk array into a set, catch the repeat", "Scan 1..n for the absent value"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Index sign-marking",
        tier: "Optimal",
        idea: "Use the array itself: negate nums[|x|−1]; an already-negative slot reveals the duplicate; the still-positive slot reveals the missing index.",
        steps: [
          "For each x, idx=|x|−1; if nums[idx] < 0 → duplicate = |x|; else negate it",
          "The index still positive → missing = index+1",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[1,2,2,4]: mark 0,1; at second 2 slot already neg → dup 2; index 2 stays + → missing 3",
    interviewTips: ["Mention both the hashmap and the O(1) sign trick; interviewers like the space optimisation."],
    commonMistakes: ["Restoring signs incorrectly if asked to keep the array intact."],
    followUps: ["Find all duplicates.", "Find the missing number only."],
    related: ["find-all-duplicates-in-an-array", "missing-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_error_nums(nums):
    n = len(nums)
    seen = set()
    dup = -1
    for x in nums:
        if x in seen:
            dup = x
        seen.add(x)
    missing = next(v for v in range(1, n + 1) if v not in seen)
    return [dup, missing]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] findErrorNums(int[] nums) {
        int dup = -1, missing = -1;
        for (int x : nums) {
            int idx = Math.abs(x) - 1;
            if (nums[idx] < 0) dup = Math.abs(x);
            else nums[idx] = -nums[idx];
        }
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) missing = i + 1;
        }
        return new int[] { dup, missing };
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findErrorNums(nums) {
  let dup = -1, missing = -1;
  for (const x of nums) {
    const idx = Math.abs(x) - 1;
    if (nums[idx] < 0) dup = Math.abs(x);
    else nums[idx] = -nums[idx];
  }
  for (let i = 0; i < nums.length; i++) if (nums[i] > 0) missing = i + 1;
  return [dup, missing];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> findErrorNums(List<Integer> nums) {
        Integer dup = -1, missing = -1;
        for (Integer x : nums) {
            Integer idx = Math.abs(x) - 1;
            if (nums[idx] < 0) dup = Math.abs(x);
            else nums[idx] = -nums[idx];
        }
        for (Integer i = 0; i < nums.size(); i++) {
            if (nums[i] > 0) missing = i + 1;
        }
        return new List<Integer>{ dup, missing };
    }
}`,
      },
    ],
  },
  {
    slug: "find-all-duplicates-in-an-array",
    title: "Find All Duplicates in an Array",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "google", "meta"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an array of n integers where each value is in [1, n] and each appears once or twice, return all values that appear twice — ideally in O(n) time and O(1) extra space.",
    beginnerExplanation:
      "Because values are bounded by n, the array can be its own hash table. For each value x, jump to index |x|−1 and flip its sign to mark 'seen'. If it's already negative, x is a duplicate.",
    realWorldAnalogy:
      "Stamping a guest's seat as they arrive; if you reach a seat that's already stamped, that guest checked in twice.",
    visualExplanation: "[4,3,2,7,8,2,3,1] → negate slots; 2 and 3 hit already-negative → [2,3]",
    approaches: [
      {
        title: "Hash set / count",
        tier: "Better",
        idea: "Count occurrences; collect those seen twice.",
        steps: ["Tally counts", "Emit values with count 2"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "In-place sign marking",
        tier: "Optimal",
        idea: "Use the sign of nums[|x|−1] as a 'visited' bit.",
        steps: [
          "For each x: idx = |x| − 1",
          "If nums[idx] < 0 → x is a duplicate; else negate nums[idx]",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[4,3,2,7,8,2,3,1]: first 2 negates idx1; second 2 sees idx1<0 → dup 2; similarly 3",
    interviewTips: ["The values-in-[1,n] constraint is the unlock — call it out.", "Restore signs if the caller needs the array unchanged."],
    commonMistakes: ["Using x instead of |x| after slots go negative."],
    followUps: ["Find the single missing number.", "Set Mismatch."],
    related: ["set-mismatch", "find-the-duplicate-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_duplicates(nums):
    res = []
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] < 0:
            res.append(abs(x))
        else:
            nums[idx] = -nums[idx]
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();
        for (int x : nums) {
            int idx = Math.abs(x) - 1;
            if (nums[idx] < 0) res.add(Math.abs(x));
            else nums[idx] = -nums[idx];
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findDuplicates(nums) {
  const res = [];
  for (const x of nums) {
    const idx = Math.abs(x) - 1;
    if (nums[idx] < 0) res.push(Math.abs(x));
    else nums[idx] = -nums[idx];
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> findDuplicates(List<Integer> nums) {
        List<Integer> res = new List<Integer>();
        for (Integer x : nums) {
            Integer idx = Math.abs(x) - 1;
            if (nums[idx] < 0) res.add(Math.abs(x));
            else nums[idx] = -nums[idx];
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "longest-subarray-with-sum-k",
    title: "Longest Subarray with Sum K",
    difficulty: "Medium",
    patterns: ["prefix-sum", "hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Return the length of the longest contiguous subarray whose elements sum to exactly k. The array may contain negatives.",
    beginnerExplanation:
      "Track a running prefix sum. A subarray (i+1..j) sums to k when prefix[j] − prefix[i] = k, i.e. prefix[i] = prefix[j] − k. Store the EARLIEST index for each prefix sum so the matching subarray is as long as possible.",
    realWorldAnalogy:
      "Mile-markers on a road: to find the longest stretch covering exactly k miles, you look for the earliest marker that's k behind your current one.",
    visualExplanation: "[1,-1,5,-2,3] k=3 → longest is [1,-1,5,-2] len 4",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Sum every subarray, track the longest equal to k.",
        steps: ["Double loop accumulating sum", "Update best length on match"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Prefix sum + earliest-index map",
        tier: "Optimal",
        idea: "Map each prefix sum to its earliest index; check for (prefix − k).",
        steps: [
          "first = {0: -1}, prefix = 0",
          "For each i: prefix += nums[i]; if (prefix − k) in first → best = max(best, i − first[prefix−k])",
          "Store first[prefix] only if unseen",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[1,-1,5,-2,3] k=3: prefixes 1,0,5,3,6; at i=3 prefix=3, 3-3=0 at index -1 → len 4",
    interviewTips: ["For all-positive arrays a sliding window gives O(1) space — mention it.", "Negatives force the prefix-sum + hashmap approach."],
    commonMistakes: ["Overwriting first[prefix] (must keep the earliest).", "Forgetting the {0:-1} seed."],
    followUps: ["Count subarrays with sum k.", "Longest subarray with at most k distinct."],
    related: ["subarray-sum-equals-k", "largest-subarray-with-zero-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def longest_subarray_with_sum_k(nums, k):
    first = {0: -1}
    prefix = 0
    best = 0
    for i, x in enumerate(nums):
        prefix += x
        if prefix - k in first:
            best = max(best, i - first[prefix - k])
        if prefix not in first:
            first[prefix] = i
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int longestSubarrayWithSumK(int[] nums, int k) {
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int prefix = 0, best = 0;
        for (int i = 0; i < nums.length; i++) {
            prefix += nums[i];
            if (first.containsKey(prefix - k)) best = Math.max(best, i - first.get(prefix - k));
            first.putIfAbsent(prefix, i);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function longestSubarrayWithSumK(nums, k) {
  const first = new Map([[0, -1]]);
  let prefix = 0, best = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    if (first.has(prefix - k)) best = Math.max(best, i - first.get(prefix - k));
    if (!first.has(prefix)) first.set(prefix, i);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer longestSubarrayWithSumK(List<Integer> nums, Integer k) {
        Map<Integer, Integer> first = new Map<Integer, Integer>{ 0 => -1 };
        Integer prefix = 0, best = 0;
        for (Integer i = 0; i < nums.size(); i++) {
            prefix += nums[i];
            if (first.containsKey(prefix - k)) best = Math.max(best, i - first.get(prefix - k));
            if (!first.containsKey(prefix)) first.put(prefix, i);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "largest-subarray-with-zero-sum",
    title: "Largest Subarray with Zero Sum",
    difficulty: "Medium",
    patterns: ["prefix-sum", "hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Find the length of the longest contiguous subarray whose elements sum to zero.",
    beginnerExplanation:
      "A subarray sums to zero exactly when the running prefix sum repeats — the stretch between two equal prefix sums cancels out. Remember the first index each prefix sum appears; the gap to a later repeat is a zero-sum subarray.",
    realWorldAnalogy:
      "Tracking a bank balance: if today's balance equals a balance from some earlier day, the net of everything in between was exactly zero.",
    visualExplanation: "[9,-3,-9,4,1] prefixes 9,6,-3,1,2 — no repeat... [1,-1,3,-3]→ prefix 1,0,3,0 repeat 0 → len",
    approaches: [
      {
        title: "All subarrays",
        tier: "Brute Force",
        idea: "Sum every subarray and track the longest equal to 0.",
        steps: ["Double loop", "Track best length where sum == 0"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Prefix sum + first-seen map",
        tier: "Optimal",
        idea: "If a prefix sum repeats, the span between equals zero.",
        steps: [
          "first = {0: -1}, prefix = 0",
          "If prefix already seen → best = max(best, i − first[prefix]); else store i",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[1,2,-3,3] prefixes 1,3,0,3: prefix 0 at i=2 (seed -1) → len 3; prefix 3 repeats i=3 vs i=1 → len 2",
    interviewTips: ["Special case of 'longest subarray with sum k' where k = 0."],
    commonMistakes: ["Overwriting the first occurrence of a prefix sum."],
    followUps: ["Count zero-sum subarrays.", "Longest subarray with sum k."],
    related: ["longest-subarray-with-sum-k", "subarray-sum-equals-k"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_len_zero_sum(nums):
    first = {0: -1}
    prefix = 0
    best = 0
    for i, x in enumerate(nums):
        prefix += x
        if prefix in first:
            best = max(best, i - first[prefix])
        else:
            first[prefix] = i
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int maxLen(int[] nums) {
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int prefix = 0, best = 0;
        for (int i = 0; i < nums.length; i++) {
            prefix += nums[i];
            if (first.containsKey(prefix)) best = Math.max(best, i - first.get(prefix));
            else first.put(prefix, i);
        }
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxLenZeroSum(nums) {
  const first = new Map([[0, -1]]);
  let prefix = 0, best = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    if (first.has(prefix)) best = Math.max(best, i - first.get(prefix));
    else first.set(prefix, i);
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxLenZeroSum(List<Integer> nums) {
        Map<Integer, Integer> first = new Map<Integer, Integer>{ 0 => -1 };
        Integer prefix = 0, best = 0;
        for (Integer i = 0; i < nums.size(); i++) {
            prefix += nums[i];
            if (first.containsKey(prefix)) best = Math.max(best, i - first.get(prefix));
            else first.put(prefix, i);
        }
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "rearrange-array-elements-by-sign",
    title: "Rearrange Array Elements by Sign",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array with an equal number of positive and negative integers, rearrange it so signs alternate starting with a positive, preserving the relative order within each sign group.",
    beginnerExplanation:
      "Positives belong at even indices (0,2,4,…) and negatives at odd indices (1,3,5,…). Walk the input once, dropping each positive at the next even slot and each negative at the next odd slot of a result array.",
    realWorldAnalogy:
      "Seating couples so partners alternate down a row — men in even seats, women in odd, each in the order they arrived.",
    visualExplanation: "[3,1,-2,-5,2,-4] → [3,-2,1,-5,2,-4]",
    approaches: [
      {
        title: "Split then interleave",
        tier: "Better",
        idea: "Separate into positives and negatives, then weave them back.",
        steps: ["Collect positives and negatives", "Place pos[i] at 2i, neg[i] at 2i+1"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Single pass with two write pointers",
        tier: "Optimal",
        idea: "Maintain even and odd write indices; place by sign in one pass.",
        steps: [
          "res = new array, pi = 0, ni = 1",
          "For each x: if x > 0 → res[pi]=x; pi+=2; else res[ni]=x; ni+=2",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[3,1,-2,-5,2,-4]: pos→0,2,4; neg→1,3,5 → [3,-2,1,-5,2,-4]",
    interviewTips: ["Clarify whether counts are guaranteed equal — the unequal variant needs leftover handling."],
    commonMistakes: ["Not preserving within-group order.", "Mishandling the unequal-count follow-up."],
    followUps: ["Unequal positive/negative counts.", "Do it in O(1) extra space (hard)."],
    related: ["sort-colors"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rearrange_by_sign(nums):
    res = [0] * len(nums)
    pi, ni = 0, 1
    for x in nums:
        if x > 0:
            res[pi] = x; pi += 2
        else:
            res[ni] = x; ni += 2
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] rearrangeBySign(int[] nums) {
        int[] res = new int[nums.length];
        int pi = 0, ni = 1;
        for (int x : nums) {
            if (x > 0) { res[pi] = x; pi += 2; }
            else { res[ni] = x; ni += 2; }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rearrangeBySign(nums) {
  const res = new Array(nums.length);
  let pi = 0, ni = 1;
  for (const x of nums) {
    if (x > 0) { res[pi] = x; pi += 2; }
    else { res[ni] = x; ni += 2; }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> rearrangeBySign(List<Integer> nums) {
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < nums.size(); i++) res.add(0);
        Integer pi = 0, ni = 1;
        for (Integer x : nums) {
            if (x > 0) { res[pi] = x; pi += 2; }
            else { res[ni] = x; ni += 2; }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "leaders-in-an-array",
    title: "Leaders in an Array",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "An element is a leader if it is strictly greater than everything to its right (the last element is always a leader). Return all leaders in their original order.",
    beginnerExplanation:
      "Scan from the RIGHT, keeping the maximum seen so far. Any element bigger than that running max is a leader. Collect them and reverse to restore the original order.",
    realWorldAnalogy:
      "Walking back along a mountain ridge: a peak is a 'leader' if nothing you've already passed (to its right) was taller.",
    visualExplanation: "[16,17,4,3,5,2] → from right: 2,5,17 are leaders → [17,5,2]",
    approaches: [
      {
        title: "Check everything to the right",
        tier: "Brute Force",
        idea: "For each element, scan all elements to its right.",
        steps: ["For each i, verify nums[i] > all nums[j>i]"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Right-to-left running max",
        tier: "Optimal",
        idea: "Track the max from the right; an element beating it is a leader.",
        steps: ["maxRight = −∞", "Iterate right→left; if x > maxRight → leader; update maxRight", "Reverse the collected leaders"],
        time: "O(n)",
        space: "O(1) extra",
      },
    ],
    dryRun: "[16,17,4,3,5,2]: r→l max 2(L),5(L),3,4,17(L),16 → leaders [17,5,2]",
    interviewTips: ["Right-to-left is the trick; left-to-right needs suffix maxima."],
    commonMistakes: ["Using ≥ instead of > if duplicates shouldn't both qualify.", "Forgetting to reverse the result."],
    followUps: ["Count leaders only.", "Leaders from the left (prefix maxima)."],
    related: ["next-greater-element-i"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def leaders(nums):
    res = []
    max_right = float("-inf")
    for x in reversed(nums):
        if x > max_right:
            res.append(x)
            max_right = x
    res.reverse()
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> leaders(int[] nums) {
        List<Integer> res = new ArrayList<>();
        int maxRight = Integer.MIN_VALUE;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] > maxRight) { res.add(nums[i]); maxRight = nums[i]; }
        }
        Collections.reverse(res);
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function leaders(nums) {
  const res = [];
  let maxRight = -Infinity;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] > maxRight) { res.push(nums[i]); maxRight = nums[i]; }
  }
  return res.reverse();
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> leaders(List<Integer> nums) {
        List<Integer> res = new List<Integer>();
        Integer maxRight = -2147483648;
        for (Integer i = nums.size() - 1; i >= 0; i--) {
            if (nums[i] > maxRight) { res.add(nums[i]); maxRight = nums[i]; }
        }
        Integer lo = 0, hi = res.size() - 1;
        while (lo < hi) { Integer t = res[lo]; res[lo] = res[hi]; res[hi] = t; lo++; hi--; }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "union-of-two-sorted-arrays",
    title: "Union of Two Sorted Arrays",
    difficulty: "Easy",
    patterns: ["two-pointers"],
    topics: ["Arrays", "Two Pointers"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given two sorted arrays, return their union — every distinct value from either array, in sorted order.",
    beginnerExplanation:
      "Walk both arrays with two pointers like a merge, always advancing the smaller side, and append a value only if it differs from the last one you added (to skip duplicates within and across the arrays).",
    realWorldAnalogy:
      "Merging two alphabetised guest lists into one master list with no name written twice.",
    visualExplanation: "a=[1,2,3,4,5] b=[2,3,4,4,5,6] → [1,2,3,4,5,6]",
    approaches: [
      {
        title: "Combine + set + sort",
        tier: "Brute Force",
        idea: "Dump both into a set, then sort.",
        steps: ["Add all elements to a set", "Sort the unique values"],
        time: "O((m+n) log(m+n))",
        space: "O(m+n)",
      },
      {
        title: "Two-pointer merge with dedupe",
        tier: "Optimal",
        idea: "Merge like merge-sort, skipping a value equal to the last appended.",
        steps: [
          "i=j=0; compare a[i], b[j]",
          "Append the smaller (or either when equal, advancing both) only if != last appended",
          "Drain the remaining array with the same dedupe check",
        ],
        time: "O(m + n)",
        space: "O(m + n) for the output",
      },
    ],
    dryRun: "a=[1,2,2,3] b=[2,3,4]: append 1, 2(skip dup), 3, 4 → [1,2,3,4]",
    interviewTips: ["Exploit the fact both are already sorted — no extra sort needed."],
    commonMistakes: ["Not deduping across both arrays.", "Skipping the final drain loops."],
    followUps: ["Intersection of two sorted arrays.", "Union of k sorted arrays."],
    related: ["merge-sorted-array", "merge-two-sorted-lists"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def union_sorted(a, b):
    i = j = 0
    res = []
    def push(v):
        if not res or res[-1] != v:
            res.append(v)
    while i < len(a) and j < len(b):
        if a[i] < b[j]:
            push(a[i]); i += 1
        elif a[i] > b[j]:
            push(b[j]); j += 1
        else:
            push(a[i]); i += 1; j += 1
    while i < len(a):
        push(a[i]); i += 1
    while j < len(b):
        push(b[j]); j += 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> union(int[] a, int[] b) {
        List<Integer> res = new ArrayList<>();
        int i = 0, j = 0;
        while (i < a.length && j < b.length) {
            int v;
            if (a[i] < b[j]) v = a[i++];
            else if (a[i] > b[j]) v = b[j++];
            else { v = a[i++]; j++; }
            if (res.isEmpty() || res.get(res.size() - 1) != v) res.add(v);
        }
        while (i < a.length) { if (res.isEmpty() || res.get(res.size() - 1) != a[i]) res.add(a[i]); i++; }
        while (j < b.length) { if (res.isEmpty() || res.get(res.size() - 1) != b[j]) res.add(b[j]); j++; }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function unionSorted(a, b) {
  const res = [];
  const push = (v) => { if (!res.length || res[res.length - 1] !== v) res.push(v); };
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) push(a[i++]);
    else if (a[i] > b[j]) push(b[j++]);
    else { push(a[i++]); j++; }
  }
  while (i < a.length) push(a[i++]);
  while (j < b.length) push(b[j++]);
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> unionSorted(List<Integer> a, List<Integer> b) {
        List<Integer> res = new List<Integer>();
        Integer i = 0, j = 0;
        while (i < a.size() && j < b.size()) {
            Integer v;
            if (a[i] < b[j]) { v = a[i]; i++; }
            else if (a[i] > b[j]) { v = b[j]; j++; }
            else { v = a[i]; i++; j++; }
            if (res.isEmpty() || res[res.size() - 1] != v) res.add(v);
        }
        while (i < a.size()) { if (res.isEmpty() || res[res.size() - 1] != a[i]) res.add(a[i]); i++; }
        while (j < b.size()) { if (res.isEmpty() || res[res.size() - 1] != b[j]) res.add(b[j]); j++; }
        return res;
    }
}`,
      },
    ],
  },
];

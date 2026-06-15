import type { Problem } from "@/lib/types";

// Batch A — Arrays / Matrix / Binary Search (Striver A2Z + MAANG).
export const PROBLEMS_BATCH_A: Problem[] = [
  {
    slug: "majority-element",
    title: "Majority Element",
    difficulty: "Easy",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver", "neetcode150", "top50"],
    frequency: 4,
    statement:
      "Given an array `nums` of size n, return the majority element — the element that appears more than ⌊n/2⌋ times. You may assume it always exists.",
    beginnerExplanation:
      "One value occupies more than half the array. The clever trick (Boyer–Moore voting) is to imagine each majority element cancelling out one non-majority element — because the majority has more than half, it always survives the cancellation.",
    realWorldAnalogy:
      "An election where one candidate has an outright majority. Pair off every vote for them against a vote for someone else; once all opposing votes are cancelled, votes for the winner still remain.",
    visualExplanation:
      "nums = [2,2,1,1,1,2,2]\ncand=2 cnt=1 → 2 cnt=2 → 1 cnt=1 → 1 cnt=0 → cand=1 cnt=1 → 2 cnt=0 → cand=2 cnt=1 → 2 cnt=2  ⇒ 2",
    approaches: [
      {
        title: "Count every element",
        tier: "Brute Force",
        idea: "For each value, count its occurrences and check if it exceeds n/2.",
        steps: ["For each i, scan the array counting nums[i]", "Return the first whose count > n/2"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Hash map of counts",
        tier: "Better",
        idea: "Tally counts in a map, return the key whose count exceeds n/2.",
        steps: ["Increment map[num]", "Return the key with count > n/2"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Boyer–Moore voting",
        tier: "Optimal",
        idea: "Track one candidate and a counter; reset the candidate when the counter hits zero.",
        steps: [
          "count=0, candidate=none",
          "If count==0, adopt the current value as candidate",
          "count += 1 if value==candidate else −1",
          "The surviving candidate is the majority",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[3,3,4]\ncount0→cand3 count1\n3==3 count2\n4!=3 count1 ⇒ candidate 3",
    interviewTips: [
      "Name the algorithm: 'Boyer–Moore majority vote' — it signals you know the O(1)-space trick.",
      "If existence isn't guaranteed, add a second pass to verify the candidate's count.",
    ],
    commonMistakes: [
      "Resetting the candidate without checking count==0.",
      "Assuming a majority exists when the problem doesn't guarantee it.",
    ],
    followUps: ["Majority Element II (> n/3).", "Verify the candidate when existence isn't guaranteed."],
    related: ["majority-element-ii"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def majority_element(nums):
    count, candidate = 0, None
    for n in nums:
        if count == 0:
            candidate = n
        count += 1 if n == candidate else -1
    return candidate`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for (int n : nums) {
            if (count == 0) candidate = n;
            count += (n == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function majorityElement(nums) {
  let count = 0, candidate = null;
  for (const n of nums) {
    if (count === 0) candidate = n;
    count += n === candidate ? 1 : -1;
  }
  return candidate;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer majorityElement(List<Integer> nums) {
        Integer count = 0;
        Integer candidate = null;
        for (Integer n : nums) {
            if (count == 0) candidate = n;
            count += (n == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
      },
    ],
  },
  {
    slug: "majority-element-ii",
    title: "Majority Element II",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an integer array of size n, return all elements that appear more than ⌊n/3⌋ times. There can be at most two such elements.",
    beginnerExplanation:
      "At most two values can each exceed a third of the array. Boyer–Moore extends to two candidates and two counters; a final verification pass confirms which actually qualify.",
    realWorldAnalogy:
      "A three-way election where you want every candidate with more than a third of the vote — there can be at most two. Track the two front-runners as ballots stream in, then recount to confirm.",
    visualExplanation:
      "nums=[1,1,1,3,3,2,2,2]\ntwo candidates emerge: 1 and 2; verify counts (3 and 3) both > 8/3=2 ⇒ [1,2]",
    approaches: [
      {
        title: "Hash map of counts",
        tier: "Better",
        idea: "Count occurrences, collect keys whose count exceeds n/3.",
        steps: ["Tally counts", "Return keys with count > n/3"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Extended Boyer–Moore (two candidates)",
        tier: "Optimal",
        idea: "Maintain two candidates and counters; verify both at the end.",
        steps: [
          "Track (c1,n1),(c2,n2)",
          "Match increments; else fill an empty slot; else decrement both",
          "Recount c1 and c2, keep those exceeding n/3",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[3,2,3]\nc1=3 n1=1 → c2=2 n2=1 → 3==c1 n1=2\nverify: count(3)=2 > 3/3=1 ✓, count(2)=1 not >1 ⇒ [3]",
    interviewTips: [
      "Explain why at most two answers exist: three elements each > n/3 would exceed n.",
      "The verification pass is mandatory — the voting phase only nominates candidates.",
    ],
    commonMistakes: [
      "Skipping the final count-verification pass.",
      "Letting both candidates become the same value (guard the equality checks first).",
    ],
    followUps: ["Generalise to elements appearing more than n/k times."],
    related: ["majority-element"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def majority_element_ii(nums):
    c1 = c2 = None
    n1 = n2 = 0
    for x in nums:
        if c1 is not None and x == c1:
            n1 += 1
        elif c2 is not None and x == c2:
            n2 += 1
        elif n1 == 0:
            c1, n1 = x, 1
        elif n2 == 0:
            c2, n2 = x, 1
        else:
            n1 -= 1
            n2 -= 1
    return [c for c in (c1, c2) if c is not None and nums.count(c) > len(nums) // 3]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Integer c1 = null, c2 = null;
        int n1 = 0, n2 = 0;
        for (int x : nums) {
            if (c1 != null && x == c1) n1++;
            else if (c2 != null && x == c2) n2++;
            else if (n1 == 0) { c1 = x; n1 = 1; }
            else if (n2 == 0) { c2 = x; n2 = 1; }
            else { n1--; n2--; }
        }
        List<Integer> res = new ArrayList<>();
        int t = nums.length / 3;
        for (Integer c : new Integer[] { c1, c2 }) {
            if (c == null) continue;
            int cnt = 0;
            for (int x : nums) if (x == c) cnt++;
            if (cnt > t) res.add(c);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function majorityElementII(nums) {
  let c1 = null, c2 = null, n1 = 0, n2 = 0;
  for (const x of nums) {
    if (c1 !== null && x === c1) n1++;
    else if (c2 !== null && x === c2) n2++;
    else if (n1 === 0) { c1 = x; n1 = 1; }
    else if (n2 === 0) { c2 = x; n2 = 1; }
    else { n1--; n2--; }
  }
  const t = Math.floor(nums.length / 3);
  return [c1, c2].filter(
    (c) => c !== null && nums.filter((x) => x === c).length > t,
  );
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> majorityElement(List<Integer> nums) {
        Integer c1 = null, c2 = null;
        Integer n1 = 0, n2 = 0;
        for (Integer x : nums) {
            if (c1 != null && x == c1) n1++;
            else if (c2 != null && x == c2) n2++;
            else if (n1 == 0) { c1 = x; n1 = 1; }
            else if (n2 == 0) { c2 = x; n2 = 1; }
            else { n1--; n2--; }
        }
        List<Integer> res = new List<Integer>();
        Integer t = nums.size() / 3;
        for (Integer c : new List<Integer>{ c1, c2 }) {
            if (c == null) continue;
            Integer cnt = 0;
            for (Integer x : nums) if (x == c) cnt++;
            if (cnt > t) res.add(c);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "next-permutation",
    title: "Next Permutation",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["google", "amazon", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Rearrange `nums` into the lexicographically next greater permutation. If no greater permutation exists, rearrange to the lowest order (sorted ascending). Do it in place with O(1) extra memory.",
    beginnerExplanation:
      "Find the rightmost spot where the sequence stops increasing from the right (the 'pivot'). Swap that pivot with the next-larger value to its right, then reverse the tail so it becomes the smallest possible — that's the next permutation.",
    realWorldAnalogy:
      "Like an odometer that isn't uniform: to tick to the next reading you bump the rightmost digit you can increase, then reset everything after it to the smallest arrangement.",
    visualExplanation:
      "nums=[1,2,3]\npivot at index0 (1<2)? scan from right: 2<3 → pivot=index1(2)\nswap 2 with 3 → [1,3,2]; reverse tail (just [2]) ⇒ [1,3,2]",
    approaches: [
      {
        title: "Generate all permutations",
        tier: "Brute Force",
        idea: "List every permutation, sort, find the one after the current.",
        steps: ["Enumerate permutations", "Sort", "Return the successor"],
        time: "O(n! · n)",
        space: "O(n!)",
      },
      {
        title: "Pivot, swap, reverse",
        tier: "Optimal",
        idea: "Locate the first decreasing element from the right, swap with its next-larger successor, reverse the suffix.",
        steps: [
          "Find i where nums[i] < nums[i+1] (scanning right→left)",
          "If found, find j (rightmost) with nums[j] > nums[i], swap",
          "Reverse the subarray after i",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[1,3,2]\nfrom right: 3>2 so i moves; 1<3 → i=0\nrightmost j>nums[0]=1 is 2 (index2) → swap → [2,3,1]\nreverse tail [3,1]→[1,3] ⇒ [2,1,3]",
    interviewTips: [
      "Say the three steps out loud: find pivot → swap with successor → reverse suffix.",
      "The all-descending case ([3,2,1]) has no pivot, so you just reverse the whole array.",
    ],
    commonMistakes: [
      "Using > instead of >= when finding the pivot (breaks on duplicates).",
      "Forgetting to reverse the suffix after the swap.",
    ],
    followUps: ["Previous permutation.", "k-th permutation sequence."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def next_permutation(nums):
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])
    return nums`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) j--;
            int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
        for (int l = i + 1, r = nums.length - 1; l < r; l++, r--) {
            int t = nums[l]; nums[l] = nums[r]; nums[r] = t;
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  for (let l = i + 1, r = nums.length - 1; l < r; l++, r--) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
  }
  return nums;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void nextPermutation(List<Integer> nums) {
        Integer i = nums.size() - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            Integer j = nums.size() - 1;
            while (nums[j] <= nums[i]) j--;
            Integer t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
        Integer l = i + 1, r = nums.size() - 1;
        while (l < r) {
            Integer t = nums[l]; nums[l] = nums[r]; nums[r] = t;
            l++; r--;
        }
    }
}`,
      },
    ],
  },
  {
    slug: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Arrays"],
    companies: ["microsoft", "amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an m×n matrix, if an element is 0, set its entire row and column to 0. Do it in place.",
    beginnerExplanation:
      "The trap is doing it as you scan — a freshly-zeroed cell would wrongly trigger more zeroing. The O(1) trick uses the matrix's own first row and column as notepads to remember which rows/cols must be cleared.",
    realWorldAnalogy:
      "Marking a spreadsheet: instead of a separate sticky note per affected row and column, you scribble the marks in the margin (row 0 and column 0) and act on them in a second pass.",
    visualExplanation:
      "[[1,1,1],[1,0,1],[1,1,1]]\nmark row1,col1 via markers → clear → [[1,0,1],[0,0,0],[1,0,1]]",
    approaches: [
      {
        title: "Extra row/col sets",
        tier: "Better",
        idea: "Record which rows and columns contain a zero in two sets, then clear them.",
        steps: ["Scan for zeros, record row & col indices", "Second pass zeroes flagged rows/cols"],
        time: "O(m·n)",
        space: "O(m+n)",
      },
      {
        title: "First row/col as markers",
        tier: "Optimal",
        idea: "Use row 0 and column 0 to flag; track the first row/col separately with two booleans.",
        steps: [
          "Remember if row 0 / col 0 themselves need zeroing",
          "For inner cells, mark matrix[r][0] and matrix[0][c]",
          "Zero inner cells from markers, then handle row 0 / col 0",
        ],
        time: "O(m·n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "[[0,1],[1,1]]\nfirstRow has 0 → flag; inner none → clear via flags → row0 zeroed, col0 zeroed ⇒ [[0,0],[0,1]]",
    interviewTips: [
      "Lead with the O(m+n) sets solution, then optimise to O(1) — shows range.",
      "The two boolean flags for the first row/col are the part people forget.",
    ],
    commonMistakes: [
      "Zeroing during the first scan, cascading false zeros.",
      "Overwriting the markers before reading them.",
    ],
    followUps: ["What if zeros should propagate diagonally too?"],
    related: ["rotate-image"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def set_zeroes(matrix):
    rows, cols = len(matrix), len(matrix[0])
    first_row = any(matrix[0][c] == 0 for c in range(cols))
    first_col = any(matrix[r][0] == 0 for r in range(rows))
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if first_row:
        for c in range(cols):
            matrix[0][c] = 0
    if first_col:
        for r in range(rows):
            matrix[r][0] = 0
    return matrix`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        boolean firstRow = false, firstCol = false;
        for (int c = 0; c < cols; c++) if (matrix[0][c] == 0) firstRow = true;
        for (int r = 0; r < rows; r++) if (matrix[r][0] == 0) firstCol = true;
        for (int r = 1; r < rows; r++)
            for (int c = 1; c < cols; c++)
                if (matrix[r][c] == 0) { matrix[r][0] = 0; matrix[0][c] = 0; }
        for (int r = 1; r < rows; r++)
            for (int c = 1; c < cols; c++)
                if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;
        if (firstRow) for (int c = 0; c < cols; c++) matrix[0][c] = 0;
        if (firstCol) for (int r = 0; r < rows; r++) matrix[r][0] = 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function setZeroes(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  let firstRow = false, firstCol = false;
  for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRow = true;
  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstCol = true;
  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; }
  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
  if (firstRow) for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  if (firstCol) for (let r = 0; r < rows; r++) matrix[r][0] = 0;
  return matrix;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void setZeroes(List<List<Integer>> matrix) {
        Integer rows = matrix.size(), cols = matrix[0].size();
        Boolean firstRow = false, firstCol = false;
        for (Integer c = 0; c < cols; c++) if (matrix[0][c] == 0) firstRow = true;
        for (Integer r = 0; r < rows; r++) if (matrix[r][0] == 0) firstCol = true;
        for (Integer r = 1; r < rows; r++)
            for (Integer c = 1; c < cols; c++)
                if (matrix[r][c] == 0) { matrix[r][0] = 0; matrix[0][c] = 0; }
        for (Integer r = 1; r < rows; r++)
            for (Integer c = 1; c < cols; c++)
                if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;
        if (firstRow) for (Integer c = 0; c < cols; c++) matrix[0][c] = 0;
        if (firstCol) for (Integer r = 0; r < rows; r++) matrix[r][0] = 0;
    }
}`,
      },
    ],
  },
  {
    slug: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Rotate an n×n matrix 90 degrees clockwise, in place.",
    beginnerExplanation:
      "A 90° clockwise rotation equals two simple moves: transpose the matrix (flip across the main diagonal), then reverse each row. Both are easy in-place operations, and together they rotate without extra space.",
    realWorldAnalogy:
      "Turning a framed photo: first you flip it along the diagonal, then mirror it left-to-right — the combination lands it a quarter-turn clockwise.",
    visualExplanation:
      "[[1,2],[3,4]] → transpose [[1,3],[2,4]] → reverse rows [[3,1],[4,2]]",
    approaches: [
      {
        title: "Copy into a new matrix",
        tier: "Brute Force",
        idea: "Place element (r,c) at (c, n-1-r) in a fresh matrix, then copy back.",
        steps: ["Allocate n×n result", "result[c][n-1-r] = matrix[r][c]", "Copy back"],
        time: "O(n²)",
        space: "O(n²)",
      },
      {
        title: "Transpose then reverse rows",
        tier: "Optimal",
        idea: "Swap across the diagonal, then reverse each row — both in place.",
        steps: ["For i<j swap matrix[i][j] and matrix[j][i]", "Reverse every row"],
        time: "O(n²)",
        space: "O(1)",
      },
    ],
    dryRun:
      "[[1,2,3],[4,5,6],[7,8,9]]\ntranspose→[[1,4,7],[2,5,8],[3,6,9]]\nreverse rows→[[7,4,1],[8,5,2],[9,6,3]]",
    interviewTips: [
      "State the identity: clockwise = transpose + reverse rows; anticlockwise = transpose + reverse columns.",
      "Only swap for j>i during transpose, or you'll undo your own swaps.",
    ],
    commonMistakes: [
      "Transposing the full matrix (j from 0) which double-swaps back to the original.",
      "Reversing columns instead of rows for clockwise.",
    ],
    followUps: ["Rotate counter-clockwise.", "Rotate a non-square m×n matrix (needs new storage)."],
    related: ["spiral-matrix"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rotate(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()
    return matrix`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t;
            }
        for (int i = 0; i < n; i++)
            for (int l = 0, r = n - 1; l < r; l++, r--) {
                int t = matrix[i][l]; matrix[i][l] = matrix[i][r]; matrix[i][r] = t;
            }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  for (const row of matrix) row.reverse();
  return matrix;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void rotate(List<List<Integer>> matrix) {
        Integer n = matrix.size();
        for (Integer i = 0; i < n; i++)
            for (Integer j = i + 1; j < n; j++) {
                Integer t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t;
            }
        for (Integer i = 0; i < n; i++) {
            Integer l = 0, r = n - 1;
            while (l < r) {
                Integer t = matrix[i][l]; matrix[i][l] = matrix[i][r]; matrix[i][r] = t;
                l++; r--;
            }
        }
    }
}`,
      },
    ],
  },
  {
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["microsoft", "amazon", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an m×n matrix, return all its elements in spiral order (clockwise, starting top-left).",
    beginnerExplanation:
      "Peel the matrix like an onion. Keep four boundaries — top, bottom, left, right — and walk right, down, left, up, shrinking a boundary after each edge until they cross.",
    realWorldAnalogy:
      "Walking the perimeter of a room collecting items, then stepping inward and circling again — each loop tighter than the last.",
    visualExplanation:
      "[[1,2,3],[4,5,6],[7,8,9]] → 1 2 3 (top) → 6 9 (right) → 8 7 (bottom) → 4 (left) → 5 (center)",
    approaches: [
      {
        title: "Boundary simulation",
        tier: "Optimal",
        idea: "Track top/bottom/left/right; traverse each edge then move the boundary inward.",
        steps: [
          "Left→right along top, then top++",
          "Top→bottom along right, then right--",
          "If rows remain, right→left along bottom, bottom--",
          "If cols remain, bottom→top along left, left++",
        ],
        time: "O(m·n)",
        space: "O(1) extra (besides output)",
      },
    ],
    dryRun:
      "[[1,2],[3,4]]\ntop row 1,2 (top=1)\nright col 4 (right=0)\nbottom row 3 (bottom=0)\n⇒ [1,2,4,3]",
    interviewTips: [
      "The two `if` guards (before the bottom and left passes) prevent re-reading a single remaining row/column.",
      "Walk through a non-square example to prove the guards matter.",
    ],
    commonMistakes: [
      "Missing the guards, causing duplicates on thin matrices.",
      "Off-by-one in the inclusive boundary ranges.",
    ],
    followUps: ["Generate a spiral matrix from 1..n² (Spiral Matrix II)."],
    related: ["rotate-image"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def spiral_order(matrix):
    res = []
    if not matrix:
        return res
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.add(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);
            right--;
            if (top <= bottom) {
                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function spiralOrder(matrix) {
  const res = [];
  if (matrix.length === 0) return res;
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> spiralOrder(List<List<Integer>> matrix) {
        List<Integer> res = new List<Integer>();
        if (matrix.isEmpty()) return res;
        Integer top = 0, bottom = matrix.size() - 1, left = 0, right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            for (Integer c = left; c <= right; c++) res.add(matrix[top][c]);
            top++;
            for (Integer r = top; r <= bottom; r++) res.add(matrix[r][right]);
            right--;
            if (top <= bottom) {
                for (Integer c = right; c >= left; c--) res.add(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (Integer r = bottom; r >= top; r--) res.add(matrix[r][left]);
                left++;
            }
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "Easy",
    patterns: ["dynamic-programming"],
    topics: ["Arrays", "Dynamic Programming"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an integer numRows, return the first numRows of Pascal's triangle, where each number is the sum of the two directly above it.",
    beginnerExplanation:
      "Every row starts and ends with 1; each interior number is the sum of the two numbers above it. So you build each row from the one before — a tiny dynamic-programming relation.",
    realWorldAnalogy:
      "Stacking coins where each coin's value is whatever the two coins resting above it add up to — the whole pyramid grows from the row beneath.",
    visualExplanation:
      "row0: 1\nrow1: 1 1\nrow2: 1 2 1\nrow3: 1 3 3 1  (each interior = sum of two above)",
    approaches: [
      {
        title: "Build row from previous",
        tier: "Optimal",
        idea: "Each row i has i+1 entries; interior entry j = prev[j-1] + prev[j].",
        steps: ["Start each row with all 1s", "Fill interior from the previous row", "Append the row"],
        time: "O(numRows²)",
        space: "O(1) extra (besides output)",
      },
    ],
    dryRun:
      "numRows=3\nrow0=[1]\nrow1=[1,1]\nrow2: [1, (1+1)=2, 1] ⇒ [[1],[1,1],[1,2,1]]",
    interviewTips: [
      "Note that entry (i,j) is the binomial coefficient C(i,j) — useful if asked for a single value.",
      "Initialising the row with 1s removes the need to special-case the ends.",
    ],
    commonMistakes: ["Indexing the previous row out of bounds at the edges.", "Off-by-one in the row length."],
    followUps: ["Return only the k-th row using O(k) space.", "Compute a single Pascal value via the binomial formula."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def generate(num_rows):
    res = []
    for i in range(num_rows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = res[i - 1][j - 1] + res[i - 1][j]
        res.append(row)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
            }
            res.add(row);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function generate(numRows) {
  const res = [];
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) row[j] = res[i - 1][j - 1] + res[i - 1][j];
    res.push(row);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<List<Integer>> generate(Integer numRows) {
        List<List<Integer>> res = new List<List<Integer>>();
        for (Integer i = 0; i < numRows; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(res[i - 1][j - 1] + res[i - 1][j]);
            }
            res.add(row);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "sort-colors",
    title: "Sort Colors",
    difficulty: "Medium",
    patterns: ["two-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "microsoft", "meta"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an array with values 0, 1, and 2 (representing colors), sort it in place in a single pass without using a library sort.",
    beginnerExplanation:
      "This is the Dutch National Flag problem. With three buckets you keep three pointers: everything before `low` is 0, everything after `high` is 2, and you sweep `mid` forward placing each value into its region.",
    realWorldAnalogy:
      "Sorting a tray of red, white, and blue marbles by pushing reds to the left wall and blues to the right wall as you scan once across the middle.",
    visualExplanation:
      "[2,0,1] low=0 mid=0 high=2\nmid=2→swap with high→[1,0,2] high=1\nmid val1→mid=1\nmid val0→swap low→[0,1,2] low,mid=2 ⇒ done",
    approaches: [
      {
        title: "Counting sort (two pass)",
        tier: "Better",
        idea: "Count 0s,1s,2s then overwrite the array.",
        steps: ["Count each color", "Rewrite array in order"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Dutch National Flag (one pass)",
        tier: "Optimal",
        idea: "Three pointers low/mid/high partition into <1, ==1, >1 in a single sweep.",
        steps: [
          "0 → swap to low, advance low and mid",
          "1 → advance mid",
          "2 → swap to high, shrink high (don't advance mid)",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "[1,2,0]\nmid val1→mid1\nmid val2→swap high→[1,0,2] high1\nmid(1) val0→swap low→[0,1,2] low1 mid2>high1 stop",
    interviewTips: [
      "Say 'Dutch National Flag' — it's the canonical name and shows you know the one-pass solution.",
      "Key subtlety: after swapping a 2 to the back, do NOT advance mid — the swapped-in value is unexamined.",
    ],
    commonMistakes: [
      "Advancing mid after the high-swap, skipping an unchecked value.",
      "Falling back to a built-in sort when a one-pass partition is expected.",
    ],
    followUps: ["Sort k colors / a small fixed range of keys.", "Partition around a pivot (quicksort's core)."],
    related: ["next-permutation"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;
                low++; mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;
                high--;
            }
        }
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static void sortColors(List<Integer> nums) {
        Integer low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                Integer t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;
                low++; mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                Integer t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;
                high--;
            }
        }
    }
}`,
      },
    ],
  },
  {
    slug: "find-peak-element",
    title: "Find Peak Element",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["google", "amazon", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "A peak element is strictly greater than its neighbors. Given `nums` where nums[-1] = nums[n] = −∞, return the index of any peak in O(log n).",
    beginnerExplanation:
      "Even though the array isn't sorted, you can still binary-search: compare the middle to its right neighbor. If it's rising, a peak must lie to the right; if falling, a peak lies at mid or to the left. You always move toward higher ground.",
    realWorldAnalogy:
      "Hiking blindfolded: feel the slope under your feet. If the ground rises ahead, keep walking that way; eventually you reach a summit — guaranteed because the edges drop to −∞.",
    visualExplanation:
      "nums=[1,2,1,3,5,6,4]\nmid=3 val3 < nums[4]=5 rising → go right\nmid=5 val6 > nums[6]=4 falling → hi=5\nmid=4 val5 < 6 rising → lo=5 ⇒ index5 (value6)",
    approaches: [
      {
        title: "Linear scan",
        tier: "Brute Force",
        idea: "Return the first index greater than both neighbors.",
        steps: ["Scan; check nums[i] > nums[i-1] and > nums[i+1]"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Binary search on the slope",
        tier: "Optimal",
        idea: "Move toward the higher neighbor; a peak must exist in that direction.",
        steps: [
          "lo=0, hi=n−1",
          "mid: if nums[mid] < nums[mid+1] go right (lo=mid+1) else hi=mid",
          "Converge to a peak index",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[1,2,3,1]\nlo0 hi3 mid1 val2<nums[2]=3 → lo2\nlo2 hi3 mid2 val3>nums[3]=1 → hi2 ⇒ index2",
    interviewTips: [
      "Explain why binary search is valid without sorting: the −∞ borders guarantee a peak in the uphill direction.",
      "Use hi=mid (not mid−1) since mid itself can be the peak.",
    ],
    commonMistakes: [
      "Setting hi = mid − 1 and skipping a valid peak at mid.",
      "Reading nums[mid+1] out of bounds — the lo<hi loop avoids it.",
    ],
    followUps: ["Find a peak in a 2D grid.", "Return all peaks."],
    related: [],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_peak_element(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findPeakElement(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < nums[mid + 1]) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] < nums[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findPeakElement(List<Integer> nums) {
        Integer lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (nums[mid] < nums[mid + 1]) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      },
    ],
  },
  {
    slug: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 3,
    statement:
      "Given an m×n matrix where each row is sorted left-to-right and the first element of each row is greater than the last of the previous row, determine if a target exists. Run in O(log(m·n)).",
    beginnerExplanation:
      "Because the rows chain together, the whole matrix behaves like one long sorted array. Binary-search over indices 0..m·n−1 and convert each flat index back to (row, col) with division and modulo.",
    realWorldAnalogy:
      "A multi-page dictionary where each page continues where the last left off — you can binary-search the whole book by word position, then flip to the right page and line.",
    visualExplanation:
      "[[1,3,5],[7,9,11]] target=9\nflatten len6, lo0 hi5 mid2 → (0,2)=5<9 lo3\nmid4 → (1,1)=9 ✓",
    approaches: [
      {
        title: "Scan every cell",
        tier: "Brute Force",
        idea: "Linear search all m·n cells.",
        steps: ["Check each cell for target"],
        time: "O(m·n)",
        space: "O(1)",
      },
      {
        title: "Binary search the flattened index",
        tier: "Optimal",
        idea: "Map a 1-D index mid to matrix[mid/cols][mid%cols].",
        steps: ["lo=0, hi=m·n−1", "mid → (mid/cols, mid%cols)", "Compare and move lo/hi"],
        time: "O(log(m·n))",
        space: "O(1)",
      },
    ],
    dryRun:
      "[[1,3],[5,7]] target=5\nlo0 hi3 mid1 →(0,1)=3<5 lo2\nmid2 →(1,0)=5 ✓ true",
    interviewTips: [
      "The index math is the crux: row = mid / cols, col = mid % cols.",
      "If only rows are sorted (not chained), use the staircase O(m+n) search instead.",
    ],
    commonMistakes: [
      "Using rows instead of cols in the divmod conversion.",
      "Applying this when the matrix isn't fully chained (then it's a different problem).",
    ],
    followUps: ["Search a 2D Matrix II (rows and columns sorted, not chained) — staircase search."],
    related: ["binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def search_matrix(matrix, target):
    rows, cols = len(matrix), len(matrix[0])
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // cols][mid % cols]
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length, cols = matrix[0].length;
        int lo = 0, hi = rows * cols - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int val = matrix[mid / cols][mid % cols];
            if (val == target) return true;
            if (val < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function searchMatrix(matrix, target) {
  const rows = matrix.length, cols = matrix[0].length;
  let lo = 0, hi = rows * cols - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    const val = matrix[Math.floor(mid / cols)][mid % cols];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean searchMatrix(List<List<Integer>> matrix, Integer target) {
        Integer rows = matrix.size(), cols = matrix[0].size();
        Integer lo = 0, hi = rows * cols - 1;
        while (lo <= hi) {
            Integer mid = lo + (hi - lo) / 2;
            Integer val = matrix[mid / cols][Math.mod(mid, cols)];
            if (val == target) return true;
            if (val < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
}`,
      },
    ],
  },
  {
    slug: "find-the-duplicate-number",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    patterns: ["fast-slow-pointers"],
    topics: ["Arrays"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an array `nums` of n+1 integers where each value is in [1, n], exactly one value is repeated (possibly multiple times). Find it without modifying the array and using O(1) extra space.",
    beginnerExplanation:
      "Treat each value as a 'next index' pointer: i → nums[i]. Because a value repeats, two indices point to the same place, which creates a cycle. Floyd's tortoise-and-hare finds the cycle's entry — and that entry is the duplicate.",
    realWorldAnalogy:
      "Following a chain of forwarding addresses where two people share the same forwarding address — eventually the trail loops. The spot where the loop starts is the shared (duplicate) address.",
    visualExplanation:
      "nums=[1,3,4,2,2] index→value links form a cycle; Floyd meets inside, reset one pointer to start → both meet at 2 (the duplicate)",
    approaches: [
      {
        title: "Sort or hash set",
        tier: "Better",
        idea: "Sort and look for adjacent equals, or track seen values in a set.",
        steps: ["Sort/scan or insert into a set", "Return the first repeat"],
        time: "O(n log n) / O(n)",
        space: "O(1) sort (mutates) / O(n) set",
      },
      {
        title: "Floyd's cycle detection",
        tier: "Optimal",
        idea: "Indices→values form a linked list with a cycle; the cycle entry is the duplicate.",
        steps: [
          "Phase 1: slow=nums[slow], fast=nums[nums[fast]] until they meet",
          "Phase 2: reset slow to start; advance both by one until they meet",
          "Meeting point is the duplicate",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[3,1,3,4,2]\nphase1 slow/fast meet inside cycle\nphase2 reset slow=nums[0]=3; step both → meet at 3 ⇒ duplicate 3",
    interviewTips: [
      "The clever framing — array as a functional graph — is what they're testing; name Floyd's algorithm.",
      "Constraints (values in [1,n], read-only, O(1) space) are the hint that rules out sort/hash.",
    ],
    commonMistakes: [
      "Advancing slow and fast at the same speed in phase 1.",
      "Forgetting to reset one pointer to the start before phase 2.",
    ],
    followUps: ["Prove the cycle must exist by pigeonhole.", "What if multiple distinct duplicates were allowed?"],
    related: ["linked-list-cycle"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_duplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer findDuplicate(List<Integer> nums) {
        Integer slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
      },
    ],
  },
  {
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Arrays", "Dynamic Programming"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver", "neetcode150", "blind75"],
    frequency: 4,
    statement:
      "Given an integer array `nums`, find the contiguous subarray with the largest product and return that product.",
    beginnerExplanation:
      "Unlike sums, a negative number can flip a tiny product into a huge one. So at each step you track BOTH the largest and the smallest (most negative) product ending here — because today's minimum might become tomorrow's maximum after multiplying by a negative.",
    realWorldAnalogy:
      "Tracking a stock's compounding returns where a big loss (negative) followed by another big loss becomes a gain — you keep your worst running multiple around because it can turn into your best.",
    visualExplanation:
      "nums=[2,3,-2,4]\nmax:2,6,-2→max(-2,...) ,4 ; product of [2,3]=6 is the answer ⇒ 6",
    approaches: [
      {
        title: "All subarray products",
        tier: "Brute Force",
        idea: "Compute the product of every subarray.",
        steps: ["For each start, extend end multiplying", "Track the global max"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Track running max and min",
        tier: "Optimal",
        idea: "Maintain curMax and curMin; on a negative number swap them before updating.",
        steps: [
          "Init res=curMax=curMin=nums[0]",
          "If n<0 swap curMax,curMin",
          "curMax=max(n, curMax*n); curMin=min(n, curMin*n)",
          "res=max(res, curMax)",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "nums=[-2,3,-4]\nstart res=-2 max=-2 min=-2\nn=3: max=max(3,-6)=3 min=min(3,-6)=-6 res=3\nn=-4<0 swap→max=-6 min=3; max=max(-4,24)=24 min=min(-4,-12)=-12 res=24 ⇒ 24",
    interviewTips: [
      "The single insight worth stating: keep the minimum too, because a negative flips min↔max.",
      "Watch zeros — they reset the running products (max(n, ...) handles this naturally).",
    ],
    commonMistakes: [
      "Tracking only the max (fails on negatives).",
      "Updating curMax before reading the old value when swapping.",
    ],
    followUps: ["Maximum sum subarray (Kadane).", "Product of array except self."],
    related: ["maximum-subarray", "product-of-array-except-self"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def max_product(nums):
    res = cur_max = cur_min = nums[0]
    for n in nums[1:]:
        if n < 0:
            cur_max, cur_min = cur_min, cur_max
        cur_max = max(n, cur_max * n)
        cur_min = min(n, cur_min * n)
        res = max(res, cur_max)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0], curMax = nums[0], curMin = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int n = nums[i];
            if (n < 0) { int t = curMax; curMax = curMin; curMin = t; }
            curMax = Math.max(n, curMax * n);
            curMin = Math.min(n, curMin * n);
            res = Math.max(res, curMax);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maxProduct(nums) {
  let res = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    if (n < 0) [curMax, curMin] = [curMin, curMax];
    curMax = Math.max(n, curMax * n);
    curMin = Math.min(n, curMin * n);
    res = Math.max(res, curMax);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maxProduct(List<Integer> nums) {
        Integer res = nums[0], curMax = nums[0], curMin = nums[0];
        for (Integer i = 1; i < nums.size(); i++) {
            Integer n = nums[i];
            if (n < 0) { Integer t = curMax; curMax = curMin; curMin = t; }
            curMax = Math.max(n, curMax * n);
            curMin = Math.min(n, curMin * n);
            res = Math.max(res, curMax);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "single-element-in-a-sorted-array",
    title: "Single Element in a Sorted Array",
    difficulty: "Medium",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "In a sorted array where every element appears exactly twice except one, find the single element in O(log n) time and O(1) space.",
    beginnerExplanation:
      "Before the single element, each pair starts at an even index (0,2,4…). After it, that alignment shifts by one. Binary-search for where the pairing breaks: compare the middle (snapped to an even index) with its partner.",
    realWorldAnalogy:
      "Couples seated two-per-bench. Up to the lone person, every bench's left seat is even-numbered; past them the pattern slips. You binary-search for the first slipped bench.",
    visualExplanation:
      "[1,1,2,3,3,4,4] even-index pairs hold until the 2; mid snapped even compares with mid+1 to pick the broken half ⇒ 2",
    approaches: [
      {
        title: "XOR everything",
        tier: "Better",
        idea: "XOR all elements; pairs cancel, leaving the single. (O(n), ignores sortedness.)",
        steps: ["Fold with XOR", "Result is the unique element"],
        time: "O(n)",
        space: "O(1)",
      },
      {
        title: "Binary search on pair parity",
        tier: "Optimal",
        idea: "Snap mid to an even index; if nums[mid]==nums[mid+1] the single is to the right.",
        steps: [
          "lo=0, hi=n−1",
          "mid; if mid odd, mid-=1",
          "If nums[mid]==nums[mid+1] lo=mid+2 else hi=mid",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "[1,1,2,2,3]\nlo0 hi4 mid2(even) nums[2]=2==nums[3]=2 → lo=4\nlo4==hi4 ⇒ nums[4]=3",
    interviewTips: [
      "Mention both: XOR is O(n) and elegant, but binary search hits the O(log n) the prompt wants.",
      "Snapping mid to even keeps the 'compare with the next' invariant clean.",
    ],
    commonMistakes: [
      "Comparing with nums[mid−1] without parity handling.",
      "Using lo=mid+1 instead of mid+2 and re-examining a matched pair.",
    ],
    followUps: ["Single Number where elements appear three times.", "Two single numbers among pairs."],
    related: ["single-number", "binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def single_non_duplicate(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if mid % 2 == 1:
            mid -= 1
        if nums[mid] == nums[mid + 1]:
            lo = mid + 2
        else:
            hi = mid
    return nums[lo]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int singleNonDuplicate(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (mid % 2 == 1) mid--;
            if (nums[mid] == nums[mid + 1]) lo = mid + 2;
            else hi = mid;
        }
        return nums[lo];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function singleNonDuplicate(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    let mid = lo + ((hi - lo) >> 1);
    if (mid % 2 === 1) mid--;
    if (nums[mid] === nums[mid + 1]) lo = mid + 2;
    else hi = mid;
  }
  return nums[lo];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer singleNonDuplicate(List<Integer> nums) {
        Integer lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            Integer mid = lo + (hi - lo) / 2;
            if (Math.mod(mid, 2) == 1) mid--;
            if (nums[mid] == nums[mid + 1]) lo = mid + 2;
            else hi = mid;
        }
        return nums[lo];
    }
}`,
      },
    ],
  },
  {
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    patterns: ["binary-search"],
    topics: ["Arrays", "Binary Search"],
    companies: ["google", "amazon", "microsoft", "apple"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given two sorted arrays, return the median of their combined elements in O(log(min(m, n))) time.",
    beginnerExplanation:
      "Don't merge — that's O(m+n). Instead binary-search a partition of the smaller array: pick how many of its elements go to the 'left half' of the merged array; the rest of the left half comes from the other array. The partition is correct when every left element ≤ every right element.",
    realWorldAnalogy:
      "Splitting two sorted decks into a combined bottom half and top half without merging — you slide the cut on the small deck until the largest card below the cut is no bigger than the smallest card above it on either deck.",
    visualExplanation:
      "a=[1,3] b=[2] half=2; try i=1 (a left={1}), j=1 (b left={2})\naLeft=1≤bRight(∞), bLeft=2≤aRight=3 ✓ odd → max(1,2)=2",
    approaches: [
      {
        title: "Merge and pick middle",
        tier: "Brute Force",
        idea: "Merge both sorted arrays, return the middle element(s).",
        steps: ["Two-pointer merge", "Index the median"],
        time: "O(m+n)",
        space: "O(m+n)",
      },
      {
        title: "Binary search the partition",
        tier: "Optimal",
        idea: "Binary search the cut on the smaller array so left-half maxes ≤ right-half mins.",
        steps: [
          "Ensure a is the smaller array; half=(m+n+1)/2",
          "Search i in [0,m]; j=half−i",
          "Check aLeft≤bRight and bLeft≤aRight; else move the cut",
          "Combine boundary values for the median",
        ],
        time: "O(log(min(m,n)))",
        space: "O(1)",
      },
    ],
    dryRun:
      "a=[1,2] b=[3,4] half=2\ni=1 j=1: aLeft=1 aRight=2 bLeft=3 bRight=4 → bLeft>aRight → lo=i+1\ni=2 j=0: aLeft=2 aRight=∞ bLeft=−∞ bRight=3 ✓ even → (max(2,−∞)+min(∞,3))/2=(2+3)/2=2.5",
    interviewTips: [
      "Always binary-search the SMALLER array to bound the work at O(log(min(m,n))).",
      "Use ±infinity sentinels for the empty-partition edges to avoid bound checks.",
    ],
    commonMistakes: [
      "Off-by-one in half = (m+n+1)/2 (the +1 makes odd lengths land the median on the left).",
      "Integer overflow / wrong sentinels at the partition edges.",
    ],
    followUps: ["k-th smallest element of two sorted arrays.", "Median of a data stream (two heaps)."],
    related: ["binary-search"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_median_sorted_arrays(a, b):
    if len(a) > len(b):
        a, b = b, a
    m, n = len(a), len(b)
    lo, hi, half = 0, m, (m + n + 1) // 2
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        a_left = a[i - 1] if i > 0 else float("-inf")
        a_right = a[i] if i < m else float("inf")
        b_left = b[j - 1] if j > 0 else float("-inf")
        b_right = b[j] if j < n else float("inf")
        if a_left <= b_right and b_left <= a_right:
            if (m + n) % 2 == 1:
                return float(max(a_left, b_left))
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        if a_left > b_right:
            hi = i - 1
        else:
            lo = i + 1
    return 0.0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public double findMedianSortedArrays(int[] a, int[] b) {
        if (a.length > b.length) { int[] t = a; a = b; b = t; }
        int m = a.length, n = b.length;
        int lo = 0, hi = m, half = (m + n + 1) / 2;
        while (lo <= hi) {
            int i = (lo + hi) / 2;
            int j = half - i;
            int aLeft = i > 0 ? a[i - 1] : Integer.MIN_VALUE;
            int aRight = i < m ? a[i] : Integer.MAX_VALUE;
            int bLeft = j > 0 ? b[j - 1] : Integer.MIN_VALUE;
            int bRight = j < n ? b[j] : Integer.MAX_VALUE;
            if (aLeft <= bRight && bLeft <= aRight) {
                if (((m + n) & 1) == 1) return Math.max(aLeft, bLeft);
                return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2.0;
            } else if (aLeft > bRight) hi = i - 1;
            else lo = i + 1;
        }
        return 0.0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a];
  const m = a.length, n = b.length;
  let lo = 0, hi = m;
  const half = Math.floor((m + n + 1) / 2);
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2);
    const j = half - i;
    const aLeft = i > 0 ? a[i - 1] : -Infinity;
    const aRight = i < m ? a[i] : Infinity;
    const bLeft = j > 0 ? b[j - 1] : -Infinity;
    const bRight = j < n ? b[j] : Infinity;
    if (aLeft <= bRight && bLeft <= aRight) {
      if ((m + n) % 2 === 1) return Math.max(aLeft, bLeft);
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    } else if (aLeft > bRight) hi = i - 1;
    else lo = i + 1;
  }
  return 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Decimal findMedianSortedArrays(List<Integer> a, List<Integer> b) {
        if (a.size() > b.size()) { List<Integer> t = a; a = b; b = t; }
        Integer m = a.size(), n = b.size();
        Integer lo = 0, hi = m, half = (m + n + 1) / 2;
        Integer NEG = -2147483648, POS = 2147483647;
        while (lo <= hi) {
            Integer i = (lo + hi) / 2;
            Integer j = half - i;
            Integer aLeft = i > 0 ? a[i - 1] : NEG;
            Integer aRight = i < m ? a[i] : POS;
            Integer bLeft = j > 0 ? b[j - 1] : NEG;
            Integer bRight = j < n ? b[j] : POS;
            if (aLeft <= bRight && bLeft <= aRight) {
                if (Math.mod(m + n, 2) == 1) return Math.max(aLeft, bLeft);
                return ((Decimal) (Math.max(aLeft, bLeft) + Math.min(aRight, bRight))) / 2;
            } else if (aLeft > bRight) {
                hi = i - 1;
            } else {
                lo = i + 1;
            }
        }
        return 0;
    }
}`,
      },
    ],
  },
  {
    slug: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    patterns: ["prefix-sum", "hashing"],
    topics: ["Arrays", "Hashing"],
    companies: ["amazon", "meta", "google"],
    sheets: ["striver", "neetcode150"],
    frequency: 4,
    statement:
      "Given an integer array `nums` and an integer k, return the total number of contiguous subarrays whose sum equals k.",
    beginnerExplanation:
      "Track the running prefix sum. A subarray summing to k ends at index i whenever some earlier prefix equals (current prefix − k). Keep a count of every prefix sum seen so far in a hash map, and add up the matches.",
    realWorldAnalogy:
      "Running totals on a receipt: to find stretches that add to $k, at each line you ask 'have I seen a running total exactly $k smaller before?' — each such earlier point marks a qualifying stretch.",
    visualExplanation:
      "nums=[1,1,1] k=2\nprefix:1→need-1(0)  2→need0(seen once)+1  3→need1(seen once)+1 ⇒ 2 subarrays",
    approaches: [
      {
        title: "Check every subarray",
        tier: "Brute Force",
        idea: "Sum each subarray and count those equal to k.",
        steps: ["For each start, extend end accumulating", "Count sums == k"],
        time: "O(n²)",
        space: "O(1)",
      },
      {
        title: "Prefix sum + hash map",
        tier: "Optimal",
        idea: "Count how many earlier prefixes equal (prefix − k).",
        steps: [
          "seen = {0:1}, prefix=0, count=0",
          "prefix += num; count += seen[prefix − k]",
          "seen[prefix] += 1",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun:
      "nums=[1,-1,0] k=0\nseen{0:1} prefix1 need1→0; seen{0:1,1:1}\nprefix0 need0→1 (count1); seen{0:2,1:1}\nprefix0 need0→2 (count3) ⇒ 3",
    interviewTips: [
      "Seed the map with {0:1} so subarrays starting at index 0 are counted.",
      "Works with negatives (where sliding window fails) precisely because it uses prefix sums.",
    ],
    commonMistakes: [
      "Forgetting the {0:1} seed.",
      "Reaching for a sliding window — it breaks once negatives are allowed.",
    ],
    followUps: ["Longest subarray summing to k.", "Binary subarrays / count with at most k (window variants)."],
    related: ["maximum-subarray"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subarray_sum(nums, k):
    seen = {0: 1}
    prefix = count = 0
    for n in nums:
        prefix += n
        count += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, 1);
        int prefix = 0, count = 0;
        for (int n : nums) {
            prefix += n;
            count += seen.getOrDefault(prefix - k, 0);
            seen.put(prefix, seen.getOrDefault(prefix, 0) + 1);
        }
        return count;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let prefix = 0, count = 0;
  for (const n of nums) {
    prefix += n;
    count += seen.get(prefix - k) || 0;
    seen.set(prefix, (seen.get(prefix) || 0) + 1);
  }
  return count;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer subarraySum(List<Integer> nums, Integer k) {
        Map<Integer, Integer> seen = new Map<Integer, Integer>();
        seen.put(0, 1);
        Integer prefix = 0, count = 0;
        for (Integer n : nums) {
            prefix += n;
            if (seen.containsKey(prefix - k)) count += seen.get(prefix - k);
            seen.put(prefix, (seen.containsKey(prefix) ? seen.get(prefix) : 0) + 1);
        }
        return count;
    }
}`,
      },
    ],
  },
];

import type { Problem } from "@/lib/types";

// Striver A2Z — Dynamic Programming (1-D / grid / knapsack family).
export const PROBLEMS_BATCH_T: Problem[] = [
  {
    slug: "nth-fibonacci-number",
    title: "Nth Fibonacci Number",
    difficulty: "Easy",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming", "Recursion"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given `n`, return the n-th Fibonacci number where F(0)=0, F(1)=1 and F(n)=F(n-1)+F(n-2). This is the gateway problem to all of dynamic programming.",
    beginnerExplanation:
      "Each Fibonacci number is just the sum of the previous two. The naive recursion recomputes the same values exponentially; DP says 'compute each once and remember it'. Since only the last two values matter, you can keep two variables.",
    realWorldAnalogy:
      "Climbing a ladder where each rung's height is the sum of the two below it — once you know two consecutive rungs, every rung above is determined.",
    visualExplanation: "n: 0 1 2 3 4 5 6\nF: 0 1 1 2 3 5 8   (each = sum of previous two)",
    approaches: [
      {
        title: "Naive recursion",
        tier: "Brute Force",
        idea: "Directly recurse F(n)=F(n-1)+F(n-2), recomputing everything.",
        steps: ["Base: F(0)=0, F(1)=1", "Return F(n-1)+F(n-2)"],
        time: "O(2ⁿ)",
        space: "O(n) stack",
      },
      {
        title: "Memoized / tabulated",
        tier: "Better",
        idea: "Cache each computed F(i) so it is evaluated exactly once.",
        steps: ["dp[0]=0, dp[1]=1", "dp[i]=dp[i-1]+dp[i-2]"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two rolling variables",
        tier: "Optimal",
        idea: "Only the previous two values are needed, so keep two variables.",
        steps: ["a=0, b=1", "Repeat n times: a, b = b, a+b", "Return a"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "n=5\na,b: (0,1)->(1,1)->(1,2)->(2,3)->(3,5)->(5,8)  return a=5",
    interviewTips: [
      "Name the optimisation explicitly: overlapping subproblems + optimal substructure → DP.",
      "Show the space reduction from O(n) to O(1) — interviewers love it.",
    ],
    commonMistakes: ["Wrong base cases (F(0) vs F(1)).", "Off-by-one in the loop count."],
    followUps: ["Tribonacci.", "Fibonacci mod m (Pisano period).", "Matrix-exponentiation O(log n)."],
    related: ["climbing-stairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int fib(int n) {
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return a;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function fib(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer fib(Integer n) {
        Integer a = 0, b = 1;
        for (Integer i = 0; i < n; i++) {
            Integer next = a + b;
            a = b;
            b = next;
        }
        return a;
    }
}`,
      },
    ],
  },
  {
    slug: "frog-jump",
    title: "Frog Jump",
    difficulty: "Easy",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "A frog is on stair 0 and wants to reach stair n-1. From stair i it can jump to i+1 or i+2, paying |height[i]-height[j]| energy. Return the minimum total energy to reach the last stair.",
    beginnerExplanation:
      "The cheapest way to reach stair i is the cheaper of: coming from i-1 (paying the height gap) or from i-2. So each stair's best cost depends only on the two before it — classic 1-D DP, and you only need two variables.",
    realWorldAnalogy:
      "Hopping across stepping stones of different heights — at each stone you pick whether the last hop came from one stone back or two, whichever bruised your legs less.",
    visualExplanation:
      "height=[30,10,60,10,60,50]\ndp:    0  20 30 ...  -> dp[i]=min(dp[i-1]+|h[i]-h[i-1]|, dp[i-2]+|h[i]-h[i-2]|)",
    approaches: [
      {
        title: "Recursion",
        tier: "Brute Force",
        idea: "f(i)=min(f(i-1)+cost1, f(i-2)+cost2).",
        steps: ["Base f(0)=0", "Recurse from n-1"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "Tabulation",
        tier: "Better",
        idea: "Fill dp[0..n-1] left to right.",
        steps: ["dp[0]=0", "dp[i]=min(dp[i-1]+|h[i]-h[i-1]|, dp[i-2]+|h[i]-h[i-2]|)"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Two variables",
        tier: "Optimal",
        idea: "Keep only dp[i-1] and dp[i-2].",
        steps: ["prev2=0, prev1=0", "Slide forward computing cur", "Return prev1"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "height=[10,20,30,10]\ndp0=0\ndp1=|20-10|=10\ndp2=min(10+10, 0+20)=20\ndp3=min(20+20, 10+0)=10 -> 10",
    interviewTips: [
      "Define the state in words first: dp[i] = min energy to reach stair i.",
      "Watch the i=1 case (only one predecessor exists).",
    ],
    commonMistakes: ["Using i+1/i+2 forward indexing inconsistently with the base case.", "Forgetting the absolute value."],
    followUps: ["K jumps (next problem).", "Reconstruct the actual jump path."],
    related: ["frog-jump-with-k-distances", "climbing-stairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def frog_jump(height):
    n = len(height)
    prev2, prev1 = 0, 0
    for i in range(1, n):
        jump1 = prev1 + abs(height[i] - height[i - 1])
        jump2 = float("inf")
        if i > 1:
            jump2 = prev2 + abs(height[i] - height[i - 2])
        cur = min(jump1, jump2)
        prev2, prev1 = prev1, cur
    return prev1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int frogJump(int[] height) {
        int n = height.length, prev2 = 0, prev1 = 0;
        for (int i = 1; i < n; i++) {
            int jump1 = prev1 + Math.abs(height[i] - height[i - 1]);
            int jump2 = Integer.MAX_VALUE;
            if (i > 1) jump2 = prev2 + Math.abs(height[i] - height[i - 2]);
            int cur = Math.min(jump1, jump2);
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
        code: `function frogJump(height) {
  let prev2 = 0, prev1 = 0;
  for (let i = 1; i < height.length; i++) {
    const jump1 = prev1 + Math.abs(height[i] - height[i - 1]);
    const jump2 = i > 1 ? prev2 + Math.abs(height[i] - height[i - 2]) : Infinity;
    const cur = Math.min(jump1, jump2);
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
    public static Integer frogJump(List<Integer> height) {
        Integer n = height.size(), prev2 = 0, prev1 = 0;
        for (Integer i = 1; i < n; i++) {
            Integer jump1 = prev1 + Math.abs(height[i] - height[i - 1]);
            Integer jump2 = 2147483647;
            if (i > 1) jump2 = prev2 + Math.abs(height[i] - height[i - 2]);
            Integer cur = Math.min(jump1, jump2);
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
    slug: "frog-jump-with-k-distances",
    title: "Frog Jump with K Distances",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Same as Frog Jump, but from stair i the frog may jump to any of i+1, i+2, …, i+k. Return the minimum energy to reach the last stair.",
    beginnerExplanation:
      "Instead of checking just the two previous stairs, you check up to k previous stairs and take the cheapest. The state is still dp[i] = min energy to reach i; only the transition widens to a loop over the last k.",
    realWorldAnalogy:
      "A stronger frog that can leap up to k stones back — at each stone it scans the k reachable launch points and picks the least painful.",
    visualExplanation: "dp[i] = min over j=1..k of ( dp[i-j] + |h[i]-h[i-j]| )",
    approaches: [
      {
        title: "Recursion",
        tier: "Brute Force",
        idea: "f(i) = min over j=1..k of f(i-j)+cost.",
        steps: ["Base f(0)=0", "Try every jump length 1..k"],
        time: "O(kⁿ)",
        space: "O(n)",
      },
      {
        title: "Tabulation",
        tier: "Optimal",
        idea: "dp[i] = min over the last k stairs.",
        steps: ["dp[0]=0", "For each i, loop j=1..k while i-j>=0", "Take the minimum"],
        time: "O(n·k)",
        space: "O(n)",
      },
    ],
    dryRun: "height=[10,30,40,50,20], k=3\ndp0=0 dp1=20 dp2=30 dp3=min(...)=40 dp4=min(dp1+10,dp2+20,dp3+30)=30 -> 30",
    interviewTips: [
      "Mention the complexity moves from O(n) to O(n·k) — the transition is no longer constant.",
      "A monotonic deque can shave it back toward O(n) — good follow-up.",
    ],
    commonMistakes: ["Looping j beyond the array start.", "Recomputing instead of reading dp[i-j]."],
    followUps: ["Optimise the inner min with a sliding-window/deque.", "Count the number of minimum-cost paths."],
    related: ["frog-jump"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def frog_jump_k(height, k):
    n = len(height)
    dp = [0] * n
    for i in range(1, n):
        best = float("inf")
        for j in range(1, k + 1):
            if i - j >= 0:
                best = min(best, dp[i - j] + abs(height[i] - height[i - j]))
        dp[i] = best
    return dp[n - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int frogJumpK(int[] height, int k) {
        int n = height.length;
        int[] dp = new int[n];
        for (int i = 1; i < n; i++) {
            int best = Integer.MAX_VALUE;
            for (int j = 1; j <= k && i - j >= 0; j++) {
                best = Math.min(best, dp[i - j] + Math.abs(height[i] - height[i - j]));
            }
            dp[i] = best;
        }
        return dp[n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function frogJumpK(height, k) {
  const n = height.length, dp = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    let best = Infinity;
    for (let j = 1; j <= k && i - j >= 0; j++) {
      best = Math.min(best, dp[i - j] + Math.abs(height[i] - height[i - j]));
    }
    dp[i] = best;
  }
  return dp[n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer frogJumpK(List<Integer> height, Integer k) {
        Integer n = height.size();
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i < n; i++) dp.add(0);
        for (Integer i = 1; i < n; i++) {
            Integer best = 2147483647;
            for (Integer j = 1; j <= k && i - j >= 0; j++) {
                best = Math.min(best, dp[i - j] + Math.abs(height[i] - height[i - j]));
            }
            dp[i] = best;
        }
        return dp[n - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "ninjas-training",
    title: "Ninja's Training",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Over n days a ninja can do one of 3 activities/day earning points[day][0..2], but cannot do the same activity on two consecutive days. Maximise total points.",
    beginnerExplanation:
      "The choice each day depends on what you did yesterday. So the state is (day, lastActivity). For each day you pick the best activity different from yesterday's, adding today's points. Carry forward the best result per 'last activity'.",
    realWorldAnalogy:
      "Planning a weekly workout where you can't repeat the same muscle group two days running — each day you pick the most rewarding option that isn't yesterday's.",
    visualExplanation: "dp[day][last] = max over task!=last of points[day][task] + dp[day-1][task]",
    approaches: [
      {
        title: "Recursion on (day, last)",
        tier: "Brute Force",
        idea: "Try every non-repeating activity each day.",
        steps: ["f(day,last)=max task≠last of points[day][task]+f(day-1,task)", "Base day 0"],
        time: "O(3ⁿ)",
        space: "O(n)",
      },
      {
        title: "Tabulation, prev row",
        tier: "Optimal",
        idea: "Keep only the previous day's best-per-last array (size 4).",
        steps: ["prev[last] = best ending with 'last' on day 0", "Roll forward each day"],
        time: "O(n·12)",
        space: "O(1)",
      },
    ],
    dryRun:
      "points=[[1,2,5],[3,1,1],[3,3,3]]\nday0 prev=[2,5,5,5]? -> best ignoring last; day2 answer = 11",
    interviewTips: [
      "State the state clearly: (day, last activity done that day).",
      "Use 'last = 3' as a sentinel meaning 'no activity yet' for the first day.",
    ],
    commonMistakes: ["Allowing the same activity on consecutive days.", "Indexing points by the wrong dimension."],
    followUps: ["K activities instead of 3.", "Reconstruct the chosen schedule."],
    related: ["house-robber"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def ninjas_training(points):
    prev = [max(points[0][t] for t in range(3) if t != last) if last != 3 else max(points[0])
            for last in range(4)]
    for day in range(1, len(points)):
        cur = [0, 0, 0, 0]
        for last in range(4):
            best = 0
            for task in range(3):
                if task != last:
                    best = max(best, points[day][task] + prev[task])
            cur[last] = best
        prev = cur
    return prev[3]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int ninjasTraining(int[][] points) {
        int[] prev = new int[4];
        for (int last = 0; last < 4; last++) {
            int best = 0;
            for (int t = 0; t < 3; t++) if (t != last) best = Math.max(best, points[0][t]);
            prev[last] = best;
        }
        for (int day = 1; day < points.length; day++) {
            int[] cur = new int[4];
            for (int last = 0; last < 4; last++) {
                int best = 0;
                for (int t = 0; t < 3; t++) if (t != last) best = Math.max(best, points[day][t] + prev[t]);
                cur[last] = best;
            }
            prev = cur;
        }
        return prev[3];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function ninjasTraining(points) {
  let prev = [0, 0, 0, 0];
  for (let last = 0; last < 4; last++) {
    let best = 0;
    for (let t = 0; t < 3; t++) if (t !== last) best = Math.max(best, points[0][t]);
    prev[last] = best;
  }
  for (let day = 1; day < points.length; day++) {
    const cur = [0, 0, 0, 0];
    for (let last = 0; last < 4; last++) {
      let best = 0;
      for (let t = 0; t < 3; t++) if (t !== last) best = Math.max(best, points[day][t] + prev[t]);
      cur[last] = best;
    }
    prev = cur;
  }
  return prev[3];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer ninjasTraining(List<List<Integer>> points) {
        List<Integer> prev = new List<Integer>{0, 0, 0, 0};
        for (Integer last = 0; last < 4; last++) {
            Integer best = 0;
            for (Integer t = 0; t < 3; t++) if (t != last) best = Math.max(best, points[0][t]);
            prev[last] = best;
        }
        for (Integer day = 1; day < points.size(); day++) {
            List<Integer> cur = new List<Integer>{0, 0, 0, 0};
            for (Integer last = 0; last < 4; last++) {
                Integer best = 0;
                for (Integer t = 0; t < 3; t++) if (t != last) best = Math.max(best, points[day][t] + prev[t]);
                cur[last] = best;
            }
            prev = cur;
        }
        return prev[3];
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-path-sum-in-grid",
    title: "Minimum Path Sum in Grid",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google", "apple"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an m×n grid of non-negative numbers, find a path from top-left to bottom-right that minimises the sum of values, moving only right or down.",
    beginnerExplanation:
      "To reach a cell you must arrive from the cell above or the cell to its left. So the cheapest cost to a cell is its own value plus the cheaper of those two predecessors. Fill the grid row by row.",
    realWorldAnalogy:
      "Driving through a toll grid where you can only go right or down — each junction's cheapest cost is its toll plus the cheaper road feeding into it.",
    visualExplanation: "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])   (first row/col accumulate)",
    approaches: [
      {
        title: "Recursion",
        tier: "Brute Force",
        idea: "f(i,j)=grid[i][j]+min(f(i-1,j),f(i,j-1)).",
        steps: ["Base: out of bounds = ∞, (0,0)=grid[0][0]", "Recurse from bottom-right"],
        time: "O(2^(m+n))",
        space: "O(m+n)",
      },
      {
        title: "Tabulation",
        tier: "Optimal",
        idea: "Fill dp left-to-right, top-to-bottom.",
        steps: ["dp[0][0]=grid[0][0]", "First row/col = running sums", "dp[i][j]=grid+min(up,left)"],
        time: "O(m·n)",
        space: "O(m·n) (O(n) with a rolling row)",
      },
    ],
    dryRun: "grid=[[1,3,1],[1,5,1],[4,2,1]]\ndp last row builds to 7 (1→3→1→1→1)... answer 7",
    interviewTips: [
      "Clarify allowed moves (right/down only vs 4-directional — the latter needs Dijkstra).",
      "Mention the O(n) rolling-row space optimisation.",
    ],
    commonMistakes: ["Mishandling the first row/column (only one predecessor).", "Allowing up/left moves."],
    followUps: ["Count paths (Unique Paths).", "4-directional movement → Dijkstra.", "Maximum path sum variant."],
    related: ["unique-paths", "triangle-minimum-path-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                dp[i][j] = grid[i][j]
            else:
                up = dp[i - 1][j] if i > 0 else float("inf")
                left = dp[i][j - 1] if j > 0 else float("inf")
                dp[i][j] = grid[i][j] + min(up, left)
    return dp[m - 1][n - 1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) dp[i][j] = grid[i][j];
                else {
                    int up = i > 0 ? dp[i - 1][j] : Integer.MAX_VALUE;
                    int left = j > 0 ? dp[i][j - 1] : Integer.MAX_VALUE;
                    dp[i][j] = grid[i][j] + Math.min(up, left);
                }
            }
        return dp[m - 1][n - 1];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) dp[i][j] = grid[i][j];
      else {
        const up = i > 0 ? dp[i - 1][j] : Infinity;
        const left = j > 0 ? dp[i][j - 1] : Infinity;
        dp[i][j] = grid[i][j] + Math.min(up, left);
      }
    }
  return dp[m - 1][n - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minPathSum(List<List<Integer>> grid) {
        Integer m = grid.size(), n = grid[0].size();
        List<List<Integer>> dp = new List<List<Integer>>();
        for (Integer i = 0; i < m; i++) {
            List<Integer> row = new List<Integer>();
            for (Integer j = 0; j < n; j++) row.add(0);
            dp.add(row);
        }
        for (Integer i = 0; i < m; i++) {
            for (Integer j = 0; j < n; j++) {
                if (i == 0 && j == 0) dp[i][j] = grid[i][j];
                else {
                    Integer up = i > 0 ? dp[i - 1][j] : 2147483647;
                    Integer left = j > 0 ? dp[i][j - 1] : 2147483647;
                    dp[i][j] = grid[i][j] + Math.min(up, left);
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "triangle-minimum-path-sum",
    title: "Triangle Minimum Path Sum",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a triangle array, return the minimum path sum from top to bottom. From index j on a row you may move to index j or j+1 on the row below.",
    beginnerExplanation:
      "Work bottom-up: the best cost from a cell is its value plus the cheaper of the two cells directly below it. Collapse the triangle upward until the apex holds the answer.",
    realWorldAnalogy:
      "A pachinko board — at each peg the ball falls left or right; you compute, from the bottom row upward, the cheapest way each peg can reach the floor.",
    visualExplanation: "dp[j] = triangle[i][j] + min(dp[j], dp[j+1])   (process rows bottom→top)",
    approaches: [
      {
        title: "Recursion top-down",
        tier: "Brute Force",
        idea: "f(i,j)=t[i][j]+min(f(i+1,j),f(i+1,j+1)).",
        steps: ["Base last row", "Recurse from apex"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "Bottom-up 1-D DP",
        tier: "Optimal",
        idea: "Start with the last row; fold each row into the one above.",
        steps: ["dp = last row", "For i from n-2..0: dp[j]=t[i][j]+min(dp[j],dp[j+1])"],
        time: "O(n²)",
        space: "O(n)",
      },
    ],
    dryRun: "[[2],[3,4],[6,5,7],[4,1,8,3]]\ndp=[4,1,8,3]->[7,6,10]->[9,10]->[11]  answer 11",
    interviewTips: [
      "Bottom-up avoids the awkward boundary handling of top-down.",
      "Note the in-place 1-D array (reuse the last row).",
    ],
    commonMistakes: ["Moving to j-1 (only j and j+1 are allowed).", "Wrong row length per level."],
    followUps: ["Reconstruct the path.", "Maximum path sum.", "Fixed start/end constraints."],
    related: ["minimum-path-sum-in-grid"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def minimum_total(triangle):
    dp = list(triangle[-1])
    for i in range(len(triangle) - 2, -1, -1):
        for j in range(len(triangle[i])):
            dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])
    return dp[0]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minimumTotal(int[][] triangle) {
        int n = triangle.length;
        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--)
            for (int j = 0; j < triangle[i].length; j++)
                dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        return dp[0];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minimumTotal(triangle) {
  const dp = [...triangle[triangle.length - 1]];
  for (let i = triangle.length - 2; i >= 0; i--)
    for (let j = 0; j < triangle[i].length; j++)
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
  return dp[0];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minimumTotal(List<List<Integer>> triangle) {
        Integer n = triangle.size();
        List<Integer> dp = new List<Integer>();
        for (Integer x : triangle[n - 1]) dp.add(x);
        dp.add(0);
        for (Integer i = n - 2; i >= 0; i--)
            for (Integer j = 0; j < triangle[i].size(); j++)
                dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        return dp[0];
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-falling-path-sum",
    title: "Minimum Falling Path Sum",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an n×n matrix, find the minimum sum of a falling path: start anywhere in row 0, and from (i,j) move to (i+1, j-1), (i+1, j), or (i+1, j+1).",
    beginnerExplanation:
      "Each cell can be reached from three cells in the row above (the one directly up, and the two diagonals). The best cost to a cell is its value plus the cheapest of those three. The answer is the smallest value in the last row.",
    realWorldAnalogy:
      "A marble rolling down a peg board where it can drift one column left/right per row — you track the cheapest way it could have arrived at each peg.",
    visualExplanation: "dp[i][j] = m[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1])  -> answer = min(last row)",
    approaches: [
      {
        title: "Recursion from each start",
        tier: "Brute Force",
        idea: "Try every starting column and every drift.",
        steps: ["f(i,j)=m[i][j]+min of three children", "Take min over row 0 starts"],
        time: "O(3ⁿ)",
        space: "O(n)",
      },
      {
        title: "Tabulation",
        tier: "Optimal",
        idea: "Fill dp row by row using the three parents above.",
        steps: ["dp[0]=row0", "dp[i][j]=m[i][j]+min(up-left,up,up-right)", "answer=min(dp[n-1])"],
        time: "O(n²)",
        space: "O(n²) (O(n) rolling)",
      },
    ],
    dryRun: "m=[[2,1,3],[6,5,4],[7,8,9]]\nrow1->[7,6,5] ... wait min path: 1->4->8? = 13; dp gives 13",
    interviewTips: [
      "Guard the diagonal indices at the columns' edges (j-1<0 or j+1>=n).",
      "The answer is the row-minimum, not dp[n-1][0].",
    ],
    commonMistakes: ["Out-of-bounds on the diagonals.", "Returning a fixed end column instead of the row min."],
    followUps: ["Maximum falling path.", "Falling path with non-adjacent column constraint."],
    related: ["triangle-minimum-path-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_falling_path_sum(matrix):
    n = len(matrix)
    dp = list(matrix[0])
    for i in range(1, n):
        cur = [0] * n
        for j in range(n):
            best = dp[j]
            if j > 0:
                best = min(best, dp[j - 1])
            if j < n - 1:
                best = min(best, dp[j + 1])
            cur[j] = matrix[i][j] + best
        dp = cur
    return min(dp)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] dp = matrix[0].clone();
        for (int i = 1; i < n; i++) {
            int[] cur = new int[n];
            for (int j = 0; j < n; j++) {
                int best = dp[j];
                if (j > 0) best = Math.min(best, dp[j - 1]);
                if (j < n - 1) best = Math.min(best, dp[j + 1]);
                cur[j] = matrix[i][j] + best;
            }
            dp = cur;
        }
        int ans = dp[0];
        for (int v : dp) ans = Math.min(ans, v);
        return ans;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minFallingPathSum(matrix) {
  const n = matrix.length;
  let dp = [...matrix[0]];
  for (let i = 1; i < n; i++) {
    const cur = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      let best = dp[j];
      if (j > 0) best = Math.min(best, dp[j - 1]);
      if (j < n - 1) best = Math.min(best, dp[j + 1]);
      cur[j] = matrix[i][j] + best;
    }
    dp = cur;
  }
  return Math.min(...dp);
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minFallingPathSum(List<List<Integer>> matrix) {
        Integer n = matrix.size();
        List<Integer> dp = new List<Integer>();
        for (Integer x : matrix[0]) dp.add(x);
        for (Integer i = 1; i < n; i++) {
            List<Integer> cur = new List<Integer>();
            for (Integer j = 0; j < n; j++) cur.add(0);
            for (Integer j = 0; j < n; j++) {
                Integer best = dp[j];
                if (j > 0) best = Math.min(best, dp[j - 1]);
                if (j < n - 1) best = Math.min(best, dp[j + 1]);
                cur[j] = matrix[i][j] + best;
            }
            dp = cur;
        }
        Integer ans = dp[0];
        for (Integer v : dp) ans = Math.min(ans, v);
        return ans;
    }
}`,
      },
    ],
  },
  {
    slug: "subset-sum-equal-to-target",
    title: "Subset Sum Equal To Target",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an array of non-negative integers and a target, determine whether some subset sums exactly to the target.",
    beginnerExplanation:
      "For each item you either take it or skip it. The reachable-sums idea: dp[s] is true if some subset reaches sum s. Process items one at a time and mark newly reachable sums (iterate sums downward to reuse each item once).",
    realWorldAnalogy:
      "Filling a jar to an exact weight using a set of stones — you try adding each stone and track every total weight you can hit.",
    visualExplanation: "dp[s] reachable; for each num: for s=target..num: dp[s] |= dp[s-num]",
    approaches: [
      {
        title: "Recursion take/not-take",
        tier: "Brute Force",
        idea: "f(i,t)=f(i-1,t) OR f(i-1,t-a[i]).",
        steps: ["Base t==0 true", "Recurse over items"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "1-D boolean DP",
        tier: "Optimal",
        idea: "dp[s] reachable; update sums downward per item.",
        steps: ["dp[0]=true", "For each num, for s=target..num: dp[s]|=dp[s-num]"],
        time: "O(n·target)",
        space: "O(target)",
      },
    ],
    dryRun: "nums=[1,2,3,5], target=8\nafter all: dp[8]=true (3+5)  -> true",
    interviewTips: [
      "Iterate sums downward in the 1-D version so each item is used at most once.",
      "This is the engine behind Partition Equal Subset Sum and Target Sum.",
    ],
    commonMistakes: ["Iterating sums upward (lets an item be reused).", "Negative numbers break the array indexing."],
    followUps: ["Count such subsets.", "Partition into two equal halves.", "Minimum subset-sum difference."],
    related: ["partition-equal-subset-sum", "count-subsets-with-sum-k"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def subset_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for s in range(target, num - 1, -1):
            if dp[s - num]:
                dp[s] = True
    return dp[target]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean subsetSum(int[] nums, int target) {
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums)
            for (int s = target; s >= num; s--)
                if (dp[s - num]) dp[s] = true;
        return dp[target];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function subsetSum(nums, target) {
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums)
    for (let s = target; s >= num; s--)
      if (dp[s - num]) dp[s] = true;
  return dp[target];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean subsetSum(List<Integer> nums, Integer target) {
        List<Boolean> dp = new List<Boolean>();
        for (Integer i = 0; i <= target; i++) dp.add(false);
        dp[0] = true;
        for (Integer num : nums)
            for (Integer s = target; s >= num; s--)
                if (dp[s - num]) dp[s] = true;
        return dp[target];
    }
}`,
      },
    ],
  },
  {
    slug: "count-subsets-with-sum-k",
    title: "Count Subsets with Sum K",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an array of non-negative integers, count how many subsets sum exactly to K.",
    beginnerExplanation:
      "Same take/skip idea as Subset Sum, but instead of a boolean you accumulate counts: the number of ways to reach sum s is the ways without the current item plus the ways to reach s−num.",
    realWorldAnalogy:
      "Counting how many different handfuls of coins add up to a target amount — every coin either joins a handful or doesn't.",
    visualExplanation: "dp[s] += dp[s-num]  (sums iterated downward, dp[0]=1)",
    approaches: [
      {
        title: "Recursion counting",
        tier: "Brute Force",
        idea: "f(i,t)=f(i-1,t)+f(i-1,t-a[i]).",
        steps: ["Base: t==0 → 1", "Sum take + skip"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "1-D count DP",
        tier: "Optimal",
        idea: "dp[s] = number of subsets summing to s.",
        steps: ["dp[0]=1", "For each num, for s=K..num: dp[s]+=dp[s-num]"],
        time: "O(n·K)",
        space: "O(K)",
      },
    ],
    dryRun: "nums=[1,2,2,3], K=3\nsubsets: {1,2},{1,2},{3} -> 3",
    interviewTips: [
      "Handle zeros carefully — a zero can be in or out, doubling counts (subtlety in some variants).",
      "dp[0]=1 (the empty subset).",
    ],
    commonMistakes: ["Forgetting dp[0]=1.", "Upward iteration double-counts an item."],
    followUps: ["Count partitions with a given difference.", "Subsets with sum in a range."],
    related: ["subset-sum-equal-to-target", "count-partitions-with-given-difference"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_subsets(nums, k):
    dp = [0] * (k + 1)
    dp[0] = 1
    for num in nums:
        for s in range(k, num - 1, -1):
            dp[s] += dp[s - num]
    return dp[k]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countSubsets(int[] nums, int k) {
        int[] dp = new int[k + 1];
        dp[0] = 1;
        for (int num : nums)
            for (int s = k; s >= num; s--)
                dp[s] += dp[s - num];
        return dp[k];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countSubsets(nums, k) {
  const dp = new Array(k + 1).fill(0);
  dp[0] = 1;
  for (const num of nums)
    for (let s = k; s >= num; s--)
      dp[s] += dp[s - num];
  return dp[k];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countSubsets(List<Integer> nums, Integer k) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= k; i++) dp.add(0);
        dp[0] = 1;
        for (Integer num : nums)
            for (Integer s = k; s >= num; s--)
                dp[s] += dp[s - num];
        return dp[k];
    }
}`,
      },
    ],
  },
  {
    slug: "0-1-knapsack",
    title: "0/1 Knapsack",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "microsoft", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given weights[] and values[] of n items and a knapsack capacity W, maximise the total value of items placed in the knapsack. Each item may be taken at most once.",
    beginnerExplanation:
      "For each item you either take it (if it fits, gaining its value and using its weight) or skip it. The best value for a capacity is the better of those two choices. A 1-D array over capacity works if you iterate capacity downward (so each item is used once).",
    realWorldAnalogy:
      "Packing a backpack for a trip with a weight limit — for each gadget you decide keep or leave to maximise usefulness without overloading.",
    visualExplanation: "dp[w] = max value at capacity w; for each item: for w=W..wt: dp[w]=max(dp[w], val+dp[w-wt])",
    approaches: [
      {
        title: "Recursion take/skip",
        tier: "Brute Force",
        idea: "f(i,w)=max(f(i-1,w), val[i]+f(i-1,w-wt[i])).",
        steps: ["Base i<0 → 0", "Take only if wt[i]<=w"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "1-D tabulation",
        tier: "Optimal",
        idea: "Roll a capacity array, iterating capacity downward per item.",
        steps: ["dp[0..W]=0", "For each item, for w=W..wt: dp[w]=max(dp[w], val+dp[w-wt])"],
        time: "O(n·W)",
        space: "O(W)",
      },
    ],
    dryRun: "wt=[1,3,4,5] val=[1,4,5,7] W=7\nbest = items (3,4)->val 9  -> dp[7]=9",
    interviewTips: [
      "Downward capacity loop = 0/1 (once); upward = unbounded (reuse). Know the difference cold.",
      "State: dp[i][w] = best value using first i items within capacity w.",
    ],
    commonMistakes: ["Upward capacity loop (turns it into unbounded).", "Taking an item that doesn't fit."],
    followUps: ["Unbounded knapsack.", "Reconstruct chosen items.", "Subset-sum / partition reductions."],
    related: ["unbounded-knapsack", "subset-sum-equal-to-target"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def knapsack(weights, values, W):
    dp = [0] * (W + 1)
    for i in range(len(weights)):
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    return dp[W]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int knapsack(int[] weights, int[] values, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < weights.length; i++)
            for (int w = W; w >= weights[i]; w--)
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        return dp[W];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function knapsack(weights, values, W) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++)
    for (let w = W; w >= weights[i]; w--)
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
  return dp[W];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer knapsack(List<Integer> weights, List<Integer> values, Integer W) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= W; i++) dp.add(0);
        for (Integer i = 0; i < weights.size(); i++)
            for (Integer w = W; w >= weights[i]; w--)
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        return dp[W];
    }
}`,
      },
    ],
  },
  {
    slug: "unbounded-knapsack",
    title: "Unbounded Knapsack",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Like 0/1 Knapsack, but each item may be taken unlimited times. Maximise total value within capacity W.",
    beginnerExplanation:
      "The only change from 0/1 is that after taking an item you may take it again — so when you take it you stay on the same item. In the 1-D array, iterate capacity UPWARD so an item can be reused within the same pass.",
    realWorldAnalogy:
      "Stocking a vending machine with unlimited copies of each product to maximise value within a shelf-space limit.",
    visualExplanation: "dp[w] = max(dp[w], val + dp[w-wt])  with capacity iterated UPWARD (reuse allowed)",
    approaches: [
      {
        title: "Recursion (stay on item)",
        tier: "Brute Force",
        idea: "f(i,w)=max(f(i-1,w), val[i]+f(i,w-wt[i])).",
        steps: ["Take keeps index i (reuse)", "Skip moves to i-1"],
        time: "Exponential",
        space: "O(n)",
      },
      {
        title: "1-D tabulation, upward",
        tier: "Optimal",
        idea: "Iterate capacity upward so each item can be reused.",
        steps: ["dp[0..W]=0", "For each item, for w=wt..W: dp[w]=max(dp[w], val+dp[w-wt])"],
        time: "O(n·W)",
        space: "O(W)",
      },
    ],
    dryRun: "wt=[2,3] val=[5,8] W=6\ntake two 3s -> 16; dp[6]=16",
    interviewTips: [
      "Upward capacity loop is the single line that distinguishes it from 0/1.",
      "Coin Change (min coins / count ways) and Rod Cutting are unbounded-knapsack instances.",
    ],
    commonMistakes: ["Using the downward (0/1) loop by habit.", "Off-by-one on the capacity bounds."],
    followUps: ["Rod Cutting.", "Coin Change variants.", "Bounded counts per item."],
    related: ["rod-cutting", "coin-change"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def unbounded_knapsack(weights, values, W):
    dp = [0] * (W + 1)
    for i in range(len(weights)):
        for w in range(weights[i], W + 1):
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    return dp[W]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int unboundedKnapsack(int[] weights, int[] values, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < weights.length; i++)
            for (int w = weights[i]; w <= W; w++)
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        return dp[W];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function unboundedKnapsack(weights, values, W) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++)
    for (let w = weights[i]; w <= W; w++)
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
  return dp[W];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer unboundedKnapsack(List<Integer> weights, List<Integer> values, Integer W) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= W; i++) dp.add(0);
        for (Integer i = 0; i < weights.size(); i++)
            for (Integer w = weights[i]; w <= W; w++)
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        return dp[W];
    }
}`,
      },
    ],
  },
  {
    slug: "rod-cutting",
    title: "Rod Cutting",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given a rod of length n and price[i] = price of a piece of length i+1, cut the rod into pieces to maximise total price.",
    beginnerExplanation:
      "Think of each possible cut length as an item you can use unlimited times (you can cut many pieces of the same length). It's unbounded knapsack with weight = piece length and value = its price, capacity = n.",
    realWorldAnalogy:
      "A blacksmith deciding how to chop a metal bar into salable lengths to maximise revenue, where pieces of a length can be made repeatedly.",
    visualExplanation: "dp[len] = max(dp[len], price[c] + dp[len-(c+1)])  for each cut length c+1, upward",
    approaches: [
      {
        title: "Recursion",
        tier: "Brute Force",
        idea: "Try every first-piece length, recurse on the remainder.",
        steps: ["f(n)=max over L of price[L]+f(n-L)", "Base n==0 → 0"],
        time: "Exponential",
        space: "O(n)",
      },
      {
        title: "Unbounded knapsack DP",
        tier: "Optimal",
        idea: "Lengths are items reusable any number of times.",
        steps: ["dp[0..n]=0", "For each length L (1..n), for total=L..n: dp[total]=max(dp[total], price[L-1]+dp[total-L])"],
        time: "O(n²)",
        space: "O(n)",
      },
    ],
    dryRun: "price=[1,5,8,9] n=4\nbest = two pieces of length 2 -> 5+5=10  dp[4]=10",
    interviewTips: [
      "Recognise it as unbounded knapsack to reuse that template instantly.",
      "Index carefully: price[L-1] is the price for a piece of length L.",
    ],
    commonMistakes: ["Off-by-one between length and price index.", "Using the 0/1 (downward) loop."],
    followUps: ["Reconstruct the cuts.", "Minimise number of pieces.", "Limited pieces per length."],
    related: ["unbounded-knapsack", "coin-change"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def rod_cutting(price, n):
    dp = [0] * (n + 1)
    for length in range(1, n + 1):
        for total in range(length, n + 1):
            dp[total] = max(dp[total], price[length - 1] + dp[total - length])
    return dp[n]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int rodCutting(int[] price, int n) {
        int[] dp = new int[n + 1];
        for (int length = 1; length <= n; length++)
            for (int total = length; total <= n; total++)
                dp[total] = Math.max(dp[total], price[length - 1] + dp[total - length]);
        return dp[n];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function rodCutting(price, n) {
  const dp = new Array(n + 1).fill(0);
  for (let length = 1; length <= n; length++)
    for (let total = length; total <= n; total++)
      dp[total] = Math.max(dp[total], price[length - 1] + dp[total - length]);
  return dp[n];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer rodCutting(List<Integer> price, Integer n) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= n; i++) dp.add(0);
        for (Integer length = 1; length <= n; length++)
            for (Integer total = length; total <= n; total++)
                dp[total] = Math.max(dp[total], price[length - 1] + dp[total - length]);
        return dp[n];
    }
}`,
      },
    ],
  },
  {
    slug: "minimum-subset-sum-difference",
    title: "Minimum Subset Sum Difference",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Partition an array of non-negative integers into two subsets so that the absolute difference of their sums is minimised. Return that minimum difference.",
    beginnerExplanation:
      "If total is the whole sum and one subset sums to s, the other sums to total−s and the difference is |total−2s|. So compute every subset sum s that's reachable (up to total) and pick the one minimising |total−2s|.",
    realWorldAnalogy:
      "Splitting a group into two teams of as-equal total skill as possible — you enumerate the achievable team totals and pick the most balanced split.",
    visualExplanation: "reachable s via subset-sum DP; answer = min over reachable s of |total - 2s|",
    approaches: [
      {
        title: "Try every subset",
        tier: "Brute Force",
        idea: "Enumerate all subsets, track min |sum1-sum2|.",
        steps: ["2ⁿ subsets", "Track minimum difference"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "Subset-sum reachability DP",
        tier: "Optimal",
        idea: "Find all reachable subset sums ≤ total, minimise |total−2s|.",
        steps: ["dp[s] reachable up to total", "Scan s=0..total/2, answer=min(total-2s) over reachable s"],
        time: "O(n·total)",
        space: "O(total)",
      },
    ],
    dryRun: "nums=[1,6,11,5] total=23\nreachable s=11 -> diff=|23-22|=1  answer 1",
    interviewTips: [
      "Only scan s up to total/2 — symmetric beyond that.",
      "Reuses the exact subset-sum reachability table.",
    ],
    commonMistakes: ["Scanning the whole range and double-counting.", "Not seeding dp[0]=true."],
    followUps: ["Count minimum-difference partitions.", "k-way balanced partition."],
    related: ["subset-sum-equal-to-target", "partition-equal-subset-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_subset_sum_diff(nums):
    total = sum(nums)
    dp = [False] * (total + 1)
    dp[0] = True
    for num in nums:
        for s in range(total, num - 1, -1):
            if dp[s - num]:
                dp[s] = True
    best = total
    for s in range(total // 2 + 1):
        if dp[s]:
            best = min(best, total - 2 * s)
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minSubsetSumDiff(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        boolean[] dp = new boolean[total + 1];
        dp[0] = true;
        for (int num : nums)
            for (int s = total; s >= num; s--)
                if (dp[s - num]) dp[s] = true;
        int best = total;
        for (int s = 0; s <= total / 2; s++)
            if (dp[s]) best = Math.min(best, total - 2 * s);
        return best;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minSubsetSumDiff(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  const dp = new Array(total + 1).fill(false);
  dp[0] = true;
  for (const num of nums)
    for (let s = total; s >= num; s--)
      if (dp[s - num]) dp[s] = true;
  let best = total;
  for (let s = 0; s <= Math.floor(total / 2); s++)
    if (dp[s]) best = Math.min(best, total - 2 * s);
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minSubsetSumDiff(List<Integer> nums) {
        Integer total = 0;
        for (Integer x : nums) total += x;
        List<Boolean> dp = new List<Boolean>();
        for (Integer i = 0; i <= total; i++) dp.add(false);
        dp[0] = true;
        for (Integer num : nums)
            for (Integer s = total; s >= num; s--)
                if (dp[s - num]) dp[s] = true;
        Integer best = total;
        for (Integer s = 0; s <= total / 2; s++)
            if (dp[s]) best = Math.min(best, total - 2 * s);
        return best;
    }
}`,
      },
    ],
  },
  {
    slug: "count-partitions-with-given-difference",
    title: "Count Partitions with Given Difference",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Count the ways to partition an array of non-negative integers into two subsets S1 and S2 (sum(S1) ≥ sum(S2)) such that sum(S1) − sum(S2) = D.",
    beginnerExplanation:
      "If S2 sums to s, then S1 sums to total−s and the difference is total−2s = D, so s = (total−D)/2. The answer is simply the number of subsets that sum to that target — a count-subsets DP. Check (total−D) is non-negative and even.",
    realWorldAnalogy:
      "Splitting prize money into two envelopes with a fixed gap between them — once the gap fixes the smaller envelope's amount, you just count the ways to fill it.",
    visualExplanation: "target = (total - D) / 2  (must be ≥0 and even);  answer = countSubsets(nums, target)",
    approaches: [
      {
        title: "Enumerate partitions",
        tier: "Brute Force",
        idea: "Try all subsets, count those with the right difference.",
        steps: ["2ⁿ subsets", "Count matching D"],
        time: "O(2ⁿ)",
        space: "O(n)",
      },
      {
        title: "Reduce to count-subsets",
        tier: "Optimal",
        idea: "target=(total−D)/2; count subsets summing to target.",
        steps: ["Validate total−D ≥0 and even", "dp[0]=1; for each num, s=target..num: dp[s]+=dp[s-num]"],
        time: "O(n·target)",
        space: "O(target)",
      },
    ],
    dryRun: "nums=[1,1,2,3] D=1 total=7 -> target=3; subsets summing 3: {1,2},{1,2},{3} -> 3",
    interviewTips: [
      "Derive target=(total−D)/2 on the board — it shows you reduced the problem cleanly.",
      "Reject if (total−D) is negative or odd → 0 ways.",
    ],
    commonMistakes: ["Forgetting the parity/negativity check.", "Mishandling zeros in the array."],
    followUps: ["Target Sum (assign +/-) is the same reduction.", "Count minimum-difference partitions."],
    related: ["count-subsets-with-sum-k", "target-sum"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def count_partitions(nums, d):
    total = sum(nums)
    if (total - d) < 0 or (total - d) % 2 != 0:
        return 0
    target = (total - d) // 2
    dp = [0] * (target + 1)
    dp[0] = 1
    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] += dp[s - num]
    return dp[target]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int countPartitions(int[] nums, int d) {
        int total = 0;
        for (int x : nums) total += x;
        if ((total - d) < 0 || (total - d) % 2 != 0) return 0;
        int target = (total - d) / 2;
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int num : nums)
            for (int s = target; s >= num; s--)
                dp[s] += dp[s - num];
        return dp[target];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function countPartitions(nums, d) {
  const total = nums.reduce((a, b) => a + b, 0);
  if ((total - d) < 0 || (total - d) % 2 !== 0) return 0;
  const target = (total - d) / 2;
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (const num of nums)
    for (let s = target; s >= num; s--)
      dp[s] += dp[s - num];
  return dp[target];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer countPartitions(List<Integer> nums, Integer d) {
        Integer total = 0;
        for (Integer x : nums) total += x;
        if ((total - d) < 0 || Math.mod(total - d, 2) != 0) return 0;
        Integer target = (total - d) / 2;
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= target; i++) dp.add(0);
        dp[0] = 1;
        for (Integer num : nums)
            for (Integer s = target; s >= num; s--)
                dp[s] += dp[s - num];
        return dp[target];
    }
}`,
      },
    ],
  },
];

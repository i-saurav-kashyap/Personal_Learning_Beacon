import type { Problem } from "@/lib/types";

// Batch H — completes NeetCode 150 / Blind 75 gaps (arrays, math, matrix, DP, stack).
export const PROBLEMS_BATCH_H: Problem[] = [
  {
    slug: "valid-sudoku",
    title: "Valid Sudoku",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Arrays", "Hashing", "Matrix"],
    companies: ["amazon", "microsoft", "apple"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated: each row, each column, and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition. Empty cells are '.'.",
    beginnerExplanation:
      "You don't have to solve the puzzle — just check that no digit already breaks the rules. As you scan every filled cell, remember which digits you've already placed in that cell's row, its column, and its 3 x 3 box. The instant you try to place a digit that's already in one of those three groups, the board is invalid.",
    realWorldAnalogy:
      "Think of three sign-in sheets for every cell: one for its row, one for its column, one for its neighbourhood (box). A digit is only allowed to sign each sheet once — a second signature means a clash.",
    visualExplanation:
      "cell (r,c) belongs to box (r/3)*3 + c/3\nrow sets:  [{}, {}, ...]\ncol sets:  [{}, {}, ...]\nbox sets:  [{}, {}, ...]\nfor each filled v: if v in row[r] or col[c] or box[b] -> invalid",
    approaches: [
      {
        title: "Re-scan each group separately",
        tier: "Brute Force",
        idea: "Validate all 9 rows, then all 9 columns, then all 9 boxes in separate passes.",
        steps: ["Check every row for dups", "Check every column", "Check every box"],
        time: "O(1) (fixed 81 cells, but 3 passes)",
        space: "O(1)",
      },
      {
        title: "One pass with row/col/box sets",
        tier: "Optimal",
        idea: "Keep a set per row, per column, per box; one sweep over the 81 cells.",
        steps: [
          "Create 9 row sets, 9 col sets, 9 box sets",
          "For each filled cell compute box index (r/3)*3 + c/3",
          "If the digit is already in any of the three sets, return false; else add it",
        ],
        time: "O(1) (81 cells)",
        space: "O(1)",
      },
    ],
    dryRun:
      "board[0][0]='5' -> row0,col0,box0 get '5'\nboard[0][1]='3' -> ok\n...\nif board[0][4]='5' later in row0 -> '5' already in row0 set -> invalid",
    interviewTips: [
      "State the box index formula out loud: b = (r // 3) * 3 + (c // 3) — it's the part interviewers watch for.",
      "Clarify you only validate the current state, not solvability.",
    ],
    commonMistakes: [
      "Wrong box index math (mixing up row/col division).",
      "Skipping the '.' check and treating empty cells as a digit.",
    ],
    followUps: ["Actually solve the Sudoku (backtracking).", "Generalise to an n² x n² board."],
    related: ["group-anagrams"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_valid_sudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v == ".":
                continue
            b = (r // 3) * 3 + c // 3
            if v in rows[r] or v in cols[c] or v in boxes[b]:
                return False
            rows[r].add(v)
            cols[c].add(v)
            boxes[b].add(v)
    return True`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char v = board[r][c];
                if (v == '.') continue;
                int b = (r / 3) * 3 + c / 3;
                if (!seen.add("r" + r + v) || !seen.add("c" + c + v) || !seen.add("b" + b + v)) {
                    return false;
                }
            }
        }
        return true;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isValidSudoku(board) {
  const seen = new Set();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (v === ".") continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      const keys = ["r" + r + v, "c" + c + v, "b" + b + v];
      for (const k of keys) {
        if (seen.has(k)) return false;
        seen.add(k);
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
    public static Boolean isValidSudoku(List<List<String>> board) {
        Set<String> seen = new Set<String>();
        for (Integer r = 0; r < 9; r++) {
            for (Integer c = 0; c < 9; c++) {
                String v = board[r][c];
                if (v == '.') continue;
                Integer b = (r / 3) * 3 + c / 3;
                String rk = 'r' + r + v, ck = 'c' + c + v, bk = 'b' + b + v;
                if (seen.contains(rk) || seen.contains(ck) || seen.contains(bk)) return false;
                seen.add(rk);
                seen.add(ck);
                seen.add(bk);
            }
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    slug: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    patterns: ["fast-slow-pointers"],
    topics: ["Hashing", "Math"],
    companies: ["google", "amazon"],
    sheets: ["neetcode150"],
    frequency: 3,
    statement:
      "A number is 'happy' if repeatedly replacing it with the sum of the squares of its digits eventually reaches 1. If the process loops endlessly without reaching 1, the number is not happy. Return whether n is happy.",
    beginnerExplanation:
      "Keep transforming the number into the sum of its digits squared. Either you hit 1 (happy) or you fall into a repeating cycle (not happy). The elegant trick is the same tortoise-and-hare idea from linked-list cycles: run a slow and a fast transformer — if there's a loop they'll meet, otherwise the fast one reaches 1.",
    realWorldAnalogy:
      "Two runners on a numeric track where each step jumps to 'sum of digit squares'. If the track is a dead-end at 1 the faster runner arrives; if it's a loop, the faster runner laps and bumps into the slower one.",
    visualExplanation:
      "19 -> 1²+9² = 82 -> 8²+2² = 68 -> 6²+8² = 100 -> 1²+0²+0² = 1  (happy)\n2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 (cycle -> not happy)",
    approaches: [
      {
        title: "Hash set of seen numbers",
        tier: "Better",
        idea: "Remember every number you produce; if one repeats before reaching 1, it loops.",
        steps: ["Loop computing next = sum of digit squares", "If next == 1 -> happy", "If next already seen -> cycle"],
        time: "O(log n) per step",
        space: "O(log n)",
      },
      {
        title: "Floyd's cycle detection",
        tier: "Optimal",
        idea: "Slow advances one transform, fast advances two; they meet on a cycle, fast hits 1 otherwise.",
        steps: ["slow = n, fast = next(n)", "While fast != 1 and slow != fast: advance", "Return fast == 1"],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun:
      "n=19\nslow=19 fast=82\nslow=82 fast=68->100? fast=next(next(82))=next(68)=100\n...eventually fast=1 -> return true",
    interviewTips: [
      "Name the cycle-detection link to Linked List Cycle — shows pattern transfer.",
      "Mention the O(1)-space version beats the hash-set version interviewers expect first.",
    ],
    commonMistakes: ["Integer division/modulo mistakes extracting digits.", "Forgetting the loop can be broken either by 1 or by a meet."],
    followUps: ["Return the cycle length when unhappy.", "Sum of cubes variant."],
    related: ["linked-list-cycle", "single-number"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_happy(n):
    def sq(x):
        s = 0
        while x:
            d = x % 10
            s += d * d
            x //= 10
        return s
    slow, fast = n, sq(n)
    while fast != 1 and slow != fast:
        slow = sq(slow)
        fast = sq(sq(fast))
    return fast == 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    private int sq(int x) {
        int s = 0;
        while (x > 0) { int d = x % 10; s += d * d; x /= 10; }
        return s;
    }
    public boolean isHappy(int n) {
        int slow = n, fast = sq(n);
        while (fast != 1 && slow != fast) {
            slow = sq(slow);
            fast = sq(sq(fast));
        }
        return fast == 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isHappy(n) {
  const sq = (x) => {
    let s = 0;
    while (x > 0) { const d = x % 10; s += d * d; x = Math.floor(x / 10); }
    return s;
  };
  let slow = n, fast = sq(n);
  while (fast !== 1 && slow !== fast) {
    slow = sq(slow);
    fast = sq(sq(fast));
  }
  return fast === 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    static Integer sq(Integer x) {
        Integer s = 0;
        while (x > 0) { Integer d = Math.mod(x, 10); s += d * d; x /= 10; }
        return s;
    }
    public static Boolean isHappy(Integer n) {
        Integer slow = n, fast = sq(n);
        while (fast != 1 && slow != fast) {
            slow = sq(slow);
            fast = sq(sq(fast));
        }
        return fast == 1;
    }
}`,
      },
    ],
  },
  {
    slug: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    patterns: ["greedy"],
    topics: ["Arrays", "Math"],
    companies: ["google", "amazon", "apple"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "You're given a large non-negative integer represented as an array of its digits (most significant first). Increment it by one and return the resulting digit array.",
    beginnerExplanation:
      "It's grade-school addition of 1. Start at the last digit: if it's less than 9, just bump it and you're done. If it's 9 it becomes 0 and the carry moves left. If every digit was 9 (like 999), you end with a fresh leading 1 (1000).",
    realWorldAnalogy:
      "A car odometer rolling over: the last wheel ticks up; when a 9 rolls to 0 it nudges the wheel to its left; all-nines rolls the whole dial and a new digit appears.",
    visualExplanation:
      "[1,2,9] -> last 9->0 carry -> 2->3 stop -> [1,3,0]\n[9,9,9] -> all roll to 0 -> prepend 1 -> [1,0,0,0]",
    approaches: [
      {
        title: "Convert to int, add, convert back",
        tier: "Brute Force",
        idea: "Parse the digits to a number, add one, split back — fails for very large inputs that overflow fixed integers.",
        steps: ["Join digits", "Add 1", "Split back to digits"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Walk from the last digit handling carry",
        tier: "Optimal",
        idea: "Process right-to-left; stop as soon as a digit doesn't carry.",
        steps: [
          "For i from end to start: if digit < 9, increment and return",
          "Else set it to 0 and continue",
          "If we never returned, prepend a 1",
        ],
        time: "O(n)",
        space: "O(1) (excluding the all-9s prepend)",
      },
    ],
    dryRun: "[4,3,2,1]\ni=3: 1<9 -> 2 -> return [4,3,2,2]",
    interviewTips: [
      "Call out the all-9s edge case explicitly — it's the whole point of the problem.",
      "Avoid the parse-to-int approach for big inputs; interviewers plant overflow traps.",
    ],
    commonMistakes: ["Forgetting to handle the final carry (all 9s).", "Mutating without returning the new front array."],
    followUps: ["Plus K instead of one.", "Add two digit arrays (Add Strings)."],
    related: ["multiply-strings", "add-two-numbers"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def plus_one(digits):
    digits = digits[:]
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) { digits[i]++; return digits; }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> plusOne(List<Integer> digits) {
        for (Integer i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i] += 1; return digits; }
            digits[i] = 0;
        }
        List<Integer> res = new List<Integer>{ 1 };
        res.addAll(digits);
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "multiply-strings",
    title: "Multiply Strings",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Strings", "Math"],
    companies: ["meta", "amazon", "microsoft"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given two non-negative integers represented as strings num1 and num2, return their product, also as a string. You must not use any built-in big-integer library or convert the inputs directly to a number.",
    beginnerExplanation:
      "Do exactly what you learned in school: multiply each digit of one number by each digit of the other, and place each partial product in the right column. The key insight is that digit i of num1 times digit j of num2 lands in result positions i+j and i+j+1 — so you can accumulate everything into one result array and handle carries.",
    realWorldAnalogy:
      "Long multiplication on paper: every digit pair contributes to a specific column, and overflow in a column carries one column to the left.",
    visualExplanation:
      'num1="12", num2="34"\npositions for i (in num1) and j (in num2): result index = i+j (carry) and i+j+1 (units)\n12 * 34 = 408 -> "408"',
    approaches: [
      {
        title: "Repeated addition",
        tier: "Brute Force",
        idea: "Add num1 to itself num2 times — far too slow for large numbers.",
        steps: ["Loop num2 times adding num1"],
        time: "O(num2 · n)",
        space: "O(n)",
      },
      {
        title: "Digit-by-digit into a result array",
        tier: "Optimal",
        idea: "Each i,j product adds to res[i+j+1] with carry into res[i+j]; then strip leading zeros.",
        steps: [
          "res = array of zeros, length n + m",
          "For i from end of num1, j from end of num2: mul = d1*d2; total = mul + res[i+j+1]",
          "res[i+j+1] = total % 10; res[i+j] += total // 10",
          "Join res and strip leading zeros (return '0' if empty)",
        ],
        time: "O(n · m)",
        space: "O(n + m)",
      },
    ],
    dryRun:
      'num1="12", num2="34"\ni=1(2),j=1(4): mul=8 -> res[3]=8\ni=1(2),j=0(3): mul=6 -> res[2]=6\ni=0(1),j=1(4): mul=4 -> res[2]=6+4=10 -> res[2]=0,res[1]+=1\ni=0(1),j=0(3): mul=3 -> res[1]=1+3=4\nres=[0,4,0,8] -> "408"',
    interviewTips: [
      "Lead with the i+j / i+j+1 index insight — that's what unlocks the one-array solution.",
      "Handle the '0' input early so you don't return an empty/leading-zero string.",
    ],
    commonMistakes: ["Off-by-one in the result index mapping.", "Not stripping leading zeros (or stripping a legitimate single '0')."],
    followUps: ["Add Strings (no multiplication).", "Multiply in a different base."],
    related: ["plus-one", "add-two-numbers"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def multiply(num1, num2):
    if num1 == "0" or num2 == "0":
        return "0"
    n, m = len(num1), len(num2)
    res = [0] * (n + m)
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            mul = (ord(num1[i]) - 48) * (ord(num2[j]) - 48)
            p1, p2 = i + j, i + j + 1
            total = mul + res[p2]
            res[p2] = total % 10
            res[p1] += total // 10
    out = "".join(map(str, res)).lstrip("0")
    return out or "0"`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";
        int n = num1.length(), m = num2.length();
        int[] res = new int[n + m];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j, p2 = i + j + 1;
                int total = mul + res[p2];
                res[p2] = total % 10;
                res[p1] += total / 10;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int d : res) {
            if (sb.length() == 0 && d == 0) continue;
            sb.append(d);
        }
        return sb.length() == 0 ? "0" : sb.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  const n = num1.length, m = num2.length;
  const res = new Array(n + m).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
      const p1 = i + j, p2 = i + j + 1;
      const total = mul + res[p2];
      res[p2] = total % 10;
      res[p1] += Math.floor(total / 10);
    }
  }
  const out = res.join("").replace(/^0+/, "");
  return out === "" ? "0" : out;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String multiply(String num1, String num2) {
        if (num1 == '0' || num2 == '0') return '0';
        Integer n = num1.length(), m = num2.length();
        List<Integer> res = new List<Integer>();
        for (Integer k = 0; k < n + m; k++) res.add(0);
        for (Integer i = n - 1; i >= 0; i--) {
            for (Integer j = m - 1; j >= 0; j--) {
                Integer mul = (num1.charAt(i) - 48) * (num2.charAt(j) - 48);
                Integer p1 = i + j, p2 = i + j + 1;
                Integer total = mul + res[p2];
                res[p2] = Math.mod(total, 10);
                res[p1] += total / 10;
            }
        }
        String outp = '';
        for (Integer d : res) {
            if (outp == '' && d == 0) continue;
            outp += String.valueOf(d);
        }
        return outp == '' ? '0' : outp;
    }
}`,
      },
    ],
  },
  {
    slug: "detect-squares",
    title: "Detect Squares",
    difficulty: "Medium",
    patterns: ["hashing"],
    topics: ["Hashing", "Math"],
    companies: ["amazon", "google"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Design a data structure that adds points from a stream and, given a query point, counts the number of axis-aligned squares that can be formed using the query point as one corner and three previously added points as the others. Implement add(point) and count(point).",
    beginnerExplanation:
      "A square (axis-aligned) is fixed once you know two diagonal corners. So for a query point, look at every stored point that could be its diagonal partner — one where the horizontal and vertical distances are equal and non-zero. For each such diagonal point, the other two corners are determined; multiply how many times each of those corners was added.",
    realWorldAnalogy:
      "Pin one corner of a picture frame (the query). Any stored pin that's an equal distance across and up/down is the opposite corner; the frame is only real if both remaining corners also have pins — and counts multiply if a spot was pinned several times.",
    visualExplanation:
      "query (px,py); diagonal point (x,y) needs |px-x| == |py-y| and x != px\nother corners: (x, py) and (px, y)\nsquares from this diagonal = cnt[(x,py)] * cnt[(px,y)]",
    approaches: [
      {
        title: "Brute force quadruples",
        tier: "Brute Force",
        idea: "On each count, examine all triples of stored points — far too slow.",
        steps: ["Try every combination of 3 stored points with the query"],
        time: "O(n³) per query",
        space: "O(n)",
      },
      {
        title: "Count map + diagonal scan",
        tier: "Optimal",
        idea: "Store point frequencies; for a query, scan candidate diagonal points and multiply the two completing-corner counts.",
        steps: [
          "add: increment cnt[point] and append to a points list",
          "count: for each stored point forming a valid diagonal (equal non-zero dx,dy)",
          "add cnt[(x,py)] * cnt[(px,y)] to the answer",
        ],
        time: "O(n) per count",
        space: "O(n)",
      },
    ],
    dryRun:
      "add (3,10),(11,2),(3,2); count (11,10)\ndiagonal (3,2): dx=8 dy=8 ok -> cnt[(3,10)]*cnt[(11,2)] = 1*1 = 1 square",
    interviewTips: [
      "The diagonal-corner insight (equal dx/dy) is the key — state it before coding.",
      "Use a frequency map keyed by the point so repeated adds multiply correctly.",
    ],
    commonMistakes: ["Counting degenerate squares where dx or dy is zero.", "Forgetting that points can be added multiple times."],
    followUps: ["Support rotated squares.", "Support removal of points."],
    related: ["valid-sudoku"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class DetectSquares:
    def __init__(self):
        self.cnt = {}
        self.points = []

    def add(self, point):
        key = (point[0], point[1])
        self.cnt[key] = self.cnt.get(key, 0) + 1
        self.points.append(key)

    def count(self, point):
        px, py = point
        res = 0
        for x, y in self.points:
            if abs(px - x) != abs(py - y) or x == px or y == py:
                continue
            res += self.cnt.get((x, py), 0) * self.cnt.get((px, y), 0)
        return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class DetectSquares {
    private Map<Long, Integer> cnt = new HashMap<>();
    private List<int[]> pts = new ArrayList<>();
    private long key(int x, int y) { return (long) x * 100001L + y; }

    public DetectSquares() {}

    public void add(int[] point) {
        cnt.merge(key(point[0], point[1]), 1, Integer::sum);
        pts.add(new int[] { point[0], point[1] });
    }

    public int count(int[] point) {
        int px = point[0], py = point[1], res = 0;
        for (int[] p : pts) {
            int x = p[0], y = p[1];
            if (Math.abs(px - x) != Math.abs(py - y) || x == px || y == py) continue;
            res += cnt.getOrDefault(key(x, py), 0) * cnt.getOrDefault(key(px, y), 0);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class DetectSquares {
  constructor() {
    this.cnt = new Map();
    this.pts = [];
  }
  add(point) {
    const k = point[0] + "," + point[1];
    this.cnt.set(k, (this.cnt.get(k) || 0) + 1);
    this.pts.push(point);
  }
  count(point) {
    const px = point[0], py = point[1];
    let res = 0;
    for (const [x, y] of this.pts) {
      if (Math.abs(px - x) !== Math.abs(py - y) || x === px || y === py) continue;
      res += (this.cnt.get(x + "," + py) || 0) * (this.cnt.get(px + "," + y) || 0);
    }
    return res;
  }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class DetectSquares {
    Map<String, Integer> cnt = new Map<String, Integer>();
    List<List<Integer>> pts = new List<List<Integer>>();
    String k(Integer x, Integer y) { return x + ',' + y; }

    public void addPoint(List<Integer> point) {
        String key = k(point[0], point[1]);
        cnt.put(key, (cnt.containsKey(key) ? cnt.get(key) : 0) + 1);
        pts.add(point);
    }

    public Integer countPoints(List<Integer> point) {
        Integer px = point[0], py = point[1], res = 0;
        for (List<Integer> p : pts) {
            Integer x = p[0], y = p[1];
            if (Math.abs(px - x) != Math.abs(py - y) || x == px || y == py) continue;
            Integer a = cnt.containsKey(k(x, py)) ? cnt.get(k(x, py)) : 0;
            Integer b = cnt.containsKey(k(px, y)) ? cnt.get(k(px, y)) : 0;
            res += a * b;
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "apple"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Each index of the array cost has a cost of stepping on that stair. You can start from index 0 or index 1, and from a stair you may climb one or two steps. Return the minimum cost to reach the top (just past the last stair).",
    beginnerExplanation:
      "The cheapest way to stand just past stair i is: take the cheaper of arriving from one stair back (and paying that stair) or two stairs back (and paying that stair). Track the two most recent best-costs and roll forward — classic Fibonacci-shaped DP with O(1) memory.",
    realWorldAnalogy:
      "Climbing a staircase where each step has a toll. At the top you look back: did it cost less to hop up from the step right below or the one two below? You always carry just the last two running totals.",
    visualExplanation:
      "cost=[10,15,20]\nreach step2 = min(0+15, 0+10) = 10\nreach top   = min(10+20, 0+15) = 15",
    approaches: [
      {
        title: "Top-down recursion",
        tier: "Brute Force",
        idea: "minCost(i) = cost[i] + min(minCost(i-1), minCost(i-2)) — exponential without memoisation.",
        steps: ["Recurse on i-1 and i-2"],
        time: "O(2ⁿ)",
        space: "O(n) stack",
      },
      {
        title: "Rolling two variables",
        tier: "Optimal",
        idea: "dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]); keep only the last two.",
        steps: [
          "a = b = 0 (cost to reach the first two standing points is 0)",
          "For i from 2..n: cur = min(b + cost[i-1], a + cost[i-2])",
          "Shift a, b forward; answer is b at i = n",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "cost=[1,100,1,1,1,100,1,1,100,1] -> answer 6 (skip the 100s)",
    interviewTips: [
      "Define 'reaching the top' as index n (one past the array) — clarifies the base cases.",
      "Mention the O(1) space optimisation after the O(n) table.",
    ],
    commonMistakes: ["Paying the cost of the top (it has none).", "Wrong base cases for the first two stairs."],
    followUps: ["Steps of size up to k.", "Reconstruct the cheapest path, not just its cost."],
    related: ["climbing-stairs", "house-robber"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def min_cost_climbing_stairs(cost):
    a = b = 0
    for i in range(2, len(cost) + 1):
        cur = min(b + cost[i - 1], a + cost[i - 2])
        a, b = b, cur
    return b`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int a = 0, b = 0;
        for (int i = 2; i <= cost.length; i++) {
            int cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
            a = b;
            b = cur;
        }
        return b;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function minCostClimbingStairs(cost) {
  let a = 0, b = 0;
  for (let i = 2; i <= cost.length; i++) {
    const cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = cur;
  }
  return b;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer minCostClimbingStairs(List<Integer> cost) {
        Integer a = 0, b = 0;
        for (Integer i = 2; i <= cost.size(); i++) {
            Integer cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
            a = b;
            b = cur;
        }
        return b;
    }
}`,
      },
    ],
  },
  {
    slug: "combination-sum-iv",
    title: "Combination Sum IV",
    difficulty: "Medium",
    patterns: ["dynamic-programming"],
    topics: ["Dynamic Programming"],
    companies: ["amazon", "google", "meta"],
    sheets: ["neetcode150", "blind75"],
    frequency: 3,
    statement:
      "Given an array of distinct integers nums and a target, return the number of possible combinations (ordered — different sequences count separately) that add up to target.",
    beginnerExplanation:
      "Despite the name, order matters here, so [1,2] and [2,1] are different — that makes it a counting DP, not backtracking. The number of ways to make t is the sum, over each number n you could use last, of the ways to make t - n. Build a table from 0 up to target.",
    realWorldAnalogy:
      "Counting the number of ordered ways to climb to a total using moves of fixed sizes — like making exact change where the order you hand over coins is considered distinct.",
    visualExplanation:
      "nums=[1,2,3], target=4\ndp[0]=1\ndp[1]=dp[0]=1\ndp[2]=dp[1]+dp[0]=2\ndp[3]=dp[2]+dp[1]+dp[0]=4\ndp[4]=dp[3]+dp[2]+dp[1]=7",
    approaches: [
      {
        title: "Backtracking enumeration",
        tier: "Brute Force",
        idea: "Recursively try each number at each position — counts correctly but explodes for large targets.",
        steps: ["Recurse subtracting each num until target hits 0"],
        time: "Exponential",
        space: "O(target) recursion",
      },
      {
        title: "Bottom-up counting DP",
        tier: "Optimal",
        idea: "dp[t] = sum of dp[t - n] for every n <= t; outer loop over totals so order is counted.",
        steps: [
          "dp = array of zeros size target+1; dp[0] = 1",
          "For t from 1..target: for each n in nums with n <= t: dp[t] += dp[t - n]",
          "Return dp[target]",
        ],
        time: "O(target · len(nums))",
        space: "O(target)",
      },
    ],
    dryRun: "nums=[1,2,3], target=4 -> dp=[1,1,2,4,7] -> 7",
    interviewTips: [
      "Stress that order matters → totals are the OUTER loop (the opposite of Coin Change 2).",
      "Mention the follow-up about negative numbers breaking the DP.",
    ],
    commonMistakes: [
      "Swapping the loop order (gives unordered combinations like Coin Change 2).",
      "Integer overflow on large targets (use 64-bit where needed).",
    ],
    followUps: ["What if negative numbers are allowed? (infinite combinations).", "Coin Change 2 (unordered count)."],
    related: ["coin-change", "climbing-stairs"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def combination_sum4(nums, target):
    dp = [0] * (target + 1)
    dp[0] = 1
    for t in range(1, target + 1):
        for n in nums:
            if n <= t:
                dp[t] += dp[t - n]
    return dp[target]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int t = 1; t <= target; t++) {
            for (int n : nums) {
                if (n <= t) dp[t] += dp[t - n];
            }
        }
        return dp[target];
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function combinationSum4(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const n of nums) {
      if (n <= t) dp[t] += dp[t - n];
    }
  }
  return dp[target];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer combinationSum4(List<Integer> nums, Integer target) {
        List<Integer> dp = new List<Integer>();
        for (Integer i = 0; i <= target; i++) dp.add(0);
        dp[0] = 1;
        for (Integer t = 1; t <= target; t++) {
            for (Integer n : nums) {
                if (n <= t) dp[t] += dp[t - n];
            }
        }
        return dp[target];
    }
}`,
      },
    ],
  },
  {
    slug: "valid-parenthesis-string",
    title: "Valid Parenthesis String",
    difficulty: "Medium",
    patterns: ["greedy"],
    topics: ["Strings", "Dynamic Programming"],
    companies: ["amazon", "meta"],
    sheets: ["neetcode150"],
    frequency: 2,
    statement:
      "Given a string of '(', ')' and '*', where '*' can be treated as '(', ')' or an empty string, determine whether the string can be made into a valid parentheses sequence.",
    beginnerExplanation:
      "The '*' wildcard makes a stack tricky, so instead track a RANGE of how many open brackets could be outstanding. 'low' is the fewest possible open count (treat '*' as ')'), 'high' is the most (treat '*' as '('). If 'high' ever drops below zero there are too many ')'; clamp 'low' at zero. At the end it's valid if 'low' can reach zero.",
    realWorldAnalogy:
      "You're tracking how many doors might still be open, but some switches ('*') are uncertain — they could open, close, or do nothing. You keep the best-case and worst-case count of open doors; the building is consistent only if zero open doors is achievable at the end.",
    visualExplanation:
      's="(*)"\n( -> low=1 high=1\n* -> low=0 high=2\n) -> low=-1->0 high=1\nend: low==0 -> valid',
    approaches: [
      {
        title: "Try every '*' substitution",
        tier: "Brute Force",
        idea: "Recursively replace each '*' with the three options and test validity — exponential.",
        steps: ["Branch on each '*'", "Check each fully-substituted string"],
        time: "O(3^k)",
        space: "O(n)",
      },
      {
        title: "Greedy open-count range (low/high)",
        tier: "Optimal",
        idea: "Maintain the min/max possible open-bracket counts; valid iff high never goes negative and low ends at 0.",
        steps: [
          "low = high = 0",
          "'(': low++, high++   ')': low--, high--   '*': low--, high++",
          "If high < 0 return false; if low < 0 set low = 0",
          "Return low == 0",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: 's="(*))"\n( low1 high1\n* low0 high2\n) low-1->0 high1\n) low-1->0 high0\nend low==0 -> valid',
    interviewTips: [
      "Explain WHY a single stack fails (the '*' ambiguity) before introducing the low/high range.",
      "Clamp low at 0 — a negative low just means those ')' were matched by earlier '*'.",
    ],
    commonMistakes: ["Returning true whenever high >= 0 (must check low == 0).", "Forgetting to clamp low at zero."],
    followUps: ["Two-pointer O(1) without DP.", "Count the number of valid interpretations."],
    related: ["valid-parentheses", "generate-parentheses"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def check_valid_string(s):
    low = high = 0
    for ch in s:
        if ch == "(":
            low += 1
            high += 1
        elif ch == ")":
            low -= 1
            high -= 1
        else:
            low -= 1
            high += 1
        if high < 0:
            return False
        if low < 0:
            low = 0
    return low == 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean checkValidString(String s) {
        int low = 0, high = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '(') { low++; high++; }
            else if (ch == ')') { low--; high--; }
            else { low--; high++; }
            if (high < 0) return false;
            if (low < 0) low = 0;
        }
        return low == 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function checkValidString(s) {
  let low = 0, high = 0;
  for (const ch of s) {
    if (ch === "(") { low++; high++; }
    else if (ch === ")") { low--; high--; }
    else { low--; high++; }
    if (high < 0) return false;
    if (low < 0) low = 0;
  }
  return low === 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean checkValidString(String s) {
        Integer low = 0, high = 0;
        for (Integer i = 0; i < s.length(); i++) {
            String ch = s.substring(i, i + 1);
            if (ch == '(') { low++; high++; }
            else if (ch == ')') { low--; high--; }
            else { low--; high++; }
            if (high < 0) return false;
            if (low < 0) low = 0;
        }
        return low == 0;
    }
}`,
      },
    ],
  },
];

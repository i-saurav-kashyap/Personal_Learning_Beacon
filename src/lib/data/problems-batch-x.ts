import type { Problem } from "@/lib/types";

// Bit Manipulation & Math (Striver A2Z gaps).

export const PROBLEMS_BATCH_X: Problem[] = [
  {
    slug: "check-if-the-kth-bit-is-set",
    title: "Check if the Kth Bit is Set",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer `n` and a bit position `k` (0-indexed from the least-significant bit), determine whether the k-th bit of `n` is set (equal to 1).",
    beginnerExplanation:
      "A number is just a row of bits. To inspect one specific bit, slide that bit down to the lowest position with a right shift, then mask everything except the last bit with `& 1`.",
    realWorldAnalogy:
      "Like checking whether a single light switch in a row of switches is ON: you walk to switch number k and look at just that one, ignoring the rest.",
    visualExplanation:
      "n = 13 = 1101, k = 2\n(13 >> 2) = 0011\n0011 & 1 = 1  → bit 2 is SET",
    approaches: [
      {
        title: "Shift and mask",
        tier: "Optimal",
        idea: "Right-shift n by k so the target bit becomes the lowest bit, then AND with 1.",
        steps: ["Compute n >> k", "AND the result with 1", "Non-zero ⇒ the bit is set"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "n=8 (1000), k=3 → (8>>3)=1 → 1&1=1 → set. k=1 → (8>>1)=4=100 → 100&1=0 → not set.",
    interviewTips: [
      "The equivalent `n & (1 << k)` also works — mention both; the mask form avoids shifting n.",
    ],
    commonMistakes: ["Using 1-indexed bits when the prompt is 0-indexed.", "Forgetting operator precedence — wrap the shift in parentheses."],
    followUps: ["Set / clear / toggle the k-th bit.", "Count how many bits are set overall."],
    related: ["number-of-1-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_kth_bit_set(n, k):
    return ((n >> k) & 1) == 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isKthBitSet(int n, int k) {
        return ((n >> k) & 1) == 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isKthBitSet(n, k) {
  return ((n >> k) & 1) === 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isKthBitSet(Integer n, Integer k) {
        return ((n >> k) & 1) == 1;
    }
}`,
      },
    ],
  },
  {
    slug: "check-if-a-number-is-odd-or-even-using-bits",
    title: "Check if a Number is Odd or Even using Bits",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Determine whether an integer `n` is odd or even using bit manipulation (without the modulo operator).",
    beginnerExplanation:
      "The very last bit of a binary number decides parity: it's 1 for odd numbers and 0 for even ones (because every higher bit represents an even value). So `n & 1` is all you need.",
    realWorldAnalogy:
      "Like checking if a number written in binary ends in an odd 'units' digit — only the final digit matters, just as only the last decimal digit decides odd/even in base 10.",
    visualExplanation: "5 = 101 → 101 & 1 = 1 → odd\n6 = 110 → 110 & 1 = 0 → even",
    approaches: [
      {
        title: "Mask the lowest bit",
        tier: "Optimal",
        idea: "AND with 1: the result is the value of the least-significant bit.",
        steps: ["Compute n & 1", "1 ⇒ odd, 0 ⇒ even"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "n=-3 → in two's complement the last bit is 1 → odd (note: language % can differ on negatives, & 1 is consistent for parity magnitude).",
    interviewTips: ["`& 1` is faster than `% 2` and avoids negative-modulo surprises."],
    commonMistakes: ["Relying on `% 2 == 1` for negatives, which is false in many languages for odd negatives."],
    followUps: ["Check parity of the count of set bits."],
    related: ["check-if-the-kth-bit-is-set"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_odd(n):
    return (n & 1) == 1`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isOdd(int n) {
        return (n & 1) == 1;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isOdd(n) {
  return (n & 1) === 1;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isOdd(Integer n) {
        return (n & 1) == 1;
    }
}`,
      },
    ],
  },
  {
    slug: "check-if-a-number-is-a-power-of-two",
    title: "Check if a Number is a Power of Two",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "apple", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given an integer `n`, return true if it is a power of two (1, 2, 4, 8, …), otherwise false.",
    beginnerExplanation:
      "A power of two has exactly one bit set (e.g. 8 = 1000). Subtracting 1 flips that bit to 0 and turns every lower bit to 1 (0111), so `n & (n-1)` wipes the only set bit and gives 0 — but only for powers of two.",
    realWorldAnalogy:
      "Like a single domino standing in a long row: knock it (subtract 1) and everything below tips over, leaving nothing in common with the original single standing piece.",
    visualExplanation: "n=8=1000, n-1=7=0111, 1000 & 0111 = 0000 → power of two\nn=6=110, n-1=101, 110 & 101 = 100 ≠ 0 → not",
    approaches: [
      {
        title: "Clear the lowest set bit",
        tier: "Optimal",
        idea: "n is a power of two iff n>0 and n & (n-1) == 0.",
        steps: ["Reject n ≤ 0", "Compute n & (n-1)", "Zero ⇒ exactly one bit set ⇒ power of two"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "n=1 → 1 & 0 = 0 → true. n=0 → rejected (≤0) → false. n=16 → 16 & 15 = 0 → true.",
    interviewTips: ["Guard n > 0 first — without it, n=0 wrongly passes."],
    commonMistakes: ["Forgetting the n > 0 check.", "Confusing with 'power of four', which needs an extra mask."],
    followUps: ["Is it a power of four?", "Round up to the next power of two."],
    related: ["number-of-1-bits"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Boolean isPowerOfTwo(Integer n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
      },
    ],
  },
  {
    slug: "set-the-rightmost-unset-bit",
    title: "Set the Rightmost Unset Bit",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Given a non-negative integer `n`, set its rightmost 0-bit (the lowest unset bit) to 1 and return the result. If all bits are already set, return n unchanged.",
    beginnerExplanation:
      "`n + 1` flips the lowest run of 1s to 0 and turns the first 0 into a 1. ORing that back with n keeps all original 1s and adds exactly the one newly-set bit: `n | (n + 1)`.",
    realWorldAnalogy:
      "Like filling the first empty parking spot from the left in a row of cars — you find the lowest gap and put a car there, leaving every occupied spot as-is.",
    visualExplanation: "n = 6 = 110, n+1 = 111, 110 | 111 = 111 = 7 (the rightmost 0 at position 0 is now 1)",
    approaches: [
      {
        title: "OR with n+1",
        tier: "Optimal",
        idea: "n | (n + 1) sets exactly the lowest unset bit.",
        steps: ["Compute n + 1", "OR with n"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "n=10=1010 → n+1=1011 → 1010|1011 = 1011 = 11 (bit 0 set).",
    interviewTips: ["Contrast with `n & (n-1)` which CLEARS the lowest set bit — the dual operation."],
    commonMistakes: ["Confusing 'set lowest unset' with 'clear lowest set'."],
    followUps: ["Clear the rightmost set bit.", "Isolate the rightmost set bit with n & -n."],
    related: ["check-if-a-number-is-a-power-of-two"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def set_rightmost_unset_bit(n):
    return n | (n + 1)` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public int setRightmostUnsetBit(int n) {
        return n | (n + 1);
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function setRightmostUnsetBit(n) {
  return n | (n + 1);
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static Integer setRightmostUnsetBit(Integer n) {
        return n | (n + 1);
    }
}` },
    ],
  },
  {
    slug: "swap-two-numbers-without-temp",
    title: "Swap Two Numbers without Temp",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["microsoft"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Swap the values of two integers `a` and `b` without using a temporary variable. Return the swapped pair.",
    beginnerExplanation:
      "XOR has a neat property: a value XORed with itself cancels to 0. Apply XOR three times and the two variables exchange contents with no scratch space.",
    realWorldAnalogy:
      "Like two people exchanging hats by a precise sequence of hand-offs that needs no third hand to hold a hat.",
    visualExplanation: "a=5(101), b=9(1001)\na ^= b → 1100\nb ^= a → 101 (=5)\na ^= b → 1001 (=9)\nnow a=9, b=5",
    approaches: [
      {
        title: "XOR swap",
        tier: "Optimal",
        idea: "a ^= b; b ^= a; a ^= b. (Addition/subtraction also works but can overflow.)",
        steps: ["a = a ^ b", "b = a ^ b (now b holds old a)", "a = a ^ b (now a holds old b)"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "a=3,b=7 → a=3^7=4 → b=4^7=3 → a=4^3=7 → a=7,b=3 ✓",
    interviewTips: ["Warn that XOR-swap breaks if a and b are the SAME memory location (aliasing) → zeroes it out."],
    commonMistakes: ["Using XOR-swap on aliased references.", "Assuming it's faster than a temp — modern compilers favour the temp."],
    followUps: ["Swap using arithmetic (and why overflow makes it risky)."],
    related: ["set-the-rightmost-unset-bit"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def swap(a, b):
    a ^= b
    b ^= a
    a ^= b
    return a, b` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public int[] swap(int a, int b) {
        a ^= b;
        b ^= a;
        a ^= b;
        return new int[] { a, b };
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function swap(a, b) {
  a ^= b;
  b ^= a;
  a ^= b;
  return [a, b];
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static List<Integer> swap(Integer a, Integer b) {
        a ^= b;
        b ^= a;
        a ^= b;
        return new List<Integer>{ a, b };
    }
}` },
    ],
  },
  {
    slug: "divide-two-integers-without-multiplication",
    title: "Divide Two Integers without Multiplication",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Divide `dividend` by `divisor` without using multiplication, division, or modulo, returning the integer quotient (truncated toward zero). Clamp to the 32-bit signed range.",
    beginnerExplanation:
      "Division is repeated subtraction, but subtracting one divisor at a time is too slow. Instead subtract the largest shifted multiple of the divisor that still fits (divisor<<k), record 2^k in the quotient, and repeat — this is long division in binary.",
    realWorldAnalogy:
      "Like making change with the biggest bills first: subtract the largest power-of-two multiple of the divisor you can, then work down to smaller ones.",
    visualExplanation:
      "22 / 3: 3<<2=12 ≤ 22 → q+=4, rem=10; 3<<1=6 ≤ 10 → q+=2, rem=4; 3<<0=3 ≤ 4 → q+=1, rem=1 → quotient 7",
    approaches: [
      {
        title: "Repeated subtraction",
        tier: "Brute Force",
        idea: "Subtract the divisor until the dividend is smaller, counting steps.",
        steps: ["Loop subtracting |divisor| from |dividend|", "Count iterations"],
        time: "O(dividend / divisor)",
        space: "O(1)",
      },
      {
        title: "Binary long division (shift-and-subtract)",
        tier: "Optimal",
        idea: "Work in long/unsigned magnitudes; for each bit from high to low, if (divisor<<k) fits, subtract it and add 2^k to the quotient.",
        steps: [
          "Handle the INT_MIN / -1 overflow case → return INT_MAX",
          "Track the sign; work with absolute values as longs",
          "For k from 31 down to 0: if (divisor<<k) ≤ remaining, subtract it and add 1<<k to quotient",
          "Apply the sign and clamp to [-2^31, 2^31-1]",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "dividend=-7, divisor=2 → sign negative, magnitudes 7/2: 2<<1=4≤7 q+=2 rem=3; 2<<0=2≤3 q+=1 rem=1 → 3 → negate → -3.",
    interviewTips: [
      "The single overflow case is INT_MIN / -1 → return INT_MAX; call it out explicitly.",
      "Use a wider type (long) for the shifting so divisor<<k doesn't overflow.",
    ],
    commonMistakes: ["Forgetting the INT_MIN/-1 overflow.", "Sign-handling bugs with negative operands.", "Overflow in divisor<<k when using 32-bit math."],
    followUps: ["Return the remainder too.", "Do it without any 64-bit type."],
    related: ["fast-exponentiation"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def divide(dividend, divisor):
    INT_MAX, INT_MIN = 2**31 - 1, -2**31
    if dividend == INT_MIN and divisor == -1:
        return INT_MAX
    negative = (dividend < 0) ^ (divisor < 0)
    a, b = abs(dividend), abs(divisor)
    quotient = 0
    for k in range(31, -1, -1):
        if (b << k) <= a:
            a -= b << k
            quotient += 1 << k
    quotient = -quotient if negative else quotient
    return max(INT_MIN, min(INT_MAX, quotient))` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
        boolean negative = (dividend < 0) ^ (divisor < 0);
        long a = Math.abs((long) dividend), b = Math.abs((long) divisor);
        long quotient = 0;
        for (int k = 31; k >= 0; k--) {
            if ((b << k) <= a) {
                a -= b << k;
                quotient += 1L << k;
            }
        }
        quotient = negative ? -quotient : quotient;
        if (quotient > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (quotient < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int) quotient;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function divide(dividend, divisor) {
  const INT_MAX = 2147483647, INT_MIN = -2147483648;
  if (dividend === INT_MIN && divisor === -1) return INT_MAX;
  const negative = (dividend < 0) !== (divisor < 0);
  let a = Math.abs(dividend), b = Math.abs(divisor), quotient = 0;
  for (let k = 31; k >= 0; k--) {
    if (b * 2 ** k <= a) {
      a -= b * 2 ** k;
      quotient += 2 ** k;
    }
  }
  if (negative) quotient = -quotient;
  return Math.max(INT_MIN, Math.min(INT_MAX, quotient));
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static Integer divide(Long dividend, Long divisor) {
        Long INT_MAX = 2147483647L, INT_MIN = -2147483648L;
        if (dividend == INT_MIN && divisor == -1) return INT_MAX.intValue();
        Boolean negative = (dividend < 0) ^ (divisor < 0);
        Long a = Math.abs(dividend), b = Math.abs(divisor), quotient = 0L;
        for (Integer k = 31; k >= 0; k--) {
            if ((b << k) <= a) {
                a -= b << k;
                quotient += 1L << k;
            }
        }
        if (negative) quotient = -quotient;
        if (quotient > INT_MAX) return INT_MAX.intValue();
        if (quotient < INT_MIN) return INT_MIN.intValue();
        return quotient.intValue();
    }
}` },
    ],
  },
  {
    slug: "count-set-bits-from-1-to-n",
    title: "Count Set Bits from 1 to N",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer `n`, return the total number of set bits (1s) across the binary representations of all integers from 1 to n.",
    beginnerExplanation:
      "Counting bit-by-bit beats counting number-by-number. For each bit position, the values 0..n cycle through that bit in a fixed pattern (0s then 1s of a known length), so you can compute how many times it is 1 directly.",
    realWorldAnalogy:
      "Like counting how many times the 'minutes' digit shows a 5 over a whole day — you reason about the repeating cycle rather than reading every clock tick.",
    visualExplanation:
      "n=5: numbers 1..5 = 1,10,11,100,101 → set bits 1+1+2+1+2 = 7",
    approaches: [
      {
        title: "Popcount each number",
        tier: "Brute Force",
        idea: "For every i in 1..n, count its set bits and sum.",
        steps: ["Loop i = 1..n", "Add popcount(i)"],
        time: "O(n log n)",
        space: "O(1)",
      },
      {
        title: "Per-bit cycle counting",
        tier: "Optimal",
        idea: "For each bit i, integers in [0,n] toggle that bit in cycles of 2^(i+1): the bit is 1 for the upper half of each cycle.",
        steps: [
          "For each bit i while 2^i ≤ n:",
          "cycle = 2^(i+1); full cycles contribute (n+1)/cycle * 2^i",
          "Add the partial: max(0, (n+1) mod cycle − 2^i)",
        ],
        time: "O(log n)",
        space: "O(1)",
      },
    ],
    dryRun: "n=3, bit0: cycle=2, full=(4)/2=2→2*1=2, rem=0→+0; bit1: cycle=4, full=1→2, rem=0 → total 4 (=popcount 1+1+2).",
    interviewTips: ["The recursive 'highest power of two' formula is an equivalent O(log n) approach — either is fine."],
    commonMistakes: ["Off-by-one: count over [0,n] (0 adds nothing) vs [1,n].", "Overflow for large n — use a wide accumulator."],
    followUps: ["Counting Bits (return the array 0..n).", "Count set bits in a range [L,R]."],
    related: ["counting-bits", "number-of-1-bits"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def count_set_bits(n):
    total = 0
    i = 0
    while (1 << i) <= n:
        cycle = 1 << (i + 1)
        total += ((n + 1) // cycle) * (1 << i)
        total += max(0, ((n + 1) % cycle) - (1 << i))
        i += 1
    return total` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public long countSetBits(int n) {
        long total = 0;
        for (int i = 0; (1L << i) <= n; i++) {
            long cycle = 1L << (i + 1);
            total += ((long) (n + 1) / cycle) * (1L << i);
            total += Math.max(0, ((n + 1) % cycle) - (1L << i));
        }
        return total;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function countSetBits(n) {
  let total = 0;
  for (let i = 0; 2 ** i <= n; i++) {
    const cycle = 2 ** (i + 1);
    total += Math.floor((n + 1) / cycle) * 2 ** i;
    total += Math.max(0, ((n + 1) % cycle) - 2 ** i);
  }
  return total;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static Long countSetBits(Integer n) {
        Long total = 0;
        Integer i = 0;
        while ((1L << i) <= n) {
            Long cycle = 1L << (i + 1);
            Long higher = ((Long) (n + 1)) / cycle;
            total += higher * (1L << i);
            Long partial = (((Long) (n + 1)) - higher * cycle) - (1L << i);
            if (partial > 0) total += partial;
            i++;
        }
        return total;
    }
}` },
    ],
  },
  {
    slug: "minimum-bit-flips-to-convert-number",
    title: "Minimum Bit Flips to Convert Number",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Given two integers `start` and `goal`, return the minimum number of bit flips required to convert `start` into `goal` (one flip toggles a single bit).",
    beginnerExplanation:
      "Bits differ exactly where start XOR goal is 1. So the answer is just the number of set bits in `start ^ goal`.",
    realWorldAnalogy:
      "Like comparing two rows of light switches and counting how many you must toggle — only the positions that disagree need flipping.",
    visualExplanation: "start=10(1010), goal=7(0111) → XOR=1101 → 3 set bits → 3 flips",
    approaches: [
      {
        title: "Popcount of XOR",
        tier: "Optimal",
        idea: "Differing bits = start ^ goal; count its set bits.",
        steps: ["Compute x = start ^ goal", "Count set bits of x (Brian Kernighan: x &= x-1)"],
        time: "O(number of differing bits)",
        space: "O(1)",
      },
    ],
    dryRun: "start=3(11), goal=4(100) → XOR=111 → 3 flips.",
    interviewTips: ["Brian Kernighan's `x &= x-1` clears the lowest set bit each step — iterates once per set bit."],
    commonMistakes: ["Counting all 32 bit positions instead of just differing ones (still correct, just slower)."],
    followUps: ["Which positions flip?", "Hamming distance across an array of numbers."],
    related: ["number-of-1-bits"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def min_bit_flips(start, goal):
    x = start ^ goal
    count = 0
    while x:
        x &= x - 1
        count += 1
    return count` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public int minBitFlips(int start, int goal) {
        int x = start ^ goal, count = 0;
        while (x != 0) {
            x &= x - 1;
            count++;
        }
        return count;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function minBitFlips(start, goal) {
  let x = start ^ goal, count = 0;
  while (x !== 0) {
    x &= x - 1;
    count++;
  }
  return count;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static Integer minBitFlips(Integer start, Integer goal) {
        Integer x = start ^ goal, count = 0;
        while (x != 0) {
            x &= x - 1;
            count++;
        }
        return count;
    }
}` },
    ],
  },
  {
    slug: "number-appearing-odd-number-of-times",
    title: "Number Appearing Odd Number of Times",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "In an array where every element appears an even number of times except one element that appears an odd number of times, find that single element.",
    beginnerExplanation:
      "XOR cancels equal pairs to 0 (x ^ x = 0) and leaves any unpaired value untouched (x ^ 0 = x). XOR the whole array and only the odd-count element survives.",
    realWorldAnalogy:
      "Like pairing up socks: every matched pair gets put away, and whatever sock is left unpaired at the end is your answer.",
    visualExplanation: "[1,2,3,2,3,1,3] → 1^2^3^2^3^1^3 = 3 (pairs cancel, one 3 remains)",
    approaches: [
      {
        title: "Hash count",
        tier: "Brute Force",
        idea: "Count occurrences in a map, return the one with an odd count.",
        steps: ["Tally counts", "Return the key with an odd value"],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "XOR fold",
        tier: "Optimal",
        idea: "XOR all elements; pairs vanish and the odd one remains.",
        steps: ["ans = 0", "ans ^= each element", "Return ans"],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "[4,4,7] → 0^4=4 → 4^4=0 → 0^7=7 → answer 7.",
    interviewTips: ["This is the same trick as 'Single Number'; mention the relationship."],
    commonMistakes: ["Reaching for a hash map when O(1) space via XOR is available."],
    followUps: ["Two elements appear an odd number of times.", "Every element thrice except one."],
    related: ["single-number", "missing-number"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def odd_occurrence(nums):
    ans = 0
    for x in nums:
        ans ^= x
    return ans` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public int oddOccurrence(int[] nums) {
        int ans = 0;
        for (int x : nums) ans ^= x;
        return ans;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function oddOccurrence(nums) {
  let ans = 0;
  for (const x of nums) ans ^= x;
  return ans;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static Integer oddOccurrence(List<Integer> nums) {
        Integer ans = 0;
        for (Integer x : nums) ans ^= x;
        return ans;
    }
}` },
    ],
  },
  {
    slug: "xor-of-numbers-from-l-to-r",
    title: "XOR of Numbers from L to R",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Bit Manipulation"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Given two integers `L` and `R`, return the XOR of all integers in the inclusive range [L, R].",
    beginnerExplanation:
      "XOR over [L,R] equals prefixXor(R) XOR prefixXor(L-1), because the [0, L-1] part cancels itself out. And prefixXor(0..n) follows a 4-cycle pattern based on n % 4, so each prefix is O(1).",
    realWorldAnalogy:
      "Like computing a range sum with prefix sums — precompute totals from 0, then subtract; here 'subtract' is itself XOR because XOR is its own inverse.",
    visualExplanation:
      "prefixXor(n): n%4==0→n, ==1→1, ==2→n+1, ==3→0.\nXOR[4..7] = pref(7) ^ pref(3) = 0 ^ 0 = 0",
    approaches: [
      {
        title: "Loop the range",
        tier: "Brute Force",
        idea: "XOR every value from L to R.",
        steps: ["ans=0; for i in L..R: ans^=i"],
        time: "O(R-L)",
        space: "O(1)",
      },
      {
        title: "Prefix-XOR 4-cycle",
        tier: "Optimal",
        idea: "Use the closed form for prefixXor(0..n), then combine.",
        steps: ["pref(n): switch n%4 → {n,1,n+1,0}", "Return pref(R) ^ pref(L-1)"],
        time: "O(1)",
        space: "O(1)",
      },
    ],
    dryRun: "L=3,R=5 → pref(5): 5%4=1→1; pref(2): 2%4=2→3 → 1^3 = 2. Check 3^4^5 = 2 ✓",
    interviewTips: ["Derive the 4-cycle on the spot by listing prefixXor for 0..7 — interviewers like the derivation."],
    commonMistakes: ["Using pref(L) instead of pref(L-1).", "Mishandling L=0."],
    followUps: ["Sum over a range (different closed form)."],
    related: ["number-appearing-odd-number-of-times"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def xor_l_to_r(L, R):
    def pref(n):
        return [n, 1, n + 1, 0][n % 4]
    return pref(R) ^ pref(L - 1)` },
      { kind: "Interview", language: "Java", code: `class Solution {
    private int pref(int n) {
        switch (n % 4) {
            case 0: return n;
            case 1: return 1;
            case 2: return n + 1;
            default: return 0;
        }
    }
    public int xorLtoR(int L, int R) {
        return pref(R) ^ pref(L - 1);
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function xorLtoR(L, R) {
  const pref = (n) => [n, 1, n + 1, 0][n % 4];
  return pref(R) ^ pref(L - 1);
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    static Integer pref(Integer n) {
        Integer m = Math.mod(n, 4);
        if (m == 0) return n;
        if (m == 1) return 1;
        if (m == 2) return n + 1;
        return 0;
    }
    public static Integer xorLtoR(Integer L, Integer R) {
        return pref(R) ^ pref(L - 1);
    }
}` },
    ],
  },
  {
    slug: "prime-factors-of-a-number",
    title: "Prime Factors of a Number",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Math"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer `n`, return its prime factorization — the list of prime factors with multiplicity (e.g. 60 → [2, 2, 3, 5]).",
    beginnerExplanation:
      "Repeatedly pull out the smallest factor. Divide out all 2s, then all 3s, and so on. You only need to try divisors up to √n, because any remaining value > 1 after that loop is itself a prime factor.",
    realWorldAnalogy:
      "Like breaking a number into its 'atomic' building blocks — keep splitting by the smallest piece that divides it until only indivisible primes remain.",
    visualExplanation: "84 → /2 → 42 → /2 → 21 → /3 → 7 → 7 is prime → [2,2,3,7]",
    approaches: [
      {
        title: "Trial division to √n",
        tier: "Optimal",
        idea: "For d from 2 while d*d ≤ n, divide out all copies of d; any leftover n>1 is prime.",
        steps: ["For d=2,3,... while d*d ≤ n: while n%d==0 append d, n/=d", "If n>1 append n"],
        time: "O(√n)",
        space: "O(log n) output",
      },
    ],
    dryRun: "n=18: d=2 → 18/2=9, [2]; d=3 → 9/3=3/3=1, [2,3,3]; n=1 done → [2,3,3].",
    interviewTips: ["Stopping at √n is the key insight — explain why the leftover must be prime."],
    commonMistakes: ["Looping d to n (O(n) instead of O(√n)).", "Forgetting the final n>1 prime."],
    followUps: ["Distinct prime factors only.", "Factorize many queries fast with a smallest-prime-factor sieve."],
    related: ["all-divisors-of-a-number", "smallest-prime-factor-using-sieve"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def prime_factors(n):
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors` },
      { kind: "Interview", language: "Java", code: `import java.util.*;

class Solution {
    public List<Integer> primeFactors(int n) {
        List<Integer> factors = new ArrayList<>();
        for (int d = 2; (long) d * d <= n; d++) {
            while (n % d == 0) {
                factors.add(d);
                n /= d;
            }
        }
        if (n > 1) factors.add(n);
        return factors;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function primeFactors(n) {
  const factors = [];
  for (let d = 2; d * d <= n; d++) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static List<Integer> primeFactors(Integer n) {
        List<Integer> factors = new List<Integer>();
        for (Integer d = 2; (Long) d * d <= n; d++) {
            while (Math.mod(n, d) == 0) {
                factors.add(d);
                n /= d;
            }
        }
        if (n > 1) factors.add(n);
        return factors;
    }
}` },
    ],
  },
  {
    slug: "all-divisors-of-a-number",
    title: "All Divisors of a Number",
    difficulty: "Easy",
    patterns: ["bit-manipulation"],
    topics: ["Math"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Given an integer `n`, return all of its divisors in ascending order.",
    beginnerExplanation:
      "Divisors come in pairs: if d divides n, so does n/d. So you only loop d up to √n and collect both d and n/d, then sort.",
    realWorldAnalogy:
      "Like finding every way to arrange n items into a perfect rectangle — each width d pairs with a height n/d, so you only test widths up to the square.",
    visualExplanation: "n=36: d=1→(1,36), 2→(2,18), 3→(3,12), 4→(4,9), 6→(6,6) → [1,2,3,4,6,9,12,18,36]",
    approaches: [
      {
        title: "Check every number",
        tier: "Brute Force",
        idea: "Test each i from 1..n for divisibility.",
        steps: ["For i=1..n: if n%i==0 collect i"],
        time: "O(n)",
        space: "O(√n)",
      },
      {
        title: "Pair up to √n",
        tier: "Optimal",
        idea: "For each d up to √n that divides n, add d and n/d (avoid double-adding the square root).",
        steps: ["For d=1 while d*d ≤ n: if n%d==0 add d and (if d != n/d) n/d", "Sort the collected divisors"],
        time: "O(√n log n)",
        space: "O(√n)",
      },
    ],
    dryRun: "n=12: d=1→1,12; d=2→2,6; d=3→3,4 (3*3=9<12); d=4? 4*4=16>12 stop → sort → [1,2,3,4,6,12].",
    interviewTips: ["Remember to add n/d only when it differs from d (perfect squares)."],
    commonMistakes: ["Double-counting the square root for perfect squares.", "Forgetting to sort the output."],
    followUps: ["Count divisors without listing them.", "Sum of divisors."],
    related: ["prime-factors-of-a-number"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def all_divisors(n):
    divisors = []
    d = 1
    while d * d <= n:
        if n % d == 0:
            divisors.append(d)
            if d != n // d:
                divisors.append(n // d)
        d += 1
    return sorted(divisors)` },
      { kind: "Interview", language: "Java", code: `import java.util.*;

class Solution {
    public List<Integer> allDivisors(int n) {
        List<Integer> divisors = new ArrayList<>();
        for (int d = 1; (long) d * d <= n; d++) {
            if (n % d == 0) {
                divisors.add(d);
                if (d != n / d) divisors.add(n / d);
            }
        }
        Collections.sort(divisors);
        return divisors;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function allDivisors(n) {
  const divisors = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      divisors.push(d);
      if (d !== n / d) divisors.push(n / d);
    }
  }
  return divisors.sort((a, b) => a - b);
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static List<Integer> allDivisors(Integer n) {
        List<Integer> divisors = new List<Integer>();
        for (Integer d = 1; (Long) d * d <= n; d++) {
            if (Math.mod(n, d) == 0) {
                divisors.add(d);
                if (d != n / d) divisors.add(n / d);
            }
        }
        divisors.sort();
        return divisors;
    }
}` },
    ],
  },
  {
    slug: "sieve-of-eratosthenes",
    title: "Sieve of Eratosthenes",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Math"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Given an integer `n`, return all prime numbers less than or equal to n using the Sieve of Eratosthenes.",
    beginnerExplanation:
      "Assume every number is prime, then cross out the multiples of each prime you find. Start at 2, strike 4,6,8,…; move to 3, strike 9,12,15,…; whatever survives is prime. Crossing out from p*p (not 2p) avoids redundant work.",
    realWorldAnalogy:
      "Like a stadium where everyone stands, then you ask multiples of 2 to sit, then multiples of 3, and so on — the people still standing are the primes.",
    visualExplanation: "n=10: start 2..10 all prime; cross 4,6,8,10 (×2), 9 (×3) → primes [2,3,5,7]",
    approaches: [
      {
        title: "Check each number for primality",
        tier: "Brute Force",
        idea: "Test every number up to n by trial division.",
        steps: ["For i=2..n: trial-divide to √i"],
        time: "O(n√n)",
        space: "O(1)",
      },
      {
        title: "Sieve",
        tier: "Optimal",
        idea: "Mark composites by striking multiples of each prime starting at p*p.",
        steps: [
          "Boolean array isPrime[0..n] = true; 0,1 = false",
          "For p=2 while p*p ≤ n: if isPrime[p], strike p*p, p*p+p, … as composite",
          "Collect indices still true",
        ],
        time: "O(n log log n)",
        space: "O(n)",
      },
    ],
    dryRun: "n=12: strike multiples of 2 (4,6,8,10,12), of 3 (9, 12 already) → primes 2,3,5,7,11.",
    interviewTips: ["Start striking at p*p, and only loop p while p*p ≤ n — common optimisation points."],
    commonMistakes: ["Starting the inner strike at 2p (still correct but slower).", "Marking 0/1 as prime."],
    followUps: ["Segmented sieve for large ranges.", "Smallest-prime-factor sieve for fast factorization."],
    related: ["smallest-prime-factor-using-sieve", "prime-factors-of-a-number"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def sieve(n):
    is_prime = [True] * (n + 1)
    if n >= 0:
        is_prime[0] = False
    if n >= 1:
        is_prime[1] = False
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for m in range(p * p, n + 1, p):
                is_prime[m] = False
        p += 1
    return [i for i in range(2, n + 1) if is_prime[i]]` },
      { kind: "Interview", language: "Java", code: `import java.util.*;

class Solution {
    public List<Integer> sieve(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);
        if (n >= 0) isPrime[0] = false;
        if (n >= 1) isPrime[1] = false;
        for (int p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (int m = p * p; m <= n; m += p) isPrime[m] = false;
            }
        }
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) if (isPrime[i]) primes.add(i);
        return primes;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  if (n >= 0) isPrime[0] = false;
  if (n >= 1) isPrime[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let m = p * p; m <= n; m += p) isPrime[m] = false;
    }
  }
  const primes = [];
  for (let i = 2; i <= n; i++) if (isPrime[i]) primes.push(i);
  return primes;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static List<Integer> sieve(Integer n) {
        List<Boolean> isPrime = new List<Boolean>();
        for (Integer i = 0; i <= n; i++) isPrime.add(true);
        if (n >= 0) isPrime[0] = false;
        if (n >= 1) isPrime[1] = false;
        for (Integer p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (Integer m = p * p; m <= n; m += p) isPrime[m] = false;
            }
        }
        List<Integer> primes = new List<Integer>();
        for (Integer i = 2; i <= n; i++) if (isPrime[i]) primes.add(i);
        return primes;
    }
}` },
    ],
  },
  {
    slug: "smallest-prime-factor-using-sieve",
    title: "Smallest Prime Factor using Sieve",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Math"],
    companies: ["google"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Precompute the smallest prime factor (SPF) of every integer from 2 to n. Return the SPF array so any number ≤ n can later be factorized in O(log n).",
    beginnerExplanation:
      "A modified sieve records, for each number, the first prime that strikes it. Once you have this SPF table, factorizing any value is just: divide by its SPF repeatedly — no trial division needed.",
    realWorldAnalogy:
      "Like labelling every locker with the first key that opens it; afterwards you can unlock (factorize) any locker instantly by following its labels.",
    visualExplanation: "spf: 2→2, 3→3, 4→2, 6→2, 9→3, 12→2 …  Factorize 12: 12→spf 2→6→spf 2→3→spf 3→1 ⇒ [2,2,3]",
    approaches: [
      {
        title: "Sieve recording the first prime",
        tier: "Optimal",
        idea: "Initialize spf[i]=i; for each prime p, set spf[m]=p for multiples m that don't yet have a smaller prime.",
        steps: [
          "spf[i] = i for all i",
          "For p=2..n: if spf[p]==p (p is prime), for multiples m=p*p..n step p: if spf[m]==m set spf[m]=p",
          "Return spf",
        ],
        time: "O(n log log n)",
        space: "O(n)",
      },
    ],
    dryRun: "n=10 → spf=[_, _,2,3,2,5,2,7,2,3,2]; factorize 18 via spf: 18→2→9→3→3→3→1 ⇒ [2,3,3].",
    interviewTips: ["Great when you must factorize MANY queries — O(log n) each after O(n log log n) preprocessing."],
    commonMistakes: ["Overwriting spf[m] when it was already set by a smaller prime — guard with spf[m]==m."],
    followUps: ["Use the SPF table to list prime factors of a query.", "Count distinct prime factors for all i ≤ n."],
    related: ["sieve-of-eratosthenes", "prime-factors-of-a-number"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def smallest_prime_factors(n):
    spf = list(range(n + 1))
    p = 2
    while p * p <= n:
        if spf[p] == p:  # p is prime
            for m in range(p * p, n + 1, p):
                if spf[m] == m:
                    spf[m] = p
        p += 1
    return spf` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public int[] smallestPrimeFactors(int n) {
        int[] spf = new int[n + 1];
        for (int i = 0; i <= n; i++) spf[i] = i;
        for (int p = 2; p * p <= n; p++) {
            if (spf[p] == p) {
                for (int m = p * p; m <= n; m += p) {
                    if (spf[m] == m) spf[m] = p;
                }
            }
        }
        return spf;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function smallestPrimeFactors(n) {
  const spf = Array.from({ length: n + 1 }, (_, i) => i);
  for (let p = 2; p * p <= n; p++) {
    if (spf[p] === p) {
      for (let m = p * p; m <= n; m += p) {
        if (spf[m] === m) spf[m] = p;
      }
    }
  }
  return spf;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static List<Integer> smallestPrimeFactors(Integer n) {
        List<Integer> spf = new List<Integer>();
        for (Integer i = 0; i <= n; i++) spf.add(i);
        for (Integer p = 2; p * p <= n; p++) {
            if (spf[p] == p) {
                for (Integer m = p * p; m <= n; m += p) {
                    if (spf[m] == m) spf[m] = p;
                }
            }
        }
        return spf;
    }
}` },
    ],
  },
  {
    slug: "fast-exponentiation",
    title: "Fast Exponentiation",
    difficulty: "Medium",
    patterns: ["bit-manipulation"],
    topics: ["Math"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Compute x raised to the power p in O(log p) time (binary exponentiation). A modulus variant computes (x^p) mod m to keep numbers bounded.",
    beginnerExplanation:
      "Instead of multiplying x by itself p times, use the binary form of p. Square the base each step; whenever the current bit of p is 1, fold the running square into the answer. p halves each step, so it's O(log p).",
    realWorldAnalogy:
      "Like doubling your way up: to climb p stairs you don't take one at a time — you repeatedly double your step (1,2,4,8…) and combine the doublings that add up to p.",
    visualExplanation:
      "x^13, 13 = 1101b → result = x^8 · x^4 · x^1. Square base 1→x→x^2→x^4→x^8, multiply in when the bit is 1.",
    approaches: [
      {
        title: "Multiply p times",
        tier: "Brute Force",
        idea: "Multiply the result by x, p times.",
        steps: ["result=1; repeat p times: result*=x"],
        time: "O(p)",
        space: "O(1)",
      },
      {
        title: "Binary exponentiation",
        tier: "Optimal",
        idea: "Square the base and consume p bit by bit; multiply when the low bit is 1.",
        steps: [
          "result=1, base=x",
          "While p>0: if p&1 result*=base; base*=base; p>>=1",
          "(For mod, take % m after each multiply)",
        ],
        time: "O(log p)",
        space: "O(1)",
      },
    ],
    dryRun: "x=2,p=10 (1010b): p odd? no, base→4,p=5; odd→res=4,base→16,p=2; even,base→256,p=1; odd→res=1024,base…,p=0 → 1024.",
    interviewTips: ["Mention the modular variant — essential when results overflow (e.g. competitive / crypto).", "Handle negative exponents (x^-p = 1 / x^p) if reals are allowed."],
    commonMistakes: ["Overflow without the modulus.", "Forgetting p==0 → 1.", "Using O(p) repeated multiplication and TLE-ing."],
    followUps: ["Modular exponentiation (x^p mod m).", "Matrix exponentiation for linear recurrences."],
    related: ["pow-x-n", "divide-two-integers-without-multiplication"],
    solutions: [
      { kind: "Interview", language: "Python", code: `def fast_pow(x, p, mod=None):
    result = 1
    base = x % mod if mod else x
    while p > 0:
        if p & 1:
            result = result * base % mod if mod else result * base
        base = base * base % mod if mod else base * base
        p >>= 1
    return result` },
      { kind: "Interview", language: "Java", code: `class Solution {
    public long fastPow(long x, long p, long mod) {
        long result = 1, base = x % mod;
        while (p > 0) {
            if ((p & 1) == 1) result = result * base % mod;
            base = base * base % mod;
            p >>= 1;
        }
        return result;
    }
}` },
      { kind: "Interview", language: "JavaScript", code: `function fastPow(x, p, mod = null) {
  let result = 1n, base = BigInt(x);
  let e = BigInt(p);
  const m = mod === null ? null : BigInt(mod);
  if (m !== null) base %= m;
  while (e > 0n) {
    if (e & 1n) result = m === null ? result * base : (result * base) % m;
    base = m === null ? base * base : (base * base) % m;
    e >>= 1n;
  }
  return result;
}` },
      { kind: "Interview", language: "Apex", code: `public class Solution {
    public static Long fastPow(Long x, Long p, Long mod) {
        Long result = 1, base = Math.mod(x, mod);
        while (p > 0) {
            if ((p & 1) == 1) result = Math.mod(result * base, mod);
            base = Math.mod(base * base, mod);
            p >>= 1;
        }
        return result;
    }
}` },
    ],
  },
];

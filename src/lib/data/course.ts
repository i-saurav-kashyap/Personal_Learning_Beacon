// AUTO-GENERATED from the Striver A2Z DSA Sheet structure
// (reference: github.com/Codensity30/Strivers-A2Z-DSA-Sheet). The taxonomy of
// steps -> sections -> problems mirrors the A2Z sheet; we attach our own
// teaching content where a problem exists in the Beacon question library.
// Regenerate with: node /tmp/gen_course.mjs  (after cloning the reference repo)

import type { Difficulty } from "@/lib/types";

export interface CourseProblem {
  title: string;
  difficulty: Difficulty;
  slug: string;
}
export interface CourseSection {
  name: string;
  problems: CourseProblem[];
}
export interface CourseStep {
  id: number;
  name: string;
  sections: CourseSection[];
}

export const COURSE_STEPS: CourseStep[] = [
  {
    "id": 1,
    "name": "Arrays",
    "sections": [
      {
        "name": "Easy",
        "problems": [
          {
            "title": "Largest element in array",
            "difficulty": "Easy",
            "slug": "a2z-arrays-largest-element-in-array"
          },
          {
            "title": "Second largest element in array",
            "difficulty": "Easy",
            "slug": "a2z-arrays-second-largest-element-in-array"
          },
          {
            "title": "Check if array is sorted and rotated",
            "difficulty": "Easy",
            "slug": "a2z-arrays-check-if-array-is-sorted-and-rotated"
          },
          {
            "title": "Remove duplicates from sorted array",
            "difficulty": "Easy",
            "slug": "a2z-arrays-remove-duplicates-from-sorted-array"
          },
          {
            "title": "Rotate array left by 1place",
            "difficulty": "Easy",
            "slug": "a2z-arrays-rotate-array-left-by-1place"
          },
          {
            "title": "Rotate array left&right by k places",
            "difficulty": "Easy",
            "slug": "a2z-arrays-rotate-array-left-right-by-k-places"
          },
          {
            "title": "Move 0's to end",
            "difficulty": "Easy",
            "slug": "a2z-arrays-move-0s-to-end"
          },
          {
            "title": "Linear search",
            "difficulty": "Easy",
            "slug": "a2z-arrays-linear-search"
          },
          {
            "title": "Union of 2 sorted arrays",
            "difficulty": "Easy",
            "slug": "a2z-arrays-union-of-2-sorted-arrays"
          },
          {
            "title": "Missing number",
            "difficulty": "Easy",
            "slug": "a2z-arrays-missing-number"
          },
          {
            "title": "Max consecutive 1's",
            "difficulty": "Easy",
            "slug": "a2z-arrays-max-consecutive-1s"
          },
          {
            "title": "Longest subarray with given sum",
            "difficulty": "Easy",
            "slug": "a2z-arrays-longest-subarray-with-given-sum"
          },
          {
            "title": "Find element present only once",
            "difficulty": "Easy",
            "slug": "a2z-arrays-find-element-present-only-once"
          }
        ]
      },
      {
        "name": "Medium",
        "problems": [
          {
            "title": "2 sum problem",
            "difficulty": "Medium",
            "slug": "a2z-arrays-2-sum-problem"
          },
          {
            "title": "Sort 0 1 2",
            "difficulty": "Medium",
            "slug": "a2z-arrays-sort-0-1-2"
          },
          {
            "title": "Majority element",
            "difficulty": "Medium",
            "slug": "a2z-arrays-majority-element"
          },
          {
            "title": "Kadane's algorithm",
            "difficulty": "Medium",
            "slug": "a2z-arrays-kadanes-algorithm"
          },
          {
            "title": "Number of subarray sum equal k",
            "difficulty": "Medium",
            "slug": "a2z-arrays-number-of-subarray-sum-equal-k"
          },
          {
            "title": "Stock buy sell",
            "difficulty": "Medium",
            "slug": "a2z-arrays-stock-buy-sell"
          },
          {
            "title": "Rearange elements by sign",
            "difficulty": "Medium",
            "slug": "a2z-arrays-rearange-elements-by-sign"
          },
          {
            "title": "Next permutation",
            "difficulty": "Medium",
            "slug": "a2z-arrays-next-permutation"
          },
          {
            "title": "Leaders in array",
            "difficulty": "Medium",
            "slug": "a2z-arrays-leaders-in-array"
          },
          {
            "title": "Longest consecutive subsequence",
            "difficulty": "Medium",
            "slug": "a2z-arrays-longest-consecutive-subsequence"
          },
          {
            "title": "Set matrix 0's",
            "difficulty": "Medium",
            "slug": "a2z-arrays-set-matrix-0s"
          },
          {
            "title": "Rotate matrix",
            "difficulty": "Medium",
            "slug": "a2z-arrays-rotate-matrix"
          },
          {
            "title": "Spiral traversal",
            "difficulty": "Medium",
            "slug": "a2z-arrays-spiral-traversal"
          }
        ]
      },
      {
        "name": "Hard",
        "problems": [
          {
            "title": "Pascal triangle",
            "difficulty": "Hard",
            "slug": "a2z-arrays-pascal-triangle"
          },
          {
            "title": "Majority element 2",
            "difficulty": "Hard",
            "slug": "a2z-arrays-majority-element-2"
          },
          {
            "title": "3 sum",
            "difficulty": "Hard",
            "slug": "a2z-arrays-3-sum"
          },
          {
            "title": "4 sum",
            "difficulty": "Hard",
            "slug": "a2z-arrays-4-sum"
          },
          {
            "title": "Largest subarray with 0sum",
            "difficulty": "Hard",
            "slug": "a2z-arrays-largest-subarray-with-0sum"
          },
          {
            "title": "Subarrays with xor k",
            "difficulty": "Hard",
            "slug": "a2z-arrays-subarrays-with-xor-k"
          },
          {
            "title": "Merge overlapping subinterval",
            "difficulty": "Hard",
            "slug": "a2z-arrays-merge-overlapping-subinterval"
          },
          {
            "title": "Merge 2 sorted array without space",
            "difficulty": "Hard",
            "slug": "a2z-arrays-merge-2-sorted-array-without-space"
          },
          {
            "title": "Repeating and missing numbers",
            "difficulty": "Hard",
            "slug": "a2z-arrays-repeating-and-missing-numbers"
          },
          {
            "title": "Count inversions",
            "difficulty": "Hard",
            "slug": "a2z-arrays-count-inversions"
          },
          {
            "title": "Reverse pairs",
            "difficulty": "Hard",
            "slug": "a2z-arrays-reverse-pairs"
          },
          {
            "title": "Maximum product subarray",
            "difficulty": "Hard",
            "slug": "a2z-arrays-maximum-product-subarray"
          },
          {
            "title": "Longest subarray with sum k containg +ves and -ves",
            "difficulty": "Hard",
            "slug": "a2z-arrays-longest-subarray-with-sum-k-containg-ves-and-ves"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Binary Search",
    "sections": [
      {
        "name": "D Arrays",
        "problems": [
          {
            "title": "Find x in sorted array",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-find-x-in-sorted-array"
          },
          {
            "title": "Implement lower bound",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-implement-lower-bound"
          },
          {
            "title": "Implement lower upper bound",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-implement-lower-upper-bound"
          },
          {
            "title": "Search insert position",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-search-insert-position"
          },
          {
            "title": "Check If array is sorted",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-check-if-array-is-sorted"
          },
          {
            "title": "First and last position",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-first-and-last-position"
          },
          {
            "title": "Number of occurences",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-number-of-occurences"
          },
          {
            "title": "Find peak element",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-find-peak-element"
          },
          {
            "title": "Search in rotated sorted array",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-search-in-rotated-sorted-array"
          },
          {
            "title": "Search in rotated sorted array with duplicates",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-search-in-rotated-sorted-array-with-duplicates"
          },
          {
            "title": "Find the minimum element in sorted rotated array",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-find-the-minimum-element-in-sorted-rotated-array"
          },
          {
            "title": "Find single element in sorted array",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-find-single-element-in-sorted-array"
          },
          {
            "title": "Find how many times array is rotated",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-find-how-many-times-array-is-rotated"
          }
        ]
      },
      {
        "name": "D Arrays",
        "problems": [
          {
            "title": "Row with maximum number of 1's",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-row-with-maximum-number-of-1s"
          },
          {
            "title": "Search in sorted matrix",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-search-in-sorted-matrix"
          },
          {
            "title": "Search in rowwise sorted matrix",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-search-in-rowwise-sorted-matrix"
          },
          {
            "title": "Peak element in matrix",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-peak-element-in-matrix"
          },
          {
            "title": "Matrix median",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-matrix-median"
          }
        ]
      },
      {
        "name": "In Search Space",
        "problems": [
          {
            "title": "Square root of number",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-square-root-of-number"
          },
          {
            "title": "Nth root of integer",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-nth-root-of-integer"
          },
          {
            "title": "Koko eating banana",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-koko-eating-banana"
          },
          {
            "title": "Minimum days to make boquets",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-minimum-days-to-make-boquets"
          },
          {
            "title": "Find smallest integer",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-find-smallest-integer"
          },
          {
            "title": "Capacity to ship packages",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-capacity-to-ship-packages"
          },
          {
            "title": "Aggresive cows",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-aggresive-cows"
          },
          {
            "title": "Book allocation",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-book-allocation"
          },
          {
            "title": "Split array largest",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-split-array-largest"
          },
          {
            "title": "Kth missing number",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-kth-missing-number"
          },
          {
            "title": "Gas station",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-gas-station"
          },
          {
            "title": "Median of two sorted arrays",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-median-of-two-sorted-arrays"
          },
          {
            "title": "Kth element of two sorted arrays",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-kth-element-of-two-sorted-arrays"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Strings",
    "sections": [
      {
        "name": "Easy",
        "problems": [
          {
            "title": "Remove outer parenthesis",
            "difficulty": "Easy",
            "slug": "a2z-strings-remove-outer-parenthesis"
          },
          {
            "title": "Reverse words in string",
            "difficulty": "Easy",
            "slug": "a2z-strings-reverse-words-in-string"
          },
          {
            "title": "Largest odd number in string",
            "difficulty": "Easy",
            "slug": "a2z-strings-largest-odd-number-in-string"
          },
          {
            "title": "Longest common prefix",
            "difficulty": "Easy",
            "slug": "a2z-strings-longest-common-prefix"
          },
          {
            "title": "Isomorphic string",
            "difficulty": "Easy",
            "slug": "a2z-strings-isomorphic-string"
          },
          {
            "title": "Check for rotated string",
            "difficulty": "Easy",
            "slug": "a2z-strings-check-for-rotated-string"
          },
          {
            "title": "Valid anagram",
            "difficulty": "Easy",
            "slug": "a2z-strings-valid-anagram"
          }
        ]
      },
      {
        "name": "Medium",
        "problems": [
          {
            "title": "Sort characters by frequency",
            "difficulty": "Medium",
            "slug": "a2z-strings-sort-characters-by-frequency"
          },
          {
            "title": "Max nesting depth of parenthesis",
            "difficulty": "Medium",
            "slug": "a2z-strings-max-nesting-depth-of-parenthesis"
          },
          {
            "title": "Roman to Integer",
            "difficulty": "Medium",
            "slug": "a2z-strings-roman-to-integer"
          },
          {
            "title": "Implement atoi",
            "difficulty": "Medium",
            "slug": "a2z-strings-implement-atoi"
          },
          {
            "title": "Count the number of substrings with k unique characters",
            "difficulty": "Medium",
            "slug": "a2z-strings-count-the-number-of-substrings-with-k-unique-characters"
          },
          {
            "title": "Longest palindromic substring",
            "difficulty": "Medium",
            "slug": "a2z-strings-longest-palindromic-substring"
          },
          {
            "title": "Sum of beauty of all substrings",
            "difficulty": "Medium",
            "slug": "a2z-strings-sum-of-beauty-of-all-substrings"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Linked List",
    "sections": [
      {
        "name": "Single Linked List",
        "problems": [
          {
            "title": "Intro to linked list",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-intro-to-linked-list"
          },
          {
            "title": "Inserting node to linked list",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-inserting-node-to-linked-list"
          },
          {
            "title": "Deleting node in linked list",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-deleting-node-in-linked-list"
          },
          {
            "title": "Count the number of nodes linked list",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-count-the-number-of-nodes-linked-list"
          },
          {
            "title": "Search element in linked list",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-search-element-in-linked-list"
          }
        ]
      },
      {
        "name": "Doubly Linked List",
        "problems": [
          {
            "title": "Introduction to Double LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-introduction-to-double-ll"
          },
          {
            "title": "Insert node in DLL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-insert-node-in-dll"
          },
          {
            "title": "Delete node in DLL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-delete-node-in-dll"
          },
          {
            "title": "Reverse DLL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-reverse-dll"
          }
        ]
      },
      {
        "name": "Medium Problems of LL",
        "problems": [
          {
            "title": "Find mid of LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-find-mid-of-ll"
          },
          {
            "title": "Reverse LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-reverse-ll"
          },
          {
            "title": "Detect loop in LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-detect-loop-in-ll"
          },
          {
            "title": "Start of cycle in LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-start-of-cycle-in-ll"
          },
          {
            "title": "Count nodes in loop",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-count-nodes-in-loop"
          },
          {
            "title": "Check for palindrome LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-check-for-palindrome-ll"
          },
          {
            "title": "Odd even LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-odd-even-ll"
          },
          {
            "title": "Delete nth node from back",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-delete-nth-node-from-back"
          },
          {
            "title": "Delete mid of LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-delete-mid-of-ll"
          },
          {
            "title": "Sort LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-sort-ll"
          },
          {
            "title": "Sort 0 1 2 in LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-sort-0-1-2-in-ll"
          },
          {
            "title": "Add 1 to LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-add-1-to-ll"
          },
          {
            "title": "Add two LL",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-add-two-ll"
          }
        ]
      },
      {
        "name": "Medium Problems of DLL",
        "problems": [
          {
            "title": "Delete nodes from dll",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-delete-nodes-from-dll"
          },
          {
            "title": "Pair sum in dll",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-pair-sum-in-dll"
          },
          {
            "title": "Remove duplicates from dll",
            "difficulty": "Medium",
            "slug": "a2z-linked-list-remove-duplicates-from-dll"
          }
        ]
      },
      {
        "name": "Hard Promblems of LL",
        "problems": [
          {
            "title": "Reverse k node in groups",
            "difficulty": "Hard",
            "slug": "a2z-linked-list-reverse-k-node-in-groups"
          },
          {
            "title": "Rotate LL k times",
            "difficulty": "Hard",
            "slug": "a2z-linked-list-rotate-ll-k-times"
          },
          {
            "title": "Copy LL with random pointers",
            "difficulty": "Hard",
            "slug": "a2z-linked-list-copy-ll-with-random-pointers"
          },
          {
            "title": "Flatten LL",
            "difficulty": "Hard",
            "slug": "a2z-linked-list-flatten-ll"
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Recursion",
    "sections": [
      {
        "name": "Get Strong Hold",
        "problems": [
          {
            "title": "Implement atoi via recursion",
            "difficulty": "Medium",
            "slug": "a2z-recursion-implement-atoi-via-recursion"
          },
          {
            "title": "Count good numbers",
            "difficulty": "Medium",
            "slug": "a2z-recursion-count-good-numbers"
          },
          {
            "title": "Reverse stack using recursion",
            "difficulty": "Medium",
            "slug": "a2z-recursion-reverse-stack-using-recursion"
          },
          {
            "title": "Sort stack using recursion",
            "difficulty": "Medium",
            "slug": "a2z-recursion-sort-stack-using-recursion"
          }
        ]
      },
      {
        "name": "Subsequences Pattern",
        "problems": [
          {
            "title": "Genereate all valid parenthesis",
            "difficulty": "Medium",
            "slug": "a2z-recursion-genereate-all-valid-parenthesis"
          },
          {
            "title": "Power set",
            "difficulty": "Medium",
            "slug": "a2z-recursion-power-set"
          },
          {
            "title": "Count distinct substrings",
            "difficulty": "Medium",
            "slug": "a2z-recursion-count-distinct-substrings"
          },
          {
            "title": "Count subsets with sum equal to k",
            "difficulty": "Medium",
            "slug": "a2z-recursion-count-subsets-with-sum-equal-to-k"
          },
          {
            "title": "Subset 1",
            "difficulty": "Medium",
            "slug": "a2z-recursion-subset-1"
          },
          {
            "title": "Subset 2",
            "difficulty": "Medium",
            "slug": "a2z-recursion-subset-2"
          },
          {
            "title": "Combination Sum 1",
            "difficulty": "Medium",
            "slug": "a2z-recursion-combination-sum-1"
          },
          {
            "title": "Combination Sum 2",
            "difficulty": "Medium",
            "slug": "a2z-recursion-combination-sum-2"
          },
          {
            "title": "Combination Sum 3",
            "difficulty": "Medium",
            "slug": "a2z-recursion-combination-sum-3"
          },
          {
            "title": "Letter combinations of phone",
            "difficulty": "Medium",
            "slug": "a2z-recursion-letter-combinations-of-phone"
          }
        ]
      },
      {
        "name": "Try Out All Combos",
        "problems": [
          {
            "title": "Palindrome partioning",
            "difficulty": "Medium",
            "slug": "a2z-recursion-palindrome-partioning"
          },
          {
            "title": "Word search in grid",
            "difficulty": "Medium",
            "slug": "a2z-recursion-word-search-in-grid"
          },
          {
            "title": "Rat in maze",
            "difficulty": "Medium",
            "slug": "a2z-recursion-rat-in-maze"
          },
          {
            "title": "M coloring problem",
            "difficulty": "Medium",
            "slug": "a2z-recursion-m-coloring-problem"
          },
          {
            "title": "N queens",
            "difficulty": "Medium",
            "slug": "a2z-recursion-n-queens"
          },
          {
            "title": "Word Break",
            "difficulty": "Medium",
            "slug": "a2z-recursion-word-break"
          },
          {
            "title": "Sudoku solver",
            "difficulty": "Medium",
            "slug": "a2z-recursion-sudoku-solver"
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "Bit Manipulation",
    "sections": [
      {
        "name": "Learn Bit Manipulation",
        "problems": [
          {
            "title": "Bit Manipulation",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-bit-manipulation"
          },
          {
            "title": "Check for the ith bit",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-check-for-the-ith-bit"
          },
          {
            "title": "Check for odd even",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-check-for-odd-even"
          },
          {
            "title": "Check for the power of 2",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-check-for-the-power-of-2"
          },
          {
            "title": "Set the righmost unset bit",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-set-the-righmost-unset-bit"
          },
          {
            "title": "Swap two numbers without temporary variable",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-swap-two-numbers-without-temporary-variable"
          },
          {
            "title": "Divide two numbers using bit maipulation",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-divide-two-numbers-using-bit-maipulation"
          },
          {
            "title": "Count set bit from numbers 1 to n",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-count-set-bit-from-numbers-1-to-n"
          }
        ]
      },
      {
        "name": "Interview Problems",
        "problems": [
          {
            "title": "Minimum bit flips",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-minimum-bit-flips"
          },
          {
            "title": "Exceptionally odd",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-exceptionally-odd"
          },
          {
            "title": "XOR of numbers from L to R",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-xor-of-numbers-from-l-to-r"
          }
        ]
      },
      {
        "name": "Advanced Maths",
        "problems": [
          {
            "title": "Prime factors of number",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-prime-factors-of-number"
          },
          {
            "title": "All divisors of number",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-all-divisors-of-number"
          },
          {
            "title": "Sieve of Eratosthenes",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-sieve-of-eratosthenes"
          },
          {
            "title": "Prime factorization using Sieve",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-prime-factorization-using-sieve"
          },
          {
            "title": "Fast Power",
            "difficulty": "Medium",
            "slug": "a2z-bit-manipulation-fast-power"
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "Stack and Queues",
    "sections": [
      {
        "name": "Learning",
        "problems": [
          {
            "title": "Implement stack using array",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-implement-stack-using-array"
          },
          {
            "title": "Implement queue using array",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-implement-queue-using-array"
          },
          {
            "title": "Implement stack using queue",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-implement-stack-using-queue"
          },
          {
            "title": "Implement queue using stacks",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-implement-queue-using-stacks"
          },
          {
            "title": "Implement stack using linked list",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-implement-stack-using-linked-list"
          },
          {
            "title": "Valid Parenthesis",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-valid-parenthesis"
          },
          {
            "title": "Implement min stack",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-implement-min-stack"
          }
        ]
      },
      {
        "name": "Infix, Postfix, and Prefix",
        "problems": [
          {
            "title": "Infix to postfix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-infix-to-postfix"
          },
          {
            "title": "Infix to prefix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-infix-to-prefix"
          },
          {
            "title": "Prefix to infix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-prefix-to-infix"
          },
          {
            "title": "Prefix to postfix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-prefix-to-postfix"
          },
          {
            "title": "Postfix to infix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-postfix-to-infix"
          },
          {
            "title": "Postfix to prefix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-postfix-to-prefix"
          }
        ]
      },
      {
        "name": "Monotonic Stack and Queue",
        "problems": [
          {
            "title": "Next Greater Element",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-next-greater-element"
          },
          {
            "title": "Next Greater Element 2",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-next-greater-element-2"
          },
          {
            "title": "Previous Smaller Element",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-previous-smaller-element"
          },
          {
            "title": "Trapping Rainwater",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-trapping-rainwater"
          },
          {
            "title": "Sum of subarray minimum",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-sum-of-subarray-minimum"
          },
          {
            "title": "Sum of range of all subarray",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-sum-of-range-of-all-subarray"
          },
          {
            "title": "Remove K elements",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-remove-k-elements"
          },
          {
            "title": "Largest Rectangle in Histogram",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-largest-rectangle-in-histogram"
          },
          {
            "title": "Maximal Rectangle in binary matrix",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-maximal-rectangle-in-binary-matrix"
          },
          {
            "title": "Asteroids Collision",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-asteroids-collision"
          }
        ]
      },
      {
        "name": "Implementation",
        "problems": [
          {
            "title": "Sliding window maximum",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-sliding-window-maximum"
          },
          {
            "title": "Stock span problem",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-stock-span-problem"
          },
          {
            "title": "Celebrity Problem",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-celebrity-problem"
          },
          {
            "title": "LRU Cache",
            "difficulty": "Medium",
            "slug": "a2z-stack-and-queues-lru-cache"
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Sliding Window",
    "sections": [
      {
        "name": "Medium Problems",
        "problems": [
          {
            "title": "Longest Substring Without Repeating Characters",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-longest-substring-without-repeating-characters"
          },
          {
            "title": "Max Consecutive 1's",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-max-consecutive-1s"
          },
          {
            "title": "Fruit into Baskets",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-fruit-into-baskets"
          },
          {
            "title": "Longest Repeating Character",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-longest-repeating-character"
          },
          {
            "title": "Binary Subarrays with Sum",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-binary-subarrays-with-sum"
          },
          {
            "title": "Count the number of nice subarrays",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-count-the-number-of-nice-subarrays"
          },
          {
            "title": "Number of Substrings Containing all 3 characters",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-number-of-substrings-containing-all-3-characters"
          },
          {
            "title": "Maximum Points you can obtaln form the card",
            "difficulty": "Medium",
            "slug": "a2z-sliding-window-maximum-points-you-can-obtaln-form-the-card"
          }
        ]
      },
      {
        "name": "Hard Problems",
        "problems": [
          {
            "title": "Longest Substring with at most K unique characters",
            "difficulty": "Hard",
            "slug": "a2z-sliding-window-longest-substring-with-at-most-k-unique-characters"
          },
          {
            "title": "Count the number of substrings with exactly K unique characters",
            "difficulty": "Hard",
            "slug": "a2z-sliding-window-count-the-number-of-substrings-with-exactly-k-unique-characters"
          },
          {
            "title": "Minimum Window Substring",
            "difficulty": "Hard",
            "slug": "a2z-sliding-window-minimum-window-substring"
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "name": "Heaps",
    "sections": [
      {
        "name": "Learning",
        "problems": [
          {
            "title": "Implement min heap",
            "difficulty": "Medium",
            "slug": "a2z-heaps-implement-min-heap"
          },
          {
            "title": "Check if array is heap",
            "difficulty": "Medium",
            "slug": "a2z-heaps-check-if-array-is-heap"
          },
          {
            "title": "Convert min heap to max heap",
            "difficulty": "Medium",
            "slug": "a2z-heaps-convert-min-heap-to-max-heap"
          }
        ]
      },
      {
        "name": "Medium Problems",
        "problems": [
          {
            "title": "Kth largest element",
            "difficulty": "Medium",
            "slug": "a2z-heaps-kth-largest-element"
          },
          {
            "title": "Kth smallest element",
            "difficulty": "Medium",
            "slug": "a2z-heaps-kth-smallest-element"
          },
          {
            "title": "Merge K sorted arrays",
            "difficulty": "Medium",
            "slug": "a2z-heaps-merge-k-sorted-arrays"
          },
          {
            "title": "Merge K sorted Lists",
            "difficulty": "Medium",
            "slug": "a2z-heaps-merge-k-sorted-lists"
          },
          {
            "title": "Arrange by rank",
            "difficulty": "Medium",
            "slug": "a2z-heaps-arrange-by-rank"
          },
          {
            "title": "Task Scheduler",
            "difficulty": "Medium",
            "slug": "a2z-heaps-task-scheduler"
          },
          {
            "title": "Divide array into sets of K consecutive number",
            "difficulty": "Medium",
            "slug": "a2z-heaps-divide-array-into-sets-of-k-consecutive-number"
          }
        ]
      },
      {
        "name": "Hard Problems",
        "problems": [
          {
            "title": "Design Twitter",
            "difficulty": "Hard",
            "slug": "a2z-heaps-design-twitter"
          },
          {
            "title": "Minimum Cost to join n ropes",
            "difficulty": "Hard",
            "slug": "a2z-heaps-minimum-cost-to-join-n-ropes"
          },
          {
            "title": "Kth largest element in stream",
            "difficulty": "Hard",
            "slug": "a2z-heaps-kth-largest-element-in-stream"
          },
          {
            "title": "Maximum K sum combinations",
            "difficulty": "Hard",
            "slug": "a2z-heaps-maximum-k-sum-combinations"
          },
          {
            "title": "Median in a stream",
            "difficulty": "Hard",
            "slug": "a2z-heaps-median-in-a-stream"
          },
          {
            "title": "Top K frequent elements",
            "difficulty": "Hard",
            "slug": "a2z-heaps-top-k-frequent-elements"
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "name": "Greedy Approach",
    "sections": [
      {
        "name": "Easy",
        "problems": [
          {
            "title": "Assign Cookies",
            "difficulty": "Easy",
            "slug": "a2z-greedy-approach-assign-cookies"
          },
          {
            "title": "Fractional Knapsack",
            "difficulty": "Easy",
            "slug": "a2z-greedy-approach-fractional-knapsack"
          },
          {
            "title": "Lemonade Exchange",
            "difficulty": "Easy",
            "slug": "a2z-greedy-approach-lemonade-exchange"
          },
          {
            "title": "Valid Parenthesis String",
            "difficulty": "Easy",
            "slug": "a2z-greedy-approach-valid-parenthesis-string"
          }
        ]
      },
      {
        "name": "Medium",
        "problems": [
          {
            "title": "N Meetings in one room",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-n-meetings-in-one-room"
          },
          {
            "title": "Jump Game",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-jump-game"
          },
          {
            "title": "Jump Game 2",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-jump-game-2"
          },
          {
            "title": "Minimum Platforms",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-minimum-platforms"
          },
          {
            "title": "Job Sequencing Problem",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-job-sequencing-problem"
          },
          {
            "title": "Candy",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-candy"
          },
          {
            "title": "Insert Interval",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-insert-interval"
          },
          {
            "title": "Non Overlapping Intervals",
            "difficulty": "Medium",
            "slug": "a2z-greedy-approach-non-overlapping-intervals"
          }
        ]
      }
    ]
  },
  {
    "id": 11,
    "name": "Binary Trees",
    "sections": [
      {
        "name": "Traversals",
        "problems": [
          {
            "title": "Introduction to trees",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-introduction-to-trees"
          },
          {
            "title": "Binary Tree representation",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-binary-tree-representation"
          },
          {
            "title": "Preorder Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-preorder-traversal"
          },
          {
            "title": "Inorder Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-inorder-traversal"
          },
          {
            "title": "Postorder Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-postorder-traversal"
          },
          {
            "title": "Level Order Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-level-order-traversal"
          },
          {
            "title": "Iterative Preorder Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-iterative-preorder-traversal"
          },
          {
            "title": "Iterative Inorder Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-iterative-inorder-traversal"
          },
          {
            "title": "Iterative Postorder",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-iterative-postorder"
          },
          {
            "title": "All in one traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-all-in-one-traversal"
          }
        ]
      },
      {
        "name": "Medium Problems",
        "problems": [
          {
            "title": "Height of binary tree",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-height-of-binary-tree"
          },
          {
            "title": "Balanced Binary Tree",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-balanced-binary-tree"
          },
          {
            "title": "Diameter of Binary Tree",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-diameter-of-binary-tree"
          },
          {
            "title": "Maximum Path Sum",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-maximum-path-sum"
          },
          {
            "title": "Same Tree",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-same-tree"
          },
          {
            "title": "Zig-Zag Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-zig-zag-traversal"
          },
          {
            "title": "Boundary Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-boundary-traversal"
          },
          {
            "title": "Vertical Order Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-vertical-order-traversal"
          },
          {
            "title": "Top View",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-top-view"
          },
          {
            "title": "Bottom View",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-bottom-view"
          },
          {
            "title": "Left or Right View",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-left-or-right-view"
          },
          {
            "title": "Symmetric Tree",
            "difficulty": "Medium",
            "slug": "a2z-binary-trees-symmetric-tree"
          }
        ]
      },
      {
        "name": "Hard",
        "problems": [
          {
            "title": "All root to leaf paths",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-all-root-to-leaf-paths"
          },
          {
            "title": "Lowest Common Ancestor",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-lowest-common-ancestor"
          },
          {
            "title": "Max width of binary tree",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-max-width-of-binary-tree"
          },
          {
            "title": "Check children sum property",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-check-children-sum-property"
          },
          {
            "title": "All nodes at distance K",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-all-nodes-at-distance-k"
          },
          {
            "title": "Min time to burn binary tree",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-min-time-to-burn-binary-tree"
          },
          {
            "title": "Count nodes in complete binary tree",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-count-nodes-in-complete-binary-tree"
          },
          {
            "title": "Construct BT from inorder and preorder",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-construct-bt-from-inorder-and-preorder"
          },
          {
            "title": "Construct BT from inorder and postorder",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-construct-bt-from-inorder-and-postorder"
          },
          {
            "title": "Morris Preorder Traversal",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-morris-preorder-traversal"
          },
          {
            "title": "Morris Inorder Traversal",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-morris-inorder-traversal"
          },
          {
            "title": "Flatten Binary Tree",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-flatten-binary-tree"
          },
          {
            "title": "Serialize and Deserialize",
            "difficulty": "Hard",
            "slug": "a2z-binary-trees-serialize-and-deserialize"
          }
        ]
      }
    ]
  },
  {
    "id": 12,
    "name": "Binary Search Trees",
    "sections": [
      {
        "name": "Concept",
        "problems": [
          {
            "title": "Intro to BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-intro-to-bst"
          },
          {
            "title": "Search in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-search-in-bst"
          },
          {
            "title": "Minimum value in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-minimum-value-in-bst"
          }
        ]
      },
      {
        "name": "Practice Problems",
        "problems": [
          {
            "title": "Ceil in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-ceil-in-bst"
          },
          {
            "title": "Floor in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-floor-in-bst"
          },
          {
            "title": "Insert into BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-insert-into-bst"
          },
          {
            "title": "Delete from BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-delete-from-bst"
          },
          {
            "title": "Kth smallest element in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-kth-smallest-element-in-bst"
          },
          {
            "title": "Validate BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-validate-bst"
          },
          {
            "title": "LCA in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-lca-in-bst"
          },
          {
            "title": "Build BST from Preorder Traversal",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-build-bst-from-preorder-traversal"
          },
          {
            "title": "BST Iterator",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-bst-iterator"
          },
          {
            "title": "Two Sum in BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-two-sum-in-bst"
          },
          {
            "title": "Recover BST",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-recover-bst"
          },
          {
            "title": "Largest BST in Binary Tree",
            "difficulty": "Medium",
            "slug": "a2z-binary-search-trees-largest-bst-in-binary-tree"
          }
        ]
      }
    ]
  },
  {
    "id": 13,
    "name": "Graphs",
    "sections": [
      {
        "name": "Learning",
        "problems": [
          {
            "title": "Count the number of graphs",
            "difficulty": "Medium",
            "slug": "a2z-graphs-count-the-number-of-graphs"
          },
          {
            "title": "Graph Representation",
            "difficulty": "Medium",
            "slug": "a2z-graphs-graph-representation"
          },
          {
            "title": "BFS",
            "difficulty": "Medium",
            "slug": "a2z-graphs-bfs"
          },
          {
            "title": "DFS",
            "difficulty": "Medium",
            "slug": "a2z-graphs-dfs"
          }
        ]
      },
      {
        "name": "Traversal Problems",
        "problems": [
          {
            "title": "Count the number of provinces",
            "difficulty": "Medium",
            "slug": "a2z-graphs-count-the-number-of-provinces"
          },
          {
            "title": "Rotten Oranges",
            "difficulty": "Medium",
            "slug": "a2z-graphs-rotten-oranges"
          },
          {
            "title": "Flood-Fill Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-flood-fill-algorithm"
          },
          {
            "title": "Detect Cycle in Undirected Graph",
            "difficulty": "Medium",
            "slug": "a2z-graphs-detect-cycle-in-undirected-graph"
          },
          {
            "title": "01 Matrix",
            "difficulty": "Medium",
            "slug": "a2z-graphs-01-matrix"
          },
          {
            "title": "Surrounded Regions",
            "difficulty": "Medium",
            "slug": "a2z-graphs-surrounded-regions"
          },
          {
            "title": "Number of Enclaves",
            "difficulty": "Medium",
            "slug": "a2z-graphs-number-of-enclaves"
          },
          {
            "title": "Word Ladder",
            "difficulty": "Medium",
            "slug": "a2z-graphs-word-ladder"
          },
          {
            "title": "Distinct Islands",
            "difficulty": "Medium",
            "slug": "a2z-graphs-distinct-islands"
          },
          {
            "title": "Bipartite Graph",
            "difficulty": "Medium",
            "slug": "a2z-graphs-bipartite-graph"
          },
          {
            "title": "Detect Cycle in Directed Graph",
            "difficulty": "Medium",
            "slug": "a2z-graphs-detect-cycle-in-directed-graph"
          }
        ]
      },
      {
        "name": "Topo Sort Problems",
        "problems": [
          {
            "title": "Topological Sorting",
            "difficulty": "Medium",
            "slug": "a2z-graphs-topological-sorting"
          },
          {
            "title": "Kahn's Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-kahns-algorithm"
          },
          {
            "title": "Course Scheduler 1",
            "difficulty": "Medium",
            "slug": "a2z-graphs-course-scheduler-1"
          },
          {
            "title": "Course Scheduler 2",
            "difficulty": "Medium",
            "slug": "a2z-graphs-course-scheduler-2"
          },
          {
            "title": "Find Eventual Safe State",
            "difficulty": "Medium",
            "slug": "a2z-graphs-find-eventual-safe-state"
          },
          {
            "title": "Alien Dictonary",
            "difficulty": "Medium",
            "slug": "a2z-graphs-alien-dictonary"
          }
        ]
      },
      {
        "name": "Shortest Path Problems",
        "problems": [
          {
            "title": "Shortest path in Undirected Graph having unit distance",
            "difficulty": "Medium",
            "slug": "a2z-graphs-shortest-path-in-undirected-graph-having-unit-distance"
          },
          {
            "title": "Shortest path in DAG",
            "difficulty": "Medium",
            "slug": "a2z-graphs-shortest-path-in-dag"
          },
          {
            "title": "Dijkstra's Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-dijkstras-algorithm"
          },
          {
            "title": "Shortest Path in binary matrix",
            "difficulty": "Medium",
            "slug": "a2z-graphs-shortest-path-in-binary-matrix"
          },
          {
            "title": "Path with minimum effort",
            "difficulty": "Medium",
            "slug": "a2z-graphs-path-with-minimum-effort"
          },
          {
            "title": "Cheapest Flights with K stops",
            "difficulty": "Medium",
            "slug": "a2z-graphs-cheapest-flights-with-k-stops"
          },
          {
            "title": "Network Delay Time",
            "difficulty": "Medium",
            "slug": "a2z-graphs-network-delay-time"
          },
          {
            "title": "Bellman Ford Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-bellman-ford-algorithm"
          },
          {
            "title": "Floyd Warshall Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-floyd-warshall-algorithm"
          },
          {
            "title": "Find city with smallest number of neighbours",
            "difficulty": "Medium",
            "slug": "a2z-graphs-find-city-with-smallest-number-of-neighbours"
          },
          {
            "title": "Number of ways to arrive the destination with minimum distance",
            "difficulty": "Medium",
            "slug": "a2z-graphs-number-of-ways-to-arrive-the-destination-with-minimum-distance"
          }
        ]
      },
      {
        "name": "MST Problems",
        "problems": [
          {
            "title": "Prim's Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-prims-algorithm"
          },
          {
            "title": "Kruskal's Algorithm",
            "difficulty": "Medium",
            "slug": "a2z-graphs-kruskals-algorithm"
          },
          {
            "title": "Number of Operations to make Network",
            "difficulty": "Medium",
            "slug": "a2z-graphs-number-of-operations-to-make-network"
          },
          {
            "title": "Most stones removed",
            "difficulty": "Medium",
            "slug": "a2z-graphs-most-stones-removed"
          },
          {
            "title": "Account Merge",
            "difficulty": "Medium",
            "slug": "a2z-graphs-account-merge"
          },
          {
            "title": "Number of islands 2",
            "difficulty": "Medium",
            "slug": "a2z-graphs-number-of-islands-2"
          },
          {
            "title": "Making Large Island",
            "difficulty": "Medium",
            "slug": "a2z-graphs-making-large-island"
          },
          {
            "title": "Swim in rising water",
            "difficulty": "Medium",
            "slug": "a2z-graphs-swim-in-rising-water"
          }
        ]
      },
      {
        "name": "Other Algorithms",
        "problems": [
          {
            "title": "Bridges in graph",
            "difficulty": "Medium",
            "slug": "a2z-graphs-bridges-in-graph"
          },
          {
            "title": "Strongly Connected Components",
            "difficulty": "Medium",
            "slug": "a2z-graphs-strongly-connected-components"
          }
        ]
      }
    ]
  },
  {
    "id": 14,
    "name": "Dynamic Programming",
    "sections": [
      {
        "name": "Intro to DP",
        "problems": [
          {
            "title": "Find the nth fibonacci number",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-find-the-nth-fibonacci-number"
          }
        ]
      },
      {
        "name": "1D DP",
        "problems": [
          {
            "title": "Climbing Stairs",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-climbing-stairs"
          },
          {
            "title": "Frog Jump",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-frog-jump"
          },
          {
            "title": "Frog K Jumps",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-frog-k-jumps"
          },
          {
            "title": "House Robber",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-house-robber"
          },
          {
            "title": "House Robber 2",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-house-robber-2"
          }
        ]
      },
      {
        "name": "2D DP",
        "problems": [
          {
            "title": "Ninja Training",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-ninja-training"
          },
          {
            "title": "Unique Paths",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-unique-paths"
          },
          {
            "title": "Unique Paths 2",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-unique-paths-2"
          },
          {
            "title": "Minimum Path Sum",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-path-sum"
          },
          {
            "title": "Minimum Path in Triangle",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-path-in-triangle"
          },
          {
            "title": "Minimum Falling Path Sum",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-falling-path-sum"
          }
        ]
      },
      {
        "name": "DP on Subsequences",
        "problems": [
          {
            "title": "Subset sum equal to k",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-subset-sum-equal-to-k"
          },
          {
            "title": "Partition array in two equal sum subsets",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-partition-array-in-two-equal-sum-subsets"
          },
          {
            "title": "Minimum Sum Partition",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-sum-partition"
          },
          {
            "title": "Count number of subsets with sum K",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-count-number-of-subsets-with-sum-k"
          },
          {
            "title": "Partition with given difference",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-partition-with-given-difference"
          },
          {
            "title": "01 Knapsack",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-01-knapsack"
          },
          {
            "title": "Coin Change",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-coin-change"
          },
          {
            "title": "Target Sum",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-target-sum"
          },
          {
            "title": "Coin Change 2",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-coin-change-2"
          },
          {
            "title": "Unbounded Knapsack",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-unbounded-knapsack"
          },
          {
            "title": "Rod Cutting Problem",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-rod-cutting-problem"
          }
        ]
      },
      {
        "name": "DP on Strings",
        "problems": [
          {
            "title": "Longest Common Subsequence",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-longest-common-subsequence"
          },
          {
            "title": "Print the LCS",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-print-the-lcs"
          },
          {
            "title": "Longest Common Substring",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-longest-common-substring"
          },
          {
            "title": "Longest Palindromic Subsequence",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-longest-palindromic-subsequence"
          },
          {
            "title": "Minimum steps to make string palindrome",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-steps-to-make-string-palindrome"
          },
          {
            "title": "Minimum steps to make other string",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-steps-to-make-other-string"
          },
          {
            "title": "Shortest Common Supersequence",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-shortest-common-supersequence"
          },
          {
            "title": "Distinct Subsequences",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-distinct-subsequences"
          },
          {
            "title": "Wildcard Matching",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-wildcard-matching"
          }
        ]
      },
      {
        "name": "DP on Stocks",
        "problems": [
          {
            "title": "Best time to buy and sell stocks",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-best-time-to-buy-and-sell-stocks"
          },
          {
            "title": "Best time to buy and sell stock 2",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-best-time-to-buy-and-sell-stock-2"
          },
          {
            "title": "Best time to buy and sell stock upto 2 transaction",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-best-time-to-buy-and-sell-stock-upto-2-transaction"
          },
          {
            "title": "Best time to buy and sell stock uoto k transaction",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-best-time-to-buy-and-sell-stock-uoto-k-transaction"
          },
          {
            "title": "Buy and sell stocks with cooldown",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-buy-and-sell-stocks-with-cooldown"
          },
          {
            "title": "Buy and sell stocks with transaction fee",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-buy-and-sell-stocks-with-transaction-fee"
          }
        ]
      },
      {
        "name": "DP on LIS",
        "problems": [
          {
            "title": "Longest Increasing Subsequence",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-longest-increasing-subsequence"
          },
          {
            "title": "Print LIS",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-print-lis"
          },
          {
            "title": "Largest Divisible Subset",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-largest-divisible-subset"
          },
          {
            "title": "Longest Bitonic Subsequence",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-longest-bitonic-subsequence"
          },
          {
            "title": "Number of LIS",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-number-of-lis"
          }
        ]
      },
      {
        "name": "DP on Partition",
        "problems": [
          {
            "title": "MCM",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-mcm"
          },
          {
            "title": "Minimum cost to cut stick",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-minimum-cost-to-cut-stick"
          },
          {
            "title": "Burst Ballons",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-burst-ballons"
          },
          {
            "title": "Palindorme Partionting 2",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-palindorme-partionting-2"
          },
          {
            "title": "Partition array for maximum sum",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-partition-array-for-maximum-sum"
          }
        ]
      },
      {
        "name": "DP on Squares",
        "problems": [
          {
            "title": "Maximal Square",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-maximal-square"
          },
          {
            "title": "Count square submatrices",
            "difficulty": "Medium",
            "slug": "a2z-dynamic-programming-count-square-submatrices"
          }
        ]
      }
    ]
  },
  {
    "id": 15,
    "name": "Tries",
    "sections": [
      {
        "name": "Theory",
        "problems": [
          {
            "title": "Implement Trie (Prefix Tree)",
            "difficulty": "Medium",
            "slug": "a2z-tries-implement-trie-prefix-tree"
          }
        ]
      },
      {
        "name": "Problems",
        "problems": [
          {
            "title": "Implement Trie 2",
            "difficulty": "Medium",
            "slug": "a2z-tries-implement-trie-2"
          },
          {
            "title": "Complete String",
            "difficulty": "Medium",
            "slug": "a2z-tries-complete-string"
          },
          {
            "title": "Count distinct subsitrings",
            "difficulty": "Medium",
            "slug": "a2z-tries-count-distinct-subsitrings"
          },
          {
            "title": "Bitwise basic operations",
            "difficulty": "Medium",
            "slug": "a2z-tries-bitwise-basic-operations"
          },
          {
            "title": "Maximum XOR of two numbers",
            "difficulty": "Medium",
            "slug": "a2z-tries-maximum-xor-of-two-numbers"
          }
        ]
      }
    ]
  },
  {
    "id": 16,
    "name": "Strings (Hard)",
    "sections": [
      {
        "name": "Hard",
        "problems": [
          {
            "title": "Minimum number of insertions to make parenthesis valid",
            "difficulty": "Hard",
            "slug": "a2z-strings-hard-minimum-number-of-insertions-to-make-parenthesis-valid"
          },
          {
            "title": "Count and Say",
            "difficulty": "Hard",
            "slug": "a2z-strings-hard-count-and-say"
          },
          {
            "title": "KMP or Z string matching algo",
            "difficulty": "Hard",
            "slug": "a2z-strings-hard-kmp-or-z-string-matching-algo"
          },
          {
            "title": "Longest Happy Prefix",
            "difficulty": "Hard",
            "slug": "a2z-strings-hard-longest-happy-prefix"
          },
          {
            "title": "Shortest Palindrome",
            "difficulty": "Hard",
            "slug": "a2z-strings-hard-shortest-palindrome"
          }
        ]
      }
    ]
  }
];

export const COURSE_TOTAL = COURSE_STEPS.reduce(
  (n, s) => n + s.sections.reduce((m, sec) => m + sec.problems.length, 0),
  0,
);

export function getCourseStep(id: number): CourseStep | undefined {
  return COURSE_STEPS.find((s) => s.id === id);
}

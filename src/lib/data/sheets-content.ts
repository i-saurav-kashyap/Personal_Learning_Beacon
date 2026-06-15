import type { SheetId } from "@/lib/types";

// ---------------------------------------------------------------------------
// Canonical, ordered problem lists for the curated sheets (sourced from the
// well-known public lists). Titles are resolved to Beacon library problems via
// librarySlugForTitle, so each row deep-links into our full solution when we
// have it. Sheets without an entry here fall back to tag-based membership.
// ---------------------------------------------------------------------------

export const BLIND_75: string[] = [
  // Arrays
  "Two Sum", "Contains Duplicate", "Top K Frequent Elements", "Product of Array Except Self",
  "Longest Consecutive Sequence", "3Sum", "Container With Most Water",
  "Best Time to Buy and Sell Stock", "Combination Sum", "Insert Interval", "Merge Intervals",
  "Non-overlapping Intervals", "Meeting Rooms", "Meeting Rooms II", "Missing Number",
  // Strings
  "Valid Anagram", "Group Anagrams", "Encode and Decode Strings", "Valid Palindrome",
  "Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement",
  "Minimum Window Substring", "Longest Palindromic Substring", "Palindromic Substrings",
  // Stack
  "Valid Parentheses",
  // Matrix
  "Rotate Image", "Spiral Matrix", "Set Matrix Zeroes",
  // Binary Search
  "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array",
  // Linked List
  "Reverse Linked List", "Merge Two Sorted Lists", "Linked List Cycle", "Reorder List",
  "Remove Nth Node From End of List", "Merge k Sorted Lists",
  // Tree
  "Invert Binary Tree", "Maximum Depth of Binary Tree", "Same Tree", "Subtree of Another Tree",
  "Binary Tree Level Order Traversal", "Construct Binary Tree from Preorder and Inorder Traversal",
  "Binary Tree Maximum Path Sum", "Serialize and Deserialize Binary Tree",
  // BST
  "Lowest Common Ancestor of a Binary Search Tree", "Validate Binary Search Tree",
  "Kth Smallest Element in a BST",
  // Tries
  "Implement Trie (Prefix Tree)", "Design Add and Search Words Data Structure", "Word Search II",
  // Heap
  "Find Median from Data Stream",
  // Graphs
  "Word Search", "Number of Islands", "Clone Graph", "Pacific Atlantic Water Flow",
  "Course Schedule", "Number of Connected Components in an Undirected Graph", "Graph Valid Tree",
  "Alien Dictionary",
  // DP
  "Climbing Stairs", "House Robber", "House Robber II", "Decode Ways", "Coin Change",
  "Maximum Product Subarray", "Word Break", "Longest Increasing Subsequence", "Unique Paths",
  "Jump Game", "Combination Sum IV", "Maximum Subarray",
  // Bit
  "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Sum of Two Integers",
];

export const NEETCODE_150: string[] = [
  // Arrays & Hashing
  "Contains Duplicate", "Valid Anagram", "Two Sum", "Group Anagrams", "Top K Frequent Elements",
  "Product of Array Except Self", "Valid Sudoku", "Encode and Decode Strings",
  "Longest Consecutive Sequence",
  // Two Pointers
  "Valid Palindrome", "Two Sum II - Input Array Is Sorted", "3Sum", "Container With Most Water",
  "Trapping Rain Water",
  // Sliding Window
  "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
  "Longest Repeating Character Replacement", "Permutation in String", "Minimum Window Substring",
  "Sliding Window Maximum",
  // Stack
  "Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation", "Generate Parentheses",
  "Daily Temperatures", "Car Fleet", "Largest Rectangle in Histogram",
  // Binary Search
  "Binary Search", "Search a 2D Matrix", "Koko Eating Bananas",
  "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array",
  "Time Based Key-Value Store", "Median of Two Sorted Arrays",
  // Linked List
  "Reverse Linked List", "Merge Two Sorted Lists", "Reorder List",
  "Remove Nth Node From End of List", "Copy List with Random Pointer", "Add Two Numbers",
  "Linked List Cycle", "Find the Duplicate Number", "LRU Cache", "Merge k Sorted Lists",
  "Reverse Nodes in k-Group",
  // Trees
  "Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree",
  "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree",
  "Lowest Common Ancestor of a Binary Search Tree", "Binary Tree Level Order Traversal",
  "Binary Tree Right Side View", "Count Good Nodes in Binary Tree",
  "Validate Binary Search Tree", "Kth Smallest Element in a BST",
  "Construct Binary Tree from Preorder and Inorder Traversal", "Binary Tree Maximum Path Sum",
  "Serialize and Deserialize Binary Tree",
  // Tries
  "Implement Trie (Prefix Tree)", "Design Add and Search Words Data Structure", "Word Search II",
  // Heap / Priority Queue
  "Kth Largest Element in a Stream", "Last Stone Weight", "K Closest Points to Origin",
  "Kth Largest Element in an Array", "Task Scheduler", "Design Twitter",
  "Find Median from Data Stream",
  // Backtracking
  "Subsets", "Combination Sum", "Permutations", "Subsets II", "Combination Sum II",
  "Word Search", "Palindrome Partitioning", "Letter Combinations of a Phone Number", "N-Queens",
  // Graphs
  "Number of Islands", "Clone Graph", "Max Area of Island", "Pacific Atlantic Water Flow",
  "Surrounded Regions", "Rotting Oranges", "Walls and Gates", "Course Schedule",
  "Course Schedule II", "Redundant Connection",
  "Number of Connected Components in an Undirected Graph", "Graph Valid Tree", "Word Ladder",
  // Advanced Graphs
  "Reconstruct Itinerary", "Min Cost to Connect All Points", "Network Delay Time",
  "Swim in Rising Water", "Alien Dictionary", "Cheapest Flights Within K Stops",
  // 1-D DP
  "Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "House Robber II",
  "Longest Palindromic Substring", "Palindromic Substrings", "Decode Ways", "Coin Change",
  "Maximum Product Subarray", "Word Break", "Longest Increasing Subsequence",
  "Partition Equal Subset Sum",
  // 2-D DP
  "Unique Paths", "Longest Common Subsequence", "Best Time to Buy and Sell Stock with Cooldown",
  "Coin Change 2", "Target Sum", "Interleaving String", "Distinct Subsequences", "Edit Distance",
  "Burst Balloons", "Regular Expression Matching",
  // Greedy
  "Maximum Subarray", "Jump Game", "Jump Game II", "Gas Station", "Hand of Straights",
  "Merge Triplets to Form Target Triplet", "Partition Labels", "Valid Parenthesis String",
  // Intervals
  "Insert Interval", "Merge Intervals", "Non-overlapping Intervals", "Meeting Rooms",
  "Meeting Rooms II",
  // Math & Geometry
  "Rotate Image", "Spiral Matrix", "Set Matrix Zeroes", "Happy Number", "Plus One", "Pow(x, n)",
  "Multiply Strings", "Detect Squares",
  // Bit Manipulation
  "Single Number", "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Missing Number",
  "Sum of Two Integers", "Reverse Integer",
];

// A focused 50 spanning every major topic — all backed by full Beacon content.
export const TOP_50: string[] = [
  "Two Sum", "Best Time to Buy and Sell Stock", "Contains Duplicate",
  "Product of Array Except Self", "Maximum Subarray", "3Sum", "Container With Most Water",
  "Merge Intervals", "Group Anagrams", "Top K Frequent Elements", "Valid Anagram",
  "Valid Palindrome", "Longest Substring Without Repeating Characters",
  "Longest Repeating Character Replacement", "Valid Parentheses", "Min Stack",
  "Daily Temperatures", "Largest Rectangle in Histogram", "Binary Search",
  "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array",
  "Koko Eating Bananas", "Reverse Linked List", "Merge Two Sorted Lists", "Linked List Cycle",
  "Add Two Numbers", "Remove Nth Node From End of List", "Invert Binary Tree",
  "Maximum Depth of Binary Tree", "Binary Tree Level Order Traversal",
  "Validate Binary Search Tree", "Lowest Common Ancestor of a BST", "Diameter of Binary Tree",
  "Number of Islands", "Clone Graph", "Course Schedule", "Rotting Oranges",
  "Implement Trie (Prefix Tree)", "Kth Largest Element in an Array", "Climbing Stairs",
  "Coin Change", "House Robber", "Longest Increasing Subsequence", "Word Break", "Unique Paths",
  "Subsets", "Combination Sum", "Single Number", "Missing Number", "Number of 1 Bits",
];

export const SHEET_TITLES: Partial<Record<SheetId, string[]>> = {
  blind75: BLIND_75,
  neetcode150: NEETCODE_150,
  top50: TOP_50,
};

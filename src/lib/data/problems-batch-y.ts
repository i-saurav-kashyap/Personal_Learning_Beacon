import type { Problem } from "@/lib/types";

// Stack & Queue batch (Striver A2Z gaps). Full teaching template + Java/Python/
// JavaScript/Apex solutions.
export const PROBLEMS_BATCH_Y: Problem[] = [
  {
    slug: "implement-stack-using-array",
    title: "Implement Stack using Array",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Stacks"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement a LIFO stack backed by an array, supporting push, pop, top (peek), size and isEmpty — each in O(1).",
    beginnerExplanation:
      "A stack is a pile of plates: you add and remove from the top only. Keep an array and a `top` index; push increments it and writes, pop reads and decrements.",
    realWorldAnalogy:
      "A stack of plates in a cafeteria — you take the top plate and you add to the top. Last one in is the first one out.",
    visualExplanation:
      "push(10) push(20) push(30)\n[10,20,30]  top=2\npop() -> 30, top=1\ntop() -> 20",
    approaches: [
      {
        title: "Array + top index",
        tier: "Optimal",
        idea: "Maintain an array and an integer `top` pointing at the last element; all ops touch only the top.",
        steps: [
          "push: top++ then store",
          "pop: read at top then top--",
          "top/peek: read at top",
          "isEmpty: top == -1",
        ],
        time: "O(1) per operation",
        space: "O(n)",
      },
    ],
    dryRun: "push 5, push 7 -> [5,7] top=1; pop -> 7, top=0; peek -> 5",
    interviewTips: [
      "Clarify fixed vs dynamic capacity; a dynamic array (amortised O(1)) avoids overflow.",
      "Guard pop/peek against an empty stack.",
    ],
    commonMistakes: ["Off-by-one on the top index.", "Not handling underflow on pop."],
    followUps: ["Implement a stack that also returns the minimum in O(1) (Min Stack)."],
    related: ["min-stack", "implement-queue-using-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class Stack:
    def __init__(self):
        self.arr = []

    def push(self, x):
        self.arr.append(x)

    def pop(self):
        if not self.arr:
            raise IndexError("pop from empty stack")
        return self.arr.pop()

    def top(self):
        return self.arr[-1]

    def size(self):
        return len(self.arr)

    def is_empty(self):
        return len(self.arr) == 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Stack {
    private int[] arr;
    private int top;

    Stack(int capacity) {
        arr = new int[capacity];
        top = -1;
    }

    void push(int x) { arr[++top] = x; }
    int pop() { return arr[top--]; }
    int top() { return arr[top]; }
    int size() { return top + 1; }
    boolean isEmpty() { return top == -1; }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class Stack {
  constructor() {
    this.arr = [];
  }
  push(x) { this.arr.push(x); }
  pop() { return this.arr.pop(); }
  top() { return this.arr[this.arr.length - 1]; }
  size() { return this.arr.length; }
  isEmpty() { return this.arr.length === 0; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class StackArray {
    private List<Integer> arr = new List<Integer>();

    public void push(Integer x) { arr.add(x); }
    public Integer pop() { return arr.remove(arr.size() - 1); }
    public Integer top() { return arr[arr.size() - 1]; }
    public Integer size() { return arr.size(); }
    public Boolean isEmpty() { return arr.isEmpty(); }
}`,
      },
    ],
  },
  {
    slug: "implement-queue-using-array",
    title: "Implement Queue using Array",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Queues"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement a FIFO queue backed by an array, supporting enqueue (push), dequeue (pop), front (peek) and isEmpty in O(1) amortised.",
    beginnerExplanation:
      "A queue is a line at a counter: people join at the back and leave from the front. Use a circular array with front and rear indices so the line can wrap around without shifting.",
    realWorldAnalogy:
      "A checkout line: first to arrive is first served (FIFO).",
    visualExplanation:
      "enqueue 1,2,3 -> front=0 rear=2 [1,2,3]\ndequeue -> 1, front=1\nenqueue 4 wraps rear around the circular buffer",
    approaches: [
      {
        title: "Circular array with front/rear",
        tier: "Optimal",
        idea: "Track front, rear and count; advance indices modulo capacity so the buffer reuses freed slots.",
        steps: [
          "enqueue: rear = (rear + 1) % cap, store, count++",
          "dequeue: read front, front = (front + 1) % cap, count--",
          "isEmpty: count == 0",
        ],
        time: "O(1) per operation",
        space: "O(n)",
      },
    ],
    dryRun: "cap 3: enq 1,2 -> [1,2_]; deq -> 1; enq 3,4 -> wraps -> contains 2,3,4",
    interviewTips: [
      "A plain array where dequeue shifts everything is O(n); the circular buffer is the fix.",
      "Track an explicit count to distinguish full from empty (both can have front == rear).",
    ],
    commonMistakes: ["Forgetting the modulo wrap.", "Confusing full vs empty when front == rear."],
    followUps: ["Implement a queue using two stacks.", "Implement a deque."],
    related: ["implement-stack-using-array", "implement-queue-using-stacks"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class Queue:
    def __init__(self, capacity):
        self.arr = [0] * capacity
        self.cap = capacity
        self.front = 0
        self.rear = -1
        self.count = 0

    def enqueue(self, x):
        if self.count == self.cap:
            raise OverflowError("queue full")
        self.rear = (self.rear + 1) % self.cap
        self.arr[self.rear] = x
        self.count += 1

    def dequeue(self):
        if self.count == 0:
            raise IndexError("queue empty")
        x = self.arr[self.front]
        self.front = (self.front + 1) % self.cap
        self.count -= 1
        return x

    def peek(self):
        return self.arr[self.front]

    def is_empty(self):
        return self.count == 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Queue {
    private int[] arr;
    private int front, rear, count, cap;

    Queue(int capacity) {
        cap = capacity;
        arr = new int[cap];
        front = 0;
        rear = -1;
        count = 0;
    }

    void enqueue(int x) {
        rear = (rear + 1) % cap;
        arr[rear] = x;
        count++;
    }

    int dequeue() {
        int x = arr[front];
        front = (front + 1) % cap;
        count--;
        return x;
    }

    int peek() { return arr[front]; }
    boolean isEmpty() { return count == 0; }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class Queue {
  constructor(capacity) {
    this.arr = new Array(capacity);
    this.cap = capacity;
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
  enqueue(x) {
    this.rear = (this.rear + 1) % this.cap;
    this.arr[this.rear] = x;
    this.count++;
  }
  dequeue() {
    const x = this.arr[this.front];
    this.front = (this.front + 1) % this.cap;
    this.count--;
    return x;
  }
  peek() { return this.arr[this.front]; }
  isEmpty() { return this.count === 0; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class CircularQueue {
    private List<Integer> arr;
    private Integer front = 0, rear = -1, count = 0, cap;

    public CircularQueue(Integer capacity) {
        cap = capacity;
        arr = new List<Integer>();
        for (Integer i = 0; i < cap; i++) arr.add(0);
    }

    public void enqueue(Integer x) {
        rear = Math.mod(rear + 1, cap);
        arr[rear] = x;
        count++;
    }

    public Integer dequeue() {
        Integer x = arr[front];
        front = Math.mod(front + 1, cap);
        count--;
        return x;
    }

    public Integer peek() { return arr[front]; }
    public Boolean isEmpty() { return count == 0; }
}`,
      },
    ],
  },
  {
    slug: "implement-stack-using-queue",
    title: "Implement Stack using Queue",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Stacks", "Queues"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Implement a LIFO stack using only a single queue. push, pop, top and empty should behave like a normal stack.",
    beginnerExplanation:
      "A queue is FIFO, but we want LIFO. Trick: on each push, add the element to the queue, then rotate the queue by moving every earlier element to the back — so the newest element sits at the front and pops first.",
    realWorldAnalogy:
      "People in a circle passing a parcel: after a new person joins, everyone already in line walks around to the back, leaving the newcomer at the front.",
    visualExplanation:
      "push 1 -> [1]\npush 2 -> add [1,2] then rotate 1 to back -> [2,1]\npush 3 -> [2,1,3] rotate 2 -> [1,3,2]... front is newest",
    approaches: [
      {
        title: "Single queue, rotate on push",
        tier: "Optimal",
        idea: "Push is O(n): enqueue the new value, then dequeue-and-enqueue the previous size elements so the newest is at the front.",
        steps: [
          "push: queue.add(x); for i in 0..size-2: queue.add(queue.poll())",
          "pop/top: front of queue",
        ],
        time: "push O(n), pop/top O(1)",
        space: "O(n)",
      },
    ],
    dryRun: "push1 [1]; push2 add->[1,2] rotate->[2,1]; pop->2; top->1",
    interviewTips: [
      "Decide whether to make push or pop the costly operation; the single-queue rotate makes push O(n).",
      "Mention the two-queue alternative as a contrast.",
    ],
    commonMistakes: ["Rotating the wrong number of times.", "Forgetting to handle empty on pop."],
    followUps: ["Implement a queue using two stacks (the reverse problem)."],
    related: ["implement-queue-using-stacks", "implement-stack-using-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return len(self.q) == 0`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class MyStack {
    private Queue<Integer> q = new LinkedList<>();

    public void push(int x) {
        q.add(x);
        for (int i = 0; i < q.size() - 1; i++) q.add(q.remove());
    }

    public int pop() { return q.remove(); }
    public int top() { return q.peek(); }
    public boolean empty() { return q.isEmpty(); }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class MyStack {
  constructor() {
    this.q = [];
  }
  push(x) {
    this.q.push(x);
    for (let i = 0; i < this.q.length - 1; i++) this.q.push(this.q.shift());
  }
  pop() { return this.q.shift(); }
  top() { return this.q[0]; }
  empty() { return this.q.length === 0; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class MyStack {
    private List<Integer> q = new List<Integer>();

    public void push(Integer x) {
        q.add(x);
        Integer rotations = q.size() - 1;
        for (Integer i = 0; i < rotations; i++) q.add(q.remove(0));
    }

    public Integer pop() { return q.remove(0); }
    public Integer top() { return q[0]; }
    public Boolean empty() { return q.isEmpty(); }
}`,
      },
    ],
  },
  {
    slug: "implement-stack-using-linked-list",
    title: "Implement Stack using Linked List",
    difficulty: "Easy",
    patterns: ["stack", "linked-list"],
    topics: ["Stacks", "Linked Lists"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Implement a stack using a singly linked list. push, pop, top and size must be O(1), with no fixed capacity.",
    beginnerExplanation:
      "Keep a pointer to the head of a linked list and treat the head as the top of the stack. Pushing prepends a node; popping removes the head — both O(1) and unbounded.",
    realWorldAnalogy:
      "A chain where you always clip new links onto the front and unclip from the front.",
    visualExplanation:
      "push 1 -> head->1\npush 2 -> head->2->1\npop -> 2, head->1",
    approaches: [
      {
        title: "Prepend / remove head",
        tier: "Optimal",
        idea: "New node's next points to the current head; head becomes the new node. Pop returns head.val and advances head.",
        steps: ["push: node.next = head; head = node; size++", "pop: val = head.val; head = head.next; size--"],
        time: "O(1) per operation",
        space: "O(n)",
      },
    ],
    dryRun: "push 5 -> 5; push 9 -> 9->5; top -> 9; pop -> 9 -> list 5",
    interviewTips: ["No resizing or overflow vs the array version — a clean talking point."],
    commonMistakes: ["Losing the rest of the list by reassigning head before linking next."],
    followUps: ["Implement a queue with a linked list (track both head and tail)."],
    related: ["implement-stack-using-array"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class Stack:
    def __init__(self):
        self.head = None
        self._size = 0

    def push(self, x):
        node = Node(x)
        node.next = self.head
        self.head = node
        self._size += 1

    def pop(self):
        if self.head is None:
            raise IndexError("empty")
        val = self.head.val
        self.head = self.head.next
        self._size -= 1
        return val

    def top(self):
        return self.head.val

    def size(self):
        return self._size`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Stack {
    private static class Node {
        int val; Node next;
        Node(int v) { val = v; }
    }
    private Node head;
    private int size = 0;

    void push(int x) {
        Node node = new Node(x);
        node.next = head;
        head = node;
        size++;
    }

    int pop() {
        int val = head.val;
        head = head.next;
        size--;
        return val;
    }

    int top() { return head.val; }
    int size() { return size; }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `class Stack {
  constructor() {
    this.head = null;
    this._size = 0;
  }
  push(x) {
    this.head = { val: x, next: this.head };
    this._size++;
  }
  pop() {
    const val = this.head.val;
    this.head = this.head.next;
    this._size--;
    return val;
  }
  top() { return this.head.val; }
  size() { return this._size; }
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class LinkedStack {
    class Node {
        Integer val;
        Node next;
        Node(Integer v) { val = v; }
    }
    private Node head;
    private Integer sz = 0;

    public void push(Integer x) {
        Node node = new Node(x);
        node.next = head;
        head = node;
        sz++;
    }

    public Integer pop() {
        Integer val = head.val;
        head = head.next;
        sz--;
        return val;
    }

    public Integer top() { return head.val; }
    public Integer size() { return sz; }
}`,
      },
    ],
  },
  {
    slug: "infix-to-postfix-conversion",
    title: "Infix to Postfix Conversion",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks", "Strings"],
    companies: ["amazon", "oracle"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Convert an infix expression (e.g. `a+b*c`) to postfix (reverse Polish, `abc*+`) using operator precedence and associativity. Operands are single characters; operators are + - * / ^ with parentheses.",
    beginnerExplanation:
      "Scan left to right. Output operands immediately. Push operators onto a stack, but before pushing, pop any stacked operator with greater-or-equal precedence (so higher-priority work emits first). Parentheses force a sub-scope.",
    realWorldAnalogy:
      "Like resolving who goes first at a 4-way stop by priority rules — higher-priority operators get 'served' (emitted) before lower ones.",
    visualExplanation:
      "a+b*c: out=a; push +; out=ab; *> + so push *; out=abc; flush -> abc*+",
    approaches: [
      {
        title: "Shunting-yard with operator stack",
        tier: "Optimal",
        idea: "Use a precedence map; pop while top has >= precedence (and > for right-assoc '^'); handle '(' ')'.",
        steps: [
          "operand -> append to output",
          "'(' -> push; ')' -> pop until '('",
          "operator -> pop while prec(top) >= prec(cur) (use > for '^'), then push",
          "end -> pop remaining operators",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "(a+b)*c -> push '('; a; push '+'; b; ')' pop '+' -> ab+; '*'; c -> ab+c*",
    interviewTips: [
      "Right-associative '^' uses strictly-greater precedence when deciding to pop.",
      "State your precedence table up front (+ - = 1, * / = 2, ^ = 3).",
    ],
    commonMistakes: ["Wrong associativity for '^'.", "Forgetting to flush the stack at the end."],
    followUps: ["Infix to prefix.", "Evaluate the resulting postfix expression."],
    related: ["infix-to-prefix-conversion", "evaluate-reverse-polish-notation"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def infix_to_postfix(s):
    prec = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    out, stack = [], []
    for c in s:
        if c.isalnum():
            out.append(c)
        elif c == '(':
            stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(':
                out.append(stack.pop())
            stack.pop()  # remove '('
        else:
            while (stack and stack[-1] != '(' and
                   (prec[stack[-1]] > prec[c] or
                    (prec[stack[-1]] == prec[c] and c != '^'))):
                out.append(stack.pop())
            stack.append(c)
    while stack:
        out.append(stack.pop())
    return ''.join(out)`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private int prec(char c) {
        if (c == '+' || c == '-') return 1;
        if (c == '*' || c == '/') return 2;
        if (c == '^') return 3;
        return -1;
    }

    public String infixToPostfix(String s) {
        StringBuilder out = new StringBuilder();
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) out.append(c);
            else if (c == '(') st.push(c);
            else if (c == ')') {
                while (!st.isEmpty() && st.peek() != '(') out.append(st.pop());
                st.pop();
            } else {
                while (!st.isEmpty() && st.peek() != '(' &&
                       (prec(st.peek()) > prec(c) ||
                        (prec(st.peek()) == prec(c) && c != '^')))
                    out.append(st.pop());
                st.push(c);
            }
        }
        while (!st.isEmpty()) out.append(st.pop());
        return out.toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function infixToPostfix(s) {
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const out = [], st = [];
  const isAlnum = (c) => /[a-zA-Z0-9]/.test(c);
  for (const c of s) {
    if (isAlnum(c)) out.push(c);
    else if (c === '(') st.push(c);
    else if (c === ')') {
      while (st.length && st[st.length - 1] !== '(') out.push(st.pop());
      st.pop();
    } else {
      while (st.length && st[st.length - 1] !== '(' &&
             (prec[st[st.length - 1]] > prec[c] ||
              (prec[st[st.length - 1]] === prec[c] && c !== '^')))
        out.push(st.pop());
      st.push(c);
    }
  }
  while (st.length) out.push(st.pop());
  return out.join('');
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private static Integer prec(String c) {
        if (c == '+' || c == '-') return 1;
        if (c == '*' || c == '/') return 2;
        if (c == '^') return 3;
        return -1;
    }

    public static String infixToPostfix(String s) {
        String out = '';
        List<String> st = new List<String>();
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            if (c.isAlphanumeric()) {
                out += c;
            } else if (c == '(') {
                st.add(c);
            } else if (c == ')') {
                while (!st.isEmpty() && st[st.size() - 1] != '(') out += st.remove(st.size() - 1);
                st.remove(st.size() - 1);
            } else {
                while (!st.isEmpty() && st[st.size() - 1] != '(' &&
                       (prec(st[st.size() - 1]) > prec(c) ||
                        (prec(st[st.size() - 1]) == prec(c) && c != '^')))
                    out += st.remove(st.size() - 1);
                st.add(c);
            }
        }
        while (!st.isEmpty()) out += st.remove(st.size() - 1);
        return out;
    }
}`,
      },
    ],
  },
  {
    slug: "infix-to-prefix-conversion",
    title: "Infix to Prefix Conversion",
    difficulty: "Medium",
    patterns: ["stack"],
    topics: ["Stacks", "Strings"],
    companies: ["amazon", "oracle"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "Convert an infix expression to prefix (Polish notation). Operands single chars; operators + - * / ^ with parentheses.",
    beginnerExplanation:
      "Neat trick: reverse the infix string (swapping '(' and ')'), run the infix→postfix algorithm but with '^' treated as left-ish (pop only on strictly-greater for the reversed pass), then reverse the result. That gives prefix.",
    realWorldAnalogy:
      "Solve the mirror image of the problem, then flip the answer back — like reading a reflection.",
    visualExplanation:
      "(a+b)*c reversed-> c*)b+a( ; convert to postfix -> cba+* ; reverse -> *+abc",
    approaches: [
      {
        title: "Reverse → postfix → reverse",
        tier: "Optimal",
        idea: "Reverse and swap parens, convert to postfix (with associativity flipped for equal precedence), reverse output.",
        steps: [
          "Reverse the string, swapping '(' <-> ')'",
          "Run infix→postfix; for equal precedence pop only when strictly greater (handles the flip)",
          "Reverse the postfix result to obtain prefix",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "a+b*c -> reverse 'c*b+a' -> postfix 'cb*a+' -> reverse '+a*bc'",
    interviewTips: ["The reverse-then-postfix reduction avoids writing a second precedence loop from scratch."],
    commonMistakes: ["Forgetting to swap parentheses when reversing.", "Wrong associativity handling on the reversed pass."],
    followUps: ["Prefix to infix.", "Evaluate a prefix expression."],
    related: ["infix-to-postfix-conversion", "prefix-to-infix-conversion"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def infix_to_prefix(s):
    prec = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    rev = []
    for c in reversed(s):
        if c == '(':
            rev.append(')')
        elif c == ')':
            rev.append('(')
        else:
            rev.append(c)
    out, stack = [], []
    for c in rev:
        if c.isalnum():
            out.append(c)
        elif c == '(':
            stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(':
                out.append(stack.pop())
            stack.pop()
        else:
            while stack and stack[-1] != '(' and prec[stack[-1]] > prec[c]:
                out.append(stack.pop())
            # for equal precedence on the reversed pass we do NOT pop
            if stack and stack[-1] != '(' and prec[stack[-1]] == prec[c] and c == '^':
                out.append(stack.pop())
            stack.append(c)
    while stack:
        out.append(stack.pop())
    return ''.join(reversed(out))`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    private int prec(char c) {
        if (c == '+' || c == '-') return 1;
        if (c == '*' || c == '/') return 2;
        if (c == '^') return 3;
        return -1;
    }

    public String infixToPrefix(String s) {
        StringBuilder rev = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            if (c == '(') rev.append(')');
            else if (c == ')') rev.append('(');
            else rev.append(c);
        }
        StringBuilder out = new StringBuilder();
        Deque<Character> st = new ArrayDeque<>();
        for (char c : rev.toString().toCharArray()) {
            if (Character.isLetterOrDigit(c)) out.append(c);
            else if (c == '(') st.push(c);
            else if (c == ')') {
                while (!st.isEmpty() && st.peek() != '(') out.append(st.pop());
                st.pop();
            } else {
                while (!st.isEmpty() && st.peek() != '(' && prec(st.peek()) > prec(c))
                    out.append(st.pop());
                if (!st.isEmpty() && st.peek() != '(' && prec(st.peek()) == prec(c) && c == '^')
                    out.append(st.pop());
                st.push(c);
            }
        }
        while (!st.isEmpty()) out.append(st.pop());
        return out.reverse().toString();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function infixToPrefix(s) {
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const isAlnum = (c) => /[a-zA-Z0-9]/.test(c);
  let rev = '';
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i];
    rev += c === '(' ? ')' : c === ')' ? '(' : c;
  }
  const out = [], st = [];
  for (const c of rev) {
    if (isAlnum(c)) out.push(c);
    else if (c === '(') st.push(c);
    else if (c === ')') {
      while (st.length && st[st.length - 1] !== '(') out.push(st.pop());
      st.pop();
    } else {
      while (st.length && st[st.length - 1] !== '(' && prec[st[st.length - 1]] > prec[c])
        out.push(st.pop());
      if (st.length && st[st.length - 1] !== '(' && prec[st[st.length - 1]] === prec[c] && c === '^')
        out.push(st.pop());
      st.push(c);
    }
  }
  while (st.length) out.push(st.pop());
  return out.reverse().join('');
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    private static Integer prec(String c) {
        if (c == '+' || c == '-') return 1;
        if (c == '*' || c == '/') return 2;
        if (c == '^') return 3;
        return -1;
    }

    public static String infixToPrefix(String s) {
        String rev = '';
        for (Integer i = s.length() - 1; i >= 0; i--) {
            String c = s.substring(i, i + 1);
            rev += (c == '(') ? ')' : (c == ')') ? '(' : c;
        }
        List<String> out = new List<String>();
        List<String> st = new List<String>();
        for (Integer i = 0; i < rev.length(); i++) {
            String c = rev.substring(i, i + 1);
            if (c.isAlphanumeric()) {
                out.add(c);
            } else if (c == '(') {
                st.add(c);
            } else if (c == ')') {
                while (!st.isEmpty() && st[st.size() - 1] != '(') out.add(st.remove(st.size() - 1));
                st.remove(st.size() - 1);
            } else {
                while (!st.isEmpty() && st[st.size() - 1] != '(' && prec(st[st.size() - 1]) > prec(c))
                    out.add(st.remove(st.size() - 1));
                if (!st.isEmpty() && st[st.size() - 1] != '(' && prec(st[st.size() - 1]) == prec(c) && c == '^')
                    out.add(st.remove(st.size() - 1));
                st.add(c);
            }
        }
        while (!st.isEmpty()) out.add(st.remove(st.size() - 1));
        String res = '';
        for (Integer i = out.size() - 1; i >= 0; i--) res += out[i];
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "prefix-to-infix-conversion",
    title: "Prefix to Infix Conversion",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Stacks", "Strings"],
    companies: ["oracle"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Convert a prefix expression to a fully-parenthesised infix expression. Operands are single chars; operators + - * / ^.",
    beginnerExplanation:
      "Scan the prefix string from RIGHT to LEFT. Push operands. When you hit an operator, pop two operands and combine as `(left op right)`, then push the result back.",
    realWorldAnalogy:
      "Assembling Lego from the instructions read backwards — grab the two nearest pieces and snap them together with the connector.",
    visualExplanation:
      "*+abc (right->left): push c,b,a; '+' -> (a+b); push; '*' -> ((a+b)*c)",
    approaches: [
      {
        title: "Right-to-left stack of strings",
        tier: "Optimal",
        idea: "Iterate from the end; operands push; operators pop two (first popped is the left operand) and push '(L op R)'.",
        steps: ["for c from end to start", "operand -> push", "operator -> L=pop, R=pop, push '('+L+c+R+')'", "answer = top"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "+ab : push b, push a; '+' pop a,b -> (a+b)",
    interviewTips: ["For prefix the first popped item is the LEFT operand (opposite of postfix)."],
    commonMistakes: ["Swapping left/right operands.", "Scanning the wrong direction."],
    followUps: ["Postfix to infix.", "Evaluate the prefix expression directly."],
    related: ["postfix-to-infix-conversion", "infix-to-prefix-conversion"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def prefix_to_infix(s):
    ops = set('+-*/^')
    stack = []
    for c in reversed(s):
        if c in ops:
            left = stack.pop()
            right = stack.pop()
            stack.append('(' + left + c + right + ')')
        else:
            stack.append(c)
    return stack[-1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String prefixToInfix(String s) {
        Deque<String> st = new ArrayDeque<>();
        String ops = "+-*/^";
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            if (ops.indexOf(c) >= 0) {
                String left = st.pop();
                String right = st.pop();
                st.push("(" + left + c + right + ")");
            } else {
                st.push(String.valueOf(c));
            }
        }
        return st.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function prefixToInfix(s) {
  const ops = new Set(['+', '-', '*', '/', '^']);
  const st = [];
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i];
    if (ops.has(c)) {
      const left = st.pop();
      const right = st.pop();
      st.push('(' + left + c + right + ')');
    } else {
      st.push(c);
    }
  }
  return st[st.length - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String prefixToInfix(String s) {
        List<String> st = new List<String>();
        String ops = '+-*/^';
        for (Integer i = s.length() - 1; i >= 0; i--) {
            String c = s.substring(i, i + 1);
            if (ops.contains(c)) {
                String left = st.remove(st.size() - 1);
                String right = st.remove(st.size() - 1);
                st.add('(' + left + c + right + ')');
            } else {
                st.add(c);
            }
        }
        return st[st.size() - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "postfix-to-infix-conversion",
    title: "Postfix to Infix Conversion",
    difficulty: "Easy",
    patterns: ["stack"],
    topics: ["Stacks", "Strings"],
    companies: ["oracle"],
    sheets: ["striver"],
    frequency: 1,
    statement:
      "Convert a postfix expression to a fully-parenthesised infix expression. Operands single chars; operators + - * / ^.",
    beginnerExplanation:
      "Scan LEFT to RIGHT. Push operands. On an operator pop two operands — the SECOND popped is the left operand — and push '(left op right)'.",
    realWorldAnalogy:
      "Reading assembly steps front to back, combining the last two parts produced whenever you hit a connector.",
    visualExplanation:
      "ab+c* : push a,b; '+' pop b,a -> (a+b); push c; '*' pop c,(a+b) -> ((a+b)*c)",
    approaches: [
      {
        title: "Left-to-right stack of strings",
        tier: "Optimal",
        idea: "Operands push; operator pops two (second popped is left) and pushes '(L op R)'.",
        steps: ["for c left to right", "operand -> push", "operator -> R=pop, L=pop, push '('+L+c+R+')'"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "ab+ : push a,b; '+' -> R=b,L=a -> (a+b)",
    interviewTips: ["For postfix the first popped is the RIGHT operand (opposite of prefix)."],
    commonMistakes: ["Swapping operand order.", "Forgetting parentheses around each combination."],
    followUps: ["Postfix evaluation with numeric operands."],
    related: ["prefix-to-infix-conversion", "evaluate-reverse-polish-notation"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def postfix_to_infix(s):
    ops = set('+-*/^')
    stack = []
    for c in s:
        if c in ops:
            right = stack.pop()
            left = stack.pop()
            stack.append('(' + left + c + right + ')')
        else:
            stack.append(c)
    return stack[-1]`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public String postfixToInfix(String s) {
        Deque<String> st = new ArrayDeque<>();
        String ops = "+-*/^";
        for (char c : s.toCharArray()) {
            if (ops.indexOf(c) >= 0) {
                String right = st.pop();
                String left = st.pop();
                st.push("(" + left + c + right + ")");
            } else {
                st.push(String.valueOf(c));
            }
        }
        return st.peek();
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function postfixToInfix(s) {
  const ops = new Set(['+', '-', '*', '/', '^']);
  const st = [];
  for (const c of s) {
    if (ops.has(c)) {
      const right = st.pop();
      const left = st.pop();
      st.push('(' + left + c + right + ')');
    } else {
      st.push(c);
    }
  }
  return st[st.length - 1];
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String postfixToInfix(String s) {
        List<String> st = new List<String>();
        String ops = '+-*/^';
        for (Integer i = 0; i < s.length(); i++) {
            String c = s.substring(i, i + 1);
            if (ops.contains(c)) {
                String right = st.remove(st.size() - 1);
                String left = st.remove(st.size() - 1);
                st.add('(' + left + c + right + ')');
            } else {
                st.add(c);
            }
        }
        return st[st.size() - 1];
    }
}`,
      },
    ],
  },
  {
    slug: "next-greater-element-ii",
    title: "Next Greater Element II",
    difficulty: "Medium",
    patterns: ["monotonic-stack"],
    topics: ["Stacks", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a circular array `nums`, return for each element the next greater element going clockwise (wrapping around). If none exists, use -1.",
    beginnerExplanation:
      "Use a monotonic decreasing stack of indices. To handle the wrap-around, iterate `2n` times using `i % n`; each element pops smaller elements behind it and fills their answer.",
    realWorldAnalogy:
      "Standing in a circle looking clockwise for the first person taller than you — you may need to look past the 'end' back to the start.",
    visualExplanation:
      "nums=[1,2,1] -> [2,-1,2]  (the last 1 wraps to find 2)",
    approaches: [
      {
        title: "Monotonic stack over 2n",
        tier: "Optimal",
        idea: "Walk indices 0..2n-1; use i%n. While stack top's value < current, pop and set its answer to current. Push index only in the first pass.",
        steps: [
          "res filled with -1",
          "for i in 0..2n-1: cur = nums[i%n]",
          "while stack and nums[stack.top] < cur: res[stack.pop()] = cur",
          "if i < n: push i",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[1,2,1]: i0 push0; i1 cur2 pop0 res[0]=2 push1; i2 cur1 push2; i3(=0) cur1; i4(=1) cur2 pop2 res[2]=2; res=[2,-1,2]",
    interviewTips: ["Doubling the loop (2n) with modulo is the clean circular trick — only push during the first n."],
    commonMistakes: ["Pushing during the second pass (corrupts answers).", "Using values not indices on the stack."],
    followUps: ["Next Greater Element I (mapping subset).", "Next smaller element."],
    related: ["next-greater-element-i", "daily-temperatures", "previous-smaller-element"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def next_greater_elements(nums):
    n = len(nums)
    res = [-1] * n
    stack = []  # indices, decreasing by value
    for i in range(2 * n):
        cur = nums[i % n]
        while stack and nums[stack[-1]] < cur:
            res[stack.pop()] = cur
        if i < n:
            stack.append(i)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        Arrays.fill(res, -1);
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < 2 * n; i++) {
            int cur = nums[i % n];
            while (!st.isEmpty() && nums[st.peek()] < cur) res[st.pop()] = cur;
            if (i < n) st.push(i);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function nextGreaterElements(nums) {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const st = [];
  for (let i = 0; i < 2 * n; i++) {
    const cur = nums[i % n];
    while (st.length && nums[st[st.length - 1]] < cur) res[st.pop()] = cur;
    if (i < n) st.push(i);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> nextGreaterElements(List<Integer> nums) {
        Integer n = nums.size();
        List<Integer> res = new List<Integer>();
        for (Integer i = 0; i < n; i++) res.add(-1);
        List<Integer> st = new List<Integer>();
        for (Integer i = 0; i < 2 * n; i++) {
            Integer cur = nums[Math.mod(i, n)];
            while (!st.isEmpty() && nums[st[st.size() - 1]] < cur) {
                res[st.remove(st.size() - 1)] = cur;
            }
            if (i < n) st.add(i);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "previous-smaller-element",
    title: "Previous Smaller Element",
    difficulty: "Easy",
    patterns: ["monotonic-stack"],
    topics: ["Stacks", "Arrays"],
    companies: ["amazon"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "For each element of an array, find the nearest element to its left that is strictly smaller. If none exists, use -1.",
    beginnerExplanation:
      "Keep a monotonic increasing stack. For each element, pop everything >= it; whatever remains on top is the previous smaller element. Then push the current value.",
    realWorldAnalogy:
      "Looking back over your shoulder for the first person shorter than you — taller people in between don't count.",
    visualExplanation:
      "nums=[4,5,2,10,8] -> [-1,4,-1,2,2]",
    approaches: [
      {
        title: "Monotonic increasing stack",
        tier: "Optimal",
        idea: "Pop while top >= current; the new top is the answer; push current. Each element pushed/popped once.",
        steps: ["for each x", "while stack and stack.top >= x: pop", "ans = stack.top if any else -1", "push x"],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "[4,5,2]: x4 -> -1 push4; x5 top4<5 -> 4 push5; x2 pop5,pop4 -> -1 push2",
    interviewTips: ["Decide strict vs non-strict (>= vs >) based on whether equal elements count."],
    commonMistakes: ["Using > instead of >= (or vice-versa) inconsistently."],
    followUps: ["Previous greater, next smaller — same template, flipped comparison/direction."],
    related: ["next-greater-element-ii", "daily-temperatures"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def previous_smaller(nums):
    res = []
    stack = []
    for x in nums:
        while stack and stack[-1] >= x:
            stack.pop()
        res.append(stack[-1] if stack else -1)
        stack.append(x)
    return res`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] previousSmaller(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && st.peek() >= nums[i]) st.pop();
            res[i] = st.isEmpty() ? -1 : st.peek();
            st.push(nums[i]);
        }
        return res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function previousSmaller(nums) {
  const res = [];
  const st = [];
  for (const x of nums) {
    while (st.length && st[st.length - 1] >= x) st.pop();
    res.push(st.length ? st[st.length - 1] : -1);
    st.push(x);
  }
  return res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> previousSmaller(List<Integer> nums) {
        List<Integer> res = new List<Integer>();
        List<Integer> st = new List<Integer>();
        for (Integer x : nums) {
            while (!st.isEmpty() && st[st.size() - 1] >= x) st.remove(st.size() - 1);
            res.add(st.isEmpty() ? -1 : st[st.size() - 1]);
            st.add(x);
        }
        return res;
    }
}`,
      },
    ],
  },
  {
    slug: "sum-of-subarray-ranges",
    title: "Sum of Subarray Ranges",
    difficulty: "Medium",
    patterns: ["monotonic-stack"],
    topics: ["Stacks", "Arrays"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "The range of a subarray is (max − min). Return the sum of ranges over all subarrays = (sum of all subarray maximums) − (sum of all subarray minimums).",
    beginnerExplanation:
      "Sum of ranges = Σmax − Σmin over all subarrays. Each can be computed in O(n) with a monotonic stack by counting, for each element, how many subarrays it is the max (or min) of.",
    realWorldAnalogy:
      "Tallying each player's 'MVP appearances' and 'weakest-link appearances' across every possible team lineup, then subtracting.",
    visualExplanation:
      "[1,2,3]: Σmax=1+2+3 + (2,3,3)... = 10+? ; answer = Σmax − Σmin = 4",
    approaches: [
      {
        title: "Contribution via monotonic stacks",
        tier: "Optimal",
        idea: "For each i, count subarrays where nums[i] is the max (left/right spans with a strict/nonstrict tie-break) and where it's the min; contribution = nums[i] * leftMax*rightMax (and similarly for min).",
        steps: [
          "sumMax: for each i, left = #elements to the left strictly less, right = #to the right <=; add nums[i]*(left+1)*(right+1)",
          "sumMin: mirror with greater comparisons",
          "answer = sumMax − sumMin",
        ],
        time: "O(n)",
        space: "O(n)",
      },
      {
        title: "Brute force over subarrays",
        tier: "Brute Force",
        idea: "For every subarray track running max/min and add the range.",
        steps: ["for i: max=min=nums[i]; for j>=i update; add max-min"],
        time: "O(n²)",
        space: "O(1)",
      },
    ],
    dryRun: "[1,3,3]: ranges of all 6 subarrays summed = 4",
    interviewTips: [
      "O(n²) is fully acceptable to state first; the stack-contribution O(n) is the optimisation.",
      "Use one strict and one non-strict comparison to avoid double-counting equal elements.",
    ],
    commonMistakes: ["Double-counting subarrays with equal extremes.", "Integer overflow on large arrays (use 64-bit)."],
    followUps: ["Sum of subarray minimums (the min half alone)."],
    related: ["sum-of-subarray-minimums", "largest-rectangle-in-histogram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def sub_array_ranges(nums):
    # O(n^2) — clear and acceptable for interviews
    n = len(nums)
    total = 0
    for i in range(n):
        hi = lo = nums[i]
        for j in range(i, n):
            hi = max(hi, nums[j])
            lo = min(lo, nums[j])
            total += hi - lo
    return total`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public long subArrayRanges(int[] nums) {
        int n = nums.length;
        long total = 0;
        for (int i = 0; i < n; i++) {
            int hi = nums[i], lo = nums[i];
            for (int j = i; j < n; j++) {
                hi = Math.max(hi, nums[j]);
                lo = Math.min(lo, nums[j]);
                total += hi - lo;
            }
        }
        return total;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function subArrayRanges(nums) {
  const n = nums.length;
  let total = 0;
  for (let i = 0; i < n; i++) {
    let hi = nums[i], lo = nums[i];
    for (let j = i; j < n; j++) {
      hi = Math.max(hi, nums[j]);
      lo = Math.min(lo, nums[j]);
      total += hi - lo;
    }
  }
  return total;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Long subArrayRanges(List<Integer> nums) {
        Integer n = nums.size();
        Long total = 0;
        for (Integer i = 0; i < n; i++) {
            Integer hi = nums[i], lo = nums[i];
            for (Integer j = i; j < n; j++) {
                hi = Math.max(hi, nums[j]);
                lo = Math.min(lo, nums[j]);
                total += hi - lo;
            }
        }
        return total;
    }
}`,
      },
    ],
  },
  {
    slug: "remove-k-digits",
    title: "Remove K Digits",
    difficulty: "Medium",
    patterns: ["monotonic-stack", "greedy"],
    topics: ["Stacks", "Strings", "Greedy"],
    companies: ["amazon", "google"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a non-negative integer as a string `num` and an integer `k`, remove `k` digits so the remaining number is the smallest possible. Return it as a string (no leading zeros; '0' if empty).",
    beginnerExplanation:
      "Build the answer with a monotonic increasing stack of digits. While the current digit is smaller than the top and we still have removals left, pop (removing a bigger leading digit makes the number smaller). Finally trim extras, strip leading zeros.",
    realWorldAnalogy:
      "Picking a budget by crossing out the most significant overspends first — knock down a big leading digit before a small trailing one.",
    visualExplanation:
      "num=1432219 k=3 -> remove 4,3,2 -> 1219",
    approaches: [
      {
        title: "Monotonic increasing stack, greedy",
        tier: "Optimal",
        idea: "Pop while top > current digit and k>0; push current. If k remains, drop from the end. Strip leading zeros.",
        steps: [
          "for d in num: while stack and k>0 and stack.top > d: pop; k--",
          "push d",
          "remove final k from the end",
          "strip leading zeros; return '0' if empty",
        ],
        time: "O(n)",
        space: "O(n)",
      },
    ],
    dryRun: "10200 k=1 -> pop nothing until '0'<'1' pop '1' k=0 -> '0200' -> strip -> '200'",
    interviewTips: ["Removing a larger MORE-significant digit beats removing a smaller less-significant one — that's why the stack is increasing."],
    commonMistakes: ["Forgetting leftover k at the end.", "Not stripping leading zeros.", "Returning '' instead of '0'."],
    followUps: ["Create maximum number from two arrays (related monotonic-stack greedy)."],
    related: ["largest-rectangle-in-histogram"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def remove_k_digits(num, k):
    stack = []
    for d in num:
        while stack and k > 0 and stack[-1] > d:
            stack.pop()
            k -= 1
        stack.append(d)
    # drop any remaining from the end
    stack = stack[:len(stack) - k] if k else stack
    result = ''.join(stack).lstrip('0')
    return result if result else '0'`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder st = new StringBuilder();
        for (char d : num.toCharArray()) {
            while (st.length() > 0 && k > 0 && st.charAt(st.length() - 1) > d) {
                st.deleteCharAt(st.length() - 1);
                k--;
            }
            st.append(d);
        }
        st.setLength(st.length() - k); // drop leftover from the end
        int i = 0;
        while (i < st.length() && st.charAt(i) == '0') i++;
        String res = st.substring(i);
        return res.isEmpty() ? "0" : res;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function removeKdigits(num, k) {
  const st = [];
  for (const d of num) {
    while (st.length && k > 0 && st[st.length - 1] > d) {
      st.pop();
      k--;
    }
    st.push(d);
  }
  st.length -= k; // drop leftover from the end
  const res = st.join('').replace(/^0+/, '');
  return res === '' ? '0' : res;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static String removeKdigits(String num, Integer k) {
        List<String> st = new List<String>();
        for (Integer i = 0; i < num.length(); i++) {
            String d = num.substring(i, i + 1);
            while (!st.isEmpty() && k > 0 && st[st.size() - 1].compareTo(d) > 0) {
                st.remove(st.size() - 1);
                k--;
            }
            st.add(d);
        }
        while (k > 0) { st.remove(st.size() - 1); k--; }
        String res = String.join(st, '');
        while (res.startsWith('0') && res.length() > 1) res = res.substring(1);
        return res == '0' ? '0' : (res == '' ? '0' : res);
    }
}`,
      },
    ],
  },
  {
    slug: "maximal-rectangle",
    title: "Maximal Rectangle",
    difficulty: "Hard",
    patterns: ["monotonic-stack", "dynamic-programming"],
    topics: ["Stacks", "Dynamic Programming"],
    companies: ["amazon", "google", "microsoft"],
    sheets: ["striver"],
    frequency: 3,
    statement:
      "Given a binary matrix of '0' and '1', find the area of the largest rectangle containing only 1s.",
    beginnerExplanation:
      "Process the matrix row by row, building a histogram: for each cell, the bar height is the number of consecutive 1s ending at that cell going up. Then each row reduces to 'Largest Rectangle in Histogram'; take the max across rows.",
    realWorldAnalogy:
      "Stacking blocks column by column as you go down floors; at each floor you measure the widest solid rectangle the current heights allow.",
    visualExplanation:
      "row heights evolve; e.g. matrix with a 2x3 block of 1s yields a histogram giving area 6",
    approaches: [
      {
        title: "Row histograms + largest-rectangle stack",
        tier: "Optimal",
        idea: "Maintain a heights array; for each row update heights (reset to 0 on a '0'), then run the O(width) histogram-largest-rectangle and track the global max.",
        steps: [
          "heights[j] = (cell=='1') ? heights[j]+1 : 0",
          "for each row, compute largest rectangle in `heights` with a monotonic stack",
          "answer = max over all rows",
        ],
        time: "O(rows × cols)",
        space: "O(cols)",
      },
    ],
    dryRun: "after a row, heights=[2,1,2,2] -> histogram largest rectangle = 4",
    interviewTips: ["Reduce to a problem you already know (histogram) — name that reduction explicitly."],
    commonMistakes: ["Not resetting a column's height to 0 on a '0'.", "Off-by-one in the histogram sentinel."],
    followUps: ["Maximal square (only squares)."],
    related: ["largest-rectangle-in-histogram", "count-square-submatrices-with-all-ones"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def maximal_rectangle(matrix):
    if not matrix or not matrix[0]:
        return 0
    cols = len(matrix[0])
    heights = [0] * cols
    best = 0

    def largest(hist):
        stack, area = [], 0
        for i in range(len(hist) + 1):
            h = hist[i] if i < len(hist) else 0
            while stack and hist[stack[-1]] >= h:
                top = stack.pop()
                width = i if not stack else i - stack[-1] - 1
                area = max(area, hist[top] * width)
            stack.append(i)
        return area

    for row in matrix:
        for j in range(cols):
            heights[j] = heights[j] + 1 if row[j] == '1' else 0
        best = max(best, largest(heights))
    return best`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int cols = matrix[0].length, best = 0;
        int[] heights = new int[cols];
        for (char[] row : matrix) {
            for (int j = 0; j < cols; j++)
                heights[j] = row[j] == '1' ? heights[j] + 1 : 0;
            best = Math.max(best, largest(heights));
        }
        return best;
    }

    private int largest(int[] h) {
        Deque<Integer> st = new ArrayDeque<>();
        int area = 0;
        for (int i = 0; i <= h.length; i++) {
            int cur = i < h.length ? h[i] : 0;
            while (!st.isEmpty() && h[st.peek()] >= cur) {
                int top = st.pop();
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                area = Math.max(area, h[top] * width);
            }
            st.push(i);
        }
        return area;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function maximalRectangle(matrix) {
  if (!matrix.length || !matrix[0].length) return 0;
  const cols = matrix[0].length;
  const heights = new Array(cols).fill(0);
  let best = 0;
  const largest = (h) => {
    const st = [];
    let area = 0;
    for (let i = 0; i <= h.length; i++) {
      const cur = i < h.length ? h[i] : 0;
      while (st.length && h[st[st.length - 1]] >= cur) {
        const top = st.pop();
        const width = st.length ? i - st[st.length - 1] - 1 : i;
        area = Math.max(area, h[top] * width);
      }
      st.push(i);
    }
    return area;
  };
  for (const row of matrix) {
    for (let j = 0; j < cols; j++) heights[j] = row[j] === '1' ? heights[j] + 1 : 0;
    best = Math.max(best, largest(heights));
  }
  return best;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static Integer maximalRectangle(List<List<String>> matrix) {
        if (matrix.isEmpty() || matrix[0].isEmpty()) return 0;
        Integer cols = matrix[0].size(), best = 0;
        List<Integer> heights = new List<Integer>();
        for (Integer j = 0; j < cols; j++) heights.add(0);
        for (List<String> row : matrix) {
            for (Integer j = 0; j < cols; j++)
                heights[j] = row[j] == '1' ? heights[j] + 1 : 0;
            best = Math.max(best, largest(heights));
        }
        return best;
    }

    private static Integer largest(List<Integer> h) {
        List<Integer> st = new List<Integer>();
        Integer area = 0;
        for (Integer i = 0; i <= h.size(); i++) {
            Integer cur = i < h.size() ? h[i] : 0;
            while (!st.isEmpty() && h[st[st.size() - 1]] >= cur) {
                Integer top = st.remove(st.size() - 1);
                Integer width = st.isEmpty() ? i : i - st[st.size() - 1] - 1;
                area = Math.max(area, h[top] * width);
            }
            st.add(i);
        }
        return area;
    }
}`,
      },
    ],
  },
  {
    slug: "stock-span-problem",
    title: "Stock Span Problem",
    difficulty: "Medium",
    patterns: ["monotonic-stack"],
    topics: ["Stacks", "Arrays"],
    companies: ["amazon", "adobe"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "The span of a stock's price on day i is the number of consecutive days up to and including i where the price was ≤ today's price. Return the span for each day.",
    beginnerExplanation:
      "Use a monotonic decreasing stack of (price, span) — or indices. Pop all earlier days whose price is ≤ today (their spans roll into today's), accumulating the count.",
    realWorldAnalogy:
      "Counting how many days in a row the temperature hasn't beaten today's high — you absorb each lower day into your streak.",
    visualExplanation:
      "prices=[100,80,60,70,60,75,85] -> spans=[1,1,1,2,1,4,6]",
    approaches: [
      {
        title: "Monotonic stack of indices",
        tier: "Optimal",
        idea: "Stack holds indices of strictly greater prices. Pop while top price <= today; span = i - (top index after popping) (or i+1 if emptied).",
        steps: [
          "while stack and prices[stack.top] <= prices[i]: pop",
          "span = stack ? i - stack.top : i + 1",
          "push i",
        ],
        time: "O(n) amortised",
        space: "O(n)",
      },
    ],
    dryRun: "[100,80,60,70]: 100->1; 80->1; 60->1; 70 pops 60 -> span=2",
    interviewTips: ["This is 'previous greater element' in disguise — span = distance to the previous strictly-greater price."],
    commonMistakes: ["Using <= vs < incorrectly for the 'previous greater' boundary."],
    followUps: ["Online version (Online Stock Span) processing one price at a time."],
    related: ["next-greater-element-ii", "previous-smaller-element"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def stock_span(prices):
    n = len(prices)
    span = [0] * n
    stack = []  # indices of strictly greater prices
    for i in range(n):
        while stack and prices[stack[-1]] <= prices[i]:
            stack.pop()
        span[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)
    return span`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `import java.util.*;

class Solution {
    public int[] stockSpan(int[] prices) {
        int n = prices.length;
        int[] span = new int[n];
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && prices[st.peek()] <= prices[i]) st.pop();
            span[i] = st.isEmpty() ? i + 1 : i - st.peek();
            st.push(i);
        }
        return span;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function stockSpan(prices) {
  const n = prices.length;
  const span = new Array(n);
  const st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && prices[st[st.length - 1]] <= prices[i]) st.pop();
    span[i] = st.length ? i - st[st.length - 1] : i + 1;
    st.push(i);
  }
  return span;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    public static List<Integer> stockSpan(List<Integer> prices) {
        Integer n = prices.size();
        List<Integer> span = new List<Integer>();
        for (Integer i = 0; i < n; i++) span.add(0);
        List<Integer> st = new List<Integer>();
        for (Integer i = 0; i < n; i++) {
            while (!st.isEmpty() && prices[st[st.size() - 1]] <= prices[i]) st.remove(st.size() - 1);
            span[i] = st.isEmpty() ? i + 1 : i - st[st.size() - 1];
            st.add(i);
        }
        return span;
    }
}`,
      },
    ],
  },
  {
    slug: "the-celebrity-problem",
    title: "The Celebrity Problem",
    difficulty: "Medium",
    patterns: ["stack", "two-pointers"],
    topics: ["Stacks", "Graphs"],
    companies: ["amazon", "microsoft"],
    sheets: ["striver"],
    frequency: 2,
    statement:
      "In a party of n people, a celebrity is known by everyone but knows no one. Given `knows(a, b)`, find the celebrity's index, or -1. Minimise calls to knows().",
    beginnerExplanation:
      "Use two pointers from both ends (or a stack). If a knows b, a can't be the celebrity (eliminate a); else b can't be (eliminate b). One candidate survives; verify it knows nobody and everybody knows it.",
    realWorldAnalogy:
      "A knockout tournament: each comparison eliminates one person from celebrity contention; the lone survivor is then audited.",
    visualExplanation:
      "candidates 0..n-1: pairwise eliminate down to one, then verify row/column",
    approaches: [
      {
        title: "Two-pointer elimination + verify",
        tier: "Optimal",
        idea: "lo=0, hi=n-1; if knows(lo,hi) lo++ else hi--. Survivor = candidate. Verify it knows no one and is known by all.",
        steps: [
          "while lo<hi: if knows(lo,hi) lo++ else hi--",
          "cand = lo",
          "verify: for all i!=cand, !knows(cand,i) and knows(i,cand)",
          "return cand or -1",
        ],
        time: "O(n)",
        space: "O(1)",
      },
    ],
    dryRun: "knows matrix with celeb=2: elimination converges to 2; verify passes -> 2",
    interviewTips: ["The elimination phase is O(n) calls; verification is another 2n — emphasise minimising knows() calls."],
    commonMistakes: ["Skipping the final verification (the survivor isn't guaranteed to be a celebrity).", "Calling knows(i,i)."],
    followUps: ["Return all celebrities if multiple could exist (at most one can)."],
    related: ["previous-smaller-element"],
    solutions: [
      {
        kind: "Interview",
        language: "Python",
        code: `def find_celebrity(n, knows):
    lo, hi = 0, n - 1
    while lo < hi:
        if knows(lo, hi):
            lo += 1
        else:
            hi -= 1
    cand = lo
    for i in range(n):
        if i != cand and (knows(cand, i) or not knows(i, cand)):
            return -1
    return cand`,
      },
      {
        kind: "Interview",
        language: "Java",
        code: `class Solution {
    // assume boolean knows(int a, int b) is available
    public int findCelebrity(int n) {
        int lo = 0, hi = n - 1;
        while (lo < hi) {
            if (knows(lo, hi)) lo++;
            else hi--;
        }
        int cand = lo;
        for (int i = 0; i < n; i++) {
            if (i != cand && (knows(cand, i) || !knows(i, cand))) return -1;
        }
        return cand;
    }
}`,
      },
      {
        kind: "Interview",
        language: "JavaScript",
        code: `function findCelebrity(n, knows) {
  let lo = 0, hi = n - 1;
  while (lo < hi) {
    if (knows(lo, hi)) lo++;
    else hi--;
  }
  const cand = lo;
  for (let i = 0; i < n; i++) {
    if (i !== cand && (knows(cand, i) || !knows(i, cand))) return -1;
  }
  return cand;
}`,
      },
      {
        kind: "Interview",
        language: "Apex",
        code: `public class Solution {
    // assume Boolean knows(Integer a, Integer b) is available
    public Integer findCelebrity(Integer n) {
        Integer lo = 0, hi = n - 1;
        while (lo < hi) {
            if (knows(lo, hi)) lo++;
            else hi--;
        }
        Integer cand = lo;
        for (Integer i = 0; i < n; i++) {
            if (i != cand && (knows(cand, i) || !knows(i, cand))) return -1;
        }
        return cand;
    }
}`,
      },
    ],
  },
];

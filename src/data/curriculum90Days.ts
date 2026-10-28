// Complete 90-Day Curriculum Blueprints for DSA, Full Stack, and DevOps

export interface DayBlueprint {
  day: number;
  title: string;
  topic: string;
  summary: string;
  isWeeklyTest: boolean;
  category: string;
  keyConcept: string;
  codeSnippet: string;
}

// -----------------------------------------------------------------------------
// 90 DAYS OF DATA STRUCTURES & ALGORITHMS (DSA)
// -----------------------------------------------------------------------------
export const DSA_90_DAYS: DayBlueprint[] = [
  // Phase 1: Core Fundamentals, Linear Structures & Hashing (Days 1 - 30)
  {
    day: 1,
    title: 'Programming Fundamentals & Asymptotic Complexity',
    topic: 'Big-O, Big-Omega, Big-Theta & Loop Invariants',
    summary: 'Master asymptotic notation, upper/lower bounds, space vs time tradeoffs, and rigorous loop analysis.',
    isWeeklyTest: false,
    category: 'Complexity Analysis',
    keyConcept: 'Asymptotic notation describes how execution time scales as input size n approaches infinity. We drop constant multipliers and non-dominant terms.',
    codeSnippet: '// O(n log n) divide-and-conquer recurrence\nfunction mergeSortComplexity(n) {\n  if (n <= 1) return 1;\n  return 2 * mergeSortComplexity(Math.floor(n / 2)) + n;\n}'
  },
  {
    day: 2,
    title: 'Static & Dynamic Arrays & Memory Contiguity',
    topic: 'Array Layout, Cache Lines, Amortized Resizing',
    summary: 'Explore CPU cache locality, amortized O(1) geometric resizing, and in-place memory mutations.',
    isWeeklyTest: false,
    category: 'Arrays',
    keyConcept: 'Dynamic arrays double their capacity upon exhaustion. While an individual resize takes O(n), allocating 2x capacity gives amortized O(1) append cost.',
    codeSnippet: 'const arr = new Array(1000); // Contiguous memory allocation in RAM'
  },
  {
    day: 3,
    title: 'Two-Pointer Technique & In-Place Manipulations',
    topic: 'Opposite Pointers, Squeeze Technique, Dutch National Flag',
    summary: 'Eliminate nested loops using two-pointer paradigms for sorted pairs, partitioning, and palindromes.',
    isWeeklyTest: false,
    category: 'Arrays',
    keyConcept: 'Two pointers moving inward or in lockstep transform O(n²) exhaustive search into optimal O(n) passes.',
    codeSnippet: 'function twoSumSorted(arr, target) {\n  let l = 0, r = arr.length - 1;\n  while (l < r) {\n    const s = arr[l] + arr[r];\n    if (s === target) return [l, r];\n    s < target ? l++ : r--;\n  }\n}'
  },
  {
    day: 4,
    title: 'Sliding Window & Subarray Optimization',
    topic: 'Fixed & Variable Window, Maximum Sum & Character Frequencies',
    summary: 'Learn when and how to expand/shrink window boundaries to solve contiguous sequence problems in O(n).',
    isWeeklyTest: false,
    category: 'Two Pointers',
    keyConcept: 'Maintain running state within [left, right] window. Advance right to explore; advance left to restore constraint invariants.',
    codeSnippet: 'function maxSubarrayK(arr, k) {\n  let sum = 0, max = -Infinity;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n    if (i >= k - 1) {\n      max = Math.max(max, sum);\n      sum -= arr[i - k + 1];\n    }\n  }\n  return max;\n}'
  },
  {
    day: 5,
    title: 'Prefix Sums, Difference Arrays & Range Queries',
    topic: '1D/2D Prefix Arrays, Point Updates & Range Additions',
    summary: 'Answer static range sum queries in O(1) time after O(n) precomputation using cumulative sums.',
    isWeeklyTest: false,
    category: 'Prefix Sums',
    keyConcept: 'Range sum from L to R equals prefix[R] - prefix[L - 1]. Difference arrays allow O(1) range updates.',
    codeSnippet: 'const prefix = new Array(arr.length + 1).fill(0);\nfor (let i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] + arr[i];'
  },
  {
    day: 6,
    title: 'String Algorithms & Frequency Encodings',
    topic: 'Anagrams, Substring Windows, ASCII/Unicode, Palindromic Centers',
    summary: 'Master string immutability, rolling hash concepts, and 26-bucket character counting.',
    isWeeklyTest: false,
    category: 'Strings',
    keyConcept: 'Direct index frequency tables (char.charCodeAt(0) - 97) achieve zero allocation and ultra-fast character matching.',
    codeSnippet: 'const freq = new Int32Array(26);\nfor (const ch of str) freq[ch.charCodeAt(0) - 97]++;'
  },
  {
    day: 7,
    title: 'Week 1 Revision & Aptitude Milestone Test #1',
    topic: 'Weekly Consolidation: Complexity, Arrays, Pointers, Strings & Windowing',
    summary: 'Comprehensive 20-question diagnostic exam testing all algorithmic concepts learned in Days 1 to 6.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Milestone consolidation cements pattern recognition between linear search, two-pointer convergence, and sliding window boundaries.',
    codeSnippet: '// Weekly Review: Benchmark O(n) vs O(n^2) under 100k records'
  },
  {
    day: 8,
    title: 'Searching Algorithms & Binary Search Foundations',
    topic: 'Logarithmic Search, Upper/Lower Bounds & Invariant Maintenance',
    summary: 'Master edge conditions (left <= right vs left < right), midpoint overflow prevention, and bisect logic.',
    isWeeklyTest: false,
    category: 'Binary Search',
    keyConcept: 'Always compute mid = left + Math.floor((right - left) / 2) to eliminate arithmetic integer overflow.',
    codeSnippet: 'function binarySearch(arr, x) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    const m = l + Math.floor((r - l) / 2);\n    if (arr[m] === x) return m;\n    arr[m] < x ? l = m + 1 : r = m - 1;\n  }\n  return -1;\n}'
  },
  {
    day: 9,
    title: 'Binary Search on Answer Space & Monotonic Functions',
    topic: 'Capacity Allocation, Painter Partition, Koko Eating Bananas',
    summary: 'Apply binary search to monotonic feasibility functions to find optimal min/max values in O(n log(range)).',
    isWeeklyTest: false,
    category: 'Binary Search',
    keyConcept: 'If a predicate function f(x) is monotonic (False, False, ..., True, True), binary search locates the inflection threshold in logarithmic steps.',
    codeSnippet: '// Feasibility check: can all packages be shipped within D days at weight capacity C?'
  },
  {
    day: 10,
    title: 'Sorting Algorithms I: Quadratic Sorts & Stability',
    topic: 'Bubble, Selection, Insertion Sort, Inversions & Stability',
    summary: 'Understand comparison sort boundaries, stable vs unstable sorting, and worst/best case dynamics.',
    isWeeklyTest: false,
    category: 'Sorting',
    keyConcept: 'Insertion sort executes in O(n) on nearly-sorted data and maintains absolute relative order of equal elements (stability).',
    codeSnippet: 'for (let i = 1; i < n; i++) {\n  let key = arr[i], j = i - 1;\n  while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\n  arr[j + 1] = key;\n}'
  },
  {
    day: 11,
    title: 'Sorting Algorithms II: Merge Sort & Quick Sort',
    topic: 'Divide & Conquer, Lomuto vs Hoare Partition, Pivot Selection',
    summary: 'Master divide-and-conquer recurrence relations, cache behavior, and Quickselect for O(n) k-th element.',
    isWeeklyTest: false,
    category: 'Sorting',
    keyConcept: 'Merge sort guarantees O(n log n) with O(n) extra space. Quicksort achieves in-place O(n log n) average with randomized pivots.',
    codeSnippet: '// Quickselect finds the k-th smallest element in O(n) average time'
  },
  {
    day: 12,
    title: 'Linked Lists: Singly, Doubly & Dummy Sentinel Nodes',
    topic: 'Pointers, In-Place Reversals, Fast & Slow Pointers, K-Group Reverse',
    summary: 'Eliminate special head/tail edge cases with sentinel dummy nodes; detect cycles via Floyd’s Tortoise and Hare.',
    isWeeklyTest: false,
    category: 'Linked Lists',
    keyConcept: 'Using a dummy node (dummy.next = head) standardizes deletions and insertions at the head without null checks.',
    codeSnippet: 'let dummy = { next: head }, prev = null, curr = head;\nwhile (curr) { let nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; }'
  },
  {
    day: 13,
    title: 'Fast & Slow Pointer Paradigms & Cycle Geometry',
    topic: 'Floyd\'s Cycle Detection, Finding Loop Entrance, Palindrome Lists',
    summary: 'Mathematically prove why fast and slow pointer rendezvous guarantees loop discovery and entrance location.',
    isWeeklyTest: false,
    category: 'Linked Lists',
    keyConcept: 'Distance from head to loop start equals distance from rendezvous point to loop start (2(F + a) = F + a + nC => F = nC - a).',
    codeSnippet: 'let slow = head, fast = head;\nwhile (fast && fast.next) { slow = slow.next; fast = fast.next.next; if (slow === fast) break; }'
  },
  {
    day: 14,
    title: 'Week 2 Revision & Aptitude Milestone Test #2',
    topic: 'Weekly Consolidation: Binary Search, Sorting Mechanics, Linked Lists & Pointers',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 8 to 13 concepts and tricky algorithmic traps.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Verify mastery of binary search boundary conditions, sorting stability, and pointer manipulation without memory leaks.',
    codeSnippet: '// Comprehensive assessment covering Days 8-13'
  },
  {
    day: 15,
    title: 'Stacks (LIFO): Call Stack, Expression Parsing & Evaluation',
    topic: 'Infix, Postfix, Prefix Conversions, Reverse Polish Notation',
    summary: 'Explore stack memory layout, monotonic operators, and Shunting-Yard expression evaluation.',
    isWeeklyTest: false,
    category: 'Stacks',
    keyConcept: 'Stacks evaluate mathematical expressions by maintaining operator precedence and handling parenthesis grouping with O(1) top access.',
    codeSnippet: 'const stack = [];\nfor (const token of tokens) { /* push operands, pop two on operator */ }'
  },
  {
    day: 16,
    title: 'Monotonic Stacks & Nearest Greater/Smaller Element',
    topic: 'Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram',
    summary: 'Solve range-bound visibility and histogram area problems in single-pass O(n) using monotonically ordered stacks.',
    isWeeklyTest: false,
    category: 'Stacks',
    keyConcept: 'A monotonic stack maintains elements in strictly increasing or decreasing order, resolving nearest greater/smaller queries in O(n) aggregate time.',
    codeSnippet: 'const stack = [], res = new Array(n).fill(-1);\nfor (let i = 0; i < n; i++) {\n  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) res[stack.pop()] = arr[i];\n  stack.push(i);\n}'
  },
  {
    day: 17,
    title: 'Queues (FIFO) & Double-Ended Queues (Deques)',
    topic: 'Circular Queues, Monotonic Deque, Sliding Window Maximum',
    summary: 'Implement circular ring buffers and solve sliding window maximum in linear O(n) time using monotonic deques.',
    isWeeklyTest: false,
    category: 'Queues',
    keyConcept: 'A monotonic deque preserves indices of potential maximums, shedding elements that are both older and smaller than the current candidate.',
    codeSnippet: '// Deque maintains indices of elements in decreasing order for O(1) window max'
  },
  {
    day: 18,
    title: 'Hashing Architectures, Hash Functions & Collisions',
    topic: 'Separate Chaining, Open Addressing (Linear, Quadratic, Double Hashing)',
    summary: 'Deep dive into load factors, hash table clustering, cryptographic vs non-cryptographic hashes, and Robin Hood hashing.',
    isWeeklyTest: false,
    category: 'Hashing',
    keyConcept: 'When load factor exceeds threshold (typically 0.75), doubling table capacity and rehashing preserves average O(1) search time.',
    codeSnippet: 'function hash(key, capacity) {\n  let h = 5381;\n  for (let i = 0; i < key.length; i++) h = ((h << 5) + h) + key.charCodeAt(i);\n  return Math.abs(h % capacity);\n}'
  },
  {
    day: 19,
    title: 'Advanced Hashing Patterns: Subarray Sums & Encodings',
    topic: 'Subarray Sum Equals K, Longest Consecutive Sequence, Multi-Key Hashes',
    summary: 'Combine prefix sums with hash map frequency counters to identify valid target ranges in O(n) single pass.',
    isWeeklyTest: false,
    category: 'Hashing',
    keyConcept: 'Store prefix sums in a hash map: if prefix[j] - target exists in map at index i, subarray (i, j] sums to target.',
    codeSnippet: 'const map = new Map([[0, 1]]);\nlet sum = 0, count = 0;\nfor (const x of nums) { sum += x; count += map.get(sum - k) || 0; map.set(sum, (map.get(sum) || 0) + 1); }'
  },
  {
    day: 20,
    title: 'Priority Queues & Binary Heap Implementation',
    topic: 'Min/Max Heaps, Heapify In-Place O(n), Percolate Up & Down',
    summary: 'Master array-based complete binary trees, parent/child arithmetic, and top-K streaming elements.',
    isWeeklyTest: false,
    category: 'Heaps',
    keyConcept: 'For zero-indexed array: parent(i) = floor((i-1)/2), left(i) = 2i + 1, right(i) = 2i + 2. In-place heapify builds a heap in O(n) time.',
    codeSnippet: 'function siftDown(i, heap, n) {\n  let largest = i, l = 2*i + 1, r = 2*i + 2;\n  if (l < n && heap[l] > heap[largest]) largest = l;\n  if (r < n && heap[r] > heap[largest]) largest = r;\n  if (largest !== i) { [heap[i], heap[largest]] = [heap[largest], heap[i]]; siftDown(largest, heap, n); }\n}'
  },
  {
    day: 21,
    title: 'Week 3 Revision & Aptitude Milestone Test #3',
    topic: 'Weekly Consolidation: Stacks, Monotonic Structures, Queues, Hashing & Heaps',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 15 to 20 concepts and priority queue operations.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Consolidate monotonic stack push/pop dynamics, hash table load factor math, and heap sift operations.',
    codeSnippet: '// Weekly Review: Test your understanding of LIFO, FIFO, and Binary Heaps'
  },
  {
    day: 22,
    title: 'Bitwise Manipulation I: Binary Arithmetic & Bitwise Logic',
    topic: 'Two\'s Complement, Bitwise AND/OR/XOR/NOT, Shifts, Brian Kernighan',
    summary: 'Manipulate raw binary numbers, compute set bit counts in O(bits) time, and handle negative integers via Two’s complement.',
    isWeeklyTest: false,
    category: 'Bit Manipulation',
    keyConcept: 'n & (n - 1) strips the lowest set bit. n & (-n) isolates the lowest set bit (Two\'s complement property).',
    codeSnippet: 'function countSetBits(n) {\n  let count = 0;\n  while (n) { n = n & (n - 1); count++; }\n  return count;\n}'
  },
  {
    day: 23,
    title: 'Bitwise Manipulation II: XOR Tricks & Bitmask Subsets',
    topic: 'Single Number, Missing Numbers, Subset Generation with Bitmasks',
    summary: 'Exploit self-canceling properties of XOR (x ^ x = 0, x ^ 0 = x) and generate all 2ⁿ subsets via integer bit iterations.',
    isWeeklyTest: false,
    category: 'Bit Manipulation',
    keyConcept: 'Iterating an integer from 0 to (1 << n) - 1 maps each bit j to inclusion/exclusion of element j in the subset.',
    codeSnippet: 'for (let mask = 0; mask < (1 << n); mask++) {\n  const subset = [];\n  for (let i = 0; i < n; i++) if (mask & (1 << i)) subset.push(arr[i]);\n}'
  },
  {
    day: 24,
    title: 'Recursion Fundamentals & The Call Stack',
    topic: 'Stack Frames, Base Cases, Leap of Faith, Tail Recursion Optimization',
    summary: 'Understand activation records, return address caching, recursion tree growth, and tail-call elimination.',
    isWeeklyTest: false,
    category: 'Recursion',
    keyConcept: 'Every recursive call pushes an activation record onto the call stack. Unbounded recursion triggers Call Stack Overflow.',
    codeSnippet: 'function fibTail(n, a = 0, b = 1) {\n  if (n === 0) return a;\n  if (n === 1) return b;\n  return fibTail(n - 1, b, a + b); // Tail-call eligible\n}'
  },
  {
    day: 25,
    title: 'Backtracking I: Permutations & Combinations',
    topic: 'State Exploration, Choose-Explore-Unchoose, Pruning Invalids',
    summary: 'Systematically explore combinatorial decision spaces, maintaining visited states and backtracking upon dead ends.',
    isWeeklyTest: false,
    category: 'Backtracking',
    keyConcept: 'Backtracking is depth-first search on an implicit tree. Always revert the mutation (un-choose) after returning from recursive exploration.',
    codeSnippet: 'function permute(nums, path = [], used = [], res = []) {\n  if (path.length === nums.length) return res.push([...path]);\n  for (let i = 0; i < nums.length; i++) {\n    if (used[i]) continue;\n    used[i] = true; path.push(nums[i]);\n    permute(nums, path, used, res);\n    path.pop(); used[i] = false;\n  }\n}'
  },
  {
    day: 26,
    title: 'Backtracking II: Constraint Satisfaction & Grid Search',
    topic: 'N-Queens, Sudoku Solver, Word Search, Branch & Bound Pruning',
    summary: 'Prune dead search branches early using diagonal collision bitmasks and mathematical constraints.',
    isWeeklyTest: false,
    category: 'Backtracking',
    keyConcept: 'Diagonal conflict check in N-Queens: row - col is constant for primary diagonals; row + col is constant for anti-diagonals.',
    codeSnippet: '// Checking column, diag1 (r - c), and diag2 (r + c) using Sets or bitmasks'
  },
  {
    day: 27,
    title: 'Divide & Conquer Paradigm & The Master Theorem',
    topic: 'T(n) = aT(n/b) + f(n), Strassen Matrix, Inversion Counting',
    summary: 'Solve complex recurrence equations using the Master Theorem cases, recursion trees, and substitution proofs.',
    isWeeklyTest: false,
    category: 'Algorithms',
    keyConcept: 'Compare f(n) with n^(log_b a). Case 1: subproblems dominate => O(n^(log_b a)). Case 2: balanced => O(n^(log_b a) log n). Case 3: root dominates => O(f(n)).',
    codeSnippet: '// Master Theorem: T(n) = 2T(n/2) + O(n) => a=2, b=2 => log_2(2) = 1 => O(n log n)'
  },
  {
    day: 28,
    title: 'Week 4 Revision & Aptitude Milestone Test #4',
    topic: 'Weekly Consolidation: Bits, Recursion, Combinatorial Backtracking & Recurrences',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 22 to 27 concepts and mathematical problem solving.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Test state restoration in backtracking, bitmask arithmetic identities, and Master theorem bounds.',
    codeSnippet: '// Milestone Test #4: Master Theorem & Backtracking Invariants'
  },
  {
    day: 29,
    title: 'Matrix Manipulations & 2D Grid Algorithms',
    topic: 'Spiral Order, Transpose, In-Place Rotations, Inward Spirals',
    summary: 'Navigate two-dimensional arrays with boundary clamps, row-major memory traversal, and in-place transformations.',
    isWeeklyTest: false,
    category: 'Matrices',
    keyConcept: 'Rotate 90 degrees clockwise = Transpose matrix (swap matrix[i][j] with matrix[j][i]) then reverse each row.',
    codeSnippet: '// Transpose then reverse rows for in-place 90-degree matrix rotation'
  },
  {
    day: 30,
    title: 'Phase 1 Comprehensive Master Milestone Exam',
    topic: 'Phase 1 Finale: 30-Day Synthesis of Linear Structures, Hashing, Bits & Recursion',
    summary: 'The capstone examination for Phase 1. 20 challenging aptitude questions verifying complete foundation readiness.',
    isWeeklyTest: true,
    category: 'Phase Capstone Exam',
    keyConcept: 'Completing Phase 1 proves full technical mastery of all contiguous, pointer-based, hashing, and combinatorial fundamentals.',
    codeSnippet: '// Phase 1 Capstone: Full integration across 30 foundational DSA days'
  },

  // Phase 2: Non-Linear Structures, Trees, Graphs & Greedy (Days 31 - 60)
  {
    day: 31,
    title: 'Binary Trees I: Anatomy, Properties & DFS Traversals',
    topic: 'Inorder, Preorder, Postorder Recursive & Iterative Traversals',
    summary: 'Master full/complete/perfect tree invariants, leaf vs internal node counts, and Morris traversal with O(1) space.',
    isWeeklyTest: false,
    category: 'Trees',
    keyConcept: 'In any binary tree with n nodes, there are exactly n + 1 null pointer references. Leaf count L = Internal nodes with two children + 1.',
    codeSnippet: 'function inorder(node) {\n  if (!node) return;\n  inorder(node.left);\n  console.log(node.val);\n  inorder(node.right);\n}'
  },
  {
    day: 32,
    title: 'Binary Trees II: BFS Level-Order & Tree Views',
    topic: 'Queue-Based Level Order, Top/Bottom/Side Views, Zig-Zag Traversal',
    summary: 'Process trees layer by layer using FIFO queues; determine horizontal distance for vertical tree projections.',
    isWeeklyTest: false,
    category: 'Trees',
    keyConcept: 'Assign root horizontal distance HD = 0; left child has HD - 1; right child has HD + 1. Group by HD for vertical views.',
    codeSnippet: 'const queue = [[root, 0]];\nwhile (queue.length) { const [node, hd] = queue.shift(); /* record hd */ }'
  },
  {
    day: 33,
    title: 'Binary Trees III: Path Sums, Ancestors & LCA',
    topic: 'Lowest Common Ancestor (LCA), Maximum Path Sum, Diameter Calculation',
    summary: 'Compute bottom-up tree metrics in single post-order passes, returning subtree heights while updating global diameters.',
    isWeeklyTest: false,
    category: 'Trees',
    keyConcept: 'Diameter of a binary tree is max(left_height + right_height) across all nodes. Compute in O(n) during post-order traversal.',
    codeSnippet: 'function height(node) {\n  if (!node) return 0;\n  const l = height(node.left), r = height(node.right);\n  diameter = Math.max(diameter, l + r);\n  return 1 + Math.max(l, r);\n}'
  },
  {
    day: 34,
    title: 'Binary Search Trees (BST): Properties, Search & Invariants',
    topic: 'BST Validation, Successor/Predecessor, Lowest Common Ancestor in BST',
    summary: 'Exploit sorted BST ordering: left subtree < node < right subtree. Inorder traversal yields strictly increasing sequence.',
    isWeeklyTest: false,
    category: 'BST',
    keyConcept: 'Validate BST by enforcing valid range [min, max] at each node rather than just comparing with immediate children.',
    codeSnippet: 'function isValidBST(node, min = -Infinity, max = Infinity) {\n  if (!node) return true;\n  if (node.val <= min || node.val >= max) return false;\n  return isValidBST(node.left, min, node.val) && isValidBST(node.right, node.val, max);\n}'
  },
  {
    day: 35,
    title: 'Week 5 Revision & Aptitude Milestone Test #5',
    topic: 'Weekly Consolidation: Binary Trees, Traversals, BFS/DFS, BST Properties & LCA',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 31 to 34 tree algorithms and recursive structural proofs.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Consolidate tree diameter calculations, BST invariants, and iterative traversal stack states.',
    codeSnippet: '// Weekly Review: Trees and Binary Search Tree properties'
  },
  {
    day: 36,
    title: 'Self-Balancing Trees: AVL Trees & Rotations',
    topic: 'Balance Factor, Left/Right Rotations, Double Rotations (LR, RL)',
    summary: 'Prevent tree skewing. Maintain balance factor in {-1, 0, +1} to guarantee O(log n) worst-case search, insert, and delete.',
    isWeeklyTest: false,
    category: 'Balanced Trees',
    keyConcept: 'AVL balance factor = height(left) - height(right). Unbalanced node fixed via single (LL/RR) or double (LR/RL) pointer rotation.',
    codeSnippet: 'function rotateRight(y) {\n  const x = y.left, T2 = x.right;\n  x.right = y; y.left = T2;\n  return x; // New root\n}'
  },
  {
    day: 37,
    title: 'Tries (Prefix Trees) & Retrieval Data Structures',
    topic: 'Prefix Matching, Autocomplete, Wildcard Search, Bitwise Trie',
    summary: 'Implement character-indexed n-ary trees for O(L) dictionary lookups, prefix verification, and Maximum XOR pairs.',
    isWeeklyTest: false,
    category: 'Tries',
    keyConcept: 'Each Trie node contains an array/map of child pointers and an `isEndOfWord` boolean. Bitwise 32-bit tries find Maximum XOR pair in O(32n).',
    codeSnippet: 'class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}'
  },
  {
    day: 38,
    title: 'Disjoint Set Union (DSU / Union-Find)',
    topic: 'Connected Components, Path Compression, Union by Rank/Size',
    summary: 'Track partitioned subsets with near-constant amortized O(α(n)) time using inverse Ackermann complexity.',
    isWeeklyTest: false,
    category: 'Disjoint Sets',
    keyConcept: 'Path compression flattens the tree during `find`; union by rank attaches shallower tree under deeper root.',
    codeSnippet: 'function find(i, parent) {\n  if (parent[i] === i) return i;\n  return parent[i] = find(parent[i], parent); // Path compression\n}'
  },
  {
    day: 39,
    title: 'Graph Representations & Fundamentals',
    topic: 'Adjacency Matrix vs Adjacency List, Directed vs Undirected, Degree Calculations',
    summary: 'Compare space complexity O(V + E) vs O(V²), cache locality, and graph density implications.',
    isWeeklyTest: false,
    category: 'Graphs',
    keyConcept: 'Handshaking Lemma: Sum of degrees of all vertices equals 2 * |E|. Hence, number of odd degree vertices is always even.',
    codeSnippet: 'const adj = Array.from({ length: n }, () => []);\nfor (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }'
  },
  {
    day: 40,
    title: 'Graph Traversals: Breadth-First Search (BFS)',
    topic: 'Shortest Path in Unweighted Graphs, Level Generation, Multi-Source BFS',
    summary: 'Explore graph frontiers in concentric expanding rings. Solve rotten oranges, word ladder, and bipartite graph checks.',
    isWeeklyTest: false,
    category: 'Graph Traversals',
    keyConcept: 'BFS visits vertices in non-decreasing order of distance from source, guaranteeing shortest hops on unweighted graphs.',
    codeSnippet: 'const dist = new Array(n).fill(-1), q = [start];\ndist[start] = 0;\nwhile (q.length) {\n  const u = q.shift();\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}'
  },
  {
    day: 41,
    title: 'Graph Traversals: Depth-First Search (DFS)',
    topic: 'Reachability, Component Counting, Flood Fill, Path Finding',
    summary: 'Traverse deep into graph branches using recursion or explicit stacks; maintain visited state to avoid infinite loops.',
    isWeeklyTest: false,
    category: 'Graph Traversals',
    keyConcept: 'DFS edges classify into Tree, Back, Forward, and Cross edges. A back edge in directed DFS indicates a cycle.',
    codeSnippet: 'function dfs(u, visited, adj) {\n  visited.add(u);\n  for (const v of adj[u]) if (!visited.has(v)) dfs(v, visited, adj);\n}'
  },
  {
    day: 42,
    title: 'Week 6 Revision & Aptitude Milestone Test #6',
    topic: 'Weekly Consolidation: AVL Rotations, Tries, Disjoint Sets & Graph Traversals',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 36 to 41 concepts and DSU operations.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Test path compression complexity proofs, Trie search boundaries, and Handshaking lemma graph equations.',
    codeSnippet: '// Weekly Review: DSU, AVL Trees, and Graph BFS/DFS'
  },
  {
    day: 43,
    title: 'Cycle Detection in Directed & Undirected Graphs',
    topic: 'DFS 3-Coloring (White/Gray/Black), Parent Tracking, Kahn\'s Algorithm',
    summary: 'Detect cycles in undirected graphs with parent pointers and in directed graphs using state coloring.',
    isWeeklyTest: false,
    category: 'Graph Algorithms',
    keyConcept: 'Three-color DFS: 0 (Unvisited), 1 (Visiting on current recursion stack), 2 (Finished). Finding an edge to color 1 proves a cycle.',
    codeSnippet: '// Color 0 = White, 1 = Gray (in stack), 2 = Black (processed)'
  },
  {
    day: 44,
    title: 'Topological Sorting & Directed Acyclic Graphs (DAG)',
    topic: 'Kahn\'s In-Degree Algorithm (BFS), Postorder DFS Reversal, Course Schedule',
    summary: 'Linear ordering of vertices such that for every directed edge u -> v, u comes before v. Pre-requisite scheduling.',
    isWeeklyTest: false,
    category: 'Topological Sort',
    keyConcept: 'Kahn\'s algorithm pushes vertices with in-degree 0 into a queue. If processed count < V, graph contains a directed cycle.',
    codeSnippet: 'const inDegree = new Int32Array(n);\nfor (const [u, v] of edges) inDegree[v]++;\nconst q = [];\nfor (let i = 0; i < n; i++) if (inDegree[i] === 0) q.push(i);'
  },
  {
    day: 45,
    title: 'Shortest Path I: Dijkstra\'s Algorithm',
    topic: 'Non-Negative Edge Weights, Min-Heap Optimization, Relaxing Edges',
    summary: 'Find shortest paths from single source to all vertices in O((V + E) log V) using a priority queue.',
    isWeeklyTest: false,
    category: 'Shortest Paths',
    keyConcept: 'Dijkstra greedily finalizes the closest unvisited vertex. It fails on negative weight edges because settled distances may be lowered.',
    codeSnippet: '// Relax edge (u, v) with weight w:\nif (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push([dist[v], v]); }'
  },
  {
    day: 46,
    title: 'Shortest Path II: Bellman-Ford & Negative Cycles',
    topic: 'Relaxing All Edges V - 1 Times, Negative Cycle Detection, SPFA',
    summary: 'Handle negative edge weights; identify negative weight cycles that allow infinitely decreasing path weights.',
    isWeeklyTest: false,
    category: 'Shortest Paths',
    keyConcept: 'A simple shortest path contains at most V - 1 edges. If distance can still be relaxed on the V-th iteration, a negative cycle exists.',
    codeSnippet: 'for (let i = 1; i < n; i++) {\n  for (const [u, v, w] of edges) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n}'
  },
  {
    day: 47,
    title: 'Shortest Path III: Floyd-Warshall (All-Pairs Shortest Path)',
    topic: 'Dynamic Programming on Intermediate Vertices, O(V³) Matrix Relaxation',
    summary: 'Compute shortest distances between every pair of vertices by considering all intermediate vertices k in 1..V.',
    isWeeklyTest: false,
    category: 'Shortest Paths',
    keyConcept: 'dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). Loop order must place intermediate vertex k on outermost loop.',
    codeSnippet: 'for (let k = 0; k < n; k++)\n  for (let i = 0; i < n; i++)\n    for (let j = 0; j < n; j++)\n      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);'
  },
  {
    day: 48,
    title: 'Minimum Spanning Trees (MST): Kruskal & Prim',
    topic: 'Greedy Edge Selection, Cut Property, Cycle Prevention via DSU',
    summary: 'Connect all vertices with minimum total edge weight using Kruskal’s O(E log E) or Prim’s O(E log V) algorithms.',
    isWeeklyTest: false,
    category: 'MST',
    keyConcept: 'Kruskal sorts all edges ascending and greedily adds edge if endpoints belong to different DSU components.',
    codeSnippet: 'edges.sort((a, b) => a.weight - b.weight);\nfor (const e of edges) if (dsu.union(e.u, e.v)) mstWeight += e.weight;'
  },
  {
    day: 49,
    title: 'Week 7 Revision & Aptitude Milestone Test #7',
    topic: 'Weekly Consolidation: Cycles, Topological Ordering, Dijkstra, Bellman-Ford & MST',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 43 to 48 graph network algorithms.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Verify distinction between MST (connects all nodes minimally) and Shortest Path Trees (minimizes path from single source).',
    codeSnippet: '// Weekly Review: Shortest Path and Minimum Spanning Trees'
  },
  {
    day: 50,
    title: 'Advanced Graph Concepts: Strongly Connected Components (SCC)',
    topic: 'Tarjan\'s Low-Link Algorithm, Kosaraju\'s Two-Pass DFS',
    summary: 'Decompose directed graphs into maximal subgraphs where every vertex is mutually reachable from every other vertex.',
    isWeeklyTest: false,
    category: 'Advanced Graphs',
    keyConcept: 'Kosaraju runs DFS on original graph to record finish times, transposes all edges, and runs DFS in decreasing order of finish time.',
    codeSnippet: '// Kosaraju: Pass 1 on G, transpose G to G^T, Pass 2 on G^T'
  },
  {
    day: 51,
    title: 'Bridges & Articulation Points in Graphs',
    topic: 'Tarjan\'s Bridge-Finding, Discovery Time, Low-Link Values',
    summary: 'Identify critical edges (bridges) and critical vertices whose removal disconnects the graph network.',
    isWeeklyTest: false,
    category: 'Advanced Graphs',
    keyConcept: 'Edge (u, v) is a bridge if and only if low[v] > tin[u], meaning v has no back-edge reaching u or its ancestors.',
    codeSnippet: 'if (low[v] > tin[u]) bridges.push([u, v]);'
  },
  {
    day: 52,
    title: 'Greedy Algorithms I: Interval Scheduling & Deadlines',
    topic: 'Earliest Finish Time, Non-Overlapping Intervals, Meeting Rooms',
    summary: 'Prove correctness of greedy choice property: sorting by finish time maximizes available future scheduling window.',
    isWeeklyTest: false,
    category: 'Greedy Algorithms',
    keyConcept: 'Sorting intervals by end time leaves maximum remaining time for remaining activities (greedy choice property).',
    codeSnippet: 'intervals.sort((a, b) => a[1] - b[1]); // Sort by end time'
  },
  {
    day: 53,
    title: 'Greedy Algorithms II: Fractional Knapsack & Huffman Coding',
    topic: 'Value-to-Weight Ratios, Prefix Codes, Variable-Length Entropy Encoding',
    summary: 'Build optimal prefix codes with priority queues to compress data according to character frequencies.',
    isWeeklyTest: false,
    category: 'Greedy Algorithms',
    keyConcept: 'Huffman algorithm repeatedly merges two lowest-frequency trees in a priority queue, building an optimal prefix tree.',
    codeSnippet: '// Greedily pick highest value/weight ratio items'
  },
  {
    day: 54,
    title: 'Segment Trees: Range Queries & Point Updates',
    topic: 'Tree Representation in Arrays, Range Sum/Min/Max in O(log n)',
    summary: 'Answer static/dynamic range queries in O(log n) time with O(n) array storage and O(log n) point updates.',
    isWeeklyTest: false,
    category: 'Advanced Structures',
    keyConcept: 'Segment tree root covers [0, n-1]; children divide range in half. Query decomposes into at most 2 * log n canonical segments.',
    codeSnippet: 'function query(node, l, r, ql, qr) {\n  if (ql <= l && r <= qr) return tree[node];\n  const mid = (l + r) >> 1;\n  // Recurse left and right child segments\n}'
  },
  {
    day: 55,
    title: 'Fenwick Trees (Binary Indexed Tree / BIT)',
    topic: 'Point Update & Prefix Sum in O(log n), LSB Isolation via i & (-i)',
    summary: 'Implement ultra-compact logarithmic range query structure using bitwise low-bit offsets without pointers.',
    isWeeklyTest: false,
    category: 'Advanced Structures',
    keyConcept: 'Each index i in BIT stores sum of range (i - (i & -i), i]. Moving up adds LSB; moving down subtracts LSB.',
    codeSnippet: 'function update(i, delta) { while (i < bit.length) { bit[i] += delta; i += (i & -i); } }\nfunction query(i) { let s = 0; while (i > 0) { s += bit[i]; i -= (i & -i); } return s; }'
  },
  {
    day: 56,
    title: 'Week 8 Revision & Aptitude Milestone Test #8',
    topic: 'Weekly Consolidation: SCCs, Bridges, Greedy Proofs, Segment Trees & Fenwick Trees',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 50 to 55 advanced structures and graph connectivity.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Master BIT low-bit index navigation, segment tree array bounds, and Tarjan low-link derivations.',
    codeSnippet: '// Weekly Review: Advanced Range Queries & Graph Connectivity'
  },
  {
    day: 57,
    title: 'String Matching I: KMP (Knuth-Morris-Pratt) Algorithm',
    topic: 'Longest Proper Prefix which is also Suffix (LPS Array), O(N + M) Matching',
    summary: 'Eliminate redundant string comparisons by preprocessing the search pattern into an LPS table in linear time.',
    isWeeklyTest: false,
    category: 'Strings',
    keyConcept: 'When mismatch occurs at pattern index j, LPS[j - 1] tells the longest prefix that matches the current suffix, avoiding backtracking.',
    codeSnippet: 'const lps = new Int32Array(m);\nlet len = 0, i = 1;\nwhile (i < m) {\n  if (pat[i] === pat[len]) lps[i++] = ++len;\n  else if (len !== 0) len = lps[len - 1];\n  else lps[i++] = 0;\n}'
  },
  {
    day: 58,
    title: 'String Matching II: Rabin-Karp & Rolling Hash',
    topic: 'Modular Arithmetic, Polynomial Hash Functions, Hash Collisions',
    summary: 'Slide a constant-time rolling hash window across text to locate substring occurrences in O(N + M) average time.',
    isWeeklyTest: false,
    category: 'Strings',
    keyConcept: 'Roll hash by subtracting outgoing character * base^(m-1), multiplying by base, and adding incoming character modulo large prime P.',
    codeSnippet: 'hash = ((hash - oldChar * power) * base + newChar) % MOD;'
  },
  {
    day: 59,
    title: 'Computational Geometry: Cross Product & Convex Hull',
    topic: 'Cross Product Orientation, Graham Scan, Monotone Chain Algorithm',
    summary: 'Determine whether three points make a clockwise or counterclockwise turn; construct minimal enclosing convex polygons.',
    isWeeklyTest: false,
    category: 'Geometry',
    keyConcept: 'Cross product (B.x - A.x)*(C.y - A.y) - (B.y - A.y)*(C.x - A.x): positive => counter-clockwise; negative => clockwise; zero => collinear.',
    codeSnippet: 'function crossProduct(o, a, b) { return (a.x - o.x)*(b.y - o.y) - (a.y - o.y)*(b.x - o.x); }'
  },
  {
    day: 60,
    title: 'Phase 2 Comprehensive Master Milestone Exam',
    topic: 'Phase 2 Finale: 60-Day Synthesis of Trees, Advanced Graphs, Greedy & Range Queries',
    summary: 'The capstone examination for Phase 2. 20 challenging aptitude questions evaluating mid-program algorithmic mastery.',
    isWeeklyTest: true,
    category: 'Phase Capstone Exam',
    keyConcept: 'Completing Phase 2 confirms deep competence across non-linear graphs, balancing trees, segment trees, and greedy invariants.',
    codeSnippet: '// Phase 2 Capstone: 60 days of algorithmic mastery synthesized'
  },

  // Phase 3: Dynamic Programming, Advanced Topics & Technical Mastery (Days 61 - 90)
  {
    day: 61,
    title: 'Dynamic Programming I: Foundations & Memoization vs Tabulation',
    topic: 'Overlapping Subproblems, Optimal Substructure, State Space & Transitions',
    summary: 'Transition from recursive brute force to optimal polynomial time via top-down caching and bottom-up arrays.',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'Memoization caches recursive returns on demand; Tabulation builds solutions iteratively from base cases in topological dependency order.',
    codeSnippet: 'const memo = new Map();\nfunction dp(n) { if (n <= 1) return n; if (!memo.has(n)) memo.set(n, dp(n-1) + dp(n-2)); return memo.get(n); }'
  },
  {
    day: 62,
    title: 'Dynamic Programming II: 1D State Array Problems',
    topic: 'Climbing Stairs, House Robber, Coin Change, Minimum Jumps',
    summary: 'Model decisions at step i depending on recent predecessor states; optimize space from O(n) to O(1) rolling variables.',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'House Robber: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Since only two previous states are needed, space reduces to two variables.',
    codeSnippet: 'let prev2 = 0, prev1 = 0;\nfor (const x of nums) { const curr = Math.max(prev1, prev2 + x); prev2 = prev1; prev1 = curr; }'
  },
  {
    day: 63,
    title: 'Week 9 Revision & Aptitude Milestone Test #9',
    topic: 'Weekly Consolidation: String Algorithms, Geometry & DP Foundations',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 57 to 62 algorithms.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Consolidate rolling hash modular math, KMP failure function, and 1D DP state recurrence equations.',
    codeSnippet: '// Weekly Review: KMP, Rabin-Karp and 1D DP'
  },
  {
    day: 64,
    title: 'Dynamic Programming III: 0/1 Knapsack & Subset Sum',
    topic: 'Bounded Inclusion/Exclusion, 2D Grid to 1D Reverse Iteration',
    summary: 'Master capacity-constrained choice optimization. Space-optimize 2D dp[i][w] table to 1D by iterating weight in reverse.',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'In 0/1 knapsack, iterate capacity downwards from W to w[i] so each item is included at most once per iteration.',
    codeSnippet: 'const dp = new Int32Array(W + 1);\nfor (let i = 0; i < n; i++)\n  for (let w = W; w >= weights[i]; w--)\n    dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);'
  },
  {
    day: 65,
    title: 'Dynamic Programming IV: Unbounded Knapsack & Coin Change Combinations',
    topic: 'Infinite Supply Items, Forward Iteration, Permutations vs Combinations',
    summary: 'Differentiate between counting unique combinations (outer loop coins) vs permutations (outer loop target).',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'Iterating capacity forward (w = w[i] to W) allows items to be reused infinitely.',
    codeSnippet: 'for (const coin of coins)\n  for (let w = coin; w <= target; w++)\n    dp[w] += dp[w - coin]; // Combinations'
  },
  {
    day: 66,
    title: 'Dynamic Programming V: Longest Common Subsequence (LCS)',
    topic: '2D String Alignment, Edit Distance, Longest Palindromic Subsequence',
    summary: 'Compare two strings character by character. If match: 1 + dp[i-1][j-1]; if mismatch: max(dp[i-1][j], dp[i][j-1]).',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'Edit Distance (Levenshtein): dp[i][j] = 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]) on mismatch.',
    codeSnippet: 'if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;\nelse dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);'
  },
  {
    day: 67,
    title: 'Dynamic Programming VI: Longest Increasing Subsequence (LIS)',
    topic: 'O(n²) DP vs O(n log n) Patience Sorting with Binary Search',
    summary: 'Accelerate LIS from quadratic to O(n log n) using patience sorting piles and binary search lower bounds.',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'Tails array stores smallest tail of all increasing subsequences of length i + 1. Binary search finds replacement position in O(log n).',
    codeSnippet: 'const tails = [];\nfor (const x of nums) {\n  let l = 0, r = tails.length;\n  while (l < r) { const m = (l + r) >> 1; tails[m] < x ? l = m + 1 : r = m; }\n  tails[l] = x;\n}'
  },
  {
    day: 68,
    title: 'Dynamic Programming VII: Matrix Chain Multiplication (MCM)',
    topic: 'Partitioning Subarrays, Optimal Parenthesization, Burst Balloons',
    summary: 'Optimize operation costs on intervals by iterating over all possible partition split points k between i and j.',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'Interval DP: solve for lengths len = 2..n. For range [i, j], test all split pivots k: dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost).',
    codeSnippet: 'for (let len = 2; len <= n; len++)\n  for (let i = 0; i <= n - len; i++) {\n    const j = i + len - 1;\n    // Split at k from i to j-1\n  }'
  },
  {
    day: 69,
    title: 'Dynamic Programming VIII: Bitmask DP & Traveling Salesperson (TSP)',
    topic: 'State Compression, Hamilton Path, Subset Transitions in O(2ⁿ · n²)',
    summary: 'Compress subset states into integer bitmasks to solve NP-hard routing and subset assignment problems efficiently for n <= 20.',
    isWeeklyTest: false,
    category: 'Dynamic Programming',
    keyConcept: 'State dp(mask, u) represents minimum cost to visit set of nodes encoded by bitmask ending at vertex u.',
    codeSnippet: 'function tsp(mask, u) {\n  if (mask === (1 << n) - 1) return dist[u][0];\n  if (memo[mask][u] !== -1) return memo[mask][u];\n  let ans = Infinity;\n  for (let v = 0; v < n; v++) if (!(mask & (1 << v))) ans = Math.min(ans, dist[u][v] + tsp(mask | (1 << v), v));\n  return memo[mask][u] = ans;\n}'
  },
  {
    day: 70,
    title: 'Week 10 Revision & Aptitude Milestone Test #10',
    topic: 'Weekly Consolidation: Knapsack Variants, LCS, LIS, Interval DP & Bitmask DP',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 64 to 69 dynamic programming mastery.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Verify fluency in identifying optimal substructure, setting up base cases, and avoiding boundary off-by-one errors.',
    codeSnippet: '// Weekly Review: Advanced Dynamic Programming'
  },
  {
    day: 71,
    title: 'Dynamic Programming IX: Tree DP',
    topic: 'Independent Sets on Trees, Diameter via DP, Rerooting Techniques',
    summary: 'Compute dynamic programming states on trees using post-order tree traversals and all-node rerooting in O(n).',
    isWeeklyTest: false,
    category: 'Tree DP',
    keyConcept: 'Max Weight Independent Set on Tree: dp[u][0] (u not included) = sum(max(dp[v][0], dp[v][1])); dp[u][1] = val[u] + sum(dp[v][0]).',
    codeSnippet: '// Post-order tree DP computing subtree aggregates'
  },
  {
    day: 72,
    title: 'Dynamic Programming X: Digit DP',
    topic: 'Counting Numbers with Digit Constraints, Tight Flag, Leading Zeroes',
    summary: 'Count integers in range [L, R] satisfying digit properties in O(digits · state) using digit-by-digit construction.',
    isWeeklyTest: false,
    category: 'Digit DP',
    keyConcept: 'Tight flag: if true, current digit is bounded by corresponding digit in N; if false, current digit can range freely from 0 to 9.',
    codeSnippet: 'function count(idx, tight, sum) {\n  if (idx === numStr.length) return sum === target ? 1 : 0;\n  const limit = tight ? Number(numStr[idx]) : 9;\n  // Recurse across digits 0..limit\n}'
  },
  {
    day: 73,
    title: 'Network Flow & Bipartite Matching',
    topic: 'Ford-Fulkerson, Edmonds-Karp (BFS), Min-Cut Max-Flow Theorem',
    summary: 'Find maximum flow from source to sink in a flow network. Understand dual min-cut capacity equivalence.',
    isWeeklyTest: false,
    category: 'Network Flow',
    keyConcept: 'Max-Flow Min-Cut Theorem: Maximum amount of flow passing from source to sink equals total capacity of minimum cut.',
    codeSnippet: '// Edmonds-Karp: Repeatedly augment along shortest path in residual graph'
  },
  {
    day: 74,
    title: 'Game Theory: Sprague-Grundy Theorem & Nim',
    topic: 'Impartial Games, P-Positions & N-Positions, Nim-Sum (XOR)',
    summary: 'Analyze two-player zero-sum mathematical games. Compute Grundy values (MEX) to reduce game states to standard Nim.',
    isWeeklyTest: false,
    category: 'Game Theory',
    keyConcept: 'Bouton\'s Theorem: In Nim, first player has a winning strategy if and only if XOR sum of all pile sizes is non-zero.',
    codeSnippet: 'const nimSum = piles.reduce((acc, p) => acc ^ p, 0);\nconst isWinning = nimSum !== 0;'
  },
  {
    day: 75,
    title: 'Square Root Decomposition & Mo\'s Algorithm',
    topic: 'Offline Query Sorting by Block (L / B, R), O((N + Q) √N) Range Operations',
    summary: 'Decompose arrays into blocks of size √N. Reorder offline queries to minimize pointer movement across elements.',
    isWeeklyTest: false,
    category: 'Advanced Algorithms',
    keyConcept: 'Sort queries by block index of L; tie-break by R. Total movement of left pointer is O(Q √N); right pointer moves O(N √N).',
    codeSnippet: 'const blockSize = Math.floor(Math.sqrt(n));\nqueries.sort((a, b) => Math.floor(a.l / blockSize) - Math.floor(b.l / blockSize) || a.r - b.r);'
  },
  {
    day: 76,
    title: 'Advanced Data Structures: Treaps & Randomized Search Trees',
    topic: 'Binary Search Tree Key + Max-Heap Priority Invariant, Split & Merge',
    summary: 'Combine binary search trees with random heap priorities to maintain balanced O(log n) trees without complex rotation cases.',
    isWeeklyTest: false,
    category: 'Advanced Structures',
    keyConcept: 'Cartesian tree / Treap maintains BST property on keys and heap property on randomly assigned node priorities.',
    codeSnippet: '// Treap nodes maintain: node.key (BST) and node.priority (Heap)'
  },
  {
    day: 77,
    title: 'Week 11 Revision & Aptitude Milestone Test #11',
    topic: 'Weekly Consolidation: Tree DP, Digit DP, Network Flow, Game Theory & Mo\'s Algorithm',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 71 to 76 advanced competitive algorithms.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Verify mastery of digit-tight state transitions, Sprague-Grundy XOR equivalence, and Mo\'s block sorting algebra.',
    codeSnippet: '// Weekly Review: Competitive Algorithmic Strategies'
  },
  {
    day: 78,
    title: 'Interview Masterclass: Two Pointers & Sliding Window Hard Patterns',
    topic: 'Subarrays with K Distinct Integers, Trapping Rain Water, Minimum Window Substring',
    summary: 'Solve top FAANG/hard interview problems by decomposing exact constraints into atMost(K) - atMost(K-1).',
    isWeeklyTest: false,
    category: 'Interview Synthesis',
    keyConcept: 'Exact(K) = atMost(K) - atMost(K - 1). This mathematical substitution transforms hard exact windowing into straightforward monotonicity.',
    codeSnippet: 'function exactK(nums, k) { return atMostK(nums, k) - atMostK(nums, k - 1); }'
  },
  {
    day: 79,
    title: 'Interview Masterclass: Monotonic Stack & Queue Synthesis',
    topic: 'Largest Rectangle in Histogram, Maximal Rectangle 2D, Constrained Subsequence Sum',
    summary: 'Transform 2D grid matrix problems into 1D histogram stacks; apply monotonic queues to sliding dynamic programming.',
    isWeeklyTest: false,
    category: 'Interview Synthesis',
    keyConcept: 'Consecutive rows of 1s in a binary matrix map to histogram heights, solved in O(row * col) using monotonic histogram stacks.',
    codeSnippet: '// Maximal Rectangle in 2D Binary Matrix using 1D Histogram Area'
  },
  {
    day: 80,
    title: 'Interview Masterclass: Advanced Binary Search Invariants',
    topic: 'Median of Two Sorted Arrays in O(log(min(m, n))), Split Array Largest Sum',
    summary: 'Partition two sorted arrays simultaneously such that left half elements <= right half elements in logarithmic time.',
    isWeeklyTest: false,
    category: 'Interview Synthesis',
    keyConcept: 'Binary search partition point on smaller array A: partitionB = (m + n + 1)/2 - partitionA. Validate maxLeftA <= minRightB.',
    codeSnippet: '// O(log(min(m, n))) Median of Two Sorted Arrays'
  },
  {
    day: 81,
    title: 'Interview Masterclass: Advanced Graph & Tree Modeling',
    topic: 'Alien Dictionary, Reconstruct Itinerary, Parallel Courses III',
    summary: 'Derive graph models from unstructured inputs: extract character precedence rules, Eulerian paths, and critical path scheduling.',
    isWeeklyTest: false,
    category: 'Interview Synthesis',
    keyConcept: 'Critical Path Method on DAGs: Earliest completion time = max(dp[u] + time[u]) across all prerequisite paths.',
    codeSnippet: '// Critical path calculation on dependency DAG'
  },
  {
    day: 82,
    title: 'Interview Masterclass: Dynamic Programming Synthesis & Optimization',
    topic: 'Convex Hull Trick, Divide & Conquer DP Optimization, Knuth Optimization',
    summary: 'Optimize DP recurrences from O(n²) to O(n log n) or O(n) using slope geometry and monotonicity of optimal split points.',
    isWeeklyTest: false,
    category: 'Interview Synthesis',
    keyConcept: 'If transition equation has form dp[i] = min(m_j * x_i + c_j), lines can be maintained in a convex envelope for O(1) query.',
    codeSnippet: '// Convex Hull Trick: Maintaining lines with decreasing slopes'
  },
  {
    day: 83,
    title: 'Memory Optimization, Bitsets & Low-Level Cache Performance',
    topic: 'Array of Structures vs Structure of Arrays, False Sharing, 64-Bit Word Parallelism',
    summary: 'Understand modern CPU L1/L2/L3 cache line layout (64 bytes), spatial/temporal locality, and bitset vectorization.',
    isWeeklyTest: false,
    category: 'Systems & Performance',
    keyConcept: 'Traversing 2D array row-by-row utilizes cache lines; traversing column-by-column causes frequent cache misses.',
    codeSnippet: '// Row-major sequential traversal maximizes CPU prefetching'
  },
  {
    day: 84,
    title: 'Week 12 Revision & Aptitude Milestone Test #12',
    topic: 'Weekly Consolidation: FAANG Synthesis Patterns, Hard Invariants & Performance',
    summary: 'Comprehensive 20-question diagnostic exam testing Days 78 to 83 interview problem patterns.',
    isWeeklyTest: true,
    category: 'Weekly Milestone Test',
    keyConcept: 'Test ability to synthesize multiple paradigms (e.g. Binary Search + Greedy, BFS + Bitmask, Stack + Histogram).',
    codeSnippet: '// Weekly Review: Synthesis of Complex Interview Patterns'
  },
  {
    day: 85,
    title: 'System Design for Algorithmic Engineers I: Consistent Hashing',
    topic: 'Hash Ring, Virtual Nodes, Distributed Caching, Chord Protocol',
    summary: 'Distribute data keys across dynamic cluster nodes with minimal key remapping upon node addition or failure.',
    isWeeklyTest: false,
    category: 'System Algorithms',
    keyConcept: 'In standard modulo hash (k % N), changing N remaps almost all keys. In Consistent Hashing, only K/N keys are moved.',
    codeSnippet: '// Hash Ring with virtual nodes for uniform key distribution'
  },
  {
    day: 86,
    title: 'System Design for Algorithmic Engineers II: Bloom Filters & Count-Min Sketch',
    topic: 'Probabilistic Data Structures, False Positive Probability Math, k Hash Functions',
    summary: 'Verify set membership in massive datasets using constant memory with zero false negatives and tunable false positives.',
    isWeeklyTest: false,
    category: 'Probabilistic Structures',
    keyConcept: 'Optimal number of hash functions k = (m / n) * ln 2. False positive rate p = (1 - e^(-kn/m))^k.',
    codeSnippet: '// Bloom filter: k hash functions setting bits in array of size m'
  },
  {
    day: 87,
    title: 'System Design for Algorithmic Engineers III: Rate Limiting Algorithms',
    topic: 'Token Bucket, Leaky Bucket, Sliding Window Counter, Distributed Redis Limits',
    summary: 'Control traffic throughput and prevent service starvation using deterministic algorithmic rate limiters.',
    isWeeklyTest: false,
    category: 'System Algorithms',
    keyConcept: 'Token Bucket allows bursts up to capacity while maintaining constant refill rate. Sliding Window Log provides exact precision.',
    codeSnippet: '// Token bucket: replenish tokens based on elapsed time since last request'
  },
  {
    day: 88,
    title: 'System Design for Algorithmic Engineers IV: LRU & LFU Cache Architecture',
    topic: 'Hash Map + Doubly Linked List O(1), Frequency Doubly Linked Lists',
    summary: 'Implement eviction policies in strictly O(1) time for both lookup and eviction operations.',
    isWeeklyTest: false,
    category: 'System Algorithms',
    keyConcept: 'LRU: Map provides O(1) key access; Doubly Linked List provides O(1) node relocation to head upon access and tail eviction.',
    codeSnippet: 'class LRUCache {\n  // Map<Key, Node> + DoublyLinkedList with dummy head & tail\n}'
  },
  {
    day: 89,
    title: 'Comprehensive Algorithmic Defense & Mock Technical Interview',
    topic: 'Tradeoff Communication, Complexity Defenses, Edge Case Checklists',
    summary: 'Review end-to-end problem decomposition strategies: Clarification, Brute Force, Optimization, Code, Test, Analyze.',
    isWeeklyTest: false,
    category: 'Technical Interview',
    keyConcept: 'Engineering interviews evaluate structured communication and testing habits as rigorously as algorithmic optimality.',
    codeSnippet: '// Mock interview protocol: State invariants, complexity, and boundary checks'
  },
  {
    day: 90,
    title: 'Grand Comprehensive 90-Day DSA Mastery Examination',
    topic: 'The Ultimate 90-Day Capstone: 20 Elite Algorithmic Aptitude Questions',
    summary: 'The final milestone exam. 20 rigorous, comprehensive aptitude questions testing the entirety of computer science data structures and algorithms.',
    isWeeklyTest: true,
    category: 'Grand Final Exam',
    keyConcept: 'Congratulations on completing 90 days! You have acquired the foundational and advanced problem-solving capabilities of top software engineers worldwide.',
    codeSnippet: '// 90 Days Completed: Full Mastery across Data Structures & Algorithms'
  }
];

// Helper to generate day blueprints for Full Stack and DevOps if needed
export function getBlueprintForCourse(courseId: string, dayNumber: number): DayBlueprint {
  if (courseId === 'dsa') {
    return DSA_90_DAYS[dayNumber - 1] || DSA_90_DAYS[0];
  }

  const isWeekly = dayNumber % 7 === 0 || dayNumber === 90;

  if (courseId === 'fullstack') {
    const titlesFullstack: Record<number, string> = {
      1: 'HTML5 Semantic Elements & Accessibility Standards',
      2: 'Modern CSS3: Flexbox Mastery & Dimensional Layouts',
      3: 'Modern CSS3: CSS Grid, Subgrid & Fluid Typography',
      4: 'CSS Architecture: BEM, Tailwind Utility-First & Variables',
      5: 'JavaScript Engine: Memory Heap, Call Stack & Execution Contexts',
      6: 'Scope Chains, Lexical Environments & Closure Mechanics',
      7: 'Week 1 Revision & Full Stack Milestone Test #1',
      8: 'Asynchronous JavaScript: Event Loop, Microtasks & Macrotasks',
      9: 'Promises, Async/Await & Comprehensive Error Handling',
      10: 'DOM Manipulation, Event Delegation & Custom Events',
      11: 'TypeScript I: Primitive Types, Type Inference & Interfaces',
      12: 'TypeScript II: Generics, Utility Types & Type Narrowing',
      13: 'Modern Bundlers: Vite, Rollup & ES Modules Internals',
      14: 'Week 2 Revision & Full Stack Milestone Test #2',
      15: 'React 19 Architecture: Virtual DOM & Reconciliation',
      16: 'JSX Compilation, Component Lifecycle & Pure Functions',
      17: 'State Management: useState, useReducer & State Lifting',
      18: 'Side Effects: useEffect, Cleanup Functions & Dependency Arrays',
      19: 'Performance: useMemo, useCallback & React.memo Optimization',
      20: 'Custom Hooks: Extracting Reusable Reactive Business Logic',
      21: 'Week 3 Revision & Full Stack Milestone Test #3',
      22: 'Context API: Global State Distribution & Avoidance of Prop Drilling',
      23: 'Form Handling: Controlled vs Uncontrolled Components & Validation',
      24: 'Routing: Client-Side Routing with React Router Architecture',
      25: 'Styling Systems in React: CSS Modules, Tailwind & Styled Components',
      26: 'Component Design Patterns: Compound Components & Render Props',
      27: 'Error Boundaries, Suspense & Concurrent Rendering',
      28: 'Week 4 Revision & Full Stack Milestone Test #4',
      29: 'Client-Side Data Fetching: TanStack Query (React Query) Caching',
      30: 'Phase 1 Frontend Architecture Capstone Exam',
      35: 'Week 5 Revision & Full Stack Milestone Test #5',
      42: 'Week 6 Revision & Full Stack Milestone Test #6',
      49: 'Week 7 Revision & Full Stack Milestone Test #7',
      56: 'Week 8 Revision & Full Stack Milestone Test #8',
      63: 'Week 9 Revision & Full Stack Milestone Test #9',
      70: 'Week 10 Revision & Full Stack Milestone Test #10',
      77: 'Week 11 Revision & Full Stack Milestone Test #11',
      84: 'Week 12 Revision & Full Stack Milestone Test #12',
      90: 'Grand 90-Day Full Stack Architecture & Engineering Exam'
    };

    const title = titlesFullstack[dayNumber] || `Day ${dayNumber}: Advanced Full Stack Engineering - Module ${dayNumber}`;
    return {
      day: dayNumber,
      title: isWeekly ? `Day ${dayNumber}: ${title}` : `Day ${dayNumber}: ${title}`,
      topic: title.split(':')[0],
      summary: `In-depth hands-on development module covering ${title} with theory, architecture, code, and test cases.`,
      isWeeklyTest: isWeekly,
      category: isWeekly ? 'Weekly Milestone Test' : 'Full Stack Development',
      keyConcept: `Understanding architectural best practices, decoupling, and high performance in ${title}.`,
      codeSnippet: `// Day ${dayNumber} Full Stack Demonstration\nconsole.log("Full Stack Engineering - Day ${dayNumber}");`
    };
  }

  // DevOps track
  const titlesDevOps: Record<number, string> = {
    1: 'Linux Kernel Architecture, Shell Basics & File System Hierarchy',
    2: 'Linux Process Management, Signals & Resource Limits',
    3: 'User Permissions, POSIX ACLs, Sudoers & SSH Key Cryptography',
    4: 'Networking I: TCP/IP Stack, Subnetting & Routing Tables',
    5: 'Networking II: DNS Resolution, HTTP/1.1 vs HTTP/2 vs HTTP/3 & TLS',
    6: 'Bash Scripting & Automation Utilities (sed, awk, grep, xargs)',
    7: 'Week 1 Revision & DevOps Milestone Test #1',
    8: 'Git Internals: Blobs, Trees, Commits & Object Store Architecture',
    9: 'Git Workflows: Branching Strategies, Rebasing & Merge Conflict Resolution',
    10: 'Continuous Integration: Automated Linting, Testing & Matrix Builds',
    11: 'GitHub Actions: Workflows, Secrets, Composite Actions & Self-Hosted Runners',
    12: 'Docker I: Linux Namespaces, Cgroups, Copy-On-Write Storage Engines',
    13: 'Docker II: Writing Production Dockerfiles & Multi-Stage Builds',
    14: 'Week 2 Revision & DevOps Milestone Test #2',
    15: 'Docker III: Container Networking, Bridge Drivers & Port Forwarding',
    16: 'Docker IV: Volumes, Bind Mounts, Storage Drivers & Security Scanning',
    17: 'Docker Compose: Orchestrating Multi-Container Application Stacks',
    18: 'Container Registry Architecture & Vulnerability Auditing',
    19: 'Introduction to Kubernetes: Control Plane vs Worker Node Architecture',
    20: 'Kubernetes Workloads I: Pods, ReplicaSets & Declarative Deployments',
    21: 'Week 3 Revision & DevOps Milestone Test #3',
    30: 'Phase 1 Systems & Containers Capstone Exam',
    35: 'Week 5 Revision & DevOps Milestone Test #5',
    42: 'Week 6 Revision & DevOps Milestone Test #6',
    49: 'Week 7 Revision & DevOps Milestone Test #7',
    56: 'Week 8 Revision & DevOps Milestone Test #8',
    63: 'Week 9 Revision & DevOps Milestone Test #9',
    70: 'Week 10 Revision & DevOps Milestone Test #10',
    77: 'Week 11 Revision & DevOps Milestone Test #11',
    84: 'Week 12 Revision & DevOps Milestone Test #12',
    90: 'Grand 90-Day Cloud & SRE Master Examination'
  };

  const title = titlesDevOps[dayNumber] || `Day ${dayNumber}: Cloud & DevOps Infrastructure - Module ${dayNumber}`;
  return {
    day: dayNumber,
    title: isWeekly ? `Day ${dayNumber}: ${title}` : `Day ${dayNumber}: ${title}`,
    topic: title.split(':')[0],
    summary: `Practical infrastructure engineering module covering ${title} with theory, configuration, and testing.`,
    isWeeklyTest: isWeekly,
    category: isWeekly ? 'Weekly Milestone Test' : 'DevOps & Cloud Engineering',
    keyConcept: `Automating, securing, and scaling distributed infrastructure in ${title}.`,
    codeSnippet: `# Day ${dayNumber} Infrastructure Automation\necho "DevOps Automation Day ${dayNumber}"`
  };
}

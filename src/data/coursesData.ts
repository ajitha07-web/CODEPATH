import type { Course, Lesson, CourseId } from '../types';
import { getBlueprintForCourse } from './curriculum90Days';
import { generate20AptitudeQuestions } from './aptitudeBank';

export const COURSES: Course[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    shortDescription: 'Master algorithmic problem solving, Big-O, and top interview patterns.',
    description: 'A comprehensive 90-day day-by-day path taking you from foundational time/space complexity through advanced Dynamic Programming, Graph algorithms, and technical interview mastery.',
    category: 'Computer Science',
    duration: '90 Days Complete Mastery',
    totalDays: 90,
    level: 'All Levels',
    icon: 'Binary',
    color: 'from-purple-600 to-indigo-600',
    tags: ['Big-O', 'Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'LeetCode']
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    shortDescription: 'Modern web development with React, Node, Express, and Databases.',
    description: 'Learn to build complete end-to-end modern web applications. Cover modern frontend design, backend REST APIs, authentication, and database modeling.',
    category: 'Web Development',
    duration: '90 Days Full Stack Pro',
    totalDays: 90,
    level: 'Beginner',
    icon: 'Layers',
    color: 'from-blue-600 to-cyan-600',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind']
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Engineering',
    shortDescription: 'Containers, CI/CD pipelines, Kubernetes, and Cloud Deployment.',
    description: 'Bridge software engineering and operations. Master Linux, Git, Docker containers, automated CI/CD pipelines, and cloud container orchestration.',
    category: 'Infrastructure',
    duration: '90 Days Cloud & SRE',
    totalDays: 90,
    level: 'Intermediate',
    icon: 'Server',
    color: 'from-emerald-600 to-teal-600',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'AWS', 'Monitoring']
  },
  {
    id: 'java',
    title: 'Java Programming Mastery',
    shortDescription: 'Core Java, Object-Oriented Design, Collections, and Concurrency.',
    description: 'Deep dive into enterprise-grade Java. Learn OOP design principles, generics, the Collections framework, Streams API, and multithreading.',
    category: 'Programming Languages',
    duration: '7 Days Comprehensive',
    totalDays: 7,
    level: 'Beginner',
    icon: 'Coffee',
    color: 'from-amber-600 to-orange-600',
    tags: ['Core Java', 'OOP', 'Collections', 'Streams', 'Multithreading', 'Spring']
  },
  {
    id: 'python',
    title: 'Python Programming & Beyond',
    shortDescription: 'From Python syntax fundamentals to APIs, data, and automation.',
    description: 'Master the world’s most versatile language. Learn clean Pythonic code, data structures, object-oriented concepts, and building modern web APIs.',
    category: 'Programming Languages',
    duration: '7 Days Practical',
    totalDays: 7,
    level: 'Beginner',
    icon: 'Code2',
    color: 'from-violet-600 to-fuchsia-600',
    tags: ['Python 3', 'Functions', 'OOP', 'FastAPI', 'Automation', 'Algorithms']
  }
];

export const DSA_LESSONS: Lesson[] = [
  {
    id: 'dsa-day-1',
    courseId: 'dsa',
    dayNumber: 1,
    title: 'Day 1: Programming Fundamentals & Time Complexity',
    topic: 'Time & Space Complexity (Big-O Notation)',
    estimatedMinutes: 35,
    summary: 'Understand how to measure algorithm efficiency, Big-O, Big-Omega, Big-Theta, and analyze loops.',
    content: {
      overview: 'In computer science, we do not measure algorithm speed in seconds, because clock speeds and hardware differ across machines. Instead, we measure how the execution time and memory usage scale as the input size (n) grows towards infinity. This mathematical framework is Big-O notation.',
      keyConcepts: [
        {
          title: 'The Orders of Growth',
          body: 'Here are the primary time complexities ordered from fastest to slowest:\n• O(1) - Constant: Array index lookup, push/pop to stack\n• O(log n) - Logarithmic: Binary search, divide and conquer\n• O(n) - Linear: Iterating through an array once\n• O(n log n) - Linearithmic: Efficient sorting (Merge sort, Quick sort)\n• O(n²) - Quadratic: Nested loops over the same array\n• O(2ⁿ) - Exponential: Recursive subsets/Fibonacci without memoization',
          code: `// O(1) - Constant Time:
function getFirstElement(arr) {
  return arr[0]; // Exactly 1 step regardless of array size
}

// O(n) - Linear Time:
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max; // n operations
}

// O(n^2) - Quadratic Time:
function printAllPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]); // n * n operations
    }
  }
}`,
          language: 'javascript'
        },
        {
          title: 'Space Complexity & Memory',
          body: 'Space complexity refers to the auxiliary (extra) memory required by your algorithm. Creating an extra array of size n takes O(n) space. Recursive calls consume memory on the call stack proportional to the maximum recursion depth.'
        }
      ],
      realWorldAnalogy: 'Think of looking up a contact in a phone book. If you check every single contact from A to Z, that is O(n) Linear Search. If you open to the middle and discard half each time, that is O(log n) Binary Search. If the book had 1,000,000 names, O(n) takes 1,000,000 checks, but O(log n) takes only ~20 checks!',
      tips: [
        'Always drop non-dominant terms: O(n² + 5n + 100) simplifies to O(n²).',
        'Drop constant factors: O(3n) simplifies to O(n).',
        'Different inputs require different variables: nested loops over arrA and arrB is O(A * B), not O(n²).'
      ]
    },
    exercise: {
      id: 'ex-dsa-1',
      title: 'Analyze & Sum Up to N',
      difficulty: 'Easy',
      description: 'Write a function `sumUpTo(n)` that returns the sum of all integers from 1 up to n. Aim for O(1) time complexity using Gauss\'s formula: sum = n * (n + 1) / 2.',
      inputFormat: 'A positive integer n (e.g. 5)',
      outputFormat: 'The sum as an integer (e.g. 15)',
      starterCode: `function sumUpTo(n) {
  // Your code here
  // Tip: You can do this in O(1) time using n * (n + 1) / 2
  return (n * (n + 1)) / 2;
}`,
      testCases: [
        { input: '5', expectedOutput: '15', description: 'Sum of 1..5 is 15' },
        { input: '10', expectedOutput: '55', description: 'Sum of 1..10 is 55' },
        { input: '100', expectedOutput: '5050', description: 'Sum of 1..100 is 5050' }
      ],
      hints: [
        'Gauss formula is n * (n + 1) / 2.',
        'This takes O(1) constant time because there is no loop.'
      ]
    },
    quiz: {
      id: 'quiz-dsa-1',
      lessonId: 'dsa-day-1',
      title: 'Time Complexity & Big-O Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the time complexity of accessing an element in an array by its index `arr[4]`?',
          options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
          correctAnswerIndex: 1,
          explanation: 'Array access by index uses direct memory address offset arithmetic (baseAddress + index * elementSize), which completes in O(1) constant time.',
          topicTag: 'Big-O Basics'
        },
        {
          id: 'q2',
          question: 'If an algorithm contains two sequential loops (each running n times), what is its overall time complexity?',
          options: ['O(n²)', 'O(n)', 'O(2n²)', 'O(log n)'],
          correctAnswerIndex: 1,
          explanation: 'Sequential loops add up: O(n) + O(n) = O(2n). In Big-O asymptotic analysis, constant coefficients are dropped, giving O(n).',
          topicTag: 'Loop Analysis'
        },
        {
          id: 'q3',
          question: 'Which of the following time complexities grows the SLOWEST as n increases?',
          options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
          correctAnswerIndex: 2,
          explanation: 'O(log n) is logarithmic and grows dramatically slower than linear or polynomial complexities.',
          topicTag: 'Complexity Comparison'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-2',
    courseId: 'dsa',
    dayNumber: 2,
    title: 'Day 2: Arrays & Two-Pointer Techniques',
    topic: 'Contiguous Memory, In-place Swaps & Two Pointers',
    estimatedMinutes: 40,
    summary: 'Master contiguous memory layout, in-place manipulation, prefix sums, and the two-pointer paradigm.',
    content: {
      overview: 'An array is a contiguous block of memory where each element can be accessed in O(1) time. However, inserting or deleting an element from the beginning or middle takes O(n) time due to shifting elements.',
      keyConcepts: [
        {
          title: 'The Two-Pointer Pattern',
          body: 'Instead of using nested O(n²) loops, two pointers move towards each other (or at different speeds) to solve problems in O(n) time and O(1) space. Common uses include reversing arrays, checking palindromes, and finding pairs.',
          code: `// Reversing an array using Two Pointers in O(n) time & O(1) space
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}`,
          language: 'javascript'
        },
        {
          title: 'Prefix Sums',
          body: 'Prefix sum arrays allow answering range sum queries in O(1) time after O(n) precomputation. prefix[i] = prefix[i-1] + arr[i].'
        }
      ],
      realWorldAnalogy: 'Think of two inspectors walking from opposite ends of a long train. Instead of walking back and forth (nested loops), they meet in the middle, inspecting each car exactly once in O(n) time.',
      tips: [
        'When an array is sorted, think of Two Pointers or Binary Search immediately.',
        'Beware of off-by-one errors when working with `left < right` versus `left <= right`.'
      ]
    },
    exercise: {
      id: 'ex-dsa-2',
      title: 'Reverse an Array In-Place',
      difficulty: 'Easy',
      description: 'Implement `reverseArray(arr)` that reverses the given array of numbers and returns it.',
      inputFormat: 'An array of numbers represented as JSON (e.g. [1, 2, 3, 4])',
      outputFormat: 'The reversed array (e.g. [4, 3, 2, 1])',
      starterCode: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}`,
      testCases: [
        { input: '[1, 2, 3, 4]', expectedOutput: '[4,3,2,1]', description: 'Even length array' },
        { input: '[10, 20, 30]', expectedOutput: '[30,20,10]', description: 'Odd length array' },
        { input: '[5]', expectedOutput: '[5]', description: 'Single element' }
      ],
      hints: ['Use one pointer at index 0 and another at arr.length - 1, swapping until they meet.']
    },
    quiz: {
      id: 'quiz-dsa-2',
      lessonId: 'dsa-day-2',
      title: 'Arrays & Two-Pointers Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the time complexity of inserting an item at the beginning of an array of size n?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
          correctAnswerIndex: 1,
          explanation: 'All n existing elements must be shifted one position to the right to make room at index 0, requiring O(n) work.',
          topicTag: 'Array Fundamentals'
        },
        {
          id: 'q2',
          question: 'Under what condition is the two-pointer squeeze technique most straightforward for finding a target pair sum?',
          options: ['When the array is unsorted', 'When the array is sorted', 'When all numbers are negative', 'When the array contains duplicates'],
          correctAnswerIndex: 1,
          explanation: 'When sorted, if currentSum < target we increment left; if currentSum > target we decrement right.',
          topicTag: 'Two Pointers'
        },
        {
          id: 'q3',
          question: 'What is the auxiliary space complexity of an in-place array reversal using two pointers?',
          options: ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'],
          correctAnswerIndex: 1,
          explanation: 'Only two pointer variables and a temp swap variable are used, consuming O(1) auxiliary memory.',
          topicTag: 'Space Complexity'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-3',
    courseId: 'dsa',
    dayNumber: 3,
    title: 'Day 3: Strings & String Manipulation',
    topic: 'ASCII, Immutability, Palindromes & Sliding Window',
    estimatedMinutes: 40,
    summary: 'Master string algorithms, palindrome validation, anagram verification, and frequency maps.',
    content: {
      overview: 'Strings are sequences of characters. In languages like JavaScript, Java, and Python, strings are immutable—meaning any modification creates a brand new string in memory.',
      keyConcepts: [
        {
          title: 'Palindrome Verification',
          body: 'A palindrome reads the same forwards and backwards. We can verify this in O(n) time and O(1) space with two pointers moving inward.',
          code: `function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left].toLowerCase() !== str[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
          language: 'javascript'
        },
        {
          title: 'Anagram Checking using Frequency Counter',
          body: 'Two strings are anagrams if they contain the exact same characters with identical counts. An O(n) frequency map or 26-element array avoids O(n log n) sorting.'
        }
      ],
      realWorldAnalogy: 'Think of an anagram as rearranging magnetic letters on a refrigerator. You have the exact same count of each letter, just spelled in a different sequence.',
      tips: [
        'Repeated string concatenation inside loops creates O(n²) garbage in memory. Use arrays and join() instead.',
        'Use char code offsets (e.g. `char.charCodeAt(0) - 97`) for fast 26-bucket character counting.'
      ]
    },
    exercise: {
      id: 'ex-dsa-3',
      title: 'Valid Palindrome Checker',
      difficulty: 'Easy',
      description: 'Write `isPalindrome(s)` returning true if the string is a palindrome (ignoring casing), false otherwise.',
      inputFormat: 'A string (e.g. "racecar")',
      outputFormat: 'Boolean true or false',
      starterCode: `function isPalindrome(s) {
  const clean = s.toLowerCase();
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++;
    r--;
  }
  return true;
}`,
      testCases: [
        { input: '"racecar"', expectedOutput: 'true', description: 'racecar is a palindrome' },
        { input: '"hello"', expectedOutput: 'false', description: 'hello is not a palindrome' },
        { input: '"Madam"', expectedOutput: 'true', description: 'Case insensitive Madam' }
      ],
      hints: ['Compare characters from both ends using two pointers.']
    },
    quiz: {
      id: 'quiz-dsa-3',
      lessonId: 'dsa-day-3',
      title: 'Strings Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'Why does repeated string concatenation `str += char` inside a loop of n iterations result in O(n²) total time in languages with immutable strings?',
          options: [
            'Because memory is fragmented',
            'Because each concatenation copies the entire accumulated string',
            'Because string length lookup takes O(n)',
            'Because of garbage collector pauses'
          ],
          correctAnswerIndex: 1,
          explanation: 'Since strings are immutable, copying 1 + 2 + 3 + ... + n characters leads to n(n+1)/2 operations = O(n²).',
          topicTag: 'String Immutability'
        },
        {
          id: 'q2',
          question: 'What is the optimal time complexity to determine if two strings of length n are anagrams using a frequency map?',
          options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
          correctAnswerIndex: 2,
          explanation: 'Iterating through both strings once and counting frequencies runs in O(n) time with O(1) auxiliary space (since alphabet size is constant 26/128).',
          topicTag: 'Anagrams'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-4',
    courseId: 'dsa',
    dayNumber: 4,
    title: 'Day 4: Searching Algorithms & Binary Search',
    topic: 'Linear Search, Binary Search & Rotated Search',
    estimatedMinutes: 45,
    summary: 'Master logarithmic searching, boundary conditions, search space reduction, and rotated sorted arrays.',
    content: {
      overview: 'Linear search scans element by element in O(n) time. When data is sorted, Binary Search cuts the search space in half with every step, achieving O(log n) performance.',
      keyConcepts: [
        {
          title: 'The Binary Search Template',
          body: 'Always calculate mid using `left + Math.floor((right - left) / 2)` to prevent 32-bit integer overflow in languages like Java/C++.',
          code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
    }
  }
  return -1; // Target not present
}`,
          language: 'javascript'
        }
      ],
      realWorldAnalogy: 'Imagine guessing a secret number between 1 and 100. If someone tells you "Higher" or "Lower", your best guess is always 50, then 75, then 88. You find any number in at most 7 guesses (log₂ 100 ≈ 7).',
      tips: [
        'Notice the loop condition is `while (left <= right)`.',
        'Binary search can be applied to monotonic answer spaces (Binary Search on Answer).'
      ]
    },
    exercise: {
      id: 'ex-dsa-4',
      title: 'Implement Binary Search',
      difficulty: 'Easy',
      description: 'Implement `binarySearch(arr, target)` returning the index of target in sorted `arr`, or -1 if not found.',
      inputFormat: 'Sorted array and target number (e.g. [2, 5, 8, 12, 16], 8)',
      outputFormat: 'Index integer (e.g. 2)',
      starterCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      testCases: [
        { input: '[2, 5, 8, 12, 16], 8', expectedOutput: '2', description: 'Target 8 is at index 2' },
        { input: '[1, 3, 5, 7, 9], 1', expectedOutput: '0', description: 'Target 1 is at index 0' },
        { input: '[1, 3, 5, 7, 9], 10', expectedOutput: '-1', description: 'Target 10 is not found' }
      ],
      hints: ['Cut the search window in half at each step.']
    },
    quiz: {
      id: 'quiz-dsa-4',
      lessonId: 'dsa-day-4',
      title: 'Searching Algorithms Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What prerequisite MUST be satisfied before standard Binary Search can be applied?',
          options: ['Array must contain only positive numbers', 'Array elements must be sorted', 'Array must have even length', 'Array must have no duplicates'],
          correctAnswerIndex: 1,
          explanation: 'Binary Search relies on the monotonic property of sorted elements to discard half the search space.',
          topicTag: 'Binary Search Prerequisites'
        },
        {
          id: 'q2',
          question: 'How many comparisons at most does Binary Search take on an array of 1,024 elements?',
          options: ['1,024', '512', '10', '11'],
          correctAnswerIndex: 3,
          explanation: 'log₂(1024) = 10, plus at most 1 comparison for boundary resolution = 11 steps.',
          topicTag: 'Binary Search Math'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-5',
    courseId: 'dsa',
    dayNumber: 5,
    title: 'Day 5: Sorting Algorithms',
    topic: 'Bubble, Selection, Insertion, Merge Sort & Quick Sort',
    estimatedMinutes: 50,
    summary: 'Compare O(n²) comparison sorts with O(n log n) Divide & Conquer algorithms, stability, and space tradeoffs.',
    content: {
      overview: 'Sorting is the foundation of efficient search and data processing. Basic algorithms like Bubble/Insertion sort take O(n²), while divide-and-conquer algorithms like Merge Sort and Quick Sort achieve O(n log n).',
      keyConcepts: [
        {
          title: 'Merge Sort: Divide & Conquer',
          body: 'Merge sort splits the array into two halves, recursively sorts them, and merges the sorted halves. It guarantees O(n log n) in all cases and is stable, but requires O(n) auxiliary memory.',
          code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
          language: 'javascript'
        },
        {
          title: 'Quick Sort: Pivot Partitioning',
          body: 'Quick sort selects a pivot and partitions the array so smaller elements are to the left and larger elements are to the right. Average time is O(n log n), but worst case (sorted with bad pivot) is O(n²).'
        }
      ],
      realWorldAnalogy: 'Think of sorting a hand of playing cards. Insertion sort is how humans sort cards: you pick one card at a time and insert it into its correct position relative to the cards already held in your left hand.',
      tips: [
        'JavaScript `.sort()` in V8 uses TimSort (a hybrid of Merge Sort and Insertion Sort).',
        'Stable sorting preserves the relative order of duplicate keys.'
      ]
    },
    exercise: {
      id: 'ex-dsa-5',
      title: 'Implement Bubble Sort / Basic Sort',
      difficulty: 'Easy',
      description: 'Implement `sortArray(arr)` that returns the elements sorted in ascending order.',
      inputFormat: 'An unsorted array of numbers (e.g. [5, 2, 9, 1, 5, 6])',
      outputFormat: 'The sorted array (e.g. [1, 2, 5, 5, 6, 9])',
      starterCode: `function sortArray(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
  return a;
}`,
      testCases: [
        { input: '[5, 2, 9, 1, 5, 6]', expectedOutput: '[1,2,5,5,6,9]', description: 'Duplicates and negative' },
        { input: '[3, -1, 0, 7]', expectedOutput: '[-1,0,3,7]', description: 'With negative numbers' },
        { input: '[1, 2, 3]', expectedOutput: '[1,2,3]', description: 'Already sorted' }
      ],
      hints: ['Swap adjacent elements if they are out of order.']
    },
    quiz: {
      id: 'quiz-dsa-5',
      lessonId: 'dsa-day-5',
      title: 'Sorting Algorithms Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the worst-case time complexity of Merge Sort?',
          options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
          correctAnswerIndex: 1,
          explanation: 'Merge Sort always splits arrays in half (log n levels) and performs O(n) work per level, guaranteeing O(n log n) even in the worst case.',
          topicTag: 'Merge Sort'
        },
        {
          id: 'q2',
          question: 'What is the worst-case space complexity of standard Merge Sort for an array of size n?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctAnswerIndex: 2,
          explanation: 'Merge Sort requires an auxiliary array of size n to merge the divided halves.',
          topicTag: 'Sorting Space Complexity'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-6',
    courseId: 'dsa',
    dayNumber: 6,
    title: 'Day 6: Linked Lists',
    topic: 'Singly, Doubly, Fast & Slow Pointers (Floyd\'s Cycle)',
    estimatedMinutes: 50,
    summary: 'Master node pointers, in-place list reversal, dummy heads, and cycle detection.',
    content: {
      overview: 'Unlike arrays, linked list elements are non-contiguous in memory. Each node contains a value and a pointer (`next`) to the following node. Inserting or deleting at the head is O(1), but random access is O(n).',
      keyConcepts: [
        {
          title: 'Reversing a Linked List',
          body: 'To reverse a list in O(n) time and O(1) space, maintain three pointers: `prev`, `curr`, and `next`.',
          code: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next; // Save next
    curr.next = prev;         // Reverse pointer
    prev = curr;              // Advance prev
    curr = nextTemp;          // Advance curr
  }
  return prev; // New head
}`,
          language: 'javascript'
        },
        {
          title: 'Floyd\'s Tortoise and Hare (Cycle Detection)',
          body: 'Move a slow pointer 1 step and a fast pointer 2 steps. If a cycle exists, the fast pointer will inevitably lap and meet the slow pointer.'
        }
      ],
      realWorldAnalogy: 'Think of a treasure hunt where each clue contains coordinates to the next clue. You cannot jump directly to clue #5 without following the previous 4 clues.',
      tips: [
        'Always use a dummy head node (`dummy.next = head`) to avoid special-casing empty lists or head node modifications.',
        'Beware of losing references: always store `curr.next` before overwriting it.'
      ]
    },
    exercise: {
      id: 'ex-dsa-6',
      title: 'Find Middle of a List / Array Simulation',
      difficulty: 'Easy',
      description: 'Implement `findMiddle(arr)` that returns the middle element of an array simulating linked list traversal. If even length, return the second middle element.',
      inputFormat: 'An array representing list node values (e.g. [1, 2, 3, 4, 5])',
      outputFormat: 'The middle element value (e.g. 3)',
      starterCode: `function findMiddle(arr) {
  // Simulating fast and slow pointers
  let slow = 0;
  let fast = 0;
  while (fast < arr.length && fast + 1 < arr.length) {
    slow += 1;
    fast += 2;
  }
  return arr[slow];
}`,
      testCases: [
        { input: '[1, 2, 3, 4, 5]', expectedOutput: '3', description: 'Odd length: 3 is middle' },
        { input: '[1, 2, 3, 4, 5, 6]', expectedOutput: '4', description: 'Even length: 4 is second middle' },
        { input: '[42]', expectedOutput: '42', description: 'Single element' }
      ],
      hints: ['When fast reaches the end, slow is at the middle.']
    },
    quiz: {
      id: 'quiz-dsa-6',
      lessonId: 'dsa-day-6',
      title: 'Linked Lists Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the time complexity of deleting the head node in a singly linked list if you have a direct reference to the head?',
          options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
          correctAnswerIndex: 1,
          explanation: 'Deleting head is simple: `head = head.next`, which executes in O(1) constant time.',
          topicTag: 'Linked List Operations'
        },
        {
          id: 'q2',
          question: 'In Floyd\'s cycle detection algorithm, why do slow (1x speed) and fast (2x speed) pointers guarantee detection if a loop exists?',
          options: [
            'Because fast travels backwards',
            'Because the distance between them decreases by 1 in every iteration within the loop',
            'Because of memory exhaustion',
            'Because fast stops at null'
          ],
          correctAnswerIndex: 1,
          explanation: 'Relative to slow, fast closes the gap by 1 step every loop iteration until distance = 0 (collision).',
          topicTag: 'Cycle Detection'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-7',
    courseId: 'dsa',
    dayNumber: 7,
    title: 'Day 7: Weekly Revision Test & Consolidated Practice',
    topic: 'Comprehensive Assessment: Complexity, Arrays, Strings, Searching, Sorting & Linked Lists',
    estimatedMinutes: 60,
    summary: 'Consolidate everything learned in Week 1. Diagnose weak areas and cement core fundamentals.',
    content: {
      overview: 'Congratulations on reaching Day 7! Today is dedicated to testing your mastery of Week 1 topics: Big-O analysis, Two-Pointer array patterns, String manipulation, Binary Search boundaries, Sorting tradeoffs, and Linked Lists. Review your test score to unlock customized revision recommendations.',
      keyConcepts: [
        {
          title: 'Pattern Recognition Matrix',
          body: '• Sorted array + Search target → Binary Search O(log n)\n• Sorted array + Pair sum → Two Pointers O(n)\n• Contiguous subarray + Min/Max/Length → Sliding Window O(n)\n• Fast insertions/deletions at ends → Linked List / Deque O(1)\n• Unsorted array with frequent lookups → Hash Map O(1)'
        }
      ],
      realWorldAnalogy: 'Like athletic conditioning, coding mastery requires periodic milestone testing under timed conditions to expose blind spots before building advanced structures.',
      tips: [
        'Take your time on the quiz; incorrect answers will automatically generate customized revision cards on your dashboard!',
        'Aim for at least 80% to earn the "Week 1 DSA Champion" badge.'
      ]
    },
    exercise: {
      id: 'ex-dsa-7',
      title: 'Consolidated Challenge: Two Sum (Sorted)',
      difficulty: 'Medium',
      description: 'Given a 1-indexed sorted array `numbers` and an integer `target`, return the 1-based indices `[index1, index2]` of the two numbers such that they add up to target. Use O(1) extra space.',
      inputFormat: 'Sorted array and target (e.g. [2, 7, 11, 15], 9)',
      outputFormat: '1-indexed array of indices (e.g. [1, 2])',
      starterCode: `function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
      testCases: [
        { input: '[2, 7, 11, 15], 9', expectedOutput: '[1,2]', description: '2 + 7 = 9 at indices 1, 2' },
        { input: '[2, 3, 4], 6', expectedOutput: '[1,3]', description: '2 + 4 = 6 at indices 1, 3' },
        { input: '[-1, 0], -1', expectedOutput: '[1,2]', description: '-1 + 0 = -1 at indices 1, 2' }
      ],
      hints: ['Use two pointers starting at ends of the sorted array.']
    },
    quiz: {
      id: 'quiz-dsa-7',
      lessonId: 'dsa-day-7',
      title: 'Week 1 Comprehensive Revision Exam',
      passingScore: 75,
      questions: [
        {
          id: 'w1-q1',
          question: 'What is the time complexity of finding an element in a binary search tree in the worst case (skewed tree)?',
          options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
          correctAnswerIndex: 1,
          explanation: 'A skewed binary search tree degenerates into a linked list where every node has only one child, leading to O(n) search time.',
          topicTag: 'Trees & Skewed Structures'
        },
        {
          id: 'w1-q2',
          question: 'Which sorting algorithm has the best worst-case auxiliary space complexity among O(n log n) comparison sorts?',
          options: ['Merge Sort', 'Heap Sort', 'Quick Sort', 'Bubble Sort'],
          correctAnswerIndex: 1,
          explanation: 'Heap Sort achieves O(n log n) time while maintaining O(1) auxiliary space in-place.',
          topicTag: 'Sorting Tradeoffs'
        },
        {
          id: 'w1-q3',
          question: 'Given an array of size n, how many total contiguous subarrays exist?',
          options: ['n', '2ⁿ', 'n * (n + 1) / 2', 'n²'],
          correctAnswerIndex: 2,
          explanation: 'There are n subarrays of length 1, n-1 of length 2, ... down to 1 of length n. The sum is n(n+1)/2.',
          topicTag: 'Array Combinatorics'
        },
        {
          id: 'w1-q4',
          question: 'In a singly linked list, which operation cannot be performed in O(1) time even with a tail pointer?',
          options: ['Insert at head', 'Insert at tail', 'Delete tail node', 'Delete head node'],
          correctAnswerIndex: 2,
          explanation: 'To delete the tail node in a singly linked list, you must find the node immediately preceding the tail to update its `next` pointer to null, which requires an O(n) traversal from the head.',
          topicTag: 'Linked List Pointers'
        }
      ]
    },
    xpReward: 150
  },
  {
    id: 'dsa-day-8',
    courseId: 'dsa',
    dayNumber: 8,
    title: 'Day 8: Stacks & Queues',
    topic: 'LIFO vs FIFO, Monotonic Stack & Queue with Two Stacks',
    estimatedMinutes: 45,
    summary: 'Master Last-In-First-Out and First-In-First-Out architectures, balanced parentheses, and circular queues.',
    content: {
      overview: 'Stacks (LIFO) and Queues (FIFO) are fundamental abstract data types. Stacks are used for function call stacks, undo mechanisms, and expression parsing. Queues power task schedulers, print spoolers, and breadth-first search.',
      keyConcepts: [
        {
          title: 'Valid Parentheses using a Stack',
          body: 'Push opening brackets onto a stack. When a closing bracket arrives, verify it matches the bracket popped from the top of the stack.',
          code: `function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
          language: 'javascript'
        }
      ],
      realWorldAnalogy: 'A stack is like a stack of cafeteria trays (you take from the top). A queue is like a checkout line at a grocery store (first person in line gets served first).',
      tips: [
        'JavaScript arrays with `.push()` and `.pop()` act as high performance O(1) stacks.',
        'Using `.shift()` on an array is O(n) because it shifts all elements. For a true O(1) queue, use a linked list or circular buffer.'
      ]
    },
    exercise: {
      id: 'ex-dsa-8',
      title: 'Valid Parentheses Checker',
      difficulty: 'Easy',
      description: 'Given a string containing just `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid.',
      inputFormat: 'String of brackets (e.g. "()[]{}")',
      outputFormat: 'Boolean true or false',
      starterCode: `function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else if (map[c]) {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}`,
      testCases: [
        { input: '"()[]{}"', expectedOutput: 'true', description: 'Matched pairs' },
        { input: '"(]"', expectedOutput: 'false', description: 'Mismatched pair' },
        { input: '"([{}])"', expectedOutput: 'true', description: 'Nested pairs' }
      ],
      hints: ['Push opening brackets, pop and compare for closing brackets.']
    },
    quiz: {
      id: 'quiz-dsa-8',
      lessonId: 'dsa-day-8',
      title: 'Stacks & Queues Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'Which data structure is primarily used to implement Breadth-First Search (BFS)?',
          options: ['Stack', 'Queue', 'Priority Queue', 'Array List'],
          correctAnswerIndex: 1,
          explanation: 'BFS explores node neighbors level by level using a FIFO Queue.',
          topicTag: 'Queues & BFS'
        },
        {
          id: 'q2',
          question: 'How many stacks are required to implement a FIFO Queue with amortized O(1) operations?',
          options: ['1', '2', '3', 'None'],
          correctAnswerIndex: 1,
          explanation: 'Two stacks: `inStack` for enqueue operations and `outStack` for dequeue operations.',
          topicTag: 'Queue Implementation'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-9',
    courseId: 'dsa',
    dayNumber: 9,
    title: 'Day 9: Recursion & Backtracking',
    topic: 'Call Stack, Base Cases, Permutations & Subsets',
    estimatedMinutes: 55,
    summary: 'Master recursive decomposition, stack frames, state reversion, and pruning search trees.',
    content: {
      overview: 'Recursion solves problems by solving smaller instances of the same problem. Backtracking is an algorithmic paradigm that systematically searches for solutions by trying candidates and abandoning ("backtracking") when they cannot lead to a valid solution.',
      keyConcepts: [
        {
          title: 'The Anatomical Structure of Recursion',
          body: '1. Base Case: The condition that terminates recursion\n2. Recursive Step: Breaking the problem into subproblems\n3. Return Value: Combining subproblem results',
          code: `function factorial(n) {
  // 1. Base case
  if (n <= 1) return 1;
  // 2. Recursive step
  return n * factorial(n - 1);
}`,
          language: 'javascript'
        }
      ],
      realWorldAnalogy: 'Think of exploring a hedge maze. Whenever you hit a dead end, you retrace your steps backward to the last fork in the path and take the alternate route.',
      tips: [
        'Always write your base case first to avoid `Maximum call stack size exceeded` errors.',
        'Backtracking pattern: 1) Choose candidate, 2) Explore recursively, 3) Un-choose (revert state).'
      ]
    },
    exercise: {
      id: 'ex-dsa-9',
      title: 'Calculate Factorial Recursively',
      difficulty: 'Easy',
      description: 'Implement `factorial(n)` recursively for non-negative integer n.',
      inputFormat: 'Non-negative integer n (e.g. 5)',
      outputFormat: 'Integer factorial value (e.g. 120)',
      starterCode: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      testCases: [
        { input: '5', expectedOutput: '120', description: '5! = 120' },
        { input: '1', expectedOutput: '1', description: '1! = 1' },
        { input: '0', expectedOutput: '1', description: '0! = 1' }
      ],
      hints: ['Base case is n <= 1 return 1.']
    },
    quiz: {
      id: 'quiz-dsa-9',
      lessonId: 'dsa-day-9',
      title: 'Recursion Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What occurs if a recursive function does not reach a valid base case?',
          options: ['Heap Out of Memory', 'Stack Overflow Error', 'Deadlock', 'Garbage Collection'],
          correctAnswerIndex: 1,
          explanation: 'Stack frames accumulate with each call until the reserved call stack memory is exhausted, throwing a Stack Overflow.',
          topicTag: 'Recursion Base Cases'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-10',
    courseId: 'dsa',
    dayNumber: 10,
    title: 'Day 10: Hashing & Hash Tables',
    topic: 'Hash Functions, Collisions, Chaining & O(1) Lookups',
    estimatedMinutes: 45,
    summary: 'Understand hash code generation, separate chaining, open addressing, and frequency counting.',
    content: {
      overview: 'Hash tables map keys to values using a mathematical hash function. They provide average O(1) time complexity for insert, search, and delete operations, making them one of the most widely used data structures.',
      keyConcepts: [
        {
          title: 'Collision Resolution',
          body: 'When two distinct keys hash to the exact same bucket index, a collision occurs. Common strategies:\n• Separate Chaining: Each bucket holds a linked list or red-black tree.\n• Open Addressing: Probing linearly or quadratically for the next open slot.'
        }
      ],
      realWorldAnalogy: 'Think of a coat check room where your claim ticket corresponds to a numbered hanger slot. You retrieve your jacket instantly in O(1) time.',
      tips: [
        'In JavaScript, Map preserves insertion order and allows any key type, whereas plain Objects only support string/symbol keys.'
      ]
    },
    exercise: {
      id: 'ex-dsa-10',
      title: 'Find First Non-Repeating Character',
      difficulty: 'Easy',
      description: 'Given a string `s`, find the first non-repeating character and return its index. If it does not exist, return -1.',
      inputFormat: 'A string (e.g. "leetcode")',
      outputFormat: 'Index integer (e.g. 0)',
      starterCode: `function firstUniqChar(s) {
  const count = {};
  for (const c of s) {
    count[c] = (count[c] || 0) + 1;
  }
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}`,
      testCases: [
        { input: '"leetcode"', expectedOutput: '0', description: 'l is first non-repeating' },
        { input: '"loveleetcode"', expectedOutput: '2', description: 'v is at index 2' },
        { input: '"aabb"', expectedOutput: '-1', description: 'No unique character' }
      ],
      hints: ['Count character occurrences using a hash map in pass 1, find first with count 1 in pass 2.']
    },
    quiz: {
      id: 'quiz-dsa-10',
      lessonId: 'dsa-day-10',
      title: 'Hashing Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the worst-case lookup time in a hash table with poor collision handling where all keys map to the same bucket?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctAnswerIndex: 2,
          explanation: 'If all keys collide into a single bucket with separate chaining, the bucket becomes a linear linked list of length n, taking O(n) search time.',
          topicTag: 'Hash Collisions'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-11',
    courseId: 'dsa',
    dayNumber: 11,
    title: 'Day 11: Binary Trees & Binary Search Trees',
    topic: 'Traversals (Inorder, Preorder, Postorder, Level-Order) & BST Validation',
    estimatedMinutes: 55,
    summary: 'Master hierarchical tree structures, recursive depth-first traversals, and BFS level-order queues.',
    content: {
      overview: 'A Binary Tree is a hierarchical structure where each node has at most two children: left and right. A Binary Search Tree (BST) maintains the invariant that all values in the left subtree are smaller than the node, and all values in the right subtree are greater.',
      keyConcepts: [
        {
          title: 'Tree Traversals',
          body: '• Inorder (Left, Root, Right): Visits BST values in sorted ascending order\n• Preorder (Root, Left, Right): Useful for serialization/copying trees\n• Postorder (Left, Right, Root): Useful for bottom-up calculation (e.g. subtree height)\n• Level-Order: BFS traversal using a queue'
        }
      ],
      realWorldAnalogy: 'Think of an organizational hierarchy chart with a CEO at the root, VP managers under the CEO, and individual team members beneath them.',
      tips: [
        'An inorder traversal of a valid BST always yields elements in strictly increasing sorted order.'
      ]
    },
    exercise: {
      id: 'ex-dsa-11',
      title: 'Calculate Max Depth of a Binary Tree',
      difficulty: 'Easy',
      description: 'Given a nested object representing a binary tree node `{ val, left, right }`, return its maximum depth. If node is null, depth is 0.',
      inputFormat: 'JSON tree (e.g. {"val":3,"left":{"val":9,"left":null,"right":null},"right":{"val":20,"left":null,"right":null}})',
      outputFormat: 'Depth integer (e.g. 2)',
      starterCode: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      testCases: [
        { input: '{"val":3,"left":{"val":9,"left":null,"right":null},"right":{"val":20,"left":null,"right":null}}', expectedOutput: '2', description: 'Depth 2' },
        { input: 'null', expectedOutput: '0', description: 'Empty tree has depth 0' }
      ],
      hints: ['Recursive formulation: 1 + Math.max(depth(left), depth(right)).']
    },
    quiz: {
      id: 'quiz-dsa-11',
      lessonId: 'dsa-day-11',
      title: 'Binary Trees Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'Which traversal of a Binary Search Tree (BST) produces nodes in sorted ascending order?',
          options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
          correctAnswerIndex: 1,
          explanation: 'Inorder traversal visits (Left, Root, Right), which naturally outputs BST nodes in increasing order.',
          topicTag: 'Tree Traversals'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-12',
    courseId: 'dsa',
    dayNumber: 12,
    title: 'Day 12: Graphs & Graph Traversal Algorithms',
    topic: 'Adjacency List, BFS, DFS, Cycle Detection & Shortest Paths',
    estimatedMinutes: 60,
    summary: 'Model networks, relationships, BFS shortest path on unweighted graphs, and DFS connectivity.',
    content: {
      overview: 'A graph is a collection of vertices (nodes) connected by edges. Graphs can be directed/undirected, weighted/unweighted, and cyclic/acyclic.',
      keyConcepts: [
        {
          title: 'BFS for Shortest Path in Unweighted Graphs',
          body: 'Because BFS explores in concentric rings (1 hop away, 2 hops away, etc.), the first time BFS reaches a target node is guaranteed to be the shortest path.',
          code: `function bfsShortestPath(graph, start, target) {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  while (queue.length > 0) {
    const [current, dist] = queue.shift();
    if (current === target) return dist;
    for (let neighbor of (graph[current] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}`,
          language: 'javascript'
        }
      ],
      realWorldAnalogy: 'Think of social networks: you are connected to friends (1st degree), who are connected to their friends (2nd degree). BFS finds the shortest connection path.',
      tips: [
        'Always maintain a `visited` set to prevent infinite loops when traversing graphs with cycles.'
      ]
    },
    exercise: {
      id: 'ex-dsa-12',
      title: 'Count Connected Components in an Undirected Graph',
      difficulty: 'Medium',
      description: 'Given number of nodes `n` and array of edge pairs `edges`, return the number of connected components.',
      inputFormat: 'n and edges (e.g. 5, [[0,1],[1,2],[3,4]])',
      outputFormat: 'Integer component count (e.g. 2)',
      starterCode: `function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const visited = new Set();
  let count = 0;
  function dfs(node) {
    visited.add(node);
    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
  }
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      count++;
      dfs(i);
    }
  }
  return count;
}`,
      testCases: [
        { input: '5, [[0,1],[1,2],[3,4]]', expectedOutput: '2', description: 'Two components: {0,1,2} and {3,4}' },
        { input: '4, [[0,1],[2,3]]', expectedOutput: '2', description: 'Two separate pairs' }
      ],
      hints: ['Build adjacency list, run DFS from every unvisited node and count components.']
    },
    quiz: {
      id: 'quiz-dsa-12',
      lessonId: 'dsa-day-12',
      title: 'Graphs Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the time complexity of BFS or DFS on a graph with V vertices and E edges using an adjacency list?',
          options: ['O(V * E)', 'O(V + E)', 'O(V²)', 'O(E log V)'],
          correctAnswerIndex: 1,
          explanation: 'Every vertex is visited once and every edge is traversed once, yielding O(V + E) time.',
          topicTag: 'Graph Complexity'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-13',
    courseId: 'dsa',
    dayNumber: 13,
    title: 'Day 13: Greedy Algorithms',
    topic: 'Optimal Local Choices, Activity Selection & Fractional Knapsack',
    estimatedMinutes: 50,
    summary: 'Learn when local greedy choices yield a globally optimal solution and when they fail.',
    content: {
      overview: 'A greedy algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate benefit (locally optimal choice) in hopes of finding a global optimum.',
      keyConcepts: [
        {
          title: 'Activity Selection / Interval Scheduling',
          body: 'To maximize non-overlapping activities, sort activities by their END time and greedily pick the next activity that begins after the previous one finishes.'
        }
      ],
      realWorldAnalogy: 'Giving change in coins: To give 36 cents change, greedily take the largest coin possible (25c quarter, 10c dime, 1c penny = 3 coins).',
      tips: [
        'Greedy algorithms only work when a problem exhibits both Greedy-Choice Property and Optimal Substructure.'
      ]
    },
    exercise: {
      id: 'ex-dsa-13',
      title: 'Greedy Coin Change (Canonical)',
      difficulty: 'Easy',
      description: 'Given standard coin denominations [25, 10, 5, 1], find minimum number of coins to make `amount`.',
      inputFormat: 'Integer amount (e.g. 36)',
      outputFormat: 'Integer coin count (e.g. 3)',
      starterCode: `function minCoins(amount) {
  const coins = [25, 10, 5, 1];
  let count = 0;
  let remaining = amount;
  for (const coin of coins) {
    if (remaining >= coin) {
      count += Math.floor(remaining / coin);
      remaining %= coin;
    }
  }
  return count;
}`,
      testCases: [
        { input: '36', expectedOutput: '3', description: '25 + 10 + 1 = 3 coins' },
        { input: '40', expectedOutput: '3', description: '25 + 10 + 5 = 3 coins' },
        { input: '7', expectedOutput: '3', description: '5 + 1 + 1 = 3 coins' }
      ],
      hints: ['Greedily take the largest denomination first.']
    },
    quiz: {
      id: 'quiz-dsa-13',
      lessonId: 'dsa-day-13',
      title: 'Greedy Algorithms Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'In the Interval Scheduling / Activity Selection problem, by which criterion should intervals be sorted to maximize the total number of non-overlapping activities?',
          options: ['Start time ascending', 'End time ascending', 'Interval length ascending', 'Start time descending'],
          correctAnswerIndex: 1,
          explanation: 'Sorting by earliest finish time leaves the maximum possible remaining time for subsequent intervals.',
          topicTag: 'Interval Scheduling'
        }
      ]
    },
    xpReward: 100
  },
  {
    id: 'dsa-day-14',
    courseId: 'dsa',
    dayNumber: 14,
    title: 'Day 14: Dynamic Programming (DP)',
    topic: 'Memoization (Top-Down) vs Tabulation (Bottom-Up) & 0/1 Knapsack',
    estimatedMinutes: 65,
    summary: 'Master overlapping subproblems, optimal substructure, 1D/2D state DP, and interview problem patterns.',
    content: {
      overview: 'Dynamic Programming is an optimization over plain recursion. When subproblems repeat ("overlapping subproblems"), we store their computed results in a lookup table so each subproblem is solved only once.',
      keyConcepts: [
        {
          title: 'Climbing Stairs: Top-Down vs Bottom-Up',
          body: 'You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways to reach the top?',
          code: `// Bottom-up Tabulation O(n) time, O(1) space
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i++) {
    let current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
          language: 'javascript'
        }
      ],
      realWorldAnalogy: 'Writing "1 + 1 + 1 + 1 + 1 = 5" on a piece of paper. If someone adds another "+ 1" to the end, you do not recount from 1—you simply remember the 5 and add 1 to get 6. That is Dynamic Programming!',
      tips: [
        'Step 1: Identify if the problem asks for Min/Max or Total Ways.',
        'Step 2: Define your DP state representation (e.g. `dp[i] = answer for size i`).',
        'Step 3: Formulate the recurrence relation and identify base cases.'
      ]
    },
    exercise: {
      id: 'ex-dsa-14',
      title: 'Climbing Stairs (Dynamic Programming)',
      difficulty: 'Easy',
      description: 'Implement `climbStairs(n)` returning the number of distinct ways to climb n steps taking 1 or 2 steps at a time.',
      inputFormat: 'Integer n (e.g. 4)',
      outputFormat: 'Integer ways (e.g. 5)',
      starterCode: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      testCases: [
        { input: '2', expectedOutput: '2', description: '2 ways for 2 steps' },
        { input: '3', expectedOutput: '3', description: '3 ways for 3 steps' },
        { input: '5', expectedOutput: '8', description: '8 ways for 5 steps' }
      ],
      hints: ['Notice the Fibonacci pattern: ways(n) = ways(n-1) + ways(n-2).']
    },
    quiz: {
      id: 'quiz-dsa-14',
      lessonId: 'dsa-day-14',
      title: 'Dynamic Programming Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What are the two essential properties a problem must possess for Dynamic Programming to be applicable?',
          options: [
            'Sorted elements and binary splits',
            'Overlapping subproblems and optimal substructure',
            'Linear time bounds and constant space',
            'Independent subproblems and greedy steps'
          ],
          correctAnswerIndex: 1,
          explanation: 'DP requires repeating subproblems to benefit from caching (overlapping subproblems) and optimal subproblem solutions combining into the overall optimum (optimal substructure).',
          topicTag: 'DP Fundamentals'
        }
      ]
    },
    xpReward: 150
  }
];

// Generate complete 90-day curriculums with 20 aptitude questions per day
export function getLessonsForCourse(courseId: string): Lesson[] {
  const is90DayCourse = courseId === 'dsa' || courseId === 'fullstack' || courseId === 'devops';
  const totalDays = is90DayCourse ? 90 : 7;
  const lessons: Lesson[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const blueprint = getBlueprintForCourse(courseId, day);
    const questions = generate20AptitudeQuestions(courseId as CourseId, day, blueprint.topic);
    const isWeekly = day % 7 === 0 || day === 90;

    // Check if we have rich legacy handcrafted lesson content for Day 1..14 of DSA
    if (courseId === 'dsa' && day <= 14 && DSA_LESSONS[day - 1]) {
      const baseLesson = DSA_LESSONS[day - 1];
      lessons.push({
        ...baseLesson,
        quiz: {
          id: `quiz-dsa-${day}`,
          lessonId: `dsa-day-${day}`,
          title: `Day ${day} Aptitude & Algorithmic Challenge (20 Questions)`,
          passingScore: 70,
          questions
        },
        xpReward: isWeekly ? 250 : 150
      });
      continue;
    }

    // Dynamic high-depth lesson generation for all 90 days
    lessons.push({
      id: `${courseId}-day-${day}`,
      courseId: courseId as CourseId,
      dayNumber: day,
      title: blueprint.title,
      topic: blueprint.topic,
      estimatedMinutes: isWeekly ? 60 : 45,
      summary: blueprint.summary,
      content: {
        overview: `${blueprint.summary} This module is designed to provide comprehensive conceptual understanding, mathematical rigor, and architectural trade-off analysis.`,
        keyConcepts: [
          {
            title: 'Core Fundamentals & Mathematical Derivations',
            body: `${blueprint.keyConcept}\n\nReview this principle carefully before attempting the 20 aptitude questions. Focus on boundary limits, algorithmic invariants, and system resource trade-offs.`,
            code: blueprint.codeSnippet,
            language: courseId === 'devops' ? 'bash' : 'javascript'
          },
          {
            title: 'Critical Engineering Invariants',
            body: `1. Invariant Maintenance: Every operation must guarantee state consistency.\n2. Asymptotic Bounds: Always differentiate between best, average, and worst-case dynamics.\n3. Failure Modes: Account for edge conditions (empty inputs, capacity saturation, race conditions).`
          }
        ],
        realWorldAnalogy: `Think of ${blueprint.topic} as a mission-critical bridge: constructing the components to withstand edge-case traffic spikes and boundary stresses without catastrophic failure.`,
        tips: [
          'Take your time on the 20 aptitude questions. Each question tests a distinct trap or derivation.',
          'Score at least 70% (14/20) to pass and earn maximum XP reward.',
          'Review incorrect answers carefully; they automatically populate your dashboard revision list.'
        ]
      },
      exercise: {
        id: `ex-${courseId}-${day}`,
        title: `Day ${day} Coding Exercise: ${blueprint.topic}`,
        difficulty: isWeekly ? 'Hard' : day > 45 ? 'Medium' : 'Easy',
        description: `Implement the core algorithmic function for ${blueprint.topic}. Ensure your solution handles boundary conditions and passes all automated test cases.`,
        inputFormat: 'Test input parameter (e.g. integer or array)',
        outputFormat: 'Evaluated result according to specifications',
        starterCode: `function solution(input) {\n  // Day ${day} challenge implementation for ${blueprint.topic}\n  return true;\n}`,
        testCases: [
          { input: '"test"', expectedOutput: 'true', description: 'Standard assertion' },
          { input: '42', expectedOutput: 'true', description: 'Boundary verification' }
        ],
        hints: [
          'Verify input constraints before proceeding.',
          'Consider edge cases such as empty input, zeros, or single elements.'
        ]
      },
      quiz: {
        id: `quiz-${courseId}-${day}`,
        lessonId: `${courseId}-day-${day}`,
        title: `Day ${day} Aptitude & Knowledge Challenge (20 Questions)`,
        passingScore: 70,
        questions
      },
      xpReward: isWeekly ? 250 : 150
    });
  }

  return lessons;
}


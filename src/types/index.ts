export type CourseId = 'dsa' | 'fullstack' | 'devops' | 'java' | 'python';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  enrolledCourseId: CourseId;
  totalXp: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson ids
  quizAttempts: Record<string, QuizAttempt>; // quizId -> attempt
  weakTopics: string[];
  badges: string[];
}

export interface Course {
  id: CourseId;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  duration: string;
  totalDays: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  icon: string;
  color: string;
  tags: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface CodingExercise {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  starterCode: string;
  solutionCode?: string;
  testCases: TestCase[];
  hints: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topicTag: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
  incorrectTopicTags: string[];
}

export interface Lesson {
  id: string;
  courseId: CourseId;
  dayNumber: number;
  title: string;
  topic: string;
  estimatedMinutes: number;
  summary: string;
  content: {
    overview: string;
    keyConcepts: {
      title: string;
      body: string;
      code?: string;
      language?: string;
    }[];
    realWorldAnalogy: string;
    tips: string[];
  };
  exercise: CodingExercise;
  quiz: Quiz;
  xpReward: number;
}

export interface WeeklyActivity {
  day: string; // 'Mon', 'Tue', etc.
  date: string;
  active: boolean;
  xpEarned: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

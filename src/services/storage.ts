import type { UserProfile, CourseId, QuizAttempt, Badge, WeeklyActivity } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'codepath_user_profile',
  ACTIVITY: 'codepath_weekly_activity',
  SETTINGS: 'codepath_settings'
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first daily lesson',
    icon: 'Footprints',
    unlocked: false
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace',
    description: 'Score 100% on any 20-question aptitude challenge',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'code_runner',
    title: 'Code Runner',
    description: 'Successfully pass all test cases in a coding exercise',
    icon: 'Terminal',
    unlocked: false
  },
  {
    id: 'streak_3',
    title: '3-Day Fire',
    description: 'Maintain a 3-day continuous study streak',
    icon: 'Flame',
    unlocked: false
  },
  {
    id: 'dsa_week1',
    title: 'DSA Pioneer',
    description: 'Complete Day 7 Weekly Revision Test in DSA',
    icon: 'Sparkles',
    unlocked: false
  },
  {
    id: 'phase1_graduate',
    title: 'Phase 1 Master',
    description: 'Complete 30 days of foundational curriculum',
    icon: 'Layers',
    unlocked: false
  },
  {
    id: 'ninety_day_legend',
    title: '90-Day Legend',
    description: 'Complete all 90 days of the intensive mastery track',
    icon: 'Crown',
    unlocked: false
  }
];

export const DEFAULT_GUEST_PROFILE: UserProfile = {
  id: 'guest-student-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@codepath.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  enrolledCourseId: 'dsa',
  totalXp: 350,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['dsa-day-1'],
  quizAttempts: {
    'quiz-dsa-1': {
      quizId: 'quiz-dsa-1',
      score: 3,
      totalQuestions: 3,
      percentage: 100,
      passed: true,
      attemptedAt: new Date().toISOString(),
      incorrectTopicTags: []
    }
  },
  weakTopics: [],
  badges: ['first_step', 'quiz_ace']
};

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      saveProfile(DEFAULT_GUEST_PROFILE);
      return DEFAULT_GUEST_PROFILE;
    }
    const profile: UserProfile = JSON.parse(raw);
    return updateStreakIfNewDay(profile);
  } catch (err) {
    console.error('Failed to load profile from localStorage:', err);
    return DEFAULT_GUEST_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
  }
}

export function updateStreakIfNewDay(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = profile.lastActiveDate;

  if (lastDate === today) {
    return profile;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newStreak = profile.streakDays;

  if (lastDate === yesterday) {
    // Continued streak!
    newStreak += 1;
  } else if (!lastDate) {
    newStreak = 1;
  } else {
    // Broken streak reset
    newStreak = 1;
  }

  const updated: UserProfile = {
    ...profile,
    streakDays: newStreak,
    lastActiveDate: today
  };

  if (newStreak >= 3 && !updated.badges.includes('streak_3')) {
    updated.badges.push('streak_3');
  }

  saveProfile(updated);
  return updated;
}

export function recordLessonCompletion(lessonId: string, xp: number): UserProfile {
  const profile = getStoredProfile();
  if (profile.completedLessons.includes(lessonId)) {
    return profile;
  }

  const updatedBadges = [...profile.badges];
  if (!updatedBadges.includes('first_step')) {
    updatedBadges.push('first_step');
  }
  if (lessonId.includes('day-7') && !updatedBadges.includes('dsa_week1')) {
    updatedBadges.push('dsa_week1');
  }
  if (lessonId.includes('day-30') && !updatedBadges.includes('phase1_graduate')) {
    updatedBadges.push('phase1_graduate');
  }
  if (lessonId.includes('day-90') && !updatedBadges.includes('ninety_day_legend')) {
    updatedBadges.push('ninety_day_legend');
  }

  const updated: UserProfile = {
    ...profile,
    completedLessons: [...profile.completedLessons, lessonId],
    totalXp: profile.totalXp + xp,
    badges: updatedBadges
  };

  saveProfile(updated);
  logActivityToday(xp);
  return updated;
}

export function recordQuizAttempt(attempt: QuizAttempt, earnedXp: number): UserProfile {
  const profile = getStoredProfile();
  const existingAttempts = { ...profile.quizAttempts, [attempt.quizId]: attempt };

  // Re-compute weak topics across all attempts
  const weakSet = new Set<string>();
  Object.values(existingAttempts).forEach(att => {
    att.incorrectTopicTags.forEach(topic => weakSet.add(topic));
  });

  const updatedBadges = [...profile.badges];
  if (attempt.percentage === 100 && !updatedBadges.includes('quiz_ace')) {
    updatedBadges.push('quiz_ace');
  }

  const updated: UserProfile = {
    ...profile,
    quizAttempts: existingAttempts,
    weakTopics: Array.from(weakSet),
    totalXp: profile.totalXp + earnedXp,
    badges: updatedBadges
  };

  saveProfile(updated);
  logActivityToday(earnedXp);
  return updated;
}

export function recordExercisePassed(xp: number): UserProfile {
  const profile = getStoredProfile();
  const updatedBadges = [...profile.badges];
  if (!updatedBadges.includes('code_runner')) {
    updatedBadges.push('code_runner');
  }

  const updated: UserProfile = {
    ...profile,
    totalXp: profile.totalXp + xp,
    badges: updatedBadges
  };

  saveProfile(updated);
  logActivityToday(xp);
  return updated;
}

export function switchCourse(courseId: CourseId): UserProfile {
  const profile = getStoredProfile();
  const updated: UserProfile = {
    ...profile,
    enrolledCourseId: courseId
  };
  saveProfile(updated);
  return updated;
}

export function getWeeklyActivity(): WeeklyActivity[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Monday = 0

  const storedActivity = getStoredActivityMap();

  return days.map((dayName, idx) => {
    // Generate date string for current week's day
    const diff = idx - currentDayIndex;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    const dateStr = targetDate.toISOString().split('T')[0];

    const xpEarned = storedActivity[dateStr] || (idx <= currentDayIndex ? (idx === currentDayIndex ? 80 : 50 + idx * 20) : 0);
    const active = idx <= currentDayIndex;

    return {
      day: dayName,
      date: dateStr,
      active,
      xpEarned
    };
  });
}

function getStoredActivityMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function logActivityToday(xp: number) {
  const today = new Date().toISOString().split('T')[0];
  const map = getStoredActivityMap();
  map[today] = (map[today] || 0) + xp;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(map));
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}

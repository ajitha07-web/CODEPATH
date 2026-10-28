import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, CourseId, QuizAttempt } from '../types';
import { 
  getStoredProfile, 
  saveProfile, 
  recordLessonCompletion as recordLessonStorage,
  recordQuizAttempt as recordQuizStorage,
  recordExercisePassed as recordExerciseStorage,
  switchCourse as switchCourseStorage,
  DEFAULT_GUEST_PROFILE
} from '../services/storage';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  isSupabaseConnected: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  guestLogin: () => void;
  selectCourse: (courseId: CourseId) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  submitQuizAttempt: (attempt: QuizAttempt, earnedXp: number) => void;
  submitExercisePassed: (xp: number) => void;
  updateProfileName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(getStoredProfile());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    // If Supabase is configured, check auth state
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsAuthenticated(true);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // If user has Supabase credentials:
    if (isSupabaseConfigured && supabase && _password) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: _password });
        if (error) {
          console.error('Supabase sign-in error:', error.message);
          return false;
        }
      } catch (err) {
        console.error(err);
      }
    }

    const updated: UserProfile = {
      ...user,
      email,
      name: email.split('@')[0] || user.name
    };
    setUser(updated);
    saveProfile(updated);
    setIsAuthenticated(true);
    return true;
  };

  const register = async (name: string, email: string, _password?: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase && _password) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password: _password,
          options: {
            data: { full_name: name }
          }
        });
        if (error) {
          console.error('Supabase sign-up error:', error.message);
          return false;
        }
      } catch (err) {
        console.error(err);
      }
    }

    const updated: UserProfile = {
      ...user,
      id: `student-${Date.now()}`,
      name,
      email,
      completedLessons: [],
      quizAttempts: {},
      weakTopics: [],
      totalXp: 100,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    setUser(updated);
    saveProfile(updated);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(console.error);
    }
    const guest = { ...DEFAULT_GUEST_PROFILE };
    setUser(guest);
    saveProfile(guest);
    setIsAuthenticated(false);
  };

  const guestLogin = () => {
    const guest = { ...DEFAULT_GUEST_PROFILE };
    setUser(guest);
    saveProfile(guest);
    setIsAuthenticated(true);
  };

  const selectCourse = (courseId: CourseId) => {
    const updated = switchCourseStorage(courseId);
    setUser(updated);
  };

  const completeLesson = (lessonId: string, xp: number) => {
    const updated = recordLessonStorage(lessonId, xp);
    setUser(updated);
  };

  const submitQuizAttempt = (attempt: QuizAttempt, earnedXp: number) => {
    const updated = recordQuizStorage(attempt, earnedXp);
    setUser(updated);
  };

  const submitExercisePassed = (xp: number) => {
    const updated = recordExerciseStorage(xp);
    setUser(updated);
  };

  const updateProfileName = (name: string) => {
    const updated = { ...user, name };
    setUser(updated);
    saveProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isSupabaseConnected: isSupabaseConfigured,
        login,
        register,
        logout,
        guestLogin,
        selectCourse,
        completeLesson,
        submitQuizAttempt,
        submitExercisePassed,
        updateProfileName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { COURSES, getLessonsForCourse } from './data/coursesData';
import type { CourseId } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { CourseSelection } from './components/CourseSelection';
import { RoadmapView } from './components/RoadmapView';
import { LessonView } from './components/LessonView';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

type ViewMode = 'dashboard' | 'courses' | 'roadmap' | 'lesson';

const MainContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeLessonId]);

  const currentCourse = COURSES.find(c => c.id === user.enrolledCourseId) || COURSES[0];
  const currentLessons = getLessonsForCourse(user.enrolledCourseId);

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
  };

  const handleSelectCourse = (_courseId: CourseId) => {
    // AuthContext automatically updates user.enrolledCourseId
    setCurrentView('roadmap');
  };

  const handleContinueLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
  };

  const activeLesson = currentLessons.find(l => l.id === activeLessonId) || currentLessons[0];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex flex-col pb-20 md:pb-8 selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentCourse={currentCourse}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'dashboard' && (
          <Dashboard
            currentCourse={currentCourse}
            lessons={currentLessons}
            onContinueLesson={handleContinueLesson}
            onOpenRoadmap={() => setCurrentView('roadmap')}
            onOpenCourseCatalog={() => setCurrentView('courses')}
          />
        )}

        {currentView === 'courses' && (
          <CourseSelection
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView
            course={currentCourse}
            lessons={currentLessons}
            onSelectLesson={handleSelectLesson}
            onChangeCourse={() => setCurrentView('courses')}
          />
        )}

        {currentView === 'lesson' && activeLesson && (
          <LessonView
            lesson={activeLesson}
            allLessons={currentLessons}
            onBack={() => setCurrentView('roadmap')}
            onNavigateLesson={(id) => setActiveLessonId(id)}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenCourses={() => setCurrentView('courses')}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* PWA Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

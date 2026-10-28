import React from 'react';
import { LayoutDashboard, BookOpen, Compass, User } from 'lucide-react';

interface BottomNavProps {
  currentView: 'dashboard' | 'courses' | 'roadmap' | 'lesson';
  onNavigate: (view: 'dashboard' | 'courses' | 'roadmap') => void;
  onOpenProfile: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenProfile
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-navy-dark/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-xl transition ${
          currentView === 'dashboard'
            ? 'text-purple-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px]">Dashboard</span>
      </button>

      <button
        onClick={() => onNavigate('roadmap')}
        className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-xl transition ${
          currentView === 'roadmap' || currentView === 'lesson'
            ? 'text-purple-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span className="text-[10px]">Roadmap</span>
      </button>

      <button
        onClick={() => onNavigate('courses')}
        className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-xl transition ${
          currentView === 'courses'
            ? 'text-purple-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px]">Courses</span>
      </button>

      <button
        onClick={onOpenProfile}
        className="flex flex-col items-center space-y-1 py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200 transition"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Profile</span>
      </button>
    </div>
  );
};

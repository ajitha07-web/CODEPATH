import React from 'react';
import type { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Code2, 
  Flame, 
  Trophy, 
  ChevronDown, 
  Compass, 
  LayoutDashboard, 
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentCourse: Course;
  currentView: 'dashboard' | 'courses' | 'roadmap' | 'lesson';
  onNavigate: (view: 'dashboard' | 'courses' | 'roadmap') => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCourse,
  currentView,
  onNavigate,
  onOpenProfile,
  onOpenAuth
}) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-brand-navy-dark/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2.5 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                Code<span className="text-purple-400">Path</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-mono">
                Daily Coding Mastery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-800">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'dashboard'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('roadmap')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'roadmap'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'courses'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>All Courses</span>
            </button>
          </nav>
        </div>

        {/* Right Section: Course Badge, Streaks, XP, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Course Switcher Dropdown */}
          <button
            onClick={() => onNavigate('courses')}
            className="hidden sm:flex items-center space-x-1.5 text-xs bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-purple-500/50 transition group"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-slate-200 font-medium max-w-[130px] truncate">
              {currentCourse.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
          </button>

          {/* Streak Counter */}
          <div className="flex items-center space-x-1 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
            <span>{user.streakDays}d</span>
          </div>

          {/* Total Points */}
          <div className="flex items-center space-x-1 bg-purple-950/40 border border-purple-800/40 px-2.5 py-1.5 rounded-xl text-xs font-bold text-purple-300 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>{user.totalXp} XP</span>
          </div>

          {/* User Profile or Login */}
          {isAuthenticated ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 pl-2 border-l border-slate-800 focus:outline-none group"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-purple-500/50 object-cover group-hover:border-purple-400 transition"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-200 text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden xl:inline text-xs font-semibold text-slate-200 group-hover:text-white">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-lg shadow-purple-900/30"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

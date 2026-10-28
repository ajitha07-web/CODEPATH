import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../data/coursesData';
import { 
  X, 
  Mail, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  LogOut, 
  Database, 
  Edit2, 
  Check 
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCourses: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenCourses }) => {
  const { user, logout, isSupabaseConnected, updateProfileName } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  if (!isOpen) return null;

  const currentCourse = COURSES.find(c => c.id === user.enrolledCourseId) || COURSES[0];

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateProfileName(nameInput.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-navy-card border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl border-2 border-purple-500 object-cover shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-slate-900 border border-purple-500 text-white text-sm px-2.5 py-1 rounded-lg focus:outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-purple-400"
                  title="Edit Name"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" /> {user.email}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="text-center">
            <span className="text-xs text-slate-400 block">Streak</span>
            <span className="text-base font-bold text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-current" /> {user.streakDays}d
            </span>
          </div>

          <div className="text-center border-x border-slate-800">
            <span className="text-xs text-slate-400 block">Total XP</span>
            <span className="text-base font-bold text-purple-300 flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4" /> {user.totalXp}
            </span>
          </div>

          <div className="text-center">
            <span className="text-xs text-slate-400 block">Completed</span>
            <span className="text-base font-bold text-emerald-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {user.completedLessons.length}
            </span>
          </div>
        </div>

        {/* Current Enrolled Course */}
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Active Track
          </span>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">{currentCourse.title}</h4>
              <p className="text-xs text-slate-400">{currentCourse.duration}</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenCourses();
              }}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              Change Track
            </button>
          </div>
        </div>

        {/* Supabase Status Indicator */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300">Database Engine:</span>
          </div>
          {isSupabaseConnected ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Supabase Live
            </span>
          ) : (
            <span className="flex items-center gap-1 text-purple-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Local Storage (Sync Ready)
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

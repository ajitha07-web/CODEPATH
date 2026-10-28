import React from 'react';
import type { Course, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { getWeeklyActivity, INITIAL_BADGES } from '../services/storage';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Calendar, 
  Target, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Trophy,
  Footprints,
  Terminal,
  Crown,
  Layers
} from 'lucide-react';

interface DashboardProps {
  currentCourse: Course;
  lessons: Lesson[];
  onContinueLesson: (lessonId: string) => void;
  onOpenRoadmap: () => void;
  onOpenCourseCatalog: () => void;
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  Footprints: <Footprints className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />
};

export const Dashboard: React.FC<DashboardProps> = ({
  currentCourse,
  lessons,
  onContinueLesson,
  onOpenRoadmap,
  onOpenCourseCatalog
}) => {
  const { user } = useAuth();
  const weeklyData = getWeeklyActivity();

  // Calculate statistics
  const completedCount = lessons.filter(l => user.completedLessons.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / (lessons.length || 1)) * 100);

  // Determine today's topic / next unfinished lesson
  const currentUnfinished = lessons.find(l => !user.completedLessons.includes(l.id)) || lessons[0];

  // Milestone countdown (Days 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 90)
  const milestoneDays = [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 90];
  const nextMilestoneDay = milestoneDays.find(d => d >= currentUnfinished.dayNumber) || 90;
  const daysUntilMilestone = nextMilestoneDay - currentUnfinished.dayNumber;

  // Calculate average quiz score
  const quizScores = Object.values(user.quizAttempts).map(q => q.percentage);
  const avgQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((acc, curr) => acc + curr, 0) / quizScores.length)
    : 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-navy-card via-purple-950/30 to-brand-navy-dark border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Active Student Dashboard
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                Enrolled in: <strong className="text-slate-200">{currentCourse.title}</strong>
                <button
                  onClick={onOpenCourseCatalog}
                  className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 ml-1"
                >
                  Change
                </button>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {user.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Consistent daily practice is the fastest path to software engineering mastery. You're on a <strong className="text-amber-400 font-semibold">{user.streakDays}-day streak</strong>!
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Streak Counter Pill */}
            <div className="bg-amber-950/40 border border-amber-800/40 rounded-2xl px-5 py-3 flex items-center space-x-3 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-2xl font-black text-amber-300 block leading-tight">
                  {user.streakDays}
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider">
                  Day Streak
                </span>
              </div>
            </div>

            {/* Total XP Pill */}
            <div className="bg-purple-950/40 border border-purple-800/40 rounded-2xl px-5 py-3 flex items-center space-x-3 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-purple-300 block leading-tight">
                  {user.totalXp}
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-400/80 tracking-wider">
                  Total XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-brand-navy-card/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Course Progress</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{progressPercent}%</span>
            <span className="text-xs text-slate-400">completed</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-brand-navy-card/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Completed Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{completedCount}</span>
            <span className="text-xs text-slate-400">/ {lessons.length} days</span>
          </div>
          <p className="text-[11px] text-emerald-400/90 font-medium">
            {lessons.length - completedCount} days remaining in track
          </p>
        </div>

        <div className="bg-brand-navy-card/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Quiz Accuracy</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{avgQuizScore}%</span>
            <span className="text-xs text-slate-400">average</span>
          </div>
          <p className="text-[11px] text-amber-400/90 font-medium">
            {Object.keys(user.quizAttempts).length} quizzes submitted
          </p>
        </div>

        <div className="bg-brand-navy-card/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Badges Unlocked</span>
            <Trophy className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{user.badges.length}</span>
            <span className="text-xs text-slate-400">/ {INITIAL_BADGES.length} badges</span>
          </div>
          <p className="text-[11px] text-indigo-400/90 font-medium">
            Keep leveling up your skills
          </p>
        </div>
      </div>

      {/* 90-Day Weekly Milestone Notification Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              Upcoming 90-Day Milestone: Day {nextMilestoneDay} Weekly Aptitude Exam
            </h4>
            <p className="text-[11px] text-slate-300">
              {daysUntilMilestone === 0
                ? "You've reached today's milestone exam! 20 challenging aptitude questions await."
                : `${daysUntilMilestone} day${daysUntilMilestone === 1 ? '' : 's'} away from this week's milestone revision assessment.`}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRoadmap}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md shadow-amber-950/50"
        >
          View 90-Day Milestones
        </button>
      </div>

      {/* Middle Row: Today's Lesson Hero & Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Recommended Lesson (2 Cols) */}
        <div className="lg:col-span-2 bg-brand-navy-card border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
                Today's Target • Day {currentUnfinished.dayNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentUnfinished.estimatedMinutes} mins
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {currentUnfinished.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentUnfinished.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Concept</span>
                <span className="text-slate-200 font-medium truncate block">{currentUnfinished.topic}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Practice</span>
                <span className="text-cyan-300 font-medium">Interactive Runner</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Reward</span>
                <span className="text-purple-300 font-semibold">+{currentUnfinished.xpReward} XP</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 mt-6">
            <button
              onClick={() => onContinueLesson(currentUnfinished.id)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-purple-900/30 transition flex items-center space-x-2 active:scale-95"
            >
              <span>Continue Day {currentUnfinished.dayNumber} Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenRoadmap}
              className="text-xs text-slate-400 hover:text-white transition font-medium flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View Full Daily Roadmap</span>
            </button>
          </div>
        </div>

        {/* Weekly Study Activity Chart (1 Col) */}
        <div className="bg-brand-navy-card border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Weekly Activity
              </h3>
              <span className="text-[11px] text-slate-400">Current Week</span>
            </div>

            {/* Mon-Sun Bar Visualizer */}
            <div className="grid grid-cols-7 gap-2 pt-4 pb-2 items-end h-40">
              {weeklyData.map((item, idx) => {
                const heightPercent = Math.min(100, Math.max(15, (item.xpEarned / 120) * 100));
                return (
                  <div key={idx} className="flex flex-col items-center justify-end h-full group">
                    <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono">
                      {item.xpEarned}
                    </div>
                    <div className="w-full bg-slate-800 rounded-lg overflow-hidden flex items-end h-28">
                      <div
                        className={`w-full rounded-lg transition-all duration-500 ${
                          item.active
                            ? 'bg-gradient-to-t from-purple-600 to-indigo-400 group-hover:from-purple-500 group-hover:to-indigo-300'
                            : 'bg-slate-700/40'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold mt-2 ${
                      item.active ? 'text-purple-300' : 'text-slate-500'
                    }`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              Streak: {user.streakDays} Days Active
            </span>
            <span className="text-emerald-400 font-semibold">+80 XP today</span>
          </div>
        </div>
      </div>

      {/* Weak Areas & Revision Recommendations */}
      <div className="bg-brand-navy-card border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Weak Topic Analysis & Recommended Revision
              </h3>
              <p className="text-xs text-slate-400">
                Automatically diagnosed based on your quiz answers and test cases
              </p>
            </div>
          </div>
        </div>

        {user.weakTopics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {user.weakTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-400 block mb-0.5">
                    Needs Attention
                  </span>
                  <span className="text-slate-200 font-medium">{topic}</span>
                </div>
                <button
                  onClick={onOpenRoadmap}
                  className="px-3 py-1.5 bg-rose-900/40 hover:bg-rose-800/60 text-rose-200 font-semibold rounded-lg transition"
                >
                  Revise
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-4 flex items-center space-x-3 text-xs text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Great job!</strong> No weak topics detected. You currently maintain a solid grasp over all completed material.
            </span>
          </div>
        )}
      </div>

      {/* Badges & Achievements Section */}
      <div className="bg-brand-navy-card border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            Badges & Milestones
          </h3>
          <span className="text-xs text-slate-400">
            {user.badges.length} of {INITIAL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {INITIAL_BADGES.map((badge) => {
            const isUnlocked = user.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-between space-y-2 ${
                  isUnlocked
                    ? 'bg-purple-950/30 border-purple-500/40 text-purple-200 shadow-lg shadow-purple-950/20'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isUnlocked ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'bg-slate-800 text-slate-600'
                }`}>
                  {BADGE_ICONS[badge.icon] || <Award className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="text-xs font-bold truncate text-white">{badge.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                    {badge.description}
                  </p>
                </div>

                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  isUnlocked ? 'bg-purple-900/60 text-purple-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import type { Course, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Play, 
  Clock, 
  Award, 
  Sparkles, 
  Code, 
  HelpCircle,
  Search
} from 'lucide-react';

interface RoadmapViewProps {
  course: Course;
  lessons: Lesson[];
  onSelectLesson: (lessonId: string) => void;
  onChangeCourse: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  course,
  lessons,
  onSelectLesson,
  onChangeCourse
}) => {
  const { user } = useAuth();
  const [allowFreeExploration, setAllowFreeExploration] = useState<boolean>(true);
  const [activePhase, setActivePhase] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'weekly'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const completedCount = lessons.filter(l => user.completedLessons.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / (lessons.length || 1)) * 100);

  // Filter lessons based on Phase and Search Query
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      // Phase Filter
      if (activePhase === 'phase1' && (lesson.dayNumber < 1 || lesson.dayNumber > 30)) return false;
      if (activePhase === 'phase2' && (lesson.dayNumber < 31 || lesson.dayNumber > 60)) return false;
      if (activePhase === 'phase3' && (lesson.dayNumber < 61 || lesson.dayNumber > 90)) return false;
      if (activePhase === 'weekly' && lesson.dayNumber % 7 !== 0 && lesson.dayNumber !== 90) return false;

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDay = `day ${lesson.dayNumber}`.includes(query) || `${lesson.dayNumber}` === query;
        const matchesTitle = lesson.title.toLowerCase().includes(query);
        const matchesTopic = lesson.topic.toLowerCase().includes(query);
        const matchesSummary = lesson.summary.toLowerCase().includes(query);
        if (!matchesDay && !matchesTitle && !matchesTopic && !matchesSummary) {
          return false;
        }
      }

      return true;
    });
  }, [lessons, activePhase, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Course Roadmap Hero */}
      <div className="bg-gradient-to-r from-brand-navy-card via-purple-950/20 to-brand-navy-dark border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider bg-purple-600/30 text-purple-300 border border-purple-500/40 px-3 py-1 rounded-full">
                {course.category}
              </span>
              <span className="text-xs text-slate-400">
                {course.duration} • {lessons.length} Modules & 1,800 Aptitude Questions
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {course.title} Roadmap
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {course.description}
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={onChangeCourse}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4"
              >
                Switch Track / Browse Other Courses →
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-brand-navy-dark/90 border border-slate-800 p-5 rounded-2xl min-w-[240px] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Curriculum Progress</span>
              <span className="font-bold text-purple-400">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>{completedCount} of {lessons.length} Days Complete</span>
              <span>{completedCount * 150} XP Earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Filters & Search Bar */}
      <div className="bg-brand-navy-card/80 border border-slate-800 p-4 rounded-2xl space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by day number (e.g. Day 14), topic, or algorithm (e.g. Dynamic Programming, Trees, Docker)..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 text-white text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none transition"
          />
        </div>

        {/* Phase Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setActivePhase('all')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activePhase === 'all'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All 90 Days
            </button>

            {lessons.length >= 30 && (
              <>
                <button
                  onClick={() => setActivePhase('phase1')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activePhase === 'phase1'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Phase 1 (Days 1–30)
                </button>

                <button
                  onClick={() => setActivePhase('phase2')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activePhase === 'phase2'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Phase 2 (Days 31–60)
                </button>

                <button
                  onClick={() => setActivePhase('phase3')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activePhase === 'phase3'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Phase 3 (Days 61–90)
                </button>

                <button
                  onClick={() => setActivePhase('weekly')}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
                    activePhase === 'weekly'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-amber-950/30 text-amber-300 hover:bg-amber-900/40 border border-amber-800/40'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Weekly Milestone Tests (13)</span>
                </button>
              </>
            )}
          </div>

          {/* Unlock Mode Toggle */}
          <button
            onClick={() => setAllowFreeExploration(!allowFreeExploration)}
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition"
          >
            {allowFreeExploration ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exploration Mode: <strong>All Unlocked</strong></span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Strict Mode: <strong>Sequential Unlock</strong></span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Showing Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filteredLessons.length} of {lessons.length} daily curriculum modules</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-purple-400 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Daily Roadmap Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-indigo-500 before:to-slate-800">
        {filteredLessons.map((lesson) => {
          const isCompleted = user.completedLessons.includes(lesson.id);
          const isPreviousCompleted = lesson.dayNumber === 1 || user.completedLessons.includes(`dsa-day-${lesson.dayNumber - 1}`) || user.completedLessons.includes(`${lesson.courseId}-day-${lesson.dayNumber - 1}`);
          const isLocked = !allowFreeExploration && !isPreviousCompleted && !isCompleted;
          const isCurrent = !isCompleted && isPreviousCompleted;
          const quizAttempt = user.quizAttempts[lesson.quiz.id];
          const isWeeklyTest = lesson.dayNumber % 7 === 0 || lesson.dayNumber === 90;

          return (
            <div
              key={lesson.id}
              className={`relative group rounded-2xl border transition-all duration-300 ${
                isWeeklyTest
                  ? isCompleted
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-950/20'
                    : 'bg-brand-navy-card border-amber-500/60 shadow-xl shadow-amber-950/30'
                  : isCompleted
                  ? 'bg-brand-navy-card/70 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : isCurrent
                  ? 'bg-brand-navy-card border-purple-500 shadow-xl shadow-purple-950/30'
                  : isLocked
                  ? 'bg-brand-navy-dark/60 border-slate-800/60 opacity-60'
                  : 'bg-brand-navy-card/60 border-slate-800 hover:border-purple-500/50'
              }`}
            >
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-9 sm:-left-11 top-6 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                  isWeeklyTest
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/50 ring-4 ring-amber-950'
                    : isCompleted
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/40 ring-4 ring-emerald-950'
                    : isCurrent
                    ? 'bg-purple-600 text-white shadow-purple-600/50 ring-4 ring-purple-950 animate-pulse'
                    : isLocked
                    ? 'bg-slate-800 text-slate-500 ring-4 ring-slate-950'
                    : 'bg-slate-700 text-slate-200 ring-4 ring-slate-950'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[3]" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : (
                  <span>{lesson.dayNumber}</span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isWeeklyTest
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-900 border-slate-800 text-purple-400'
                    }`}>
                      Day {lesson.dayNumber}
                    </span>

                    <span className="text-xs text-slate-400 font-medium">
                      {lesson.topic}
                    </span>

                    {isWeeklyTest && (
                      <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Weekly Milestone Exam
                      </span>
                    )}

                    {quizAttempt && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        quizAttempt.passed
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                          : 'bg-rose-950/60 text-rose-300 border-rose-800/40'
                      }`}>
                        Aptitude: {quizAttempt.score}/{quizAttempt.totalQuestions} ({quizAttempt.percentage}%)
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition">
                    {lesson.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {lesson.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      {lesson.estimatedMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      +{lesson.xpReward} XP
                    </span>
                    <span className="flex items-center gap-1 text-purple-300 font-medium">
                      <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                      20 Aptitude Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-cyan-400" />
                      Code Practice
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
                  <button
                    onClick={() => !isLocked && onSelectLesson(lesson.id)}
                    disabled={isLocked}
                    className={`flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
                      isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : isWeeklyTest
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-950/40'
                        : isCurrent
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-950/40'
                        : isLocked
                        ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
                        : 'bg-slate-800 hover:bg-purple-600 text-white border border-slate-700'
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Review Day {lesson.dayNumber}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isWeeklyTest ? 'Take Weekly Exam' : 'Start Day ' + lesson.dayNumber}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

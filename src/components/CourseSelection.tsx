import React from 'react';
import type { CourseId } from '../types';
import { COURSES } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { 
  Binary, 
  Layers, 
  Server, 
  Coffee, 
  Code2, 
  Clock, 
  Calendar, 
  Sparkles, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface CourseSelectionProps {
  onSelectCourse: (courseId: CourseId) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Binary: <Binary className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Coffee: <Coffee className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />
};

export const CourseSelection: React.FC<CourseSelectionProps> = ({ onSelectCourse }) => {
  const { user, selectCourse } = useAuth();

  const handleEnroll = (courseId: CourseId) => {
    selectCourse(courseId);
    onSelectCourse(courseId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Choose Your Daily Learning Journey
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Select Your Coding Pathway
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Structured, daily bite-sized curriculums built from the ground up with deep explanations, interactive code playgrounds, and automated quizzes.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => {
          const isEnrolled = user.enrolledCourseId === course.id;

          return (
            <div
              key={course.id}
              className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between p-6 relative group overflow-hidden ${
                isEnrolled
                  ? 'bg-brand-navy-card border-purple-500 shadow-2xl shadow-purple-950/40 ring-1 ring-purple-500/50'
                  : 'bg-brand-navy-card/60 border-slate-800 hover:border-slate-700 hover:bg-brand-navy-card hover:-translate-y-1'
              }`}
            >
              {/* Background gradient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition" />

              <div className="space-y-4 relative z-10">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${course.color} shadow-lg`}>
                    {ICON_MAP[course.icon] || <Code2 className="w-6 h-6" />}
                  </div>

                  <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${
                    course.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    course.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  }`}>
                    {course.level}
                  </span>
                </div>

                {/* Course Title & Summary */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                {/* Course Metadata Pills */}
                <div className="flex items-center space-x-4 text-xs text-slate-400 py-1 border-y border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {course.totalDays} Days
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    {course.duration}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-900 border border-slate-800/80 text-slate-400 px-2.5 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 relative z-10">
                <button
                  onClick={() => handleEnroll(course.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-lg ${
                    isEnrolled
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>Current Path (Resume)</span>
                    </>
                  ) : (
                    <>
                      <span>Enroll in Track</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

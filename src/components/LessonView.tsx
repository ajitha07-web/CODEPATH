import React, { useState } from 'react';
import type { Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { CodeEditor } from './CodeEditor';
import { QuizRunner } from './QuizRunner';
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonViewProps {
  lesson: Lesson;
  allLessons: Lesson[];
  onBack: () => void;
  onNavigateLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  lesson, 
  allLessons, 
  onBack, 
  onNavigateLesson 
}) => {
  const { user, completeLesson, submitQuizAttempt, submitExercisePassed } = useAuth();
  const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'practice' | 'quiz'>('theory');
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  const isCompleted = user.completedLessons.includes(lesson.id);
  const quizAttempt = user.quizAttempts[lesson.quiz.id];

  const handleCopyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleMarkComplete = () => {
    completeLesson(lesson.id, lesson.xpReward);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const currentIdx = allLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Roadmap</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="flex items-center text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
            {lesson.estimatedMinutes} mins
          </span>

          <span className="flex items-center text-xs text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3 py-1.5 rounded-full font-semibold">
            <Award className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
            +{lesson.xpReward} XP
          </span>

          {isCompleted && (
            <span className="flex items-center text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-full font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completed
            </span>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-brand-navy-card to-brand-navy-dark border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
              Day {lesson.dayNumber}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Topic: {lesson.topic}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            {lesson.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lesson.summary}
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-800 space-x-1 sm:space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'theory'
              ? 'border-purple-500 text-purple-400 bg-purple-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Theory & Core Concepts</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'code'
              ? 'border-purple-500 text-purple-400 bg-purple-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>2. Code Walkthroughs</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'practice'
              ? 'border-purple-500 text-purple-400 bg-purple-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>3. Interactive Code Exercise</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'quiz'
              ? 'border-purple-500 text-purple-400 bg-purple-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>4. Daily Aptitude Exam (20 Qs)</span>
          {quizAttempt && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ml-1 font-bold ${
              quizAttempt.passed ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50' : 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
            }`}>
              {quizAttempt.score}/{quizAttempt.totalQuestions} ({quizAttempt.percentage}%)
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Theory Content */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          <div className="bg-brand-navy-card/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              Lesson Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lesson.content.overview}
            </p>
          </div>

          {/* Real World Analogy Callout */}
          {lesson.content.realWorldAnalogy && (
            <div className="bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-800/30 rounded-2xl p-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Real-World Mental Model
              </h4>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "{lesson.content.realWorldAnalogy}"
              </p>
            </div>
          )}

          {/* Key Concepts List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Key Concepts & Principles</h3>
            {lesson.content.keyConcepts.map((concept, idx) => (
              <div key={idx} className="bg-brand-navy-card border border-slate-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-base font-bold text-purple-300">
                  {idx + 1}. {concept.title}
                </h4>
                <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {concept.body}
                </div>

                {concept.code && (
                  <div className="relative mt-3 rounded-xl overflow-hidden border border-slate-800 bg-[#0A0E1A]">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-400 font-mono">
                      <span>{concept.language || 'javascript'}</span>
                      <button
                        onClick={() => handleCopyCode(concept.code!, idx)}
                        className="flex items-center space-x-1 hover:text-white transition"
                      >
                        {copiedCodeIdx === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                      <code>{concept.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pro Tips */}
          {lesson.content.tips && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">⚡</span> Pro Tips & Best Practices
              </h4>
              <ul className="space-y-2">
                {lesson.content.tips.map((tip, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start space-x-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Code Examples */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          <div className="bg-brand-navy-card border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-2">
              Step-by-Step Code Implementation
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Study the reference implementation below. Pay attention to edge case handling, variable naming, and algorithmic flow.
            </p>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0A0E1A]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span>reference_implementation.js</span>
                <button
                  onClick={() => handleCopyCode(lesson.exercise.starterCode, 999)}
                  className="flex items-center space-x-1 hover:text-white transition"
                >
                  {copiedCodeIdx === 999 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs sm:text-sm font-mono text-purple-200 overflow-x-auto leading-relaxed">
                <code>{lesson.exercise.starterCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Practice Workbench */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="bg-brand-navy-card/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">
              {lesson.exercise.title}
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              {lesson.exercise.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 mb-6">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px] mb-1">Input Format:</span>
                <span className="text-purple-300">{lesson.exercise.inputFormat}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px] mb-1">Output Format:</span>
                <span className="text-emerald-300">{lesson.exercise.outputFormat}</span>
              </div>
            </div>

            {/* In-Browser Code Runner */}
            <CodeEditor
              exercise={lesson.exercise}
              onPass={(xp) => submitExercisePassed(xp)}
            />
          </div>
        </div>
      )}

      {/* Tab 4: Day Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <QuizRunner
            quiz={lesson.quiz}
            onComplete={(attempt, xp) => submitQuizAttempt(attempt, xp)}
          />
        </div>
      )}

      {/* Footer Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition border border-slate-800"
        >
          ← Return to Roadmap
        </button>

        <div className="flex items-center space-x-3">
          {!isCompleted ? (
            <button
              onClick={handleMarkComplete}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Day {lesson.dayNumber} Complete (+{lesson.xpReward} XP)</span>
            </button>
          ) : (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 px-4 py-2 bg-emerald-950/30 rounded-xl border border-emerald-800/30">
              <CheckCircle2 className="w-4 h-4" /> Lesson Completed
            </span>
          )}

          {nextLesson && (
            <button
              onClick={() => {
                onNavigateLesson(nextLesson.id);
                setActiveTab('theory');
              }}
              className="flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 transition active:scale-95"
            >
              <span>Next Day {nextLesson.dayNumber}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import type { Quiz, QuizAttempt } from '../types';
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Clock, 
  Filter, 
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizRunnerProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt, earnedXp: number) => void;
  onClose?: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onComplete, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIdx] || quiz.questions[0];

  // Timer while taking quiz
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    const incorrectTopics: string[] = [];

    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      } else {
        incorrectTopics.push(q.topicTag);
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;
    // Award 15 XP per correct question + 50 bonus XP for passing (>= 70%)
    const earnedXp = correctCount * 15 + (passed ? 50 : 0);

    const attempt: QuizAttempt = {
      quizId: quiz.id,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      attemptedAt: new Date().toISOString(),
      incorrectTopicTags: Array.from(new Set(incorrectTopics))
    };

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    onComplete(attempt, earnedXp);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setSecondsElapsed(0);
    setReviewFilter('all');
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = isSubmitted
    ? quiz.questions.filter((q, idx) => selectedAnswers[idx] === q.correctAnswerIndex).length
    : 0;
  const incorrectCount = isSubmitted ? totalQuestions - correctCount : 0;
  const percentage = isSubmitted ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = isSubmitted && percentage >= quiz.passingScore;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const filteredQuestions = quiz.questions.filter((q, idx) => {
    const isCorrect = selectedAnswers[idx] === q.correctAnswerIndex;
    if (reviewFilter === 'incorrect') return !isCorrect;
    if (reviewFilter === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="bg-brand-navy-card border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded-full">
              20-Question Daily Aptitude Challenge
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {formatTime(secondsElapsed)}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">{quiz.title}</h3>
        </div>

        <div className="text-right flex items-center space-x-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Progress</span>
            <span className="text-xs font-bold text-purple-300 font-mono">
              {answeredCount}/{totalQuestions} Answered
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Question</span>
            <span className="text-sm font-bold text-white font-mono">
              {currentIdx + 1} <span className="text-slate-500">/ {totalQuestions}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Question Palette (Grid 1 to 20 for fast jumping) */}
      {!isSubmitted && (
        <div className="mb-5 bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
          <div className="flex items-center justify-between mb-2 text-[10px] uppercase font-bold text-slate-400">
            <span>Question Palette (Click to jump):</span>
            <span className="text-purple-400 font-mono">{answeredCount} of {totalQuestions} answered</span>
          </div>
          <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5">
            {quiz.questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-7 rounded-lg text-[11px] font-bold font-mono transition flex items-center justify-center ${
                    isCurrent
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-md'
                      : isAnswered
                      ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Finished Summary Screen */}
      {isSubmitted ? (
        <div className="text-center py-4">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            passed ? 'bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400' : 'bg-rose-500/10 border-2 border-rose-500 text-rose-400'
          }`}>
            {passed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
          </div>

          <h4 className="text-2xl font-bold text-white mb-1">
            {passed ? 'Aptitude Test Passed!' : 'Needs Revision & Retake'}
          </h4>
          <p className="text-sm text-slate-300 mb-4">
            You scored <strong className={passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{percentage}%</strong> ({correctCount} out of {totalQuestions} correct) in <span className="font-mono text-purple-300">{formatTime(secondsElapsed)}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="flex items-center space-x-1.5 bg-purple-950/50 border border-purple-800/50 px-4 py-1.5 rounded-xl text-xs font-semibold text-purple-200">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>+{correctCount * 15 + (passed ? 50 : 0)} XP Earned</span>
            </span>

            <span className="flex items-center space-x-1.5 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{correctCount} Correct</span>
            </span>

            <span className="flex items-center space-x-1.5 bg-rose-950/40 border border-rose-800/40 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>{incorrectCount} Incorrect</span>
            </span>
          </div>

          {/* Filter Bar for Review */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 mb-4">
            <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-purple-400" />
              Review 20 Questions & Explanations:
            </h5>

            <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  reviewFilter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All (20)
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-400'
                }`}
              >
                Incorrect ({incorrectCount})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  reviewFilter === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                Correct ({correctCount})
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="text-left space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {filteredQuestions.map((q) => {
              const originalIdx = quiz.questions.findIndex(item => item.id === q.id);
              const isCorrect = selectedAnswers[originalIdx] === q.correctAnswerIndex;
              const studentChoice = selectedAnswers[originalIdx];

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-sm transition-all ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : 'bg-rose-950/20 border-rose-800/40'
                  }`}
                >
                  <div className="flex items-start space-x-2.5 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-semibold text-white">
                        Question #{originalIdx + 1}: {q.question}
                      </span>
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-mono">
                        {q.topicTag}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Your Choice:</span>
                      <span className={isCorrect ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                        {studentChoice !== undefined ? `${String.fromCharCode(65 + studentChoice)}: ${q.options[studentChoice]}` : 'Not Answered'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Correct Answer:</span>
                      <span className="text-emerald-300 font-semibold">
                        {String.fromCharCode(65 + q.correctAnswerIndex)}: {q.options[q.correctAnswerIndex]}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 mt-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 leading-relaxed">
                    <strong className="text-purple-300 block mb-1 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                      Detailed Step-by-Step Derivation:
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-3 mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake 20-Question Exam</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-xl transition hover:opacity-95"
              >
                Done
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Active Question Display */
        <div>
          <div className="mb-5">
            <span className="text-[11px] font-mono text-purple-400 block mb-1">
              Topic: {currentQuestion.topicTag}
            </span>
            <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Options (A, B, C, D) */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-500 text-white shadow-lg shadow-purple-900/20'
                      : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Question Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="text-xs font-medium text-slate-400 hover:text-white px-3 py-2 disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Previous Question
            </button>

            <div className="flex items-center space-x-2">
              {currentIdx < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-1.5 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-900/30 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit 20-Question Exam</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

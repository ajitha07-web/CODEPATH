import React, { useState } from 'react';
import type { CodingExercise } from '../types';
import { Play, CheckCircle2, XCircle, RotateCcw, Lightbulb, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CodeEditorProps {
  exercise: CodingExercise;
  onPass: (xp: number) => void;
}

interface TestResult {
  index: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ exercise, onPass }) => {
  const [code, setCode] = useState<string>(exercise.starterCode);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [allPassed, setAllPassed] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);

  const resetCode = () => {
    setCode(exercise.starterCode);
    setTestResults(null);
    setAllPassed(false);
  };

  const runCode = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      const results: TestResult[] = [];
      let totalPassed = 0;

      try {
        // Extract function name from starter code (e.g. "function sumUpTo(n)" or "function reverseArray(arr)")
        const match = code.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
        const fnName = match ? match[1] : null;

        if (!fnName) {
          throw new Error('Could not detect a named function. Please define a named function e.g. function solution()');
        }

        // Create evaluator sandbox
        const runner = new Function(`
          ${code}
          if (typeof ${fnName} !== 'function') {
            throw new Error("${fnName} is not defined or not a function");
          }
          return ${fnName};
        `)();

        for (let i = 0; i < exercise.testCases.length; i++) {
          const tc = exercise.testCases[i];
          try {
            // Safely parse test inputs (can be single or multiple arguments)
            let args: any[];
            try {
              // Wrap with array brackets to parse comma-separated arguments
              args = JSON.parse(`[${tc.input}]`);
            } catch {
              // Fallback to single string or number
              args = [tc.input];
            }

            const rawResult = runner(...args);
            const actualStr = JSON.stringify(rawResult);
            const expectedClean = tc.expectedOutput.replace(/\s+/g, '');
            const actualClean = (actualStr ?? '').replace(/\s+/g, '');

            const isCorrect = actualClean === expectedClean;
            if (isCorrect) totalPassed++;

            results.push({
              index: i + 1,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              actualOutput: actualStr,
              passed: isCorrect
            });
          } catch (err: any) {
            results.push({
              index: i + 1,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              actualOutput: 'Error',
              passed: false,
              error: err.message || 'Execution error'
            });
          }
        }
      } catch (globalErr: any) {
        results.push({
          index: 1,
          input: 'Code compilation',
          expectedOutput: 'Valid executable JavaScript',
          actualOutput: 'Syntax / Parse Error',
          passed: false,
          error: globalErr.message || 'Execution error'
        });
      }

      setIsRunning(false);
      setTestResults(results);

      if (totalPassed === exercise.testCases.length && results.length > 0) {
        setAllPassed(true);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
        onPass(50); // Award 50 XP
      } else {
        setAllPassed(false);
      }
    }, 250);
  };

  return (
    <div className="bg-brand-navy-dark border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header bar */}
      <div className="bg-brand-navy-card/80 border-b border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-purple-400 font-medium px-2 py-0.5 bg-purple-950/60 rounded border border-purple-800/40">
            solution.js
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
            exercise.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
            exercise.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {exercise.difficulty}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {exercise.hints && exercise.hints.length > 0 && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-xs flex items-center space-x-1 text-slate-400 hover:text-amber-300 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
              title="Show Hints"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHints ? 'Hide Hints' : 'Hints'}</span>
            </button>
          )}

          <button
            onClick={resetCode}
            className="text-xs flex items-center space-x-1 text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
            title="Reset Starter Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition shadow-lg shadow-purple-900/30 active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Evaluating...' : 'Run & Test'}</span>
          </button>
        </div>
      </div>

      {/* Hints Banner */}
      {showHints && exercise.hints && (
        <div className="bg-amber-950/40 border-b border-amber-800/30 px-5 py-3 text-xs text-amber-200/90">
          <p className="font-semibold mb-1 flex items-center gap-1.5 text-amber-400">
            <Lightbulb className="w-4 h-4" /> Exercise Hints:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {exercise.hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Code Editor Textarea */}
      <div className="relative font-mono text-sm min-h-[220px]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-full min-h-[220px] bg-transparent text-purple-100 font-mono text-sm p-4 outline-none resize-y selection:bg-purple-800/40 leading-relaxed border-none focus:ring-0"
          placeholder="// Type your code solution here..."
        />
      </div>

      {/* Test Cases & Results Section */}
      <div className="border-t border-slate-800 bg-[#0B101E] p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Test Case Evaluation
          </h4>
          {allPassed && (
            <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full animate-bounce">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> All Test Cases Passed! (+50 XP)
            </span>
          )}
        </div>

        {/* Results List */}
        {testResults ? (
          <div className="space-y-2">
            {testResults.map((tr) => (
              <div
                key={tr.index}
                className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                  tr.passed
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {tr.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span className="font-semibold">
                      Test Case #{tr.index}: {tr.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  <span className="text-[11px] opacity-70">
                    Input: {tr.input}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Expected:</span>
                    <code className="text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded block truncate">
                      {tr.expectedOutput}
                    </code>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Your Output:</span>
                    <code className={`${tr.passed ? 'text-emerald-300' : 'text-rose-300'} bg-slate-900/60 px-2 py-0.5 rounded block truncate`}>
                      {tr.actualOutput || (tr.error ? `Error: ${tr.error}` : 'undefined')}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs font-mono bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
            Click "Run & Test" to evaluate your solution against {exercise.testCases.length} automated test cases.
          </div>
        )}
      </div>
    </div>
  );
};

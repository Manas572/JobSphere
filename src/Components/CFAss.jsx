import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2, Trophy } from 'lucide-react';
import { useInterviewStore, PROBLEMS } from '../store';
const fmt = (s) =>
  [s / 3600, (s % 3600) / 60, s % 60].map((v) => String(Math.floor(v)).padStart(2, '0')).join(':');

const CFAssessment = () => {
  const { cf, passProblem, nextRound } = useInterviewStore();
  const [seconds, setSeconds] = useState(2 * 60 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const done = cf.problemIndex >= PROBLEMS.length;
  const p = PROBLEMS[Math.min(cf.problemIndex, PROBLEMS.length - 1)];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur p-6 md:p-8"
      >
        {/* sticky timer */}
        <div className="sticky top-0 z-10 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 px-6 md:px-8 py-4 bg-[#0a0a10]/95 backdrop-blur border-b border-gray-800/60 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-gray-500">Time remaining</p>
          <p className="font-mono text-xl font-bold text-[#F9E8A2]">{fmt(seconds)}</p>
        </div>

        {done ? (
          <div className="text-center py-10">
            <Trophy className="w-10 h-10 text-[#F9E8A2] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white">Round 2 complete</h2>
            <p className="text-sm text-gray-400 mt-2">All problems cleared for {cf.handle}.</p>
            <button
              onClick={nextRound}
              className="mt-6 bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              Continue to Round 3
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Problem {p.n} of {PROBLEMS.length}
            </p>
            <h2 className="text-2xl font-bold text-white mt-1">
              Problem {p.n} <span className="text-[#B4E1EB]">({p.rating} rated)</span>
            </h2>

            <a
              href="https://codeforces.com/problemset"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-[#78A4CB]/40 text-[#B4E1EB] text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#78A4CB]/10 transition"
            >
              <ExternalLink className="w-4 h-4" />
              Open on Codeforces
            </a>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin text-[#95BDD7]" />
              <span className="animate-pulse">Polling for OK submission…</span>
            </div>

            {/* dev mock controls */}
            <div className="mt-8 pt-5 border-t border-gray-800/60 flex gap-3">
              {cf.problemIndex < PROBLEMS.length - 1 ? (
                <button
                  onClick={passProblem}
                  className="text-xs text-gray-500 hover:text-gray-300 border border-gray-800 rounded-lg px-3 py-2 transition"
                >
                  dev: pass problem {p.n} → {PROBLEMS[cf.problemIndex + 1].rating}
                </button>
              ) : (
                <button
                  onClick={passProblem}
                  className="text-xs text-gray-500 hover:text-gray-300 border border-gray-800 rounded-lg px-3 py-2 transition"
                >
                  dev: finish round 2
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CFAssessment;
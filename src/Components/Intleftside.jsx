import React from 'react';
import { Brain, Code2, Layers, Lock, Check, Timer } from 'lucide-react';
import { useInterviewStore } from '../store';


const PHASES = [
  { n: 1, label: 'Core Concepts', icon: Brain },
  { n: 2, label: 'Hands-On Coding', icon: Code2 },
  { n: 3, label: 'Project Deep-Dive', icon: Layers },
];

const InterviewSidebar = () => {
  const { round, cf } = useInterviewStore();

  return (
    <aside className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-800/60 bg-[#0d0d14] p-6 flex lg:flex-col gap-6 lg:min-h-screen">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Interview</p>
        <h1 className="text-lg font-bold text-white mt-1">NextHire Session</h1>
      </div>

      <ol className="flex lg:flex-col gap-2 lg:gap-0 flex-1">
        {PHASES.map(({ n, label, icon: Icon }) => {
          const done = round > n;
          const active = round === n;
          const locked = round < n;
          return (
            <li key={n} className="flex items-center gap-3 lg:py-3">
              <div
                className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${
                  done
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : active
                      ? 'bg-[#78A4CB]/20 text-[#B4E1EB] ring-1 ring-[#78A4CB]/40'
                      : 'bg-gray-800/60 text-gray-600'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : locked ? <Lock className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="hidden lg:block">
                <p className={`text-sm font-medium ${active ? 'text-white' : locked ? 'text-gray-600' : 'text-gray-300'}`}>
                  Phase {n} · {label}
                </p>
                <p className="text-[11px] text-gray-600">
                  {done ? 'Completed' : active ? 'In progress' : 'Locked'}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {round === 2 && (
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#F9E8A2] bg-[#F9E8A2]/10 border border-[#F9E8A2]/20 rounded-xl px-3 py-2">
          <Timer className="w-3.5 h-3.5" />
          {cf.verified ? `CF: ${cf.handle}` : 'Coding round'}
        </div>
      )}
    </aside>
  );
};

export default InterviewSidebar;
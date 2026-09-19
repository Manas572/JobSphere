import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Bot } from 'lucide-react';
import { useextskills, useInterviewStore, useusedq } from '../store';
import { usegetquestion } from '../Queries/Intquestion';

const RoundOneChat = () => {
  const r1Messages = useInterviewStore((state) => state.r1Messages);
  const addMessage = useInterviewStore((state) => state.addMessage);
  const nextRound = useInterviewStore((state) => state.nextRound);
  const used_q = useusedq((state) => state.used_q);
  const addQuestion = useusedq((state) => state.addQuestion);
  const extskills = useextskills((state) => state.extskills);
  const [text, setText] = useState('');
  const difficulty = 'easy';
  const { mutate: fetchQuestion, isPending } = usegetquestion();
  const bottomRef = useRef(null);
  const skillIdxRef = useRef(0);    
  const usedQRef   = useRef(used_q); 
  const askNextRef  = useRef(null);  
  useEffect(() => { 
    usedQRef.current = used_q; 
  }, [used_q]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [r1Messages]);

  const askNext = (diff) => {
    const currentIdx = skillIdxRef.current;
    const topic = extskills[currentIdx]?.toLowerCase();
    if (!topic) { 
      nextRound(); 
      return; 
    }
    fetchQuestion(
      { topic, difficulty: diff, used_q: usedQRef.current },
      {
        onSuccess: (data) => {
          addQuestion(data.id);
          addMessage(1, { from: 'ai', text: data.question });
        },
        onError: () => {
          const next = skillIdxRef.current + 1;
          if (next >= extskills.length) {
            nextRound();
          } else {
            skillIdxRef.current = next;
            askNextRef.current(diff); 
          }
        },
      }
    );
  };
  askNextRef.current = askNext; 
  useEffect(() => {
    if (extskills.length > 0 && r1Messages.length === 0) {
      askNextRef.current(difficulty);
    }
  }, [extskills, r1Messages.length, difficulty]);

  const send = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    addMessage(1, { from: 'user', text: t });
    setText('');
    const next = skillIdxRef.current + 1;
    if (next >= extskills.length) {
      nextRound();
    } else {
      skillIdxRef.current = next;
      askNextRef.current(difficulty);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
        {r1Messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${m.from === 'user' ? 'justify-end' : ''}`}
          >
            {m.from === 'ai' && (
              <div className="size-8 rounded-lg bg-[#78A4CB]/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-[#B4E1EB]" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] font-medium'
                  : 'bg-gray-900 border border-gray-800 text-gray-200'
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {isPending && (
          <div className="flex gap-3">
            <div className="size-8 rounded-lg bg-[#78A4CB]/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-[#B4E1EB]" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-gray-900 border border-gray-800">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={send}
        className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4 flex gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Answer the question…"
          disabled={isPending}
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="size-11 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
          aria-label="Send"
        >
          <SendHorizonal className="w-4 h-4" />
        </button>
      </form>

      <button
        onClick={nextRound}
        className="fixed bottom-20 right-4 text-[10px] text-gray-700 hover:text-gray-500 border border-gray-800 rounded px-2 py-1"
      >
        dev: skip to round 2
      </button>
    </>
  );
};

export default RoundOneChat;

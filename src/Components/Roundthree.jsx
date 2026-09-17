import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Bot } from 'lucide-react';
import { useInterviewStore } from '../store';
const AI_REPLIES = [
  'Why did you choose that stack over alternatives?',
  'What was the hardest bug you hit on that project?',
  'How would you scale it to 10x the users?',
];

const RoundThreeChat = () => {
  const { r3Messages, addMessage } = useInterviewStore();
  const [text, setText] = useState('');
  const [replyIdx, setReplyIdx] = useState(0);

  const send = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    addMessage(3, { from: 'user', text: t });
    setText('');
    const idx = replyIdx;
    setTimeout(() => addMessage(3, { from: 'ai', text: AI_REPLIES[idx % AI_REPLIES.length] }), 900);
    setReplyIdx(replyIdx + 1);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
        {r3Messages.map((m, i) => (
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
      </div>

      <form onSubmit={send} className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Talk through your project…"
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors"
        />
        <button
          type="submit"
          className="size-11 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] flex items-center justify-center hover:opacity-90 transition"
          aria-label="Send"
        >
          <SendHorizonal className="w-4 h-4" />
        </button>
      </form>
    </>
  );
};

export default RoundThreeChat;
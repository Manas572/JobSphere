import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Bot, Loader2 } from 'lucide-react';
import { useInterviewStore } from '../store';
import BackendApi from '../AxiInt';

const RoundThreeChat = () => {
  const { r3Messages, addMessage } = useInterviewStore();
  const resumeContext = useInterviewStore((state) => state.resumeContext);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || r3Messages.length > 0) return;
    startedRef.current = true;
    setSending(true);
    BackendApi.post('/api/round-three', { messages: [], resume_context: resumeContext, start: true }, { timeout: 50000 })
      .then(({ data }) => addMessage(3, { from: 'ai', text: data.reply }))
      .catch((err) => setError(err.response?.data?.message || err.response?.data?.detail || 'Could not start the interview. Send a message to try again.'))
      .finally(() => setSending(false));
  }, []);

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || sending) return;
    addMessage(3, { from: 'user', text: t });
    setText('');
    setSending(true);
    setError('');
    try {
      const messages = [...r3Messages, { from: 'user', text: t }].map((message) => ({
        role: message.from === 'ai' ? 'assistant' : 'user',
        content: message.text,
      }));
      const { data } = await BackendApi.post('/api/round-three', { messages, resume_context: resumeContext }, { timeout: 50000 });
      addMessage(3, { from: 'ai', text: data.reply });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || (err.code === 'ECONNABORTED'
        ? 'The interview assistant took too long to respond. Please try again.'
        : 'Could not reach the interview assistant. Check that the backend is running, then try again.'));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
        {r3Messages.length === 0 && <p className="text-center text-sm text-gray-500">Round 3 focuses on your project architecture, technology choices, database tradeoffs, caching, Redis latency improvements, and scaling decisions.</p>}
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

      <form onSubmit={send} className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4">
        {error && <p role="alert" className="mb-2 text-sm text-rose-300">{error}</p>}
        <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Explain a design decision in your project…"
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim() || sending}
          className="size-11 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
          aria-label="Send"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
        </button>
        </div>
      </form>
    </>
  );
};

export default RoundThreeChat;

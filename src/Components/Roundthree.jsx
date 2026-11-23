import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Bot, Loader2 } from 'lucide-react';
import { useInterviewStore } from '../store';
import BackendApi from '../AxiInt';

const RoundThreeChat = () => {
  const { r3Messages, addMessage } = useInterviewStore();
  const r1Messages = useInterviewStore((state) => state.r1Messages);
  const r1Vector = useInterviewStore((state) => state.r1Vector);
  const r1Evaluation = useInterviewStore((state) => state.r1Evaluation);
  const setR1Evaluation = useInterviewStore((state) => state.setR1Evaluation);
  const resumeContext = useInterviewStore((state) => state.resumeContext);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
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
    if (!t || sending || evaluating || r1Evaluation) return;
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

  const finishInterview = async () => {
    if (sending || evaluating || r1Evaluation) return;
    setEvaluating(true);
    setError('');
    try {
      const toTranscript = (messages) => messages.map((message) => ({
        role: message.from === 'ai' ? 'assistant' : 'user',
        content: message.text,
      }));
      const { data } = await BackendApi.post('/api/evaluate-interview', {
        r1_messages: toTranscript(r1Messages),
        r3_messages: toTranscript(r3Messages),
        r1_vector: r1Vector,
        resume_context: resumeContext,
      }, { timeout: 60000 });
      setR1Evaluation(data.evaluation);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || (err.code === 'ECONNABORTED'
        ? 'The evaluation took too long. Please try again.'
        : 'Could not evaluate the interview. Check that the backend and Gemini service are available, then try again.'));
    } finally {
      setEvaluating(false);
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
        {r1Evaluation && (
          <section className="mx-auto w-full max-w-3xl rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 md:p-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-300">Interview evaluation</p>
              <h2 className="mt-1 text-xl font-bold text-white">
                {r1Evaluation.recommendation} · {r1Evaluation.overall_score}/10
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{r1Evaluation.summary}</p>
            </div>
            {[['Round 1 · Core concepts', r1Evaluation.round_one], ['Round 3 · Project deep-dive', r1Evaluation.round_three]].map(([title, round]) => (
              <div key={title} className="border-t border-gray-800 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <span className="text-sm font-semibold text-[#B4E1EB]">{round.score}/10</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{round.summary}</p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Strengths</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-300">
                      {round.strengths.map((item, index) => <li key={`${title}-strength-${index}`}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Areas to improve</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-300">
                      {round.areas_to_improve.map((item, index) => <li key={`${title}-improve-${index}`}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-800 pt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Overall strengths</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-300">
                  {r1Evaluation.strengths.map((item, index) => <li key={`overall-strength-${index}`}>{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Overall areas to improve</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-300">
                  {r1Evaluation.areas_to_improve.map((item, index) => <li key={`overall-improve-${index}`}>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      <form onSubmit={send} className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4 space-y-2">
        {error && <p role="alert" className="mb-2 text-sm text-rose-300">{error}</p>}
        <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Explain a design decision in your project…"
          disabled={sending || evaluating || Boolean(r1Evaluation)}
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || sending || evaluating || Boolean(r1Evaluation)}
          className="size-11 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
          aria-label="Send"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
        </button>
        </div>
        <button
          type="button"
          onClick={finishInterview}
          disabled={sending || evaluating || Boolean(r1Evaluation) || !r3Messages.some((message) => message.from === 'user')}
          className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15 transition-colors disabled:opacity-40"
        >
          {evaluating ? <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Evaluating Round 1 and Round 3…</span> : r1Evaluation ? 'Interview evaluated' : 'Finish interview and get evaluation'}
        </button>
      </form>
    </>
  );
};

export default RoundThreeChat;

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Loader2, SendHorizonal } from 'lucide-react';
import { useextskills, useInterviewStore } from '../store';
import { usegetquestion } from '../Queries/Intquestion';
import BackendApi from '../AxiInt';

const MAX_QUESTIONS = 10;
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const difficultyFallbacks = (preferred) => [
  preferred,
  ...DIFFICULTIES.filter((difficulty) => difficulty !== preferred),
];

const RoundOneChat = () => {
  const r1Messages = useInterviewStore((state) => state.r1Messages);
  const r1SkillIndex = useInterviewStore((state) => state.r1SkillIndex);
  const r1QuestionCount = useInterviewStore((state) => state.r1QuestionCount);
  const r1CurrentQuestion = useInterviewStore((state) => state.r1CurrentQuestion);
  const r1Finished = useInterviewStore((state) => state.r1Finished);
  const addMessage = useInterviewStore((state) => state.addMessage);
  const setR1Progress = useInterviewStore((state) => state.setR1Progress);
  const setR1CurrentQuestion = useInterviewStore((state) => state.setR1CurrentQuestion);
  const incrementR1QuestionCount = useInterviewStore((state) => state.incrementR1QuestionCount);
  const addR1QuestionId = useInterviewStore((state) => state.addR1QuestionId);
  const addR1Interaction = useInterviewStore((state) => state.addR1Interaction);
  const finishRoundOne = useInterviewStore((state) => state.finishRoundOne);
  const extskills = useextskills((state) => state.extskills);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const { mutateAsync: fetchQuestion, isPending: fetching } = usegetquestion();
  const bottomRef = useRef(null);
  const startedRef = useRef(false);
  const askNextRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [r1Messages, error, feedback]);

  const askQuestionForSkill = async (startingIndex, preferredDifficulty = 'easy') => {
    const current = useInterviewStore.getState();
    if (current.r1QuestionCount >= MAX_QUESTIONS) {
      finishRoundOne('question-limit');
      return;
    }

    setError('');
    setR1CurrentQuestion(null);

    for (let skillIndex = startingIndex; skillIndex < extskills.length; skillIndex += 1) {
      const topic = String(extskills[skillIndex] || '').trim().toLowerCase();
      if (!topic) continue;

      for (const difficulty of difficultyFallbacks(preferredDifficulty)) {
        try {
          // usegetquestion returns response.data, not the Axios response.
          const data = await fetchQuestion({
            topic,
            difficulty,
            used_q: useInterviewStore.getState().r1UsedQuestionIds,
          });

          addR1QuestionId(data.id);
          setR1Progress({ r1SkillIndex: skillIndex });
          setR1CurrentQuestion(data);
          incrementR1QuestionCount();
          addMessage(1, { from: 'ai', text: data.question });
          return;
        } catch (requestError) {
          if (requestError.response?.status === 404) continue;
          setR1Progress({ r1SkillIndex: skillIndex });
          const responseMessage = requestError.response?.data?.detail
            || requestError.response?.data?.message
            || requestError.response?.data?.error;
          setError(
            responseMessage
              || (requestError.response
                ? `Question request failed (HTTP ${requestError.response.status}). Check the backend logs.`
                : 'Could not reach the backend. Check that it is running, then retry.')
          );
          return;
        }
      }

      // No questions remain for this skill in the bank, so continue to the next skill.
      setR1Progress({
        r1SkillIndex: skillIndex + 1,
        r1ConsecutiveBad: 0,
        r1MediumCount: 0,
      });
    }

    finishRoundOne('skills-exhausted');
  };
  askNextRef.current = askQuestionForSkill;

  useEffect(() => {
    if (startedRef.current || r1Finished || !extskills.length) return;
    if (r1CurrentQuestion || r1Messages.length) return;
    startedRef.current = true;
    askNextRef.current(r1SkillIndex, 'easy');
  }, [extskills, r1CurrentQuestion, r1Finished, r1Messages.length, r1SkillIndex]);

  const send = async (event) => {
    event.preventDefault();
    const answer = text.trim();
    const question = useInterviewStore.getState().r1CurrentQuestion;
    if (!answer || !question || submitting || fetching) return;

    setSubmitting(true);
    setError('');
    setFeedback('');
    setText('');
    addMessage(1, { from: 'user', text: answer });

    let result;
    try {
      const response = await BackendApi.post('/api/round-one/grade', {
        ideal_answer: question.answer,
        user_answer: answer,
      }, { timeout: 15000 });
      result = response.data;
    } catch {
      // Continue the interview if the grading endpoint itself cannot be reached.
      result = {
        grade: 0,
        status: 'Medium - grading service unavailable; using the fallback score',
        raw_score: 0.5,
        fallback: true,
      };
    }

    const state = useInterviewStore.getState();
    const currentQuestion = state.r1CurrentQuestion || question;
    const interaction = {
      turn: state.r1Vector.length + 1,
      topic: currentQuestion.topic,
      question_id: currentQuestion.id,
      question: currentQuestion.question,
      ideal_answer: currentQuestion.answer,
      user_answer: answer,
      grade: result.grade,
      status: result.status,
      raw_score: result.raw_score,
    };
    addR1Interaction(interaction);
    setFeedback(`${result.status}${Number.isFinite(result.raw_score) ? ` · score ${Number(result.raw_score).toFixed(2)}` : ''}`);

    const badCount = result.grade === -1 ? state.r1ConsecutiveBad + 1 : 0;
    // Medium answers accumulate within a skill; a bad answer does not erase them.
    const mediumCount = result.grade === 0 ? state.r1MediumCount + 1 : state.r1MediumCount;
    const moveToNextSkill = result.grade === 1 || badCount >= 2 || mediumCount >= 3;
    const nextSkillIndex = state.r1SkillIndex + (moveToNextSkill ? 1 : 0);

    setR1Progress({
      r1SkillIndex: nextSkillIndex,
      r1ConsecutiveBad: moveToNextSkill ? 0 : badCount,
      r1MediumCount: moveToNextSkill ? 0 : mediumCount,
    });
    setR1CurrentQuestion(null);

    if (state.r1QuestionCount >= MAX_QUESTIONS) {
      finishRoundOne('question-limit');
    } else if (nextSkillIndex >= extskills.length) {
      finishRoundOne(moveToNextSkill ? 'skills-exhausted' : 'skill-pointer-exhausted');
    } else {
      const nextDifficulty = moveToNextSkill ? 'easy' : (currentQuestion.difficulty || 'easy');
      await askNextRef.current(nextSkillIndex, nextDifficulty);
    }

    setSubmitting(false);
  };

  const busy = fetching || submitting;
  const activeSkill = extskills[r1SkillIndex];

  return (
    <>
      <div className="border-b border-gray-800/60 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Round 1 · Core concepts</p>
          <p className="text-xs text-gray-500">
            {r1QuestionCount} of {MAX_QUESTIONS} questions
            {activeSkill ? ` · ${activeSkill}` : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={() => finishRoundOne('user-ended')}
          disabled={busy || r1Finished}
          className="shrink-0 rounded-lg border border-[#78A4CB]/50 px-3 py-2 text-xs font-semibold text-[#B4E1EB] hover:bg-[#78A4CB]/10 transition-colors"
        >
          Finish Round 1
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
        {!extskills.length && !r1Messages.length && (
          <p className="text-center text-sm text-gray-500">Upload a resume and extract skills to begin Round 1.</p>
        )}
        {r1Messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.from === 'user' ? 'justify-end' : ''}`}
          >
            {message.from === 'ai' && (
              <div className="size-8 rounded-lg bg-[#78A4CB]/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-[#B4E1EB]" />
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              message.from === 'user'
                ? 'bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] font-medium'
                : 'bg-gray-900 border border-gray-800 text-gray-200'
            }`}>
              {message.text}
            </div>
          </motion.div>
        ))}

        {busy && (
          <div className="flex gap-3">
            <div className="size-8 rounded-lg bg-[#78A4CB]/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-[#B4E1EB]" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-gray-900 border border-gray-800">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            </div>
          </div>
        )}
        {feedback && <p role="status" className="text-center text-xs text-gray-500">{feedback}</p>}
        {error && (
          <div className="mx-auto max-w-xl text-center">
            <p role="alert" className="text-sm text-rose-300">{error}</p>
            {!busy && !r1CurrentQuestion && extskills.length > 0 && !r1Finished && (
              <button
                type="button"
                onClick={() => askNextRef.current(r1SkillIndex, 'easy')}
                className="mt-2 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-300 hover:border-[#78A4CB]/60"
              >
                Retry loading question
              </button>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4 flex gap-2">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={r1CurrentQuestion ? 'Answer the question…' : 'Waiting for the next question…'}
          disabled={busy || !r1CurrentQuestion}
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={busy || !text.trim() || !r1CurrentQuestion}
          className="size-11 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
          aria-label="Send"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
        </button>
      </form>
    </>
  );
};

export default RoundOneChat;

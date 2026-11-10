import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useInterviewStore } from '../store';
import { getCFChallenge, getCFProfile, getCFUnsolvedProblems, verifyCFChallenge } from '../Queries/Codeforces';

const errorMessage = (error) => error.response?.data?.message || error.response?.data?.detail || error.message || 'Could not connect to the Codeforces service.';

const CFVerify = () => {
  const { cf, setCFChallenge, verifyHandle, nextRound } = useInterviewStore();
  const [handle, setHandle] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const startVerification = async (e) => {
    e.preventDefault();
    const normalizedHandle = handle.trim();
    if (!normalizedHandle) return;
    setBusy(true);
    setMessage('Checking Codeforces handle…');
    try {
      await getCFProfile(normalizedHandle);
      const { data } = await getCFChallenge();
      const challenge = data['900'];
      if (!challenge) throw new Error('No verification problem is available right now. Please try again.');
      setCFChallenge(normalizedHandle, challenge);
      setMessage('Submit this problem with a compilation error to prove you own the handle.');
    } catch (error) {
      setMessage(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const confirmChallenge = async () => {
    setBusy(true);
    setMessage('Checking your latest Codeforces submission…');
    try {
      await verifyCFChallenge(cf.handle, cf.challenge);
      const { data: problems } = await getCFUnsolvedProblems(cf.handle);
      verifyHandle(cf.handle, problems);
    } catch (error) {
      setMessage(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.form onSubmit={startVerification} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4">
      <div className="max-w-xl mx-auto flex flex-col gap-3">
        {!cf.challenge ? (
          <div className="flex gap-2">
            <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="Codeforces handle (e.g. tourist)" className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors" />
            <button type="submit" disabled={!handle.trim() || busy} className="flex items-center gap-2 bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] text-sm font-semibold px-5 rounded-xl hover:opacity-90 transition disabled:opacity-40">
              <ShieldCheck className="w-4 h-4" /> {busy ? 'Checking…' : 'Verify Handle'}
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-sm">
            <p className="text-white font-semibold">Ownership check for {cf.handle}</p>
            <a className="mt-1 inline-block text-[#B4E1EB] hover:underline" href={`https://codeforces.com/problemset/problem/${cf.challenge.contestId}/${cf.challenge.index}`} target="_blank" rel="noreferrer">
              {cf.challenge.name} · 900 rated
            </a>
            <p className="mt-2 text-gray-400">Submit this problem and make sure its latest verdict is Compilation error.</p>
            <button type="button" onClick={confirmChallenge} disabled={busy} className="mt-3 rounded-lg bg-[#78A4CB] px-4 py-2 font-semibold text-[#0a0a10] disabled:opacity-50">{busy ? 'Checking…' : 'I submitted the compilation error'}</button>
            <button type="button" onClick={() => { setCFChallenge(null, null); setMessage(''); }} className="ml-3 text-gray-400 hover:text-white">Change handle</button>
          </div>
        )}
        {message && <p role="status" className="text-xs text-gray-400">{message}</p>}
        <button type="button" onClick={nextRound} className="w-full rounded-xl border border-[#78A4CB]/50 bg-gray-900 px-5 py-3 text-base font-semibold text-[#B4E1EB] hover:bg-[#78A4CB]/15 hover:border-[#78A4CB] transition-colors">
          Skip to Round 3
        </button>
      </div>
    </motion.form>
  );
};

export default CFVerify;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useInterviewStore } from '../store';
const CFVerify = () => {
  const verifyHandle = useInterviewStore((s) => s.verifyHandle);
  const [handle, setHandle] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const h = handle.trim();
    if (h) verifyHandle(h);
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-0 border-t border-gray-800/60 bg-[#0a0a10]/90 backdrop-blur p-4"
    >
      <div className="max-w-xl mx-auto flex gap-2">
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Codeforces handle (e.g. tourist)"
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-[#78A4CB]/60 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!handle.trim()}
          className="flex items-center gap-2 bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-[#0a0a10] text-sm font-semibold px-5 rounded-xl hover:opacity-90 transition disabled:opacity-40"
        >
          <ShieldCheck className="w-4 h-4" />
          Verify Handle
        </button>
      </div>
    </motion.form>
  );
};

export default CFVerify;
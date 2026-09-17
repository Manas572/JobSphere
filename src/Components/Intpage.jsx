import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RoundOneChat from '../Components/introne';
import CFAssessment from '../Components/CFAss';
import RoundThreeChat from '../Components/Roundthree';
import CFVerify from '../Components/CFverify';
import { useInterviewStore } from '../store';
import InterviewSidebar from '../Components/Intleftside';
const InterviewPage = () => {
  const { round, cf } = useInterviewStore();

  return (
    <div className="min-h-screen bg-[#0a0a10] flex flex-col lg:flex-row text-gray-200">
      <InterviewSidebar />

      <main className="flex-1 flex flex-col h-[calc(100vh-57px)] lg:h-screen relative">
        <AnimatePresence mode="wait">
          {round === 1 && (
            <motion.div key="r1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col min-h-0">
              <RoundOneChat />
            </motion.div>
          )}

          {round === 2 && !cf.verified && (
            <motion.div key="r2-verify" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
                <div className="flex gap-3">
                  <div className="size-8 rounded-lg bg-[#78A4CB]/20 flex items-center justify-center shrink-0 mt-1">
                    {/* bot icon inline to avoid another import here */}
                    <svg className="w-4 h-4 text-[#B4E1EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8m-8 4h5m9-4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-gray-900 border border-gray-800">
                    Let's move to the coding round. Please provide your Codeforces handle to begin.
                  </div>
                </div>
              </div>
              <CFVerify />
            </motion.div>
          )}

          {round === 2 && cf.verified && (
            <motion.div key="r2-assess" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col min-h-0">
              <CFAssessment />
            </motion.div>
          )}

          {round === 3 && (
            <motion.div key="r3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col min-h-0">
              <RoundThreeChat />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default InterviewPage;
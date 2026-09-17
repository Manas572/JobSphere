import React, { useState } from 'react'

const resqs = [
  {
    question: "How do I build my resume?",
    answer: "Click 'New Resume' above, enter a title, and fill in your personal, education, and experience details.",
  },
  {
    question: "Are there different templates available?",
    answer: "Yes — choose from Classic, Modern, or Minimal ATS-friendly templates once you start your resume.",
  },
  {
    question: "Will I get a shareable link?",
    answer: "Yes, all resumes can be published and shared via a public link.",
  },
  {
    question: "Is my data saved?",
    answer: "Your progress is saved to your account automatically. You can pick up where you left off at any time.",
  },
];

const Resbelow = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full flex flex-col md:flex-row items-start gap-12 px-6 md:px-12 lg:px-24 mt-12 pb-24">
      <div className="relative w-full md:max-w-xs shrink-0">
        <img
          className="w-full rounded-2xl border border-gray-800/80 shadow-2xl shadow-black/50 object-cover"
          src="https://plus.unsplash.com/premium_photo-1661288470388-c5006797bdff?q=80&w=1170&auto=format&fit=crop"
          alt="Resume preview"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
      </div>

      <div className="w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">FAQ</p>
        <h2 className="text-2xl font-bold text-white">Common questions</h2>
        <p className="text-sm text-gray-500 mt-1.5 mb-6">Everything you need to know about the resume builder.</p>

        <div className="divide-y divide-gray-800">
          {resqs.map((q, index) => (
            <div
              key={index}
              className="py-4 cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={`text-sm font-medium transition-colors ${openIndex === index ? 'text-indigo-300' : 'text-gray-300 group-hover:text-white'}`}>
                  {q.question}
                </h3>
                <svg
                  width="16" height="16" viewBox="0 0 18 18" fill="none"
                  className={`shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                >
                  <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={`transition-all duration-200 overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100 pt-3' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-gray-400 leading-relaxed">{q.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resbelow;
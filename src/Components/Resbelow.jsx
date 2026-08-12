import React, { useState } from 'react'

const Resbelow = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const resqs = [
    {
      question: "How do I build my resume?",
      answer: "Click the 'Create Resume' button above, enter a title, and follow the prompts to fill in your personal, education, and experience details.",
    },
    {
      question: "Are there different templates available?",
      answer: "Yes, you can choose from multiple ATS-friendly templates once you start filling out your profile.",
    },
    {
      question: "Will i get deployed link?",
      answer: "Yes, all resumes can be easily deployed.",
    },
    {
      question: "Is my data saved?",
      answer: "Your progress auto-saves locally as you type, so you won't lose your work if you accidentally refresh.",
    },
  ];
  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-start gap-8 px-8 mt-8 pb-20">
      <img
        className="max-w-sm w-full rounded-xl h-auto border border-gray-800 shadow-2xl"
        src="https://plus.unsplash.com/premium_photo-1661288470388-c5006797bdff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="FAQ preview"
      />
      <div className="w-full max-w-2xl">
        <p className="text-indigo-400 text-sm font-medium">Q's</p>
        <h1 className="text-3xl font-semibold text-white">Looking for answers?</h1>
        <p className="text-sm text-gray-400 mt-2 pb-4">
          Common questions about generating your resume.
        </p>
        
        {resqs.map((q, index) => (
          <div 
            className="border-b border-gray-800 py-4 cursor-pointer" 
            key={index} 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-200">
                {q.question}
              </h3>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-transform duration-300 ease-in-out`}>
                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "opacity-100 max-h-40 pt-4" : "opacity-0 max-h-0"}`}>
              <p className="text-sm text-gray-400 max-w-md">
                {q.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resbelow
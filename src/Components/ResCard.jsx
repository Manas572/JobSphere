import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResumeCreator() {
  const navigate = useNavigate()
  const navigate = useNavigate();

  return (
    <div className="px-8 pt-6">
      <button
        onClick={() => navigate('createres/')}
        className="group text-left"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
          <svg className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <div className="px-6 md:px-12 lg:px-24 pt-10 pb-6 border-b border-gray-800/60">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1.5">Your Resumes</p>
          <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Create, customize, and export ATS-ready resumes.</p>
        </div>
        <button
          onClick={() => navigate('createres/')}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors">Create Resume</span>
      </button>
          New Resume
        </button>
      </div>
    </div>
  );
}
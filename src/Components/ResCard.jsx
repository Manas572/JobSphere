import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResumeCreator() {
  const navigate=useNavigate()
  return (
    <div className="p-8">
      <button 
        onClick={() => navigate('createres/')}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center mb-4 shadow-sm">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-gray-300 font-medium text-lg">Create Resume</span>
      </button>
    </div>
  );
}
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
    return (
        <div className="flex items-center justify-between w-full max-w-80 text-gray-400 font-medium">
            <button 
                type="button" 
                aria-label="prev" 
                onClick={onPrev}
                disabled={currentPage <= 1}
                className="rounded-full p-2 border border-white/10 hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="currentColor" stroke="currentColor" strokeWidth=".078"/>
                </svg>
            </button>
        
            <span>Page {currentPage} of {totalPages}</span>
        
            <button 
                type="button" 
                aria-label="next" 
                onClick={onNext}
                disabled={currentPage >= totalPages}
                className="rounded-full p-2 border border-white/10 hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <svg className="rotate-180" width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="currentColor" stroke="currentColor" strokeWidth=".078"/>
                </svg>
            </button>
        </div>
    );
};
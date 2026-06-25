import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function JobCard({ job }) {
    const navigate= useNavigate()
    return (
        <div className="text-sm w-full max-w-sm divide-y divide-white/10 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
            {/* Top Section: Job Details */}
            <div className="flex flex-col items-start justify-start p-6 h-56">
                <h2 className="text-xl font-semibold text-gray-100 line-clamp-1" title={job.title}>
                    {job.title}
                </h2>
                
                {/* Location */}
                <div className="flex items-center gap-1 mt-2 text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{job.location}</span>
                </div>

                {/* Salary Badge */}
                <p className="bg-green-500/10 px-3 py-1 rounded-full mt-3 text-xs font-medium text-green-400 border border-green-500/20">
                    ${job.salary}
                </p>

                {/* Description Snippet */}
                <p className="mt-4 text-gray-500 line-clamp-3">
                    {job.description}
                </p>
            </div>
            
            {/* Bottom Section: Action Buttons */}
            <div className="flex items-center divide-x divide-white/10 text-gray-400">
                <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-3 hover:text-white hover:bg-white/5 transition-all rounded-bl-xl"  onClick={() => navigate(`/jobs/${job.id}`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View Details
                </button>
                <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-3 text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-all rounded-br-xl font-medium" onClick={() => navigate(`/apply/${job.id}`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Apply Now
                </button>
            </div>
        </div>
    );
}
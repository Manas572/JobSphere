// EduCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useeduinfo } from '../Queries/Edulist';
import Wrongs from './Wrongs';

const EduCard = () => {
    const { data: eduinfo, isLoading, error, refetch } = useeduinfo(); 
    const navigate = useNavigate();
    if (isLoading) return <p className="text-zinc-400 text-sm">Loading saved education...</p>;
    if (error) return <Wrongs msg="unable to fetch edu info" onClose={refetch} />;
    if (!eduinfo?.length) return null;
    
    async function del(id) {
        // will call del api
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            {eduinfo.map((edu) => (
                <div
                    key={edu.id}
                    className="flex flex-col p-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl w-full"
                >
                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-white">
                            {edu.institution}
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                            {edu.degree} {edu.field_of_study && `- ${edu.field_of_study}`}
                        </p>
                    </div>
                    
                    <div className="flex w-full border-t border-neutral-800/50 pt-2">
                        <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all rounded-bl-lg" onClick={() => navigate(`/edu/${edu.id}`)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Edit
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all rounded-br-lg font-medium" onClick={() => del(edu.id)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EduCard;
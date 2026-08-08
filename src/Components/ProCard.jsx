import React from 'react';
import { useNavigate } from 'react-router-dom';
import Wrongs from './Wrongs';
import { useproinfo } from '../Queries/Prolist';


const ProjectCard = () => {
    const { data: projinfo, isLoading, error, refetch } = useproinfo(); 
    const navigate = useNavigate();

    if (isLoading) return <p className="text-zinc-400 text-sm">Loading saved projects...</p>;
    if (error) return <Wrongs msg="unable to fetch project info" onClose={refetch} />;
    if (!projinfo?.length) return null;

    function handleEdit(proj) {
        navigate(`/project/${proj.id}`, { state: proj });
    }
    
    async function del(id) {
        // will call del api
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            {projinfo.map((proj) => (
                <div key={proj.id} className="flex flex-col p-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl w-full">
                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-white">{proj.name}</h2>
                        <div className="flex gap-4 mt-1 text-xs text-blue-400">
                            {proj.github_link && <a href={proj.github_link} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
                            {proj.deployed_link && <a href={proj.deployed_link} target="_blank" rel="noreferrer" className="hover:underline">Live Demo</a>}
                        </div>
                    </div>
                    
                    <div className="flex w-full border-t border-neutral-800/50 pt-2">
                        <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all rounded-bl-lg" onClick={() => handleEdit(proj)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            Edit
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 w-1/2 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all rounded-br-lg font-medium" onClick={() => del(proj.id)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectCard;
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Skilldropdown from './Skilldropdown';
import { useSkillinfo } from '../Queries/Skillfetch';
import { useProUpdate } from '../Queries/Proupd';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";

const ProjectUpdateForm = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [form, setForm] = useState(state || {});
    const [techStack, setTechStack] = useState(state?.tech_stack || []);
    const [error, setError] = useState('');
    const updateProj = useProUpdate();
    const { data: availableSkills } = useSkillinfo();

    if (!state) return <p className="text-zinc-400 p-4">No data found. Please go back.</p>;

    const onCancel = () => navigate(-1);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleAddSkill = (newSkillObj) => {
        if (newSkillObj && !techStack.some(s => (s.id || s) === (newSkillObj.id || newSkillObj))) {
            setTechStack([...techStack, newSkillObj]);
        }
    };

    const removeSkill = (skillIdToRemove) => {
        setTechStack(techStack.filter(s => (s.id || s) !== skillIdToRemove));
    };

    const validate = (f) => {
        if (!f.name || !f.github_link || !f.description) return "Name, Description, and GitHub link are required.";
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate(form);
        if (err) return setError(err);
        
        const payload = { ...form, tech_stack: techStack.map(s => s.id || s) };
        updateProj.mutate({ id: form.id, formData: payload }, {
            onSuccess: () => navigate("/profile",{
                state:{step:4}
            }), 
            onError: () => setError("Failed to update project.")
        });
    };

    return (
        <div className="bg-black text-white w-full max-w-3xl">
            <h2 className="text-xl font-medium mb-6">Edit Project Details</h2>
            
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                    <label className="text-xs text-zinc-400">Project Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={form.name || ''} onChange={handleChange} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">GitHub Link <span className="text-red-500">*</span></label>
                        <input type="url" name="github_link" value={form.github_link || ''} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Deployed Link</label>
                        <input type="url" name="deployed_link" value={form.deployed_link || ''} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <label className="text-xs text-zinc-400">Tech Stack</label>
                    <Skilldropdown onSelect={handleAddSkill} />
                    
                    {techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-2 min-h-[46px]">
                            {techStack.map(skill => {
                                const skillId = skill.id || skill;
                                const matchedSkill = (availableSkills || []).find(s => s.id === skillId);
                                const displayName = matchedSkill ? matchedSkill.name : (skill.name || skill);
                                return (
                                    <span key={skillId} className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                                        {displayName}
                                        <button type="button" onClick={() => removeSkill(skillId)} className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                    <label className="text-xs text-zinc-400">Description <span className="text-red-500">*</span></label>
                    <textarea name="description" value={form.description || ''} onChange={handleChange} rows="3" className={`${inputClass} resize-none`}></textarea>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-800/50">
                    <button type="button" onClick={onCancel} className="text-zinc-400 hover:text-white font-medium text-sm py-2">Cancel</button>
                    <button type="submit" disabled={updateProj.isPending} className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-3 rounded-lg disabled:opacity-50">
                        {updateProj.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectUpdateForm;
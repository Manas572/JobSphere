import React, { useState } from 'react';
import WizardLayout from './FormLeft';
import ProjectCard from './ProjectCard';
import Skilldropdown from './Skilldropdown';
import { useProRegister } from '../Queries/Proreg';
import { useSkillinfo } from '../Queries/Skillfetch';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";
const emptyForm = { name: '', description: '', github_link: '', deployed_link: '' };

const ProjectForm = ({ onNext, onBack, step = 3 }) => {
    const [form, setForm] = useState(emptyForm);
    const [techStack, setTechStack] = useState([]);
    const [error, setError] = useState('');
    const projreg = useProRegister();
    const { data: availableSkills } = useSkillinfo();

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

    const handleSave = () => {
        const err = validate(form);
        if (err) return setError(err);
        
        const payload = { ...form, tech_stack: techStack.map(s => s.id || s) };
        projreg.mutate(payload, {
            onSuccess: () => { setForm(emptyForm); setTechStack([]); },
            onError: () => setError("Failed to save project")
        });
    };

    const handleSubmit = () => {
        if (form.name) return setError("You have unsaved changes. Save the project first, or clear the form.");
        if (onNext) onNext();
    };

    return (
        <WizardLayout step={step} title="Projects." description="Showcase your best work. Include repositories, live links, and the tech stack you used.">
            <h2 className="text-xl font-medium text-white mb-6">Project Details</h2>
            
            <div className="flex flex-col gap-6">
                <ProjectCard />

                <div className="border-t border-neutral-800 pt-6">
                    <h3 className="text-sm font-medium text-zinc-300 mb-4">Add Project</h3>
                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2.5">
                            <label className="text-xs text-zinc-400">Project Name <span className="text-red-500">*</span></label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g., E-commerce API" className={inputClass} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">GitHub Link <span className="text-red-500">*</span></label>
                                <input type="url" name="github_link" value={form.github_link} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Deployed Link</label>
                                <input type="url" name="deployed_link" value={form.deployed_link} onChange={handleChange} placeholder="https://..." className={inputClass} />
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
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="What did you build and why?" rows="3" className={`${inputClass} resize-none`}></textarea>
                        </div>

                        <div className="flex justify-start mt-2">
                            <button type="button" onClick={handleSave} disabled={projreg.isPending} className="bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-50">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> 
                                {projreg.isPending ? "Saving..." : "Save this Project"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-800/50">
                    <button type="button" onClick={onBack} className="text-zinc-400 hover:text-white font-medium text-sm py-2">← Back</button>
                    <button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-3 rounded-lg">Save & Continue</button>
                </div>
            </div>
        </WizardLayout>
    );
};

export default ProjectForm;
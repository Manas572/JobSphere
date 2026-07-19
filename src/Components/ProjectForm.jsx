import React, { useState } from 'react';
import WizardLayout from './FormLeft';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";
const emptyForm = { name: '', description: '', github_link: '', deployed_link: '', tech_stack: [] };

const ProjectForm = ({ initialData, onNext, onBack }) => {
    const [projects, setProjects] = useState(initialData || []);
    const [form, setForm] = useState(emptyForm);
    const [skillInput, setSkillInput] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const s = skillInput.trim();
            if (s && !form.tech_stack.includes(s)) setForm({ ...form, tech_stack: [...form.tech_stack, s] });
            setSkillInput('');
        }
    };

    const validate = (f) => (!f.name || !f.description || !f.github_link) ? "Name, Description, and GitHub Link are required." : null;

    const handleAdd = () => {
        const err = validate(form);
        if (err) return setError(err);
        setProjects([...projects, form]);
        setForm(emptyForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let final = [...projects];
        if (form.name || form.github_link) {
            const err = validate(form);
            if (err) return setError("Finish filling out the required fields in your draft, or clear it.");
            final.push(form);
        }
        if (onNext) onNext({ projects: final });
    };

    return (
        <WizardLayout step={4} title="Projects." description="Showcase your best work. Add your full-stack applications, problem-solving tools, and competitive programming highlights.">
            <h2 className="text-xl font-medium text-white mb-6">Technical Projects</h2>
            
            <div className="flex flex-col gap-6">
                {projects.length > 0 && (
                    <div className="flex flex-col gap-3 mb-2">
                        {projects.map((proj, idx) => (
                            <div key={idx} className="flex justify-between items-start p-4 bg-neutral-900 border border-neutral-800 rounded-xl transition-all hover:border-neutral-700 relative">
                                <div className="flex flex-col w-full pr-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium text-sm">{proj.name}</span>
                                        {proj.deployed_link && <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/20">Live</span>}
                                    </div>
                                    <span className="text-zinc-400 text-xs mt-1 line-clamp-2">{proj.description}</span>
                                    {proj.tech_stack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                                            {proj.tech_stack.map(skill => <span key={skill} className="text-[10px] bg-neutral-800 text-zinc-300 px-2 py-0.5 rounded">{skill}</span>)}
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => setProjects(projects.filter((_, i) => i !== idx))} className="text-zinc-600 hover:text-red-400 p-1 absolute top-3 right-3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M10 11V17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-neutral-800 pt-6">
                    <h3 className="text-sm font-medium text-zinc-300 mb-4">{projects.length > 0 ? "Add Another Project" : "Add Project"}</h3>
                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2.5">
                            <label className="text-xs text-zinc-400">Project Name <span className="text-red-500">*</span></label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Code Sphere" className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label className="text-xs text-zinc-400">Description <span className="text-red-500">*</span></label>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Explain what the project does..." rows="4" className={`${inputClass} resize-none`}></textarea>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">GitHub Repository URL <span className="text-red-500">*</span></label>
                                <input type="url" name="github_link" value={form.github_link} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Deployed Link (Optional)</label>
                                <input type="url" name="deployed_link" value={form.deployed_link} onChange={handleChange} placeholder="https://..." className={inputClass} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 mt-2">
                            <label className="text-xs text-zinc-400">Tech Stack / Skills (Press Enter or Comma to add)</label>
                            <div className="flex flex-wrap gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-2 focus-within:border-neutral-600 transition-colors min-h-[46px]">
                                {form.tech_stack.map(skill => (
                                    <span key={skill} className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                                        {skill}
                                        <button type="button" onClick={() => setForm({ ...form, tech_stack: form.tech_stack.filter(s => s !== skill) })} className="text-zinc-500 hover:text-red-400 cursor-pointer">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </button>
                                    </span>
                                ))}
                                <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} placeholder={!form.tech_stack.length ? "e.g. Next.js, Django, AWS..." : ""} className="flex-1 min-w-[150px] bg-transparent text-sm text-white placeholder-zinc-600 outline-none px-2 py-1" />
                            </div>
                        </div>

                        <div className="flex justify-start mt-2">
                            <button type="button" onClick={handleAdd} className="bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs px-5 py-2.5 rounded-lg flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Save this Project
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-800/50">
                    <button type="button" onClick={onBack} className="text-zinc-400 hover:text-white font-medium text-sm py-2">← Back</button>
                    <button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-3 rounded-lg">Save Profile</button>
                </div>
            </div>
        </WizardLayout>
    );
};

export default ProjectForm;
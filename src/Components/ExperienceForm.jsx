import React, { useState } from 'react';
import WizardLayout from './FormLeft';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";
const emptyForm = { company: '', designation: '', employment_type: 'FULL_TIME', location: '', start_date: '', end_date: '', currently_working: false, description: '' };

const ExperienceForm = ({ initialData, onNext, onBack }) => {
    const [experiences, setExperiences] = useState(initialData || []);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'currently_working' && checked && { end_date: '' })
        }));
        if (error) setError('');
    };

    const validate = (f) => {
        if (!f.company || !f.designation || !f.start_date) return "Company, Designation, and Start Date are required.";
        if (!f.currently_working && !f.end_date) return "Provide an end date or check 'currently working'.";
        if (!f.currently_working && f.start_date && f.end_date && f.start_date > f.end_date) return "End date cannot be before start date.";
        return null;
    };

    const handleAdd = () => {
        const err = validate(form);
        if (err) return setError(err);
        setExperiences([...experiences, form]);
        setForm(emptyForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let final = [...experiences];
        if (form.company || form.designation) {
            const err = validate(form);
            if (err) return setError("Fix draft error before continuing.");
            final.push(form);
        }
        if (onNext) onNext({ experiences: final });
    };

    return (
        <WizardLayout step={3} title="Work Experience." description="Highlight your professional background. Add your internships, part-time roles, and full-time positions.">
            <h2 className="text-xl font-medium text-white mb-6">Experience Details</h2>
            
            <div className="flex flex-col gap-6">
                {experiences.length > 0 && (
                    <div className="flex flex-col gap-3 mb-2">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="flex justify-between items-start p-4 bg-neutral-900 border border-neutral-800 rounded-xl transition-all hover:border-neutral-700">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium text-sm">{exp.designation}</span>
                                        <span className="bg-neutral-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-neutral-700 capitalize">
                                            {exp.employment_type.replace('_', ' ').toLowerCase()}
                                        </span>
                                    </div>
                                    <span className="text-zinc-400 text-xs mt-1">{exp.company} {exp.location && `• ${exp.location}`}</span>
                                    <div className="flex gap-3 mt-2 text-[10px] text-zinc-500 font-mono">
                                        <span>{exp.start_date} to {exp.currently_working ? 'Present' : exp.end_date}</span>
                                    </div>
                                </div>
                                <button onClick={() => setExperiences(experiences.filter((_, i) => i !== idx))} className="text-zinc-600 hover:text-red-400 p-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M10 11V17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-neutral-800 pt-6">
                    <h3 className="text-sm font-medium text-zinc-300 mb-4">{experiences.length > 0 ? "Add Another Role" : "Add Role"}</h3>
                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Designation / Title <span className="text-red-500">*</span></label>
                                <input type="text" name="designation" value={form.designation} onChange={handleChange} placeholder="e.g., Frontend Developer Intern" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Company <span className="text-red-500">*</span></label>
                                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="e.g., Google or TechCorp" className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Employment Type <span className="text-red-500">*</span></label>
                                <select name="employment_type" value={form.employment_type} onChange={handleChange} className={`${inputClass} appearance-none`}>
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="INTERN">Internship</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="CONTRACT">Contract</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Location</label>
                                <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g., Remote" className={inputClass} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                            <input type="checkbox" id="currently_working" name="currently_working" checked={form.currently_working} onChange={handleChange} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-green-600 focus:ring-green-600 focus:ring-offset-black" />
                            <label htmlFor="currently_working" className="text-sm text-zinc-300 cursor-pointer select-none">I am currently working in this role</label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Start Date <span className="text-red-500">*</span></label>
                                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                            </div>
                            <div className={`flex flex-col gap-2.5 ${form.currently_working ? 'opacity-50' : ''}`}>
                                <label className="text-xs text-zinc-400">End Date {!form.currently_working && <span className="text-red-500">*</span>}</label>
                                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} disabled={form.currently_working} className={`${inputClass} [color-scheme:dark] text-zinc-400 disabled:cursor-not-allowed`} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 mt-2">
                            <label className="text-xs text-zinc-400">Description / Responsibilities</label>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Key achievements..." rows="4" className={`${inputClass} resize-none`}></textarea>
                        </div>

                        <div className="flex justify-start mt-2">
                            <button type="button" onClick={handleAdd} className="bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs px-5 py-2.5 rounded-lg flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Save this Role
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

export default ExperienceForm;
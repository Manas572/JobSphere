import React, { useState } from 'react';
import WizardLayout from './FormLeft';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";
const emptyForm = { institute: '', degree: '', field_of_study: '', start_date: '', end_date: '', cgpa: '', description: '' };

const EducationForm = ({ initialData, onNext, onBack }) => {
    const [educations, setEducations] = useState(initialData || []);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const validate = (f) => {
        if (!f.institute || !f.degree || !f.start_date) return "Institute, Degree, and Start Date are required.";
        if (f.start_date && f.end_date && f.start_date > f.end_date) return "End date cannot be before start date.";
        return null;
    };

    const handleAdd = () => {
        const err = validate(form);
        if (err) return setError(err);
        setEducations([...educations, form]);
        setForm(emptyForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let final = [...educations];
        
        if (form.institute || form.degree) {
            const err = validate(form);
            if (err) return setError("Fix the draft error before continuing.");
            final.push(form);
        }

        if (!final.length) return setError("Please add at least one educational background.");
        if (onNext) onNext({ educations: final });
    };

    return (
        <WizardLayout step={2} title="Academic Background." description="Detail your educational journey. Add your high school, university, and academic performance metrics.">
            <h2 className="text-xl font-medium text-white mb-6">Education Details</h2>
            
            <div className="flex flex-col gap-6">
                {educations.length > 0 && (
                    <div className="flex flex-col gap-3 mb-2">
                        {educations.map((edu, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 bg-neutral-900 border border-neutral-800 rounded-xl transition-all hover:border-neutral-700">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-sm">{edu.degree} {edu.field_of_study && `- ${edu.field_of_study}`}</span>
                                    <span className="text-zinc-400 text-xs mt-1">{edu.institute}</span>
                                    <div className="flex gap-3 mt-2 text-[10px] text-zinc-500 font-mono">
                                        <span>{edu.start_date} to {edu.end_date || 'Present'}</span>
                                        {edu.cgpa && <span>• CGPA: {edu.cgpa}</span>}
                                    </div>
                                </div>
                                <button onClick={() => setEducations(educations.filter((_, i) => i !== idx))} className="text-zinc-600 hover:text-red-400 p-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M10 11V17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-neutral-800 pt-6">
                    <h3 className="text-sm font-medium text-zinc-300 mb-4">{educations.length > 0 ? "Add Another Institution" : "Add Institution"}</h3>
                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2.5">
                            <label className="text-xs text-zinc-400">Institute / University <span className="text-red-500">*</span></label>
                            <input type="text" name="institute" value={form.institute} onChange={handleChange} placeholder="e.g., Indian Institute of Information Technology Bhopal" className={inputClass} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Degree <span className="text-red-500">*</span></label>
                                <input type="text" name="degree" value={form.degree} onChange={handleChange} placeholder="e.g., Class XII, B.Tech" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Field of Study</label>
                                <input type="text" name="field_of_study" value={form.field_of_study} onChange={handleChange} placeholder="e.g., Computer Science" className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Start Date <span className="text-red-500">*</span></label>
                                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">End Date</label>
                                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 sm:w-1/2 sm:pr-2.5">
                            <label className="text-xs text-zinc-400">CGPA / Percentage</label>
                            <input type="number" step="0.01" name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="e.g., 94.5 or 8.4" className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-2.5 mt-2">
                            <label className="text-xs text-zinc-400">Description / Coursework</label>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mention relevant coursework..." rows="3" className={`${inputClass} resize-none`}></textarea>
                        </div>

                        <div className="flex justify-start mt-2">
                            <button type="button" onClick={handleAdd} className="bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs px-5 py-2.5 rounded-lg flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Save this Institution
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

export default EducationForm;
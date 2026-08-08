import React, { useState } from 'react';
import WizardLayout from './FormLeft';
import ExpCard from './ExpCard';
import { useExpRegister } from '../Queries/Expreg';


const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";
const emptyForm = { company: '', role: '', employment_type: '', location: '', start_date: '', end_date: '', currently_working: false, description: '' };

const ExperienceForm = ({ onNext, onBack }) => {
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');
    const expreg = useExpRegister();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        if (error) setError('');
    };

    const validate = (f) => {
        if (!f.company || !f.role || !f.start_date) return "Company, Role, and Start Date are required.";
        if (!f.currently_working && f.start_date && f.end_date && f.start_date > f.end_date) return "End date cannot be before start date.";
        return null;
    };

    const handleSave = () => {
        const err = validate(form);
        if (err) return setError(err);
        expreg.mutate(form, {
            onSuccess: () => setForm(emptyForm),
            onError: () => setError("Failed to save experience")
        });
    };

    const handleSubmit = () => {
        if (form.company || form.role) {
            return setError("You have unsaved changes. Save the experience first, or clear the form.");
        }
        if (onNext) onNext();
    };

    return (
        <WizardLayout step={3} title="Professional Experience." description="Add your work history, internships, and professional roles.">
            <h2 className="text-xl font-medium text-white mb-6">Experience Details</h2>
            
            <div className="flex flex-col gap-6">
                <ExpCard />

                <div className="border-t border-neutral-800 pt-6">
                    <h3 className="text-sm font-medium text-zinc-300 mb-4">Add Experience</h3>
                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Company <span className="text-red-500">*</span></label>
                                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="e.g., Google" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Role <span className="text-red-500">*</span></label>
                                <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="e.g., Software Engineer" className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Employment Type</label>
                                <input type="text" name="employment_type" value={form.employment_type} onChange={handleChange} placeholder="e.g., Full-time, Internship" className={inputClass} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Location</label>
                                <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g., San Francisco, CA (Remote)" className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">Start Date <span className="text-red-500">*</span></label>
                                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-xs text-zinc-400">End Date</label>
                                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} disabled={form.currently_working} className={`${inputClass} [color-scheme:dark] text-zinc-400 disabled:opacity-50`} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="currently_working" name="currently_working" checked={form.currently_working} onChange={handleChange} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-green-500 focus:ring-green-500 focus:ring-offset-neutral-950" />
                            <label htmlFor="currently_working" className="text-sm text-zinc-400">I currently work here</label>
                        </div>

                        <div className="flex flex-col gap-2.5 mt-2">
                            <label className="text-xs text-zinc-400">Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your responsibilities and achievements..." rows="4" className={`${inputClass} resize-none`}></textarea>
                        </div>

                        <div className="flex justify-start mt-2">
                            <button type="button" onClick={handleSave} disabled={expreg.isPending} className="bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-50">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> 
                                {expreg.isPending ? "Saving..." : "Save this Experience"}
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
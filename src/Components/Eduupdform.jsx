import React, { useState } from 'react';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";

const EducationUpdateForm = ({ initialData, onSave, onCancel }) => {
    // initialData should be the specific education object fetched via API or passed from the list
    const [form, setForm] = useState(initialData);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const validate = (f) => {
        if (!f.institute || !f.degree || !f.start_date) return "Institute, Degree, and Start Date are required.";
        if (f.start_date && f.end_date && f.start_date > f.end_date) return "End date cannot be before start date.";
        if (f.cgpa && f.cgpa < 0) return "CGPA cannot be -ve.";
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate(form);
        if (err) return setError(err);
        
        // Pass to parent to handle API PUT/PATCH, then close
        onSave(form); 
    };

    return (
        <div className="bg-black text-white w-full max-w-3xl">
            <h2 className="text-xl font-medium mb-6">Edit Education Details</h2>
            
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                    <label className="text-xs text-zinc-400">Institute / University <span className="text-red-500">*</span></label>
                    <input type="text" name="institute" value={form.institute || ''} onChange={handleChange} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Degree <span className="text-red-500">*</span></label>
                        <input type="text" name="degree" value={form.degree || ''} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Field of Study</label>
                        <input type="text" name="field_of_study" value={form.field_of_study || ''} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Start Date <span className="text-red-500">*</span></label>
                        <input type="date" name="start_date" value={form.start_date || ''} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">End Date</label>
                        <input type="date" name="end_date" value={form.end_date || ''} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 sm:w-1/2 sm:pr-2.5">
                    <label className="text-xs text-zinc-400">CGPA / Percentage</label>
                    <input type="number" step="0.01" name="cgpa" value={form.cgpa || ''} onChange={handleChange} className={inputClass} />
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                    <label className="text-xs text-zinc-400">Description / Coursework</label>
                    <textarea name="description" value={form.description || ''} onChange={handleChange} rows="3" className={`${inputClass} resize-none`}></textarea>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-800/50">
                    <button type="button" onClick={onCancel} className="text-zinc-400 hover:text-white font-medium text-sm py-2">Cancel</button>
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-3 rounded-lg">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EducationUpdateForm;
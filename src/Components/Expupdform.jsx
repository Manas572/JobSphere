import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useExpUpdate } from '../Queries/Expupd';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";

const ExperienceUpdateForm = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [form, setForm] = useState(state);
    const [error, setError] = useState('');
    const updateExp = useExpUpdate();

    if (!form) return <p className="text-zinc-400 p-4">No data found. Please go back.</p>;

    const onCancel = () => navigate(-1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        if (error) setError('');
    };

    const validate = (f) => {
        if (!f.company || !f.designation || !f.start_date) return "Company, Role, and Start Date are required.";
        if (!f.currently_working && f.start_date && f.end_date && f.start_date > f.end_date) return "End date cannot be before start date.";
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate(form);
        if (err) return setError(err);
        
        updateExp.mutate({ id: form.id, formData: form }, {
            onSuccess: () => onCancel(), 
            onError: () => setError("Failed to update experience.")
        });
    };

    return (
        <div className="bg-black text-white w-full max-w-3xl">
            <h2 className="text-xl font-medium mb-6">Edit Experience Details</h2>
            
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Company <span className="text-red-500">*</span></label>
                        <input type="text" name="company" value={form.company || ''} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Role <span className="text-red-500">*</span></label>
                        <input type="text" name="designation" value={form.designation || ''} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Employment Type</label>
                        <input type="text" name="employment_type" value={form.employment_type || ''} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Location</label>
                        <input type="text" name="location" value={form.location || ''} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">Start Date <span className="text-red-500">*</span></label>
                        <input type="date" name="start_date" value={form.start_date || ''} onChange={handleChange} className={`${inputClass} [color-scheme:dark] text-zinc-400`} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs text-zinc-400">End Date</label>
                        <input type="date" name="end_date" value={form.end_date || ''} onChange={handleChange} disabled={form.currently_working} className={`${inputClass} [color-scheme:dark] text-zinc-400 disabled:opacity-50`} />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="currently_working" name="currently_working" checked={form.currently_working || false} onChange={handleChange} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-green-500 focus:ring-green-500 focus:ring-offset-neutral-950" />
                    <label htmlFor="currently_working" className="text-sm text-zinc-400">I currently work here</label>
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                    <label className="text-xs text-zinc-400">Description</label>
                    <textarea name="description" value={form.description || ''} onChange={handleChange} rows="4" className={`${inputClass} resize-none`}></textarea>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-neutral-800/50">
                    <button type="button" onClick={onCancel} className="text-zinc-400 hover:text-white font-medium text-sm py-2">Cancel</button>
                    <button type="submit" disabled={updateExp.isPending} className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-3 rounded-lg disabled:opacity-50">
                        {updateExp.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExperienceUpdateForm;
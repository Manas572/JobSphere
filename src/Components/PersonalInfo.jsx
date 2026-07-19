import React, { useState } from 'react';
import WizardLayout from './FormLeft';

const inputClass = "bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-neutral-600 transition-colors w-full";

const fields = [
    { name: 'phone_number', label: 'Phone Number', type: 'text', placeholder: '+91 9876543210' },
    { name: 'profile_image', label: 'Profile Image (URL)', type: 'url', placeholder: 'https://example.com/image.jpg' },
    { name: 'resume_link', label: 'Resume Link (URL)', type: 'url', placeholder: 'Google Drive or Notion link' },
    { name: 'portfolio_url', label: 'Portfolio URL', type: 'url', placeholder: 'https://yourportfolio.com' },
    { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/username' },
    { name: 'github_url', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/username' },
    { name: 'codolio_url', label: 'Codolio URL', type: 'url', placeholder: 'https://codolio.com/profile/username' }
];

const PersonalInfoForm = ({ initialData, onNext }) => {
    const [formData, setFormData] = useState({
        phone_number: '', profile_image: '', resume_link: '',
        portfolio_url: '', linkedin_url: '', github_url: '', codolio_url: '',
        ...initialData
    });
    
    const [skills, setSkills] = useState(initialData?.skills || []);
    const [skillInput, setSkillInput] = useState('');

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newSkill = skillInput.trim();
            if (newSkill && !skills.includes(newSkill)) setSkills([...skills, newSkill]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => setSkills(skills.filter(s => s !== skillToRemove));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onNext) onNext({ ...formData, skills });
    };

    return (
        <WizardLayout step={1} title="Personal Profile." description="Let's start with the basics. Add your contact details, resume, and web profiles to establish your core identity.">
            <h2 className="text-xl font-medium text-white mb-6">Basic Information</h2>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {fields.map(({ name, label, type, placeholder }) => (
                        <div key={name} className={`flex flex-col gap-2.5 ${name === 'codolio_url' ? 'sm:col-span-2' : ''}`}>
                            <label className="text-xs text-zinc-400">{label}</label>
                            <input type={type} name={name} value={formData[name] || ''} onChange={handleInputChange} placeholder={placeholder} className={inputClass} />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2.5">
                    <label className="text-xs text-zinc-400">Skills (Press Enter or Comma to add)</label>
                    <div className="flex flex-wrap gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-2 focus-within:border-neutral-600 transition-colors min-h-[46px]">
                        {skills.map(skill => (
                            <span key={skill} className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                                {skill}
                                <button type="button" onClick={() => removeSkill(skill)} className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </span>
                        ))}
                        <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} placeholder={!skills.length ? "e.g. React, Django, Python..." : ""} className="flex-1 min-w-[150px] bg-transparent text-sm text-white placeholder-zinc-600 outline-none px-2 py-1" />
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-3 rounded-lg transition-colors cursor-pointer w-full sm:w-auto">
                        Save & Continue
                    </button>
                </div>
            </form>
        </WizardLayout>
    );
};

export default PersonalInfoForm;
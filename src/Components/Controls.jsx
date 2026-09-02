import React, { useState } from 'react';
import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResumeStore } from '../store';
import { useeduinfo } from '../Queries/Edulist';
import { useexpinfo } from '../Queries/Explist';
import { useproinfo } from '../Queries/Prolist';
import { useSkillinfo } from '../Queries/Skillfetch';
import Checkbox from './Checkbox';
import { usePersonalInfo } from '../Queries/Personalinfofetch';
import { useResCreate } from '../Queries/ResCrete';


const Controls = () => {
  const { title, setTitle, isPublic, setIsPublic, accentColor, setAccentColor, professional_summary, setProSum,template,setTemplate,included_educations,included_experiences,included_skills,included_projects} = useResumeStore();
  const [step, setStep] = useState(1);
  const { data: edu_list } = useeduinfo();
  const { data: exp_list } = useexpinfo();
  const { data: pro_list } = useproinfo();
  const { data: skill_list } = useSkillinfo();
  const resreg=useResCreate()
  const handleRegister = () => {
    resreg.mutate({
      title,public:isPublic,template:template.toLowerCase(),accent_color:accentColor,professional_summary,included_educations,included_experiences,included_projects,included_skills
    });
    setTimeout(() => window.print(), 150);
  };

  return (
    <div className="w-1/2 p-8 overflow-y-auto border-r border-zinc-800 flex flex-col h-full print:hidden">
      <Link to="/resume/" className="inline-flex items-center gap-2 mb-8 text-zinc-400 hover:text-white transition-colors">
        <ArrowLeftToLine size={20} />
        <span>Back</span>
      </Link>

      <div className="space-y-6 max-w-md flex-none">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Resume Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white outline-none focus:border-zinc-600"
          />
        </div>

        <div className="flex gap-8 items-center pb-6 border-b border-zinc-800">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Accent</label>
            <input 
              type="color" 
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-10 h-10 p-0 border-0 rounded cursor-pointer bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Template</label>
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded p-2 text-white outline-none focus:border-zinc-600 cursor-pointer"
            >
              <option value="Classic">Classic</option>
              <option value="Minimal">Minimal</option>
              <option value="Modern">Modern</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-5">
            <input 
              type="checkbox" 
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-5 h-5 accent-blue-500 cursor-pointer rounded"
            />
            <span className="text-sm">Make Public</span>
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 max-w-md">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-medium text-white mb-4">Professional Summary</h2>
            <textarea 
              value={professional_summary}
              onChange={(e) => setProSum(e.target.value)}
              placeholder="Write a brief professional summary..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white outline-none focus:border-zinc-600 h-40 resize-y"
            />
          </div>
        )}
        {step === 2 && <Checkbox title="Education" items={edu_list} field="included_educations" displayKey="institution" />}
        {step === 3 && <Checkbox title="Experience" items={exp_list} field="included_experiences" displayKey="company" />}
        {step === 4 && <Checkbox title="Projects" items={pro_list} field="included_projects" displayKey="title" />}
        {step === 5 && <Checkbox title="Skills" items={skill_list} field="included_skills" displayKey="name" />}
      </div>
      <div className="max-w-md pt-6 border-t border-zinc-800 flex justify-between gap-4 mt-auto">
        <button 
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="px-4 py-2 bg-zinc-900 text-zinc-300 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {step < 5 ? (
          <button 
            onClick={() => setStep(s => Math.min(5, s + 1))}
            className="px-4 py-2 bg-zinc-200 text-black font-medium rounded hover:bg-white transition-colors flex-1"
          >
            Next Step
          </button>
        ) : (
          <button 
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-500 transition-colors flex-1"
          >
            Register Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
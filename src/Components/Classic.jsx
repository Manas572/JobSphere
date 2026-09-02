import React from 'react';
import { useResumeStore } from '../store';

const Section = ({ title, children }) => (
  <div className="mb-5 print:mb-3 mt-4">
    <h2 className="text-lg font-bold border-b-2 border-gray-800 mb-3 pb-1 uppercase tracking-wider text-gray-900 print:text-black print:border-black">
      {title}
    </h2>
    {children}
  </div>
);

export default function Classic({ edu_list, exp_list, pro_list, skill_list, per_info }) {
  const { title, accentColor, professional_summary } = useResumeStore();

  return (
    <div className="w-full max-w-[850px] mx-auto p-10 bg-white text-gray-900 font-serif min-h-screen shadow-lg print:p-0 print:shadow-none print:min-h-0">
     
<header className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200 print:border-gray-400">
  <div className="flex-1">
    <h1 
      className="text-4xl font-bold uppercase mb-2 tracking-tight print:text-black" 
      style={{ color: accentColor || "#111" }}
    >
      {title || "Untitled Resume"}
    </h1>
    <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 print:text-black">
      {per_info?.user?.email && <span>{per_info.user.email}</span>}
      {per_info?.phone_number && <span>{per_info.phone_number}</span>}
      {per_info?.linkedin_url && <a href={per_info.linkedin_url} className="hover:underline print:no-underline">LinkedIn</a>}
      {per_info?.github_url && <a href={per_info.github_url} className="hover:underline print:no-underline">GitHub</a>}
      {per_info?.portfolio_url && <a href={per_info.portfolio_url} className="hover:underline print:no-underline">Portfolio</a>}
    </div>
  </div>
  
  {per_info?.profile_image && (
    <img 
      src={per_info.profile_image} 
      alt="Profile" 
      className="w-24 h-24 rounded-full object-cover shrink-0 ml-6 print:border print:border-gray-300"
      onError={(e) => {
        e.currentTarget.onerror = null; 
        e.currentTarget.src = 'image_1f9810.png';
      }}
    />
  )}
</header>
      {professional_summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-gray-800 print:text-black">{professional_summary}</p>
        </Section>
      )}

      {edu_list?.length > 0 && (
        <Section title="Education">
          {edu_list.map((edu, idx) => (
            <div key={edu.id || idx} className="mb-3 text-sm flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-900 print:text-black">{edu.degree}</div>
                <div className="italic text-gray-700 print:text-black">{edu.institute}</div>
              </div>
              <div className="text-right text-gray-600 font-medium print:text-black">{edu.cgpa}</div>
            </div>
          ))}
        </Section>
      )}

      {exp_list?.length > 0 && (
        <Section title="Experience">
          {exp_list.map((exp, idx) => (
            <div key={exp.id || idx} className="mb-5 text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900 text-base print:text-black">
                  {exp.designation} <span className="font-normal italic text-gray-600 print:text-gray-800">at {exp.company}</span>
                </span>
                <span className="text-gray-600 font-medium whitespace-nowrap ml-2 print:text-black">
                  {exp.start_date} - {exp.end_date}
                </span>
              </div>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line print:text-black">
                {exp.description}
              </div>
            </div>
          ))}
        </Section>
      )}

      {pro_list?.length > 0 && (
        <Section title="Projects">
          {pro_list.map((proj, idx) => (
            <div key={proj.id || idx} className="mb-5 text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900 text-base print:text-black">{proj.name}</span>
                <div className="text-gray-500 text-xs space-x-3 print:hidden">
                  {proj.github_link && <a href={proj.github_link} className="hover:underline text-blue-600">GitHub</a>}
                  {proj.deployed_link && <a href={proj.deployed_link} className="hover:underline text-blue-600">Live</a>}
                </div>
              </div>
              <div className="text-gray-800 leading-relaxed mb-1 whitespace-pre-line print:text-black">
                {proj.description}
              </div>
              {proj.techstack && (
                <div className="text-gray-600 italic text-xs print:text-black">
                  Tech: {proj.techstack}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}
      
      {skill_list?.length > 0 && (
        <Section title="Skills">
          <p className="text-sm text-gray-800 leading-relaxed print:text-black">
            {skill_list.map(skill => skill.name || skill).join(" • ")}
          </p>
        </Section>
      )}
    </div>
  );
}
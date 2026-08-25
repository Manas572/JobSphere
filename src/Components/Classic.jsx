import React from 'react';
import { useResumeStore } from '../store';

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold border-b border-gray-800 mb-2 uppercase tracking-wide">
      {title}
    </h2>
    {children}
  </div>
);

export default function Classic({ edu_list, exp_list, pro_list, skill_list, per_info }) {
  const { title,accentColor, professional_summary } = useResumeStore();

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-gray-900 font-serif min-h-screen shadow-md">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 
          className="text-3xl font-bold uppercase mb-2" 
          style={{ color: accentColor || "#000" }}
        >
          {title || "Untitled Resume"}
        </h1>
        <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
          {per_info?.user?.email && <span>{per_info.user.email}</span>}
          {per_info?.phone_number && <span>{per_info.phone_number}</span>}
          {per_info?.linkedin_url && <a href={per_info.linkedin_url} className="hover:underline">LinkedIn</a>}
          {per_info?.github_url && <a href={per_info.github_url} className="hover:underline">GitHub</a>}
          {per_info?.portfolio_url && <a href={per_info.portfolio_url} className="hover:underline">Portfolio</a>}
        </div>
      </header>

      {professional_summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed">{professional_summary}</p>
        </Section>
      )}

      {edu_list?.length > 0 && (
        <Section title="Education">
          {edu_list.map((edu, idx) => (
            <div key={edu.id || idx} className="mb-3 text-sm">
              <div className="font-bold">{edu.degree}</div>
              <div className="font-bold">{edu.institute}</div>
              <div className="text-gray-700">{edu.cgpa}</div>
            </div>
          ))}
        </Section>
      )}

      {exp_list?.length > 0 && (
        <Section title="Experience">
          {exp_list.map((exp, idx) => (
            <div key={exp.id || idx} className="mb-3 text-sm">
              <div className="flex justify-between font-bold">
                <span>{exp.designation} at {exp.company}</span>
                <span className="text-gray-600 font-normal">{exp.start_date} - {exp.end_date}</span>
              </div>
              <div className="text-gray-700 mt-1">{exp.description}</div>
            </div>
          ))}
        </Section>
      )}

      {pro_list?.length > 0 && (
        <Section title="Projects">
          {pro_list.map((proj, idx) => (
            <div key={proj.id || idx} className="mb-3 text-sm">
              <div className="font-bold">{proj.name}</div>
              <div className="text-gray-700 mt-1">{proj.description}</div>
              <div className="text-gray-600 italic mt-1">{proj.techstack}</div>
              <div className="text-gray-500 text-xs mt-1 space-x-2">
                {proj.github_link && <a href={proj.github_link} className="hover:underline">GitHub</a>}
                {proj.deployed_link && <a href={proj.deployed_link} className="hover:underline">Live</a>}
              </div>
            </div>
          ))}
        </Section>
      )}
      
      {skill_list?.length > 0 && (
        <Section title="Skills">
          <p className="text-sm">
            {skill_list.map(skill => skill.name || skill).join(", ")}
          </p>
        </Section>
      )}
    </div>
  );
}
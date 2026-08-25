import React from 'react';
import { useResumeStore } from "../store";

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
      {title}
    </h2>
    {children}
  </div>
);

export default function Minimal({ edu_list, exp_list, pro_list, skill_list }) {
  const { accentColor, title, professional_summary } = useResumeStore();

  return (
    <div className="w-full max-w-3xl mx-auto p-12 bg-white text-gray-800 font-sans min-h-screen">
      <h1 className="text-2xl font-light tracking-tight mb-4" style={{ color: accentColor || "#111" }}>
        {title || "Untitled Resume"}
      </h1>

      {professional_summary && (
        <p className="text-sm font-light leading-relaxed text-gray-600">
          {professional_summary}
        </p>
      )}
      
      {edu_list?.length > 0 && (
        <Section title="Education">
          {edu_list.map((edu, idx) => (
            <div key={edu.id || idx} className="mb-4">
              <h3 className="text-sm font-medium">{edu.degree}</h3>
              <div className="text-sm font-light text-gray-600 mt-0.5">{edu.institute}</div>
              <p className="text-sm text-gray-500 font-light mt-1">{edu.cgpa}</p>
            </div>
          ))}
        </Section>
      )}

      {exp_list?.length > 0 && (
        <Section title="Experience">
          {exp_list.map((exp, idx) => (
            <div key={exp.id || idx} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium">{exp.designation} <span className="font-light text-gray-500">at {exp.company}</span></h3>
                <span className="text-xs text-gray-400 font-light">{exp.start_date} - {exp.end_date}</span>
              </div>
              <p className="text-sm text-gray-500 font-light mt-1.5">{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {pro_list?.length > 0 && (
        <Section title="Projects">
          {pro_list.map((proj, idx) => (
            <div key={proj.id || idx} className="mb-4">
              <h3 className="text-sm font-medium">{proj.name || "Project"}</h3>
              <p className="text-sm text-gray-500 font-light mt-1">{proj.description}</p>
              {proj.techstack && <p className="text-xs text-gray-400 font-light mt-1">{proj.techstack}</p>}
              <div className="flex gap-3 text-xs text-gray-400 font-light mt-1.5 hover:[&>a]:text-gray-700 transition-colors">
                {proj.github_link && <a href={proj.github_link} target="_blank" rel="noreferrer">GitHub</a>}
                {proj.deployed_link && <a href={proj.deployed_link} target="_blank" rel="noreferrer">Live</a>}
              </div>
            </div>
          ))}
        </Section>
      )}
      
      {skill_list?.length > 0 && (
        <Section title="Skills">
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            {skill_list.map(skill => skill.name || skill).join(" • ")}
          </p>
        </Section>
      )}
    </div>
  );
}
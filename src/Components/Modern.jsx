import React from 'react';
import { useResumeStore } from "../store";

export default function Modern({ edu_list, exp_list, pro_list, skill_list }) {
  const { accentColor, title, professional_summary } = useResumeStore();
  const accent = accentColor || "#3B82F6";

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans min-h-screen shadow-md">
      <header className="p-8 text-white" style={{ backgroundColor: accent }}>
        <h1 className="text-4xl font-extrabold tracking-tight">
          {title || "Untitled Resume"}
        </h1>
      </header>

      <div className="p-8 space-y-6">
        {professional_summary && (
          <section>
            <h2 className="text-xl font-bold mb-2" style={{ color: accent }}>Summary</h2>
            <p className="text-sm leading-relaxed text-gray-600">{professional_summary}</p>
          </section>
        )}

        {edu_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: accent }}>Education</h2>
            <div className="space-y-4">
              {edu_list.map((edu, idx) => (
                <div key={edu.id || idx} className="text-sm">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-gray-700">{edu.institute}</div>
                  <p className="text-gray-600 mt-1">{edu.cgpa}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {exp_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: accent }}>Experience</h2>
            <div className="space-y-4">
              {exp_list.map((exp, idx) => (
                <div key={exp.id || idx} className="text-sm">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">{exp.designation} at {exp.company}</h3>
                    <span className="text-gray-500 text-xs">{exp.start_date} - {exp.end_date}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {pro_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: accent }}>Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {pro_list.map((proj, idx) => (
                <div key={proj.id || idx} className="text-sm border-l-2 pl-3" style={{ borderColor: accent }}>
                  <h3 className="font-semibold text-gray-900">{proj.name || "Project"}</h3>
                  <p className="text-gray-600 mt-1">{proj.description}</p>
                  {proj.techstack && <p className="text-xs text-gray-500 italic mt-1">{proj.techstack}</p>}
                  <div className="flex gap-3 text-xs font-medium mt-2">
                    {proj.github_link && <a href={proj.github_link} style={{ color: accent }}>GitHub</a>}
                    {proj.deployed_link && <a href={proj.deployed_link} style={{ color: accent }}>Live</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {skill_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skill_list.map((skill, idx) => (
                <span key={skill.id || idx} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
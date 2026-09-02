import React from 'react';
import { useResumeStore } from "../store";

const Section = ({ title, children }) => (
  <div className="mt-4 print:mt-3">
    <h2 className="text-base font-bold uppercase border-b-[1.5px] border-black mb-2 pb-0.5 text-black">
      {title}
    </h2>
    <div className="space-y-3 print:space-y-2 text-black">
      {children}
    </div>
  </div>
);

export default function Minimal({ edu_list, exp_list, pro_list, skill_list, per_info }) {
  const { title, professional_summary } = useResumeStore();

  return (
    <div className="w-full max-w-[850px] mx-auto p-10 bg-white text-black font-serif min-h-screen print:p-0 print:min-h-0 leading-snug">
      
      <header className="text-center mb-5 print:mb-4">
        <h1 className="text-3xl font-bold uppercase mb-1 text-black">
          {title || "Untitled"}
        </h1>
        <div className="flex flex-wrap justify-center items-center text-sm text-black divide-x divide-black">
          {per_info?.user?.email && <span className="px-2">{per_info.user.email}</span>}
          {per_info?.phone_number && <span className="px-2">{per_info.phone_number}</span>}
          {per_info?.linkedin_url && <a href={per_info.linkedin_url} className="px-2 hover:underline">LinkedIn</a>}
          {per_info?.github_url && <a href={per_info.github_url} className="px-2 hover:underline">GitHub</a>}
          {per_info?.portfolio_url && <a href={per_info.portfolio_url} className="px-2 hover:underline">Portfolio</a>}
        </div>
      </header>

      {professional_summary && (
        <p className="text-sm text-black whitespace-pre-line mb-4">
          {professional_summary}
        </p>
      )}
      
      {edu_list?.length > 0 && (
        <Section title="Education">
          {edu_list.map((edu, idx) => (
            <div key={edu.id || idx} className="text-sm">
              <div className="flex justify-between font-bold">
                <span>{edu.institute}</span>
                <span className="font-normal">{edu.cgpa}</span>
              </div>
              <div className="flex justify-between italic">
                <span>{edu.degree}</span>
              </div>
            </div>
          ))}
        </Section>
      )}

      {exp_list?.length > 0 && (
        <Section title="Experience">
          {exp_list.map((exp, idx) => (
            <div key={exp.id || idx} className="text-sm">
              <div className="flex justify-between font-bold">
                <span>{exp.company}</span>
                <span className="font-normal">{exp.start_date} - {exp.end_date}</span>
              </div>
              <div className="italic mb-1">{exp.designation}</div>
              <div className="text-black whitespace-pre-line ml-4">
               {exp.description && (
  <div className="text-black whitespace-pre-line ml-4">
    • {exp.description.replace(/\n/g, '\n• ')}
  </div>
)}
              </div>
            </div>
          ))}
        </Section>
      )}

      {pro_list?.length > 0 && (
        <Section title="Projects">
          {pro_list.map((proj, idx) => (
            <div key={proj.id || idx} className="text-sm">
              <div className="flex justify-between font-bold">
                <span>
                  {proj.name} {proj.techstack && <span className="font-normal italic">| {proj.techstack}</span>}
                </span>
                <div className="font-normal space-x-2">
                  {proj.github_link && <a href={proj.github_link} className="hover:underline">[GitHub]</a>}
                  {proj.deployed_link && <a href={proj.deployed_link} className="hover:underline">[Live Link]</a>}
                </div>
              </div>
              {proj.description && (
  <div className="text-black whitespace-pre-line ml-4 mt-1">
    • {proj.description.replace(/\n/g, '\n• ')}
  </div>
)}
            </div>
          ))}
        </Section>
      )}
      
      {skill_list?.length > 0 && (
        <Section title="Technical Skills">
          <div className="text-sm text-black whitespace-pre-line">
            • {skill_list.map(skill => skill.name || skill).join(", ")}
          </div>
        </Section>
      )}
    </div>
  );
}
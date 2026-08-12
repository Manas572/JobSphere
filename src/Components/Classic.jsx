import React from 'react'

export default function Classic({ data }) {
  if (!data) return null;

  const Section = ({ title, children }) => (
    <div className="mb-4">
      <h2 className="text-lg font-bold border-b border-gray-800 mb-2 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-serif min-h-screen shadow-md">
      <header className="mb-6">
        <h1 
          className="text-3xl font-bold uppercase mb-2" 
          style={{ color: data.accent_color || "#000" }}
        >
          {data.title || "Untitled Resume"}
        </h1>
      </header>

      {data.professional_summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed">{data.professional_summary}</p>
        </Section>
      )}

      {data.included_experiences?.length > 0 && (
        <Section title="Experience">
          {data.included_experiences.map(exp => (
            <div key={exp.id || exp} className="mb-3 text-sm">
              <div className="font-bold">{exp.title || "Role"}</div>
              <div className="text-gray-700">{exp.description}</div>
            </div>
          ))}
        </Section>
      )}

      {data.included_projects?.length > 0 && (
        <Section title="Projects">
          {data.included_projects.map(proj => (
            <div key={proj.id || proj} className="mb-3 text-sm">
              <div className="font-bold">{proj.name || "Project"}</div>
              <div className="text-gray-700">{proj.description}</div>
            </div>
          ))}
        </Section>
      )}
      
      {data.included_skills?.length > 0 && (
        <Section title="Skills">
          <p className="text-sm">
            {data.included_skills.map(skill => skill.name || skill).join(", ")}
          </p>
        </Section>
      )}
    </div>
  );
}

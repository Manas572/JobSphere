export default function Minimal({ data }) {
  if (!data) return null;

  const Section = ({ title, children }) => (
    <div className="mt-8">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-12 bg-white text-gray-800 font-sans min-h-screen">
      <h1 className="text-2xl font-light tracking-tight mb-4" style={{ color: data.accent_color || "#111" }}>
        {data.title || "Untitled Resume"}
      </h1>

      {data.professional_summary && (
        <p className="text-sm font-light leading-relaxed text-gray-600">
          {data.professional_summary}
        </p>
      )}

      {data.included_experiences?.length > 0 && (
        <Section title="Experience">
          {data.included_experiences.map(exp => (
            <div key={exp.id || exp} className="mb-4">
              <h3 className="text-sm font-medium">{exp.title || "Role"}</h3>
              <p className="text-sm text-gray-500 font-light mt-1">{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {data.included_projects?.length > 0 && (
        <Section title="Projects">
          {data.included_projects.map(proj => (
            <div key={proj.id || proj} className="mb-4">
              <h3 className="text-sm font-medium">{proj.name || "Project"}</h3>
              <p className="text-sm text-gray-500 font-light mt-1">{proj.description}</p>
            </div>
          ))}
        </Section>
      )}
      
      {data.included_skills?.length > 0 && (
        <Section title="Skills">
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            {data.included_skills.map(skill => skill.name || skill).join(" • ")}
          </p>
        </Section>
      )}
    </div>
  );
}
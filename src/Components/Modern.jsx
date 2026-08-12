export default function Modern({ data }) {
  if (!data) return null;

  const accent = data.accent_color || "#3B82F6";

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans min-h-screen shadow-md">
      <header className="p-8 text-white" style={{ backgroundColor: accent }}>
        <h1 className="text-4xl font-extrabold tracking-tight">
          {data.title || "Untitled Resume"}
        </h1>
      </header>

      <div className="p-8 space-y-6">
        {data.professional_summary && (
          <section>
            <h2 className="text-xl font-bold mb-2" style={{ color: accent }}>Summary</h2>
            <p className="text-sm leading-relaxed text-gray-600">{data.professional_summary}</p>
          </section>
        )}

        {data.included_experiences?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: accent }}>Experience</h2>
            <div className="space-y-4">
              {data.included_experiences.map(exp => (
                <div key={exp.id || exp} className="text-sm">
                  <h3 className="font-semibold text-gray-900">{exp.title || "Role"}</h3>
                  <p className="text-gray-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.included_projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: accent }}>Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.included_projects.map(proj => (
                <div key={proj.id || proj} className="text-sm border-l-2 pl-3" style={{ borderColor: accent }}>
                  <h3 className="font-semibold text-gray-900">{proj.name || "Project"}</h3>
                  <p className="text-gray-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {data.included_skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.included_skills.map(skill => (
                <span key={skill.id || skill} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
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
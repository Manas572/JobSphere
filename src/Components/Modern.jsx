import React from 'react';
import { useResumeStore } from "../store";

export default function Modern({ edu_list, exp_list, pro_list, skill_list, per_info }) {
  const { accentColor, title, professional_summary } = useResumeStore();
  const accent = accentColor || "#3B82F6";

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-gray-800 font-sans min-h-screen shadow-lg print:shadow-none print:min-h-0">
     <header 
  className="flex justify-between items-center p-10 text-white print:p-0 print:text-black print:bg-transparent print:border-b-4 print:mb-6" 
  style={{ backgroundColor: accent, borderBottomColor: accent }}
>
  <div className="flex-1">
    <h1 className="text-4xl font-extrabold tracking-tight mb-3">
      {title || "Untitled Resume"}
    </h1>
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium opacity-90 print:opacity-100 print:text-gray-700">
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

      <div className="p-10 pt-6 print:p-0 space-y-7 print:space-y-5">
        {professional_summary && (
          <section>
            <h2 className="text-xl font-bold mb-2 print:mb-1" style={{ color: accent }}>Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700 print:text-black whitespace-pre-line">
              {professional_summary}
            </p>
          </section>
        )}

        {edu_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 print:mb-2" style={{ color: accent }}>Education</h2>
            <div className="space-y-4 print:space-y-3">
              {edu_list.map((edu, idx) => (
                <div key={edu.id || idx} className="text-sm flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-gray-900 print:text-black">{edu.degree}</h3>
                    <div className="text-gray-700">{edu.institute}</div>
                  </div>
                  <div className="text-gray-600 font-medium text-right print:text-gray-800">{edu.cgpa}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {exp_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 print:mb-2" style={{ color: accent }}>Experience</h2>
            <div className="space-y-5 print:space-y-4">
              {exp_list.map((exp, idx) => (
                <div key={exp.id || idx} className="text-sm">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base text-gray-900 print:text-black">
                      {exp.designation} <span className="font-normal text-gray-600">at {exp.company}</span>
                    </h3>
                    <span className="text-gray-500 font-medium whitespace-nowrap ml-2 print:text-gray-700">
                      {exp.start_date} - {exp.end_date}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line print:text-black">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {pro_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 print:mb-2" style={{ color: accent }}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:grid-cols-2 print:gap-4">
              {pro_list.map((proj, idx) => (
                <div key={proj.id || idx} className="text-sm border-l-4 pl-3" style={{ borderColor: accent }}>
                  <h3 className="font-bold text-gray-900 print:text-black">{proj.name || "Project"}</h3>
                  <p className="text-gray-700 mt-1 mb-1 leading-relaxed print:text-black whitespace-pre-line">
                    {proj.description}
                  </p>
                  {proj.techstack && <p className="text-xs text-gray-600 italic font-medium print:text-gray-800">{proj.techstack}</p>}
                  <div className="flex gap-3 text-xs font-semibold mt-2 print:hidden">
                    {proj.github_link && <a href={proj.github_link} style={{ color: accent }} className="hover:opacity-80">GitHub</a>}
                    {proj.deployed_link && <a href={proj.deployed_link} style={{ color: accent }} className="hover:opacity-80">Live</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {skill_list?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 print:mb-2" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skill_list.map((skill, idx) => (
                <span 
                  key={skill.id || idx} 
                  className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-md print:border print:border-gray-300 print:bg-transparent"
                >
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
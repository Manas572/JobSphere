import { useMemo } from 'react';
import { BriefcaseBusiness, Building2, ExternalLink } from 'lucide-react';

export default function RecruiterJobDetail({ job, companyName, applications = [], applicationsLoading }) {
  const jobApplications = useMemo(
    () => job ? applications.filter((application) => application.job_title === job.title) : [],
    [applications, job],
  );

  if (!job) return <div className="hidden xl:flex min-h-64 items-center justify-center border border-dashed border-white/10 text-sm text-[#7f898f]">Select a listing to see its details.</div>;

  return (
    <article className="rounded-lg border border-white/10 bg-[#101416] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div><p className="text-xs uppercase tracking-[0.12em] text-[#859097]">Listing details</p><h3 className="mt-2 text-xl font-semibold leading-7 text-white">{job.title}</h3><p className="mt-1 text-xs text-[#89939a]">Job #{job.job_id}</p></div>
        <span className="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-xs text-[#c4cccf]">{job.application_count} applications</span>
      </div>
      <div className="grid grid-cols-2 gap-4 border-b border-white/10 py-5">
        <div><p className="flex items-center gap-1.5 text-xs text-[#7f898f]"><Building2 size={13} />Company</p><p className="mt-1.5 text-sm text-[#dce0e2]">{companyName}</p></div>
        <div><p className="flex items-center gap-1.5 text-xs text-[#7f898f]"><BriefcaseBusiness size={13} />Job ID</p><p className="mt-1.5 text-sm text-[#dce0e2]">{job.job_id}</p></div>
      </div>
      <div className="pt-5">
        <h4 className="text-sm font-semibold text-white">Applicants</h4>
        {applicationsLoading ? <p className="mt-3 text-sm text-[#929ca2]">Loading applicants…</p> : jobApplications.length === 0 ? <p className="mt-3 text-sm text-[#929ca2]">No applications received for this role yet.</p> : (
          <ul className="mt-3 divide-y divide-white/[0.08]">
            {jobApplications.map((application, index) => (
              <li key={`${application.candidate_email}-${application.applied_at}-${index}`} className="py-3 first:pt-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div><p className="text-sm font-medium text-[#e3e7e9]">{application.candidate_email}</p><p className="mt-1 text-xs text-[#838d93]">{application.status} · {application.applied_at ? new Date(application.applied_at).toLocaleDateString() : 'Date unavailable'}</p></div>
                  {application.resume_link && <a href={application.resume_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#c9e4dc] hover:underline">Resume <ExternalLink size={12} /></a>}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#9ba3a8]">
                  {application.portfolio_url && <a href={application.portfolio_url} target="_blank" rel="noreferrer" className="hover:text-white">Portfolio</a>}
                  {application.linkedin_url && <a href={application.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>}
                  {application.github_url && <a href={application.github_url} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>}
                  {application.codolio_url && <a href={application.codolio_url} target="_blank" rel="noreferrer" className="hover:text-white">Codolio</a>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

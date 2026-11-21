import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { BriefcaseBusiness, Building2, Check, ChevronRight, CirclePlus, Clock3, Search, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store';
import BackendApi from '../AxiInt';
import { useGetJobCount } from '../Queries/JobCount';
import { useGetApplicationCount } from '../Queries/applicationcount';
import { useGetAppInfo } from '../Queries/applicationinfo';
import { useGetAppDetail } from '../Queries/applicationdetails';
import BlurText from '../Components/BlurText';
import PostJobPanel from './PostJobPanel';
import RecruiterJobDetail from './RecruiterJobDetail';

export default function RecruiterDashboard() {
  const user = useAuthStore((state) => state.user);
  const recruiterId = user?.recruiter_id;
  const queryClient = useQueryClient();
  const jobsQuery = useGetAppInfo(recruiterId);
  const jobCountQuery = useGetJobCount(recruiterId);
  const applicationCountQuery = useGetApplicationCount(recruiterId);
  const applicationsQuery = useGetAppDetail(recruiterId);
  const jobs = jobsQuery.data || [];
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [search, setSearch] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [notice, setNotice] = useState('');

  const isVerified = Boolean(user?.is_verified);
  const companyName = user?.company_name || 'Company profile unavailable';
  const filteredJobs = useMemo(() => jobs.filter((job) =>
    `${job.title}`.toLowerCase().includes(search.toLowerCase())
  ), [jobs, search]);
  const selectedJob = jobs.find((job) => job.job_id === selectedJobId) || filteredJobs[0] || null;

  const handlePost = async (job) => {
    try {
      await BackendApi.post('createjob/', job);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['appinfo', recruiterId] }),
        queryClient.invalidateQueries({ queryKey: ['job-count', recruiterId] }),
      ]);
      setShowPostForm(false);
      setNotice('Job posted successfully.');
      window.setTimeout(() => setNotice(''), 3200);
    } catch (error) {
      setNotice(error.response?.data?.error || error.response?.data?.detail || 'Could not post this job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d0f] text-[#e8eaec]">
      <header className="border-b border-white/10 bg-[#0b0d0f]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3 text-white" aria-label="NextHire home">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#d5e9e4] text-[#15221f]"><BriefcaseBusiness size={18} /></span>
            <span className="text-[15px] font-semibold tracking-tight">NextHire <span className="ml-1 font-normal text-[#8e969c]">for employers</span></span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#a3aaaf] sm:block">{user?.email || 'recruiter@nstar.example'}</span>
            <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#202529] text-sm font-medium text-[#e8eaec]">{(user?.email || 'N').slice(0, 1).toUpperCase()}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 lg:pt-12">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#a3aaaf]"><Building2 size={15} /> Employer workspace <ChevronRight size={14} /> Overview</div>
            <BlurText text="Your hiring, in one place." delay={30} stepDuration={0.2} className="text-3xl font-semibold tracking-tight text-white sm:text-[34px]" />
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#9ba3a8]">Manage open roles and review the details candidates see when they find your company.</p>
          </div>
          {isVerified && (
            <button onClick={() => setShowPostForm(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#c9e4dc] px-4 text-sm font-semibold text-[#15221f] transition-colors hover:bg-[#d9eee7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9e4dc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d0f]">
              <CirclePlus size={17} /> Post a job
            </button>
          )}
        </div>

        {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-lg border border-[#497765]/40 bg-[#17241f] px-4 py-3 text-sm text-[#c9e4dc]"><Check size={16} />{notice}</div>}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <section className="border-b border-white/10 pb-4 sm:border-b-0 sm:border-r sm:pb-0">
            <p className="text-xs uppercase tracking-[0.12em] text-[#879097]">Company</p>
            <div className="mt-2 flex items-center gap-2 text-[17px] font-medium"><Building2 size={17} className="text-[#9fbfb4]" />{companyName}</div>
          </section>
          <section className="border-b border-white/10 pb-4 sm:border-b-0 sm:border-r sm:pl-6 sm:pb-0">
            <p className="text-xs uppercase tracking-[0.12em] text-[#879097]">Employer status</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#c9e4dc]"><ShieldCheck size={17} /> Verified by NextHire</div>
          </section>
          <section className="sm:pl-6">
            <p className="text-xs uppercase tracking-[0.12em] text-[#879097]">Open roles</p>
            <p className="mt-2 text-[17px] font-medium">{jobCountQuery.data?.counts ?? '—'} <span className="text-sm font-normal text-[#9ba3a8]">active listings</span></p>
            <p className="mt-1 text-xs text-[#8f989e]">{applicationCountQuery.data?.counts ?? '—'} applications received</p>
          </section>
        </div>

        {!recruiterId ? (
          <section className="max-w-2xl border border-white/10 bg-[#111518] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">Recruiter profile unavailable</h2>
            <p className="mt-2 text-sm leading-6 text-[#9ba3a8]">Sign in again to load your recruiter profile, or check that your login response includes the recruiter profile ID.</p>
          </section>
        ) : !isVerified ? (
          <section className="max-w-2xl border border-white/10 bg-[#111518] p-6 sm:p-8">
            <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#222a2d] text-[#c9e4dc]"><Clock3 size={20} /></div>
            <h2 className="text-xl font-semibold text-white">Your employer profile is awaiting approval</h2>
            <p className="mt-2 text-sm leading-6 text-[#9ba3a8]">An administrator needs to verify your company before you can publish job listings. You can return here once your profile is approved.</p>
            <div className="mt-6 border-t border-white/10 pt-4 text-sm text-[#aeb5b9]">Company: <span className="text-white">{companyName}</span></div>
          </section>
        ) : (
          <section>
            <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-lg font-semibold text-white">Your job listings</h2>
                <p className="mt-1 text-sm text-[#8f989e]">Select a role to review its posting details.</p>
              </div>
              <label className="relative block w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f898f]" />
                <span className="sr-only">Search job listings</span>
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search listings" className="h-10 w-full rounded-lg border border-white/10 bg-[#111518] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#727c82] focus:border-[#93b8ab] focus:ring-2 focus:ring-[#93b8ab]/20" />
              </label>
            </div>

            {jobsQuery.isLoading ? (
              <p role="status" className="border border-white/10 px-5 py-8 text-sm text-[#9ba3a8]">Loading your job listings…</p>
            ) : jobsQuery.isError ? (
              <p role="alert" className="border border-white/10 px-5 py-8 text-sm text-rose-300">Could not load job listings. {jobsQuery.error?.response?.data?.detail || ''}</p>
            ) : jobs.length === 0 ? (
              <div className="border border-dashed border-white/15 px-6 py-14 text-center">
                <BriefcaseBusiness size={22} className="mx-auto text-[#879097]" />
                <h3 className="mt-3 font-medium text-white">No jobs posted yet</h3>
                <p className="mt-1 text-sm text-[#9ba3a8]">Your published roles will appear here.</p>
                <button onClick={() => setShowPostForm(true)} className="mt-5 rounded-lg bg-[#c9e4dc] px-4 py-2.5 text-sm font-semibold text-[#15221f] hover:bg-[#d9eee7]">Post your first job</button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <p className="border border-white/10 px-5 py-8 text-sm text-[#9ba3a8]">No listings match “{search}”.</p>
            ) : (
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
                <div className="overflow-hidden rounded-lg border border-white/10 bg-[#101416]">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-white/10 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[#838d93] sm:grid-cols-[minmax(0,1fr)_130px_100px]">
                    <span>Role</span><span className="hidden sm:block">Location</span><span className="text-right sm:text-left">Posted</span>
                  </div>
                  <ul>
                    {filteredJobs.map((job) => (
                      <li key={job.id} className="border-b border-white/[0.07] last:border-b-0">
                        <button onClick={() => setSelectedJobId(job.job_id)} aria-pressed={(selectedJob?.job_id ?? null) === job.job_id} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#93b8ab] sm:grid-cols-[minmax(0,1fr)_130px_100px] ${(selectedJob?.job_id ?? null) === job.job_id ? 'bg-[#c9e4dc]/[0.07]' : ''}`}>
                          <span className="min-w-0"><span className="block truncate text-sm font-medium text-white">{job.title}</span><span className="mt-1 block text-xs text-[#8f989e]">{job.application_count} applications</span></span>
                          <span className="hidden truncate text-xs text-[#a2a9ae] sm:block">Job #{job.job_id}</span>
                          <span className="text-right text-xs text-[#8f989e] sm:text-left">View details</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 px-4 py-3 text-xs text-[#7f898f]">Showing {filteredJobs.length} of {jobs.length} listings</div>
                </div>
                <RecruiterJobDetail job={selectedJob} companyName={companyName} applications={applicationsQuery.data || []} applicationsLoading={applicationsQuery.isLoading} />
              </div>
            )}
          </section>
        )}
      </main>

      {showPostForm && <PostJobPanel onClose={() => setShowPostForm(false)} onSubmit={handlePost} />}
    </div>
  );
}

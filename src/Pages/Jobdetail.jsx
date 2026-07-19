import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";
import Analysebtn from "../Components/Analysebtn";
import NavbarComp from "../Components/NavbarComp";

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: job, isLoading } = useQuery({
        queryKey: ["job", id],
        queryFn: async () => {
            const res = await BackendApi.get(`listjob/${id}/`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
                <NavbarComp />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
                        <p className="text-zinc-500">Loading job details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
                <NavbarComp />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-zinc-500 text-lg">Job not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200 selection:bg-zinc-800">
            <NavbarComp />
            
            <main className="flex-grow w-full max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
                
                {/* Back Navigation */}
                <div>
                    <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to all jobs
                    </Link>
                </div>

                {/* Job Header Section */}
                <div className="flex flex-col gap-6 border-b border-zinc-800 pb-8">
                    
                    {/* Title & Company Info Container */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight">
                            {job.title}
                        </h1>
                        
                        {/* Company Name & Optional Website */}
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-xl text-zinc-300 font-medium">
                                {job.company_name}
                            </span>
                            
                            {/* Conditional Rendering for Website */}
                            {job.company_website && (
                                <a 
                                    href={job.company_website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm text-zinc-300">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {job.location}
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-sm text-emerald-400 font-medium">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            ${job.salary}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <button className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200 px-8 py-3 rounded-full font-semibold text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        onClick={() => navigate(`/apply/${job.id}`)}>
                            Apply Now
                        </button>
                        
                        <Analysebtn />
                    </div>
                </div>

                {/* Job Description Section */}
                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 md:p-10 mb-12">
                    <h2 className="text-xl font-semibold text-zinc-100 mb-6">About the Role</h2>
                    <div className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </div>
                </div>

            </main>
        </div>
    );
}
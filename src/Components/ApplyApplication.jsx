import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackendApi from '../AxiInt';
import NavbarComp from '../Components/NavbarComp';

export default function ApplyForm() {
    const { id } = useParams(); // Grab the job ID from the URL
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        resume_link: '',
        portfolio_url: '',
        linkedin_url: '',
        github_url: '',
        codolio_url: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    // Fetch the job details when the page loads
    useEffect(() => {
        setIsLoading(true);
        BackendApi
            .get(`listjob/${id}/`)
            .then((res) => {
                setJob(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch job details:", error);
                setIsLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            // await BackendApi.post(`jobs/${id}/apply/`, formData);
            console.log("Submitting application for Job ID:", id, formData);
            
            // Simulate API delay
            setTimeout(() => setStatus('success'), 1000);
        } catch (error) {
            console.error("Application failed", error);
            setStatus('error');
        }
    };

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-green-900 border-t-green-400 rounded-full animate-spin"></div>
                        <p className="text-zinc-500">Loading application...</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- Not Found State ---
    if (!job) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
                <div className="flex-grow flex flex-col items-center justify-center gap-4">
                    <p className="text-zinc-500 text-lg">Job not found.</p>
                    <Link to="/jobs" className="text-green-500 hover:text-green-400 transition-colors">Return to Job Board</Link>
                </div>
            </div>
        );
    }

    // --- Success State ---
    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-200">
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="w-full max-w-lg mx-auto bg-[#00A63E]/5 backdrop-blur-sm border border-green-500/30 rounded-xl p-10 text-center">
                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="text-2xl font-semibold text-white mb-2">Application Sent!</h3>
                        <p className="text-white/60 mb-6">Your profile has been submitted to {job.company_name} for the {job.title} role.</p>
                        <Link to="/jobs" className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium border border-white/10 transition-all active:scale-95">
                            Browse More Jobs
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- Main Application Form ---
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                .poppins-text {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>


            <section className='relative flex-grow flex flex-col lg:flex-row justify-center items-center px-4 py-12 lg:py-20 gap-12 lg:gap-20 poppins-text overflow-hidden'>
                
                {/* Background Glow Effect */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-[600px] bg-green-500/15 rounded-full blur-[150px]'></div>
                
                {/* Left Side: Dynamic Job Details */}
                <div className='w-full lg:w-5/12 text-center lg:text-left z-10 flex flex-col items-center lg:items-start'>
                    
                    <Link to={`/job/${id}`} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-6">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Job Description
                    </Link>

                    <h2 className="text-xl text-green-400 font-medium tracking-wide mb-2">You are applying for</h2>
                    <h1 className='font-bold text-4xl md:text-5xl/tight bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent'>
                        {job.title}
                    </h1>
                    
                    <div className="flex items-center gap-3 mt-4">
                        <span className="text-2xl text-zinc-200 font-medium">
                            {job.company_name}
                        </span>
                        {job.company_website && (
                            <a href={job.company_website} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-6">
                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-xs text-zinc-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {job.location}
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs text-emerald-400 font-medium">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            ${job.salary}
                        </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent my-8"></div>

                    <p className='text-sm/6 text-white/60 max-w-sm'>
                        Please ensure your portfolio and resume links are set to public visibility before submitting your application to the recruiter.
                    </p> 
                </div>
                        
                {/* Right Side: The Application Form */}
                <div className='w-full lg:w-7/12 max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 z-10 shadow-2xl'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        
                        {/* 1. Required Fields Section */}
                        <div className="space-y-4">
                            <div>
                                <label className='block text-zinc-300 text-sm font-medium mb-2'>Email Address <span className="text-green-500">*</span></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com" 
                                    className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition'
                                />
                            </div>
                
                            <div>
                                <label className='block text-zinc-300 text-sm font-medium mb-2'>Resume URL <span className="text-green-500">*</span></label>
                                <input 
                                    type="url" 
                                    name="resume_link"
                                    value={formData.resume_link}
                                    onChange={handleChange}
                                    required
                                    placeholder="https://drive.google.com/..." 
                                    className='w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition'
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="shrink-0 px-4 text-xs text-white/40 uppercase tracking-wider font-medium">Optional Profiles</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* 2. Optional Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className='block text-zinc-400 text-xs font-medium mb-1.5'>LinkedIn URL</label>
                                <input 
                                    type="url" 
                                    name="linkedin_url"
                                    value={formData.linkedin_url}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/in/..." 
                                    className='w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition'
                                />
                            </div>

                            <div>
                                <label className='block text-zinc-400 text-xs font-medium mb-1.5'>GitHub URL</label>
                                <input 
                                    type="url" 
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    placeholder="https://github.com/..." 
                                    className='w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition'
                                />
                            </div>

                            <div>
                                <label className='block text-zinc-400 text-xs font-medium mb-1.5'>Portfolio URL</label>
                                <input 
                                    type="url" 
                                    name="portfolio_url"
                                    value={formData.portfolio_url}
                                    onChange={handleChange}
                                    placeholder="https://yourwebsite.com" 
                                    className='w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition'
                                />
                            </div>

                            <div>
                                <label className='block text-zinc-400 text-xs font-medium mb-1.5'>Codolio URL</label>
                                <input 
                                    type="url" 
                                    name="codolio_url"
                                    value={formData.codolio_url}
                                    onChange={handleChange}
                                    placeholder="https://codolio.com/profile/..." 
                                    className='w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition'
                                />
                            </div>
                        </div>
            
                        {/* Submission Footer */}
                        <div className='flex flex-col sm:flex-row items-center justify-between pt-4 gap-4'>
                            <p className='text-xs text-zinc-500 sm:max-w-[200px] text-center sm:text-left'>
                                By applying, you agree to our <a href="#" className='text-zinc-300 hover:text-white underline'>Terms</a>.
                            </p>
                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className='bg-linear-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer'
                            >
                                {status === 'submitting' ? 'Sending...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
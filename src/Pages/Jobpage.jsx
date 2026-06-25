import React, { useState, useEffect } from 'react';
import Searchbar from '../Components/Searchbar';
import Pagination from '../Components/Page';
import JobCard from '../Components/JobCard';
import BackendApi from '../AxiInt';
import NavbarComp from '../Components/NavbarComp';
import LoadingCard from '../Components/LoadingCard';

export default function JobBoard() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                const response = await BackendApi.get(`listjob/`, {
                    params: {
                        page: currentPage,
                        search: searchQuery
                    }
                });
                
                setJobs(response.data.results);
                
                const calculatedPages = Math.ceil(response.data.count / 5);
                setTotalPages(calculatedPages || 1);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const delaySearch = setTimeout(() => {
            fetchJobs();
        }, 300); 

        return () => clearTimeout(delaySearch);
    }, [currentPage, searchQuery]);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); 
    };

    return (
        /* 1. OUTER WRAPPER: No padding here so the Navbar can stretch 100% width */
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">
            
            {/* The Navbar sits at the very top */}
            <NavbarComp />

            {/* 2. INNER WRAPPER: Handles padding, centering, and growing to fill the rest of the screen */}
            <div className="flex flex-col items-center py-12 px-4 gap-10 flex-grow w-full">
                
                {/* Header & Search */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Discover Jobs</h1>
                        <p className="text-gray-400 mt-1 text-sm">Find the best roles matching your skills.</p>
                    </div>
                    <div className="w-full md:w-auto">
                        <Searchbar 
                            searchQuery={searchQuery} 
                            onSearchChange={handleSearchChange} 
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full max-w-6xl flex-grow flex flex-col items-center justify-start">
                    {isLoading ? (
                        <LoadingCard />
                    ) : jobs.length > 0 ? (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:place-items-stretch">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center flex-col text-gray-500">
                            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <p className="text-lg">No jobs found matching your search.</p>
                        </div>
                    )}
                </div>

                {/* Pagination controls at the bottom */}
                {jobs.length > 0 && (
                    <div className="w-full flex justify-center mt-4">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrev={() => setCurrentPage(p => Math.max(1, p - 1))}
                            onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Wrongs from './Wrongs';
import BackendApi from '../AxiInt';
import { useAuthStore } from '../store';

function getErrorMessage(error, accountCreated) {
    const responseData = error.response?.data;
    const fallback = accountCreated
        ? 'Account created, but automatic login failed. Please sign in.'
        : 'Registration failed. Please try again.';

    if (!responseData) return fallback;
    if (typeof responseData === 'string') return responseData;
    if (responseData.detail) return responseData.detail;

    const preferredFields = ['password', 'email', 'company_name', 'location', 'non_field_errors'];
    const field = preferredFields.find((key) => responseData[key] !== undefined)
        ?? Object.keys(responseData)[0];
    if (!field) return fallback;

    const messages = Array.isArray(responseData[field]) ? responseData[field] : [responseData[field]];
    const message = messages
        .map((item) => typeof item === 'string' ? item : item?.message ?? item?.error)
        .filter(Boolean)
        .join(' ');

    if (!message) return fallback;
    return field === 'non_field_errors' ? message : `${field}: ${message}`;
}

export default function RegisterForm() {
    const [role, setRole] = useState('CANDIDATE');
    const [err, setError] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [portfolio_url, setPortfolio_url] = useState("");
    const [resume_link, setresume_link] = useState("");
    const [location, setlocation] = useState("");
    const [company_name, setcompany_name] = useState("");
    const [company_website, setcompany_website] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); 
        setError("");
        setIsSubmitting(true);
        let accountCreated = false;
        try {
            if (role === 'CANDIDATE') {
                const payload = { email, password };
                if (portfolio_url) payload.portfolio_url = portfolio_url;
                if (resume_link) payload.resume_link = resume_link;
                await BackendApi.post("/createcandiate/", payload);
            } else {
                const payload = {
                    email,
                    password,
                    location,
                    company_name
                };
                if (company_website) payload.company_website = company_website;
                await BackendApi.post("/createrecruiter/", payload);
            }
            accountCreated = true;

            const loginResponse = await BackendApi.post("/api/token/", { email, password });
            setAuth(loginResponse.data.user);
            navigate(loginResponse.data.user?.role === 'RECRUITER' ? '/recruiter' : '/');
            
        } catch(error) {
            setError(getErrorMessage(error, accountCreated));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-[700px] h-screen w-full bg-gray-900">
            <div className="w-full hidden md:inline-block">
                <img className="h-full w-full object-cover" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
            </div>
        
            <div className="w-full flex flex-col items-center justify-center overflow-y-auto py-10">
        
                <form className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <h2 className="text-4xl text-white font-medium">Create Account</h2>
                    <p className="text-sm text-gray-400 mt-3 mb-8">Join us to get started</p>
                    
                    {err && <Wrongs msg={err} />}
                    
                    <div className="flex w-full bg-gray-800 rounded-full p-1 mb-6 mt-2">
                        <button 
                            type="button" 
                            onClick={() => { setRole('CANDIDATE'); setError(""); }} 
                            className={`w-1/2 h-10 rounded-full text-sm font-medium transition-colors ${role === 'CANDIDATE' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Candidate
                        </button>
                        <button 
                            type="button" 
                            onClick={() => { setRole('RECRUITER'); setError(""); }} 
                            className={`w-1/2 h-10 rounded-full text-sm font-medium transition-colors ${role === 'RECRUITER' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Recruiter
                        </button>
                    </div>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-700"></div>
                        <p className="w-full text-nowrap text-sm text-gray-400">sign up with email</p>
                        <div className="w-full h-px bg-gray-700"></div>
                    </div>
        
                    <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden pl-6 gap-2 mb-4">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#9CA3AF"/>
                        </svg>
                        <input type="email" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full" required />                
                    </div>
        
                    <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden pl-6 gap-2 mb-4">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#9CA3AF"/>
                        </svg>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full" required />
                    </div>

                    {/* Conditional Fields: Recruiter */}
                    {role === 'RECRUITER' && (
                        <>
                            <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden px-6 mb-4">
                                <input type="text" placeholder="Company Name" value={company_name} onChange={(e)=>{setcompany_name(e.target.value)}} className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full" required />
                            </div>
                            <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden px-6 mb-4">
                                <input type="text" placeholder="Company Website (Optional)" value={company_website} onChange={(e)=>{setcompany_website(e.target.value)}} className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full"  />
                            </div>
                            <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden px-6 mb-4">
                                <input type="text" placeholder="Location" value={location} onChange={(e)=> setlocation(e.target.value)} className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full" required />
                            </div>
                        </>
                    )}

                    {/* Conditional Fields: Candidate */}
                    {role === 'CANDIDATE' && (
                        <>
                        <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden px-6 mb-4">
                            <input type="url" placeholder="Portfolio URL (Optional)" value={portfolio_url} onChange={(e)=> setPortfolio_url(e.target.value)}  className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full" />
                        </div>
                        <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 focus-within:border-gray-500 transition-colors h-12 rounded-full overflow-hidden px-6 mb-4">
                            {/* Fixed the placeholder text here to reflect Resume Link */}
                            <input type="url" placeholder="Resume URL (Optional)" value={resume_link} onChange={(e)=> setresume_link(e.target.value)}  className="bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm w-full h-full" />
                        </div>
                        </>
                    )}
        
                    <button type="submit" disabled={isSubmitting} className="mt-6 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:cursor-not-allowed disabled:opacity-60" >
                        {isSubmitting ? 'Creating account…' : 'Sign Up'}
                    </button>
                    
                    <p className="text-gray-400 text-sm mt-6">Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors" >Sign in </Link></p>
                </form>
            </div>
        </div>
    );
};

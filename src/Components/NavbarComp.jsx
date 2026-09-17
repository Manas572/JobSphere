import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarComp = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    const navItems = [
        { name: 'home', link: '/' },
        { name: 'profile', link: '/profile' },
        { name: 'jobs', link: '/jobs' },
        { name: 'interview', link: '/interview' },
        { name: 'resume', link: '/resume' },
        { name: 'About', link: '/about' }
    ];

    return (
        <>
            <nav className="bg-[#0a0a10] px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between relative">
          
                <div className="hidden md:flex items-center bg-gray-900/70 border border-gray-800 rounded-full px-1 py-1 gap-2 backdrop-blur">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.link} 
                            className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm transition-colors ${
                                isActive 
                                    ? 'bg-indigo-600/20 border border-indigo-500/40 font-medium text-indigo-300 hover:text-indigo-200' 
                                    : 'text-gray-400 hover:text-gray-200' 
                            }`} 
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <button className="hidden md:flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0 shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5">
                    Get started
                    <span className="size-7 rounded-full bg-white/15 flex items-center justify-center">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                </button>

                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1">
                    <span className={`block w-6 h-0.5 bg-gray-200 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-200 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-200 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#0a0a10] border-t border-gray-800/80 flex flex-col p-5 gap-1 md:hidden z-50">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.name} 
                                to={item.link} 
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm ${
                                    isActive 
                                        ? 'bg-indigo-600/15 font-medium text-indigo-300' 
                                        : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200' 
                                }`} 
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <button className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer border-0 mt-3 w-fit shadow-lg shadow-indigo-600/25">
                            Get started
                            <span className="size-7 rounded-full bg-white/15 flex items-center justify-center">
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </button>
                    </div>
                )}
            </nav>
        </>
    )
}

export default NavbarComp;
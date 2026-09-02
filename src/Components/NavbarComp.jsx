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
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
            </style>
            <nav className="bg-zinc-950 px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between relative">
               
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-1 py-1 gap-2">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.link} 
                            className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm transition-colors ${
                                isActive 
                                    ? 'bg-zinc-800 border border-zinc-700 font-medium text-zinc-50 hover:text-zinc-200' 
                                    : 'text-zinc-400 hover:text-zinc-200' 
                            }`} 
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <button className="hidden md:flex items-center gap-2.5 bg-linear-to-r from-zinc-50 to-zinc-300 text-zinc-950 hover:text-zinc-800 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0">
                    Get started
                    <span className="size-7 rounded-full bg-zinc-950 flex items-center justify-center">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#f4f4f5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                </button>

                {/* Mobile Hamburger Icon */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1">
                    <span className={`block w-6 h-0.5 bg-zinc-200 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-zinc-200 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-zinc-200 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-zinc-950 border-t border-zinc-800 flex flex-col p-5 gap-1 md:hidden z-50">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.name} 
                                to={item.link} 
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm ${
                                    isActive 
                                        ? 'bg-zinc-900 font-medium text-zinc-50' 
                                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200' 
                                }`} 
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <button className="flex items-center justify-center gap-2.5 bg-linear-to-r from-zinc-50 to-zinc-300 text-zinc-950 text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer border-0 mt-3 w-fit">
                            Get started
                            <span className="size-7 rounded-full bg-zinc-950 flex items-center justify-center">
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#f4f4f5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </button>
                    </div>
                )}
            </nav>
        </>
    )
}

export default NavbarComp;
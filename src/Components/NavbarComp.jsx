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
    ];

    return (
        <nav className="bg-[#0a0a10] border-b border-[#2F4A63]/30 px-6 md:px-12 lg:px-24 xl:px-40 h-16 flex items-center justify-between relative">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.link}
                        className={({ isActive }) =>
                            `px-3.5 py-1.5 rounded-md text-sm capitalize transition-colors ${
                                isActive
                                    ? 'bg-[#131B2B] border border-[#2F4A63]/70 text-[#CFEAE0] font-medium'
                                    : 'text-[#5B91A3] hover:text-[#CFEAE0] hover:bg-[#131B2B]/60 border border-transparent'
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>

            {/* Desktop CTA */}
            <NavLink to="/login" className="group hidden md:inline-flex items-center gap-2 bg-[#CFEAE0] hover:bg-[#CFEAE0]/90 active:scale-[0.98] text-[#131B2B] text-sm font-semibold px-4 py-2 rounded-md transition-all cursor-pointer">
                Get started
                <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                    <path
                        d="M.6 4.602h10m-4-4 4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </NavLink>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
            >
                <span className={`block w-6 h-0.5 bg-[#CFEAE0] transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-[#CFEAE0] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-[#CFEAE0] transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0a0a10] border-b border-[#2F4A63]/40 flex flex-col p-5 gap-1 md:hidden z-50">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.link}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `px-3.5 py-2.5 rounded-md text-sm capitalize transition-colors ${
                                    isActive
                                        ? 'bg-[#131B2B] border border-[#2F4A63]/70 text-[#CFEAE0] font-medium'
                                        : 'text-[#5B91A3] hover:bg-[#131B2B]/60 hover:text-[#CFEAE0] border border-transparent'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    <NavLink to="/login" onClick={() => setMenuOpen(false)} className="group inline-flex items-center justify-center gap-2 bg-[#CFEAE0] hover:bg-[#CFEAE0]/90 active:scale-[0.98] text-[#131B2B] text-sm font-semibold px-4 py-2.5 rounded-md transition-all cursor-pointer mt-3 w-fit">
                        Get started
                        <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-150 group-hover:translate-x-0.5"
                        >
                            <path
                                d="M.6 4.602h10m-4-4 4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default NavbarComp;

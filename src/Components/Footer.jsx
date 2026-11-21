import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Profile', link: '/profile' },
  { name: 'Jobs', link: '/jobs' },
  { name: 'Interview', link: '/interview' },
  { name: 'Resume', link: '/resume' },
];

const portfolioUrl = 'https://portfolio-two-zeta-nh4yycy6wc.vercel.app/';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a10] text-gray-300">
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-10 md:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link to="/" className="inline-flex text-lg font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              Next<span className="text-[#9fb8d5]">Hire</span>
            </Link>
            <p className="mt-2 text-sm leading-6 text-gray-500">Tools to move your career forward.</p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
            {navItems.map(({ name, link }) => (
              <Link key={link} to={link} className="text-sm capitalize text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                {name}
              </Link>
            ))}
            <a href={portfolioUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              Portfolio <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/[0.08] pt-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NextHire</span>
          <span>Built to make the next step clearer.</span>
        </div>
      </div>
    </footer>
  );
}

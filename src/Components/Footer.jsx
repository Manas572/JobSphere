import Galaxy from "@/components/Galaxy";

export default function Footer() {
  const cols = [
    { title: "Product", links: ["Resume Builder", "Mock Interviews", "Job Board", "ATS Checker"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Resources", links: ["Resume Templates", "Interview Guides", "Help Center", "Privacy"] },
  ];

  return (
    <footer className="relative bg-[#0a0a10] border-t border-gray-800/60 px-6 pt-16 pb-8 overflow-hidden">
      {/* Galaxy Background Layer */}
      <Galaxy
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        transparent
        density={0.5}
        speed={0.4}
        glowIntensity={0.2}
        twinkleIntensity={0.4}
        hueShift={140}
        mouseInteraction={false}
      />

      {/* Content Layer */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <p className="text-xl font-bold text-white font-IBMPlexBold">
            Next<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Hire</span>
          </p>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            AI-powered resumes, interviews, and job discovery — all in one place.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-600">© 2026 NextHire. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
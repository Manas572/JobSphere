export default function Head() {
  return (
    <section className="relative bg-[#0a0a10] overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-32 w-[28rem] h-[28rem] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[26rem] h-[26rem] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Career Platform
          </span>

          <h1 className="font-IBMPlexBold text-5xl md:text-7xl uppercase leading-[1.03] tracking-tight">
            <span className="block text-white">Your Next Role,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">
              Engineered.
            </span>
          </h1>

          <p className="mt-7 text-gray-400 text-lg leading-relaxed max-w-md">
            Craft logic-driven resumes, master technical interviews, and land
            top-tier opportunities — all with one AI-powered toolkit.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="/resume"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5"
            >
              Build Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/interview"
              className="border border-gray-700 hover:border-indigo-500/60 text-gray-300 hover:text-white px-8 py-3.5 rounded-full font-semibold transition-all"
            >
              Practice Interview
            </a>
          </div>

          {/* Real pillars — what the product actually does */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["ATS-Friendly Resumes", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2-00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"],
              ["Adaptive Mock Interviews", "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15 0h3M21 3l-9 9"],
              ["Top-Tier Job Discovery", "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"],
            ].map(([label, d]) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-gray-400">
                <svg className="w-4.5 h-4.5 w-[18px] h-[18px] text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Image with floating chips */}
        <div className="relative justify-self-center w-full max-w-md">
          <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-600/25 to-blue-500/15 blur-3xl rounded-full pointer-events-none" />
          <img
            className="relative w-full rounded-3xl border border-gray-800/80 shadow-2xl shadow-indigo-950/60"
            alt="HireSphere"
            src="https://png.pngtree.com/thumb_back/fh260/background/20221015/pngtree-abstract-programming-workflow-a-screen-displaying-real-python-code-development-photo-image_28458262.jpg"
          />

          {/* Floating chips — decorative context, not claims */}
          <div className="absolute -left-4 md:-left-10 top-8 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-xl px-4 py-3 shadow-xl shadow-black/40 flex items-center gap-3 animate-none">
            <div className="size-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Resume Scored</p>
              <p className="text-[11px] text-gray-500">ATS-optimized</p>
            </div>
          </div>

          <div className="absolute -right-4 md:-right-8 bottom-10 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-xl px-4 py-3 shadow-xl shadow-black/40 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Interview Ready</p>
              <p className="text-[11px] text-gray-500">Adaptive questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fade into next section — keeps the single-page feel */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#0a0a10] pointer-events-none" />
    </section>
  );
}
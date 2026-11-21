import LightRays from "./LightRays";

export default function Head() {
  return (
    <section className="relative bg-[#0a0a10] overflow-hidden flex items-center min-h-[90vh]">
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          lightSpread={1.2}
          rayLength={1.4}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-28">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#5B91A3] mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-[#2F4A63]" />
            Technical Career Toolkit
          </p>

          <h1 className="font-IBMPlexBold text-5xl md:text-7xl uppercase leading-[1.02] tracking-tight">
            <span className="block text-[#F2F6F8]">Your Next Role,</span>
            <span className="block text-[#CFEAE0]">Engineered.</span>
          </h1>

          <p className="mt-6 text-[#8FA8B8] text-base md:text-lg leading-relaxed max-w-md">
            Build ATS-ready resumes, run adaptive technical interviews, and
            track high-signal openings from one workspace.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/resume"
              className="group inline-flex items-center gap-2 bg-[#CFEAE0] hover:bg-[#CFEAE0]/90 active:scale-[0.98] text-[#131B2B] px-6 py-3 rounded-md text-sm font-semibold transition-all"
            >
              Build Resume
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
            </a>

            <a
              href="/interview"
              className="inline-flex items-center bg-[#131B2B]/80 hover:bg-[#131B2B] border border-[#2F4A63] hover:border-[#5B91A3] text-[#CFEAE0] px-6 py-3 rounded-md text-sm font-medium transition-colors"
            >
              Practice Interview
            </a>
          </div>

          <div className="mt-12 pt-6 border-t border-[#2F4A63]/40 grid grid-cols-3 gap-4 max-w-md">
            {[
              ["01", "ATS-Ready Resumes"],
              ["02", "Adaptive Interviews"],
              ["03", "Curated Job Feed"],
            ].map(([num, label]) => (
              <div key={num}>
                <span className="block font-mono text-[11px] text-[#5B91A3] mb-1">
                  {num}
                </span>
                <span className="block text-xs font-medium text-[#CFEAE0]/90 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
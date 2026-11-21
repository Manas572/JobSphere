import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Galaxy from "./Galaxy";
import OptionWheel from "./OptionWheel";

const FEATURES = [
  {
    index: "01",
    tag: "Resume Builder",
    title: "Resumes that beat the ATS",
    description:
      "Craft a logic-driven, ATS-friendly resume with live preview and multiple templates. Auto-saved as you type, deployable in one click.",
    points: [
      "ATS-optimized templates",
      "Live preview while editing",
      "One-click deployed link",
    ],
    href: "/resume",
    cta: "Open Builder",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#2F4A63]/50 pb-3">
          <span className="font-mono text-xs text-[#CFEAE0]">resume_v3.pdf</span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#2F4A63]/50 text-[#CFEAE0]">
            ATS 94/100
          </span>
        </div>
        <div className="space-y-2.5">
          {[
            ["Keyword Density", "96%", "w-[96%]"],
            ["Section Structure", "100%", "w-full"],
            ["Impact Metrics", "88%", "w-[88%]"],
          ].map(([label, score, width]) => (
            <div key={label}>
              <div className="flex justify-between font-mono text-[11px] mb-1">
                <span className="text-[#8FA8B8]">{label}</span>
                <span className="text-[#CFEAE0]">{score}</span>
              </div>
              <div className="h-1.5 w-full bg-[#0a0a10] rounded-sm overflow-hidden">
                <div className={`h-full ${width} bg-[#5B91A3]`} />
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-[#5B91A3]">
          <span>Auto-saved · 2s ago</span>
          <span className="text-[#CFEAE0]">/r/manas-dev ↗</span>
        </div>
      </div>
    ),
  },
  {
    index: "02",
    tag: "AI Interviews",
    title: "Mock interviews that fight back",
    description:
      "Three locked rounds — conceptual, hands-on coding verified against your real Codeforces handle, and a project deep-dive. Difficulty escalates with your answers.",
    points: [
      "Adaptive questioning engine",
      "Codeforces-verified coding round",
      "3-round locked flow",
    ],
    href: "/interview",
    cta: "Start Session",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#2F4A63]/50 pb-3">
          <span className="font-mono text-xs text-[#CFEAE0]">interview / pipeline</span>
          <span className="font-mono text-[11px] text-[#5B91A3]">Adaptive · ON</span>
        </div>
        {[
          { step: "R1", name: "Conceptual Core", status: "Passed · 0.91", active: false },
          { step: "R2", name: "Codeforces Verified", status: "In Progress", active: true },
          { step: "R3", name: "Project Deep-Dive", status: "Locked", active: false },
        ].map((round) => (
          <div
            key={round.step}
            className={`flex items-center justify-between px-3 py-2.5 rounded-md border font-mono text-xs ${
              round.active
                ? "bg-[#2F4A63]/35 border-[#5B91A3]/70 text-[#CFEAE0]"
                : "bg-[#0a0a10]/60 border-[#2F4A63]/40 text-[#8FA8B8]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[#5B91A3]">{round.step}</span>
              <span>{round.name}</span>
            </div>
            <span className="text-[11px]">{round.status}</span>
          </div>
        ))}
        <div className="pt-1 flex justify-between font-mono text-[11px] text-[#5B91A3]">
          <span>Difficulty State</span>
          <span className="text-[#CFEAE0]">Medium → Hard</span>
        </div>
      </div>
    ),
  },
  {
    index: "03",
    tag: "Job Discovery",
    title: "Matched to roles that fit",
    description:
      "Your resume and interview performance feed a matching engine that surfaces top-tier opportunities — not a firehose of irrelevant listings.",
    points: [
      "Skill-based matching",
      "Recruiter-visible profile",
      "Top-tier opportunities only",
    ],
    href: "/jobs",
    cta: "Browse Roles",
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#2F4A63]/50 pb-3">
          <span className="font-mono text-xs text-[#CFEAE0]">feed / high-signal</span>
          <span className="font-mono text-[11px] text-[#5B91A3]">3 new matches</span>
        </div>
        {[
          { role: "Backend Engineer", stack: "Python · Django · Postgres", fit: "96% fit" },
          { role: "Full-Stack SWE", stack: "React · FastAPI · Docker", fit: "92% fit" },
          { role: "ML Systems Intern", stack: "PyTorch · NLP · APIs", fit: "89% fit" },
        ].map((job) => (
          <div
            key={job.role}
            className="flex items-center justify-between px-3 py-2.5 rounded-md bg-[#0a0a10]/60 border border-[#2F4A63]/40"
          >
            <div>
              <p className="text-xs font-medium text-[#F2F6F8]">{job.role}</p>
              <p className="font-mono text-[11px] text-[#5B91A3] mt-0.5">{job.stack}</p>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#2F4A63]/45 text-[#CFEAE0]">
              {job.fit}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const f = FEATURES[active];

  return (
    <section className="relative bg-[#0a0a10] border-t border-[#2F4A63]/30 py-24 px-6 overflow-hidden">
      <Galaxy
        className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
        transparent
        density={0.6}
        speed={0.4}
        glowIntensity={0.2}
        twinkleIntensity={0.4}
        hueShift={140}
        mouseInteraction={false}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#5B91A3] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#2F4A63]" />
            The Toolkit
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F2F6F8] tracking-tight leading-tight">
            Everything between you and the offer.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-12 items-center">
          {/* Wheel */}
          <div className="justify-self-center h-[380px] w-full max-w-[340px]">
            <OptionWheel
              items={FEATURES.map((x) => x.tag)}
              defaultSelected={active}
              onChange={setActive}
            />
          </div>

          {/* Feature Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="grid md:grid-cols-2 gap-8 items-center bg-[#131B2B]/60 backdrop-blur-sm border border-[#2F4A63]/50 rounded-xl p-6 md:p-8"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5B91A3]">
                  <span>{f.index}</span>
                  <span>/</span>
                  <span>{f.tag}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[#F2F6F8] mt-3 leading-snug">
                  {f.title}
                </h3>

                <p className="mt-4 text-[#8FA8B8] leading-relaxed text-sm md:text-base">
                  {f.description}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-[#2F4A63]/40 pt-5">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 text-[#CFEAE0]/90 text-sm"
                    >
                      <span className="size-1.5 rounded-sm bg-[#5B91A3] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href={f.href}
                  className="group inline-flex items-center gap-2 mt-7 bg-[#CFEAE0] hover:bg-[#CFEAE0]/90 active:scale-[0.98] text-[#131B2B] px-5 py-2.5 rounded-md text-sm font-semibold transition-all"
                >
                  {f.cta}
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
              </div>

              {/* Purpose-built Preview Panel */}
              <div className="bg-[#0E1522]/90 border border-[#2F4A63]/60 rounded-lg p-5">
                {f.preview}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Galaxy from "@/components/Galaxy";
import OptionWheel from "@/components/OptionWheel";

const FEATURES = [
  {
    tag: "Resume Builder",
    title: "Resumes that beat the ATS",
    description:
      "Craft a logic-driven, ATS-friendly resume with live preview and multiple templates. Auto-saved as you type, deployable in one click.",
    points: ["ATS-optimized templates", "Live preview while editing", "One-click deployed link"],
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "AI Interviews",
    title: "Mock interviews that fight back",
    description:
      "Three locked rounds — conceptual, hands-on coding verified against your real Codeforces handle, and a project deep-dive. Difficulty escalates with your answers.",
    points: ["Adaptive questioning engine", "Codeforces-verified coding round", "3-round locked flow"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "Job Discovery",
    title: "Matched to roles that fit",
    description:
      "Your resume and interview performance feed a matching engine that surfaces top-tier opportunities — not a firehose of irrelevant listings.",
    points: ["Skill-based matching", "Recruiter-visible profile", "Top-tier opportunities only"],
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const f = FEATURES[active];

  return (
    <section className="relative bg-[#0a0a10] py-24 px-6 overflow-hidden">
      <Galaxy
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        transparent
        density={0.6}
        speed={0.4}
        glowIntensity={0.2}
        twinkleIntensity={0.4}
        hueShift={140}
        mouseInteraction={false}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 mb-5">
            The Toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Everything between you and the offer.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center">
          {/* wheel */}
          <div className="justify-self-center h-[400px] w-[300px]">
            <OptionWheel
              items={FEATURES.map((x) => x.tag)}
              activeIndex={active}
              onChange={setActive}
            />
          </div>

          {/* feature display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                  {f.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
                  {f.title}
                </h3>
                <p className="mt-5 text-gray-400 leading-relaxed text-base">
                  {f.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-7 py-3 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5"
                >
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/20 to-purple-600/10 blur-2xl rounded-3xl pointer-events-none" />
                <img
                  src={f.image}
                  alt={f.tag}
                  className="relative w-full rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
import { create } from "zustand";

// Remove tokens saved by older versions; auth tokens now live only in HttpOnly cookies.
if (typeof window !== "undefined") window.localStorage.removeItem("nexthire-storage");

export const useAuthStore = create((set) => ({
  user: null,
  setAuth: (user) => set({ user }),
  logout: () => set({ user: null }),
}));


export const useextskills=create((set)=>({
  extskills:[],
  setextskills:(arr)=>set({extskills:arr})
}))


export const useusedq = create((set) => ({
    used_q: [],
    addQuestion: (id) =>
        set((state) => ({
            used_q: [...state.used_q, id]
        }))
}));


export const useResumeStore = create((set) => ({
  title: "Untitled",
  accentColor: "#3B82F6",
  isPublic: false,
  professional_summary: "",
  template: "Classic",
  included_educations: [],
  included_experiences: [],
  included_projects: [],
  included_skills: [],
  setTitle: (title) => set({ title }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setProSum: (professional_summary) =>set({ professional_summary }),
  setIsPublic: (isPublic) => set({ isPublic }),
  setTemplate: (template) => set({ template }),
  toggleList: (field, id) =>
    set((state) => ({
      [field]: state[field].includes(id)
        ? state[field].filter((itemId) => itemId !== id)
        : [...state[field], id],
    })),
}));

export const useInterviewStore = create((set) => ({
  round: 1, 
  r1Messages: [],
  r3Messages: [],
  resumeContext: { skills: [], projects: [] },
  cf: { handle: null, verified: false, problemIndex: 0, problems: [], challenge: null },

  addMessage: (round, msg) =>
    set((s) =>
      round === 1
        ? { r1Messages: [...s.r1Messages, msg] }
        : { r3Messages: [...s.r3Messages, msg] },
    ),
  setResumeContext: (resumeContext) => set({ resumeContext }),
  nextRound: () => set((s) => ({ round: Math.min(3, s.round + 1) })),
  setCFChallenge: (handle, challenge) => set((s) => ({ cf: { ...s.cf, handle, challenge } })),
  verifyHandle: (handle, problems) => set({ cf: { handle, verified: true, problemIndex: 0, problems: ['1000', '1400', '1700'].map((rating) => problems?.[rating]).filter(Boolean), challenge: null } }),
  passProblem: () => set((s) => ({ cf: { ...s.cf, problemIndex: s.cf.problemIndex + 1 } })),
  reset: () => set({ round: 1, r1Messages: [], r3Messages: [], resumeContext: { skills: [], projects: [] }, cf: { handle: null, verified: false, problemIndex: 0, problems: [], challenge: null } }),
}));

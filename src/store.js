import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setAuth: (accessToken, refreshToken, user) => {
        set({ accessToken, refreshToken, user });
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "nexthire-storage",
    }
  )
);


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

export const PROBLEMS = [
  { n: 1, rating: 1000 },
  { n: 2, rating: 1400 },
  { n: 3, rating: 1700 },
];

export const useInterviewStore = create((set) => ({
  round: 1, 
  r1Messages: [],
  r3Messages: [],
  cf: { handle: null, verified: false, problemIndex: 0 }, 

  addMessage: (round, msg) =>
    set((s) =>
      round === 1
        ? { r1Messages: [...s.r1Messages, msg] }
        : { r3Messages: [...s.r3Messages, msg] },
    ),
  nextRound: () => set((s) => ({ round: Math.min(3, s.round + 1) })),
  verifyHandle: (handle) => set({ cf: { handle, verified: true, problemIndex: 0 } }),
  passProblem: () =>
    set((s) => ({ cf: { ...s.cf, problemIndex: s.cf.problemIndex + 1 } })),
  reset: () => set({ round: 1, r1Messages: [], r3Messages: [], cf: { handle: null, verified: false, problemIndex: 0 } }),
}));
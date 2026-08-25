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
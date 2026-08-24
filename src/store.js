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
  professional_summary:"",
  template:'Classic',
  inc_edu:[],
  inc_exp:[],
  inc_pro:[],
  inc_skills:[],
  setTitle: (title) => set({ title }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setProSum: (professional_summary) => set({ professional_summary }),
  setIsPublic: (isPublic) => set({ isPublic }),
  setTemplate: (template) => set({ template }),
  set_inc_edu: (inc_edu) => set({ inc_edu }),
  set_inc_exp: (inc_exp) => set({ inc_exp }),
  set_inc_exp: (inc_pro) => set({ inc_pro }),
  set_inc_exp: (inc_skills) => set({ inc_skills }),
}));
import { User } from "constants";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: {} }),
}));

import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  isLogged: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsLogged: (isLogged) => set({ isLogged }),
  logout: () => {
    set({ user: null, token: null, isLogged: false });
    localStorage.removeItem("token");
  },
}));

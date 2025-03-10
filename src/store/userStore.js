import { create } from "zustand";

export const useUserStore = create((set) => ({
  
  isLogged: !!localStorage.getItem("token"),
  loginAuthorized: () => set({ isLogged: true}),
  logout: () => set({ isLogged: false }, localStorage.removeItem("token")),
}));

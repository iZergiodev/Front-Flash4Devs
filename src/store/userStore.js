import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogged: false,
      login: (userData, accessToken) =>
        set({
          user: userData,
          token: accessToken,
          isLogged: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isLogged: false,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);

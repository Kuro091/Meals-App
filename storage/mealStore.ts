import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from '../lib/zustand-async-storage';

export interface SimpleState {
  favoriteMealId: string | null;
  setFavoriteMealId: (id: string) => void;
}

export const useSimpleStore = create<SimpleState>()(
  persist(
    (set, get) => ({
      favoriteMealId: null,
      setFavoriteMealId: (id) => set({ favoriteMealId: id }),
    }),
    {
      name: "async-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

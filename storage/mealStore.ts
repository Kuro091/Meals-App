import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from '../lib/zustand-async-storage';

export interface SimpleState {
  favoriteMealIds: string[];
  setFavoriteMealIds: (ids: string[]) => void;
}

export const useMealsStore = create<SimpleState>()(
  persist(
    (set, get) => ({
      favoriteMealIds: [],
      setFavoriteMealIds: (ids) => set({ favoriteMealIds: ids }),
    }),
    {
      name: "async-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export const useShallowMealsStore = () => useMealsStore(
  useShallow((state) => state)
)
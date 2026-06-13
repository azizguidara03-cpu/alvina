import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  isFirstLoad: boolean;
  setFirstLoadComplete: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.isDarkMode;
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newMode };
        }),
      setDarkMode: (value) =>
        set(() => {
          if (value) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: value };
        }),
      cursorText: '',
      setCursorText: (text) => set({ cursorText: text }),
      isFirstLoad: true,
      setFirstLoadComplete: () => set({ isFirstLoad: false }),
    }),
    {
      name: 'alvina-ui-storage',
      partialize: (state) => ({ isDarkMode: state.isDarkMode, isFirstLoad: state.isFirstLoad }),
    }
  )
);

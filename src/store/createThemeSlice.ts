import { StateCreator } from 'zustand';

export interface IThemeSlice {
  isDarkMode: boolean;
  toggleTheme: (v: boolean) => void;
}

export const createThemeSlice: StateCreator<IThemeSlice> = set => ({
  isDarkMode: true,
  toggleTheme: (v: boolean): void => {
    set(state => ({ isDarkMode: v ?? !state.isDarkMode }));
  },
});

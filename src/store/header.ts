import create from 'zustand';
import { persist } from 'zustand/middleware';
import { HEADER_STORAGE_NAME } from 'constants/storage';

export interface HeaderStore {
  currentTime: number;
  timerId: number;
  setCurrentTime: () => void;
  setTimerId: (id: number) => void;
  resetCurrentTime: () => void;
  clearTimer: () => void;
}

export const useHeaderStore = create<HeaderStore>(
  persist(
    (set, get) => ({
      currentTime: 0,
      timerId: 0,
      setCurrentTime: () => {
        set((state) => {
          const nextTime = state.currentTime + 1000; // millesecond
          return { currentTime: nextTime };
        });
      },
      setTimerId: (id: number) => {
        set(() => ({ timerId: id }));
      },
      resetCurrentTime: () => {
        set(() => {
          return { currentTime: 0 };
        });
      },
      clearTimer: () => {
        clearInterval(get().timerId);
      },
    }),
    {
      name: HEADER_STORAGE_NAME,
      getStorage: () => sessionStorage,
    },
  ),
);

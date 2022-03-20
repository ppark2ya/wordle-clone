import create from 'zustand';

export interface HeaderStore {
  currentTime: number;
  timerId: number;
  setCurrentTime: () => void;
  setTimerId: (id: number) => void;
  resetCurrentTime: () => void;
  clearTimer: () => void;
}

export const useHeaderStore = create<HeaderStore>((set, get) => ({
  currentTime: 0,
  timerId: 0,
  setCurrentTime: () => {
    set((state) => {
      const nextTime = state.currentTime + 1000; // millesecond
      sessionStorage.currentTime = nextTime;

      return { currentTime: nextTime };
    });
  },
  setTimerId: (id: number) => {
    set(() => ({ timerId: id }));
  },
  resetCurrentTime: () => {
    set(() => {
      sessionStorage.currentTime = 0;
      return { currentTime: 0 };
    });
  },
  clearTimer: () => {
    clearInterval(get().timerId);
  },
}));

import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { HEADER_STORAGE_NAME } from 'constants/storage';
import { deserializer, serializer } from 'utils/encoder';

export interface HeaderStore {
  currentTime: number;
  timerId: number;
  setCurrentTime: () => void;
  setTimerId: (id: number) => void;
  resetCurrentTime: () => void;
  clearTimer: () => void;
}

export const useHeaderStore = create<HeaderStore>(
  devtools(
    persist(
      (set, get) => ({
        currentTime: 0,
        timerId: 0,
        setCurrentTime: () => {
          set((state) => ({
            currentTime: state.currentTime + 1000,
          }));
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
        serialize: (state) => serializer(state),
        deserialize: (serializeString) => deserializer(serializeString),
      },
    ),
  ),
);

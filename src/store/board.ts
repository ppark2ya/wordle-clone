/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { TILE_STATUS } from 'constants/status';
import { GAMEBOARD_STORAGE_NAME } from 'constants/storage';

export interface GameBoard {
  // 정답
  answer: string[];
  // 유저 입력 값
  userAnswer: string[];
  // 해당 줄이 완료되었는지 여부
  isDone: boolean;
  // 제출한 답안 상태
  submitAnswer: TILE_STATUS[];
}

export interface KeyboardItem {
  key: string;
  addClassName: string;
}

export interface BoardStore {
  gameBoards: [GameBoard[], GameBoard[], GameBoard[], GameBoard[], GameBoard[]];
  keyboardItems: [KeyboardItem[], KeyboardItem[], KeyboardItem[]];
}

const initialGameBoardItem: GameBoard = {
  answer: [],
  userAnswer: [],
  isDone: false,
  submitAnswer: [],
};

const initialKeyboardItems: [KeyboardItem[], KeyboardItem[], KeyboardItem[]] = [
  [
    {
      key: 'q',
      addClassName: 'key',
    },
    {
      key: 'w',
      addClassName: 'key',
    },
    {
      key: 'e',
      addClassName: 'key',
    },
    {
      key: 'r',
      addClassName: 'key',
    },
    {
      key: 't',
      addClassName: 'key',
    },
    {
      key: 'y',
      addClassName: 'key',
    },
    {
      key: 'u',
      addClassName: 'key',
    },
    {
      key: 'i',
      addClassName: 'key',
    },
    {
      key: 'o',
      addClassName: 'key',
    },
    {
      key: 'p',
      addClassName: 'key',
    },
  ],
  [
    {
      key: '',
      addClassName: 'flex-[0.5]',
    },
    {
      key: 'a',
      addClassName: 'key',
    },
    {
      key: 's',
      addClassName: 'key',
    },
    {
      key: 'd',
      addClassName: 'key',
    },
    {
      key: 'f',
      addClassName: 'key',
    },
    {
      key: 'g',
      addClassName: 'key',
    },
    {
      key: 'h',
      addClassName: 'key',
    },
    {
      key: 'j',
      addClassName: 'key',
    },
    {
      key: 'k',
      addClassName: 'key',
    },
    {
      key: 'l',
      addClassName: 'key',
    },
    {
      key: '',
      addClassName: 'flex-[0.5]',
    },
  ],
  [
    {
      key: 'enter',
      addClassName: 'key flex-[1.5]',
    },
    {
      key: 'z',
      addClassName: 'key',
    },
    {
      key: 'x',
      addClassName: 'key',
    },
    {
      key: 'c',
      addClassName: 'key',
    },
    {
      key: 'v',
      addClassName: 'key',
    },
    {
      key: 'b',
      addClassName: 'key',
    },
    {
      key: 'n',
      addClassName: 'key',
    },
    {
      key: 'm',
      addClassName: 'key',
    },
    {
      key: 'backspace',
      addClassName: 'key flex-[1.5]',
    },
  ],
];

const gameBoardItems = new Array(5).fill(0).map(() => initialGameBoardItem);
export const useBoardStore = create<BoardStore>(
  persist(
    (set, get) => ({
      gameBoards: [
        [...gameBoardItems],
        [...gameBoardItems],
        [...gameBoardItems],
        [...gameBoardItems],
        [...gameBoardItems],
      ],
      keyboardItems: initialKeyboardItems,
    }),
    {
      name: GAMEBOARD_STORAGE_NAME,
      getStorage: () => sessionStorage,
    },
  ),
);

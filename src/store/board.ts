/* eslint-disable @typescript-eslint/no-unused-vars */
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TILE_STATUS } from 'constants/status';
import { GAMEBOARD_STORAGE_NAME } from 'constants/storage';
import { deserializer, serializer } from 'utils/encoder';

export interface GameBoard {
  // 유저 입력 값
  userAnswer: string;
  // 제출한 답안 상태
  tileStatus: TILE_STATUS[];
}

export interface KeyboardItem {
  key: string;
  addClassName: string;
}

export interface BoardStore {
  solution: string;
  words: string[];
  gameBoards: GameBoard[];
  keyboardItems: [KeyboardItem[], KeyboardItem[], KeyboardItem[]];
  currentAnswer: string;
  currentRow: number;
  setGameBoardSolution: (solution: string) => void;
  setAllWords: (words: string[]) => void;
  setCurrentAnswer: (currentAnswer: string) => void;
  submitUserAnswer: () => void;
}

const initialGameBoardItem: GameBoard = {
  userAnswer: '',
  tileStatus: [],
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

const gameBoardItemRows = new Array(6).fill(0).map(() => initialGameBoardItem);

export const useBoardStore = create<BoardStore>(
  devtools(
    persist(
      (set) => ({
        solution: '',
        words: [''],
        gameBoards: gameBoardItemRows,
        keyboardItems: initialKeyboardItems,
        currentAnswer: '',
        currentRow: 0,
        setGameBoardSolution: (solution: string) => {
          set(() => ({ solution }));
        },
        setAllWords: (words: string[]) => {
          set(() => ({ words }));
        },
        setCurrentAnswer: (currentAnswer: string) => {
          set((state) => {
            const { gameBoards, currentRow } = state;
            const newGameBoards = gameBoards.map((gameboard, row) => {
              if (currentRow === row) {
                return {
                  ...gameboard,
                  userAnswer: currentAnswer,
                };
              } else {
                return {
                  ...gameboard,
                };
              }
            });

            return { gameBoards: newGameBoards, currentAnswer };
          });
        },
        submitUserAnswer: () => {
          set((state) => {
            const {
              solution,
              gameBoards,
              keyboardItems,
              currentAnswer,
              currentRow,
            } = state;

            const tileStatus: TILE_STATUS[] = [];
            const queue: string[] = [];
            let temp: TILE_STATUS = TILE_STATUS.NONE;

            for (let i = 0; i < currentAnswer.length; i++) {
              for (let j = 0; j < solution.length; j++) {
                // 같은 문자가 있을 때
                if (currentAnswer[i] === solution[j].toUpperCase()) {
                  // 위치도 같다면
                  if (i === j) {
                    queue.push(solution[j]);
                    temp = TILE_STATUS.CORRECT;
                    break;
                  } else {
                    if (queue.includes(solution[j])) {
                      // 앞에서 나온 철자인 경우 색을 칠하지 않음
                      temp = TILE_STATUS.ABSENT;
                    } else {
                      queue.push(solution[j]);
                      temp = TILE_STATUS.PRESENT;
                      break;
                    }
                  }
                } else {
                  temp = TILE_STATUS.ABSENT;
                }
              }
              tileStatus[i] = temp;
            }

            const newGameBoards = gameBoards.map((gameboard, row) => {
              if (currentRow === row) {
                return {
                  ...gameboard,
                  userAnswer: currentAnswer,
                  tileStatus,
                };
              } else {
                return {
                  ...gameboard,
                };
              }
            });

            return {
              gameBoards: newGameBoards,
              currentAnswer: '',
              currentRow: state.currentRow + 1,
            };
          });
        },
      }),
      {
        name: GAMEBOARD_STORAGE_NAME,
        getStorage: () => sessionStorage,
        serialize: (state) => serializer(state),
        deserialize: (serializeString) => deserializer(serializeString),
      },
    ),
  ),
);

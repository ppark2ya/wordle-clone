import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  BOARD_COL_COUNT,
  BOARD_ROW_COUNT,
  ROW_STATUS,
  TILE_ANIMATION_STATUS,
  TILE_STATUS,
} from 'constants/status';
import { GAMEBOARD_STORAGE_NAME } from 'constants/storage';
import { deserializer, serializer } from 'utils/encoder';

export interface GameBoard {
  // 유저 입력 값
  userAnswer: string;
  // 제출한 답안 상태
  tileStatus: TILE_STATUS[];
  tileAnimationStatus: TILE_ANIMATION_STATUS[];
}

export interface KeyboardItem {
  key: string;
  addClassName: string;
  status?: TILE_STATUS;
}

export interface KeyboardStatus {
  key: string;
  status: TILE_STATUS;
}

export interface BoardStore {
  solution: string;
  words: string[];
  gameBoards: GameBoard[];
  keyboardItems: [KeyboardItem[], KeyboardItem[], KeyboardItem[]];
  keyboardStatusList: KeyboardStatus[];
  currentAnswer: string;
  currentRow: number;
  isGameEnd: boolean;
  rowAnimationStatus: ROW_STATUS;
  setGameBoardSolution: (solution: string) => void;
  setAllWords: (words: string[]) => void;
  setCurrentAnswer: (currentAnswer: string) => void;
  submitUserAnswer: () => void;
  setRowAnimationStatus: (rowStatus: ROW_STATUS, delay: number) => void;
  resetGame: () => void;
}

const initialGameBoardItem: GameBoard = {
  userAnswer: '',
  tileStatus: [],
  tileAnimationStatus: [],
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

const initialKeyboardStatus: KeyboardStatus[] = [];
const gameBoardItemRows = new Array(BOARD_ROW_COUNT)
  .fill(0)
  .map(() => initialGameBoardItem);

const initialState = {
  solution: '',
  words: [''],
  gameBoards: gameBoardItemRows,
  keyboardItems: initialKeyboardItems,
  keyboardStatusList: initialKeyboardStatus,
  currentAnswer: '',
  isGameEnd: false as boolean,
  currentRow: 0,
  rowAnimationStatus: ROW_STATUS.NONE,
};

export const useBoardStore = create<BoardStore>(
  devtools(
    persist(
      (set) => ({
        ...initialState,
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
              keyboardStatusList,
              currentAnswer,
              currentRow,
            } = state;

            const tileStatus: TILE_STATUS[] = [];
            const queue: string[] = [];
            const temp: KeyboardStatus = {
              key: '',
              status: TILE_STATUS.NONE,
            };
            const cloneKeyboardStatusList = keyboardStatusList.slice();

            for (let i = 0; i < currentAnswer.length; i++) {
              for (let j = 0; j < solution.length; j++) {
                // 같은 문자가 있을 때
                if (currentAnswer[i] === solution[j].toUpperCase()) {
                  // 위치도 같다면
                  if (i === j) {
                    queue.push(solution[j]);
                    temp.status = TILE_STATUS.CORRECT;
                    break;
                  } else {
                    if (queue.includes(solution[j])) {
                      // 앞에서 나온 철자인 경우 색을 칠하지 않음
                      temp.status = TILE_STATUS.ABSENT;
                    } else {
                      queue.push(solution[j]);
                      temp.status = TILE_STATUS.PRESENT;
                      break;
                    }
                  }
                } else {
                  temp.status = TILE_STATUS.ABSENT;
                }
              }
              tileStatus[i] = temp.status;

              const itemIndex = cloneKeyboardStatusList.findIndex(
                (ks) => ks.key === currentAnswer[i],
              );
              // 이전에 없는 입력값이면 추가하고 있던 값이면 상태를 비교해서 저장한다.
              if (itemIndex === -1) {
                cloneKeyboardStatusList.push({
                  ...temp,
                  key: currentAnswer[i],
                });
              } else {
                const { status } = cloneKeyboardStatusList[itemIndex];

                if (tileStatus[i] === TILE_STATUS.CORRECT) {
                  cloneKeyboardStatusList[itemIndex].status =
                    TILE_STATUS.CORRECT;
                } else if (tileStatus[i] === TILE_STATUS.PRESENT) {
                  if (status !== TILE_STATUS.CORRECT) {
                    cloneKeyboardStatusList[itemIndex].status =
                      TILE_STATUS.PRESENT;
                  }
                }
              }
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

            const newKeyboardItems = keyboardItems.map((keyboardItem) =>
              keyboardItem.map((keyItem) => {
                const key = cloneKeyboardStatusList.find(
                  (ks) => ks.key === keyItem.key.toUpperCase(),
                );

                if (key) {
                  let addClassName = '';
                  switch (key.status) {
                    case TILE_STATUS.CORRECT:
                      addClassName = `key ${key.status.toLowerCase()}`;
                      break;
                    case TILE_STATUS.PRESENT:
                      addClassName = `key ${key.status.toLowerCase()}`;
                      break;
                    case TILE_STATUS.ABSENT:
                      addClassName = `key ${key.status.toLowerCase()}`;
                      break;
                  }
                  return {
                    ...keyItem,
                    addClassName,
                  };
                } else {
                  return {
                    ...keyItem,
                  };
                }
              }),
            ) as [KeyboardItem[], KeyboardItem[], KeyboardItem[]];

            const numerOfCorrectTile = tileStatus.reduce(
              (num, ts: TILE_STATUS) =>
                ts === TILE_STATUS.CORRECT ? num + 1 : num,
              0,
            );

            return {
              gameBoards: newGameBoards,
              keyboardItems: newKeyboardItems,
              keyboardStatusList: cloneKeyboardStatusList,
              currentAnswer: '',
              currentRow: currentRow + 1,
              // 현재 타일이 클리어됐거나 마지막 row이면 게임 종료
              isGameEnd:
                numerOfCorrectTile === BOARD_COL_COUNT ||
                currentRow === BOARD_ROW_COUNT,
            };
          });
        },
        setRowAnimationStatus: (rowStatus: ROW_STATUS, delay: number) => {
          set(() => ({ rowAnimationStatus: rowStatus }));
          setTimeout(() => {
            set(() => ({ rowAnimationStatus: ROW_STATUS.NONE }));
          }, delay);
        },
        resetGame: () => {
          set(() => ({ ...initialState }));
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

import React from 'react';
import shallow from 'zustand/shallow';
import classnames from 'classnames';
import { GameBoard as GameBoardType, useBoardStore } from 'store/board';
import {
  BOARD_COL_COUNT,
  ROW_STATUS,
  TILE_ANIMATION_STATUS,
} from 'constants/status';

/**
 * @desc 상태에 따른 타일 색상 ( 클립보드 저장 용 )
 * correct: 🟩
 * present: 🟨
 * absent: ⬛
 * any: ⬜
 */
function GameBoard() {
  const { gameBoards, currentRow, rowAnimationStatus } = useBoardStore(
    (state) => ({
      gameBoards: state.gameBoards,
      currentRow: state.currentRow,
      rowAnimationStatus: state.rowAnimationStatus,
    }),
    shallow,
  );

  const renderGameboardItems = gameBoards.reduce(
    (rows: React.ReactElement[], board: GameBoardType, i) => {
      const animationEnable = currentRow === i;
      const rowClasses = classnames('grid grid-cols-5 gap-1', {
        invalid: animationEnable && rowAnimationStatus === ROW_STATUS.INVALID,
      });

      rows[i] = (
        <div key={i} className={rowClasses}>
          {new Array(BOARD_COL_COUNT).fill(0).map((_, j) => {
            const tileClasses = classnames(
              'game-tile',
              board.tileStatus[j]?.toLowerCase() ?? '',
              {
                'pop-in': board.userAnswer[j] !== undefined,
                'flip-in':
                  board.tileAnimationStatus[j] ===
                  TILE_ANIMATION_STATUS.FLIP_IN,
                'flip-out':
                  board.tileAnimationStatus[j] ===
                  TILE_ANIMATION_STATUS.FLIP_OUT,
              },
            );

            return (
              <div key={j} className={tileClasses}>
                {board.userAnswer[j]}
              </div>
            );
          })}
        </div>
      );
      return rows;
    },
    [],
  );

  return (
    <div className="flex items-center justify-center grow">
      <div className="grid grid-rows-6 gap-1">{renderGameboardItems}</div>
    </div>
  );
}

export default React.memo(GameBoard);

import React from 'react';
import shallow from 'zustand/shallow';
import classnames from 'classnames';
import { GameBoard as GameBoardType, useBoardStore } from 'store/board';
import { BOARD_COL_COUNT } from 'constants/status';

/**
 * @desc 상태에 따른 타일 색상 ( 클립보드 저장 용 )
 * correct: 🟩
 * present: 🟨
 * absent: ⬛
 * any: ⬜
 */
function GameBoard() {
  const [gameBoards] = useBoardStore((state) => [state.gameBoards], shallow);

  const renderGameboardItems = gameBoards.reduce(
    (rows: React.ReactElement[], board: GameBoardType, i) => {
      rows[i] = (
        <div key={i} className="grid grid-cols-5 gap-1">
          {new Array(BOARD_COL_COUNT).fill(0).map((_, j) => {
            const tileClasses = classnames(
              'game-tile',
              board.tileStatus[j]?.toLowerCase() ?? '',
              {
                'pop-in': board.userAnswer[j] !== undefined,
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

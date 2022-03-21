import React from 'react';
import shallow from 'zustand/shallow';
import { GameBoard as GameBoardType, useBoardStore } from 'store/board';

function GameBoard() {
  const [solution, gameBoards] = useBoardStore(
    (state) => [state.solution, state.gameBoards],
    shallow,
  );
  const TILE_LENGTH = React.useMemo(() => solution.length, [solution]);

  const renderGameboardItems = gameBoards.reduce(
    (rows: React.ReactElement[], board: GameBoardType, i) => {
      rows[i] = (
        <div key={i} className="grid grid-cols-5 gap-1">
          {new Array(TILE_LENGTH).fill(0).map((_, j) => (
            <div
              key={j}
              className={`game-tile ${
                board.tileStatus[j]?.toLowerCase() ?? ''
              }`}
            >
              {board.userAnswer[j]}
            </div>
          ))}
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

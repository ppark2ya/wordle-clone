import React from 'react';
import shallow from 'zustand/shallow';
import { GameBoard as GameBoardType, useBoardStore } from 'store/board';

function GameBoard() {
  const [gameBoards] = useBoardStore((state) => [state.gameBoards], shallow);
  const renderGameboardItems = gameBoards.map((row: GameBoardType[], i) => (
    <div key={i} className="grid grid-cols-5 gap-1">
      {row.map((tile: GameBoardType, j) => (
        <div key={j} className="game-tile"></div>
      ))}
    </div>
  ));

  return (
    <div className="flex items-center justify-center grow">
      <div className="grid grid-rows-6 gap-1">{renderGameboardItems}</div>
    </div>
  );
}

export default React.memo(GameBoard);

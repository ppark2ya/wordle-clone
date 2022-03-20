import React from 'react';

function GameBoard() {
  return (
    <div className="flex items-center justify-center grow">
      <div className="grid grid-rows-6 gap-1">
        <div className="grid grid-cols-5 gap-1">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;

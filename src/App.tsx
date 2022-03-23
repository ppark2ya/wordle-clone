import React from 'react';
import Header from 'components/Header';
import { useWordleQuery } from 'services/wordle.hooks';
import { APP_STAGE } from './constants/environment';
import GameBoard from 'components/GameBoard';
import Keyboard from 'components/Keyboard';
import { useHeaderStore, useBoardStore } from 'store';
import { GAME_PROGRESS_TIME } from 'constants/time';

if (APP_STAGE === 'local') {
  require('./mocks');
}

function App() {
  const { data, refetch } = useWordleQuery();
  const [currentTime, resetCurrentTime] = useHeaderStore((state) => [
    state.currentTime,
    state.resetCurrentTime,
  ]);
  const [setAllWords, setGameBoardSolution, resetGame] = useBoardStore(
    (state) => [state.setAllWords, state.setGameBoardSolution, state.resetGame],
  );

  React.useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data.length - 1);
      setAllWords(data);
      setGameBoardSolution(data[randomIndex]);
    }
  }, [data]);

  React.useEffect(() => {
    if (currentTime === GAME_PROGRESS_TIME) {
      refetch();
      resetCurrentTime();
      resetGame();
    }
  }, [currentTime]);

  return (
    <div className="h-screen bg-night">
      <Header />
      <section className="max-w-lg sm:mx-auto flex flex-col h-[calc(100vh_-_3.5rem)]">
        <GameBoard />
        <Keyboard />
      </section>
    </div>
  );
}

export default App;

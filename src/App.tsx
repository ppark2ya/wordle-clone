import React from 'react';
import Header from 'components/Header';
import { useWordleQuery } from 'services/wordle.hooks';
import { APP_STAGE } from './constants/environment';
import GameBoard from 'components/GameBoard';
import Keyboard from 'components/Keyboard';
import { useBoardStore } from 'store/board';

if (APP_STAGE === 'local') {
  require('./mocks');
}

function App() {
  const { data } = useWordleQuery();
  const [setAllWords, setGameBoardSolution] = useBoardStore((state) => [
    state.setAllWords,
    state.setGameBoardSolution,
  ]);

  React.useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data.length - 1);
      setAllWords(data);
      setGameBoardSolution(data[randomIndex]);
    }
  }, [data]);

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

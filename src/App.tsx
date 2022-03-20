import React from 'react';
import Header from 'components/Header';
import { useWordleQuery } from 'services/wordle.hooks';
import { APP_STAGE } from './constants/environment';
import GameBoard from 'components/GameBoard';
import Keyboard from 'components/Keyboard';

if (APP_STAGE === 'local') {
  require('./mocks');
}

function App() {
  const { data } = useWordleQuery();
  console.log(data);

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

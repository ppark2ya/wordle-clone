import React from 'react';
import Header from 'components/Header';
import { useWordleQuery } from 'services/wordle.hooks';
import { APP_STAGE } from './constants/environment';
import GameBoard from 'components/GameBoard';
import Keyboard from 'components/Keyboard';

if (APP_STAGE === 'local') {
  require('./mocks');
}

const randomIndex = (len: number) => Math.floor(Math.random() * len);

function App() {
  useWordleQuery({
    onSuccess(data: string[]) {
      console.log(data);
      const len = data.length - 1;
      console.log(data[randomIndex(len)]);
    },
  });

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

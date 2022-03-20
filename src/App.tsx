import React from 'react';
import Header from 'components/Header';
import { useWordleQuery } from 'services/wordle.hooks';
import { APP_STAGE } from './constants/environment';

if (APP_STAGE === 'local') {
  require('./mocks');
}

function App() {
  const { data } = useWordleQuery();
  console.log(data);

  return (
    <div className="h-screen bg-night">
      <Header />
    </div>
  );
}

export default App;

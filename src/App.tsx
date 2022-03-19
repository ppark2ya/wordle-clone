import React from 'react';
import { useWordleQuery } from 'services/wordle.hooks';
import { APP_STAGE } from './constants/environment';

if (APP_STAGE === 'local') {
  require('./mocks');
}

function App() {
  const { data } = useWordleQuery();
  console.log(data);

  return (
    <div className="h-screen bg-black">
      <div className="text-blue-500 font-bold">Test</div>;
    </div>
  );
}

export default App;

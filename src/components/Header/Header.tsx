import React from 'react';
import Timer from './Timer';

function Header() {
  return (
    <header className="relative h-14 flex items-center justify-center border-b border-absent">
      <Timer />
      <h1 className="text-white text-4xl">Wordle</h1>
    </header>
  );
}

export default Header;

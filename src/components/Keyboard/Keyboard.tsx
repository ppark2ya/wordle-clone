import React from 'react';
import shallow from 'zustand/shallow';
import Backspace from 'assets/svgs/Backspace';
import { KeyboardItem, useBoardStore } from 'store/board';

function Keyboard() {
  const [keyboardItems] = useBoardStore(
    (state) => [state.keyboardItems],
    shallow,
  );

  const handleKeyupEvent = React.useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const regex = /^[a-zA-Z]$/i;

    if (regex.test(key) || key === 'Enter' || key === 'Backspace') {
      console.log(`key: ${key}`);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyupEvent);

    return () => {
      document.removeEventListener('keyup', handleKeyupEvent);
    };
  }, []);

  const renderKeyboardItems = keyboardItems.map((item: KeyboardItem[], i) => (
    <div key={i} className="keyboard-row">
      {item.map(({ key, addClassName }: KeyboardItem, j) => (
        <button key={`${key}-${j}`} className={addClassName}>
          {key === 'backspace' ? <Backspace /> : key}
        </button>
      ))}
    </div>
  ));

  return <footer className="game-keyboard h-48">{renderKeyboardItems}</footer>;
}

export default React.memo(Keyboard);

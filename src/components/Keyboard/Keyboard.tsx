import React from 'react';
import shallow from 'zustand/shallow';
import Backspace from 'assets/svgs/Backspace';
import { KeyboardItem, useBoardStore } from 'store/board';

function Keyboard() {
  const {
    words,
    keyboardItems,
    currentAnswer,
    setCurrentAnswer,
    submitUserAnswer,
  } = useBoardStore(
    (state) => ({
      words: state.words,
      keyboardItems: state.keyboardItems,
      currentAnswer: state.currentAnswer,
      setCurrentAnswer: state.setCurrentAnswer,
      submitUserAnswer: state.submitUserAnswer,
    }),
    shallow,
  );

  const submitUserSolution = React.useCallback(
    (key: string) => {
      const upperCaseKey = key.toUpperCase();
      if (upperCaseKey === 'ENTER') {
        if (currentAnswer.length === 5) {
          if (!words.includes(currentAnswer.toLowerCase())) {
            // TODO: Toast로 변경
            alert('존재하지 않는 단어입니다');
            return;
          }
          submitUserAnswer();
        }
      } else if (upperCaseKey === 'BACKSPACE') {
        if (currentAnswer.length !== 0) {
          setCurrentAnswer(currentAnswer.slice(0, currentAnswer.length - 1));
        }
      } else {
        if (currentAnswer.length !== 5) {
          setCurrentAnswer(currentAnswer + upperCaseKey);
        }
      }
    },
    [words, currentAnswer],
  );

  const handleKeyupEvent = React.useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      const regex = /^[a-zA-Z]$|(ENTER)|(BACKSPACE)/i;

      if (regex.test(key)) {
        submitUserSolution(key);
      }
    },
    [words, currentAnswer],
  );

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyupEvent);

    return () => {
      document.removeEventListener('keyup', handleKeyupEvent);
    };
  }, [words, currentAnswer]);

  const renderKeyboardItems = keyboardItems.map((item: KeyboardItem[], i) => (
    <div key={i} className="keyboard-row">
      {item.map(({ key, addClassName }: KeyboardItem, j) => (
        <button
          key={`${key}-${j}`}
          className={addClassName}
          onClick={() => submitUserSolution(key)}
        >
          {key === 'backspace' ? <Backspace /> : key}
        </button>
      ))}
    </div>
  ));

  return <footer className="game-keyboard h-48">{renderKeyboardItems}</footer>;
}

export default React.memo(Keyboard);

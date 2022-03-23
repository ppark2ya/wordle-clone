import React from 'react';
import shallow from 'zustand/shallow';
import Backspace from 'assets/svgs/Backspace';
import { KeyboardItem, useBoardStore } from 'store/board';
import { BOARD_COL_COUNT, ROW_STATUS } from 'constants/status';

function Keyboard() {
  const {
    words,
    keyboardItems,
    currentAnswer,
    isGameEnd,
    setCurrentAnswer,
    submitUserAnswer,
    setRowAnimationStatus,
  } = useBoardStore(
    (state) => ({
      words: state.words,
      keyboardItems: state.keyboardItems,
      currentAnswer: state.currentAnswer,
      isGameEnd: state.isGameEnd,
      setCurrentAnswer: state.setCurrentAnswer,
      submitUserAnswer: state.submitUserAnswer,
      setRowAnimationStatus: state.setRowAnimationStatus,
    }),
    shallow,
  );

  const submitUserSolution = React.useCallback(
    (key: string) => {
      const upperCaseKey = key.toUpperCase();
      if (upperCaseKey === 'ENTER') {
        if (currentAnswer.length === BOARD_COL_COUNT) {
          if (!words.includes(currentAnswer.toLowerCase())) {
            // TODO: Toast 추가 필요
            setRowAnimationStatus(ROW_STATUS.INVALID, 600);
            return;
          }
          submitUserAnswer();
        }
      } else if (upperCaseKey === 'BACKSPACE') {
        if (currentAnswer.length !== 0) {
          setCurrentAnswer(currentAnswer.slice(0, currentAnswer.length - 1));
        }
      } else {
        if (currentAnswer.length !== BOARD_COL_COUNT) {
          setCurrentAnswer(currentAnswer + upperCaseKey);
        }
      }
    },
    [words, currentAnswer],
  );

  const handleKeyupEvent = React.useCallback(
    (event: KeyboardEvent) => {
      if (isGameEnd) {
        return;
      }
      const { key } = event;
      const regex = /^[a-zA-Z]$|(ENTER)|(BACKSPACE)/i;

      if (regex.test(key)) {
        submitUserSolution(key);
      }
    },
    [words, currentAnswer, isGameEnd],
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

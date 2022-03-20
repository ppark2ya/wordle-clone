import React from 'react';
import { GAME_PROGRESS_TIME } from 'constants/time';
import { useHeaderStore } from 'store';

function Timer() {
  const {
    currentTime,
    setCurrentTime,
    setTimerId,
    resetCurrentTime,
    clearTimer,
  } = useHeaderStore();

  React.useEffect(() => {
    const id = setInterval(setCurrentTime, 1000) as unknown as number;
    setTimerId(id);

    return () => {
      clearTimer();
    };
  }, []);

  React.useEffect(() => {
    if (currentTime === GAME_PROGRESS_TIME) {
      resetCurrentTime();
    }
  }, [currentTime]);

  const minutes = Math.floor(currentTime / 1000 / 60);
  const seconds = currentTime / 1000 - minutes * 60;
  const formattedMinutes = minutes >= 10 ? minutes : '0' + minutes;
  const formattedSeconds = seconds >= 10 ? seconds : '0' + seconds;

  return (
    <h1 className="text-xl text-white absolute top-1/2 left-4 -translate-y-2/4">{`${formattedMinutes} : ${formattedSeconds}`}</h1>
  );
}

export default Timer;

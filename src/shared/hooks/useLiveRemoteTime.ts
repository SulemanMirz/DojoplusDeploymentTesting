import { useState, useEffect } from 'react';

const useLiveRemoteTime = (initialTime?, interval = 10): Date => {
  const [currentTime, setCurrentTime] = useState(initialTime || new Date());

  const setNewTime = (): void => {
    setCurrentTime((prevTime) => {
      const newTime = new Date(prevTime);
      newTime.setSeconds(newTime.getSeconds() + interval);
      return newTime;
    });
  };

  useEffect(() => {
    const intervalSub = setInterval(() => setNewTime(), interval * 1000);
    return () => clearInterval(intervalSub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentTime(initialTime);
  }, [initialTime]);

  return currentTime;
};

export default useLiveRemoteTime;

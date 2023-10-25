import { useState, useEffect } from 'react';

const useLiveTime = (): Date => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const setNewTime = (): void => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentTime;
};

export default useLiveTime;

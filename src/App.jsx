import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [newtimer, setNewTimer] = useState(240); // 240 saniye (4 dakika) olarak başlatılır
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setNewTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000); // 1 saniyede bir güncelleme yapılır

      setIntervalId(interval);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setNewTimer(240);
    setIsRunning(false);
  };

  // Dakika ve Saniye formatına çevirme
  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div>
      {formatTime(newtimer)} {/* Dakika ve saniye olarak görüntüler */}
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer} disabled={!isRunning}>
          Sıfırla
        </button>
      </div>
    </div>
  );
}

export default App;

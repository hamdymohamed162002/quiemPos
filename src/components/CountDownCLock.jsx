import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ minutes, seconds, onTimeout }) => {
  const [time, setTime] = useState({
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  });

  const decrementTime = () => {
    setTime((prevTime) => {
      if (prevTime.minutes === 0 && prevTime.seconds === 0) {
        // If the timer reaches zero, call the onTimeout callback
        onTimeout();
        return prevTime;
      }

      const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;
      const newMinutes = newSeconds === 59 ? prevTime.minutes - 1 : prevTime.minutes;

      return {
        minutes: newMinutes,
        seconds: newSeconds
      };
    });
  };

  useEffect(() => {
    const intervalId = setInterval(decrementTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div style={{display:'flex',alignItems:'center'}}>
      <h1 style={{fontSize:'28px'}}>
        {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
      </h1>
    </div>
  );
};

export default CountdownTimer;

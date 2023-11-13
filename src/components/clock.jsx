import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(getCurrentTime);

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const amPm = hours >= 12 ? 'م' : 'ص';

    // Convert 24-hour time to 12-hour time
    hours = hours % 12 || 12;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amPm}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div>
      <h1 className='m-0' style={{fontSize:'24px'}}>{time}</h1>
      <p  className='m-0'> التوقيت المحلي</p>
    </div>
  );
};

export default Clock;

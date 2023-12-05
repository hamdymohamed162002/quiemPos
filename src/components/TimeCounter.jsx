import moment from 'moment';
import React, { useState, useEffect } from 'react';

const TimeCounter = ({ startFrom }) => {
  const initialTimeDifference = moment().diff(moment(startFrom, "HH:mm:SS L"), 'seconds');
  const [timeDifference, setTimeDifference] = useState(initialTimeDifference);
  const [seconds, setSeconds] = useState(initialTimeDifference % 60);
  const [minutes, setMinutes] = useState(Math.floor((initialTimeDifference / 60) % 60));
  const [hours, setHours] = useState(Math.floor(initialTimeDifference / 3600));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference((prevTimeDifference) => prevTimeDifference + 1);
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            } else {
              return prevMinutes + 1;
            }
          });
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <p>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
};

export default TimeCounter;

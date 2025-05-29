
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      tomorrow.setUTCHours(0, 0, 0, 0);
      
      const difference = tomorrow - now;
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-4">⏰ Next Launch In:</h3>
      <div className="flex justify-center space-x-4">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 min-w-[80px]">
          <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-sm text-purple-200">Hours</div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 min-w-[80px]">
          <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-sm text-purple-200">Minutes</div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 min-w-[80px]">
          <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-sm text-purple-200">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

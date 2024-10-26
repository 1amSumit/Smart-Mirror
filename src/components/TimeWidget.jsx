import React, { useState, useEffect } from "react";

const TimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = time.toLocaleDateString(undefined, options);

  return (
    <div className="text-center">
      <div className="text-7xl font-semibold">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-xl mt-2">{currentDate}</div>
    </div>
  );
};

export default TimeWidget;

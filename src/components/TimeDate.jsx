import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { timeState } from "../store/time";

export default function TimeDate() {
  const [date, setDate] = useRecoilState(timeState);

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const time = date.toLocaleTimeString("en-IN", {
    timeStyle: "short",
  });

  const getFormattedDate = (date) => {
    const formattedDate = date.toLocaleString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const [day, month, dateNum] = formattedDate.split(" ");

    return {
      day,
      month,
      date: dateNum,
    };
  };

  const {
    day: weekday,
    month: monthName,
    date: dateNum,
  } = getFormattedDate(date);

  return (
    <div className=" px-[2rem]">
      <div className="flex justify-end">
        <p className="text-2xl  font-quick tracking-wider">{time}</p>
      </div>
      <div className="flex justify-end">
        <p className="text-gray-600 font-quick text-lg">
          {weekday}, {monthName} {dateNum}
        </p>
      </div>
    </div>
  );
}

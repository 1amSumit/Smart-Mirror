import React from "react";
import { BsCloudSun } from "react-icons/bs";

export default function Weather() {
  return (
    <div className="flex flex-col px-[2rem]">
      <div>
        <div className="flex  flex-row items-center justify-between">
          <BsCloudSun className="text-gray-200  text-3xl mr-[3rem]" />
          <p className="text-4xl">
            <span>18</span>
            <span>°C</span>
          </p>
        </div>
      </div>
      <div>
        <p className="text-2xl font-quick  text-gray-200">Little bit cloudy</p>
      </div>
    </div>
  );
}

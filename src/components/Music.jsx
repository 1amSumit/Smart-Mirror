import React from "react";
import { BsPlay } from "react-icons/bs";

export default function Music() {
  return (
    <div className=" p-4 rounded-lg shadow-md max-w-md mx-auto ring-2 ring-gray-600">
      <div className="text-xs text-gray-500 mb-2">Music</div>
      <div className="flex items-center">
        <img
          src="https://vachanmn.tech/vachan.webp"
          alt="Album cover"
          className="w-14 h-14 rounded-md mr-4"
        />
        <div className="flex-grow">
          <h2 className="font-semibold text-sm">Butterfly Effect</h2>
          <p className="text-xs text-gray-500">Travis Scott</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
            <BsPlay size={24} className="text-black" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

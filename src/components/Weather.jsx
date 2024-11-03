import React from "react";
import { BsCloudSun } from "react-icons/bs";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../services/getCurrentWeather";
import { useRecoilState } from "recoil";
import { todoTransition } from "../store/newsAndTodoState";

export default function Weather() {
  const { latitude, longitude } = useCurrentLocation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => getCurrentWeather(latitude, longitude),
    enabled: !!latitude && !!longitude,
  });

  const [tx, setTX] = useRecoilState(todoTransition);

  return (
    <div className="flex flex-col px-[2rem]">
      <div>
        <div className="flex  flex-row items-center justify-between">
          <BsCloudSun className="text-gray-200  text-3xl mr-[3rem]" />

          {isLoading && (
            <svg
              class="w-6 h-6 text-blue-500 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                class="stroke-current opacity-20"
                stroke-width="4"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                class="stroke-current"
                stroke-width="4"
              />
            </svg>
          )}
          {data && (
            <p
              className="text-4xl cursor-pointer"
              onClick={() => setTX((prev) => !prev)}
            >
              <span>{Math.round(data.main.temp)}</span>
              <span>°C</span>
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-2xl font-quick  text-gray-200">Little bit cloudy</p>
      </div>
    </div>
  );
}

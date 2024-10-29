import React, { useEffect } from "react";
import Weather from "./components/Weather";
import TimeDate from "./components/TimeDate";
import Greet from "./components/Greet";
import { RecoilRoot } from "recoil";
import Music from "./components/Music";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getSongs } from "./services/spotifyMusic";
import SpeechComponent from "./components/SpeechComponent";

export default function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    getSongs();
  }, []);
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className="h-screen w-screen text-gray-300 bg-stone-700 grid grid-cols-6 gap-[2rem]">
          <div className="col-span-2">
            <SpeechComponent />
          </div>

          <div className=" col-span-2">2</div>

          <div className="grid grid-rows-5 col-span-2 justify-center">
            <div className="flex flex-row pt-[2rem]">
              <Weather />
              <TimeDate />
            </div>
            <div className="row-span-3">
              <Greet />
            </div>
            <div>
              <Music />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

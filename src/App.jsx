import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import TimeDate from "./components/TimeDate";
import Greet from "./components/Greet";
import { RecoilRoot, useRecoilState } from "recoil";
import Music from "./components/Music";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Transition from "./components/Transition";
import {
  currentTranscriptState,
  transcriptState,
  useVoiceToSpeech,
} from "./store/voiceState";

export default function App() {
  const queryClient = new QueryClient();
  const { isListening, transcript, startListening, stopListening } =
    useVoiceToSpeech({ lang: "en-US", continuous: true });

  console.log(isListening);
  console.log(transcript);

  useEffect(() => {
    startListening();

    return () => {
      stopListening();
    };
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className="h-screen w-full text-gray-300 bg-gradient-to-r from-gray-500 to-gray-800 grid grid-cols-7 gap-[2rem] overflow-hidden">
          <div className="col-span-2">
            <div className="flex flex-row m-[2rem]">
              <Weather />
            </div>
          </div>

          <div className="col-span-3">2</div>

          <div className="grid grid-rows-5 col-span-2 justify-center max-h-screen">
            <div className="flex flex-row pt-[2rem] justify-end">
              <TimeDate />
            </div>
            <div className="row-span-3 px-4 overflow-hidden">
              <Greet />
              <Transition />
            </div>
            <div className="">
              <Music />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

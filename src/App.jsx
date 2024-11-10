import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import TimeDate from "./components/TimeDate";
import Greet from "./components/Greet";
import { RecoilRoot, useRecoilState } from "recoil";
import Music from "./components/Music";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Transition from "./components/Transition";
import { transcriptState } from "./store/voiceState";
import { useVoiceToSpeech } from "./hooks/useVoice";
import AvatarCamera from "./components/avatar";
import VirtualFittingRoom from "./components/VirtualFittingRoom";
import Reminder from "./components/Reminder";
import Events from "./components/Events";

export default function App() {
  const queryClient = new QueryClient();

  const [transcript, setTrancript] = useRecoilState(transcriptState);

  const { startListening, stopListening } = useVoiceToSpeech({
    lang: "en-US",
    continuous: true,
  });

  useEffect(() => {
    startListening();

    return () => {
      stopListening();
    };
  }, [transcript]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="h-screen w-full text-gray-300 bg-black grid grid-cols-7 gap-[2rem] overflow-hidden">
        <div className="col-span-2 flex flex-col justify-between">
          <div className="flex flex-row m-[2rem]">
            <Weather />
          </div>
          <div>
            <Reminder />
          </div>
          <div>
            <Events />
          </div>
        </div>

        <div className="col-span-3  justify-between">
          <div>{/* <AvatarCamera /> */}</div>
          {/* <div></div>
          <div>
            <p className="text-xl py-2 px-2 font-semibold">{transcript}</p>
          </div> */}
          <div className="App">
            <VirtualFittingRoom />
          </div>
        </div>

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
  );
}

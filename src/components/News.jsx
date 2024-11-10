import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services/getNews";
import { useRecoilState } from "recoil";
import { transcriptState } from "../store/voiceState";

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [transcript, setTranscript] = useRecoilState(transcriptState);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  useEffect(() => {
    // setTranscript("");
    console.log(transcript);
    if (
      transcript.includes("start top news") ||
      transcript.includes(" start top news")
    ) {
      handlePlay();
    } else if (
      transcript.includes("stop top news") ||
      transcript.includes(" stop top news")
    ) {
      handleStop();
    }
  }, [transcript]);

  useEffect(() => {
    if (!data?.articles || data.articles.length === 0) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const newUtterance = new SpeechSynthesisUtterance(
      data.articles[currentIndex].description
    );

    newUtterance.onend = () => {
      if (isReading) {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.articles.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    setUtterance(newUtterance);

    if (isReading) {
      synth.speak(newUtterance);
    }

    return () => synth.cancel();
  }, [currentIndex, data, isReading]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (utterance && synth.paused) {
      synth.resume();
    } else if (utterance) {
      synth.speak(utterance);
    }

    setIsReading(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();
    setIsReading(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data?.articles?.length) {
    return <p>Failed to load news data.</p>;
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden w-[100%]"
    >
      <div className="mt-4">
        <p className="uppercase text-sm font-quick font-semibold">Top Events</p>
      </div>
      <div className="flex flex-row gap-1 overflow-hidden mt-6">
        <motion.div
          key={currentIndex}
          animate={{ x: [100, 0] }}
          className="w-full"
          transition={{ duration: 0.5 }}
        >
          <p className="w-full">{data.articles[currentIndex].description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

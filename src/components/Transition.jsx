import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import News from "./News";
import Todo from "./Todo";
import { useRecoilState, useRecoilValue } from "recoil";
import { transcriptState } from "../store/voiceState";

export default function Transition() {
  const [showTodo, setShowTodo] = useState(false);
  const [transcript, setTranscript] = useRecoilState(transcriptState);

  useEffect(() => {
    setTranscript("");
    if (transcript.includes("to") || transcript.includes("to do")) {
      setShowTodo(true);
    }

    if (transcript.includes("news") || transcript.includes("ne ws")) {
      setShowTodo(false);
    }
  }, [transcript]);

  return (
    <AnimatePresence>
      {!showTodo ? <News key="news" /> : <Todo key="todo" />}
    </AnimatePresence>
  );
}

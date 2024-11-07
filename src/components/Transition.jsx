import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoTransition } from "../store/newsAndTodoState";
import News from "./News";
import Todo from "./Todo";
import { transcriptState, useVoiceToSpeech } from "../store/voiceState";

export default function Transition() {
  const showTodo = useRecoilValue(todoTransition);

  return (
    <AnimatePresence>
      {!showTodo ? <News key="news" /> : <Todo key="todo" />}
    </AnimatePresence>
  );
}

import { useEffect } from "react";
import { useVoiceToSpeech } from "../hooks/useVoiceToSpeech";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoTransition } from "../store/newsAndTodoState";
import { AnimatePresence } from "framer-motion";
import News from "./News";
import Todo from "./Todo";

export default function Transition() {
  const [showTodo, setShowTodo] = useRecoilState(todoTransition);
  const { isListening, transcript, startListening, stopListening } =
    useVoiceToSpeech({
      lang: "en-US",
      continuous: true,
    });

  useEffect(() => {
    if (transcript.includes("todo") || transcript.includes("to do")) {
      setShowTodo(true);
    }
  }, [transcript]);

  useEffect(() => {
    startListening();

    return () => {
      stopListening();
    };
  }, [startListening, stopListening]);

  return (
    <AnimatePresence>
      {!showTodo ? <News key="news" /> : <Todo key="todo" />}
    </AnimatePresence>
  );
}

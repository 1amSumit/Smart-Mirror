import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import { todoTransition } from "../store/newsAndTodoState";
import News from "./News";
import Todo from "./Todo";

export default function Transition() {
  const showTodo = useRecoilValue(todoTransition);
  console.log(showTodo);
  return (
    <AnimatePresence>
      {!showTodo ? <News key="news" /> : <Todo key="todo" />}
    </AnimatePresence>
  );
}

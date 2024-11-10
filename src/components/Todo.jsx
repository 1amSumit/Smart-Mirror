import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { transcriptState } from "../store/voiceState";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const [transcript, setTranscript] = useRecoilState(transcriptState);

  const initialTodos = [
    { task: "clean the floor", checked: false },
    { task: "buy some milk", checked: false },
  ];

  useEffect(() => {
    const savedTodos =
      JSON.parse(localStorage.getItem("todos")) || initialTodos;
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    setTranscript("");
    console.log(transcript);

    if (transcript.includes("add ")) {
      const task = transcript.split("add ")[1];
      setTodos([{ task, checked: false }, ...todos]);
    }

    if (transcript.includes("remove ")) {
      const removeTask = transcript.split("remove ")[1].toLowerCase();
      const taskIndex = todos.findIndex((todo) => todo.task === removeTask);
      // setTodos(todos.filter((_, i) => i !== taskIndex));
      toggleCheckbox(taskIndex);
    }
  }, [transcript]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (todos.length === 0) {
      setTodos(initialTodos);
    }
  }, [todos]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex(
          (current) => (current + 1) % Math.ceil(todos.length / 3)
        );
        setIsSliding(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [todos.length]);

  const toggleCheckbox = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const totalPages = Math.ceil(todos.length / 3);

  const nextPage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
      setIsSliding(false);
    }, 500);
  };

  const prevPage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
      setIsSliding(false);
    }, 500);
  };

  const currentTodos = todos.slice(currentIndex * 3, (currentIndex + 1) * 3);

  return (
    <div className="w-full max-w-md mx-auto p-4 font-quick">
      <div className="relative rounded-lg p-6  text-white">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span className="text-sm font-semibold tracking-wider text-white/80">
            TODO LIST
          </span>
        </div>

        <div className="min-h-[150px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: isSliding ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSliding ? 100 : -100 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              {currentTodos.map((todo, i) => (
                <div key={i} className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    id={`todo-${currentIndex * 3 + i}`}
                    checked={todo.checked}
                    onChange={() => toggleCheckbox(currentIndex * 3 + i)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <label
                    htmlFor={`todo-${currentIndex * 3 + i}`}
                    className={`${
                      todo.checked ? "line-through text-gray-500" : "text-white"
                    }`}
                  >
                    {todo.task}
                  </label>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";

export default function Todo() {
  const todos = ["CLean the floor", "Buy some milk", "Buy lays"];
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 overflow-hidden"
    >
      <div>
        <p className="text-xl font-bold">Todo</p>
      </div>
      <div className="mt-1">
        {todos.map((todo, i) => (
          <div key={i} className="flex flex-row items-center gap-2">
            <input type="checkbox" />
            <p>{todo}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { timeState } from "../store/time";

export default function Greet() {
  const date = useRecoilValue(timeState);
  const hours = date.getHours();
  const time = date.toLocaleString();

  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 15
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="flex flex-col gap-2 px-4 overflow-hidden">
      <motion.h2
        className="text-6xl font-bold font-quick"
        initial={{ x: 0, opacity: 1 }}
        animate={{
          x: [0, 100, -100, 0],
          opacity: [1, 0, 0, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          repeatDelay: 5,
        }}
      >
        {greeting}
      </motion.h2>
    </div>
  );
}

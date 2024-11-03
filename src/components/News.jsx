import React from "react";
import { motion } from "framer-motion";

export default function News() {
  const newsData = [
    "India Beat NZ by 6 wickets.",
    "India Beat NZ by 6 wickets.",
    "India Beat NZ by 6 wickets.",
    "India Beat NZ by 6 wickets.",
    "India Beat NZ by 6 wickets.",
  ];

  return (
    <div className="mt-4">
      {newsData.map((news, i) => (
        <motion.div
          className="flex flex-col gap-2  py-1 shadow-2xl px-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.6,
              },
            },
            hidden: { opacity: 0 },
          }}
          key={i}
        >
          <motion.p
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            initial="hidden"
            animate="visible"
            className="font-semibold ring-1 ring-gray-500 p-1 rounded-sm text-lg"
          >
            {news}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}

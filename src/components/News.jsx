import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function News() {
  const newsData = [
    {
      headline:
        "NFL's trade deadline sees unexpected moves, star players changing teams.",
    },
    {
      headline: "NBA's season heats up as top teams battle for lead.",
    },
    {
      headline:
        "World Cup qualifiers bring excitement, surprises across various football nations.",
    },
    {
      headline:
        "MLB's offseason begins with big free agency decisions for teams.",
    },
    {
      headline:
        "Champions League group stage intensifies with crucial games and upsets.",
    },
    {
      headline:
        "NHL's early season standings reveal unexpected leaders in each division.",
    },
    {
      headline:
        "College football rankings shift as teams fight for playoff spots.",
    },
    {
      headline:
        "Formula 1 circuit continues with Verstappen maintaining championship dominance.",
    },
    {
      headline:
        "Tennis ATP Finals near, top players prepare for ultimate showdown.",
    },
    {
      headline:
        "Rugby World Cup concludes with thrilling finale and memorable performances.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [newsData.length]);

  return (
    <div className="overflow-hidden w-[100%]">
      <div className="mt-2">
        <p className="font-bold text-lg">Top Events</p>
      </div>
      <div className="flex flex-row gap-1 overflow-hidden mt-1">
        <motion.div
          key={currentIndex}
          animate={{ x: [100, 0] }}
          className="w-full"
        >
          <p className="w-full">{newsData[currentIndex].headline}</p>
        </motion.div>
      </div>
    </div>
  );
}

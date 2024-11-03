import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services/getNews";

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  useEffect(() => {
    if (data?.articles?.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.articles.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [data]);

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
      <div className="mt-2">
        <p className="font-bold text-lg">Top Events</p>
      </div>
      <div className="flex flex-row gap-1 overflow-hidden mt-1">
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

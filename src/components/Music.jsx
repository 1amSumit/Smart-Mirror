import React, { useEffect, useState, useRef } from "react";
import { BsPlay, BsPause, BsShuffle } from "react-icons/bs";

const songs = [
  { id: 2, path: "/songs/a-2.mp3" },
  { id: 3, path: "/songs/a-3.mp3" },
  { id: 4, path: "/songs/a-4.mp3" },
  { id: 5, path: "/songs/a-5.mp3" },
  { id: 6, path: "/songs/a-6.mp3" },
  { id: 7, path: "/songs/a-7.mp3" },
  { id: 10, path: "/songs/a-10.mp3" },
  { id: 9, path: "/songs/a-9.mp3" },
];

export default function Music() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    isPlaying ? pauseSong() : playSong();
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const shuffleSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);
  };

  useEffect(() => {
    if (isPlaying) {
      playSong();
    } else {
      pauseSong();
    }
  }, [currentSongIndex]);

  return (
    <div className="p-4 rounded-lg shadow-md max-w-md mx-auto ring-2 ring-gray-600">
      <div className="text-xs text-gray-500 mb-2">Music</div>
      <div className="flex items-center">
        <img
          src="https://i.pinimg.com/736x/5b/2f/5e/5b2f5e020eb4ab271ae09641092cfddd.jpg"
          alt="Album cover"
          className="w-14 h-14 rounded-md mr-4"
        />
        <div className="flex-grow">
          <h2 className="font-semibold text-sm">
            Song {songs[currentSongIndex].id}
          </h2>
          <p className="text-xs text-gray-500">Artist Name</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={playPreviousSong}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
          >
            {isPlaying ? (
              <BsPause size={24} className="text-black" />
            ) : (
              <BsPlay size={24} className="text-black" />
            )}
          </button>
          <button
            onClick={playNextSong}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            onClick={shuffleSong}
            className="text-gray-600 hover:text-gray-800"
          >
            <BsShuffle size={24} />
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].path}
        preload="auto"
        onEnded={playNextSong}
        onError={(e) => console.error("Error loading audio file")}
      />
    </div>
  );
}

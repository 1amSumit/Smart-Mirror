import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { transcriptState } from "../store/voiceState";

const iniReminders = [
  {
    message:
      "It looks like you'll be late again on your design meet. Would you like to go with Uber?",
  },
  {
    message: "Don't forget your daily standup in 10 minutes!",
  },
  {
    message: "Your project deadline is approaching. 2 days remaining.",
  },
];

export default function Reminder() {
  const [reminders, setReminders] = useState(iniReminders);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const [transcript, setTranscript] = useRecoilState(transcriptState);

  useEffect(() => {
    setTranscript("transcript");
    console.log(transcript);

    if (transcript.includes("add reminder ")) {
      const newReminder = transcript.split("add reminder ")[1];
      setReminders([...reminders, { message: newReminder }]);
    } else if (transcript.includes("remove reminder ")) {
      const reminderToRemove = transcript
        .split("remove reminder ")[1]
        .toLowerCase();
      const reminderIndex = reminders.findIndex(
        (remin) => remin.message === reminderToRemove
      );

      console.log(reminderToRemove);
      console.log(reminderIndex);

      setReminders(reminders.filter((_, i) => i !== reminderIndex));
    }
  }, [transcript]);

  useEffect(() => {
    const savedReminders =
      JSON.parse(localStorage.getItem("reminders")) || iniReminders;
    setReminders(savedReminders);
  }, []);

  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem("reminers", JSON.stringify(reminders));
    }
  }, [reminders]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % reminders.length);
        setIsSliding(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [reminders.length]);

  return (
    <div className="w-full max-w-md mx-auto p-4 font-quick">
      <div className="relative  rounded-lg p-6 text-white backdrop-blur-sm">
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
              d="M12 6v6l4 2m8-8a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
          <span className="text-sm font-semibold tracking-wider text-white/80">
            REMINDERS
          </span>
        </div>

        <div className="min-h-[100px] relative">
          <div
            className={`transform transition-all duration-500 ease-in-out
              ${
                isSliding
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }
            `}
          >
            <p className="text-lg mb-6">{reminders[currentIndex].message}</p>

            {reminders[currentIndex].actions && (
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  {reminders[currentIndex].actions.confirm}
                </button>
                <button className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                  {reminders[currentIndex].actions.cancel}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-1">
          {reminders.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300
                ${index === currentIndex ? "bg-white" : "bg-white/30"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

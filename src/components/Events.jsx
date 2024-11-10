import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { transcriptState } from "../store/voiceState";

const initialEvents = [
  { time: "8:30", title: "Team education" },
  { time: "10:30", title: "Awesome new project brainstorming" },
  { time: "13:00", title: "Lunch" },
];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [transcript, setTranscript] = useRecoilState(transcriptState);

  useEffect(() => {
    setTranscript("");
    console.log("Transcript reset:", transcript);

    if (transcript.includes("add event ")) {
      const newEventTimeMatch = transcript.match(/at (\d+:\d+)/i);
      const newEventTitleMatch = transcript.match(
        /add event (.+?) at \d+:\d+/i
      );

      if (newEventTimeMatch && newEventTitleMatch) {
        const newEventTime = newEventTimeMatch[1];
        const newEventTitle = newEventTitleMatch[1];

        setEvents((prevEvents) => [
          { time: newEventTime, title: newEventTitle },
          ...prevEvents,
        ]);
      }
    } else if (transcript.includes("remove event ")) {
      //   const eventToRemoveMatch = transcript.match(/remove event (\d+)/i);
      const removeEventTimeMatch = transcript.match(/at (\d+:\d+)/i);
      const removeEventTitleMatch = transcript.match(
        /remove event (.+?) at \d+:\d+/i
      );

      console.log(removeEventTitleMatch[1]);

      const eventIndex = events.findIndex(
        (event) => event.title === removeEventTitleMatch[1]
      );

      setEvents(events.filter((_, i) => i !== eventIndex));

      console.log(eventIndex);
    }
  }, [transcript, setTranscript]);

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("events")) || initialEvents;
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  return (
    <div className="px-8 py-2 rounded-lg text-white min-w-[300px] font-quick">
      <h2 className="text-white text-sm font-medium mb-6">UPCOMING EVENTS</h2>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-sm font-light">{event.time}</span>
            <span className="text-sm font-semibold">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

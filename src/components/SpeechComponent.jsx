import React from "react";
import useVoiceToSpeech from "../hooks/useVoiceToSpeech";

export default function SpeechComponent() {
  const { isListening, transcript, startListening, stopListening } =
    useVoiceToSpeech();

  return (
    <div>
      {isListening && <button onClick={() => stopListening()}>Stop</button>}
      {isListening && <p>{transcript}</p>}
      {!isListening && (
        <div className="cursor-pointer" onClick={() => startListening()}>
          Start
        </div>
      )}
    </div>
  );
}

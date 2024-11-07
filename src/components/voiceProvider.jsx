import React, { createContext, useState } from "react";

export const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  return (
    <VoiceContext.Provider
      value={{ isListening, setIsListening, transcript, setTranscript }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

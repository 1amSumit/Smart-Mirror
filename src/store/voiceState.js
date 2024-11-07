import { atom, useRecoilState } from "recoil";
import { useEffect, useRef } from "react";

export const isListeningState = atom({
  key: "isListeningState",
  default: false,
});

export const transcriptState = atom({
  key: "transcriptState",
  default: "",
});
export const currentTranscriptState = atom({
  key: "transcriptState",
  default: "",
});

export function useVoiceToSpeech(options = {}) {
  const [isListening, setIsListening] = useRecoilState(isListeningState);
  const [transcript, setTranscript] = useRecoilState(transcriptState);
  const regRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Web speech API is not supported");
      return;
    }

    regRef.current = new window.webkitSpeechRecognition();
    const recognition = regRef.current;

    recognition.interimResults = options.interimResults ?? true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous ?? false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ! | : | ;";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error: ", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!options.keepTranscriptOnEnd) {
        setTranscript("");
      }
    };

    return () => {
      recognition.stop();
    };
  }, [options, setTranscript, setIsListening]);

  const startListening = () => {
    if (regRef.current && !isListening) {
      regRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (isListening && regRef.current) {
      regRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
}

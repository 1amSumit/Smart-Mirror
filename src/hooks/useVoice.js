import { useRecoilState } from "recoil";
import { isListeningState, transcriptState } from "../store/voiceState";
import { useEffect, useRef } from "react";

export function useVoiceToSpeech(options = {}) {
  const [isListening, setIsListening] = useRecoilState(isListeningState);
  const [, setTranscript] = useRecoilState(transcriptState);
  const regRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Web Speech API is not supported by this browser.");
      return;
    }

    const initRecognition = () => {
      regRef.current = new window.webkitSpeechRecognition();
      const recognition = regRef.current;

      recognition.lang = options.lang || "en-US";
      recognition.continuous = options.continuous ?? true;

      if ("webkitSpeechGrammarList" in window) {
        const grammar =
          "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ! | : | ;";
        const speechRecognitionList = new window.webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
      }

      recognition.onspeechstart = () => {
        console.log("Speech has started.");
      };

      recognition.onspeechend = () => {
        console.log("Speech has ended.");
      };

      recognition.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript((prevTranscript) => prevTranscript + " " + text);
      };

      recognition.onerror = (event) => {
        console.log("Speech recognition error: ", event.error);
        if (event.error === "no-speech" || event.error === "aborted") {
          restartRecognition();
        } else {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        if (isListening) {
          restartRecognition();
        } else {
          setIsListening(false);
        }
      };
    };

    const restartRecognition = () => {
      if (!isListening) return;
      try {
        if (regRef.current && regRef.current.ended) {
          regRef.current.start();
        }
      } catch (error) {
        console.log("Restart error:", error);
      }
    };

    initRecognition();

    return () => {
      if (regRef.current) {
        regRef.current.stop();
      }
    };
  }, [options, setTranscript, setIsListening, isListening]);

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

  return { startListening, stopListening };
}

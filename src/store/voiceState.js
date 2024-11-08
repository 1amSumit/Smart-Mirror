import { atom } from "recoil";

export const isListeningState = atom({
  key: "isListeningState",
  default: false,
});

export const transcriptState = atom({
  key: "transcriptState",
  default: "",
});

import { atom } from "recoil";

export const playMusic = atom({
  key: "playMusic",
  default: false,
});

export const pauseMusic = atom({
  key: "pauseMusic",
  default: false,
});

export const shuffleMusic = atom({
  key: "shuffleMusic",
  default: false,
});

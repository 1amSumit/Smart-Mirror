import { atom } from "recoil";

export const timeState = atom({
  key: "timeState",
  default: new Date(),
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "regenerator-runtime/runtime";
import "./index.css";
import { RecoilRoot } from "recoil";
import { VoiceProvider } from "./components/voiceProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>
);

import { StrictMode } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("No root element found");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

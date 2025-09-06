import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/page.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);

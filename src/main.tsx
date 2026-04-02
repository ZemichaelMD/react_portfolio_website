import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./utils/designSystem.css";

import Page from "./page";

const App = () => {
  return (
    <>
      <Page />
      <Analytics />
    </>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);

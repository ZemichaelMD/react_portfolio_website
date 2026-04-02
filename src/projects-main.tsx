import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./utils/designSystem.css";

import ProjectsPage from "./projects-page";

const App = () => {
  return (
    <>
      <ProjectsPage />
      <Analytics />
    </>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);

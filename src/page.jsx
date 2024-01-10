import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import Skills from "./components/skills";
import About from "./components/about";
import Bio from "./components/bio";

const Page = () => {
  const [contentName, setContentName] = useState("about me");
  const [content, setContent] = useState(<About />);

  const switchComponent = (contentName) => {
    switch (contentName) {
      case "about me":
        return <About />;
        
      case "bio":
        return <Bio />;

      case "skills":
        return <Skills />;

      default:
        return <About />;
    }
  }

  useEffect(() => {
    setContent(switchComponent(contentName));
  }, [contentName])

  return (
    <>
      <div className="pt-16 pl-16 bg-white">
        <h3 className="font-semibold mb-4 font-mono tracking-widest">
          Zemichael Mehretu, Designer & Developer
        </h3>
        <div className="flex gap-8">
          <button
            className="cursor-pointer"
            onClick={() => setContentName("about me")}
          >
            <FontAwesomeIcon icon={faUser} className="mr-3 text-slate-300" />
            <span
              className={`${
                contentName === "about me"
                  ? "text-3xl font-bold"
                  : "text-slate-400"
              } font-mono tracking-widest mb-4 hover:text-green-500`}
            >
              Who I am
            </span>
          </button>
          · 
          <button
            className="cursor-pointer"
            onClick={() => setContentName("bio")}
          >
            <FontAwesomeIcon
              icon={faBuilding}
              className="mr-3 text-slate-300"
            />
            <span
              className={`${
                contentName === "bio"
                  ? "text-3xl font-bold"
                  : "text-slate-400"
              } font-mono tracking-widest mb-4 hover:text-green-500`}
            >
              My Bio
            </span>
          </button>
          · 
          <button
            className="cursor-pointer"
            onClick={() => setContentName("skills")}
          >
            <FontAwesomeIcon
              icon={faBriefcase}
              className="mr-3 text-slate-300"
            />
            <span
              className={`${
                contentName === "skills"
                  ? "text-3xl font-bold"
                  : "text-slate-400"
              } font-mono tracking-widest mb-4 hover:text-green-500`}
            >
              What I do
            </span>
          </button>
        </div>
      </div>

      <hr />

      <div className="h-full overflow-hidden" id="content">
        {content}
      </div>

      <hr />

      <div className="bg-white min-h-8 text-center w-full p-3 static bottom-0">
        Powered by @Enjera
      </div>
    </>
  );
};

export default Page;

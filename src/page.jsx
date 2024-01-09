import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import TechStackContainer from "./components/techStackContainer";
import AboutMe from "./components/aboutMeContainer";
import Experience from "./components/experience";
import Education from "./components/education";

const Page = () => {
  const [contentName, setContentName] = useState("about me");
  const [content, setContent] = useState(<AboutMe />);

  const switchComponent = (contentName) => {
    switch (contentName) {
      case "about me":
        return <AboutMe />;

      case "experience":
        return <Experience />;

      case "education":
        return <Education />;

      case "skills":
        return <TechStackContainer />;

      default:
        return <AboutMe />;
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
          |
          <button
            className="cursor-pointer"
            onClick={() => setContentName("experience")}
          >
            <FontAwesomeIcon
              icon={faBuilding}
              className="mr-3 text-slate-300"
            />
            <span
              className={`${
                contentName === "experience"
                  ? "text-3xl font-bold"
                  : "text-slate-400"
              } font-mono tracking-widest mb-4 hover:text-green-500`}
            >
              What I did
            </span>
          </button>
          |
          <button
            className="cursor-pointer"
            onClick={() => setContentName("education")}
          >
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="mr-3 text-slate-300"
            />
            <span
              className={`${
                contentName === "education"
                  ? "text-3xl font-bold"
                  : "text-slate-400"
              } font-mono tracking-widest mb-4 hover:text-green-500`}
            >
              What I learned
            </span>
          </button>
          |
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

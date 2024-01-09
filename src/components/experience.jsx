import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechStackColumn from "./techStackColumn";

import {
  faTwitter,
  faGithub,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";

export default function Experience() {
  return (
    <div
      id="tech-stack-container"
      className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden"
    >
      <div className="border"></div>
      <div class="grid grid-row-1 md:grid-row-4 border md:col-span-6 h-100">
        <div className="m-8">
          <h1 class="text-6xl font-semibold mb-4">Experience,</h1>
          <h1 class="text-4xl font-mono tracking-widest mb-4">
            Software Developer
          </h1>
          <div class="mt-10 mb-4 text-sm max-w-prose w-full max-w-96">
            <p class="mt-2">
              Your Partner for Full-Stack Web and Mobile Development
            </p>
            <p class="mt-2">
              Design, Develop, Modify and Update Software Applications,
              WebSites, Data Communication Processes and User Interfaces
            </p>
          </div>
        </div>
        <div className="border"></div>
        <div className="border"></div>
        <div className="border"></div>

        <div className="border grid grid-cols-1 md:grid-cols-8">
          <div className="border"></div>
          <div className="border"></div>
          <div className="border">
            <TechStackColumn icons={[faTwitter]} text="Twitter" />
          </div>
          <div className="border">
            <TechStackColumn icons={[faGithub]} text="Twitter" />
          </div>
          <div className="border">
            <TechStackColumn icons={[faLinux]} text="Twitter" />
          </div>
          <div className="border"></div>
          <div className="border"></div>
          <div className="border"></div>
          <div className="border"></div>
          <div className="border"></div>
        </div>
      </div>
      <div className="border"></div>
      <div className="border"></div>
    </div>
  );
}

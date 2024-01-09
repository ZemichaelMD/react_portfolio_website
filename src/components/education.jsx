import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechStackColumn from "./techStackColumn";

import {
  faTwitter,
  faGithub,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";


export default function Education() {
  return (
    <div
      id="tech-stack-container"
      className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden"
    >
      <div className="border"></div>
      <div class="grid grid-row-1 md:grid-row-4 border md:col-span-6 h-100">
        <div className="m-8">
          <h1 class="text-6xl font-semibold mb-4">Education,</h1>
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
      <div className="grid grid-rows-1 md:grid-rows-12 md:col-start-9 md:col-span-3 overflow-hidden">
        <div className="border"></div>
        <div className="border p-0 overflow-hidden bg-white md:row-span-10">
          <div className="picture">
            <img
              fetchpriority="high"
              decoding="async"
              width="6400"
              src="https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket.jpg"
              className=""
              alt=""
              srcSet="https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket.jpg 640w, https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket-200x300.jpg 200w, https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket-400x600.jpg 400w"
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>
        </div>
        <div className="border"></div>
      </div>
      <div className="border"></div>
    </div>
  );
}

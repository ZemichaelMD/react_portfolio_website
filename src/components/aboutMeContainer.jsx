import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechStackColumn from "./techStackColumn";

import {
  faTwitter,
  faGithub,
  faLinux,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faPhone, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function AboutMe() {
  const [address, setAddress] = useState("");
  
  console.log(address);
  
  return (
    <div
      id="tech-stack-container"
      className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden"
    >
      <div className="border"></div>
      <div class="grid grid-row-1 md:grid-row-4 border md:col-span-6 h-100">
        <div className="m-8">
          <h1 class="text-6xl font-semibold mb-4">I'm Zemichael Mehretu,</h1>
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

        <div className="flex justify-center">
            <p className='self-end text-sm text-green-800'> -- {address} --</p>
        </div>

        <div className="border flex align-items-center justify-center">
 
            <TechStackColumn icons={[faPhone]} text="" 
              onMouseEnter={() => setAddress('+251927646246')}
              onMouseLeave={() => setAddress('Click to follow my socials')}
            />
            <TechStackColumn icons={[faMailBulk]} text="" 
              onMouseEnter={() => setAddress('zemichaelmd@gmail.com')}
              onMouseLeave={() => setAddress('Click to follow my socials')}
            />
            <TechStackColumn icons={[faGithub]} text="" 
              onMouseEnter={() => setAddress('github.com/zemichaelmd')}
              onMouseLeave={() => setAddress('Click to follow my socials')}
            />
            <TechStackColumn icons={[faLinkedin]} text="" 
              onMouseEnter={() => setAddress('zemlinkedin/in/zemichaelmdichaelmd')}
              onMouseLeave={() => setAddress('Click to follow my socials')}
            />
            <TechStackColumn icons={[faTwitter]} text="" 
              onMouseEnter={() => setAddress('@zemichaelmd')}
              onMouseLeave={() => setAddress('Click to follow my socials')}
            />

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

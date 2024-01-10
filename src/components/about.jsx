import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faPhone, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SocialLinks = ({icons, text, link, ...props}) => {
  return (
    <a className="group flex flex-col items-center w-full justify-center hover:bg-green-200" {...props} href={link} target="_blank">
      {icons.map((icon, index) => (
        <FontAwesomeIcon key={index} icon={icon} size="3x" />
      ))}
    </a>
  )
}

const socials = [
  {
    name: "phone",
    icons: [faPhone],
    text: "+251927646246",
    link: "tel:+251927646246",
  },
  {
    name: "email",
    icons: [faMailBulk],
    text: "zemichaelmd@gmail.com",
    link: "mailto:zemichaelmd@gmail.com",
  },
  {
    name: "github",
    icons: [faGithub],
    text: "github.com/zemichaelmd",
    link: "https://github.com/zemichaelmd"
  },
  {
    name: "linkedin",
    icons: [faLinkedin],
    text: "linkedin.com/in/zemichaelmd",
    link: "https://linkedin.com/in/zemichaelmd"
  },
  {
    name: "twitter",
    icons: [faTwitter],
    text: "@zemichaelmd",
    link: "https://twitter.com/zemichaelmd"
  },
];

export default function About() {
  const [address, setAddress] = useState("");
  
  return (
    <div
      id="tech-stack-container"
      className="grid grid-cols-1 md:grid-cols-10 h-full overflow-hidden"
    >
      <div className="grid grid-row-1 md:grid-row-4 border md:col-start-2 md:col-span-5 h-100">
        <div className="m-8">
          <h1 className="text-6xl font-semibold mb-4">I'm Zemichael Mehretu,</h1>
          <h1 className="text-4xl font-mono tracking-widest mb-4">
            Software Developer
          </h1>
          <div className="mt-10 mb-4 text-sm max-w-prose w-full max-w-96">
            <p className="mt-2">
              Your Partner for Full-Stack Web and Mobile Development
            </p>
            <p className="mt-2">
              Design, Develop, Modify and Update Software Applications,
              WebSites, Data Communication Processes and User Interfaces
            </p>
          </div>
        </div>

        <div className="flex justify-center">
            <p className='self-end text-sm text-green-800'> -- {address} --</p>
        </div>

        <div className="border flex align-items-center justify-center">
            {
              socials.map((social, index) => <SocialLinks key={index} icons={social.icons} text={social.text} link={social.link} 
                  onMouseEnter={() => setAddress(social.text)}
                  onMouseLeave={() => setAddress('Click to follow my socials')}
                />)
            } 

        </div>
      </div>
      
      <div className="hidden md:grid grid-rows-1 md:grid-rows-12 md:col-start-8 md:col-span-3 overflow-hidden">
        <img
          fetchpriority="high"
          decoding="async"
          width="6400"
          src="https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket.jpg"
          className="w-full h-full overflow-hidden object-cover border p-0 overflow-hidden bg-white md:row-start-2 md:row-span-10"
          alt=""
          srcSet="https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket.jpg 640w, https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket-200x300.jpg 200w, https://websitedemos.net/interior-designer-02/wp-content/uploads/sites/275/2020/06/man-in-black-suit-jacket-400x600.jpg 400w"
          sizes="(max-width: 640px) 100vw, 640px"
        />
      </div>
    </div>
  );
}

import {
  faFigma,
  faHtml5,
  faCss3Alt,
  faJs,
  faPhp,
  faLaravel,
  faNodeJs,
  faReact,
  faPython,
  faGit,
  faGithub,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";

import { faDatabase } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TechStackColumn = ({icons, text, ...props}) => {
  return (
    <div className="group flex flex-col items-center w-full justify-center hover:bg-green-200" {...props}>
      {icons.map(icon => (
        <FontAwesomeIcon icon={icon} size="3x" />
      ))}
      <p className="text-center text-sm text-green-800 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
      </p>
    </div>
  )
}

export default function Skills() {

  return (
    <div
      id="tech-stack-container"
      className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden"
    >
      <div className="border"></div>
      <div className="border flex justify-center align-items-center">
          <TechStackColumn icons={[faFigma]} text="Design | Prototyping" />
      </div>
      <div className="border text-center flex justify-center align-items-center">
        <TechStackColumn
          icons={[faHtml5, faCss3Alt, faJs]}
          text="HTML | CSS | Javascript"
        />
      </div>
      <div className="border text-center flex justify-center align-items-center">
        <TechStackColumn icons={[faPhp, faLaravel]} text="PHP | Laravel" />
      </div>
      <div className="border text-center flex justify-center align-items-center">
          <TechStackColumn
            icons={[faNodeJs, faReact, faDatabase]}
            text="MERN Stack"
          />
      </div>
      <div className="border text-center flex justify-center align-items-center">
        <TechStackColumn icons={[faPython]} text="Python | Django" />
      </div>
      <div className="border text-center flex justify-center align-items-center">
        <TechStackColumn
          icons={[faGit, faGithub, faLinux]}
          text="Git | Github | Lunix"
        />
      </div>
      <div className="border"></div>
      <div className="grid grid-rows-1 md:grid-rows-12 md:col-start-9 md:col-span-3 overflow-hidden">
        <div className="border"></div>
        <div className="border p-3 overflow-y-auto bg-white md:row-span-10">
          <p>
            Web Services: AWS, Azure, Heroku, Git and Version Control. Linux OS, MacOs: Terminal,
          </p>
          <p>
            A professional Full Stack Developer & and an expert Designer well experienced in Laravel PHP and livewire, MERN, and
            Python Stack - Django, Node JS, React JS, MongoDB, RDBMS, API
            Development along with HTML5, CSS3, and JavaScript.
          </p>
          <p>
            Proficient in Adobe suite products Photoshop, Illustrator, and InDesign. 
          </p>
          <p>
            Can prepare high-quality web & app design, and prototyping using Figma and XD. 
          </p>
          <p>
            Familiar with: HTML & CSS, Styles: Bootstrap, Tailwind Javascript: Ecma script, Alpine js MERN Stack: MongoDB, React JS, Node JS, Express JS, Python: Django, PHP: Laravel with Livewire 
          </p>
        </div>
        <div className="border"></div>
      </div>
      <div className="border"></div>
    </div>
  );
}

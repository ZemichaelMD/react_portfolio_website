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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const TechStackColumn = ({ icons, text, active, ...props }) => {
  return (
    <div className="border flex justify-center align-items-center">
      <div
        className={`group flex flex-col items-center w-full justify-center ${
          active ? "bg-green-200" : ""
        } hover:bg-green-200`}
        {...props}
      >
        <div className="flex flex-row md:flex-col">
          {icons.map((icon) => (
            <FontAwesomeIcon
              icon={icon}
              className="mx-2 md:m-2 text-4xl md:text-6xl"
            />
          ))}
        </div>
        <p
          className={`text-center text-sm text-green-800 mt-2 ${
            active
              ? ""
              : "md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

const skillContent = [
  {
    name: "mern",
    icons: [faFigma],
    text: "Design | Prototyping",
    paragraphs: [
      "MongoDB : a document-oriented NoSQL database used to store data as JSON-like documents.",
      "Express :  a web application framework for Node.js, designed for building web applications and APIs.",
      "React : a JavaScript library for building user interfaces.",
      "Node.js : an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
    ],
  },
  {
    name: "figma",
    icons: [faHtml5, faCss3Alt, faJs],
    text: "HTML | CSS | Javascript",
    paragraphs: [
      "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.",
      "Prototyping : a process where you turn your static design into an interactive experience.",
      "Design : a plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is built or made.",
    ],
  },
  {
    name: "html-css-js",
    icons: [faPhp, faLaravel],
    text: "PHP | Laravel",
    paragraphs: [
      "HTML : the standard markup language for documents designed to be displayed in a web browser.",
      "CSS : a style sheet language used for describing the presentation of a document written in a markup language such as HTML.",
      "JavaScript : a programming language that conforms to the ECMAScript specification.",
    ],
  },
  {
    name: "php-laravel",
    icons: [faNodeJs, faReact, faDatabase],
    text: "MERN Stack",
    paragraphs: [
      "PHP : a general-purpose scripting language especially suited to web development.",
      "Laravel : a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller architectural pattern and based on Symfony.",
    ],
  },
  {
    name: "python-django",
    icons: [faPython],
    text: "Python | Django",
    paragraphs: [
      "Python : an interpreted, high-level and general-purpose programming language.",
      "Django : a Python-based free and open-source web framework that follows the model-template-views architectural pattern.",
    ],
  },
  {
    name: "git-github-linux",
    icons: [faGit, faGithub, faLinux],
    text: "Git | Github | Lunix",
    paragraphs: [
      "Git : a distributed version-control system for tracking changes in source code during software development.",
      "Github : a provider of Internet hosting for software development and version control using Git.",
      "Linux : a family of open-source Unix-like operating systems based on the Linux kernel, an operating system kernel first released on September 17, 1991, by Linus Torvalds.",
    ],
  },
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState("mern");
  const [content, setContent] = useState(
    skillContent.filter((skill) => skill.name === selectedSkill)[0]
  );

  useEffect(() => {
    switch (selectedSkill) {
      case "mern":
        setContent(skillContent[0]);
        break;

      case "figma":
        setContent(skillContent[1]);
        break;

      case "html-css-js":
        setContent(skillContent[2]);
        break;

      case "php-laravel":
        setContent(skillContent[3]);
        break;

      case "python-django":
        setContent(skillContent[4]);
        break;

      case "git-github-linux":
        setContent(skillContent[5]);
        break;

      default:
        break;
    }
  }, [selectedSkill]);

  return (
    <div
      id="tech-stack-container"
      className="grid grid-cols-1 md:grid-cols-10 h-full overflow-hidden"
    >
      {
        skillContent.map((skill, index) => {
          return (
            <TechStackColumn
              key={index}
              icons={skill.icons}
              text={skill.text}
              onClick={() => setSelectedSkill(skill.name)}
              active={selectedSkill === skill.name}
            />
          );
        })
      }
      <div className="grid grid-rows-1 md:grid-rows-12 md:col-start-8 md:col-span-3 overflow-hidden">
        <div className="border p-3 overflow-y-auto bg-white md:row-start-2 md:row-span-10 min-h-40">
          {content.paragraphs.map((paragraph, index) => {
            return (
              <p key={index} className="m-2">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

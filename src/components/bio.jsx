import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobsTimeline from "./jobsTimeline";
import { faFilter, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import html_css_javascript from "../assets/certificates/html_css_javascript.jpeg";
import html_javascript_bootstrap from "../assets/certificates/html_javascript_bootstrap.jpg";
import introduction_to_front_end_development from "../assets/certificates/introduction_to_front_end_development.jpeg";
import programming_with_javascript from "../assets/certificates/programming_with_javascript.jpeg";
import responsive_web_design from "../assets/certificates/responsive_web_design.png";
import version_control from "../assets/certificates/version_control.jpeg";

import addweb_solution from "../assets/addweb_solution.jpeg";
import alephtav from "../assets/alephtav.jpeg";

import world_vision from "../assets/world_vision.jpg";
import rotaract from "../assets/rotaract.png";

import bahir_dar_university from "../assets/bahir_dar_university.jpeg";
import addis_ababa_university from "../assets/addis_ababa_university.jpeg";

const bio = [
  {
    type: "job",
    company: "AddWeb Solution Private Limited",
    role: "Software Engineer",
    country: "🇮🇳 India",
    remote: true,
    startDate: "May 2022",
    endDate: null,
    duration: "1 yr 9 Months",
    responsibilities: [
      "Developing full-stack web applications for our clients",
      "Working monthstly on full-stack Laravel PHP, MERN, and MEVN stack applications",
      "Utilized CI-CD pipelines, AWS services, git version control",
    ],
    skills: [
      "Amazon Dynamodb",
      "PHP",
      "Laravel",
      "Amazon Web Services (AWS)",
      "Serverless",
      "MERN Stack Development",
      "React.js",
    ],
    image: addweb_solution,
  },
  {
    type: "job",
    company: "Alephtav Consultancy and Trading PlC",
    role: "Software Developer and Designer",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Jul 2021",
    endDate: "May 2022",
    duration: "11 months",
    responsibilities: [
      "Full Stack Web Development (Frontend heavy - with React)",
      "Web Design and prototyping (Figma)",
      "Graphics Design (Adobe Suit, ...)",
      "Interior Design and Vis (Sketchup and Vray)",
    ],
    skills: ["Web Development", "React.js", "Team Leadership"],
    image: alephtav,
  },
  {
    type: "job",
    company: "BRIM DESIGN",
    role: "Interior Designer",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Jan 2021",
    endDate: "Jul 2021",
    duration: "7 months",
    responsibilities: [
      "Interior Design",
      "Architectural Designer",
      "3D Visualization",
    ],
    skills: ["Lumion", "SketchUp"],
  },
  {
    type: "job",
    company: "Tana Entertainment P.L.C",
    role: "Designer, UI Developer",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Dec 2020",
    endDate: "Feb 2021",
    duration: "3 months",
    responsibilities: ["Adobe Creative Suite", "Graphic Design"],
    skills: [
      "Web Design and Prototyping",
      "Adobe Creative Suite",
      "Graphic Design",
    ],
  },
  {
    type: "job",
    company: "Tekeba and Friends Asset Valuation and Property Managment",
    role: "Property Surveyor, Logistics Assistance",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "May 2018",
    endDate: "Aug 2018",
    duration: "4 months",
    responsibilities: [
      "Coordinating Surveying of FHC houses, Data collection, calculation, and reporting",
      "Locating FHC properties",
      "Preparation of surveying drawings and documents",
      "Assistant-Managing logistics for surveying",
      "Coordinating surveyors",
    ],
    skills: [
      "Asset Valuation",
      "Property Management",
      "Property Surveying",
      "Professional Excel and Word",
    ],
  },
  {
    type: "job",
    company: "PCODE Private Limited Company",
    role: "Graphics Designer",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Apr 2016",
    endDate: "Dec 2016",
    duration: "9 months",
    responsibilities: [
      "Designing feel and look of websites",
      "Creating vector assets for web dev",
      "Creating promotional materials",
      "Art directing of slider pictures for websites",
      "Design gift-cards",
      "Motion graphics and promo videos",
    ],
    skills: [
      "Adobe Creative Suite",
      "Graphic Design",
      "Motion Graphics",
      "Video Editing",
      "Web Design and Prototyping",
    ],
  },
  {
    type: "job",
    company: "M.E Consulting Architects and Engineers",
    role: "Architecture Intern",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Jun 2016",
    endDate: "Sep 2016",
    duration: "4 months",
    responsibilities: [
      "Architectural visualization and complete Architectural Design tasks",
      "Designed 1 - 7 story buildings.",
      "Graphics Design of promotional materials like banners fliers and stickers.",
      "Construction supervision works",
    ],
    skills: ["AutoCad", "Revit", "ArchiCad", "Lumion", "SketchUp"],
  },
  {
    type: "volunteer",
    company: "World Vision",
    role: "Volunteer",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Jun 2016",
    endDate: null,
    duration: "7 yrs 8 mos",
    cause: "Children",
    responsibilities: [
      "Part of a project that was working on eradicating child abuse in the Amhara region",
      "Educating, training and empowering youth",
      "Trainer in Dona Berber school along with other Volunteers",
    ],
    skills: ["Youth Empowerment", "Child Protection", "Child Welfare"],
    image: world_vision,
  },
  {
    type: "volunteer",
    company: "Rotaract Ethiopia",
    role: "Member",
    country: "🇪🇹 Ethiopia",
    remote: false,
    startDate: "Sep 2020",
    endDate: null,
    duration: "3 yrs 5 mos",
    responsibilities: ["A proud inducted member of Rotaract Club of Bahir Dar"],
    skills: ["Community Service", "Youth Empowerment", "Leadership"],
    image: rotaract,
  },
  {
    type: "certification",
    organization: "Meta",
    title: "Version Control",
    startDate: "Mar 2023",
    credentialID: "WGC3XRPHK8XS",
    link: "https://www.coursera.org/account/accomplishments/verify/WGC3XRPHK8XS",
    image: version_control,
    skills: ["Git", "GitHub", "Version Control"],
  },
  {
    type: "certification",
    organization: "Meta",
    title: "Programming with JavaScript",
    startDate: "Jan 2023",
    credentialID: "d918ddbbef42a09795f44b6326462073",
    link: "https://www.coursera.org/account/accomplishments/verify/SCBKNCSDGVH7",
    image: programming_with_javascript,
    skills: ["OOP", "JavaScript"],
  },
  {
    type: "certification",
    organization: "The Johns Hopkins University",
    title: "HTML, CSS, and Javascript for Web Developers",
    startDate: "Dec 2022",
    credentialID: "DKKAPB4LQ4DZ",
    link : "https://www.coursera.org/account/accomplishments/verify/DKKAPB4LQ4DZ",
    image: html_css_javascript,
    skills: [],
  },
  {
    type: "certification",
    organization: "Coursera",
    title: "Introduction to Front-End Development",
    startDate: "Nov 2022",
    credentialID: "MXXYFML3FZ5B",
    link: "https://www.coursera.org/account/accomplishments/verify/MXXYFML3FZ5B",
    image: introduction_to_front_end_development,
    skills: [],
  },
  {
    type: "certification",
    organization: "freeCodeCamp",
    title: "Responsive Web Design",
    startDate: "Feb 2022",
    link : "https://freecodecamp.org/certification/zemichaelmd/responsive-web-design",
    image: responsive_web_design,
    skills: [],
  },
  {
    type: "certification",
    organization: "Udemy",
    title: "HTML, JavaScript, & Bootstrap - Certification Course",
    startDate: "Oct 2021",
    credentialID: "UC-8b402382-3f0d-4ad0-8502-423bfe8ef1e7",
    link: "https://www.udemy.com/certificate/UC-8b402382-3f0d-4ad0-8502-423bfe8ef1e7/",
    image: html_javascript_bootstrap,
    skills: ["JavaScript", "Cascading Style Sheets (CSS)", "jQuery", "HTML"],
  },
  {
    type: "education",
    school: "Bahir Dar University",
    degree: "Bachelor of Architecture - BArch, Architecture",
    startDate: "Oct 2012",
    endDate: "Feb 2018",
    duration: "5 yrs 4 mos",
    activitiesAndSocieties: [
      "Design research",
      "Basic Design Training with sketching, painting, and model making",
      "Architectural Design",
      "Interior Design",
      "Urban and Landscape Design",
      "Graphics, publishing and presentation design",
    ],
    description: "A BSC program majoring in Architecture.",
    image: bahir_dar_university,
  },
  {
    type: "education",
    school: "Addis Ababa University",
    degree: "MSc in Information Science and Systems",
    startDate: "Oct 2023",
    duration: "2 yrs 5 mos",
    activitiesAndSocieties: [
      "Information Systems",
      "Information Science",
      "Information Management",
    ],
    description: "An MSc program majoring in Information Science and Systems.",
    image: addis_ababa_university,
  },
];

const filterBio = (bio, type) => {
  if (type === "all") return bio;
  return bio.filter((item) => item.type === type);
};


export default function Bio() {
  const [bioItems, setBioItems] = useState(bio);

  const showOnly = (type) => {
    setBioItems(filterBio(bio, type));
  };

  const getActiveFilter = () => {
    if (bioItems.length === bio.length) return "all";
    if (bioItems.every(item => item.type === "job")) return "job";
    if (bioItems.every(item => item.type === "education")) return "education";
    if (bioItems.every(item => item.type === "certification")) return "certification";
    if (bioItems.every(item => item.type === "volunteer")) return "volunteer";
    return "all";
  };

  const filters = [
    { key: "all", label: "All", count: bio.length },
    { key: "job", label: "Experience", count: bio.filter(item => item.type === "job").length },
    { key: "education", label: "Education", count: bio.filter(item => item.type === "education").length },
    { key: "certification", label: "Certificates", count: bio.filter(item => item.type === "certification").length },
    { key: "volunteer", label: "Volunteer", count: bio.filter(item => item.type === "volunteer").length }
  ];

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-gray-600">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button 
              key={filter.key}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                getActiveFilter() === filter.key
                  ? "bg-green-500 text-white shadow-md transform scale-105" 
                  : "bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white hover:shadow-sm"
              }`}
              onClick={() => showOnly(filter.key)}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <JobsTimeline bio={bioItems} />
      </div>
    </div>
  );
}

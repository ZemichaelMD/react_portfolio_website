import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobsTimeline from "./jobsTimeline";
import { faFilter, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  },
  {
    type: "job",
    company: "Alephtav Consultancy and Trading PlC",
    role: "Software Developer and Designer",
    country: "Ethiopia",
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
  },
  {
    type: "job",
    company: "BRIM DESIGN",
    role: "Interior Designer",
    country: "Ethiopia",
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
    country: "Ethiopia",
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
    country: "Ethiopia",
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
    country: "Ethiopia",
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
    country: "Ethiopia",
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
    country: "Ethiopia",
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
  },
  {
    type: "volunteer",
    company: "Rotaract Ethiopia",
    role: "Member",
    country: "Ethiopia",
    remote: false,
    startDate: "Sep 2020",
    endDate: null,
    duration: "3 yrs 5 mos",
    responsibilities: ["A proud inducted member of Rotaract Club of Bahir Dar"],
    skills: ["Community Service", "Youth Empowerment", "Leadership"],
  },
  {
    type: "certification",
    organization: "Meta",
    title: "Version Control",
    startDate: "Mar 2023",
    credentialID: "WGC3XRPHK8XS",
    skills: ["Git", "GitHub", "Version Control"],
  },
  {
    type: "certification",
    organization: "Meta",
    title: "Programming with JavaScript",
    startDate: "Jan 2023",
    credentialID: "d918ddbbef42a09795f44b6326462073",
    skills: ["OOP", "JavaScript"],
  },
  {
    type: "certification",
    organization: "The Johns Hopkins University",
    title: "HTML, CSS, and Javascript for Web Developers",
    startDate: "Dec 2022",
    credentialID: "DKKAPB4LQ4DZ",
    skills: [],
  },
  {
    type: "certification",
    organization: "Coursera",
    title: "Introduction to Front-End Development",
    startDate: "Nov 2022",
    credentialID: "MXXYFML3FZ5B",
    skills: [],
  },
  {
    type: "certification",
    organization: "freeCodeCamp",
    title: "Responsive Web Design",
    startDate: "Feb 2022",
    skills: [],
  },
  {
    type: "certification",
    organization: "Udemy",
    title: "HTML, JavaScript, & Bootstrap - Certification Course",
    startDate: "Oct 2021",
    credentialID: "UC-8b402382-3f0d-4ad0-8502-423bfe8ef1e7",
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

  return (
    <div className="w-100 h-full overflow-y-scroll text-xs md:text-base">
      <div class="z-100 w-full bg-white m-0 p-0 md:p-3 fixed flex justify-center align-items-center">
        <button className="cursor-pointer m-2" onClick={() => showOnly("all")}>
          <FontAwesomeIcon icon={faFilter} className="mr-3 text-slate-300" />
          <span
            className={`font-mono tracking-widest mb-4 hover:text-green-500`}
          >
            All
          </span>
        </button>

        <button className="cursor-pointer m-2" onClick={() => showOnly("job")}>
          <FontAwesomeIcon icon={faFilter} className="mr-3 text-slate-300" />
          <span
            className={`font-mono tracking-widest mb-4 hover:text-green-500`}
          >
            Jobs
          </span>
        </button>

        <button
          className="cursor-pointer m-2"
          onClick={() => showOnly("education")}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-3 text-slate-300" />
          <span
            className={`font-mono tracking-widest mb-4 hover:text-green-500`}
          >
            School
          </span>
        </button>

        <button
          className="cursor-pointer m-2"
          onClick={() => showOnly("certification")}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-3 text-slate-300" />
          <span
            className={`font-mono tracking-widest mb-4 hover:text-green-500`}
          >
            Certificate
          </span>
        </button>

        <button
          className="cursor-pointer m-2"
          onClick={() => showOnly("volunteer")}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-3 text-slate-300" />
          <span
            className={`font-mono tracking-widest mb-4 hover:text-green-500`}
          >
            Volunteer
          </span>
        </button>

      </div>
      <div
        id="tech-stack-container"
        className="mt-8 grid grid-cols-1 md:grid-cols-12 "
      >
        <div className="border md:col-start-2 md:col-span-10">
          <JobsTimeline bio={bioItems} />
        </div>
      </div>
    </div>
  );
}

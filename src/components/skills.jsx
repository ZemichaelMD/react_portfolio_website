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
  faBootstrap,
  faVuejs,
  faAws,
  faDocker,
  faNpm,
  faYarn,
  faAngular,
  faWordpress,
  faSketch,
  faSlack,
  faJira,
  faDigitalOcean,
  faGoogle,
  faMicrosoft,
  faUbuntu,
  faRedhat,
  faWindows,
  faApple,
  faDiscord,
  faStripe,
  faPaypal,
  faBitbucket,
  faGitlab,
  faChrome,
  faFirefox,
  faSafari,
  faEdge,
} from "@fortawesome/free-brands-svg-icons";

import { 
  faDatabase, 
  faCode, 
  faServer, 
  faCloud,
  faCog,
  faLayerGroup,
  faCube,
  faCodeBranch,
  faTerminal,
  faDesktop,
  faMobile,
  faGlobe,
  faShieldAlt,
  faTools,
  faRocket,
  faPalette,
  faChartLine,
  faBolt,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TechIcon = ({ icon, name, category, color }) => {
  const categoryColors = {
    'Frontend': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Backend': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    'Database': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'Cloud & DevOps': 'from-orange-500/20 to-red-500/20 border-orange-500/30',
    'Mobile & Desktop': 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30',
    'Design & Tools': 'from-pink-500/20 to-rose-500/20 border-pink-500/30'
  };

  return (
    <div className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColors[category] || 'from-gray-700/20 to-gray-600/20 border-gray-600/30'} border backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1`}>
      <FontAwesomeIcon
        icon={icon}
        className="text-xl"
        style={{ color: color || '#9CA3AF' }}
      />
      {/* Tooltip */}
      <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl border border-gray-700">
          <div className="font-medium">{name}</div>
          <div className="text-gray-400 text-xs">{category}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

const skillCategories = {
  'Frontend': [
    { icon: faHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: faCss3Alt, name: 'CSS3', color: '#1572B6' },
    { icon: faJs, name: 'JavaScript', color: '#F7DF1E' },
    { icon: faReact, name: 'React', color: '#61DAFB' },
    { icon: faVuejs, name: 'Vue.js', color: '#4FC08D' },
    { icon: faAngular, name: 'Angular', color: '#DD0031' },
    { icon: faBootstrap, name: 'Bootstrap', color: '#7952B3' },
    { icon: faBolt, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: faCube, name: 'Three.js', color: '#000000' },
    { icon: faCode, name: 'TypeScript', color: '#3178C6' },
    { icon: faSync, name: 'Next.js', color: '#000000' },
    { icon: faRocket, name: 'Vite', color: '#646CFF' }
  ],
  'Backend': [
    { icon: faNodeJs, name: 'Node.js', color: '#339933' },
    { icon: faPhp, name: 'PHP', color: '#777BB4' },
    { icon: faLaravel, name: 'Laravel', color: '#FF2D20' },
    { icon: faPython, name: 'Python', color: '#3776AB' },
    { icon: faServer, name: 'Django', color: '#092E20' },
    { icon: faServer, name: 'Express.js', color: '#68A063' },
    { icon: faCode, name: 'Nest.js', color: '#E0234E' },
    { icon: faServer, name: 'FastAPI', color: '#009688' },
    { icon: faCodeBranch, name: 'GraphQL', color: '#E10098' }
  ],
  'Database': [
    { icon: faDatabase, name: 'MongoDB', color: '#47A248' },
    { icon: faDatabase, name: 'MySQL', color: '#4479A1' },
    { icon: faDatabase, name: 'PostgreSQL', color: '#336791' },
    { icon: faDatabase, name: 'Redis', color: '#DC382D' },
    { icon: faLayerGroup, name: 'DynamoDB', color: '#FF9900' },
    { icon: faDatabase, name: 'SQLite', color: '#003B57' },
    { icon: faChartLine, name: 'InfluxDB', color: '#22ADF6' }
  ],
  'Cloud & DevOps': [
    { icon: faAws, name: 'AWS', color: '#FF9900' },
    { icon: faGoogle, name: 'Google Cloud', color: '#4285F4' },
    { icon: faMicrosoft, name: 'Azure', color: '#0078D4' },
    { icon: faDigitalOcean, name: 'DigitalOcean', color: '#0080FF' },
    { icon: faDocker, name: 'Docker', color: '#2496ED' },
    { icon: faCog, name: 'Kubernetes', color: '#326CE5' },
    { icon: faTerminal, name: 'Jenkins', color: '#D33833' },
    { icon: faSync, name: 'CI/CD', color: '#2088FF' },
    { icon: faShieldAlt, name: 'Security', color: '#FF6B35' }
  ],
  'Mobile & Desktop': [
    { icon: faMobile, name: 'React Native', color: '#61DAFB' },
    { icon: faDesktop, name: 'Electron', color: '#47848F' },
    { icon: faApple, name: 'iOS', color: '#000000' },
    { icon: faWindows, name: 'Windows', color: '#0078D6' },
    { icon: faLinux, name: 'Linux', color: '#FCC624' },
    { icon: faUbuntu, name: 'Ubuntu', color: '#E95420' }
  ],
  'Design & Tools': [
    { icon: faFigma, name: 'Figma', color: '#F24E1E' },
    { icon: faSketch, name: 'Sketch', color: '#F7B500' },
    { icon: faPalette, name: 'Adobe XD', color: '#FF61F6' },
    { icon: faGit, name: 'Git', color: '#F05032' },
    { icon: faGithub, name: 'GitHub', color: '#181717' },
    { icon: faGitlab, name: 'GitLab', color: '#FC6D26' },
    { icon: faBitbucket, name: 'Bitbucket', color: '#0052CC' },
    { icon: faSlack, name: 'Slack', color: '#4A154B' },
    { icon: faJira, name: 'Jira', color: '#0052CC' },
    { icon: faNpm, name: 'NPM', color: '#CB3837' },
    { icon: faYarn, name: 'Yarn', color: '#2C8EBB' }
  ]
};

const SkillCategory = ({ title, skills, categoryKey }) => {
  const categoryColors = {
    'Frontend': 'from-blue-500 to-cyan-500',
    'Backend': 'from-green-500 to-emerald-500',
    'Database': 'from-purple-500 to-pink-500',
    'Cloud & DevOps': 'from-orange-500 to-red-500',
    'Mobile & Desktop': 'from-indigo-500 to-blue-500',
    'Design & Tools': 'from-pink-500 to-rose-500'
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-gray-600/50 transition-all duration-300">
      <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[categoryKey]} text-white text-sm font-medium mb-4 shadow-lg`}>
        {title}
        <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs">
          {skills.length}
        </span>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {skills.map((skill, index) => (
          <TechIcon
            key={index}
            icon={skill.icon}
            name={skill.name}
            category={categoryKey}
            color={skill.color}
          />
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  const totalSkills = Object.values(skillCategories).reduce((sum, skills) => sum + skills.length, 0);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800/50">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full border border-gray-600">
          <span className="text-sm text-gray-300">
            <span className="font-medium text-white">Technology Stack:</span>
            {' '}{totalSkills}+ technologies across {Object.keys(skillCategories).length} categories
          </span>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(skillCategories).map(([categoryKey, skills]) => (
          <SkillCategory
            key={categoryKey}
            title={categoryKey}
            skills={skills}
            categoryKey={categoryKey}
          />
        ))}
      </div>
    </div>
  );
}

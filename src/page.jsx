import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCode,
  faBriefcase,
  faTimeline,
  faEnvelope,
  faPhone,
  faExternalLinkAlt,
  faBars,
  faTimes,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub as faGithubBrand,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Skills from "./components/skills";
import Bio from "./components/bio";
import portfolioData from "./data/portfolio.json";
import zemichael from "./assets/zemichael.jpeg";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const mobileMenuRef = useRef(null);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMobileMenuOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "portfolio", "skills", "timeline", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: "hero", label: "Home", icon: faUser },
    { id: "portfolio", label: "Portfolio", icon: faBriefcase },
    { id: "skills", label: "Skills", icon: faCode },
    { id: "timeline", label: "Timeline", icon: faClock },
    { id: "contact", label: "Contact", icon: faEnvelope },
  ];

  return (
    <>
      {/* Desktop Floating Navigation Island */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-900 hidden md:block">
        <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-full px-6 py-3 shadow-2xl shadow-green-500/10">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative transition-all duration-300 font-medium text-sm px-4 py-2 rounded-full ${
                  activeSection === item.id
                    ? "text-black bg-green-400 shadow-lg shadow-green-400/50"
                    : "text-gray-300 hover:text-green-400 hover:bg-gray-800/50"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-20"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Floating Navigation */}
      <nav className="fixed top-4 right-4 z-900 md:hidden">
        <div className="relative" ref={mobileMenuRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-full p-4 shadow-2xl text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-105"
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              size="lg"
              className={`transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl overflow-hidden min-w-48 animate-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:text-green-400 hover:bg-gray-800/50 transition-all duration-200 font-medium text-sm flex items-center space-x-3"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm">
                  💻 Available for hire
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-300 to-green-500 leading-tight mb-4">
                Zemichael
                <br />
                <span className="text-4xl lg:text-5xl text-gray-200 font-bold">
                  Mehretu
                </span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
                Full-Stack Architect
              </h2>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-medium shadow-lg">
                  React Specialist
                </span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg">
                  Laravel Expert
                </span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium shadow-lg">
                  Node.js Pro
                </span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg text-sm font-medium shadow-lg">
                  AWS Certified
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed font-light">
              Crafting exceptional digital experiences with cutting-edge
              technologies.
              <span className="text-green-400 font-medium">5+ years</span>{" "}
              transforming complex challenges into elegant solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-3 border-2 border-green-400/50 text-green-400 rounded-xl font-semibold hover:bg-green-400 hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
              >
                Let's Connect
              </button>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/zemichaelmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithubBrand} size="2x" />
              </a>
              <a
                href="https://linkedin.com/in/zemichaelmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a
                href="https://twitter.com/zemichaelmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-green-600 shadow-2xl">
                <img
                  src={zemichael}
                  alt="Zemichael Mehretu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-green-600 text-white p-3 rounded-full shadow-lg">
                <FontAwesomeIcon icon={faCode} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const { projects } = portfolioData;

  const getTechColor = (tech) => {
    const colors = {
      Laravel: "bg-red-100 text-red-800",
      PHP: "bg-purple-100 text-purple-800",
      "Node.js": "bg-green-100 text-green-800",
      React: "bg-blue-100 text-blue-800",
      "Vue.js": "bg-emerald-100 text-emerald-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      Python: "bg-blue-100 text-blue-800",
      AWS: "bg-orange-100 text-orange-800",
      MySQL: "bg-blue-100 text-blue-800",
      "Three.js": "bg-black text-white",
      WebGL: "bg-red-100 text-red-800",
      "nest.js": "bg-red-100 text-red-800",
      typescript: "bg-blue-100 text-blue-800",
      tailwindcss: "bg-cyan-100 text-cyan-800",
      mongodb: "bg-green-100 text-green-800",
      redis: "bg-red-100 text-red-800",
      rabbitmq: "bg-orange-100 text-orange-800",
      docker: "bg-blue-100 text-blue-800",
      kubernetes: "bg-blue-100 text-blue-800",
      "Next.js": "bg-black text-white",
      TailwindCSS: "bg-cyan-100 text-cyan-800",
      TypeScript: "bg-blue-100 text-blue-800",
      Neon: "bg-green-100 text-green-800",
      Vercel: "bg-black text-white",
    };
    return colors[tech] || "bg-gray-100 text-gray-800";
  };

  return (
    <section id="portfolio" className="py-16 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-gray-700/50 border border-gray-600 rounded-full text-gray-300 text-sm font-medium backdrop-blur-sm">
              🚀 Portfolio Showcase
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            Project
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Collection
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-green-400 font-semibold">
              9 cutting-edge projects
            </span>{" "}
            spanning enterprise applications, immersive 3D experiences, and
            revolutionary full-stack solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    {project.NDA && (
                      <span className="bg-red-500/20 border border-red-500/50 text-red-400 text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                        NDA
                      </span>
                    )}
                  </div>
                  {project.with && (
                    <p className="text-sm text-green-400 font-medium">
                      @ {project.with}
                    </p>
                  )}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors ml-3 flex-shrink-0"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                )}
              </div>

              <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                {project.description}
              </p>

              <div className="mb-3">
                <p className="text-xs font-medium text-gray-200 mb-1">
                  Role: {project.role}
                </p>
                <p className="text-xs text-gray-400">
                  {project.responsibilities}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTechColor(
                      tech
                    )}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium backdrop-blur-sm">
              ⚡ Technology Arsenal
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            Tech
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Stack
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-purple-400 font-semibold">
              54+ cutting-edge technologies
            </span>{" "}
            mastered across frontend, backend, cloud, and emerging tech
            ecosystems
          </p>
        </div>
        <Skills />
      </div>
    </section>
  );
};

const TimelineSection = () => {
  return (
    <section id="timeline" className="py-16 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
              🎯 Career Timeline
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            Career
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Evolution
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive journey through{" "}
            <span className="text-blue-400 font-semibold">
              professional excellence
            </span>
            , advanced education, industry certifications, and meaningful
            community impact
          </p>
        </div>
        <Bio />
      </div>
    </section>
  );
};

const ContactSection = () => {
  const contactInfo = [
    {
      icon: faEnvelope,
      label: "Email",
      value: "zemichaelmd@gmail.com",
      href: "mailto:zemichaelmd@gmail.com",
    },
    {
      icon: faPhone,
      label: "Phone",
      value: "+251927646246",
      href: "tel:+251927646246",
    },
    {
      icon: faGithubBrand,
      label: "GitHub",
      value: "github.com/zemichaelmd",
      href: "https://github.com/zemichaelmd",
    },
    {
      icon: faLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/zemichaelmd",
      href: "https://linkedin.com/in/zemichaelmd",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm">
              🤝 Let's Collaborate
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
            Ready to Build
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Something Epic?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Transform your boldest ideas into reality. Let's create{" "}
            <span className="text-orange-400 font-semibold">
              extraordinary digital experiences
            </span>
            that captivate users and drive unprecedented success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors group"
            >
              <FontAwesomeIcon
                icon={contact.icon}
                className="text-3xl text-green-400 mb-4 group-hover:text-green-300 transition-colors"
              />
              <h3 className="font-medium text-lg mb-2">{contact.label}</h3>
              <p className="text-gray-300 text-sm">{contact.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400">
            © 2024 Zemichael Mehretu. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Page = () => {
  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <HeroSection />
      <PortfolioSection />
      <SkillsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Page;

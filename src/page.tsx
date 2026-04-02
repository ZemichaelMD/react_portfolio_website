import { ExternalLink, Github, Globe, Linkedin, Mail, Phone } from "lucide-react";

import portfolioData from "./data/portfolio.json";
import resumeData from "./data/resumeData.json";
import zemichael from "./assets/zemichael.jpeg";

const iconByLabel = {
  Website: Globe,
  "Portfolio Source": Globe,
  GitHub: Github,
  LinkedIn: Linkedin,
  StackOverflow: ExternalLink,
};

const projects = portfolioData.projects;
const workExperience = resumeData.workExperience;
const topEngineeringSkills = resumeData.skills.engineering.slice(0, 8);
const topPlatformSkills = resumeData.skills.platforms.slice(0, 6);
const topDesignSkills = resumeData.skills.designArchitecture.slice(0, 6);
const references = resumeData.references || [];

const featuredProjects = projects.slice(0, 6);

const Page = () => {
  const latestRole = workExperience[0];

  return (
    <div className="ds-shell">
      <main className="ds-main">
        <section className="ds-hero">
          <img src={zemichael} alt={resumeData.profile.fullName} className="ds-portrait" />

          <div className="ds-hero-content">
            <p className="ds-eyebrow">{resumeData.profile.location}</p>
            <h1>{resumeData.profile.fullName}</h1>
            <p className="ds-subhead">{resumeData.profile.headline}</p>
            <p className="ds-muted">{resumeData.summary}</p>

            <div className="ds-link-row">
              <a className="ds-action" href={`mailto:${resumeData.profile.email}`}>
                <Mail size={14} /> {resumeData.profile.email}
              </a>
              <a className="ds-action" href={`tel:${resumeData.profile.phone}`}>
                <Phone size={14} /> {resumeData.profile.phone}
              </a>
            </div>

            <p className="ds-muted-small">{resumeData.profile.languages.join(" | ")}</p>
          </div>
        </section>

        <section className="ds-section">
          <div className="ds-section-head">
            <p className="ds-eyebrow">Experience</p>
            <h2>Recent work</h2>
          </div>

          <div className="ds-list-grid">
            {workExperience.slice(0, 4).map((item) => (
              <article key={`${item.company}-${item.period}`} className="ds-item-card">
                <h3>{item.title}</h3>
                <p className="ds-muted">{item.company}</p>
                <p className="ds-muted-small">{item.period} | {item.locationMode}</p>
                <ul className="ds-list">
                  {item.achievements.slice(0, 2).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="ds-section">
          <div className="ds-section-head">
            <p className="ds-eyebrow">Projects</p>
            <h2>Selected builds</h2>
          </div>

          <div className="ds-list-grid">
            {featuredProjects.map((project) => {
              const content = (
                <>
                  <h3>{project.title}</h3>
                  <p className="ds-muted-small">{project.role}</p>
                  <p className="ds-muted">{project.description}</p>
                  <div className="ds-chip-row">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={`${project.id}-${tech}`} className="ds-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              );

              if (!project.url) {
                return (
                  <article key={project.id} className="ds-item-card ds-item-card-muted">
                    {content}
                  </article>
                );
              }

              return (
                <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className="ds-item-card ds-item-link">
                  {content}
                  <span className="ds-inline-link">
                    Open project <ExternalLink size={13} />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="ds-section ds-skill-section">
          <div className="ds-section-head">
            <p className="ds-eyebrow">Skills</p>
            <h2>Core stack</h2>
          </div>

          <div className="ds-skill-columns">
            <article>
              <h3>Engineering</h3>
              <div className="ds-chip-row">
                {topEngineeringSkills.map((skill) => (
                  <span key={skill} className="ds-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
            <article>
              <h3>Platforms</h3>
              <div className="ds-chip-row">
                {topPlatformSkills.map((skill) => (
                  <span key={skill} className="ds-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
            <article>
              <h3>Design</h3>
              <div className="ds-chip-row">
                {topDesignSkills.map((skill) => (
                  <span key={skill} className="ds-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="ds-section">
          <div className="ds-section-head">
            <p className="ds-eyebrow">Contact</p>
            <h2>Links</h2>
          </div>

          <div className="ds-link-row">
            {resumeData.profile.links.map((link) => {
              const Icon = iconByLabel[link.label] || ExternalLink;
              return (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="ds-action">
                  <Icon size={14} /> {link.label}
                </a>
              );
            })}
          </div>

          {references.length > 0 && (
            <div className="ds-reference-row">
              {references.map((item) => (
                <article key={`${item.name}-${item.email}`} className="ds-item-card">
                  <h3>{item.name}</h3>
                  <p className="ds-muted">{item.title}</p>
                  <p className="ds-muted-small">{item.phone}</p>
                  <a className="ds-inline-link" href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="ds-section ds-footnote">
          <p className="ds-muted-small">
            Current role: {latestRole.title} at {latestRole.company}.
          </p>
          {/* <a href="/projects.html" className="ds-inline-link">
            View full projects page <ExternalLink size={13} />
          </a> */}
        </section>
      </main>
    </div>
  );
};

export default Page;

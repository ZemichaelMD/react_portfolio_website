import { useMemo, useState } from "react";
import zemichael from "./assets/zemichael.jpeg";
import addweb from "./assets/addweb_solution.jpeg";
import resumeData from "./data/resumeData.json";
import portfolioData from "./data/portfolio.json";

type Project = (typeof portfolioData.projects)[number];
type Experience = (typeof resumeData.workExperience)[number];

type ModalState =
  | { kind: "project"; item: Project }
  | { kind: "experience"; item: Experience }
  | null;

const projects = portfolioData.projects.slice(0, 6);
const spotlightProjects = portfolioData.projects.slice(0, 4);
const work = resumeData.workExperience.slice(0, 4);

const Page = () => {
  const [activeSpotlightId, setActiveSpotlightId] = useState(spotlightProjects[0]?.id ?? "");
  const [modal, setModal] = useState<ModalState>(null);

  const activeSpotlight = useMemo(
    () => spotlightProjects.find((project) => project.id === activeSpotlightId) ?? spotlightProjects[0],
    [activeSpotlightId]
  );

  return (
    <div className="poster">

      {/* NAV */}
      <header className="top-strip" aria-label="Portfolio status">
        <div className="identity-block">
          <span className="identity-mark">MD</span>
          <div>
            <p className="eyebrow">Personal Site</p>
            <p className="identity-name">Zemichael Dagnew</p>
          </div>
        </div>
        <div className="pulse-wrap" aria-hidden="true">
          <span className="pulse-dot" />
          <span className="pulse-text">Now Crafting Better Product Experiences</span>
        </div>
        <div className="signal-card">
          <img src={addweb} alt="subtle studio backdrop" />
          <div className="signal-copy">
            <p className="eyebrow">Current Focus</p>
            <p className="signal-line">Turning complex product ideas into clear, fast interfaces.</p>
          </div>
        </div>
      </header>

      {/* GRID */}
      <main className="grid">

        {/* HERO */}
        <section className="cell hero">
          <img src={zemichael} alt={resumeData.profile.fullName} />
          <div className="overlay" />
          <div className="hero-text">
            <h1>{resumeData.profile.fullName}</h1>
            <p className="sub">{resumeData.profile.headline}</p>
          </div>
        </section>

        {/* ABOUT */}
        <section className="cell about">
          <h3>About</h3>
          <p>{resumeData.summary}</p>
        </section>

        {/* FEATURE PROJECT */}
        <section className="cell feature interactive-feature">
          <h3>Project Spotlight</h3>
          <h2>{activeSpotlight.title}</h2>
          <p className="muted">{activeSpotlight.role}</p>
          <p>{activeSpotlight.description}</p>
          <p className="meta">{activeSpotlight.responsibilities}</p>

          <div className="chip-wrap">
            {activeSpotlight.technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
          </div>

          <button
            type="button"
            className="theme-button"
            onClick={() => setModal({ kind: "project", item: activeSpotlight })}
          >
            View Full Project
          </button>

          <div className="feature-switches" aria-label="Switch project spotlight">
            {spotlightProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`feature-switch ${project.id === activeSpotlight.id ? "is-active" : ""}`}
                onClick={() => setActiveSpotlightId(project.id)}
              >
                {project.title}
              </button>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="cell">
          <h3>Experience</h3>
          {work.map((w) => (
            <button
              key={`${w.company}-${w.title}`}
              type="button"
              className="item item-button"
              onClick={() => setModal({ kind: "experience", item: w })}
            >
              <strong>{w.title}</strong>
              <span>{w.company}</span>
              <p className="meta">{w.period}</p>
              <span className="click-hint">Open details</span>
            </button>
          ))}
        </section>

        {/* PROJECTS */}
        <section className="cell">
          <h3>Projects</h3>
          {projects.slice(1, 5).map((p) => (
            <button
              key={p.id}
              type="button"
              className="item item-button"
              onClick={() => setModal({ kind: "project", item: p })}
            >
              <strong>{p.title}</strong>
              <span className="muted">{p.role}</span>
              <span className="click-hint">Open details</span>
            </button>
          ))}
        </section>

        {/* SKILLS */}
        <section className="cell">
          <h3>Skills</h3>
          <p className="skills">
            {resumeData.skills.engineering.join(" · ")}
          </p>
        </section>

        {/* CONTACT */}
        <section className="cell">
          <h3>Contact</h3>
          <p>{resumeData.profile.email}</p>
          <p>{resumeData.profile.phone}</p>
        </section>

      </main>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <article
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <p className="eyebrow">{modal.kind === "project" ? "Project Detail" : "Experience Detail"}</p>
              <button type="button" className="modal-close" onClick={() => setModal(null)}>
                Close
              </button>
            </div>

            {modal.kind === "project" ? (
              <div className="modal-content">
                <h2>{modal.item.title}</h2>
                <p className="muted">{modal.item.role} {modal.item.with ? `• ${modal.item.with}` : ""}</p>
                <p>{modal.item.description}</p>
                <p className="meta">{modal.item.responsibilities}</p>
                <p>
                  <strong>Category:</strong> {modal.item.category}
                </p>
                <div className="chip-wrap">
                  {modal.item.technologies.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
                {modal.item.url ? (
                  <a className="theme-link" href={modal.item.url} target="_blank" rel="noreferrer">
                    Visit Project
                  </a>
                ) : (
                  <p className="meta">Live link unavailable (NDA or internal system).</p>
                )}
              </div>
            ) : (
              <div className="modal-content">
                <h2>{modal.item.title}</h2>
                <p className="muted">{modal.item.company}</p>
                <p className="meta">{modal.item.period} • {modal.item.type} • {modal.item.locationMode}</p>
                <p>{modal.item.location}</p>
                <div className="modal-list">
                  {modal.item.achievements.map((achievement) => (
                    <p key={achievement}>• {achievement}</p>
                  ))}
                </div>
                <div className="chip-wrap">
                  {modal.item.stack.slice(0, 10).map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
                {modal.item.website && (
                  <a className="theme-link" href={modal.item.website} target="_blank" rel="noreferrer">
                    Visit Company
                  </a>
                )}
              </div>
            )}
          </article>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <span>{resumeData.profile.location}</span>
        <span>{work[0].title} @ {work[0].company}</span>
      </footer>
    </div>
  );
};

export default Page;
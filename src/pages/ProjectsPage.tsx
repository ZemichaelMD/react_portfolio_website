import { useState } from "react";
import PageShell from "../components/PageShell";
import portfolioData from "../data/portfolio.json";
import { getProjectScreenshot } from "../data/projectMedia";

type Project = (typeof portfolioData.projects)[number];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const projects = portfolioData.projects as Project[];
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const totalProjects = projects.length;
  const publicProjects = projects.filter((p) => !p.NDA).length;
  const techCount = new Set(projects.flatMap((p) => p.technologies)).size;

  return (
    <PageShell>
      <section className="cell project-hero">
        <div className="project-hero-overlay" />
        <div className="project-hero-text">
          <p className="eyebrow">Portfolio</p>
          <h1>Projects</h1>
          <p className="sub">{totalProjects} projects · {publicProjects} public · {techCount} technologies</p>
        </div>
      </section>

      <section className="cell project-stats">
        <div className="stat-block">
          <span className="stat-number">{totalProjects}</span>
          <span className="stat-label">Total Projects</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{publicProjects}</span>
          <span className="stat-label">Public</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{techCount}</span>
          <span className="stat-label">Technologies</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{categories.length - 1}</span>
          <span className="stat-label">Categories</span>
        </div>
      </section>

      <section className="cell project-filters">
        <div className="filter-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${filter === cat ? "is-active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {filteredProjects.map((project, i) => (
        <button
          key={project.id}
          type="button"
          className={`cell project-tile ${i % 3 === 0 ? "is-featured" : ""}`}
          onClick={() => setSelectedProject(project)}
        >
          {getProjectScreenshot(project) && (
            <div className="tile-screenshot">
              <img src={getProjectScreenshot(project)} alt="" />
            </div>
          )}
          <p className="eyebrow">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="muted-small">{project.role}</p>
          <p className="tile-description">{project.description}</p>
          <div className="chip-wrap">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={`${project.id}-${tech}`} className="tech-chip">{tech}</span>
            ))}
          </div>
          <div className="tile-badges">
            <span className={`project-badge ${project.NDA ? "is-nda" : "is-open"}`}>
              {project.NDA ? "NDA" : "Public"}
            </span>
          </div>
        </button>
      ))}

      <section className="cell project-cta">
        <h3>Interested in working together?</h3>
        <p>Let's discuss how my experience can help bring your ideas to life.</p>
        <a href="/contact" className="theme-button">Get in Touch</a>
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <article
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <p className="eyebrow">Project Detail</p>
              <button type="button" className="modal-close" onClick={() => setSelectedProject(null)}>
                Close
              </button>
            </div>
            <div className="modal-content">
              {getProjectScreenshot(selectedProject) && (
                <div className="modal-screenshot">
                  <img src={getProjectScreenshot(selectedProject)} alt="" />
                </div>
              )}
              <div className="modal-title-block">
                <h2>{selectedProject.title}</h2>
                <p className="muted">
                  {selectedProject.role} {selectedProject.with ? `• ${selectedProject.with}` : ""}
                </p>
              </div>
              <div className="modal-copy">
                <p>{selectedProject.description}</p>
                {"responsibilities" in selectedProject && (
                  <p className="meta">{selectedProject.responsibilities}</p>
                )}
              </div>
              {"category" in selectedProject && (
                <div className="modal-section">
                  <p className="modal-label">Category</p>
                  <p className="modal-value">{selectedProject.category}</p>
                </div>
              )}
              <div className="chip-wrap">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
              <div className="modal-actions">
                {selectedProject.url ? (
                  <a className="theme-link" href={selectedProject.url} target="_blank" rel="noreferrer">
                    Visit Project
                  </a>
                ) : (
                  <p className="meta">Live link unavailable (NDA or internal system).</p>
                )}
                {"repoUrl" in selectedProject && selectedProject.repoUrl && (
                  <a className="theme-link" href={selectedProject.repoUrl} target="_blank" rel="noreferrer">
                    View Repository
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </PageShell>
  );
};

export default ProjectsPage;

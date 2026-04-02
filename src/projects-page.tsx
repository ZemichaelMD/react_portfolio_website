import portfolioData from "./data/portfolio.json";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  technologies: string[];
  url: string | null;
};

const projects = portfolioData.projects as Project[];

const ProjectsPage = () => {
  return (
    <div className="ds-shell">
      <main className="ds-grid">
        <section className="ds-card ds-w-12">
          <p className="ds-eyebrow">Projects</p>
          <h1>Project Catalog</h1>
          <p className="ds-muted">
            A dedicated multi-page view for projects. Return to the home profile page any time.
          </p>
          <div className="ds-link-row" style={{ marginTop: "1rem" }}>
            <a className="ds-action" href="/">
              Home Page
            </a>
          </div>
        </section>

        <section className="ds-card ds-w-12">
          <div className="ds-project-gallery">
            {projects.map((project) => (
              <article key={project.id} className="ds-project-tile ds-tile-std ds-project-tone-neutral">
                <p className="ds-eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="ds-muted-small">{project.role}</p>
                <p className="ds-project-description">{project.description}</p>

                <div className="ds-chip-row">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={`${project.id}-${tech}`} className="ds-chip ds-chip-project">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer" className="ds-inline-link">
                    Open Project
                  </a>
                ) : (
                  <p className="ds-muted-small">Private / NDA</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;

import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";
import portfolioData from "../data/portfolio.json";
import { getDiscipline } from "../data/content";
import type { Project } from "../data/content";
import { ArrowUpRight } from "../components/Icons";

type Discipline = "All" | "Full-stack" | "Frontend" | "Backend" | "Desktop";

const disciplines: Discipline[] = [
  "All",
  "Full-stack",
  "Frontend",
  "Backend",
  "Desktop",
];

const projects = portfolioData.projects as Project[];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [discipline, setDiscipline] = useState<Discipline>("All");

  const counts = useMemo(() => {
    const next = new Map<Discipline, number>();
    next.set("All", projects.length);

    projects.forEach((project) => {
      const key = getDiscipline(project) as Discipline;
      next.set(key, (next.get(key) ?? 0) + 1);
    });

    return next;
  }, []);

  const filteredProjects =
    discipline === "All"
      ? projects
      : projects.filter((project) => getDiscipline(project) === discipline);

  const publicCount = projects.filter((project) => !project.NDA).length;

  return (
    <PageShell hideContactBand>
      <div className="page">
        <header className="page-head container">
          <p className="page-meta">
            {projects.length} projects · {publicCount} public ·{" "}
            {projects.length - publicCount} under NDA
          </p>
          <h1>Work that ships.</h1>
          <p className="page-lede">
            Production platforms, internal systems, and a few tools built to
            make my own work faster. Some are public; most live inside client
            operations.
          </p>
        </header>

        <div className="container">
          <div
            className="filters"
            role="group"
            aria-label="Filter projects by discipline"
          >
            {disciplines.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter${discipline === item ? " is-active" : ""}`}
                onClick={() => setDiscipline(item)}
                aria-pressed={discipline === item}
              >
                {item}
                <span className="filter-count">{counts.get(item) ?? 0}</span>
              </button>
            ))}
          </div>

          <p className="visually-hidden" aria-live="polite">
            {filteredProjects.length} projects shown.
          </p>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                layout="grid"
                onOpen={setSelectedProject}
              />
            ))}
          </div>

          <p className="page-note">
            Product screenshots and live links are shared where confidentiality
            allows. For NDA-protected work, I&rsquo;m happy to walk through the
            build in a conversation.
          </p>

          <div className="page-end">
            <h2>Have something worth building?</h2>
            <a
              className="button"
              href="mailto:zemichaelmd@gmail.com?subject=Project%20inquiry"
            >
              Start a conversation
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {selectedProject ? (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </PageShell>
  );
};

export default ProjectsPage;

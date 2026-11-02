import type { Project } from "../data/content";
import ProjectMedia from "./ProjectMedia";
import { ArrowUpRight } from "./Icons";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  layout?: "feature" | "pair" | "grid";
};

const ProjectCard = ({ project, onOpen, layout = "pair" }: ProjectCardProps) => {
  const isFeature = layout === "feature";

  return (
    <article className={`project-card project-card--${layout}`}>
      <button
        type="button"
        className="project-media-button"
        onClick={() => onOpen(project)}
        aria-label={`View details for ${project.title}`}
      >
        <ProjectMedia project={project} priority={isFeature} />
        <span className="project-media-hint" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </button>

      <div className="project-card__body">
        <div className="project-card__copy">
          <p className="project-card__kicker">
            <span>{project.category}</span>
            <span className="kicker-dot" aria-hidden="true" />
            <span>{project.NDA ? "Under NDA" : "Public"}</span>
          </p>

          <h3 className="project-card__title">
            <button
              type="button"
              className="project-card__title-button"
              onClick={() => onOpen(project)}
            >
              {project.title}
            </button>
          </h3>

          <p className="project-card__desc">{project.description}</p>

          {!isFeature ? (
            <p className="project-card__foot">
              <span>{project.role}</span>
              <span>{project.technologies.slice(0, 3).join(" / ")}</span>
            </p>
          ) : (
            <button
              type="button"
              className="text-link project-card__link"
              onClick={() => onOpen(project)}
            >
              Open project notes
            </button>
          )}
        </div>

        {isFeature ? (
          <dl className="project-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{project.technologies.join(", ")}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{project.with}</dd>
            </div>
          </dl>
        ) : null}
      </div>
    </article>
  );
};

export default ProjectCard;

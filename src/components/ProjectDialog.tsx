import type { Project } from "../data/content";
import Modal from "./Modal";
import ProjectMedia from "./ProjectMedia";
import { ArrowUpRight } from "./Icons";

type ProjectDialogProps = {
  project: Project;
  onClose: () => void;
};

const ProjectDialog = ({ project, onClose }: ProjectDialogProps) => {
  const repoUrl = "repoUrl" in project ? project.repoUrl : undefined;

  return (
    <Modal onClose={onClose} labelledBy="project-dialog-title">
      <div className="dialog-media">
        <ProjectMedia key={project.id} project={project} priority />
      </div>

      <div className="dialog-body">
        <p className="dialog-kicker">
          {project.category} / {project.with} / {project.NDA ? "Under NDA" : "Public"}
        </p>
        <h2 id="project-dialog-title" className="dialog-title">
          {project.title}
        </h2>
        <p className="dialog-role">{project.role}</p>

        <p className="dialog-copy">{project.description}</p>

        <div className="dialog-section">
          <h3>My contribution</h3>
          <p>{project.responsibilities}</p>
        </div>

        <dl className="dialog-facts">
          <div>
            <dt>Built with</dt>
            <dd>{project.technologies.join(", ")}</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>{project.with}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>
              {project.NDA
                ? "Product protected by NDA; details shared on request."
                : project.url
                  ? "Public product with a live site."
                  : "Internal system with no public demo."}
            </dd>
          </div>
        </dl>

        <div className="dialog-actions">
          {project.url ? (
            <a
              className="button button--small"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit project
              <ArrowUpRight />
            </a>
          ) : (
            <p className="dialog-note">
              No public link is available for this build.
            </p>
          )}

          {repoUrl ? (
            <a
              className="text-link"
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              View source
              <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDialog;

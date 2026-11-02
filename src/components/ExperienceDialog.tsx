import type { Experience } from "../data/content";
import { formatPeriod } from "../data/content";
import Modal from "./Modal";
import { ArrowUpRight } from "./Icons";

type ExperienceDialogProps = {
  experience: Experience;
  onClose: () => void;
};

const ExperienceDialog = ({ experience, onClose }: ExperienceDialogProps) => {
  return (
    <Modal onClose={onClose} labelledBy="experience-dialog-title">
      <div className="dialog-body dialog-body--experience">
        <p className="dialog-kicker">
          {formatPeriod(experience.period)} / {experience.type} /{" "}
          {experience.locationMode}
        </p>
        <h2 id="experience-dialog-title" className="dialog-title">
          {experience.title}
        </h2>
        <p className="dialog-role">{experience.company}</p>

        <dl className="dialog-facts">
          <div>
            <dt>Based in</dt>
            <dd>{experience.location}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{experience.period}</dd>
          </div>
          <div>
            <dt>Working style</dt>
            <dd>
              {experience.type}, {experience.locationMode.toLowerCase()}
            </dd>
          </div>
        </dl>

        <div className="dialog-section">
          <h3>What I worked on</h3>
          <ul className="dialog-list">
            {experience.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div className="dialog-section">
          <h3>Stack</h3>
          <p>{experience.stack.join(", ")}</p>
        </div>

        {experience.website ? (
          <div className="dialog-actions">
            <a
              className="button button--small"
              href={experience.website}
              target="_blank"
              rel="noreferrer"
            >
              Visit company
              <ArrowUpRight />
            </a>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default ExperienceDialog;

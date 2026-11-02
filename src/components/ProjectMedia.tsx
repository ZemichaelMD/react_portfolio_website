import { useState } from "react";
import type { Project } from "../data/content";
import { getProjectScreenshot } from "../data/projectMedia";

type ProjectMediaProps = {
  project: Project;
  priority?: boolean;
};

const getInitials = (title: string) =>
  title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word && !/^\d+$/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const getMinScreenshotDimension = (dimensions?: string) => {
  if (!dimensions) return Number.POSITIVE_INFINITY;
  return Math.min(...dimensions.split("×").map((part) => Number(part) || 0));
};

const ProjectMedia = ({ project, priority = false }: ProjectMediaProps) => {
  const [failed, setFailed] = useState(false);
  const screenshot = getProjectScreenshot(project);
  const isLargeEnough = getMinScreenshotDimension(project.screenshotDimensions) >= 500;
  const showScreenshot = Boolean(screenshot) && isLargeEnough && !failed;

  return (
    <div className="project-media">
      {showScreenshot ? (
        <img
          src={screenshot}
          alt={`${project.title} interface`}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="project-media-plate" aria-hidden="true">
          <span className="project-media-arch" />
          <strong>{getInitials(project.title)}</strong>
          <span>{project.category}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectMedia;

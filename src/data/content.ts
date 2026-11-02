import portfolioData from "./portfolio.json";
import resumeData from "./resumeData.json";

export type Project = (typeof portfolioData.projects)[number];
export type Experience = (typeof resumeData.workExperience)[number];
export type Education = (typeof resumeData.education)[number];
export type Volunteering = (typeof resumeData.volunteering)[number];

export const projects = portfolioData.projects;
export const profile = resumeData.profile;

const getStartYear = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

export const formatPeriod = (period: string) => {
  const [start, end] = period.split("-").map((part) => part.trim());
  const startYear = getStartYear(start);
  const endYear = end ? getStartYear(end) : "";

  if (!end) return startYear;
  if (!endYear) return `${startYear} – now`;
  if (startYear === endYear) return startYear;

  return `${startYear} – ${endYear}`;
};

export const getInitials = (title: string) =>
  title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word && !/^\d+$/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export const getDiscipline = (project: Project) => {
  if (project.type === "desktop") return "Desktop";
  if (/frontend/i.test(project.role)) return "Frontend";
  if (/backend/i.test(project.role)) return "Backend";
  return "Full-stack";
};

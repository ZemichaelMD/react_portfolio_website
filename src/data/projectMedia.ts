import portfolioData from "./portfolio.json";
import sshManagerScreenshot from "../assets/project_screenshots/github_ssh_profile_manager.png";
import orthodoxBibleScreenshot from "../assets/project_screenshots/orthodox_bible_81.png";
import meneshaScreenshot from "../assets/project_screenshots/menesha.jpg";
import voxabotScreenshot from "../assets/project_screenshots/voxabot-logo.png";

type Project = (typeof portfolioData.projects)[number];

const screenshotAssetMap: Record<string, string> = {
  "assets/project_screenshots/github_ssh_profile_manager.png": sshManagerScreenshot,
  "assets/project_screenshots/orthodox_bible_81.png": orthodoxBibleScreenshot,
  "assets/project_screenshots/menesha.jpg": meneshaScreenshot,
  "assets/project_screenshots/voxabot-logo.png": voxabotScreenshot,
};

export const getProjectScreenshot = (project: Project) =>
  project.screenshot ? screenshotAssetMap[project.screenshot] : undefined;

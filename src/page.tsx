import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import portrait from "./assets/zemichael_full.jpeg";
import resumeData from "./data/resumeData.json";
import portfolioData from "./data/portfolio.json";
import PageShell from "./components/PageShell";
import ProjectCard from "./components/ProjectCard";
import ProjectDialog from "./components/ProjectDialog";
import ExperienceDialog from "./components/ExperienceDialog";
import { BrandMark } from "./components/BrandMark";
import { ArrowDown, ArrowUpRight, LoopMark } from "./components/Icons";
import { formatPeriod } from "./data/content";
import type { Experience, Project } from "./data/content";
import { blogService } from "./services/blog";
import type { BlogPost } from "./services/blog/types";
import { useScrollReveal } from "./utils/useScrollReveal";

const projects = portfolioData.projects as Project[];
const workExperience = resumeData.workExperience as Experience[];

const featuredProject =
  projects.find((project) => project.id === "11") ?? projects[0];
const pairedProjects = ["10", "9"]
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));
const alsoBuilt = projects.filter(
  (project) =>
    project.id !== featuredProject.id &&
    !pairedProjects.some((paired) => paired.id === project.id),
);

const toolGroups = [
  {
    label: "Engineering",
    items: resumeData.skills.engineering.slice(0, 12),
  },
  {
    label: "AI & automation",
    items: [
      "AI coding agents",
      "LLM APIs",
      "Prompt systems",
      "RAG",
      "Automated review",
      "Workflow automation",
    ],
  },
  {
    label: "Platform & cloud",
    items: resumeData.skills.platforms,
  },
  {
    label: "Design & spatial",
    items: resumeData.skills.designArchitecture.slice(0, 8),
  },
];

const highlights = resumeData.experienceHighlights;

const principles = [
  {
    title: "Read the plan",
    body: "Find the load-bearing decision before writing the first component.",
  },
  {
    title: "Respect the section",
    body: "What holds the surface up matters more than the surface.",
  },
  {
    title: "Detail the junction",
    body: "The seam between systems is where a product fails or feels inevitable.",
  },
];

const formatPostDate = (post: BlogPost) =>
  new Date(post.publishedAt ?? post.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPost[] | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  useScrollReveal();

  useEffect(() => {
    let active = true;

    blogService
      .getAll()
      .then((posts) => {
        if (!active) return;
        setRecentPosts(
          posts.filter((post) => post.status === "published").slice(0, 2),
        );
      })
      .catch(() => {
        if (active) setRecentPosts([]);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleRoles = useMemo(
    () => (showAllRoles ? workExperience : workExperience.slice(0, 4)),
    [showAllRoles],
  );

  return (
    <PageShell>
      {/* ── DRAWING SHEET 00: PROFILE ─────────────────────────── */}
      <section className="sheet-hero" aria-labelledby="hero-title">
        <div className="container sheet-hero-inner">
          <div className="sheet-meta" aria-hidden="true">
            <span>Portfolio / 2026</span>
            <span>Sheet 00 / Profile</span>
          </div>

          <div className="sheet-hero-grid">
            <div className="sheet-hero-copy">
              <p className="status-line sheet-load sheet-load-1">
                <span className="status-dot" aria-hidden="true" />
                Open to AI architecture and platform work
              </p>

              <h1
                id="hero-title"
                className="sheet-hero-title sheet-load sheet-load-2"
              >
                <span>AI-driven architect.</span>
                <span>Production engineer.</span>
              </h1>

              <p className="sheet-hero-lede sheet-load sheet-load-3">
                I&rsquo;m Zemichael Mehretu Dagnew, a software architect in Addis
                Ababa. I design the system, direct AI through the build, and stay
                accountable for what ships. Five years of production work across
                React, Node.js, Laravel, and cloud.
              </p>

              <div className="sheet-hero-actions sheet-load sheet-load-4">
                <a className="button" href="#ai">
                  How I use AI
                  <ArrowDown size={15} />
                </a>
                <a className="text-link" href="#work">
                  See selected work
                </a>
              </div>
            </div>

            <figure className="sheet-portrait sheet-load sheet-load-3">
              <span className="sheet-portrait-label" aria-hidden="true">
                Plate 01 / Portrait
              </span>
              <div className="sheet-portrait-frame">
                <img
                  src={portrait}
                  alt="Portrait of Zemichael Mehretu Dagnew"
                  width={800}
                  height={1000}
                  fetchPriority="high"
                />
                <span className="sheet-tick sheet-tick-tl" aria-hidden="true" />
                <span className="sheet-tick sheet-tick-tr" aria-hidden="true" />
                <span className="sheet-tick sheet-tick-bl" aria-hidden="true" />
                <span className="sheet-tick sheet-tick-br" aria-hidden="true" />
              </div>
              <figcaption className="sheet-portrait-caption">
                <span>Zemichael Mehretu Dagnew</span>
                <span>AI software architect</span>
              </figcaption>
            </figure>
          </div>

          <dl className="sheet-specs sheet-load sheet-load-4">
            <div>
              <dt>Practice</dt>
              <dd>AI-assisted software architecture</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Full-stack systems and delivery</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>Open to select AI work</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── DRAWING SHEET 01: SELECTED WORK ───────────────────── */}
      <section className="sheet-work container" id="work" aria-labelledby="work-title">
        <header className="sheet-head reveal reveal-d1">
          <p className="sheet-kicker">
            <span>Sheet 01</span>
            <span>Selected work</span>
          </p>
          <div className="sheet-head-row">
            <h2 id="work-title">Architecture first. AI through the build.</h2>
            <Link className="text-link sheet-head-link" to="/projects">
              All {projects.length} projects
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="sheet-sub">
            A scripture reader, a desktop utility, and a learning platform.
            Different problems, one method: set the structure, direct the build,
            and verify what ships.
          </p>
        </header>

        <div className="sheet-feature reveal reveal-d2">
          <div className="sheet-rail" aria-hidden="true">
            <span className="sheet-rail-num">01</span>
            <span className="sheet-rail-label">Featured / Product</span>
            <span className="sheet-rail-rule" />
            <span className="sheet-rail-meta">{featuredProject.category}</span>
          </div>
          <ProjectCard
            project={featuredProject}
            layout="feature"
            onOpen={setSelectedProject}
          />
        </div>

        <div className="sheet-pair">
          {pairedProjects.map((project, i) => (
            <div
              key={project.id}
              className={`sheet-pair-item reveal reveal-d${i + 2}`}
            >
              <div className="sheet-pair-label">
                <span className="sheet-pair-num">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <span>{project.category}</span>
              </div>
              <ProjectCard
                project={project}
                layout="pair"
                onOpen={setSelectedProject}
              />
            </div>
          ))}
        </div>

        <div className="sheet-appendix reveal reveal-d3">
          <div className="sheet-appendix-head">
            <div>
              <p className="sheet-kicker">
                <span>Appendix</span>
                <span>Also built</span>
              </p>
              <h3>Client platforms and side experiments.</h3>
            </div>
            <p>
              Most live inside real operations rather than a public demo. Open a
              row for the notes.
            </p>
          </div>

          <div className="sheet-rows">
            {alsoBuilt.map((project, i) => (
              <button
                key={project.id}
                type="button"
                className="sheet-row"
                onClick={() => setSelectedProject(project)}
              >
                <span className="sheet-row-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="sheet-row-name">
                  <strong>{project.title}</strong>
                  <small>{project.with}</small>
                </span>
                <span className="sheet-row-stack">
                  {project.technologies.slice(0, 3).join(" / ")}
                </span>
                <span className="sheet-row-tag">
                  {project.NDA ? "NDA" : "Public"}
                </span>
                <ArrowUpRight className="sheet-row-arrow" size={15} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRAWING SHEET 02: AI PRACTICE (DARK BAND) ─────────── */}
      <section className="sheet-ai" id="ai" aria-labelledby="ai-title">
        <div className="container">
          <header className="sheet-head sheet-head-band reveal reveal-d1">
            <p className="sheet-kicker">
              <span>Sheet 02</span>
              <span>AI practice</span>
            </p>
            <div className="sheet-head-row">
              <h2 id="ai-title">The model is not the architecture.</h2>
              <Link
                className="text-link text-link--band sheet-head-link"
                to="/contact"
              >
                Start a build
                <ArrowUpRight size={14} />
              </Link>
            </div>
            <p className="sheet-sub sheet-sub-band">
              I use AI to compress the distance between a decision and a working
              system. The boundaries, the review, and the production
              accountability stay with me.
            </p>
          </header>

          <div className="ai-grid">
            <div className="ai-thesis reveal reveal-d2">
              <p className="ai-lede">
                AI changes the speed of software, not the responsibility for it.
              </p>
              <p className="ai-body">
                I direct coding agents and LLM APIs through the repetitive part
                of the build, then read the diff, test the edges, and own the
                deploy. The result is a shorter loop from brief to production
                without handing judgment to the model.
              </p>

              <div className="ai-ledger">
                <div>
                  <h3>AI accelerates</h3>
                  <ul>
                    <li>Scaffolding and boilerplate</li>
                    <li>Refactors and migrations</li>
                    <li>Test and fixture generation</li>
                    <li>API wiring and documentation</li>
                    <li>Design exploration</li>
                  </ul>
                </div>
                <div>
                  <h3>I keep</h3>
                  <ul>
                    <li>System boundaries</li>
                    <li>Data and auth models</li>
                    <li>Interface judgment</li>
                    <li>Security and failure paths</li>
                    <li>Production accountability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="ai-flow reveal reveal-d3">
              <div className="ai-flow-head">
                <span className="ai-flow-title">
                  <LoopMark className="ai-flow-loop" size={14} />
                  Delivery loop
                </span>
                <span>01 / 05</span>
              </div>
              <ol>
                <li>
                  <span className="ai-step-num">01</span>
                  <div>
                    <strong>Frame</strong>
                    <p>
                      Define the problem, the constraints, and the decision that
                      must be made.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="ai-step-num">02</span>
                  <div>
                    <strong>Architect</strong>
                    <p>
                      Set boundaries, data models, interfaces, and the failure
                      path.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="ai-step-num">03</span>
                  <div>
                    <strong>Generate</strong>
                    <p>
                      Direct agents through scaffolds, refactors, tests, and
                      documentation.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="ai-step-num">04</span>
                  <div>
                    <strong>Review</strong>
                    <p>
                      Read the diff, test the edge, and challenge the generated
                      assumption.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="ai-step-num">05</span>
                  <div>
                    <strong>Ship</strong>
                    <p>
                      Own the deploy, the observability, and the handoff.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="ai-workbench reveal reveal-d2">
            <div className="ai-workbench-head">
              <p className="ai-workbench-label">The workbench</p>
              <p className="ai-workbench-note">
                Claude Code and opencode get most of the long work. Codex, Pi,
                and Hermes Agent cover the rest. I rotate tools often; the
                review bar does not move.
              </p>
            </div>

            <div className="ai-workbench-grid">
              <div className="ai-workbench-col">
                <h3>Agents I drive</h3>
                <ul className="ai-brand-list">
                  <li>
                    <BrandMark name="claudecode" />
                    Claude Code
                  </li>
                  <li>
                    <BrandMark name="opencode" />
                    opencode
                  </li>
                  <li>
                    <BrandMark name="openai" />
                    Codex
                  </li>
                  <li>
                    <BrandMark name="pi" />
                    Pi
                  </li>
                  <li>
                    <BrandMark name="hermes" />
                    Hermes Agent
                  </li>
                  <li>
                    <BrandMark name="cursor" />
                    Cursor
                  </li>
                  <li>
                    <BrandMark name="githubcopilot" />
                    GitHub Copilot
                  </li>
                  <li>
                    <BrandMark name="cline" />
                    Cline
                  </li>
                  <li>
                    <BrandMark name="windsurf" />
                    Windsurf
                  </li>
                </ul>
                <p className="ai-workbench-more">
                  Also Aider, Goose, and whatever ships next. New tools get a
                  trial, not a testimonial.
                </p>
              </div>

              <div className="ai-workbench-col">
                <h3>Models I route</h3>
                <div className="ai-model-group">
                  <span className="ai-model-type">Closed</span>
                  <ul className="ai-brand-list ai-brand-list--models">
                    <li>
                      <BrandMark name="claude" />
                      Claude
                    </li>
                    <li>
                      <BrandMark name="openai" />
                      GPT
                    </li>
                    <li>
                      <BrandMark name="googlegemini" />
                      Gemini
                    </li>
                  </ul>
                </div>
                <div className="ai-model-group">
                  <span className="ai-model-type">Open weights</span>
                  <ul className="ai-brand-list ai-brand-list--models">
                    <li>
                      <BrandMark name="qwen" />
                      Qwen
                    </li>
                    <li>
                      <BrandMark name="deepseek" />
                      DeepSeek
                    </li>
                    <li>
                      <BrandMark name="meta" />
                      Llama
                    </li>
                    <li>
                      <BrandMark name="mistralai" />
                      Mistral
                    </li>
                  </ul>
                </div>
                <p className="ai-workbench-more">
                  Closed models for hard reasoning and a second opinion.
                  Open-weight models for private, local, or cost-sensitive work.
                  Both meet the same review bar.
                </p>
              </div>
            </div>
          </div>

          <div className="ai-tools reveal reveal-d2">
            <span className="ai-tools-label">Also in the stack</span>
            <ul>
              <li>LLM APIs</li>
              <li>Prompt systems</li>
              <li>RAG</li>
              <li>Automated review</li>
              <li>Workflow automation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── DRAWING SHEET 03: PRACTICE ────────────────────────── */}
      <section
        className="sheet-practice"
        id="about"
        aria-labelledby="practice-title"
      >
        <div className="container">
          <header className="sheet-head reveal reveal-d1">
            <p className="sheet-kicker">
              <span>Sheet 03</span>
              <span>Practice</span>
            </p>
            <div className="sheet-head-row">
              <h2 id="practice-title">From drawings to deployments.</h2>
            </div>
          </header>

          <div className="sheet-practice-grid">
            <div className="sheet-practice-lead reveal reveal-d2">
              <p className="about-intro">
                I studied architecture before I wrote software. The tools
                changed. The thinking stayed the same.
              </p>

              <div className="about-now">
                <p>
                  <span>Now</span>
                  Software engineer at AddWeb, setting system boundaries and
                  directing AI-assisted delivery across distributed teams.
                </p>
                <p>
                  <span>Studying</span>
                  MSc in Information Science and Systems at Addis Ababa
                  University, in progress.
                </p>
                <p>
                  <span>Community</span>
                  World Vision Ethiopia, Children Heart Fund, and Tukuls to
                  Dachas.
                </p>
              </div>

              <div className="sheet-principles">
                <h3>How I work</h3>
                <ol>
                  {principles.map((principle, i) => (
                    <li key={principle.title}>
                      <span className="sheet-principle-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <strong>{principle.title}</strong>
                        <p>{principle.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="sheet-practice-story">
              <div className="about-story reveal reveal-d1">
                <p>
                  I&rsquo;m a software architect with five years of production
                  experience across Laravel, React, Node.js, and cloud-integrated
                  systems. I like the part of the work where product decisions,
                  architecture, and interface details have to agree.
                </p>
                <p>
                  Before software, I spent years designing buildings, interiors,
                  and visual systems, then taught architecture students in Bahir
                  Dar. That training still shapes how I build: start with the
                  structure, respect the constraints, and make the finished thing
                  feel inevitable.
                </p>
                <p>
                  Today I run an AI-first delivery loop: frame the problem, set
                  the architecture, direct agents through the build, and review
                  the result like production code. The tools changed again. The
                  thinking is still structural.
                </p>

                <blockquote className="about-quote">
                  Architecture taught me what carries the load. Software taught
                  me to test it.
                </blockquote>
              </div>

              <div className="cv-block reveal reveal-d2">
                <div className="cv-head">
                  <h3>Experience</h3>
                  <span>Selected roles</span>
                </div>

                <div className="cv-list">
                  {visibleRoles.map((role) => (
                    <button
                      key={`${role.company}-${role.period}`}
                      type="button"
                      className="cv-row"
                      onClick={() => setSelectedExperience(role)}
                    >
                      <span className="cv-period">
                        {formatPeriod(role.period)}
                      </span>
                      <span className="cv-role">
                        <strong>{role.title}</strong>
                        <span>
                          {role.company} / {role.location}
                        </span>
                      </span>
                      <ArrowUpRight className="cv-arrow" size={15} />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="text-link text-link--band cv-toggle"
                  onClick={() => setShowAllRoles((current) => !current)}
                  aria-expanded={showAllRoles}
                >
                  {showAllRoles
                    ? "Show fewer roles"
                    : `Show all ${workExperience.length} roles`}
                </button>
              </div>

              <div className="edu-block reveal reveal-d3">
                <div className="cv-head">
                  <h3>Education</h3>
                </div>
                <ul className="edu-list">
                  {resumeData.education.map((item) => (
                    <li key={item.institution} className="edu-row">
                      <span className="edu-period">
                        {formatPeriod(item.period)}
                      </span>
                      <div className="edu-detail">
                        <h4>{item.degree}</h4>
                        <p>
                          {item.institution}
                          <span
                            className={
                              item.status === "In Progress"
                                ? "edu-status is-current"
                                : "edu-status"
                            }
                          >
                            {item.status}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="toolkit-block reveal reveal-d2">
            <h3>Toolkit</h3>
            <dl className="toolkit-list">
              {toolGroups.map((group) => (
                <div className="toolkit-row" key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>
                    <div className="skill-chips-row">
                      {group.items.map((item) => (
                        <span key={item} className="skill-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── DRAWING SHEET 03: WRITING ─────────────────────────── */}
      <section
        className="writing-section sheet-writing"
        id="writing"
        aria-labelledby="writing-title"
      >
        <div className="container">
          <div className="writing-grid">
            <div className="writing-lead reveal reveal-left reveal-d1">
              <p className="sheet-kicker">
                <span>Sheet 04</span>
                <span>Writing</span>
              </p>
              <h2 id="writing-title">Notes from the build.</h2>
              <p>
                Occasional writing on AI-assisted architecture, engineering
                decisions, and building software with AI in the loop.
              </p>
              <Link className="text-link" to="/blog">
                Read the blog
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="writing-list reveal reveal-d2">
              {recentPosts === null ? (
                <p className="writing-loading">Loading recent notes...</p>
              ) : recentPosts.length ? (
                recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    className="writing-item"
                    to={`/blog/${post.slug}`}
                  >
                    <time dateTime={post.publishedAt ?? post.updatedAt}>
                      {formatPostDate(post)}
                    </time>
                    <span className="writing-item-title">{post.title}</span>
                    <span className="writing-item-time">
                      {post.readingMinutes} min
                    </span>
                  </Link>
                ))
              ) : (
                <div className="writing-empty">
                  <p className="writing-empty-title">
                    The first notes are being written.
                  </p>
                  <p>
                    In the meantime, the work above is the best introduction.
                  </p>
                  <Link className="text-link" to="/projects">
                    Browse the projects
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedProject ? (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}

      {selectedExperience ? (
        <ExperienceDialog
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      ) : null}
    </PageShell>
  );
};

export default HomePage;

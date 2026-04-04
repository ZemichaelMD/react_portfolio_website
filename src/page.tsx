import { useMemo, useState } from "react";
import zemichael from "./assets/zemichael.jpeg";
import sshManagerScreenshot from "./assets/project_screenshots/github_ssh_profile_manager.png";
import orthodoxBibleScreenshot from "./assets/project_screenshots/orthodox_bible_81.png";
import addisAbabaUniversity from "./assets/addis_ababa_university.jpeg";
import bahirDarUniversity from "./assets/bahir_dar_university.jpeg";
import worldVision from "./assets/world_vision.jpg";
import resumeData from "./data/resumeData.json";
import portfolioData from "./data/portfolio.json";

type Project = (typeof portfolioData.projects)[number];
type Experience = (typeof resumeData.workExperience)[number];
type Education = (typeof resumeData.education)[number];
type Volunteering = (typeof resumeData.volunteering)[number];

type TimelineFilter = "all" | "experience" | "education" | "volunteering";
type TimelineEvent =
  | {
    id: string;
    kind: "experience";
    title: string;
    organization: string;
    period: string;
    detail: string;
    experience: Experience;
    image: string;
    icon: string;
    sortTime: number;
  }
  | {
    id: string;
    kind: "education" | "volunteering";
    title: string;
    organization: string;
    period: string;
    detail: string;
    image: string;
    icon: string;
    sortTime: number;
  };

type ModalState =
  | { kind: "project"; item: Project }
  | { kind: "experience"; item: Experience }
  | null;

const projects = portfolioData.projects;
const spotlightProjects = portfolioData.projects.slice(0, 4);
const work = resumeData.workExperience.slice(0, 4);
const defaultSpotlight = portfolioData.projects.find((project) => project.title === "GitHub SSH Profile Manager") ?? spotlightProjects[0];

const screenshotMap: Record<string, string> = {
  "10": sshManagerScreenshot,
  "11": orthodoxBibleScreenshot,
};

const monthMap: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};

const parsePeriodStart = (period: string) => {
  const normalized = period.toLowerCase().trim();
  const firstChunk = normalized.split("-")[0]?.trim() ?? normalized;
  const pieces = firstChunk.split(/\s+/).filter(Boolean);

  const year = Number(pieces.find((piece) => /^\d{4}$/.test(piece)) ?? "0");
  const monthToken = pieces.find((piece) => monthMap[piece.slice(0, 3)] !== undefined);
  const month = monthToken ? monthMap[monthToken.slice(0, 3)] : 0;

  if (!year) return 0;
  return Date.UTC(year, month, 1);
};

const Page = () => {
  const [activeSpotlightId, setActiveSpotlightId] = useState(defaultSpotlight?.id ?? "");
  const [modal, setModal] = useState<ModalState>(null);
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>("all");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactFeedback, setContactFeedback] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Client Inquiry",
    message: ""
  });

  const activeSpotlight = useMemo(
    () => spotlightProjects.find((project) => project.id === activeSpotlightId) ?? spotlightProjects[0],
    [activeSpotlightId]
  );

  const timelineEvents = useMemo<TimelineEvent[]>(() => {
    const workEvents = resumeData.workExperience.map((item, index) => ({
      id: `work-${index}`,
      kind: "experience" as const,
      title: item.title,
      organization: item.company,
      period: item.period,
      detail: item.location,
      experience: item,
      image: item.company.includes("AddWeb") ? sshManagerScreenshot : zemichael,
      icon: "▣",
      sortTime: parsePeriodStart(item.period)
    }));

    const educationEvents = resumeData.education.map((item, index) => ({
      id: `edu-${index}`,
      kind: "education" as const,
      title: item.degree,
      organization: item.institution,
      period: item.period,
      detail: item.status,
      image: item.institution.includes("Addis") ? addisAbabaUniversity : bahirDarUniversity,
      icon: "◉",
      sortTime: parsePeriodStart(item.period)
    }));

    const volunteeringEvents = resumeData.volunteering.map((item, index) => ({
      id: `vol-${index}`,
      kind: "volunteering" as const,
      title: item.role,
      organization: item.organization,
      period: item.period,
      detail: item.highlights[0] ?? "",
      image: worldVision,
      icon: "✶",
      sortTime: parsePeriodStart(item.period)
    }));

    return [...workEvents, ...educationEvents, ...volunteeringEvents]
      .sort((a, b) => b.sortTime - a.sortTime);
  }, []);

  const filteredTimelineEvents = useMemo(
    () => timelineEvents.filter((event) => timelineFilter === "all" || event.kind === timelineFilter),
    [timelineFilter, timelineEvents]
  );

  const contactLinks = resumeData.profile.links.slice(0, 5);
  const currentMsc = resumeData.education.find((item) => item.degree.toLowerCase().includes("msc"));

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("sending");
    setContactFeedback("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactForm)
      });

      const responseText = await response.text();
      let payload: { error?: string } = {};

      try {
        payload = responseText ? JSON.parse(responseText) : {};
      } catch {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(payload.error ?? `Unable to send message (${response.status}).`);
      }

      setContactStatus("success");
      setContactFeedback("Thanks. Your message has been sent.");
      setContactForm({
        name: "",
        email: "",
        subject: "Client Inquiry",
        message: ""
      });
    } catch (error) {
      setContactStatus("error");
      setContactFeedback(error instanceof Error ? error.message : "Unable to send message.");
    }
  };

  return (
    <div className="poster">

      {/* NAV */}
      <header className="top-strip" aria-label="Portfolio status">
        <div className="identity-block">
          <span className="identity-mark">MD</span>
          <div>
            <p className="eyebrow">Personal Site</p>
            <p className="identity-name">Zemichael Dagnew</p>
          </div>
        </div>
        <div className="pulse-wrap" aria-hidden="true">
          <span className="pulse-dot" />
          <span className="pulse-text">Now Crafting Better Product Experiences</span>
        </div>
        <div className="signal-card">
          <img src={sshManagerScreenshot} alt="GitHub SSH Profile Manager interface" />
          <div className="signal-copy">
            <p className="eyebrow">Current Focus</p>
            <p className="signal-line">GitHub SSH Profile Manager is now in the spotlight.</p>
          </div>
        </div>
      </header>

      {/* GRID */}
      <main className="grid">

        {/* HERO */}
        <section className="cell hero">
          <img src={zemichael} alt={resumeData.profile.fullName} />
          <div className="overlay" />
          <div className="hero-text">
            <h1>{resumeData.profile.fullName}</h1>
            <p className="sub">{resumeData.profile.headline}</p>
            {currentMsc && <p className="hero-academic">{currentMsc.degree} ({currentMsc.status})</p>}
            <button type="button" className="theme-button hero-message-button" onClick={() => setIsContactModalOpen(true)}>
              Send a message
            </button>
          </div>
        </section>

        {/* ABOUT */}
        <section className="cell about">
          <h3>About</h3>
          <p>{resumeData.summary}</p>
        </section>

        {/* FEATURE PROJECT */}
        <section className="cell feature interactive-feature">
          <h3>Project Spotlight</h3>
          {activeSpotlight.screenshot && (
            <div className="spotlight-screenshot">
              <img
                src={screenshotMap[activeSpotlight.id]}
                alt={`${activeSpotlight.title} screenshot`}
                style={
                  activeSpotlight.screenshotDimensions
                    ? { aspectRatio: activeSpotlight.screenshotDimensions.replace("×", "/") }
                    : undefined
                }
              />
            </div>
          )}
          <h2>{activeSpotlight.title}</h2>
          <p className="muted">{activeSpotlight.role}</p>
          <p>{activeSpotlight.description}</p>
          <p className="meta">{activeSpotlight.responsibilities}</p>

          <div className="chip-wrap">
            {activeSpotlight.technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
          </div>

          <button
            type="button"
            className="theme-button"
            onClick={() => setModal({ kind: "project", item: activeSpotlight })}
          >
            View Full Project
          </button>

          <div className="feature-switches" aria-label="Switch project spotlight">
            {spotlightProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`feature-switch ${project.id === activeSpotlight.id ? "is-active" : ""}`}
                onClick={() => setActiveSpotlightId(project.id)}
              >
                {project.title}
              </button>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="cell timeline-card">
          <h3>Experience</h3>
          <div className="timeline-filters">
            {(["all", "experience", "education", "volunteering"] as TimelineFilter[]).map((kind) => (
              <button
                key={kind}
                type="button"
                className={`timeline-filter is-${kind} ${timelineFilter === kind ? "is-active" : ""}`}
                onClick={() => setTimelineFilter(kind)}
              >
                {kind}
              </button>
            ))}
          </div>

          <div className="timeline-scroll" role="list" aria-label="Career and education timeline">
            {filteredTimelineEvents.map((event) => (
              <article
                key={event.id}
                className={`timeline-event is-${event.kind} ${event.kind === "experience" ? "timeline-event-clickable" : ""}`}
                role="listitem"
                onClick={event.kind === "experience" ? () => setModal({ kind: "experience", item: event.experience }) : undefined}
              >
                <span className={`timeline-dot is-${event.kind}`} aria-hidden="true" />
                <div className="timeline-content">
                  <div className="timeline-headline">
                    <p className="timeline-period">{event.period}</p>
                    <div className="timeline-head">
                      <img src={event.image} alt="" className="timeline-thumb" aria-hidden="true" />
                      <span className="timeline-icon" aria-hidden="true">{event.icon}</span>
                    </div>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.organization}</p>
                  <p className="meta">{event.detail}</p>
                  {event.kind === "experience" ? (
                    <button
                      type="button"
                      className="timeline-open"
                      onClick={() => setModal({ kind: "experience", item: event.experience })}
                    >
                      Open details
                    </button>
                  ) : (
                    <p className="timeline-tag">{event.kind}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="cell projects-card">
          <h3>Projects</h3>
          <div className="projects-scroll">
            {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              className="item item-button"
              onClick={() => setModal({ kind: "project", item: p })}
            >
              <strong>{p.title}</strong>
              <span className="muted">{p.role}</span>
              <div className="project-badges">
                <span className={`project-badge ${p.NDA ? "is-nda" : "is-open"}`}>
                  {p.NDA ? "NDA Protected" : "Public"}
                </span>
                <span className={`project-badge ${p.with && p.with.toLowerCase().includes("personal") ? "is-personal" : "is-company"}`}>
                  {p.with && p.with.toLowerCase().includes("personal") ? "Personal" : "Company"}
                </span>
              </div>
              <span className="click-hint">Open details</span>
            </button>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="cell skills-card">
          <h3>Skills</h3>
          {/*
            <div className="skill-ribbon" aria-hidden="true">
              {skillVisuals.map((item) => (
                <img key={item.alt} src={item.src} alt={item.alt} className="skill-visual" />
              ))}
            </div>
          */}

          <div className="skill-columns">
            <div className="skill-group">
              <p className="timeline-period">Engineering</p>
              <div className="chip-wrap">
                {resumeData.skills.engineering.slice(0, 10).map((skill) => (
                  <span key={skill} className="tech-chip">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <p className="timeline-period">Platform</p>
              <div className="chip-wrap">
                {resumeData.skills.platforms.slice(0, 8).map((skill) => (
                  <span key={skill} className="tech-chip">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <p className="timeline-period">Design + Architecture</p>
              <div className="chip-wrap">
                {resumeData.skills.designArchitecture.slice(0, 8).map((skill) => (
                  <span key={skill} className="tech-chip">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="cell contact-card">
          <h3>Contact</h3>
          <a className="contact-primary" href={`mailto:${resumeData.profile.email}`}>
            {resumeData.profile.email}
          </a>
          <a className="contact-primary" href={`tel:${resumeData.profile.phone}`}>
            {resumeData.profile.phone}
          </a>
          <p className="meta">{resumeData.profile.location}</p>

          <div className="contact-links">
            {contactLinks.map((link) => (
              <a key={link.label} className="theme-link" href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>

          <button type="button" className="theme-button" onClick={() => setIsContactModalOpen(true)}>
            Send a message
          </button>
        </section>

      </main>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <article
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <p className="eyebrow">{modal.kind === "project" ? "Project Detail" : "Experience Detail"}</p>
              <button type="button" className="modal-close" onClick={() => setModal(null)}>
                Close
              </button>
            </div>

            {modal.kind === "project" ? (
              <div className="modal-content">
                <div className="modal-title-block">
                  <h2>{modal.item.title}</h2>
                  <p className="muted">{modal.item.role} {modal.item.with ? `• ${modal.item.with}` : ""}</p>
                </div>

                <div className="modal-copy">
                  <p>{modal.item.description}</p>
                  <p className="meta">{modal.item.responsibilities}</p>
                </div>

                <div className="modal-section">
                  <p className="modal-label">Category</p>
                  <p className="modal-value">{modal.item.category}</p>
                </div>

                <div className="chip-wrap">
                  {modal.item.technologies.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  {modal.item.url ? (
                    <a className="theme-link" href={modal.item.url} target="_blank" rel="noreferrer">
                      Visit Project
                    </a>
                  ) : (
                    <p className="meta">Live link unavailable (NDA or internal system).</p>
                  )}
                  {"repoUrl" in modal.item && modal.item.repoUrl && (
                    <a className="theme-link" href={modal.item.repoUrl} target="_blank" rel="noreferrer">
                      View Repository
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="modal-content">
                <div className="modal-title-block">
                  <h2>{modal.item.title}</h2>
                  <p className="muted">{modal.item.company}</p>
                  <p className="meta">{modal.item.period} • {modal.item.type} • {modal.item.locationMode}</p>
                </div>

                <div className="modal-section">
                  <p className="modal-label">Location</p>
                  <p className="modal-value">{modal.item.location}</p>
                </div>

                <div className="modal-list" aria-label="key achievements">
                  {modal.item.achievements.map((achievement) => (
                    <p key={achievement} className="modal-bullet">{achievement}</p>
                  ))}
                </div>

                <div className="chip-wrap">
                  {modal.item.stack.slice(0, 10).map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
                {modal.item.website && (
                  <a className="theme-link" href={modal.item.website} target="_blank" rel="noreferrer">
                    Visit Company
                  </a>
                )}
              </div>
            )}
          </article>
        </div>
      )}

      {isContactModalOpen && (
        <div className="modal-overlay" onClick={() => setIsContactModalOpen(false)}>
          <article
            className="modal-card contact-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <p className="eyebrow">Quick Client Message</p>
              <button type="button" className="modal-close" onClick={() => setIsContactModalOpen(false)}>
                Close
              </button>
            </div>

            <form className="modal-content contact-form" onSubmit={handleContactSubmit}>
              <label className="field-wrap">
                <span className="modal-label">Name</span>
                <input
                  className="field-input"
                  type="text"
                  value={contactForm.name}
                  onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
              </label>

              <label className="field-wrap">
                <span className="modal-label">Email</span>
                <input
                  className="field-input"
                  type="email"
                  value={contactForm.email}
                  onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </label>

              <label className="field-wrap">
                <span className="modal-label">Subject</span>
                <input
                  className="field-input"
                  type="text"
                  value={contactForm.subject}
                  onChange={(event) => setContactForm((prev) => ({ ...prev, subject: event.target.value }))}
                  required
                />
              </label>

              <label className="field-wrap">
                <span className="modal-label">Message</span>
                <textarea
                  className="field-input field-textarea"
                  value={contactForm.message}
                  onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))}
                  required
                />
              </label>

              <div className="modal-actions">
                <button type="submit" className="theme-button" disabled={contactStatus === "sending"}>
                  {contactStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
                {contactFeedback && (
                  <p className={`meta ${contactStatus === "error" ? "feedback-error" : "feedback-success"}`}>
                    {contactFeedback}
                  </p>
                )}
              </div>
            </form>
          </article>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <span>{resumeData.profile.location}</span>
        <span>{work[0].title} @ {work[0].company}</span>
      </footer>
    </div>
  );
};

export default Page;
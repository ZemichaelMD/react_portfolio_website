import { useState } from "react";
import PageShell from "../components/PageShell";
import resumeData from "../data/resumeData.json";
import { ArrowUpRight } from "../components/Icons";

const emptyForm = {
  name: "",
  email: "",
  subject: "Project inquiry",
  message: "",
};

const formatPhone = (phone: string) => {
  const match = phone.match(/^\+251(\d{3})(\d{3})(\d{3})$/);
  return match ? `+251 ${match[1]} ${match[2]} ${match[3]}` : phone;
};

type FormState = typeof emptyForm;
type Status = "idle" | "sending" | "success" | "error";

const fallbackError = `The message couldn't be sent just now. Please email ${resumeData.profile.email} instead.`;

const ContactPage = () => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("Sending your message…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const responseText = await response.text();
      let payload: { error?: string } = {};

      try {
        payload = responseText ? JSON.parse(responseText) : {};
      } catch {
        payload = {};
      }

      if (!response.ok) {
        const isValidationError =
          response.status === 400 || response.status === 422;

        throw new Error(
          isValidationError ? (payload.error ?? fallbackError) : fallbackError,
        );
      }

      setStatus("success");
      setFeedback("Thanks. Your message is on its way.");
      setForm(emptyForm);
    } catch (error) {
      const message =
        error instanceof Error &&
        !/failed to fetch|load failed|networkerror/i.test(error.message)
          ? error.message
          : fallbackError;

      setStatus("error");
      setFeedback(message);
    }
  };

  const socialLinks = resumeData.profile.links.filter(
    (link) => link.label !== "Website" && link.label !== "Portfolio Source",
  );

  return (
    <PageShell hideContactBand>
      <div className="page contact-page">
        <div className="container contact-layout">
          <section className="contact-intro">
            <p className="status-line">
              <span className="status-dot" aria-hidden="true" />
              Open to new opportunities and collaborations
            </p>

            <h1>Let&rsquo;s build something that holds.</h1>
            <p className="page-lede">
              I&rsquo;m open to full-stack engineering roles, product work, and
              collaborations that need both structure and finish. Tell me what
              you&rsquo;re making.
            </p>

            <div className="contact-direct">
              <p className="contact-label">Email me directly</p>
              <a
                className="contact-email"
                href={`mailto:${resumeData.profile.email}`}
              >
                {resumeData.profile.email}
                <ArrowUpRight size={19} />
              </a>
            </div>

            <dl className="contact-facts">
              <div>
                <dt>Based in</dt>
                <dd>{resumeData.profile.location}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${resumeData.profile.phone}`}>
                    {formatPhone(resumeData.profile.phone)}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{resumeData.profile.languages.join(", ")}</dd>
              </div>
              <div>
                <dt>Response time</dt>
                <dd>Usually within 24 hours</dd>
              </div>
            </dl>

            <div className="contact-elsewhere">
              <p className="contact-label">Elsewhere</p>
              <div className="contact-socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="contact-form-panel" aria-labelledby="contact-form-title">
            <p className="page-meta">Start a conversation</p>
            <h2 id="contact-form-title">Send a message</h2>
            <p className="contact-form-intro">
              A short note is enough. Include the problem, the timeline, and
              what success looks like.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    className="form-input"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  className="form-input"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={(event) =>
                    updateField("subject", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="form-input form-textarea"
                  name="message"
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="button"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                {feedback ? (
                  <p
                    className={`form-status ${
                      status === "error"
                        ? "form-status--error"
                        : status === "success"
                          ? "form-status--success"
                          : "form-status--pending"
                    }`}
                    role={status === "error" ? "alert" : "status"}
                    aria-live="polite"
                  >
                    {feedback}
                  </p>
                ) : null}
              </div>
            </form>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default ContactPage;

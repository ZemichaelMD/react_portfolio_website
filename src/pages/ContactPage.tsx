import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import resumeData from "../data/resumeData.json";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Client Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("Sending your message...");

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
        throw new Error(payload.error ?? `Unable to send message (${response.status}).`);
      }

      setStatus("success");
      setFeedback("Thanks. Your message has been sent.");
      setForm({ name: "", email: "", subject: "Client Inquiry", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send message.");
    }
  };

  return (
    <PageShell>
      <section className="cell contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-text">
          <p className="eyebrow">Contact</p>
          <h1>Get in Touch</h1>
          <p className="sub">Have a project in mind or want to collaborate? Reach out through any of the channels below.</p>
        </div>
      </section>

      <section className="cell contact-info">
        <h3>Direct Contact</h3>
        <a className="contact-primary" href={`mailto:${resumeData.profile.email}`}>
          {resumeData.profile.email}
        </a>
        <a className="contact-primary" href={`tel:${resumeData.profile.phone}`}>
          {resumeData.profile.phone}
        </a>
        <p className="meta">{resumeData.profile.location}</p>
      </section>

      <section className="cell contact-links-cell">
        <h3>Connect</h3>
        <div className="contact-links-grid">
          {resumeData.profile.links.map((link) => (
            <a key={link.label} className="contact-link-card" href={link.url} target="_blank" rel="noreferrer">
              <span className="link-label">{link.label}</span>
              <span className="link-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="cell contact-form-cell">
        <h3>Send a Message</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="field-wrap">
            <span className="modal-label">Name</span>
            <input
              type="text"
              className="field-input"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </label>

          <label className="field-wrap">
            <span className="modal-label">Email</span>
            <input
              type="email"
              className="field-input"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </label>

          <label className="field-wrap">
            <span className="modal-label">Subject</span>
            <input
              type="text"
              className="field-input"
              value={form.subject}
              onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
              required
            />
          </label>

          <label className="field-wrap">
            <span className="modal-label">Message</span>
            <textarea
              className="field-input field-textarea"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              required
            />
          </label>

          <button type="submit" className="theme-button" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {feedback && (
            <p className={`meta ${status === "error" ? "feedback-error" : "feedback-success"}`}>
              {feedback}
            </p>
          )}
        </form>
      </section>

      <section className="cell contact-cta">
        <h3>Prefer email?</h3>
        <a className="contact-primary" href={`mailto:${resumeData.profile.email}`}>
          {resumeData.profile.email}
        </a>
        <p className="muted">I typically respond within 24 hours.</p>
      </section>
    </PageShell>
  );
};

export default ContactPage;

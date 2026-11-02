import resumeData from "../data/resumeData.json";
import { ArrowUpRight } from "./Icons";

type SiteFooterProps = {
  compact?: boolean;
};

const SiteFooter = ({ compact = false }: SiteFooterProps) => {
  const socialLinks = resumeData.profile.links.filter(
    (link) => link.label !== "Website",
  );

  return (
    <footer className={`site-footer${compact ? " site-footer--compact" : ""}`}>
      {!compact ? (
        <div className="footer-contact">
          <div className="container footer-contact-grid">
            <div className="footer-invite">
              <span className="footer-status-chip">
                Available for AI architecture work
              </span>
              <h2>Let&rsquo;s architect what ships next.</h2>
            </div>

            <div className="footer-links">
              <a
                className="footer-email"
                href={`mailto:${resumeData.profile.email}`}
                aria-label="Send email to Zemichael"
              >
                {resumeData.profile.email}
                <ArrowUpRight size={20} />
              </a>
              <p className="footer-meta">
                Open to full-time, contract, and AI architecture collaborations.
                Remote-friendly.
              </p>
              <div className="footer-socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label === "Portfolio Source" ? "Site source" : link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>
            &copy; {new Date().getFullYear()} Zemichael Mehretu Dagnew
          </span>
          <a href="#top">Back to top &uarr;</a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

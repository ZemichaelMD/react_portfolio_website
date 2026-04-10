import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

const NotFoundPage = () => {
  return (
    <PageShell>
      <section className="cell not-found-hero">
        <div className="not-found-overlay" />
        <div className="not-found-text">
          <p className="not-found-code">404</p>
          <h1>Page Not Found</h1>
          <p className="muted">The page you are looking for does not exist, has been moved, or is temporarily unavailable.</p>
        </div>
      </section>

      <section className="cell not-found-links">
        <h3>Where to next?</h3>
        <div className="not-found-grid">
          <Link to="/" className="not-found-card">
            <span className="not-found-card-title">Home</span>
            <span className="not-found-card-desc">Back to the main page</span>
          </Link>
          <Link to="/projects" className="not-found-card">
            <span className="not-found-card-title">Projects</span>
            <span className="not-found-card-desc">Browse my work</span>
          </Link>
          <Link to="/blog" className="not-found-card">
            <span className="not-found-card-title">Blog</span>
            <span className="not-found-card-desc">Read my writing</span>
          </Link>
          <Link to="/contact" className="not-found-card">
            <span className="not-found-card-title">Contact</span>
            <span className="not-found-card-desc">Get in touch</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
};

export default NotFoundPage;

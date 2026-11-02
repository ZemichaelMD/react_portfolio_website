import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { ArrowUpRight } from "../components/Icons";

const NotFoundPage = () => {
  return (
    <PageShell hideContactBand>
      <div className="notfound container">
        <div className="notfound-arch" aria-hidden="true">
          <span>404</span>
        </div>

        <div className="notfound-copy">
          <p className="page-meta">Wrong turn</p>
          <h1>This page wasn&rsquo;t built.</h1>
          <p className="page-lede">
            The link may be old, or the page may have moved. The work, the
            writing, and a way to get in touch are all still here.
          </p>

          <div className="notfound-links">
            <Link className="button button--small" to="/">
              Back home
            </Link>
            <Link className="text-link" to="/projects">
              See the work
              <ArrowUpRight size={14} />
            </Link>
            <Link className="text-link" to="/blog">
              Read the writing
              <ArrowUpRight size={14} />
            </Link>
            <Link className="text-link" to="/contact">
              Get in touch
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

type SiteHeaderProps = {
  variant?: "home" | "page";
};

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const SiteHeader = ({ variant = "page" }: SiteHeaderProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header" aria-label="Main navigation">
      <div className="site-header-inner">
        <div className="site-header-brand">
          <Link
            to="/"
            className="identity-mark-link"
            onClick={() => setMobileOpen(false)}
          >
            <span className="identity-mark">Z</span>
          </Link>
          <div className="site-header-brand-text">
            <p className="eyebrow">Personal Site</p>
            <p className="identity-name">Zemichael Dagnew</p>
          </div>
        </div>

        <nav className={`site-header-nav ${mobileOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${location.pathname === item.to ? "is-active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <div className="site-header-context">
            <p className="signal-line">
              {getContextText(location.pathname, variant)}
            </p>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
          >
            <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "dark" ? "Sun" : "Moon"}
            </span>
          </button>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`hamburger-line ${mobileOpen ? "is-open" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "is-open" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "is-open" : ""}`} />
        </button>
      </div>
    </header>
  );
};

const getContextText = (pathname: string, variant: string): string => {
  if (variant === "home")
    return "Open to new opportunities and collaborations.";
  if (pathname.startsWith("/studio/posts/")) return "Editing in the studio";
  if (pathname.startsWith("/studio/login")) return "Private studio access";
  if (pathname.startsWith("/studio")) return "Managing blog posts";
  if (pathname.startsWith("/blog/")) return "Reading a blog post";
  if (pathname.startsWith("/blog")) return "Exploring the blog";
  if (pathname.startsWith("/projects")) return "Browsing projects";
  if (pathname.startsWith("/contact")) return "Get in touch";
  return "Navigating the site";
};

export default SiteHeader;

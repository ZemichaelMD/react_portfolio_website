import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { ArchMark, Close, Menu, Moon, Sun } from "./Icons";
import resumeData from "../data/resumeData.json";

const navItems = [
  { label: "Work", to: "/projects" },
  { label: "About", to: "/#about" },
  { label: "Writing", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const isNavActive = (pathname: string, hash: string, to: string) => {
  if (to.startsWith("/#")) {
    return pathname === "/" && hash === to.slice(1);
  }
  return pathname === to || pathname.startsWith(`${to}/`);
};

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>("a[href], button"),
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Zemichael Mehretu Dagnew, home">
          <ArchMark className="brand-mark" size={24} />
          <span className="brand-text">
            <span className="brand-name">Zemichael Mehretu</span>
            <span className="brand-role">AI software architect</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isNavActive(
              location.pathname,
              location.hash,
              item.to,
            );

            return (
              <Link
                key={item.to}
                to={item.to}
                className={active ? "is-active" : undefined}
                aria-current={
                  active
                    ? item.to.startsWith("/#")
                      ? "location"
                      : "page"
                    : undefined
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            ref={toggleRef}
          >
            {mobileOpen ? <Close size={17} /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-nav" id="mobile-navigation" ref={menuRef}>
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            {navItems.map((item, index) => {
              const active = isNavActive(
                location.pathname,
                location.hash,
                item.to,
              );

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={active ? "is-active" : undefined}
                  aria-current={
                    active
                      ? item.to.startsWith("/#")
                        ? "location"
                        : "page"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mobile-nav-foot">
            <p>Open to AI architecture and platform work.</p>
            <a href={`mailto:${resumeData.profile.email}`}>
              {resumeData.profile.email}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default SiteHeader;

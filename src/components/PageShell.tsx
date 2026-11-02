import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type PageShellProps = {
  children: React.ReactNode;
  hideContactBand?: boolean;
};

const PageShell = ({ children, hideContactBand = false }: PageShellProps) => {
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main className="site-main" id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter compact={hideContactBand} />
    </div>
  );
};

export default PageShell;

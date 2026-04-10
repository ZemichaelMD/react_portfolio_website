import SiteHeader from "../components/SiteHeader";
import resumeData from "../data/resumeData.json";

type PageShellProps = {
  children: React.ReactNode;
};

const PageShell = ({ children }: PageShellProps) => {
  return (
    <div className="poster">
      <SiteHeader variant="page" />
      <main className="grid">{children}</main>
      <footer className="footer">
        <span>{resumeData.profile.location}</span>
        <span>&copy; {new Date().getFullYear()} Zemichael Dagnew</span>
      </footer>
    </div>
  );
};

export default PageShell;

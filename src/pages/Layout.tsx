import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import resumeData from "../data/resumeData.json";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="ds-shell">
      <SiteHeader variant="page" />
      <main className="ds-grid">{children}</main>
      <footer className="ds-footer">
        <span>{resumeData.profile.location}</span>
        <span>&copy; {new Date().getFullYear()} Zemichael Dagnew</span>
      </footer>
    </div>
  );
};

export default Layout;

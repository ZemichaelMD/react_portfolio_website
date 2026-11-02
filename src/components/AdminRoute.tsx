import { Navigate, useLocation } from "react-router-dom";

import PageShell from "./PageShell";
import { authClient } from "../lib/auth";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const location = useLocation();
  const session = authClient.useSession();

  if (session.isPending) {
    return (
      <PageShell hideContactBand>
        <div className="page">
          <div className="container">
            <div className="state-panel" aria-live="polite" aria-busy="true">
              <p className="page-meta">Private studio</p>
              <p className="state-title">Checking your session…</p>
              <p className="state-copy">
                Verifying your Neon Auth session. This should only take a
                moment.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  if (!session.data?.user) {
    return <Navigate to="/studio/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;

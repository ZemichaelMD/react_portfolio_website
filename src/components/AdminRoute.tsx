import { Navigate, useLocation } from "react-router-dom";

import { authClient } from "../lib/auth";

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const location = useLocation();
  const session = authClient.useSession();

  if (session.isPending) {
    return (
      <div className="poster">
        <main className="grid">
          <section className="cell admin-auth-shell">
            <p className="eyebrow">Studio</p>
            <h1>Checking session</h1>
            <p className="muted">Verifying your Neon Auth session.</p>
          </section>
        </main>
      </div>
    );
  }

  if (!session.data?.user) {
    return <Navigate to="/studio/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;

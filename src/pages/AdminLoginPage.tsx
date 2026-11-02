import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import PageShell from "../components/PageShell";
import { authClient } from "../lib/auth";

type AuthMode = "sign-in" | "sign-up";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const targetPath =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from?: string }).from !== "/studio/login"
      ? (location.state as { from?: string }).from
      : "/studio";

  if (session.data?.user) {
    return <Navigate to={targetPath} replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (mode === "sign-up") {
        const result = await authClient.signUp.email({
          email: form.email,
          password: form.password,
          name: form.name || form.email.split("@")[0],
        });

        if (result.error) {
          throw new Error(result.error.message ?? "Unable to create the account.");
        }
      } else {
        const result = await authClient.signIn.email({
          email: form.email,
          password: form.password,
        });

        if (result.error) {
          throw new Error(result.error.message ?? "Unable to sign in.");
        }
      }

      navigate(targetPath, { replace: true });
    } catch (authError) {
      setError(
        authError instanceof Error ? authError.message : "Authentication failed.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell hideContactBand>
      <div className="page">
        <header className="page-head container">
          <p className="page-meta">Private studio</p>
          <h1>Blog admin access</h1>
          <p className="page-lede">
            This route is intentionally not linked in the public navigation. Use
            your Neon Auth credentials to manage posts.
          </p>
        </header>

        <div className="container admin-auth-wrap">
          <div className="panel">
            <div className="filter-row" role="group" aria-label="Authentication mode">
              <button
                type="button"
                className={`filter${mode === "sign-in" ? " is-active" : ""}`}
                onClick={() => setMode("sign-in")}
                aria-pressed={mode === "sign-in"}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`filter${mode === "sign-up" ? " is-active" : ""}`}
                onClick={() => setMode("sign-up")}
                aria-pressed={mode === "sign-up"}
              >
                Create account
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              {mode === "sign-up" ? (
                <div className="form-field">
                  <label htmlFor="admin-name">Name</label>
                  <input
                    id="admin-name"
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Zemichael Dagnew"
                  />
                </div>
              ) : null}

              <div className="form-field">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  className="form-input"
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  autoComplete={
                    mode === "sign-in" ? "current-password" : "new-password"
                  }
                  required
                />
              </div>

              {error ? (
                <p className="form-status form-status--error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="editor-actions">
                <Link to="/blog" className="text-link">
                  Back to blog
                </Link>
                <button type="submit" className="button" disabled={submitting}>
                  {submitting
                    ? "Working…"
                    : mode === "sign-up"
                      ? "Create admin account"
                      : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminLoginPage;

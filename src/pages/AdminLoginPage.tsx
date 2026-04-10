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
    (location.state as { from?: string } | null)?.from && (location.state as { from?: string }).from !== "/studio/login"
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
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="cell admin-auth-shell">
        <p className="eyebrow">Hidden Studio</p>
        <h1>Blog admin access</h1>
        <p className="sub">
          This route is intentionally not linked in the public navigation. Use your Neon Auth credentials to manage posts.
        </p>
      </section>

      <section className="cell admin-auth-panel">
        <div className="admin-auth-mode-row">
          <button
            type="button"
            className={`filter-pill ${mode === "sign-in" ? "is-active" : ""}`}
            onClick={() => setMode("sign-in")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`filter-pill ${mode === "sign-up" ? "is-active" : ""}`}
            onClick={() => setMode("sign-up")}
          >
            Create account
          </button>
        </div>

        <form className="contact-form admin-auth-form" onSubmit={handleSubmit}>
          {mode === "sign-up" && (
            <label className="field-wrap">
              <span className="modal-label">Name</span>
              <input
                type="text"
                className="field-input"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Zemichael Dagnew"
              />
            </label>
          )}

          <label className="field-wrap">
            <span className="modal-label">Email</span>
            <input
              type="email"
              className="field-input"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>

          <label className="field-wrap">
            <span className="modal-label">Password</span>
            <input
              type="password"
              className="field-input"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </label>

          {error && <p className="meta feedback-error">{error}</p>}

          <div className="editor-actions">
            <Link to="/blog" className="theme-button theme-button-outline">
              Back to blog
            </Link>
            <button type="submit" className="theme-button" disabled={submitting}>
              {submitting ? "Working..." : mode === "sign-up" ? "Create admin account" : "Sign in"}
            </button>
          </div>
        </form>
      </section>
    </PageShell>
  );
};

export default AdminLoginPage;

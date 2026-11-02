import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./utils/designSystem.css";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogEditorPage from "./pages/BlogEditorPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminRoute from "./components/AdminRoute";
import { ThemeProvider } from "./components/ThemeProvider";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);

      if (target) {
        const timer = window.setTimeout(() => {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }, 30);

        return () => window.clearTimeout(timer);
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/studio/login" element={<AdminLoginPage />} />
          <Route
            path="/studio"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/studio/posts/new"
            element={
              <AdminRoute>
                <BlogEditorPage />
              </AdminRoute>
            }
          />
          <Route
            path="/studio/posts/:id/edit"
            element={
              <AdminRoute>
                <BlogEditorPage />
              </AdminRoute>
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);

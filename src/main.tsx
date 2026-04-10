import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
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

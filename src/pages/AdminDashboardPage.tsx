import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageShell from "../components/PageShell";
import { authClient } from "../lib/auth";
import { blogService } from "../services/blog";
import type { BlogPost } from "../services/blog/types";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await blogService.getAll({ admin: true });
      setPosts(result);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load posts.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;

    setBusyId(post.id);
    try {
      await blogService.delete(post.id);
      await loadPosts();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete the post.",
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    setBusyId(post.id);
    setError("");

    try {
      await blogService.update(post.id, {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml,
        contentJson: post.contentJson,
        tags: post.tags,
        coverImageUrl: post.coverImageUrl,
        coverAssetId: post.coverAssetId,
        isFeatured: post.isFeatured,
        status: post.status === "published" ? "draft" : "published",
      });

      await loadPosts();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update the post.",
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/blog");
  };

  const publishedCount = posts.filter(
    (post) => post.status === "published",
  ).length;
  const draftCount = posts.filter((post) => post.status === "draft").length;

  return (
    <PageShell hideContactBand>
      <div className="page">
        <header className="page-head container">
          <p className="page-meta">Private studio</p>
          <h1>Manage the writing.</h1>
          <p className="page-lede">
            Drafts, publishing, and post maintenance. This surface is private
            and separate from the public site.
          </p>
        </header>

        <div className="container">
          <div className="admin-topbar">
            <div className="admin-stats">
              <div>
                <strong>{posts.length}</strong>
                <span>Total posts</span>
              </div>
              <div>
                <strong>{publishedCount}</strong>
                <span>Published</span>
              </div>
              <div>
                <strong>{draftCount}</strong>
                <span>Drafts</span>
              </div>
            </div>

            <div className="admin-actions">
              <Link to="/studio/posts/new" className="button button--small">
                New post
              </Link>
              <button
                type="button"
                className="button button--small button--ghost"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>

          {loading ? (
            <div className="state-panel">
              <p className="state-title">Loading posts…</p>
            </div>
          ) : error ? (
            <div className="state-panel" role="alert">
              <p className="state-title">Something went wrong.</p>
              <p className="state-copy">{error}</p>
              <button
                type="button"
                className="text-link"
                onClick={() => void loadPosts()}
              >
                Try again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="state-panel">
              <p className="state-title">No posts yet.</p>
              <p className="state-copy">
                The studio is empty. Start with a draft and publish when it is
                ready.
              </p>
              <Link className="button button--small" to="/studio/posts/new">
                Write the first post
              </Link>
            </div>
          ) : (
            <div className="admin-list">
              {posts.map((post) => (
                <article key={post.id} className="admin-row">
                  <div className="admin-row-main">
                    <p className="page-meta">
                      {post.status} · {post.readingMinutes} min read
                    </p>
                    <h3>{post.title}</h3>
                    <p className="admin-excerpt">{post.excerpt}</p>
                    <div className="tag-row">
                      {post.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="admin-actions">
                    <Link
                      to={`/studio/posts/${post.id}/edit`}
                      className="button button--small button--ghost"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="button button--small button--ghost"
                      onClick={() => void handleTogglePublish(post)}
                      disabled={busyId === post.id}
                    >
                      {busyId === post.id
                        ? "Saving…"
                        : post.status === "published"
                          ? "Move to draft"
                          : "Publish"}
                    </button>
                    <button
                      type="button"
                      className="button button--small button--danger"
                      onClick={() => void handleDelete(post)}
                      disabled={busyId === post.id}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default AdminDashboardPage;

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
      setError(loadError instanceof Error ? loadError.message : "Unable to load posts.");
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
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete the post.");
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
      setError(updateError instanceof Error ? updateError.message : "Unable to update the post.");
    } finally {
      setBusyId(null);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/blog");
  };

  const publishedCount = posts.filter((post) => post.status === "published").length;
  const draftCount = posts.filter((post) => post.status === "draft").length;

  return (
    <PageShell>
      <section className="cell studio-hero">
        <p className="eyebrow">Studio</p>
        <h1>Manage blog posts</h1>
        <p className="sub">Private admin surface for drafts, publishing, and post maintenance.</p>
      </section>

      <section className="cell studio-stats">
        <div className="stat-block">
          <span className="stat-number">{posts.length}</span>
          <span className="stat-label">Total Posts</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{publishedCount}</span>
          <span className="stat-label">Published</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{draftCount}</span>
          <span className="stat-label">Drafts</span>
        </div>
        <div className="studio-action-row">
          <Link to="/studio/posts/new" className="theme-button">
            New Post
          </Link>
          <button type="button" className="theme-button theme-button-outline" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </section>

      <section className="cell studio-table">
        {loading ? (
          <p className="muted">Loading posts...</p>
        ) : error ? (
          <p className="meta feedback-error">{error}</p>
        ) : (
          <div className="studio-post-list">
            {posts.map((post) => (
              <article key={post.id} className="studio-post-row">
                <div className="studio-post-main">
                  <p className="eyebrow">
                    {post.status} · {post.readingMinutes} min read
                  </p>
                  <h3>{post.title}</h3>
                  <p className="muted-small">{post.excerpt}</p>
                  <div className="chip-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="studio-post-actions">
                  <Link to={`/studio/posts/${post.id}/edit`} className="theme-button theme-button-outline">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="theme-button theme-button-outline"
                    onClick={() => void handleTogglePublish(post)}
                    disabled={busyId === post.id}
                  >
                    {busyId === post.id
                      ? "Saving..."
                      : post.status === "published"
                        ? "Move to draft"
                        : "Publish"}
                  </button>
                  <button
                    type="button"
                    className="theme-button theme-button-outline danger-button"
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
      </section>
    </PageShell>
  );
};

export default AdminDashboardPage;

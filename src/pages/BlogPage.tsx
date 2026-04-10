import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { blogService } from "../services/blog";
import type { BlogPost } from "../services/blog/types";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("all");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
          setError(true);
          setLoading(false);
        }, 5000);

        const allPosts = await blogService.getAll();
        clearTimeout(timeout);
        setPosts(allPosts.filter((p) => p.status === "published"));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const filteredPosts =
    selectedTag === "all" ? posts : posts.filter((p) => p.tags.includes(selectedTag));

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <PageShell>
      <section className="cell blog-hero">
        <div className="blog-hero-overlay" />
        <div className="blog-hero-text">
          <p className="eyebrow">Blog</p>
          <h1>Writing & Thoughts</h1>
          <p className="sub">Technical articles, project retrospectives, and insights from building software.</p>
        </div>
      </section>

      <section className="cell blog-actions">
        <div className="stat-block">
          <span className="stat-number">{posts.length}</span>
          <span className="stat-label">Published Posts</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{allTags.length}</span>
          <span className="stat-label">Topics</span>
        </div>
        <div className="blog-actions-copy">
          <p className="meta">Focused notes on engineering, shipping, and product-minded frontend work.</p>
        </div>
      </section>

      {allTags.length > 0 && (
        <section className="cell blog-tags">
          <div className="filter-scroll">
            <button
              type="button"
              className={`filter-pill ${selectedTag === "all" ? "is-active" : ""}`}
              onClick={() => setSelectedTag("all")}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`filter-pill ${selectedTag === tag ? "is-active" : ""}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {loading ? (
        <section className="cell blog-loading">
          <p className="muted">Loading posts...</p>
        </section>
      ) : error || filteredPosts.length === 0 ? (
        <section className="cell blog-empty">
          <h3>No posts yet</h3>
          <p className="muted">Check back soon for technical articles and insights.</p>
        </section>
      ) : (
        <>
          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`} className="cell blog-featured">
              {featuredPost.coverImageUrl && (
                <div className="featured-cover">
                  <img src={featuredPost.coverImageUrl} alt="" />
                </div>
              )}
              <div className="featured-content">
                <p className="eyebrow">Featured</p>
                <h2>{featuredPost.title}</h2>
                <p className="muted">{featuredPost.excerpt}</p>
                <div className="chip-wrap">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="tech-chip">{tag}</span>
                  ))}
                </div>
                <p className="meta">
                  {new Date(featuredPost.publishedAt ?? featuredPost.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {" · "}
                  {featuredPost.readingMinutes} min read
                </p>
              </div>
            </Link>
          )}

          {remainingPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="cell blog-item">
              <p className="eyebrow">
                {new Date(post.publishedAt ?? post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3>{post.title}</h3>
              <p className="muted-small">{post.excerpt}</p>
              <div className="chip-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="tech-chip">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </>
      )}

      <section className="cell blog-cta">
        <h3>Want to collaborate?</h3>
        <p>I'm always open to discussing new projects, creative ideas, or opportunities.</p>
        <a href="/contact" className="theme-button">Get in Touch</a>
      </section>
    </PageShell>
  );
};

export default BlogPage;

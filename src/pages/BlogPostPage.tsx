import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { blogService } from "../services/blog";
import type { BlogPost } from "../services/blog/types";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      const found = await blogService.getBySlug(slug);
      if (found) {
        setPost(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <PageShell>
        <section className="cell blog-loading">
          <p className="muted">Loading post...</p>
        </section>
      </PageShell>
    );
  }

  if (notFound || !post) {
    return (
      <PageShell>
        <section className="cell blog-empty">
          <p className="eyebrow">404</p>
          <h3>Post Not Found</h3>
          <p className="muted">The post you are looking for does not exist or has been removed.</p>
          <Link to="/blog" className="theme-button">Back to Blog</Link>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="cell post-header">
        <p className="eyebrow">
          {new Date(post.publishedAt ?? post.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1>{post.title}</h1>
        <p className="meta">
          {post.readingMinutes} min read {post.status !== "published" ? `· ${post.status}` : ""}
        </p>
        <div className="chip-wrap">
          {post.tags.map((tag) => (
            <span key={tag} className="tech-chip">{tag}</span>
          ))}
        </div>
      </section>

      {post.coverImageUrl && (
        <section className="cell post-cover">
          <img src={post.coverImageUrl} alt="" />
        </section>
      )}

      <section className="cell post-content">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </section>

      <section className="cell post-footer">
        <Link to="/blog" className="theme-button">Back to Blog</Link>
      </section>
    </PageShell>
  );
};

export default BlogPostPage;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import { ArrowUpRight } from "../components/Icons";
import { blogService } from "../services/blog";
import type { BlogPost } from "../services/blog/types";

const formatDate = (post: BlogPost) =>
  new Date(post.publishedAt ?? post.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setNotFound(false);

      try {
        const found = await blogService.getBySlug(slug);
        if (!active) return;

        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      } catch {
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadPost();

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const previousTitle = document.title;
    document.title = `${post.title} — Zemichael Mehretu`;

    return () => {
      document.title = previousTitle;
    };
  }, [post]);

  if (loading) {
    return (
      <PageShell hideContactBand>
        <div className="article">
          <div className="article-wrap">
            <div className="state-panel" aria-live="polite" aria-busy="true">
              <p className="state-title">Loading the note…</p>
              <p className="state-copy">
                Fetching the article and its assets.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  if (notFound || !post) {
    return (
      <PageShell hideContactBand>
        <div className="article">
          <div className="article-wrap">
            <div className="state-panel">
              <p className="state-title">That note isn&rsquo;t here.</p>
              <p className="state-copy">
                It may have been moved or removed, or the link may be out of
                date.
              </p>
              <div className="state-actions">
                <Link className="button button--small" to="/blog">
                  Back to writing
                </Link>
                <Link className="text-link" to="/contact">
                  Ask me about it
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell hideContactBand>
      <article className="article">
        <div className="article-wrap">
          <Link className="back-link" to="/blog">
            <span aria-hidden="true">←</span>
            All writing
          </Link>

          <header className="article-head">
            <p className="article-meta">
              <time dateTime={post.publishedAt ?? post.updatedAt}>
                {formatDate(post)}
              </time>
              <span className="kicker-dot" aria-hidden="true" />
              {post.readingMinutes} min read
            </p>
            <h1>{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>

            {post.status !== "published" ? (
              <p className="article-notice">
                Preview: this note is currently marked as {post.status}.
              </p>
            ) : null}

            {post.tags.length ? (
              <div className="tag-row">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {post.coverImageUrl ? (
            <figure className="article-cover">
              <img src={post.coverImageUrl} alt="" loading="lazy" />
            </figure>
          ) : null}

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <footer className="article-foot">
            <div>
              <p className="article-foot-title">
                Building something related?
              </p>
              <p className="article-foot-copy">
                I&rsquo;m always glad to compare notes.
              </p>
            </div>
            <div className="article-foot-actions">
              <Link className="text-link" to="/blog">
                More writing
              </Link>
              <Link className="button button--small" to="/contact">
                Get in touch
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </PageShell>
  );
};

export default BlogPostPage;

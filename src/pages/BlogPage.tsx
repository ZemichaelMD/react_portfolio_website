import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    blogService
      .getAll()
      .then((allPosts) => {
        if (!active) return;
        setPosts(allPosts.filter((post) => post.status === "published"));
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))),
    [posts],
  );

  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags.includes(selectedTag));

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <PageShell>
      <div className="page">
        <header className="page-head container">
          {!loading && !error ? (
            <p className="page-meta">
              {posts.length} {posts.length === 1 ? "note" : "notes"} ·{" "}
              {allTags.length} topics
            </p>
          ) : null}
          <h1>Notes on making software.</h1>
          <p className="page-lede">
            Practical writing about engineering decisions, interface design,
            and building products from Addis Ababa.
          </p>
        </header>

        <div className="container">
          {loading ? (
            <div className="state-panel" aria-live="polite" aria-busy="true">
              <p className="state-title">Loading the archive…</p>
              <p className="state-copy">
                Fetching published notes. This should only take a moment.
              </p>
            </div>
          ) : error ? (
            <div className="state-panel state-panel--wide" aria-live="polite">
              <p className="state-title">The archive is quiet.</p>
              <p className="state-copy">
                The notes couldn&rsquo;t be reached just now. The work is still
                here while the writing waits.
              </p>
              <div className="state-actions">
                <Link className="button button--small" to="/projects">
                  Browse the work
                  <ArrowUpRight size={14} />
                </Link>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setReloadKey((key) => key + 1)}
                >
                  Try again
                </button>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="state-panel state-panel--wide">
              <p className="state-title">The first notes are being written.</p>
              <p className="state-copy">
                I&rsquo;m putting together practical pieces on engineering,
                product work, and building from Addis Ababa. Until then, the
                projects are the best place to start.
              </p>
              <div className="state-actions">
                <Link className="button button--small" to="/projects">
                  See the work
                  <ArrowUpRight size={14} />
                </Link>
                <Link className="text-link" to="/contact">
                  Get in touch
                </Link>
              </div>
            </div>
          ) : (
            <>
              {allTags.length > 0 ? (
                <div
                  className="filters"
                  role="group"
                  aria-label="Filter writing by topic"
                >
                  <button
                    type="button"
                    className={`filter${selectedTag === "all" ? " is-active" : ""}`}
                    onClick={() => setSelectedTag("all")}
                    aria-pressed={selectedTag === "all"}
                  >
                    All
                    <span className="filter-count">{posts.length}</span>
                  </button>
                  {allTags.map((tag) => {
                    const count = posts.filter((post) =>
                      post.tags.includes(tag),
                    ).length;
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`filter${selectedTag === tag ? " is-active" : ""}`}
                        onClick={() => setSelectedTag(tag)}
                        aria-pressed={selectedTag === tag}
                      >
                        {tag}
                        <span className="filter-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <p className="visually-hidden" aria-live="polite">
                {filteredPosts.length} notes shown.
              </p>

              {filteredPosts.length === 0 ? (
                <div className="state-panel state-panel--wide">
                  <p className="state-title">Nothing filed under that topic yet.</p>
                  <p className="state-copy">
                    Try another topic, or read everything in the archive.
                  </p>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setSelectedTag("all")}
                  >
                    Show all notes
                  </button>
                </div>
              ) : (
                <>
                  {featuredPost ? (
                    <Link
                      className="post-featured"
                      to={`/blog/${featuredPost.slug}`}
                    >
                      <div className="post-featured-content">
                        <p className="post-kicker">
                          Latest
                          <span className="kicker-dot" aria-hidden="true" />
                          {formatDate(featuredPost)}
                        </p>
                        <h2>{featuredPost.title}</h2>
                        <p className="post-excerpt">{featuredPost.excerpt}</p>
                        <div className="post-foot">
                          <div className="tag-row">
                            {featuredPost.tags.map((tag) => (
                              <span className="tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="post-reading">
                            {featuredPost.readingMinutes} min read
                          </span>
                        </div>
                      </div>

                      {featuredPost.coverImageUrl ? (
                        <div className="post-featured-cover">
                          <img
                            src={featuredPost.coverImageUrl}
                            alt=""
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="post-featured-cover post-featured-cover--empty">
                          <span aria-hidden="true">Z</span>
                        </div>
                      )}
                    </Link>
                  ) : null}

                  {remainingPosts.length ? (
                    <div className="post-list">
                      {remainingPosts.map((post) => (
                        <Link
                          key={post.id}
                          className="post-row"
                          to={`/blog/${post.slug}`}
                        >
                          <time
                            className="post-date"
                            dateTime={post.publishedAt ?? post.updatedAt}
                          >
                            {formatDate(post)}
                          </time>
                          <span className="post-row-body">
                            <span className="post-row-title">{post.title}</span>
                            <span className="post-row-excerpt">
                              {post.excerpt}
                            </span>
                            <span className="post-row-meta">
                              {post.tags.slice(0, 3).join(" / ")}
                              <span className="kicker-dot" aria-hidden="true" />
                              {post.readingMinutes} min read
                            </span>
                          </span>
                          <ArrowUpRight className="post-row-arrow" size={16} />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default BlogPage;

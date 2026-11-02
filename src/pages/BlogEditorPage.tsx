import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import RichTextEditor from "../components/blog/RichTextEditor";
import { blogService } from "../services/blog";

const emptyDocument = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

const BlogEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(isEditing);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentHtml, setContentHtml] = useState("<p></p>");
  const [contentJson, setContentJson] = useState<unknown>(emptyDocument);
  const [tagsInput, setTagsInput] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverAssetId, setCoverAssetId] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft",
  );
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadPost = async () => {
      setLoading(true);
      try {
        const post = await blogService.getById(id);
        if (!post) {
          setError("Post not found.");
          return;
        }

        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setContentHtml(post.contentHtml);
        setContentJson(post.contentJson);
        setTagsInput(post.tags.join(", "));
        setCoverImageUrl(post.coverImageUrl ?? "");
        setCoverAssetId(post.coverAssetId ?? "");
        setStatus(post.status);
        setIsFeatured(post.isFeatured);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load the post.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadPost();
  }, [id]);

  const editorValue = useMemo(() => contentJson || emptyDocument, [contentJson]);

  const handleCoverUpload = async (file: File | undefined) => {
    if (!file) return;

    setUploadingCover(true);

    try {
      const asset = await blogService.uploadImage(file, {
        altText: file.name.replace(/\.[^/.]+$/, ""),
      });

      setCoverImageUrl(asset.url);
      setCoverAssetId(asset.id);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload cover image.",
      );
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Excerpt is required.");
      return;
    }
    if (!contentHtml.trim() || contentHtml === "<p></p>") {
      setError("Content is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const input = {
        title,
        slug,
        excerpt,
        contentHtml,
        contentJson,
        tags,
        coverImageUrl: coverImageUrl || undefined,
        coverAssetId: coverAssetId || undefined,
        status,
        isFeatured,
      };

      const post =
        isEditing && id
          ? await blogService.update(id, input)
          : await blogService.create(input);

      if (!post) {
        throw new Error("Failed to save the post.");
      }

      if (status === "published") {
        navigate(`/blog/${post.slug}`);
      } else {
        navigate("/studio");
      }
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to save post. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell hideContactBand>
      <div className="page">
        <header className="page-head container">
          <p className="page-meta">Studio editor</p>
          <h1>{isEditing ? "Edit the note." : "Compose a new note."}</h1>
          <p className="page-lede">
            Rich text with headings, lists, images, links, and code blocks.
            Drafts stay private until you publish.
          </p>
        </header>

        <div className="container editor-layout">
          <div className="panel">
            {loading ? (
              <p className="state-copy">Loading post…</p>
            ) : (
              <div className="editor-form">
                <div className="form-field">
                  <label htmlFor="post-title">Title</label>
                  <input
                    id="post-title"
                    type="text"
                    className="form-input"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Post title"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="post-slug">Slug</label>
                  <input
                    id="post-slug"
                    type="text"
                    className="form-input"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    placeholder="optional-custom-slug"
                  />
                  <p className="field-note">
                    Leave empty to generate one from the title.
                  </p>
                </div>

                <div className="form-field">
                  <label htmlFor="post-excerpt">Excerpt</label>
                  <input
                    id="post-excerpt"
                    type="text"
                    className="form-input"
                    value={excerpt}
                    onChange={(event) => setExcerpt(event.target.value)}
                    placeholder="Brief summary shown in the blog list"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="post-cover">Cover image URL</label>
                  <input
                    id="post-cover"
                    type="url"
                    className="form-input"
                    value={coverImageUrl}
                    onChange={(event) => {
                      setCoverImageUrl(event.target.value);
                      if (event.target.value.trim()) {
                        setCoverAssetId("");
                      }
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="editor-inline-actions">
                    <label className="button button--small button--ghost editor-upload-cover">
                      {uploadingCover ? "Uploading…" : "Upload cover image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="editor-hidden-input"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          void handleCoverUpload(file);
                          event.currentTarget.value = "";
                        }}
                      />
                    </label>
                  </div>
                  <p className="field-note">
                    Optional. Use a hosted image URL or upload directly into
                    Neon storage.
                  </p>
                </div>

                <div className="form-field">
                  <span className="form-label">Body</span>
                  <RichTextEditor
                    value={editorValue}
                    onChange={(snapshot) => {
                      setContentHtml(snapshot.html);
                      setContentJson(snapshot.json);
                      if (!excerpt.trim() && snapshot.text.trim()) {
                        setExcerpt(snapshot.text.trim().slice(0, 180));
                      }
                    }}
                  />
                  <p className="field-note">
                    Uploaded inline images are stored in Neon and rendered
                    through the public asset API.
                  </p>
                </div>

                <div className="form-field">
                  <label htmlFor="post-tags">Tags</label>
                  <input
                    id="post-tags"
                    type="text"
                    className="form-input"
                    value={tagsInput}
                    onChange={(event) => setTagsInput(event.target.value)}
                    placeholder="react, typescript, webdev"
                  />
                  <p className="field-note">Comma-separated tags.</p>
                </div>

                <div className="editor-options">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(event) => setIsFeatured(event.target.checked)}
                    />
                    <span>Show this post first in the public writing list</span>
                  </label>

                  <div className="form-field form-field--inline">
                    <label htmlFor="post-status">Status</label>
                    <select
                      id="post-status"
                      className="form-input form-select"
                      value={status}
                      onChange={(event) =>
                        setStatus(
                          event.target.value as
                            | "draft"
                            | "published"
                            | "archived",
                        )
                      }
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {error ? (
                  <p className="form-status form-status--error" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="editor-actions">
                  <Link to="/studio" className="text-link">
                    Cancel
                  </Link>
                  <button
                    type="button"
                    className="button"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving
                      ? "Saving…"
                      : status === "published"
                        ? "Publish"
                        : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default BlogEditorPage;

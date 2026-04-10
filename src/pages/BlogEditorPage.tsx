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
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
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
        setError(loadError instanceof Error ? loadError.message : "Failed to load the post.");
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
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload cover image.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) { setError("Title is required."); return; }
    if (!excerpt.trim()) { setError("Excerpt is required."); return; }
    if (!contentHtml.trim() || contentHtml === "<p></p>") { setError("Content is required."); return; }

    setSaving(true);
    setError("");

    try {
      const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
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

      const post = isEditing && id
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
      setError(saveError instanceof Error ? saveError.message : "Failed to save post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell>
      <section className="cell editor-header">
        <p className="eyebrow">Studio Editor</p>
        <h1>{isEditing ? "Edit post" : "Compose new post"}</h1>
        <p className="muted">Rich editor with headings, lists, images, links, and code blocks.</p>
      </section>

      <section className="cell editor-form">
        {loading ? (
          <p className="muted">Loading post...</p>
        ) : (
          <>
        <label className="field-wrap">
          <span className="modal-label">Title</span>
          <input
            type="text"
            className="field-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />
        </label>

        <label className="field-wrap">
          <span className="modal-label">Slug</span>
          <input
            type="text"
            className="field-input"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="optional-custom-slug"
          />
          <p className="meta">Leave empty to generate from the title.</p>
        </label>

        <label className="field-wrap">
          <span className="modal-label">Excerpt</span>
          <input
            type="text"
            className="field-input"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary shown in the blog list"
          />
        </label>

        <label className="field-wrap">
          <span className="modal-label">Cover Image URL</span>
          <input
            type="url"
            className="field-input"
            value={coverImageUrl}
            onChange={(e) => {
              setCoverImageUrl(e.target.value);
              if (e.target.value.trim()) {
                setCoverAssetId("");
              }
            }}
            placeholder="https://example.com/image.jpg"
          />
          <div className="editor-inline-actions">
            <label className="theme-button theme-button-outline editor-upload-cover">
              {uploadingCover ? "Uploading..." : "Upload cover image"}
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
          <p className="meta">Optional. Use a hosted image URL or upload directly into Neon storage.</p>
        </label>

        <label className="field-wrap">
          <span className="modal-label">Body</span>
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
          <p className="meta">Uploaded inline images are stored in Neon and rendered through the public asset API.</p>
        </label>

        <label className="field-wrap">
          <span className="modal-label">Tags</span>
          <input
            type="text"
            className="field-input"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="react, typescript, webdev"
          />
          <p className="meta">Comma-separated tags.</p>
        </label>

        <label className="field-wrap checkbox-field">
          <span className="modal-label">Featured Post</span>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) => setIsFeatured(event.target.checked)}
            />
            <span>Show this post first in the public blog list</span>
          </label>
        </label>

        <label className="field-wrap">
          <span className="modal-label">Status</span>
          <select
            className="field-input"
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        {error && <p className="meta feedback-error">{error}</p>}

        <div className="editor-actions">
          <Link to="/studio" className="theme-button theme-button-outline">
            Cancel
          </Link>
          <button
            type="button"
            className="theme-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : status === "published" ? "Publish" : "Save"}
          </button>
        </div>
          </>
        )}
      </section>
    </PageShell>
  );
};

export default BlogEditorPage;

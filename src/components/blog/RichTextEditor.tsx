import { useEffect, useId, useRef, useState } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { common, createLowlight } from "lowlight";

import { blogService } from "../../services/blog";

const lowlight = createLowlight(common);

type EditorSnapshot = {
  html: string;
  json: unknown;
  text: string;
};

type RichTextEditorProps = {
  value: unknown;
  onChange: (snapshot: EditorSnapshot) => void;
};

const toolbarActions = [
  { label: "Body", action: (editor: any) => editor.chain().focus().setParagraph().run() },
  { label: "H2", action: (editor: any) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: "H3", action: (editor: any) => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  { label: "Bold", action: (editor: any) => editor.chain().focus().toggleBold().run() },
  { label: "Italic", action: (editor: any) => editor.chain().focus().toggleItalic().run() },
  { label: "Quote", action: (editor: any) => editor.chain().focus().toggleBlockquote().run() },
  { label: "Bullet", action: (editor: any) => editor.chain().focus().toggleBulletList().run() },
  { label: "Numbered", action: (editor: any) => editor.chain().focus().toggleOrderedList().run() },
  { label: "Code", action: (editor: any) => editor.chain().focus().toggleCodeBlock().run() },
  { label: "Rule", action: (editor: any) => editor.chain().focus().setHorizontalRule().run() },
];

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputId = useId();
  const lastExternalValue = useRef<string>("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Typography,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Write the post body here. Use headings, lists, images, and code blocks.",
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "rich-editor-prose",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const snapshot = {
        html: currentEditor.getHTML(),
        json: currentEditor.getJSON(),
        text: currentEditor.getText(),
      };

      lastExternalValue.current = JSON.stringify(snapshot.json);
      onChange(snapshot);
    },
  });

  useEffect(() => {
    if (!editor || !value) return;

    const nextSerialized = JSON.stringify(value);
    if (nextSerialized === lastExternalValue.current) return;

    editor.commands.setContent(value);
    lastExternalValue.current = nextSerialized;
  }, [editor, value]);

  const handleAddLink = () => {
    if (!editor) return;

    const currentHref = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Enter a URL", currentHref ?? "https://");

    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  const handleAddImageUrl = () => {
    if (!editor) return;

    const src = window.prompt("Paste an image URL", "https://");
    if (!src?.trim()) return;

    const alt = window.prompt("Alt text", "") ?? "";
    editor.chain().focus().setImage({ src, alt }).run();
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file || !editor) return;

    setUploading(true);

    try {
      const asset = await blogService.uploadImage(file, {
        altText: file.name.replace(/\.[^/.]+$/, ""),
      });

      editor.chain().focus().setImage({ src: asset.url, alt: asset.altText ?? file.name }).run();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rich-editor-shell">
      <div className="rich-editor-toolbar">
        {toolbarActions.map((item) => (
          <button
            key={item.label}
            type="button"
            className="editor-tool-button"
            onClick={() => editor && item.action(editor)}
            disabled={!editor}
          >
            {item.label}
          </button>
        ))}

        <button type="button" className="editor-tool-button" onClick={handleAddLink} disabled={!editor}>
          Link
        </button>
        <button type="button" className="editor-tool-button" onClick={handleAddImageUrl} disabled={!editor}>
          Image URL
        </button>
        <label className="editor-tool-button editor-upload-button" htmlFor={fileInputId}>
          {uploading ? "Uploading..." : "Upload Image"}
        </label>
        <button type="button" className="editor-tool-button" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor}>
          Undo
        </button>
        <button type="button" className="editor-tool-button" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor}>
          Redo
        </button>
      </div>

      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        className="editor-hidden-input"
        onChange={(event) => {
          const file = event.target.files?.[0];
          void handleUpload(file);
          event.currentTarget.value = "";
        }}
      />

      <div className="rich-editor-frame">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;

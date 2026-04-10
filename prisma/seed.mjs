import { PrismaClient, BlogPostStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import slugify from "slugify";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const createDoc = (title, sections) => ({
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: title }],
    },
    ...sections,
  ],
});

const paragraph = (text) => ({
  type: "paragraph",
  content: [{ type: "text", text }],
});

const bulletList = (items) => ({
  type: "bulletList",
  content: items.map((item) => ({
    type: "listItem",
    content: [paragraph(item)],
  })),
});

const codeBlock = (code, language = "ts") => ({
  type: "codeBlock",
  attrs: { language },
  content: [{ type: "text", text: code }],
});

const htmlSections = (blocks) => blocks.join("");

const draftPosts = [
  {
    title: "Designing a Portfolio That Reads Like a Product Case Study",
    excerpt:
      "How I structure a personal portfolio so recruiters can scan it quickly while still finding enough engineering depth.",
    tags: ["portfolio", "design-systems", "frontend"],
    status: BlogPostStatus.PUBLISHED,
    isFeatured: true,
    publishedAt: new Date("2026-03-28T10:00:00.000Z"),
    contentJson: createDoc("Designing a Portfolio That Reads Like a Product Case Study", [
      paragraph(
        "A portfolio should behave like a well-structured product surface. The reader needs a fast way to understand who you are, what you build, and why your work is credible."
      ),
      bulletList([
        "Lead with signal: current role, technical focus, and a small number of strong projects.",
        "Make navigation disappear. Recruiters should not need to learn the interface.",
        "Treat writing as product documentation, not marketing copy.",
      ]),
      paragraph(
        "This blog is built around that idea. The public surface stays minimal while the admin workflow stays out of the way."
      ),
      codeBlock(
        "const priorities = ['clarity', 'proof of work', 'clean delivery'] as const;\n\nexport const recruiterFirst = priorities.join(' -> ');"
      ),
    ]),
    contentHtml: htmlSections([
      "<h1>Designing a Portfolio That Reads Like a Product Case Study</h1>",
      "<p>A portfolio should behave like a well-structured product surface. The reader needs a fast way to understand who you are, what you build, and why your work is credible.</p>",
      "<ul><li>Lead with signal: current role, technical focus, and a small number of strong projects.</li><li>Make navigation disappear. Recruiters should not need to learn the interface.</li><li>Treat writing as product documentation, not marketing copy.</li></ul>",
      "<p>This blog is built around that idea. The public surface stays minimal while the admin workflow stays out of the way.</p>",
      "<pre><code class=\"language-ts\">const priorities = ['clarity', 'proof of work', 'clean delivery'] as const;\n\nexport const recruiterFirst = priorities.join(' -&gt; ');</code></pre>",
    ]),
  },
  {
    title: "Shipping a Private CMS for a Public Personal Blog",
    excerpt:
      "A simple pattern for keeping the public blog clean while giving the site owner a secure hidden editor with image uploads and drafting.",
    tags: ["cms", "prisma", "neon", "auth"],
    status: BlogPostStatus.PUBLISHED,
    isFeatured: false,
    publishedAt: new Date("2026-04-02T09:30:00.000Z"),
    contentJson: createDoc("Shipping a Private CMS for a Public Personal Blog", [
      paragraph(
        "For a personal website, the editing experience should feel professional without exposing a dashboard in the public navigation."
      ),
      paragraph(
        "The practical split is straightforward: public readers get published posts, while the owner gets a hidden studio for drafts, publishing, and asset management."
      ),
      bulletList([
        "Neon Postgres stores the posts and uploaded assets.",
        "Neon Auth handles the admin session.",
        "Prisma keeps the data model readable.",
      ]),
    ]),
    contentHtml: htmlSections([
      "<h1>Shipping a Private CMS for a Public Personal Blog</h1>",
      "<p>For a personal website, the editing experience should feel professional without exposing a dashboard in the public navigation.</p>",
      "<p>The practical split is straightforward: public readers get published posts, while the owner gets a hidden studio for drafts, publishing, and asset management.</p>",
      "<ul><li>Neon Postgres stores the posts and uploaded assets.</li><li>Neon Auth handles the admin session.</li><li>Prisma keeps the data model readable.</li></ul>",
    ]),
  },
  {
    title: "Draft: Building Better Project Narratives",
    excerpt:
      "Notes on turning project summaries into stronger case studies with better technical and business framing.",
    tags: ["draft", "writing"],
    status: BlogPostStatus.DRAFT,
    isFeatured: false,
    publishedAt: null,
    contentJson: createDoc("Draft: Building Better Project Narratives", [
      paragraph("This draft is intentionally unpublished so the admin studio has real draft content to manage."),
    ]),
    contentHtml: htmlSections([
      "<h1>Draft: Building Better Project Narratives</h1>",
      "<p>This draft is intentionally unpublished so the admin studio has real draft content to manage.</p>",
    ]),
  },
];

const estimateReadingMinutes = (html) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / 220));
};

const seed = async () => {
  for (const post of draftPosts) {
    const slug = slugify(post.title, { lower: true, strict: true });

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml,
        contentJson: post.contentJson,
        tags: post.tags,
        status: post.status,
        isFeatured: post.isFeatured,
        publishedAt: post.publishedAt,
        readingMinutes: estimateReadingMinutes(post.contentHtml),
      },
      create: {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml,
        contentJson: post.contentJson,
        tags: post.tags,
        status: post.status,
        isFeatured: post.isFeatured,
        publishedAt: post.publishedAt,
        readingMinutes: estimateReadingMinutes(post.contentHtml),
      },
    });
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

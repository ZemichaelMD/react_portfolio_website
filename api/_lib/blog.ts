import { BlogPostStatus, type BlogAsset, type BlogPost } from "@prisma/client";
import slugify from "slugify";
import { z } from "zod";

import { prisma } from "./prisma";

const statusValues = ["draft", "published", "archived"] as const;

export const blogPostInputSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().max(220).optional().default(""),
  excerpt: z.string().trim().min(12).max(320),
  contentHtml: z.string().trim().min(1),
  contentJson: z.any(),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  coverImageUrl: z.string().trim().url().optional().or(z.literal("")).transform((value) => value || undefined),
  coverAssetId: z.string().trim().min(1).optional().or(z.literal("")).transform((value) => value || undefined),
  status: z.enum(statusValues).default("draft"),
  isFeatured: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

export const estimateReadingMinutes = (html: string) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 220));
};

const toStatus = (status: BlogPostInput["status"]): BlogPostStatus => {
  switch (status) {
    case "published":
      return BlogPostStatus.PUBLISHED;
    case "archived":
      return BlogPostStatus.ARCHIVED;
    default:
      return BlogPostStatus.DRAFT;
  }
};

export const toClientStatus = (status: BlogPostStatus): "draft" | "published" | "archived" => {
  switch (status) {
    case BlogPostStatus.PUBLISHED:
      return "published";
    case BlogPostStatus.ARCHIVED:
      return "archived";
    default:
      return "draft";
  }
};

export const createUniqueSlug = async (title: string, slug?: string, excludeId?: string) => {
  const baseSlug = slugify(slug?.trim() || title, { lower: true, strict: true, trim: true }) || "post";
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
};

export const serializeAsset = (asset: BlogAsset) => ({
  id: asset.id,
  fileName: asset.fileName,
  mimeType: asset.mimeType,
  byteSize: asset.byteSize,
  altText: asset.altText ?? undefined,
  url: `/api/blog/assets/${asset.id}`,
  createdAt: asset.createdAt.toISOString(),
});

export const serializePost = (post: BlogPost & { assets?: BlogAsset[] }) => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  contentHtml: post.contentHtml,
  contentJson: post.contentJson,
  tags: post.tags,
  coverImageUrl: post.coverImageUrl ?? (post.coverAssetId ? `/api/blog/assets/${post.coverAssetId}` : undefined),
  coverAssetId: post.coverAssetId ?? undefined,
  status: toClientStatus(post.status),
  isFeatured: post.isFeatured,
  readingMinutes: post.readingMinutes,
  createdAt: post.createdAt.toISOString(),
  updatedAt: post.updatedAt.toISOString(),
  publishedAt: post.publishedAt?.toISOString() ?? null,
  assets: post.assets?.map(serializeAsset) ?? [],
});

export const postSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  contentHtml: true,
  contentJson: true,
  tags: true,
  coverImageUrl: true,
  coverAssetId: true,
  status: true,
  isFeatured: true,
  readingMinutes: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
  assets: {
    select: {
      id: true,
      fileName: true,
      mimeType: true,
      byteSize: true,
      altText: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" as const },
  },
} as const;

export const buildPostWriteData = (input: BlogPostInput) => {
  const status = toStatus(input.status);
  const readingMinutes = estimateReadingMinutes(input.contentHtml);
  const shouldPublish = status === BlogPostStatus.PUBLISHED;

  return {
    title: input.title,
    excerpt: input.excerpt,
    contentHtml: input.contentHtml,
    contentJson: input.contentJson,
    tags: Array.from(new Set(input.tags.map((tag) => tag.trim()).filter(Boolean))),
    coverImageUrl: input.coverImageUrl,
    coverAssetId: input.coverAssetId,
    status,
    isFeatured: input.isFeatured,
    readingMinutes,
    publishedAt: shouldPublish ? new Date() : null,
  };
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  contentHtml: string;
  contentJson: unknown;
  excerpt: string;
  coverImageUrl?: string;
  coverAssetId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  readingMinutes: number;
  assets: BlogAsset[];
}

export interface BlogAsset {
  id: string;
  fileName: string;
  mimeType: string;
  byteSize: number;
  altText?: string;
  url: string;
  createdAt: string;
}

export type BlogPostInput = {
  title: string;
  slug?: string;
  excerpt: string;
  contentHtml: string;
  contentJson: unknown;
  tags: string[];
  coverImageUrl?: string;
  coverAssetId?: string;
  status?: "draft" | "published" | "archived";
  isFeatured?: boolean;
};

export interface BlogStorageAdapter {
  getAll(options?: { admin?: boolean }): Promise<BlogPost[]>;
  getById(id: string): Promise<BlogPost | null>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  create(post: BlogPostInput): Promise<BlogPost>;
  update(id: string, post: Partial<BlogPostInput>): Promise<BlogPost | null>;
  delete(id: string): Promise<boolean>;
  uploadImage(file: File, options?: { altText?: string; postId?: string }): Promise<BlogAsset>;
}

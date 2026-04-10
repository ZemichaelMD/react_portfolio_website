import type { BlogPost, BlogPostInput, BlogStorageAdapter } from "./types";

const request = async <T>(url: string, init?: RequestInit) => {
  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed.");
  }

  return payload as T;
};

export const apiBlogAdapter: BlogStorageAdapter = {
  async getAll(options) {
    const suffix = options?.admin ? "?scope=admin" : "";
    const payload = await request<{ posts: BlogPost[] }>(`/api/blog/posts${suffix}`, {
      headers: {},
    });
    return payload.posts;
  },

  async getById(id) {
    const payload = await request<{ post: BlogPost }>(`/api/blog/posts/${id}`, {
      headers: {},
    });
    return payload.post;
  },

  async getBySlug(slug) {
    const payload = await request<{ post: BlogPost }>(`/api/blog/posts/slug/${slug}`, {
      headers: {},
    });
    return payload.post;
  },

  async create(post) {
    const payload = await request<{ post: BlogPost }>("/api/blog/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
    return payload.post;
  },

  async update(id, post) {
    const payload = await request<{ post: BlogPost }>(`/api/blog/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    return payload.post;
  },

  async delete(id) {
    await request<{ ok: boolean }>(`/api/blog/posts/${id}`, {
      method: "DELETE",
      headers: {},
    });
    return true;
  },

  async uploadImage(file, options) {
    const formData = new FormData();
    formData.append("image", file);

    if (options?.altText) {
      formData.append("altText", options.altText);
    }

    if (options?.postId) {
      formData.append("postId", options.postId);
    }

    const response = await fetch("/api/uploads/images", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(payload.error ?? "Image upload failed.");
    }

    return payload.asset;
  },
};

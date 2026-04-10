import type { IncomingMessage, ServerResponse } from "node:http";

import { requireAdmin } from "../../_lib/auth";
import { blogPostInputSchema, buildPostWriteData, createUniqueSlug, postSelect, serializePost } from "../../_lib/blog";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../../_lib/http";
import { prisma } from "../../_lib/prisma";

const getPostId = (req: IncomingMessage & { query?: { id?: string } }) => req.query?.id;

export default async function handler(req: IncomingMessage & { query?: { id?: string } }, res: ServerResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const id = getPostId(req);

  if (!id) {
    sendJson(res, 400, { error: "Post id is required." });
    return;
  }

  if (req.method === "GET") {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      select: postSelect,
    });

    if (!post) {
      sendJson(res, 404, { error: "Post not found." });
      return;
    }

    sendJson(res, 200, { post: serializePost(post as never) });
    return;
  }

  if (req.method === "PATCH") {
    const existing = await prisma.blogPost.findUnique({
      where: { id },
      select: { id: true, slug: true },
    });

    if (!existing) {
      sendJson(res, 404, { error: "Post not found." });
      return;
    }

    const payload = await readJsonBody(req);
    const input = blogPostInputSchema.parse(payload);
    const slug = await createUniqueSlug(input.title, input.slug, existing.id);

    if (input.isFeatured) {
      await prisma.blogPost.updateMany({
        where: {
          isFeatured: true,
          NOT: { id },
        },
        data: { isFeatured: false },
      });
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        ...buildPostWriteData(input),
      },
      select: postSelect,
    });

    sendJson(res, 200, { post: serializePost(updated as never) });
    return;
  }

  if (req.method === "DELETE") {
    await prisma.blogPost.delete({
      where: { id },
    });

    sendJson(res, 200, { ok: true });
    return;
  }

  sendMethodNotAllowed(res, ["GET", "PATCH", "DELETE"]);
}

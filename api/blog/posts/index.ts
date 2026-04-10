import type { IncomingMessage, ServerResponse } from "node:http";

import { Prisma } from "@prisma/client";

import { requireAdmin } from "../../_lib/auth";
import { blogPostInputSchema, buildPostWriteData, createUniqueSlug, postSelect, serializePost } from "../../_lib/blog";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../../_lib/http";
import { prisma } from "../../_lib/prisma";

const includeAdminScope = async (req: IncomingMessage) => {
  const url = new URL((req as IncomingMessage & { url?: string }).url ?? "/", "http://localhost");
  const scope = url.searchParams.get("scope");

  if (scope !== "admin") {
    return false;
  }

  const admin = await requireAdmin(req, {
    statusCode: 200,
    setHeader() {},
    end() {},
  } as unknown as ServerResponse);

  return Boolean(admin);
};

export default async function handler(req: IncomingMessage & { url?: string }, res: ServerResponse) {
  if (req.method === "GET") {
    const isAdmin = await includeAdminScope(req);
    const where = isAdmin ? {} : { status: "PUBLISHED" as const };

    const posts = await prisma.blogPost.findMany({
      where,
      select: postSelect,
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
    });

    sendJson(res, 200, { posts: posts.map((post) => serializePost(post as never)) });
    return;
  }

  if (req.method === "POST") {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const payload = await readJsonBody(req);
    const input = blogPostInputSchema.parse(payload);
    const slug = await createUniqueSlug(input.title, input.slug);

    if (input.isFeatured) {
      await prisma.blogPost.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false },
      });
    }

    const created = await prisma.blogPost.create({
      data: {
        slug,
        ...buildPostWriteData(input),
      },
      select: postSelect,
    });

    sendJson(res, 201, { post: serializePost(created as never) });
    return;
  }

  sendMethodNotAllowed(res, ["GET", "POST"]);
}

import type { IncomingMessage, ServerResponse } from "node:http";

import { getAuthSession } from "../../../_lib/auth";
import { postSelect, serializePost } from "../../../_lib/blog";
import { sendJson, sendMethodNotAllowed } from "../../../_lib/http";
import { prisma } from "../../../_lib/prisma";

const getSlug = (req: IncomingMessage & { query?: { slug?: string } }) => req.query?.slug;

export default async function handler(req: IncomingMessage & { query?: { slug?: string } }, res: ServerResponse) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res, ["GET"]);
    return;
  }

  const slug = getSlug(req);
  if (!slug) {
    sendJson(res, 400, { error: "Post slug is required." });
    return;
  }

  const session = await getAuthSession(req);
  const allowDraft =
    session?.user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase();

  const post = await prisma.blogPost.findFirst({
    where: allowDraft
      ? { slug }
      : { slug, status: "PUBLISHED" },
    select: postSelect,
  });

  if (!post) {
    sendJson(res, 404, { error: "Post not found." });
    return;
  }

  sendJson(res, 200, { post: serializePost(post as never) });
}

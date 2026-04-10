import type { IncomingMessage, ServerResponse } from "node:http";

import { sendJson, sendMethodNotAllowed } from "../../_lib/http";
import { prisma } from "../../_lib/prisma";

export default async function handler(req: IncomingMessage & { query?: { id?: string } }, res: ServerResponse) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res, ["GET"]);
    return;
  }

  const id = req.query?.id;
  if (!id) {
    sendJson(res, 400, { error: "Asset id is required." });
    return;
  }

  const asset = await prisma.blogAsset.findUnique({
    where: { id },
    select: {
      data: true,
      mimeType: true,
      fileName: true,
      byteSize: true,
      createdAt: true,
    },
  });

  if (!asset) {
    sendJson(res, 404, { error: "Asset not found." });
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", asset.mimeType);
  res.setHeader("Content-Length", String(asset.byteSize));
  res.setHeader("Content-Disposition", `inline; filename="${asset.fileName.replace(/"/g, "")}"`);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.end(Buffer.from(asset.data));
}

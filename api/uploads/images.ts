import { readFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";

import formidable from "formidable";

import { requireAdmin } from "../_lib/auth";
import { serializeAsset } from "../_lib/blog";
import { sendJson, sendMethodNotAllowed } from "../_lib/http";
import { prisma } from "../_lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req: IncomingMessage) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 8 * 1024 * 1024,
      multiples: false,
      filter: ({ mimetype }) => Boolean(mimetype?.startsWith("image/")),
    });

    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ fields, files });
    });
  });

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    sendMethodNotAllowed(res, ["POST"]);
    return;
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const { fields, files } = await parseForm(req);
    const image = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!image) {
      sendJson(res, 400, { error: "Image file is required." });
      return;
    }

    const fileBuffer = await readFile(image.filepath);
    const altText = Array.isArray(fields.altText) ? fields.altText[0] : fields.altText;
    const postId = Array.isArray(fields.postId) ? fields.postId[0] : fields.postId;

    const asset = await prisma.blogAsset.create({
      data: {
        fileName: image.originalFilename ?? image.newFilename ?? "upload",
        mimeType: image.mimetype ?? "application/octet-stream",
        byteSize: image.size,
        data: fileBuffer,
        altText: typeof altText === "string" ? altText : undefined,
        postId: typeof postId === "string" && postId.trim() ? postId : undefined,
      },
    });

    sendJson(res, 201, { asset: serializeAsset(asset) });
  } catch (error) {
    console.error("Image upload failed", error);
    sendJson(res, 500, { error: "Failed to upload image." });
  }
}

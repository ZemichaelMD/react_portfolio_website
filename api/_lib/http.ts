import type { IncomingMessage, ServerResponse } from "node:http";

export const readJsonBody = async <T = unknown>(req: IncomingMessage): Promise<T> => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length === 0) {
    return {} as T;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
};

export const readRawBody = async (req: IncomingMessage): Promise<Buffer | undefined> => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return chunks.length ? Buffer.concat(chunks) : undefined;
};

export const sendJson = (res: ServerResponse, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

export const sendMethodNotAllowed = (res: ServerResponse, methods: string[]) => {
  res.setHeader("Allow", methods.join(", "));
  sendJson(res, 405, { error: "Method not allowed." });
};

import type { IncomingMessage, ServerResponse } from "node:http";

import { readRawBody, sendJson } from "../_lib/http";

const hopByHopHeaders = new Set([
  "connection",
  "content-length",
  "host",
  "transfer-encoding",
]);

const getProxyBaseUrl = () => {
  const authUrl = process.env.NEON_AUTH_URL;

  if (!authUrl) {
    throw new Error("NEON_AUTH_URL is not configured.");
  }

  return authUrl.replace(/\/+$/, "");
};

const getSetCookieHeaders = (response: Response) => {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
    raw?: () => Record<string, string[]>;
  };

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  if (typeof headers.raw === "function") {
    return headers.raw()["set-cookie"] ?? [];
  }

  const single = response.headers.get("set-cookie");
  return single ? [single] : [];
};

export default async function handler(req: IncomingMessage & { query?: { path?: string | string[]; [key: string]: unknown }; url?: string }, res: ServerResponse) {
  try {
    const pathSegments = req.query?.path;
    const normalizedSegments = Array.isArray(pathSegments)
      ? pathSegments
      : pathSegments
        ? [pathSegments]
        : [];

    const incomingUrl = new URL(req.url ?? "/", "http://localhost");
    const target = new URL(`${normalizedSegments.join("/")}${incomingUrl.search}`, `${getProxyBaseUrl()}/`);
    const body =
      req.method && ["GET", "HEAD"].includes(req.method.toUpperCase())
        ? undefined
        : await readRawBody(req);

    const forwardedHeaders = new Headers();

    Object.entries(req.headers).forEach(([key, value]) => {
      if (!value || hopByHopHeaders.has(key.toLowerCase())) {
        return;
      }

      if (Array.isArray(value)) {
        forwardedHeaders.set(key, value.join(", "));
        return;
      }

      forwardedHeaders.set(key, value);
    });

    const response = await fetch(target, {
      method: req.method ?? "GET",
      headers: forwardedHeaders,
      body,
      redirect: "manual",
    });

    const setCookies = getSetCookieHeaders(response);
    if (setCookies.length > 0) {
      res.setHeader("Set-Cookie", setCookies);
    }

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie" || hopByHopHeaders.has(key.toLowerCase())) {
        return;
      }

      res.setHeader(key, value);
    });

    res.statusCode = response.status;
    const responseBody = Buffer.from(await response.arrayBuffer());
    res.end(responseBody);
  } catch (error) {
    console.error("Neon auth proxy failed", error);
    sendJson(res, 500, { error: "Failed to reach the auth service." });
  }
}

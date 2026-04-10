import type { IncomingMessage, ServerResponse } from "node:http";

import { sendJson } from "./http";

type AuthSession = {
  user?: {
    id: string;
    email: string;
    name?: string | null;
    role?: string | null;
  };
  session?: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
  };
};

const getAuthBaseUrl = () => {
  const authUrl = process.env.NEON_AUTH_URL;

  if (!authUrl) {
    throw new Error("NEON_AUTH_URL is not configured.");
  }

  return authUrl.replace(/\/+$/, "");
};

export const getAuthSession = async (req: IncomingMessage) => {
  const response = await fetch(`${getAuthBaseUrl()}/get-session`, {
    method: "GET",
    headers: {
      cookie: req.headers.cookie ?? "",
      accept: "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    user?: AuthSession["user"];
    session?: AuthSession["session"];
  };

  if (!payload.user || !payload.session) {
    return null;
  }

  return payload;
};

export const requireAdmin = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!allowedEmail) {
    sendJson(res, 500, { error: "ADMIN_EMAIL is not configured." });
    return null;
  }

  const session = await getAuthSession(req);

  if (!session?.user?.email) {
    sendJson(res, 401, { error: "Authentication required." });
    return null;
  }

  if (session.user.email.toLowerCase() !== allowedEmail) {
    sendJson(res, 403, { error: "This account is not allowed to manage the blog." });
    return null;
  }

  return session;
};

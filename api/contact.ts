import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const sanitizeHeader = (value: string) => value.replace(/[\r\n]/g, " ").trim();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const payload: ContactPayload =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const name = sanitizeHeader(payload.name ?? "");
  const email = sanitizeHeader(payload.email ?? "");
  const subject = sanitizeHeader(payload.subject ?? "");
  const message = (payload.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_RECEIVER_EMAIL ?? user;

  if (!host || !user || !pass || !to) {
    res.status(500).json({ error: "SMTP environment is not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const mailText = [
    "New client message from portfolio site",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: mailText,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email send failed", error);
    res.status(500).json({ error: "Failed to send message." });
  }
}

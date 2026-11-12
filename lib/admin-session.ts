import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_CONTEXT = "ohana-admin-session-v1";

function configuredToken() {
  return process.env.ADMIN_DEMO_TOKEN?.trim() || null;
}

function safelyEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isValidAdminToken(candidate: unknown) {
  const expected = configuredToken();
  return typeof candidate === "string" && expected !== null && safelyEqual(candidate, expected);
}

export function adminSessionValue() {
  const token = configuredToken();
  if (!token) return null;

  return createHmac("sha256", token).update(SESSION_CONTEXT).digest("base64url");
}

export function isValidAdminSession(candidate: string | undefined) {
  const expected = adminSessionValue();
  return Boolean(candidate && expected && safelyEqual(candidate, expected));
}

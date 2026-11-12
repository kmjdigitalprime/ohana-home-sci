import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_CONTEXT = "ohana-private-preview-session-v1";

function configuredPassword() {
  return process.env.PREVIEW_ACCESS_PASSWORD?.trim() || null;
}

function safelyEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function previewSessionValue() {
  const password = configuredPassword();
  if (!password) return null;

  return createHmac("sha256", password).update(SESSION_CONTEXT).digest("base64url");
}

export function isValidPreviewPassword(candidate: unknown) {
  const expected = configuredPassword();
  return typeof candidate === "string" && expected !== null && safelyEqual(candidate, expected);
}

export function isValidPreviewSession(candidate: string | undefined) {
  const expected = previewSessionValue();
  return Boolean(candidate && expected && safelyEqual(candidate, expected));
}

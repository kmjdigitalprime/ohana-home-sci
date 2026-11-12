import { NextResponse } from "next/server";
import { isValidPreviewPassword, previewSessionValue } from "@/lib/preview-session";

export async function POST(request: Request) {
  const sessionValue = previewSessionValue();
  if (!sessionValue) {
    return NextResponse.json(
      { ok: false, message: "L’aperçu privé n’est pas configuré." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => ({}));
  if (!isValidPreviewPassword(body.password)) {
    return NextResponse.json(
      { ok: false, message: "Mot de passe incorrect." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("ohana_preview", sessionValue, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.COOKIE_SECURE === "true",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}

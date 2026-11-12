import { NextResponse } from "next/server";
import { adminSessionValue, isValidAdminToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  const sessionValue = adminSessionValue();
  if (!sessionValue) {
    return NextResponse.json(
      { ok: false, message: "L’administration n’est pas activée sur cet aperçu." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => ({}));
  if (!isValidAdminToken(body.token)) {
    return NextResponse.json({ ok: false, message: "Code d’accès incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("ohana_admin", sessionValue, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.COOKIE_SECURE === "true",
    maxAge: 3600,
    path: "/admin",
  });
  return response;
}

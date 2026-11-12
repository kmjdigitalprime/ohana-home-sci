import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function privatePreviewResponse(status = 401) {
  return new NextResponse(
    status === 401
      ? "Aperçu privé OHANA HOME SCI — identification requise."
      : "L’aperçu privé n’est pas encore configuré.",
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        ...(status === 401
          ? { "WWW-Authenticate": 'Basic realm="OHANA HOME SCI private preview", charset="UTF-8"' }
          : {}),
      },
    },
  );
}

export function proxy(request: NextRequest) {
  const password = process.env.PREVIEW_ACCESS_PASSWORD?.trim();
  if (!password) {
    return process.env.NODE_ENV === "production"
      ? privatePreviewResponse(503)
      : NextResponse.next();
  }

  const username = process.env.PREVIEW_ACCESS_USER?.trim() || "ohana";
  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Basic ")) {
    try {
      const supplied = Buffer.from(authorization.slice(6), "base64").toString("utf8");
      if (supplied === `${username}:${password}`) {
        const response = NextResponse.next();
        response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        return response;
      }
    } catch {
      // Une valeur Basic malformée est traitée comme un accès non autorisé.
    }
  }

  return privatePreviewResponse();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

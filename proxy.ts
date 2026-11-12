import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isValidPreviewSession } from "@/lib/preview-session";

function privatePreviewResponse() {
  return new NextResponse("L’aperçu privé n’est pas encore configuré.", {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export function proxy(request: NextRequest) {
  const password = process.env.PREVIEW_ACCESS_PASSWORD?.trim();
  const pathname = request.nextUrl.pathname;
  const isLoginPath = pathname === "/apercu" || pathname === "/api/preview/session";

  if (isLoginPath) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (!password) {
    return process.env.NODE_ENV === "production"
      ? privatePreviewResponse()
      : NextResponse.next();
  }

  if (isValidPreviewSession(request.cookies.get("ohana_preview")?.value)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  const loginUrl = new URL("/apercu", request.url);
  loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

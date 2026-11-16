import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isValidAdminSession } from "@/lib/admin-session";

// Public pages and media never require an editorial preview session.
// Authorization is also checked in the admin page before reading private data.
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/admin/login" || path === "/api/admin/session") return NextResponse.next();
  if (!isValidAdminSession(request.cookies.get("ohana_admin")?.value)) {
    if (path.startsWith("/api/")) return NextResponse.json({error:"Accès non autorisé"}, {status:401});
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

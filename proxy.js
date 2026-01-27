import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/translation" || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  // ✅ Always allow API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  const isAuthPage =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgotPassword");

  const isProfilePage = pathname.startsWith("/profileDetails");
  const isHomePage = pathname === "/";

  const isAuthenticated = !!token;
  const isProfileDone = !!token?.profileCompleted;

  if (!isAuthenticated) {
    if (!isAuthPage && !isHomePage) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  if (!isProfileDone) {
    if (!isProfilePage) {
      return NextResponse.redirect(new URL("/profileDetails", request.url));
    }
    return NextResponse.next();
  }

  if (isAuthPage || isProfilePage || isHomePage) {
    return NextResponse.redirect(new URL("/translation", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|fonts).*)",
  ],
};

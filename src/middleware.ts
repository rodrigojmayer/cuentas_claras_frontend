import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const RESTRICTED_ROUTES = ["/tests", "/session-test"];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (!token && !pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const email = token?.user?.email;

    if (
      RESTRICTED_ROUTES.some(r => pathname.startsWith(r)) &&
      email !== process.env.ADMIN_EMAIL
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: { authorized: () => true },
  }
);

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
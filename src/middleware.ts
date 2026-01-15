import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server'

const RESTRICTED_ROUTES = ["/tests", "/session-test"];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
    // 🔴 USUARIO NO LOGUEADO
    if (!token) {
      // Si intenta ir a algo que no sea /login
      if (!pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }

    // 🟢 LOGUEADO
    const userEmail = token.user?.email;

    // 🔐 RUTAS RESTRINGIDAS POR EMAIL
    if (
      RESTRICTED_ROUTES.some(route => pathname.startsWith(route)) &&
      userEmail !== process.env.ADMIN_EMAIL
    ) {
      // puedes redirigir a /, /403, o donde quieras
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔁 Logueado → solo permitimos "/" y rutas restringidas válidas
    if (
      pathname !== "/" &&
      !RESTRICTED_ROUTES.some(route => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // 👈 IMPORTANTE: desactivar redirección automática
    },
  }
);

// El 'matcher' define qué rutas protege el middleware
export const config = {
  matcher: [
    /*
     * Protege todas las rutas (incluyendo cualquier hash o subruta)
     * excepto archivos estáticos, favicon y api de auth
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
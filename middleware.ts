import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// JWT secret key - In production, this should be from environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ||
    "your-super-secret-jwt-key-change-this-in-production"
);

// Define protected and public routes
const protectedRoutes = ["/dashboard", "/profile", "/admin", "/settings"];
const publicRoutes = ["/login", "/register", "/forgot-password", "/", "/about"];

// Routes that should be accessible to authenticated users only
const authOnlyRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files like .css, .js, .png, etc.
  ) {
    return NextResponse.next();
  }

  // Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthOnlyRoute = authOnlyRoutes.includes(pathname);

  // Get the JWT token from cookies
  const token = request.cookies.get("auth-token")?.value;

  let isAuthenticated = false;
  let userPayload = null;

  // Verify JWT token if it exists
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        // Add any additional verification options here
        // issuer: 'your-app-issuer',
        // audience: 'your-app-audience',
      });

      isAuthenticated = true;
      userPayload = payload;

      // Optional: Check token expiration more strictly
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        isAuthenticated = false;
      }
    } catch (error) {
      // JWT verification failed - token is invalid
      console.log("JWT verification failed:", error);
      isAuthenticated = false;

      // Clear invalid token
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");

      if (isProtectedRoute) {
        return response;
      }
    }
  }

  // Redirect logic based on authentication status and route type

  // 1. Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Add the original URL as a redirect parameter
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users away from auth-only routes (login, register)
  if (isAuthOnlyRoute && isAuthenticated) {
    // Check if there's a redirect URL from the login flow
    const redirectUrl = request.nextUrl.searchParams.get("redirect");
    if (
      redirectUrl &&
      protectedRoutes.some((route) => redirectUrl.startsWith(route))
    ) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    // Default redirect for authenticated users trying to access login/register
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. For public routes or valid access, continue normally
  const response = NextResponse.next();

  // Optional: Add user info to headers for use in pages (be careful with sensitive data)
  if (isAuthenticated && userPayload) {
    // Add user ID to header for server components to use
    response.headers.set(
      "x-user-id",
      String(userPayload.sub || userPayload.userId || "")
    );
    response.headers.set("x-user-authenticated", "true");
  }

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.css$|.*\\.js$).*)",
  ],
};

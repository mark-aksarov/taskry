import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const PROTECTED_ROUTES = ["/"];

const AUTH_ROUTES = new Set([
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/verify-email",
  "/forgot-password",
]);

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: ["en", "ru"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);

  /*
	const session = getSessionCookie(request);
	const pathname = request.nextUrl.pathname;

	const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname === route);

	if (isProtectedRoute && !session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	const isAuthRoute = AUTH_ROUTES.has(pathname);

	if (session && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}*/

  return response;
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/verify-email",
    "/forgot-password",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};

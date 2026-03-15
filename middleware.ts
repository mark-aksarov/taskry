import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/forget-password/check-email",
  "/reset-password",
  "/verify-email",
];

function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => pathname.endsWith(route));
}

const defaultLocale = "ru";

const handleI18nRouting = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale,
  localeDetection: false,
});

export async function middleware(request: NextRequest) {
  // https://better-auth.com/docs/integrations/next#cookie-based-checks-recommended-for-all-versions
  if (!isPublicRoute(request.nextUrl.pathname)) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

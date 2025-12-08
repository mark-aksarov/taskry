import createMiddleware from "next-intl/middleware";
import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ru"];
const defaultLocale = "ru";

const publicPages = [
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/forget-password/check-email",
  "/reset-password",
  "/verify-email",
];

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
});

function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split("/").filter((s) => s.length > 0);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(pathname);

  if (isPublicPage) {
    return handleI18nRouting(request);
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const currentLocale = getLocaleFromPathname(pathname);
    const redirectLocale = currentLocale || defaultLocale;
    const signInPath = `/${redirectLocale}/sign-in`;
    const signInUrl = new URL(signInPath, request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

import { auth } from "./lib/auth";
import { headers } from "next/headers";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

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

export async function middleware(request: NextRequest) {
  if (!isPublicRoute(request.nextUrl.pathname)) {
    //https://better-auth.com/docs/integrations/next#for-nextjs-release-1520-and-above
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (!session.user.emailVerified) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }
  }

  const defaultLocale = "ru";

  const handleI18nRouting = createMiddleware({
    locales: ["en", "ru"],
    defaultLocale,
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  //use the Node.js runtime in middleware for full session validation with database checks:
  runtime: "nodejs",

  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

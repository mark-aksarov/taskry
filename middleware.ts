import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const locales = ["en", "ru"] as const;
const defaultLocale = "ru";

function normalizePath(pathname: string) {
  const segments = pathname.split("/");

  if (locales.includes(segments[1] as any)) {
    return "/" + segments.slice(2).join("/");
  }

  return pathname;
}

const protectedRoutes = [
  { type: "exact", path: "/dashboard" },
  { type: "prefix", path: "/companies" },
  { type: "prefix", path: "/customers" },
  { type: "prefix", path: "/positions" },
  { type: "prefix", path: "/project-categories" },
  { type: "prefix", path: "/projects" },
  { type: "prefix", path: "/task-categories" },
  { type: "prefix", path: "/tasks" },
  { type: "prefix", path: "/team" },
] as const;

function isProtectedRoute(pathname: string) {
  const path = normalizePath(pathname);

  return protectedRoutes.some((route) => {
    if (route.type === "exact") {
      return path === route.path;
    }

    if (route.type === "prefix") {
      return path === route.path || path.startsWith(route.path + "/");
    }

    return false;
  });
}

const handleI18nRouting = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale,
  localeDetection: false,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("pathname", pathname, isProtectedRoute(pathname));

  // https://better-auth.com/docs/integrations/next#cookie-based-checks-recommended-for-all-versions
  if (isProtectedRoute(pathname)) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

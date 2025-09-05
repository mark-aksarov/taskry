import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_ROUTES = ["/"];

const AUTH_ROUTES = new Set([
	"/sign-in",
	"/sign-up",
	"/reset-password",
	"/verify-email",
	"/forgot-password",
]);

export async function middleware(request: NextRequest) {
	const session = getSessionCookie(request);
	const pathname = request.nextUrl.pathname;

	const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname === route);

	if (isProtectedRoute && !session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	const isAuthRoute = AUTH_ROUTES.has(pathname);

	if (session && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/sign-in",
		"/sign-up",
		"/reset-password",
		"/verify-email",
		"/forgot-password",
	],
};
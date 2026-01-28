import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserSummaries } from "@/lib/data/user/user.service";
import {
  internalServerError,
  unauthorized,
} from "@/lib/utils/routeHandlerErrors";

export async function GET(req: NextRequest) {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Fetch users
    const users = await getUserSummaries();
    return NextResponse.json(users);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}

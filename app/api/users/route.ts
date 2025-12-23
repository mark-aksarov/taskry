import { getUserSummaries } from "@/lib/dal/user";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch users
    const users = await getUserSummaries();
    return NextResponse.json(users);
  });
}

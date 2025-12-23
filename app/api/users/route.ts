import { withAuth } from "@/lib/api/withAuth";
import { getUserSummaries } from "@/lib/dal/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withAuth(async (session) => {
    // Fetch users
    const users = await getUserSummaries();
    return NextResponse.json(users);
  });
}

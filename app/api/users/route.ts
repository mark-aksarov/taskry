import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSummaries } from "@/lib/dal/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await getUserSummaries();

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /users error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/dal/task";

export async function GET(req: NextRequest) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch categories
    const categories = await getTaskCategorySummaries();

    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /task-categories error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getProjectCategorySummaries } from "@/lib/dal/project";

export async function GET(req: NextRequest) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch projects
    const projects = await getProjectCategorySummaries();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /project-categories error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

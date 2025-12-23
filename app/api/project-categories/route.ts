import { withAuth } from "@/lib/api/withAuth";
import { NextRequest, NextResponse } from "next/server";
import { getProjectCategorySummaries } from "@/lib/dal/project";

export async function GET(req: NextRequest) {
  return withAuth(async (session) => {
    // Fetch projects
    const projects = await getProjectCategorySummaries();
    return NextResponse.json(projects);
  });
}

import { NextRequest, NextResponse } from "next/server";
import { getProjectCategorySummaries } from "@/lib/dal/project";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const projects = await getProjectCategorySummaries();
    return NextResponse.json(projects);
  });
}

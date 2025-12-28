import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.service";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const projects = await getProjectCategorySummaries();
    return NextResponse.json(projects);
  });
}

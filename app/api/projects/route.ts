import { NextResponse, NextRequest } from "next/server";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const projects = await getProjectSummaries();
    return NextResponse.json(projects);
  });
}

import { NextResponse, NextRequest } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { getProjectSummaries } from "@/lib/data/project/project.service";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const projects = await getProjectSummaries();
    return NextResponse.json(projects);
  });
}

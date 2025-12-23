import { NextResponse, NextRequest } from "next/server";
import { getProjectSummaries } from "@/lib/dal/project";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const projects = await getProjectSummaries();
    return NextResponse.json(projects);
  });
}

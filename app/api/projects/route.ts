import { withAuth } from "@/lib/api/withAuth";
import { NextResponse, NextRequest } from "next/server";
import { getProjectSummaries } from "@/lib/dal/project";

export async function GET(req: NextRequest) {
  return withAuth(async (session) => {
    // Fetch projects
    const projects = await getProjectSummaries();
    return NextResponse.json(projects);
  });
}

import { NextRequest, NextResponse } from "next/server";
import { getProjectSummaries } from "@/lib/queries/project";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function GET(req: NextRequest) {
  const workspaceId = await getUserWorkspaceId();
  const projects = await getProjectSummaries(workspaceId);
  return NextResponse.json(projects);
}

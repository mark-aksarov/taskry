import { NextRequest, NextResponse } from "next/server";
import { getUserSummaries } from "@/lib/queries/user";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function GET(req: NextRequest) {
  const workspaceId = await getUserWorkspaceId();
  const statuses = await getUserSummaries(workspaceId);
  return NextResponse.json(statuses);
}

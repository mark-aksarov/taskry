import { NextRequest, NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/queries/task";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function GET(req: NextRequest) {
  const workspaceId = await getUserWorkspaceId();
  const categories = await getTaskCategorySummaries(workspaceId);
  return NextResponse.json(categories);
}

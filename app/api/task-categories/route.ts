import { NextRequest, NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/dal/task";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const categories = await getTaskCategorySummaries();
    return NextResponse.json(categories);
  });
}

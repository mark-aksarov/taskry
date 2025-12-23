import { NextRequest, NextResponse } from "next/server";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

export async function GET(req: NextRequest) {
  return withAuthRouteHandler(async () => {
    // Fetch projects
    const categories = await getTaskCategorySummaries();
    return NextResponse.json(categories);
  });
}

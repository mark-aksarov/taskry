import { withAuth } from "@/lib/api/withAuth";
import { NextRequest, NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/dal/task";

export async function GET(req: NextRequest) {
  return withAuth(async (session) => {
    // Fetch projects
    const categories = await getTaskCategorySummaries();
    return NextResponse.json(categories);
  });
}

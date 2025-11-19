import { NextRequest, NextResponse } from "next/server";
import { getTaskCategorySummaries } from "@/lib/queries/task";

export async function GET(req: NextRequest) {
  const categories = await getTaskCategorySummaries(1);
  return NextResponse.json(categories);
}

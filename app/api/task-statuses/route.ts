import { NextRequest, NextResponse } from "next/server";
import { getTaskStatusSummaries } from "@/lib/queries/task";

export async function GET(req: NextRequest) {
  const statuses = await getTaskStatusSummaries();
  return NextResponse.json(statuses);
}

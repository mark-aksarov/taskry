import { NextRequest, NextResponse } from "next/server";
import { getTaskStatusSummaries } from "@/lib/data/task";

export async function GET(req: NextRequest) {
  try {
    // Fetch statuses
    const statuses = await getTaskStatusSummaries();

    return NextResponse.json(statuses);
  } catch (error) {
    console.error("GET /task-statuses error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

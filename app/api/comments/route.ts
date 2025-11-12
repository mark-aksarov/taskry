import { getCommentsByTask } from "@/lib/queries/comments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskIdParam = searchParams.get("taskId");

    if (!taskIdParam) {
      return NextResponse.json(
        { error: "Missing taskId query parameter" },
        { status: 400 },
      );
    }

    const taskId = Number(taskIdParam);
    if (isNaN(taskId)) {
      return NextResponse.json(
        { error: "Invalid taskId format" },
        { status: 400 },
      );
    }

    const comments = await getCommentsByTask(
      taskId,
      "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error("[GET /api/comments]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getTaskDetail } from "@/lib/queries/task";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const task = await getTaskDetail(Number(id));
    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}

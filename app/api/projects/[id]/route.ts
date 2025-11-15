import { NextRequest, NextResponse } from "next/server";
import { getProjectDetail } from "@/lib/queries/project";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const task = await getProjectDetail(Number(id));
    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

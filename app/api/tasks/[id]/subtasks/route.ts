import { NextRequest, NextResponse } from "next/server";
import { getSubtasks } from "@/lib/queries/subtasks";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const subtasks = await getSubtasks(Number(id));
  return NextResponse.json(subtasks);
}

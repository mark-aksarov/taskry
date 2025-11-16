import { NextRequest, NextResponse } from "next/server";
import { getComments } from "@/lib/queries/comments";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const comments = await getComments({
    taskId: Number(id),
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  });
  return NextResponse.json(comments);
}

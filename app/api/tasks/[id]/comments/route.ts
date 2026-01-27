import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { getCommentList } from "@/lib/data/comment/comment.service";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuthRouteHandler(async () => {
    // Validation
    const data = await params;

    const schema = z.object({
      id: coercedPositiveInt,
    });

    const parse = schema.safeParse({ id: data.id });
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const { id: taskId } = parse.data;

    // Data Fetching
    const comments = await getCommentList({
      taskId,
    });

    return NextResponse.json(comments);
  });
}

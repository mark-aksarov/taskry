import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getComments } from "@/lib/data/comment/comment.dal";
import { withAuthRouteHandler } from "@/lib/utils/withAuthRouteHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuthRouteHandler(async () => {
    // Validation
    const data = await params;

    const schema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const parse = schema.safeParse({ id: data.id });
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const { id: taskId } = parse.data;

    // Data Fetching
    const comments = await getComments({
      taskId,
    });

    return NextResponse.json(comments);
  });
}

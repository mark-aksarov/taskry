import z from "zod";
import { withAuth } from "@/lib/api/withAuth";
import { getComments } from "@/lib/dal/comments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(async (session) => {
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

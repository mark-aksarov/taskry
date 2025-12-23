import z from "zod";
import { getComments } from "@/lib/dal/comments";
import { NextRequest, NextResponse } from "next/server";
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
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const { id: projectId } = parse.data;

    // Fetch comments
    const comments = await getComments({
      projectId,
    });

    return NextResponse.json(comments);
  });
}

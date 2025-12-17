import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getComments } from "@/lib/dal/comments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Fetch comments
    const comments = await getComments({
      taskId,
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /task-comments error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

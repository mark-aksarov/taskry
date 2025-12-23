import z from "zod";
import { NextResponse, NextRequest } from "next/server";
import { getTaskDetail, getTaskFormData } from "@/lib/dal/task";
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

    const { id } = parse.data;

    // Fetch task
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const formData = await getTaskFormData(id);
      return NextResponse.json(formData);
    }

    const task = await getTaskDetail(id);

    return NextResponse.json(task);
  });
}

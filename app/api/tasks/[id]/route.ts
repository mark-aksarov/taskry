import z from "zod";
import { NextResponse, NextRequest } from "next/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { getTaskDetail } from "@/lib/data/task/task.service";
import { getTaskFormData } from "@/lib/data/task/task.service";
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

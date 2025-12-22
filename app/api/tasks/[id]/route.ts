import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskDetail, getTaskFormData } from "@/lib/dal/task";
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

    // Fetch project
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    const { id } = parse.data;

    if (view === "edit") {
      const formData = await getTaskFormData(id);
      return NextResponse.json(formData);
    }

    // Fetch task
    const task = await getTaskDetail(id);

    return NextResponse.json(task);
  } catch (error) {
    console.error("GET /task error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

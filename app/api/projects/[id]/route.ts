import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProjectDetail } from "@/lib/dal/project";
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
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const { id } = parse.data;

    // Fetch project
    const project = await getProjectDetail(id);

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET /project error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

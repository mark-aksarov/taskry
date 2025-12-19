import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getProjectDetail, getProjectFormData } from "@/lib/dal/project";

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

    // Fetch project
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    const { id } = parse.data;

    if (view === "edit") {
      const formData = await getProjectFormData(id);
      return NextResponse.json(formData);
    }

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

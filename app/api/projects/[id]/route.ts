import z from "zod";
import { withAuth } from "@/lib/api/withAuth";
import { NextResponse, NextRequest } from "next/server";
import { getProjectDetail, getProjectFormData } from "@/lib/dal/project";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(async (session) => {
    // Validation
    const rawParams = await params;
    const schema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const parse = schema.safeParse({ id: rawParams.id });
    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const { id } = parse.data;

    // Fetch project
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const formData = await getProjectFormData(id);
      return NextResponse.json(formData);
    }

    const project = await getProjectDetail(id);
    return NextResponse.json(project);
  });
}

import {
  notFound,
  badRequest,
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { projectId } from "@/lib/schemas/project";
import { NextResponse, NextRequest } from "next/server";
import { getProject } from "@/lib/data/project/project.dal";
import { getProjectDetail } from "@/lib/data/project/project.dal";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  try {
    // Parse and validate
    const rawParams = await params;
    const schema = z.object({
      id: projectId,
    });

    const parse = schema.safeParse({ id: rawParams.id });

    if (!parse.success) {
      return badRequest("Invalid project ID");
    }

    const { id } = parse.data;

    // Fetch project
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const project = await getProject(id);

      if (!project) {
        return notFound("Project not found");
      }

      return NextResponse.json(project);
    }

    const project = await getProjectDetail(id);

    if (!project) {
      return notFound("Project not found");
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}

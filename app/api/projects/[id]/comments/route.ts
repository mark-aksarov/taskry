import {
  badRequest,
  unauthorized,
  internalServerError,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { projectId } from "@/lib/schemas/project";
import { NextRequest, NextResponse } from "next/server";
import { getCommentList } from "@/lib/data/comment/comment.dal";

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
    const data = await params;

    const schema = z.object({
      id: projectId,
    });

    const parse = schema.safeParse({ id: data.id });

    if (!parse.success) {
      return badRequest("Invalid project ID");
    }

    // Fetch comments
    const comments = await getCommentList({
      projectId: parse.data.id,
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}

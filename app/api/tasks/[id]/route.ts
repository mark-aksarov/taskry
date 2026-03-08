import {
  badRequest,
  unauthorized,
  internalServerError,
  notFound,
} from "@/lib/utils/routeHandlerErrors";

import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { taskId } from "@/lib/schemas/task";
import { NextResponse, NextRequest } from "next/server";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { getTaskFormData } from "@/lib/data/task/task.dal";

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
      id: taskId,
    });

    const parse = schema.safeParse({ id: data.id });
    if (!parse.success) {
      return badRequest("Invalid task ID");
    }

    const { id } = parse.data;

    // Fetch task
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view");

    if (view === "edit") {
      const formData = await getTaskFormData(id);

      if (!formData) {
        return notFound("Task not found");
      }

      return NextResponse.json(formData);
    }

    const task = await getTaskDetail(id);

    if (!task) {
      return notFound("Task not found");
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("API Error:", error);
    return internalServerError();
  }
}

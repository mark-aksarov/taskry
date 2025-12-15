"use server";

import z from "zod";
import { auth } from "../auth";
import prisma from "../prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { DeleteProjectActionState } from "./types";

export async function deleteProjectAction(
  prevState: DeleteProjectActionState,
  id: number,
): Promise<DeleteProjectActionState> {
  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: {
        status: "Unauthorized",
      },
    };
  }

  // Validation
  const schema = z.object({
    id: z.number().min(1),
  });

  const data = schema.safeParse({ id });

  if (!data.success) {
    return {
      success: false,
      error: {
        status: "BadRequest",
      },
    };
  }

  // Find Project
  const workspaceId = session.user.workspaceId;

  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      workspaceId: true,
    },
  });

  if (!project) {
    return {
      success: false,
      error: {
        status: "NotFound",
      },
    };
  }

  // Check Permissions
  if (project.workspaceId !== workspaceId) {
    return {
      success: false,
      error: {
        status: "Forbidden",
      },
    };
  }

  // Delete
  await prisma.project.delete({
    where: {
      id,
    },
  });

  revalidatePath("/projects");

  return {
    success: true,
    error: null,
  };
}

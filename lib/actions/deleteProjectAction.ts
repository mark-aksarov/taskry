"use server";

import { auth } from "../auth";
import prisma from "../prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { DeleteProjectActionState } from "./types";
import { getWorkspaceIdByUserId } from "../queries/workspace";

export async function deleteProjectAction(
  prevState: DeleteProjectActionState,
  id: number,
): Promise<DeleteProjectActionState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: {
        status: "Unauthenticated",
      },
    };
  }

  const workspaceId = await getWorkspaceIdByUserId(session.user.id);

  if (!workspaceId) {
    return {
      success: false,
      error: {
        status: "InternalServerError",
      },
    };
  }

  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      customer: {
        select: {
          company: {
            select: {
              workspaceId: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    return {
      success: false,
      error: {
        status: "InternalServerError",
      },
    };
  }

  const projectWorkspaceId = project.customer?.company.workspaceId;

  if (projectWorkspaceId !== workspaceId) {
    return {
      success: false,
      error: {
        status: "InternalServerError",
      },
    };
  }

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

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { CreateSubtaskInputDTO } from "./subtask.dto";
import { requireSession } from "../utils/requireSession";

export const createSubtask = async (input: CreateSubtaskInputDTO) => {
  // Authorization
  const {
    user: { id: creatorId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: creatorId,
      permission: {
        subtask: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create subtask.",
    );
  }

  // Check related resources access
  await checkSubtaskResourcesAccess(workspaceId, input.taskId);

  const subtask = await prisma.subtask.create({
    data: {
      text: input.text,
      taskId: input.taskId,
      isDone: false,
    },
  });

  return subtask;
};

/**
 * HELPERS
 */

async function checkSubtaskResourcesAccess(
  workspaceId: number,
  taskId: number,
) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      workspaceId,
    },
  });

  if (!task) {
    throw new AccessDeniedError("Task access denied or not found");
  }
}

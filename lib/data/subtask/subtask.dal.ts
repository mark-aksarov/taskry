import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { requireSession } from "../utils/requireSession";
import { AccessDeniedError, NotFoundError } from "../utils/error";
import { CreateSubtaskInputDTO, UpdateSubtaskInputDTO } from "./subtask.dto";

export const createSubtask = async (input: CreateSubtaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
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

  // Validate task
  await validateTask(workspaceId, input.taskId);

  // Create subtask
  const subtask = await prisma.subtask.create({
    data: {
      text: input.text,
      taskId: input.taskId,
      isDone: false,
    },
    select: {
      id: true,
      text: true,
      isDone: true,
      taskId: true,

      task: {
        select: {
          title: true,
        },
      },
    },
  });

  return subtask;
};

export const updateSubtask = async (input: UpdateSubtaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        subtask: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update subtask.",
    );
  }

  // Update subtask
  const updatedSubtask = await prisma.subtask.update({
    where: {
      id: input.id,
      task: { workspaceId },
    },
    data: {
      text: input.text,
      isDone: input.isDone,
    },
    select: {
      id: true,
      text: true,
      isDone: true,
      taskId: true,

      task: {
        select: {
          title: true,
        },
      },
    },
  });
  return updatedSubtask;
};

export const deleteSubtask = async (id: number) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        subtask: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete subtask.",
    );
  }

  const deletedSubtask = await prisma.subtask.delete({
    where: {
      id,
      task: { workspaceId },
    },
    select: {
      text: true,
      isDone: true,
      taskId: true,

      task: {
        select: {
          title: true,
        },
      },
    },
  });

  return deletedSubtask;
};

/**
 * HELPERS
 */

// Validate that task exists and belongs to the workspace
async function validateTask(workspaceId: number, taskId: number) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { workspaceId: true },
  });

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  if (task.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Task access denied");
  }
}

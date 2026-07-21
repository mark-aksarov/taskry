import {
  mapToSubtaskDTO,
  CreateSubtaskInputDTO,
  UpdateSubtaskInputDTO,
} from "./subtask.dto";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { validateTasks } from "../utils/validation";
import { requireSession } from "../utils/requireSession";

export const createSubtask = async (input: CreateSubtaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
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
  await validateTasks(workspaceId, [input.taskId]);

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

  return mapToSubtaskDTO(subtask);
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

  return mapToSubtaskDTO(updatedSubtask);
};

export const deleteSubtask = async (id: number) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
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

  return mapToSubtaskDTO(deletedSubtask);
};

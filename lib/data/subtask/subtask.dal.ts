import {
  SubtaskDTO,
  CreateSubtaskInputDTO,
  UpdateSubtaskInputDTO,
} from "./subtask.dto";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { validateTasks } from "../utils/validation";
import { Subtask } from "@/generated/prisma/client";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";

export const createSubtask = async (input: CreateSubtaskInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        subtask: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create subtask.",
    );
  }

  // Validate task
  await validateTasks(organizationId, [input.taskId]);

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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        subtask: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update subtask.",
    );
  }

  // Update subtask
  const updatedSubtask = await prisma.subtask.update({
    where: {
      id: input.id,
      task: { organizationId },
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        subtask: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete subtask.",
    );
  }

  const deletedSubtask = await prisma.subtask.delete({
    where: {
      id,
      task: { organizationId },
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

/**
 * Helpers
 */

function mapToSubtaskDTO(
  subtask: Pick<Subtask, "id" | "text" | "isDone" | "taskId">,
): SubtaskDTO {
  return {
    id: subtask.id,
    text: subtask.text,
    isDone: subtask.isDone,
    taskId: subtask.taskId,
  };
}

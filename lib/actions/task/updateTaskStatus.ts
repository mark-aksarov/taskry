"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { taskId, taskStatus } from "@/lib/schemas/task";
import { ActionState, UpdateTaskStatusPayload } from "../types";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  id: taskId,
  nextStatus: taskStatus,
});

export async function updateTaskStatus(
  payload: UpdateTaskStatusPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("task.updateStatus.error.internalServerError");

  // Validation
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  const { id, nextStatus } = result.data;

  // Update task
  try {
    await updateTaskStatusesQuery([id], nextStatus);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("task.updateStatus.success"),
  };
}

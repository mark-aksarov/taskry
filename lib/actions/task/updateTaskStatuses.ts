"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { taskId, taskStatus } from "@/lib/schemas/task";
import { ActionState, UpdateTaskStatusesPayload } from "../types";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(taskId).min(1),
  nextStatus: taskStatus,
});

export async function updateTaskStatuses(
  payload: UpdateTaskStatusesPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "task.updateStatuses.error.internalServerError",
  );

  // Validation
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  const { ids, nextStatus } = result.data;

  // Update task
  try {
    await updateTaskStatusesQuery(ids, nextStatus);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("task.updateStatuses.success"),
  };
}

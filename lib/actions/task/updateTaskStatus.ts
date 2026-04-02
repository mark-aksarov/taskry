"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { taskId, taskStatus } from "@/lib/schemas/task";
import { ActionState, UpdateTaskStatusPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  id: taskId,
  nextStatus: taskStatus,
});

export async function updateTaskStatus(
  payload: UpdateTaskStatusPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    const result = await updateTaskStatusesQuery(
      [parsedData.id],
      parsedData.nextStatus,
    );

    if (!result.length) {
      return {
        status: "error",
        message: t("task.updateStatus.error.internalServerError"),
      };
    }

    return {
      status: "success",
      message: t("task.updateStatus.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.updateStatus.error.internalServerError"),
    };
  }
}

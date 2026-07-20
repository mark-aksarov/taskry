"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { taskId, taskStatus } from "@/lib/schemas/task";
import { ActionState, UpdateTaskStatusesPayload } from "../types";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(taskId).min(1),
  nextStatus: taskStatus,
});

export async function updateTaskStatuses(
  payload: UpdateTaskStatusesPayload,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    await updateTaskStatusesQuery(parsedData.ids, parsedData.nextStatus);

    return {
      status: "success",
      message: t("task.updateStatuses.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.updateStatuses.error.internalServerError"),
    };
  }
}

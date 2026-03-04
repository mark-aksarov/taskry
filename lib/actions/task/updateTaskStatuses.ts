"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { taskId, taskStatus } from "@/lib/schemas/task";
import { ActionState, UpdateTaskStatusesPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(taskId).min(1),
  nextStatus: taskStatus,
});

export async function updateTaskStatuses(
  _prevState: ActionState,
  payload: UpdateTaskStatusesPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    await updateTaskStatusesQuery(parsedData.ids, parsedData.nextStatus);
    revalidatePath("/tasks");

    return {
      status: "success",
      message: t("task.updateStatus.success.many"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.updateStatus.error.many"),
    };
  }
}

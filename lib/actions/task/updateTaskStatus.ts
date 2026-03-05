"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
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
  _prevState: ActionState,
  payload: UpdateTaskStatusPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    await updateTaskStatusesQuery([parsedData.id], parsedData.nextStatus);
    revalidatePath("/");

    return {
      status: "success",
      message: t("task.updateStatus.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.updateStatus.error.one"),
    };
  }
}

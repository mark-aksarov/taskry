"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { TaskStatus } from "@/generated/prisma/enums";
import { taskId, taskStatus } from "@/lib/schemas/task";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(taskId).min(1),
  nextStatus: taskStatus,
});

export async function updateTaskStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: TaskStatus },
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];
  try {
    const parsedData = schema.parse({ ids, nextStatus });
    parsedIds = parsedData.ids;
    await updateTaskStatusesQuery(parsedData.ids, parsedData.nextStatus);
    revalidatePath("/tasks");

    return {
      status: "success",
      message:
        parsedIds.length > 1
          ? t("task.updateStatus.success.many")
          : t("task.updateStatus.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("task.updateStatus.error.many")
          : t("task.updateStatus.error.one"),
    };
  }
}

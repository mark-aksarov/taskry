"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { taskId } from "@/lib/schemas/task";
import { redirect } from "@/i18n/navigation";
import { ActionState, DeleteTasksPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { deleteTasks as deleteTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const taskIds = z.array(taskId).min(1);

export async function deleteTasks(
  _prevState: ActionState,
  payload: DeleteTasksPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];
  try {
    parsedIds = taskIds.parse(payload.ids);

    await deleteTaskQuery(parsedIds);
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("task.delete.error.many")
          : t("task.delete.error.one"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/tasks", locale });
  }

  return {
    status: "success",
    message:
      parsedIds.length > 1
        ? t("task.delete.success.many")
        : t("task.delete.success.one"),
  };
}

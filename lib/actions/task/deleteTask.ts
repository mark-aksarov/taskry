"use server";

import { taskId } from "@/lib/schemas/task";
import { redirect } from "@/i18n/navigation";
import { ActionState, DeleteTaskPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { deleteTasks as deleteTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function deleteTask(
  _prevState: ActionState,
  payload: DeleteTaskPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = taskId.parse(payload.id);

    await deleteTaskQuery([parsedId]);
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.delete.error.internalServerError"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/tasks", locale });
  }

  return {
    status: "success",
    message: t("task.delete.success"),
  };
}

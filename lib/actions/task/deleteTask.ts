"use server";

import { taskId } from "@/lib/schemas/task";
import { redirect } from "@/i18n/navigation";
import { ActionState, DeleteTaskPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { deleteTasks as deleteTaskQuery } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

export async function deleteTask(
  payload: DeleteTaskPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("task.delete.error.internalServerError");

  // Validation
  const result = taskId.safeParse(payload.id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete task
  try {
    await deleteTaskQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Success
  const locale = await getLocale();

  // Redirect to tasks page when task is deleted from details page
  if (payload.shouldRedirect) {
    redirect({ href: "/tasks", locale });
  }

  return {
    status: "success",
    message: t("task.delete.success"),
  };
}

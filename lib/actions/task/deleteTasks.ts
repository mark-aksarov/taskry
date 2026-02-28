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

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const t = await getTranslations("actions");

  try {
    const parsedIds = taskIds.parse(payload.ids);

    await deleteTaskQuery(parsedIds);
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("deleteTask.error.internalServerError"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/tasks", locale });
  }

  return {
    status: "success",
  };
}

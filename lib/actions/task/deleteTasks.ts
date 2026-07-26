"use server";

import z from "zod";
import { ActionState } from "../types";
import { taskId } from "@/lib/schemas/task";
import { getTranslations } from "next-intl/server";
import { deleteTasks as deleteTaskQuery } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const taskIds = z.array(taskId).min(1);

export async function deleteTasks(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("task.deleteMany.error.internalServerError");

  // Validation
  const result = taskIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete tasks
  try {
    await deleteTaskQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("task.deleteMany.success"),
  };
}

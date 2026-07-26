"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteTaskCategories as deleteTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const taskCategoryIds = z.array(taskCategoryId).min(1);

export async function deleteTaskCategories(
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "taskCategory.deleteMany.error.internalServerError",
  );

  // Validation
  const result = taskCategoryIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete task categories
  try {
    await deleteTaskCategoriesQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("taskCategory.deleteMany.success"),
  };
}

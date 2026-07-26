"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteTaskCategories as deleteTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

export async function deleteTaskCategory(id: number): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "taskCategory.delete.error.internalServerError",
  );

  // Validation
  const result = taskCategoryId.safeParse(id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete task category
  try {
    await deleteTaskCategoriesQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("taskCategory.delete.success"),
  };
}

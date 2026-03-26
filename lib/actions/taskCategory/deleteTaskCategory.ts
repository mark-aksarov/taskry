"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteTaskCategories as deleteTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

export async function deleteTaskCategory(id: number): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = taskCategoryId.parse(id);

    await deleteTaskCategoriesQuery([parsedId]);

    return {
      status: "success",
      message: t("taskCategory.delete.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("taskCategory.delete.error.internalServerError"),
    };
  }
}

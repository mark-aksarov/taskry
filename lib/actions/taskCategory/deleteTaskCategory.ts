"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteTaskCategories as deleteTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

export async function deleteTaskCategory(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = taskCategoryId.parse(id);

    await deleteTaskCategoriesQuery([parsedId]);
    revalidatePath("/task-categories");

    return {
      status: "success",
      message: t("taskCategory.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("taskCategory.delete.error.one"),
    };
  }
}

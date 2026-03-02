"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteTaskCategories as deleteTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const taskCategoryIds = z.array(taskCategoryId).min(1);

export async function deleteTaskCategories(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];
  try {
    parsedIds = taskCategoryIds.parse(ids);

    await deleteTaskCategoriesQuery(parsedIds);
    revalidatePath("/task-categories");

    return {
      status: "success",
      message:
        parsedIds.length > 1
          ? t("taskCategory.delete.success.many")
          : t("taskCategory.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("taskCategory.delete.error.many")
          : t("taskCategory.delete.error.one"),
    };
  }
}

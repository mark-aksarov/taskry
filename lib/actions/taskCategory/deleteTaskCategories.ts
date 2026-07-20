"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteTaskCategories as deleteTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const taskCategoryIds = z.array(taskCategoryId).min(1);

export async function deleteTaskCategories(
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedIds = taskCategoryIds.parse(ids);

    await deleteTaskCategoriesQuery(parsedIds);

    return {
      status: "success",
      message: t("taskCategory.deleteMany.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("taskCategory.deleteMany.error.internalServerError"),
    };
  }
}

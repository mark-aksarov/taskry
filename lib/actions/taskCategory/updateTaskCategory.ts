"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryId, taskCategoryName } from "@/lib/schemas/taskCategory";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateTaskCategory as updateTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.object({
  id: taskCategoryId,
  name: taskCategoryName,
});

export async function updateTaskCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Update task category
  try {
    await updateTaskCategoryQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("taskCategory.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("taskCategory.update.success"),
  };
}

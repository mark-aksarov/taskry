"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { LimitExceededError } from "@/lib/data/utils/error";
import { taskCategoryName } from "@/lib/schemas/taskCategory";
import { TASK_CATEGORY_MAX_COUNT } from "@/lib/data/constants";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createTaskCategories as createTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.object({ name: taskCategoryName });

export async function createTaskCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const result = schema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create task category
  try {
    await createTaskCategoriesQuery([result.data]);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("taskCategory.create.error.limitExceededError", {
          count: TASK_CATEGORY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("taskCategory.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("taskCategory.create.success"),
  };
}

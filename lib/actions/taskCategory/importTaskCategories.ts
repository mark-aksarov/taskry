"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError } from "@/lib/data/utils/error";
import { taskCategoryName } from "@/lib/schemas/taskCategory";
import { TASK_CATEGORY_MAX_COUNT } from "@/lib/data/constants";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createTaskCategories as createTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.array(z.object({ name: taskCategoryName })).min(1);

export async function importTaskCategories(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "taskCategory.import.error.internalServerError",
  );

  // Extract file from form data
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Parse and validate CSV data
  const result = await parseCsvFile(file, schema);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Create task categories
  try {
    await createTaskCategoriesQuery(result.data);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("taskCategory.import.error.limitExceededError", {
          count: TASK_CATEGORY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("taskCategory.import.success"),
  };
}

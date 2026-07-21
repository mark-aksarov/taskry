"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { LimitExceededError } from "@/lib/data/utils/error";
import { taskCategoryName } from "@/lib/schemas/taskCategory";
import { TASK_CATEGORY_MAX_COUNT } from "@/lib/data/constants";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createTaskCategories as createTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.object({ name: taskCategoryName });

export async function createTaskCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse({
      name: formData.get("name"),
    });

    await createTaskCategoriesQuery([parsedData]);

    return {
      status: "success",
      message: t("taskCategory.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
}

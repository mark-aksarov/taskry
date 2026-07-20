"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryName } from "@/lib/schemas/taskCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createTaskCategory as createTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";
import { LimitExceededError } from "@/lib/data/utils/error";
import { TASK_CATEGORY_MAX_COUNT } from "@/lib/data/constants";

const schema = z.object({ name: taskCategoryName });

export async function createTaskCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse({
      name: formData.get("name"),
    });

    await createTaskCategoryQuery(parsedData);

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

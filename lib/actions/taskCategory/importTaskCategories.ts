"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError } from "@/lib/data/utils/error";
import { taskCategoryName } from "@/lib/schemas/taskCategory";
import { TASK_CATEGORY_MAX_COUNT } from "@/lib/data/constants";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createTaskCategories as createTaskCategoriesQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.array(z.object({ name: taskCategoryName }).strict()).min(1);

export async function importTaskCategories(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createTaskCategoriesQuery(parsedData);

    return {
      status: "success",
      message: t("taskCategory.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
      message: t("taskCategory.import.error.internalServerError"),
    };
  }
}

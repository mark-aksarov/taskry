"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createTaskSchema } from "@/lib/schemas/task";
import { TASK_MAX_COUNT } from "@/lib/data/constants";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError } from "@/lib/data/utils/error";
import { createTasks as createTasksQuery } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const schema = z.array(createTaskSchema.strict()).min(1);

export async function importTasks(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("task.import.error.internalServerError");

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

  // Create tasks
  try {
    await createTasksQuery(result.data);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("task.import.error.limitExceededError", {
          count: TASK_MAX_COUNT,
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
    message: t("task.import.success"),
  };
}

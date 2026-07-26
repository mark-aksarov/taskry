"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createTaskSchema } from "@/lib/schemas/task";
import { TASK_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { createTasks as createTasksQuery } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

export async function createTask(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = createTaskSchema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create task
  try {
    await createTasksQuery([result.data]);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("task.create.error.limitExceededError", {
          count: TASK_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("task.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("task.create.success"),
  };
}

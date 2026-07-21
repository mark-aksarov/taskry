"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createTaskSchema } from "@/lib/schemas/task";
import { TASK_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { createTasks as createTasksQuery } from "@/lib/data/task/task.dal";
import { requireActionSession } from "@/lib/utils/requireActionSession";

export async function createTask(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = createTaskSchema.parse(input);
    await createTasksQuery([parsedData]);

    return {
      status: "success",
      message: t("task.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
}

"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createTaskSchema } from "@/lib/schemas/task";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError } from "@/lib/data/utils/error";
import { PROJECT_MAX_COUNT, TASK_MAX_COUNT } from "@/lib/data/constants";
import { createTasks as createTasksQuery } from "@/lib/data/task/task.dal";
import { requireActionSession } from "@/lib/utils/requireActionSession";

const schema = z.array(createTaskSchema.strict()).min(1);

export async function importTasks(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createTasksQuery(parsedData);

    return {
      status: "success",
      message: t("task.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
      message: t("task.import.error.internalServerError"),
    };
  }
}

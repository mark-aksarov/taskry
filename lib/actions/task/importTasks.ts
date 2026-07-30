"use server";

import z from "zod";
import { ActionState } from "../types";
import { userEmail } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { projectTitle } from "@/lib/schemas/project";
import { createTaskSchema } from "@/lib/schemas/task";
import { TASK_MAX_COUNT } from "@/lib/data/constants";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError, NotFoundError } from "@/lib/data/utils/error";
import { emptyStringToUndefined } from "@/lib/schemas/base";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { projectCategoryName } from "@/lib/schemas/projectCategory";
import { importTasks as importTasksQuery } from "@/lib/data/task/task.dal";

const schema = z
  .array(
    createTaskSchema
      .omit({ projectId: true, categoryId: true, assigneeId: true })
      .extend({
        projectTitle: z.preprocess(
          emptyStringToUndefined,
          projectTitle.optional(),
        ),
        categoryName: z.preprocess(
          emptyStringToUndefined,
          projectCategoryName.optional(),
        ),
        assigneeEmail: z.preprocess(
          emptyStringToUndefined,
          userEmail.optional(),
        ),
      })
      .strict(),
  )
  .min(1);

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
    await importTasksQuery(result.data);
  } catch (error) {
    console.log(error);

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        message: t("task.import.error.notFoundError"),
      };
    }

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

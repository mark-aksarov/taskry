"use server";

import {
  taskId,
  taskTitle,
  taskStatus,
  taskDeadline,
  taskDescription,
} from "@/lib/schemas/task";

import z from "zod";
import { ActionState } from "../types";
import { userId } from "@/lib/schemas/user";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { emptyStringToNull } from "@/lib/schemas/base";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const schema = z.object({
  id: taskId,
  title: taskTitle.optional(),
  description: z
    .preprocess(emptyStringToNull, taskDescription.nullable())
    .optional(),
  deadline: taskDeadline.optional(),
  status: taskStatus.optional(),
  projectId: z.preprocess(emptyStringToNull, projectId.nullable()).optional(),
  categoryId: z
    .preprocess(emptyStringToNull, taskCategoryId.nullable())
    .optional(),
  assigneeId: z.preprocess(emptyStringToNull, userId.nullable()).optional(),
});

export async function updateTask(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Update task
  try {
    await updateTaskQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("task.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("task.update.success"),
  };
}

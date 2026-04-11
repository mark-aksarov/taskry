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
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

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
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateTaskQuery(parsedData);

    return {
      status: "success",
      message: t("task.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.update.error.internalServerError"),
    };
  }
}

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
import { NotFoundError } from "@/lib/data/utils/error";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  id: taskId,
  title: taskTitle,
  description: z.preprocess(emptyStringToNull, taskDescription.nullable()),
  deadline: taskDeadline,
  status: taskStatus,
  projectId: z.preprocess(emptyStringToNull, projectId.nullable()),
  categoryId: z.preprocess(emptyStringToNull, taskCategoryId.nullable()),
  assigneeId: z.preprocess(emptyStringToNull, userId.nullable()),
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

    if (error instanceof NotFoundError) {
      if (error.code === "taskNotFound") {
        return {
          status: "error",
          errorCode: "notFound",
          message: t("task.common.error.notFound"),
        };
      } else {
        return {
          status: "error",
          errorCode: "badRequest",
          message: t("task.common.error.relationNotFound"),
        };
      }
    }

    return {
      status: "error",
      errorCode: "internalServerError",
      message: t("task.update.error.internalServerError"),
    };
  }
}

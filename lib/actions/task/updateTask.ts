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
import { revalidatePath } from "next/cache";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { emptyStringToNull } from "@/lib/schemas/base";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  id: taskId,
  title: taskTitle,
  description: z.preprocess(emptyStringToNull, taskDescription.nullable()),
  deadline: taskDeadline,
  status: taskStatus,
  projectId,
  categoryId: z.preprocess(emptyStringToNull, taskCategoryId.nullable()),
  assigneeId: z.preprocess(emptyStringToNull, userId.nullable()),
});

export async function updateTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateTaskQuery(parsedData);
    revalidatePath("/");

    return {
      status: "success",
      message: t("task.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.update.error"),
    };
  }
}

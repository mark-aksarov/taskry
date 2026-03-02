"use server";

import {
  taskTitle,
  taskStatus,
  taskDeadline,
  taskDescription,
} from "@/lib/schemas/task";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { userId } from "@/lib/schemas/user";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { emptyStringToUndefined } from "@/lib/schemas/base";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { createTask as createTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  title: taskTitle,
  description: z.preprocess(emptyStringToUndefined, taskDescription.optional()),
  deadline: taskDeadline,
  status: taskStatus,
  projectId,
  categoryId: z.preprocess(emptyStringToUndefined, taskCategoryId.optional()),
  assigneeId: z.preprocess(emptyStringToUndefined, userId.optional()),
});

export async function createTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await createTaskQuery(parsedData);
    revalidatePath("/tasks");

    return {
      status: "success",
      message: t("task.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.create.error"),
    };
  }
}

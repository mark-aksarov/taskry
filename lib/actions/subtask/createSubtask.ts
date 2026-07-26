"use server";

import z from "zod";
import { ActionState } from "../types";
import { taskId } from "@/lib/schemas/task";
import { getTranslations } from "next-intl/server";
import { subtaskText } from "@/lib/schemas/subtask";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createSubtask as createSubtaskQuery } from "@/lib/data/subtask/subtask.dal";

const schema = z.object({
  text: subtaskText,
  taskId: taskId,
});

export async function createSubtask(formData: FormData): Promise<ActionState> {
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

  // Create subtask
  try {
    await createSubtaskQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("subtask.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("subtask.create.success"),
  };
}

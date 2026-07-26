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

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await createSubtaskQuery(parsedData);

    return {
      status: "success",
      message: t("subtask.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("subtask.create.error.internalServerError"),
    };
  }
}

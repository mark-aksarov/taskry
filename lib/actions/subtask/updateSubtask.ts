"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { subtaskId, subtaskText } from "@/lib/schemas/subtask";
import { updateSubtask as updateSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const schema = z.object({
  id: subtaskId,
  text: subtaskText,
});

export async function updateSubtask(formData: FormData): Promise<ActionState> {
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

  // Update subtask
  try {
    await updateSubtaskQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("subtask.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("subtask.update.success"),
  };
}

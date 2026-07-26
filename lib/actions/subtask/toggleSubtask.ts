"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { ActionState, ToggleSubtaskPayload } from "../types";
import { subtaskId, subtaskIsDone } from "@/lib/schemas/subtask";
import { updateSubtask as updateSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const schema = z.object({
  id: subtaskId,
  isDone: subtaskIsDone,
});

export async function toggleSubtask(
  data: ToggleSubtaskPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "subtask.updateStatus.error.internalServerError",
  );

  // Validation
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      // This id and isDone does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Update subtask
  try {
    await updateSubtaskQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("subtask.updateStatus.success"),
  };
}

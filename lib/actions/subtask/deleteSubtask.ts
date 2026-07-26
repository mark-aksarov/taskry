"use server";

import { ActionState } from "../types";
import { subtaskId } from "@/lib/schemas/subtask";
import { getTranslations } from "next-intl/server";
import { deleteSubtask as deleteSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

export async function deleteSubtask(id: number): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("subtask.delete.error.internalServerError");

  // Validation
  const result = subtaskId.safeParse(id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete subtask
  try {
    await deleteSubtaskQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("subtask.delete.success"),
  };
}

"use server";

import { ActionState } from "../types";
import { subtaskId } from "@/lib/schemas/subtask";
import { getTranslations } from "next-intl/server";
import { deleteSubtask as deleteSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireActionSession } from "@/lib/utils/requireActionSession";

export async function deleteSubtask(id: number): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedId = subtaskId.parse(id);

    await deleteSubtaskQuery(parsedId);

    return {
      status: "success",
      message: t("subtask.delete.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("subtask.delete.error.internalServerError"),
    };
  }
}

"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { subtaskId } from "@/lib/schemas/subtask";
import { getTranslations } from "next-intl/server";
import { deleteSubtask as deleteSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function deleteSubtask(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = subtaskId.parse(id);

    const result = await deleteSubtaskQuery(parsedId);
    revalidatePath("/");

    return {
      status: "success",
      message: t("subtask.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("subtask.delete.error.one"),
    };
  }
}

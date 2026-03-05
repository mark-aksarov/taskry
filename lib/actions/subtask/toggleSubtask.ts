"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { ActionState, ToggleSubtaskPayload } from "../types";
import { subtaskId, subtaskIsDone } from "@/lib/schemas/subtask";
import { updateSubtask as updateSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  id: subtaskId,
  isDone: subtaskIsDone,
});

export async function toggleSubtask(
  _prevState: ActionState,
  data: ToggleSubtaskPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(data);
    const result = await updateSubtaskQuery(parsedData);
    revalidatePath("/");

    return {
      status: "success",
      message: t("subtask.updateStatus.error"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("subtask.updateStatus.error"),
    };
  }
}

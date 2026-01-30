"use server";

import { ActionState, ToggleSubtaskPayload } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { subtaskSchema } from "@/lib/schemas/subtask";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateSubtask as updateSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = subtaskSchema.pick({ id: true, isDone: true });

export async function toggleSubtask(
  _prevState: ActionState,
  data: ToggleSubtaskPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Execute update
    const result = await updateSubtaskQuery(parsed.data);

    // Revalidation
    revalidatePath(`/tasks/${result.taskId}`);

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

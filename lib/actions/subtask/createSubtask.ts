"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { subtaskSchema } from "@/lib/schemas/subtask";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createSubtask as createSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = subtaskSchema.omit({ id: true });

export async function createSubtask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Execute create
    await createSubtaskQuery(parsed.data);

    // Revalidation
    revalidatePath(`/tasks/${parsed.data.taskId}`);

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

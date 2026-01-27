"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskSchema } from "@/lib/schemas/task";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";

export async function updateTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = validateActionInput(taskSchema, input);

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    // Execute update
    await updateTaskQuery(parsed.data);

    // Revalidation
    revalidatePath("/tasks");

    return actionSuccess();
  });
}

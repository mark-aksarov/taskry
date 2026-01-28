"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskSchema } from "@/lib/schemas/task";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function updateTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = taskSchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Execute update
    await updateTaskQuery(parsed.data);

    // Revalidation
    revalidatePath("/tasks");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

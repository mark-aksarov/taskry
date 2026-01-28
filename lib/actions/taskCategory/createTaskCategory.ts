"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { taskCategorySchema } from "@/lib/schemas/taskCategory";
import { actionError, actionSuccess } from "../utils/actionResult";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createTaskCategory as createTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";

export async function createTaskCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = taskCategorySchema.safeParse({ name: formData.get("name") });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Create task
    await createTaskCategoryQuery(parsed.data);
    revalidatePath("/Tasks");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

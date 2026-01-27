"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { taskCategorySchema } from "@/lib/schemas/taskCategory";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createTaskCategory as createTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";

export async function createTaskCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(taskCategorySchema, {
      name: formData.get("name"),
    });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await createTaskCategoryQuery(parsed.data);
    revalidatePath("/Tasks");

    return actionSuccess();
  });
}

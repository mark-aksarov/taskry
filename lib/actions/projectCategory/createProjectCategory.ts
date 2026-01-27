"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { projectCategorySchema } from "@/lib/schemas/projectCategory";
import { createProjectCategory as createProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function createProjectCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(projectCategorySchema, {
      name: formData.get("name"),
    });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await createProjectCategoryQuery(parsed.data);
    revalidatePath("/projects");

    return actionSuccess();
  });
}

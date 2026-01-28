"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { projectCategorySchema } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createProjectCategory as createProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function createProjectCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = projectCategorySchema.safeParse({
      name: formData.get("name"),
    });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Create project
    await createProjectCategoryQuery(parsed.data);
    revalidatePath("/projects");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

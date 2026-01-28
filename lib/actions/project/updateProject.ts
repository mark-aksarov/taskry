"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { projectSchema } from "@/lib/schemas/project";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function updateProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = projectSchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Update project
    await updateProjectQuery(parsed.data);
    revalidatePath("/projects");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

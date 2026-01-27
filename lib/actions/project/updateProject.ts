"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { projectSchema } from "@/lib/schemas/project";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";

export async function updateProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const input = Object.fromEntries(formData.entries());
    const parsed = validateActionInput(projectSchema, input);

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await updateProjectQuery(parsed.data);
    revalidatePath("/projects");

    return actionSuccess();
  });
}

"use server";

import z from "zod";
import { ActionState } from "./types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createProjectCategory as createProjectCategoryQuery } from "../dal/project";

const schema = z.object({
  name: z.string().min(1).max(255),
});

export async function createProjectCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, {
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

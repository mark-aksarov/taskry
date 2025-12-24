"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date().optional(),
  status: z.enum(["active", "completed", "pending"]).optional(),
  categoryId: z.coerce.number().optional(),
  customerId: z.coerce.number().optional(),
});

export async function updateProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const input = Object.fromEntries(formData.entries());
    const parsed = validateActionInput(schema, input);

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await updateProjectQuery(parsed.data);
    revalidatePath("/projects");

    return actionSuccess();
  });
}

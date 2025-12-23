"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createProject as createProjectQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date(),
  status: z.enum(["active", "completed", "pending"]),
  categoryId: z.coerce.number(),
  customerId: z.coerce.number().optional(),
});

export async function createProject(
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

    await createProjectQuery(parsed.data);
    revalidatePath("/projects");

    return actionSuccess();
  });
}

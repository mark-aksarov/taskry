"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { TaskStatus } from "@/generated/prisma/enums";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date().optional(),
  status: z.enum(TaskStatus).optional(),
  categoryId: z.coerce.number().optional(),
  projectId: z.coerce.number().optional(),
  assigneeId: z.coerce.string().optional(),
});

export async function updateTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = validateActionInput(schema, input);

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    // Execute update
    await updateTaskQuery(parsed.data);

    // Revalidation
    revalidatePath("/tasks");

    return actionSuccess();
  });
}

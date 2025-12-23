"use server";

import z from "zod";
import { ActionState } from "./types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { TaskStatus } from "@/generated/prisma/enums";
import { withAuthAction } from "../utils/withAuthAction";
import { updateTask as updateTaskQuery } from "../dal/task";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date(),
  status: z.enum(TaskStatus),
  categoryId: z.coerce.number(),
  projectId: z.coerce.number(),
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

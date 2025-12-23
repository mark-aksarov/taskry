"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { TaskStatus } from "@/generated/prisma/enums";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
  nextStatus: z.enum(TaskStatus),
});

export async function updateTaskStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: TaskStatus },
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    // Validation
    const parsed = validateActionInput(schema, { ids, nextStatus });

    if (!parsed.success) {
      return actionError(t("error"));
    }

    // Execute update
    await updateTaskStatusesQuery(parsed.data.ids, parsed.data.nextStatus);

    // Revalidation
    revalidatePath("/tasks");

    return actionSuccess();
  });
}

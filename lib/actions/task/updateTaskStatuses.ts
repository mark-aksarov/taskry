"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { taskStatusParam } from "@/lib/schemas/task";
import { TaskStatus } from "@/generated/prisma/enums";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { actionError, actionSuccess } from "../utils/actionResult";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1),
  nextStatus: taskStatusParam,
});

export async function updateTaskStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: TaskStatus },
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids, nextStatus });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Update tasks
    await updateTaskStatusesQuery(parsed.data.ids, parsed.data.nextStatus);

    revalidatePath("/tasks");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

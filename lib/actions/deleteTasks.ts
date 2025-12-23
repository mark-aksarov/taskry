"use server";

import z from "zod";
import { ActionState } from "./types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteTasks as deleteTasksQuery } from "../data/task/task.dal";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
});

export async function deleteTasks(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, { ids });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await deleteTasksQuery(parsed.data.ids);
    revalidatePath("/tasks");

    return actionSuccess();
  });
}

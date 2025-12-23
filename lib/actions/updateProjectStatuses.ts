"use server";

import z from "zod";
import { ActionState } from "./types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { ProjectStatus } from "@/generated/prisma/enums";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateProjectStatuses as updateProjectStatusesQuery } from "../dal/project";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
  nextStatus: z.enum(ProjectStatus),
});

export async function updateProjectStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: ProjectStatus },
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    // Validation
    const parsed = validateActionInput(schema, { ids, nextStatus });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    // Execute update
    await updateProjectStatusesQuery(parsed.data.ids, parsed.data.nextStatus);

    // Revalidation
    revalidatePath("/projects");

    return actionSuccess();
  });
}

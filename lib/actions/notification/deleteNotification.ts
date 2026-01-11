"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteNotification as deleteNotificationQuery } from "@/lib/data/notification/notification.dal";

const schema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function deleteNotification(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, { id });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await deleteNotificationQuery(parsed.data.id);

    return actionSuccess();
  });
}

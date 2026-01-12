"use server";

import z from "zod";
import { ActionState, MarkAsReadPayload } from "../types";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { markNotificationsAsRead as markNotificationsAsReadQuery } from "@/lib/data/notification/notification.dal";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1).nullable(),
});

export async function markNotificationsAsRead(
  _prevState: ActionState,
  ids: MarkAsReadPayload,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, { ids });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await markNotificationsAsReadQuery(parsed.data.ids);

    return actionSuccess();
  });
}

"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { withAuthAction } from "../utils/withAuthAction";
import { ActionState, MarkAsReadPayload } from "../types";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { markNotificationsAsRead as markNotificationsAsReadQuery } from "@/lib/data/notification/notification.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1).nullable(),
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

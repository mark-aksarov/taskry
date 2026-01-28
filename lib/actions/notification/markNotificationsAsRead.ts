"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { ActionState, MarkAsReadPayload } from "../types";
import { actionError, actionSuccess } from "../utils/actionResult";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { markNotificationsAsRead as markNotificationsAsReadQuery } from "@/lib/data/notification/notification.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1).nullable(),
});

export async function markNotificationsAsRead(
  _prevState: ActionState,
  ids: MarkAsReadPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Mark notifications as read
    await markNotificationsAsReadQuery(parsed.data.ids);

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

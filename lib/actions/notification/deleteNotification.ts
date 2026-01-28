"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { actionError, actionSuccess } from "../utils/actionResult";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteNotification as deleteNotificationQuery } from "@/lib/data/notification/notification.dal";

const schema = z.object({
  id: coercedPositiveInt,
});

export async function deleteNotification(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ id });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Delete notification
    await deleteNotificationQuery(parsed.data.id);

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

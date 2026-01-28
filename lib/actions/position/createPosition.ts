"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { positionSchema } from "@/lib/schemas/position";
import { actionError, actionSuccess } from "../utils/actionResult";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createPosition as createPositionQuery } from "@/lib/data/position/position.dal";

export async function createPosition(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = positionSchema.safeParse({ name: formData.get("name") });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Create position
    await createPositionQuery(parsed.data);
    revalidatePath("/users");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

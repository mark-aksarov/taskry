"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { positionSchema } from "@/lib/schemas/position";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createPosition as createPositionQuery } from "@/lib/data/position/position.dal";

export async function createPosition(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(positionSchema, {
      name: formData.get("name"),
    });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await createPositionQuery(parsed.data);
    revalidatePath("/users");

    return actionSuccess();
  });
}

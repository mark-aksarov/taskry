"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteUser as deleteUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = userSchema.pick({ id: true });

export async function deleteUser(
  _prevState: ActionState,
  id: string,
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

    await deleteUserService(parsed.data.id);
    revalidatePath("/users");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

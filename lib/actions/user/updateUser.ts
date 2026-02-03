"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateUser as updateUserQuery } from "@/lib/data/user/user.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = userSchema.omit({ email: true, password: true });

export async function updateUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Update customer
    await updateUserQuery(parsed.data);

    revalidatePath("/team");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}

"use server";

import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { createUser as createUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = userSchema.omit({ id: true }).pick({
  email: true,
  password: true,
  fullName: true,
});

export async function createUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.createUser");

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Create user
    await createUserService(parsed.data);

    revalidatePath("/team");
    return actionSuccess();
  } catch (error: unknown) {
    console.error("Create User Error:", error);

    if (error instanceof APIError) {
      return actionError(error.message);
    }

    return actionError(t("validation.internalServerError"));
  }
}

"use server";

import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = userSchema.omit({ id: true }).pick({
  email: true,
  password: true,
  fullName: true,
});

type KnownStatusKey = "forbidden" | "bad_request" | "internalServerError";

export async function createUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  const session = await requireSessionOrRedirect();

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

    const { user } = await auth.api.createUser({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.fullName,
        role: "user",

        data: {
          workspaceId: session!.user.workspaceId,
        },
      },
    });

    auth.api.sendVerificationEmail({ body: { email: user.email } });

    revalidatePath("/team");
    return actionSuccess();
  } catch (error: unknown) {
    console.error("Create User Error:", error);

    if (error instanceof APIError) {
      const statusKey = String(error.status).toLowerCase() as KnownStatusKey;

      if (statusKey === "bad_request") {
        return actionError(t("validation.bad_request"));
      }
      if (statusKey === "forbidden") {
        return actionError(t("validation.forbidden"));
      }
    }

    return actionError(t("validation.internalServerError"));
  }
}

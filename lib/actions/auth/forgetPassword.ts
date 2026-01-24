"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { validateActionInput } from "../utils/validateActionInput";

const schema = z.object({
  email: z.email().min(1).max(254),
});

export async function forgetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.forgetPassword");

  // Parse form data
  const input = Object.fromEntries(formData.entries());
  const parsed = validateActionInput(schema, input);

  if (!parsed.success) {
    return actionError(t("validation.invalidInput"));
  }

  // Request password reset
  try {
    await auth.api.requestPasswordReset({
      body: {
        email: parsed.data.email,
        redirectTo: "/reset-password",
      },
    });
  } catch (error: unknown) {
    console.error("Password Reset Error:", error);

    if (error instanceof APIError && error.status === "BAD_REQUEST") {
      return actionError(t("validation.bad_request"));
    }

    return actionError(t("validation.internalServerError"));
  }

  // Redirect to check email
  redirect({
    href: "/forget-password/check-email",
    locale,
  });

  return actionSuccess();
}
